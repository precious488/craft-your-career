/**
 * DashboardSidebar.tsx
 * Dark gradient sidebar for the dashboard, inspired by Rezi's layout.
 * Drop into src/components/dashboard/
 */
import { Link, useNavigate, useLocation } from 'react-router-dom'
import {
  FileText,
  LayoutDashboard,
  MessageSquare,
  Settings,
  HelpCircle,
  Plus,
  LogOut,
} from 'lucide-react'
import { ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/AuthContext'
import { useResume } from '@/contexts/ResumeContext'

interface NavItemProps {
  icon: React.ReactNode
  label: string
  badge?: string
  active?: boolean
  onClick?: () => void
}

function NavItem({ icon, label, badge, active, onClick }: NavItemProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
        active
          ? 'bg-white/10 text-white'
          : 'text-white/70 hover:text-white hover:bg-white/5'
      }`}
    >
      <span className='w-5 h-5 flex items-center justify-center shrink-0'>
        {icon}
      </span>
      <span className='flex-1 text-left'>{label}</span>
      {badge && (
        <span className='text-[10px] font-semibold uppercase bg-emerald-400/90 text-emerald-950 px-1.5 py-0.5 rounded-md'>
          {badge}
        </span>
      )}
    </button>
  )
}

export default function DashboardSidebar() {
  const { user, logout } = useAuth()
  const { resumes, createResume } = useResume()
  const navigate = useNavigate()
  const location = useLocation()

  const limit = user?.role === 'free' ? 3 : Infinity
  const used = resumes.length

  async function handleCreate() {
    const id = await createResume()
    navigate(`/builder/${id}`)
  }

  async function handleLogout() {
    await logout()
    navigate('/')
  }

  return (
    <aside
      className='w-64 min-w-64 h-screen sticky top-0 flex flex-col px-4 py-6 overflow-y-auto'
      style={{
        background:
          'linear-gradient(165deg, #2a1f6e 0%, #4f3bb8 45%, #6c4fd4 100%)',
      }}
    >
      {/* Logo */}
      <Link to='/' className='flex items-center gap-2 px-2 mb-6'>
        <div className='w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center'>
          <FileText className='w-4 h-4 text-white' />
        </div>
        <span className='text-lg font-bold text-white'>ResumeAI</span>
      </Link>

      {/* Create button */}
      <Button
        onClick={handleCreate}
        className='w-full justify-start gap-2 bg-white text-[#4f3bb8] hover:bg-white/90 font-semibold mb-6 h-11 rounded-xl shadow-lg shadow-black/10'
      >
        <Plus className='w-4 h-4' />
        Create New Resume
      </Button>

      {/* Nav */}
      <nav className='flex flex-col gap-1'>
        <NavItem
          icon={<LayoutDashboard className='w-4 h-4' />}
          label='My Dashboard'
          active={location.pathname === '/dashboard'}
          onClick={() => navigate('/dashboard')}
        />
        <NavItem
          icon={<MessageSquare className='w-4 h-4' />}
          label='Feedback'
          active={location.pathname === '/feedback'}
          onClick={() => navigate('/feedback')}
        />
        <NavItem
          icon={<Settings className='w-4 h-4' />}
          label='Settings'
          active={location.pathname === '/settings'}
          onClick={() => navigate('/settings')}
        />
        <NavItem
          icon={<HelpCircle className='w-4 h-4' />}
          label='Help'
          active={location.pathname === '/help'}
          onClick={() => navigate('/help')}
        />
        {user?.role === 'admin' && (
          <div className='mt-1 pt-1 border-t border-white/10'>
            <NavItem
              icon={<ShieldCheck className='w-4 h-4' />}
              label='Manage Feedback'
              active={location.pathname === '/admin/feedback'}
              onClick={() => navigate('/admin/feedback')}
            />
          </div>
        )}
      </nav>

      {/* Spacer */}
      <div className='flex-1' />
      {/* Stats card */}
      {/* <div className='bg-white/10 rounded-2xl p-4 mb-3 space-y-3'>
        <div className='flex items-center justify-between text-sm'>
          <span className='text-white/70 flex items-center gap-2'>
            <FileText className='w-3.5 h-3.5' />
            Resumes
          </span>
          <span className='text-white font-semibold'>
            {used}
            {limit !== Infinity ? ` / ${limit}` : ''}
          </span>
        </div>
        {limit !== Infinity && (
          <div className='h-1.5 rounded-full bg-white/15 overflow-hidden'>
            <div
              className='h-full rounded-full bg-emerald-400'
              style={{ width: `${Math.min(100, (used / limit) * 100)}%` }}
            />
          </div>
        )}
        {user?.role === 'free' && (
          <p className='text-[11px] text-white/60 leading-relaxed'>
            Free plan · upgrade to Pro for unlimited resumes and AI tools.
          </p>
        )}
      </div> */}

      {/* User / logout */}
      <button
        onClick={handleLogout}
        className='flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 transition-colors'
      >
        <div className='w-6 h-6 rounded-full bg-white/15 flex items-center justify-center text-[11px] font-semibold text-white shrink-0'>
          {user?.fullName?.[0]?.toUpperCase() ?? 'U'}
        </div>
        <span className='flex-1 text-left truncate'>
          {user?.fullName ?? 'Account'}
        </span>
        <LogOut className='w-4 h-4' />
      </button>
    </aside>
  )
}
