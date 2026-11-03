import { PageHeader } from "@/components/admin/page-header"
import { Download, Users, UserCheck, UserMinus, Search } from "lucide-react"

type SubStatus = "Subscribed" | "Unsubscribed"

interface Subscriber {
  email: string
  name: string
  source: string
  subscribedDate: string
  status: SubStatus
}

const subscribers: Subscriber[] = [
  { email: "olivia.h@gmail.com", name: "Olivia Hartmann", source: "Checkout", subscribedDate: "Oct 15, 2024", status: "Subscribed" },
  { email: "marcus.chen@email.com", name: "Marcus Chen", source: "Popup", subscribedDate: "Oct 18, 2024", status: "Subscribed" },
  { email: "priya.nair@work.com", name: "Priya Nair", source: "Footer Form", subscribedDate: "Sep 22, 2024", status: "Subscribed" },
  { email: "sophie.l@gmail.com", name: "Sophie Laurent", source: "Account Registration", subscribedDate: "Sep 10, 2024", status: "Subscribed" },
  { email: "aisha.k@email.com", name: "Aisha Kamara", source: "Popup", subscribedDate: "Aug 30, 2024", status: "Subscribed" },
  { email: "noah.l@email.com", name: "Noah Lindqvist", source: "Footer Form", subscribedDate: "Aug 05, 2024", status: "Unsubscribed" },
  { email: "yuki.t@gmail.com", name: "Yuki Tanaka", source: "Checkout", subscribedDate: "Jul 19, 2024", status: "Subscribed" },
  { email: "daniel.f@email.com", name: "Daniel Ferreira", source: "Instagram", subscribedDate: "Jul 01, 2024", status: "Unsubscribed" },
]

const sourceColors: Record<string, { bg: string; color: string }> = {
  Checkout: { bg: "#DCFCE7", color: "#166534" },
  Popup: { bg: "#EFF6FF", color: "#1D4ED8" },
  "Footer Form": { bg: "#FDF4FF", color: "#7E22CE" },
  "Account Registration": { bg: "#FFF7ED", color: "#9A3412" },
  Instagram: { bg: "#FDF2F8", color: "#9D174D" },
}

export default function NewsletterPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Newsletter Subscribers"
        description="Manage your email subscriber list"
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Marketing", href: "/admin/marketing" }, { label: "Newsletter" }]}
        actions={
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border/60 bg-white text-foreground hover:bg-[var(--muted)] transition-colors"
            style={{ fontSize: "13px" }}
          >
            <Download className="w-4 h-4" strokeWidth={1.5} />
            Export CSV
          </button>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Subscribers", value: "8,432", sub: "all time", icon: Users, color: "var(--primary)", bg: "#FAF0F2" },
          { label: "Active", value: "7,891", sub: "receiving emails", icon: UserCheck, color: "#166534", bg: "#F0FDF4" },
          { label: "Unsubscribed", value: "541", sub: "6.4% unsubscribe rate", icon: UserMinus, color: "#991B1B", bg: "#FEF2F2" },
          { label: "Growth This Month", value: "+124", sub: "new subscribers", icon: Users, color: "#1D4ED8", bg: "#EFF6FF" },
        ].map((c) => (
          <div key={c.label} className="bg-white rounded-xl border border-border/50 p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-muted-foreground" style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.07em" }}>{c.label}</p>
                <p className="font-semibold mt-1" style={{ fontSize: "22px", color: c.color }}>{c.value}</p>
                <p className="text-muted-foreground" style={{ fontSize: "11px" }}>{c.sub}</p>
              </div>
              <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: c.bg }}>
                <c.icon className="w-4 h-4" style={{ color: c.color }} strokeWidth={1.5} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Sources breakdown */}
      <div className="bg-white rounded-xl border border-border/50 p-5">
        <p className="font-medium text-foreground mb-4" style={{ fontSize: "14px" }}>Subscribers by Source</p>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {[
            { source: "Checkout", count: 3120, pct: 37 },
            { source: "Popup", count: 2480, pct: 29 },
            { source: "Footer Form", count: 1340, pct: 16 },
            { source: "Acct Registration", count: 980, pct: 12 },
            { source: "Social Media", count: 512, pct: 6 },
          ].map((s) => (
            <div key={s.source} className="text-center">
              <div
                className="h-20 rounded-lg flex items-end justify-center pb-2 mb-2"
                style={{ backgroundColor: "var(--muted)" }}
              >
                <div
                  className="w-8 rounded-t-md"
                  style={{ height: `${s.pct * 2}px`, backgroundColor: "var(--primary)", opacity: 0.5 + s.pct / 100 }}
                />
              </div>
              <p className="text-foreground font-semibold" style={{ fontSize: "13px" }}>{s.count.toLocaleString()}</p>
              <p className="text-muted-foreground" style={{ fontSize: "10px" }}>{s.source}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Subscribers Table */}
      <div className="bg-white rounded-xl border border-border/50">
        <div className="flex items-center gap-3 px-5 py-4" style={{ borderBottom: "1px solid var(--accent)" }}>
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
            <input
              type="text"
              placeholder="Search subscribers..."
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-border/60 bg-[var(--muted)] placeholder:text-muted-foreground focus:outline-none focus:border-primary/40"
              style={{ fontSize: "13px" }}
            />
          </div>
          <select className="px-3 py-2 rounded-lg border border-border/60 bg-white text-muted-foreground focus:outline-none" style={{ fontSize: "13px" }}>
            <option>All Status</option>
            <option>Subscribed</option>
            <option>Unsubscribed</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--accent)" }}>
                {["Email", "Name", "Source", "Subscribed Date", "Status"].map((h) => (
                  <th
                    key={h}
                    className="text-left px-5 py-3 text-muted-foreground font-medium"
                    style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.07em" }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {subscribers.map((s, i) => {
                const srcCfg = sourceColors[s.source] ?? { bg: "#F3F4F6", color: "#6B7280" }
                return (
                  <tr
                    key={s.email}
                    className="hover:bg-[var(--muted)] transition-colors"
                    style={{ borderBottom: i < subscribers.length - 1 ? "1px solid var(--accent)" : "none" }}
                  >
                    <td className="px-5 py-3.5">
                      <span className="text-foreground" style={{ fontSize: "13px" }}>{s.email}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-foreground" style={{ fontSize: "13px" }}>{s.name}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span
                        className="inline-flex items-center rounded-full px-2 py-0.5 font-medium"
                        style={{ fontSize: "10px", backgroundColor: srcCfg.bg, color: srcCfg.color }}
                      >
                        {s.source}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-muted-foreground" style={{ fontSize: "12px" }}>{s.subscribedDate}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span
                        className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 font-medium"
                        style={{
                          fontSize: "11px",
                          backgroundColor: s.status === "Subscribed" ? "#DCFCE7" : "#F3F4F6",
                          color: s.status === "Subscribed" ? "#166534" : "#6B7280"
                        }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: s.status === "Subscribed" ? "#22C55E" : "#9CA3AF" }} />
                        {s.status}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between px-5 py-4" style={{ borderTop: "1px solid var(--accent)" }}>
          <p className="text-muted-foreground" style={{ fontSize: "12px" }}>Showing 8 of 8,432 subscribers</p>
          <div className="flex items-center gap-1">
            {["1", "2", "3", "...", "1054"].map((p) => (
              <button
                key={p}
                className={`px-2.5 h-8 rounded-lg flex items-center justify-center transition-colors ${p === "1" ? "text-white" : "hover:bg-[var(--accent)] text-muted-foreground"}`}
                style={{ fontSize: "13px", backgroundColor: p === "1" ? "var(--primary)" : undefined }}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
