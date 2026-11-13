import { Truck, CheckCircle } from "lucide-react"
import { PageHeader } from "@/components/admin/page-header"

const orders: { id: string; customer: string; avatar: string; date: string; items: number; total: string; tracking: string; carrier: string; shippedAt: string; }[] = []

export default function ShippedOrdersPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Shipped Orders"
        description="Orders dispatched and in transit"
        breadcrumbs={[
          { label: "Admin",  href: "/admin" },
          { label: "Orders", href: "/admin/orders" },
          { label: "Shipped" },
        ]}
        actions={
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-medium bg-indigo-50 text-indigo-700"
            style={{ fontSize: "12px" }}
          >
            <Truck className="w-3.5 h-3.5" strokeWidth={2} />
            {orders.length} Shipped
          </span>
        }
      />

      <div className="bg-white rounded-xl border border-border/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--accent)" }}>
                {["Order ID", "Customer", "Date", "Items", "Total", "Carrier", "Tracking Number", "Shipped At", "Actions"].map((h) => (
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
                    <span className="text-muted-foreground" style={{ fontSize: "13px" }}>{order.carrier}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span
                      className="font-mono text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded"
                      style={{ fontSize: "11px" }}
                    >
                      {order.tracking}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-muted-foreground whitespace-nowrap" style={{ fontSize: "13px" }}>{order.shippedAt}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <button
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-white font-medium transition-opacity hover:opacity-90 whitespace-nowrap"
                      style={{ backgroundColor: "var(--primary)", fontSize: "12px" }}
                    >
                      <CheckCircle className="w-3.5 h-3.5" strokeWidth={2} />
                      Mark Delivered
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
