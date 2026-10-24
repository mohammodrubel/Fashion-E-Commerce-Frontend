import { PageHeader } from "@/components/admin/page-header"
import { Clock, Download, Filter, User, Package, ShoppingCart, Settings, Shield, Tag } from "lucide-react"

const logs = [
  { time: "Oct 24, 2024 9:42 AM", user: "Alexandra Dupont", avatar: "A", action: "Product Updated", details: "Updated pricing on 'Silk Wrap Dress' — $72 → $77", ip: "74.125.46.22", type: "product" },
  { time: "Oct 24, 2024 9:18 AM", user: "Marcus Webb", avatar: "M", action: "Order Status Changed", details: "Order #4521 marked as Shipped", ip: "96.120.11.8", type: "order" },
  { time: "Oct 24, 2024 8:55 AM", user: "Isabelle Morel", avatar: "I", action: "Coupon Created", details: "Created coupon FLASH50 — $50 off, 100 uses", ip: "74.125.46.55", type: "discount" },
  { time: "Oct 23, 2024 4:32 PM", user: "Alexandra Dupont", avatar: "A", action: "Settings Updated", details: "Changed timezone to America/New_York", ip: "74.125.46.22", type: "settings" },
  { time: "Oct 23, 2024 2:14 PM", user: "Theo Nakamura", avatar: "T", action: "Customer Refunded", details: "Issued $89.00 refund on Order #4490 for Isabella T.", ip: "24.50.31.109", type: "order" },
  { time: "Oct 23, 2024 11:20 AM", user: "Marcus Webb", avatar: "M", action: "Product Added", details: "New product 'Autumn Velvet Blazer' published", ip: "96.120.11.8", type: "product" },
  { time: "Oct 22, 2024 5:08 PM", user: "Alexandra Dupont", avatar: "A", action: "User Invited", details: "Sent invite to camille@maisonelite.com (Viewer role)", ip: "74.125.46.22", type: "user" },
  { time: "Oct 22, 2024 3:45 PM", user: "Isabelle Morel", avatar: "I", action: "Inventory Updated", details: "Restocked 'Ribbed Tank Top' — 50 units added", ip: "74.125.46.55", type: "product" },
  { time: "Oct 21, 2024 1:22 PM", user: "Alexandra Dupont", avatar: "A", action: "Role Modified", details: "Updated 'Manager' role permissions — removed billing access", ip: "74.125.46.22", type: "security" },
  { time: "Oct 21, 2024 10:00 AM", user: "System", avatar: "S", action: "Backup Completed", details: "Automatic daily backup — 24.8 MB", ip: "Internal", type: "system" },
]

const typeConfig: Record<string, { icon: typeof Package; color: string; bg: string }> = {
  product: { icon: Package, color: "#501D2A", bg: "#501D2A15" },
  order: { icon: ShoppingCart, color: "#059669", bg: "#f0fdf4" },
  discount: { icon: Tag, color: "#d97706", bg: "#fffbeb" },
  settings: { icon: Settings, color: "#6b7280", bg: "#f9fafb" },
  user: { icon: User, color: "#7c3aed", bg: "#f5f3ff" },
  security: { icon: Shield, color: "#dc2626", bg: "#fef2f2" },
  system: { icon: Clock, color: "#0ea5e9", bg: "#f0f9ff" },
}

export default function ActivityLogsPage() {
  return (
    <div>
      <PageHeader
        title="Activity Logs"
        description="Complete audit trail of all admin actions"
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Settings", href: "/admin/settings" }, { label: "Activity Logs" }]}
        actions={
          <button
            className="flex items-center gap-2 rounded-lg border border-border/50 bg-white px-3 py-2 text-foreground hover:bg-muted/30 transition-colors"
            style={{ fontSize: "13px" }}
          >
            <Download className="w-4 h-4" />
            Export Logs
          </button>
        }
      />

      {/* Filters */}
      <div className="bg-white rounded-xl border border-border/50 p-4 mb-6 flex items-center gap-3 flex-wrap">
        <Filter className="w-4 h-4 text-muted-foreground shrink-0" />
        <select className="border border-border/50 rounded-lg px-3 py-1.5 text-foreground bg-white" style={{ fontSize: "13px" }}>
          <option>All Users</option>
          <option>Alexandra Dupont</option>
          <option>Marcus Webb</option>
          <option>Isabelle Morel</option>
        </select>
        <select className="border border-border/50 rounded-lg px-3 py-1.5 text-foreground bg-white" style={{ fontSize: "13px" }}>
          <option>All Actions</option>
          <option>Product Changes</option>
          <option>Order Changes</option>
          <option>Settings Changes</option>
          <option>Security Events</option>
        </select>
        <select className="border border-border/50 rounded-lg px-3 py-1.5 text-foreground bg-white" style={{ fontSize: "13px" }}>
          <option>Last 7 days</option>
          <option>Last 30 days</option>
          <option>Last 90 days</option>
          <option>Custom range</option>
        </select>
        <button className="px-3 py-1.5 rounded-lg text-white ml-auto" style={{ fontSize: "13px", backgroundColor: "#501D2A" }}>
          Apply Filters
        </button>
      </div>

      {/* Logs Table */}
      <div className="bg-white rounded-xl border border-border/50">
        <div className="px-6 py-4 border-b border-border/50">
          <h2 className="font-semibold text-foreground" style={{ fontSize: "15px" }}>
            Recent Activity
            <span className="ml-2 px-2 py-0.5 rounded-full bg-muted/40 text-muted-foreground font-normal" style={{ fontSize: "12px" }}>
              {logs.length} entries
            </span>
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50">
                {["Timestamp", "User", "Action", "Details", "IP Address"].map(h => (
                  <th key={h} className="text-left px-6 py-3 text-muted-foreground font-medium" style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.06em" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {logs.map((log, i) => {
                const type = typeConfig[log.type] || typeConfig.system
                const Icon = type.icon
                return (
                  <tr key={i} className={`border-b border-border/30 hover:bg-muted/20 transition-colors ${i === logs.length - 1 ? "border-b-0" : ""}`}>
                    <td className="px-6 py-3.5" style={{ fontSize: "12px" }}>
                      <div className="flex items-center gap-1.5 text-muted-foreground whitespace-nowrap">
                        <Clock className="w-3 h-3" />
                        {log.time}
                      </div>
                    </td>
                    <td className="px-6 py-3.5" style={{ fontSize: "13px" }}>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full flex items-center justify-center text-white font-medium shrink-0" style={{ backgroundColor: "#501D2A", fontSize: "10px" }}>
                          {log.avatar}
                        </div>
                        <span className="text-foreground font-medium">{log.user}</span>
                      </div>
                    </td>
                    <td className="px-6 py-3.5" style={{ fontSize: "13px" }}>
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded flex items-center justify-center shrink-0" style={{ backgroundColor: type.bg }}>
                          <Icon className="w-3 h-3" style={{ color: type.color }} />
                        </div>
                        <span className="font-medium text-foreground whitespace-nowrap">{log.action}</span>
                      </div>
                    </td>
                    <td className="px-6 py-3.5 text-muted-foreground max-w-xs" style={{ fontSize: "12px" }}>{log.details}</td>
                    <td className="px-6 py-3.5" style={{ fontSize: "12px" }}>
                      <code className="text-muted-foreground font-mono">{log.ip}</code>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-3 border-t border-border/30 flex items-center justify-between">
          <p className="text-muted-foreground" style={{ fontSize: "12px" }}>Showing 10 of 1,247 entries</p>
          <div className="flex items-center gap-1">
            <button className="px-3 py-1 rounded-lg border border-border/50 text-muted-foreground hover:bg-muted/30" style={{ fontSize: "12px" }}>Previous</button>
            <button className="px-3 py-1 rounded-lg border border-border/50 text-muted-foreground hover:bg-muted/30" style={{ fontSize: "12px" }}>Next</button>
          </div>
        </div>
      </div>
    </div>
  )
}
