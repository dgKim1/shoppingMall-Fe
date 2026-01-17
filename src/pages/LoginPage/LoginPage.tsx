import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useLoginWithEmail from '../../hooks/auth/useLoginWithEmail'
import useLoginWithGoogle from '../../hooks/auth/useLoginWithGoogle'
import { setAuth } from '../../utils/auth'

export default function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  type AuthResponse = {
    status: string
    user: unknown
    token: string
  }

  const loginWithEmail = useLoginWithEmail({
    onSuccess: (data: AuthResponse) => {
      setAuth(data)
      navigate('/')
    },
  })
  const loginWithGoogle = useLoginWithGoogle({
    onSuccess: (data: AuthResponse) => {
      setAuth(data)
      navigate('/')
    },
  })
  const googleButtonRef = useRef<HTMLDivElement | null>(null)
  const [googleReady, setGoogleReady] = useState(false)
  const [googleError, setGoogleError] = useState<string | null>(null)
  const [googleTick, setGoogleTick] = useState(0)
  const googleRetryRef = useRef(0)

  const handleEmailSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    loginWithEmail.mutate({ email, password })
  }

  useEffect(() => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID
    if (!clientId) {
      setGoogleError('Google Client ID is not configured.')
      return
    }

    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[data-google-identity]',
    )
    if (!existingScript) {
      const script = document.createElement('script')
      script.src = import.meta.env.VITE_GOOGLE_SCRIPT_SRC
      script.async = true
      script.defer = true
      script.dataset.googleIdentity = 'true'
      script.onload = () => {
        setGoogleReady(true)
        setGoogleError(null)
      }
      script.onerror = () =>
        setGoogleError('Google Identity script failed to load.')
      document.body.appendChild(script)
    } else {
      if (window.google?.accounts?.id) {
        setGoogleReady(true)
        setGoogleError(null)
      } else {
        existingScript.addEventListener('load', () => {
          setGoogleReady(true)
          setGoogleError(null)
        })
      }
    }
  }, [])

  useEffect(() => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID
    if (!googleReady || !clientId || !googleButtonRef.current) {
      return
    }

    const googleAccounts = window.google?.accounts?.id
    if (!googleAccounts) {
      if (googleRetryRef.current < 5) {
        googleRetryRef.current += 1
        setTimeout(() => setGoogleTick((prev) => prev + 1), 200)
        return
      }
      setGoogleError('Google Identity SDK is not available.')
      return
    }

    googleAccounts.initialize({
      client_id: clientId,
      callback: (response) => {
        loginWithGoogle.mutate({ idToken: response.credential })
      },
    })
    googleAccounts.renderButton(googleButtonRef.current, {
      theme: 'outline',
      size: 'large',
      shape: 'pill',
      width: '320',
    })
  }, [googleReady, googleTick, loginWithGoogle])

  return (
    <section className="mx-auto max-w-md px-6 py-16">
      <h1 className="text-3xl font-semibold text-slate-900">Login</h1>
      <p className="mt-2 text-sm text-slate-500">
        Sign in with email or Google.
      </p>

      <form className="mt-8 space-y-4" onSubmit={handleEmailSubmit}>
        <label className="block text-sm text-slate-600">
          Email
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-400"
            required
          />
        </label>
        <label className="block text-sm text-slate-600">
          Password
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-400"
            required
          />
        </label>
        <button
          type="submit"
          className="h-11 w-full rounded-full bg-slate-900 text-sm font-semibold text-white"
          disabled={loginWithEmail.isPending}
        >
          {loginWithEmail.isPending ? 'Signing in...' : 'Login'}
        </button>
        {loginWithEmail.isError && (
          <p className="text-sm text-rose-500">Email login failed.</p>
        )}
      </form>

      <div className="my-8 h-px bg-slate-200" />

      <div className="space-y-3">
        <div ref={googleButtonRef} className="flex justify-center" />
        {loginWithGoogle.isPending && (
          <p className="text-sm text-slate-500">Signing in with Google...</p>
        )}
        {(loginWithGoogle.isError || googleError) && (
          <p className="text-sm text-rose-500">
            {googleError ?? 'Google login failed.'}
          </p>
        )}
      </div>
    </section>
  )
}
