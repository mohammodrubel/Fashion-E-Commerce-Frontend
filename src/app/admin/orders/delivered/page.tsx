import Link from "next/link"
import { CheckCircle, RotateCcw } from "lucide-react"
import { PageHeader } from "@/components/admin/page-header"

const orders = [
  { id: "#5001", customer: "Sarah Johnson",   avatar: "S", date: "Oct 14, 2026", items: 3, total: "$124.00", deliveredAt: "Oct 18, 2026" },
  { id: "#5029", customer: "Oliver Wilson",   avatar: "O", date: "Oct 13, 2026", items: 1, total: "$59.00",  deliveredAt: "Oct 17, 2026" },
  { id: "#5030", customer: "Harper Moore",    avatar: "H", date: "Oct 12, 2026", items: 4, total: "$310.00", deliveredAt: "Oct 16, 2026" },
  { id: "#5031", customer: "Evelyn Jackson",  avatar: "E", date: "Oct 11, 2026", items: 2, total: "$96.50",  deliveredAt: "Oct 15, 2026" },
  { id: "#5032", customer: "Mason Martin",    avatar: "M", date: "Oct 10, 2026", items: 2, total: "$78.00",  deliveredAt: "Oct 14, 2026" },
  { id: "#5033", customer: "Luna Garcia",     avatar: "L", date: "Oct 9,  2026", items: 5, total: "$445.00", deliveredAt: "Oct 13, 2026" },
  { id: "#5034", customer: "Elijah Rodriguez",avatar: "E", date: "Oct 8,  2026", items: 1, total: "$33.00",  deliveredAt: "Oct 12, 2026" },
  { id: "#5035", customer: "Penelope Hernandez", avatar: "P", date: "Oct 7, 2026", items: 3, total: "$188.00", deliveredAt: "Oct 11, 2026" },
]

export default function DeliveredOrdersPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Delivered Orders"
        description="Orders successfully delivered to customers"
        breadcrumbs={[
          { label: "Admin",  href: "/admin" },
          { label: "Orders", href: "/admin/orders" },
          { label: "Delivered" },
        ]}
        actions={
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-medium bg-emerald-50 text-emerald-700"
            style={{ fontSize: "12px" }}
          >
            <CheckCircle className="w-3.5 h-3.5" strokeWidth={2} />
            {orders.length} Delivered
          </span>
        }
      />

      <div className="bg-white rounded-xl border border-border/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--accent)" }}>
                {["Order ID", "Customer", "Order Date", "Items", "Total", "Delivered On", "Actions"].map((h) => (
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
                    <span
                      className="inline-flex items-center gap-1 text-emerald-700"
                      style={{ fontSize: "13px" }}
                    >
                      <CheckCircle className="w-3.5 h-3.5" strokeWidth={2} />
                      {order.deliveredAt}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <Link
                      href={`/admin/orders/returned?ref=${order.id}`}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border/60 text-muted-foreground hover:text-foreground hover:bg-[var(--muted)] transition-colors font-medium whitespace-nowrap"
                      style={{ fontSize: "12px" }}
                    >
                      <RotateCcw className="w-3.5 h-3.5" strokeWidth={1.5} />
                      Request Return
                    </Link>
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
