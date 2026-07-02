// /**
//  * OTPVerifyPage.tsx
//  * Shown after successful password login when user has OTP enabled.
//  * Route: /verify-otp (passes tempToken via location state)
//  * Drop into src/pages/
//  */
// import { useState, useRef, useEffect } from 'react'
// import { useLocation, useNavigate, Link } from 'react-router-dom'
// import { motion } from 'framer-motion'
// import { FileText, Loader2, ArrowLeft, Mail } from 'lucide-react'
// import { Button } from '@/components/ui/button'
// import { authAPI, setTokens } from '@/lib/api'

// export default function OTPVerifyPage() {
//   const location = useLocation()
//   const navigate = useNavigate()
//   const tempToken = (location.state as { tempToken?: string })?.tempToken

//   const [digits, setDigits] = useState(['', '', '', '', '', ''])
//   const [isVerifying, setIsVerifying] = useState(false)
//   const [error, setError] = useState('')
//   const inputRefs = useRef<Array<HTMLInputElement | null>>([])

//   // Redirect away if no tempToken in state
//   useEffect(() => {
//     if (!tempToken) navigate('/login', { replace: true })
//   }, [tempToken, navigate])

//   // Focus first input on mount
//   useEffect(() => {
//     inputRefs.current[0]?.focus()
//   }, [])

//   function handleDigitChange(index: number, value: string) {
//     // Only allow single digit
//     const digit = value.replace(/\D/g, '').slice(-1)
//     const next = [...digits]
//     next[index] = digit
//     setDigits(next)
//     setError('')

//     // Auto-advance
//     if (digit && index < 5) {
//       inputRefs.current[index + 1]?.focus()
//     }

//     // Auto-submit when all 6 filled
//     if (digit && index === 5) {
//       const code = [...next].join('')
//       if (code.length === 6) submitOtp(code)
//     }
//   }

//   function handleKeyDown(
//     index: number,
//     e: React.KeyboardEvent<HTMLInputElement>,
//   ) {
//     if (e.key === 'Backspace' && !digits[index] && index > 0) {
//       inputRefs.current[index - 1]?.focus()
//     }
//     // Allow paste
//     if (e.key === 'v' && (e.ctrlKey || e.metaKey)) return
//   }

//   function handlePaste(e: React.ClipboardEvent) {
//     const pasted = e.clipboardData
//       .getData('text')
//       .replace(/\D/g, '')
//       .slice(0, 6)
//     if (pasted.length === 6) {
//       e.preventDefault()
//       const next = pasted.split('')
//       setDigits(next)
//       setError('')
//       inputRefs.current[5]?.focus()
//       submitOtp(pasted)
//     }
//   }

//   async function submitOtp(code: string) {
//     if (!tempToken) return
//     setIsVerifying(true)
//     setError('')
//     try {
//       const { data } = await authAPI.verifyOtp(tempToken, code)
//       setTokens(data.accessToken, data.refreshToken)
//       navigate('/dashboard', { replace: true })
//     } catch (err) {
//       setError(
//         err instanceof Error ? err.message : 'Invalid code. Please try again.',
//       )
//       setDigits(['', '', '', '', '', ''])
//       inputRefs.current[0]?.focus()
//     } finally {
//       setIsVerifying(false)
//     }
//   }

//   function handleSubmit(e: React.FormEvent) {
//     e.preventDefault()
//     const code = digits.join('')
//     if (code.length < 6) {
//       setError('Please enter all 6 digits')
//       return
//     }
//     submitOtp(code)
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
//           {/* Icon */}
//           <div className='w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4'>
//             <Mail className='w-7 h-7 text-primary' />
//           </div>

//           <h1 className='text-xl font-bold text-foreground text-center mb-1'>
//             Check your email
//           </h1>
//           <p className='text-sm text-muted-foreground text-center mb-6'>
//             We sent a 6-digit code to your email address. Enter it below to sign
//             in.
//           </p>

//           <form onSubmit={handleSubmit} className='space-y-5'>
//             {/* OTP digit inputs */}
//             <div
//               className='flex items-center justify-center gap-2'
//               onPaste={handlePaste}
//             >
//               {digits.map((digit, i) => (
//                 <input
//                   key={i}
//                   ref={(el) => {
//                     inputRefs.current[i] = el
//                   }}
//                   type='text'
//                   inputMode='numeric'
//                   maxLength={1}
//                   value={digit}
//                   onChange={(e) => handleDigitChange(i, e.target.value)}
//                   onKeyDown={(e) => handleKeyDown(i, e)}
//                   disabled={isVerifying}
//                   className={`w-11 h-14 text-center text-xl font-bold border-2 rounded-xl bg-background text-foreground transition-colors focus:outline-none focus:border-primary ${
//                     error
//                       ? 'border-destructive'
//                       : digit
//                         ? 'border-primary'
//                         : 'border-border'
//                   } ${isVerifying ? 'opacity-60' : ''}`}
//                 />
//               ))}
//             </div>

//             {error && (
//               <p className='text-sm text-destructive text-center'>{error}</p>
//             )}

//             <Button
//               type='submit'
//               disabled={isVerifying || digits.join('').length < 6}
//               className='w-full bg-gradient-primary text-primary-foreground hover:opacity-90'
//             >
//               {isVerifying ? (
//                 <>
//                   <Loader2 className='w-4 h-4 mr-2 animate-spin' />
//                   Verifying…
//                 </>
//               ) : (
//                 'Verify & Sign In'
//               )}
//             </Button>
//           </form>

//           <div className='mt-4 text-center'>
//             <Link
//               to='/login'
//               className='text-sm text-muted-foreground hover:text-foreground flex items-center justify-center gap-1.5 transition-colors'
//             >
//               <ArrowLeft className='w-3.5 h-3.5' />
//               Back to login
//             </Link>
//           </div>

//           <p className='text-xs text-muted-foreground text-center mt-3'>
//             Code expires in 10 minutes. Didn't receive it? Check your spam
//             folder.
//           </p>
//         </div>
//       </motion.div>
//     </div>
//   )
// }

/**
 * OTPVerifyPage.tsx
 * Shown after successful password login when user has OTP enabled.
 * Route: /verify-otp (passes tempToken via location state)
 * Drop into src/pages/
 *
 * UPDATED: submitOtp now calls completeOtpLogin() from AuthContext instead
 * of calling setTokens() directly from '@/lib/api'. Previously, tokens were
 * persisted to localStorage but the in-memory `user` in AuthContext was
 * never updated, so isAuthenticated stayed false and ProtectedRoute
 * redirected straight back to /login even after a successful OTP check.
 */
import { useState, useRef, useEffect } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FileText, Loader2, ArrowLeft, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { authAPI } from '@/lib/api'
import { useAuth } from '@/contexts/AuthContext'

export default function OTPVerifyPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const { completeOtpLogin } = useAuth()
  const tempToken = (location.state as { tempToken?: string })?.tempToken

  const [digits, setDigits] = useState(['', '', '', '', '', ''])
  const [isVerifying, setIsVerifying] = useState(false)
  const [error, setError] = useState('')
  const inputRefs = useRef<Array<HTMLInputElement | null>>([])

  // Redirect away if no tempToken in state
  useEffect(() => {
    if (!tempToken) navigate('/login', { replace: true })
  }, [tempToken, navigate])

  // Focus first input on mount
  useEffect(() => {
    inputRefs.current[0]?.focus()
  }, [])

  function handleDigitChange(index: number, value: string) {
    // Only allow single digit
    const digit = value.replace(/\D/g, '').slice(-1)
    const next = [...digits]
    next[index] = digit
    setDigits(next)
    setError('')

    // Auto-advance
    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }

    // Auto-submit when all 6 filled
    if (digit && index === 5) {
      const code = [...next].join('')
      if (code.length === 6) submitOtp(code)
    }
  }

  function handleKeyDown(
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
    // Allow paste
    if (e.key === 'v' && (e.ctrlKey || e.metaKey)) return
  }

  function handlePaste(e: React.ClipboardEvent) {
    const pasted = e.clipboardData
      .getData('text')
      .replace(/\D/g, '')
      .slice(0, 6)
    if (pasted.length === 6) {
      e.preventDefault()
      const next = pasted.split('')
      setDigits(next)
      setError('')
      inputRefs.current[5]?.focus()
      submitOtp(pasted)
    }
  }

  async function submitOtp(code: string) {
    if (!tempToken) return
    setIsVerifying(true)
    setError('')
    try {
      const { data } = await authAPI.verifyOtp(tempToken, code)
      completeOtpLogin(data.accessToken, data.refreshToken, data.user)
      navigate('/dashboard', { replace: true })
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Invalid code. Please try again.',
      )
      setDigits(['', '', '', '', '', ''])
      inputRefs.current[0]?.focus()
    } finally {
      setIsVerifying(false)
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const code = digits.join('')
    if (code.length < 6) {
      setError('Please enter all 6 digits')
      return
    }
    submitOtp(code)
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
          {/* Icon */}
          <div className='w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4'>
            <Mail className='w-7 h-7 text-primary' />
          </div>

          <h1 className='text-xl font-bold text-foreground text-center mb-1'>
            Check your email
          </h1>
          <p className='text-sm text-muted-foreground text-center mb-6'>
            We sent a 6-digit code to your email address. Enter it below to sign
            in.
          </p>

          <form onSubmit={handleSubmit} className='space-y-5'>
            {/* OTP digit inputs */}
            <div
              className='flex items-center justify-center gap-2'
              onPaste={handlePaste}
            >
              {digits.map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => {
                    inputRefs.current[i] = el
                  }}
                  type='text'
                  inputMode='numeric'
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleDigitChange(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                  disabled={isVerifying}
                  className={`w-11 h-14 text-center text-xl font-bold border-2 rounded-xl bg-background text-foreground transition-colors focus:outline-none focus:border-primary ${
                    error
                      ? 'border-destructive'
                      : digit
                        ? 'border-primary'
                        : 'border-border'
                  } ${isVerifying ? 'opacity-60' : ''}`}
                />
              ))}
            </div>

            {error && (
              <p className='text-sm text-destructive text-center'>{error}</p>
            )}

            <Button
              type='submit'
              disabled={isVerifying || digits.join('').length < 6}
              className='w-full bg-gradient-primary text-primary-foreground hover:opacity-90'
            >
              {isVerifying ? (
                <>
                  <Loader2 className='w-4 h-4 mr-2 animate-spin' />
                  Verifying…
                </>
              ) : (
                'Verify & Sign In'
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

          <p className='text-xs text-muted-foreground text-center mt-3'>
            Code expires in 10 minutes. Didn't receive it? Check your spam
            folder.
          </p>
        </div>
      </motion.div>
    </div>
  )
}
