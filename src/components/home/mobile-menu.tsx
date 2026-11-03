"use client"

import { useEffect } from "react"
import Link from "next/link"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavLink {
  label: string
  href: string
}

interface MobileMenuProps {
  open: boolean
  onClose: () => void
  links: NavLink[]
}

export function MobileMenu({ open, onClose, links }: MobileMenuProps) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [onClose])

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 bg-white transition-opacity duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
        open ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
      aria-hidden={!open}
    >
      <button
        onClick={onClose}
        aria-label="Close menu"
        className="absolute top-5 right-6 text-foreground/70 hover:text-foreground transition-colors"
      >
        <X className="w-5 h-5" strokeWidth={1.5} />
      </button>

      <nav className="h-full flex flex-col items-center justify-center gap-7">
        {links.map((link, i) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onClose}
            className={cn(
              "font-editorial font-semibold text-foreground hover:opacity-60 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
              open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
            )}
            style={{ fontSize: "32px", transitionDelay: open ? `${120 + i * 60}ms` : "0ms" }}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  )
}
