import { useState } from 'react'
import { Link } from 'react-router-dom'
import AuthShell, { authButtonClass, authInputClass, authLinkClass } from '../components/auth/AuthShell'
import { getApiErrorMessage } from '../utils/apiError'
import { useForgotPasswordMutation } from '../redux/api/authApi'
import { isValidEmail } from '../validation/auth'

export default function ForgotPassword() {
  const [forgotPassword, { isLoading: isSubmitting }] = useForgotPasswordMutation()
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [devResetUrl, setDevResetUrl] = useState<string | null>(null)
  const [isSuccess, setIsSuccess] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setDevResetUrl(null)

    const trimmed = email.trim()
    if (!trimmed) {
      setError('Email is required')
      return
    }
    if (!isValidEmail(trimmed)) {
      setError('Enter a valid email address')
      return
    }

    try {
      const result = await forgotPassword({ email: trimmed }).unwrap()
      if (result.resetUrl) {
        setDevResetUrl(result.resetUrl)
      }
      setIsSuccess(true)
    } catch (err) {
      setError(getApiErrorMessage(err, 'Unable to send reset link'))
    }
  }

  if (isSuccess) {
    return (
      <AuthShell
        title="Check Your Email"
        subtitle="If an account exists for that address, we sent password reset instructions."
        footer={
          <p className="mt-6 text-center text-sm text-tsai-muted">
            <Link to="/login" className={authLinkClass}>
              Back to Sign In
            </Link>
          </p>
        }
      >
        <div className="rounded-lg border border-tsai-accent-cyan/30 bg-tsai-accent/10 px-4 py-3 text-sm text-tsai-muted">
          A reset link was sent to <span className="font-medium text-tsai-text">{email}</span>.
          Open the link in the email to set a new password.
        </div>

        {devResetUrl ? (
          <div className="mt-4 rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-xs text-amber-100">
            <p className="font-medium">Development reset link:</p>
            <a href={devResetUrl} className="mt-1 break-all text-tsai-accent-cyan hover:underline">
              {devResetUrl}
            </a>
          </div>
        ) : null}

        <p className="mt-4 text-center text-xs text-tsai-subtle">
          Did not receive it?{' '}
          <button
            type="button"
            className={authLinkClass}
            onClick={() => {
              setIsSuccess(false)
              setError('')
              setDevResetUrl(null)
            }}
          >
            Try again
          </button>
        </p>
      </AuthShell>
    )
  }

  return (
    <AuthShell
      title="Forgot Password"
      subtitle="Enter your email and we will send you a link to reset your password."
      footer={
        <p className="mt-6 text-center text-sm text-tsai-muted">
          Remember your password?{' '}
          <Link to="/login" className={authLinkClass}>
            Sign In
          </Link>
        </p>
      }
    >
      <form className="space-y-5" onSubmit={handleSubmit} noValidate>
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium text-tsai-muted">
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="Enter your email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className={authInputClass}
          />
        </div>

        {error ? (
          <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">
            {error}
          </p>
        ) : null}

        <button type="submit" disabled={isSubmitting} className={authButtonClass}>
          {isSubmitting ? 'Sending...' : 'Send Reset Link'}
        </button>
      </form>
    </AuthShell>
  )
}
