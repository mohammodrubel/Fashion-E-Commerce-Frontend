import type { LucideIcon } from "lucide-react"
import { PageHeader } from "@/components/admin/page-header"
import { Megaphone, TrendingUp, Download, Mail, MessageSquare, Share2 } from "lucide-react"

const campaigns: { name: string; channel: string; spend: string; revenue: string; roas: string; conversions: number; cpa: string; status: string; channelIcon: LucideIcon; }[] = []

const roasColor = (roas: string) => {
  const val = parseFloat(roas)
  if (val >= 15) return { color: "#059669", bg: "#f0fdf4" }
  if (val >= 8) return { color: "#d97706", bg: "#fffbeb" }
  return { color: "#dc2626", bg: "#fef2f2" }
}

const statusConfig: Record<string, { color: string; bg: string; label: string }> = {
  active: { color: "#059669", bg: "#f0fdf4", label: "Active" },
  completed: { color: "#6b7280", bg: "#f9fafb", label: "Completed" },
  ongoing: { color: "#7c3aed", bg: "#f5f3ff", label: "Ongoing" },
}

export default function MarketingReportPage() {
  return (
    <div>
      <PageHeader
        title="Marketing Performance"
        description="Campaign ROI, spend, and conversion metrics"
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Reports", href: "/admin/reports" }, { label: "Marketing" }]}
        actions={
          <button
            className="flex items-center gap-2 rounded-lg border border-border/50 bg-white px-3 py-2 text-foreground hover:bg-muted/30 transition-colors"
            style={{ fontSize: "13px" }}
          >
            <Download className="w-4 h-4" />
            Export
          </button>
        }
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Ad Spend", value: "$0", sub: "0 campaigns", color: "var(--primary)" },
          { label: "Total Revenue", value: "$0", sub: "From campaigns", color: "#059669" },
          { label: "Avg ROAS", value: "0.0x", sub: "Blended", color: "#d97706" },
          { label: "Total Conversions", value: "0", sub: "Across all channels", color: "#7c3aed" },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl border border-border/50 p-5">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: s.color }} />
              <span className="text-muted-foreground" style={{ fontSize: "12px" }}>{s.label}</span>
            </div>
            <p className="text-2xl font-semibold text-foreground">{s.value}</p>
            <p className="text-muted-foreground" style={{ fontSize: "11px" }}>{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Campaigns Table */}
      <div className="bg-white rounded-xl border border-border/50">
        <div className="px-6 py-4 border-b border-border/50">
          <h2 className="font-semibold text-foreground" style={{ fontSize: "15px" }}>Campaign Performance</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50">
                {["Campaign", "Channel", "Spend", "Revenue", "ROAS", "Conversions", "CPA", "Status"].map(h => (
                  <th key={h} className="text-left px-6 py-3 text-muted-foreground font-medium" style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.06em" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {campaigns.map((c, i) => {
                const ChannelIcon = c.channelIcon
                const roas = roasColor(c.roas)
                const status = statusConfig[c.status]
                return (
                  <tr key={c.name} className={`border-b border-border/30 hover:bg-muted/20 transition-colors ${i === campaigns.length - 1 ? "border-b-0" : ""}`}>
                    <td className="px-6 py-4" style={{ fontSize: "13px" }}>
                      <div className="flex items-center gap-2">
                        <Megaphone className="w-4 h-4 text-muted-foreground shrink-0" />
                        <span className="font-medium text-foreground">{c.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4" style={{ fontSize: "13px" }}>
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <ChannelIcon className="w-3.5 h-3.5" />
                        {c.channel}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-foreground" style={{ fontSize: "13px" }}>{c.spend}</td>
                    <td className="px-6 py-4 text-emerald-600 font-semibold" style={{ fontSize: "13px" }}>{c.revenue}</td>
                    <td className="px-6 py-4" style={{ fontSize: "13px" }}>
                      <span className="px-2.5 py-1 rounded-full font-bold" style={{ fontSize: "12px", color: roas.color, backgroundColor: roas.bg }}>
                        {c.roas}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-foreground" style={{ fontSize: "13px" }}>{c.conversions}</td>
                    <td className="px-6 py-4 text-muted-foreground" style={{ fontSize: "13px" }}>{c.cpa}</td>
                    <td className="px-6 py-4" style={{ fontSize: "13px" }}>
                      <span className="px-2 py-0.5 rounded-full font-medium" style={{ fontSize: "11px", color: status.color, backgroundColor: status.bg }}>
                        {status.label}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
