import { PageHeader } from "@/components/admin/page-header"
import { AlertTriangle, Package, RefreshCcw, Download } from "lucide-react"

const lowStockItems: { product: string; sku: string; stock: number; minLevel: number; daysUntilOut: number; supplier: string; urgency: string; }[] = []

const urgencyConfig: Record<string, { label: string; color: string; bg: string; dot: string }> = {
  critical: { label: "Critical", color: "#dc2626", bg: "#fef2f2", dot: "#dc2626" },
  high: { label: "High", color: "#d97706", bg: "#fffbeb", dot: "#d97706" },
  medium: { label: "Medium", color: "#7c3aed", bg: "#f5f3ff", dot: "#7c3aed" },
  low: { label: "Low", color: "#059669", bg: "#f0fdf4", dot: "#059669" },
}

export default function LowStockPage() {
  const critical = lowStockItems.filter(i => i.urgency === "critical").length
  const high = lowStockItems.filter(i => i.urgency === "high").length

  return (
    <div>
      <PageHeader
        title="Low Stock Report"
        description="Products approaching or below minimum stock levels"
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Reports", href: "/admin/reports" }, { label: "Low Stock" }]}
        actions={
          <div className="flex items-center gap-2">
            <button
              className="flex items-center gap-2 rounded-lg border border-border/50 bg-white px-3 py-2 text-foreground hover:bg-muted/30 transition-colors"
              style={{ fontSize: "13px" }}
            >
              <Download className="w-4 h-4" />
              Export
            </button>
            <button
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-white transition-colors"
              style={{ fontSize: "13px", backgroundColor: "var(--primary)" }}
            >
              <RefreshCcw className="w-4 h-4" />
              Reorder All Critical
            </button>
          </div>
        }
      />

      {/* Alert Banner */}
      {(critical > 0 || high > 0) && (
        <div className="flex items-center gap-3 p-4 rounded-xl border border-rose-200 bg-rose-50 mb-6">
          <AlertTriangle className="w-5 h-5 text-rose-500 shrink-0" />
          <div>
            <p className="font-semibold text-rose-700" style={{ fontSize: "13px" }}>
              {critical} critical and {high} high urgency items need immediate attention
            </p>
            <p className="text-rose-600" style={{ fontSize: "12px" }}>
              {critical} items will stock out within 4 days. Contact suppliers immediately.
            </p>
          </div>
        </div>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {Object.entries(urgencyConfig).map(([key, cfg]) => {
          const count = lowStockItems.filter(i => i.urgency === key).length
          return (
            <div key={key} className="bg-white rounded-xl border border-border/50 p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: cfg.dot }} />
                <span className="text-muted-foreground" style={{ fontSize: "12px" }}>{cfg.label}</span>
              </div>
              <p className="text-2xl font-semibold text-foreground">{count}</p>
              <p className="text-muted-foreground" style={{ fontSize: "11px" }}>items</p>
            </div>
          )
        })}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-border/50">
        <div className="px-6 py-4 border-b border-border/50">
          <h2 className="font-semibold text-foreground" style={{ fontSize: "15px" }}>Items Sorted by Urgency</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50">
                {["Product", "SKU", "Current Stock", "Min Level", "Days Until Stockout", "Supplier", "Action"].map(h => (
                  <th key={h} className="text-left px-6 py-3 text-muted-foreground font-medium" style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.06em" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {lowStockItems.map((item, i) => {
                const urg = urgencyConfig[item.urgency]
                return (
                  <tr key={item.sku} className={`border-b border-border/30 hover:bg-muted/20 transition-colors ${i === lowStockItems.length - 1 ? "border-b-0" : ""}`}>
                    <td className="px-6 py-3.5" style={{ fontSize: "13px" }}>
                      <div className="flex items-center gap-2">
                        <Package className="w-4 h-4 text-muted-foreground shrink-0" />
                        <span className="font-medium text-foreground">{item.product}</span>
                      </div>
                    </td>
                    <td className="px-6 py-3.5" style={{ fontSize: "13px" }}>
                      <code className="px-1.5 py-0.5 rounded bg-muted/40 text-muted-foreground" style={{ fontSize: "11px" }}>{item.sku}</code>
                    </td>
                    <td className="px-6 py-3.5" style={{ fontSize: "13px" }}>
                      <span className="font-semibold" style={{ color: urg.color }}>{item.stock}</span>
                    </td>
                    <td className="px-6 py-3.5 text-muted-foreground" style={{ fontSize: "13px" }}>{item.minLevel}</td>
                    <td className="px-6 py-3.5" style={{ fontSize: "13px" }}>
                      <span className="font-semibold" style={{ color: urg.color }}>{item.daysUntilOut}d</span>
                    </td>
                    <td className="px-6 py-3.5 text-muted-foreground" style={{ fontSize: "13px" }}>{item.supplier}</td>
                    <td className="px-6 py-3.5" style={{ fontSize: "13px" }}>
                      <button
                        className="px-2.5 py-1 rounded-lg font-medium transition-colors"
                        style={{ fontSize: "11px", color: urg.color, backgroundColor: urg.bg }}
                      >
                        Reorder
                      </button>
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
