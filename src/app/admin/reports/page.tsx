import { PageHeader } from "@/components/admin/page-header"
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, BarChart3, RefreshCcw, Download, Calendar } from "lucide-react"

const stats = [
  { label: "Total Revenue", value: "$142,580", change: "+12.4%", trend: "up", icon: DollarSign },
  { label: "Total Orders", value: "1,847", change: "+8.1%", trend: "up", icon: ShoppingCart },
  { label: "Avg Order Value", value: "$77.20", change: "+3.8%", trend: "up", icon: BarChart3 },
  { label: "Return Rate", value: "4.2%", change: "-0.5%", trend: "down", icon: RefreshCcw },
]

const monthlySummary = [
  { month: "January", orders: 142, revenue: "$10,820", avgOrder: "$76.20", returns: 6 },
  { month: "February", orders: 128, revenue: "$9,740", avgOrder: "$76.09", returns: 5 },
  { month: "March", orders: 165, revenue: "$12,480", avgOrder: "$75.64", returns: 7 },
  { month: "April", orders: 181, revenue: "$13,920", avgOrder: "$76.90", returns: 8 },
  { month: "May", orders: 194, revenue: "$14,980", avgOrder: "$77.22", returns: 8 },
  { month: "June", orders: 210, revenue: "$16,240", avgOrder: "$77.33", returns: 9 },
  { month: "July", orders: 187, revenue: "$14,380", avgOrder: "$76.90", returns: 8 },
  { month: "August", orders: 203, revenue: "$15,720", avgOrder: "$77.44", returns: 9 },
  { month: "September", orders: 176, revenue: "$13,640", avgOrder: "$77.50", returns: 7 },
  { month: "October", orders: 161, revenue: "$12,460", avgOrder: "$77.39", returns: 6 },
  { month: "November", orders: 148, revenue: "$11,480", avgOrder: "$77.57", returns: 6 },
  { month: "December", orders: 152, revenue: "$11,720", avgOrder: "$77.10", returns: 7 },
]

// SVG area chart data points (normalized to 120 height, 600 width)
const chartPoints = [
  { x: 0, y: 95 }, { x: 50, y: 100 }, { x: 100, y: 85 }, { x: 150, y: 78 },
  { x: 200, y: 72 }, { x: 250, y: 65 }, { x: 300, y: 70 }, { x: 350, y: 62 },
  { x: 400, y: 68 }, { x: 450, y: 74 }, { x: 500, y: 80 }, { x: 550, y: 77 }, { x: 600, y: 75 },
]

const polylinePoints = chartPoints.map(p => `${p.x},${p.y}`).join(" ")
const areaPath = `M0,120 L0,95 C50,95 50,100 100,85 C150,70 150,78 200,72 C250,66 250,65 300,70 C350,75 350,62 400,68 C450,74 450,74 500,80 C550,86 550,77 600,75 L600,120 Z`

export default function SalesOverviewPage() {
  return (
    <div>
      <PageHeader
        title="Sales Overview"
        description="Comprehensive view of your store's sales performance"
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Reports", href: "/admin/reports" }, { label: "Sales Overview" }]}
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((s) => {
          const Icon = s.icon
          return (
            <div key={s.label} className="bg-white rounded-xl border border-border/50 p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-muted-foreground" style={{ fontSize: "13px" }}>{s.label}</span>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#20212715" }}>
                  <Icon className="w-4 h-4" style={{ color: "var(--primary)" }} />
                </div>
              </div>
              <div className="text-2xl font-semibold text-foreground mb-1">{s.value}</div>
              <div className={`flex items-center gap-1 ${s.trend === "up" ? "text-emerald-600" : "text-rose-500"}`} style={{ fontSize: "12px" }}>
                {s.trend === "up" ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {s.change} vs last year
              </div>
            </div>
          )
        })}
      </div>

      {/* Chart Card */}
      <div className="bg-white rounded-xl border border-border/50 p-6 mb-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="font-semibold text-foreground" style={{ fontSize: "15px" }}>Revenue Trend</h2>
            <p className="text-muted-foreground" style={{ fontSize: "12px" }}>Monthly revenue for the current year</p>
          </div>
          <div className="flex items-center gap-1">
            {["7D", "30D", "90D", "1Y"].map((range) => (
              <button
                key={range}
                className={`px-3 py-1 rounded-lg transition-colors ${range === "1Y" ? "text-white" : "text-muted-foreground hover:bg-muted/30 border border-border/50 bg-white"}`}
                style={{
                  fontSize: "12px",
                  backgroundColor: range === "1Y" ? "var(--primary)" : undefined,
                }}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        {/* Month labels */}
        <div className="flex justify-between mb-1 px-1">
          {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map(m => (
            <span key={m} className="text-muted-foreground" style={{ fontSize: "10px" }}>{m}</span>
          ))}
        </div>

        {/* SVG Area Chart */}
        <svg viewBox="0 0 600 120" className="w-full" style={{ height: "140px" }} preserveAspectRatio="none">
          <defs>
            <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.25" />
              <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.02" />
            </linearGradient>
          </defs>
          {/* Grid lines */}
          {[30, 60, 90].map(y => (
            <line key={y} x1="0" y1={y} x2="600" y2={y} stroke="#e5e7eb" strokeWidth="0.5" />
          ))}
          {/* Area fill */}
          <path d={areaPath} fill="url(#revenueGrad)" />
          {/* Line */}
          <polyline
            points={polylinePoints}
            fill="none"
            stroke="var(--primary)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Data points */}
          {chartPoints.map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r="3" fill="var(--primary)" />
          ))}
        </svg>

        <div className="flex items-center gap-4 mt-3">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-0.5 rounded" style={{ backgroundColor: "var(--primary)" }} />
            <span className="text-muted-foreground" style={{ fontSize: "11px" }}>Revenue 2024</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-0.5 rounded border-t border-dashed border-muted-foreground" />
            <span className="text-muted-foreground" style={{ fontSize: "11px" }}>Revenue 2023</span>
          </div>
        </div>
      </div>

      {/* Monthly Summary Table */}
      <div className="bg-white rounded-xl border border-border/50">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border/50">
          <h2 className="font-semibold text-foreground" style={{ fontSize: "15px" }}>Monthly Summary</h2>
          <div className="flex items-center gap-2 text-muted-foreground" style={{ fontSize: "12px" }}>
            <Calendar className="w-3.5 h-3.5" />
            FY 2024
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50">
                {["Month", "Orders", "Revenue", "Avg Order Value", "Returns"].map(h => (
                  <th key={h} className="text-left px-6 py-3 text-muted-foreground font-medium" style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.06em" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {monthlySummary.map((row, i) => (
                <tr key={row.month} className={`border-b border-border/30 hover:bg-muted/20 transition-colors ${i === monthlySummary.length - 1 ? "border-b-0" : ""}`}>
                  <td className="px-6 py-3 font-medium text-foreground" style={{ fontSize: "13px" }}>{row.month}</td>
                  <td className="px-6 py-3 text-foreground" style={{ fontSize: "13px" }}>{row.orders}</td>
                  <td className="px-6 py-3 text-foreground font-medium" style={{ fontSize: "13px" }}>{row.revenue}</td>
                  <td className="px-6 py-3 text-muted-foreground" style={{ fontSize: "13px" }}>{row.avgOrder}</td>
                  <td className="px-6 py-3" style={{ fontSize: "13px" }}>
                    <span className="text-rose-500">{row.returns}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
