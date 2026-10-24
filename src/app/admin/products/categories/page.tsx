"use client"

import { useState } from "react"
import Link from "next/link"
import { PageHeader } from "@/components/admin/page-header"
import { Plus, Pencil, Trash2, FolderOpen, Upload, ChevronRight } from "lucide-react"

const INPUT_CLASS =
  "w-full px-3 py-2.5 rounded-lg border border-border/60 bg-white text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"

const LABEL_CLASS = "block font-medium text-foreground mb-1.5"

interface Category {
  id: string
  name: string
  slug: string
  products: number
  isActive: boolean
}

const initialCategories: Category[] = [
  { id: "C01", name: "Women's Clothing", slug: "womens-clothing", products: 45, isActive: true },
  { id: "C02", name: "Men's Clothing", slug: "mens-clothing", products: 38, isActive: true },
  { id: "C03", name: "Kids", slug: "kids", products: 12, isActive: true },
  { id: "C04", name: "Accessories", slug: "accessories", products: 28, isActive: true },
  { id: "C05", name: "Footwear", slug: "footwear", products: 22, isActive: true },
  { id: "C06", name: "Sale", slug: "sale", products: 0, isActive: false },
]

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export default function CategoriesPage() {
  const [categories] = useState<Category[]>(initialCategories)
  const [formName, setFormName] = useState("")
  const [formSlug, setFormSlug] = useState("")
  const [formSlugEdited, setFormSlugEdited] = useState(false)
  const [formDescription, setFormDescription] = useState("")
  const [formImageUrl, setFormImageUrl] = useState("")
  const [formIsActive, setFormIsActive] = useState(true)

  function handleFormName(val: string) {
    setFormName(val)
    if (!formSlugEdited) setFormSlug(slugify(val))
  }

  function handleFormSlug(val: string) {
    setFormSlugEdited(true)
    setFormSlug(val)
  }

  return (
    <div className="space-y-6" style={{ backgroundColor: "#F8F7F5", minHeight: "100%" }}>
      <PageHeader
        title="Product Categories"
        description="Organise your products into categories"
        breadcrumbs={[
          { label: "Admin", href: "/admin" },
          { label: "Products", href: "/admin/products" },
          { label: "Categories" },
        ]}
        actions={
          <button
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-white text-sm hover:opacity-90 transition-opacity"
            style={{ backgroundColor: "#501D2A" }}
          >
            <Plus className="w-4 h-4" strokeWidth={1.5} />
            Add Category
          </button>
        }
      />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* ── Left panel: Table (2/3) ─────────────────────────── */}
        <div className="xl:col-span-2 bg-white rounded-xl border border-border/50">
          <div
            className="flex items-center justify-between px-5 py-4"
            style={{ borderBottom: "1px solid #F0EDEF" }}
          >
            <div>
              <h2 className="font-semibold text-foreground" style={{ fontSize: "14px" }}>
                All Categories
              </h2>
              <p className="text-muted-foreground" style={{ fontSize: "12px" }}>
                {categories.length} categories total
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: "1px solid #F0EDEF" }}>
                  {["Name", "Slug", "Products", "Status", "Actions"].map((h) => (
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
                {categories.map((cat, i) => (
                  <tr
                    key={cat.id}
                    className="hover:bg-[#F8F7F5] transition-colors"
                    style={{
                      borderBottom: i < categories.length - 1 ? "1px solid #F0EDEF" : "none",
                    }}
                  >
                    {/* Name */}
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                          style={{ backgroundColor: "#F0EDEF" }}
                        >
                          <FolderOpen
                            className="w-4 h-4"
                            style={{ color: "#501D2A" }}
                            strokeWidth={1.5}
                          />
                        </div>
                        <div>
                          <p className="font-medium text-foreground" style={{ fontSize: "13px" }}>
                            {cat.name}
                          </p>
                          <p className="text-muted-foreground" style={{ fontSize: "11px" }}>
                            ID: {cat.id}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Slug */}
                    <td className="px-5 py-3.5">
                      <span className="font-mono text-muted-foreground" style={{ fontSize: "12px" }}>
                        {cat.slug}
                      </span>
                    </td>

                    {/* Products */}
                    <td className="px-5 py-3.5">
                      <span className="text-foreground" style={{ fontSize: "13px" }}>
                        {cat.products} products
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-5 py-3.5">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 font-medium ${
                          cat.isActive
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-gray-100 text-gray-500"
                        }`}
                        style={{ fontSize: "11px" }}
                      >
                        {cat.isActive ? "Active" : "Inactive"}
                      </span>
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
                        <button className="p-1.5 rounded-lg hover:bg-[#F0EDEF] transition-colors text-muted-foreground hover:text-foreground">
                          <ChevronRight className="w-3.5 h-3.5" strokeWidth={1.5} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Right panel: Form (1/3) ──────────────────────────── */}
        <div className="xl:col-span-1">
          <div className="bg-white rounded-xl border border-border/50 p-5">
            <h2 className="font-semibold text-foreground mb-5" style={{ fontSize: "14px" }}>
              Add New Category
            </h2>

            <div className="space-y-4">
              {/* Name */}
              <div>
                <label className={LABEL_CLASS} style={{ fontSize: "12px" }}>
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formName}
                  onChange={(e) => handleFormName(e.target.value)}
                  placeholder="e.g. Women's Clothing"
                  className={INPUT_CLASS}
                  style={{ fontSize: "13px" }}
                />
              </div>

              {/* Slug */}
              <div>
                <label className={LABEL_CLASS} style={{ fontSize: "12px" }}>
                  Slug
                </label>
                <input
                  type="text"
                  value={formSlug}
                  onChange={(e) => handleFormSlug(e.target.value)}
                  placeholder="womens-clothing"
                  className={INPUT_CLASS + " font-mono"}
                  style={{ fontSize: "13px" }}
                />
                <p className="text-muted-foreground mt-1" style={{ fontSize: "11px" }}>
                  Auto-generated from name
                </p>
              </div>

              {/* Description */}
              <div>
                <label className={LABEL_CLASS} style={{ fontSize: "12px" }}>
                  Description
                </label>
                <textarea
                  rows={3}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Brief category description..."
                  className={INPUT_CLASS + " resize-none"}
                  style={{ fontSize: "13px" }}
                />
              </div>

              {/* Image URL */}
              <div>
                <label className={LABEL_CLASS} style={{ fontSize: "12px" }}>
                  Image URL{" "}
                  <span className="text-muted-foreground font-normal">(optional)</span>
                </label>
                <input
                  type="text"
                  value={formImageUrl}
                  onChange={(e) => setFormImageUrl(e.target.value)}
                  placeholder="https://..."
                  className={INPUT_CLASS}
                  style={{ fontSize: "13px" }}
                />
                <p className="text-muted-foreground mt-1" style={{ fontSize: "11px" }}>
                  or upload a file below
                </p>

                {/* Upload area */}
                <div
                  className="mt-2 flex items-center gap-3 p-3 rounded-lg border border-dashed border-border/60 cursor-pointer hover:border-primary/40 transition-colors"
                  style={{ backgroundColor: "#F8F7F5" }}
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                    style={{ backgroundColor: "#F0EDEF" }}
                  >
                    <Upload className="w-3.5 h-3.5" style={{ color: "#501D2A" }} strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="font-medium text-foreground" style={{ fontSize: "12px" }}>
                      Upload image
                    </p>
                    <p className="text-muted-foreground" style={{ fontSize: "11px" }}>
                      PNG, JPG · Max 2 MB
                    </p>
                  </div>
                </div>
              </div>

              {/* isActive toggle */}
              <div>
                <label className={LABEL_CLASS} style={{ fontSize: "12px" }}>
                  Status
                </label>
                <div className="flex items-center gap-4">
                  {[
                    { label: "Active", value: true },
                    { label: "Inactive", value: false },
                  ].map((opt) => (
                    <label key={String(opt.value)} className="flex items-center gap-2 cursor-pointer">
                      <div
                        className="w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors"
                        style={{
                          borderColor: formIsActive === opt.value ? "#501D2A" : "#D1D5DB",
                        }}
                        onClick={() => setFormIsActive(opt.value)}
                      >
                        {formIsActive === opt.value && (
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#501D2A" }} />
                        )}
                      </div>
                      <span className="text-foreground" style={{ fontSize: "13px" }}>
                        {opt.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Submit */}
              <button
                className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-lg text-white text-sm hover:opacity-90 transition-opacity font-medium mt-2"
                style={{ backgroundColor: "#501D2A" }}
              >
                <Plus className="w-4 h-4" strokeWidth={1.5} />
                Save Category
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
