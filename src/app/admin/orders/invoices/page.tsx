import { FileText, Download } from "lucide-react"
import { PageHeader } from "@/components/admin/page-header"

const invoices = [
  { id: "INV-2026-001", orderId: "#5001", customer: "Sarah Johnson",    avatar: "S", date: "Oct 18, 2026", amount: "$124.00", status: "Paid" },
  { id: "INV-2026-002", orderId: "#5002", customer: "Michael Chen",     avatar: "M", date: "Oct 24, 2026", amount: "$89.00",  status: "Paid" },
  { id: "INV-2026-003", orderId: "#5003", customer: "Emma Wilson",      avatar: "E", date: "Oct 23, 2026", amount: "$312.00", status: "Pending" },
  { id: "INV-2026-004", orderId: "#5004", customer: "James Brown",      avatar: "J", date: "Oct 23, 2026", amount: "$67.50",  status: "Pending" },
  { id: "INV-2026-005", orderId: "#5005", customer: "Olivia Davis",     avatar: "O", date: "Oct 22, 2026", amount: "$198.00", status: "Paid" },
  { id: "INV-2026-006", orderId: "#5007", customer: "Sophia Taylor",    avatar: "S", date: "Oct 21, 2026", amount: "$39.00",  status: "Void" },
]

const statusStyles: Record<string, string> = {
  Paid:    "bg-emerald-50 text-emerald-700",
  Pending: "bg-gray-100 text-gray-600",
  Void:    "bg-red-50 text-red-600",
}

export default function InvoicesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Order Invoices"
        description="View and download invoices for all orders"
        breadcrumbs={[
          { label: "Admin",  href: "/admin" },
          { label: "Orders", href: "/admin/orders" },
          { label: "Invoices" },
        ]}
        actions={
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground" style={{ fontSize: "12px" }}>
              {invoices.length} invoices
            </span>
          </div>
        }
      />

      <div className="bg-white rounded-xl border border-border/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--accent)" }}>
                {["Invoice #", "Order #", "Customer", "Date", "Amount", "Status", "Actions"].map((h) => (
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
              {invoices.map((inv, i) => (
                <tr
                  key={inv.id}
                  className="hover:bg-[var(--muted)] transition-colors"
                  style={{ borderBottom: i < invoices.length - 1 ? "1px solid var(--accent)" : "none" }}
                >
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <FileText className="w-3.5 h-3.5 text-muted-foreground" strokeWidth={1.5} />
                      <span className="font-semibold text-foreground" style={{ fontSize: "13px" }}>{inv.id}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-muted-foreground" style={{ fontSize: "13px" }}>{inv.orderId}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center text-white shrink-0"
                        style={{ backgroundColor: "var(--primary)", fontSize: "11px", fontWeight: 600 }}
                      >
                        {inv.avatar}
                      </div>
                      <span className="text-foreground whitespace-nowrap" style={{ fontSize: "13px" }}>{inv.customer}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-muted-foreground whitespace-nowrap" style={{ fontSize: "13px" }}>{inv.date}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="font-medium text-foreground" style={{ fontSize: "13px" }}>{inv.amount}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 font-medium ${statusStyles[inv.status] ?? "bg-gray-100 text-gray-600"}`}
                      style={{ fontSize: "11px" }}
                    >
                      {inv.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <button
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border/60 text-muted-foreground hover:text-foreground hover:bg-[var(--muted)] transition-colors font-medium whitespace-nowrap"
                      style={{ fontSize: "12px" }}
                    >
                      <Download className="w-3.5 h-3.5" strokeWidth={1.5} />
                      Download PDF
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
