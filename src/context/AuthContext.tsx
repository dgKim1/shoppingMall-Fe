import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'

type AuthUser = {
  _id?: string
  [key: string]: unknown
}

type AuthState = {
  token: string | null
  user: AuthUser | null
}

type AuthContextValue = AuthState & {
  setAuth: (payload: { token: string; user: AuthUser }) => void
  clearAuth: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

const AUTH_KEY = 'auth'

const readStoredAuth = (): AuthState => {
  const raw = localStorage.getItem(AUTH_KEY)
  if (!raw) {
    return { token: null, user: null }
  }
  try {
    const parsed = JSON.parse(raw) as { token?: string; user?: AuthUser }
    return {
      token: parsed.token ?? null,
      user: parsed.user ?? null,
    }
  } catch {
    return { token: null, user: null }
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [auth, setAuthState] = useState<AuthState>(readStoredAuth)

  const setAuth = useCallback((payload: { token: string; user: AuthUser }) => {
    localStorage.setItem(AUTH_KEY, JSON.stringify(payload))
    localStorage.setItem('token', payload.token)
    setAuthState({ token: payload.token, user: payload.user })
  }, [])

  const clearAuth = useCallback(() => {
    localStorage.removeItem(AUTH_KEY)
    localStorage.removeItem('token')
    setAuthState({ token: null, user: null })
  }, [])

  const value = useMemo(
    () => ({
      token: auth.token,
      user: auth.user,
      setAuth,
      clearAuth,
    }),
    [auth.token, auth.user, clearAuth, setAuth],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return ctx
}
