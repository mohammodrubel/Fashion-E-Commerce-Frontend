import { PageHeader } from "@/components/admin/page-header"
import { Plus, Eye, Pencil, Trash2, Send, Search, Clock } from "lucide-react"

interface DraftProduct {
  id: string
  name: string
  sku: string
  category: string
  price: string
  completeness: number
  lastEdited: string
  missingFields: string[]
  initials: string
  color: string
}

const drafts: DraftProduct[] = [
  {
    id: "P005",
    name: "Wide Leg Linen Trousers",
    sku: "PT-WLL-005",
    category: "Pants",
    price: "$95.00",
    completeness: 80,
    lastEdited: "Oct 22, 2026",
    missingFields: ["Images", "SEO description"],
    initials: "WT",
    color: "#9CAF88",
  },
  {
    id: "P006",
    name: "Ribbed Knit Sweater",
    sku: "KN-RIB-006",
    category: "Knitwear",
    price: "$67.00",
    completeness: 55,
    lastEdited: "Oct 20, 2026",
    missingFields: ["Images", "Stock quantity", "Tags"],
    initials: "KS",
    color: "#8E8680",
  },
  {
    id: "P026",
    name: "Corset-Detail Camisole",
    sku: "TOP-CDC-026",
    category: "Tops",
    price: "$52.00",
    completeness: 90,
    lastEdited: "Oct 19, 2026",
    missingFields: ["SEO title"],
    initials: "CC",
    color: "#B42332",
  },
  {
    id: "P031",
    name: "Sequin Mini Dress",
    sku: "DR-SQM-031",
    category: "Dresses",
    price: "$134.00",
    completeness: 40,
    lastEdited: "Oct 15, 2026",
    missingFields: ["Description", "Images", "Price", "Stock"],
    initials: "SD",
    color: "#C19A6B",
  },
]

function CompletenessBar({ value }: { value: number }) {
  const color = value >= 80 ? "#10B981" : value >= 60 ? "#F59E0B" : "#EF4444"
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="font-medium" style={{ fontSize: "12px", color }}>{value}%</span>
      </div>
      <div className="w-full rounded-full h-1.5" style={{ backgroundColor: "#F0EDEF" }}>
        <div className="h-1.5 rounded-full transition-all" style={{ width: `${value}%`, backgroundColor: color }} />
      </div>
    </div>
  )
}

export default function DraftsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Draft Products"
        description="Products saved as drafts — not yet published to the store"
        breadcrumbs={[
          { label: "Admin", href: "/admin" },
          { label: "Products", href: "/admin/products" },
          { label: "Drafts" },
        ]}
        actions={
          <button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm hover:bg-primary/90 transition-colors">
            <Plus className="w-4 h-4" strokeWidth={1.5} /> New Draft
          </button>
        }
      />

      {/* Alert Banner */}
      <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200">
        <Clock className="w-4 h-4 shrink-0 mt-0.5 text-amber-600" strokeWidth={1.5} />
        <p className="text-amber-800" style={{ fontSize: "13px" }}>
          You have <strong>4 draft products</strong> waiting to be reviewed and published. Complete missing fields before publishing.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Drafts", value: "4" },
          { label: "Ready to Publish", value: "2", note: "≥80% complete" },
          { label: "Needs Attention", value: "2", note: "<80% complete" },
          { label: "Oldest Draft", value: "9 days" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-border/50 p-4">
            <p className="text-muted-foreground" style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.07em" }}>{s.label}</p>
            <p className="font-semibold text-foreground mt-1" style={{ fontSize: "22px" }}>{s.value}</p>
            {s.note && <p className="text-muted-foreground" style={{ fontSize: "10px" }}>{s.note}</p>}
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-border/50">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 px-5 py-4" style={{ borderBottom: "1px solid #F0EDEF" }}>
          <h2 className="font-semibold text-foreground" style={{ fontSize: "14px" }}>Draft Products</h2>
          <div className="relative ml-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
            <input
              type="text"
              placeholder="Search drafts..."
              className="pl-9 pr-4 py-2 rounded-lg border border-border/60 bg-[#F8F7F5] text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/40"
              style={{ fontSize: "13px", width: "200px" }}
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid #F0EDEF" }}>
                {["Product", "SKU", "Category", "Price", "Completeness", "Missing Fields", "Last Edited", "Actions"].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-muted-foreground font-medium" style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.07em" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {drafts.map((draft, i) => (
                <tr
                  key={draft.id}
                  className="hover:bg-[#F8F7F5] transition-colors"
                  style={{ borderBottom: i < drafts.length - 1 ? "1px solid #F0EDEF" : "none" }}
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-bold shrink-0"
                        style={{ backgroundColor: draft.color, fontSize: "10px" }}
                      >
                        {draft.initials}
                      </div>
                      <div>
                        <p className="font-medium text-foreground" style={{ fontSize: "13px" }}>{draft.name}</p>
                        <span className="inline-flex items-center rounded-full px-2 py-0.5 bg-amber-50 text-amber-700 font-medium" style={{ fontSize: "10px" }}>
                          Draft
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="font-mono text-muted-foreground" style={{ fontSize: "12px" }}>{draft.sku}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-foreground" style={{ fontSize: "13px" }}>{draft.category}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="font-medium text-foreground" style={{ fontSize: "13px" }}>{draft.price}</span>
                  </td>
                  <td className="px-5 py-4" style={{ minWidth: "120px" }}>
                    <CompletenessBar value={draft.completeness} />
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex flex-wrap gap-1">
                      {draft.missingFields.map((field) => (
                        <span key={field} className="inline-flex items-center rounded-full px-2 py-0.5 bg-red-50 text-red-600 font-medium" style={{ fontSize: "10px" }}>
                          {field}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <Clock className="w-3.5 h-3.5" strokeWidth={1.5} />
                      <span style={{ fontSize: "12px" }}>{draft.lastEdited}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1">
                      <button className="p-1.5 rounded-lg hover:bg-[#F0EDEF] transition-colors text-muted-foreground hover:text-foreground">
                        <Eye className="w-3.5 h-3.5" strokeWidth={1.5} />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-[#F0EDEF] transition-colors text-muted-foreground hover:text-foreground">
                        <Pencil className="w-3.5 h-3.5" strokeWidth={1.5} />
                      </button>
                      <button
                        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg transition-colors font-medium text-white"
                        style={{ backgroundColor: draft.completeness >= 80 ? "#501D2A" : "#D1D5DB", fontSize: "11px" }}
                        title={draft.completeness < 80 ? "Complete missing fields first" : "Publish product"}
                      >
                        <Send className="w-3 h-3" strokeWidth={1.5} />
                        Publish
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
