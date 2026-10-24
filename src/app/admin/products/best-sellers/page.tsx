import { PageHeader } from "@/components/admin/page-header"
import { TrendingUp, TrendingDown, Minus, Trophy, BarChart3 } from "lucide-react"

interface BestSeller {
  rank: number
  name: string
  category: string
  price: string
  unitsSold: number
  revenue: string
  trend: "up" | "down" | "flat"
  trendValue: string
  initials: string
  color: string
  stock: number
}

const bestSellers: BestSeller[] = [
  { rank: 1, name: "Classic Trench Coat", category: "Outerwear", price: "$189.00", unitsSold: 312, revenue: "$58,968", trend: "up", trendValue: "+18%", initials: "TC", color: "#C19A6B", stock: 12 },
  { rank: 2, name: "Floral Wrap Midi Dress", category: "Dresses", price: "$89.00", unitsSold: 287, revenue: "$25,543", trend: "up", trendValue: "+22%", initials: "FD", color: "#C4967A", stock: 34 },
  { rank: 3, name: "High-Rise Skinny Jeans", category: "Jeans", price: "$72.00", unitsSold: 241, revenue: "$17,352", trend: "up", trendValue: "+7%", initials: "SJ", color: "#1A3A5C", stock: 52 },
  { rank: 4, name: "Oversized Linen Blazer", category: "Tops", price: "$124.00", unitsSold: 198, revenue: "$24,552", trend: "flat", trendValue: "0%", initials: "BL", color: "#2D5A8E", stock: 18 },
  { rank: 5, name: "Ribbed Knit Sweater", category: "Knitwear", price: "$67.00", unitsSold: 176, revenue: "$11,792", trend: "down", trendValue: "-4%", initials: "KS", color: "#8E8680", stock: 0 },
  { rank: 6, name: "Silk Cami Blouse", category: "Tops", price: "$58.00", unitsSold: 154, revenue: "$8,932", trend: "up", trendValue: "+11%", initials: "CB", color: "#E8B4B8", stock: 7 },
  { rank: 7, name: "Wide Leg Linen Trousers", category: "Pants", price: "$95.00", unitsSold: 132, revenue: "$12,540", trend: "up", trendValue: "+5%", initials: "WT", color: "#9CAF88", stock: 23 },
  { rank: 8, name: "Printed Slip Skirt", category: "Skirts", price: "$49.00", unitsSold: 118, revenue: "$5,782", trend: "down", trendValue: "-9%", initials: "SS", color: "#6D1A26", stock: 0 },
]

const rankColors = ["#F59E0B", "#94A3B8", "#CD7F32"]

export default function BestSellersPage() {
  const maxUnits = Math.max(...bestSellers.map((p) => p.unitsSold))

  return (
    <div className="space-y-6">
      <PageHeader
        title="Best Sellers"
        description="Top performing products ranked by units sold"
        breadcrumbs={[
          { label: "Admin", href: "/admin" },
          { label: "Products", href: "/admin/products" },
          { label: "Best Sellers" },
        ]}
      />

      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Units Sold", value: "1,618" },
          { label: "Total Revenue", value: "$165,461" },
          { label: "Avg per Product", value: "202 units" },
          { label: "Top Category", value: "Outerwear" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-border/50 p-4">
            <p className="text-muted-foreground" style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.07em" }}>{s.label}</p>
            <p className="font-semibold text-foreground mt-1" style={{ fontSize: "18px" }}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Top 3 Podium */}
      <div className="grid grid-cols-3 gap-4">
        {bestSellers.slice(0, 3).map((product) => (
          <div
            key={product.rank}
            className="bg-white rounded-xl border border-border/50 p-5 text-center relative overflow-hidden"
          >
            <div
              className="absolute top-0 left-0 right-0 h-1 rounded-t-xl"
              style={{ backgroundColor: rankColors[product.rank - 1] }}
            />
            <div className="flex items-center justify-center mb-3">
              <Trophy className="w-5 h-5" style={{ color: rankColors[product.rank - 1] }} strokeWidth={1.5} />
              <span className="ml-1.5 font-bold" style={{ fontSize: "16px", color: rankColors[product.rank - 1] }}>
                #{product.rank}
              </span>
            </div>
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold mx-auto mb-3"
              style={{ backgroundColor: product.color, fontSize: "12px" }}
            >
              {product.initials}
            </div>
            <p className="font-semibold text-foreground" style={{ fontSize: "13px" }}>{product.name}</p>
            <p className="text-muted-foreground mt-0.5 mb-3" style={{ fontSize: "11px" }}>{product.category}</p>
            <div className="flex items-center justify-center gap-2">
              <span className="font-bold text-foreground" style={{ fontSize: "18px" }}>{product.unitsSold}</span>
              <span className="text-muted-foreground" style={{ fontSize: "11px" }}>units</span>
              <span className="text-emerald-600 font-medium" style={{ fontSize: "12px" }}>{product.trendValue}</span>
            </div>
            <p className="text-muted-foreground mt-1" style={{ fontSize: "12px" }}>{product.revenue} revenue</p>
          </div>
        ))}
      </div>

      {/* Full Ranked Table */}
      <div className="bg-white rounded-xl border border-border/50">
        <div className="flex items-center gap-2 px-5 py-4" style={{ borderBottom: "1px solid #F0EDEF" }}>
          <BarChart3 className="w-4 h-4" style={{ color: "#501D2A" }} strokeWidth={1.5} />
          <h2 className="font-semibold text-foreground" style={{ fontSize: "14px" }}>Full Rankings</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid #F0EDEF" }}>
                {["Rank", "Product", "Category", "Price", "Units Sold", "Revenue", "Trend", "Stock"].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-muted-foreground font-medium" style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.07em" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bestSellers.map((product, i) => (
                <tr
                  key={product.rank}
                  className="hover:bg-[#F8F7F5] transition-colors"
                  style={{ borderBottom: i < bestSellers.length - 1 ? "1px solid #F0EDEF" : "none" }}
                >
                  <td className="px-5 py-3.5">
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center font-bold shrink-0"
                      style={{
                        backgroundColor: product.rank <= 3 ? rankColors[product.rank - 1] + "20" : "#F0EDEF",
                        color: product.rank <= 3 ? rankColors[product.rank - 1] : "#9C7A83",
                        fontSize: "12px",
                      }}
                    >
                      {product.rank}
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-bold shrink-0"
                        style={{ backgroundColor: product.color, fontSize: "10px" }}
                      >
                        {product.initials}
                      </div>
                      <div>
                        <p className="font-medium text-foreground" style={{ fontSize: "13px" }}>{product.name}</p>
                        {/* Mini bar */}
                        <div className="mt-1 rounded-full h-1" style={{ backgroundColor: "#F0EDEF", width: "100px" }}>
                          <div
                            className="h-1 rounded-full"
                            style={{ width: `${(product.unitsSold / maxUnits) * 100}%`, backgroundColor: product.color }}
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-foreground" style={{ fontSize: "13px" }}>{product.category}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="font-medium text-foreground" style={{ fontSize: "13px" }}>{product.price}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="font-semibold text-foreground" style={{ fontSize: "13px" }}>{product.unitsSold.toLocaleString()}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="font-medium text-foreground" style={{ fontSize: "13px" }}>{product.revenue}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1">
                      {product.trend === "up" ? (
                        <TrendingUp className="w-3.5 h-3.5 text-emerald-600" strokeWidth={2} />
                      ) : product.trend === "down" ? (
                        <TrendingDown className="w-3.5 h-3.5 text-red-500" strokeWidth={2} />
                      ) : (
                        <Minus className="w-3.5 h-3.5 text-gray-400" strokeWidth={2} />
                      )}
                      <span
                        className={product.trend === "up" ? "text-emerald-600" : product.trend === "down" ? "text-red-500" : "text-gray-400"}
                        style={{ fontSize: "12px", fontWeight: 500 }}
                      >
                        {product.trendValue}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <span
                      className={product.stock === 0 ? "text-red-500 font-medium" : product.stock <= 15 ? "text-amber-600 font-medium" : "text-foreground"}
                      style={{ fontSize: "13px" }}
                    >
                      {product.stock === 0 ? "Out of stock" : `${product.stock} left`}
                    </span>
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
