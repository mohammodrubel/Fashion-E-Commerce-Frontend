import { PageHeader } from "@/components/admin/page-header"
import { Download, ArrowUpDown, TrendingUp } from "lucide-react"

const products: { rank: number; name: string; category: string; units: number; revenue: string; pct: string; avgPrice: string; }[] = []

export default function SalesByProductPage() {
  return (
    <div>
      <PageHeader
        title="Sales by Product"
        description="Revenue and units sold breakdown per product"
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Reports", href: "/admin/reports" }, { label: "Sales by Product" }]}
        actions={
          <button
            className="flex items-center gap-2 rounded-lg border border-border/50 bg-white px-3 py-2 text-foreground hover:bg-muted/30 transition-colors"
            style={{ fontSize: "13px" }}
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        }
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-border/50 p-5">
          <p className="text-muted-foreground mb-1" style={{ fontSize: "12px" }}>Top Selling Product</p>
          <p className="font-semibold text-foreground" style={{ fontSize: "14px" }}>—</p>
          <p className="text-muted-foreground" style={{ fontSize: "12px" }}>0 units sold</p>
        </div>
        <div className="bg-white rounded-xl border border-border/50 p-5">
          <p className="text-muted-foreground mb-1" style={{ fontSize: "12px" }}>Highest Revenue Product</p>
          <p className="font-semibold text-foreground" style={{ fontSize: "14px" }}>—</p>
          <p className="text-muted-foreground" style={{ fontSize: "12px" }}>$0 total</p>
        </div>
        <div className="bg-white rounded-xl border border-border/50 p-5">
          <p className="text-muted-foreground mb-1" style={{ fontSize: "12px" }}>Best Avg Price</p>
          <p className="font-semibold text-foreground" style={{ fontSize: "14px" }}>—</p>
          <p className="text-muted-foreground" style={{ fontSize: "12px" }}>$0.00 per unit</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-border/50">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border/50">
          <h2 className="font-semibold text-foreground" style={{ fontSize: "15px" }}>Product Performance</h2>
          <button className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors" style={{ fontSize: "12px" }}>
            <ArrowUpDown className="w-3.5 h-3.5" />
            Sort by Revenue
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50">
                {["Rank", "Product", "Category", "Units Sold", "Revenue", "% of Total", "Avg Price"].map(h => (
                  <th key={h} className="text-left px-6 py-3 text-muted-foreground font-medium" style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.06em" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {products.map((p, i) => (
                <tr key={p.rank} className={`border-b border-border/30 hover:bg-muted/20 transition-colors ${i === products.length - 1 ? "border-b-0" : ""}`}>
                  <td className="px-6 py-3.5" style={{ fontSize: "13px" }}>
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-white font-semibold inline-flex`}
                      style={{ fontSize: "11px", backgroundColor: p.rank <= 3 ? "var(--primary)" : "#9ca3af" }}>
                      {p.rank}
                    </span>
                  </td>
                  <td className="px-6 py-3.5" style={{ fontSize: "13px" }}>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-muted/40 flex items-center justify-center text-muted-foreground font-semibold" style={{ fontSize: "10px" }}>
                        {p.name.charAt(0)}
                      </div>
                      <span className="font-medium text-foreground">{p.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-3.5" style={{ fontSize: "13px" }}>
                    <span className="px-2 py-0.5 rounded-full bg-muted/40 text-muted-foreground" style={{ fontSize: "11px" }}>{p.category}</span>
                  </td>
                  <td className="px-6 py-3.5 text-foreground font-medium" style={{ fontSize: "13px" }}>{p.units.toLocaleString()}</td>
                  <td className="px-6 py-3.5 text-foreground font-semibold" style={{ fontSize: "13px" }}>{p.revenue}</td>
                  <td className="px-6 py-3.5" style={{ fontSize: "13px" }}>
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-1.5 rounded-full bg-muted/40 overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: p.pct, backgroundColor: "var(--primary)" }} />
                      </div>
                      <span className="text-muted-foreground">{p.pct}</span>
                    </div>
                  </td>
                  <td className="px-6 py-3.5 text-muted-foreground" style={{ fontSize: "13px" }}>{p.avgPrice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
