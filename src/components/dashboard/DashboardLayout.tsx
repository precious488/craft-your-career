// /**
//  * DashboardLayout.tsx
//  * Persistent sidebar + content area. Wrap Dashboard and CVWorkspace with this.
//  * Drop into src/components/dashboard/
//  */
// import { ReactNode } from 'react'
// import DashboardSidebar from './DashboardSidebar'

// export default function DashboardLayout({ children }: { children: ReactNode }) {
//   return (
//     <div className='min-h-screen flex bg-background'>
//       <DashboardSidebar />
//       <main className='flex-1 min-w-0'>{children}</main>
//     </div>
//   )
// }
import { ReactNode, useState } from 'react'
import { Menu, FileText } from 'lucide-react'
import { Link } from 'react-router-dom'
import DashboardSidebar from './DashboardSidebar'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet'

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  return (
    <div className='min-h-screen flex bg-background'>
      {/* Desktop persistent sidebar */}
      <div className='hidden md:block h-screen sticky top-0'>
        <DashboardSidebar />
      </div>

      <div className='flex-1 min-w-0 flex flex-col'>
        {/* Mobile-only top bar */}
        <header className='md:hidden sticky top-0 z-40 flex items-center gap-3 px-4 h-14 border-b border-border bg-background'>
          <Button
            variant='ghost'
            size='icon'
            onClick={() => setMobileNavOpen(true)}
            aria-label='Open menu'
          >
            <Menu className='w-5 h-5' />
          </Button>
          <Link to='/' className='flex items-center gap-2'>
            <div className='w-7 h-7 rounded-lg bg-rust/10 flex items-center justify-center'>
              <FileText className='w-4 h-4 text-rust' />
            </div>
            <span className='font-bold text-foreground'>ResumeAI</span>
          </Link>
        </header>

        <main className='flex-1 min-w-0'>{children}</main>
      </div>

      {/* Mobile slide-out sidebar */}
      <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
        <SheetContent side='left' className='p-0 w-64 border-none'>
          <SheetTitle className='sr-only'>Navigation menu</SheetTitle>
          <DashboardSidebar onNavigate={() => setMobileNavOpen(false)} />
        </SheetContent>
      </Sheet>
    </div>
  )
}
