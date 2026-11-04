"use client"

import Link from "next/link"
import { useSelector } from "react-redux"
import {
  ShoppingBag, Heart, MapPin, Sparkles, ChevronRight
} from "lucide-react"
import { useGetMeQuery } from "@/redux/fetchers/user/userApi"
import type { RootState } from "@/redux/store"

const quickLinks = [
  { label: "View My Orders",    icon: ShoppingBag, href: "/account/orders",    desc: "Browse your order history" },
  { label: "Edit Profile",      icon: MapPin,      href: "/account/profile",   desc: "Update your details" },
  { label: "My Wishlist",       icon: Heart,        href: "/account/wishlist", desc: "Review your saved items" },
  { label: "Shop New Arrivals", icon: Sparkles,    href: "/new-in",            desc: "Explore the latest styles" },
]

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
}

export default function AccountDashboard() {
  const { data: meData } = useGetMeQuery(undefined)
  const me = meData?.data
  const wishlistCount = useSelector((state: RootState) =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (state as any).wishlist?.totalwishlistProduct ?? 0
  )

  const memberSince = me?.createdAt ? formatDate(me.createdAt) : ""

  return (
    <div className="space-y-6">
      {/* ── Welcome Banner ── */}
      <div className="relative rounded-xl overflow-hidden px-6 py-7 flex items-center gap-5 bg-primary">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center text-primary-foreground font-bold shrink-0 border-2 border-primary-foreground/30 overflow-hidden bg-primary-foreground/15"
          style={{ fontSize: "24px" }}
        >
          {me?.avatar ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={me.avatar} alt={me.name} className="w-full h-full object-cover" />
          ) : (
            (me?.name?.charAt(0).toUpperCase() ?? "?")
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-primary-foreground/70" style={{ fontSize: "13px" }}>Welcome back</p>
          <h1 className="text-primary-foreground font-semibold mt-0.5" style={{ fontSize: "22px" }}>
            {me?.name ?? "—"}
          </h1>
          {memberSince && (
            <p className="text-primary-foreground/60 mt-1" style={{ fontSize: "12px" }}>
              Member since {memberSince}
            </p>
          )}
        </div>
        <div
          className="absolute right-6 top-1/2 -translate-y-1/2 opacity-10 hidden sm:block"
          style={{ fontSize: "96px", lineHeight: 1 }}
        >
          ✦
        </div>
        <Link
          href="/new-in"
          className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-foreground/15 hover:bg-primary-foreground/25 text-primary-foreground transition-colors shrink-0 border border-primary-foreground/20"
          style={{ fontSize: "12px", fontWeight: 500 }}
        >
          <Sparkles className="w-3.5 h-3.5" strokeWidth={1.5} />
          Shop New Arrivals
        </Link>
      </div>

      {/* ── Stats Row ── */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-border/50 p-4 hover:border-border transition-colors">
          <div className="flex items-center justify-between mb-3">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-primary/10">
              <Heart className="w-4.5 h-4.5 text-primary" style={{ width: "18px", height: "18px" }} strokeWidth={1.5} />
            </div>
          </div>
          <div className="font-bold text-foreground" style={{ fontSize: "26px" }}>
            {wishlistCount}
          </div>
          <p className="text-muted-foreground mt-0.5" style={{ fontSize: "12px" }}>
            Wishlist Items
          </p>
        </div>

        <div className="bg-white rounded-xl border border-border/50 p-4 hover:border-border transition-colors">
          <div className="flex items-center justify-between mb-3">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-primary/10">
              <MapPin className="w-4.5 h-4.5 text-primary" style={{ width: "18px", height: "18px" }} strokeWidth={1.5} />
            </div>
          </div>
          <div className="font-bold text-foreground" style={{ fontSize: "26px" }}>
            {me?._count?.addresses ?? 0}
          </div>
          <p className="text-muted-foreground mt-0.5" style={{ fontSize: "12px" }}>
            Saved Addresses
          </p>
        </div>
      </div>

      {/* ── Quick Links ── */}
      <div className="bg-white rounded-xl border border-border/50 p-4">
        <h3 className="font-ui font-semibold text-foreground mb-3" style={{ fontSize: "13px" }}>Quick Links</h3>
        <div className="space-y-1">
          {quickLinks.map((link) => {
            const Icon = link.icon
            return (
              <Link
                key={link.label}
                href={link.href}
                className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-muted transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-primary/10">
                  <Icon className="w-4 h-4 text-primary" strokeWidth={1.5} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-foreground font-medium" style={{ fontSize: "12px" }}>{link.label}</p>
                  <p className="text-muted-foreground" style={{ fontSize: "11px" }}>{link.desc}</p>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/40 group-hover:text-muted-foreground transition-colors" strokeWidth={1.5} />
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
