import { PageHeader } from "@/components/admin/page-header"
import { ShoppingCart, CheckCircle, XCircle, RefreshCcw, Download } from "lucide-react"

const stats = [
  { label: "Total Orders", value: "0", icon: ShoppingCart, color: "var(--primary)", bg: "#20212715" },
  { label: "Completed", value: "0", icon: CheckCircle, color: "#059669", bg: "#05966915" },
  { label: "Cancelled", value: "0", icon: XCircle, color: "#dc2626", bg: "#dc262615" },
  { label: "Returned", value: "0", icon: RefreshCcw, color: "#d97706", bg: "#d9770615" },
]

const statusDistribution: { status: string; count: number; pct: number; color: string; }[] = []

const monthlyOrders = [
  { month: "January", total: 0, completed: 0, cancelled: 0, returned: 0 },
  { month: "February", total: 0, completed: 0, cancelled: 0, returned: 0 },
  { month: "March", total: 0, completed: 0, cancelled: 0, returned: 0 },
  { month: "April", total: 0, completed: 0, cancelled: 0, returned: 0 },
  { month: "May", total: 0, completed: 0, cancelled: 0, returned: 0 },
  { month: "June", total: 0, completed: 0, cancelled: 0, returned: 0 },
  { month: "July", total: 0, completed: 0, cancelled: 0, returned: 0 },
  { month: "August", total: 0, completed: 0, cancelled: 0, returned: 0 },
  { month: "September", total: 0, completed: 0, cancelled: 0, returned: 0 },
  { month: "October", total: 0, completed: 0, cancelled: 0, returned: 0 },
  { month: "November", total: 0, completed: 0, cancelled: 0, returned: 0 },
  { month: "December", total: 0, completed: 0, cancelled: 0, returned: 0 },
]

export default function OrdersReportPage() {
  return (
    <div>
      <PageHeader
        title="Orders Report"
        description="Order status breakdown and monthly trends"
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Reports", href: "/admin/reports" }, { label: "Orders Report" }]}
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
        {stats.map((s) => {
          const Icon = s.icon
          return (
            <div key={s.label} className="bg-white rounded-xl border border-border/50 p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-muted-foreground" style={{ fontSize: "13px" }}>{s.label}</span>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: s.bg }}>
                  <Icon className="w-4 h-4" style={{ color: s.color }} />
                </div>
              </div>
              <p className="text-2xl font-semibold text-foreground">{s.value}</p>
            </div>
          )
        })}
      </div>

      {/* Status Distribution */}
      <div className="bg-white rounded-xl border border-border/50 p-6 mb-6">
        <h2 className="font-semibold text-foreground mb-5" style={{ fontSize: "15px" }}>Order Status Distribution</h2>
        <div className="mb-4">
          <div className="flex w-full h-6 rounded-full overflow-hidden gap-0.5">
            {statusDistribution.map(s => (
              <div key={s.status} className="h-full first:rounded-l-full last:rounded-r-full" style={{ width: `${s.pct}%`, backgroundColor: s.color }} />
            ))}
          </div>
        </div>
        <div className="flex items-center gap-6 flex-wrap">
          {statusDistribution.map(s => (
            <div key={s.status} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: s.color }} />
              <span className="text-foreground" style={{ fontSize: "13px" }}>{s.status}</span>
              <span className="text-muted-foreground" style={{ fontSize: "12px" }}>({s.count.toLocaleString()} — {s.pct}%)</span>
            </div>
          ))}
        </div>
      </div>

      {/* Monthly Table */}
      <div className="bg-white rounded-xl border border-border/50">
        <div className="px-6 py-4 border-b border-border/50">
          <h2 className="font-semibold text-foreground" style={{ fontSize: "15px" }}>Monthly Order Breakdown</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50">
                {["Month", "Total Orders", "Completed", "Cancelled", "Returned", "Completion Rate"].map(h => (
                  <th key={h} className="text-left px-6 py-3 text-muted-foreground font-medium" style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.06em" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {monthlyOrders.map((row, i) => {
                const rate = ((row.completed / row.total) * 100).toFixed(1)
                return (
                  <tr key={row.month} className={`border-b border-border/30 hover:bg-muted/20 transition-colors ${i === monthlyOrders.length - 1 ? "border-b-0" : ""}`}>
                    <td className="px-6 py-3 font-medium text-foreground" style={{ fontSize: "13px" }}>{row.month}</td>
                    <td className="px-6 py-3 text-foreground font-semibold" style={{ fontSize: "13px" }}>{row.total}</td>
                    <td className="px-6 py-3 text-emerald-600" style={{ fontSize: "13px" }}>{row.completed}</td>
                    <td className="px-6 py-3 text-rose-500" style={{ fontSize: "13px" }}>{row.cancelled}</td>
                    <td className="px-6 py-3 text-amber-600" style={{ fontSize: "13px" }}>{row.returned}</td>
                    <td className="px-6 py-3" style={{ fontSize: "13px" }}>
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 rounded-full bg-muted/40 overflow-hidden">
                          <div className="h-full rounded-full bg-emerald-500" style={{ width: `${rate}%` }} />
                        </div>
                        <span className="text-muted-foreground">{rate}%</span>
                      </div>
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
