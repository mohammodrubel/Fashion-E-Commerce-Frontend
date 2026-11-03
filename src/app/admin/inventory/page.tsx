"use client"

import { PageHeader } from "@/components/admin/page-header"
import { Package, TrendingUp, AlertTriangle, XCircle, ArrowUp, ArrowDown } from "lucide-react"

// Sparkline data — stock value (BDT k) last 7 days
const sparkData = [280, 295, 310, 302, 318, 325, 324]
const sparkLabels = ["Oct 18", "Oct 19", "Oct 20", "Oct 21", "Oct 22", "Oct 23", "Oct 24"]
const W = 400
const H = 60
const maxVal = Math.max(...sparkData)
const minVal = Math.min(...sparkData)

function buildSparkline(data: number[]) {
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * W
    const y = H - ((v - minVal) / (maxVal - minVal || 1)) * (H - 8) - 4
    return [x, y] as [number, number]
  })
  let d = `M ${pts[0][0]} ${pts[0][1]}`
  for (let i = 1; i < pts.length; i++) {
    const cpx = pts[i - 1][0] + (pts[i][0] - pts[i - 1][0]) / 2
    d += ` C ${cpx} ${pts[i - 1][1]}, ${cpx} ${pts[i][1]}, ${pts[i][0]} ${pts[i][1]}`
  }
  const area = d + ` L ${pts[pts.length - 1][0]} ${H} L 0 ${H} Z`
  return { line: d, area, pts }
}

const { line, area, pts } = buildSparkline(sparkData)

// StockMovementType enum values
type StockMovementType = "RESTOCK" | "SALE" | "RETURN" | "ADJUSTMENT" | "DAMAGE" | "CANCELLATION"

interface StockMovement {
  id: string
  variantId: string
  userId: string | null
  type: StockMovementType
  quantity: number
  note: string | null
  createdAt: string
  productName: string
  sku: string
}

const recentMovements: StockMovement[] = [
  { id: "sm-001", variantId: "v-dr001", userId: "u-admin1", type: "RESTOCK",      quantity: 50,  note: "PO-2041 received",          createdAt: "Oct 24, 2026 09:12", productName: "Floral Wrap Midi Dress",   sku: "DR-FLW-001-M-FLS" },
  { id: "sm-002", variantId: "v-ot007", userId: null,       type: "SALE",         quantity: -2,  note: "Orders #4521, #4523",        createdAt: "Oct 24, 2026 08:45", productName: "Classic Trench Coat",      sku: "OT-TCT-007-L-BEI" },
  { id: "sm-003", variantId: "v-top004",userId: "u-admin1", type: "ADJUSTMENT",   quantity: -1,  note: "Count correction after audit",createdAt: "Oct 23, 2026 16:20", productName: "Silk Cami Blouse",         sku: "TOP-SCB-004-S-IVR" },
  { id: "sm-004", variantId: "v-jn003", userId: "u-admin2", type: "RETURN",       quantity: 3,   note: "Orders #4498, #4502 returns", createdAt: "Oct 23, 2026 14:05", productName: "High-Rise Skinny Jeans",   sku: "JN-HRS-003-28-IND" },
  { id: "sm-005", variantId: "v-kn006", userId: "u-admin2", type: "DAMAGE",       quantity: -3,  note: "Storage water leak, ruined",  createdAt: "Oct 22, 2026 11:30", productName: "Ribbed Knit Sweater",      sku: "KN-RIB-006-M-CRM" },
  { id: "sm-006", variantId: "v-sk008", userId: null,       type: "CANCELLATION", quantity: 1,   note: "Order #4490 cancelled",       createdAt: "Oct 22, 2026 10:00", productName: "Printed Slip Skirt",       sku: "SK-PSK-008-S-MLT" },
  { id: "sm-007", variantId: "v-pt005", userId: "u-admin1", type: "RESTOCK",      quantity: 25,  note: "PO-2039 received",            createdAt: "Oct 21, 2026 13:55", productName: "Wide Leg Linen Trousers",  sku: "PT-WLL-005-XS-ECR" },
  { id: "sm-008", variantId: "v-top002",userId: null,       type: "SALE",         quantity: -4,  note: "Orders #4512–#4515",          createdAt: "Oct 21, 2026 09:40", productName: "Oversized Linen Blazer",   sku: "TOP-LBZ-002-L-SND" },
]

const typeConfig: Record<StockMovementType, { label: string; className: string }> = {
  RESTOCK:      { label: "RESTOCK",      className: "bg-emerald-50 text-emerald-700 border border-emerald-200/60" },
  SALE:         { label: "SALE",         className: "bg-blue-50 text-blue-700 border border-blue-200/60" },
  RETURN:       { label: "RETURN",       className: "bg-teal-50 text-teal-700 border border-teal-200/60" },
  ADJUSTMENT:   { label: "ADJUSTMENT",   className: "bg-gray-100 text-gray-600 border border-gray-200/60" },
  DAMAGE:       { label: "DAMAGE",       className: "bg-red-50 text-red-600 border border-red-200/60" },
  CANCELLATION: { label: "CANCELLATION", className: "bg-orange-50 text-orange-600 border border-orange-200/60" },
}

export default function InventoryOverviewPage() {
  return (
    <div className="space-y-6" style={{ backgroundColor: "var(--muted)", minHeight: "100%" }}>
      <PageHeader
        title="Inventory"
        description="Monitor stock levels and movements across all product variants"
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Inventory" }]}
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total SKUs",         value: "42",       sub: "active variants",   icon: Package,       color: "#202127" },
          { label: "Total Stock Units",  value: "1,847",    sub: "units on hand",     icon: TrendingUp,    color: "#2D6B4F" },
          { label: "Total Stock Value",  value: "BDT 3,24,800", sub: "at current price", icon: TrendingUp, color: "#2563EB" },
          { label: "Out of Stock",       value: "4",        sub: "variants need restock", icon: XCircle,   color: "#DC2626" },
        ].map((s) => {
          const Icon = s.icon
          return (
            <div key={s.label} className="bg-white rounded-xl border border-border/50 p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-muted-foreground" style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.07em" }}>{s.label}</span>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: s.color + "15" }}>
                  <Icon className="w-4 h-4" style={{ color: s.color }} strokeWidth={1.5} />
                </div>
              </div>
              <p className="font-semibold text-foreground" style={{ fontSize: "20px" }}>{s.value}</p>
              <p className="text-muted-foreground mt-0.5" style={{ fontSize: "11px" }}>{s.sub}</p>
            </div>
          )
        })}
      </div>

      {/* Sparkline Chart + Stock Health */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Stock Value Sparkline */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-border/50 p-5">
          <div className="flex items-center justify-between mb-1">
            <h2 className="font-semibold text-foreground" style={{ fontSize: "14px" }}>Stock Value Over Time</h2>
            <span className="text-emerald-600 font-medium" style={{ fontSize: "12px" }}>Last 7 days</span>
          </div>
          <p className="text-muted-foreground mb-4" style={{ fontSize: "12px" }}>Estimated total inventory value (BDT k)</p>
          <div style={{ height: "80px" }}>
            <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" width="100%" height="100%">
              <defs>
                <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.18" />
                  <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d={area} fill="url(#sparkGrad)" />
              <path d={line} fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              {pts.map((pt, i) => (
                <circle key={i} cx={pt[0]} cy={pt[1]} r="3" fill="var(--primary)" />
              ))}
            </svg>
          </div>
          <div className="flex items-end justify-between mt-3 pt-3" style={{ borderTop: "1px solid var(--accent)" }}>
            {sparkLabels.map((lbl, i) => (
              <div key={lbl} className="text-center">
                <p className="text-muted-foreground" style={{ fontSize: "10px" }}>{lbl}</p>
                <p className="font-medium text-foreground" style={{ fontSize: "11px" }}>৳{sparkData[i]}k</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stock Health Summary */}
        <div className="bg-white rounded-xl border border-border/50 p-5">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
            <h2 className="font-semibold text-foreground" style={{ fontSize: "14px" }}>Stock Health</h2>
          </div>
          {/* Visual bar proportional to 48 total variants */}
          <div className="mb-5">
            <div className="flex h-3 rounded-full overflow-hidden gap-px">
              <div className="bg-emerald-500 transition-all" style={{ width: `${(38 / 48) * 100}%` }} title="In Stock" />
              <div className="bg-amber-400 transition-all" style={{ width: `${(6 / 48) * 100}%` }} title="Low Stock" />
              <div className="bg-red-500 transition-all" style={{ width: `${(4 / 48) * 100}%` }} title="Out of Stock" />
            </div>
            <div className="flex items-center gap-3 mt-2">
              <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-emerald-500" /><span className="text-muted-foreground" style={{ fontSize: "11px" }}>In Stock</span></div>
              <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-amber-400" /><span className="text-muted-foreground" style={{ fontSize: "11px" }}>Low</span></div>
              <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-red-500" /><span className="text-muted-foreground" style={{ fontSize: "11px" }}>Out</span></div>
            </div>
          </div>
          <div className="space-y-3">
            {[
              { label: "In Stock",           value: 38, color: "#10B981", bg: "#ECFDF5", total: 48 },
              { label: "Low Stock  (< 10)",  value: 6,  color: "#F59E0B", bg: "#FFFBEB", total: 48 },
              { label: "Out of Stock",        value: 4,  color: "#EF4444", bg: "#FEF2F2", total: 48 },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-foreground font-medium" style={{ fontSize: "13px" }}>{item.label}</span>
                  <span className="font-semibold" style={{ fontSize: "13px", color: item.color }}>{item.value}</span>
                </div>
                <div className="w-full h-1.5 rounded-full" style={{ backgroundColor: "var(--accent)" }}>
                  <div className="h-1.5 rounded-full" style={{ width: `${(item.value / item.total) * 100}%`, backgroundColor: item.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Stock Movements */}
      <div className="bg-white rounded-xl border border-border/50">
        <div className="px-5 py-4" style={{ borderBottom: "1px solid var(--accent)" }}>
          <h2 className="font-semibold text-foreground" style={{ fontSize: "14px" }}>Recent Stock Movements</h2>
          <p className="text-muted-foreground mt-0.5" style={{ fontSize: "12px" }}>Latest entries from StockMovement log</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--accent)" }}>
                {["Date", "Product (SKU)", "Type", "Qty Change", "Note"].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-muted-foreground font-medium" style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.07em" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentMovements.map((m, i) => {
                const cfg = typeConfig[m.type]
                const isPositive = m.quantity > 0
                return (
                  <tr
                    key={m.id}
                    className="hover:bg-[var(--muted)] transition-colors"
                    style={{ borderBottom: i < recentMovements.length - 1 ? "1px solid var(--accent)" : "none" }}
                  >
                    <td className="px-5 py-3 text-muted-foreground whitespace-nowrap" style={{ fontSize: "13px" }}>{m.createdAt}</td>
                    <td className="px-5 py-3">
                      <p className="font-medium text-foreground" style={{ fontSize: "13px" }}>{m.productName}</p>
                      <p className="font-mono text-muted-foreground" style={{ fontSize: "11px" }}>{m.sku}</p>
                    </td>
                    <td className="px-5 py-3">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 font-medium ${cfg.className}`} style={{ fontSize: "11px" }}>
                        {cfg.label}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-1">
                        {isPositive
                          ? <ArrowUp className="w-3.5 h-3.5 text-emerald-600" strokeWidth={2} />
                          : <ArrowDown className="w-3.5 h-3.5 text-red-500" strokeWidth={2} />}
                        <span className={`font-semibold ${isPositive ? "text-emerald-600" : "text-red-500"}`} style={{ fontSize: "13px" }}>
                          {isPositive ? `+${m.quantity}` : m.quantity}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-muted-foreground max-w-xs">
                      <span className="truncate block" style={{ fontSize: "13px" }}>{m.note ?? "—"}</span>
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
