import Link from "next/link"
import {
  ShoppingBag, Clock, CheckCircle, Heart, ArrowRight,
  MapPin, Star, Truck, Eye, Sparkles, ChevronRight,
  Package
} from "lucide-react"

const stats = [
  { label: "Total Orders",   value: "12", icon: ShoppingBag,  bg: "#F0EDEF", color: "#501D2A" },
  { label: "Pending",        value: "2",  icon: Clock,         bg: "#FEF9EC", color: "#B45309" },
  { label: "Delivered",      value: "9",  icon: CheckCircle,   bg: "#ECFDF5", color: "#059669" },
  { label: "Wishlist Items", value: "8",  icon: Heart,         bg: "#FFF0F3", color: "#BE185D" },
]

const recentOrders = [
  { id: "#LS-4521", date: "Oct 20, 2026", items: "Silk Wrap Dress, Belt",          total: "$189.00", status: "Delivered"  },
  { id: "#LS-4519", date: "Oct 14, 2026", items: "Cashmere Sweater",               total: "$124.00", status: "Shipped"    },
  { id: "#LS-4516", date: "Oct 8, 2026",  items: "Tailored Blazer, Linen Trousers",total: "$312.00", status: "Processing" },
  { id: "#LS-4512", date: "Sep 30, 2026", items: "Floral Midi Dress",              total: "$98.00",  status: "Delivered"  },
  { id: "#LS-4508", date: "Sep 22, 2026", items: "Leather Tote, Scarf",            total: "$215.00", status: "Pending"    },
]

const statusStyles: Record<string, { bg: string; color: string }> = {
  Delivered:  { bg: "#ECFDF5", color: "#059669" },
  Shipped:    { bg: "#EFF6FF", color: "#2563EB" },
  Processing: { bg: "#FFFBEB", color: "#D97706" },
  Pending:    { bg: "#F3F4F6", color: "#6B7280" },
  Cancelled:  { bg: "#FEF2F2", color: "#DC2626" },
}

const quickLinks = [
  { label: "Track Order",       icon: Truck,       href: "/account/orders",    desc: "Check your delivery status" },
  { label: "View All Orders",   icon: ShoppingBag, href: "/account/orders",    desc: "Browse your order history" },
  { label: "Edit Profile",      icon: MapPin,      href: "/account/profile",   desc: "Update your details" },
  { label: "Shop New Arrivals", icon: Sparkles,    href: "/new-in",            desc: "Explore the latest styles" },
]

const LOYALTY_POINTS = 2840
const NEXT_TIER_POINTS = 5000
const CURRENT_TIER = "Gold"
const NEXT_TIER = "Platinum"
const loyaltyPct = Math.round((LOYALTY_POINTS / NEXT_TIER_POINTS) * 100)

export default function AccountDashboard() {
  return (
    <div className="space-y-6">
      {/* ── Welcome Banner ── */}
      <div
        className="relative rounded-xl overflow-hidden px-6 py-7 flex items-center gap-5"
        style={{ background: "linear-gradient(135deg, #501D2A 0%, #794554 60%, #9C7A83 100%)" }}
      >
        {/* Avatar */}
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold shrink-0 border-2 border-white/30"
          style={{ backgroundColor: "rgba(255,255,255,0.15)", fontSize: "24px" }}
        >
          S
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-white/70" style={{ fontSize: "13px" }}>Welcome back</p>
          <h1 className="text-white font-semibold mt-0.5" style={{ fontSize: "22px" }}>
            Sarah Johnson
          </h1>
          <p className="text-white/60 mt-1" style={{ fontSize: "12px" }}>
            Gold Member · Member since Jan 2025
          </p>
        </div>
        {/* Decorative */}
        <div
          className="absolute right-6 top-1/2 -translate-y-1/2 opacity-10 hidden sm:block"
          style={{ fontSize: "96px", lineHeight: 1 }}
        >
          ✦
        </div>
        <Link
          href="/new-in"
          className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg bg-white/15 hover:bg-white/25 text-white transition-colors shrink-0 border border-white/20"
          style={{ fontSize: "12px", fontWeight: 500 }}
        >
          <Sparkles className="w-3.5 h-3.5" strokeWidth={1.5} />
          Shop New Arrivals
        </Link>
      </div>

      {/* ── Stats Row ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div
              key={stat.label}
              className="bg-white rounded-xl border border-border/50 p-4 hover:border-border transition-colors"
            >
              <div className="flex items-center justify-between mb-3">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: stat.bg }}
                >
                  <Icon className="w-4.5 h-4.5" style={{ color: stat.color, width: "18px", height: "18px" }} strokeWidth={1.5} />
                </div>
              </div>
              <div className="font-bold text-foreground" style={{ fontSize: "26px" }}>
                {stat.value}
              </div>
              <p className="text-muted-foreground mt-0.5" style={{ fontSize: "12px" }}>
                {stat.label}
              </p>
            </div>
          )
        })}
      </div>

      {/* ── Two-Column: Orders + Sidebar ── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="xl:col-span-2 bg-white rounded-xl border border-border/50">
          <div
            className="flex items-center justify-between px-5 py-4"
            style={{ borderBottom: "1px solid #F0EDEF" }}
          >
            <h2 className="font-semibold text-foreground" style={{ fontSize: "14px" }}>
              Recent Orders
            </h2>
            <Link
              href="/account/orders"
              className="flex items-center gap-1.5 hover:opacity-80 transition-opacity"
              style={{ color: "#501D2A", fontSize: "12px" }}
            >
              View all <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
            </Link>
          </div>

          <div className="divide-y divide-[#F0EDEF]">
            {recentOrders.map((order) => {
              const st = statusStyles[order.status] ?? statusStyles.Pending
              return (
                <div
                  key={order.id}
                  className="flex items-center gap-4 px-5 py-4 hover:bg-[#FDFCFC] transition-colors"
                >
                  {/* Product icon placeholder */}
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                    style={{ backgroundColor: "#F0EDEF" }}
                  >
                    <Package className="w-4.5 h-4.5" style={{ color: "#794554", width: "18px", height: "18px" }} strokeWidth={1.5} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-medium text-foreground" style={{ fontSize: "13px" }}>
                        {order.id}
                      </span>
                      <span
                        className="inline-flex items-center px-2 py-0.5 rounded-full font-medium"
                        style={{ backgroundColor: st.bg, color: st.color, fontSize: "10px" }}
                      >
                        {order.status}
                      </span>
                    </div>
                    <p className="text-muted-foreground truncate mt-0.5" style={{ fontSize: "12px" }}>
                      {order.items}
                    </p>
                    <p className="text-muted-foreground/70 mt-0.5" style={{ fontSize: "11px" }}>
                      {order.date}
                    </p>
                  </div>

                  <div className="text-right shrink-0">
                    <p className="font-semibold text-foreground" style={{ fontSize: "13px" }}>
                      {order.total}
                    </p>
                    <Link
                      href="/account/orders"
                      className="flex items-center gap-1 mt-1 hover:opacity-70 transition-opacity"
                      style={{ color: "#501D2A", fontSize: "11px" }}
                    >
                      <Eye className="w-3 h-3" strokeWidth={1.5} /> Details
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          {/* ── Loyalty Card ── */}
          <div
            className="rounded-xl overflow-hidden"
            style={{ background: "linear-gradient(135deg, #2D1A20 0%, #501D2A 100%)" }}
          >
            <div className="p-5">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-amber-400" strokeWidth={1.5} fill="currentColor" />
                  <span className="text-white/90 font-semibold" style={{ fontSize: "13px" }}>
                    {CURRENT_TIER} Member
                  </span>
                </div>
                <span className="text-amber-400 font-bold" style={{ fontSize: "18px" }}>
                  {LOYALTY_POINTS.toLocaleString()}
                  <span className="text-amber-400/60 font-normal ml-1" style={{ fontSize: "11px" }}>pts</span>
                </span>
              </div>
              <p className="text-white/50 mb-4" style={{ fontSize: "11px" }}>
                {(NEXT_TIER_POINTS - LOYALTY_POINTS).toLocaleString()} points to {NEXT_TIER}
              </p>

              {/* Progress Bar */}
              <div className="w-full h-1.5 rounded-full bg-white/10 mb-1">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${loyaltyPct}%`, backgroundColor: "#F59E0B" }}
                />
              </div>
              <div className="flex justify-between">
                <span className="text-white/40" style={{ fontSize: "10px" }}>{CURRENT_TIER}</span>
                <span className="text-white/40" style={{ fontSize: "10px" }}>{NEXT_TIER} ({NEXT_TIER_POINTS.toLocaleString()} pts)</span>
              </div>

              <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <p className="text-white/50" style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.07em" }}>Redeemable</p>
                  <p className="text-white font-semibold" style={{ fontSize: "15px" }}>$28.40</p>
                </div>
                <button
                  className="px-3 py-1.5 rounded-lg text-white hover:bg-white/20 transition-colors border border-white/20"
                  style={{ fontSize: "11px", backgroundColor: "rgba(255,255,255,0.1)" }}
                >
                  Redeem Points
                </button>
              </div>
            </div>
          </div>

          {/* ── Quick Links ── */}
          <div className="bg-white rounded-xl border border-border/50 p-4">
            <h3 className="font-semibold text-foreground mb-3" style={{ fontSize: "13px" }}>Quick Links</h3>
            <div className="space-y-1">
              {quickLinks.map((link) => {
                const Icon = link.icon
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-[#F8F7F5] transition-colors group"
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                      style={{ backgroundColor: "#F0EDEF" }}
                    >
                      <Icon className="w-4 h-4" style={{ color: "#501D2A" }} strokeWidth={1.5} />
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
      </div>
    </div>
  )
}
