import { PageHeader } from "@/components/admin/page-header"
import { Star, Pencil, GripVertical, Info } from "lucide-react"

interface FeaturedProduct {
  id: string
  name: string
  category: string
  price: string
  stock: number
  featured: boolean
  featuredSince: string
  initials: string
  color: string
  position: number
}

const products: FeaturedProduct[] = []

export default function FeaturedProductsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Featured Products"
        description="Control which products are highlighted on the storefront"
        breadcrumbs={[
          { label: "Admin", href: "/admin" },
          { label: "Products", href: "/admin/products" },
          { label: "Featured" },
        ]}
      />

      {/* Info Banner */}
      <div className="flex items-start gap-3 p-4 rounded-xl" style={{ backgroundColor: "var(--accent)" }}>
        <Info className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "var(--primary)" }} strokeWidth={1.5} />
        <p className="text-foreground" style={{ fontSize: "13px" }}>
          Featured products appear in the &quot;Featured&quot; section on the homepage and category pages. Drag rows to reorder display priority.
        </p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Featured Products", value: "0" },
          { label: "Max Allowed", value: "0" },
          { label: "Available Slots", value: "0" },
          { label: "Homepage Spots", value: "0" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-border/50 p-4">
            <p className="text-muted-foreground" style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.07em" }}>{s.label}</p>
            <p className="font-semibold text-foreground mt-1" style={{ fontSize: "22px" }}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-border/50">
        <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid var(--accent)" }}>
          <h2 className="font-semibold text-foreground" style={{ fontSize: "14px" }}>Featured Status</h2>
          <p className="text-muted-foreground" style={{ fontSize: "12px" }}>4 of 5 featured</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--accent)" }}>
                {["", "#", "Product", "Category", "Price", "Stock", "Featured", "Since", "Actions"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-muted-foreground font-medium" style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.07em" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {products.map((product, i) => (
                <tr
                  key={product.id}
                  className="hover:bg-[var(--muted)] transition-colors"
                  style={{ borderBottom: i < products.length - 1 ? "1px solid var(--accent)" : "none" }}
                >
                  <td className="px-4 py-3.5 w-8">
                    <button className="text-muted-foreground/40 hover:text-muted-foreground transition-colors cursor-grab">
                      <GripVertical className="w-4 h-4" strokeWidth={1.5} />
                    </button>
                  </td>
                  <td className="px-4 py-3.5">
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center text-white font-semibold"
                      style={{ backgroundColor: product.featured ? "var(--primary)" : "#D1D5DB", fontSize: "10px" }}
                    >
                      {product.position}
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-bold shrink-0"
                        style={{ backgroundColor: product.color, fontSize: "10px" }}
                      >
                        {product.initials}
                      </div>
                      <div>
                        <p className="font-medium text-foreground" style={{ fontSize: "13px" }}>{product.name}</p>
                        <p className="text-muted-foreground" style={{ fontSize: "11px" }}>ID: {product.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="text-foreground" style={{ fontSize: "13px" }}>{product.category}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="font-medium text-foreground" style={{ fontSize: "13px" }}>{product.price}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className={product.stock <= 10 ? "text-amber-600 font-medium" : "text-foreground"} style={{ fontSize: "13px" }}>
                      {product.stock} units
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    {/* Toggle Switch */}
                    <div className="flex items-center gap-2">
                      <div
                        className="relative w-10 h-5.5 rounded-full transition-colors cursor-pointer"
                        style={{
                          backgroundColor: product.featured ? "var(--primary)" : "#E5E7EB",
                          width: "40px",
                          height: "22px",
                        }}
                      >
                        <div
                          className="absolute top-0.5 w-4.5 h-4.5 rounded-full bg-white shadow transition-transform"
                          style={{
                            width: "18px",
                            height: "18px",
                            left: product.featured ? "19px" : "2px",
                            top: "2px",
                            transition: "left 0.2s",
                          }}
                        />
                      </div>
                      {product.featured && (
                        <Star className="w-3.5 h-3.5" fill="var(--primary)" style={{ color: "var(--primary)" }} strokeWidth={0} />
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="text-muted-foreground" style={{ fontSize: "12px" }}>{product.featuredSince}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <button className="p-1.5 rounded-lg hover:bg-[var(--accent)] transition-colors text-muted-foreground hover:text-foreground">
                      <Pencil className="w-3.5 h-3.5" strokeWidth={1.5} />
                    </button>
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
