"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { toast } from "sonner"
import { PageHeader } from "@/components/admin/page-header"
import {
  Plus, Search, SlidersHorizontal, Pencil, Trash2, ChevronDown, Star, Loader2, ChevronLeft, ChevronRight,
} from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { TableSkeletonRows } from "@/components/admin/table-skeleton-rows"
import { useGetAllProductsQuery, useDeleteProductMutation, ProductQueryParams } from "@/redux/fetchers/product/productApi"
import { useGetAllCategoriesQuery } from "@/redux/fetchers/category/categoryApi"

const statusConfig: Record<string, { label: string; className: string }> = {
  ACTIVE: { label: "Active", className: "bg-emerald-50 text-emerald-700" },
  DRAFT: { label: "Draft", className: "bg-amber-50 text-amber-700" },
  INACTIVE: { label: "Inactive", className: "bg-gray-100 text-gray-500" },
}

export default function AllProductsPage() {
  const [searchInput, setSearchInput] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [status, setStatus] = useState<string>("")
  const [categoryId, setCategoryId] = useState<string>("")
  const [stockStatus, setStockStatus] = useState<string>("")
  const [featured, setFeatured] = useState<string>("")
  const [sort, setSort] = useState<ProductQueryParams["sort"]>("createdAt")
  const [order, setOrder] = useState<ProductQueryParams["order"]>("desc")
  const [page, setPage] = useState(1)
  const limit = 10

  useEffect(() => {
    const t = setTimeout(() => {
      setSearchTerm(searchInput.trim())
      setPage(1)
    }, 400)
    return () => clearTimeout(t)
  }, [searchInput])

  const queryParams = useMemo<ProductQueryParams>(
    () => ({
      page,
      limit,
      sort,
      order,
      ...(searchTerm ? { searchTerm } : {}),
      ...(status ? { status: status as ProductQueryParams["status"] } : {}),
      ...(categoryId ? { category: categoryId } : {}),
      ...(stockStatus ? { stockStatus: stockStatus as ProductQueryParams["stockStatus"] } : {}),
      ...(featured ? { featured } : {}),
    }),
    [page, sort, order, searchTerm, status, categoryId, stockStatus, featured],
  )

  const { data, isLoading, isFetching } = useGetAllProductsQuery(queryParams)
  const { data: categoriesData } = useGetAllCategoriesQuery(undefined)
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation()

  const products = data?.data ?? []
  const meta = data?.meta ?? { page: 1, limit, total: 0, totalPage: 1 }
  const categories = categoriesData?.data ?? []

  async function handleDelete(id: string) {
    if (!confirm("Delete this product? This cannot be undone.")) return
    try {
      await deleteProduct(id).unwrap()
      toast.success("Product deleted successfully")
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to delete product.")
    }
  }

  function toggleSort(field: ProductQueryParams["sort"]) {
    if (sort === field) {
      setOrder(order === "asc" ? "desc" : "asc")
    } else {
      setSort(field)
      setOrder("asc")
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="All Products"
        description="Manage your product catalog"
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Products" }]}
        actions={
          <Link
            href="/admin/products/new"
            className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm hover:bg-primary/90 transition-colors"
          >
            <Plus className="w-4 h-4" strokeWidth={1.5} /> Add Product
          </Link>
        }
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Products", value: String(meta.total ?? 0), sub: "matching current filters" },
          { label: "Page", value: `${meta.page ?? 1} / ${meta.totalPage ?? 1}`, sub: "current page" },
          { label: "Status Filter", value: status ? statusConfig[status]?.label ?? status : "All", sub: "product status" },
          { label: "Stock Filter", value: stockStatus ? stockStatus.replace("_", " ") : "All", sub: "stock status" },
        ].map((card) => (
          <div key={card.label} className="bg-white rounded-xl border border-border/50 p-4">
            <p className="text-muted-foreground" style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.07em" }}>{card.label}</p>
            <p className="font-semibold text-foreground mt-1" style={{ fontSize: "22px" }}>{card.value}</p>
            <p className="text-muted-foreground" style={{ fontSize: "11px" }}>{card.sub}</p>
          </div>
        ))}
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-xl border border-border/50">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 px-5 py-4 flex-wrap" style={{ borderBottom: "1px solid #F0EDEF" }}>
          <div className="relative flex-1 w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search by name, SKU, slug..."
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-border/60 bg-[#F8F7F5] text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/40"
              style={{ fontSize: "13px" }}
            />
          </div>

          <div className="relative">
            <select
              value={status}
              onChange={(e) => { setStatus(e.target.value); setPage(1) }}
              className="appearance-none pl-3 pr-8 py-2 rounded-lg border border-border/60 bg-white hover:bg-[#F8F7F5] transition-colors text-foreground"
              style={{ fontSize: "13px" }}
            >
              <option value="">All status</option>
              <option value="ACTIVE">Active</option>
              <option value="DRAFT">Draft</option>
              <option value="INACTIVE">Inactive</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" strokeWidth={1.5} />
          </div>

          <div className="relative">
            <select
              value={categoryId}
              onChange={(e) => { setCategoryId(e.target.value); setPage(1) }}
              className="appearance-none pl-3 pr-8 py-2 rounded-lg border border-border/60 bg-white hover:bg-[#F8F7F5] transition-colors text-foreground"
              style={{ fontSize: "13px" }}
            >
              <option value="">All categories</option>
              {categories.map((c: any) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" strokeWidth={1.5} />
          </div>

          <div className="relative">
            <select
              value={stockStatus}
              onChange={(e) => { setStockStatus(e.target.value); setPage(1) }}
              className="appearance-none pl-3 pr-8 py-2 rounded-lg border border-border/60 bg-white hover:bg-[#F8F7F5] transition-colors text-foreground"
              style={{ fontSize: "13px" }}
            >
              <option value="">All stock</option>
              <option value="IN_STOCK">In stock</option>
              <option value="LOW_STOCK">Low stock</option>
              <option value="OUT_OF_STOCK">Out of stock</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" strokeWidth={1.5} />
          </div>

          <button
            onClick={() => { setFeatured(featured === "true" ? "" : "true"); setPage(1) }}
            className="flex items-center gap-2 px-3 py-2 rounded-lg border transition-colors"
            style={{
              fontSize: "13px",
              borderColor: featured === "true" ? "#501D2A" : undefined,
              color: featured === "true" ? "#501D2A" : undefined,
              backgroundColor: featured === "true" ? "#F8F0F2" : "white",
            }}
          >
            <Star className="w-3.5 h-3.5" strokeWidth={1.5} /> Featured
          </button>

          {(status || categoryId || stockStatus || featured || searchTerm) && (
            <button
              onClick={() => { setStatus(""); setCategoryId(""); setStockStatus(""); setFeatured(""); setSearchInput(""); setSearchTerm(""); setPage(1) }}
              className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border/60 bg-white hover:bg-[#F8F7F5] transition-colors text-muted-foreground"
              style={{ fontSize: "13px" }}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" strokeWidth={1.5} /> Clear
            </button>
          )}

          {isFetching && !isLoading && (
            <Loader2 className="w-4 h-4 animate-spin text-muted-foreground ml-auto" strokeWidth={1.5} />
          )}
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid #F0EDEF" }}>
                {[
                  { label: "", sortKey: undefined },
                  { label: "Product", sortKey: "name" as const },
                  { label: "SKU", sortKey: undefined },
                  { label: "Category", sortKey: undefined },
                  { label: "Price", sortKey: "price" as const },
                  { label: "Stock", sortKey: undefined },
                  { label: "Status", sortKey: undefined },
                  { label: "Created", sortKey: "createdAt" as const },
                  { label: "Actions", sortKey: undefined },
                ].map((h) => (
                  <th
                    key={h.label || "img"}
                    onClick={() => h.sortKey && toggleSort(h.sortKey)}
                    className={`text-left px-5 py-3 text-muted-foreground font-medium ${h.sortKey ? "cursor-pointer hover:text-foreground" : ""}`}
                    style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.07em" }}
                  >
                    {h.label}
                    {h.sortKey && sort === h.sortKey && (order === "asc" ? " ▲" : " ▼")}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {isLoading && <TableSkeletonRows columns={9} />}
              {!isLoading && products.length === 0 && (
                <tr>
                  <td colSpan={9} className="px-5 py-8 text-center text-muted-foreground" style={{ fontSize: "13px" }}>
                    No products found. Try adjusting filters or add a new product.
                  </td>
                </tr>
              )}
              {products.map((product: any, i: number) => {
                const statusCfg = statusConfig[product.status] ?? statusConfig.DRAFT
                const isOutOfStock = product.stockQuantity === 0
                const isLowStock = product.stockQuantity > 0 && product.stockQuantity <= 5
                const thumb = product.images?.[0]?.url

                return (
                  <tr
                    key={product.id}
                    className="hover:bg-[#F8F7F5] transition-colors"
                    style={{ borderBottom: i < products.length - 1 ? "1px solid #F0EDEF" : "none" }}
                  >
                    <td className="px-5 py-3">
                      <div className="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center font-semibold text-white shrink-0" style={{ backgroundColor: "#501D2A", fontSize: "11px" }}>
                        {thumb ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={thumb} alt={product.name} className="w-full h-full object-cover" />
                        ) : (
                          product.name?.slice(0, 2).toUpperCase()
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <p className="font-medium text-foreground flex items-center gap-1.5" style={{ fontSize: "13px" }}>
                        {product.name}
                        {product.isFeatured && <Star className="w-3 h-3" style={{ color: "#D4A017" }} fill="#D4A017" strokeWidth={0} />}
                      </p>
                      <p className="text-muted-foreground" style={{ fontSize: "11px" }}>ID: {product.id}</p>
                    </td>
                    <td className="px-5 py-3">
                      <span className="text-muted-foreground font-mono" style={{ fontSize: "12px" }}>{product.sku || "—"}</span>
                    </td>
                    <td className="px-5 py-3">
                      <span className="text-foreground" style={{ fontSize: "13px" }}>{product.category?.name ?? "—"}</span>
                    </td>
                    <td className="px-5 py-3">
                      {product.salePrice ? (
                        <div>
                          <span className="font-medium text-foreground" style={{ fontSize: "13px" }}>{Number(product.salePrice).toFixed(2)}</span>
                          <span className="text-muted-foreground line-through ml-1" style={{ fontSize: "11px" }}>{Number(product.regularPrice).toFixed(2)}</span>
                        </div>
                      ) : (
                        <span className="font-medium text-foreground" style={{ fontSize: "13px" }}>{Number(product.regularPrice).toFixed(2)}</span>
                      )}
                    </td>
                    <td className="px-5 py-3">
                      <span
                        className={isOutOfStock ? "text-red-500 font-medium" : isLowStock ? "text-amber-600 font-medium" : "text-foreground"}
                        style={{ fontSize: "13px" }}
                      >
                        {isOutOfStock ? "Out of stock" : `${product.stockQuantity} units`}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 font-medium ${statusCfg.className}`} style={{ fontSize: "11px" }}>
                        {statusCfg.label}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <span className="text-muted-foreground" style={{ fontSize: "12px" }}>
                        {new Date(product.createdAt).toLocaleDateString()}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-1">
                        <Link
                          href={`/admin/products/${product.id}/edit`}
                          className="p-1.5 rounded-lg hover:bg-[#F0EDEF] transition-colors text-muted-foreground hover:text-foreground inline-flex"
                        >
                          <Pencil className="w-3.5 h-3.5" strokeWidth={1.5} />
                        </Link>
                        <button
                          onClick={() => handleDelete(product.id)}
                          disabled={isDeleting}
                          className="p-1.5 rounded-lg hover:bg-red-50 transition-colors text-muted-foreground hover:text-red-600 disabled:opacity-50"
                        >
                          <Trash2 className="w-3.5 h-3.5" strokeWidth={1.5} />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-5 py-4" style={{ borderTop: "1px solid #F0EDEF" }}>
          <p className="text-muted-foreground" style={{ fontSize: "12px" }}>
            {isLoading ? <Skeleton className="h-3 w-40" /> : `Showing ${products.length} of ${meta.total ?? 0} products`}
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={(meta.page ?? 1) <= 1}
              className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[#F0EDEF] text-muted-foreground disabled:opacity-40 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" strokeWidth={1.5} />
            </button>
            <span className="px-3 text-foreground" style={{ fontSize: "13px" }}>
              Page {meta.page ?? 1} of {meta.totalPage ?? 1}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(meta.totalPage ?? 1, p + 1))}
              disabled={(meta.page ?? 1) >= (meta.totalPage ?? 1)}
              className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[#F0EDEF] text-muted-foreground disabled:opacity-40 transition-colors"
            >
              <ChevronRight className="w-4 h-4" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
