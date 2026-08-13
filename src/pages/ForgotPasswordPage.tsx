// /**
//  * ForgotPasswordPage.tsx
//  * Route: /forgot-password (public)
//  * Drop into src/pages/
//  */
// import { useState } from 'react'
// import { Link } from 'react-router-dom'
// import { motion } from 'framer-motion'
// import { FileText, Mail, Loader2, CheckCircle2, ArrowLeft } from 'lucide-react'
// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
// import { Label } from '@/components/ui/label'
// import { authAPI } from '@/lib/api'

// export default function ForgotPasswordPage() {
//   const [email, setEmail] = useState('')
//   const [isLoading, setIsLoading] = useState(false)
//   const [sent, setSent] = useState(false)
//   const [error, setError] = useState('')

//   async function handleSubmit(e: React.FormEvent) {
//     e.preventDefault()
//     setError('')
//     setIsLoading(true)
//     try {
//       await authAPI.forgotPassword(email)
//       setSent(true)
//     } catch (err) {
//       setError(
//         err instanceof Error
//           ? err.message
//           : 'Something went wrong. Please try again.',
//       )
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-secondary/30 to-background px-4'>
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className='w-full max-w-md'
//       >
//         {/* Logo */}
//         <Link to='/' className='flex items-center justify-center gap-2 mb-8'>
//           <div className='w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center'>
//             <FileText className='w-5 h-5 text-white' />
//           </div>
//           <span className='text-2xl font-bold text-foreground'>ResumeAI</span>
//         </Link>

//         <div className='bg-card border border-border rounded-2xl p-8 shadow-lg'>
//           {sent ? (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               className='text-center'
//             >
//               <div className='w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mx-auto mb-4'>
//                 <CheckCircle2 className='w-7 h-7 text-emerald-600 dark:text-emerald-400' />
//               </div>
//               <h1 className='text-xl font-bold text-foreground mb-2'>
//                 Check your inbox
//               </h1>
//               <p className='text-sm text-muted-foreground mb-6 leading-relaxed'>
//                 If <span className='font-medium text-foreground'>{email}</span>{' '}
//                 is registered, you'll receive a password reset link shortly.
//                 Check your spam folder if you don't see it within a few minutes.
//               </p>
//               <p className='text-xs text-muted-foreground mb-6'>
//                 The reset link expires in <strong>15 minutes</strong>.
//               </p>
//               <Link to='/login'>
//                 <Button variant='outline' className='w-full gap-2'>
//                   <ArrowLeft className='w-4 h-4' />
//                   Back to Login
//                 </Button>
//               </Link>
//             </motion.div>
//           ) : (
//             <>
//               <div className='w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4'>
//                 <Mail className='w-6 h-6 text-primary' />
//               </div>

//               <h1 className='text-xl font-bold text-foreground text-center mb-1'>
//                 Forgot your password?
//               </h1>
//               <p className='text-sm text-muted-foreground text-center mb-6'>
//                 Enter your email address and we'll send you a link to reset your
//                 password.
//               </p>

//               <form onSubmit={handleSubmit} className='space-y-4'>
//                 <div>
//                   <Label htmlFor='email'>Email address</Label>
//                   <Input
//                     id='email'
//                     type='email'
//                     value={email}
//                     onChange={(e) => {
//                       setEmail(e.target.value)
//                       setError('')
//                     }}
//                     placeholder='jane@example.com'
//                     required
//                     className='mt-1'
//                     autoFocus
//                   />
//                 </div>

//                 {error && (
//                   <p className='text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg px-3 py-2'>
//                     {error}
//                   </p>
//                 )}

//                 <Button
//                   type='submit'
//                   disabled={isLoading}
//                   className='w-full bg-gradient-primary text-primary-foreground hover:opacity-90'
//                 >
//                   {isLoading ? (
//                     <>
//                       <Loader2 className='w-4 h-4 mr-2 animate-spin' />
//                       Sending…
//                     </>
//                   ) : (
//                     'Send Reset Link'
//                   )}
//                 </Button>
//               </form>

//               <div className='mt-4 text-center'>
//                 <Link
//                   to='/login'
//                   className='text-sm text-muted-foreground hover:text-foreground flex items-center justify-center gap-1.5 transition-colors'
//                 >
//                   <ArrowLeft className='w-3.5 h-3.5' />
//                   Back to login
//                 </Link>
//               </div>
//             </>
//           )}
//         </div>
//       </motion.div>
//     </div>
//   )
// }
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
  const strengthColor = ['', 'bg-red-400', 'bg-amber-400', 'bg-gold', 'bg-rust']
  const strength = passwordStrength()

  return (
    <div className='min-h-screen flex items-center justify-center bg-desk px-4 relative overflow-hidden'>
      <div
        className='pointer-events-none absolute inset-0 opacity-40'
        style={{
          background:
            'radial-gradient(ellipse 900px 500px at 50% 0%, #3A2A1B 0%, transparent 60%)',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className='w-full max-w-md relative'
      >
        {/* Logo */}
        <Link to='/' className='flex items-center justify-center gap-2 mb-8'>
          <div className='w-10 h-10 rounded-sm bg-gold flex items-center justify-center'>
            <FileText className='w-5 h-5 text-desk' />
          </div>
          <span className='text-2xl font-serif font-semibold text-paper'>
            ResumeAI
          </span>
        </Link>

        <div className='relative bg-paper rounded-sm p-8 shadow-2xl'>
          <div className='absolute left-0 top-0 bottom-0 w-[3px] bg-rust/70' />

          <div className='pl-2'>
            {success ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className='text-center'
              >
                <div className='w-14 h-14 rounded-full bg-gold/15 flex items-center justify-center mx-auto mb-4'>
                  <CheckCircle2 className='w-7 h-7 text-gold' />
                </div>
                <h1 className='font-serif text-xl font-semibold text-ink mb-2'>
                  Password reset!
                </h1>
                <p className='text-sm text-ink/60 mb-2'>
                  Your password has been updated successfully.
                </p>
                <p className='font-mono text-xs text-ink/40 mb-6'>
                  Redirecting you to login…
                </p>
                <Link to='/login'>
                  <Button className='w-full bg-rust hover:bg-rust-dark text-paper rounded-sm h-11'>
                    Go to Login
                  </Button>
                </Link>
              </motion.div>
            ) : (
              <>
                <div className='w-12 h-12 rounded-full bg-rust/10 flex items-center justify-center mx-auto mb-4'>
                  <Lock className='w-6 h-6 text-rust' />
                </div>

                <h1 className='font-serif text-xl font-semibold text-ink text-center mb-1'>
                  Set new password
                </h1>
                <p className='text-sm text-ink/55 text-center mb-6'>
                  Choose a strong password for your account.
                </p>

                <form onSubmit={handleSubmit} className='space-y-4'>
                  <div>
                    <Label
                      htmlFor='newPassword'
                      className='font-mono text-[10px] tracking-widest uppercase text-ink/50'
                    >
                      New Password
                    </Label>
                    <div className='relative mt-1.5'>
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
                        className='pr-10 border-ink/15 focus-visible:ring-rust/40 rounded-sm'
                      />
                      <button
                        type='button'
                        onClick={() => setShowPassword((v) => !v)}
                        className='absolute right-3 top-1/2 -translate-y-1/2 text-ink/40 hover:text-ink/60'
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
                                  : 'bg-ink/10'
                              }`}
                            />
                          ))}
                        </div>
                        <p className='font-mono text-[11px] text-ink/45'>
                          Strength:{' '}
                          <span className='font-semibold'>
                            {strengthLabel[strength] || 'Too weak'}
                          </span>
                        </p>
                      </div>
                    )}
                  </div>

                  <div>
                    <Label
                      htmlFor='confirmPassword'
                      className='font-mono text-[10px] tracking-widest uppercase text-ink/50'
                    >
                      Confirm Password
                    </Label>
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
                      className='mt-1.5 border-ink/15 focus-visible:ring-rust/40 rounded-sm'
                    />
                    {confirmPassword && newPassword !== confirmPassword && (
                      <p className='text-xs text-destructive mt-1 flex items-center gap-1'>
                        <AlertCircle className='w-3 h-3' />
                        Passwords do not match
                      </p>
                    )}
                  </div>

                  {error && (
                    <p className='text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-sm px-3 py-2'>
                      {error}
                    </p>
                  )}

                  <Button
                    type='submit'
                    disabled={
                      isLoading ||
                      (!!confirmPassword && newPassword !== confirmPassword)
                    }
                    className='w-full bg-rust hover:bg-rust-dark text-paper rounded-sm h-11'
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
                    className='text-sm text-ink/50 hover:text-rust transition-colors'
                  >
                    Request a new reset link
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  )
}