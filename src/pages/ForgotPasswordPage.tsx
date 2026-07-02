/**
 * ForgotPasswordPage.tsx
 * Route: /forgot-password (public)
 * Drop into src/pages/
 */
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FileText, Mail, Loader2, CheckCircle2, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { authAPI } from '@/lib/api'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setIsLoading(true)
    try {
      await authAPI.forgotPassword(email)
      setSent(true)
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Something went wrong. Please try again.',
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-secondary/30 to-background px-4'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className='w-full max-w-md'
      >
        {/* Logo */}
        <Link to='/' className='flex items-center justify-center gap-2 mb-8'>
          <div className='w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center'>
            <FileText className='w-5 h-5 text-white' />
          </div>
          <span className='text-2xl font-bold text-foreground'>ResumeAI</span>
        </Link>

        <div className='bg-card border border-border rounded-2xl p-8 shadow-lg'>
          {sent ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className='text-center'
            >
              <div className='w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mx-auto mb-4'>
                <CheckCircle2 className='w-7 h-7 text-emerald-600 dark:text-emerald-400' />
              </div>
              <h1 className='text-xl font-bold text-foreground mb-2'>
                Check your inbox
              </h1>
              <p className='text-sm text-muted-foreground mb-6 leading-relaxed'>
                If <span className='font-medium text-foreground'>{email}</span>{' '}
                is registered, you'll receive a password reset link shortly.
                Check your spam folder if you don't see it within a few minutes.
              </p>
              <p className='text-xs text-muted-foreground mb-6'>
                The reset link expires in <strong>15 minutes</strong>.
              </p>
              <Link to='/login'>
                <Button variant='outline' className='w-full gap-2'>
                  <ArrowLeft className='w-4 h-4' />
                  Back to Login
                </Button>
              </Link>
            </motion.div>
          ) : (
            <>
              <div className='w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4'>
                <Mail className='w-6 h-6 text-primary' />
              </div>

              <h1 className='text-xl font-bold text-foreground text-center mb-1'>
                Forgot your password?
              </h1>
              <p className='text-sm text-muted-foreground text-center mb-6'>
                Enter your email address and we'll send you a link to reset your
                password.
              </p>

              <form onSubmit={handleSubmit} className='space-y-4'>
                <div>
                  <Label htmlFor='email'>Email address</Label>
                  <Input
                    id='email'
                    type='email'
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      setError('')
                    }}
                    placeholder='jane@example.com'
                    required
                    className='mt-1'
                    autoFocus
                  />
                </div>

                {error && (
                  <p className='text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg px-3 py-2'>
                    {error}
                  </p>
                )}

                <Button
                  type='submit'
                  disabled={isLoading}
                  className='w-full bg-gradient-primary text-primary-foreground hover:opacity-90'
                >
                  {isLoading ? (
                    <>
                      <Loader2 className='w-4 h-4 mr-2 animate-spin' />
                      Sending…
                    </>
                  ) : (
                    'Send Reset Link'
                  )}
                </Button>
              </form>

              <div className='mt-4 text-center'>
                <Link
                  to='/login'
                  className='text-sm text-muted-foreground hover:text-foreground flex items-center justify-center gap-1.5 transition-colors'
                >
                  <ArrowLeft className='w-3.5 h-3.5' />
                  Back to login
                </Link>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </div>
  )
}
