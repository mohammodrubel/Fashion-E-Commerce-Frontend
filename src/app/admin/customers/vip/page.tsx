import { PageHeader } from "@/components/admin/page-header"
import { Crown, Star, Eye, Pencil, MoreHorizontal, TrendingUp, Gift, DollarSign } from "lucide-react"

interface VIPCustomer {
  id: string
  name: string
  initials: string
  email: string
  points: number
  lifetimeValue: string
  joinedVip: string
  totalOrders: number
  lastOrder: string
  tier: "VIP" | "Platinum"
}

const vipCustomers: VIPCustomer[] = []

export default function VIPCustomersPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="VIP Customers"
        description="Your most loyal and high-value customers"
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Customers", href: "/admin/customers" }, { label: "VIP" }]}
        actions={
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border/60 hover:bg-[var(--muted)] transition-colors text-muted-foreground" style={{ fontSize: "13px" }}>
            <Gift className="w-4 h-4" strokeWidth={1.5} /> Send VIP Reward
          </button>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "VIP Members", value: "0", sub: "Total", icon: Crown, color: "#7C3AED" },
          { label: "Avg Lifetime Value", value: "$0", sub: "Per VIP", icon: DollarSign, color: "#202127" },
          { label: "Total Points Issued", value: "0K", sub: "This year", icon: Star, color: "#D97706" },
          { label: "VIP Revenue Share", value: "0%", sub: "of total revenue", icon: TrendingUp, color: "#2D6B4F" },
        ].map((s) => {
          const Icon = s.icon
          return (
            <div key={s.label} className="bg-white rounded-xl border border-border/50 p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-muted-foreground" style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.07em" }}>{s.label}</span>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: s.color + "15" }}>
                  <Icon className="w-4 h-4" style={{ color: s.color }} strokeWidth={1.5} />
                </div>
              </div>
              <p className="font-semibold text-foreground" style={{ fontSize: "22px" }}>{s.value}</p>
              <p className="text-muted-foreground" style={{ fontSize: "11px" }}>{s.sub}</p>
            </div>
          )
        })}
      </div>

      {/* VIP Table */}
      <div className="bg-white rounded-xl border border-border/50">
        <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid var(--accent)" }}>
          <h2 className="font-semibold text-foreground" style={{ fontSize: "14px" }}>VIP Members</h2>
          <div className="flex items-center gap-1.5">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-purple-50 text-purple-700" style={{ fontSize: "11px" }}>
              <Crown className="w-3 h-3" strokeWidth={1.5} /> Sorted by lifetime value
            </span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--accent)" }}>
                {["Customer", "Tier", "Points Balance", "Lifetime Value", "Orders", "Last Order", "Joined VIP", "Actions"].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-muted-foreground font-medium" style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.07em" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {vipCustomers.map((c, i) => (
                <tr
                  key={c.id}
                  className="hover:bg-[var(--muted)] transition-colors"
                  style={{ borderBottom: i < vipCustomers.length - 1 ? "1px solid var(--accent)" : "none" }}
                >
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-semibold" style={{ backgroundColor: "var(--primary)", fontSize: "11px" }}>
                          {c.initials}
                        </div>
                        <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-purple-600 flex items-center justify-center">
                          <Crown className="w-2.5 h-2.5 text-white" strokeWidth={2} />
                        </div>
                      </div>
                      <div>
                        <p className="font-medium text-foreground" style={{ fontSize: "13px" }}>{c.name}</p>
                        <p className="text-muted-foreground" style={{ fontSize: "11px" }}>{c.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 font-medium ${c.tier === "VIP" ? "bg-purple-50 text-purple-700" : "bg-blue-50 text-blue-700"}`}
                      style={{ fontSize: "11px" }}
                    >
                      <Crown className="w-2.5 h-2.5" strokeWidth={2} />
                      {c.tier}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-amber-500" strokeWidth={1.5} fill="currentColor" />
                      <span className="font-medium text-foreground" style={{ fontSize: "13px" }}>{c.points.toLocaleString()} pts</span>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <span className="font-semibold text-foreground" style={{ fontSize: "13px" }}>{c.lifetimeValue}</span>
                  </td>
                  <td className="px-5 py-3 text-foreground" style={{ fontSize: "13px" }}>{c.totalOrders}</td>
                  <td className="px-5 py-3 text-muted-foreground" style={{ fontSize: "13px" }}>{c.lastOrder}</td>
                  <td className="px-5 py-3 text-muted-foreground" style={{ fontSize: "13px" }}>{c.joinedVip}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-1">
                      <button className="p-1.5 rounded-lg hover:bg-[var(--accent)] transition-colors text-muted-foreground hover:text-foreground">
                        <Eye className="w-3.5 h-3.5" strokeWidth={1.5} />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-[var(--accent)] transition-colors text-muted-foreground hover:text-foreground">
                        <Pencil className="w-3.5 h-3.5" strokeWidth={1.5} />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-[var(--accent)] transition-colors text-muted-foreground hover:text-foreground">
                        <MoreHorizontal className="w-3.5 h-3.5" strokeWidth={1.5} />
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
