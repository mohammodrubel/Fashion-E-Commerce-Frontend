"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface FormInputProps extends React.ComponentProps<"input"> {
  label: string
  error?: string
  hint?: string
}

export const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, hint, className, id, ...props }, ref) => {
    const inputId = id ?? label.toLowerCase().replace(/\s+/g, "-")

    return (
      <div className="space-y-2.5">
        <label
          htmlFor={inputId}
          className="block text-muted-foreground uppercase"
          style={{ fontSize: "10px", letterSpacing: "0.15em" }}
        >
          {label}
        </label>

        <input
          ref={ref}
          id={inputId}
          className={cn(
            "w-full bg-transparent",
            "h-11 py-0 px-0",
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
FormInput.displayName = "FormInput"
