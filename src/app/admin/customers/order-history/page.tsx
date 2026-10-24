import { PageHeader } from "@/components/admin/page-header"
import { Search, Eye, Package, Truck, CheckCircle, Clock, XCircle } from "lucide-react"

interface Order {
  id: string
  date: string
  items: number
  products: string
  total: string
  payment: string
  status: "Delivered" | "Shipped" | "Processing" | "Cancelled" | "Refunded"
}

const orders: Order[] = [
  { id: "#4521", date: "Oct 18, 2026", items: 3, products: "Floral Wrap Dress, Silk Cami, Linen Blazer", total: "$271.00", payment: "Visa ···4242", status: "Delivered" },
  { id: "#4398", date: "Sep 5, 2026", items: 1, products: "Classic Trench Coat", total: "$189.00", payment: "Visa ···4242", status: "Delivered" },
  { id: "#4261", date: "Jul 22, 2026", items: 4, products: "Ribbed Sweater, Wide Leg Trousers, +2 more", total: "$312.00", payment: "PayPal", status: "Delivered" },
  { id: "#4105", date: "May 14, 2026", items: 2, products: "High-Rise Jeans, Printed Slip Skirt", total: "$121.00", payment: "Visa ···4242", status: "Refunded" },
  { id: "#3942", date: "Mar 3, 2026", items: 1, products: "Oversized Linen Blazer", total: "$124.00", payment: "Apple Pay", status: "Delivered" },
]

const statusConfig = {
  Delivered: { label: "Delivered", className: "bg-emerald-50 text-emerald-700", icon: CheckCircle },
  Shipped: { label: "Shipped", className: "bg-blue-50 text-blue-700", icon: Truck },
  Processing: { label: "Processing", className: "bg-amber-50 text-amber-700", icon: Clock },
  Cancelled: { label: "Cancelled", className: "bg-gray-100 text-gray-500", icon: XCircle },
  Refunded: { label: "Refunded", className: "bg-purple-50 text-purple-700", icon: XCircle },
}

export default function CustomerOrderHistoryPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Customer Order History"
        description="View full purchase history for any customer"
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Customers", href: "/admin/customers" }, { label: "Order History" }]}
      />

      {/* Customer Search */}
      <div className="bg-white rounded-xl border border-border/50 p-5">
        <p className="font-medium text-foreground mb-3" style={{ fontSize: "13px" }}>Search Customer</p>
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
          <input
            type="text"
            placeholder="Search by name or email..."
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-border/60 bg-[#F8F7F5] placeholder:text-muted-foreground focus:outline-none focus:border-primary/40"
            style={{ fontSize: "13px" }}
          />
        </div>
      </div>

      {/* Customer Profile Banner */}
      <div className="bg-white rounded-xl border border-border/50 p-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="w-14 h-14 rounded-full flex items-center justify-center text-white font-semibold text-lg shrink-0" style={{ backgroundColor: "#501D2A" }}>
            SJ
          </div>
          <div className="flex-1">
            <h2 className="font-semibold text-foreground" style={{ fontSize: "16px" }}>Sarah Johnson</h2>
            <p className="text-muted-foreground" style={{ fontSize: "13px" }}>sarah.johnson@email.com · +1 (555) 234-5678</p>
          </div>
          <div className="flex gap-6">
            {[
              { label: "Total Orders", value: "14" },
              { label: "Total Spent", value: "$1,842" },
              { label: "Avg Order", value: "$131.57" },
              { label: "Member Since", value: "Mar 2024" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-semibold text-foreground" style={{ fontSize: "16px" }}>{s.value}</p>
                <p className="text-muted-foreground" style={{ fontSize: "11px" }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl border border-border/50">
        <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid #F0EDEF" }}>
          <h2 className="font-semibold text-foreground" style={{ fontSize: "14px" }}>Order History — Sarah Johnson</h2>
          <span className="text-muted-foreground" style={{ fontSize: "12px" }}>5 orders shown · 14 total</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid #F0EDEF" }}>
                {["Order ID", "Date", "Items", "Products", "Total", "Payment", "Status", ""].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-muted-foreground font-medium" style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.07em" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {orders.map((o, i) => {
                const statusCfg = statusConfig[o.status]
                const StatusIcon = statusCfg.icon
                return (
                  <tr
                    key={o.id}
                    className="hover:bg-[#F8F7F5] transition-colors"
                    style={{ borderBottom: i < orders.length - 1 ? "1px solid #F0EDEF" : "none" }}
                  >
                    <td className="px-5 py-3">
                      <span className="font-semibold text-foreground" style={{ fontSize: "13px" }}>{o.id}</span>
                    </td>
                    <td className="px-5 py-3 text-muted-foreground" style={{ fontSize: "13px" }}>{o.date}</td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-1.5">
                        <Package className="w-3.5 h-3.5 text-muted-foreground" strokeWidth={1.5} />
                        <span className="text-foreground" style={{ fontSize: "13px" }}>{o.items}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3 max-w-xs">
                      <p className="text-muted-foreground truncate" style={{ fontSize: "12px" }}>{o.products}</p>
                    </td>
                    <td className="px-5 py-3">
                      <span className="font-semibold text-foreground" style={{ fontSize: "13px" }}>{o.total}</span>
                    </td>
                    <td className="px-5 py-3 text-muted-foreground" style={{ fontSize: "13px" }}>{o.payment}</td>
                    <td className="px-5 py-3">
                      <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 font-medium ${statusCfg.className}`} style={{ fontSize: "11px" }}>
                        <StatusIcon className="w-3 h-3" strokeWidth={2} />
                        {statusCfg.label}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <button className="p-1.5 rounded-lg hover:bg-[#F0EDEF] transition-colors text-muted-foreground hover:text-foreground">
                        <Eye className="w-3.5 h-3.5" strokeWidth={1.5} />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
