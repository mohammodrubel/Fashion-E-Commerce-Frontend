"use client"

import { useState } from "react"
import { PageHeader } from "@/components/admin/page-header"
import { Plus, Pencil, Trash2, ChevronDown, Info, X } from "lucide-react"

const INPUT_CLASS =
  "w-full px-3 py-2.5 rounded-lg border border-border/60 bg-white text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"

const LABEL_CLASS = "block font-medium text-foreground mb-1.5"

/* ─── Static data ──────────────────────────────────────────────────── */

interface Variant {
  id: string
  product: string
  productId: string
  size: string
  sizeId: string
  color: string
  colorHex: string
  colorId: string
  sku: string
  price: number
  stock: number
  isActive: boolean
}

const staticVariants: Variant[] = [
  { id: "V01", product: "Silk Blouse", productId: "P001", size: "XS", sizeId: "SZ01", color: "White", colorHex: "#FFFFFF", colorId: "COL02", sku: "SLK-BLS-XS-WHT", price: 2800, stock: 12, isActive: true },
  { id: "V02", product: "Silk Blouse", productId: "P001", size: "S", sizeId: "SZ02", color: "Black", colorHex: "#000000", colorId: "COL01", sku: "SLK-BLS-S-BLK", price: 2800, stock: 8, isActive: true },
  { id: "V03", product: "Classic Jeans", productId: "P002", size: "M", sizeId: "SZ03", color: "Navy", colorHex: "#1e3a5f", colorId: "COL04", sku: "CLS-JNS-M-NVY", price: 3500, stock: 24, isActive: true },
  { id: "V04", product: "Classic Jeans", productId: "P002", size: "L", sizeId: "SZ04", color: "Black", colorHex: "#000000", colorId: "COL01", sku: "CLS-JNS-L-BLK", price: 3500, stock: 18, isActive: true },
  { id: "V05", product: "Floral Dress", productId: "P003", size: "S", sizeId: "SZ02", color: "Pink", colorHex: "#F472B6", colorId: "COL07", sku: "FLR-DRS-S-PNK", price: 4200, stock: 6, isActive: true },
  { id: "V06", product: "Floral Dress", productId: "P003", size: "M", sizeId: "SZ03", color: "Cream", colorHex: "#FFFDD0", colorId: "COL10", sku: "FLR-DRS-M-CRM", price: 4200, stock: 9, isActive: false },
  { id: "V07", product: "Floral Dress", productId: "P003", size: "L", sizeId: "SZ04", color: "Beige", colorHex: "#F5F0EB", colorId: "COL05", sku: "FLR-DRS-L-BGE", price: 4200, stock: 3, isActive: true },
  { id: "V08", product: "Linen Shirt", productId: "P004", size: "M", sizeId: "SZ03", color: "Olive", colorHex: "#6B7A2A", colorId: "COL06", sku: "LNN-SRT-M-OLV", price: 2200, stock: 15, isActive: true },
]

const productOptions = [
  { id: "P001", label: "Silk Blouse" },
  { id: "P002", label: "Classic Jeans" },
  { id: "P003", label: "Floral Dress" },
  { id: "P004", label: "Linen Shirt" },
]

const sizeOptions = ["XS", "S", "M", "L", "XL", "XXL"]

const colorOptions = [
  { id: "COL01", name: "Black", hex: "#000000" },
  { id: "COL02", name: "White", hex: "#FFFFFF" },
  { id: "COL03", name: "Red", hex: "#DC2626" },
  { id: "COL04", name: "Navy", hex: "#1e3a5f" },
  { id: "COL05", name: "Beige", hex: "#F5F0EB" },
  { id: "COL06", name: "Olive", hex: "#6B7A2A" },
  { id: "COL07", name: "Pink", hex: "#F472B6" },
  { id: "COL08", name: "Grey", hex: "#9CA3AF" },
  { id: "COL09", name: "Brown", hex: "#92400E" },
  { id: "COL10", name: "Cream", hex: "#FFFDD0" },
]

function autoSku(productId: string, size: string, colorId: string) {
  const p = productOptions.find((o) => o.id === productId)
  const c = colorOptions.find((o) => o.id === colorId)
  if (!p || !size || !c) return ""
  const pCode = p.label.split(" ").map((w) => w[0]).join("").toUpperCase()
  const cCode = c.name.slice(0, 3).toUpperCase()
  return `${pCode}-${size.toUpperCase()}-${cCode}`
}

/* ─── Toggle component ─────────────────────────────────────────────── */
function ActiveToggle({ active, onChange }: { active: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!active)}
      className="relative inline-flex h-5 w-9 items-center rounded-full transition-colors shrink-0"
      style={{ backgroundColor: active ? "#501D2A" : "#D1D5DB" }}
    >
      <span
        className="inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform"
        style={{ transform: active ? "translateX(18px)" : "translateX(2px)" }}
      />
    </button>
  )
}

/* ─── Page ─────────────────────────────────────────────────────────── */
export default function VariantsPage() {
  const [variants, setVariants] = useState<Variant[]>(staticVariants)
  const [showForm, setShowForm] = useState(true)

  // Form state
  const [fProductId, setFProductId] = useState("")
  const [fSizeId, setFSizeId] = useState("")
  const [fColorId, setFColorId] = useState("")
  const [fSku, setFSku] = useState("")
  const [fSkuEdited, setFSkuEdited] = useState(false)
  const [fPrice, setFPrice] = useState("")
  const [fStock, setFStock] = useState("")
  const [fIsActive, setFIsActive] = useState(true)

  function updateSku(productId: string, size: string, colorId: string) {
    if (!fSkuEdited) {
      setFSku(autoSku(productId, size, colorId))
    }
  }

  function handleProductChange(val: string) {
    setFProductId(val)
    updateSku(val, fSizeId, fColorId)
  }

  function handleSizeChange(val: string) {
    setFSizeId(val)
    updateSku(fProductId, val, fColorId)
  }

  function handleColorChange(val: string) {
    setFColorId(val)
    updateSku(fProductId, fSizeId, val)
  }

  function toggleVariantActive(id: string) {
    setVariants((prev) =>
      prev.map((v) => (v.id === id ? { ...v, isActive: !v.isActive } : v))
    )
  }

  return (
    <div className="space-y-6" style={{ backgroundColor: "#F8F7F5", minHeight: "100%" }}>
      <PageHeader
        title="Product Variants"
        description="Manage SKUs, pricing, and stock per size and color"
        breadcrumbs={[
          { label: "Admin", href: "/admin" },
          { label: "Products", href: "/admin/products" },
          { label: "Variants" },
        ]}
        actions={
          <button
            onClick={() => setShowForm((v) => !v)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-white text-sm hover:opacity-90 transition-opacity"
            style={{ backgroundColor: "#501D2A" }}
          >
            {showForm ? <X className="w-4 h-4" strokeWidth={1.5} /> : <Plus className="w-4 h-4" strokeWidth={1.5} />}
            {showForm ? "Close Form" : "Add New Variant"}
          </button>
        }
      />

      {/* ── Variants Table ─────────────────────────────────────────── */}
      <div className="bg-white rounded-xl border border-border/50">
        <div
          className="flex items-center justify-between px-5 py-4"
          style={{ borderBottom: "1px solid #F0EDEF" }}
        >
          <div>
            <h2 className="font-semibold text-foreground" style={{ fontSize: "14px" }}>
              All Variants
            </h2>
            <p className="text-muted-foreground" style={{ fontSize: "12px" }}>
              {variants.length} variants across {[...new Set(variants.map((v) => v.productId))].length} products
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid #F0EDEF" }}>
                {["Product", "Size", "Color", "SKU", "Price (BDT)", "Stock", "Status", "Actions"].map(
                  (h) => (
                    <th
                      key={h}
                      className="text-left px-5 py-3 text-muted-foreground font-medium whitespace-nowrap"
                      style={{
                        fontSize: "11px",
                        textTransform: "uppercase",
                        letterSpacing: "0.07em",
                      }}
                    >
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {variants.map((v, i) => (
                <tr
                  key={v.id}
                  className="hover:bg-[#F8F7F5] transition-colors"
                  style={{
                    borderBottom: i < variants.length - 1 ? "1px solid #F0EDEF" : "none",
                  }}
                >
                  {/* Product */}
                  <td className="px-5 py-3.5">
                    <span className="font-medium text-foreground" style={{ fontSize: "13px" }}>
                      {v.product}
                    </span>
                  </td>

                  {/* Size */}
                  <td className="px-5 py-3.5">
                    <span
                      className="inline-flex items-center justify-center w-8 h-8 rounded-lg font-bold text-white shrink-0"
                      style={{ backgroundColor: "#501D2A", fontSize: "11px" }}
                    >
                      {v.size}
                    </span>
                  </td>

                  {/* Color */}
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-5 h-5 rounded-full border border-border/30 shrink-0"
                        style={{ backgroundColor: v.colorHex }}
                      />
                      <span className="text-foreground" style={{ fontSize: "13px" }}>
                        {v.color}
                      </span>
                    </div>
                  </td>

                  {/* SKU */}
                  <td className="px-5 py-3.5">
                    <span className="font-mono text-muted-foreground" style={{ fontSize: "12px" }}>
                      {v.sku}
                    </span>
                  </td>

                  {/* Price */}
                  <td className="px-5 py-3.5">
                    <span className="font-medium text-foreground" style={{ fontSize: "13px" }}>
                      ৳ {v.price.toLocaleString()}
                    </span>
                  </td>

                  {/* Stock */}
                  <td className="px-5 py-3.5">
                    <span
                      className={
                        v.stock === 0
                          ? "text-red-500 font-medium"
                          : v.stock <= 5
                          ? "text-amber-600 font-medium"
                          : "text-foreground"
                      }
                      style={{ fontSize: "13px" }}
                    >
                      {v.stock === 0 ? "Out of stock" : `${v.stock} units`}
                    </span>
                  </td>

                  {/* Status toggle */}
                  <td className="px-5 py-3.5">
                    <ActiveToggle
                      active={v.isActive}
                      onChange={() => toggleVariantActive(v.id)}
                    />
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1">
                      <button className="p-1.5 rounded-lg hover:bg-[#F0EDEF] transition-colors text-muted-foreground hover:text-foreground">
                        <Pencil className="w-3.5 h-3.5" strokeWidth={1.5} />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-red-50 transition-colors text-muted-foreground hover:text-red-600">
                        <Trash2 className="w-3.5 h-3.5" strokeWidth={1.5} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Add Variant Form ──────────────────────────────────────── */}
      {showForm && (
        <div className="bg-white rounded-xl border border-border/50 p-5">
          <div
            className="flex items-center gap-2 mb-5"
            style={{ borderBottom: "1px solid #F0EDEF", paddingBottom: "12px" }}
          >
            <Plus className="w-4 h-4" style={{ color: "#501D2A" }} strokeWidth={1.5} />
            <h2 className="font-semibold text-foreground" style={{ fontSize: "14px" }}>
              Add New Variant
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Product */}
            <div>
              <label className={LABEL_CLASS} style={{ fontSize: "12px" }}>
                Product <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  value={fProductId}
                  onChange={(e) => handleProductChange(e.target.value)}
                  className={INPUT_CLASS + " appearance-none pr-9"}
                  style={{ fontSize: "13px" }}
                >
                  <option value="">Select product</option>
                  {productOptions.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.label}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none"
                  strokeWidth={1.5}
                />
              </div>
            </div>

            {/* Size */}
            <div>
              <label className={LABEL_CLASS} style={{ fontSize: "12px" }}>
                Size <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  value={fSizeId}
                  onChange={(e) => handleSizeChange(e.target.value)}
                  className={INPUT_CLASS + " appearance-none pr-9"}
                  style={{ fontSize: "13px" }}
                >
                  <option value="">Select size</option>
                  {sizeOptions.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none"
                  strokeWidth={1.5}
                />
              </div>
            </div>

            {/* Color */}
            <div>
              <label className={LABEL_CLASS} style={{ fontSize: "12px" }}>
                Color <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  value={fColorId}
                  onChange={(e) => handleColorChange(e.target.value)}
                  className={INPUT_CLASS + " appearance-none pr-9"}
                  style={{ fontSize: "13px" }}
                >
                  <option value="">Select color</option>
                  {colorOptions.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none"
                  strokeWidth={1.5}
                />
              </div>
            </div>

            {/* SKU */}
            <div>
              <label className={LABEL_CLASS} style={{ fontSize: "12px" }}>
                SKU <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={fSku}
                onChange={(e) => { setFSkuEdited(true); setFSku(e.target.value) }}
                placeholder="PRODUCT-SIZE-COLOR"
                className={INPUT_CLASS + " font-mono"}
                style={{ fontSize: "13px" }}
              />
              <p className="text-muted-foreground mt-1" style={{ fontSize: "11px" }}>
                Auto-generated as PRODUCT-SIZE-COLOR
              </p>
            </div>

            {/* Price */}
            <div>
              <label className={LABEL_CLASS} style={{ fontSize: "12px" }}>
                Price (BDT) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  style={{ fontSize: "13px" }}
                >
                  ৳
                </span>
                <input
                  type="number"
                  value={fPrice}
                  onChange={(e) => setFPrice(e.target.value)}
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  className={INPUT_CLASS + " pl-7"}
                  style={{ fontSize: "13px" }}
                />
              </div>
            </div>

            {/* Stock */}
            <div>
              <label className={LABEL_CLASS} style={{ fontSize: "12px" }}>
                Initial Stock
              </label>
              <input
                type="number"
                value={fStock}
                onChange={(e) => setFStock(e.target.value)}
                placeholder="0"
                min="0"
                className={INPUT_CLASS}
                style={{ fontSize: "13px" }}
              />
            </div>
          </div>

          {/* isActive + submit row */}
          <div className="flex items-center justify-between mt-5 pt-4" style={{ borderTop: "1px solid #F0EDEF" }}>
            <label className="flex items-center gap-2.5 cursor-pointer">
              <ActiveToggle active={fIsActive} onChange={setFIsActive} />
              <span className="text-foreground" style={{ fontSize: "13px" }}>
                Active on creation
              </span>
            </label>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => {
                  setFProductId(""); setFSizeId(""); setFColorId(""); setFSku("")
                  setFSkuEdited(false); setFPrice(""); setFStock(""); setFIsActive(true)
                }}
                className="px-4 py-2.5 rounded-lg border border-border/60 text-muted-foreground hover:bg-[#F8F7F5] transition-colors text-sm"
              >
                Reset
              </button>
              <button
                type="button"
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-white text-sm hover:opacity-90 transition-opacity font-medium"
                style={{ backgroundColor: "#501D2A" }}
              >
                <Plus className="w-4 h-4" strokeWidth={1.5} />
                Add Variant
              </button>
            </div>
          </div>

          {/* Info note */}
          <div
            className="flex items-start gap-2.5 p-3.5 rounded-lg mt-4"
            style={{ backgroundColor: "#EFF6FF", border: "1px solid #BFDBFE" }}
          >
            <Info className="w-3.5 h-3.5 mt-0.5 shrink-0 text-blue-500" strokeWidth={1.5} />
            <p style={{ fontSize: "12px", color: "#1D4ED8" }}>
              Each variant requires a unique SKU. Price and stock are tracked individually per size/color combination.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
