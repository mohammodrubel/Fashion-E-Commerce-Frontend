import Link from "next/link"
import {
  TrendingUp, TrendingDown, ShoppingCart, Users, DollarSign,
  Package, Plus, Eye, Settings, BarChart3, ArrowRight,
  Clock, CheckCircle, Truck, AlertCircle, RefreshCcw,
  Sparkles, UserPlus
} from "lucide-react"

const stats = [
  {
    label: "Total Revenue",
    value: "$12,548.00",
    change: "+7.1%",
    trend: "up",
    icon: DollarSign,
    sub: "vs last month",
  },
  {
    label: "Total Orders",
    value: "186",
    change: "+4.8%",
    trend: "up",
    icon: ShoppingCart,
    sub: "vs last month",
  },
  {
    label: "Total Customers",
    value: "1,243",
    change: "+12.5%",
    trend: "up",
    icon: Users,
    sub: "vs last month",
  },
  {
    label: "Avg Order Value",
    value: "$67.48",
    change: "-2.3%",
    trend: "down",
    icon: BarChart3,
    sub: "vs last month",
  },
]

const recentOrders = [
  { id: "#4521", customer: "Sarah Johnson", items: 3, total: "$124.00", status: "Delivered", avatar: "S" },
  { id: "#4520", customer: "Michael Chen", items: 1, total: "$89.00", status: "Shipped", avatar: "M" },
  { id: "#4519", customer: "Emma Wilson", items: 5, total: "$312.00", status: "Processing", avatar: "E" },
  { id: "#4518", customer: "James Brown", items: 2, total: "$67.50", status: "Pending", avatar: "J" },
  { id: "#4517", customer: "Olivia Davis", items: 4, total: "$198.00", status: "Confirmed", avatar: "O" },
]

const statusStyles: Record<string, string> = {
  Delivered: "bg-emerald-50 text-emerald-700",
  Shipped: "bg-blue-50 text-blue-700",
  Processing: "bg-amber-50 text-amber-700",
  Pending: "bg-gray-100 text-gray-600",
  Confirmed: "bg-purple-50 text-purple-700",
  Cancelled: "bg-red-50 text-red-700",
}

const quickActions = [
  { label: "Add New Product", icon: Plus, href: "/admin/products/new", color: "#501D2A" },
  { label: "Create Order", icon: ShoppingCart, href: "/admin/orders/new", color: "#2D5A8E" },
  { label: "Add Customer", icon: UserPlus, href: "/admin/customers/new", color: "#2D6B4F" },
  { label: "View Reports", icon: BarChart3, href: "/admin/reports", color: "#6B4F2D" },
]

const recentActivity = [
  { text: "New order #4521 placed", sub: "Sarah Johnson · $124.00", time: "2 min ago", icon: ShoppingCart, color: "#501D2A" },
  { text: "Product restocked", sub: "Classic White Tee · 50 units", time: "18 min ago", icon: Package, color: "#2D5A8E" },
  { text: "New customer registered", sub: "emma.w@email.com", time: "1 hr ago", icon: Users, color: "#2D6B4F" },
  { text: "Order #4515 delivered", sub: "James Brown · $67.50", time: "3 hr ago", icon: CheckCircle, color: "#6B4F2D" },
  { text: "Low stock alert", sub: "Silk Blouse (XS) · 2 left", time: "5 hr ago", icon: AlertCircle, color: "#B42332" },
]

const categories = [
  { name: "Women's Clothing", pct: 42, color: "#501D2A" },
  { name: "Men's Clothing", pct: 28, color: "#794554" },
  { name: "Accessories", pct: 18, color: "#9C7A83" },
  { name: "Footwear", pct: 12, color: "#B8A4AA" },
]

const salesData = [4200, 6800, 5100, 9200, 7400, 11200, 8900, 12548, 10100, 13200, 11800, 14500]
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
const maxSale = Math.max(...salesData)

function buildPath(data: number[], w: number, h: number) {
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w
    const y = h - (v / maxSale) * h
    return [x, y] as [number, number]
  })
  let d = `M ${pts[0][0]} ${pts[0][1]}`
  for (let i = 1; i < pts.length; i++) {
    const cp1x = pts[i - 1][0] + (pts[i][0] - pts[i - 1][0]) / 3
    const cp2x = pts[i][0] - (pts[i][0] - pts[i - 1][0]) / 3
    d += ` C ${cp1x} ${pts[i - 1][1]}, ${cp2x} ${pts[i][1]}, ${pts[i][0]} ${pts[i][1]}`
  }
  const areaD = d + ` L ${pts[pts.length - 1][0]} ${h} L 0 ${h} Z`
  return { line: d, area: areaD }
}

const W = 600
const H = 120
const { line, area } = buildPath(salesData, W, H)

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-semibold text-foreground" style={{ fontSize: "22px" }}>
            Dashboard
          </h1>
          <p className="text-muted-foreground mt-0.5" style={{ fontSize: "13px" }}>
            Good morning, Admin! Here&apos;s what&apos;s happening with your store today.
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-2">
          <span className="text-muted-foreground" style={{ fontSize: "12px" }}>
            Oct 1 – Oct 24, 2026
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Left: Main Content */}
        <div className="xl:col-span-3 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat) => {
              const Icon = stat.icon
              return (
                <div
                  key={stat.label}
                  className="bg-white p-4 rounded-xl border border-border/50 hover:border-border transition-colors"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-muted-foreground" style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.07em" }}>
                      {stat.label}
                    </span>
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: "#F0EDEF" }}
                    >
                      <Icon className="w-4 h-4" style={{ color: "#501D2A" }} strokeWidth={1.5} />
                    </div>
                  </div>
                  <div className="text-foreground font-semibold" style={{ fontSize: "22px" }}>
                    {stat.value}
                  </div>
                  <div className="flex items-center gap-1.5 mt-1">
                    {stat.trend === "up" ? (
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-600" strokeWidth={2} />
                    ) : (
                      <TrendingDown className="w-3.5 h-3.5 text-red-500" strokeWidth={2} />
                    )}
                    <span
                      className={stat.trend === "up" ? "text-emerald-600" : "text-red-500"}
                      style={{ fontSize: "12px", fontWeight: 500 }}
                    >
                      {stat.change}
                    </span>
                    <span className="text-muted-foreground" style={{ fontSize: "11px" }}>
                      {stat.sub}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Charts row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Sales Overview */}
            <div className="lg:col-span-2 bg-white rounded-xl border border-border/50 p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-foreground" style={{ fontSize: "14px" }}>
                    Sales Overview
                  </h3>
                  <p className="text-muted-foreground" style={{ fontSize: "12px" }}>$12,548 this month</p>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-600" style={{ fontSize: "12px" }}>
                  <TrendingUp className="w-3.5 h-3.5" strokeWidth={2} />
                  +7.1%
                </div>
              </div>
              {/* SVG Chart */}
              <div className="w-full" style={{ height: "140px" }}>
                <svg
                  viewBox={`0 0 ${W} ${H + 20}`}
                  preserveAspectRatio="none"
                  width="100%"
                  height="100%"
                >
                  <defs>
                    <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#501D2A" stopOpacity="0.15" />
                      <stop offset="100%" stopColor="#501D2A" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d={area} fill="url(#areaGrad)" />
                  <path d={line} fill="none" stroke="#501D2A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  {/* Month labels */}
                  {months.map((m, i) => (
                    <text
                      key={m}
                      x={(i / (months.length - 1)) * W}
                      y={H + 16}
                      textAnchor="middle"
                      fontSize="9"
                      fill="#9C7A83"
                    >
                      {m}
                    </text>
                  ))}
                </svg>
              </div>
            </div>

            {/* Sales by Category */}
            <div className="bg-white rounded-xl border border-border/50 p-5">
              <h3 className="font-semibold text-foreground mb-4" style={{ fontSize: "14px" }}>
                Sales by Category
              </h3>
              {/* Simple donut */}
              <div className="flex justify-center mb-4">
                <div className="relative w-28 h-28">
                  <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                    {(() => {
                      let cum = 0
                      return categories.map((cat) => {
                        const circumference = 2 * Math.PI * 13
                        const dash = (cat.pct / 100) * circumference
                        const gap = circumference - dash
                        const offset = -(cum / 100) * circumference
                        cum += cat.pct
                        return (
                          <circle
                            key={cat.name}
                            cx="18" cy="18" r="13"
                            fill="none"
                            stroke={cat.color}
                            strokeWidth="5"
                            strokeDasharray={`${dash} ${gap}`}
                            strokeDashoffset={offset}
                          />
                        )
                      })
                    })()}
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="font-semibold text-foreground" style={{ fontSize: "15px" }}>$12.5k</span>
                    <span className="text-muted-foreground" style={{ fontSize: "9px" }}>Total</span>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                {categories.map((cat) => (
                  <div key={cat.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ backgroundColor: cat.color }} />
                      <span className="text-muted-foreground" style={{ fontSize: "11px" }}>{cat.name}</span>
                    </div>
                    <span className="font-medium text-foreground" style={{ fontSize: "12px" }}>{cat.pct}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-white rounded-xl border border-border/50">
            <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid #F0EDEF" }}>
              <h3 className="font-semibold text-foreground" style={{ fontSize: "14px" }}>Recent Orders</h3>
              <Link
                href="/admin/orders"
                className="flex items-center gap-1.5 text-primary hover:text-primary/80 transition-colors"
                style={{ fontSize: "12px" }}
              >
                View all <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr style={{ borderBottom: "1px solid #F0EDEF" }}>
                    {["Order", "Customer", "Items", "Total", "Status"].map((h) => (
                      <th
                        key={h}
                        className="text-left px-5 py-3 text-muted-foreground font-medium"
                        style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.07em" }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order, i) => (
                    <tr
                      key={order.id}
                      className="hover:bg-[#F8F7F5] transition-colors"
                      style={{ borderBottom: i < recentOrders.length - 1 ? "1px solid #F0EDEF" : "none" }}
                    >
                      <td className="px-5 py-3">
                        <span className="font-medium text-foreground" style={{ fontSize: "13px" }}>{order.id}</span>
                      </td>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2.5">
                          <div
                            className="w-7 h-7 rounded-full flex items-center justify-center text-white shrink-0"
                            style={{ backgroundColor: "#501D2A", fontSize: "11px", fontWeight: 600 }}
                          >
                            {order.avatar}
                          </div>
                          <span className="text-foreground" style={{ fontSize: "13px" }}>{order.customer}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3">
                        <span className="text-muted-foreground" style={{ fontSize: "13px" }}>{order.items} items</span>
                      </td>
                      <td className="px-5 py-3">
                        <span className="font-medium text-foreground" style={{ fontSize: "13px" }}>{order.total}</span>
                      </td>
                      <td className="px-5 py-3">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full font-medium ${statusStyles[order.status] ?? "bg-gray-100 text-gray-600"}`}
                          style={{ fontSize: "11px" }}
                        >
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Collections */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { name: "Women's Collection", tag: "New Season", bg: "#E8DDE0" },
              { name: "Men's Collection", tag: "Essentials", bg: "#DDE0E8" },
              { name: "Accessories", tag: "Limited Edition", bg: "#E0E8DD" },
            ].map((col) => (
              <div
                key={col.name}
                className="rounded-xl overflow-hidden relative"
                style={{ height: "120px", backgroundColor: col.bg }}
              >
                <div className="absolute inset-0 p-4 flex flex-col justify-between">
                  <span
                    className="inline-block px-2 py-0.5 bg-white/70 text-foreground rounded"
                    style={{ fontSize: "10px", fontWeight: 500 }}
                  >
                    {col.tag}
                  </span>
                  <div>
                    <p className="font-semibold text-foreground" style={{ fontSize: "13px" }}>{col.name}</p>
                    <Link
                      href="/admin/content/collections"
                      className="text-primary hover:text-primary/80 transition-colors"
                      style={{ fontSize: "11px" }}
                    >
                      Manage →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Quick Actions + Activity */}
        <div className="xl:col-span-1 space-y-4">
          {/* Quick Actions */}
          <div className="bg-white rounded-xl border border-border/50 p-4">
            <h3 className="font-semibold text-foreground mb-3" style={{ fontSize: "14px" }}>Quick Actions</h3>
            <div className="space-y-2">
              {quickActions.map((action) => {
                const Icon = action.icon
                return (
                  <Link
                    key={action.label}
                    href={action.href}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#F8F7F5] transition-colors group"
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                      style={{ backgroundColor: action.color + "15" }}
                    >
                      <Icon className="w-4 h-4" style={{ color: action.color }} strokeWidth={1.5} />
                    </div>
                    <span className="text-foreground group-hover:text-primary transition-colors" style={{ fontSize: "13px" }}>
                      {action.label}
                    </span>
                    <ArrowRight className="ml-auto w-3.5 h-3.5 text-muted-foreground/40 group-hover:text-primary transition-colors" strokeWidth={1.5} />
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl border border-border/50 p-4">
            <h3 className="font-semibold text-foreground mb-3" style={{ fontSize: "14px" }}>Recent Activity</h3>
            <div className="space-y-3">
              {recentActivity.map((item, i) => {
                const Icon = item.icon
                return (
                  <div key={i} className="flex gap-3">
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                      style={{ backgroundColor: item.color + "15" }}
                    >
                      <Icon className="w-3.5 h-3.5" style={{ color: item.color }} strokeWidth={1.5} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-foreground" style={{ fontSize: "12px", fontWeight: 500 }}>
                        {item.text}
                      </p>
                      <p className="text-muted-foreground truncate" style={{ fontSize: "11px" }}>
                        {item.sub}
                      </p>
                      <p className="text-muted-foreground/60" style={{ fontSize: "10px" }}>
                        {item.time}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
            <Link
              href="/admin/settings/activity-logs"
              className="flex items-center gap-1.5 mt-4 text-primary hover:text-primary/80 transition-colors"
              style={{ fontSize: "12px" }}
            >
              View all activity <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
            </Link>
          </div>

          {/* Mini Stats */}
          <div className="bg-white rounded-xl border border-border/50 p-4">
            <h3 className="font-semibold text-foreground mb-3" style={{ fontSize: "14px" }}>Today at a Glance</h3>
            <div className="space-y-3">
              {[
                { label: "New Orders", value: "12", icon: ShoppingCart },
                { label: "Pending Shipment", value: "8", icon: Truck },
                { label: "Low Stock Items", value: "5", icon: AlertCircle },
                { label: "Refund Requests", value: "2", icon: RefreshCcw },
              ].map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.label} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Icon className="w-3.5 h-3.5 text-muted-foreground" strokeWidth={1.5} />
                      <span className="text-muted-foreground" style={{ fontSize: "12px" }}>{item.label}</span>
                    </div>
                    <span className="font-semibold text-foreground" style={{ fontSize: "13px" }}>{item.value}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
