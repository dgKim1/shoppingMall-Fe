import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useLoginWithEmail from '../../hooks/auth/useLoginWithEmail'
import useLoginWithGoogle from '../../hooks/auth/useLoginWithGoogle'
import { useAuth } from '../../context/AuthContext'

export default function LoginPage() {
  const navigate = useNavigate()
  const { setAuth } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  type AuthResponse = {
    status: string
    user: { _id?: string }
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
  const [googleButtonWidth, setGoogleButtonWidth] = useState(0)
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID
  const googleScriptSrc =
    import.meta.env.VITE_GOOGLE_SCRIPT_SRC

  const handleEmailSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    loginWithEmail.mutate({ email, password })
  }

  useEffect(() => {
    if (!googleClientId) {
      return
    }

    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[data-google-identity]',
    )
    if (!existingScript) {
      const script = document.createElement('script')
      script.src = googleScriptSrc
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
        Promise.resolve().then(() => {
          setGoogleReady(true)
          setGoogleError(null)
        })
      } else {
        existingScript.addEventListener(
          'load',
          () => {
            setGoogleReady(true)
            setGoogleError(null)
          },
          { once: true },
        )
      }
    }
  }, [googleClientId, googleScriptSrc])

  useEffect(() => {
    if (!googleReady || !googleClientId || !googleButtonRef.current) {
      return
    }

    const googleAccounts = window.google?.accounts?.id
    if (!googleAccounts) {
      if (googleRetryRef.current < 5) {
        googleRetryRef.current += 1
        setTimeout(() => setGoogleTick((prev) => prev + 1), 200)
        return
      }
      setTimeout(
        () => setGoogleError('Google Identity SDK is not available.'),
        0,
      )
      return
    }

    googleAccounts.initialize({
      client_id: googleClientId,
      callback: (response) => {
        loginWithGoogle.mutate({ idToken: response.credential })
      },
    })
    googleAccounts.renderButton(googleButtonRef.current, {
      theme: 'outline',
      size: 'large',
      shape: 'pill',
      width: googleButtonWidth > 0 ? String(googleButtonWidth) : '320',
    })
  }, [googleReady, googleTick, googleClientId, loginWithGoogle, googleButtonWidth])

  useEffect(() => {
    if (!googleButtonRef.current) {
      return
    }
    const updateWidth = () => {
      setGoogleButtonWidth(googleButtonRef.current?.offsetWidth ?? 0)
    }
    updateWidth()
    window.addEventListener('resize', updateWidth)
    return () => window.removeEventListener('resize', updateWidth)
  }, [])

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
        <div className="my-8 h-px bg-slate-200" />

      <div className="space-y-3">
        {!googleReady && !googleError && (
          <button
            type="button"
            className="h-11 w-full rounded-full border border-slate-200 text-sm font-semibold text-slate-600"
            disabled
          >
            Loading Google login...
          </button>
        )}
        <div ref={googleButtonRef} className="flex w-full justify-center" />
        {loginWithGoogle.isPending && (
          <p className="text-sm text-slate-500">Signing in with Google...</p>
        )}
        {(loginWithGoogle.isError || googleError || !googleClientId) && (
          <p className="text-sm text-rose-500">
            {!googleClientId
              ? 'Google Client ID is not configured.'
              : googleError ?? 'Google login failed.'}
          </p>
        )}
      </div>
      </form>

      
    </section>
  )
}
