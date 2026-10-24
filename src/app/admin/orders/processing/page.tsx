import { RefreshCcw, PackageCheck } from "lucide-react"
import { PageHeader } from "@/components/admin/page-header"

const orders = [
  { id: "#5003", customer: "Emma Wilson",    avatar: "E", date: "Oct 23, 2026", items: 5, total: "$312.00", payment: "Credit Card", startedAt: "Oct 23, 9:14 AM" },
  { id: "#5014", customer: "Lucas Hall",     avatar: "L", date: "Oct 23, 2026", items: 2, total: "$134.50", payment: "PayPal",      startedAt: "Oct 23, 11:02 AM" },
  { id: "#5015", customer: "Isabella Young", avatar: "I", date: "Oct 24, 2026", items: 3, total: "$221.00", payment: "Stripe",      startedAt: "Oct 24, 8:45 AM" },
]

export default function ProcessingOrdersPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Processing Orders"
        description="Orders currently being prepared"
        breadcrumbs={[
          { label: "Admin",  href: "/admin" },
          { label: "Orders", href: "/admin/orders" },
          { label: "Processing" },
        ]}
        actions={
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-medium bg-amber-50 text-amber-700"
            style={{ fontSize: "12px" }}
          >
            <RefreshCcw className="w-3.5 h-3.5" strokeWidth={2} />
            {orders.length} Processing
          </span>
        }
      />

      <div className="bg-white rounded-xl border border-border/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid #F0EDEF" }}>
                {["Order ID", "Customer", "Date", "Items", "Total", "Payment", "Processing Since", "Actions"].map((h) => (
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
                    <span className="text-muted-foreground whitespace-nowrap" style={{ fontSize: "13px" }}>{order.startedAt}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <button
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-white font-medium transition-opacity hover:opacity-90 whitespace-nowrap"
                      style={{ backgroundColor: "#501D2A", fontSize: "12px" }}
                    >
                      <PackageCheck className="w-3.5 h-3.5" strokeWidth={2} />
                      Mark Ready
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
