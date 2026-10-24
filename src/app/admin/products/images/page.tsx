"use client"

import { useState } from "react"
import { PageHeader } from "@/components/admin/page-header"
import { Upload, Image as ImageIcon, Trash2, ChevronDown, GripVertical } from "lucide-react"

const INPUT_CLASS =
  "w-full px-2.5 py-1.5 rounded-lg border border-border/60 bg-white text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"

/* ─── Static data ──────────────────────────────────────────────────── */

interface ProductImage {
  id: string
  productId: string
  url: string
  alt: string
  sortOrder: number
  filename: string
  initials: string
  bgColor: string
}

const productOptions = [
  { id: "P001", label: "Silk Blouse" },
  { id: "P002", label: "Classic Jeans" },
  { id: "P003", label: "Floral Dress" },
  { id: "P004", label: "Linen Shirt" },
  { id: "P005", label: "Oversized Blazer" },
]

const allImages: ProductImage[] = [
  { id: "IMG01", productId: "P001", url: "/images/silk-blouse-front.jpg", alt: "Silk blouse front view", sortOrder: 1, filename: "silk-blouse-front.jpg", initials: "SB", bgColor: "#C4967A" },
  { id: "IMG02", productId: "P001", url: "/images/silk-blouse-back.jpg", alt: "Silk blouse back view", sortOrder: 2, filename: "silk-blouse-back.jpg", initials: "SB", bgColor: "#C4967A" },
  { id: "IMG03", productId: "P001", url: "/images/silk-blouse-detail.jpg", alt: "Silk blouse collar detail", sortOrder: 3, filename: "silk-blouse-detail.jpg", initials: "SB", bgColor: "#C4967A" },
  { id: "IMG04", productId: "P002", url: "/images/classic-jeans-front.jpg", alt: "Classic jeans front", sortOrder: 1, filename: "classic-jeans-front.jpg", initials: "CJ", bgColor: "#1e3a5f" },
  { id: "IMG05", productId: "P002", url: "/images/classic-jeans-back.jpg", alt: "Classic jeans back", sortOrder: 2, filename: "classic-jeans-back.jpg", initials: "CJ", bgColor: "#1e3a5f" },
  { id: "IMG06", productId: "P003", url: "/images/floral-dress-main.jpg", alt: "Floral dress main", sortOrder: 1, filename: "floral-dress-main.jpg", initials: "FD", bgColor: "#F472B6" },
  { id: "IMG07", productId: "P003", url: "/images/floral-dress-side.jpg", alt: "Floral dress side", sortOrder: 2, filename: "floral-dress-side.jpg", initials: "FD", bgColor: "#F472B6" },
  { id: "IMG08", productId: "P003", url: "/images/floral-dress-back.jpg", alt: "Floral dress back", sortOrder: 3, filename: "floral-dress-back.jpg", initials: "FD", bgColor: "#F472B6" },
  { id: "IMG09", productId: "P004", url: "/images/linen-shirt-front.jpg", alt: "Linen shirt front", sortOrder: 1, filename: "linen-shirt-front.jpg", initials: "LS", bgColor: "#6B7A2A" },
  { id: "IMG10", productId: "P004", url: "/images/linen-shirt-detail.jpg", alt: "Linen shirt texture detail", sortOrder: 2, filename: "linen-shirt-detail.jpg", initials: "LS", bgColor: "#6B7A2A" },
  { id: "IMG11", productId: "P005", url: "/images/blazer-front.jpg", alt: "Oversized blazer front", sortOrder: 1, filename: "blazer-front.jpg", initials: "OB", bgColor: "#2D5A8E" },
  { id: "IMG12", productId: "P005", url: "/images/blazer-lifestyle.jpg", alt: "Blazer lifestyle shot", sortOrder: 2, filename: "blazer-lifestyle.jpg", initials: "OB", bgColor: "#2D5A8E" },
]

/* ─── Page ─────────────────────────────────────────────────────────── */
export default function ImagesPage() {
  const [selectedProduct, setSelectedProduct] = useState("")
  const [images, setImages] = useState<ProductImage[]>(allImages)

  const displayedImages = selectedProduct
    ? images.filter((img) => img.productId === selectedProduct)
    : images

  function updateAlt(id: string, val: string) {
    setImages((prev) => prev.map((img) => (img.id === id ? { ...img, alt: val } : img)))
  }

  function updateSortOrder(id: string, val: string) {
    const n = parseInt(val, 10)
    if (!isNaN(n)) {
      setImages((prev) => prev.map((img) => (img.id === id ? { ...img, sortOrder: n } : img)))
    }
  }

  function deleteImage(id: string) {
    setImages((prev) => prev.filter((img) => img.id !== id))
  }

  const selectedLabel = productOptions.find((p) => p.id === selectedProduct)?.label ?? "All Products"

  return (
    <div className="space-y-6" style={{ backgroundColor: "#F8F7F5", minHeight: "100%" }}>
      <PageHeader
        title="Images & Gallery"
        description="Manage product images — alt text, sort order, and uploads"
        breadcrumbs={[
          { label: "Admin", href: "/admin" },
          { label: "Products", href: "/admin/products" },
          { label: "Images" },
        ]}
        actions={
          <button
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-white text-sm hover:opacity-90 transition-opacity"
            style={{ backgroundColor: "#501D2A" }}
          >
            <Upload className="w-4 h-4" strokeWidth={1.5} />
            Upload Images
          </button>
        }
      />

      {/* ── Product selector ─────────────────────────────────────── */}
      <div className="bg-white rounded-xl border border-border/50 p-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-1 max-w-sm">
            <label className="block font-medium text-foreground mb-1.5" style={{ fontSize: "12px" }}>
              Filter by Product
            </label>
            <div className="relative">
              <select
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg border border-border/60 bg-white text-foreground appearance-none focus:outline-none focus:border-primary/50 transition-colors pr-9"
                style={{ fontSize: "13px" }}
              >
                <option value="">All Products</option>
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

          <div className="flex items-center gap-4 sm:ml-auto">
            <div className="text-center">
              <p className="font-semibold text-foreground" style={{ fontSize: "18px" }}>
                {displayedImages.length}
              </p>
              <p className="text-muted-foreground" style={{ fontSize: "11px" }}>
                Images
              </p>
            </div>
            <div
              className="w-px h-8 bg-border/50"
            />
            <div className="text-center">
              <p className="font-semibold text-foreground" style={{ fontSize: "18px" }}>
                {[...new Set(displayedImages.map((i) => i.productId))].length}
              </p>
              <p className="text-muted-foreground" style={{ fontSize: "11px" }}>
                Products
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Upload area ──────────────────────────────────────────── */}
      <div
        className="border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors hover:border-primary/40 group"
        style={{ borderColor: "#E5E0DC", backgroundColor: "#F8F7F5" }}
      >
        <div
          className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center group-hover:scale-105 transition-transform"
          style={{ backgroundColor: "#F0EDEF" }}
        >
          <Upload className="w-5 h-5" style={{ color: "#501D2A" }} strokeWidth={1.5} />
        </div>
        <p className="font-semibold text-foreground" style={{ fontSize: "14px" }}>
          Upload images
          {selectedProduct ? ` for ${selectedLabel}` : ""}
        </p>
        <p className="text-muted-foreground mt-1" style={{ fontSize: "12px" }}>
          Drag &amp; drop or click to browse · PNG, JPG, WebP · Max 5 MB per file
        </p>
        <p className="text-muted-foreground" style={{ fontSize: "11px" }}>
          Recommended: 1200 × 1600 px (3:4 portrait)
        </p>
        <button
          type="button"
          className="mt-4 px-4 py-2 rounded-lg border border-border/60 bg-white hover:bg-[#F0EDEF] transition-colors text-foreground"
          style={{ fontSize: "13px" }}
        >
          Browse Files
        </button>
      </div>

      {/* ── Image grid ───────────────────────────────────────────── */}
      {displayedImages.length === 0 ? (
        <div className="bg-white rounded-xl border border-border/50 p-12 text-center">
          <ImageIcon className="w-10 h-10 mx-auto mb-3 text-muted-foreground/40" strokeWidth={1} />
          <p className="font-medium text-foreground" style={{ fontSize: "14px" }}>
            No images found
          </p>
          <p className="text-muted-foreground mt-1" style={{ fontSize: "13px" }}>
            Upload images above or select a different product.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {displayedImages.map((img) => (
            <div
              key={img.id}
              className="bg-white rounded-xl border border-border/50 overflow-hidden group"
            >
              {/* Image placeholder tile */}
              <div
                className="w-full aspect-[3/4] flex flex-col items-center justify-center relative"
                style={{ backgroundColor: img.bgColor + "18" }}
              >
                {/* Drag handle */}
                <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab">
                  <GripVertical className="w-4 h-4 text-muted-foreground/60" strokeWidth={1.5} />
                </div>

                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-white mb-2"
                  style={{ backgroundColor: img.bgColor, fontSize: "14px" }}
                >
                  {img.initials}
                </div>
                <ImageIcon
                  className="w-6 h-6 opacity-25"
                  style={{ color: img.bgColor }}
                  strokeWidth={1.5}
                />
                <p
                  className="mt-2 text-muted-foreground/70 px-3 text-center truncate w-full"
                  style={{ fontSize: "10px" }}
                >
                  {img.filename}
                </p>

                {/* Delete overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                <button
                  onClick={() => deleteImage(img.id)}
                  className="absolute top-2 right-2 p-1.5 rounded-lg bg-white shadow-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50"
                >
                  <Trash2 className="w-3.5 h-3.5 text-red-500" strokeWidth={1.5} />
                </button>
              </div>

              {/* Editable fields */}
              <div className="p-3 space-y-2.5">
                {/* Alt text */}
                <div>
                  <label
                    className="block text-muted-foreground mb-1"
                    style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.06em" }}
                  >
                    Alt Text
                  </label>
                  <input
                    type="text"
                    value={img.alt}
                    onChange={(e) => updateAlt(img.id, e.target.value)}
                    placeholder="Describe this image..."
                    className={INPUT_CLASS}
                    style={{ fontSize: "12px" }}
                  />
                </div>

                {/* Sort order + product info row */}
                <div className="flex items-center gap-2">
                  <div className="flex-1">
                    <label
                      className="block text-muted-foreground mb-1"
                      style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.06em" }}
                    >
                      Sort Order
                    </label>
                    <input
                      type="number"
                      value={img.sortOrder}
                      onChange={(e) => updateSortOrder(img.id, e.target.value)}
                      min={1}
                      className={INPUT_CLASS}
                      style={{ fontSize: "12px" }}
                    />
                  </div>
                  <div className="shrink-0 mt-4">
                    <span
                      className="inline-flex items-center rounded-full px-2 py-0.5 bg-[#F0EDEF] font-medium"
                      style={{ fontSize: "10px", color: "#501D2A" }}
                    >
                      {productOptions.find((p) => p.id === img.productId)?.label ?? img.productId}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination / count footer */}
      {displayedImages.length > 0 && (
        <div className="flex items-center justify-between py-2">
          <p className="text-muted-foreground" style={{ fontSize: "12px" }}>
            Showing {displayedImages.length} image{displayedImages.length !== 1 ? "s" : ""}{" "}
            {selectedProduct ? `for ${selectedLabel}` : "across all products"}
          </p>
          <button
            type="button"
            className="px-4 py-2 rounded-lg border border-border/60 bg-white hover:bg-[#F8F7F5] transition-colors text-muted-foreground"
            style={{ fontSize: "12px" }}
          >
            Load More
          </button>
        </div>
      )}
    </div>
  )
}
