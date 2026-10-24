"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard, ShoppingBag, User, Heart, MapPin,
  Lock, LogOut, Search, ShoppingCart, Sparkles, Menu, X, ChevronRight
} from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

const navItems = [
  { label: "Dashboard",       href: "/account",           icon: LayoutDashboard },
  { label: "My Orders",       href: "/account/orders",    icon: ShoppingBag },
  { label: "My Profile",      href: "/account/profile",   icon: User },
  { label: "My Wishlist",     href: "/account/wishlist",  icon: Heart },
  { label: "Addresses",       href: "/account/addresses", icon: MapPin },
  { label: "Change Password", href: "/account/password",  icon: Lock },
]

const topNavLinks = [
  { label: "Shop",        href: "/shop" },
  { label: "Collections", href: "/collections" },
  { label: "New In",      href: "/new-in" },
  { label: "Sale",        href: "/sale" },
]

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  function isActive(href: string) {
    if (href === "/account") return pathname === "/account"
    return pathname.startsWith(href)
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F8F7F5" }}>
      {/* ── Top Navbar ── */}
      <header className="sticky top-0 z-40 bg-white border-b border-border/60 h-16 flex items-center px-6 gap-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div
            className="w-7 h-7 flex items-center justify-center rounded"
            style={{ backgroundColor: "#501D2A" }}
          >
            <Sparkles className="w-4 h-4 text-white" strokeWidth={1.5} />
          </div>
          <span
            className="font-semibold tracking-wide text-foreground"
            style={{ fontSize: "16px", letterSpacing: "0.06em" }}
          >
            LumaStyle
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-6 ml-4">
          {topNavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-muted-foreground hover:text-foreground transition-colors font-medium"
              style={{ fontSize: "13px" }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex-1" />

        {/* Right Icons */}
        <div className="flex items-center gap-3">
          <button className="hidden sm:flex text-muted-foreground hover:text-foreground transition-colors p-1.5">
            <Search className="w-4.5 h-4.5" style={{ width: "18px", height: "18px" }} strokeWidth={1.5} />
          </button>
          <Link
            href="/cart"
            className="relative text-muted-foreground hover:text-foreground transition-colors p-1.5"
          >
            <ShoppingCart style={{ width: "18px", height: "18px" }} strokeWidth={1.5} />
            <span
              className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full text-white flex items-center justify-center"
              style={{ backgroundColor: "#501D2A", fontSize: "9px", fontWeight: 700 }}
            >
              3
            </span>
          </Link>
          <Link href="/account" className="hidden sm:flex items-center gap-2 group">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold shrink-0"
              style={{ backgroundColor: "#501D2A", fontSize: "12px" }}
            >
              S
            </div>
          </Link>
          {/* Mobile hamburger */}
          <button
            className="md:hidden text-muted-foreground hover:text-foreground transition-colors p-1"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen
              ? <X style={{ width: "18px", height: "18px" }} strokeWidth={1.5} />
              : <Menu style={{ width: "18px", height: "18px" }} strokeWidth={1.5} />
            }
          </button>
        </div>
      </header>

      {/* Mobile Nav Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-border/50 px-6 py-3 space-y-1 z-30 relative">
          {topNavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block py-2 text-muted-foreground hover:text-foreground transition-colors"
              style={{ fontSize: "13px" }}
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}

      {/* ── Page Body ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex gap-8 items-start">
        {/* ── Sidebar ── */}
        <aside className="hidden lg:flex flex-col w-64 shrink-0 gap-3">
          {/* User Card */}
          <div className="bg-white rounded-xl border border-border/50 p-5 flex flex-col items-center text-center">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center text-white font-semibold mb-3"
              style={{ backgroundColor: "#501D2A", fontSize: "22px" }}
            >
              S
            </div>
            <p className="font-semibold text-foreground" style={{ fontSize: "15px" }}>Sarah Johnson</p>
            <p className="text-muted-foreground mt-0.5" style={{ fontSize: "12px" }}>sarah.johnson@email.com</p>
            <span
              className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full font-medium"
              style={{ backgroundColor: "#F0EDEF", color: "#501D2A", fontSize: "11px" }}
            >
              Gold Member
            </span>
          </div>

          {/* Nav Items */}
          <div className="bg-white rounded-xl border border-border/50 overflow-hidden">
            {navItems.map((item, i) => {
              const Icon = item.icon
              const active = isActive(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 transition-all duration-150 group",
                    i > 0 && "border-t border-border/40",
                    active
                      ? "text-white"
                      : "text-muted-foreground hover:text-foreground hover:bg-[#F8F7F5]"
                  )}
                  style={{
                    backgroundColor: active ? "#501D2A" : undefined,
                  }}
                >
                  <Icon
                    className="w-4 h-4 shrink-0"
                    strokeWidth={1.5}
                    style={{ color: active ? "white" : undefined }}
                  />
                  <span style={{ fontSize: "13px", fontWeight: active ? 500 : 400 }}>
                    {item.label}
                  </span>
                  {active && (
                    <ChevronRight className="ml-auto w-3.5 h-3.5 text-white/70" strokeWidth={1.5} />
                  )}
                </Link>
              )
            })}
            {/* Logout */}
            <button
              className="w-full flex items-center gap-3 px-4 py-3 border-t border-border/40 text-muted-foreground hover:text-red-600 hover:bg-red-50 transition-all duration-150"
            >
              <LogOut className="w-4 h-4 shrink-0" strokeWidth={1.5} />
              <span style={{ fontSize: "13px" }}>Logout</span>
            </button>
          </div>
        </aside>

        {/* ── Main Content ── */}
        <main className="flex-1 min-w-0">
          {/* Mobile account nav (horizontal scroll) */}
          <div className="lg:hidden flex gap-2 mb-6 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
            {navItems.map((item) => {
              const Icon = item.icon
              const active = isActive(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-2 rounded-full whitespace-nowrap border transition-all shrink-0",
                    active
                      ? "text-white border-transparent"
                      : "text-muted-foreground border-border/60 bg-white hover:border-border"
                  )}
                  style={{
                    backgroundColor: active ? "#501D2A" : undefined,
                    fontSize: "12px",
                  }}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" strokeWidth={1.5} />
                  {item.label}
                </Link>
              )
            })}
          </div>

          {children}
        </main>
      </div>
    </div>
  )
}
