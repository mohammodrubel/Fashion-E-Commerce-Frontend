import { PageHeader } from "@/components/admin/page-header"
import {
  Megaphone, Tag, DollarSign, Mail, TrendingUp, Users, ArrowUpRight,
  ArrowRight, BarChart2, Zap
} from "lucide-react"

const stats = [
  { label: "Active Campaigns", value: "0", sub: "0 ending this week", icon: Megaphone, color: "var(--primary)", bg: "#FAF0F2" },
  { label: "Coupons Used", value: "0", sub: "this month", icon: Tag, color: "#7C3D52", bg: "#FAF0F2" },
  { label: "Revenue from Promotions", value: "$0", sub: "+0.0% vs last month", icon: DollarSign, color: "#166534", bg: "#F0FDF4" },
  { label: "Email Subscribers", value: "0", sub: "+0 this week", icon: Mail, color: "#1D4ED8", bg: "#EFF6FF" },
]

const campaigns: { name: string; type: string; status: string; revenue: string; conversions: number; color: string; }[] = []

const funnelData = [
  { label: "Impressions", value: 0, pct: 0 },
  { label: "Clicks", value: 0, pct: 0 },
  { label: "Add to Cart", value: 0, pct: 0 },
  { label: "Checkout", value: 0, pct: 0 },
  { label: "Purchased", value: 0, pct: 0 },
]

const barData = [
  { month: "Jun", value: 0 },
  { month: "Jul", value: 0 },
  { month: "Aug", value: 0 },
  { month: "Sep", value: 0 },
  { month: "Oct", value: 0 },
  { month: "Nov", value: 0 },
]

const maxBar = Math.max(...barData.map((d) => d.value), 1)

export default function MarketingOverviewPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Marketing Overview"
        description="Track campaigns, promotions, and customer engagement"
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Marketing" }]}
        actions={
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-white hover:opacity-90 transition-opacity"
            style={{ backgroundColor: "var(--primary)", fontSize: "13px" }}
          >
            <Megaphone className="w-4 h-4" strokeWidth={1.5} />
            New Campaign
          </button>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-border/50 p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-muted-foreground" style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.07em" }}>{s.label}</p>
                <p className="font-semibold text-foreground mt-1" style={{ fontSize: "26px" }}>{s.value}</p>
                <p className="text-muted-foreground mt-0.5" style={{ fontSize: "11px" }}>{s.sub}</p>
              </div>
              <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: s.bg }}>
                <s.icon className="w-4.5 h-4.5" style={{ color: s.color }} strokeWidth={1.5} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Campaign Performance Bar Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-border/50 p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="font-semibold text-foreground" style={{ fontSize: "15px" }}>Campaign Performance</h2>
              <p className="text-muted-foreground" style={{ fontSize: "12px" }}>Conversion rate by month (%)</p>
            </div>
            <div className="flex items-center gap-1.5">
              <BarChart2 className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
              <span className="text-muted-foreground" style={{ fontSize: "12px" }}>Last 6 months</span>
            </div>
          </div>
          <div className="flex items-end gap-3 h-40">
            {barData.map((d) => (
              <div key={d.month} className="flex-1 flex flex-col items-center gap-1.5">
                <span className="text-muted-foreground" style={{ fontSize: "11px" }}>{d.value}%</span>
                <div
                  className="w-full rounded-t-md transition-all"
                  style={{ height: `${(d.value / maxBar) * 100}%`, backgroundColor: "var(--primary)", opacity: d.month === "Nov" ? 1 : 0.55 }}
                />
                <span className="text-muted-foreground" style={{ fontSize: "11px" }}>{d.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Conversion Funnel */}
        <div className="bg-white rounded-xl border border-border/50 p-6">
          <div className="mb-5">
            <h2 className="font-semibold text-foreground" style={{ fontSize: "15px" }}>Conversion Funnel</h2>
            <p className="text-muted-foreground" style={{ fontSize: "12px" }}>Campaign traffic breakdown</p>
          </div>
          <div className="space-y-2">
            {funnelData.map((f, i) => (
              <div key={f.label}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-foreground" style={{ fontSize: "12px" }}>{f.label}</span>
                  <span className="text-muted-foreground font-mono" style={{ fontSize: "11px" }}>{f.value.toLocaleString()}</span>
                </div>
                <div className="h-6 rounded-md overflow-hidden" style={{ backgroundColor: "var(--muted)" }}>
                  <div
                    className="h-full rounded-md flex items-center px-2"
                    style={{ width: `${f.pct === 100 ? 100 : Math.max(f.pct * 8, 12)}%`, backgroundColor: `rgba(80,29,42,${1 - i * 0.15})` }}
                  >
                    <span className="text-white" style={{ fontSize: "10px" }}>{f.pct}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Campaigns */}
      <div className="bg-white rounded-xl border border-border/50 p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-semibold text-foreground" style={{ fontSize: "15px" }}>Recent Campaigns</h2>
          <a href="/admin/marketing/campaigns" className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors" style={{ fontSize: "12px" }}>
            View all <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
          </a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {campaigns.map((c) => (
            <div key={c.name} className="rounded-xl border border-border/50 p-4" style={{ backgroundColor: "var(--muted)" }}>
              <div className="flex items-start justify-between mb-3">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: c.color }}>
                  <Zap className="w-4 h-4 text-white" strokeWidth={1.5} />
                </div>
                <span
                  className="inline-flex items-center rounded-full px-2 py-0.5 font-medium"
                  style={{
                    fontSize: "10px",
                    backgroundColor: c.status === "Active" ? "#DCFCE7" : "#FEF9C3",
                    color: c.status === "Active" ? "#166534" : "#854D0E"
                  }}
                >
                  {c.status}
                </span>
              </div>
              <p className="font-medium text-foreground" style={{ fontSize: "13px" }}>{c.name}</p>
              <p className="text-muted-foreground" style={{ fontSize: "11px" }}>{c.type}</p>
              <div className="flex items-center justify-between mt-3 pt-3" style={{ borderTop: "1px solid #E8E5E2" }}>
                <div>
                  <p className="text-muted-foreground" style={{ fontSize: "10px" }}>Revenue</p>
                  <p className="font-semibold text-foreground" style={{ fontSize: "13px" }}>{c.revenue}</p>
                </div>
                <div className="text-right">
                  <p className="text-muted-foreground" style={{ fontSize: "10px" }}>Conversions</p>
                  <p className="font-semibold text-foreground" style={{ fontSize: "13px" }}>{c.conversions}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {[
          { label: "Coupons", href: "/admin/marketing/coupons", icon: Tag },
          { label: "Flash Sales", href: "/admin/marketing/flash-sales", icon: Zap },
          { label: "Gift Cards", href: "/admin/marketing/gift-cards", icon: DollarSign },
          { label: "Loyalty", href: "/admin/marketing/loyalty", icon: Users },
          { label: "Email", href: "/admin/marketing/email", icon: Mail },
          { label: "Referrals", href: "/admin/marketing/referral", icon: TrendingUp },
        ].map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="bg-white rounded-xl border border-border/50 p-4 flex flex-col items-center gap-2 hover:border-primary/30 hover:shadow-sm transition-all group"
          >
            <div className="w-9 h-9 rounded-lg flex items-center justify-center group-hover:opacity-90" style={{ backgroundColor: "#FAF0F2" }}>
              <link.icon className="w-4 h-4" style={{ color: "var(--primary)" }} strokeWidth={1.5} />
            </div>
            <span className="text-foreground font-medium text-center" style={{ fontSize: "12px" }}>{link.label}</span>
            <ArrowUpRight className="w-3 h-3 text-muted-foreground group-hover:text-foreground transition-colors" strokeWidth={1.5} />
          </a>
        ))}
      </div>
    </div>
  )
}
