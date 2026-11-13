import { PageHeader } from "@/components/admin/page-header"
import { Plus, Pencil, Trash2, ListFilter } from "lucide-react"

interface Attribute {
  id: string
  name: string
  type: "Select" | "Multi-select" | "Text" | "Number" | "Boolean"
  values: string[]
  usedIn: number
  required: boolean
}

const attributes: Attribute[] = []

const typeColors: Record<string, string> = {
  "Select": "bg-blue-50 text-blue-700",
  "Multi-select": "bg-purple-50 text-purple-700",
  "Text": "bg-amber-50 text-amber-700",
  "Number": "bg-emerald-50 text-emerald-700",
  "Boolean": "bg-gray-100 text-gray-600",
}

export default function AttributesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Product Attributes"
        description="Define custom attributes for detailed product specifications"
        breadcrumbs={[
          { label: "Admin", href: "/admin" },
          { label: "Products", href: "/admin/products" },
          { label: "Attributes" },
        ]}
        actions={
          <button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm hover:bg-primary/90 transition-colors">
            <Plus className="w-4 h-4" strokeWidth={1.5} /> Add Attribute
          </button>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Attributes", value: "0" },
          { label: "Required", value: "0" },
          { label: "Optional", value: "0" },
          { label: "Total Values", value: "0" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-border/50 p-4">
            <p className="text-muted-foreground" style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.07em" }}>{s.label}</p>
            <p className="font-semibold text-foreground mt-1" style={{ fontSize: "22px" }}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Attributes Table */}
        <div className="xl:col-span-2 bg-white rounded-xl border border-border/50">
          <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid var(--accent)" }}>
            <div className="flex items-center gap-2">
              <ListFilter className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
              <h2 className="font-semibold text-foreground" style={{ fontSize: "14px" }}>Attributes</h2>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: "1px solid var(--accent)" }}>
                  {["Attribute Name", "Type", "Values", "Used In", "Required", "Actions"].map((h) => (
                    <th key={h} className="text-left px-5 py-3 text-muted-foreground font-medium" style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.07em" }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {attributes.map((attr, i) => (
                  <tr
                    key={attr.id}
                    className="hover:bg-[var(--muted)] transition-colors"
                    style={{ borderBottom: i < attributes.length - 1 ? "1px solid var(--accent)" : "none" }}
                  >
                    <td className="px-5 py-4">
                      <p className="font-medium text-foreground" style={{ fontSize: "13px" }}>{attr.name}</p>
                      <p className="text-muted-foreground" style={{ fontSize: "11px" }}>ID: {attr.id}</p>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 font-medium ${typeColors[attr.type]}`} style={{ fontSize: "11px" }}>
                        {attr.type}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      {attr.values.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {attr.values.slice(0, 3).map((v) => (
                            <span key={v} className="inline-flex items-center rounded-full px-2 py-0.5 bg-[var(--accent)] text-muted-foreground" style={{ fontSize: "10px" }}>
                              {v}
                            </span>
                          ))}
                          {attr.values.length > 3 && (
                            <span className="inline-flex items-center rounded-full px-2 py-0.5 bg-[var(--accent)] text-muted-foreground" style={{ fontSize: "10px" }}>
                              +{attr.values.length - 3} more
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className="text-muted-foreground" style={{ fontSize: "12px" }}>Free text</span>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-foreground" style={{ fontSize: "13px" }}>{attr.usedIn} products</span>
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 font-medium ${attr.required ? "bg-rose-50 text-rose-700" : "bg-gray-100 text-gray-500"}`}
                        style={{ fontSize: "11px" }}
                      >
                        {attr.required ? "Required" : "Optional"}
                      </span>
                    </td>
                    <td className="px-5 py-4">
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

        {/* Add Attribute Form */}
        <div className="xl:col-span-1">
          <div className="bg-white rounded-xl border border-border/50 p-5">
            <h2 className="font-semibold text-foreground mb-4" style={{ fontSize: "14px" }}>Add New Attribute</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-foreground font-medium mb-1.5" style={{ fontSize: "13px" }}>Attribute Name <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  placeholder="e.g. Material"
                  className="w-full px-3 py-2.5 rounded-lg border border-border/60 bg-[var(--muted)] text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/40"
                  style={{ fontSize: "13px" }}
                />
              </div>
              <div>
                <label className="block text-foreground font-medium mb-1.5" style={{ fontSize: "13px" }}>Input Type</label>
                <div className="grid grid-cols-2 gap-2">
                  {["Select", "Multi-select", "Text", "Number", "Boolean"].map((type) => (
                    <label key={type} className="flex items-center gap-2 p-2.5 rounded-lg border border-border/50 cursor-pointer hover:bg-[var(--muted)] transition-colors">
                      <div className="w-3.5 h-3.5 rounded-full border-2 shrink-0" style={{ borderColor: type === "Select" ? "var(--primary)" : "#D1D5DB" }}>
                        {type === "Select" && <div className="w-1.5 h-1.5 rounded-full m-auto mt-0.5" style={{ backgroundColor: "var(--primary)" }} />}
                      </div>
                      <span className="text-foreground" style={{ fontSize: "12px" }}>{type}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-foreground font-medium mb-1.5" style={{ fontSize: "13px" }}>Values (for Select types)</label>
                <textarea
                  rows={3}
                  placeholder="Cotton, Silk, Linen (one per line or comma separated)"
                  className="w-full px-3 py-2.5 rounded-lg border border-border/60 bg-[var(--muted)] text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/40 resize-none"
                  style={{ fontSize: "13px" }}
                />
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded border-2 border-border/60 shrink-0" />
                <label className="text-foreground" style={{ fontSize: "13px" }}>Mark as required</label>
              </div>
              <button className="w-full bg-primary text-primary-foreground py-2.5 rounded-lg text-sm hover:bg-primary/90 transition-colors font-medium">
                Create Attribute
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
