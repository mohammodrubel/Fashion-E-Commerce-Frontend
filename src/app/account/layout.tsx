"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard, ShoppingBag, User, Heart,
  LogOut, ChevronRight
} from "lucide-react"
import { cn } from "@/lib/utils"
import { SiteHeader } from "@/components/home/site-header"
import { useRequireAuth } from "@/lib/useRequireAuth"
import { useLogout } from "@/lib/useLogout"
import { useGetMeQuery } from "@/redux/fetchers/user/userApi"

const navItems = [
  { label: "Dashboard",       href: "/account",                    icon: LayoutDashboard },
  { label: "My Orders",       href: "/account/orders",             icon: ShoppingBag },
  { label: "My Profile",      href: "/account/profile",            icon: User },
  { label: "My Wishlist",     href: "/account/wishlist",           icon: Heart },
]

function initialsOf(name?: string) {
  if (!name) return "?"
  return name.trim().charAt(0).toUpperCase()
}

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { ready } = useRequireAuth()
  const { data: meData } = useGetMeQuery(undefined, { skip: !ready })
  const me = meData?.data
  const handleLogout = useLogout()

  function isActive(href: string) {
    if (href === "/account") return pathname === "/account"
    return pathname.startsWith(href.split("#")[0])
  }

  if (!ready) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-6 h-6 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* ── Page Body ── */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 py-8 flex gap-8 items-start">
        {/* ── Sidebar ── */}
        <aside className="hidden lg:flex flex-col w-64 shrink-0 gap-3">
          {/* User Card */}
          <div className="bg-white rounded-xl border border-border/50 p-5 flex flex-col items-center text-center">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center bg-primary text-primary-foreground font-semibold mb-3 overflow-hidden"
              style={{ fontSize: "22px" }}
            >
              {me?.avatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={me.avatar} alt={me.name} className="w-full h-full object-cover" />
              ) : (
                initialsOf(me?.name)
              )}
            </div>
            <p className="font-semibold text-foreground" style={{ fontSize: "15px" }}>{me?.name ?? "—"}</p>
            <p className="text-muted-foreground mt-0.5" style={{ fontSize: "12px" }}>{me?.email ?? ""}</p>
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
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  <Icon
                    className={cn("w-4 h-4 shrink-0", active && "text-primary-foreground")}
                    strokeWidth={1.5}
                  />
                  <span className="font-ui" style={{ fontSize: "13px", fontWeight: active ? 500 : 400 }}>
                    {item.label}
                  </span>
                  {active && (
                    <ChevronRight className="ml-auto w-3.5 h-3.5 text-primary-foreground/70" strokeWidth={1.5} />
                  )}
                </Link>
              )
            })}
            {/* Logout */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 border-t border-border/40 text-muted-foreground hover:text-red-600 hover:bg-red-50 transition-all duration-150"
            >
              <LogOut className="w-4 h-4 shrink-0" strokeWidth={1.5} />
              <span className="font-ui" style={{ fontSize: "13px" }}>Logout</span>
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
                      ? "bg-primary text-primary-foreground border-transparent"
                      : "text-muted-foreground border-border/60 bg-white hover:border-border"
                  )}
                  style={{ fontSize: "12px" }}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" strokeWidth={1.5} />
                  <span className="font-ui">{item.label}</span>
                </Link>
              )
            })}
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-2 rounded-full whitespace-nowrap border border-border/60 bg-white text-muted-foreground hover:border-red-200 hover:text-red-600 transition-all shrink-0"
              style={{ fontSize: "12px" }}
            >
              <LogOut className="w-3.5 h-3.5 shrink-0" strokeWidth={1.5} />
              <span className="font-ui">Logout</span>
            </button>
          </div>

          {children}
        </main>
      </div>
    </div>
  )
}
