import { PageHeader } from "@/components/admin/page-header"
import { Plus, Users, RefreshCw, Pencil, Trash2, Zap, TrendingUp, Clock, AlertTriangle, ShoppingBag, Repeat } from "lucide-react"

interface Segment {
  id: string
  name: string
  description: string
  rule: string
  count: number
  lastUpdated: string
  icon: React.ElementType
  color: string
  trend: string
  trendDir: "up" | "down" | "neutral"
}

const segments: Segment[] = [
  {
    id: "SEG001",
    name: "High Value",
    description: "Customers with lifetime spend over $2,000 and at least 10 orders",
    rule: "lifetime_spend > $2,000 AND total_orders >= 10",
    count: 142,
    lastUpdated: "2 hours ago",
    icon: TrendingUp,
    color: "#501D2A",
    trend: "+8 this week",
    trendDir: "up",
  },
  {
    id: "SEG002",
    name: "Inactive 90d",
    description: "Customers who haven't placed an order in the last 90 days",
    rule: "last_order_date < NOW() - 90 days",
    count: 317,
    lastUpdated: "6 hours ago",
    icon: Clock,
    color: "#D97706",
    trend: "+12 this week",
    trendDir: "down",
  },
  {
    id: "SEG003",
    name: "First Purchase",
    description: "Customers who have made exactly one order — ideal for upsell campaigns",
    rule: "total_orders = 1",
    count: 438,
    lastUpdated: "1 day ago",
    icon: ShoppingBag,
    color: "#2D5A8E",
    trend: "+31 this week",
    trendDir: "up",
  },
  {
    id: "SEG004",
    name: "Repeat Buyers",
    description: "Customers with 3 or more orders showing strong retention",
    rule: "total_orders >= 3",
    count: 504,
    lastUpdated: "3 hours ago",
    icon: Repeat,
    color: "#2D6B4F",
    trend: "+19 this week",
    trendDir: "up",
  },
  {
    id: "SEG005",
    name: "At Risk",
    description: "Previously active customers showing signs of churn — last order 45–89 days ago",
    rule: "last_order_date BETWEEN NOW() - 89 days AND NOW() - 45 days",
    count: 89,
    lastUpdated: "12 hours ago",
    icon: AlertTriangle,
    color: "#DC2626",
    trend: "+5 this week",
    trendDir: "down",
  },
]

export default function CustomerSegmentsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Customer Segments"
        description="Dynamic rule-based groups for targeted marketing and analysis"
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Customers", href: "/admin/customers" }, { label: "Segments" }]}
        actions={
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border/60 hover:bg-[#F8F7F5] transition-colors text-muted-foreground" style={{ fontSize: "13px" }}>
              <RefreshCw className="w-3.5 h-3.5" strokeWidth={1.5} /> Refresh All
            </button>
            <button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors" style={{ fontSize: "13px" }}>
              <Plus className="w-4 h-4" strokeWidth={1.5} /> New Segment
            </button>
          </div>
        }
      />

      {/* Total strip */}
      <div className="bg-white rounded-xl border border-border/50 p-4">
        <div className="flex flex-wrap gap-6">
          <div>
            <p className="text-muted-foreground" style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.07em" }}>Active Segments</p>
            <p className="font-semibold text-foreground" style={{ fontSize: "22px" }}>5</p>
          </div>
          <div>
            <p className="text-muted-foreground" style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.07em" }}>Total Customers Segmented</p>
            <p className="font-semibold text-foreground" style={{ fontSize: "22px" }}>1,490</p>
          </div>
          <div>
            <p className="text-muted-foreground" style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.07em" }}>Last Global Refresh</p>
            <p className="font-semibold text-foreground" style={{ fontSize: "22px" }}>2h ago</p>
          </div>
        </div>
      </div>

      {/* Segment Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {segments.map((seg) => {
          const Icon = seg.icon
          return (
            <div key={seg.id} className="bg-white rounded-xl border border-border/50 p-5 flex flex-col gap-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: seg.color + "15" }}>
                    <Icon className="w-5 h-5" style={{ color: seg.color }} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground" style={{ fontSize: "14px" }}>{seg.name}</h3>
                    <p className="text-muted-foreground" style={{ fontSize: "11px" }}>Updated {seg.lastUpdated}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button className="p-1.5 rounded-lg hover:bg-[#F0EDEF] transition-colors text-muted-foreground">
                    <Pencil className="w-3.5 h-3.5" strokeWidth={1.5} />
                  </button>
                  <button className="p-1.5 rounded-lg hover:bg-red-50 transition-colors text-muted-foreground hover:text-red-600">
                    <Trash2 className="w-3.5 h-3.5" strokeWidth={1.5} />
                  </button>
                </div>
              </div>

              <p className="text-muted-foreground" style={{ fontSize: "13px" }}>{seg.description}</p>

              <div className="rounded-lg px-3 py-2" style={{ backgroundColor: "#F8F7F5" }}>
                <div className="flex items-center gap-1.5 mb-1">
                  <Zap className="w-3 h-3 text-muted-foreground" strokeWidth={1.5} />
                  <span className="text-muted-foreground font-medium" style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.06em" }}>Rule</span>
                </div>
                <code className="text-foreground" style={{ fontSize: "11px", fontFamily: "monospace" }}>{seg.rule}</code>
              </div>

              <div className="flex items-center justify-between pt-1" style={{ borderTop: "1px solid #F0EDEF" }}>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
                  <span className="font-semibold text-foreground" style={{ fontSize: "15px" }}>{seg.count.toLocaleString()}</span>
                  <span className="text-muted-foreground" style={{ fontSize: "12px" }}>customers</span>
                </div>
                <span
                  className={seg.trendDir === "up" ? "text-emerald-600" : "text-red-500"}
                  style={{ fontSize: "11px", fontWeight: 500 }}
                >
                  {seg.trend}
                </span>
              </div>
            </div>
          )
        })}

        {/* Add new segment card */}
        <button className="bg-white rounded-xl border border-dashed border-border hover:border-primary/40 transition-colors p-5 flex flex-col items-center justify-center gap-3 text-center group" style={{ minHeight: "200px" }}>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#F8F7F5] group-hover:bg-primary/10 transition-colors">
            <Plus className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" strokeWidth={1.5} />
          </div>
          <div>
            <p className="font-medium text-muted-foreground group-hover:text-foreground transition-colors" style={{ fontSize: "13px" }}>Create New Segment</p>
            <p className="text-muted-foreground" style={{ fontSize: "11px" }}>Define custom rules to target customers</p>
          </div>
        </button>
      </div>
    </div>
  )
}
