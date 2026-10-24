import { XCircle, RotateCcw } from "lucide-react"
import { PageHeader } from "@/components/admin/page-header"

const orders = [
  {
    id: "#5007",
    customer: "Sophia Taylor",
    avatar: "S",
    date: "Oct 21, 2026",
    items: 1,
    total: "$39.00",
    payment: "Credit Card",
    cancelReason: "Customer requested cancellation",
    cancelledAt: "Oct 21, 5:00 PM",
  },
  {
    id: "#5036",
    customer: "Daniel Lewis",
    avatar: "D",
    date: "Oct 20, 2026",
    items: 2,
    total: "$87.00",
    payment: "PayPal",
    cancelReason: "Item out of stock",
    cancelledAt: "Oct 20, 2:30 PM",
  },
  {
    id: "#5037",
    customer: "Victoria Hall",
    avatar: "V",
    date: "Oct 19, 2026",
    items: 3,
    total: "$152.50",
    payment: "Stripe",
    cancelReason: "Payment declined after hold",
    cancelledAt: "Oct 19, 11:15 AM",
  },
]

export default function CancelledOrdersPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Cancelled Orders"
        description="Orders that have been cancelled"
        breadcrumbs={[
          { label: "Admin",  href: "/admin" },
          { label: "Orders", href: "/admin/orders" },
          { label: "Cancelled" },
        ]}
        actions={
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-medium bg-red-50 text-red-600"
            style={{ fontSize: "12px" }}
          >
            <XCircle className="w-3.5 h-3.5" strokeWidth={2} />
            {orders.length} Cancelled
          </span>
        }
      />

      <div className="bg-white rounded-xl border border-border/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid #F0EDEF" }}>
                {["Order ID", "Customer", "Date", "Items", "Total", "Cancel Reason", "Cancelled At", "Actions"].map((h) => (
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
                    <div className="flex items-start gap-1.5 max-w-[200px]">
                      <XCircle className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" strokeWidth={1.5} />
                      <span className="text-red-600" style={{ fontSize: "12px" }}>{order.cancelReason}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-muted-foreground whitespace-nowrap" style={{ fontSize: "13px" }}>{order.cancelledAt}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <button
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-white font-medium transition-opacity hover:opacity-90 whitespace-nowrap"
                      style={{ backgroundColor: "#501D2A", fontSize: "12px" }}
                    >
                      <RotateCcw className="w-3.5 h-3.5" strokeWidth={2} />
                      Restore
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
