import { PageHeader } from "@/components/admin/page-header"
import { Search, Eye, Pencil, EyeOff, MoreHorizontal, CheckCircle, SlidersHorizontal } from "lucide-react"

interface PublishedProduct {
  id: string
  name: string
  sku: string
  category: string
  price: string
  stock: number
  views: number
  publishedDate: string
  initials: string
  color: string
}

const publishedProducts: PublishedProduct[] = [
  { id: "P001", name: "Floral Wrap Midi Dress", sku: "DR-FLW-001", category: "Dresses", price: "$89.00", stock: 34, views: 1248, publishedDate: "Sep 28, 2026", initials: "FD", color: "#C4967A" },
  { id: "P002", name: "Oversized Linen Blazer", sku: "TOP-LBZ-002", category: "Tops", price: "$124.00", stock: 18, views: 876, publishedDate: "Oct 1, 2026", initials: "BL", color: "#2D5A8E" },
  { id: "P003", name: "High-Rise Skinny Jeans", sku: "JN-HRS-003", category: "Jeans", price: "$72.00", stock: 52, views: 2103, publishedDate: "Sep 15, 2026", initials: "SJ", color: "#1A3A5C" },
  { id: "P004", name: "Silk Cami Blouse", sku: "TOP-SCB-004", category: "Tops", price: "$58.00", stock: 7, views: 644, publishedDate: "Oct 5, 2026", initials: "CB", color: "#E8B4B8" },
  { id: "P007", name: "Classic Trench Coat", sku: "OT-TCT-007", category: "Outerwear", price: "$189.00", stock: 12, views: 3412, publishedDate: "Sep 10, 2026", initials: "TC", color: "#C19A6B" },
  { id: "P021", name: "Asymmetric Hem Maxi Dress", sku: "DR-AHM-021", category: "Dresses", price: "$112.00", stock: 28, views: 421, publishedDate: "Oct 23, 2026", initials: "AM", color: "#501D2A" },
]

export default function PublishedProductsPage() {
  const totalViews = publishedProducts.reduce((sum, p) => sum + p.views, 0)
  const outOfStock = publishedProducts.filter(p => p.stock === 0).length
  const lowStock = publishedProducts.filter(p => p.stock > 0 && p.stock <= 10).length

  return (
    <div className="space-y-6">
      <PageHeader
        title="Published Products"
        description="All products currently live on your storefront"
        breadcrumbs={[
          { label: "Admin", href: "/admin" },
          { label: "Products", href: "/admin/products" },
          { label: "Published" },
        ]}
      />

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-border/50 p-4">
          <p className="text-muted-foreground" style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.07em" }}>Published</p>
          <p className="font-semibold text-foreground mt-1" style={{ fontSize: "22px" }}>186</p>
          <div className="flex items-center gap-1.5 mt-1">
            <CheckCircle className="w-3 h-3 text-emerald-600" strokeWidth={2} />
            <span className="text-emerald-600" style={{ fontSize: "11px" }}>All live</span>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-border/50 p-4">
          <p className="text-muted-foreground" style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.07em" }}>Total Views</p>
          <p className="font-semibold text-foreground mt-1" style={{ fontSize: "22px" }}>{totalViews.toLocaleString()}</p>
          <p className="text-muted-foreground" style={{ fontSize: "11px" }}>this month</p>
        </div>
        <div className="bg-white rounded-xl border border-border/50 p-4">
          <p className="text-muted-foreground" style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.07em" }}>Out of Stock</p>
          <p className="font-semibold text-red-500 mt-1" style={{ fontSize: "22px" }}>{outOfStock}</p>
          <p className="text-muted-foreground" style={{ fontSize: "11px" }}>still published</p>
        </div>
        <div className="bg-white rounded-xl border border-border/50 p-4">
          <p className="text-muted-foreground" style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.07em" }}>Low Stock</p>
          <p className="font-semibold text-amber-600 mt-1" style={{ fontSize: "22px" }}>{lowStock}</p>
          <p className="text-muted-foreground" style={{ fontSize: "11px" }}>≤10 units left</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-border/50">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 px-5 py-4" style={{ borderBottom: "1px solid #F0EDEF" }}>
          <div className="relative flex-1 w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
            <input
              type="text"
              placeholder="Search published products..."
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-border/60 bg-[#F8F7F5] text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/40"
              style={{ fontSize: "13px" }}
            />
          </div>
          <button className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border/60 bg-white hover:bg-[#F8F7F5] transition-colors text-muted-foreground" style={{ fontSize: "13px" }}>
            <SlidersHorizontal className="w-3.5 h-3.5" strokeWidth={1.5} /> Filter
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid #F0EDEF" }}>
                {["Product", "SKU", "Category", "Price", "Stock", "Views", "Published", "Actions"].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-muted-foreground font-medium" style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.07em" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {publishedProducts.map((product, i) => (
                <tr
                  key={product.id}
                  className="hover:bg-[#F8F7F5] transition-colors"
                  style={{ borderBottom: i < publishedProducts.length - 1 ? "1px solid #F0EDEF" : "none" }}
                >
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
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          <span className="text-emerald-600" style={{ fontSize: "10px" }}>Live</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="font-mono text-muted-foreground" style={{ fontSize: "12px" }}>{product.sku}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-foreground" style={{ fontSize: "13px" }}>{product.category}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="font-medium text-foreground" style={{ fontSize: "13px" }}>{product.price}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span
                      className={product.stock === 0 ? "text-red-500 font-medium" : product.stock <= 10 ? "text-amber-600 font-medium" : "text-foreground"}
                      style={{ fontSize: "13px" }}
                    >
                      {product.stock === 0 ? "Out of stock" : `${product.stock} units`}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-foreground" style={{ fontSize: "13px" }}>{product.views.toLocaleString()}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-muted-foreground" style={{ fontSize: "12px" }}>{product.publishedDate}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1">
                      <button className="p-1.5 rounded-lg hover:bg-[#F0EDEF] transition-colors text-muted-foreground hover:text-foreground">
                        <Eye className="w-3.5 h-3.5" strokeWidth={1.5} />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-[#F0EDEF] transition-colors text-muted-foreground hover:text-foreground">
                        <Pencil className="w-3.5 h-3.5" strokeWidth={1.5} />
                      </button>
                      <button
                        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-border/60 hover:bg-amber-50 hover:border-amber-200 transition-colors text-muted-foreground hover:text-amber-700 font-medium"
                        style={{ fontSize: "11px" }}
                      >
                        <EyeOff className="w-3 h-3" strokeWidth={1.5} />
                        Unpublish
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-[#F0EDEF] transition-colors text-muted-foreground hover:text-foreground">
                        <MoreHorizontal className="w-3.5 h-3.5" strokeWidth={1.5} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between px-5 py-4" style={{ borderTop: "1px solid #F0EDEF" }}>
          <p className="text-muted-foreground" style={{ fontSize: "12px" }}>Showing 6 of 186 published products</p>
          <div className="flex items-center gap-1">
            {["1", "2", "3", "...", "24"].map((p) => (
              <button
                key={p}
                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${p === "1" ? "bg-primary text-primary-foreground" : "hover:bg-[#F0EDEF] text-muted-foreground"}`}
                style={{ fontSize: "13px" }}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
