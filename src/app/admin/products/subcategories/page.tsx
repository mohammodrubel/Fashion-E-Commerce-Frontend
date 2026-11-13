import { PageHeader } from "@/components/admin/page-header"
import { Plus, Pencil, Trash2, ChevronDown } from "lucide-react"

interface Subcategory {
  id: string
  name: string
  slug: string
  parent: string
  parentColor: string
  products: number
  status: "Active" | "Inactive"
}

const subcategories: Subcategory[] = []

export default function SubcategoriesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Subcategories"
        description="Manage product subcategories within parent categories"
        breadcrumbs={[
          { label: "Admin", href: "/admin" },
          { label: "Products", href: "/admin/products" },
          { label: "Subcategories" },
        ]}
        actions={
          <button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm hover:bg-primary/90 transition-colors">
            <Plus className="w-4 h-4" strokeWidth={1.5} /> Add Subcategory
          </button>
        }
      />

      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Subcategories", value: "0" },
          { label: "Active", value: "0" },
          { label: "Inactive", value: "0" },
          { label: "Parent Categories", value: "0" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-border/50 p-4">
            <p className="text-muted-foreground" style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.07em" }}>{s.label}</p>
            <p className="font-semibold text-foreground mt-1" style={{ fontSize: "22px" }}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Table */}
        <div className="xl:col-span-2 bg-white rounded-xl border border-border/50">
          <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid var(--accent)" }}>
            <h2 className="font-semibold text-foreground" style={{ fontSize: "14px" }}>All Subcategories</h2>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border/60 bg-white hover:bg-[var(--muted)] transition-colors text-muted-foreground" style={{ fontSize: "12px" }}>
                Filter by parent
                <ChevronDown className="w-3.5 h-3.5" strokeWidth={1.5} />
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: "1px solid var(--accent)" }}>
                  {["Name", "Parent Category", "Products", "Status", "Actions"].map((h) => (
                    <th key={h} className="text-left px-5 py-3 text-muted-foreground font-medium" style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.07em" }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {subcategories.map((sub, i) => (
                  <tr
                    key={sub.id}
                    className="hover:bg-[var(--muted)] transition-colors"
                    style={{ borderBottom: i < subcategories.length - 1 ? "1px solid var(--accent)" : "none" }}
                  >
                    <td className="px-5 py-3.5">
                      <p className="font-medium text-foreground" style={{ fontSize: "13px" }}>{sub.name}</p>
                      <p className="font-mono text-muted-foreground" style={{ fontSize: "11px" }}>{sub.slug}</p>
                    </td>
                    <td className="px-5 py-3.5">
                      <span
                        className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 font-medium"
                        style={{ fontSize: "11px", backgroundColor: sub.parentColor + "15", color: sub.parentColor }}
                      >
                        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: sub.parentColor }} />
                        {sub.parent}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-foreground" style={{ fontSize: "13px" }}>{sub.products}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 font-medium ${sub.status === "Active" ? "bg-emerald-50 text-emerald-700" : "bg-gray-100 text-gray-500"}`}
                        style={{ fontSize: "11px" }}
                      >
                        {sub.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-1">
                        <button className="p-1.5 rounded-lg hover:bg-[var(--accent)] transition-colors text-muted-foreground hover:text-foreground">
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

        {/* Add Form */}
        <div className="xl:col-span-1">
          <div className="bg-white rounded-xl border border-border/50 p-5">
            <h2 className="font-semibold text-foreground mb-4" style={{ fontSize: "14px" }}>Add Subcategory</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-foreground font-medium mb-1.5" style={{ fontSize: "13px" }}>Parent Category <span className="text-red-500">*</span></label>
                <div className="relative">
                  <select className="w-full appearance-none px-3 py-2.5 rounded-lg border border-border/60 bg-[var(--muted)] text-foreground focus:outline-none focus:border-primary/40" style={{ fontSize: "13px" }}>
                    <option value="">Select parent...</option>
                    <option>Women's Clothing</option>
                    <option>Men's Clothing</option>
                    <option>Kids & Teens</option>
                    <option>Accessories</option>
                    <option>Footwear</option>
                    <option>Sale</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" strokeWidth={1.5} />
                </div>
              </div>
              <div>
                <label className="block text-foreground font-medium mb-1.5" style={{ fontSize: "13px" }}>Subcategory Name <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  placeholder="e.g. Midi Dresses"
                  className="w-full px-3 py-2.5 rounded-lg border border-border/60 bg-[var(--muted)] text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/40"
                  style={{ fontSize: "13px" }}
                />
              </div>
              <div>
                <label className="block text-foreground font-medium mb-1.5" style={{ fontSize: "13px" }}>Slug</label>
                <input
                  type="text"
                  placeholder="midi-dresses"
                  className="w-full px-3 py-2.5 rounded-lg border border-border/60 bg-[var(--muted)] text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/40 font-mono"
                  style={{ fontSize: "13px" }}
                />
              </div>
              <div>
                <label className="block text-foreground font-medium mb-1.5" style={{ fontSize: "13px" }}>Description</label>
                <textarea
                  rows={3}
                  placeholder="Optional description..."
                  className="w-full px-3 py-2.5 rounded-lg border border-border/60 bg-[var(--muted)] text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/40 resize-none"
                  style={{ fontSize: "13px" }}
                />
              </div>
              <button className="w-full bg-primary text-primary-foreground py-2.5 rounded-lg text-sm hover:bg-primary/90 transition-colors font-medium">
                Create Subcategory
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
