"use client"

import * as React from "react"
import { Eye, EyeOff } from "lucide-react"
import { cn } from "@/lib/utils"

interface PasswordInputProps extends Omit<React.ComponentProps<"input">, "type"> {
  label: string
  error?: string
  hint?: string
  labelSuffix?: React.ReactNode
}

export const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ label, error, hint, labelSuffix, className, id, ...props }, ref) => {
    const [visible, setVisible] = React.useState(false)
    const inputId = id ?? "password"

    return (
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <label
            htmlFor={inputId}
            className="font-ui block text-muted-foreground uppercase"
            style={{ fontSize: "10px", letterSpacing: "0.15em" }}
          >
            {label}
          </label>
          {labelSuffix}
        </div>

        <div className="relative">
          <input
            ref={ref}
            id={inputId}
            type={visible ? "text" : "password"}
            className={cn(
              "font-body w-full bg-transparent",
              "h-11 py-0 pl-0 pr-7",
              "border-0 border-b border-border",
              "rounded-none",
              "text-sm text-foreground",
              "placeholder:text-muted-foreground/30",
              "outline-none",
              "transition-colors duration-150",
              "focus:border-foreground",
              "disabled:opacity-40 disabled:cursor-not-allowed",
              error && "border-destructive focus:border-destructive",
              className
            )}
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
            {...props}
          />

          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            tabIndex={-1}
            aria-label={visible ? "Hide password" : "Show password"}
            className="absolute right-0 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:text-foreground"
          >
            {visible ? (
              <EyeOff className="w-3.5 h-3.5" strokeWidth={1.5} />
            ) : (
              <Eye className="w-3.5 h-3.5" strokeWidth={1.5} />
            )}
          </button>
        </div>

        {error && (
          <p
            id={`${inputId}-error`}
            role="alert"
            className="text-destructive"
            style={{ fontSize: "11px" }}
          >
            {error}
          </p>
        )}

        {hint && !error && (
          <p
            id={`${inputId}-hint`}
            className="text-muted-foreground"
            style={{ fontSize: "11px" }}
          >
            {hint}
          </p>
        )}
      </div>
    )
  }
)
PasswordInput.displayName = "PasswordInput"
