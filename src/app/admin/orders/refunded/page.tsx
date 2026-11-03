import { DollarSign } from "lucide-react"
import { PageHeader } from "@/components/admin/page-header"

const orders = [
  {
    id: "#5038",
    customer: "Ryan Walker",
    avatar: "R",
    orderDate: "Oct 8, 2026",
    items: 1,
    orderTotal: "$65.00",
    refundAmount: "$65.00",
    refundDate: "Oct 22, 2026",
    method: "Original Payment",
  },
  {
    id: "#5044",
    customer: "Hannah Price",
    avatar: "H",
    orderDate: "Oct 5, 2026",
    items: 2,
    orderTotal: "$130.00",
    refundAmount: "$130.00",
    refundDate: "Oct 19, 2026",
    method: "Store Credit",
  },
  {
    id: "#5045",
    customer: "Nathan Evans",
    avatar: "N",
    orderDate: "Oct 3, 2026",
    items: 1,
    orderTotal: "$48.00",
    refundAmount: "$40.00",
    refundDate: "Oct 16, 2026",
    method: "Original Payment",
  },
]

export default function RefundedOrdersPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Refunded Orders"
        description="Orders with completed refunds"
        breadcrumbs={[
          { label: "Admin",  href: "/admin" },
          { label: "Orders", href: "/admin/orders" },
          { label: "Refunded" },
        ]}
        actions={
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-medium bg-teal-50 text-teal-700"
            style={{ fontSize: "12px" }}
          >
            <DollarSign className="w-3.5 h-3.5" strokeWidth={2} />
            {orders.length} Refunded
          </span>
        }
      />

      <div className="bg-white rounded-xl border border-border/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--accent)" }}>
                {["Order ID", "Customer", "Order Date", "Items", "Order Total", "Refund Amount", "Refund Date", "Method"].map((h) => (
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
                    <span className="text-muted-foreground whitespace-nowrap" style={{ fontSize: "13px" }}>{order.orderDate}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-muted-foreground" style={{ fontSize: "13px" }}>{order.items}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="font-medium text-foreground" style={{ fontSize: "13px" }}>{order.orderTotal}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span
                      className="font-semibold inline-flex items-center gap-1 text-teal-700"
                      style={{ fontSize: "13px" }}
                    >
                      <DollarSign className="w-3.5 h-3.5" strokeWidth={2} />
                      {order.refundAmount.replace("$", "")}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-muted-foreground whitespace-nowrap" style={{ fontSize: "13px" }}>{order.refundDate}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span
                      className="inline-flex items-center rounded-full px-2.5 py-0.5 font-medium bg-teal-50 text-teal-700"
                      style={{ fontSize: "11px" }}
                    >
                      {order.method}
                    </span>
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
