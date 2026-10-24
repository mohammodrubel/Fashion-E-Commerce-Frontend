import { RotateCcw, DollarSign } from "lucide-react"
import { PageHeader } from "@/components/admin/page-header"

const orders = [
  {
    id: "#5009",
    customer: "Ava Thomas",
    avatar: "A",
    date: "Oct 10, 2026",
    items: 2,
    total: "$88.00",
    returnReason: "Wrong size received",
    condition: "Good",
    returnedAt: "Oct 20, 2026",
  },
  {
    id: "#5038",
    customer: "Ryan Walker",
    avatar: "R",
    date: "Oct 8, 2026",
    items: 1,
    total: "$65.00",
    returnReason: "Item defective",
    condition: "Damaged",
    returnedAt: "Oct 18, 2026",
  },
  {
    id: "#5039",
    customer: "Nora Green",
    avatar: "N",
    date: "Oct 5, 2026",
    items: 3,
    total: "$199.50",
    returnReason: "Didn't match description",
    condition: "Good",
    returnedAt: "Oct 15, 2026",
  },
  {
    id: "#5040",
    customer: "Caleb Baker",
    avatar: "C",
    date: "Oct 3, 2026",
    items: 1,
    total: "$49.00",
    returnReason: "Changed mind",
    condition: "Excellent",
    returnedAt: "Oct 13, 2026",
  },
]

const conditionColors: Record<string, string> = {
  Excellent: "bg-emerald-50 text-emerald-700",
  Good:      "bg-blue-50 text-blue-700",
  Damaged:   "bg-red-50 text-red-600",
}

export default function ReturnedOrdersPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Returned Orders"
        description="Orders returned by customers"
        breadcrumbs={[
          { label: "Admin",  href: "/admin" },
          { label: "Orders", href: "/admin/orders" },
          { label: "Returned" },
        ]}
        actions={
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-medium bg-orange-50 text-orange-700"
            style={{ fontSize: "12px" }}
          >
            <RotateCcw className="w-3.5 h-3.5" strokeWidth={2} />
            {orders.length} Returns
          </span>
        }
      />

      <div className="bg-white rounded-xl border border-border/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid #F0EDEF" }}>
                {["Order ID", "Customer", "Date", "Items", "Total", "Return Reason", "Condition", "Returned On", "Actions"].map((h) => (
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
                    <span className="text-muted-foreground max-w-[180px] block" style={{ fontSize: "12px" }}>{order.returnReason}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 font-medium ${conditionColors[order.condition] ?? "bg-gray-100 text-gray-600"}`}
                      style={{ fontSize: "11px" }}
                    >
                      {order.condition}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-muted-foreground whitespace-nowrap" style={{ fontSize: "13px" }}>{order.returnedAt}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <button
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-white font-medium transition-opacity hover:opacity-90 whitespace-nowrap"
                      style={{ backgroundColor: "#501D2A", fontSize: "12px" }}
                    >
                      <DollarSign className="w-3.5 h-3.5" strokeWidth={2} />
                      Process Refund
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
