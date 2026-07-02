// // // /**
// // //  * AuthContext.tsx
// // //  * Drop this into src/contexts/ — provides useAuth() hook to the whole app.
// // //  */
// // // import React, {
// // //   createContext,
// // //   useContext,
// // //   useState,
// // //   useEffect,
// // //   useCallback,
// // //   ReactNode,
// // // } from 'react'
// // // import {
// // //   authAPI,
// // //   setTokens,
// // //   clearTokens,
// // //   getRefreshToken,
// // //   AuthUser,
// // // } from '@/lib/api'

// // // interface AuthContextValue {
// // //   user: AuthUser | null
// // //   isLoading: boolean
// // //   isAuthenticated: boolean
// // //   login: (email: string, password: string) => Promise<void>
// // //   register: (email: string, password: string, fullName: string) => Promise<void>
// // //   logout: () => Promise<void>
// // // }

// // // const AuthContext = createContext<AuthContextValue | null>(null)

// // // export function AuthProvider({ children }: { children: ReactNode }) {
// // //   const [user, setUser] = useState<AuthUser | null>(null)
// // //   const [isLoading, setIsLoading] = useState(true)

// // //   // On mount — try to restore session
// // //   useEffect(() => {
// // //     authAPI
// // //       .me()
// // //       .then(({ data }) => setUser(data))
// // //       .catch(() => clearTokens())
// // //       .finally(() => setIsLoading(false))
// // //   }, [])

// // //   const login = useCallback(async (email: string, password: string) => {
// // //     const { data } = await authAPI.login({ email, password })
// // //     setTokens(data.accessToken, data.refreshToken)
// // //     setUser(data.user)
// // //   }, [])

// // //   const register = useCallback(
// // //     async (email: string, password: string, fullName: string) => {
// // //       const { data } = await authAPI.register({ email, password, fullName })
// // //       setTokens(data.accessToken, data.refreshToken)
// // //       setUser(data.user)
// // //     },
// // //     [],
// // //   )

// // //   const logout = useCallback(async () => {
// // //     const refreshToken = getRefreshToken()
// // //     if (refreshToken) {
// // //       await authAPI.logout(refreshToken).catch(() => {})
// // //     }
// // //     clearTokens()
// // //     setUser(null)
// // //   }, [])

// // //   return (
// // //     <AuthContext.Provider
// // //       value={{
// // //         user,
// // //         isLoading,
// // //         isAuthenticated: !!user,
// // //         login,
// // //         register,
// // //         logout,
// // //       }}
// // //     >
// // //       {children}
// // //     </AuthContext.Provider>
// // //   )
// // // }

// // // export function useAuth(): AuthContextValue {
// // //   const ctx = useContext(AuthContext)
// // //   if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
// // //   return ctx
// // // }

// // /**
// //  * AuthContext.tsx — UPDATED
// //  * Changes from previous version:
// //  * - login() now detects requiresOtp response and navigates to /verify-otp
// //  *   with tempToken in location state instead of setting the user directly
// //  *
// //  * Replace src/contexts/AuthContext.tsx with this.
// //  */
// // import React, {
// //   createContext,
// //   useContext,
// //   useState,
// //   useEffect,
// //   useCallback,
// //   ReactNode,
// // } from 'react'
// // import { useNavigate } from 'react-router-dom'
// // import {
// //   authAPI,
// //   setTokens,
// //   clearTokens,
// //   getRefreshToken,
// //   getAccessToken,
// //   AuthUser,
// // } from '@/lib/api'

// // interface AuthContextValue {
// //   user: AuthUser | null
// //   isLoading: boolean
// //   isAuthenticated: boolean
// //   login: (email: string, password: string) => Promise<void>
// //   register: (email: string, password: string, fullName: string) => Promise<void>
// //   logout: () => Promise<void>
// // }

// // const AuthContext = createContext<AuthContextValue | null>(null)

// // export function AuthProvider({ children }: { children: ReactNode }) {
// //   const [user, setUser] = useState<AuthUser | null>(null)
// //   const [isLoading, setIsLoading] = useState(true)
// //   const navigate = useNavigate()

// //   // On mount — try to restore session
// //   useEffect(() => {
// //     const token = getAccessToken()
// //     if (!token) {
// //       setIsLoading(false)
// //       return
// //     }
// //     authAPI
// //       .me()
// //       .then(({ data }) => setUser(data))
// //       .catch(() => clearTokens())
// //       .finally(() => setIsLoading(false))
// //   }, [])

// //   const login = useCallback(
// //     async (email: string, password: string) => {
// //       const response = await authAPI.login({ email, password })
// //       const { data } = response

// //       // ─── OTP required ─────────────────────────────────────────
// //       if ((data as any).requiresOtp) {
// //         const { tempToken } = data as any
// //         console.log('OTP required, navigating with token:', tempToken)
// //         navigate('/verify-otp', { state: { tempToken } })
// //         return
// //       }

// //       // ─── Normal login ─────────────────────────────────────────
// //       const { accessToken, refreshToken, user: loggedInUser } = data as any
// //       setTokens(accessToken, refreshToken)
// //       setUser(loggedInUser)
// //     },
// //     [navigate],
// //   )

// //   const register = useCallback(
// //     async (email: string, password: string, fullName: string) => {
// //       const { data } = await authAPI.register({ email, password, fullName })
// //       setTokens(data.accessToken, data.refreshToken)
// //       setUser(data.user)
// //     },
// //     [],
// //   )

// //   const logout = useCallback(async () => {
// //     const refreshToken = getRefreshToken()
// //     if (refreshToken) {
// //       await authAPI.logout(refreshToken).catch(() => {})
// //     }
// //     clearTokens()
// //     setUser(null)
// //   }, [])

// //   return (
// //     <AuthContext.Provider
// //       value={{
// //         user,
// //         isLoading,
// //         isAuthenticated: !!user,
// //         login,
// //         register,
// //         logout,
// //       }}
// //     >
// //       {children}
// //     </AuthContext.Provider>
// //   )
// // }

// // export function useAuth(): AuthContextValue {
// //   const ctx = useContext(AuthContext)
// //   if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
// //   return ctx
// // }

// /**
//  * AuthContext.tsx — UPDATED
//  * Changes from previous version:
//  * - login() now detects requiresOtp response and navigates to /verify-otp
//  *   with tempToken in location state instead of setting the user directly
//  * - login() now RETURNS { requiresOtp: boolean } so callers (e.g. AuthPage)
//  *   know whether to navigate to /dashboard themselves. Previously, login()
//  *   resolved successfully in both cases, which caused AuthPage to always
//  *   call navigate('/dashboard') right after — even when OTP was required —
//  *   racing against the navigate('/verify-otp') call made inside login().
//  *
//  * Replace src/contexts/AuthContext.tsx with this.
//  */
// import React, {
//   createContext,
//   useContext,
//   useState,
//   useEffect,
//   useCallback,
//   ReactNode,
// } from 'react'
// import { useNavigate } from 'react-router-dom'
// import {
//   authAPI,
//   setTokens,
//   clearTokens,
//   getRefreshToken,
//   getAccessToken,
//   AuthUser,
// } from '@/lib/api'

// interface AuthContextValue {
//   user: AuthUser | null
//   isLoading: boolean
//   isAuthenticated: boolean
//   login: (email: string, password: string) => Promise<{ requiresOtp: boolean }>
//   register: (email: string, password: string, fullName: string) => Promise<void>
//   logout: () => Promise<void>
// }

// interface AuthContextValue {
//   user: AuthUser | null
//   isLoading: boolean
//   isAuthenticated: boolean
//   login: (email: string, password: string) => Promise<{ requiresOtp: boolean }>
//   register: (email: string, password: string, fullName: string) => Promise<void>
//   completeOtpLogin: (
//     accessToken: string,
//     refreshToken: string,
//     user: AuthUser,
//   ) => void
//   logout: () => Promise<void>
// }

// const AuthContext = createContext<AuthContextValue | null>(null)

// export function AuthProvider({ children }: { children: ReactNode }) {
//   const [user, setUser] = useState<AuthUser | null>(null)
//   const [isLoading, setIsLoading] = useState(true)
//   const navigate = useNavigate()

//   // On mount — try to restore session
//   useEffect(() => {
//     const token = getAccessToken()
//     if (!token) {
//       setIsLoading(false)
//       return
//     }
//     authAPI
//       .me()
//       .then(({ data }) => setUser(data))
//       .catch(() => clearTokens())
//       .finally(() => setIsLoading(false))
//   }, [])

//   const login = useCallback(
//     async (email: string, password: string) => {
//       const response = await authAPI.login({ email, password })
//       const { data } = response

//       // ─── OTP required ─────────────────────────────────────────
//       if ((data as any).requiresOtp) {
//         const { tempToken } = data as any
//         navigate('/verify-otp', { state: { tempToken } })
//         return { requiresOtp: true }
//       }

//       // ─── Normal login ─────────────────────────────────────────
//       const { accessToken, refreshToken, user: loggedInUser } = data as any
//       setTokens(accessToken, refreshToken)
//       setUser(loggedInUser)
//       return { requiresOtp: false }
//     },
//     [navigate],
//   )

//   const register = useCallback(
//     async (email: string, password: string, fullName: string) => {
//       const { data } = await authAPI.register({ email, password, fullName })
//       setTokens(data.accessToken, data.refreshToken)
//       setUser(data.user)
//     },
//     [],
//   )

//   const logout = useCallback(async () => {
//     const refreshToken = getRefreshToken()
//     if (refreshToken) {
//       await authAPI.logout(refreshToken).catch(() => {})
//     }
//     clearTokens()
//     setUser(null)
//   }, [])

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         isLoading,
//         isAuthenticated: !!user,
//         login,
//         register,
//         logout,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   )
// }

// export function useAuth(): AuthContextValue {
//   const ctx = useContext(AuthContext)
//   if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
//   return ctx
// }

/**
 * AuthContext.tsx — UPDATED
 * Changes from previous version:
 * - login() now detects requiresOtp response and navigates to /verify-otp
 *   with tempToken in location state instead of setting the user directly
 * - login() now RETURNS { requiresOtp: boolean } so callers (e.g. AuthPage)
 *   know whether to navigate to /dashboard themselves. Previously, login()
 *   resolved successfully in both cases, which caused AuthPage to always
 *   call navigate('/dashboard') right after — even when OTP was required —
 *   racing against the navigate('/verify-otp') call made inside login().
 * - Added completeOtpLogin(accessToken, refreshToken, user), which
 *   OTPVerifyPage calls after a successful /auth/verify-otp response.
 *   Previously OTPVerifyPage called setTokens() directly from '@/lib/api'
 *   but never updated the in-memory `user` state here, so isAuthenticated
 *   stayed false and ProtectedRoute bounced the user straight back to
 *   /login even though tokens were correctly stored.
 *
 * Replace src/contexts/AuthContext.tsx with this.
 */
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react'
import { useNavigate } from 'react-router-dom'
import {
  authAPI,
  setTokens,
  clearTokens,
  getRefreshToken,
  getAccessToken,
  AuthUser,
} from '@/lib/api'

interface AuthContextValue {
  user: AuthUser | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<{ requiresOtp: boolean }>
  register: (email: string, password: string, fullName: string) => Promise<void>
  completeOtpLogin: (
    accessToken: string,
    refreshToken: string,
    user: AuthUser,
  ) => void
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  // On mount — try to restore session
  useEffect(() => {
    const token = getAccessToken()
    if (!token) {
      setIsLoading(false)
      return
    }
    authAPI
      .me()
      .then(({ data }) => setUser(data))
      .catch(() => clearTokens())
      .finally(() => setIsLoading(false))
  }, [])

  const login = useCallback(
    async (email: string, password: string) => {
      const response = await authAPI.login({ email, password })
      const { data } = response

      // ─── OTP required ─────────────────────────────────────────
      if ((data as any).requiresOtp) {
        const { tempToken } = data as any
        navigate('/verify-otp', { state: { tempToken } })
        return { requiresOtp: true }
      }

      // ─── Normal login ─────────────────────────────────────────
      const { accessToken, refreshToken, user: loggedInUser } = data as any
      setTokens(accessToken, refreshToken)
      setUser(loggedInUser)
      return { requiresOtp: false }
    },
    [navigate],
  )

  const register = useCallback(
    async (email: string, password: string, fullName: string) => {
      const { data } = await authAPI.register({ email, password, fullName })
      setTokens(data.accessToken, data.refreshToken)
      setUser(data.user)
    },
    [],
  )

  // Called by OTPVerifyPage after a successful /auth/verify-otp response.
  // Mirrors what login()/register() do: persist tokens AND update the
  // in-memory user so isAuthenticated flips to true before navigating.
  const completeOtpLogin = useCallback(
    (accessToken: string, refreshToken: string, user: AuthUser) => {
      setTokens(accessToken, refreshToken)
      setUser(user)
    },
    [],
  )

  const logout = useCallback(async () => {
    const refreshToken = getRefreshToken()
    if (refreshToken) {
      await authAPI.logout(refreshToken).catch(() => {})
    }
    clearTokens()
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        completeOtpLogin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
