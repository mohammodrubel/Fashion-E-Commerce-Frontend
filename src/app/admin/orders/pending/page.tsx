import { Clock, CheckCircle, XCircle } from "lucide-react"
import { PageHeader } from "@/components/admin/page-header"

const orders = [
  { id: "#5004", customer: "James Brown",    avatar: "J", date: "Oct 23, 2026", items: 2, total: "$67.50",  payment: "Stripe" },
  { id: "#5011", customer: "Chloe Harris",   avatar: "C", date: "Oct 23, 2026", items: 1, total: "$42.00",  payment: "PayPal" },
  { id: "#5012", customer: "Aiden Walker",   avatar: "A", date: "Oct 24, 2026", items: 4, total: "$189.00", payment: "Credit Card" },
  { id: "#5013", customer: "Mia Robinson",   avatar: "M", date: "Oct 24, 2026", items: 2, total: "$98.50",  payment: "Stripe" },
]

export default function PendingOrdersPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Pending Orders"
        description="Orders awaiting confirmation"
        breadcrumbs={[
          { label: "Admin",  href: "/admin" },
          { label: "Orders", href: "/admin/orders" },
          { label: "Pending" },
        ]}
        actions={
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-medium bg-gray-100 text-gray-600"
            style={{ fontSize: "12px" }}
          >
            <Clock className="w-3.5 h-3.5" strokeWidth={2} />
            {orders.length} Pending
          </span>
        }
      />

      <div className="bg-white rounded-xl border border-border/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--accent)" }}>
                {["Order ID", "Customer", "Date", "Items", "Total", "Payment", "Actions"].map((h) => (
                  <th
                    key={h}
                    className="text-left px-5 py-3.5 text-muted-foreground font-medium whitespace-nowrap"
                    style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.07em" }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {orders.map((order, i) => (
                <tr
                  key={order.id}
                  className="hover:bg-[var(--muted)] transition-colors"
                  style={{ borderBottom: i < orders.length - 1 ? "1px solid var(--accent)" : "none" }}
                >
                  <td className="px-5 py-3.5">
                    <span className="font-semibold text-foreground" style={{ fontSize: "13px" }}>{order.id}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center text-white shrink-0"
                        style={{ backgroundColor: "var(--primary)", fontSize: "11px", fontWeight: 600 }}
                      >
                        {order.avatar}
                      </div>
                      <span className="text-foreground whitespace-nowrap" style={{ fontSize: "13px" }}>{order.customer}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-muted-foreground whitespace-nowrap" style={{ fontSize: "13px" }}>{order.date}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-muted-foreground" style={{ fontSize: "13px" }}>{order.items}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="font-medium text-foreground" style={{ fontSize: "13px" }}>{order.total}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-muted-foreground" style={{ fontSize: "13px" }}>{order.payment}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <button
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-white font-medium transition-opacity hover:opacity-90"
                        style={{ backgroundColor: "var(--primary)", fontSize: "12px" }}
                      >
                        <CheckCircle className="w-3.5 h-3.5" strokeWidth={2} />
                        Confirm
                      </button>
                      <button
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition-colors font-medium"
                        style={{ fontSize: "12px" }}
                      >
                        <XCircle className="w-3.5 h-3.5" strokeWidth={2} />
                        Cancel
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
