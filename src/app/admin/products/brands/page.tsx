import { PageHeader } from "@/components/admin/page-header"
import { Plus, Pencil, Trash2, ExternalLink, Package, MoreHorizontal } from "lucide-react"

interface Brand {
  id: string
  name: string
  initials: string
  slug: string
  products: number
  country: string
  status: "Active" | "Inactive"
  color: string
  description: string
}

const brands: Brand[] = [
  {
    id: "B01",
    name: "Maison Élégante",
    initials: "ME",
    slug: "maison-elegante",
    products: 54,
    country: "France",
    status: "Active",
    color: "#501D2A",
    description: "Parisian-inspired luxury fashion with timeless silhouettes",
  },
  {
    id: "B02",
    name: "Studio Luxe",
    initials: "SL",
    slug: "studio-luxe",
    products: 38,
    country: "Italy",
    status: "Active",
    color: "#2D5A8E",
    description: "Contemporary Italian design with premium fabrics",
  },
  {
    id: "B03",
    name: "Urban Chic",
    initials: "UC",
    slug: "urban-chic",
    products: 61,
    country: "USA",
    status: "Active",
    color: "#2D6B4F",
    description: "Modern streetwear meets elevated casual styling",
  },
  {
    id: "B04",
    name: "Casa Moda",
    initials: "CM",
    slug: "casa-moda",
    products: 29,
    country: "Spain",
    status: "Active",
    color: "#6B4F2D",
    description: "Mediterranean warmth with bold prints and colours",
  },
  {
    id: "B05",
    name: "Atelier Nine",
    initials: "A9",
    slug: "atelier-nine",
    products: 42,
    country: "UK",
    status: "Active",
    color: "#4F2D6B",
    description: "British heritage tailoring reimagined for the modern wardrobe",
  },
  {
    id: "B06",
    name: "Velour & Co.",
    initials: "VC",
    slug: "velour-co",
    products: 17,
    country: "Australia",
    status: "Inactive",
    color: "#B42332",
    description: "Relaxed luxury loungewear and resort wear",
  },
]

export default function BrandsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Brands"
        description="Manage the brands available in your store"
        breadcrumbs={[
          { label: "Admin", href: "/admin" },
          { label: "Products", href: "/admin/products" },
          { label: "Brands" },
        ]}
        actions={
          <button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm hover:bg-primary/90 transition-colors">
            <Plus className="w-4 h-4" strokeWidth={1.5} /> Add Brand
          </button>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Brands", value: "6" },
          { label: "Active Brands", value: "5" },
          { label: "Total Products", value: "241" },
          { label: "Avg per Brand", value: "40" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-border/50 p-4">
            <p className="text-muted-foreground" style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.07em" }}>{s.label}</p>
            <p className="font-semibold text-foreground mt-1" style={{ fontSize: "22px" }}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Brand Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {brands.map((brand) => (
          <div key={brand.id} className="bg-white rounded-xl border border-border/50 p-5 hover:border-border transition-colors group">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-white shrink-0"
                  style={{ backgroundColor: brand.color, fontSize: "14px" }}
                >
                  {brand.initials}
                </div>
                <div>
                  <p className="font-semibold text-foreground" style={{ fontSize: "14px" }}>{brand.name}</p>
                  <p className="text-muted-foreground" style={{ fontSize: "11px" }}>{brand.country}</p>
                </div>
              </div>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-1.5 rounded-lg hover:bg-[#F0EDEF] transition-colors text-muted-foreground hover:text-foreground">
                  <Pencil className="w-3.5 h-3.5" strokeWidth={1.5} />
                </button>
                <button className="p-1.5 rounded-lg hover:bg-[#F0EDEF] transition-colors text-muted-foreground hover:text-foreground">
                  <MoreHorizontal className="w-3.5 h-3.5" strokeWidth={1.5} />
                </button>
              </div>
            </div>

            <p className="text-muted-foreground mb-4" style={{ fontSize: "12px" }}>{brand.description}</p>

            <div className="flex items-center justify-between pt-3" style={{ borderTop: "1px solid #F0EDEF" }}>
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Package className="w-3.5 h-3.5" strokeWidth={1.5} />
                <span style={{ fontSize: "12px" }}>{brand.products} products</span>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 font-medium ${brand.status === "Active" ? "bg-emerald-50 text-emerald-700" : "bg-gray-100 text-gray-500"}`}
                  style={{ fontSize: "11px" }}
                >
                  {brand.status}
                </span>
                <button className="p-1 rounded text-muted-foreground hover:text-foreground transition-colors">
                  <ExternalLink className="w-3 h-3" strokeWidth={1.5} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Brand Table */}
      <div className="bg-white rounded-xl border border-border/50">
        <div className="px-5 py-4" style={{ borderBottom: "1px solid #F0EDEF" }}>
          <h2 className="font-semibold text-foreground" style={{ fontSize: "14px" }}>Brand Details</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid #F0EDEF" }}>
                {["Brand", "Slug", "Country", "Products", "Status", "Actions"].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-muted-foreground font-medium" style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.07em" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {brands.map((brand, i) => (
                <tr
                  key={brand.id}
                  className="hover:bg-[#F8F7F5] transition-colors"
                  style={{ borderBottom: i < brands.length - 1 ? "1px solid #F0EDEF" : "none" }}
                >
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold shrink-0" style={{ backgroundColor: brand.color, fontSize: "10px" }}>
                        {brand.initials}
                      </div>
                      <span className="font-medium text-foreground" style={{ fontSize: "13px" }}>{brand.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <span className="font-mono text-muted-foreground" style={{ fontSize: "12px" }}>{brand.slug}</span>
                  </td>
                  <td className="px-5 py-3">
                    <span className="text-foreground" style={{ fontSize: "13px" }}>{brand.country}</span>
                  </td>
                  <td className="px-5 py-3">
                    <span className="text-foreground" style={{ fontSize: "13px" }}>{brand.products}</span>
                  </td>
                  <td className="px-5 py-3">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 font-medium ${brand.status === "Active" ? "bg-emerald-50 text-emerald-700" : "bg-gray-100 text-gray-500"}`}
                      style={{ fontSize: "11px" }}
                    >
                      {brand.status}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-1">
                      <button className="p-1.5 rounded-lg hover:bg-[#F0EDEF] transition-colors text-muted-foreground hover:text-foreground">
                        <Pencil className="w-3.5 h-3.5" strokeWidth={1.5} />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-red-50 transition-colors text-muted-foreground hover:text-red-600">
                        <Trash2 className="w-3.5 h-3.5" strokeWidth={1.5} />
                      </button>
                    </div>
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
