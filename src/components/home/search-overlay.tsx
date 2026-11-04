"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { Search, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface SearchOverlayProps {
  open: boolean
  onClose: () => void
}

export function SearchOverlay({ open, onClose }: SearchOverlayProps) {
  const router = useRouter()
  const [query, setQuery] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  useEffect(() => {
    if (open) {
      const id = setTimeout(() => inputRef.current?.focus(), 350)
      return () => clearTimeout(id)
    }
  }, [open])

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [onClose])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = query.trim()
    if (!trimmed) return
    router.push(`/shop?q=${encodeURIComponent(trimmed)}`)
    onClose()
  }

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 transition-opacity duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
        open ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
      aria-hidden={!open}
    >
      {/* Backdrop — blurs the whole site behind the overlay */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-xl" onClick={onClose} />

      <button
        onClick={onClose}
        aria-label="Close search"
        className="fixed top-5 right-6 z-10 text-foreground/70 hover:text-foreground transition-colors"
      >
        <X className="w-5 h-5" strokeWidth={1.5} />
      </button>

      {/* Faint wordmark watermark, centered behind the search field */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <span
          className="font-editorial font-semibold text-foreground/[0.05] uppercase whitespace-nowrap"
          style={{ fontSize: "clamp(64px, 18vw, 220px)", letterSpacing: "0.08em" }}
        >
          LACHÉO
        </span>
      </div>

      <div className="relative h-full flex items-center justify-center px-6">
        <form onSubmit={handleSubmit} className="w-full max-w-lg">
          <div
            className={cn(
              "flex items-center gap-4 border-b border-foreground/30 pb-4 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
              open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
            )}
            style={{ transitionDelay: open ? "150ms" : "0ms" }}
          >
            <Search className="w-5 h-5 text-foreground/50 shrink-0" strokeWidth={1.5} />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for products..."
              className="font-editorial w-full bg-transparent outline-none text-foreground placeholder:text-foreground/30"
              style={{ fontSize: "clamp(20px, 3vw, 28px)" }}
            />
          </div>
          <p
            className={cn(
              "font-ui text-foreground/40 uppercase text-center mt-6 transition-opacity duration-500",
              open ? "opacity-100" : "opacity-0"
            )}
            style={{ fontSize: "10px", letterSpacing: "0.2em", transitionDelay: open ? "250ms" : "0ms" }}
          >
            Press Enter to search
          </p>
        </form>
      </div>
    </div>
  )
}
