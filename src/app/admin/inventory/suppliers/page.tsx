import { PageHeader } from "@/components/admin/page-header"
import { Plus, Search, Eye, Pencil, Trash2, Clock, Phone, Mail } from "lucide-react"

interface Supplier {
  id: string
  name: string
  initials: string
  contact: string
  email: string
  phone: string
  products: number
  leadDays: number
  status: "Active" | "Inactive" | "On Hold"
  category: string
}

const suppliers: Supplier[] = []

const statusConfig = {
  Active: "bg-emerald-50 text-emerald-700",
  Inactive: "bg-gray-100 text-gray-500",
  "On Hold": "bg-amber-50 text-amber-700",
}

const colorMap = ["var(--primary)", "#2D5A8E", "#2D6B4F", "#6B4F2D", "#7C3AED", "#D97706"]

export default function SuppliersPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Suppliers"
        description="Manage your product suppliers and vendor relationships"
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Inventory", href: "/admin/inventory" }, { label: "Suppliers" }]}
        actions={
          <button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors" style={{ fontSize: "13px" }}>
            <Plus className="w-4 h-4" strokeWidth={1.5} /> Add Supplier
          </button>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Suppliers", value: "0" },
          { label: "Active", value: "0" },
          { label: "On Hold", value: "0" },
          { label: "Avg Lead Time", value: "0 days" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-border/50 p-4">
            <p className="text-muted-foreground" style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.07em" }}>{s.label}</p>
            <p className="font-semibold text-foreground mt-1" style={{ fontSize: "22px" }}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-border/50">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 px-5 py-4" style={{ borderBottom: "1px solid var(--accent)" }}>
          <div className="relative flex-1 w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
            <input
              type="text"
              placeholder="Search suppliers..."
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-border/60 bg-[var(--muted)] placeholder:text-muted-foreground focus:outline-none focus:border-primary/40"
              style={{ fontSize: "13px" }}
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--accent)" }}>
                {["Supplier", "Contact", "Category", "Products", "Lead Time", "Status", "Actions"].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-muted-foreground font-medium" style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.07em" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {suppliers.map((s, i) => (
                <tr
                  key={s.id}
                  className="hover:bg-[var(--muted)] transition-colors"
                  style={{ borderBottom: i < suppliers.length - 1 ? "1px solid var(--accent)" : "none" }}
                >
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-semibold shrink-0" style={{ backgroundColor: colorMap[i], fontSize: "11px" }}>
                        {s.initials}
                      </div>
                      <div>
                        <p className="font-medium text-foreground" style={{ fontSize: "13px" }}>{s.name}</p>
                        <p className="text-muted-foreground" style={{ fontSize: "11px" }}>ID: {s.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <p className="font-medium text-foreground" style={{ fontSize: "13px" }}>{s.contact}</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <Mail className="w-3 h-3 text-muted-foreground" strokeWidth={1.5} />
                      <span className="text-muted-foreground" style={{ fontSize: "11px" }}>{s.email}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-muted-foreground" style={{ fontSize: "13px" }}>{s.category}</td>
                  <td className="px-5 py-3 font-medium text-foreground" style={{ fontSize: "13px" }}>{s.products}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-muted-foreground" strokeWidth={1.5} />
                      <span className="text-foreground" style={{ fontSize: "13px" }}>{s.leadDays} days</span>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 font-medium ${statusConfig[s.status]}`} style={{ fontSize: "11px" }}>{s.status}</span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-1">
                      <button className="p-1.5 rounded-lg hover:bg-[var(--accent)] transition-colors text-muted-foreground hover:text-foreground"><Eye className="w-3.5 h-3.5" strokeWidth={1.5} /></button>
                      <button className="p-1.5 rounded-lg hover:bg-[var(--accent)] transition-colors text-muted-foreground hover:text-foreground"><Pencil className="w-3.5 h-3.5" strokeWidth={1.5} /></button>
                      <button className="p-1.5 rounded-lg hover:bg-red-50 transition-colors text-muted-foreground hover:text-red-600"><Trash2 className="w-3.5 h-3.5" strokeWidth={1.5} /></button>
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
