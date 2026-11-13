import { PageHeader } from "@/components/admin/page-header"
import { Plus, Eye, FileText, CheckCircle, Clock, Send, Package } from "lucide-react"

interface PurchaseOrder {
  id: string
  supplier: string
  items: number
  total: string
  status: "Draft" | "Sent" | "Confirmed" | "Received"
  orderDate: string
  expected: string
  notes: string
}

const purchaseOrders: PurchaseOrder[] = []

const statusConfig = {
  Draft: { className: "bg-gray-100 text-gray-500", icon: FileText },
  Sent: { className: "bg-blue-50 text-blue-700", icon: Send },
  Confirmed: { className: "bg-amber-50 text-amber-700", icon: Clock },
  Received: { className: "bg-emerald-50 text-emerald-700", icon: CheckCircle },
}

export default function PurchaseOrdersPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Purchase Orders"
        description="Track orders placed with your suppliers"
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Inventory", href: "/admin/inventory" }, { label: "Purchase Orders" }]}
        actions={
          <button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors" style={{ fontSize: "13px" }}>
            <Plus className="w-4 h-4" strokeWidth={1.5} /> Create PO
          </button>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total POs", value: "0", sub: "this month", color: "var(--primary)" },
          { label: "Pending Value", value: "$0", sub: "outstanding", color: "#D97706" },
          { label: "Confirmed", value: "0", sub: "awaiting delivery", color: "#2563EB" },
          { label: "Received", value: "0", sub: "this month", color: "#10B981" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-border/50 p-4">
            <p className="text-muted-foreground" style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.07em" }}>{s.label}</p>
            <p className="font-semibold mt-1" style={{ fontSize: "22px", color: s.color }}>{s.value}</p>
            <p className="text-muted-foreground" style={{ fontSize: "11px" }}>{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-border/50">
        <div className="px-5 py-4" style={{ borderBottom: "1px solid var(--accent)" }}>
          <h2 className="font-semibold text-foreground" style={{ fontSize: "14px" }}>Purchase Orders</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--accent)" }}>
                {["PO Number", "Supplier", "Items", "Total", "Status", "Order Date", "Expected", "Notes", ""].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-muted-foreground font-medium" style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.07em" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {purchaseOrders.map((po, i) => {
                const statusCfg = statusConfig[po.status]
                const StatusIcon = statusCfg.icon
                return (
                  <tr
                    key={po.id}
                    className="hover:bg-[var(--muted)] transition-colors"
                    style={{ borderBottom: i < purchaseOrders.length - 1 ? "1px solid var(--accent)" : "none" }}
                  >
                    <td className="px-5 py-3">
                      <span className="font-mono font-semibold text-foreground" style={{ fontSize: "13px" }}>{po.id}</span>
                    </td>
                    <td className="px-5 py-3 font-medium text-foreground" style={{ fontSize: "13px" }}>{po.supplier}</td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-1">
                        <Package className="w-3.5 h-3.5 text-muted-foreground" strokeWidth={1.5} />
                        <span className="text-foreground" style={{ fontSize: "13px" }}>{po.items} lines</span>
                      </div>
                    </td>
                    <td className="px-5 py-3 font-semibold text-foreground" style={{ fontSize: "13px" }}>{po.total}</td>
                    <td className="px-5 py-3">
                      <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 font-medium ${statusCfg.className}`} style={{ fontSize: "11px" }}>
                        <StatusIcon className="w-3 h-3" strokeWidth={2} />
                        {po.status}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-muted-foreground" style={{ fontSize: "13px" }}>{po.orderDate}</td>
                    <td className="px-5 py-3 text-muted-foreground" style={{ fontSize: "13px" }}>{po.expected}</td>
                    <td className="px-5 py-3 max-w-xs">
                      <p className="text-muted-foreground truncate" style={{ fontSize: "12px" }}>{po.notes}</p>
                    </td>
                    <td className="px-5 py-3">
                      <button className="p-1.5 rounded-lg hover:bg-[var(--accent)] transition-colors text-muted-foreground hover:text-foreground">
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
