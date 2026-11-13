import { PageHeader } from "@/components/admin/page-header"
import { TrendingUp, TrendingDown, Download } from "lucide-react"

const categories: { name: string; products: number; units: number; revenue: string; growth: string; trend: string; color: string; barWidth: string; }[] = []

export default function SalesByCategoryPage() {
  return (
    <div>
      <PageHeader
        title="Sales by Category"
        description="Revenue and unit performance across product categories"
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Reports", href: "/admin/reports" }, { label: "Sales by Category" }]}
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

      {/* Horizontal Bar Chart */}
      <div className="bg-white rounded-xl border border-border/50 p-6 mb-6">
        <h2 className="font-semibold text-foreground mb-5" style={{ fontSize: "15px" }}>Revenue by Category</h2>
        <div className="space-y-4">
          {categories.map((cat) => (
            <div key={cat.name}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-medium text-foreground" style={{ fontSize: "13px" }}>{cat.name}</span>
                <span className="font-semibold text-foreground" style={{ fontSize: "13px" }}>{cat.revenue}</span>
              </div>
              <div className="w-full h-8 bg-muted/30 rounded-lg overflow-hidden relative">
                <div
                  className="h-full rounded-lg flex items-center px-3 transition-all"
                  style={{ width: cat.barWidth, backgroundColor: cat.color }}
                >
                  <span className="text-white font-medium" style={{ fontSize: "11px" }}>{cat.units} units</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-border/30">
          <p className="text-muted-foreground" style={{ fontSize: "11px" }}>Bar width proportional to revenue. Showing all 6 active categories.</p>
        </div>
      </div>

      {/* Category Table */}
      <div className="bg-white rounded-xl border border-border/50">
        <div className="px-6 py-4 border-b border-border/50">
          <h2 className="font-semibold text-foreground" style={{ fontSize: "15px" }}>Category Breakdown</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50">
                {["Category", "Products", "Units Sold", "Revenue", "Growth %"].map(h => (
                  <th key={h} className="text-left px-6 py-3 text-muted-foreground font-medium" style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.06em" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {categories.map((cat, i) => (
                <tr key={cat.name} className={`border-b border-border/30 hover:bg-muted/20 transition-colors ${i === categories.length - 1 ? "border-b-0" : ""}`}>
                  <td className="px-6 py-4" style={{ fontSize: "13px" }}>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: cat.color }} />
                      <span className="font-medium text-foreground">{cat.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground" style={{ fontSize: "13px" }}>{cat.products}</td>
                  <td className="px-6 py-4 text-foreground font-medium" style={{ fontSize: "13px" }}>{cat.units.toLocaleString()}</td>
                  <td className="px-6 py-4 text-foreground font-semibold" style={{ fontSize: "13px" }}>{cat.revenue}</td>
                  <td className="px-6 py-4" style={{ fontSize: "13px" }}>
                    <span className={`flex items-center gap-1 font-medium ${cat.trend === "up" ? "text-emerald-600" : "text-rose-500"}`}>
                      {cat.trend === "up" ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                      {cat.growth}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t border-border/50 bg-muted/10">
                <td className="px-6 py-3 font-semibold text-foreground" style={{ fontSize: "13px" }}>Total</td>
                <td className="px-6 py-3 font-semibold text-foreground" style={{ fontSize: "13px" }}>241</td>
                <td className="px-6 py-3 font-semibold text-foreground" style={{ fontSize: "13px" }}>2,807</td>
                <td className="px-6 py-3 font-semibold text-foreground" style={{ fontSize: "13px" }}>$177,610</td>
                <td className="px-6 py-3 font-semibold text-emerald-600" style={{ fontSize: "13px" }}>+11.2%</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  )
}
