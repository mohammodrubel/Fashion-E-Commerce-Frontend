import { PageHeader } from "@/components/admin/page-header"
import { Plus, Pencil, Sparkles, Calendar, Eye } from "lucide-react"

interface NewArrival {
  id: string
  name: string
  category: string
  price: string
  stock: number
  dateAdded: string
  daysAgo: number
  isNewArrival: boolean
  initials: string
  color: string
  status: "Published" | "Draft"
}

const newArrivals: NewArrival[] = [
  { id: "P021", name: "Asymmetric Hem Maxi Dress", category: "Dresses", price: "$112.00", stock: 28, dateAdded: "Oct 23, 2026", daysAgo: 1, isNewArrival: true, initials: "AM", color: "#C4967A", status: "Published" },
  { id: "P022", name: "Boucle Cropped Jacket", category: "Outerwear", price: "$145.00", stock: 15, dateAdded: "Oct 21, 2026", daysAgo: 3, isNewArrival: true, initials: "BJ", color: "#8E8680", status: "Published" },
  { id: "P023", name: "High-Neck Merino Turtleneck", category: "Knitwear", price: "$88.00", stock: 42, dateAdded: "Oct 19, 2026", daysAgo: 5, isNewArrival: true, initials: "MT", color: "#501D2A", status: "Published" },
  { id: "P024", name: "Velvet Slip Midi Skirt", category: "Skirts", price: "$64.00", stock: 33, dateAdded: "Oct 17, 2026", daysAgo: 7, isNewArrival: true, initials: "VS", color: "#4F2D6B", status: "Published" },
  { id: "P025", name: "Cargo Wide-Leg Trousers", category: "Pants", price: "$79.00", stock: 19, dateAdded: "Oct 14, 2026", daysAgo: 10, isNewArrival: false, initials: "CW", color: "#2D6B4F", status: "Published" },
  { id: "P026", name: "Corset-Detail Camisole", category: "Tops", price: "$52.00", stock: 0, dateAdded: "Oct 12, 2026", daysAgo: 12, isNewArrival: false, initials: "CC", color: "#B42332", status: "Draft" },
]

export default function NewArrivalsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="New Arrivals"
        description="Track and manage recently added products"
        breadcrumbs={[
          { label: "Admin", href: "/admin" },
          { label: "Products", href: "/admin/products" },
          { label: "New Arrivals" },
        ]}
        actions={
          <button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm hover:bg-primary/90 transition-colors">
            <Plus className="w-4 h-4" strokeWidth={1.5} /> Add Product
          </button>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Added This Week", value: "4" },
          { label: "Added This Month", value: "18" },
          { label: "Marked New Arrival", value: "4" },
          { label: "Awaiting Publish", value: "1" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-border/50 p-4">
            <p className="text-muted-foreground" style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.07em" }}>{s.label}</p>
            <p className="font-semibold text-foreground mt-1" style={{ fontSize: "22px" }}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-border/50">
        <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid #F0EDEF" }}>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4" style={{ color: "#501D2A" }} strokeWidth={1.5} />
            <h2 className="font-semibold text-foreground" style={{ fontSize: "14px" }}>Recent Additions</h2>
          </div>
          <p className="text-muted-foreground" style={{ fontSize: "12px" }}>Last 14 days</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid #F0EDEF" }}>
                {["Product", "Category", "Price", "Stock", "Date Added", "New Arrival Badge", "Status", "Actions"].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-muted-foreground font-medium" style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.07em" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {newArrivals.map((product, i) => (
                <tr
                  key={product.id}
                  className="hover:bg-[#F8F7F5] transition-colors"
                  style={{ borderBottom: i < newArrivals.length - 1 ? "1px solid #F0EDEF" : "none" }}
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
                        <p className="text-muted-foreground" style={{ fontSize: "11px" }}>ID: {product.id}</p>
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
                    <span
                      className={product.stock === 0 ? "text-red-500 font-medium" : "text-foreground"}
                      style={{ fontSize: "13px" }}
                    >
                      {product.stock === 0 ? "Out of stock" : `${product.stock} units`}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <Calendar className="w-3.5 h-3.5" strokeWidth={1.5} />
                      <span style={{ fontSize: "12px" }}>{product.dateAdded}</span>
                    </div>
                    <span
                      className={`mt-0.5 inline-block rounded-full px-2 py-0.5 font-medium ${product.daysAgo <= 3 ? "bg-emerald-50 text-emerald-700" : product.daysAgo <= 7 ? "bg-blue-50 text-blue-700" : "bg-gray-100 text-gray-500"}`}
                      style={{ fontSize: "10px" }}
                    >
                      {product.daysAgo === 0 ? "Today" : product.daysAgo === 1 ? "Yesterday" : `${product.daysAgo} days ago`}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    {/* Toggle */}
                    <div className="flex items-center gap-2">
                      <div
                        className="relative rounded-full cursor-pointer transition-colors"
                        style={{
                          width: "40px",
                          height: "22px",
                          backgroundColor: product.isNewArrival ? "#501D2A" : "#E5E7EB",
                        }}
                      >
                        <div
                          className="absolute top-0.5 rounded-full bg-white shadow"
                          style={{
                            width: "18px",
                            height: "18px",
                            left: product.isNewArrival ? "19px" : "2px",
                            top: "2px",
                            transition: "left 0.2s",
                          }}
                        />
                      </div>
                      {product.isNewArrival && (
                        <span className="rounded-full px-2 py-0.5 font-medium" style={{ fontSize: "10px", backgroundColor: "#501D2A15", color: "#501D2A" }}>
                          NEW
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 font-medium ${product.status === "Published" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}
                      style={{ fontSize: "11px" }}
                    >
                      {product.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1">
                      <button className="p-1.5 rounded-lg hover:bg-[#F0EDEF] transition-colors text-muted-foreground hover:text-foreground">
                        <Eye className="w-3.5 h-3.5" strokeWidth={1.5} />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-[#F0EDEF] transition-colors text-muted-foreground hover:text-foreground">
                        <Pencil className="w-3.5 h-3.5" strokeWidth={1.5} />
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
