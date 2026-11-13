"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, Search, Bell, ChevronDown, LogOut, User } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuthUser } from "@/redux/fetchers/auth/authSlice"
import { useLogout } from "@/lib/useLogout"
import { getAdminPageMeta } from "@/components/admin/admin-meta"

interface TopbarProps {
  onMenuToggle: () => void
  title?: string
  subtitle?: string
}

export function Topbar({ onMenuToggle, title, subtitle }: TopbarProps) {
  const pathname = usePathname()
  const user = useAuthUser()
  const handleLogout = useLogout("/login")
  const pageMeta = getAdminPageMeta(pathname)

  const name = user?.name || "Admin"
  const role = user?.role
    ? user.role.charAt(0).toUpperCase() + user.role.slice(1).toLowerCase()
    : "Administrator"
  const initial = name.charAt(0).toUpperCase()

  return (
    <header className="min-h-16 bg-card border-b border-border flex items-center gap-3 sm:gap-4 px-4 sm:px-5 py-2 shrink-0">
      {/* Mobile menu toggle */}
      <button
        onClick={onMenuToggle}
        aria-label="Open menu"
        className="lg:hidden text-muted-foreground hover:text-foreground transition-colors"
      >
        <Menu className="w-5 h-5" strokeWidth={1.5} />
      </button>

      {/* Title + description */}
      <div className="min-w-0 flex-1">
        <h1
          className="font-heading text-foreground truncate"
          style={{ fontSize: "17px", fontWeight: 600, lineHeight: 1.25 }}
        >
          {title ?? pageMeta.title}
        </h1>
        <p
          className="font-body hidden sm:block text-muted-foreground truncate"
          style={{ fontSize: "12px" }}
        >
          {subtitle ?? pageMeta.description}
        </p>
      </div>

      {/* Search */}
      <div className="hidden lg:flex items-center w-56 xl:w-64">
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground"
            strokeWidth={1.5}
          />
          <input
            type="text"
            placeholder="Search anything..."
            className="text-field-value font-body w-full h-9 pl-9 pr-4 bg-muted border border-border placeholder:text-muted-foreground/60 focus:outline-none focus:border-ring transition-colors rounded-md"
          />
        </div>
      </div>

      {/* Notifications */}
      <button
        aria-label="Notifications"
        className="relative text-muted-foreground hover:text-foreground transition-colors"
      >
        <Bell className="w-5 h-5" strokeWidth={1.5} />
        <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-primary" />
      </button>

      {/* Profile dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger
          render={<button className="flex items-center gap-2.5 group outline-none" aria-label="Account menu" />}
        >
          <>
            <div className="w-8 h-8 rounded-full flex items-center justify-center bg-primary text-primary-foreground text-xs font-medium">
              {initial}
            </div>
            <div className="hidden md:block text-left max-w-[140px]">
              <p className="font-body font-medium text-foreground truncate" style={{ fontSize: "13px", lineHeight: "1.2" }}>
                {name}
              </p>
              <p className="font-body text-muted-foreground truncate" style={{ fontSize: "11px" }}>
                {role}
              </p>
            </div>
            <ChevronDown className="hidden md:block w-3.5 h-3.5 text-muted-foreground group-hover:text-foreground transition-colors" strokeWidth={1.5} />
          </>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuGroup>
          <DropdownMenuLabel className="font-normal">
            <p className="font-body font-medium text-foreground truncate" style={{ fontSize: "13px" }}>{name}</p>
            <p className="font-body text-muted-foreground truncate" style={{ fontSize: "11px" }}>
              {user?.email ?? role}
            </p>
          </DropdownMenuLabel>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            render={<Link href="/admin/settings/profile" className="cursor-pointer" />}
          >
            <User className="w-4 h-4" strokeWidth={1.5} />
            Admin Profile
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => handleLogout()} className="cursor-pointer text-destructive focus:text-destructive">
            <LogOut className="w-4 h-4" strokeWidth={1.5} />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}
