/**
 * ResetPasswordPage.tsx
 * Route: /reset-password?token=xxx (public)
 * User lands here from the email reset link.
 * Drop into src/pages/
 */
import { useState, useEffect } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  FileText,
  Lock,
  Loader2,
  CheckCircle2,
  Eye,
  EyeOff,
  AlertCircle,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { authAPI } from '@/lib/api'

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const token = searchParams.get('token')

  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  // Redirect if no token in URL
  useEffect(() => {
    if (!token) {
      navigate('/forgot-password', { replace: true })
    }
  }, [token, navigate])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }

    if (!/[A-Z]/.test(newPassword)) {
      setError('Password must contain at least one uppercase letter')
      return
    }

    if (!/[0-9]/.test(newPassword)) {
      setError('Password must contain at least one number')
      return
    }

    setIsLoading(true)
    try {
      await authAPI.resetPassword(token!, newPassword)
      setSuccess(true)
      // Redirect to login after 3 seconds
      setTimeout(
        () =>
          navigate('/login', {
            state: {
              message:
                'Password reset successfully. Please log in with your new password.',
            },
          }),
        3000,
      )
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

  const passwordStrength = () => {
    let score = 0
    if (newPassword.length >= 8) score++
    if (/[A-Z]/.test(newPassword)) score++
    if (/[0-9]/.test(newPassword)) score++
    if (/[^A-Za-z0-9]/.test(newPassword)) score++
    return score
  }

  const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong']
  const strengthColor = [
    '',
    'bg-red-400',
    'bg-amber-400',
    'bg-blue-400',
    'bg-emerald-500',
  ]
  const strength = passwordStrength()

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
          {success ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className='text-center'
            >
              <div className='w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mx-auto mb-4'>
                <CheckCircle2 className='w-7 h-7 text-emerald-600 dark:text-emerald-400' />
              </div>
              <h1 className='text-xl font-bold text-foreground mb-2'>
                Password reset!
              </h1>
              <p className='text-sm text-muted-foreground mb-2'>
                Your password has been updated successfully.
              </p>
              <p className='text-xs text-muted-foreground mb-6'>
                Redirecting you to login…
              </p>
              <Link to='/login'>
                <Button className='w-full bg-gradient-primary text-primary-foreground hover:opacity-90'>
                  Go to Login
                </Button>
              </Link>
            </motion.div>
          ) : (
            <>
              <div className='w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4'>
                <Lock className='w-6 h-6 text-primary' />
              </div>

              <h1 className='text-xl font-bold text-foreground text-center mb-1'>
                Set new password
              </h1>
              <p className='text-sm text-muted-foreground text-center mb-6'>
                Choose a strong password for your account.
              </p>

              <form onSubmit={handleSubmit} className='space-y-4'>
                <div>
                  <Label htmlFor='newPassword'>New Password</Label>
                  <div className='relative mt-1'>
                    <Input
                      id='newPassword'
                      type={showPassword ? 'text' : 'password'}
                      value={newPassword}
                      onChange={(e) => {
                        setNewPassword(e.target.value)
                        setError('')
                      }}
                      placeholder='Min 8 chars, 1 uppercase, 1 number'
                      required
                      className='pr-10'
                    />
                    <button
                      type='button'
                      onClick={() => setShowPassword((v) => !v)}
                      className='absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground'
                    >
                      {showPassword ? (
                        <EyeOff className='w-4 h-4' />
                      ) : (
                        <Eye className='w-4 h-4' />
                      )}
                    </button>
                  </div>

                  {/* Password strength bar */}
                  {newPassword.length > 0 && (
                    <div className='mt-2 space-y-1'>
                      <div className='flex gap-1'>
                        {[1, 2, 3, 4].map((i) => (
                          <div
                            key={i}
                            className={`h-1 flex-1 rounded-full transition-colors ${
                              i <= strength
                                ? strengthColor[strength]
                                : 'bg-muted'
                            }`}
                          />
                        ))}
                      </div>
                      <p className='text-xs text-muted-foreground'>
                        Strength:{' '}
                        <span className='font-medium'>
                          {strengthLabel[strength] || 'Too weak'}
                        </span>
                      </p>
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor='confirmPassword'>Confirm Password</Label>
                  <Input
                    id='confirmPassword'
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value)
                      setError('')
                    }}
                    placeholder='Repeat your new password'
                    required
                    className='mt-1'
                  />
                  {confirmPassword && newPassword !== confirmPassword && (
                    <p className='text-xs text-destructive mt-1 flex items-center gap-1'>
                      <AlertCircle className='w-3 h-3' />
                      Passwords do not match
                    </p>
                  )}
                </div>

                {error && (
                  <p className='text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg px-3 py-2'>
                    {error}
                  </p>
                )}

                <Button
                  type='submit'
                  disabled={
                    isLoading ||
                    (!!confirmPassword && newPassword !== confirmPassword)
                  }
                  className='w-full bg-gradient-primary text-primary-foreground hover:opacity-90'
                >
                  {isLoading ? (
                    <>
                      <Loader2 className='w-4 h-4 mr-2 animate-spin' />
                      Resetting…
                    </>
                  ) : (
                    'Reset Password'
                  )}
                </Button>
              </form>

              <div className='mt-4 text-center'>
                <Link
                  to='/forgot-password'
                  className='text-sm text-muted-foreground hover:text-foreground transition-colors'
                >
                  Request a new reset link
                </Link>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </div>
  )
}
