/**
 * AdminFeedbackPage.tsx
 * Route: /admin/feedback -> only reachable by admin role
 * Drop into src/pages/
 */
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShieldCheck, Loader2, Star, Check, X, Trash2 } from 'lucide-react'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import { Button } from '@/components/ui/button'
import { feedbackAPI, FeedbackEntry } from '@/lib/api'
import { format } from 'date-fns'

export default function AdminFeedbackPage() {
  const [feedback, setFeedback] = useState<FeedbackEntry[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'pending' | 'published'>(
    'pending',
  )
  const [actioningId, setActioningId] = useState<string | null>(null)

  async function load() {
    setIsLoading(true)
    try {
      const { data } = await feedbackAPI.adminAll()
      setFeedback(data)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  async function togglePublish(id: string, next: boolean) {
    setActioningId(id)
    try {
      await feedbackAPI.adminSetPublished(id, next)
      setFeedback((prev) =>
        prev.map((f) => (f._id === id ? { ...f, isPublished: next } : f)),
      )
    } finally {
      setActioningId(null)
    }
  }

  async function handleDelete(id: string) {
    setActioningId(id)
    try {
      await feedbackAPI.adminDelete(id)
      setFeedback((prev) => prev.filter((f) => f._id !== id))
    } finally {
      setActioningId(null)
    }
  }

  const filtered = feedback.filter((f) => {
    if (filter === 'pending') return !f.isPublished
    if (filter === 'published') return f.isPublished
    return true
  })

  return (
    <DashboardLayout>
      <div className='py-10 px-6'>
        <div className='max-w-3xl mx-auto'>
          <div className='mb-6'>
            <h1 className='text-2xl font-bold text-foreground flex items-center gap-2'>
              <ShieldCheck className='w-6 h-6 text-primary' />
              Manage Feedback
            </h1>
            <p className='text-muted-foreground mt-1'>
              Approve user feedback to feature it on the landing page.
            </p>
          </div>

          {/* Filter tabs */}
          <div className='flex items-center gap-1 mb-6 border-b border-border'>
            {(['pending', 'published', 'all'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-3.5 py-2 text-sm font-medium capitalize border-b-2 transition-colors ${
                  filter === tab
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab}
                {tab === 'pending' && (
                  <span className='ml-1.5 text-[10px] bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 px-1.5 py-0.5 rounded-full'>
                    {feedback.filter((f) => !f.isPublished).length}
                  </span>
                )}
              </button>
            ))}
          </div>

          {isLoading ? (
            <div className='flex items-center justify-center py-20'>
              <Loader2 className='w-6 h-6 animate-spin text-muted-foreground' />
            </div>
          ) : filtered.length === 0 ? (
            <div className='text-center py-20 text-muted-foreground'>
              <p>No {filter !== 'all' ? filter : ''} feedback found.</p>
            </div>
          ) : (
            <div className='space-y-3'>
              <AnimatePresence>
                {filtered.map((f) => (
                  <motion.div
                    key={f._id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className='border border-border rounded-xl p-4 bg-card'
                  >
                    <div className='flex items-start justify-between gap-3'>
                      <div className='min-w-0'>
                        <div className='flex items-center gap-2 flex-wrap'>
                          <p className='font-semibold text-foreground'>
                            {f.name}
                          </p>
                          {f.jobTitle && (
                            <span className='text-xs text-muted-foreground'>
                              · {f.jobTitle}
                            </span>
                          )}
                          {f.location && (
                            <span className='text-xs text-muted-foreground'>
                              · {f.location}
                            </span>
                          )}
                          <span
                            className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                              f.isPublished
                                ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400'
                                : 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400'
                            }`}
                          >
                            {f.isPublished ? 'Published' : 'Pending'}
                          </span>
                        </div>
                        {f.rating && (
                          <div className='flex items-center gap-0.5 mt-1'>
                            {[1, 2, 3, 4, 5].map((s) => (
                              <Star
                                key={s}
                                className={`w-3.5 h-3.5 ${
                                  s <= f.rating!
                                    ? 'fill-amber-400 text-amber-400'
                                    : 'text-muted-foreground/30'
                                }`}
                              />
                            ))}
                          </div>
                        )}
                        <p className='text-sm text-muted-foreground mt-2 leading-relaxed'>
                          {f.message}
                        </p>
                        <p className='text-[11px] text-muted-foreground/70 mt-2'>
                          {format(
                            new Date(f.createdAt),
                            'MMM d, yyyy · h:mm a',
                          )}
                        </p>
                      </div>

                      <div className='flex flex-col gap-1.5 shrink-0'>
                        {actioningId === f._id ? (
                          <Loader2 className='w-4 h-4 animate-spin text-muted-foreground self-center' />
                        ) : (
                          <>
                            {f.isPublished ? (
                              <Button
                                size='sm'
                                variant='outline'
                                onClick={() => togglePublish(f._id, false)}
                                className='gap-1.5 h-8'
                              >
                                <X className='w-3.5 h-3.5' />
                                Unpublish
                              </Button>
                            ) : (
                              <Button
                                size='sm'
                                onClick={() => togglePublish(f._id, true)}
                                className='gap-1.5 h-8 bg-emerald-600 hover:bg-emerald-700 text-white'
                              >
                                <Check className='w-3.5 h-3.5' />
                                Approve
                              </Button>
                            )}
                            <Button
                              size='sm'
                              variant='ghost'
                              onClick={() => handleDelete(f._id)}
                              className='gap-1.5 h-8 text-destructive hover:text-destructive'
                            >
                              <Trash2 className='w-3.5 h-3.5' />
                              Delete
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
