"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { AuthLayout } from "@/components/auth/auth-layout"
import { FormInput } from "@/components/auth/form-input"
import { PasswordInput } from "@/components/auth/password-input"
import { loginUser, AuthApiError } from "@/lib/auth-api"

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
  const [errors, setErrors] = useState<FormErrors>({})

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
      const res = await loginUser({ email, password })
      if (typeof window !== "undefined") {
        localStorage.setItem("access_token", res.data.access_token)
      }
      // Redirect to home after successful login
      window.location.href = "/"
    } catch (err) {
      if (err instanceof AuthApiError && err.status === 401) {
        setErrors({ server: "Invalid email or password." })
      } else if (err instanceof AuthApiError && err.status === 404) {
        setErrors({ server: "No account found with that email address." })
      } else {
        setErrors({ server: "Something went wrong. Please try again." })
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthLayout>
      {/* Page heading */}
      <div className="space-y-2 mb-10">
        <h1
          className="font-light tracking-tight text-foreground"
          style={{ fontSize: "28px" }}
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
              className="text-muted-foreground hover:text-foreground transition-colors uppercase"
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
            className="text-muted-foreground cursor-pointer select-none uppercase"
            style={{ fontSize: "10px", letterSpacing: "0.1em" }}
          >
            Remember me for 30 days
          </label>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 bg-primary text-primary-foreground uppercase font-medium transition-all duration-150 hover:bg-primary/85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2.5"
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

      {/* Register link */}
      <p
        className="mt-10 text-muted-foreground"
        style={{ fontSize: "12px", letterSpacing: "0.02em" }}
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
