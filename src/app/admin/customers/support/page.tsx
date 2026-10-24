import { PageHeader } from "@/components/admin/page-header"
import { Plus, Search, Eye, MessageSquare, Clock, CheckCircle, AlertCircle, MoreHorizontal } from "lucide-react"

interface Ticket {
  id: string
  customer: string
  initials: string
  subject: string
  priority: "High" | "Medium" | "Low"
  status: "Open" | "In Progress" | "Resolved"
  created: string
  lastReply: string
}

const tickets: Ticket[] = [
  { id: "TK-1042", customer: "Sarah Johnson", initials: "SJ", subject: "Order #4521 — item missing from package", priority: "High", status: "Open", created: "Oct 22, 2026", lastReply: "2 hours ago" },
  { id: "TK-1041", customer: "Michael Chen", initials: "MC", subject: "Return request for Linen Blazer (wrong size)", priority: "Medium", status: "In Progress", created: "Oct 21, 2026", lastReply: "5 hours ago" },
  { id: "TK-1040", customer: "Emma Wilson", initials: "EW", subject: "Discount code not applying at checkout", priority: "Low", status: "Resolved", created: "Oct 20, 2026", lastReply: "1 day ago" },
  { id: "TK-1039", customer: "James Brown", initials: "JB", subject: "Delayed shipping — order placed 2 weeks ago", priority: "High", status: "In Progress", created: "Oct 19, 2026", lastReply: "8 hours ago" },
  { id: "TK-1038", customer: "Olivia Davis", initials: "OD", subject: "Account password reset not working", priority: "Medium", status: "Resolved", created: "Oct 18, 2026", lastReply: "2 days ago" },
  { id: "TK-1037", customer: "Sophia Anderson", initials: "SA", subject: "Wrong item delivered — ordered black, got navy", priority: "High", status: "Open", created: "Oct 17, 2026", lastReply: "3 days ago" },
]

const priorityConfig = {
  High: "bg-red-50 text-red-600",
  Medium: "bg-amber-50 text-amber-700",
  Low: "bg-emerald-50 text-emerald-700",
}

const statusConfig = {
  Open: { className: "bg-blue-50 text-blue-700", icon: AlertCircle },
  "In Progress": { className: "bg-amber-50 text-amber-700", icon: Clock },
  Resolved: { className: "bg-emerald-50 text-emerald-700", icon: CheckCircle },
}

export default function CustomerSupportPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Customer Support"
        description="Manage customer support tickets and inquiries"
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Customers", href: "/admin/customers" }, { label: "Support" }]}
        actions={
          <button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors" style={{ fontSize: "13px" }}>
            <Plus className="w-4 h-4" strokeWidth={1.5} /> New Ticket
          </button>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Tickets", value: "142", sub: "all time", color: "#501D2A" },
          { label: "Open", value: "18", sub: "needs attention", color: "#2563EB" },
          { label: "In Progress", value: "24", sub: "being handled", color: "#D97706" },
          { label: "Resolved", value: "100", sub: "closed tickets", color: "#2D6B4F" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-border/50 p-4">
            <div className="flex items-center justify-between mb-1">
              <p className="text-muted-foreground" style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.07em" }}>{s.label}</p>
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: s.color }} />
            </div>
            <p className="font-semibold text-foreground" style={{ fontSize: "22px" }}>{s.value}</p>
            <p className="text-muted-foreground" style={{ fontSize: "11px" }}>{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Tickets Table */}
      <div className="bg-white rounded-xl border border-border/50">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 px-5 py-4" style={{ borderBottom: "1px solid #F0EDEF" }}>
          <div className="relative flex-1 w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
            <input
              type="text"
              placeholder="Search tickets..."
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-border/60 bg-[#F8F7F5] placeholder:text-muted-foreground focus:outline-none focus:border-primary/40"
              style={{ fontSize: "13px" }}
            />
          </div>
          <div className="flex items-center gap-2">
            {["All", "Open", "In Progress", "Resolved"].map((f) => (
              <button key={f} className={`px-3 py-1.5 rounded-lg transition-colors ${f === "All" ? "bg-primary text-primary-foreground" : "border border-border/60 text-muted-foreground hover:bg-[#F8F7F5]"}`} style={{ fontSize: "12px" }}>
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid #F0EDEF" }}>
                {["Ticket ID", "Customer", "Subject", "Priority", "Status", "Created", "Last Reply", "Actions"].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-muted-foreground font-medium" style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.07em" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tickets.map((t, i) => {
                const statusCfg = statusConfig[t.status]
                const StatusIcon = statusCfg.icon
                return (
                  <tr
                    key={t.id}
                    className="hover:bg-[#F8F7F5] transition-colors"
                    style={{ borderBottom: i < tickets.length - 1 ? "1px solid #F0EDEF" : "none" }}
                  >
                    <td className="px-5 py-3">
                      <span className="font-mono font-medium text-foreground" style={{ fontSize: "13px" }}>{t.id}</span>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full flex items-center justify-center text-white font-semibold shrink-0" style={{ backgroundColor: "#501D2A", fontSize: "10px" }}>
                          {t.initials}
                        </div>
                        <span className="font-medium text-foreground" style={{ fontSize: "13px" }}>{t.customer}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3 max-w-xs">
                      <p className="text-foreground truncate" style={{ fontSize: "13px" }}>{t.subject}</p>
                    </td>
                    <td className="px-5 py-3">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 font-medium ${priorityConfig[t.priority]}`} style={{ fontSize: "11px" }}>
                        {t.priority}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 font-medium ${statusCfg.className}`} style={{ fontSize: "11px" }}>
                        <StatusIcon className="w-3 h-3" strokeWidth={2} />
                        {t.status}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-muted-foreground" style={{ fontSize: "13px" }}>{t.created}</td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-muted-foreground" strokeWidth={1.5} />
                        <span className="text-muted-foreground" style={{ fontSize: "12px" }}>{t.lastReply}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-1">
                        <button className="p-1.5 rounded-lg hover:bg-[#F0EDEF] transition-colors text-muted-foreground hover:text-foreground">
                          <Eye className="w-3.5 h-3.5" strokeWidth={1.5} />
                        </button>
                        <button className="p-1.5 rounded-lg hover:bg-[#F0EDEF] transition-colors text-muted-foreground hover:text-foreground">
                          <MessageSquare className="w-3.5 h-3.5" strokeWidth={1.5} />
                        </button>
                        <button className="p-1.5 rounded-lg hover:bg-[#F0EDEF] transition-colors text-muted-foreground hover:text-foreground">
                          <MoreHorizontal className="w-3.5 h-3.5" strokeWidth={1.5} />
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
