import Link from "next/link"
import {
  Search, Calendar, ChevronDown, Plus, Eye, MoreHorizontal,
  ShoppingCart, Clock, CheckCircle, Truck, XCircle, RotateCcw,
  Package, AlertCircle, RefreshCcw, DollarSign
} from "lucide-react"
import { PageHeader } from "@/components/admin/page-header"

const orders: { id: string; customer: string; avatar: string; date: string; items: number; total: string; status: string; }[] = []

const statusStyles: Record<string, string> = {
  Pending:         "bg-gray-100 text-gray-600",
  Processing:      "bg-amber-50 text-amber-700",
  Confirmed:       "bg-blue-50 text-blue-700",
  "Ready to Ship": "bg-purple-50 text-purple-700",
  Shipped:         "bg-indigo-50 text-indigo-700",
  Delivered:       "bg-emerald-50 text-emerald-700",
  Cancelled:       "bg-red-50 text-red-600",
  Returned:        "bg-orange-50 text-orange-700",
  "On Hold":       "bg-yellow-50 text-yellow-700",
  Failed:          "bg-red-50 text-red-700",
  Refunded:        "bg-teal-50 text-teal-700",
}

const summaryCounts = [
  { label: "Pending",         count: 0, icon: Clock,       color: "text-gray-500",    bg: "bg-gray-100" },
  { label: "Processing",      count: 0, icon: RefreshCcw,  color: "text-amber-600",   bg: "bg-amber-50" },
  { label: "Confirmed",       count: 0, icon: CheckCircle, color: "text-blue-600",    bg: "bg-blue-50" },
  { label: "Ready to Ship",   count: 0, icon: Package,     color: "text-purple-600",  bg: "bg-purple-50" },
  { label: "Shipped",         count: 0, icon: Truck,       color: "text-indigo-600",  bg: "bg-indigo-50" },
  { label: "Delivered",       count: 0, icon: CheckCircle, color: "text-emerald-600", bg: "bg-emerald-50" },
  { label: "Cancelled",       count: 0, icon: XCircle,     color: "text-red-500",     bg: "bg-red-50" },
  { label: "Returned",        count: 0, icon: RotateCcw,   color: "text-orange-600",  bg: "bg-orange-50" },
  { label: "On Hold",         count: 0, icon: AlertCircle, color: "text-yellow-600",  bg: "bg-yellow-50" },
  { label: "Failed",          count: 0, icon: XCircle,     color: "text-red-600",     bg: "bg-red-50" },
]

export default function AllOrdersPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="All Orders"
        description="Manage and track all customer orders"
        breadcrumbs={[
          { label: "Admin", href: "/admin" },
          { label: "Orders" },
        ]}
        actions={
          <Link
            href="/admin/orders/new"
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-white font-medium transition-opacity hover:opacity-90"
            style={{ backgroundColor: "var(--primary)", fontSize: "13px" }}
          >
            <Plus className="w-4 h-4" strokeWidth={2} />
            Create Order
          </Link>
        }
      />

      {/* Summary Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-5 xl:grid-cols-10 gap-3">
        {summaryCounts.map((s) => {
          const Icon = s.icon
          return (
            <div key={s.label} className="bg-white rounded-xl border border-border/50 p-3 flex flex-col gap-1.5">
              <div className="flex items-center gap-1.5">
                <div className={`w-6 h-6 rounded-md flex items-center justify-center ${s.bg}`}>
                  <Icon className={`w-3 h-3 ${s.color}`} strokeWidth={2} />
                </div>
                <span className="font-semibold text-foreground" style={{ fontSize: "16px" }}>{s.count}</span>
              </div>
              <span className="text-muted-foreground leading-tight" style={{ fontSize: "10px" }}>{s.label}</span>
            </div>
          )
        })}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-border/50 p-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          {/* Search */}
          <div className="relative flex-1 min-w-0 w-full sm:w-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
            <input
              type="text"
              placeholder="Search by order ID, customer…"
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-border/60 bg-[var(--muted)] text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-border focus:bg-white transition-colors"
              style={{ fontSize: "13px" }}
            />
          </div>
          {/* Date filter */}
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
            <input
              type="date"
              className="pl-9 pr-4 py-2 rounded-lg border border-border/60 bg-[var(--muted)] text-foreground focus:outline-none focus:border-border focus:bg-white transition-colors"
              style={{ fontSize: "13px" }}
            />
          </div>
          {/* Status filter */}
          <div className="relative">
            <select
              className="appearance-none pl-3 pr-8 py-2 rounded-lg border border-border/60 bg-[var(--muted)] text-foreground focus:outline-none focus:border-border focus:bg-white transition-colors"
              style={{ fontSize: "13px" }}
            >
              <option value="">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="confirmed">Confirmed</option>
              <option value="ready-to-ship">Ready to Ship</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
              <option value="on-hold">On Hold</option>
              <option value="returned">Returned</option>
              <option value="failed">Failed</option>
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" strokeWidth={1.5} />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-border/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--accent)" }}>
                {["Order ID", "Customer", "Date", "Items", "Total", "Status", "Actions"].map((h) => (
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
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 font-medium whitespace-nowrap ${statusStyles[order.status] ?? "bg-gray-100 text-gray-600"}`}
                      style={{ fontSize: "11px" }}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/admin/orders/${order.id.replace("#", "")}`}
                        className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-border/60 text-muted-foreground hover:text-foreground hover:bg-[var(--muted)] transition-colors"
                        style={{ fontSize: "11px" }}
                      >
                        <Eye className="w-3.5 h-3.5" strokeWidth={1.5} />
                        View
                      </Link>
                      <button
                        className="p-1.5 rounded-lg border border-border/60 text-muted-foreground hover:text-foreground hover:bg-[var(--muted)] transition-colors"
                      >
                        <MoreHorizontal className="w-3.5 h-3.5" strokeWidth={1.5} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-5 py-3.5" style={{ borderTop: "1px solid var(--accent)" }}>
          <span className="text-muted-foreground" style={{ fontSize: "12px" }}>
            Showing 1–10 of 186 orders
          </span>
          <div className="flex items-center gap-1.5">
            {["Previous", "1", "2", "3", "Next"].map((p) => (
              <button
                key={p}
                className={`px-3 py-1.5 rounded-lg border transition-colors ${
                  p === "1"
                    ? "border-transparent text-white"
                    : "border-border/60 text-muted-foreground hover:bg-[var(--muted)]"
                }`}
                style={{
                  fontSize: "12px",
                  backgroundColor: p === "1" ? "var(--primary)" : undefined,
                }}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
