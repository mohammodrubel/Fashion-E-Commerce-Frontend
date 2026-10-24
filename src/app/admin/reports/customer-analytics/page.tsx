import { PageHeader } from "@/components/admin/page-header"
import { Users, TrendingUp, Download, UserPlus, RefreshCcw } from "lucide-react"

const acquisitionData = [
  { channel: "Organic Search", customers: 412, pct: 33 },
  { channel: "Social Media", customers: 312, pct: 25 },
  { channel: "Direct", customers: 250, pct: 20 },
  { channel: "Email Marketing", customers: 175, pct: 14 },
  { channel: "Referral", customers: 99, pct: 8 },
]

const cohorts = [
  { cohort: "Q1 2024", acquired: 312, month1: "100%", month2: "68%", month3: "54%", month6: "41%" },
  { cohort: "Q2 2024", acquired: 387, month1: "100%", month2: "71%", month3: "57%", month6: "—" },
  { cohort: "Q3 2024", acquired: 421, month1: "100%", month2: "69%", month3: "—", month6: "—" },
  { cohort: "Q4 2024", acquired: 128, month1: "100%", month2: "—", month3: "—", month6: "—" },
]

const segments = [
  { name: "Loyal Buyers (5+ orders)", count: 284, revenue: "$48,240", avgCLV: "$169.86" },
  { name: "At-Risk (90+ days inactive)", count: 142, revenue: "$12,780", avgCLV: "$90.00" },
  { name: "High Spenders ($500+)", count: 67, revenue: "$42,190", avgCLV: "$629.70" },
  { name: "New this month", count: 58, revenue: "$4,060", avgCLV: "$70.00" },
]

export default function CustomerAnalyticsPage() {
  return (
    <div>
      <PageHeader
        title="Customer Analytics"
        description="Acquisition, retention, cohort analysis, and customer segments"
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Reports", href: "/admin/reports" }, { label: "Customer Analytics" }]}
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

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "New Customers", value: "1,248", sub: "This year", icon: UserPlus, color: "#501D2A" },
          { label: "Returning Rate", value: "67%", sub: "Repeat buyers", icon: RefreshCcw, color: "#059669" },
          { label: "Avg CLV", value: "$284", sub: "12-month window", icon: TrendingUp, color: "#d97706" },
          { label: "Churn Rate", value: "8%", sub: "90-day window", icon: Users, color: "#dc2626" },
        ].map(s => {
          const Icon = s.icon
          return (
            <div key={s.label} className="bg-white rounded-xl border border-border/50 p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-muted-foreground" style={{ fontSize: "13px" }}>{s.label}</span>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${s.color}15` }}>
                  <Icon className="w-4 h-4" style={{ color: s.color }} />
                </div>
              </div>
              <p className="text-2xl font-semibold text-foreground">{s.value}</p>
              <p className="text-muted-foreground mt-0.5" style={{ fontSize: "12px" }}>{s.sub}</p>
            </div>
          )
        })}
      </div>

      {/* Acquisition Channels */}
      <div className="bg-white rounded-xl border border-border/50 p-6 mb-6">
        <h2 className="font-semibold text-foreground mb-5" style={{ fontSize: "15px" }}>Customer Acquisition by Channel</h2>
        <div className="space-y-4">
          {acquisitionData.map(ch => (
            <div key={ch.channel}>
              <div className="flex justify-between mb-1">
                <span className="text-foreground" style={{ fontSize: "13px" }}>{ch.channel}</span>
                <span className="text-muted-foreground" style={{ fontSize: "12px" }}>{ch.customers} customers ({ch.pct}%)</span>
              </div>
              <div className="w-full h-2.5 bg-muted/30 rounded-full overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${ch.pct}%`, backgroundColor: "#501D2A" }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cohort Table */}
      <div className="bg-white rounded-xl border border-border/50 mb-6">
        <div className="px-6 py-4 border-b border-border/50">
          <h2 className="font-semibold text-foreground" style={{ fontSize: "15px" }}>Retention Cohort Analysis</h2>
          <p className="text-muted-foreground mt-0.5" style={{ fontSize: "12px" }}>% of cohort still active at each interval</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50">
                {["Cohort", "Acquired", "Month 1", "Month 2", "Month 3", "Month 6"].map(h => (
                  <th key={h} className="text-left px-6 py-3 text-muted-foreground font-medium" style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.06em" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {cohorts.map((row, i) => (
                <tr key={row.cohort} className={`border-b border-border/30 hover:bg-muted/20 transition-colors ${i === cohorts.length - 1 ? "border-b-0" : ""}`}>
                  <td className="px-6 py-3.5 font-medium text-foreground" style={{ fontSize: "13px" }}>{row.cohort}</td>
                  <td className="px-6 py-3.5 text-muted-foreground" style={{ fontSize: "13px" }}>{row.acquired}</td>
                  {[row.month1, row.month2, row.month3, row.month6].map((v, vi) => (
                    <td key={vi} className="px-6 py-3.5" style={{ fontSize: "13px" }}>
                      {v === "—" ? (
                        <span className="text-muted-foreground/40">—</span>
                      ) : (
                        <span className="font-medium" style={{ color: v === "100%" ? "#059669" : parseInt(v) > 60 ? "#d97706" : "#dc2626" }}>{v}</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Segments */}
      <div className="bg-white rounded-xl border border-border/50">
        <div className="px-6 py-4 border-b border-border/50">
          <h2 className="font-semibold text-foreground" style={{ fontSize: "15px" }}>Top Customer Segments</h2>
        </div>
        <div className="divide-y divide-border/30">
          {segments.map(seg => (
            <div key={seg.name} className="px-6 py-4 flex items-center justify-between hover:bg-muted/20 transition-colors">
              <div>
                <p className="font-medium text-foreground" style={{ fontSize: "13px" }}>{seg.name}</p>
                <p className="text-muted-foreground" style={{ fontSize: "12px" }}>{seg.count} customers</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-foreground" style={{ fontSize: "13px" }}>{seg.revenue}</p>
                <p className="text-muted-foreground" style={{ fontSize: "12px" }}>CLV: {seg.avgCLV}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
