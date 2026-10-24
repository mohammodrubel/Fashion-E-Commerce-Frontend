"use client"

import { useState } from "react"
import Link from "next/link"
import { PageHeader } from "@/components/admin/page-header"
import {
  Save, X, ChevronDown, Image as ImageIcon, Upload,
  Info, Plus, Trash2, Package
} from "lucide-react"

const INPUT = "w-full px-3 py-2.5 rounded-lg border border-border/60 bg-white text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
const LABEL = "block font-medium text-foreground mb-1.5"

function slugify(t: string) {
  return t.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_]+/g, "-").replace(/^-+|-+$/g, "")
}

type Status = "DRAFT" | "ACTIVE" | "INACTIVE"
interface Variant { id: number; sizeId: string; colorId: string; sku: string; price: string; stock: string }

const categories = [
  { value: "womens-clothing", label: "Women's Clothing" },
  { value: "mens-clothing", label: "Men's Clothing" },
  { value: "kids", label: "Kids" },
  { value: "accessories", label: "Accessories" },
  { value: "footwear", label: "Footwear" },
  { value: "sale", label: "Sale" },
]
const sizes = ["XS", "S", "M", "L", "XL", "XXL", "XXXL", "Free Size"]
const colors = [
  { name: "Black", hex: "#000000" }, { name: "White", hex: "#FFFFFF" },
  { name: "Red", hex: "#DC2626" }, { name: "Navy", hex: "#1e3a5f" },
  { name: "Beige", hex: "#F5F0EB" }, { name: "Olive", hex: "#6B7A2A" },
  { name: "Pink", hex: "#F472B6" }, { name: "Grey", hex: "#9CA3AF" },
  { name: "Brown", hex: "#92400E" }, { name: "Cream", hex: "#FFFDD0" },
]

const statusOpts: { value: Status; label: string; desc: string; color: string }[] = [
  { value: "DRAFT", label: "Draft", desc: "Save without publishing", color: "bg-amber-50 text-amber-700" },
  { value: "ACTIVE", label: "Active", desc: "Visible to customers", color: "bg-emerald-50 text-emerald-700" },
  { value: "INACTIVE", label: "Inactive", desc: "Hidden from store", color: "bg-gray-100 text-gray-500" },
]

let vid = 1
function newVariant(): Variant {
  return { id: vid++, sizeId: "", colorId: "", sku: "", price: "", stock: "" }
}

export default function NewProductPage() {
  const [name, setName] = useState("")
  const [slug, setSlug] = useState("")
  const [slugEdited, setSlugEdited] = useState(false)
  const [description, setDescription] = useState("")
  const [status, setStatus] = useState<Status>("DRAFT")
  const [categoryId, setCategoryId] = useState("")
  const [variants, setVariants] = useState<Variant[]>([newVariant()])

  function handleName(val: string) {
    setName(val)
    if (!slugEdited) setSlug(slugify(val))
  }

  function addVariant() {
    setVariants((v) => [...v, newVariant()])
  }

  function removeVariant(id: number) {
    setVariants((v) => v.filter((x) => x.id !== id))
  }

  function updateVariant(id: number, field: keyof Variant, val: string) {
    setVariants((v) =>
      v.map((x) => {
        if (x.id !== id) return x
        const updated = { ...x, [field]: val }
        // auto-generate SKU from product name + size + color
        if (field === "sizeId" || field === "colorId") {
          const prefix = name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 4)
          const s = field === "sizeId" ? val : updated.sizeId
          const c = field === "colorId" ? val : updated.colorId
          if (s && c) updated.sku = `${prefix}-${s}-${c.slice(0, 3).toUpperCase()}`
        }
        return updated
      })
    )
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Add New Product"
        description="Create a new product with variants"
        breadcrumbs={[
          { label: "Admin", href: "/admin" },
          { label: "Products", href: "/admin/products" },
          { label: "New Product" },
        ]}
        actions={
          <div className="flex items-center gap-2">
            <Link
              href="/admin/products"
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border/60 bg-white hover:bg-[#F8F7F5] transition-colors text-muted-foreground"
              style={{ fontSize: "13px" }}
            >
              <X className="w-4 h-4" strokeWidth={1.5} /> Discard
            </Link>
            <button
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-white hover:opacity-90 transition-opacity"
              style={{ backgroundColor: "#501D2A", fontSize: "13px" }}
            >
              <Save className="w-4 h-4" strokeWidth={1.5} /> Create Product
            </button>
          </div>
        }
      />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* ── Left 2/3 ── */}
        <div className="xl:col-span-2 space-y-5">

          {/* Basic Info */}
          <div className="bg-white rounded-xl border border-border/50 p-5">
            <h2 className="font-semibold text-foreground mb-4 pb-3" style={{ fontSize: "14px", borderBottom: "1px solid #F0EDEF" }}>
              Basic Information
            </h2>
            <div className="space-y-4">
              <div>
                <label className={LABEL} style={{ fontSize: "12px" }}>
                  Product Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => handleName(e.target.value)}
                  placeholder="e.g. Classic Cotton T-Shirt"
                  className={INPUT}
                  style={{ fontSize: "13px" }}
                />
              </div>

              <div>
                <label className={LABEL} style={{ fontSize: "12px" }}>Slug</label>
                <div className="relative">
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => { setSlugEdited(true); setSlug(e.target.value) }}
                    placeholder="classic-cotton-t-shirt"
                    className={INPUT + " font-mono pr-28"}
                    style={{ fontSize: "13px" }}
                  />
                  {!slugEdited && name && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/60 pointer-events-none" style={{ fontSize: "11px" }}>
                      auto-generated
                    </span>
                  )}
                </div>
                <p className="mt-1 text-muted-foreground" style={{ fontSize: "11px" }}>Used in product URL</p>
              </div>

              <div>
                <label className={LABEL} style={{ fontSize: "12px" }}>Description</label>
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the product..."
                  className={INPUT + " resize-none"}
                  style={{ fontSize: "13px" }}
                />
              </div>
            </div>
          </div>

          {/* Variants (ProductVariant model) */}
          <div className="bg-white rounded-xl border border-border/50 p-5">
            <div className="flex items-center justify-between mb-4 pb-3" style={{ borderBottom: "1px solid #F0EDEF" }}>
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4" style={{ color: "#501D2A" }} strokeWidth={1.5} />
                <h2 className="font-semibold text-foreground" style={{ fontSize: "14px" }}>Variants & Pricing</h2>
              </div>
              <button
                onClick={addVariant}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border/60 hover:bg-[#F8F7F5] transition-colors"
                style={{ fontSize: "12px" }}
              >
                <Plus className="w-3.5 h-3.5" strokeWidth={2} /> Add Variant
              </button>
            </div>

            <div
              className="mb-3 flex items-start gap-2 px-3 py-2.5 rounded-lg"
              style={{ backgroundColor: "#F0EDEF", fontSize: "12px" }}
            >
              <Info className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: "#501D2A" }} strokeWidth={1.5} />
              <span className="text-foreground">Each variant has its own SKU, price (BDT), and stock. Size & Color must exist in the system.</span>
            </div>

            <div className="space-y-3">
              {variants.map((v, i) => (
                <div
                  key={v.id}
                  className="rounded-lg border border-border/50 p-4"
                  style={{ backgroundColor: "#FAFAFA" }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-medium text-muted-foreground" style={{ fontSize: "12px" }}>
                      Variant {i + 1}
                    </span>
                    {variants.length > 1 && (
                      <button
                        onClick={() => removeVariant(v.id)}
                        className="text-muted-foreground/50 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" strokeWidth={1.5} />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {/* Size */}
                    <div>
                      <label className={LABEL} style={{ fontSize: "11px" }}>Size <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <select
                          value={v.sizeId}
                          onChange={(e) => updateVariant(v.id, "sizeId", e.target.value)}
                          className={INPUT + " appearance-none pr-7"}
                          style={{ fontSize: "13px" }}
                        >
                          <option value="">Select</option>
                          {sizes.map((s) => <option key={s} value={s}>{s}</option>)}
                        </select>
                        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" strokeWidth={1.5} />
                      </div>
                    </div>

                    {/* Color */}
                    <div>
                      <label className={LABEL} style={{ fontSize: "11px" }}>Color <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <select
                          value={v.colorId}
                          onChange={(e) => updateVariant(v.id, "colorId", e.target.value)}
                          className={INPUT + " appearance-none pr-7"}
                          style={{ fontSize: "13px" }}
                        >
                          <option value="">Select</option>
                          {colors.map((c) => (
                            <option key={c.name} value={c.name}>{c.name}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" strokeWidth={1.5} />
                      </div>
                    </div>

                    {/* SKU */}
                    <div>
                      <label className={LABEL} style={{ fontSize: "11px" }}>SKU <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        value={v.sku}
                        onChange={(e) => updateVariant(v.id, "sku", e.target.value)}
                        placeholder="e.g. TEE-S-BLK"
                        className={INPUT + " font-mono"}
                        style={{ fontSize: "12px" }}
                      />
                    </div>

                    {/* Price */}
                    <div>
                      <label className={LABEL} style={{ fontSize: "11px" }}>Price (BDT) <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium" style={{ fontSize: "13px" }}>৳</span>
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={v.price}
                          onChange={(e) => updateVariant(v.id, "price", e.target.value)}
                          placeholder="0.00"
                          className={INPUT + " pl-7"}
                          style={{ fontSize: "13px" }}
                        />
                      </div>
                    </div>

                    {/* Stock */}
                    <div>
                      <label className={LABEL} style={{ fontSize: "11px" }}>Initial Stock <span className="text-red-500">*</span></label>
                      <input
                        type="number"
                        min="0"
                        value={v.stock}
                        onChange={(e) => updateVariant(v.id, "stock", e.target.value)}
                        placeholder="0"
                        className={INPUT}
                        style={{ fontSize: "13px" }}
                      />
                    </div>

                    {/* Color swatch preview */}
                    {v.colorId && (
                      <div className="flex items-end pb-1">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-8 h-8 rounded-full border-2 border-white shadow"
                            style={{
                              backgroundColor: colors.find((c) => c.name === v.colorId)?.hex ?? "#ccc",
                            }}
                          />
                          <span className="text-muted-foreground" style={{ fontSize: "11px" }}>{v.colorId}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={addVariant}
              className="mt-3 w-full py-2.5 rounded-lg border-2 border-dashed border-border/50 text-muted-foreground hover:border-primary/30 hover:text-foreground transition-colors flex items-center justify-center gap-2"
              style={{ fontSize: "13px" }}
            >
              <Plus className="w-4 h-4" strokeWidth={1.5} /> Add Another Variant
            </button>
          </div>

          {/* Images */}
          <div className="bg-white rounded-xl border border-border/50 p-5">
            <div className="flex items-center gap-2 mb-4 pb-3" style={{ borderBottom: "1px solid #F0EDEF" }}>
              <ImageIcon className="w-4 h-4" style={{ color: "#501D2A" }} strokeWidth={1.5} />
              <h2 className="font-semibold text-foreground" style={{ fontSize: "14px" }}>Product Images</h2>
            </div>
            <div
              className="border-2 border-dashed rounded-xl p-8 text-center cursor-pointer hover:border-primary/40 transition-colors"
              style={{ borderColor: "#E5E0DC", backgroundColor: "#F8F7F5" }}
            >
              <div className="w-10 h-10 rounded-xl mx-auto mb-3 flex items-center justify-center" style={{ backgroundColor: "#F0EDEF" }}>
                <Upload className="w-5 h-5" style={{ color: "#501D2A" }} strokeWidth={1.5} />
              </div>
              <p className="font-medium text-foreground" style={{ fontSize: "13px" }}>Drop images here or click to upload</p>
              <p className="text-muted-foreground mt-1" style={{ fontSize: "11px" }}>PNG, JPG, WebP · Max 5 MB · Up to 10 images</p>
              <button type="button" className="mt-3 px-4 py-2 rounded-lg border border-border/60 bg-white hover:bg-[#F0EDEF] transition-colors" style={{ fontSize: "12px" }}>
                Browse Files
              </button>
            </div>
            <p className="mt-2 text-muted-foreground" style={{ fontSize: "11px" }}>
              Images can also be managed from the{" "}
              <Link href="/admin/products/images" className="underline hover:opacity-70" style={{ color: "#501D2A" }}>
                Images & Gallery
              </Link>{" "}
              page after creating the product.
            </p>
          </div>
        </div>

        {/* ── Right 1/3 ── */}
        <div className="xl:col-span-1 space-y-5">

          {/* Status */}
          <div className="bg-white rounded-xl border border-border/50 p-5">
            <h2 className="font-semibold text-foreground mb-3" style={{ fontSize: "14px" }}>Status</h2>
            <div className="space-y-2">
              {statusOpts.map((opt) => (
                <label
                  key={opt.value}
                  onClick={() => setStatus(opt.value)}
                  className="flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors hover:bg-[#F8F7F5]"
                  style={{
                    border: status === opt.value ? "1px solid #E5E0DC" : "1px solid transparent",
                    backgroundColor: status === opt.value ? "#F8F7F5" : undefined,
                  }}
                >
                  <div
                    className="mt-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0"
                    style={{ borderColor: status === opt.value ? "#501D2A" : "#D1D5DB" }}
                  >
                    {status === opt.value && <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#501D2A" }} />}
                  </div>
                  <div>
                    <span className={`inline-flex rounded-full px-2 py-0.5 font-medium ${opt.color}`} style={{ fontSize: "11px" }}>
                      {opt.label}
                    </span>
                    <p className="text-muted-foreground mt-0.5" style={{ fontSize: "11px" }}>{opt.desc}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Category */}
          <div className="bg-white rounded-xl border border-border/50 p-5">
            <h2 className="font-semibold text-foreground mb-3" style={{ fontSize: "14px" }}>
              Category <span className="text-red-500">*</span>
            </h2>
            <div className="relative">
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className={INPUT + " appearance-none pr-8"}
                style={{ fontSize: "13px" }}
              >
                <option value="">Select category</option>
                {categories.map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" strokeWidth={1.5} />
            </div>
            <Link
              href="/admin/products/categories"
              className="flex items-center gap-1 mt-2 hover:opacity-80 transition-opacity"
              style={{ fontSize: "12px", color: "#501D2A" }}
            >
              <Plus className="w-3 h-3" strokeWidth={2} /> Add new category
            </Link>
          </div>

          {/* Summary */}
          <div className="bg-white rounded-xl border border-border/50 p-5">
            <h2 className="font-semibold text-foreground mb-3" style={{ fontSize: "14px" }}>Summary</h2>
            <div className="space-y-2">
              {[
                { label: "Variants added", value: `${variants.length}` },
                {
                  label: "Has price",
                  value: variants.some((v) => v.price) ? "Yes" : "No",
                  warn: !variants.some((v) => v.price),
                },
                {
                  label: "Category set",
                  value: categoryId ? categories.find((c) => c.value === categoryId)?.label ?? "—" : "Not set",
                  warn: !categoryId,
                },
                { label: "Status", value: status },
              ].map((row) => (
                <div key={row.label} className="flex items-center justify-between">
                  <span className="text-muted-foreground" style={{ fontSize: "12px" }}>{row.label}</span>
                  <span
                    className="font-medium"
                    style={{ fontSize: "12px", color: row.warn ? "#B42332" : "#501D2A" }}
                  >
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-2.5">
            <button
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-white font-medium hover:opacity-90 transition-opacity"
              style={{ backgroundColor: "#501D2A", fontSize: "13px" }}
            >
              <Save className="w-4 h-4" strokeWidth={1.5} /> Create Product
            </button>
            <button
              className="w-full py-2.5 rounded-lg border border-border/60 text-muted-foreground hover:bg-[#F8F7F5] transition-colors"
              style={{ fontSize: "13px" }}
            >
              Save as Draft
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
