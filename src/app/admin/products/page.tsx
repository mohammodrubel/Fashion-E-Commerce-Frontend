import { PageHeader } from "@/components/admin/page-header"
import { Plus, Search, SlidersHorizontal, MoreHorizontal, Eye, Pencil, Trash2, ChevronDown } from "lucide-react"

type ProductStatus = "Published" | "Draft" | "Archived"

interface Product {
  id: string
  name: string
  sku: string
  category: string
  price: string
  stock: number
  status: ProductStatus
  image: string
}

const products: Product[] = [
  { id: "P001", name: "Floral Wrap Midi Dress", sku: "DR-FLW-001", category: "Dresses", price: "$89.00", stock: 34, status: "Published", image: "DR" },
  { id: "P002", name: "Oversized Linen Blazer", sku: "TOP-LBZ-002", category: "Tops", price: "$124.00", stock: 18, status: "Published", image: "BL" },
  { id: "P003", name: "High-Rise Skinny Jeans", sku: "JN-HRS-003", category: "Jeans", price: "$72.00", stock: 52, status: "Published", image: "JN" },
  { id: "P004", name: "Silk Cami Blouse", sku: "TOP-SCB-004", category: "Tops", price: "$58.00", stock: 7, status: "Published", image: "CB" },
  { id: "P005", name: "Wide Leg Linen Trousers", sku: "PT-WLL-005", category: "Pants", price: "$95.00", stock: 23, status: "Draft", image: "TR" },
  { id: "P006", name: "Ribbed Knit Sweater", sku: "KN-RIB-006", category: "Knitwear", price: "$67.00", stock: 0, status: "Draft", image: "SW" },
  { id: "P007", name: "Classic Trench Coat", sku: "OT-TCT-007", category: "Outerwear", price: "$189.00", stock: 12, status: "Published", image: "TC" },
  { id: "P008", name: "Printed Slip Skirt", sku: "SK-PSK-008", category: "Skirts", price: "$49.00", stock: 0, status: "Archived", image: "SK" },
]

const statusConfig: Record<ProductStatus, { label: string; className: string }> = {
  Published: { label: "Published", className: "bg-emerald-50 text-emerald-700" },
  Draft: { label: "Draft", className: "bg-amber-50 text-amber-700" },
  Archived: { label: "Archived", className: "bg-gray-100 text-gray-500" },
}

export default function AllProductsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="All Products"
        description="Manage your product catalog"
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Products" }]}
        actions={
          <button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm hover:bg-primary/90 transition-colors">
            <Plus className="w-4 h-4" strokeWidth={1.5} /> Add Product
          </button>
        }
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Products", value: "248", sub: "across all categories" },
          { label: "Published", value: "186", sub: "live on store" },
          { label: "Draft", value: "42", sub: "awaiting publish" },
          { label: "Out of Stock", value: "20", sub: "need restocking" },
        ].map((card) => (
          <div key={card.label} className="bg-white rounded-xl border border-border/50 p-4">
            <p className="text-muted-foreground" style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.07em" }}>{card.label}</p>
            <p className="font-semibold text-foreground mt-1" style={{ fontSize: "22px" }}>{card.value}</p>
            <p className="text-muted-foreground" style={{ fontSize: "11px" }}>{card.sub}</p>
          </div>
        ))}
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-xl border border-border/50">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 px-5 py-4" style={{ borderBottom: "1px solid #F0EDEF" }}>
          <div className="relative flex-1 w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-border/60 bg-[#F8F7F5] text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/40"
              style={{ fontSize: "13px" }}
            />
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border/60 bg-white hover:bg-[#F8F7F5] transition-colors text-muted-foreground" style={{ fontSize: "13px" }}>
              <SlidersHorizontal className="w-3.5 h-3.5" strokeWidth={1.5} />
              Filter
            </button>
            <button className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border/60 bg-white hover:bg-[#F8F7F5] transition-colors text-muted-foreground" style={{ fontSize: "13px" }}>
              Status
              <ChevronDown className="w-3.5 h-3.5" strokeWidth={1.5} />
            </button>
            <button className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border/60 bg-white hover:bg-[#F8F7F5] transition-colors text-muted-foreground" style={{ fontSize: "13px" }}>
              Category
              <ChevronDown className="w-3.5 h-3.5" strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid #F0EDEF" }}>
                {["", "Product", "SKU", "Category", "Price", "Stock", "Status", "Actions"].map((h) => (
                  <th
                    key={h}
                    className="text-left px-5 py-3 text-muted-foreground font-medium"
                    style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.07em" }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {products.map((product, i) => {
                const statusCfg = statusConfig[product.status]
                const isLowStock = product.stock > 0 && product.stock <= 10
                const isOutOfStock = product.stock === 0
                return (
                  <tr
                    key={product.id}
                    className="hover:bg-[#F8F7F5] transition-colors"
                    style={{ borderBottom: i < products.length - 1 ? "1px solid #F0EDEF" : "none" }}
                  >
                    <td className="px-5 py-3">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center font-semibold text-white shrink-0" style={{ backgroundColor: "#501D2A", fontSize: "11px" }}>
                        {product.image}
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <p className="font-medium text-foreground" style={{ fontSize: "13px" }}>{product.name}</p>
                      <p className="text-muted-foreground" style={{ fontSize: "11px" }}>ID: {product.id}</p>
                    </td>
                    <td className="px-5 py-3">
                      <span className="text-muted-foreground font-mono" style={{ fontSize: "12px" }}>{product.sku}</span>
                    </td>
                    <td className="px-5 py-3">
                      <span className="text-foreground" style={{ fontSize: "13px" }}>{product.category}</span>
                    </td>
                    <td className="px-5 py-3">
                      <span className="font-medium text-foreground" style={{ fontSize: "13px" }}>{product.price}</span>
                    </td>
                    <td className="px-5 py-3">
                      <span
                        className={isOutOfStock ? "text-red-500 font-medium" : isLowStock ? "text-amber-600 font-medium" : "text-foreground"}
                        style={{ fontSize: "13px" }}
                      >
                        {isOutOfStock ? "Out of stock" : `${product.stock} units`}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 font-medium ${statusCfg.className}`} style={{ fontSize: "11px" }}>
                        {statusCfg.label}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-1">
                        <button className="p-1.5 rounded-lg hover:bg-[#F0EDEF] transition-colors text-muted-foreground hover:text-foreground">
                          <Eye className="w-3.5 h-3.5" strokeWidth={1.5} />
                        </button>
                        <button className="p-1.5 rounded-lg hover:bg-[#F0EDEF] transition-colors text-muted-foreground hover:text-foreground">
                          <Pencil className="w-3.5 h-3.5" strokeWidth={1.5} />
                        </button>
                        <button className="p-1.5 rounded-lg hover:bg-red-50 transition-colors text-muted-foreground hover:text-red-600">
                          <Trash2 className="w-3.5 h-3.5" strokeWidth={1.5} />
                        </button>
                        <button className="p-1.5 rounded-lg hover:bg-[#F0EDEF] transition-colors text-muted-foreground hover:text-foreground">
                          <MoreHorizontal className="w-3.5 h-3.5" strokeWidth={1.5} />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-5 py-4" style={{ borderTop: "1px solid #F0EDEF" }}>
          <p className="text-muted-foreground" style={{ fontSize: "12px" }}>Showing 8 of 248 products</p>
          <div className="flex items-center gap-1">
            {["1", "2", "3", "...", "31"].map((p) => (
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
