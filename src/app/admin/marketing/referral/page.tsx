import { PageHeader } from "@/components/admin/page-header"
import { Plus, Users, CheckCircle, Clock, DollarSign, Eye } from "lucide-react"

type ReferralStatus = "Completed" | "Pending" | "Expired"

interface Referral {
  referrer: string
  referred: string
  status: ReferralStatus
  reward: string
  date: string
  orderValue: string
}

const referrals: Referral[] = [
  { referrer: "Olivia Hartmann", referred: "Nina Reeves", status: "Completed", reward: "$20.00", date: "Oct 22, 2024", orderValue: "$128.00" },
  { referrer: "Marcus Chen", referred: "David Park", status: "Completed", reward: "$20.00", date: "Oct 19, 2024", orderValue: "$94.00" },
  { referrer: "Priya Nair", referred: "Samira Hassan", status: "Pending", reward: "—", date: "Oct 21, 2024", orderValue: "—" },
  { referrer: "Sophie Laurent", referred: "Celeste Morin", status: "Completed", reward: "$20.00", date: "Oct 15, 2024", orderValue: "$210.00" },
  { referrer: "Aisha Kamara", referred: "Joy Mensah", status: "Pending", reward: "—", date: "Oct 23, 2024", orderValue: "—" },
]

const statusConfig: Record<ReferralStatus, { bg: string; color: string; icon: typeof CheckCircle }> = {
  Completed: { bg: "#DCFCE7", color: "#166534", icon: CheckCircle },
  Pending: { bg: "#FEF9C3", color: "#854D0E", icon: Clock },
  Expired: { bg: "#FEE2E2", color: "#991B1B", icon: Clock },
}

export default function ReferralPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Referral Program"
        description="Track customer referrals and manage rewards"
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Marketing", href: "/admin/marketing" }, { label: "Referral" }]}
        actions={
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-white hover:opacity-90 transition-opacity"
            style={{ backgroundColor: "#501D2A", fontSize: "13px" }}
          >
            <Plus className="w-4 h-4" strokeWidth={1.5} />
            Configure Program
          </button>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Referrals", value: "89", sub: "all time", icon: Users, bg: "#FAF0F2", color: "#501D2A" },
          { label: "Successful", value: "67", sub: "completed purchase", icon: CheckCircle, bg: "#F0FDF4", color: "#166534" },
          { label: "Pending", value: "22", sub: "awaiting purchase", icon: Clock, bg: "#FFF9C4", color: "#854D0E" },
          { label: "Rewards Paid", value: "$1,340", sub: "in referral bonuses", icon: DollarSign, bg: "#EFF6FF", color: "#1D4ED8" },
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

      {/* Program Config Banner */}
      <div className="bg-white rounded-xl border border-border/50 p-5">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex-1">
            <p className="font-semibold text-foreground" style={{ fontSize: "14px" }}>Referral Program Settings</p>
            <p className="text-muted-foreground mt-0.5" style={{ fontSize: "12px" }}>Referrer earns $20 credit · Referred friend gets 10% off first order</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-center">
              <p className="text-muted-foreground" style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.07em" }}>Referrer Reward</p>
              <p className="font-bold" style={{ fontSize: "18px", color: "#501D2A" }}>$20</p>
            </div>
            <div className="text-center">
              <p className="text-muted-foreground" style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.07em" }}>Friend Discount</p>
              <p className="font-bold" style={{ fontSize: "18px", color: "#501D2A" }}>10%</p>
            </div>
            <div className="text-center">
              <p className="text-muted-foreground" style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.07em" }}>Conversion Rate</p>
              <p className="font-bold" style={{ fontSize: "18px", color: "#166534" }}>75.3%</p>
            </div>
            <button
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border/60 text-muted-foreground hover:text-foreground hover:bg-[#F8F7F5] transition-colors"
              style={{ fontSize: "12px" }}
            >
              Edit Settings
            </button>
          </div>
        </div>
      </div>

      {/* Referrals Table */}
      <div className="bg-white rounded-xl border border-border/50">
        <div className="px-5 py-4" style={{ borderBottom: "1px solid #F0EDEF" }}>
          <p className="font-medium text-foreground" style={{ fontSize: "14px" }}>Referral History</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid #F0EDEF" }}>
                {["Referrer", "Referred Customer", "Status", "Reward", "Order Value", "Date", "Actions"].map((h) => (
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
              {referrals.map((r, i) => {
                const cfg = statusConfig[r.status]
                const Icon = cfg.icon
                return (
                  <tr
                    key={`${r.referrer}-${i}`}
                    className="hover:bg-[#F8F7F5] transition-colors"
                    style={{ borderBottom: i < referrals.length - 1 ? "1px solid #F0EDEF" : "none" }}
                  >
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold shrink-0" style={{ backgroundColor: "#501D2A", fontSize: "11px" }}>
                          {r.referrer.split(" ").map((n) => n[0]).join("")}
                        </div>
                        <span className="text-foreground" style={{ fontSize: "13px" }}>{r.referrer}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold shrink-0" style={{ backgroundColor: "#7C3D52", fontSize: "11px" }}>
                          {r.referred.split(" ").map((n) => n[0]).join("")}
                        </div>
                        <span className="text-foreground" style={{ fontSize: "13px" }}>{r.referred}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span
                        className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 font-medium"
                        style={{ fontSize: "11px", backgroundColor: cfg.bg, color: cfg.color }}
                      >
                        <Icon className="w-3 h-3" strokeWidth={1.5} />
                        {r.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="font-medium" style={{ fontSize: "13px", color: r.reward !== "—" ? "#166534" : "#9CA3AF" }}>{r.reward}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-foreground" style={{ fontSize: "13px" }}>{r.orderValue}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-muted-foreground" style={{ fontSize: "12px" }}>{r.date}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <button className="p-1.5 rounded-lg hover:bg-[#F0EDEF] transition-colors text-muted-foreground hover:text-foreground">
                        <Eye className="w-3.5 h-3.5" strokeWidth={1.5} />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-4" style={{ borderTop: "1px solid #F0EDEF" }}>
          <p className="text-muted-foreground" style={{ fontSize: "12px" }}>Showing 5 of 89 referrals</p>
        </div>
      </div>
    </div>
  )
}
