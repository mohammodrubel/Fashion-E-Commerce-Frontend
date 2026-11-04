"use client"

import Link from "next/link"
import { User } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { useAuthToken, useAuthUser } from "@/redux/fetchers/auth/authSlice"
import { useLogout } from "@/lib/useLogout"

const itemClass = "text-nav-link rounded-none px-4 py-3 text-foreground/70 focus:bg-muted focus:text-foreground cursor-pointer"

export function AccountMenu() {
  const token = useAuthToken()
  const user = useAuthUser()
  const handleLogout = useLogout()
  const isAdmin = user?.role === "ADMIN"

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="text-foreground/70 hover:text-foreground transition-colors outline-none"
        aria-label="Account menu"
      >
        <User className="w-5 h-5" strokeWidth={1.5} />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        sideOffset={14}
        className="rounded-none border border-border bg-white shadow-lg ring-0 p-0 min-w-[200px]"
      >
        {token && isAdmin ? (
          <>
            <DropdownMenuItem render={<Link href="/admin" />} className={itemClass}>
              Admin Dashboard
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-border" />
            <DropdownMenuItem
              onClick={handleLogout}
              variant="destructive"
              className={cn(itemClass, "text-destructive focus:text-destructive focus:bg-destructive/10")}
            >
              Logout
            </DropdownMenuItem>
          </>
        ) : token ? (
          <>
            <DropdownMenuItem render={<Link href="/account/profile" />} className={itemClass}>
              Update Profile
            </DropdownMenuItem>
            <DropdownMenuItem render={<Link href="/account/profile#password" />} className={itemClass}>
              Change Password
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-border" />
            <DropdownMenuItem
              onClick={handleLogout}
              variant="destructive"
              className={cn(itemClass, "text-destructive focus:text-destructive focus:bg-destructive/10")}
            >
              Logout
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuItem render={<Link href="/login" />} className={itemClass}>
              Login
            </DropdownMenuItem>
            <DropdownMenuItem render={<Link href="/register" />} className={itemClass}>
              Register
            </DropdownMenuItem>
            <DropdownMenuItem render={<Link href="/forgot-password" />} className={itemClass}>
              Forgot Password
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
