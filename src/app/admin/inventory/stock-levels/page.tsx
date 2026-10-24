"use client"

import { useState } from "react"
import { PageHeader } from "@/components/admin/page-header"
import { ChevronUp, ChevronDown } from "lucide-react"

// Matches ProductVariant model fields exactly
interface ProductVariant {
  id: string
  productId: string
  sizeId: string
  colorId: string
  sku: string
  price: number        // Decimal in Prisma
  stock: number        // Int
  isActive: boolean
  // Display helpers (denormalised for static data)
  productName: string
  sizeName: string
  colorName: string
  colorHex: string
}

const variants: ProductVariant[] = [
  { id: "v-001", productId: "p-dr001", sizeId: "sz-m",  colorId: "cl-fls", sku: "DR-FLW-001-M-FLS",  price: 2800, stock: 34,  isActive: true,  productName: "Floral Wrap Midi Dress",   sizeName: "M",   colorName: "Floral",  colorHex: "#F8C8D0" },
  { id: "v-002", productId: "p-top002",sizeId: "sz-l",  colorId: "cl-snd", sku: "TOP-LBZ-002-L-SND", price: 4200, stock: 18,  isActive: true,  productName: "Oversized Linen Blazer",   sizeName: "L",   colorName: "Sand",    colorHex: "#D4C5A9" },
  { id: "v-003", productId: "p-jn003", sizeId: "sz-28", colorId: "cl-ind", sku: "JN-HRS-003-28-IND",  price: 3500, stock: 52,  isActive: true,  productName: "High-Rise Skinny Jeans",   sizeName: "28",  colorName: "Indigo",  colorHex: "#4B5FA6" },
  { id: "v-004", productId: "p-top004",sizeId: "sz-s",  colorId: "cl-ivr", sku: "TOP-SCB-004-S-IVR",  price: 1950, stock: 7,   isActive: true,  productName: "Silk Cami Blouse",         sizeName: "S",   colorName: "Ivory",   colorHex: "#F5F0E8" },
  { id: "v-005", productId: "p-pt005", sizeId: "sz-xs", colorId: "cl-ecr", sku: "PT-WLL-005-XS-ECR",  price: 3100, stock: 23,  isActive: true,  productName: "Wide Leg Linen Trousers",  sizeName: "XS",  colorName: "Ecru",    colorHex: "#C8BAAA" },
  { id: "v-006", productId: "p-kn006", sizeId: "sz-m",  colorId: "cl-crm", sku: "KN-RIB-006-M-CRM",   price: 2400, stock: 8,   isActive: true,  productName: "Ribbed Knit Sweater",      sizeName: "M",   colorName: "Cream",   colorHex: "#FFF8F0" },
  { id: "v-007", productId: "p-ot007", sizeId: "sz-l",  colorId: "cl-bei", sku: "OT-TCT-007-L-BEI",   price: 6800, stock: 12,  isActive: true,  productName: "Classic Trench Coat",      sizeName: "L",   colorName: "Beige",   colorHex: "#D4B896" },
  { id: "v-008", productId: "p-sk008", sizeId: "sz-s",  colorId: "cl-mlt", sku: "SK-PSK-008-S-MLT",   price: 1750, stock: 0,   isActive: false, productName: "Printed Slip Skirt",       sizeName: "S",   colorName: "Multi",   colorHex: "#E8A87C" },
  { id: "v-009", productId: "p-dr009", sizeId: "sz-xs", colorId: "cl-vlt", sku: "DR-VMD-009-XS-VLT",  price: 3900, stock: 5,   isActive: true,  productName: "Velvet Mini Dress",        sizeName: "XS",  colorName: "Violet",  colorHex: "#7C5C8A" },
  { id: "v-010", productId: "p-top010",sizeId: "sz-m",  colorId: "cl-wht", sku: "TOP-CCT-010-M-WHT",  price: 980,  stock: 76,  isActive: true,  productName: "Cotton Crew Tee",          sizeName: "M",   colorName: "White",   colorHex: "#F5F5F5" },
]

type FilterTab = "ALL" | "IN_STOCK" | "LOW_STOCK" | "OUT_OF_STOCK"
type SortKey = "stock_asc" | "stock_desc" | "price_asc" | "price_desc"

function getStatus(stock: number): "OUT_OF_STOCK" | "LOW_STOCK" | "IN_STOCK" {
  if (stock === 0) return "OUT_OF_STOCK"
  if (stock < 10)  return "LOW_STOCK"
  return "IN_STOCK"
}

const statusConfig = {
  IN_STOCK:     { label: "In Stock",    className: "bg-emerald-50 text-emerald-700 border border-emerald-200/60" },
  LOW_STOCK:    { label: "Low Stock",   className: "bg-amber-50 text-amber-700 border border-amber-200/60" },
  OUT_OF_STOCK: { label: "Out of Stock",className: "bg-red-50 text-red-600 border border-red-200/60" },
}

const filterTabs: { key: FilterTab; label: string }[] = [
  { key: "ALL",          label: "All" },
  { key: "IN_STOCK",     label: "In Stock" },
  { key: "LOW_STOCK",    label: "Low Stock" },
  { key: "OUT_OF_STOCK", label: "Out of Stock" },
]

export default function StockLevelsPage() {
  const [activeFilter, setActiveFilter] = useState<FilterTab>("ALL")
  const [sortKey, setSortKey] = useState<SortKey>("stock_desc")

  const filtered = variants.filter((v) => {
    if (activeFilter === "ALL") return true
    return getStatus(v.stock) === activeFilter
  })

  const sorted = [...filtered].sort((a, b) => {
    if (sortKey === "stock_asc")  return a.stock - b.stock
    if (sortKey === "stock_desc") return b.stock - a.stock
    if (sortKey === "price_asc")  return a.price - b.price
    if (sortKey === "price_desc") return b.price - a.price
    return 0
  })

  return (
    <div className="space-y-6" style={{ backgroundColor: "#F8F7F5", minHeight: "100%" }}>
      <PageHeader
        title="Stock Levels"
        description="Current stock for all active ProductVariant records"
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Inventory", href: "/admin/inventory" }, { label: "Stock Levels" }]}
      />

      {/* Filter Tabs + Sort */}
      <div className="bg-white rounded-xl border border-border/50 p-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          {/* Filter bar */}
          <div className="flex items-center gap-1 p-1 rounded-lg" style={{ backgroundColor: "#F8F7F5" }}>
            {filterTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveFilter(tab.key)}
                className="px-3 py-1.5 rounded-md transition-colors font-medium"
                style={{
                  fontSize: "13px",
                  backgroundColor: activeFilter === tab.key ? "#501D2A" : "transparent",
                  color: activeFilter === tab.key ? "#fff" : "#6B7280",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
          {/* Sort */}
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground" style={{ fontSize: "13px" }}>Sort by:</span>
            <select
              value={sortKey}
              onChange={(e) => setSortKey(e.target.value as SortKey)}
              className="px-3 py-1.5 rounded-lg border border-border/60 bg-white text-foreground focus:outline-none focus:border-primary/50"
              style={{ fontSize: "13px" }}
            >
              <option value="stock_desc">Stock: High → Low</option>
              <option value="stock_asc">Stock: Low → High</option>
              <option value="price_desc">Price: High → Low</option>
              <option value="price_asc">Price: Low → High</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-border/50">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid #F0EDEF" }}>
                {[
                  { label: "Product Name" },
                  { label: "SKU" },
                  { label: "Size" },
                  { label: "Color" },
                  { label: "Price (BDT)" },
                  { label: "Current Stock", sortAsc: "stock_asc", sortDesc: "stock_desc" },
                  { label: "Status" },
                ].map((h) => (
                  <th key={h.label} className="text-left px-5 py-3 text-muted-foreground font-medium" style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.07em" }}>
                    {h.sortAsc ? (
                      <div className="flex items-center gap-1">
                        {h.label}
                        <div className="flex flex-col gap-0">
                          <button onClick={() => setSortKey(h.sortAsc as SortKey)} className="hover:text-foreground transition-colors">
                            <ChevronUp className="w-3 h-3" strokeWidth={2} />
                          </button>
                          <button onClick={() => setSortKey(h.sortDesc as SortKey)} className="hover:text-foreground transition-colors">
                            <ChevronDown className="w-3 h-3" strokeWidth={2} />
                          </button>
                        </div>
                      </div>
                    ) : h.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sorted.map((variant, i) => {
                const status = getStatus(variant.stock)
                const cfg = statusConfig[status]
                return (
                  <tr
                    key={variant.id}
                    className="hover:bg-[#F8F7F5] transition-colors"
                    style={{ borderBottom: i < sorted.length - 1 ? "1px solid #F0EDEF" : "none" }}
                  >
                    <td className="px-5 py-3 font-medium text-foreground" style={{ fontSize: "13px" }}>{variant.productName}</td>
                    <td className="px-5 py-3 font-mono text-muted-foreground" style={{ fontSize: "12px" }}>{variant.sku}</td>
                    <td className="px-5 py-3 text-foreground" style={{ fontSize: "13px" }}>{variant.sizeName}</td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-border/40 shrink-0"
                          style={{ backgroundColor: variant.colorHex }}
                          title={variant.colorName}
                        />
                        <span className="text-foreground" style={{ fontSize: "13px" }}>{variant.colorName}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3 font-medium text-foreground" style={{ fontSize: "13px" }}>
                      {variant.price.toLocaleString("en-BD")}
                    </td>
                    <td className="px-5 py-3">
                      <span
                        className="font-semibold"
                        style={{ fontSize: "13px", color: status === "OUT_OF_STOCK" ? "#DC2626" : status === "LOW_STOCK" ? "#D97706" : "#1F2937" }}
                      >
                        {variant.stock}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 font-medium ${cfg.className}`} style={{ fontSize: "11px" }}>
                        {cfg.label}
                      </span>
                    </td>
                  </tr>
                )
              })}
              {sorted.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-5 py-8 text-center text-muted-foreground" style={{ fontSize: "13px" }}>
                    No variants match this filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3" style={{ borderTop: "1px solid #F0EDEF" }}>
          <p className="text-muted-foreground" style={{ fontSize: "12px" }}>Showing {sorted.length} of {variants.length} variants</p>
        </div>
      </div>
    </div>
  )
}
