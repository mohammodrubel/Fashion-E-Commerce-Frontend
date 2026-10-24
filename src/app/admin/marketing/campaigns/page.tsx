import { PageHeader } from "@/components/admin/page-header"
import { Plus, Pencil, Trash2, Eye, Calendar, DollarSign, Target } from "lucide-react"

type CampaignStatus = "Active" | "Scheduled" | "Ended" | "Draft"

interface Campaign {
  name: string
  type: string
  dateRange: string
  budget: string
  spent: string
  conversions: number
  revenue: string
  status: CampaignStatus
  color: string
}

const campaigns: Campaign[] = [
  {
    name: "Summer Glow Sale",
    type: "Seasonal Discount",
    dateRange: "Jun 1 – Aug 31, 2024",
    budget: "$2,000",
    spent: "$1,840",
    conversions: 234,
    revenue: "$12,400",
    status: "Active",
    color: "#501D2A",
  },
  {
    name: "Welcome Series",
    type: "New Customer",
    dateRange: "Jan 1 – Dec 31, 2024",
    budget: "$1,500",
    spent: "$920",
    conversions: 112,
    revenue: "$6,720",
    status: "Active",
    color: "#7C3D52",
  },
  {
    name: "VIP Early Access",
    type: "Loyalty Reward",
    dateRange: "Oct 1 – Oct 31, 2024",
    budget: "$800",
    spent: "$480",
    conversions: 56,
    revenue: "$4,200",
    status: "Active",
    color: "#9D5B6B",
  },
  {
    name: "Black Friday Blitz",
    type: "Flash Event",
    dateRange: "Nov 29 – Nov 30, 2024",
    budget: "$5,000",
    spent: "$0",
    conversions: 0,
    revenue: "$0",
    status: "Scheduled",
    color: "#1F2937",
  },
  {
    name: "Spring Refresh",
    type: "Seasonal Discount",
    dateRange: "Mar 1 – May 31, 2024",
    budget: "$1,200",
    spent: "$1,190",
    conversions: 189,
    revenue: "$9,840",
    status: "Ended",
    color: "#6B7280",
  },
]

const statusConfig: Record<CampaignStatus, { bg: string; color: string; dot: string }> = {
  Active: { bg: "#DCFCE7", color: "#166534", dot: "#22C55E" },
  Scheduled: { bg: "#FEF9C3", color: "#854D0E", dot: "#EAB308" },
  Ended: { bg: "#F3F4F6", color: "#6B7280", dot: "#9CA3AF" },
  Draft: { bg: "#EFF6FF", color: "#1D4ED8", dot: "#3B82F6" },
}

const typeColors: Record<string, string> = {
  "Seasonal Discount": "#EFF6FF",
  "New Customer": "#F0FDF4",
  "Loyalty Reward": "#FDF4FF",
  "Flash Event": "#FFF7ED",
}
const typeTextColors: Record<string, string> = {
  "Seasonal Discount": "#1D4ED8",
  "New Customer": "#166534",
  "Loyalty Reward": "#7E22CE",
  "Flash Event": "#9A3412",
}

export default function CampaignsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Promotions & Campaigns"
        description="Manage your marketing campaigns and promotional events"
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Marketing", href: "/admin/marketing" }, { label: "Campaigns" }]}
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

      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Campaigns", value: "5" },
          { label: "Active Now", value: "3" },
          { label: "Total Revenue", value: "$33,160" },
          { label: "Avg Conversion", value: "4.8%" },
        ].map((c) => (
          <div key={c.label} className="bg-white rounded-xl border border-border/50 p-4">
            <p className="text-muted-foreground" style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.07em" }}>{c.label}</p>
            <p className="font-semibold text-foreground mt-1" style={{ fontSize: "22px" }}>{c.value}</p>
          </div>
        ))}
      </div>

      {/* Campaign Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {campaigns.map((c) => {
          const cfg = statusConfig[c.status]
          const spentNum = parseFloat(c.spent.replace(/[$,]/g, ""))
          const budgetNum = parseFloat(c.budget.replace(/[$,]/g, ""))
          const spentPct = budgetNum > 0 ? Math.min((spentNum / budgetNum) * 100, 100) : 0
          return (
            <div key={c.name} className="bg-white rounded-xl border border-border/50 overflow-hidden hover:shadow-md transition-shadow">
              {/* Header stripe */}
              <div className="h-1.5 w-full" style={{ backgroundColor: c.color }} />
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground truncate" style={{ fontSize: "15px" }}>{c.name}</p>
                    <span
                      className="inline-flex items-center rounded-full px-2 py-0.5 mt-1 font-medium"
                      style={{
                        fontSize: "10px",
                        backgroundColor: typeColors[c.type] ?? "#F3F4F6",
                        color: typeTextColors[c.type] ?? "#6B7280"
                      }}
                    >
                      {c.type}
                    </span>
                  </div>
                  <span
                    className="flex items-center gap-1 rounded-full px-2.5 py-1 font-medium shrink-0 ml-2"
                    style={{ fontSize: "11px", backgroundColor: cfg.bg, color: cfg.color }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: cfg.dot }} />
                    {c.status}
                  </span>
                </div>

                <div className="space-y-2 my-4">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="w-3.5 h-3.5 shrink-0" strokeWidth={1.5} />
                    <span style={{ fontSize: "12px" }}>{c.dateRange}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <DollarSign className="w-3.5 h-3.5 shrink-0" strokeWidth={1.5} />
                    <span style={{ fontSize: "12px" }}>Budget: {c.budget}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Target className="w-3.5 h-3.5 shrink-0" strokeWidth={1.5} />
                    <span style={{ fontSize: "12px" }}>{c.conversions} conversions · {c.revenue} revenue</span>
                  </div>
                </div>

                {/* Budget progress */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-muted-foreground" style={{ fontSize: "11px" }}>Spent</span>
                    <span className="text-foreground font-medium" style={{ fontSize: "11px" }}>{c.spent} / {c.budget}</span>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: "#F0EDEF" }}>
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${spentPct}%`, backgroundColor: spentPct >= 90 ? "#EF4444" : "#501D2A" }}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-3" style={{ borderTop: "1px solid #F0EDEF" }}>
                  <button className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg border border-border/60 text-muted-foreground hover:text-foreground hover:bg-[#F8F7F5] transition-colors" style={{ fontSize: "12px" }}>
                    <Eye className="w-3.5 h-3.5" strokeWidth={1.5} /> View
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg border border-border/60 text-muted-foreground hover:text-foreground hover:bg-[#F8F7F5] transition-colors" style={{ fontSize: "12px" }}>
                    <Pencil className="w-3.5 h-3.5" strokeWidth={1.5} /> Edit
                  </button>
                  <button className="p-1.5 rounded-lg border border-border/60 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors text-muted-foreground">
                    <Trash2 className="w-3.5 h-3.5" strokeWidth={1.5} />
                  </button>
                </div>
              </div>
            </div>
          )
        })}

        {/* Add new campaign card */}
        <button className="bg-white rounded-xl border border-dashed border-border hover:border-primary/40 hover:bg-[#FAF0F2] transition-colors p-5 flex flex-col items-center justify-center gap-3 min-h-[260px] group">
          <div className="w-12 h-12 rounded-full flex items-center justify-center group-hover:opacity-90 transition-opacity" style={{ backgroundColor: "#FAF0F2" }}>
            <Plus className="w-5 h-5" style={{ color: "#501D2A" }} strokeWidth={1.5} />
          </div>
          <p className="font-medium text-muted-foreground group-hover:text-foreground transition-colors" style={{ fontSize: "13px" }}>Create New Campaign</p>
        </button>
      </div>
    </div>
  )
}
