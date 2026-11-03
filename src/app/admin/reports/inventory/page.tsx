import { PageHeader } from "@/components/admin/page-header"
import { Package, Download, TrendingUp } from "lucide-react"

const products = [
  { name: "Silk Wrap Dress", category: "Dresses", stock: 84, stockValue: "$16,800", daysInStock: 12, turnover: "9.2x" },
  { name: "High-Waist Trousers", category: "Bottoms", stock: 142, stockValue: "$9,940", daysInStock: 18, turnover: "7.1x" },
  { name: "Cashmere Knit Sweater", category: "Tops", stock: 67, stockValue: "$6,030", daysInStock: 22, turnover: "6.4x" },
  { name: "Leather Crossbody Bag", category: "Accessories", stock: 53, stockValue: "$4,717", daysInStock: 31, turnover: "5.3x" },
  { name: "Linen Blazer", category: "Outerwear", stock: 38, stockValue: "$3,610", daysInStock: 27, turnover: "4.8x" },
  { name: "Floral Midi Skirt", category: "Bottoms", stock: 112, stockValue: "$7,280", daysInStock: 14, turnover: "8.1x" },
  { name: "Ribbed Tank Top", category: "Tops", stock: 204, stockValue: "$9,180", daysInStock: 9, turnover: "11.2x" },
  { name: "Ankle Boots", category: "Footwear", stock: 29, stockValue: "$3,335", daysInStock: 44, turnover: "3.6x" },
]

const totalSkus = 486
const totalStockValue = "$89,432"
const avgDaysInStock = 22
const turnoverRate = "6.8x"

export default function InventoryReportPage() {
  return (
    <div>
      <PageHeader
        title="Inventory Report"
        description="Stock levels, values, and turnover rates across products"
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Reports", href: "/admin/reports" }, { label: "Inventory" }]}
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
          { label: "Total SKUs", value: totalSkus.toLocaleString(), sub: "Active products", icon: Package, color: "var(--primary)" },
          { label: "Total Stock Value", value: totalStockValue, sub: "At retail price", icon: Package, color: "#059669" },
          { label: "Avg Days In Stock", value: `${avgDaysInStock}d`, sub: "Before first sale", icon: TrendingUp, color: "#d97706" },
          { label: "Inventory Turnover", value: turnoverRate, sub: "Annual rate", icon: TrendingUp, color: "#7c3aed" },
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

      {/* Category Value Distribution */}
      <div className="bg-white rounded-xl border border-border/50 p-6 mb-6">
        <h2 className="font-semibold text-foreground mb-4" style={{ fontSize: "15px" }}>Stock Value by Category</h2>
        <div className="space-y-3">
          {[
            { cat: "Dresses", value: "$28,440", pct: 32 },
            { cat: "Tops", value: "$18,620", pct: 21 },
            { cat: "Bottoms", value: "$16,810", pct: 19 },
            { cat: "Accessories", value: "$12,480", pct: 14 },
            { cat: "Footwear", value: "$9,140", pct: 10 },
            { cat: "Outerwear", value: "$3,942", pct: 4 },
          ].map(c => (
            <div key={c.cat} className="flex items-center gap-4">
              <span className="w-24 shrink-0 text-foreground" style={{ fontSize: "13px" }}>{c.cat}</span>
              <div className="flex-1 h-2 bg-muted/30 rounded-full overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${c.pct}%`, backgroundColor: "var(--primary)" }} />
              </div>
              <span className="w-20 text-right text-muted-foreground" style={{ fontSize: "12px" }}>{c.value} ({c.pct}%)</span>
            </div>
          ))}
        </div>
      </div>

      {/* Product Table */}
      <div className="bg-white rounded-xl border border-border/50">
        <div className="px-6 py-4 border-b border-border/50">
          <h2 className="font-semibold text-foreground" style={{ fontSize: "15px" }}>Product Inventory Details</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50">
                {["Product", "Category", "In Stock", "Stock Value", "Days In Stock", "Turnover Rate"].map(h => (
                  <th key={h} className="text-left px-6 py-3 text-muted-foreground font-medium" style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.06em" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {products.map((p, i) => (
                <tr key={p.name} className={`border-b border-border/30 hover:bg-muted/20 transition-colors ${i === products.length - 1 ? "border-b-0" : ""}`}>
                  <td className="px-6 py-3.5 font-medium text-foreground" style={{ fontSize: "13px" }}>{p.name}</td>
                  <td className="px-6 py-3.5" style={{ fontSize: "13px" }}>
                    <span className="px-2 py-0.5 rounded-full bg-muted/40 text-muted-foreground" style={{ fontSize: "11px" }}>{p.category}</span>
                  </td>
                  <td className="px-6 py-3.5 text-foreground font-medium" style={{ fontSize: "13px" }}>{p.stock}</td>
                  <td className="px-6 py-3.5 text-foreground" style={{ fontSize: "13px" }}>{p.stockValue}</td>
                  <td className="px-6 py-3.5 text-muted-foreground" style={{ fontSize: "13px" }}>{p.daysInStock} days</td>
                  <td className="px-6 py-3.5" style={{ fontSize: "13px" }}>
                    <span className="font-semibold" style={{ color: "var(--primary)" }}>{p.turnover}</span>
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
