import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router'
import LoadingSpinner from '../../../shared/components/LoadingSpinner.jsx'
import useAuth from '../hooks/useAuth.js'

const Register = () => {
  const navigate = useNavigate()
  const { register, isAuthenticated, isAuthLoading } = useAuth()

  const [formData, setFormData] = useState({
    username: '',
    email: '',
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
      await register(formData)
      navigate('/dashboard', { replace: true })
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
          responseData?.message || 'Registration failed. Please try again.',
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
          <h1 className="mt-3 text-3xl font-bold">Create your account</h1>
          <p className="mt-2 text-sm text-slate-400">
            Claim your profile and start sharing your links.
          </p>
        </div>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="username"
              className="mb-2 block text-sm font-medium text-slate-200"
            >
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              autoComplete="username"
              placeholder="swarup123"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400"
            />
            {fieldErrors.username && (
              <p className="mt-2 text-sm text-rose-300">
                {fieldErrors.username}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-slate-200"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              placeholder="you@example.com"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400"
            />
            {fieldErrors.email && (
              <p className="mt-2 text-sm text-rose-300">{fieldErrors.email}</p>
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
              autoComplete="new-password"
              placeholder="Minimum 6 characters"
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
            {isSubmitting ? 'Creating account...' : 'Create account'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-400">
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-semibold text-cyan-300 hover:text-cyan-200"
          >
            Login
          </Link>
        </p>
      </section>
    </main>
  )
}

export default Register
