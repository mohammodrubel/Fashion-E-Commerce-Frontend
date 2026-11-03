"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useDispatch } from "react-redux"
import { useRouter } from "next/navigation"
import { useGoogleLogin } from "@react-oauth/google"
import { AuthLayout } from "@/components/auth/auth-layout"
import { FormInput } from "@/components/auth/form-input"
import { PasswordInput } from "@/components/auth/password-input"
import { useLoginMutation, useGoogleLoginMutation } from "@/redux/fetchers/auth/authApi"
import { setUser } from "@/redux/fetchers/auth/authSlice"
import { JwtDecode } from "@/lib/jwtDecoder"

interface FormErrors {
  email?: string
  password?: string
  server?: string
}

function validate(email: string, password: string): FormErrors {
  const errors: FormErrors = {}
  if (!email.trim()) {
    errors.email = "Email address is required."
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Enter a valid email address."
  }
  if (!password) {
    errors.password = "Password is required."
  }
  return errors
}

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})
  const dispatch = useDispatch()
  const router = useRouter()
  const [login] = useLoginMutation()
  const [googleLoginMutation] = useGoogleLoginMutation()

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setIsGoogleLoading(true)
      try {
        const result = await googleLoginMutation({
          id_token: tokenResponse.access_token,
        }).unwrap()
        const token = result.data.access_token
        const user = JwtDecode(token)
        dispatch(setUser({ user, token }))
        router.push("/")
      } catch {
        setErrors({ server: "Google sign-in failed. Please try again." })
      } finally {
        setIsGoogleLoading(false)
      }
    },
    onError: () => {
      setErrors({ server: "Google sign-in was cancelled or failed." })
    },
  })

  function clearFieldError(field: keyof FormErrors) {
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const email = (form.elements.namedItem("email") as HTMLInputElement).value.trim()
    const password = (form.elements.namedItem("password") as HTMLInputElement).value

    const fieldErrors = validate(email, password)
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors)
      return
    }

    setErrors({})
    setIsLoading(true)

    try {
      const result = await login({ email, password }).unwrap()
      const token = result.data.access_token
      const user = JwtDecode(token)
      dispatch(setUser({ user, token }))
      router.push("/")
    } catch (err: any) {
      const message =
        err?.data?.message || "Invalid email or password. Please try again."
      setErrors({ server: message })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthLayout>
      {/* Page heading */}
      <div className="space-y-2 mb-10">
        <h1
          className="font-editorial font-semibold tracking-tight text-foreground"
          style={{ fontSize: "42px" }}
        >
          Welcome Back
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Sign in to discover your next favorite look.
        </p>
      </div>

      {/* Server error */}
      {errors.server && (
        <div
          className="mb-8 px-4 py-3 border border-destructive/25 bg-destructive/5"
          role="alert"
        >
          <p className="text-destructive" style={{ fontSize: "12px" }}>
            {errors.server}
          </p>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} noValidate className="space-y-8">
        <FormInput
          label="Email Address"
          id="email"
          name="email"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          error={errors.email}
          onChange={() => clearFieldError("email")}
          disabled={isLoading}
        />

        <PasswordInput
          label="Password"
          id="password"
          name="password"
          placeholder="Enter your password"
          autoComplete="current-password"
          error={errors.password}
          onChange={() => clearFieldError("password")}
          disabled={isLoading}
          labelSuffix={
            <Link
              href="/forgot-password"
              className="font-ui text-muted-foreground hover:text-foreground transition-colors uppercase"
              style={{ fontSize: "10px", letterSpacing: "0.1em" }}
              tabIndex={0}
            >
              Forgot password?
            </Link>
          }
        />

        <div className="flex items-center gap-3">
          <input
            id="remember"
            name="remember"
            type="checkbox"
            className="w-3.5 h-3.5 border border-border cursor-pointer accent-primary"
            style={{ borderRadius: 0 }}
          />
          <label
            htmlFor="remember"
            className="font-ui text-muted-foreground cursor-pointer select-none uppercase"
            style={{ fontSize: "10px", letterSpacing: "0.1em" }}
          >
            Remember me for 30 days
          </label>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="font-ui w-full h-12 bg-primary text-primary-foreground uppercase font-semibold transition-all duration-150 hover:bg-primary/85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2.5"
            style={{ fontSize: "11px", letterSpacing: "0.2em", borderRadius: 0 }}
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin w-3.5 h-3.5 shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                Signing In
              </>
            ) : (
              <>
                Sign In
                <ArrowRight className="w-3.5 h-3.5 shrink-0" strokeWidth={1.5} />
              </>
            )}
          </button>
        </div>
      </form>

      {/* Divider */}
      <div className="mt-8 flex items-center gap-4">
        <div className="flex-1 h-px bg-border" />
        <span className="font-ui text-muted-foreground uppercase" style={{ fontSize: "10px", letterSpacing: "0.1em" }}>
          or
        </span>
        <div className="flex-1 h-px bg-border" />
      </div>

      {/* Google Sign-In */}
      <button
        type="button"
        onClick={() => handleGoogleLogin()}
        disabled={isGoogleLoading || isLoading}
        className="font-ui mt-4 w-full h-12 border border-border bg-background text-foreground uppercase font-semibold transition-all duration-150 hover:bg-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
        style={{ fontSize: "11px", letterSpacing: "0.2em", borderRadius: 0 }}
      >
        {isGoogleLoading ? (
          <svg className="animate-spin w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        ) : (
          <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
        )}
        Continue with Google
      </button>

      {/* Register link */}
      <p
        className="font-body font-medium mt-8 text-muted-foreground"
        style={{ fontSize: "13px", letterSpacing: "0.02em" }}
      >
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="text-foreground underline underline-offset-4 hover:text-primary transition-colors"
        >
          Create one
        </Link>
      </p>
    </AuthLayout>
  )
}
