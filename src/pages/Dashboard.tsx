/**
 * Dashboard.tsx — UPDATED to use persistent DashboardLayout sidebar
 * Replaces the old standalone Navbar with DashboardLayout (sidebar + content)
 */
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Plus,
  FileText,
  MoreVertical,
  Copy,
  Trash2,
  Edit,
  Loader2,
} from 'lucide-react'
import { useResume } from '@/contexts/ResumeContext'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { format } from 'date-fns'
import ResumeThumbnail from '@/components/dashboard/ResumeThumbnail'
import ATSBadge from '@/components/dashboard/ATSBadge'
import { useState } from 'react'

const TEMPLATE_LABEL: Record<string, string> = {
  modern: 'Modern',
  classic: 'Classic',
  minimal: 'Minimal',
  corporate: 'Corporate',
}

const Dashboard = () => {
  const {
    resumes,
    isLoading,
    createResume,
    deleteResume,
    duplicateResume,
    setCurrentResume,
  } = useResume()
  const navigate = useNavigate()
  const [pendingAction, setPendingAction] = useState<string | null>(null)

  const handleCreate = async () => {
    setPendingAction('create')
    try {
      const id = await createResume()
      navigate(`/builder/${id}`)
    } finally {
      setPendingAction(null)
    }
  }

  const handleEdit = async (id: string) => {
    setPendingAction(id)
    try {
      await setCurrentResume(id)
      navigate(`/builder/${id}`)
    } finally {
      setPendingAction(null)
    }
  }

  const handleDuplicate = async (id: string) => {
    setPendingAction(id)
    try {
      const newId = await duplicateResume(id)
      navigate(`/builder/${newId}`)
    } finally {
      setPendingAction(null)
    }
  }

  const handleDelete = async (id: string) => {
    setPendingAction(id)
    try {
      await deleteResume(id)
    } finally {
      setPendingAction(null)
    }
  }

  return (
    <DashboardLayout>
      <div className='py-8'>
        <div className='container mx-auto px-6'>
          <div className='flex items-center justify-between mb-8'>
            <div>
              <h1 className='text-3xl font-bold text-foreground'>My Resumes</h1>
              <p className='text-muted-foreground mt-1'>
                {resumes.length > 0
                  ? `${resumes.length} resume${resumes.length === 1 ? '' : 's'} · ATS scores update automatically`
                  : 'Create and manage your resumes'}
              </p>
            </div>
            <Button
              onClick={handleCreate}
              disabled={pendingAction === 'create'}
              className='bg-gradient-primary text-primary-foreground hover:opacity-90'
            >
              {pendingAction === 'create' ? (
                <Loader2 className='w-4 h-4 mr-2 animate-spin' />
              ) : (
                <Plus className='w-4 h-4 mr-2' />
              )}
              New Resume
            </Button>
          </div>

          {isLoading ? (
            <div className='flex items-center justify-center py-24'>
              <Loader2 className='w-6 h-6 animate-spin text-muted-foreground' />
            </div>
          ) : resumes.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className='text-center py-24'
            >
              <div className='w-20 h-20 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-6'>
                <FileText className='w-10 h-10 text-muted-foreground' />
              </div>
              <h2 className='text-xl font-semibold text-foreground mb-2'>
                No resumes yet
              </h2>
              <p className='text-muted-foreground mb-6'>
                Create your first resume to get started.
              </p>
              <Button
                onClick={handleCreate}
                disabled={pendingAction === 'create'}
                className='bg-gradient-primary text-primary-foreground hover:opacity-90'
              >
                {pendingAction === 'create' ? (
                  <Loader2 className='w-4 h-4 mr-2 animate-spin' />
                ) : (
                  <Plus className='w-4 h-4 mr-2' />
                )}
                Create Resume
              </Button>
            </motion.div>
          ) : (
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
              {/* Create new card */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={handleCreate}
                disabled={pendingAction === 'create'}
                className='rounded-2xl border-2 border-dashed border-border hover:border-primary/50 bg-card cursor-pointer transition-all duration-300 flex flex-col items-center justify-center aspect-[3/4] hover:shadow-glow disabled:opacity-60'
              >
                {pendingAction === 'create' ? (
                  <Loader2 className='w-7 h-7 text-primary animate-spin mb-3' />
                ) : (
                  <div className='w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-3'>
                    <Plus className='w-7 h-7 text-primary' />
                  </div>
                )}
                <p className='font-medium text-foreground'>New Resume</p>
              </motion.button>

              {resumes.map((resume, i) => {
                const isPending = pendingAction === resume.id
                return (
                  <motion.div
                    key={resume.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: (i + 1) * 0.05 }}
                    className='group rounded-2xl border border-border bg-card overflow-hidden hover:shadow-elegant hover:border-primary/30 transition-all duration-300'
                  >
                    {/* Live preview area */}
                    <div
                      className='aspect-[3/4] cursor-pointer relative bg-muted/40'
                      onClick={() => handleEdit(resume.id)}
                    >
                      <div className='absolute inset-2 rounded-lg border border-border shadow-sm overflow-hidden'>
                        <ResumeThumbnail resume={resume} />
                      </div>

                      {/* Template chip */}
                      <div className='absolute top-3 left-3 text-[10px] font-medium uppercase tracking-wide bg-background/90 backdrop-blur-sm border border-border rounded-full px-2 py-0.5 text-muted-foreground'>
                        {TEMPLATE_LABEL[resume.template] ?? resume.template}
                      </div>

                      {/* Hover overlay */}
                      <div className='absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors flex items-center justify-center'>
                        {isPending ? (
                          <Loader2 className='w-5 h-5 animate-spin text-foreground/70' />
                        ) : (
                          <div className='opacity-0 group-hover:opacity-100 transition-opacity'>
                            <Button size='sm' variant='secondary'>
                              <Edit className='w-3 h-3 mr-1' /> Edit
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Info footer */}
                    <div className='p-4 border-t border-border space-y-2'>
                      <div className='flex items-center justify-between gap-2'>
                        <div className='min-w-0'>
                          <p className='font-medium text-foreground truncate'>
                            {resume.title}
                          </p>
                          <p className='text-xs text-muted-foreground'>
                            {format(new Date(resume.updatedAt), 'MMM d, yyyy')}
                          </p>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant='ghost'
                              size='icon'
                              className='h-8 w-8 flex-shrink-0'
                            >
                              <MoreVertical className='w-4 h-4' />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align='end'>
                            <DropdownMenuItem
                              onClick={() => handleEdit(resume.id)}
                            >
                              <Edit className='w-4 h-4 mr-2' /> Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDuplicate(resume.id)}
                            >
                              <Copy className='w-4 h-4 mr-2' /> Duplicate
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDelete(resume.id)}
                              className='text-destructive focus:text-destructive'
                            >
                              <Trash2 className='w-4 h-4 mr-2' /> Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      {/* ATS score row */}
                      <div className='flex items-center justify-between min-h-[26px]'>
                        <ATSBadge resume={resume} />
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Dashboard
