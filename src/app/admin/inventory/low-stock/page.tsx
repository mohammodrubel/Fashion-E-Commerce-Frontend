import { PageHeader } from "@/components/admin/page-header"
import { AlertTriangle, ShoppingCart, RefreshCw } from "lucide-react"

interface LowStockItem {
  product: string
  sku: string
  category: string
  current: number
  minimum: number
  reorderQty: number
  lastRestocked: string
  supplier: string
}

const lowStockItems: LowStockItem[] = [
  { product: "Silk Cami Blouse", sku: "TOP-SCB-004", category: "Tops", current: 7, minimum: 10, reorderQty: 30, lastRestocked: "Sep 15, 2026", supplier: "Silk Supply Co." },
  { product: "Ribbed Knit Sweater", sku: "KN-RIB-006", category: "Knitwear", current: 8, minimum: 10, reorderQty: 40, lastRestocked: "Aug 22, 2026", supplier: "Nordic Knits Ltd." },
  { product: "Velvet Mini Dress", sku: "DR-VMD-009", category: "Dresses", current: 5, minimum: 8, reorderQty: 25, lastRestocked: "Oct 1, 2026", supplier: "FabricHouse EU" },
  { product: "Cropped Denim Jacket", sku: "JK-CDJ-014", category: "Outerwear", current: 6, minimum: 12, reorderQty: 30, lastRestocked: "Sep 5, 2026", supplier: "Denim Works USA" },
  { product: "Satin Slip Midi Skirt", sku: "SK-SSM-018", category: "Skirts", current: 4, minimum: 8, reorderQty: 20, lastRestocked: "Aug 30, 2026", supplier: "Silk Supply Co." },
  { product: "Leather Belt Bag", sku: "AC-LBB-022", category: "Accessories", current: 9, minimum: 15, reorderQty: 30, lastRestocked: "Oct 8, 2026", supplier: "LeatherCraft Co." },
]

export default function LowStockPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Low Stock"
        description="Products approaching their minimum stock threshold"
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Inventory", href: "/admin/inventory" }, { label: "Low Stock" }]}
        actions={
          <button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors" style={{ fontSize: "13px" }}>
            <ShoppingCart className="w-4 h-4" strokeWidth={1.5} /> Reorder All
          </button>
        }
      />

      {/* Warning */}
      <div className="flex items-start gap-3 p-4 rounded-xl border" style={{ backgroundColor: "#FFFBEB", borderColor: "#FDE68A" }}>
        <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5 text-amber-600" strokeWidth={1.5} />
        <div>
          <p className="font-medium text-amber-700" style={{ fontSize: "13px" }}>6 products need reordering soon</p>
          <p className="text-amber-600/80 mt-0.5" style={{ fontSize: "12px" }}>
            These items are below or close to their minimum stock level. Place purchase orders to avoid stockouts.
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-border/50">
        <div className="px-5 py-4" style={{ borderBottom: "1px solid #F0EDEF" }}>
          <h2 className="font-semibold text-foreground" style={{ fontSize: "14px" }}>Low Stock Products</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid #F0EDEF" }}>
                {["Product", "SKU", "Category", "Current", "Minimum", "Stock Bar", "Last Restocked", "Action"].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-muted-foreground font-medium" style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.07em" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {lowStockItems.map((item, i) => {
                const pct = Math.min((item.current / item.minimum) * 100, 100)
                const isCritical = item.current <= item.minimum / 2
                return (
                  <tr
                    key={item.sku}
                    className="hover:bg-[#F8F7F5] transition-colors"
                    style={{ borderBottom: i < lowStockItems.length - 1 ? "1px solid #F0EDEF" : "none" }}
                  >
                    <td className="px-5 py-3 font-medium text-foreground" style={{ fontSize: "13px" }}>{item.product}</td>
                    <td className="px-5 py-3 font-mono text-muted-foreground" style={{ fontSize: "12px" }}>{item.sku}</td>
                    <td className="px-5 py-3 text-muted-foreground" style={{ fontSize: "13px" }}>{item.category}</td>
                    <td className="px-5 py-3">
                      <span className={`font-semibold ${isCritical ? "text-red-600" : "text-amber-600"}`} style={{ fontSize: "13px" }}>{item.current}</span>
                    </td>
                    <td className="px-5 py-3 text-muted-foreground" style={{ fontSize: "13px" }}>{item.minimum}</td>
                    <td className="px-5 py-3" style={{ minWidth: "120px" }}>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 rounded-full h-2" style={{ backgroundColor: "#F0EDEF" }}>
                          <div
                            className="h-2 rounded-full transition-all"
                            style={{ width: `${pct}%`, backgroundColor: isCritical ? "#EF4444" : "#F59E0B" }}
                          />
                        </div>
                        <span style={{ fontSize: "11px", color: isCritical ? "#EF4444" : "#F59E0B" }}>{Math.round(pct)}%</span>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-muted-foreground" style={{ fontSize: "13px" }}>{item.lastRestocked}</td>
                    <td className="px-5 py-3">
                      <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors" style={{ fontSize: "12px" }}>
                        <RefreshCw className="w-3 h-3" strokeWidth={2} />
                        Reorder ({item.reorderQty})
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
