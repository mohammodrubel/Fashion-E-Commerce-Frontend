import type { ReactNode } from "react"
import { BrandPanel } from "./brand-panel"

interface AuthLayoutProps {
  children: ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex bg-background">
      <BrandPanel />

      {/* Form side */}
      <div className="flex-1 flex items-center justify-center overflow-y-auto">
        <div className="w-full max-w-[420px] px-6 py-16 sm:px-10">
          {/* Mobile wordmark — hidden on lg+ where BrandPanel shows */}
          <div className="lg:hidden mb-12">
            <span
              className="uppercase font-light text-foreground"
              style={{ fontSize: "11px", letterSpacing: "0.55em" }}
            >
              PARALLEL
            </span>
          </div>

          {children}
        </div>
      </div>
    </div>
  )
}
