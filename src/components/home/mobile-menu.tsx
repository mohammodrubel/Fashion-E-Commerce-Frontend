"use client"

import { useEffect } from "react"
import Link from "next/link"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useGetAllCategoriesQuery } from "@/redux/fetchers/category/categoryApi"

interface NavLink {
  label: string
  href: string
}

interface Category {
  id: string
  name: string
  slug: string
  isActive: boolean
}

interface MobileMenuProps {
  open: boolean
  onClose: () => void
  links: NavLink[]
}

export function MobileMenu({ open, onClose, links }: MobileMenuProps) {
  const { data } = useGetAllCategoriesQuery(undefined, { skip: !open })
  const categories: Category[] = (data?.data ?? []).filter((c: Category) => c.isActive)

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
        "fixed inset-0 z-50 bg-white transition-opacity duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-y-auto",
        open ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
      aria-hidden={!open}
    >
      <button
        onClick={onClose}
        aria-label="Close menu"
        className="fixed top-5 right-6 text-foreground/70 hover:text-foreground transition-colors z-10"
      >
        <X className="w-5 h-5" strokeWidth={1.5} />
      </button>

      <div className="min-h-full flex flex-col items-center justify-center gap-10 px-8 py-20">
        {/* ── Top: main pages ── */}
        <nav className="flex flex-col items-center gap-6">
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

        {/* ── Divider ── */}
        <div
          className={cn(
            "w-full max-w-sm h-px bg-border transition-opacity duration-500",
            open ? "opacity-100" : "opacity-0"
          )}
          style={{ transitionDelay: open ? "360ms" : "0ms" }}
        />

        {/* ── Below divider: Categories | Pages ── */}
        <div
          className={cn(
            "w-full max-w-sm grid grid-cols-2 gap-8 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
            open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          )}
          style={{ transitionDelay: open ? "420ms" : "0ms" }}
        >
          {/* Categories */}
          <div>
            <h3
              className="font-ui text-muted-foreground uppercase mb-4"
              style={{ fontSize: "10px", letterSpacing: "0.15em" }}
            >
              Categories
            </h3>
            <ul className="space-y-3">
              {categories.length === 0 ? (
                <li className="text-muted-foreground" style={{ fontSize: "13px" }}>—</li>
              ) : (
                categories.map((category) => (
                  <li key={category.id}>
                    <Link
                      href={`/shop?category=${category.id}`}
                      onClick={onClose}
                      className="font-body text-foreground/80 hover:text-foreground transition-colors"
                      style={{ fontSize: "13px" }}
                    >
                      {category.name}
                    </Link>
                  </li>
                ))
              )}
            </ul>
          </div>

          {/* Pages */}
          <div>
            <h3
              className="font-ui text-muted-foreground uppercase mb-4"
              style={{ fontSize: "10px", letterSpacing: "0.15em" }}
            >
              Pages
            </h3>
            <ul className="space-y-3">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="font-body text-foreground/80 hover:text-foreground transition-colors"
                    style={{ fontSize: "13px" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
