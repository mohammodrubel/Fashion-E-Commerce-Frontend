import { PageHeader } from "@/components/admin/page-header"
import { Plus, Users, Pencil, Trash2, Tag } from "lucide-react"

interface CustomerGroup {
  id: string
  name: string
  description: string
  count: number
  discount: number
  color: string
  perks: string[]
}

const groups: CustomerGroup[] = []

export default function CustomerGroupsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Customer Groups"
        description="Organize customers into groups with custom pricing and perks"
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Customers", href: "/admin/customers" }, { label: "Groups" }]}
        actions={
          <button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors" style={{ fontSize: "13px" }}>
            <Plus className="w-4 h-4" strokeWidth={1.5} /> New Group
          </button>
        }
      />

      {/* Summary strip */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {groups.map((g) => (
          <div key={g.id} className="bg-white rounded-xl border border-border/50 p-4 text-center">
            <div className="w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center" style={{ backgroundColor: g.color + "18" }}>
              <Users className="w-4 h-4" style={{ color: g.color }} strokeWidth={1.5} />
            </div>
            <p className="font-semibold text-foreground" style={{ fontSize: "16px" }}>{g.count}</p>
            <p style={{ fontSize: "12px", color: g.color, fontWeight: 500 }}>{g.name}</p>
          </div>
        ))}
      </div>

      {/* Groups Table */}
      <div className="bg-white rounded-xl border border-border/50">
        <div className="px-5 py-4" style={{ borderBottom: "1px solid var(--accent)" }}>
          <h2 className="font-semibold text-foreground" style={{ fontSize: "14px" }}>All Groups</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--accent)" }}>
                {["Group Name", "Description", "Customers", "Discount", "Perks", "Actions"].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-muted-foreground font-medium" style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.07em" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {groups.map((g, i) => (
                <tr
                  key={g.id}
                  className="hover:bg-[var(--muted)] transition-colors"
                  style={{ borderBottom: i < groups.length - 1 ? "1px solid var(--accent)" : "none" }}
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: g.color + "18" }}>
                        <Tag className="w-3.5 h-3.5" style={{ color: g.color }} strokeWidth={1.5} />
                      </div>
                      <span className="font-semibold text-foreground" style={{ fontSize: "13px" }}>{g.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 max-w-xs">
                    <p className="text-muted-foreground" style={{ fontSize: "13px" }}>{g.description}</p>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <Users className="w-3.5 h-3.5 text-muted-foreground" strokeWidth={1.5} />
                      <span className="font-medium text-foreground" style={{ fontSize: "13px" }}>{g.count.toLocaleString()}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    {g.discount > 0 ? (
                      <span className="inline-flex items-center rounded-full px-2.5 py-0.5 font-semibold bg-emerald-50 text-emerald-700" style={{ fontSize: "12px" }}>
                        {g.discount}% off
                      </span>
                    ) : (
                      <span className="text-muted-foreground" style={{ fontSize: "13px" }}>No discount</span>
                    )}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex flex-wrap gap-1">
                      {g.perks.slice(0, 2).map((p) => (
                        <span key={p} className="inline-flex items-center rounded px-1.5 py-0.5 bg-[var(--muted)] text-muted-foreground" style={{ fontSize: "10px" }}>{p}</span>
                      ))}
                      {g.perks.length > 2 && (
                        <span className="inline-flex items-center rounded px-1.5 py-0.5 bg-[var(--muted)] text-muted-foreground" style={{ fontSize: "10px" }}>+{g.perks.length - 2} more</span>
                      )}
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1">
                      <button className="p-1.5 rounded-lg hover:bg-[var(--accent)] transition-colors text-muted-foreground hover:text-foreground">
                        <Pencil className="w-3.5 h-3.5" strokeWidth={1.5} />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-red-50 transition-colors text-muted-foreground hover:text-red-600" disabled={g.id === "G001"}>
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
