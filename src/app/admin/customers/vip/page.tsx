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

const vipCustomers: VIPCustomer[] = [
  { id: "C003", name: "Emma Wilson", initials: "EW", email: "emma.w@email.com", points: 15420, lifetimeValue: "$5,320.00", joinedVip: "Jan 8, 2023", totalOrders: 31, lastOrder: "Oct 18, 2026", tier: "VIP" },
  { id: "C011", name: "Rachel Kim", initials: "RK", email: "rkim@email.com", points: 12800, lifetimeValue: "$4,890.00", joinedVip: "Mar 22, 2023", totalOrders: 28, lastOrder: "Oct 21, 2026", tier: "VIP" },
  { id: "C017", name: "Diana Patel", initials: "DP", email: "d.patel@email.com", points: 9750, lifetimeValue: "$3,640.00", joinedVip: "Jun 5, 2023", totalOrders: 22, lastOrder: "Oct 15, 2026", tier: "VIP" },
  { id: "C005", name: "Olivia Davis", initials: "OD", email: "olivia.d@email.com", points: 8200, lifetimeValue: "$3,108.00", joinedVip: "Apr 4, 2023", totalOrders: 22, lastOrder: "Oct 10, 2026", tier: "Platinum" },
  { id: "C024", name: "Chloe Nguyen", initials: "CN", email: "chloe.n@email.com", points: 7600, lifetimeValue: "$2,970.00", joinedVip: "Aug 14, 2023", totalOrders: 19, lastOrder: "Oct 19, 2026", tier: "VIP" },
  { id: "C031", name: "Amelia Foster", initials: "AF", email: "a.foster@email.com", points: 6900, lifetimeValue: "$2,580.00", joinedVip: "Oct 30, 2023", totalOrders: 17, lastOrder: "Oct 22, 2026", tier: "Platinum" },
]

export default function VIPCustomersPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="VIP Customers"
        description="Your most loyal and high-value customers"
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Customers", href: "/admin/customers" }, { label: "VIP" }]}
        actions={
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border/60 hover:bg-[#F8F7F5] transition-colors text-muted-foreground" style={{ fontSize: "13px" }}>
            <Gift className="w-4 h-4" strokeWidth={1.5} /> Send VIP Reward
          </button>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "VIP Members", value: "89", sub: "Total", icon: Crown, color: "#7C3AED" },
          { label: "Avg Lifetime Value", value: "$3,752", sub: "Per VIP", icon: DollarSign, color: "#501D2A" },
          { label: "Total Points Issued", value: "892K", sub: "This year", icon: Star, color: "#D97706" },
          { label: "VIP Revenue Share", value: "38%", sub: "of total revenue", icon: TrendingUp, color: "#2D6B4F" },
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
        <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid #F0EDEF" }}>
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
              <tr style={{ borderBottom: "1px solid #F0EDEF" }}>
                {["Customer", "Tier", "Points Balance", "Lifetime Value", "Orders", "Last Order", "Joined VIP", "Actions"].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-muted-foreground font-medium" style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.07em" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {vipCustomers.map((c, i) => (
                <tr
                  key={c.id}
                  className="hover:bg-[#F8F7F5] transition-colors"
                  style={{ borderBottom: i < vipCustomers.length - 1 ? "1px solid #F0EDEF" : "none" }}
                >
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-semibold" style={{ backgroundColor: "#501D2A", fontSize: "11px" }}>
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
                      <button className="p-1.5 rounded-lg hover:bg-[#F0EDEF] transition-colors text-muted-foreground hover:text-foreground">
                        <Eye className="w-3.5 h-3.5" strokeWidth={1.5} />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-[#F0EDEF] transition-colors text-muted-foreground hover:text-foreground">
                        <Pencil className="w-3.5 h-3.5" strokeWidth={1.5} />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-[#F0EDEF] transition-colors text-muted-foreground hover:text-foreground">
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
