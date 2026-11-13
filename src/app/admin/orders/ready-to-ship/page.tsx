import { Package, Truck, Printer } from "lucide-react"
import { PageHeader } from "@/components/admin/page-header"

const orders: { id: string; customer: string; avatar: string; date: string; items: number; total: string; readyAt: string; }[] = []

export default function ReadyToShipPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Ready to Ship"
        description="Orders packed and awaiting carrier pickup"
        breadcrumbs={[
          { label: "Admin",  href: "/admin" },
          { label: "Orders", href: "/admin/orders" },
          { label: "Ready to Ship" },
        ]}
        actions={
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-medium bg-purple-50 text-purple-700"
            style={{ fontSize: "12px" }}
          >
            <Package className="w-3.5 h-3.5" strokeWidth={2} />
            {orders.length} Ready
          </span>
        }
      />

      <div className="bg-white rounded-xl border border-border/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--accent)" }}>
                {["Order ID", "Customer", "Date", "Items", "Total", "Ready Since", "Actions"].map((h) => (
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
                    <span className="text-muted-foreground whitespace-nowrap" style={{ fontSize: "13px" }}>{order.readyAt}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <button
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-white font-medium transition-opacity hover:opacity-90 whitespace-nowrap"
                        style={{ backgroundColor: "var(--primary)", fontSize: "12px" }}
                      >
                        <Truck className="w-3.5 h-3.5" strokeWidth={2} />
                        Mark Shipped
                      </button>
                      <button
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border/60 text-muted-foreground hover:text-foreground hover:bg-[var(--muted)] transition-colors font-medium whitespace-nowrap"
                        style={{ fontSize: "12px" }}
                      >
                        <Printer className="w-3.5 h-3.5" strokeWidth={1.5} />
                        Print Label
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
