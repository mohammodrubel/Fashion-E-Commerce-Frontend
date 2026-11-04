import type { ReactNode } from "react"
import { SiteHeader } from "@/components/home/site-header"

interface AuthLayoutProps {
  children: ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <div className="flex items-center justify-center px-6 py-16 sm:px-10">
        <div className="w-full max-w-[420px]">
          {children}
        </div>
      </div>
    </div>
  )
}
