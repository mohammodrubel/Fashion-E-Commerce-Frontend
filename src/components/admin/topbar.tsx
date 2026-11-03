"use client"

import { useState, useEffect } from "react"
import { Menu, Search, Bell, ChevronDown } from "lucide-react"

interface TopbarProps {
  onMenuToggle: () => void
  title?: string
  subtitle?: string
}

export function Topbar({ onMenuToggle, title, subtitle }: TopbarProps) {
  const [today, setToday] = useState("")

  useEffect(() => {
    setToday(
      new Date().toLocaleDateString("en-US", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    )
  }, [])

  return (
    <header className="h-16 bg-card border-b border-border flex items-center gap-4 px-5 shrink-0">
      {/* Mobile menu toggle */}
      <button
        onClick={onMenuToggle}
        className="lg:hidden text-muted-foreground hover:text-foreground transition-colors"
      >
        <Menu className="w-5 h-5" strokeWidth={1.5} />
      </button>

      {/* Search */}
      <div className="hidden sm:flex items-center gap-2.5 flex-1 max-w-xs">
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

      <div className="flex-1" />

      {/* Date */}
      <span className="font-body hidden md:block text-muted-foreground" style={{ fontSize: "12px" }}>
        {today}
      </span>

      {/* Notifications */}
      <button className="relative text-muted-foreground hover:text-foreground transition-colors">
        <Bell className="w-5 h-5" strokeWidth={1.5} />
        <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-primary" />
      </button>

      {/* User */}
      <button className="flex items-center gap-2.5 group">
        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-primary text-primary-foreground text-xs font-medium">
          A
        </div>
        <div className="hidden md:block text-left">
          <p className="font-body font-medium text-foreground" style={{ fontSize: "13px", lineHeight: "1.2" }}>
            Admin
          </p>
          <p className="font-body text-muted-foreground" style={{ fontSize: "11px" }}>
            Administrator
          </p>
        </div>
        <ChevronDown className="hidden md:block w-3.5 h-3.5 text-muted-foreground group-hover:text-foreground transition-colors" strokeWidth={1.5} />
      </button>
    </header>
  )
}
