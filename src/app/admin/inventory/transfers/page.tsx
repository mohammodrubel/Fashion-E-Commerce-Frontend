import { PageHeader } from "@/components/admin/page-header"
import { Plus, ArrowRight, Truck, CheckCircle, Clock, Eye } from "lucide-react"

interface Transfer {
  id: string
  from: string
  to: string
  products: string
  itemCount: number
  status: "Pending" | "In Transit" | "Completed"
  date: string
  eta: string
}

const transfers: Transfer[] = [
  { id: "TRF-501", from: "Main Warehouse", to: "East Branch", products: "High-Rise Jeans, Cotton Tee, +3 more", itemCount: 75, status: "In Transit", date: "Oct 22, 2026", eta: "Oct 24, 2026" },
  { id: "TRF-500", from: "West Branch", to: "Main Warehouse", products: "Classic Trench Coat", itemCount: 10, status: "Completed", date: "Oct 20, 2026", eta: "Oct 21, 2026" },
  { id: "TRF-499", from: "Main Warehouse", to: "West Branch", products: "Floral Wrap Dress, Linen Trousers", itemCount: 40, status: "Completed", date: "Oct 17, 2026", eta: "Oct 19, 2026" },
  { id: "TRF-498", from: "East Branch", to: "Main Warehouse", products: "Silk Cami Blouse, Slip Skirt", itemCount: 15, status: "Completed", date: "Oct 14, 2026", eta: "Oct 15, 2026" },
  { id: "TRF-497", from: "Main Warehouse", to: "East Branch", products: "Oversized Blazer, Ribbed Sweater, +2", itemCount: 50, status: "Pending", date: "Oct 24, 2026", eta: "Oct 26, 2026" },
]

const statusConfig = {
  Pending: { className: "bg-amber-50 text-amber-700", icon: Clock },
  "In Transit": { className: "bg-blue-50 text-blue-700", icon: Truck },
  Completed: { className: "bg-emerald-50 text-emerald-700", icon: CheckCircle },
}

const warehouseColor: Record<string, string> = {
  "Main Warehouse": "#501D2A",
  "East Branch": "#2D5A8E",
  "West Branch": "#2D6B4F",
}

export default function StockTransfersPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Stock Transfers"
        description="Move inventory between warehouses and branches"
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Inventory", href: "/admin/inventory" }, { label: "Transfers" }]}
        actions={
          <button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors" style={{ fontSize: "13px" }}>
            <Plus className="w-4 h-4" strokeWidth={1.5} /> New Transfer
          </button>
        }
      />

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Pending", value: "1", color: "#D97706" },
          { label: "In Transit", value: "1", color: "#2563EB" },
          { label: "Completed (30d)", value: "3", color: "#10B981" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-border/50 p-4">
            <p className="text-muted-foreground" style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.07em" }}>{s.label}</p>
            <p className="font-semibold mt-1" style={{ fontSize: "22px", color: s.color }}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-border/50">
        <div className="px-5 py-4" style={{ borderBottom: "1px solid #F0EDEF" }}>
          <h2 className="font-semibold text-foreground" style={{ fontSize: "14px" }}>Transfer History</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid #F0EDEF" }}>
                {["Transfer ID", "From → To", "Products", "Items", "Status", "Date", "ETA", "Actions"].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-muted-foreground font-medium" style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.07em" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {transfers.map((t, i) => {
                const statusCfg = statusConfig[t.status]
                const StatusIcon = statusCfg.icon
                return (
                  <tr
                    key={t.id}
                    className="hover:bg-[#F8F7F5] transition-colors"
                    style={{ borderBottom: i < transfers.length - 1 ? "1px solid #F0EDEF" : "none" }}
                  >
                    <td className="px-5 py-3">
                      <span className="font-mono font-medium text-foreground" style={{ fontSize: "13px" }}>{t.id}</span>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <span className="font-medium" style={{ fontSize: "12px", color: warehouseColor[t.from] ?? "#501D2A" }}>{t.from}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" strokeWidth={1.5} />
                        <span className="font-medium" style={{ fontSize: "12px", color: warehouseColor[t.to] ?? "#2D5A8E" }}>{t.to}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3 max-w-xs">
                      <p className="text-muted-foreground truncate" style={{ fontSize: "12px" }}>{t.products}</p>
                    </td>
                    <td className="px-5 py-3 font-medium text-foreground" style={{ fontSize: "13px" }}>{t.itemCount}</td>
                    <td className="px-5 py-3">
                      <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 font-medium ${statusCfg.className}`} style={{ fontSize: "11px" }}>
                        <StatusIcon className="w-3 h-3" strokeWidth={2} />
                        {t.status}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-muted-foreground" style={{ fontSize: "13px" }}>{t.date}</td>
                    <td className="px-5 py-3 text-muted-foreground" style={{ fontSize: "13px" }}>{t.eta}</td>
                    <td className="px-5 py-3">
                      <button className="p-1.5 rounded-lg hover:bg-[#F0EDEF] transition-colors text-muted-foreground hover:text-foreground">
                        <Eye className="w-3.5 h-3.5" strokeWidth={1.5} />
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
