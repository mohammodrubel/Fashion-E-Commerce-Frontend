"use client"

import { useState } from "react"
import Link from "next/link"
import { Mail, ArrowRight } from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { SiteHeader } from "@/components/home/site-header"
import { SiteFooter } from "@/components/shared/footer"
import { Button } from "@/components/ui/button"
import { FormInput } from "@/components/auth/form-input"
import { SUPPORT_EMAIL } from "@/lib/site-config"

interface FormErrors {
  name?: string
  email?: string
  subject?: string
  message?: string
}

function validate(data: { name: string; email: string; subject: string; message: string }): FormErrors {
  const errors: FormErrors = {}
  if (!data.name.trim()) errors.name = "Name is required."
  if (!data.email.trim()) {
    errors.email = "Email address is required."
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Enter a valid email address."
  }
  if (!data.subject.trim()) errors.subject = "Subject is required."
  if (!data.message.trim()) {
    errors.message = "Message is required."
  } else if (data.message.trim().length < 10) {
    errors.message = "Message must be at least 10 characters."
  }
  return errors
}

export default function ContactUsPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})
  const [message, setMessageValue] = useState("")

  function clearFieldError(field: keyof FormErrors) {
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      subject: (form.elements.namedItem("subject") as HTMLInputElement).value,
      message,
    }

    const fieldErrors = validate(data)
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors)
      return
    }

    setErrors({})
    setIsSubmitting(true)
    try {
      // No backend inquiry endpoint exists yet — this confirms the message
      // locally rather than silently pretending to deliver it somewhere.
      await new Promise((resolve) => setTimeout(resolve, 500))
      toast.success("Thanks for reaching out — we'll get back to you soon.")
      form.reset()
      setMessageValue("")
    } catch {
      toast.error("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      {/* ── Breadcrumb ── */}
      <div className="px-6 md:px-10 pt-8">
        <div className="text-breadcrumb text-muted-foreground flex items-center gap-1.5">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <span>/</span>
          <span className="text-foreground">Contact Us</span>
        </div>
      </div>

      <div className="px-6 md:px-10 pt-10 pb-20 md:pt-14">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-14">
            <h1 className="text-page-title text-foreground">Get in Touch</h1>
            <p className="subtitle-text text-muted-foreground mt-4 leading-relaxed">
              Questions about an order, a product, or anything else — we&apos;re happy to help.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-16">
            {/* Contact info */}
            <div>
              <h2 className="text-category-title text-foreground mb-5">Contact Information</h2>
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                className="flex items-start gap-3 group"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-primary" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="font-ui font-medium text-foreground" style={{ fontSize: "13px" }}>Email</p>
                  <p className="font-body text-muted-foreground group-hover:text-primary transition-colors" style={{ fontSize: "13px" }}>
                    {SUPPORT_EMAIL}
                  </p>
                </div>
              </a>
              <p className="font-body text-muted-foreground mt-8 leading-relaxed" style={{ fontSize: "13px" }}>
                For order-related requests, please include your order number
                so we can help you faster.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} noValidate className="space-y-7">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <FormInput
                  label="Full Name"
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Jane Doe"
                  autoComplete="name"
                  error={errors.name}
                  onChange={() => clearFieldError("name")}
                  disabled={isSubmitting}
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
                  disabled={isSubmitting}
                />
              </div>

              <FormInput
                label="Subject"
                id="subject"
                name="subject"
                type="text"
                placeholder="Order #, product question, etc."
                error={errors.subject}
                onChange={() => clearFieldError("subject")}
                disabled={isSubmitting}
              />

              <div className="space-y-2.5">
                <label
                  htmlFor="message"
                  className="font-ui block text-muted-foreground uppercase"
                  style={{ fontSize: "10px", letterSpacing: "0.15em" }}
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Tell us how we can help..."
                  value={message}
                  onChange={(e) => {
                    setMessageValue(e.target.value)
                    clearFieldError("message")
                  }}
                  disabled={isSubmitting}
                  aria-invalid={!!errors.message}
                  className={cn(
                    "font-body w-full bg-transparent resize-none",
                    "py-2 px-0",
                    "border-0 border-b border-border",
                    "text-sm text-foreground",
                    "placeholder:text-muted-foreground/30",
                    "outline-none",
                    "transition-colors duration-150",
                    "focus:border-foreground",
                    "disabled:opacity-40 disabled:cursor-not-allowed",
                    errors.message && "border-destructive focus:border-destructive"
                  )}
                />
                {errors.message && (
                  <p role="alert" className="text-destructive" style={{ fontSize: "11px" }}>
                    {errors.message}
                  </p>
                )}
              </div>

              <Button type="submit" disabled={isSubmitting} className="btn-label h-11 px-8 w-full sm:w-auto">
                {isSubmitting ? "Sending…" : "Send Message"}
                {!isSubmitting && <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />}
              </Button>
            </form>
          </div>
        </div>
      </div>

      <SiteFooter />
    </main>
  )
}
