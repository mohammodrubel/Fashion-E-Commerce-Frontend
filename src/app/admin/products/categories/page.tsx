"use client"

import { useRef, useState } from "react"
import { toast } from "sonner"
import { PageHeader } from "@/components/admin/page-header"
import { Plus, Pencil, Trash2, FolderOpen, Upload, X, Loader2 } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { TableSkeletonRows } from "@/components/admin/table-skeleton-rows"
import {
  useGetAllCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} from "@/redux/fetchers/category/categoryApi"

const INPUT_CLASS =
  "w-full px-3 py-2.5 rounded-lg border border-border/60 bg-white text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"

const LABEL_CLASS = "block font-medium text-foreground mb-1.5"

interface Category {
  id: string
  name: string
  slug: string
  description: string | null
  image: string | null
  isActive: boolean
  products: number
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export default function CategoriesPage() {
  const { data, isLoading, isFetching } = useGetAllCategoriesQuery(undefined)
  const [createCategory, { isLoading: isCreating }] = useCreateCategoryMutation()
  const [updateCategory, { isLoading: isUpdating }] = useUpdateCategoryMutation()
  const [deleteCategory, { isLoading: isDeleting }] = useDeleteCategoryMutation()

  const categories: Category[] = (data?.data ?? []).map((c: any) => ({
    id: c.id,
    name: c.name,
    slug: c.slug,
    description: c.description,
    image: c.image,
    isActive: c.isActive,
    products: c._count?.products ?? 0,
  }))

  const fileInputRef = useRef<HTMLInputElement>(null)

  const [formName, setFormName] = useState("")
  const [formSlug, setFormSlug] = useState("")
  const [formSlugEdited, setFormSlugEdited] = useState(false)
  const [formDescription, setFormDescription] = useState("")
  const [formIsActive, setFormIsActive] = useState(true)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)

  const isSaving = isCreating || isUpdating

  function handleFormName(val: string) {
    setFormName(val)
    if (!formSlugEdited) setFormSlug(slugify(val))
  }

  function handleFormSlug(val: string) {
    setFormSlugEdited(true)
    setFormSlug(val)
  }

  function handleImagePick(file: File | null) {
    setImageFile(file)
    if (file) {
      setImagePreview(URL.createObjectURL(file))
    }
  }

  function startEdit(cat: Category) {
    setEditingId(cat.id)
    setFormName(cat.name)
    setFormSlug(cat.slug)
    setFormSlugEdited(true)
    setFormDescription(cat.description || "")
    setFormIsActive(cat.isActive)
    setImageFile(null)
    setImagePreview(cat.image || null)
  }

  function resetForm() {
    setEditingId(null)
    setFormName("")
    setFormSlug("")
    setFormSlugEdited(false)
    setFormDescription("")
    setFormIsActive(true)
    setImageFile(null)
    setImagePreview(null)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  async function handleSubmit() {
    const name = formName.trim()
    if (!name) {
      toast.error("Category name is required")
      return
    }

    const formData = new FormData()
    formData.append("name", name)
    if (formSlug.trim()) formData.append("slug", formSlug.trim())
    if (formDescription.trim()) formData.append("description", formDescription.trim())
    formData.append("isActive", String(formIsActive))
    if (imageFile) formData.append("image", imageFile)

    try {
      if (editingId) {
        await updateCategory({ id: editingId, data: formData }).unwrap()
        toast.success("Category updated successfully")
      } else {
        await createCategory(formData).unwrap()
        toast.success("Category created successfully")
      }
      resetForm()
    } catch (err: any) {
      toast.error(err?.data?.message || "Something went wrong. Please try again.")
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this category? This cannot be undone.")) return

    try {
      await deleteCategory(id).unwrap()
      toast.success("Category deleted successfully")
      if (editingId === id) resetForm()
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to delete category.")
    }
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
                {isLoading ? <Skeleton className="h-3 w-28" /> : `${categories.length} categories total`}
              </p>
            </div>
            {isFetching && !isLoading && (
              <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" strokeWidth={1.5} />
            )}
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
                {isLoading && <TableSkeletonRows columns={5} />}
                {!isLoading && categories.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-5 py-8 text-center text-muted-foreground"
                      style={{ fontSize: "13px" }}
                    >
                      No categories yet. Add one from the form.
                    </td>
                  </tr>
                )}
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
                          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 overflow-hidden"
                          style={{ backgroundColor: "#F0EDEF" }}
                        >
                          {cat.image ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
                          ) : (
                            <FolderOpen
                              className="w-4 h-4"
                              style={{ color: "#501D2A" }}
                              strokeWidth={1.5}
                            />
                          )}
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
                        <button
                          onClick={() => startEdit(cat)}
                          className="p-1.5 rounded-lg hover:bg-[#F0EDEF] transition-colors text-muted-foreground hover:text-foreground"
                        >
                          <Pencil className="w-3.5 h-3.5" strokeWidth={1.5} />
                        </button>
                        <button
                          onClick={() => handleDelete(cat.id)}
                          disabled={isDeleting}
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

        {/* ── Right panel: Form (1/3) ──────────────────────────── */}
        <div className="xl:col-span-1">
          <div className="bg-white rounded-xl border border-border/50 p-5">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-semibold text-foreground" style={{ fontSize: "14px" }}>
                {editingId ? "Edit Category" : "Add New Category"}
              </h2>
              {editingId && (
                <button
                  onClick={resetForm}
                  className="p-1 rounded-lg hover:bg-[#F0EDEF] transition-colors text-muted-foreground hover:text-foreground"
                >
                  <X className="w-3.5 h-3.5" strokeWidth={1.5} />
                </button>
              )}
            </div>

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

              {/* Image upload */}
              <div>
                <label className={LABEL_CLASS} style={{ fontSize: "12px" }}>
                  Image <span className="text-muted-foreground font-normal">(optional)</span>
                </label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleImagePick(e.target.files?.[0] || null)}
                />
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-3 p-3 rounded-lg border border-dashed border-border/60 cursor-pointer hover:border-primary/40 transition-colors"
                  style={{ backgroundColor: "#F8F7F5" }}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 overflow-hidden"
                    style={{ backgroundColor: "#F0EDEF" }}
                  >
                    {imagePreview ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <Upload className="w-3.5 h-3.5" style={{ color: "#501D2A" }} strokeWidth={1.5} />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-foreground truncate" style={{ fontSize: "12px" }}>
                      {imageFile ? imageFile.name : imagePreview ? "Current image · click to change" : "Upload image"}
                    </p>
                    <p className="text-muted-foreground" style={{ fontSize: "11px" }}>
                      PNG, JPG · Max 5 MB
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
                onClick={handleSubmit}
                disabled={isSaving}
                className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-lg text-white text-sm hover:opacity-90 transition-opacity font-medium mt-2 disabled:opacity-60"
                style={{ backgroundColor: "#501D2A" }}
              >
                {isSaving ? (
                  <Loader2 className="w-4 h-4 animate-spin" strokeWidth={1.5} />
                ) : (
                  <Plus className="w-4 h-4" strokeWidth={1.5} />
                )}
                {editingId ? "Update Category" : "Save Category"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
