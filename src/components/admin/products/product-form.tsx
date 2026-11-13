"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { PageHeader } from "@/components/admin/page-header"
import {
  Save, X, ChevronDown, Image as ImageIcon, Upload,
  Info, Plus, Trash2, Package, Loader2, Star,
} from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { useGetAllCategoriesQuery } from "@/redux/fetchers/category/categoryApi"
import { useGetAllSizesQuery } from "@/redux/fetchers/size/sizeApi"
import { useGetAllColorsQuery } from "@/redux/fetchers/color/colorApi"
import {
  useCreateProductMutation,
  useUpdateProductMutation,
  useGetSingleProductQuery,
} from "@/redux/fetchers/product/productApi"

const INPUT = "w-full px-3 py-2.5 rounded-lg border border-border/60 bg-white text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
const LABEL = "block font-medium text-foreground mb-1.5"

function slugify(t: string) {
  return t.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_]+/g, "-").replace(/^-+|-+$/g, "")
}

type Status = "DRAFT" | "ACTIVE" | "INACTIVE"

interface VariantRow {
  key: string
  id?: string
  sizeId: string
  colorId: string
  price: string
  stock: string
  isActive: boolean
}

interface ExistingImage {
  id: string
  url: string
}

const statusOpts: { value: Status; label: string; desc: string; color: string }[] = [
  { value: "DRAFT", label: "Draft", desc: "Save without publishing", color: "bg-amber-50 text-amber-700" },
  { value: "ACTIVE", label: "Active", desc: "Visible to customers", color: "bg-emerald-50 text-emerald-700" },
  { value: "INACTIVE", label: "Inactive", desc: "Hidden from store", color: "bg-gray-100 text-gray-500" },
]

let rowKey = 1
function newVariantRow(): VariantRow {
  return { key: String(rowKey++), sizeId: "", colorId: "", price: "", stock: "", isActive: true }
}

export function ProductForm({ productId }: { productId?: string }) {
  const isEdit = Boolean(productId)
  const router = useRouter()

  const { data: categoriesData } = useGetAllCategoriesQuery(undefined)
  const { data: sizesData } = useGetAllSizesQuery(undefined)
  const { data: colorsData } = useGetAllColorsQuery(undefined)
  const { data: productData, isLoading: isLoadingProduct } = useGetSingleProductQuery(productId as string, {
    skip: !isEdit,
  })

  const [createProduct, { isLoading: isCreating }] = useCreateProductMutation()
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation()
  const isSaving = isCreating || isUpdating

  const categories = categoriesData?.data ?? []
  const sizes = sizesData?.data ?? []
  const colors = colorsData?.data ?? []

  const [name, setName] = useState("")
  const [slug, setSlug] = useState("")
  const [slugEdited, setSlugEdited] = useState(false)
  const [description, setDescription] = useState("")
  const [categoryId, setCategoryId] = useState("")
  const [sku, setSku] = useState("")
  const [regularPrice, setRegularPrice] = useState("")
  const [salePrice, setSalePrice] = useState("")
  const [costPrice, setCostPrice] = useState("")
  const [stockQuantity, setStockQuantity] = useState("0")
  const [tagsInput, setTagsInput] = useState("")
  const [status, setStatus] = useState<Status>("DRAFT")
  const [isFeatured, setIsFeatured] = useState(false)
  const [seoTitle, setSeoTitle] = useState("")
  const [seoDescription, setSeoDescription] = useState("")
  const [variants, setVariants] = useState<VariantRow[]>([newVariantRow()])

  const [existingImages, setExistingImages] = useState<ExistingImage[]>([])
  const [removeImageIds, setRemoveImageIds] = useState<string[]>([])
  const [removeVariantIds, setRemoveVariantIds] = useState<string[]>([])
  const [newFiles, setNewFiles] = useState<File[]>([])
  const [newPreviews, setNewPreviews] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!isEdit || !productData?.data) return
    const p = productData.data

    setName(p.name ?? "")
    setSlug(p.slug ?? "")
    setSlugEdited(true)
    setDescription(p.description ?? "")
    setCategoryId(p.categoryId ?? "")
    setSku(p.sku ?? "")
    setRegularPrice(p.regularPrice != null ? String(p.regularPrice) : "")
    setSalePrice(p.salePrice != null ? String(p.salePrice) : "")
    setCostPrice(p.costPrice != null ? String(p.costPrice) : "")
    setStockQuantity(p.stockQuantity != null ? String(p.stockQuantity) : "0")
    setTagsInput((p.tags ?? []).join(", "))
    setStatus(p.status ?? "DRAFT")
    setIsFeatured(Boolean(p.isFeatured))
    setSeoTitle(p.seoTitle ?? "")
    setSeoDescription(p.seoDescription ?? "")
    setExistingImages((p.images ?? []).map((img: any) => ({ id: img.id, url: img.url })))
    setVariants(
      (p.variants ?? []).length
        ? p.variants.map((v: any) => ({
            key: v.id,
            id: v.id,
            sizeId: v.sizeId,
            colorId: v.colorId,
            price: String(v.price),
            stock: String(v.stock),
            isActive: v.isActive,
          }))
        : [newVariantRow()],
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, productData])

  function handleName(val: string) {
    setName(val)
    if (!slugEdited) setSlug(slugify(val))
  }

  function addVariant() {
    setVariants((v) => {
      // first variant is the template for every newly added variant
      const { key: _key, id: _id, ...template } = v[0] ?? newVariantRow()
      return [...v, { ...template, key: String(rowKey++) }]
    })
  }

  function removeVariant(row: VariantRow) {
    if (row.id) setRemoveVariantIds((ids) => [...ids, row.id!])
    setVariants((v) => v.filter((x) => x.key !== row.key))
  }

  function updateVariant(key: string, field: keyof VariantRow, val: string | boolean) {
    setVariants((v) => v.map((x) => (x.key === key ? { ...x, [field]: val } : x)))
  }

  function handleNewFiles(files: FileList | null) {
    if (!files) return
    const list = Array.from(files)
    setNewFiles((f) => [...f, ...list])
    setNewPreviews((p) => [...p, ...list.map((f) => URL.createObjectURL(f))])
  }

  function removeExistingImage(id: string) {
    setExistingImages((imgs) => imgs.filter((i) => i.id !== id))
    setRemoveImageIds((ids) => [...ids, id])
  }

  function removeNewImage(index: number) {
    setNewFiles((f) => f.filter((_, i) => i !== index))
    setNewPreviews((p) => p.filter((_, i) => i !== index))
  }

  async function handleSubmit(submitStatus?: Status) {
    if (!name.trim()) {
      toast.error("Product name is required")
      return
    }
    if (!categoryId) {
      toast.error("Category is required")
      return
    }
    const price = Number(regularPrice)
    if (!regularPrice || Number.isNaN(price) || price <= 0) {
      toast.error("Regular price must be greater than 0")
      return
    }

    const validVariants = variants
      .filter((v) => v.sizeId && v.colorId && v.price)
      .map((v) => ({
        ...(v.id ? { id: v.id } : {}),
        sizeId: v.sizeId,
        colorId: v.colorId,
        price: Number(v.price),
        stock: Number(v.stock || 0),
        isActive: v.isActive,
      }))

    const formData = new FormData()
    formData.append("name", name.trim())
    if (slug.trim()) formData.append("slug", slug.trim())
    if (description.trim()) formData.append("description", description.trim())
    formData.append("categoryId", categoryId)
    if (sku.trim()) formData.append("sku", sku.trim())
    formData.append("regularPrice", regularPrice)
    if (salePrice) formData.append("salePrice", salePrice)
    if (costPrice) formData.append("costPrice", costPrice)
    formData.append("stockQuantity", stockQuantity || "0")
    if (tagsInput.trim()) formData.append("tags", tagsInput.trim())
    formData.append("status", submitStatus ?? status)
    formData.append("isFeatured", String(isFeatured))
    if (seoTitle.trim()) formData.append("seoTitle", seoTitle.trim())
    if (seoDescription.trim()) formData.append("seoDescription", seoDescription.trim())
    if (validVariants.length) formData.append("variants", JSON.stringify(validVariants))
    if (isEdit && removeImageIds.length) formData.append("removeImageIds", JSON.stringify(removeImageIds))
    if (isEdit && removeVariantIds.length) formData.append("removeVariantIds", JSON.stringify(removeVariantIds))
    newFiles.forEach((file) => formData.append("images", file))

    try {
      if (isEdit) {
        await updateProduct({ id: productId as string, data: formData }).unwrap()
        toast.success("Product updated successfully")
      } else {
        await createProduct(formData).unwrap()
        toast.success("Product created successfully")
      }
      router.push("/admin/products")
    } catch (err: any) {
      toast.error(err?.data?.message || "Something went wrong. Please try again.")
    }
  }

  if (isEdit && isLoadingProduct) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-7 w-48" />
          <Skeleton className="h-9 w-32 rounded-lg" />
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 space-y-5">
            <div className="bg-white rounded-xl border border-border/50 p-5 space-y-4">
              <Skeleton className="h-4 w-36" />
              <Skeleton className="h-10 w-full rounded-lg" />
              <Skeleton className="h-10 w-full rounded-lg" />
              <Skeleton className="h-24 w-full rounded-lg" />
            </div>
            <div className="bg-white rounded-xl border border-border/50 p-5 space-y-4">
              <Skeleton className="h-4 w-28" />
              <div className="grid grid-cols-4 gap-4">
                <Skeleton className="h-10 w-full rounded-lg" />
                <Skeleton className="h-10 w-full rounded-lg" />
                <Skeleton className="h-10 w-full rounded-lg" />
                <Skeleton className="h-10 w-full rounded-lg" />
              </div>
            </div>
            <div className="bg-white rounded-xl border border-border/50 p-5">
              <Skeleton className="h-32 w-full rounded-lg" />
            </div>
          </div>
          <div className="space-y-5">
            <div className="bg-white rounded-xl border border-border/50 p-5 space-y-3">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-20 w-full rounded-lg" />
            </div>
            <div className="bg-white rounded-xl border border-border/50 p-5 space-y-3">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-10 w-full rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={isEdit ? "Edit Product" : "Add New Product"}
        description={isEdit ? "Update product details and variants" : "Create a new product with variants"}
        breadcrumbs={[
          { label: "Admin", href: "/admin" },
          { label: "Products", href: "/admin/products" },
          { label: isEdit ? "Edit Product" : "New Product" },
        ]}
        actions={
          <div className="flex items-center gap-2">
            <Link
              href="/admin/products"
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border/60 bg-white hover:bg-[var(--muted)] transition-colors text-muted-foreground"
              style={{ fontSize: "13px" }}
            >
              <X className="w-4 h-4" strokeWidth={1.5} /> Discard
            </Link>
            <button
              onClick={() => handleSubmit()}
              disabled={isSaving}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-white hover:opacity-90 transition-opacity disabled:opacity-60"
              style={{ backgroundColor: "var(--primary)", fontSize: "13px" }}
            >
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin" strokeWidth={1.5} /> : <Save className="w-4 h-4" strokeWidth={1.5} />}
              {isEdit ? "Save Changes" : "Create Product"}
            </button>
          </div>
        }
      />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* ── Left 2/3 ── */}
        <div className="xl:col-span-2 space-y-5">

          {/* Basic Info */}
          <div className="bg-white rounded-xl border border-border/50 p-5">
            <h2 className="font-semibold text-foreground mb-4 pb-3" style={{ fontSize: "14px", borderBottom: "1px solid var(--accent)" }}>
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
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => { setSlugEdited(true); setSlug(e.target.value) }}
                  placeholder="classic-cotton-t-shirt"
                  className={INPUT + " font-mono"}
                  style={{ fontSize: "13px" }}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={LABEL} style={{ fontSize: "12px" }}>SKU / Product Code</label>
                  <input
                    type="text"
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                    placeholder="e.g. TEE-001"
                    className={INPUT + " font-mono"}
                    style={{ fontSize: "13px" }}
                  />
                </div>
                <div>
                  <label className={LABEL} style={{ fontSize: "12px" }}>Tags</label>
                  <input
                    type="text"
                    value={tagsInput}
                    onChange={(e) => setTagsInput(e.target.value)}
                    placeholder="summer, cotton, sale"
                    className={INPUT}
                    style={{ fontSize: "13px" }}
                  />
                </div>
              </div>

              <div>
                <label className={LABEL} style={{ fontSize: "12px" }}>Full Description</label>
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

          {/* Pricing & Stock */}
          <div className="bg-white rounded-xl border border-border/50 p-5">
            <h2 className="font-semibold text-foreground mb-4 pb-3" style={{ fontSize: "14px", borderBottom: "1px solid var(--accent)" }}>
              Pricing & Stock
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <label className={LABEL} style={{ fontSize: "12px" }}>
                  Regular Price <span className="text-red-500">*</span>
                </label>
                <input
                  type="number" min="0" step="0.01"
                  value={regularPrice}
                  onChange={(e) => setRegularPrice(e.target.value)}
                  placeholder="0.00"
                  className={INPUT}
                  style={{ fontSize: "13px" }}
                />
              </div>
              <div>
                <label className={LABEL} style={{ fontSize: "12px" }}>Sale Price</label>
                <input
                  type="number" min="0" step="0.01"
                  value={salePrice}
                  onChange={(e) => setSalePrice(e.target.value)}
                  placeholder="0.00"
                  className={INPUT}
                  style={{ fontSize: "13px" }}
                />
              </div>
              <div>
                <label className={LABEL} style={{ fontSize: "12px" }}>Cost Price</label>
                <input
                  type="number" min="0" step="0.01"
                  value={costPrice}
                  onChange={(e) => setCostPrice(e.target.value)}
                  placeholder="0.00"
                  className={INPUT}
                  style={{ fontSize: "13px" }}
                />
              </div>
              <div>
                <label className={LABEL} style={{ fontSize: "12px" }}>Stock Quantity</label>
                <input
                  type="number" min="0"
                  value={stockQuantity}
                  onChange={(e) => setStockQuantity(e.target.value)}
                  placeholder="0"
                  className={INPUT}
                  style={{ fontSize: "13px" }}
                />
              </div>
            </div>
          </div>

          {/* Variants */}
          <div className="bg-white rounded-xl border border-border/50 p-5">
            <div className="flex items-center justify-between mb-4 pb-3" style={{ borderBottom: "1px solid var(--accent)" }}>
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4" style={{ color: "var(--primary)" }} strokeWidth={1.5} />
                <h2 className="font-semibold text-foreground" style={{ fontSize: "14px" }}>Variants (optional)</h2>
              </div>
              <button
                onClick={addVariant}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border/60 hover:bg-[var(--muted)] transition-colors"
                style={{ fontSize: "12px" }}
              >
                <Plus className="w-3.5 h-3.5" strokeWidth={2} /> Add Variant
              </button>
            </div>

            <div
              className="mb-3 flex items-start gap-2 px-3 py-2.5 rounded-lg"
              style={{ backgroundColor: "var(--accent)", fontSize: "12px" }}
            >
              <Info className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: "var(--primary)" }} strokeWidth={1.5} />
              <span className="text-foreground">
                Leave empty for a simple product. A variant needs size, color and price (SKU is generated automatically) to be saved.
              </span>
            </div>

            <div className="space-y-3">
              {variants.map((v, i) => (
                <div
                  key={v.key}
                  className="rounded-lg border border-border/50 p-4"
                  style={{ backgroundColor: "#FAFAFA" }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-medium text-muted-foreground" style={{ fontSize: "12px" }}>
                      Variant {i + 1}
                    </span>
                    {variants.length > 1 && (
                      <button
                        onClick={() => removeVariant(v)}
                        className="text-muted-foreground/50 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" strokeWidth={1.5} />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div>
                      <label className={LABEL} style={{ fontSize: "11px" }}>Size</label>
                      <div className="relative">
                        <select
                          value={v.sizeId}
                          onChange={(e) => updateVariant(v.key, "sizeId", e.target.value)}
                          className={INPUT + " appearance-none pr-7"}
                          style={{ fontSize: "13px" }}
                        >
                          <option value="">Select</option>
                          {sizes.map((s: any) => <option key={s.id} value={s.id}>{s.name}</option>)}
                        </select>
                        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" strokeWidth={1.5} />
                      </div>
                    </div>

                    <div>
                      <label className={LABEL} style={{ fontSize: "11px" }}>Color</label>
                      <div className="relative">
                        <select
                          value={v.colorId}
                          onChange={(e) => updateVariant(v.key, "colorId", e.target.value)}
                          className={INPUT + " appearance-none pr-7"}
                          style={{ fontSize: "13px" }}
                        >
                          <option value="">Select</option>
                          {colors.map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
                        </select>
                        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" strokeWidth={1.5} />
                      </div>
                    </div>


                    <div>
                      <label className={LABEL} style={{ fontSize: "11px" }}>Price</label>
                      <input
                        type="number" min="0" step="0.01"
                        value={v.price}
                        onChange={(e) => updateVariant(v.key, "price", e.target.value)}
                        placeholder="0.00"
                        className={INPUT}
                        style={{ fontSize: "13px" }}
                      />
                    </div>

                    <div>
                      <label className={LABEL} style={{ fontSize: "11px" }}>Stock</label>
                      <input
                        type="number" min="0"
                        value={v.stock}
                        onChange={(e) => updateVariant(v.key, "stock", e.target.value)}
                        placeholder="0"
                        className={INPUT}
                        style={{ fontSize: "13px" }}
                      />
                    </div>

                    <div className="flex items-end pb-1">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={v.isActive}
                          onChange={(e) => updateVariant(v.key, "isActive", e.target.checked)}
                        />
                        <span className="text-muted-foreground" style={{ fontSize: "12px" }}>Active</span>
                      </label>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Images */}
          <div className="bg-white rounded-xl border border-border/50 p-5">
            <div className="flex items-center gap-2 mb-4 pb-3" style={{ borderBottom: "1px solid var(--accent)" }}>
              <ImageIcon className="w-4 h-4" style={{ color: "var(--primary)" }} strokeWidth={1.5} />
              <h2 className="font-semibold text-foreground" style={{ fontSize: "14px" }}>Product Images</h2>
            </div>

            {(existingImages.length > 0 || newPreviews.length > 0) && (
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-4">
                {existingImages.map((img) => (
                  <div key={img.id} className="relative aspect-square rounded-lg overflow-hidden border border-border/50 group">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img.url} alt="Product" className="w-full h-full object-cover" />
                    <button
                      onClick={() => removeExistingImage(img.id)}
                      className="absolute top-1 right-1 p-1 rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-3 h-3" strokeWidth={2} />
                    </button>
                  </div>
                ))}
                {newPreviews.map((src, i) => (
                  <div key={src} className="relative aspect-square rounded-lg overflow-hidden border border-border/50 group">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt="New upload" className="w-full h-full object-cover" />
                    <button
                      onClick={() => removeNewImage(i)}
                      className="absolute top-1 right-1 p-1 rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-3 h-3" strokeWidth={2} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => { handleNewFiles(e.target.files); e.target.value = "" }}
            />
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed rounded-xl p-8 text-center cursor-pointer hover:border-primary/40 transition-colors"
              style={{ borderColor: "#E5E0DC", backgroundColor: "var(--muted)" }}
            >
              <div className="w-10 h-10 rounded-xl mx-auto mb-3 flex items-center justify-center" style={{ backgroundColor: "var(--accent)" }}>
                <Upload className="w-5 h-5" style={{ color: "var(--primary)" }} strokeWidth={1.5} />
              </div>
              <p className="font-medium text-foreground" style={{ fontSize: "13px" }}>Drop images here or click to upload</p>
              <p className="text-muted-foreground mt-1" style={{ fontSize: "11px" }}>PNG, JPG, WebP · Up to 10 images</p>
            </div>
          </div>

          {/* SEO */}
          <div className="bg-white rounded-xl border border-border/50 p-5">
            <h2 className="font-semibold text-foreground mb-4 pb-3" style={{ fontSize: "14px", borderBottom: "1px solid var(--accent)" }}>
              SEO
            </h2>
            <div className="space-y-4">
              <div>
                <label className={LABEL} style={{ fontSize: "12px" }}>SEO Title</label>
                <input
                  type="text"
                  value={seoTitle}
                  onChange={(e) => setSeoTitle(e.target.value)}
                  placeholder="Shown as the page title in search results"
                  className={INPUT}
                  style={{ fontSize: "13px" }}
                  maxLength={70}
                />
              </div>
              <div>
                <label className={LABEL} style={{ fontSize: "12px" }}>SEO Description</label>
                <textarea
                  rows={2}
                  value={seoDescription}
                  onChange={(e) => setSeoDescription(e.target.value)}
                  placeholder="Shown as the page snippet in search results"
                  className={INPUT + " resize-none"}
                  style={{ fontSize: "13px" }}
                  maxLength={160}
                />
              </div>
            </div>
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
                  className="flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors hover:bg-[var(--muted)]"
                  style={{
                    border: status === opt.value ? "1px solid #E5E0DC" : "1px solid transparent",
                    backgroundColor: status === opt.value ? "var(--muted)" : undefined,
                  }}
                >
                  <div
                    className="mt-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0"
                    style={{ borderColor: status === opt.value ? "var(--primary)" : "#D1D5DB" }}
                  >
                    {status === opt.value && <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "var(--primary)" }} />}
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
                {categories.map((c: any) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" strokeWidth={1.5} />
            </div>
            <Link
              href="/admin/products/categories"
              className="flex items-center gap-1 mt-2 hover:opacity-80 transition-opacity"
              style={{ fontSize: "12px", color: "var(--primary)" }}
            >
              <Plus className="w-3 h-3" strokeWidth={2} /> Add new category
            </Link>
          </div>

          {/* Featured */}
          <div className="bg-white rounded-xl border border-border/50 p-5">
            <label className="flex items-center justify-between cursor-pointer">
              <span className="flex items-center gap-2 font-semibold text-foreground" style={{ fontSize: "14px" }}>
                <Star className="w-4 h-4" style={{ color: "var(--primary)" }} strokeWidth={1.5} />
                Featured Product
              </span>
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="w-4 h-4"
              />
            </label>
            <p className="text-muted-foreground mt-2" style={{ fontSize: "11px" }}>
              Featured products are highlighted on the storefront.
            </p>
          </div>

          {/* Actions */}
          <div className="space-y-2.5">
            <button
              onClick={() => handleSubmit()}
              disabled={isSaving}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-white font-medium hover:opacity-90 transition-opacity disabled:opacity-60"
              style={{ backgroundColor: "var(--primary)", fontSize: "13px" }}
            >
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin" strokeWidth={1.5} /> : <Save className="w-4 h-4" strokeWidth={1.5} />}
              {isEdit ? "Save Changes" : "Create Product"}
            </button>
            {!isEdit && (
              <button
                onClick={() => handleSubmit("DRAFT")}
                disabled={isSaving}
                className="w-full py-2.5 rounded-lg border border-border/60 text-muted-foreground hover:bg-[var(--muted)] transition-colors disabled:opacity-60"
                style={{ fontSize: "13px" }}
              >
                Save as Draft
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
