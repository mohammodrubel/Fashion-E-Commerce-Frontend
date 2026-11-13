import { PageHeader } from "@/components/admin/page-header"
import { XCircle, Package, AlertTriangle } from "lucide-react"

interface OutOfStockItem {
  product: string
  sku: string
  category: string
  lastSold: string
  demand: "High" | "Medium" | "Low"
  supplier: string
  leadDays: number
}

const outOfStockItems: OutOfStockItem[] = []

const demandConfig = {
  High: "bg-red-50 text-red-600",
  Medium: "bg-amber-50 text-amber-700",
  Low: "bg-gray-100 text-gray-500",
}

export default function OutOfStockPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Out of Stock"
        description="Products with zero available inventory requiring immediate restocking"
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Inventory", href: "/admin/inventory" }, { label: "Out of Stock" }]}
      />

      {/* Alert Banner */}
      <div className="flex items-start gap-3 p-4 rounded-xl border" style={{ backgroundColor: "#FEF2F2", borderColor: "#FECACA" }}>
        <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5 text-red-600" strokeWidth={1.5} />
        <div>
          <p className="font-medium text-red-700" style={{ fontSize: "13px" }}>4 products are currently out of stock</p>
          <p style={{ fontSize: "12px", color: "#DC2626", opacity: 0.8, marginTop: "2px" }}>
            Customers cannot purchase these items. Restock immediately to avoid lost sales.
          </p>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Out of Stock", value: "0 items" },
          { label: "High Demand", value: "0 items" },
          { label: "Est. Lost Revenue/day", value: "~$0" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-border/50 p-4">
            <p className="text-muted-foreground" style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.07em" }}>{s.label}</p>
            <p className="font-semibold text-foreground mt-1" style={{ fontSize: "22px" }}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Cards */}
      <div className="space-y-4">
        {outOfStockItems.map((item) => (
          <div key={item.sku} className="bg-white rounded-xl border border-border/50 p-5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              {/* Product */}
              <div className="flex items-center gap-3 flex-1">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: "var(--muted)", border: "1px solid var(--accent)" }}>
                  <Package className="w-5 h-5 text-muted-foreground" strokeWidth={1.5} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-foreground" style={{ fontSize: "14px" }}>{item.product}</p>
                    <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 bg-red-50 text-red-600 font-medium" style={{ fontSize: "10px" }}>
                      <XCircle className="w-3 h-3" strokeWidth={2} /> Out of Stock
                    </span>
                  </div>
                  <p className="text-muted-foreground" style={{ fontSize: "12px" }}>SKU: {item.sku} · {item.category}</p>
                </div>
              </div>

              {/* Meta */}
              <div className="flex flex-wrap gap-4">
                <div>
                  <p className="text-muted-foreground" style={{ fontSize: "11px" }}>Last Sold</p>
                  <p className="font-medium text-foreground" style={{ fontSize: "13px" }}>{item.lastSold}</p>
                </div>
                <div>
                  <p className="text-muted-foreground" style={{ fontSize: "11px" }}>Demand</p>
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 font-medium ${demandConfig[item.demand]}`} style={{ fontSize: "11px" }}>{item.demand}</span>
                </div>
                <div>
                  <p className="text-muted-foreground" style={{ fontSize: "11px" }}>Supplier</p>
                  <p className="font-medium text-foreground" style={{ fontSize: "13px" }}>{item.supplier}</p>
                </div>
                <div>
                  <p className="text-muted-foreground" style={{ fontSize: "11px" }}>Lead Time</p>
                  <p className="font-medium text-foreground" style={{ fontSize: "13px" }}>{item.leadDays} days</p>
                </div>
              </div>

              {/* Restock Input + Button */}
              <div className="flex items-center gap-2 shrink-0">
                <input
                  type="number"
                  defaultValue={50}
                  className="w-20 px-3 py-2 rounded-lg border border-border/60 bg-[var(--muted)] text-foreground focus:outline-none focus:border-primary/40 text-center"
                  style={{ fontSize: "13px" }}
                />
                <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors" style={{ fontSize: "13px" }}>
                  Restock
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
