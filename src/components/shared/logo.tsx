import Link from "next/link"
import { cn } from "@/lib/utils"

interface LogoProps {
  href?: string
  variant?: "light" | "dark"
  showTagline?: boolean
  size?: "sm" | "lg"
  align?: "left" | "center"
  className?: string
}

export function Logo({
  href = "/",
  variant = "light",
  showTagline = true,
  size = "sm",
  align = "left",
  className,
}: LogoProps) {
  const isDark = variant === "dark"
  const isLg = size === "lg"

  return (
    <Link
      href={href}
      className={cn(
        "inline-flex flex-col leading-none select-none",
        align === "center" ? "items-center" : "items-start",
        className
      )}
    >
      <span
        className={cn(
          "font-editorial font-semibold",
          isDark ? "text-white" : "text-foreground"
        )}
        style={{ fontSize: isLg ? "32px" : "22px", letterSpacing: "0.12em" }}
      >
        LACHÉO
      </span>
      {showTagline && (
        <span
          className={cn(
            "font-ui uppercase",
            isLg ? "mt-1" : "mt-0.5",
            isDark ? "text-white/50" : "text-muted-foreground"
          )}
          style={{ fontSize: isLg ? "10px" : "9px", letterSpacing: "0.3em" }}
        >
          Lifestyle &amp; Beyond
        </span>
      )}
    </Link>
  )
}
