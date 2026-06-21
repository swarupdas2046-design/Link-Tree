  import { useState } from 'react'
  import { Link, Navigate, useLocation, useNavigate } from 'react-router'
  import LoadingSpinner from '../../../shared/components/LoadingSpinner.jsx'
  import useAuth from '../hooks/useAuth.js'

  const Login = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const { login, isAuthenticated, isAuthLoading } = useAuth()

    const [formData, setFormData] = useState({
      identifier: '',
      password: '',
    })
    const [fieldErrors, setFieldErrors] = useState({})
    const [submitError, setSubmitError] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleChange = (event) => {
      const { name, value } = event.target

      setFormData((currentFormData) => ({
        ...currentFormData,
        [name]: value,
      }))

      setFieldErrors((currentErrors) => ({
        ...currentErrors,
        [name]: '',
      }))
      setSubmitError('')
    }

    const handleSubmit = async (event) => {
      event.preventDefault()
      setFieldErrors({})
      setSubmitError('')
      setIsSubmitting(true)

      try {
        await login(formData)
        navigate(location.state?.from || '/dashboard', { replace: true })
      } catch (error) {
        const responseData = error.response?.data

        if (Array.isArray(responseData?.errors)) {
          const nextFieldErrors = {}

          responseData.errors.forEach(({ field, message }) => {
            if (!nextFieldErrors[field]) {
              nextFieldErrors[field] = message
            }
          })

          setFieldErrors(nextFieldErrors)
        } else {
          setSubmitError(
            responseData?.message || 'Login failed. Please try again.',
          )
        }
      } finally {
        setIsSubmitting(false)
      }
    }

    if (isAuthLoading) {
      return <LoadingSpinner message="Checking your session..." />
    }

    if (isAuthenticated) {
      return <Navigate to="/dashboard" replace />
    }

    return (
      <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,#164e63_0%,#0f172a_42%,#020617_100%)] px-4 py-12 text-slate-100">
        <section className="w-full max-w-md rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-8">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
              Linktree
            </p>
            <h1 className="mt-3 text-3xl font-bold">Welcome back</h1>
            <p className="mt-2 text-sm text-slate-400">
              Login with your email address or username.
            </p>
          </div>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="identifier"
                className="mb-2 block text-sm font-medium text-slate-200"
              >
                Email or username
              </label>
              <input
                id="identifier"
                name="identifier"
                type="text"
                value={formData.identifier}
                onChange={handleChange}
                autoComplete="username"
                placeholder="swarup or you@example.com"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400"
              />
              {fieldErrors.identifier && (
                <p className="mt-2 text-sm text-rose-300">
                  {fieldErrors.identifier}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-slate-200"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="current-password"
                placeholder="Your password"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400"
              />
              {fieldErrors.password && (
                <p className="mt-2 text-sm text-rose-300">
                  {fieldErrors.password}
                </p>
              )}
            </div>

            {submitError && (
              <div className="rounded-xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-200">
                {submitError}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-xl bg-cyan-400 px-4 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-400">
            New to Linktree?{' '}
            <Link
              to="/register"
              className="font-semibold text-cyan-300 hover:text-cyan-200"
            >
              Create an account
            </Link>
          </p>
        </section>
      </main>
    )
  }

  export default Login
