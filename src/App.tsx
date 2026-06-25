/**
 * App.tsx — UPDATED VERSION
 * Changes from previous version:
 * 1. /builder/:id now renders CVWorkspace (persistent sidebar + section nav)
 *    instead of the old standalone Builder page
 * 2. Dashboard already wraps itself in DashboardLayout
 */
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { AuthProvider } from '@/contexts/AuthContext'
import { ResumeProvider } from '@/contexts/ResumeContext'
import ProtectedRoute from '@/components/ProtectedRoute'

import Index from './pages/Index'
import Dashboard from './pages/Dashboard'
import CVWorkspace from './pages/CVWorkspace'
import AuthPage from './pages/AuthPage'
import NotFound from './pages/NotFound'
import FeedbackPage from './pages/FeedbackPage'
import AdminFeedbackPage from './pages/Add AdminFeedbackPage'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 30_000,
    },
  },
})

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <ResumeProvider>
            <Routes>
              {/* Public */}
              <Route path='/' element={<Index />} />
              <Route path='/login' element={<AuthPage mode='login' />} />
              <Route path='/register' element={<AuthPage mode='register' />} />

              {/* Protected */}
              <Route
                path='/dashboard'
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path='/builder/:id'
                element={
                  <ProtectedRoute>
                    <CVWorkspace />
                  </ProtectedRoute>
                }
              />

              <Route
                path='/feedback'
                element={
                  <ProtectedRoute>
                    <FeedbackPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path='/admin/feedback'
                element={
                  <ProtectedRoute>
                    <AdminFeedbackPage />
                  </ProtectedRoute>
                }
              />

              <Route path='*' element={<NotFound />} />
            </Routes>
          </ResumeProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
)

export default App
