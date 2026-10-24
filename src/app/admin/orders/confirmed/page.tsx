import { CheckCircle, Truck } from "lucide-react"
import { PageHeader } from "@/components/admin/page-header"

const orders = [
  { id: "#5005", customer: "Olivia Davis",   avatar: "O", date: "Oct 22, 2026", items: 4, total: "$198.00", payment: "Credit Card", confirmedAt: "Oct 22, 3:10 PM" },
  { id: "#5016", customer: "Benjamin Lee",   avatar: "B", date: "Oct 22, 2026", items: 1, total: "$55.00",  payment: "PayPal",      confirmedAt: "Oct 22, 4:30 PM" },
  { id: "#5017", customer: "Charlotte King", avatar: "C", date: "Oct 23, 2026", items: 3, total: "$167.50", payment: "Stripe",      confirmedAt: "Oct 23, 9:00 AM" },
  { id: "#5018", customer: "Henry Scott",    avatar: "H", date: "Oct 23, 2026", items: 2, total: "$110.00", payment: "Credit Card", confirmedAt: "Oct 23, 10:45 AM" },
  { id: "#5019", customer: "Amelia Turner",  avatar: "A", date: "Oct 24, 2026", items: 5, total: "$284.00", payment: "Stripe",      confirmedAt: "Oct 24, 7:55 AM" },
]

export default function ConfirmedOrdersPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Confirmed Orders"
        description="Orders confirmed and awaiting shipment preparation"
        breadcrumbs={[
          { label: "Admin",  href: "/admin" },
          { label: "Orders", href: "/admin/orders" },
          { label: "Confirmed" },
        ]}
        actions={
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-medium bg-blue-50 text-blue-700"
            style={{ fontSize: "12px" }}
          >
            <CheckCircle className="w-3.5 h-3.5" strokeWidth={2} />
            {orders.length} Confirmed
          </span>
        }
      />

      <div className="bg-white rounded-xl border border-border/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid #F0EDEF" }}>
                {["Order ID", "Customer", "Date", "Items", "Total", "Payment", "Confirmed At", "Actions"].map((h) => (
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
                  className="hover:bg-[#F8F7F5] transition-colors"
                  style={{ borderBottom: i < orders.length - 1 ? "1px solid #F0EDEF" : "none" }}
                >
                  <td className="px-5 py-3.5">
                    <span className="font-semibold text-foreground" style={{ fontSize: "13px" }}>{order.id}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center text-white shrink-0"
                        style={{ backgroundColor: "#501D2A", fontSize: "11px", fontWeight: 600 }}
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
                    <span className="text-muted-foreground whitespace-nowrap" style={{ fontSize: "13px" }}>{order.confirmedAt}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <button
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-white font-medium transition-opacity hover:opacity-90 whitespace-nowrap"
                      style={{ backgroundColor: "#501D2A", fontSize: "12px" }}
                    >
                      <Truck className="w-3.5 h-3.5" strokeWidth={2} />
                      Mark Ready to Ship
                    </button>
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
