import { PageHeader } from "@/components/admin/page-header"
import { ShoppingCart, TrendingUp, DollarSign, Mail, Eye } from "lucide-react"

type CartStatus = "Recovered" | "Pending" | "Expired"

interface AbandonedCart {
  customer: string
  email: string
  cartValue: string
  items: number
  abandoned: string
  emailsSent: number
  lastEmail: string
  status: CartStatus
}

const carts: AbandonedCart[] = [
  { customer: "Emma Langdon", email: "e.langdon@gmail.com", cartValue: "$184.00", items: 3, abandoned: "Oct 24, 2024 14:32", emailsSent: 2, lastEmail: "1 hr ago", status: "Pending" },
  { customer: "James Okafor", email: "j.okafor@email.com", cartValue: "$92.00", items: 2, abandoned: "Oct 24, 2024 11:15", emailsSent: 1, lastEmail: "3 hrs ago", status: "Pending" },
  { customer: "Yuki Tanaka", email: "yuki.t@gmail.com", cartValue: "$248.00", items: 4, abandoned: "Oct 23, 2024 19:40", emailsSent: 3, lastEmail: "18 hrs ago", status: "Recovered" },
  { customer: "Nina Reeves", email: "nina.r@email.com", cartValue: "$67.00", items: 1, abandoned: "Oct 23, 2024 09:12", emailsSent: 3, lastEmail: "1 day ago", status: "Recovered" },
  { customer: "Daniel Ferreira", email: "d.ferreira@work.com", cartValue: "$312.00", items: 5, abandoned: "Oct 22, 2024 16:54", emailsSent: 3, lastEmail: "2 days ago", status: "Expired" },
  { customer: "Sophie Laurent", email: "sophie.l@gmail.com", cartValue: "$138.00", items: 2, abandoned: "Oct 22, 2024 12:30", emailsSent: 2, lastEmail: "2 days ago", status: "Pending" },
]

const statusConfig: Record<CartStatus, { bg: string; color: string }> = {
  Recovered: { bg: "#DCFCE7", color: "#166534" },
  Pending: { bg: "#FEF9C3", color: "#854D0E" },
  Expired: { bg: "#F3F4F6", color: "#6B7280" },
}

export default function AbandonedCartPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Abandoned Cart Recovery"
        description="Recover lost sales with automated email sequences"
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Marketing", href: "/admin/marketing" }, { label: "Abandoned Cart" }]}
        actions={
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border/60 bg-white text-foreground hover:bg-[var(--muted)] transition-colors"
            style={{ fontSize: "13px" }}
          >
            Configure Emails
          </button>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Abandoned Carts", value: "124", sub: "this month", icon: ShoppingCart, bg: "#FEF9C3", color: "#854D0E" },
          { label: "Recovered", value: "38", sub: "30.6% recovery rate", icon: TrendingUp, bg: "#F0FDF4", color: "#166534" },
          { label: "Revenue Recovered", value: "$2,840", sub: "this month", icon: DollarSign, bg: "#FAF0F2", color: "var(--primary)" },
          { label: "Emails Sent", value: "312", sub: "avg 2.5 per cart", icon: Mail, bg: "#EFF6FF", color: "#1D4ED8" },
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

      {/* Email Sequence Config */}
      <div className="bg-white rounded-xl border border-border/50 p-5">
        <p className="font-medium text-foreground mb-4" style={{ fontSize: "14px" }}>Recovery Email Sequence</p>
        <div className="flex items-center gap-3 overflow-x-auto pb-2">
          {[
            { step: 1, delay: "1 hour after", subject: "You left something behind!", openRate: "48.2%", color: "#EFF6FF", textColor: "#1D4ED8" },
            { step: 2, delay: "24 hours after", subject: "Still thinking it over?", openRate: "31.4%", color: "#FDF4FF", textColor: "#7E22CE" },
            { step: 3, delay: "72 hours after", subject: "Last chance — 10% off your cart", openRate: "22.8%", color: "#FAF0F2", textColor: "var(--primary)" },
          ].map((step, i) => (
            <div key={step.step} className="flex items-center gap-3 shrink-0">
              <div className="rounded-xl border border-border/50 p-4 w-52" style={{ backgroundColor: step.color }}>
                <div className="flex items-center justify-between mb-2">
                  <span
                    className="w-6 h-6 rounded-full flex items-center justify-center text-white font-semibold"
                    style={{ fontSize: "11px", backgroundColor: step.textColor }}
                  >
                    {step.step}
                  </span>
                  <span className="text-muted-foreground" style={{ fontSize: "10px" }}>Open: {step.openRate}</span>
                </div>
                <p className="font-medium text-foreground" style={{ fontSize: "12px" }}>{step.subject}</p>
                <p className="text-muted-foreground mt-1" style={{ fontSize: "10px" }}>Send {step.delay}</p>
              </div>
              {i < 2 && <div className="w-6 h-0.5 shrink-0" style={{ backgroundColor: "#E5E7EB" }} />}
            </div>
          ))}
        </div>
      </div>

      {/* Abandoned Carts Table */}
      <div className="bg-white rounded-xl border border-border/50">
        <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid var(--accent)" }}>
          <p className="font-medium text-foreground" style={{ fontSize: "14px" }}>Recent Abandoned Carts</p>
          <span className="text-muted-foreground" style={{ fontSize: "12px" }}>6 active carts</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--accent)" }}>
                {["Customer", "Cart Value", "Abandoned", "Emails Sent", "Status", "Actions"].map((h) => (
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
              {carts.map((cart, i) => {
                const cfg = statusConfig[cart.status]
                return (
                  <tr
                    key={cart.email}
                    className="hover:bg-[var(--muted)] transition-colors"
                    style={{ borderBottom: i < carts.length - 1 ? "1px solid var(--accent)" : "none" }}
                  >
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold shrink-0"
                          style={{ backgroundColor: "var(--primary)", fontSize: "11px" }}
                        >
                          {cart.customer.split(" ").map((n) => n[0]).join("")}
                        </div>
                        <div>
                          <p className="font-medium text-foreground" style={{ fontSize: "13px" }}>{cart.customer}</p>
                          <p className="text-muted-foreground" style={{ fontSize: "11px" }}>{cart.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <p className="font-semibold text-foreground" style={{ fontSize: "14px" }}>{cart.cartValue}</p>
                      <p className="text-muted-foreground" style={{ fontSize: "11px" }}>{cart.items} items</p>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-muted-foreground" style={{ fontSize: "12px" }}>{cart.abandoned}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-1.5">
                        <div className="flex gap-0.5">
                          {[1, 2, 3].map((n) => (
                            <div
                              key={n}
                              className="w-5 h-5 rounded flex items-center justify-center"
                              style={{ backgroundColor: n <= cart.emailsSent ? "var(--primary)" : "var(--accent)" }}
                            >
                              <Mail className="w-2.5 h-2.5" style={{ color: n <= cart.emailsSent ? "white" : "#D1D5DB" }} strokeWidth={1.5} />
                            </div>
                          ))}
                        </div>
                        <span className="text-muted-foreground" style={{ fontSize: "11px" }}>{cart.lastEmail}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span
                        className="inline-flex items-center rounded-full px-2.5 py-0.5 font-medium"
                        style={{ fontSize: "11px", backgroundColor: cfg.bg, color: cfg.color }}
                      >
                        {cart.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-1">
                        <button className="p-1.5 rounded-lg hover:bg-[var(--accent)] transition-colors text-muted-foreground hover:text-foreground">
                          <Eye className="w-3.5 h-3.5" strokeWidth={1.5} />
                        </button>
                        {cart.status === "Pending" && (
                          <button
                            className="flex items-center gap-1 px-2 py-1.5 rounded-lg text-white transition-opacity hover:opacity-90"
                            style={{ backgroundColor: "var(--primary)", fontSize: "11px" }}
                          >
                            <Mail className="w-3 h-3" strokeWidth={1.5} />
                            Send Email
                          </button>
                        )}
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
