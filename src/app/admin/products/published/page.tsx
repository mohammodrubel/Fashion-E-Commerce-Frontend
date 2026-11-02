"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { toast } from "sonner"
import { PageHeader } from "@/components/admin/page-header"
import { Search, Pencil, EyeOff, Trash2, CheckCircle, ChevronLeft, ChevronRight, Loader2 } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { TableSkeletonRows } from "@/components/admin/table-skeleton-rows"
import {
  useGetAllProductsQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
} from "@/redux/fetchers/product/productApi"

export default function PublishedProductsPage() {
  const [searchInput, setSearchInput] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [page, setPage] = useState(1)
  const limit = 10

  useEffect(() => {
    const t = setTimeout(() => {
      setSearchTerm(searchInput.trim())
      setPage(1)
    }, 400)
    return () => clearTimeout(t)
  }, [searchInput])

  const queryParams = useMemo(
    () => ({
      page,
      limit,
      status: "ACTIVE" as const,
      sort: "createdAt" as const,
      order: "desc" as const,
      ...(searchTerm ? { searchTerm } : {}),
    }),
    [page, searchTerm],
  )

  const { data, isLoading, isFetching } = useGetAllProductsQuery(queryParams)
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation()
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation()

  const products = data?.data ?? []
  const meta = data?.meta ?? { page: 1, limit, total: 0, totalPage: 1 }

  const outOfStock = products.filter((p: any) => p.stockQuantity === 0).length
  const lowStock = products.filter((p: any) => p.stockQuantity > 0 && p.stockQuantity <= 10).length

  async function handleUnpublish(id: string) {
    if (!confirm("Unpublish this product? It will move to Draft and disappear from the storefront.")) return
    const formData = new FormData()
    formData.append("status", "DRAFT")
    try {
      await updateProduct({ id, data: formData }).unwrap()
      toast.success("Product unpublished")
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to unpublish product.")
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this product? This cannot be undone.")) return
    try {
      await deleteProduct(id).unwrap()
      toast.success("Product deleted successfully")
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to delete product.")
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Active Products"
        description="All products currently live on your storefront"
        breadcrumbs={[
          { label: "Admin", href: "/admin" },
          { label: "Products", href: "/admin/products" },
          { label: "Active" },
        ]}
      />

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-border/50 p-4">
          <p className="text-muted-foreground" style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.07em" }}>Active</p>
          <p className="font-semibold text-foreground mt-1" style={{ fontSize: "22px" }}>{meta.total ?? 0}</p>
          <div className="flex items-center gap-1.5 mt-1">
            <CheckCircle className="w-3 h-3 text-emerald-600" strokeWidth={2} />
            <span className="text-emerald-600" style={{ fontSize: "11px" }}>Live on store</span>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-border/50 p-4">
          <p className="text-muted-foreground" style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.07em" }}>Page</p>
          <p className="font-semibold text-foreground mt-1" style={{ fontSize: "22px" }}>{meta.page ?? 1} / {meta.totalPage ?? 1}</p>
          <p className="text-muted-foreground" style={{ fontSize: "11px" }}>current page</p>
        </div>
        <div className="bg-white rounded-xl border border-border/50 p-4">
          <p className="text-muted-foreground" style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.07em" }}>Out of Stock</p>
          <p className="font-semibold text-red-500 mt-1" style={{ fontSize: "22px" }}>{outOfStock}</p>
          <p className="text-muted-foreground" style={{ fontSize: "11px" }}>still active, on this page</p>
        </div>
        <div className="bg-white rounded-xl border border-border/50 p-4">
          <p className="text-muted-foreground" style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.07em" }}>Low Stock</p>
          <p className="font-semibold text-amber-600 mt-1" style={{ fontSize: "22px" }}>{lowStock}</p>
          <p className="text-muted-foreground" style={{ fontSize: "11px" }}>≤10 units left, on this page</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-border/50">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 px-5 py-4" style={{ borderBottom: "1px solid #F0EDEF" }}>
          <div className="relative flex-1 w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search active products..."
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-border/60 bg-[#F8F7F5] text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/40"
              style={{ fontSize: "13px" }}
            />
          </div>
          {isFetching && !isLoading && (
            <Loader2 className="w-4 h-4 animate-spin text-muted-foreground ml-auto" strokeWidth={1.5} />
          )}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid #F0EDEF" }}>
                {["Product", "SKU", "Category", "Price", "Stock", "Published", "Actions"].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-muted-foreground font-medium" style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.07em" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {isLoading && <TableSkeletonRows columns={7} />}
              {!isLoading && products.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-5 py-8 text-center text-muted-foreground" style={{ fontSize: "13px" }}>
                    No active products yet.
                  </td>
                </tr>
              )}
              {products.map((product: any, i: number) => {
                const thumb = product.images?.[0]?.url
                return (
                  <tr
                    key={product.id}
                    className="hover:bg-[#F8F7F5] transition-colors"
                    style={{ borderBottom: i < products.length - 1 ? "1px solid #F0EDEF" : "none" }}
                  >
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-9 h-9 rounded-lg overflow-hidden flex items-center justify-center text-white font-bold shrink-0"
                          style={{ backgroundColor: "#501D2A", fontSize: "10px" }}
                        >
                          {thumb ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={thumb} alt={product.name} className="w-full h-full object-cover" />
                          ) : (
                            product.name?.slice(0, 2).toUpperCase()
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-foreground" style={{ fontSize: "13px" }}>{product.name}</p>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            <span className="text-emerald-600" style={{ fontSize: "10px" }}>Live</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="font-mono text-muted-foreground" style={{ fontSize: "12px" }}>{product.sku || "—"}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-foreground" style={{ fontSize: "13px" }}>{product.category?.name ?? "—"}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      {product.salePrice ? (
                        <div>
                          <span className="font-medium text-foreground" style={{ fontSize: "13px" }}>{Number(product.salePrice).toFixed(2)}</span>
                          <span className="text-muted-foreground line-through ml-1" style={{ fontSize: "11px" }}>{Number(product.regularPrice).toFixed(2)}</span>
                        </div>
                      ) : (
                        <span className="font-medium text-foreground" style={{ fontSize: "13px" }}>{Number(product.regularPrice).toFixed(2)}</span>
                      )}
                    </td>
                    <td className="px-5 py-3.5">
                      <span
                        className={product.stockQuantity === 0 ? "text-red-500 font-medium" : product.stockQuantity <= 10 ? "text-amber-600 font-medium" : "text-foreground"}
                        style={{ fontSize: "13px" }}
                      >
                        {product.stockQuantity === 0 ? "Out of stock" : `${product.stockQuantity} units`}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-muted-foreground" style={{ fontSize: "12px" }}>
                        {new Date(product.createdAt).toLocaleDateString()}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-1">
                        <Link
                          href={`/admin/products/${product.id}/edit`}
                          className="p-1.5 rounded-lg hover:bg-[#F0EDEF] transition-colors text-muted-foreground hover:text-foreground inline-flex"
                        >
                          <Pencil className="w-3.5 h-3.5" strokeWidth={1.5} />
                        </Link>
                        <button
                          onClick={() => handleUnpublish(product.id)}
                          disabled={isUpdating}
                          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-border/60 hover:bg-amber-50 hover:border-amber-200 transition-colors text-muted-foreground hover:text-amber-700 font-medium disabled:opacity-50"
                          style={{ fontSize: "11px" }}
                        >
                          <EyeOff className="w-3 h-3" strokeWidth={1.5} />
                          Unpublish
                        </button>
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
        <div className="flex items-center justify-between px-5 py-4" style={{ borderTop: "1px solid #F0EDEF" }}>
          <p className="text-muted-foreground" style={{ fontSize: "12px" }}>
            {isLoading ? <Skeleton className="h-3 w-44" /> : `Showing ${products.length} of ${meta.total ?? 0} active products`}
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
