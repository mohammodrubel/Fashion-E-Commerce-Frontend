"use client"

import { useState, useEffect, Suspense } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { ArrowRight } from "lucide-react"
import { AuthLayout } from "@/components/auth/auth-layout"
import { PasswordInput } from "@/components/auth/password-input"
import { PasswordStrength } from "@/components/auth/password-strength"
import { useResetPasswordMutation } from "@/redux/fetchers/auth/authApi"

type PageState = "idle" | "loading" | "success" | "invalid-token" | "expired-token"

interface FormErrors {
  password?: string
  confirmPassword?: string
  server?: string
}

function validate(password: string, confirmPassword: string): FormErrors {
  const errors: FormErrors = {}
  if (!password) {
    errors.password = "New password is required."
  } else if (password.length < 6) {
    errors.password = "Password must be at least 6 characters."
  }
  if (!confirmPassword) {
    errors.confirmPassword = "Please confirm your new password."
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords do not match."
  }
  return errors
}

function ResetPasswordForm() {
  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  const [pageState, setPageState] = useState<PageState>("idle")
  const [errors, setErrors] = useState<FormErrors>({})
  const [password, setPassword] = useState("")
  const [resetPassword] = useResetPasswordMutation()

  useEffect(() => {
    if (!token) {
      setPageState("invalid-token")
    }
  }, [token])

  function clearFieldError(field: keyof FormErrors) {
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const pw = (e.currentTarget.elements.namedItem("password") as HTMLInputElement).value
    const confirmPassword = (
      e.currentTarget.elements.namedItem("confirmPassword") as HTMLInputElement
    ).value

    const fieldErrors = validate(pw, confirmPassword)
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors)
      return
    }

    setErrors({})
    setPageState("loading")

    try {
      await resetPassword({ token: token!, password: pw }).unwrap()
      setPageState("success")
    } catch (err: any) {
      const message = err?.data?.message || "Reset failed. Try requesting a new link."
      if (message.toLowerCase().includes("expired")) {
        setPageState("expired-token")
      } else if (message.toLowerCase().includes("invalid")) {
        setPageState("invalid-token")
      } else {
        setErrors({ server: message })
        setPageState("idle")
      }
    }
  }

  // Invalid or missing token
  if (pageState === "invalid-token" || pageState === "expired-token") {
    const isExpired = pageState === "expired-token"
    return (
      <div className="space-y-8">
        <div className="w-8 h-8 border border-destructive/30 flex items-center justify-center">
          <svg
            className="w-4 h-4 text-destructive/70"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>

        <div className="space-y-2">
          <h1
            className="font-editorial font-semibold tracking-tight text-foreground"
            style={{ fontSize: "42px" }}
          >
            {isExpired ? "Link Expired" : "Invalid Link"}
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {isExpired
              ? "This password reset link has expired. Reset links are valid for 1 hour."
              : "This password reset link is invalid or has already been used."}
          </p>
        </div>

        <Link
          href="/forgot-password"
          className="font-body font-medium inline-flex items-center gap-2 text-foreground underline underline-offset-4 hover:text-primary transition-colors"
          style={{ fontSize: "13px" }}
        >
          Request a new link
          <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
        </Link>
      </div>
    )
  }

  // Success state
  if (pageState === "success") {
    return (
      <div className="space-y-8">
        <div className="w-8 h-8 border border-foreground/20 flex items-center justify-center">
          <svg
            className="w-4 h-4 text-foreground/60"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
        </div>

        <div className="space-y-2">
          <h1
            className="font-editorial font-semibold tracking-tight text-foreground"
            style={{ fontSize: "42px" }}
          >
            Password Updated
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Your password has been reset successfully. You can now sign in with
            your new password.
          </p>
        </div>

        <Link
          href="/login"
          className="font-ui inline-flex w-full h-12 bg-primary text-primary-foreground items-center justify-center gap-2.5 uppercase font-semibold transition-all duration-150 hover:bg-primary/85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          style={{ fontSize: "11px", letterSpacing: "0.2em", borderRadius: 0 }}
        >
          Continue to Sign In
          <ArrowRight className="w-3.5 h-3.5 shrink-0" strokeWidth={1.5} />
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-10">
      {/* Heading */}
      <div className="space-y-2">
        <h1
          className="font-editorial font-semibold tracking-tight text-foreground"
          style={{ fontSize: "42px" }}
        >
          Create a New Password
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Your new password must be at least 6 characters.
        </p>
      </div>

      {/* Server error */}
      {errors.server && (
        <div
          className="px-4 py-3 border border-destructive/25 bg-destructive/5"
          role="alert"
        >
          <p className="text-destructive" style={{ fontSize: "12px" }}>
            {errors.server}
          </p>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} noValidate className="space-y-8">
        <div className="space-y-0">
          <PasswordInput
            label="New Password"
            id="password"
            name="password"
            placeholder="Create a new password"
            autoComplete="new-password"
            error={errors.password}
            onChange={(e) => {
              setPassword((e.target as HTMLInputElement).value)
              clearFieldError("password")
            }}
            disabled={pageState === "loading"}
          />
          <PasswordStrength password={password} />
        </div>

        <PasswordInput
          label="Confirm New Password"
          id="confirmPassword"
          name="confirmPassword"
          placeholder="Repeat your new password"
          autoComplete="new-password"
          error={errors.confirmPassword}
          onChange={() => clearFieldError("confirmPassword")}
          disabled={pageState === "loading"}
        />

        <div className="pt-2">
          <button
            type="submit"
            disabled={pageState === "loading"}
            className="font-ui w-full h-12 bg-primary text-primary-foreground uppercase font-semibold transition-all duration-150 hover:bg-primary/85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2.5"
            style={{ fontSize: "11px", letterSpacing: "0.2em", borderRadius: 0 }}
          >
            {pageState === "loading" ? (
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
                Resetting Password
              </>
            ) : (
              <>
                Reset Password
                <ArrowRight className="w-3.5 h-3.5 shrink-0" strokeWidth={1.5} />
              </>
            )}
          </button>
        </div>
      </form>

      <p
        className="font-body font-medium text-muted-foreground"
        style={{ fontSize: "13px", letterSpacing: "0.02em" }}
      >
        Remembered your password?{" "}
        <Link
          href="/login"
          className="text-foreground underline underline-offset-4 hover:text-primary transition-colors"
        >
          Sign in
        </Link>
      </p>
    </div>
  )
}

export default function ResetPasswordPage() {
  return (
    <AuthLayout>
      <Suspense
        fallback={
          <div className="space-y-4 animate-pulse">
            <div className="h-7 bg-muted rounded w-3/4" />
            <div className="h-4 bg-muted rounded w-1/2" />
          </div>
        }
      >
        <ResetPasswordForm />
      </Suspense>
    </AuthLayout>
  )
}
