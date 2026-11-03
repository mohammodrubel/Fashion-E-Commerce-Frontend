"use client"

import { useState } from "react"
import { ArrowUp, ArrowDown, PackagePlus } from "lucide-react"
import { PageHeader } from "@/components/admin/page-header"

// ─── Types matching Prisma StockMovement model ────────────────────────────────

type MovementType = "RESTOCK" | "ADJUSTMENT" | "DAMAGE" | "CANCELLATION" | "SALE" | "RETURN"

interface AdjustmentEntry {
  date: string
  productName: string
  sku: string
  type: MovementType
  quantity: number
  note: string
  recordedBy: string
}

// ─── Static data ─────────────────────────────────────────────────────────────

const variantOptions = [
  { value: "CLT-S-WHT",    label: "CLT-S-WHT — Classic White Tee S/White · Stock: 45" },
  { value: "SKBLOU-M-BEI", label: "SKBLOU-M-BEI — Silk Blouse M/Beige · Stock: 12" },
  { value: "DNJKT-L-IND",  label: "DNJKT-L-IND — Denim Jacket L/Indigo · Stock: 8" },
  { value: "FWDRS-S-FLR",  label: "FWDRS-S-FLR — Floral Wrap Dress S/Floral · Stock: 27" },
  { value: "RIBKN-M-CRM",  label: "RIBKN-M-CRM — Ribbed Knit Sweater M/Cream · Stock: 33" },
  { value: "HRSJ-30-BLK",  label: "HRSJ-30-BLK — High-Rise Skinny Jeans 30/Black · Stock: 19" },
]

const typeOptions: { value: MovementType; label: string }[] = [
  { value: "RESTOCK",      label: "Add Stock (Restock)" },
  { value: "ADJUSTMENT",   label: "Manual Adjustment" },
  { value: "DAMAGE",       label: "Mark as Damaged" },
  { value: "CANCELLATION", label: "Order Cancellation" },
]

const historyData: AdjustmentEntry[] = [
  { date: "Oct 24, 2026", productName: "Classic White Tee",       sku: "CLT-S-WHT",    type: "RESTOCK",      quantity: +50,  note: "PO #2045 received from supplier",     recordedBy: "Admin" },
  { date: "Oct 23, 2026", productName: "Silk Blouse",             sku: "SKBLOU-M-BEI", type: "DAMAGE",       quantity: -3,   note: "Water damage in warehouse, wrote off", recordedBy: "K. Smith" },
  { date: "Oct 22, 2026", productName: "Ribbed Knit Sweater",     sku: "RIBKN-M-CRM",  type: "ADJUSTMENT",   quantity: -1,   note: "Physical count correction",            recordedBy: "Admin" },
  { date: "Oct 21, 2026", productName: "High-Rise Skinny Jeans",  sku: "HRSJ-30-BLK",  type: "RETURN",       quantity: +4,   note: "Customer returns — Orders #4498-#4501",recordedBy: "L. Torres" },
  { date: "Oct 20, 2026", productName: "Floral Wrap Dress",       sku: "FWDRS-S-FLR",  type: "CANCELLATION", quantity: +2,   note: "Orders #4490, #4491 cancelled",        recordedBy: "System" },
  { date: "Oct 19, 2026", productName: "Classic White Tee",       sku: "CLT-S-WHT",    type: "SALE",         quantity: -6,   note: "Daily sales batch",                    recordedBy: "System" },
  { date: "Oct 18, 2026", productName: "Denim Jacket",            sku: "DNJKT-L-IND",  type: "RESTOCK",      quantity: +20,  note: "PO #2041 partial delivery",            recordedBy: "J. Doe" },
  { date: "Oct 17, 2026", productName: "Silk Blouse",             sku: "SKBLOU-M-BEI", type: "ADJUSTMENT",   quantity: +2,   note: "Found in unchecked returns bin",       recordedBy: "K. Smith" },
]

// ─── Type styling config ──────────────────────────────────────────────────────

const typeConfig: Record<MovementType, { label: string; color: string; bg: string; dir: "in" | "out" | "neutral" }> = {
  RESTOCK:      { label: "Restock",      color: "#059669", bg: "#ECFDF5", dir: "in" },
  ADJUSTMENT:   { label: "Adjustment",   color: "#2563EB", bg: "#EFF6FF", dir: "neutral" },
  DAMAGE:       { label: "Damage",       color: "#DC2626", bg: "#FEF2F2", dir: "out" },
  CANCELLATION: { label: "Cancellation", color: "#D97706", bg: "#FFFBEB", dir: "in" },
  SALE:         { label: "Sale",         color: "#6B7280", bg: "#F9FAFB", dir: "out" },
  RETURN:       { label: "Return",       color: "#0D9488", bg: "#F0FDFA", dir: "in" },
}

const labelCls = "block font-medium text-foreground mb-1.5"
const inputCls =
  "w-full px-3 py-2.5 rounded-lg border border-border/60 bg-white text-foreground focus:outline-none focus:border-primary/50 transition-colors"

// ─── Page ────────────────────────────────────────────────────────────────────

export default function StockAdjustmentsPage() {
  const [variant, setVariant]   = useState("")
  const [type, setType]         = useState<MovementType>("RESTOCK")
  const [quantity, setQuantity] = useState<number | "">("")
  const [note, setNote]         = useState("")

  return (
    <div className="space-y-6" style={{ backgroundColor: "var(--muted)", minHeight: "100vh" }}>
      <PageHeader
        title="Stock Adjustments"
        description="Record manual inventory changes and view full adjustment history"
        breadcrumbs={[
          { label: "Admin",     href: "/admin" },
          { label: "Inventory", href: "/admin/inventory" },
          { label: "Adjustments" },
        ]}
      />

      {/* ── Form card ── */}
      <div className="bg-white rounded-xl border border-border/50 p-5">
        <div
          className="flex items-center gap-2.5 mb-5"
          style={{ borderBottom: "1px solid var(--accent)", paddingBottom: "14px" }}
        >
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: "var(--accent)" }}
          >
            <PackagePlus className="w-3.5 h-3.5" style={{ color: "var(--primary)" }} strokeWidth={1.5} />
          </div>
          <h2 className="font-semibold text-foreground" style={{ fontSize: "14px" }}>
            Record Stock Adjustment
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Variant / SKU */}
          <div className="lg:col-span-2">
            <label className={labelCls} style={{ fontSize: "12px" }}>
              Variant / SKU <span className="text-red-500">*</span>
            </label>
            <select
              value={variant}
              onChange={(e) => setVariant(e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg border border-border/60 bg-white text-foreground focus:outline-none focus:border-primary/50 transition-colors appearance-none"
              style={{ fontSize: "13px" }}
            >
              <option value="">Search or select variant...</option>
              {variantOptions.map((v) => (
                <option key={v.value} value={v.value}>
                  {v.label}
                </option>
              ))}
            </select>
          </div>

          {/* Type */}
          <div>
            <label className={labelCls} style={{ fontSize: "12px" }}>
              Adjustment Type <span className="text-red-500">*</span>
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as MovementType)}
              className="w-full px-3 py-2.5 rounded-lg border border-border/60 bg-white text-foreground focus:outline-none focus:border-primary/50 transition-colors appearance-none"
              style={{ fontSize: "13px" }}
            >
              {typeOptions.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>

          {/* Quantity */}
          <div>
            <label className={labelCls} style={{ fontSize: "12px" }}>
              Quantity <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={quantity}
              min={1}
              onChange={(e) => setQuantity(e.target.value === "" ? "" : Number(e.target.value))}
              placeholder="Enter quantity"
              className={inputCls}
              style={{ fontSize: "13px" }}
              required
            />
          </div>

          {/* Note */}
          <div className="lg:col-span-3">
            <label className={labelCls} style={{ fontSize: "12px" }}>Note (optional)</label>
            <textarea
              rows={2}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Reason or reference (e.g. PO #2045, order number, incident details)..."
              className="w-full px-3 py-2.5 rounded-lg border border-border/60 bg-white text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors resize-none"
              style={{ fontSize: "13px" }}
            />
          </div>

          {/* Submit */}
          <div className="flex items-end">
            <button
              className="w-full py-2.5 rounded-lg text-white font-semibold transition-opacity hover:opacity-90"
              style={{ backgroundColor: "var(--primary)", fontSize: "13px" }}
            >
              Save Adjustment
            </button>
          </div>
        </div>
      </div>

      {/* ── History table ── */}
      <div className="bg-white rounded-xl border border-border/50">
        <div className="px-5 py-4" style={{ borderBottom: "1px solid var(--accent)" }}>
          <h2 className="font-semibold text-foreground" style={{ fontSize: "14px" }}>Adjustment History</h2>
          <p className="text-muted-foreground mt-0.5" style={{ fontSize: "12px" }}>All stock movements recorded in the system</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--accent)" }}>
                {["Date", "Product / SKU", "Type", "Quantity", "Note", "Recorded By"].map((h) => (
                  <th
                    key={h}
                    className="text-left px-5 py-3 text-muted-foreground font-medium whitespace-nowrap"
                    style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.07em" }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {historyData.map((entry, i) => {
                const cfg = typeConfig[entry.type]
                const isIn = cfg.dir === "in"
                const isOut = cfg.dir === "out"
                return (
                  <tr
                    key={i}
                    className="hover:bg-[var(--muted)] transition-colors"
                    style={{ borderBottom: i < historyData.length - 1 ? "1px solid var(--accent)" : "none" }}
                  >
                    {/* Date */}
                    <td className="px-5 py-3.5 text-muted-foreground whitespace-nowrap" style={{ fontSize: "12px" }}>
                      {entry.date}
                    </td>

                    {/* Product / SKU */}
                    <td className="px-5 py-3.5">
                      <p className="font-medium text-foreground" style={{ fontSize: "13px" }}>{entry.productName}</p>
                      <p className="font-mono text-muted-foreground" style={{ fontSize: "10px" }}>{entry.sku}</p>
                    </td>

                    {/* Type badge */}
                    <td className="px-5 py-3.5 whitespace-nowrap">
                      <span
                        className="inline-flex items-center rounded-full px-2.5 py-0.5 font-medium"
                        style={{ fontSize: "11px", backgroundColor: cfg.bg, color: cfg.color }}
                      >
                        {cfg.label}
                      </span>
                    </td>

                    {/* Quantity with direction */}
                    <td className="px-5 py-3.5 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        {isIn && <ArrowUp  className="w-3.5 h-3.5" style={{ color: "#10B981" }} strokeWidth={2} />}
                        {isOut && <ArrowDown className="w-3.5 h-3.5" style={{ color: "#EF4444" }} strokeWidth={2} />}
                        <span
                          className="font-semibold"
                          style={{
                            fontSize: "13px",
                            color: isIn ? "#059669" : isOut ? "#DC2626" : "#374151",
                          }}
                        >
                          {entry.quantity > 0 ? `+${entry.quantity}` : entry.quantity}
                        </span>
                      </div>
                    </td>

                    {/* Note */}
                    <td className="px-5 py-3.5 text-muted-foreground max-w-xs" style={{ fontSize: "12px" }}>
                      {entry.note}
                    </td>

                    {/* Recorded by */}
                    <td className="px-5 py-3.5 text-muted-foreground whitespace-nowrap" style={{ fontSize: "12px" }}>
                      {entry.recordedBy}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination stub */}
        <div
          className="flex items-center justify-between px-5 py-3.5"
          style={{ borderTop: "1px solid var(--accent)" }}
        >
          <span className="text-muted-foreground" style={{ fontSize: "12px" }}>
            Showing 1–8 of 8 entries
          </span>
          <div className="flex items-center gap-1.5">
            {["Previous", "1", "Next"].map((p) => (
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
