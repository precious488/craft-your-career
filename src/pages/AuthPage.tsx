// // /**
// //  * AuthPage.tsx — Login & Register page
// //  * Add route: <Route path="/login" element={<AuthPage />} /> in App.tsx
// //  * Add route: <Route path="/register" element={<AuthPage mode="register" />} />
// //  *
// //  * UPDATED: handleSubmit no longer unconditionally navigates to /dashboard
// //  * after login(). When OTP is required, AuthContext.login() already
// //  * navigates to /verify-otp internally — calling navigate('/dashboard')
// //  * here too was racing against that and bouncing the user back to /login
// //  * via ProtectedRoute (since no tokens had been set yet). Now we only
// //  * navigate to /dashboard when login() reports requiresOtp: false.
// //  */
// // import { useState } from 'react'
// // import { useNavigate, Link } from 'react-router-dom'
// // import { motion } from 'framer-motion'
// // import { FileText, Eye, EyeOff, Loader2 } from 'lucide-react'
// // import { Button } from '@/components/ui/button'
// // import { Input } from '@/components/ui/input'
// // import { Label } from '@/components/ui/label'
// // import { useAuth } from '@/contexts/AuthContext'

// // interface AuthPageProps {
// //   mode?: 'login' | 'register'
// // }

// // export default function AuthPage({
// //   mode: initialMode = 'login',
// // }: AuthPageProps) {
// //   const [mode, setMode] = useState(initialMode)
// //   const [showPassword, setShowPassword] = useState(false)
// //   const [isLoading, setIsLoading] = useState(false)
// //   const [error, setError] = useState('')

// //   const [form, setForm] = useState({ fullName: '', email: '', password: '' })
// //   const { login, register } = useAuth()
// //   const navigate = useNavigate()

// //   function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
// //     setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
// //     setError('')
// //   }

// //   async function handleSubmit(e: React.FormEvent) {
// //     e.preventDefault()
// //     setIsLoading(true)
// //     setError('')
// //     try {
// //       if (mode === 'login') {
// //         const result = await login(form.email, form.password)
// //         // If OTP is required, AuthContext.login() has already navigated
// //         // to /verify-otp with the tempToken in location state. Don't
// //         // navigate anywhere here — doing so would race that redirect.
// //         if (!result.requiresOtp) {
// //           navigate('/dashboard')
// //         }
// //       } else {
// //         await register(form.email, form.password, form.fullName)
// //         navigate('/dashboard')
// //       }
// //     } catch (err: unknown) {
// //       const msg = err instanceof Error ? err.message : 'Something went wrong'
// //       setError(msg)
// //     } finally {
// //       setIsLoading(false)
// //     }
// //   }

// //   return (
// //     <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-secondary/30 to-background px-4'>
// //       <motion.div
// //         initial={{ opacity: 0, y: 20 }}
// //         animate={{ opacity: 1, y: 0 }}
// //         className='w-full max-w-md'
// //       >
// //         {/* Logo */}
// //         <Link to='/' className='flex items-center justify-center gap-2 mb-8'>
// //           <div className='w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center'>
// //             <FileText className='w-5 h-5 text-white' />
// //           </div>
// //           <span className='text-2xl font-bold text-foreground'>ResumeAI</span>
// //         </Link>

// //         <div className='bg-card border border-border rounded-2xl p-8 shadow-lg'>
// //           <h1 className='text-2xl font-bold text-foreground mb-1'>
// //             {mode === 'login' ? 'Welcome back' : 'Create your account'}
// //           </h1>
// //           <p className='text-muted-foreground mb-6'>
// //             {mode === 'login'
// //               ? 'Sign in to access your resumes'
// //               : 'Start building your professional resume'}
// //           </p>

// //           <form onSubmit={handleSubmit} className='space-y-4'>
// //             {mode === 'register' && (
// //               <div>
// //                 <Label htmlFor='fullName'>Full Name</Label>
// //                 <Input
// //                   id='fullName'
// //                   name='fullName'
// //                   placeholder='Jane Smith'
// //                   value={form.fullName}
// //                   onChange={handleChange}
// //                   required
// //                   className='mt-1'
// //                 />
// //               </div>
// //             )}

// //             <div>
// //               <Label htmlFor='email'>Email</Label>
// //               <Input
// //                 id='email'
// //                 name='email'
// //                 type='email'
// //                 placeholder='jane@example.com'
// //                 value={form.email}
// //                 onChange={handleChange}
// //                 required
// //                 className='mt-1'
// //               />
// //             </div>

// //             <div>
// //               <Label htmlFor='password'>Password</Label>
// //               <div className='relative mt-1'>
// //                 <Input
// //                   id='password'
// //                   name='password'
// //                   type={showPassword ? 'text' : 'password'}
// //                   placeholder={
// //                     mode === 'register'
// //                       ? 'Min 8 chars, 1 uppercase, 1 number'
// //                       : '••••••••'
// //                   }
// //                   value={form.password}
// //                   onChange={handleChange}
// //                   required
// //                   className='pr-10'
// //                 />
// //                 <button
// //                   type='button'
// //                   onClick={() => setShowPassword((v) => !v)}
// //                   className='absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground'
// //                 >
// //                   {showPassword ? (
// //                     <EyeOff className='w-4 h-4' />
// //                   ) : (
// //                     <Eye className='w-4 h-4' />
// //                   )}
// //                 </button>
// //               </div>
// //             </div>

// //             {error && (
// //               <div className='text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg px-3 py-2'>
// //                 {error}
// //               </div>
// //             )}

// //             <Button
// //               type='submit'
// //               disabled={isLoading}
// //               className='w-full bg-gradient-primary text-white hover:opacity-90'
// //             >
// //               {isLoading ? (
// //                 <>
// //                   <Loader2 className='w-4 h-4 mr-2 animate-spin' />
// //                   Please wait…
// //                 </>
// //               ) : mode === 'login' ? (
// //                 'Sign In'
// //               ) : (
// //                 'Create Account'
// //               )}
// //             </Button>
// //           </form>

// //           <p className='text-center text-sm text-muted-foreground mt-6'>
// //             {mode === 'login'
// //               ? "Don't have an account?"
// //               : 'Already have an account?'}{' '}
// //             <button
// //               onClick={() => {
// //                 setMode(mode === 'login' ? 'register' : 'login')
// //                 setError('')
// //               }}
// //               className='text-primary font-medium hover:underline'
// //             >
// //               {mode === 'login' ? 'Sign up free' : 'Sign in'}
// //             </button>
// //           </p>
// //         </div>
// //       </motion.div>
// //     </div>
// //   )
// // }
// /**
//  * AuthPage.tsx — UPDATED
//  * Changes from previous version:
//  * 1. Shows success message from location state (e.g. after password reset)
//  * 2. Adds "Forgot password?" link below the password field on login mode
//  *
//  * Replace src/pages/AuthPage.tsx with this.
//  */
// import { useState } from 'react'
// import { useNavigate, Link, useLocation } from 'react-router-dom'
// import { motion } from 'framer-motion'
// import { FileText, Eye, EyeOff, Loader2, CheckCircle2 } from 'lucide-react'
// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
// import { Label } from '@/components/ui/label'
// import { useAuth } from '@/contexts/AuthContext'
// import { APIError } from '@/lib/api'

// interface AuthPageProps {
//   mode?: 'login' | 'register'
// }

// export default function AuthPage({
//   mode: initialMode = 'login',
// }: AuthPageProps) {
//   const [mode, setMode] = useState(initialMode)
//   const [showPassword, setShowPassword] = useState(false)
//   const [isLoading, setIsLoading] = useState(false)
//   const [error, setError] = useState('')
//   const [form, setForm] = useState({ fullName: '', email: '', password: '' })

//   const { login, register } = useAuth()
//   const navigate = useNavigate()
//   const location = useLocation()

//   // Success message from password reset redirect
//   const successMessage = (location.state as { message?: string })?.message

//   function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
//     setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
//     setError('')
//   }

//   async function handleSubmit(e: React.FormEvent) {
//     e.preventDefault()
//     setIsLoading(true)
//     setError('')
//     try {
//       if (mode === 'login') {
//         const result = await login(form.email, form.password)
//         // login() returns undefined normally, or { requiresOtp: true } for OTP
//         // Only navigate to dashboard if OTP is NOT required
//         if (!(result as any)?.requiresOtp) {
//           navigate('/dashboard')
//         }
//       } else {
//         await register(form.email, form.password, form.fullName)
//         navigate('/dashboard')
//       }
//     } catch (err: unknown) {
//       if (
//         err instanceof APIError &&
//         err.body &&
//         typeof err.body === 'object' &&
//         'details' in err.body
//       ) {
//         const details = (err.body as { details?: Record<string, string[]> })
//           .details
//         if (details) {
//           const allMessages = Object.values(details).flat()
//           setError(allMessages.join(' '))
//         } else {
//           setError(err.message)
//         }
//       } else {
//         const msg = err instanceof Error ? err.message : 'Something went wrong'
//         setError(msg)
//       }
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
//           {/* Success message from password reset */}
//           {successMessage && (
//             <motion.div
//               initial={{ opacity: 0, y: -8 }}
//               animate={{ opacity: 1, y: 0 }}
//               className='flex items-start gap-2 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl px-4 py-3 mb-5'
//             >
//               <CheckCircle2 className='w-4 h-4 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0' />
//               <p className='text-sm text-emerald-700 dark:text-emerald-400'>
//                 {successMessage}
//               </p>
//             </motion.div>
//           )}

//           <h1 className='text-2xl font-bold text-foreground mb-1'>
//             {mode === 'login' ? 'Welcome back' : 'Create your account'}
//           </h1>
//           <p className='text-muted-foreground mb-6'>
//             {mode === 'login'
//               ? 'Sign in to access your resumes'
//               : 'Start building your professional resume'}
//           </p>

//           <form onSubmit={handleSubmit} className='space-y-4'>
//             {mode === 'register' && (
//               <div>
//                 <Label htmlFor='fullName'>Full Name</Label>
//                 <Input
//                   id='fullName'
//                   name='fullName'
//                   placeholder='Jane Smith'
//                   value={form.fullName}
//                   onChange={handleChange}
//                   required
//                   className='mt-1'
//                 />
//               </div>
//             )}

//             <div>
//               <Label htmlFor='email'>Email</Label>
//               <Input
//                 id='email'
//                 name='email'
//                 type='email'
//                 placeholder='jane@example.com'
//                 value={form.email}
//                 onChange={handleChange}
//                 required
//                 className='mt-1'
//               />
//             </div>

//             <div>
//               <div className='flex items-center justify-between mb-1'>
//                 <Label htmlFor='password'>Password</Label>
//                 {mode === 'login' && (
//                   <Link
//                     to='/forgot-password'
//                     className='text-xs text-primary hover:underline'
//                   >
//                     Forgot password?
//                   </Link>
//                 )}
//               </div>
//               <div className='relative'>
//                 <Input
//                   id='password'
//                   name='password'
//                   type={showPassword ? 'text' : 'password'}
//                   placeholder={
//                     mode === 'register'
//                       ? 'Min 8 chars, 1 uppercase, 1 number'
//                       : '••••••••'
//                   }
//                   value={form.password}
//                   onChange={handleChange}
//                   required
//                   className='pr-10'
//                 />
//                 <button
//                   type='button'
//                   onClick={() => setShowPassword((v) => !v)}
//                   className='absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground'
//                 >
//                   {showPassword ? (
//                     <EyeOff className='w-4 h-4' />
//                   ) : (
//                     <Eye className='w-4 h-4' />
//                   )}
//                 </button>
//               </div>
//             </div>
//             {mode === 'register' && form.password && (
//               <ul className='text-xs space-y-0.5 mt-1'>
//                 <li
//                   className={
//                     form.password.length >= 8
//                       ? 'text-emerald-600'
//                       : 'text-muted-foreground'
//                   }
//                 >
//                   {form.password.length >= 8 ? '✓' : '○'} At least 8 characters
//                 </li>
//                 <li
//                   className={
//                     /[A-Z]/.test(form.password)
//                       ? 'text-emerald-600'
//                       : 'text-muted-foreground'
//                   }
//                 >
//                   {/[A-Z]/.test(form.password) ? '✓' : '○'} One uppercase letter
//                 </li>
//                 <li
//                   className={
//                     /[0-9]/.test(form.password)
//                       ? 'text-emerald-600'
//                       : 'text-muted-foreground'
//                   }
//                 >
//                   {/[0-9]/.test(form.password) ? '✓' : '○'} One number
//                 </li>
//               </ul>
//             )}

//             {error && (
//               <div className='text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg px-3 py-2'>
//                 {error}
//               </div>
//             )}

//             <Button
//               type='submit'
//               disabled={isLoading}
//               className='w-full bg-gradient-primary text-white hover:opacity-90'
//             >
//               {isLoading ? (
//                 <>
//                   <Loader2 className='w-4 h-4 mr-2 animate-spin' />
//                   Please wait…
//                 </>
//               ) : mode === 'login' ? (
//                 'Sign In'
//               ) : (
//                 'Create Account'
//               )}
//             </Button>
//           </form>

//           <p className='text-center text-sm text-muted-foreground mt-6'>
//             {mode === 'login'
//               ? "Don't have an account?"
//               : 'Already have an account?'}{' '}
//             <button
//               onClick={() => {
//                 setMode(mode === 'login' ? 'register' : 'login')
//                 setError('')
//               }}
//               className='text-primary font-medium hover:underline'
//             >
//               {mode === 'login' ? 'Sign up free' : 'Sign in'}
//             </button>
//           </p>
//         </div>
//       </motion.div>
//     </div>
//   )
// }
/**
 * AuthPage.tsx — UPDATED
 * Changes from previous version:
 * 1. Shows success message from location state (e.g. after password reset)
 * 2. Adds "Forgot password?" link below the password field on login mode
 *
 * Replace src/pages/AuthPage.tsx with this.
 */
import { useState } from 'react'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FileText, Eye, EyeOff, Loader2, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/contexts/AuthContext'
import { APIError } from '@/lib/api'

interface AuthPageProps {
  mode?: 'login' | 'register'
}

export default function AuthPage({
  mode: initialMode = 'login',
}: AuthPageProps) {
  const [mode, setMode] = useState(initialMode)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ fullName: '', email: '', password: '' })

  const { login, register } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  // Success message from password reset redirect
  const successMessage = (location.state as { message?: string })?.message

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
    setError('')
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    try {
      if (mode === 'login') {
        const result = await login(form.email, form.password)
        if (!(result as any)?.requiresOtp) {
          navigate('/dashboard')
        }
      } else {
        await register(form.email, form.password, form.fullName)
        navigate('/dashboard')
      }
    } catch (err: unknown) {
      if (
        err instanceof APIError &&
        err.body &&
        typeof err.body === 'object' &&
        'details' in err.body
      ) {
        const details = (err.body as { details?: Record<string, string[]> })
          .details
        if (details) {
          const allMessages = Object.values(details).flat()
          setError(allMessages.join(' '))
        } else {
          setError(err.message)
        }
      } else {
        const msg = err instanceof Error ? err.message : 'Something went wrong'
        setError(msg)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-desk px-4 relative overflow-hidden'>
      <div
        className='absolute inset-0 bg-cover'
        style={{
          backgroundImage: "url('public/3.jpg')",
          backgroundPosition: 'center 20%',
          filter: 'sepia(0.35) saturate(1.1) brightness(0.4)',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className='w-full max-w-md relative'
      >
        {/* Logo */}
        <Link to='/' className='flex items-center justify-center gap-2 mb-8'>
          <div className='w-10 h-10 rounded-sm flex items-center justify-center'>
            <FileText className='w-5 h-5 text-desk' />
          </div>
          <span className='text-2xl font-serif font-semibold text-paper'>
            ResumeAI
          </span>
        </Link>

        <div className='relative bg-paper rounded-sm p-8 shadow-2xl'>
          <div className='absolute left-0 top-0 bottom-0 w-[3px] bg-rust/70' />

          <div className='pl-2'>
            {/* Success message from password reset */}
            {successMessage && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className='flex items-start gap-2 bg-gold/10 border border-gold/30 rounded-sm px-4 py-3 mb-5'
              >
                <CheckCircle2 className='w-4 h-4 text-gold mt-0.5 shrink-0' />
                <p className='text-sm text-ink/70'>{successMessage}</p>
              </motion.div>
            )}

            <h1 className='font-serif text-2xl font-semibold text-ink mb-1'>
              {mode === 'login' ? 'Welcome back' : 'Create your account'}
            </h1>
            <p className='text-ink/55 mb-6 text-sm'>
              {mode === 'login'
                ? 'Sign in to access your resumes'
                : 'Start building your professional resume'}
            </p>

            <form onSubmit={handleSubmit} className='space-y-4'>
              {mode === 'register' && (
                <div>
                  <Label
                    htmlFor='fullName'
                    className='font-mono text-[10px] tracking-widest uppercase text-ink/50'
                  >
                    Full Name
                  </Label>
                  <Input
                    id='fullName'
                    name='fullName'
                    placeholder='Jane Smith'
                    value={form.fullName}
                    onChange={handleChange}
                    required
                    className='mt-1.5 border-ink/15 focus-visible:ring-rust/40 rounded-sm'
                  />
                </div>
              )}

              <div>
                <Label
                  htmlFor='email'
                  className='font-mono text-[10px] tracking-widest uppercase text-ink/50'
                >
                  Email
                </Label>
                <Input
                  id='email'
                  name='email'
                  type='email'
                  placeholder='jane@example.com'
                  value={form.email}
                  onChange={handleChange}
                  required
                  className='mt-1.5 border-ink/15 focus-visible:ring-rust/40 rounded-sm'
                />
              </div>

              <div>
                <div className='flex items-center justify-between mb-1.5'>
                  <Label
                    htmlFor='password'
                    className='font-mono text-[10px] tracking-widest uppercase text-ink/50'
                  >
                    Password
                  </Label>
                  {mode === 'login' && (
                    <Link
                      to='/forgot-password'
                      className='text-xs text-rust hover:underline'
                    >
                      Forgot password?
                    </Link>
                  )}
                </div>
                <div className='relative'>
                  <Input
                    id='password'
                    name='password'
                    type={showPassword ? 'text' : 'password'}
                    placeholder={
                      mode === 'register'
                        ? 'Min 8 chars, 1 uppercase, 1 number'
                        : '••••••••'
                    }
                    value={form.password}
                    onChange={handleChange}
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
              </div>
              {mode === 'register' && form.password && (
                <ul className='font-mono text-[11px] space-y-1 mt-1'>
                  <li
                    className={
                      form.password.length >= 8 ? 'text-rust' : 'text-ink/35'
                    }
                  >
                    {form.password.length >= 8 ? '✓' : '○'} At least 8
                    characters
                  </li>
                  <li
                    className={
                      /[A-Z]/.test(form.password) ? 'text-rust' : 'text-ink/35'
                    }
                  >
                    {/[A-Z]/.test(form.password) ? '✓' : '○'} One uppercase
                    letter
                  </li>
                  <li
                    className={
                      /[0-9]/.test(form.password) ? 'text-rust' : 'text-ink/35'
                    }
                  >
                    {/[0-9]/.test(form.password) ? '✓' : '○'} One number
                  </li>
                </ul>
              )}

              {error && (
                <div className='text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-sm px-3 py-2'>
                  {error}
                </div>
              )}

              <Button
                type='submit'
                disabled={isLoading}
                className='w-full bg-rust hover:bg-rust-dark text-paper rounded-sm h-11'
              >
                {isLoading ? (
                  <>
                    <Loader2 className='w-4 h-4 mr-2 animate-spin' />
                    Please wait…
                  </>
                ) : mode === 'login' ? (
                  'Sign In'
                ) : (
                  'Create Account'
                )}
              </Button>
            </form>

            <p className='text-center text-sm text-ink/55 mt-6'>
              {mode === 'login'
                ? "Don't have an account?"
                : 'Already have an account?'}{' '}
              <button
                onClick={() => {
                  setMode(mode === 'login' ? 'register' : 'login')
                  setError('')
                }}
                className='text-rust font-medium hover:underline'
              >
                {mode === 'login' ? 'Sign up free' : 'Sign in'}
              </button>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}