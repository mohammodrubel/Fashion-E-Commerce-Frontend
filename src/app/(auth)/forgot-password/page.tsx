"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { AuthLayout } from "@/components/auth/auth-layout"
import { FormInput } from "@/components/auth/form-input"

type PageState = "idle" | "loading" | "success"

export default function ForgotPasswordPage() {
  const [pageState, setPageState] = useState<PageState>("idle")
  const [emailError, setEmailError] = useState<string>()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const email = (
      e.currentTarget.elements.namedItem("email") as HTMLInputElement
    ).value.trim()

    if (!email) {
      setEmailError("Email address is required.")
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Enter a valid email address.")
      return
    }

    setEmailError(undefined)
    setPageState("loading")

    // TODO: wire up when POST /api/auth/forgot-password is implemented on the backend.
    // For now, simulate the request so the UI flow is testable end-to-end.
    await new Promise((r) => setTimeout(r, 1200))
    setPageState("success")
  }

  if (pageState === "success") {
    return (
      <AuthLayout>
        <div className="space-y-8">
          {/* Back link */}
          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors uppercase"
            style={{ fontSize: "10px", letterSpacing: "0.15em" }}
          >
            <ArrowLeft className="w-3 h-3" strokeWidth={1.5} />
            Back to sign in
          </Link>

          {/* Success state */}
          <div className="space-y-4">
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

            <h1
              className="font-light tracking-tight text-foreground"
              style={{ fontSize: "28px" }}
            >
              Check Your Email
            </h1>

            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              If an account exists with that email address, we&apos;ve sent a
              password reset link. It may take a few minutes to arrive.
            </p>
          </div>

          <div className="pt-2 border-t border-border/50">
            <p
              className="text-muted-foreground"
              style={{ fontSize: "11px", letterSpacing: "0.05em" }}
            >
              Didn&apos;t receive it?{" "}
              <button
                type="button"
                onClick={() => setPageState("idle")}
                className="text-foreground underline underline-offset-4 hover:text-primary transition-colors"
              >
                Try again
              </button>
            </p>
          </div>
        </div>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout>
      <div className="space-y-10">
        {/* Back link */}
        <Link
          href="/login"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors uppercase"
          style={{ fontSize: "10px", letterSpacing: "0.15em" }}
        >
          <ArrowLeft className="w-3 h-3" strokeWidth={1.5} />
          Back to sign in
        </Link>

        {/* Heading */}
        <div className="space-y-2">
          <h1
            className="font-light tracking-tight text-foreground"
            style={{ fontSize: "28px" }}
          >
            Forgot Your Password?
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Enter your email and we&apos;ll send you a link to reset your password.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate className="space-y-8">
          <FormInput
            label="Email Address"
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            error={emailError}
            onChange={() => emailError && setEmailError(undefined)}
            disabled={pageState === "loading"}
          />

          <div className="pt-2">
            <button
              type="submit"
              disabled={pageState === "loading"}
              className="w-full h-12 bg-primary text-primary-foreground uppercase font-medium transition-all duration-150 hover:bg-primary/85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2.5"
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
                  Sending Link
                </>
              ) : (
                <>
                  Send Reset Link
                  <ArrowRight className="w-3.5 h-3.5 shrink-0" strokeWidth={1.5} />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </AuthLayout>
  )
}
