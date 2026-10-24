import { PageHeader } from "@/components/admin/page-header"
import { Shield, Check, Edit } from "lucide-react"

const roles = [
  {
    name: "Super Admin",
    description: "Full unrestricted access to all features and settings",
    color: "#501D2A",
    bg: "#501D2A10",
    users: 1,
    permissions: [
      "View all data",
      "Manage products & inventory",
      "Manage orders",
      "Manage customers",
      "Manage users & roles",
      "Configure settings",
      "View reports",
      "Export data",
      "Manage integrations",
      "Manage billing",
    ],
  },
  {
    name: "Admin",
    description: "Full access except billing and user management",
    color: "#7c3aed",
    bg: "#f5f3ff",
    users: 1,
    permissions: [
      "View all data",
      "Manage products & inventory",
      "Manage orders",
      "Manage customers",
      "View reports",
      "Export data",
      "Manage integrations",
    ],
  },
  {
    name: "Manager",
    description: "Manage daily operations: orders, products, customers",
    color: "#059669",
    bg: "#f0fdf4",
    users: 1,
    permissions: [
      "View all data",
      "Manage products & inventory",
      "Manage orders",
      "Manage customers",
      "View reports",
    ],
  },
  {
    name: "Support",
    description: "Handle customer inquiries and orders only",
    color: "#d97706",
    bg: "#fffbeb",
    users: 1,
    permissions: [
      "View orders",
      "Update order status",
      "View customers",
      "Process refunds",
    ],
  },
  {
    name: "Viewer",
    description: "Read-only access to reports and dashboards",
    color: "#6b7280",
    bg: "#f9fafb",
    users: 1,
    permissions: [
      "View all data",
      "View reports",
    ],
  },
]

export default function RolesPage() {
  return (
    <div>
      <PageHeader
        title="Roles & Permissions"
        description="Define access levels for your team members"
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Settings", href: "/admin/settings" }, { label: "Roles" }]}
        actions={
          <button
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-white"
            style={{ fontSize: "13px", backgroundColor: "#501D2A" }}
          >
            + Create Role
          </button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {roles.map(role => (
          <div key={role.name} className="bg-white rounded-xl border border-border/50 p-5">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: role.bg }}>
                  <Shield className="w-4 h-4" style={{ color: role.color }} />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground" style={{ fontSize: "14px" }}>{role.name}</h3>
                  <p className="text-muted-foreground" style={{ fontSize: "11px" }}>{role.users} user{role.users !== 1 ? "s" : ""}</p>
                </div>
              </div>
              <button className="w-7 h-7 rounded-lg border border-border/50 flex items-center justify-center hover:bg-muted/30 transition-colors">
                <Edit className="w-3.5 h-3.5 text-muted-foreground" />
              </button>
            </div>
            <p className="text-muted-foreground mb-4" style={{ fontSize: "12px" }}>{role.description}</p>
            <div className="space-y-1.5">
              {role.permissions.map(p => (
                <div key={p} className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded flex items-center justify-center" style={{ backgroundColor: role.bg }}>
                    <Check className="w-2.5 h-2.5" style={{ color: role.color }} />
                  </div>
                  <span className="text-foreground" style={{ fontSize: "12px" }}>{p}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-border/30">
              <button
                className="w-full py-1.5 rounded-lg border text-center font-medium transition-colors hover:opacity-80"
                style={{ fontSize: "12px", color: role.color, borderColor: role.color, backgroundColor: role.bg }}
              >
                Edit Permissions
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
