"use client"

import { useState } from "react"
import {
  Search, Truck, Eye, Star, X, Package,
  Clock, CheckCircle, RefreshCcw, XCircle, ChevronRight
} from "lucide-react"
import { cn } from "@/lib/utils"

type OrderStatus = "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled"

interface Order {
  id: string
  date: string
  items: { name: string; color: string }[]
  total: string
  status: OrderStatus
  itemCount: number
}

const orders: Order[] = [
  {
    id: "#LS-4521",
    date: "Oct 20, 2026",
    items: [
      { name: "Silk Wrap Dress",    color: "#C8A4B0" },
      { name: "Woven Leather Belt", color: "#8B7355" },
    ],
    total: "$189.00",
    status: "Delivered",
    itemCount: 2,
  },
  {
    id: "#LS-4519",
    date: "Oct 14, 2026",
    items: [
      { name: "Cashmere Turtleneck", color: "#B8A4AA" },
    ],
    total: "$124.00",
    status: "Shipped",
    itemCount: 1,
  },
  {
    id: "#LS-4516",
    date: "Oct 8, 2026",
    items: [
      { name: "Tailored Blazer",  color: "#2D2D2D" },
      { name: "Linen Trousers",   color: "#C4B49A" },
      { name: "Silk Camisole",    color: "#E8D5D5" },
    ],
    total: "$312.00",
    status: "Processing",
    itemCount: 3,
  },
  {
    id: "#LS-4512",
    date: "Sep 30, 2026",
    items: [
      { name: "Floral Midi Dress", color: "#E8C4D0" },
    ],
    total: "$98.00",
    status: "Delivered",
    itemCount: 1,
  },
  {
    id: "#LS-4508",
    date: "Sep 22, 2026",
    items: [
      { name: "Structured Tote",   color: "#4A3728" },
      { name: "Merino Wool Scarf", color: "#C49A8A" },
    ],
    total: "$215.00",
    status: "Pending",
    itemCount: 2,
  },
  {
    id: "#LS-4499",
    date: "Sep 10, 2026",
    items: [
      { name: "Wide-Leg Jeans",   color: "#4A6FA5" },
      { name: "Cropped Cardigan", color: "#DEB887" },
    ],
    total: "$143.00",
    status: "Cancelled",
    itemCount: 2,
  },
]

const statusConfig: Record<OrderStatus, { label: string; bg: string; color: string; icon: React.ElementType }> = {
  Pending:    { label: "Pending",    bg: "#F3F4F6", color: "#6B7280", icon: Clock       },
  Processing: { label: "Processing", bg: "#FFFBEB", color: "#D97706", icon: RefreshCcw  },
  Shipped:    { label: "Shipped",    bg: "#EFF6FF", color: "#2563EB", icon: Truck       },
  Delivered:  { label: "Delivered",  bg: "#ECFDF5", color: "#059669", icon: CheckCircle },
  Cancelled:  { label: "Cancelled",  bg: "#FEF2F2", color: "#DC2626", icon: XCircle     },
}

const filterTabs: { label: string; value: string }[] = [
  { label: "All",        value: "all"       },
  { label: "Pending",    value: "Pending"   },
  { label: "Processing", value: "Processing"},
  { label: "Shipped",    value: "Shipped"   },
  { label: "Delivered",  value: "Delivered" },
  { label: "Cancelled",  value: "Cancelled" },
]

export default function OrdersPage() {
  const [search, setSearch] = useState("")
  const [activeFilter, setActiveFilter] = useState("all")

  const filtered = orders.filter((order) => {
    const matchFilter = activeFilter === "all" || order.status === activeFilter
    const matchSearch =
      search === "" ||
      order.id.toLowerCase().includes(search.toLowerCase()) ||
      order.items.some((i) => i.name.toLowerCase().includes(search.toLowerCase()))
    return matchFilter && matchSearch
  })

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h1 className="font-semibold text-foreground" style={{ fontSize: "20px" }}>My Orders</h1>
        <p className="text-muted-foreground mt-0.5" style={{ fontSize: "13px" }}>
          {orders.length} orders placed in total
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
          style={{ width: "15px", height: "15px" }}
          strokeWidth={1.5}
        />
        <input
          type="text"
          placeholder="Search by order number or item name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full h-10 pl-10 pr-10 bg-white border border-border/60 focus:outline-none focus:border-primary/50 transition-colors"
          style={{ borderRadius: "10px", fontSize: "13px" }}
        />
        {search && (
          <button
            onClick={() => setSearch("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X style={{ width: "14px", height: "14px" }} strokeWidth={1.5} />
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-0.5" style={{ scrollbarWidth: "none" }}>
        {filterTabs.map((tab) => {
          const active = activeFilter === tab.value
          const count = tab.value === "all"
            ? orders.length
            : orders.filter((o) => o.status === tab.value).length

          return (
            <button
              key={tab.value}
              onClick={() => setActiveFilter(tab.value)}
              className={cn(
                "flex items-center gap-1.5 px-3.5 py-2 rounded-full border whitespace-nowrap transition-all shrink-0",
                active
                  ? "text-white border-transparent"
                  : "bg-white text-muted-foreground border-border/60 hover:border-border"
              )}
              style={{
                fontSize: "12px",
                fontWeight: active ? 500 : 400,
                backgroundColor: active ? "#501D2A" : undefined,
              }}
            >
              {tab.label}
              {count > 0 && (
                <span
                  className={cn(
                    "inline-flex items-center justify-center w-4 h-4 rounded-full",
                    active ? "bg-white/20 text-white" : "bg-[#F0EDEF] text-muted-foreground"
                  )}
                  style={{ fontSize: "10px", fontWeight: 600 }}
                >
                  {count}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* Order Cards */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-xl border border-border/50 py-16 flex flex-col items-center gap-3 text-center">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "#F0EDEF" }}
          >
            <Package className="w-6 h-6" style={{ color: "#794554" }} strokeWidth={1.5} />
          </div>
          <p className="font-medium text-foreground" style={{ fontSize: "14px" }}>No orders found</p>
          <p className="text-muted-foreground" style={{ fontSize: "12px" }}>
            Try adjusting your search or filter
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((order) => {
            const st = statusConfig[order.status]
            const StatusIcon = st.icon

            return (
              <div
                key={order.id}
                className="bg-white rounded-xl border border-border/50 p-5 hover:border-border transition-colors"
              >
                {/* Top row */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div>
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <span className="font-semibold text-foreground" style={{ fontSize: "14px" }}>
                        {order.id}
                      </span>
                      <span
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-medium"
                        style={{ backgroundColor: st.bg, color: st.color, fontSize: "11px" }}
                      >
                        <StatusIcon style={{ width: "11px", height: "11px" }} strokeWidth={2} />
                        {st.label}
                      </span>
                    </div>
                    <p className="text-muted-foreground mt-1" style={{ fontSize: "12px" }}>
                      Placed on {order.date} · {order.itemCount} {order.itemCount === 1 ? "item" : "items"}
                    </p>
                  </div>
                  <span className="font-bold text-foreground shrink-0" style={{ fontSize: "16px" }}>
                    {order.total}
                  </span>
                </div>

                {/* Product Thumbnails */}
                <div className="flex items-center gap-2 mb-4">
                  {order.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="relative group/thumb">
                        <div
                          className="w-12 h-12 rounded-lg border border-border/40 shrink-0"
                          style={{ backgroundColor: item.color }}
                        />
                        {/* Tooltip */}
                        <div
                          className="absolute bottom-full mb-1.5 left-1/2 -translate-x-1/2 bg-foreground text-white px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover/thumb:opacity-100 transition-opacity pointer-events-none z-10"
                          style={{ fontSize: "10px" }}
                        >
                          {item.name}
                        </div>
                      </div>
                    </div>
                  ))}
                  {order.itemCount > order.items.length && (
                    <div
                      className="w-12 h-12 rounded-lg border border-dashed border-border flex items-center justify-center"
                      style={{ backgroundColor: "#F8F7F5" }}
                    >
                      <span className="text-muted-foreground" style={{ fontSize: "11px" }}>
                        +{order.itemCount - order.items.length}
                      </span>
                    </div>
                  )}
                  <div className="ml-3 flex-1 min-w-0">
                    <p className="text-foreground truncate" style={{ fontSize: "12px", fontWeight: 500 }}>
                      {order.items[0].name}
                      {order.items.length > 1 && (
                        <span className="text-muted-foreground font-normal">
                          {" "}& {order.items.length - 1} more
                        </span>
                      )}
                    </p>
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-border/40 mb-4" />

                {/* Action Buttons */}
                <div className="flex items-center gap-2 flex-wrap">
                  {/* Track Order – Shipped or Processing */}
                  {(order.status === "Shipped" || order.status === "Processing") && (
                    <button
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-white transition-colors hover:opacity-90"
                      style={{ backgroundColor: "#501D2A", fontSize: "12px", fontWeight: 500 }}
                    >
                      <Truck style={{ width: "13px", height: "13px" }} strokeWidth={1.5} />
                      Track Order
                    </button>
                  )}

                  {/* View Details – always */}
                  <button
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-border hover:bg-[#F8F7F5] transition-colors text-foreground"
                    style={{ fontSize: "12px" }}
                  >
                    <Eye style={{ width: "13px", height: "13px" }} strokeWidth={1.5} />
                    View Details
                    <ChevronRight style={{ width: "12px", height: "12px" }} strokeWidth={1.5} />
                  </button>

                  {/* Leave Review – Delivered */}
                  {order.status === "Delivered" && (
                    <button
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg border hover:bg-amber-50 transition-colors"
                      style={{ fontSize: "12px", borderColor: "#F59E0B", color: "#D97706" }}
                    >
                      <Star style={{ width: "13px", height: "13px" }} strokeWidth={1.5} />
                      Leave Review
                    </button>
                  )}

                  {/* Cancel Order – Pending */}
                  {order.status === "Pending" && (
                    <button
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-red-200 text-red-500 hover:bg-red-50 transition-colors ml-auto"
                      style={{ fontSize: "12px" }}
                    >
                      <X style={{ width: "13px", height: "13px" }} strokeWidth={1.5} />
                      Cancel Order
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
