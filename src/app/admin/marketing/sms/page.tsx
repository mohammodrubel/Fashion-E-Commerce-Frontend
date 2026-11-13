import { PageHeader } from "@/components/admin/page-header"
import { Plus, MessageSquare, Users, CheckCircle, Zap } from "lucide-react"

type SMSStatus = "Delivered" | "Scheduled" | "Draft" | "Failed"

interface SMSCampaign {
  message: string
  recipients: number
  sent: number
  deliveryRate: string
  status: SMSStatus
  date: string
  cost: string
}

const campaigns: SMSCampaign[] = []

const statusConfig: Record<SMSStatus, { bg: string; color: string }> = {
  Delivered: { bg: "#DCFCE7", color: "#166534" },
  Scheduled: { bg: "#FEF9C3", color: "#854D0E" },
  Draft: { bg: "#F3F4F6", color: "#6B7280" },
  Failed: { bg: "#FEE2E2", color: "#991B1B" },
}

export default function SMSMarketingPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="SMS Marketing"
        description="Send targeted text message campaigns to your customers"
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Marketing", href: "/admin/marketing" }, { label: "SMS" }]}
        actions={
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-white hover:opacity-90 transition-opacity"
            style={{ backgroundColor: "var(--primary)", fontSize: "13px" }}
          >
            <Plus className="w-4 h-4" strokeWidth={1.5} />
            New SMS Campaign
          </button>
        }
      />

      {/* Credits & Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-border/50 p-4 flex items-center gap-3" style={{ borderLeft: "4px solid var(--primary)" }}>
          <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: "#FAF0F2" }}>
            <Zap className="w-4.5 h-4.5" style={{ color: "var(--primary)" }} strokeWidth={1.5} />
          </div>
          <div>
            <p className="text-muted-foreground" style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.07em" }}>Credits Remaining</p>
            <p className="font-bold text-foreground" style={{ fontSize: "20px" }}>2,840</p>
            <p className="text-muted-foreground" style={{ fontSize: "11px" }}>~$14.20 worth</p>
          </div>
        </div>
        {[
          { label: "Total Sent", value: "0", sub: "this month", icon: MessageSquare },
          { label: "Avg Delivery", value: "0.0%", sub: "delivery rate", icon: CheckCircle },
          { label: "Opted In", value: "0", sub: "SMS subscribers", icon: Users },
        ].map((c) => (
          <div key={c.label} className="bg-white rounded-xl border border-border/50 p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-muted-foreground" style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.07em" }}>{c.label}</p>
                <p className="font-semibold text-foreground mt-1" style={{ fontSize: "22px" }}>{c.value}</p>
                <p className="text-muted-foreground" style={{ fontSize: "11px" }}>{c.sub}</p>
              </div>
              <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: "#FAF0F2" }}>
                <c.icon className="w-4 h-4" style={{ color: "var(--primary)" }} strokeWidth={1.5} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Campaigns Table */}
      <div className="bg-white rounded-xl border border-border/50">
        <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid var(--accent)" }}>
          <p className="font-medium text-foreground" style={{ fontSize: "14px" }}>SMS Campaigns</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--accent)" }}>
                {["Message Preview", "Recipients", "Delivery Rate", "Date", "Cost", "Status"].map((h) => (
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
              {campaigns.map((c, i) => {
                const cfg = statusConfig[c.status]
                return (
                  <tr
                    key={i}
                    className="hover:bg-[var(--muted)] transition-colors"
                    style={{ borderBottom: i < campaigns.length - 1 ? "1px solid var(--accent)" : "none" }}
                  >
                    <td className="px-5 py-3.5 max-w-xs">
                      <div className="flex items-start gap-2">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5" style={{ backgroundColor: "#FAF0F2" }}>
                          <MessageSquare className="w-3.5 h-3.5" style={{ color: "var(--primary)" }} strokeWidth={1.5} />
                        </div>
                        <p className="text-foreground line-clamp-2" style={{ fontSize: "12px" }}>{c.message}</p>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-foreground" style={{ fontSize: "13px" }}>{c.recipients.toLocaleString()}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      {c.deliveryRate !== "—" ? (
                        <div className="space-y-1">
                          <span className="font-medium text-foreground" style={{ fontSize: "13px" }}>{c.deliveryRate}</span>
                          <div className="h-1 rounded-full w-16 overflow-hidden" style={{ backgroundColor: "var(--accent)" }}>
                            <div className="h-full rounded-full" style={{ width: c.deliveryRate, backgroundColor: "#22C55E" }} />
                          </div>
                        </div>
                      ) : (
                        <span className="text-muted-foreground" style={{ fontSize: "13px" }}>—</span>
                      )}
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-muted-foreground" style={{ fontSize: "12px" }}>{c.date}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-foreground font-mono" style={{ fontSize: "12px" }}>{c.cost}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span
                        className="inline-flex items-center rounded-full px-2.5 py-0.5 font-medium"
                        style={{ fontSize: "11px", backgroundColor: cfg.bg, color: cfg.color }}
                      >
                        {c.status}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3 rounded-b-xl" style={{ borderTop: "1px solid var(--accent)", backgroundColor: "var(--muted)" }}>
          <p className="text-muted-foreground" style={{ fontSize: "12px" }}>
            SMS pricing: $0.005 per message. Credits purchased at $10 = 2,000 credits.
          </p>
        </div>
      </div>
    </div>
  )
}
