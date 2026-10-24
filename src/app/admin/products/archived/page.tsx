import { PageHeader } from "@/components/admin/page-header"
import { Search, RotateCcw, Trash2, Archive, AlertTriangle } from "lucide-react"

interface ArchivedProduct {
  id: string
  name: string
  sku: string
  category: string
  price: string
  archivedDate: string
  archivedReason: string
  initials: string
  color: string
  previousStatus: "Published" | "Draft"
}

const archivedProducts: ArchivedProduct[] = [
  {
    id: "P008",
    name: "Printed Slip Skirt",
    sku: "SK-PSK-008",
    category: "Skirts",
    price: "$49.00",
    archivedDate: "Oct 10, 2026",
    archivedReason: "Discontinued",
    initials: "SS",
    color: "#6D1A26",
    previousStatus: "Published",
  },
  {
    id: "P015",
    name: "Mesh Panel Bodysuit",
    sku: "TP-MPB-015",
    category: "Tops",
    price: "$38.00",
    archivedDate: "Sep 30, 2026",
    archivedReason: "Out of season",
    initials: "MB",
    color: "#4F2D6B",
    previousStatus: "Published",
  },
  {
    id: "P019",
    name: "Fringe Detail Cardigan",
    sku: "KN-FDC-019",
    category: "Knitwear",
    price: "$76.00",
    archivedDate: "Sep 22, 2026",
    archivedReason: "Poor performance",
    initials: "FC",
    color: "#8E8680",
    previousStatus: "Draft",
  },
]

const reasonColors: Record<string, string> = {
  "Discontinued": "bg-red-50 text-red-700",
  "Out of season": "bg-blue-50 text-blue-700",
  "Poor performance": "bg-gray-100 text-gray-600",
}

export default function ArchivedProductsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Archived Products"
        description="Products that have been removed from your store"
        breadcrumbs={[
          { label: "Admin", href: "/admin" },
          { label: "Products", href: "/admin/products" },
          { label: "Archived" },
        ]}
      />

      {/* Warning Banner */}
      <div className="flex items-start gap-3 p-4 rounded-xl bg-rose-50 border border-rose-200">
        <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" strokeWidth={1.5} />
        <div>
          <p className="font-medium text-rose-800" style={{ fontSize: "13px" }}>Archived products are hidden from your store</p>
          <p className="text-rose-700 mt-0.5" style={{ fontSize: "12px" }}>
            You can restore archived products to make them available again, or permanently delete them to free up space. Deleted products cannot be recovered.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {[
          { label: "Total Archived", value: "3" },
          { label: "Previously Published", value: "2" },
          { label: "Previously Draft", value: "1" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-border/50 p-4">
            <p className="text-muted-foreground" style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.07em" }}>{s.label}</p>
            <p className="font-semibold text-foreground mt-1" style={{ fontSize: "22px" }}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-border/50">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 px-5 py-4" style={{ borderBottom: "1px solid #F0EDEF" }}>
          <div className="flex items-center gap-2">
            <Archive className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
            <h2 className="font-semibold text-foreground" style={{ fontSize: "14px" }}>Archived Products</h2>
          </div>
          <div className="relative ml-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
            <input
              type="text"
              placeholder="Search archived..."
              className="pl-9 pr-4 py-2 rounded-lg border border-border/60 bg-[#F8F7F5] text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/40"
              style={{ fontSize: "13px", width: "200px" }}
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid #F0EDEF" }}>
                {["Product", "SKU", "Category", "Price", "Previous Status", "Archive Reason", "Archived Date", "Actions"].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-muted-foreground font-medium" style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.07em" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {archivedProducts.map((product, i) => (
                <tr
                  key={product.id}
                  className="hover:bg-[#F8F7F5] transition-colors"
                  style={{ borderBottom: i < archivedProducts.length - 1 ? "1px solid #F0EDEF" : "none" }}
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-bold shrink-0 opacity-60"
                        style={{ backgroundColor: product.color, fontSize: "10px" }}
                      >
                        {product.initials}
                      </div>
                      <div>
                        <p className="font-medium text-muted-foreground" style={{ fontSize: "13px" }}>{product.name}</p>
                        <span className="inline-flex items-center rounded-full px-2 py-0.5 bg-gray-100 text-gray-500 font-medium" style={{ fontSize: "10px" }}>
                          Archived
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="font-mono text-muted-foreground" style={{ fontSize: "12px" }}>{product.sku}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-muted-foreground" style={{ fontSize: "13px" }}>{product.category}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-muted-foreground line-through" style={{ fontSize: "13px" }}>{product.price}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 font-medium ${product.previousStatus === "Published" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}
                      style={{ fontSize: "11px" }}
                    >
                      Was {product.previousStatus}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 font-medium ${reasonColors[product.archivedReason] ?? "bg-gray-100 text-gray-500"}`}
                      style={{ fontSize: "11px" }}
                    >
                      {product.archivedReason}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-muted-foreground" style={{ fontSize: "12px" }}>{product.archivedDate}</span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1.5">
                      <button
                        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-border/60 hover:bg-[#F0EDEF] transition-colors text-foreground font-medium"
                        style={{ fontSize: "11px" }}
                      >
                        <RotateCcw className="w-3 h-3" strokeWidth={1.5} />
                        Restore
                      </button>
                      <button
                        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-red-200 bg-red-50 hover:bg-red-100 transition-colors text-red-600 font-medium"
                        style={{ fontSize: "11px" }}
                      >
                        <Trash2 className="w-3 h-3" strokeWidth={1.5} />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty area note */}
        <div className="px-5 py-4" style={{ borderTop: "1px solid #F0EDEF" }}>
          <p className="text-muted-foreground text-center" style={{ fontSize: "12px" }}>
            3 archived products · <button className="text-primary hover:underline">Restore all</button> · <button className="text-red-500 hover:underline">Delete all permanently</button>
          </p>
        </div>
      </div>
    </div>
  )
}
