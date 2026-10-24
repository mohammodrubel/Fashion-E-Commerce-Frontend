import { DollarSign, CheckCircle, XCircle } from "lucide-react"
import { PageHeader } from "@/components/admin/page-header"

const requests = [
  {
    id: "RFQ-001",
    orderId: "#5009",
    customer: "Ava Thomas",
    avatar: "A",
    date: "Oct 21, 2026",
    amount: "$88.00",
    reason: "Wrong size received",
    status: "Pending",
  },
  {
    id: "RFQ-002",
    orderId: "#5038",
    customer: "Ryan Walker",
    avatar: "R",
    date: "Oct 20, 2026",
    amount: "$65.00",
    reason: "Item arrived defective",
    status: "Approved",
  },
  {
    id: "RFQ-003",
    orderId: "#5041",
    customer: "Hazel Brooks",
    avatar: "H",
    date: "Oct 19, 2026",
    amount: "$120.00",
    reason: "Never received package",
    status: "Pending",
  },
  {
    id: "RFQ-004",
    orderId: "#5042",
    customer: "Leo Cooper",
    avatar: "L",
    date: "Oct 18, 2026",
    amount: "$37.50",
    reason: "Changed mind",
    status: "Rejected",
  },
  {
    id: "RFQ-005",
    orderId: "#5043",
    customer: "Stella Reed",
    avatar: "S",
    date: "Oct 17, 2026",
    amount: "$205.00",
    reason: "Duplicate order placed",
    status: "Pending",
  },
]

const statusStyles: Record<string, string> = {
  Pending:  "bg-gray-100 text-gray-600",
  Approved: "bg-emerald-50 text-emerald-700",
  Rejected: "bg-red-50 text-red-600",
}

export default function RefundRequestsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Refund Requests"
        description="Customer refund requests awaiting review"
        breadcrumbs={[
          { label: "Admin",  href: "/admin" },
          { label: "Orders", href: "/admin/orders" },
          { label: "Refund Requests" },
        ]}
        actions={
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-medium bg-gray-100 text-gray-600"
            style={{ fontSize: "12px" }}
          >
            <DollarSign className="w-3.5 h-3.5" strokeWidth={2} />
            {requests.filter((r) => r.status === "Pending").length} Pending
          </span>
        }
      />

      <div className="bg-white rounded-xl border border-border/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid #F0EDEF" }}>
                {["Request ID", "Order ID", "Customer", "Date", "Amount", "Reason", "Status", "Actions"].map((h) => (
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
              {requests.map((req, i) => (
                <tr
                  key={req.id}
                  className="hover:bg-[#F8F7F5] transition-colors"
                  style={{ borderBottom: i < requests.length - 1 ? "1px solid #F0EDEF" : "none" }}
                >
                  <td className="px-5 py-3.5">
                    <span className="font-semibold text-foreground" style={{ fontSize: "13px" }}>{req.id}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-muted-foreground" style={{ fontSize: "13px" }}>{req.orderId}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center text-white shrink-0"
                        style={{ backgroundColor: "#501D2A", fontSize: "11px", fontWeight: 600 }}
                      >
                        {req.avatar}
                      </div>
                      <span className="text-foreground whitespace-nowrap" style={{ fontSize: "13px" }}>{req.customer}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-muted-foreground whitespace-nowrap" style={{ fontSize: "13px" }}>{req.date}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="font-medium text-foreground" style={{ fontSize: "13px" }}>{req.amount}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-muted-foreground max-w-[180px] block" style={{ fontSize: "12px" }}>{req.reason}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 font-medium ${statusStyles[req.status]}`}
                      style={{ fontSize: "11px" }}
                    >
                      {req.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    {req.status === "Pending" ? (
                      <div className="flex items-center gap-2">
                        <button
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-white font-medium transition-opacity hover:opacity-90"
                          style={{ backgroundColor: "#501D2A", fontSize: "12px" }}
                        >
                          <CheckCircle className="w-3.5 h-3.5" strokeWidth={2} />
                          Approve
                        </button>
                        <button
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition-colors font-medium"
                          style={{ fontSize: "12px" }}
                        >
                          <XCircle className="w-3.5 h-3.5" strokeWidth={2} />
                          Reject
                        </button>
                      </div>
                    ) : (
                      <span className="text-muted-foreground" style={{ fontSize: "12px" }}>
                        {req.status === "Approved" ? "Approved" : "Rejected"}
                      </span>
                    )}
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
