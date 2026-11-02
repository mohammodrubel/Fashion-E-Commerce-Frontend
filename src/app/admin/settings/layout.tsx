"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const tabs = [
  { label: "Store Information", href: "/admin/settings/store-info" },
  { label: "Admin Profile", href: "/admin/settings/profile" },
  { label: "User Management", href: "/admin/settings/users" },
  { label: "Shipping Methods", href: "/admin/settings/shipping" },
  { label: "Activity Logs", href: "/admin/settings/activity-logs" },
]

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="min-h-full">
      <div className="border-b border-border/60 bg-background">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="py-5">
            <h1 className="text-xl font-semibold text-foreground">Settings</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Manage your store profile, admin account, team, shipping, and activity history.
            </p>
          </div>
          <nav className="-mb-px flex gap-1 overflow-x-auto">
            {tabs.map((tab) => {
              const active = pathname === tab.href || pathname?.startsWith(`${tab.href}/`)
              return (
                <Link
                  key={tab.href}
                  href={tab.href}
                  className={cn(
                    "relative whitespace-nowrap px-3 py-2.5 text-sm font-medium transition-colors",
                    active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {tab.label}
                  {active && (
                    <span className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-primary transition-all" />
                  )}
                </Link>
              )
            })}
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6">{children}</div>
    </div>
  )
}
