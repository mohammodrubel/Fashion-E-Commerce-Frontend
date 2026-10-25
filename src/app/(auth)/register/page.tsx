"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useDispatch } from "react-redux"
import { useRouter } from "next/navigation"
import { AuthLayout } from "@/components/auth/auth-layout"
import { FormInput } from "@/components/auth/form-input"
import { PasswordInput } from "@/components/auth/password-input"
import { PasswordStrength } from "@/components/auth/password-strength"
import { useRegisterMutation } from "@/redux/fetchers/auth/authApi"
import { setUser } from "@/redux/fetchers/auth/authSlice"
import { JwtDecode } from "@/lib/jwtDecoder"

interface FormErrors {
  name?: string
  email?: string
  password?: string
  confirmPassword?: string
  server?: string
}

function validate(
  name: string,
  email: string,
  password: string,
  confirmPassword: string
): FormErrors {
  const errors: FormErrors = {}

  if (!name.trim()) {
    errors.name = "Full name is required."
  } else if (name.trim().length < 3) {
    errors.name = "Name must be at least 3 characters."
  }

  if (!email.trim()) {
    errors.email = "Email address is required."
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Enter a valid email address."
  }

  if (!password) {
    errors.password = "Password is required."
  } else if (password.length < 6) {
    errors.password = "Password must be at least 6 characters."
  }

  if (!confirmPassword) {
    errors.confirmPassword = "Please confirm your password."
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords do not match."
  }

  return errors
}

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})
  const [password, setPassword] = useState("")
  const dispatch = useDispatch()
  const router = useRouter()
  const [register] = useRegisterMutation()

  function clearFieldError(field: keyof FormErrors) {
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const name = (form.elements.namedItem("name") as HTMLInputElement).value.trim()
    const email = (form.elements.namedItem("email") as HTMLInputElement).value.trim()
    const pw = (form.elements.namedItem("password") as HTMLInputElement).value
    const confirmPassword = (
      form.elements.namedItem("confirmPassword") as HTMLInputElement
    ).value

    const fieldErrors = validate(name, email, pw, confirmPassword)
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors)
      return
    }

    setErrors({})
    setIsLoading(true)

    try {
      const result = await register({ name, email, password: pw, role: "USER" }).unwrap()
      const token = result.data.access_token
      const user = JwtDecode(token)
      dispatch(setUser({ user, token }))
      router.push("/")
    } catch (err: any) {
      const message =
        err?.data?.message || "Registration failed. Please try again."
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
          className="font-light tracking-tight text-foreground"
          style={{ fontSize: "28px" }}
        >
          Create Your Account
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Join PARALLEL and make every look your own.
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
          label="Full Name"
          id="name"
          name="name"
          type="text"
          placeholder="Jane Doe"
          autoComplete="name"
          error={errors.name}
          onChange={() => clearFieldError("name")}
          disabled={isLoading}
        />

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

        <div className="space-y-0">
          <PasswordInput
            label="Password"
            id="password"
            name="password"
            placeholder="Create a password"
            autoComplete="new-password"
            error={errors.password}
            onChange={(e) => {
              setPassword((e.target as HTMLInputElement).value)
              clearFieldError("password")
            }}
            disabled={isLoading}
          />
          <PasswordStrength password={password} />
        </div>

        <PasswordInput
          label="Confirm Password"
          id="confirmPassword"
          name="confirmPassword"
          placeholder="Repeat your password"
          autoComplete="new-password"
          error={errors.confirmPassword}
          onChange={() => clearFieldError("confirmPassword")}
          disabled={isLoading}
        />

        <div className="flex items-start gap-3 pt-1">
          <input
            id="terms"
            type="checkbox"
            required
            className="w-3.5 h-3.5 mt-0.5 border border-border cursor-pointer accent-primary shrink-0"
            style={{ borderRadius: 0 }}
          />
          <label
            htmlFor="terms"
            className="text-muted-foreground cursor-pointer select-none leading-snug"
            style={{ fontSize: "11px" }}
          >
            I agree to the{" "}
            <Link
              href="/terms"
              className="text-foreground underline underline-offset-4 hover:text-primary transition-colors"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="text-foreground underline underline-offset-4 hover:text-primary transition-colors"
            >
              Privacy Policy
            </Link>
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
                Creating Account
              </>
            ) : (
              <>
                Create Account
                <ArrowRight className="w-3.5 h-3.5 shrink-0" strokeWidth={1.5} />
              </>
            )}
          </button>
        </div>
      </form>

      {/* Login link */}
      <p
        className="mt-10 text-muted-foreground"
        style={{ fontSize: "12px", letterSpacing: "0.02em" }}
      >
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-foreground underline underline-offset-4 hover:text-primary transition-colors"
        >
          Sign in
        </Link>
      </p>
    </AuthLayout>
  )
}
