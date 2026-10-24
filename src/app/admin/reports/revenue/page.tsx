import { PageHeader } from "@/components/admin/page-header"
import { DollarSign, TrendingUp, Download } from "lucide-react"

const stats = [
  { label: "Gross Revenue", value: "$142,580", sub: "Total sales", color: "#501D2A" },
  { label: "COGS", value: "$78,420", sub: "Cost of goods", color: "#6b7280" },
  { label: "Gross Profit", value: "$64,160", sub: "Revenue - COGS", color: "#059669" },
  { label: "Gross Margin", value: "45%", sub: "(Profit / Revenue)", color: "#d97706" },
]

const monthly = [
  { month: "Jan", revenue: 10820, cogs: 5950, profit: 4870 },
  { month: "Feb", revenue: 9740, cogs: 5360, profit: 4380 },
  { month: "Mar", revenue: 12480, cogs: 6860, profit: 5620 },
  { month: "Apr", revenue: 13920, cogs: 7660, profit: 6260 },
  { month: "May", revenue: 14980, cogs: 8240, profit: 6740 },
  { month: "Jun", revenue: 16240, cogs: 8930, profit: 7310 },
  { month: "Jul", revenue: 14380, cogs: 7910, profit: 6470 },
  { month: "Aug", revenue: 15720, cogs: 8650, profit: 7070 },
  { month: "Sep", revenue: 13640, cogs: 7500, profit: 6140 },
  { month: "Oct", revenue: 12460, cogs: 6850, profit: 5610 },
  { month: "Nov", revenue: 11480, cogs: 6310, profit: 5170 },
  { month: "Dec", revenue: 11720, cogs: 6450, profit: 5270 },
]

const maxRevenue = Math.max(...monthly.map(m => m.revenue))

// SVG chart: 600x120
const revenuePoints = monthly.map((m, i) => ({
  x: i * (600 / 11),
  y: 110 - (m.revenue / maxRevenue) * 100,
}))
const profitPoints = monthly.map((m, i) => ({
  x: i * (600 / 11),
  y: 110 - (m.profit / maxRevenue) * 100,
}))

const toPolyline = (pts: { x: number; y: number }[]) => pts.map(p => `${p.x},${p.y}`).join(" ")
const toAreaPath = (pts: { x: number; y: number }[]) => {
  const first = pts[0]
  const last = pts[pts.length - 1]
  return `M${first.x},120 L${first.x},${first.y} ${pts.slice(1).map(p => `L${p.x},${p.y}`).join(" ")} L${last.x},120 Z`
}

export default function RevenuePage() {
  return (
    <div>
      <PageHeader
        title="Revenue & Profit"
        description="Gross revenue, cost of goods, and profit analysis"
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Reports", href: "/admin/reports" }, { label: "Revenue & Profit" }]}
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
        {stats.map(s => (
          <div key={s.label} className="bg-white rounded-xl border border-border/50 p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: s.color }} />
              <span className="text-muted-foreground" style={{ fontSize: "13px" }}>{s.label}</span>
            </div>
            <p className="text-2xl font-semibold" style={{ color: s.color }}>{s.value}</p>
            <p className="text-muted-foreground mt-0.5" style={{ fontSize: "12px" }}>{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="bg-white rounded-xl border border-border/50 p-6 mb-6">
        <h2 className="font-semibold text-foreground mb-5" style={{ fontSize: "15px" }}>Revenue vs. Profit Trend</h2>
        <div className="flex justify-between mb-2 px-1">
          {monthly.map(m => (
            <span key={m.month} className="text-muted-foreground" style={{ fontSize: "10px" }}>{m.month}</span>
          ))}
        </div>
        <svg viewBox="0 0 600 130" className="w-full" style={{ height: "150px" }} preserveAspectRatio="none">
          <defs>
            <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#501D2A" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#501D2A" stopOpacity="0.01" />
            </linearGradient>
            <linearGradient id="profGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#059669" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#059669" stopOpacity="0.01" />
            </linearGradient>
          </defs>
          {[30, 60, 90].map(y => (
            <line key={y} x1="0" y1={y} x2="600" y2={y} stroke="#e5e7eb" strokeWidth="0.5" />
          ))}
          <path d={toAreaPath(revenuePoints)} fill="url(#revGrad)" />
          <path d={toAreaPath(profitPoints)} fill="url(#profGrad)" />
          <polyline points={toPolyline(revenuePoints)} fill="none" stroke="#501D2A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <polyline points={toPolyline(profitPoints)} fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          {revenuePoints.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r="3" fill="#501D2A" />)}
          {profitPoints.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r="3" fill="#059669" />)}
        </svg>
        <div className="flex items-center gap-4 mt-2">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-0.5 rounded" style={{ backgroundColor: "#501D2A" }} />
            <span className="text-muted-foreground" style={{ fontSize: "11px" }}>Revenue</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-0.5 rounded bg-emerald-600" />
            <span className="text-muted-foreground" style={{ fontSize: "11px" }}>Gross Profit</span>
          </div>
        </div>
      </div>

      {/* Monthly Table */}
      <div className="bg-white rounded-xl border border-border/50">
        <div className="px-6 py-4 border-b border-border/50">
          <h2 className="font-semibold text-foreground" style={{ fontSize: "15px" }}>Monthly Revenue Breakdown</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50">
                {["Month", "Gross Revenue", "COGS", "Gross Profit", "Margin %"].map(h => (
                  <th key={h} className="text-left px-6 py-3 text-muted-foreground font-medium" style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.06em" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {monthly.map((row, i) => {
                const margin = ((row.profit / row.revenue) * 100).toFixed(1)
                return (
                  <tr key={row.month} className={`border-b border-border/30 hover:bg-muted/20 transition-colors ${i === monthly.length - 1 ? "border-b-0" : ""}`}>
                    <td className="px-6 py-3 font-medium text-foreground" style={{ fontSize: "13px" }}>{row.month}</td>
                    <td className="px-6 py-3 text-foreground font-semibold" style={{ fontSize: "13px" }}>${row.revenue.toLocaleString()}</td>
                    <td className="px-6 py-3 text-rose-500" style={{ fontSize: "13px" }}>${row.cogs.toLocaleString()}</td>
                    <td className="px-6 py-3 text-emerald-600 font-semibold" style={{ fontSize: "13px" }}>${row.profit.toLocaleString()}</td>
                    <td className="px-6 py-3" style={{ fontSize: "13px" }}>
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 rounded-full bg-muted/40 overflow-hidden">
                          <div className="h-full rounded-full bg-emerald-500" style={{ width: `${margin}%` }} />
                        </div>
                        <span className="text-muted-foreground">{margin}%</span>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
            <tfoot>
              <tr className="border-t border-border/50 bg-muted/10">
                <td className="px-6 py-3 font-semibold" style={{ fontSize: "13px" }}>Total</td>
                <td className="px-6 py-3 font-semibold text-foreground" style={{ fontSize: "13px" }}>$142,580</td>
                <td className="px-6 py-3 font-semibold text-rose-500" style={{ fontSize: "13px" }}>$78,420</td>
                <td className="px-6 py-3 font-semibold text-emerald-600" style={{ fontSize: "13px" }}>$64,160</td>
                <td className="px-6 py-3 font-semibold text-muted-foreground" style={{ fontSize: "13px" }}>45.0%</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  )
}
