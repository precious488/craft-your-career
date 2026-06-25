/**
 * DashboardLayout.tsx
 * Persistent sidebar + content area. Wrap Dashboard and CVWorkspace with this.
 * Drop into src/components/dashboard/
 */
import { ReactNode } from 'react'
import DashboardSidebar from './DashboardSidebar'

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className='min-h-screen flex bg-background'>
      <DashboardSidebar />
      <main className='flex-1 min-w-0'>{children}</main>
    </div>
  )
}
