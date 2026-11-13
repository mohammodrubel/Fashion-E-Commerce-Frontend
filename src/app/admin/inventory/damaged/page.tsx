"use client"

import { useState } from "react"
import { PageHeader } from "@/components/admin/page-header"
import { AlertTriangle, Plus, X } from "lucide-react"

// StockMovement where type = DAMAGE
interface DamageRecord {
  id: string
  variantId: string
  userId: string | null
  quantity: number            // negative for damage but we display absolute
  note: string | null
  createdAt: string
  // Display helpers
  productName: string
  sku: string
  recordedBy: string
}

const damageRecords: DamageRecord[] = []

// Available variant SKUs for the inline form select
const variantSkus: string[] = []

export default function DamagedStockPage() {
  const [showForm, setShowForm] = useState(false)
  const [formSku, setFormSku]         = useState("")
  const [formQty, setFormQty]         = useState("")
  const [formNote, setFormNote]       = useState("")

  const totalUnits = damageRecords.reduce((sum, r) => sum + r.quantity, 0)   // 23

  function handleSave() {
    if (!formSku || !formQty || !formNote) return
    // In a real app: POST /api/stock-movements { type: "DAMAGE", variantId, quantity, note }
    alert(`Damage recorded: ${formSku} — ${formQty} units. Note: ${formNote}`)
    setShowForm(false)
    setFormSku("")
    setFormQty("")
    setFormNote("")
  }

  return (
    <div className="space-y-6" style={{ backgroundColor: "var(--muted)", minHeight: "100%" }}>
      <PageHeader
        title="Damaged Stock"
        description="StockMovement records where type = DAMAGE"
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Inventory", href: "/admin/inventory" }, { label: "Damaged" }]}
        actions={
          <button
            onClick={() => setShowForm((v) => !v)}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-white transition-colors"
            style={{ fontSize: "13px", backgroundColor: "var(--primary)" }}
          >
            <Plus className="w-4 h-4" strokeWidth={2} />
            Record New Damage
          </button>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-border/50 p-4">
          <p className="text-muted-foreground" style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.07em" }}>Total Damaged This Month</p>
          <p className="font-semibold text-red-600 mt-1" style={{ fontSize: "22px" }}>{totalUnits} units</p>
          <p className="text-muted-foreground mt-0.5" style={{ fontSize: "11px" }}>Across {damageRecords.length} damage records</p>
        </div>
        <div className="bg-white rounded-xl border border-border/50 p-4">
          <p className="text-muted-foreground" style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.07em" }}>Estimated Loss</p>
          <p className="font-semibold text-foreground mt-1" style={{ fontSize: "22px" }}>BDT 18,400</p>
          <p className="text-muted-foreground mt-0.5" style={{ fontSize: "11px" }}>At current variant price × quantity</p>
        </div>
      </div>

      {/* Inline Form */}
      {showForm && (
        <div className="bg-white rounded-xl border border-border/50 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-foreground" style={{ fontSize: "14px" }}>Record New Damage</h2>
            <button onClick={() => setShowForm(false)} className="text-muted-foreground hover:text-foreground transition-colors">
              <X className="w-4 h-4" strokeWidth={1.5} />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-foreground mb-1.5" style={{ fontSize: "12px" }}>Variant SKU</label>
              <select
                value={formSku}
                onChange={(e) => setFormSku(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg border border-border/60 bg-white text-foreground focus:outline-none focus:border-primary/50"
                style={{ fontSize: "13px" }}
              >
                <option value="">Select a variant SKU…</option>
                {variantSkus.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-medium text-foreground mb-1.5" style={{ fontSize: "12px" }}>Quantity Damaged</label>
              <input
                type="number"
                min="1"
                value={formQty}
                onChange={(e) => setFormQty(e.target.value)}
                placeholder="e.g. 3"
                className="w-full px-3 py-2.5 rounded-lg border border-border/60 bg-white text-foreground focus:outline-none focus:border-primary/50"
                style={{ fontSize: "13px" }}
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block font-medium text-foreground mb-1.5" style={{ fontSize: "12px" }}>
                Note <span className="text-red-500">*</span>
                <span className="text-muted-foreground font-normal ml-1">(required for damage records)</span>
              </label>
              <textarea
                rows={3}
                value={formNote}
                onChange={(e) => setFormNote(e.target.value)}
                placeholder="Describe the damage cause and condition…"
                className="w-full px-3 py-2.5 rounded-lg border border-border/60 bg-white text-foreground focus:outline-none focus:border-primary/50 resize-none"
                style={{ fontSize: "13px" }}
              />
            </div>
          </div>
          <div className="flex items-center justify-end gap-3 mt-4 pt-4" style={{ borderTop: "1px solid var(--accent)" }}>
            <button
              onClick={() => setShowForm(false)}
              className="px-4 py-2 rounded-lg border border-border/60 bg-white text-foreground hover:bg-[var(--muted)] transition-colors"
              style={{ fontSize: "13px" }}
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={!formSku || !formQty || !formNote}
              className="px-4 py-2 rounded-lg text-white transition-colors disabled:opacity-40"
              style={{ fontSize: "13px", backgroundColor: "var(--primary)" }}
            >
              Save Damage Record
            </button>
          </div>
        </div>
      )}

      {/* Damage Records Table */}
      <div className="bg-white rounded-xl border border-border/50">
        <div className="px-5 py-4" style={{ borderBottom: "1px solid var(--accent)" }}>
          <h2 className="font-semibold text-foreground" style={{ fontSize: "14px" }}>Damage Records</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--accent)" }}>
                {["Date", "Product / SKU", "Qty Damaged", "Note", "Recorded By", "Actions"].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-muted-foreground font-medium" style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.07em" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {damageRecords.map((rec, i) => (
                <tr
                  key={rec.id}
                  className="hover:bg-[var(--muted)] transition-colors"
                  style={{ borderBottom: i < damageRecords.length - 1 ? "1px solid var(--accent)" : "none" }}
                >
                  <td className="px-5 py-3 text-muted-foreground whitespace-nowrap" style={{ fontSize: "13px" }}>{rec.createdAt}</td>
                  <td className="px-5 py-3">
                    <p className="font-medium text-foreground" style={{ fontSize: "13px" }}>{rec.productName}</p>
                    <p className="font-mono text-muted-foreground" style={{ fontSize: "11px" }}>{rec.sku}</p>
                  </td>
                  <td className="px-5 py-3">
                    <span className="font-semibold text-red-600" style={{ fontSize: "15px" }}>{rec.quantity}</span>
                  </td>
                  <td className="px-5 py-3 max-w-xs">
                    <p className="text-muted-foreground" style={{ fontSize: "13px" }}>{rec.note ?? "—"}</p>
                  </td>
                  <td className="px-5 py-3 text-muted-foreground" style={{ fontSize: "13px" }}>{rec.recordedBy}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <button className="text-muted-foreground hover:text-foreground transition-colors" style={{ fontSize: "12px" }}>Edit</button>
                      <span className="text-border/60" style={{ fontSize: "12px" }}>|</span>
                      <button className="text-red-500 hover:text-red-600 transition-colors" style={{ fontSize: "12px" }}>Delete</button>
                    </div>
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
