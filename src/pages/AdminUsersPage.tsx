/**
 * AdminUsersPage.tsx
 * Route: /admin/users -> only reachable by admin role
 */
import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Users,
  Loader2,
  Search,
  Lock,
  Unlock,
  AlertTriangle,
} from 'lucide-react'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { adminUserAPI, AdminUser } from '@/lib/api'
import { format } from 'date-fns'

type StatusFilter = 'all' | 'active' | 'blocked'

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState<StatusFilter>('all')
  const [flaggedOnly, setFlaggedOnly] = useState(false)
  const [actioningId, setActioningId] = useState<string | null>(null)
  const [blockTarget, setBlockTarget] = useState<AdminUser | null>(null)
  const [blockReason, setBlockReason] = useState('')

  const load = useCallback(async () => {
    setIsLoading(true)
    try {
      const { data } = await adminUserAPI.list({
        search: search || undefined,
        status,
        flagged: flaggedOnly || undefined,
      })
      setUsers(data.users)
    } finally {
      setIsLoading(false)
    }
  }, [search, status, flaggedOnly])

  useEffect(() => {
    const t = setTimeout(load, 300) // debounce search
    return () => clearTimeout(t)
  }, [load])

  async function confirmBlock() {
    if (!blockTarget) return
    setActioningId(blockTarget._id)
    try {
      await adminUserAPI.block(blockTarget._id, blockReason.trim() || undefined)
      setUsers((prev) =>
        prev.map((u) =>
          u._id === blockTarget._id
            ? {
                ...u,
                isBlocked: true,
                blockedReason: blockReason.trim() || undefined,
              }
            : u,
        ),
      )
    } finally {
      setActioningId(null)
      setBlockTarget(null)
      setBlockReason('')
    }
  }

  async function handleUnblock(id: string) {
    setActioningId(id)
    try {
      await adminUserAPI.unblock(id)
      setUsers((prev) =>
        prev.map((u) => (u._id === id ? { ...u, isBlocked: false } : u)),
      )
    } finally {
      setActioningId(null)
    }
  }

  return (
    <DashboardLayout>
      <div className='py-10 px-6'>
        <div className='max-w-5xl mx-auto'>
          <div className='mb-6'>
            <h1 className='text-2xl font-bold text-foreground flex items-center gap-2'>
              <Users className='w-6 h-6 text-primary' />
              Manage Users
            </h1>
            <p className='text-muted-foreground mt-1'>
              View, search, and block or unblock user accounts.
            </p>
          </div>

          {/* Search + filters */}
          <div className='flex flex-wrap items-center gap-3 mb-6'>
            <div className='relative flex-1 min-w-[220px]'>
              <Search className='w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground' />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder='Search by name or email…'
                className='pl-9'
              />
            </div>
            <div className='flex items-center gap-1 border-b border-border'>
              {(['all', 'active', 'blocked'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setStatus(tab)}
                  className={`px-3 py-2 text-sm font-medium capitalize border-b-2 transition-colors ${
                    status === tab
                      ? 'border-primary text-primary'
                      : 'border-transparent text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <Button
              type='button'
              variant={flaggedOnly ? 'default' : 'outline'}
              size='sm'
              onClick={() => setFlaggedOnly((v) => !v)}
              className='gap-1.5'
            >
              <AlertTriangle className='w-3.5 h-3.5' />
              Flagged only
            </Button>
          </div>

          {isLoading ? (
            <div className='flex items-center justify-center py-20'>
              <Loader2 className='w-6 h-6 animate-spin text-muted-foreground' />
            </div>
          ) : users.length === 0 ? (
            <div className='text-center py-20 text-muted-foreground'>
              <p>No users found.</p>
            </div>
          ) : (
            <div className='space-y-3'>
              <AnimatePresence>
                {users.map((u) => (
                  <motion.div
                    key={u._id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className='border border-border rounded-xl p-4 bg-card'
                  >
                    <div className='flex items-start justify-between gap-3'>
                      <div className='min-w-0'>
                        <div className='flex items-center gap-2 flex-wrap'>
                          <p className='font-semibold text-foreground'>
                            {u.fullName}
                          </p>
                          <span className='text-xs text-muted-foreground'>
                            · {u.email}
                          </span>
                          <span className='text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-muted text-muted-foreground'>
                            {u.role}
                          </span>
                          <span
                            className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                              u.isBlocked
                                ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                                : 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400'
                            }`}
                          >
                            {u.isBlocked ? 'Blocked' : 'Active'}
                          </span>
                          {u.flagged && (
                            <span className='text-[10px] px-2 py-0.5 rounded-full font-medium bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 flex items-center gap-1'>
                              <AlertTriangle className='w-2.5 h-2.5' />
                              {u.flagReason ?? 'flagged'}
                            </span>
                          )}
                        </div>
                        {u.isBlocked && u.blockedReason && (
                          <p className='text-sm text-muted-foreground mt-2'>
                            Reason: {u.blockedReason}
                          </p>
                        )}
                        <p className='text-[11px] text-muted-foreground/70 mt-2'>
                          Joined {format(new Date(u.createdAt), 'MMM d, yyyy')}
                        </p>
                      </div>

                      <div className='flex flex-col gap-1.5 shrink-0'>
                        {actioningId === u._id ? (
                          <Loader2 className='w-4 h-4 animate-spin text-muted-foreground self-center' />
                        ) : u.role === 'admin' ? (
                          <span className='text-[11px] text-muted-foreground'>
                            —
                          </span>
                        ) : u.isBlocked ? (
                          <Button
                            size='sm'
                            variant='outline'
                            onClick={() => handleUnblock(u._id)}
                            className='gap-1.5 h-8'
                          >
                            <Unlock className='w-3.5 h-3.5' />
                            Unblock
                          </Button>
                        ) : (
                          <Button
                            size='sm'
                            variant='ghost'
                            onClick={() => setBlockTarget(u)}
                            className='gap-1.5 h-8 text-destructive hover:text-destructive'
                          >
                            <Lock className='w-3.5 h-3.5' />
                            Block
                          </Button>
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

      {/* Block reason dialog */}
      <Dialog
        open={!!blockTarget}
        onOpenChange={(open) => !open && setBlockTarget(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Block {blockTarget?.fullName}?</DialogTitle>
            <DialogDescription>
              This revokes their active sessions immediately. You can unblock
              them later.
            </DialogDescription>
          </DialogHeader>
          <Textarea
            value={blockReason}
            onChange={(e) => setBlockReason(e.target.value)}
            placeholder='Reason (optional, shown to other admins)'
            rows={3}
          />
          <DialogFooter>
            <Button variant='outline' onClick={() => setBlockTarget(null)}>
              Cancel
            </Button>
            <Button variant='destructive' onClick={confirmBlock}>
              Block user
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  )
}
