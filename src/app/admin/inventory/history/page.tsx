"use client"

import { useState } from "react"
import { PageHeader } from "@/components/admin/page-header"
import { ArrowUp, ArrowDown, Download, ChevronDown } from "lucide-react"

type StockMovementType = "RESTOCK" | "SALE" | "RETURN" | "ADJUSTMENT" | "DAMAGE" | "CANCELLATION"

// Matches StockMovement model exactly
interface StockMovement {
  id: string
  variantId: string
  userId: string | null
  type: StockMovementType
  quantity: number
  note: string | null
  createdAt: string          // DateTime as formatted string for display
  // Denormalised display helpers
  productName: string
  sku: string
  stockBefore: number
  stockAfter: number
  recordedBy: string
}

const movements: StockMovement[] = []

const typeConfig: Record<StockMovementType, { label: string; className: string; dir: "in" | "out" | "neutral" }> = {
  RESTOCK:      { label: "RESTOCK",      className: "bg-emerald-50 text-emerald-700 border border-emerald-200/60", dir: "in"      },
  SALE:         { label: "SALE",         className: "bg-blue-50 text-blue-700 border border-blue-200/60",          dir: "out"     },
  RETURN:       { label: "RETURN",       className: "bg-teal-50 text-teal-700 border border-teal-200/60",          dir: "in"      },
  ADJUSTMENT:   { label: "ADJUSTMENT",   className: "bg-gray-100 text-gray-600 border border-gray-200/60",         dir: "neutral" },
  DAMAGE:       { label: "DAMAGE",       className: "bg-red-50 text-red-600 border border-red-200/60",             dir: "out"     },
  CANCELLATION: { label: "CANCELLATION", className: "bg-orange-50 text-orange-600 border border-orange-200/60",   dir: "in"      },
}

const ALL_TYPES: Array<"ALL" | StockMovementType> = ["ALL", "RESTOCK", "SALE", "RETURN", "ADJUSTMENT", "DAMAGE", "CANCELLATION"]

export default function StockHistoryPage() {
  const [typeFilter, setTypeFilter] = useState<"ALL" | StockMovementType>("ALL")
  const [dateFrom, setDateFrom] = useState("2026-10-15")
  const [dateTo,   setDateTo]   = useState("2026-10-24")

  const filtered = movements.filter((m) => {
    if (typeFilter !== "ALL" && m.type !== typeFilter) return false
    return true
  })

  return (
    <div className="space-y-6" style={{ backgroundColor: "var(--muted)", minHeight: "100%" }}>
      <PageHeader
        title="Stock History"
        description="Complete audit log of all StockMovement records"
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Inventory", href: "/admin/inventory" }, { label: "History" }]}
        actions={
          <button className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border/60 hover:bg-[var(--muted)] transition-colors text-muted-foreground" style={{ fontSize: "13px" }}>
            <Download className="w-3.5 h-3.5" strokeWidth={1.5} /> Export CSV
          </button>
        }
      />

      {/* Filter Bar */}
      <div className="bg-white rounded-xl border border-border/50 p-4">
        <div className="flex flex-wrap items-center gap-3">
          {/* Type filter */}
          <div className="relative">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as typeof typeFilter)}
              className="px-3 py-2 rounded-lg border border-border/60 bg-white text-foreground focus:outline-none focus:border-primary/50 appearance-none pr-8"
              style={{ fontSize: "13px" }}
            >
              {ALL_TYPES.map((t) => (
                <option key={t} value={t}>{t === "ALL" ? "All Types" : t}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" strokeWidth={1.5} />
          </div>
          {/* Date range */}
          <div className="flex items-center gap-2">
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="px-3 py-2 rounded-lg border border-border/60 bg-white text-foreground focus:outline-none focus:border-primary/50"
              style={{ fontSize: "13px" }}
            />
            <span className="text-muted-foreground" style={{ fontSize: "13px" }}>to</span>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="px-3 py-2 rounded-lg border border-border/60 bg-white text-foreground focus:outline-none focus:border-primary/50"
              style={{ fontSize: "13px" }}
            />
          </div>
          <span className="text-muted-foreground" style={{ fontSize: "12px" }}>{filtered.length} records</span>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-border/50">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--accent)" }}>
                {["Date & Time", "Product Name", "SKU", "Type", "Quantity", "Stock Before → After", "Note", "Recorded By"].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-muted-foreground font-medium whitespace-nowrap" style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.07em" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((m, i) => {
                const cfg = typeConfig[m.type]
                const isPositive = m.quantity > 0
                return (
                  <tr
                    key={m.id}
                    className="hover:bg-[var(--muted)] transition-colors"
                    style={{ borderBottom: i < filtered.length - 1 ? "1px solid var(--accent)" : "none" }}
                  >
                    <td className="px-5 py-3 text-muted-foreground whitespace-nowrap" style={{ fontSize: "13px" }}>{m.createdAt}</td>
                    <td className="px-5 py-3 font-medium text-foreground" style={{ fontSize: "13px" }}>{m.productName}</td>
                    <td className="px-5 py-3 font-mono text-muted-foreground" style={{ fontSize: "12px" }}>{m.sku}</td>
                    <td className="px-5 py-3">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 font-medium ${cfg.className}`} style={{ fontSize: "11px" }}>
                        {cfg.label}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-1">
                        {cfg.dir === "in"
                          ? <ArrowUp className="w-3.5 h-3.5 text-emerald-600" strokeWidth={2} />
                          : cfg.dir === "out"
                          ? <ArrowDown className="w-3.5 h-3.5 text-red-500" strokeWidth={2} />
                          : null}
                        <span
                          className="font-semibold"
                          style={{ fontSize: "13px", color: isPositive ? "#059669" : cfg.dir === "out" ? "#DC2626" : "#374151" }}
                        >
                          {isPositive ? `+${m.quantity}` : m.quantity}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <span className="text-foreground" style={{ fontSize: "13px" }}>
                        {m.stockBefore}
                        <span className="text-muted-foreground mx-1">→</span>
                        <span className="font-medium">{m.stockAfter}</span>
                      </span>
                    </td>
                    <td className="px-5 py-3 max-w-xs">
                      <p className="text-muted-foreground truncate" style={{ fontSize: "12px" }}>{m.note ?? "—"}</p>
                    </td>
                    <td className="px-5 py-3 text-muted-foreground" style={{ fontSize: "13px" }}>{m.recordedBy}</td>
                  </tr>
                )
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-5 py-8 text-center text-muted-foreground" style={{ fontSize: "13px" }}>
                    No movements match the current filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between px-5 py-3" style={{ borderTop: "1px solid var(--accent)" }}>
          <p className="text-muted-foreground" style={{ fontSize: "12px" }}>
            Showing {filtered.length} of {movements.length} entries
          </p>
        </div>
      </div>
    </div>
  )
}
