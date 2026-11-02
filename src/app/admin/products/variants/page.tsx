"use client"

import { useMemo, useState } from "react"
import { toast } from "sonner"
import { PageHeader } from "@/components/admin/page-header"
import { Plus, Trash2, ChevronDown, Info, X, Loader2 } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { TableSkeletonRows } from "@/components/admin/table-skeleton-rows"
import { useGetAllProductsQuery, useUpdateProductMutation } from "@/redux/fetchers/product/productApi"
import { useGetAllSizesQuery } from "@/redux/fetchers/size/sizeApi"
import { useGetAllColorsQuery } from "@/redux/fetchers/color/colorApi"

const INPUT_CLASS =
  "w-full px-3 py-2.5 rounded-lg border border-border/60 bg-white text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"

const LABEL_CLASS = "block font-medium text-foreground mb-1.5"

function ActiveToggle({ active, onChange, disabled }: { active: boolean; onChange: (v: boolean) => void; disabled?: boolean }) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => onChange(!active)}
      className="relative inline-flex h-5 w-9 items-center rounded-full transition-colors shrink-0 disabled:opacity-50"
      style={{ backgroundColor: active ? "#501D2A" : "#D1D5DB" }}
    >
      <span
        className="inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform"
        style={{ transform: active ? "translateX(18px)" : "translateX(2px)" }}
      />
    </button>
  )
}

export default function VariantsPage() {
  const { data: productsData, isLoading } = useGetAllProductsQuery({ page: 1, limit: 100, sort: "name", order: "asc" })
  const { data: sizesData } = useGetAllSizesQuery(undefined)
  const { data: colorsData } = useGetAllColorsQuery(undefined)
  const [updateProduct, { isLoading: isSaving }] = useUpdateProductMutation()

  const products = productsData?.data ?? []
  const sizes = sizesData?.data ?? []
  const colors = colorsData?.data ?? []

  const rows = useMemo(
    () =>
      products.flatMap((p: any) =>
        (p.variants ?? []).map((v: any) => ({
          ...v,
          productId: p.id,
          productName: p.name,
        })),
      ),
    [products],
  )

  const [showForm, setShowForm] = useState(false)
  const [fProductId, setFProductId] = useState("")
  const [fSizeId, setFSizeId] = useState("")
  const [fColorId, setFColorId] = useState("")
  const [fSku, setFSku] = useState("")
  const [fSkuEdited, setFSkuEdited] = useState(false)
  const [fPrice, setFPrice] = useState("")
  const [fStock, setFStock] = useState("")
  const [fIsActive, setFIsActive] = useState(true)

  function autoSku(productId: string, sizeId: string, colorId: string) {
    const p = products.find((x: any) => x.id === productId)
    const s = sizes.find((x: any) => x.id === sizeId)
    const c = colors.find((x: any) => x.id === colorId)
    if (!p || !s || !c) return ""
    const pCode = String(p.name).split(" ").map((w: string) => w[0]).join("").toUpperCase().slice(0, 6)
    return `${pCode}-${s.name.toUpperCase()}-${c.name.slice(0, 3).toUpperCase()}`
  }

  function updateSku(productId: string, sizeId: string, colorId: string) {
    if (!fSkuEdited) setFSku(autoSku(productId, sizeId, colorId))
  }

  function resetForm() {
    setFProductId(""); setFSizeId(""); setFColorId(""); setFSku("")
    setFSkuEdited(false); setFPrice(""); setFStock(""); setFIsActive(true)
  }

  async function handleAddVariant() {
    if (!fProductId || !fSizeId || !fColorId || !fSku.trim() || !fPrice) {
      toast.error("Product, size, color, SKU and price are required")
      return
    }
    const formData = new FormData()
    formData.append(
      "variants",
      JSON.stringify([
        {
          sizeId: fSizeId,
          colorId: fColorId,
          sku: fSku.trim(),
          price: Number(fPrice),
          stock: Number(fStock || 0),
          isActive: fIsActive,
        },
      ]),
    )
    try {
      await updateProduct({ id: fProductId, data: formData }).unwrap()
      toast.success("Variant added successfully")
      resetForm()
      setShowForm(false)
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to add variant.")
    }
  }

  async function toggleVariantActive(row: any) {
    const formData = new FormData()
    formData.append(
      "variants",
      JSON.stringify([
        {
          id: row.id,
          sizeId: row.sizeId,
          colorId: row.colorId,
          sku: row.sku,
          price: Number(row.price),
          stock: row.stock,
          isActive: !row.isActive,
        },
      ]),
    )
    try {
      await updateProduct({ id: row.productId, data: formData }).unwrap()
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update variant.")
    }
  }

  async function handleDeleteVariant(row: any) {
    if (!confirm(`Delete variant ${row.sku}? This cannot be undone.`)) return
    const formData = new FormData()
    formData.append("removeVariantIds", JSON.stringify([row.id]))
    try {
      await updateProduct({ id: row.productId, data: formData }).unwrap()
      toast.success("Variant deleted successfully")
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to delete variant.")
    }
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
        <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid #F0EDEF" }}>
          <div>
            <h2 className="font-semibold text-foreground" style={{ fontSize: "14px" }}>All Variants</h2>
            <p className="text-muted-foreground" style={{ fontSize: "12px" }}>
              {isLoading ? <Skeleton className="h-3 w-48" /> : `${rows.length} variants across ${products.length} products`}
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid #F0EDEF" }}>
                {["Product", "Size", "Color", "SKU", "Price", "Stock", "Status", "Actions"].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-muted-foreground font-medium whitespace-nowrap" style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.07em" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {isLoading && <TableSkeletonRows columns={8} />}
              {!isLoading && rows.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-5 py-8 text-center text-muted-foreground" style={{ fontSize: "13px" }}>
                    No variants yet. Add one from the form, or create a product with variants.
                  </td>
                </tr>
              )}
              {rows.map((v: any, i: number) => (
                <tr
                  key={v.id}
                  className="hover:bg-[#F8F7F5] transition-colors"
                  style={{ borderBottom: i < rows.length - 1 ? "1px solid #F0EDEF" : "none" }}
                >
                  <td className="px-5 py-3.5">
                    <span className="font-medium text-foreground" style={{ fontSize: "13px" }}>{v.productName}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg font-bold text-white shrink-0" style={{ backgroundColor: "#501D2A", fontSize: "11px" }}>
                      {v.size?.name}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full border border-border/30 shrink-0" style={{ backgroundColor: v.color?.hexCode || "#ccc" }} />
                      <span className="text-foreground" style={{ fontSize: "13px" }}>{v.color?.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="font-mono text-muted-foreground" style={{ fontSize: "12px" }}>{v.sku}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="font-medium text-foreground" style={{ fontSize: "13px" }}>{Number(v.price).toFixed(2)}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={v.stock === 0 ? "text-red-500 font-medium" : v.stock <= 5 ? "text-amber-600 font-medium" : "text-foreground"} style={{ fontSize: "13px" }}>
                      {v.stock === 0 ? "Out of stock" : `${v.stock} units`}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <ActiveToggle active={v.isActive} disabled={isSaving} onChange={() => toggleVariantActive(v)} />
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleDeleteVariant(v)}
                        disabled={isSaving}
                        className="p-1.5 rounded-lg hover:bg-red-50 transition-colors text-muted-foreground hover:text-red-600 disabled:opacity-50"
                      >
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
          <div className="flex items-center gap-2 mb-5" style={{ borderBottom: "1px solid #F0EDEF", paddingBottom: "12px" }}>
            <Plus className="w-4 h-4" style={{ color: "#501D2A" }} strokeWidth={1.5} />
            <h2 className="font-semibold text-foreground" style={{ fontSize: "14px" }}>Add New Variant</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className={LABEL_CLASS} style={{ fontSize: "12px" }}>Product <span className="text-red-500">*</span></label>
              <div className="relative">
                <select
                  value={fProductId}
                  onChange={(e) => { setFProductId(e.target.value); updateSku(e.target.value, fSizeId, fColorId) }}
                  className={INPUT_CLASS + " appearance-none pr-9"}
                  style={{ fontSize: "13px" }}
                >
                  <option value="">Select product</option>
                  {products.map((p: any) => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" strokeWidth={1.5} />
              </div>
            </div>

            <div>
              <label className={LABEL_CLASS} style={{ fontSize: "12px" }}>Size <span className="text-red-500">*</span></label>
              <div className="relative">
                <select
                  value={fSizeId}
                  onChange={(e) => { setFSizeId(e.target.value); updateSku(fProductId, e.target.value, fColorId) }}
                  className={INPUT_CLASS + " appearance-none pr-9"}
                  style={{ fontSize: "13px" }}
                >
                  <option value="">Select size</option>
                  {sizes.map((s: any) => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" strokeWidth={1.5} />
              </div>
            </div>

            <div>
              <label className={LABEL_CLASS} style={{ fontSize: "12px" }}>Color <span className="text-red-500">*</span></label>
              <div className="relative">
                <select
                  value={fColorId}
                  onChange={(e) => { setFColorId(e.target.value); updateSku(fProductId, fSizeId, e.target.value) }}
                  className={INPUT_CLASS + " appearance-none pr-9"}
                  style={{ fontSize: "13px" }}
                >
                  <option value="">Select color</option>
                  {colors.map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" strokeWidth={1.5} />
              </div>
            </div>

            <div>
              <label className={LABEL_CLASS} style={{ fontSize: "12px" }}>SKU <span className="text-red-500">*</span></label>
              <input
                type="text"
                value={fSku}
                onChange={(e) => { setFSkuEdited(true); setFSku(e.target.value) }}
                placeholder="PRODUCT-SIZE-COLOR"
                className={INPUT_CLASS + " font-mono"}
                style={{ fontSize: "13px" }}
              />
            </div>

            <div>
              <label className={LABEL_CLASS} style={{ fontSize: "12px" }}>Price <span className="text-red-500">*</span></label>
              <input
                type="number" min="0" step="0.01"
                value={fPrice}
                onChange={(e) => setFPrice(e.target.value)}
                placeholder="0.00"
                className={INPUT_CLASS}
                style={{ fontSize: "13px" }}
              />
            </div>

            <div>
              <label className={LABEL_CLASS} style={{ fontSize: "12px" }}>Initial Stock</label>
              <input
                type="number" min="0"
                value={fStock}
                onChange={(e) => setFStock(e.target.value)}
                placeholder="0"
                className={INPUT_CLASS}
                style={{ fontSize: "13px" }}
              />
            </div>
          </div>

          <div className="flex items-center justify-between mt-5 pt-4" style={{ borderTop: "1px solid #F0EDEF" }}>
            <label className="flex items-center gap-2.5 cursor-pointer">
              <ActiveToggle active={fIsActive} onChange={setFIsActive} />
              <span className="text-foreground" style={{ fontSize: "13px" }}>Active on creation</span>
            </label>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2.5 rounded-lg border border-border/60 text-muted-foreground hover:bg-[#F8F7F5] transition-colors text-sm"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={handleAddVariant}
                disabled={isSaving}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-white text-sm hover:opacity-90 transition-opacity font-medium disabled:opacity-60"
                style={{ backgroundColor: "#501D2A" }}
              >
                {isSaving ? <Loader2 className="w-4 h-4 animate-spin" strokeWidth={1.5} /> : <Plus className="w-4 h-4" strokeWidth={1.5} />}
                Add Variant
              </button>
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-3.5 rounded-lg mt-4" style={{ backgroundColor: "#EFF6FF", border: "1px solid #BFDBFE" }}>
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
