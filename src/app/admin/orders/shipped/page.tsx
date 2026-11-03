import { Truck, CheckCircle } from "lucide-react"
import { PageHeader } from "@/components/admin/page-header"

const orders = [
  { id: "#5002", customer: "Michael Chen",  avatar: "M", date: "Oct 24, 2026", items: 1, total: "$89.00",  tracking: "1Z999AA10123456784", carrier: "UPS",    shippedAt: "Oct 24, 10:00 AM" },
  { id: "#5024", customer: "Ella Gonzalez", avatar: "E", date: "Oct 22, 2026", items: 3, total: "$178.00", tracking: "9400111899223481390",  carrier: "USPS",   shippedAt: "Oct 23, 9:00 AM" },
  { id: "#5025", customer: "William Clark", avatar: "W", date: "Oct 21, 2026", items: 2, total: "$112.00", tracking: "7489134889998765432", carrier: "FedEx",  shippedAt: "Oct 22, 2:30 PM" },
  { id: "#5026", customer: "Aria Lewis",    avatar: "A", date: "Oct 20, 2026", items: 4, total: "$265.00", tracking: "1Z999AA10123456000", carrier: "UPS",    shippedAt: "Oct 21, 11:00 AM" },
  { id: "#5027", customer: "Sebastian Lee", avatar: "S", date: "Oct 19, 2026", items: 1, total: "$34.00",  tracking: "9400111899223481999", carrier: "USPS",   shippedAt: "Oct 20, 8:45 AM" },
  { id: "#5028", customer: "Scarlett Adams",avatar: "S", date: "Oct 18, 2026", items: 2, total: "$145.50", tracking: "7489134889998111111", carrier: "FedEx",  shippedAt: "Oct 19, 3:15 PM" },
]

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
