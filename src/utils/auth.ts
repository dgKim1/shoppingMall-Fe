export type AuthPayload = {
  token?: string
  user?: unknown
  [key: string]: unknown
}

const AUTH_KEY = 'auth'

export const setAuth = (payload: AuthPayload) => {
  localStorage.setItem(AUTH_KEY, JSON.stringify(payload))
  if (payload.token) {
    localStorage.setItem('token', payload.token)
  }
  window.dispatchEvent(new Event('auth:change'))
}

export const clearAuth = () => {
  localStorage.removeItem(AUTH_KEY)
  localStorage.removeItem('token')
  window.dispatchEvent(new Event('auth:change'))
}

export const getAuth = () => {
  const raw = localStorage.getItem(AUTH_KEY)
  if (!raw) {
    return null
  }
  try {
    return JSON.parse(raw) as AuthPayload
  } catch {
    return null
  }
}

export const isAuthenticated = () => {
  const auth = getAuth()
  const token = auth?.token ?? auth?.accessToken
  return Boolean(token)
}
