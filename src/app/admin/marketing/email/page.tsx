import { PageHeader } from "@/components/admin/page-header"
import { Plus, Mail, Send, Users, BarChart2, Eye, Copy } from "lucide-react"

type CampaignStatus = "Sent" | "Scheduled" | "Draft" | "Sending"

interface EmailCampaign {
  subject: string
  recipients: number
  sentDate: string
  openRate: string
  clickRate: string
  status: CampaignStatus
}

const campaigns: EmailCampaign[] = [
  { subject: "Your New Autumn Arrivals Are Here 🍂", recipients: 8432, sentDate: "Oct 20, 2024", openRate: "42.3%", clickRate: "8.7%", status: "Sent" },
  { subject: "Exclusive: VIP Early Access Starts Now", recipients: 1240, sentDate: "Oct 18, 2024", openRate: "61.2%", clickRate: "14.5%", status: "Sent" },
  { subject: "Weekend Flash Sale – 30% Off Ends Tonight", recipients: 8432, sentDate: "Oct 26, 2024", openRate: "—", clickRate: "—", status: "Scheduled" },
  { subject: "We Miss You — Here's 15% to Come Back", recipients: 2190, sentDate: "Oct 15, 2024", openRate: "28.4%", clickRate: "5.2%", status: "Sent" },
  { subject: "Black Friday Is Coming – Get Ready", recipients: 8432, sentDate: "—", openRate: "—", clickRate: "—", status: "Draft" },
]

const statusConfig: Record<CampaignStatus, { bg: string; color: string }> = {
  Sent: { bg: "#DCFCE7", color: "#166534" },
  Scheduled: { bg: "#FEF9C3", color: "#854D0E" },
  Draft: { bg: "#F3F4F6", color: "#6B7280" },
  Sending: { bg: "#EFF6FF", color: "#1D4ED8" },
}

const sidebarItems = [
  { label: "Campaigns", active: true, count: 5 },
  { label: "Templates", active: false, count: 12 },
  { label: "Subscribers", active: false, count: 8432 },
]

export default function EmailMarketingPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Email Marketing"
        description="Manage campaigns, templates, and subscriber lists"
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Marketing", href: "/admin/marketing" }, { label: "Email" }]}
        actions={
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-white hover:opacity-90 transition-opacity"
            style={{ backgroundColor: "#501D2A", fontSize: "13px" }}
          >
            <Plus className="w-4 h-4" strokeWidth={1.5} />
            New Campaign
          </button>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Subscribers", value: "8,432", sub: "+124 this week", icon: Users },
          { label: "Campaigns Sent", value: "24", sub: "this year", icon: Send },
          { label: "Avg Open Rate", value: "38.5%", sub: "industry: 21.3%", icon: Mail },
          { label: "Avg Click Rate", value: "7.2%", sub: "industry: 2.6%", icon: BarChart2 },
        ].map((c) => (
          <div key={c.label} className="bg-white rounded-xl border border-border/50 p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-muted-foreground" style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.07em" }}>{c.label}</p>
                <p className="font-semibold text-foreground mt-1" style={{ fontSize: "22px" }}>{c.value}</p>
                <p className="text-muted-foreground" style={{ fontSize: "11px" }}>{c.sub}</p>
              </div>
              <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: "#FAF0F2" }}>
                <c.icon className="w-4 h-4" style={{ color: "#501D2A" }} strokeWidth={1.5} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-6">
        {/* Sidebar tabs */}
        <div className="bg-white rounded-xl border border-border/50 p-3 shrink-0 w-44 h-fit">
          <div className="space-y-1">
            {sidebarItems.map((item) => (
              <button
                key={item.label}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors text-left"
                style={{
                  backgroundColor: item.active ? "#FAF0F2" : "transparent",
                  color: item.active ? "#501D2A" : "#6B7280",
                  fontSize: "13px",
                  fontWeight: item.active ? 600 : 400,
                }}
              >
                <span>{item.label}</span>
                <span
                  className="rounded-full px-1.5 py-0.5"
                  style={{
                    fontSize: "10px",
                    backgroundColor: item.active ? "#501D2A" : "#F0EDEF",
                    color: item.active ? "white" : "#6B7280"
                  }}
                >
                  {item.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Campaign list */}
        <div className="flex-1 bg-white rounded-xl border border-border/50">
          <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid #F0EDEF" }}>
            <p className="font-medium text-foreground" style={{ fontSize: "14px" }}>Email Campaigns</p>
            <span className="text-muted-foreground" style={{ fontSize: "12px" }}>5 campaigns</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: "1px solid #F0EDEF" }}>
                  {["Subject", "Recipients", "Sent Date", "Open Rate", "Click Rate", "Status", "Actions"].map((h) => (
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
                {campaigns.map((camp, i) => {
                  const cfg = statusConfig[camp.status]
                  const openNum = parseFloat(camp.openRate)
                  return (
                    <tr
                      key={i}
                      className="hover:bg-[#F8F7F5] transition-colors"
                      style={{ borderBottom: i < campaigns.length - 1 ? "1px solid #F0EDEF" : "none" }}
                    >
                      <td className="px-5 py-3.5 max-w-xs">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: "#FAF0F2" }}>
                            <Mail className="w-3.5 h-3.5" style={{ color: "#501D2A" }} strokeWidth={1.5} />
                          </div>
                          <p className="text-foreground truncate" style={{ fontSize: "13px" }}>{camp.subject}</p>
                        </div>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="text-foreground" style={{ fontSize: "13px" }}>{camp.recipients.toLocaleString()}</span>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="text-muted-foreground" style={{ fontSize: "12px" }}>{camp.sentDate}</span>
                      </td>
                      <td className="px-5 py-3.5">
                        {camp.openRate !== "—" ? (
                          <div className="space-y-1">
                            <span className="font-medium text-foreground" style={{ fontSize: "13px" }}>{camp.openRate}</span>
                            <div className="h-1 rounded-full w-16 overflow-hidden" style={{ backgroundColor: "#F0EDEF" }}>
                              <div className="h-full rounded-full" style={{ width: `${openNum * 1.5}%`, backgroundColor: "#501D2A" }} />
                            </div>
                          </div>
                        ) : (
                          <span className="text-muted-foreground" style={{ fontSize: "13px" }}>—</span>
                        )}
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="font-medium" style={{ fontSize: "13px", color: camp.clickRate !== "—" ? "#166534" : "#9CA3AF" }}>{camp.clickRate}</span>
                      </td>
                      <td className="px-5 py-3.5">
                        <span
                          className="inline-flex items-center rounded-full px-2.5 py-0.5 font-medium"
                          style={{ fontSize: "11px", backgroundColor: cfg.bg, color: cfg.color }}
                        >
                          {camp.status}
                        </span>
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-1">
                          <button className="p-1.5 rounded-lg hover:bg-[#F0EDEF] transition-colors text-muted-foreground hover:text-foreground">
                            <Eye className="w-3.5 h-3.5" strokeWidth={1.5} />
                          </button>
                          <button className="p-1.5 rounded-lg hover:bg-[#F0EDEF] transition-colors text-muted-foreground hover:text-foreground">
                            <Copy className="w-3.5 h-3.5" strokeWidth={1.5} />
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
    </div>
  )
}
