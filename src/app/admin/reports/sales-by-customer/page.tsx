import { PageHeader } from "@/components/admin/page-header"
import { Download, Crown, Star, Award } from "lucide-react"

const customers = [
  { name: "Sophia Mitchell", email: "sophia.m@email.com", orders: 24, totalSpent: "$2,840", avgOrder: "$118.33", firstOrder: "Jan 12, 2023", lastOrder: "Oct 18, 2024", tier: "Platinum", avatar: "S" },
  { name: "Emily Carter", email: "emily.c@email.com", orders: 19, totalSpent: "$2,280", avgOrder: "$120.00", firstOrder: "Mar 4, 2023", lastOrder: "Oct 20, 2024", tier: "Platinum", avatar: "E" },
  { name: "Isabella Thompson", email: "isabella.t@email.com", orders: 17, totalSpent: "$1,955", avgOrder: "$115.00", firstOrder: "Feb 14, 2023", lastOrder: "Sep 30, 2024", tier: "Gold", avatar: "I" },
  { name: "Charlotte Brown", email: "charlotte.b@email.com", orders: 15, totalSpent: "$1,620", avgOrder: "$108.00", firstOrder: "Apr 22, 2023", lastOrder: "Oct 10, 2024", tier: "Gold", avatar: "C" },
  { name: "Ava Robinson", email: "ava.r@email.com", orders: 12, totalSpent: "$1,344", avgOrder: "$112.00", firstOrder: "Jun 5, 2023", lastOrder: "Oct 15, 2024", tier: "Gold", avatar: "A" },
  { name: "Mia Anderson", email: "mia.a@email.com", orders: 10, totalSpent: "$980", avgOrder: "$98.00", firstOrder: "Jul 18, 2023", lastOrder: "Sep 28, 2024", tier: "Silver", avatar: "M" },
  { name: "Harper Jackson", email: "harper.j@email.com", orders: 8, totalSpent: "$720", avgOrder: "$90.00", firstOrder: "Aug 3, 2023", lastOrder: "Oct 5, 2024", tier: "Silver", avatar: "H" },
  { name: "Lily White", email: "lily.w@email.com", orders: 6, totalSpent: "$480", avgOrder: "$80.00", firstOrder: "Sep 11, 2023", lastOrder: "Oct 1, 2024", tier: "Bronze", avatar: "L" },
]

const tierConfig: Record<string, { color: string; bg: string; icon: typeof Crown }> = {
  Platinum: { color: "#7c3aed", bg: "#f5f3ff", icon: Crown },
  Gold: { color: "#d97706", bg: "#fffbeb", icon: Star },
  Silver: { color: "#6b7280", bg: "#f9fafb", icon: Award },
  Bronze: { color: "#92400e", bg: "#fef3c7", icon: Award },
}

export default function SalesByCustomerPage() {
  return (
    <div>
      <PageHeader
        title="Sales by Customer"
        description="Top customers ranked by total lifetime spend"
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Reports", href: "/admin/reports" }, { label: "Sales by Customer" }]}
        actions={
          <button
            className="flex items-center gap-2 rounded-lg border border-border/50 bg-white px-3 py-2 text-foreground hover:bg-muted/30 transition-colors"
            style={{ fontSize: "13px" }}
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        }
      />

      {/* Summary */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: "Top Customer Spend", value: "$2,840", sub: "Sophia Mitchell" },
          { label: "Avg Customer Spend", value: "$1,527", sub: "Across top 8" },
          { label: "Avg Orders / Customer", value: "13.9", sub: "Per customer" },
          { label: "Platinum Members", value: "2", sub: "Highest tier" },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl border border-border/50 p-5">
            <p className="text-muted-foreground mb-1" style={{ fontSize: "12px" }}>{s.label}</p>
            <p className="font-semibold text-foreground text-xl">{s.value}</p>
            <p className="text-muted-foreground" style={{ fontSize: "12px" }}>{s.sub}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-border/50">
        <div className="px-6 py-4 border-b border-border/50">
          <h2 className="font-semibold text-foreground" style={{ fontSize: "15px" }}>Customer Leaderboard</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50">
                {["Customer", "Orders", "Total Spent", "Avg Order", "First Order", "Last Order", "Loyalty Tier"].map(h => (
                  <th key={h} className="text-left px-6 py-3 text-muted-foreground font-medium" style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.06em" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {customers.map((c, i) => {
                const tier = tierConfig[c.tier]
                const TierIcon = tier.icon
                return (
                  <tr key={c.email} className={`border-b border-border/30 hover:bg-muted/20 transition-colors ${i === customers.length - 1 ? "border-b-0" : ""}`}>
                    <td className="px-6 py-4" style={{ fontSize: "13px" }}>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold" style={{ backgroundColor: "var(--primary)", fontSize: "12px" }}>
                          {c.avatar}
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{c.name}</p>
                          <p className="text-muted-foreground" style={{ fontSize: "11px" }}>{c.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-foreground" style={{ fontSize: "13px" }}>{c.orders}</td>
                    <td className="px-6 py-4 font-semibold text-foreground" style={{ fontSize: "13px" }}>{c.totalSpent}</td>
                    <td className="px-6 py-4 text-muted-foreground" style={{ fontSize: "13px" }}>{c.avgOrder}</td>
                    <td className="px-6 py-4 text-muted-foreground" style={{ fontSize: "13px" }}>{c.firstOrder}</td>
                    <td className="px-6 py-4 text-muted-foreground" style={{ fontSize: "13px" }}>{c.lastOrder}</td>
                    <td className="px-6 py-4" style={{ fontSize: "13px" }}>
                      <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full w-fit font-medium" style={{ fontSize: "11px", color: tier.color, backgroundColor: tier.bg }}>
                        <TierIcon className="w-3 h-3" />
                        {c.tier}
                      </span>
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
