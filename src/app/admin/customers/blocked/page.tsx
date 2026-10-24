import { PageHeader } from "@/components/admin/page-header"
import { ShieldOff, ShieldCheck, AlertTriangle, Calendar } from "lucide-react"

interface BlockedCustomer {
  id: string
  name: string
  initials: string
  email: string
  reason: string
  blockedBy: string
  blockedDate: string
  ordersBeforeBlock: number
}

const blockedCustomers: BlockedCustomer[] = [
  {
    id: "C089",
    name: "Tyler Reeves",
    initials: "TR",
    email: "t.reeves88@email.com",
    reason: "Multiple fraudulent chargebacks — 4 disputed orders within 60 days",
    blockedBy: "Admin (Jane D.)",
    blockedDate: "Oct 10, 2026",
    ordersBeforeBlock: 7,
  },
  {
    id: "C143",
    name: "Anonymous User",
    initials: "AU",
    email: "burner4421@tempmail.org",
    reason: "Suspected bot account — automated bulk checkout activity detected",
    blockedBy: "System (Auto)",
    blockedDate: "Sep 28, 2026",
    ordersBeforeBlock: 0,
  },
  {
    id: "C217",
    name: "Marcus Webb",
    initials: "MW",
    email: "m.webb@email.com",
    reason: "Abusive communications toward support staff",
    blockedBy: "Admin (Jane D.)",
    blockedDate: "Aug 15, 2026",
    ordersBeforeBlock: 3,
  },
]

export default function BlockedCustomersPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Blocked Customers"
        description="Accounts that have been blocked from accessing the store"
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Customers", href: "/admin/customers" }, { label: "Blocked" }]}
      />

      {/* Warning Banner */}
      <div className="flex items-start gap-3 p-4 rounded-xl border" style={{ backgroundColor: "#FFF7ED", borderColor: "#FED7AA" }}>
        <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" style={{ color: "#C2410C" }} strokeWidth={1.5} />
        <div>
          <p className="font-medium" style={{ fontSize: "13px", color: "#C2410C" }}>Handle blocked accounts with care</p>
          <p className="text-muted-foreground mt-0.5" style={{ fontSize: "12px" }}>
            Unblocking a customer will restore full access to their account and all purchase capabilities. Ensure all disputes are resolved first.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total Blocked", value: "3", sub: "active blocks" },
          { label: "Blocked This Month", value: "1", sub: "October 2026" },
          { label: "Auto-Blocked", value: "1", sub: "by system rules" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-border/50 p-4">
            <p className="text-muted-foreground" style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.07em" }}>{s.label}</p>
            <p className="font-semibold text-foreground mt-1" style={{ fontSize: "22px" }}>{s.value}</p>
            <p className="text-muted-foreground" style={{ fontSize: "11px" }}>{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Blocked Table */}
      <div className="bg-white rounded-xl border border-border/50">
        <div className="flex items-center gap-2 px-5 py-4" style={{ borderBottom: "1px solid #F0EDEF" }}>
          <ShieldOff className="w-4 h-4" style={{ color: "#DC2626" }} strokeWidth={1.5} />
          <h2 className="font-semibold text-foreground" style={{ fontSize: "14px" }}>Blocked Accounts</h2>
        </div>

        <div className="divide-y" style={{ borderColor: "#F0EDEF" }}>
          {blockedCustomers.map((c) => (
            <div key={c.id} className="px-5 py-5 hover:bg-[#F8F7F5] transition-colors">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                {/* Avatar + Info */}
                <div className="flex items-center gap-3 flex-1">
                  <div className="relative shrink-0">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold" style={{ backgroundColor: "#9CA3AF", fontSize: "12px" }}>
                      {c.initials}
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-red-600 flex items-center justify-center">
                      <ShieldOff className="w-3 h-3 text-white" strokeWidth={2} />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-foreground" style={{ fontSize: "14px" }}>{c.name}</p>
                      <span className="inline-flex items-center rounded-full px-2 py-0.5 bg-red-50 text-red-600 font-medium" style={{ fontSize: "10px" }}>Blocked</span>
                    </div>
                    <p className="text-muted-foreground" style={{ fontSize: "12px" }}>{c.email} · ID: {c.id}</p>
                  </div>
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground mb-1" style={{ fontSize: "12px" }}>Block Reason</p>
                  <p className="text-muted-foreground" style={{ fontSize: "12px" }}>{c.reason}</p>
                </div>

                {/* Meta */}
                <div className="flex flex-col gap-1.5 shrink-0 sm:text-right">
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Calendar className="w-3 h-3" strokeWidth={1.5} />
                    <span style={{ fontSize: "12px" }}>{c.blockedDate}</span>
                  </div>
                  <p className="text-muted-foreground" style={{ fontSize: "11px" }}>By: {c.blockedBy}</p>
                  <p className="text-muted-foreground" style={{ fontSize: "11px" }}>{c.ordersBeforeBlock} orders before block</p>
                </div>

                {/* Unblock Button */}
                <div className="shrink-0">
                  <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-emerald-200 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 transition-colors" style={{ fontSize: "12px" }}>
                    <ShieldCheck className="w-3.5 h-3.5" strokeWidth={1.5} />
                    Unblock
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
