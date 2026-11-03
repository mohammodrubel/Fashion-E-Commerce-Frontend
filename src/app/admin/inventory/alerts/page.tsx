import { PageHeader } from "@/components/admin/page-header"
import { Bell, BellOff, AlertTriangle, XCircle, Package, Settings, ChevronDown } from "lucide-react"

interface AlertItem {
  id: string
  product: string
  sku: string
  category: string
  current: number
  threshold: number
  severity: "Out of Stock" | "Critical" | "Low"
  warehouse: string
  since: string
}

const activeAlerts: AlertItem[] = [
  { id: "ALT-001", product: "Printed Slip Skirt", sku: "SK-PSK-008", category: "Skirts", current: 0, threshold: 5, severity: "Out of Stock", warehouse: "East Branch", since: "Oct 18, 2026" },
  { id: "ALT-002", product: "Burgundy Blazer Dress", sku: "DR-BBD-012", category: "Dresses", current: 0, threshold: 5, severity: "Out of Stock", warehouse: "Main Warehouse", since: "Oct 14, 2026" },
  { id: "ALT-003", product: "Silk Cami Blouse", sku: "TOP-SCB-004", category: "Tops", current: 4, threshold: 10, severity: "Critical", warehouse: "Main Warehouse", since: "Oct 22, 2026" },
  { id: "ALT-004", product: "Velvet Mini Dress", sku: "DR-VMD-009", category: "Dresses", current: 5, threshold: 8, severity: "Critical", warehouse: "West Branch", since: "Oct 20, 2026" },
  { id: "ALT-005", product: "Ribbed Knit Sweater", sku: "KN-RIB-006", category: "Knitwear", current: 8, threshold: 10, severity: "Low", warehouse: "Main Warehouse", since: "Oct 19, 2026" },
  { id: "ALT-006", product: "Satin Slip Midi Skirt", sku: "SK-SSM-018", category: "Skirts", current: 4, threshold: 8, severity: "Low", warehouse: "Main Warehouse", since: "Oct 17, 2026" },
]

const severityConfig = {
  "Out of Stock": { className: "bg-red-50 text-red-600 border-red-200", badgeCls: "bg-red-100 text-red-700", icon: XCircle, dot: "#EF4444" },
  "Critical": { className: "bg-red-50/60 text-red-500 border-red-100", badgeCls: "bg-red-50 text-red-600", icon: AlertTriangle, dot: "#F97316" },
  "Low": { className: "bg-amber-50 text-amber-700 border-amber-200", badgeCls: "bg-amber-50 text-amber-700", icon: AlertTriangle, dot: "#F59E0B" },
}

const categories = ["Dresses", "Tops", "Skirts", "Knitwear", "Pants", "Outerwear", "Accessories", "Footwear"]

export default function StockAlertsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Stock Alerts"
        description="Configure alert thresholds and view active stock warnings"
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Inventory", href: "/admin/inventory" }, { label: "Alerts" }]}
      />

      {/* Alert Settings */}
      <div className="bg-white rounded-xl border border-border/50 p-5">
        <div className="flex items-center gap-2.5 mb-5" style={{ borderBottom: "1px solid var(--accent)", paddingBottom: "14px" }}>
          <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: "var(--accent)" }}>
            <Settings className="w-3.5 h-3.5" style={{ color: "var(--primary)" }} strokeWidth={1.5} />
          </div>
          <h2 className="font-semibold text-foreground" style={{ fontSize: "14px" }}>Alert Settings</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Notification toggles */}
          <div>
            <p className="font-medium text-foreground mb-3" style={{ fontSize: "13px" }}>Notification Channels</p>
            <div className="space-y-3">
              {[
                { label: "Email alerts", desc: "Receive email for each new alert", enabled: true },
                { label: "Dashboard notifications", desc: "Show in admin dashboard", enabled: true },
                { label: "Slack integration", desc: "Post to #inventory channel", enabled: false },
              ].map((n) => (
                <label key={n.label} className="flex items-center justify-between gap-3 cursor-pointer">
                  <div>
                    <p className="font-medium text-foreground" style={{ fontSize: "13px" }}>{n.label}</p>
                    <p className="text-muted-foreground" style={{ fontSize: "11px" }}>{n.desc}</p>
                  </div>
                  <div className={`w-10 h-5 rounded-full relative transition-colors ${n.enabled ? "bg-primary" : "bg-gray-200"}`}>
                    <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${n.enabled ? "left-5" : "left-0.5"}`} />
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Per-category thresholds */}
          <div>
            <p className="font-medium text-foreground mb-3" style={{ fontSize: "13px" }}>Min Stock Threshold by Category</p>
            <div className="space-y-2.5">
              {categories.slice(0, 5).map((cat) => (
                <div key={cat} className="flex items-center justify-between gap-3">
                  <label className="text-foreground flex-1" style={{ fontSize: "13px" }}>{cat}</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      defaultValue={cat === "Dresses" ? 8 : cat === "Tops" ? 10 : cat === "Knitwear" ? 10 : cat === "Skirts" ? 5 : 8}
                      className="w-16 px-2 py-1.5 rounded-lg border border-border/60 bg-[var(--muted)] text-foreground text-center focus:outline-none focus:border-primary/40"
                      style={{ fontSize: "13px" }}
                    />
                    <span className="text-muted-foreground" style={{ fontSize: "12px" }}>units</span>
                  </div>
                </div>
              ))}
              <button className="text-primary hover:text-primary/80 transition-colors" style={{ fontSize: "12px" }}>
                + Show all categories
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-4 pt-4" style={{ borderTop: "1px solid var(--accent)" }}>
          <button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors" style={{ fontSize: "13px" }}>
            Save Settings
          </button>
        </div>
      </div>

      {/* Active Alerts */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4" style={{ color: "var(--primary)" }} strokeWidth={1.5} />
            <h2 className="font-semibold text-foreground" style={{ fontSize: "14px" }}>Active Alerts</h2>
            <span className="inline-flex items-center rounded-full px-2 py-0.5 bg-red-100 text-red-700 font-medium" style={{ fontSize: "11px" }}>{activeAlerts.length}</span>
          </div>
          <div className="relative">
            <select className="px-3 py-1.5 rounded-lg border border-border/60 bg-white text-muted-foreground focus:outline-none appearance-none pr-8" style={{ fontSize: "12px" }}>
              <option>All Severities</option>
              <option>Out of Stock</option>
              <option>Critical</option>
              <option>Low</option>
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground pointer-events-none" strokeWidth={1.5} />
          </div>
        </div>

        <div className="space-y-3">
          {activeAlerts.map((alert) => {
            const cfg = severityConfig[alert.severity]
            const AlertIcon = cfg.icon
            const pct = alert.current === 0 ? 0 : Math.min((alert.current / alert.threshold) * 100, 100)
            return (
              <div
                key={alert.id}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 rounded-xl border"
                style={{ backgroundColor: alert.severity === "Out of Stock" ? "#FEF2F2" : alert.severity === "Critical" ? "#FFF7ED" : "#FFFBEB", borderColor: alert.severity === "Out of Stock" ? "#FECACA" : "#FDE68A" }}
              >
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: cfg.dot + "20" }}>
                    <AlertIcon className="w-4.5 h-4.5" style={{ color: cfg.dot }} strokeWidth={1.5} />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-0.5">
                      <p className="font-semibold text-foreground" style={{ fontSize: "13px" }}>{alert.product}</p>
                      <span className="font-mono text-muted-foreground" style={{ fontSize: "11px" }}>{alert.sku}</span>
                      <span className={`inline-flex items-center rounded-full px-2 py-0.5 font-medium ${cfg.badgeCls}`} style={{ fontSize: "10px" }}>{alert.severity}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <p className="text-muted-foreground" style={{ fontSize: "12px" }}>
                        Stock: <span className="font-semibold" style={{ color: cfg.dot }}>{alert.current}</span> / {alert.threshold} min · {alert.warehouse}
                      </p>
                      <div className="flex-1 max-w-[100px] rounded-full h-1.5" style={{ backgroundColor: "#E5E7EB" }}>
                        <div className="h-1.5 rounded-full" style={{ width: `${pct}%`, backgroundColor: cfg.dot }} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div>
                    <p className="text-muted-foreground" style={{ fontSize: "11px" }}>Since</p>
                    <p className="font-medium text-foreground" style={{ fontSize: "12px" }}>{alert.since}</p>
                  </div>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors" style={{ fontSize: "12px" }}>
                    <Package className="w-3.5 h-3.5" strokeWidth={1.5} /> Reorder
                  </button>
                  <button className="p-1.5 rounded-lg hover:bg-white/60 transition-colors text-muted-foreground">
                    <BellOff className="w-3.5 h-3.5" strokeWidth={1.5} />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
