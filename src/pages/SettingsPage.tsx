/**
 * SettingsPage.tsx
 * Route: /settings -> <ProtectedRoute><SettingsPage /></ProtectedRoute>
 * Drop into src/pages/
 */
import { useState, useEffect } from 'react'
import { Settings, Shield, Loader2, Check } from 'lucide-react'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import { Button } from '@/components/ui/button'
import { authAPI } from '@/lib/api'
import { useAuth } from '@/contexts/AuthContext'

export default function SettingsPage() {
  const { user } = useAuth()
  const [otpEnabled, setOtpEnabled] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isToggling, setIsToggling] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    authAPI
      .me()
      .then(({ data }) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setOtpEnabled((data as any).otpEnabled ?? false)
        setIsLoading(false)
      })
      .catch(() => setIsLoading(false))
  }, [])

  async function handleToggleOtp() {
    setIsToggling(true)
    setError('')
    try {
      await authAPI.toggleOtp(!otpEnabled)
      setOtpEnabled((prev) => !prev)
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update setting')
    } finally {
      setIsToggling(false)
    }
  }

  return (
    <DashboardLayout>
      <div className='py-10 px-6'>
        <div className='max-w-xl mx-auto'>
          <div className='mb-8'>
            <h1 className='text-2xl font-bold text-foreground flex items-center gap-2'>
              <Settings className='w-6 h-6 text-primary' />
              Settings
            </h1>
            <p className='text-muted-foreground mt-1'>
              Manage your account preferences and security settings.
            </p>
          </div>

          {/* Security section */}
          <div className='bg-card border border-border rounded-2xl divide-y divide-border'>
            <div className='p-5'>
              <h2 className='text-sm font-semibold text-foreground flex items-center gap-2 mb-1'>
                <Shield className='w-4 h-4 text-primary' />
                Security
              </h2>
              <p className='text-xs text-muted-foreground'>
                Control how you sign in to your account.
              </p>
            </div>

            {/* OTP toggle row */}
            <div className='p-5 flex items-center justify-between gap-4'>
              <div className='min-w-0'>
                <p className='text-sm font-medium text-foreground'>
                  Two-factor authentication (OTP)
                </p>
                <p className='text-xs text-muted-foreground mt-0.5'>
                  When enabled, a 6-digit code will be sent to{' '}
                  <span className='font-medium text-foreground'>
                    {user?.email}
                  </span>{' '}
                  every time you log in.
                </p>
              </div>

              {isLoading ? (
                <Loader2 className='w-5 h-5 animate-spin text-muted-foreground shrink-0' />
              ) : (
                <button
                  type='button'
                  onClick={handleToggleOtp}
                  disabled={isToggling}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                    otpEnabled ? 'bg-primary' : 'bg-muted'
                  } ${isToggling ? 'opacity-60' : ''}`}
                  role='switch'
                  aria-checked={otpEnabled}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-lg transform transition duration-200 ${
                      otpEnabled ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              )}
            </div>

            {/* Status messages */}
            {(saved || error) && (
              <div
                className={`px-5 py-3 text-xs flex items-center gap-2 ${
                  error
                    ? 'text-destructive'
                    : 'text-emerald-600 dark:text-emerald-400'
                }`}
              >
                {error ? (
                  error
                ) : (
                  <>
                    <Check className='w-3.5 h-3.5' />
                    OTP {otpEnabled ? 'enabled' : 'disabled'} successfully
                  </>
                )}
              </div>
            )}

            {/* Explanation when enabled */}
            {otpEnabled && !isLoading && (
              <div className='px-5 py-4 bg-primary/5 rounded-b-2xl'>
                <p className='text-xs text-muted-foreground leading-relaxed'>
                  ✓ OTP is active. Next time you log in, after entering your
                  password you'll be asked for a 6-digit code sent to your
                  email. Codes expire after 10 minutes.
                </p>
              </div>
            )}
          </div>

          {/* Account info section */}
          <div className='bg-card border border-border rounded-2xl mt-4 divide-y divide-border'>
            <div className='p-5'>
              <h2 className='text-sm font-semibold text-foreground mb-1'>
                Account
              </h2>
            </div>
            <div className='p-5 space-y-3'>
              <div className='flex justify-between items-center'>
                <span className='text-sm text-muted-foreground'>Name</span>
                <span className='text-sm font-medium text-foreground'>
                  {user?.fullName}
                </span>
              </div>
              <div className='flex justify-between items-center'>
                <span className='text-sm text-muted-foreground'>Email</span>
                <span className='text-sm font-medium text-foreground'>
                  {user?.email}
                </span>
              </div>
              <div className='flex justify-between items-center'>
                <span className='text-sm text-muted-foreground'>Plan</span>
                <span
                  className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                    user?.role === 'pro'
                      ? 'bg-primary/10 text-primary'
                      : user?.role === 'admin'
                        ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                        : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {user?.role === 'admin'
                    ? 'Admin'
                    : user?.role === 'pro'
                      ? 'Pro'
                      : 'Free'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
