import { PageHeader } from "@/components/admin/page-header"
import { Save, Star, Users, TrendingUp, Award } from "lucide-react"

interface Customer {
  rank: number
  name: string
  email: string
  points: number
  tier: "Bronze" | "Silver" | "Gold" | "Platinum"
  lastEarned: string
  totalSpent: string
}

const customers: Customer[] = [
  { rank: 1, name: "Olivia Hartmann", email: "o.hartmann@email.com", points: 8420, tier: "Platinum", lastEarned: "Oct 24, 2024", totalSpent: "$2,105" },
  { rank: 2, name: "Marcus Chen", email: "m.chen@email.com", points: 6150, tier: "Gold", lastEarned: "Oct 22, 2024", totalSpent: "$1,538" },
  { rank: 3, name: "Priya Nair", email: "p.nair@email.com", points: 4820, tier: "Gold", lastEarned: "Oct 19, 2024", totalSpent: "$1,205" },
  { rank: 4, name: "Sophie Laurent", email: "s.laurent@email.com", points: 3340, tier: "Silver", lastEarned: "Oct 21, 2024", totalSpent: "$835" },
  { rank: 5, name: "Aisha Kamara", email: "a.kamara@email.com", points: 2890, tier: "Silver", lastEarned: "Oct 18, 2024", totalSpent: "$723" },
  { rank: 6, name: "Noah Lindqvist", email: "n.lindqvist@email.com", points: 1240, tier: "Bronze", lastEarned: "Oct 15, 2024", totalSpent: "$310" },
]

const tierConfig = {
  Platinum: { bg: "#F5F3FF", color: "#6D28D9", dot: "#8B5CF6" },
  Gold: { bg: "#FFF7ED", color: "#92400E", dot: "#F59E0B" },
  Silver: { bg: "#F3F4F6", color: "#4B5563", dot: "#9CA3AF" },
  Bronze: { bg: "#FFF7ED", color: "#9A3412", dot: "#D97706" },
}

const tierThresholds = [
  { tier: "Bronze", min: 0, max: 1999, color: "#D97706" },
  { tier: "Silver", min: 2000, max: 4999, color: "#9CA3AF" },
  { tier: "Gold", min: 5000, max: 9999, color: "#F59E0B" },
  { tier: "Platinum", min: 10000, max: Infinity, color: "#8B5CF6" },
]

export default function LoyaltyPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Loyalty & Reward Points"
        description="Configure your loyalty program and manage customer points"
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Marketing", href: "/admin/marketing" }, { label: "Loyalty" }]}
        actions={
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-white hover:opacity-90 transition-opacity"
            style={{ backgroundColor: "var(--primary)", fontSize: "13px" }}
          >
            <Save className="w-4 h-4" strokeWidth={1.5} />
            Save Settings
          </button>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Program Members", value: "1,842", sub: "enrolled customers", icon: Users, color: "var(--primary)" },
          { label: "Points Issued", value: "284,600", sub: "total all-time", icon: Star, color: "#F59E0B" },
          { label: "Points Redeemed", value: "142,300", sub: "50% redemption rate", icon: TrendingUp, color: "#166534" },
          { label: "Rewards Paid", value: "$1,423", sub: "in discounts given", icon: Award, color: "#7C3D52" },
        ].map((c) => (
          <div key={c.label} className="bg-white rounded-xl border border-border/50 p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-muted-foreground" style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.07em" }}>{c.label}</p>
                <p className="font-semibold text-foreground mt-1" style={{ fontSize: "20px" }}>{c.value}</p>
                <p className="text-muted-foreground" style={{ fontSize: "11px" }}>{c.sub}</p>
              </div>
              <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: "#FAF0F2" }}>
                <c.icon className="w-4 h-4" style={{ color: c.color }} strokeWidth={1.5} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Settings Form */}
        <div className="bg-white rounded-xl border border-border/50 p-6">
          <h2 className="font-semibold text-foreground mb-5" style={{ fontSize: "15px" }}>Program Settings</h2>
          <div className="space-y-5">
            <div>
              <label className="block text-muted-foreground mb-1.5 font-medium" style={{ fontSize: "12px" }}>Points per $1 Spent</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  defaultValue={4}
                  className="w-full px-3 py-2 rounded-lg border border-border/60 bg-[var(--muted)] text-foreground focus:outline-none focus:border-primary/40"
                  style={{ fontSize: "13px" }}
                />
                <span className="text-muted-foreground whitespace-nowrap" style={{ fontSize: "12px" }}>pts/$1</span>
              </div>
            </div>
            <div>
              <label className="block text-muted-foreground mb-1.5 font-medium" style={{ fontSize: "12px" }}>Redemption Rate</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  defaultValue={100}
                  className="w-full px-3 py-2 rounded-lg border border-border/60 bg-[var(--muted)] text-foreground focus:outline-none focus:border-primary/40"
                  style={{ fontSize: "13px" }}
                />
                <span className="text-muted-foreground whitespace-nowrap" style={{ fontSize: "12px" }}>pts = $1</span>
              </div>
            </div>
            <div>
              <label className="block text-muted-foreground mb-1.5 font-medium" style={{ fontSize: "12px" }}>Minimum Points to Redeem</label>
              <input
                type="number"
                defaultValue={500}
                className="w-full px-3 py-2 rounded-lg border border-border/60 bg-[var(--muted)] text-foreground focus:outline-none focus:border-primary/40"
                style={{ fontSize: "13px" }}
              />
            </div>
            <div>
              <label className="block text-muted-foreground mb-1.5 font-medium" style={{ fontSize: "12px" }}>Points Expiry (months)</label>
              <input
                type="number"
                defaultValue={24}
                className="w-full px-3 py-2 rounded-lg border border-border/60 bg-[var(--muted)] text-foreground focus:outline-none focus:border-primary/40"
                style={{ fontSize: "13px" }}
              />
            </div>
            <div className="flex items-center justify-between py-3 rounded-lg px-3" style={{ backgroundColor: "var(--muted)" }}>
              <div>
                <p className="text-foreground font-medium" style={{ fontSize: "13px" }}>Program Active</p>
                <p className="text-muted-foreground" style={{ fontSize: "11px" }}>Customers can earn and redeem</p>
              </div>
              <button
                className="relative inline-flex items-center rounded-full shrink-0"
                style={{ width: "40px", height: "22px", backgroundColor: "var(--primary)" }}
              >
                <span className="inline-block w-4 h-4 rounded-full bg-white shadow-sm" style={{ transform: "translateX(20px)" }} />
              </button>
            </div>
          </div>

          {/* Tier Thresholds */}
          <div className="mt-6 pt-5" style={{ borderTop: "1px solid var(--accent)" }}>
            <p className="font-medium text-foreground mb-3" style={{ fontSize: "13px" }}>Tier Thresholds</p>
            <div className="space-y-2">
              {tierThresholds.map((t) => (
                <div key={t.tier} className="flex items-center justify-between py-2 px-3 rounded-lg" style={{ backgroundColor: "var(--muted)" }}>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: t.color }} />
                    <span className="font-medium text-foreground" style={{ fontSize: "12px" }}>{t.tier}</span>
                  </div>
                  <span className="text-muted-foreground font-mono" style={{ fontSize: "11px" }}>
                    {t.max === Infinity ? `${t.min.toLocaleString()}+` : `${t.min.toLocaleString()} – ${t.max.toLocaleString()}`} pts
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Leaderboard */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-border/50">
          <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid var(--accent)" }}>
            <div>
              <h2 className="font-semibold text-foreground" style={{ fontSize: "15px" }}>Points Leaderboard</h2>
              <p className="text-muted-foreground" style={{ fontSize: "12px" }}>Top customers by total points</p>
            </div>
            <Award className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: "1px solid var(--accent)" }}>
                  {["Rank", "Customer", "Points", "Tier", "Last Earned", "Total Spent"].map((h) => (
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
                {customers.map((c, i) => {
                  const cfg = tierConfig[c.tier]
                  return (
                    <tr
                      key={c.email}
                      className="hover:bg-[var(--muted)] transition-colors"
                      style={{ borderBottom: i < customers.length - 1 ? "1px solid var(--accent)" : "none" }}
                    >
                      <td className="px-5 py-3.5">
                        <div
                          className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-white"
                          style={{ fontSize: "12px", backgroundColor: c.rank === 1 ? "#F59E0B" : c.rank === 2 ? "#9CA3AF" : c.rank === 3 ? "#D97706" : "#E5E7EB", color: c.rank <= 3 ? "white" : "#6B7280" }}
                        >
                          {c.rank}
                        </div>
                      </td>
                      <td className="px-5 py-3.5">
                        <p className="font-medium text-foreground" style={{ fontSize: "13px" }}>{c.name}</p>
                        <p className="text-muted-foreground" style={{ fontSize: "11px" }}>{c.email}</p>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="font-semibold text-foreground" style={{ fontSize: "14px" }}>{c.points.toLocaleString()}</span>
                        <span className="text-muted-foreground ml-1" style={{ fontSize: "11px" }}>pts</span>
                      </td>
                      <td className="px-5 py-3.5">
                        <span
                          className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 font-medium"
                          style={{ fontSize: "11px", backgroundColor: cfg.bg, color: cfg.color }}
                        >
                          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: cfg.dot }} />
                          {c.tier}
                        </span>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="text-muted-foreground" style={{ fontSize: "12px" }}>{c.lastEarned}</span>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="font-medium text-foreground" style={{ fontSize: "13px" }}>{c.totalSpent}</span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
