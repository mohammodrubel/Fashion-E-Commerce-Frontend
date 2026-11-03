import { PageHeader } from "@/components/admin/page-header"
import { Plus, Link, MousePointer, ShoppingBag, DollarSign, Eye, Pencil } from "lucide-react"

type AffStatus = "Active" | "Inactive" | "Pending"

interface Affiliate {
  name: string
  email: string
  commissionRate: string
  clicks: number
  orders: number
  revenue: string
  unpaidBalance: string
  status: AffStatus
  joinDate: string
}

const affiliates: Affiliate[] = [
  { name: "Zara Style Blog", email: "collab@zarastyle.com", commissionRate: "12%", clicks: 4820, orders: 134, revenue: "$8,420", unpaidBalance: "$1,010", status: "Active", joinDate: "Jan 15, 2024" },
  { name: "FashionForward", email: "partner@fashionforward.io", commissionRate: "10%", clicks: 3240, orders: 98, revenue: "$5,880", unpaidBalance: "$588", status: "Active", joinDate: "Mar 01, 2024" },
  { name: "The Style Desk", email: "ads@thestyledesk.co", commissionRate: "8%", clicks: 1890, orders: 45, revenue: "$2,700", unpaidBalance: "$216", status: "Active", joinDate: "May 10, 2024" },
  { name: "Nina Oliveira (IG)", email: "nina.o@creator.com", commissionRate: "15%", clicks: 2100, orders: 67, revenue: "$4,020", unpaidBalance: "$603", status: "Active", joinDate: "Jun 20, 2024" },
  { name: "Luxe Lookbook", email: "hello@luxelookbook.com", commissionRate: "10%", clicks: 340, orders: 8, revenue: "$480", unpaidBalance: "$0", status: "Inactive", joinDate: "Aug 05, 2024" },
]

const statusConfig: Record<AffStatus, { bg: string; color: string }> = {
  Active: { bg: "#DCFCE7", color: "#166534" },
  Inactive: { bg: "#F3F4F6", color: "#6B7280" },
  Pending: { bg: "#FEF9C3", color: "#854D0E" },
}

export default function AffiliatePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Affiliate Marketing"
        description="Manage affiliates, commissions, and performance tracking"
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Marketing", href: "/admin/marketing" }, { label: "Affiliate" }]}
        actions={
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-white hover:opacity-90 transition-opacity"
            style={{ backgroundColor: "var(--primary)", fontSize: "13px" }}
          >
            <Plus className="w-4 h-4" strokeWidth={1.5} />
            Add Affiliate
          </button>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Active Affiliates", value: "4", sub: "of 5 total", icon: Link, bg: "#FAF0F2", color: "var(--primary)" },
          { label: "Total Clicks", value: "12,390", sub: "all affiliates", icon: MousePointer, bg: "#EFF6FF", color: "#1D4ED8" },
          { label: "Total Orders", value: "352", sub: "referred orders", icon: ShoppingBag, bg: "#F0FDF4", color: "#166534" },
          { label: "Commission Owed", value: "$2,417", sub: "unpaid balance", icon: DollarSign, bg: "#FFF7ED", color: "#9A3412" },
        ].map((c) => (
          <div key={c.label} className="bg-white rounded-xl border border-border/50 p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-muted-foreground" style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.07em" }}>{c.label}</p>
                <p className="font-semibold text-foreground mt-1" style={{ fontSize: "22px" }}>{c.value}</p>
                <p className="text-muted-foreground" style={{ fontSize: "11px" }}>{c.sub}</p>
              </div>
              <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: c.bg }}>
                <c.icon className="w-4 h-4" style={{ color: c.color }} strokeWidth={1.5} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-border/50">
        <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid var(--accent)" }}>
          <p className="font-medium text-foreground" style={{ fontSize: "14px" }}>Affiliates</p>
          <button
            className="px-3 py-1.5 rounded-lg border border-border/60 text-muted-foreground hover:text-foreground hover:bg-[var(--muted)] transition-colors"
            style={{ fontSize: "12px" }}
          >
            Pay All Balances
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--accent)" }}>
                {["Affiliate", "Commission Rate", "Clicks", "Orders", "Revenue", "Unpaid Balance", "Status", "Actions"].map((h) => (
                  <th
                    key={h}
                    className="text-left px-5 py-3 text-muted-foreground font-medium"
                    style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.07em" }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {affiliates.map((a, i) => {
                const cfg = statusConfig[a.status]
                const convRate = a.clicks > 0 ? ((a.orders / a.clicks) * 100).toFixed(1) : "0.0"
                return (
                  <tr
                    key={a.email}
                    className="hover:bg-[var(--muted)] transition-colors"
                    style={{ borderBottom: i < affiliates.length - 1 ? "1px solid var(--accent)" : "none" }}
                  >
                    <td className="px-5 py-3.5">
                      <p className="font-medium text-foreground" style={{ fontSize: "13px" }}>{a.name}</p>
                      <p className="text-muted-foreground" style={{ fontSize: "11px" }}>{a.email}</p>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="font-semibold" style={{ fontSize: "14px", color: "var(--primary)" }}>{a.commissionRate}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-foreground" style={{ fontSize: "13px" }}>{a.clicks.toLocaleString()}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div>
                        <span className="text-foreground" style={{ fontSize: "13px" }}>{a.orders}</span>
                        <p className="text-muted-foreground" style={{ fontSize: "10px" }}>{convRate}% conv.</p>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="font-medium text-foreground" style={{ fontSize: "13px" }}>{a.revenue}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span
                        className="font-medium"
                        style={{ fontSize: "13px", color: a.unpaidBalance === "$0" ? "#9CA3AF" : "#9A3412" }}
                      >
                        {a.unpaidBalance}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span
                        className="inline-flex items-center rounded-full px-2.5 py-0.5 font-medium"
                        style={{ fontSize: "11px", backgroundColor: cfg.bg, color: cfg.color }}
                      >
                        {a.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-1">
                        <button className="p-1.5 rounded-lg hover:bg-[var(--accent)] transition-colors text-muted-foreground hover:text-foreground">
                          <Eye className="w-3.5 h-3.5" strokeWidth={1.5} />
                        </button>
                        <button className="p-1.5 rounded-lg hover:bg-[var(--accent)] transition-colors text-muted-foreground hover:text-foreground">
                          <Pencil className="w-3.5 h-3.5" strokeWidth={1.5} />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
