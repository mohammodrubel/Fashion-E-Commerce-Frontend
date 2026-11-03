"use client"

import { useState } from "react"
import Link from "next/link"
import { useSelector } from "react-redux"
import { Menu, Search, User, Heart, ShoppingBag } from "lucide-react"
import { Logo } from "@/components/shared/logo"
import { MobileMenu } from "@/components/home/mobile-menu"
import { AnimatedTagline } from "@/components/home/animated-tagline"
import type { RootState } from "@/redux/store"

const navLinks = [
  { label: "New In", href: "/new-in" },
  { label: "Women", href: "/women" },
  { label: "Men", href: "/men" },
  { label: "Accessories", href: "/accessories" },
]

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)
  const cartCount = useSelector((state: RootState) =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (state as any).cart?.totalQuantity ?? 0
  )

  return (
    <header className="sticky top-0 z-40 bg-white">
      {/* Row 1 — utility icons */}
      <div className="flex items-center justify-between px-6 md:px-10 pt-5">
        <button
          onClick={() => setMenuOpen(true)}
          className="text-foreground/70 hover:text-foreground transition-colors"
          aria-label="Open menu"
          aria-expanded={menuOpen}
        >
          <Menu className="w-5 h-5" strokeWidth={1.5} />
        </button>
        <button className="text-foreground/70 hover:text-foreground transition-colors" aria-label="Search">
          <Search className="w-5 h-5" strokeWidth={1.5} />
        </button>
        <div className="flex items-center gap-5">
          <Link href="/account" className="text-foreground/70 hover:text-foreground transition-colors" aria-label="Account">
            <User className="w-5 h-5" strokeWidth={1.5} />
          </Link>
          <Link href="/wishlist" className="text-foreground/70 hover:text-foreground transition-colors" aria-label="Wishlist">
            <Heart className="w-5 h-5" strokeWidth={1.5} />
          </Link>
          <Link href="/cart" className="relative text-foreground/70 hover:text-foreground transition-colors" aria-label="Cart">
            <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
            {cartCount > 0 && (
              <span
                className="absolute -right-1.5 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-primary-foreground"
                style={{ fontSize: "9px", fontWeight: 600 }}
              >
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Row 2 — centered brand */}
      <div className="flex flex-col items-center gap-2 py-4">
        <Logo size="lg" align="center" showTagline={false} />
        <AnimatedTagline />
      </div>

      {/* Divider */}
      <div className="border-t border-border mx-6 md:mx-10" />

      {/* Row 3 — nav links */}
      <nav className="hidden md:flex items-center justify-center gap-10 py-4">
        {navLinks.map((link) => (
          <Link key={link.href} href={link.href} className="text-nav-link text-foreground/70 hover:text-foreground transition-colors">
            {link.label}
          </Link>
        ))}
      </nav>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} links={navLinks} />
    </header>
  )
}
