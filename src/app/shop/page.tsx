"use client"

import { Suspense, useEffect, useMemo, useRef, useState } from "react"
import Link from "next/link"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { SlidersHorizontal, X, RefreshCcw, PackageSearch } from "lucide-react"
import { SiteHeader } from "@/components/home/site-header"
import { SiteFooter } from "@/components/shared/footer"
import type { ProductCardData } from "@/components/shop/product-card"
import { ProductGrid } from "@/components/shared/product-grid"
import { ShopFilterPanel, type ShopFiltersState } from "@/components/shop/shop-filter-panel"
import { ShopPagination } from "@/components/shop/shop-pagination"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useGetAllProductsQuery, useGetProductPriceRangeQuery, type ProductQueryParams } from "@/redux/fetchers/product/productApi"
import { useGetAllCategoriesQuery } from "@/redux/fetchers/category/categoryApi"
import { useGetAllColorsQuery } from "@/redux/fetchers/color/colorApi"
import { useGetAllSizesQuery } from "@/redux/fetchers/size/sizeApi"

const PAGE_SIZE = 16
const NEW_ARRIVALS_WINDOW_DAYS = 30

type SortKey = "featured" | "price-asc" | "price-desc" | "name-asc" | "name-desc" | "newest" | "oldest"

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "featured", label: "Default / Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name-asc", label: "Name: A to Z" },
  { value: "name-desc", label: "Name: Z to A" },
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
]

function sortKeyToApi(key: SortKey): { sort: ProductQueryParams["sort"]; order: "asc" | "desc" } {
  switch (key) {
    case "price-asc":
      return { sort: "price", order: "asc" }
    case "price-desc":
      return { sort: "price", order: "desc" }
    case "name-asc":
      return { sort: "name", order: "asc" }
    case "name-desc":
      return { sort: "name", order: "desc" }
    case "newest":
      return { sort: "createdAt", order: "desc" }
    case "oldest":
      return { sort: "createdAt", order: "asc" }
    default:
      return { sort: "featured", order: "desc" }
  }
}

function csv(param: string | null): string[] {
  return param ? param.split(",").filter(Boolean) : []
}

function ShopPageContent() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [searchInput, setSearchInput] = useState(searchParams.get("q") ?? "")
  const [priceDraft, setPriceDraft] = useState({
    min: searchParams.get("minPrice") ?? "",
    max: searchParams.get("maxPrice") ?? "",
  })
  const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  const page = Number(searchParams.get("page") ?? "1") || 1
  const sortKey = (searchParams.get("sort") as SortKey) || "featured"
  const filters: ShopFiltersState = useMemo(
    () => ({
      categoryIds: csv(searchParams.get("category")),
      colorIds: csv(searchParams.get("color")),
      sizeIds: csv(searchParams.get("size")),
      stock: (searchParams.get("stock") as ShopFiltersState["stock"]) || "",
      minPrice: searchParams.get("minPrice") ?? "",
      maxPrice: searchParams.get("maxPrice") ?? "",
      featured: searchParams.get("featured") === "1",
      onSale: searchParams.get("sale") === "1",
      newArrivals: searchParams.get("newArrivals") === "1",
    }),
    [searchParams]
  )

  useEffect(() => {
    setSearchInput(searchParams.get("q") ?? "")
    setPriceDraft({ min: searchParams.get("minPrice") ?? "", max: searchParams.get("maxPrice") ?? "" })
  }, [searchParams])

  function updateParams(patch: Record<string, string | null>, resetPage = true) {
    const params = new URLSearchParams(searchParams.toString())
    Object.entries(patch).forEach(([key, value]) => {
      if (value === null || value === "") params.delete(key)
      else params.set(key, value)
    })
    if (resetPage) params.delete("page")
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  function debouncedUpdate(patch: Record<string, string | null>) {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => updateParams(patch), 400)
  }

  function toggleMulti(key: "categoryIds" | "colorIds" | "sizeIds", id: string) {
    const urlKey = key === "categoryIds" ? "category" : key === "colorIds" ? "color" : "size"
    const current = filters[key]
    const next = current.includes(id) ? current.filter((x) => x !== id) : [...current, id]
    updateParams({ [urlKey]: next.length ? next.join(",") : null })
  }

  const activeFilterCount =
    filters.categoryIds.length +
    filters.colorIds.length +
    filters.sizeIds.length +
    (filters.stock ? 1 : 0) +
    (filters.minPrice || filters.maxPrice ? 1 : 0) +
    (filters.featured ? 1 : 0) +
    (filters.onSale ? 1 : 0) +
    (filters.newArrivals ? 1 : 0)

  function clearAll() {
    setSearchInput("")
    router.push(pathname, { scroll: false })
  }

  const { data: categoriesData } = useGetAllCategoriesQuery(undefined)
  const { data: colorsData } = useGetAllColorsQuery(undefined)
  const { data: sizesData } = useGetAllSizesQuery(undefined)
  const { data: priceRangeData } = useGetProductPriceRangeQuery(undefined)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const categories = (categoriesData?.data ?? []).filter((c: any) => c.isActive)
  const colors = colorsData?.data ?? []
  const sizes = sizesData?.data ?? []
  const priceBounds = priceRangeData?.data ?? { min: 0, max: 0 }

  const { sort, order } = sortKeyToApi(sortKey)
  const queryParams: ProductQueryParams = {
    status: "ACTIVE",
    page,
    limit: PAGE_SIZE,
    sort,
    order,
    searchTerm: searchParams.get("q") || undefined,
    categoryIds: filters.categoryIds.length ? filters.categoryIds.join(",") : undefined,
    colorIds: filters.colorIds.length ? filters.colorIds.join(",") : undefined,
    sizeIds: filters.sizeIds.length ? filters.sizeIds.join(",") : undefined,
    stockStatus: filters.stock || undefined,
    minPrice: filters.minPrice || undefined,
    maxPrice: filters.maxPrice || undefined,
    featured: filters.featured ? "true" : undefined,
    onSale: filters.onSale ? "true" : undefined,
    startDate: filters.newArrivals
      ? new Date(Date.now() - NEW_ARRIVALS_WINDOW_DAYS * 24 * 60 * 60 * 1000).toISOString()
      : undefined,
  }

  const { data, isLoading, isFetching, isError, refetch } = useGetAllProductsQuery(queryParams)
  const products: ProductCardData[] = data?.data ?? []
  const meta = data?.meta ?? { page: 1, limit: PAGE_SIZE, total: 0, totalPage: 1 }

  const rangeStart = meta.total === 0 ? 0 : (meta.page - 1) * meta.limit + 1
  const rangeEnd = Math.min(meta.page * meta.limit, meta.total)

  const activeChips: { label: string; onRemove: () => void }[] = [
    ...filters.categoryIds.map((id) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const cat = categories.find((c: any) => c.id === id)
      return { label: cat?.name ?? "Category", onRemove: () => toggleMulti("categoryIds", id) }
    }),
    ...filters.colorIds.map((id) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const c = colors.find((x: any) => x.id === id)
      return { label: c?.name ?? "Color", onRemove: () => toggleMulti("colorIds", id) }
    }),
    ...filters.sizeIds.map((id) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const s = sizes.find((x: any) => x.id === id)
      return { label: s?.name ?? "Size", onRemove: () => toggleMulti("sizeIds", id) }
    }),
    ...(filters.stock ? [{ label: filters.stock === "IN_STOCK" ? "In Stock" : "Out of Stock", onRemove: () => updateParams({ stock: null }) }] : []),
    ...(filters.minPrice || filters.maxPrice
      ? [{ label: `$${filters.minPrice || priceBounds.min} – $${filters.maxPrice || priceBounds.max}`, onRemove: () => updateParams({ minPrice: null, maxPrice: null }) }]
      : []),
    ...(filters.featured ? [{ label: "Featured", onRemove: () => updateParams({ featured: null }) }] : []),
    ...(filters.onSale ? [{ label: "On Sale", onRemove: () => updateParams({ sale: null }) }] : []),
    ...(filters.newArrivals ? [{ label: "New Arrivals", onRemove: () => updateParams({ newArrivals: null }) }] : []),
  ]

  const filterPanelProps = {
    categories,
    colors,
    sizes,
    priceBounds,
    filters: { ...filters, minPrice: priceDraft.min, maxPrice: priceDraft.max },
    onToggle: toggleMulti,
    onStockChange: (value: ShopFiltersState["stock"]) => updateParams({ stock: value || null }),
    onPriceChange: (min: string, max: string) => {
      setPriceDraft({ min, max })
      debouncedUpdate({ minPrice: min || null, maxPrice: max || null })
    },
    onFlagChange: (key: "featured" | "onSale" | "newArrivals", value: boolean) => {
      const urlKey = key === "onSale" ? "sale" : key
      updateParams({ [urlKey]: value ? "1" : null })
    },
    onClearAll: clearAll,
    activeCount: activeFilterCount,
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <div className="px-6 md:px-10 py-10 md:py-14">
        {/* Breadcrumb */}
        <div className="text-breadcrumb text-muted-foreground flex items-center gap-1.5 mb-6">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <span>/</span>
          <span className="text-foreground">Shop</span>
        </div>

        {/* Heading */}
        <div className="mb-10">
          <h1 className="text-page-title text-foreground">Shop</h1>
          <p className="subtitle-text text-muted-foreground mt-2">Considered pieces, made to last.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-10">
          {/* Desktop sidebar */}
          <aside className="hidden md:block w-56 shrink-0">
            <ShopFilterPanel {...filterPanelProps} />
          </aside>

          {/* Main column */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <div className="flex items-center gap-3 flex-1 min-w-[200px]">
                <div className="relative flex-1 max-w-xs">
                  <Input
                    type="text"
                    value={searchInput}
                    onChange={(e) => {
                      setSearchInput(e.target.value)
                      debouncedUpdate({ q: e.target.value || null })
                    }}
                    placeholder="Search products…"
                    className="text-field-value h-9 pr-8"
                  />
                  {searchInput && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => {
                        setSearchInput("")
                        updateParams({ q: null })
                      }}
                      aria-label="Clear search"
                      className="absolute right-1 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      <X className="h-3.5 w-3.5" strokeWidth={1.5} />
                    </Button>
                  )}
                </div>

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setMobileFiltersOpen(true)}
                  className="btn-label md:hidden h-9"
                >
                  <SlidersHorizontal className="h-3.5 w-3.5" strokeWidth={1.5} />
                  Filters{activeFilterCount > 0 ? ` (${activeFilterCount})` : ""}
                </Button>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-breadcrumb text-muted-foreground hidden sm:inline">
                  {meta.total === 0 ? "No products" : `Showing ${rangeStart}–${rangeEnd} of ${meta.total} products`}
                </span>
                <Select value={sortKey} onValueChange={(value) => updateParams({ sort: value as string })}>
                  <SelectTrigger className="text-field-value h-9 w-auto">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {SORT_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Active filter chips */}
            {activeChips.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {activeChips.map((chip, i) => (
                  <Button
                    key={`${chip.label}-${i}`}
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={chip.onRemove}
                    className="text-filter-option h-auto rounded-full px-3 py-1 text-foreground"
                  >
                    {chip.label}
                    <X className="h-3 w-3" strokeWidth={1.5} />
                  </Button>
                ))}
              </div>
            )}

            {/* Grid / states */}
            {isError ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <p className="text-foreground font-body" style={{ fontSize: "14px" }}>Something went wrong loading products.</p>
                <Button type="button" variant="outline" onClick={() => refetch()} className="btn-label mt-4 h-9">
                  <RefreshCcw className="h-3.5 w-3.5" strokeWidth={1.5} />
                  Retry
                </Button>
              </div>
            ) : isLoading ? (
              <ProductGrid loading skeletonCount={8} />
            ) : products.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <PackageSearch className="w-8 h-8 text-muted-foreground mb-3" strokeWidth={1.5} />
                <p className="text-foreground font-body" style={{ fontSize: "14px" }}>No products match your filters.</p>
                {activeFilterCount > 0 && (
                  <Button type="button" variant="outline" onClick={clearAll} className="btn-label mt-4 h-9">
                    Clear Filters
                  </Button>
                )}
              </div>
            ) : (
              <div className="transition-opacity duration-200" style={{ opacity: isFetching ? 0.6 : 1 }}>
                <ProductGrid products={products} />
              </div>
            )}

            {!isError && products.length > 0 && (
              <ShopPagination page={meta.page} totalPages={meta.totalPage} onPageChange={(p) => updateParams({ page: String(p) }, false)} />
            )}
          </div>
        </div>
      </div>

      <SiteFooter />

      {/* Mobile filter drawer */}
      <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
        <SheetContent side="left" className="w-full sm:max-w-sm overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="form-label-text uppercase">Filters</SheetTitle>
          </SheetHeader>
          <div className="px-4 pb-6">
            <ShopFilterPanel {...filterPanelProps} />
          </div>
        </SheetContent>
      </Sheet>
    </main>
  )
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <ShopPageContent />
    </Suspense>
  )
}
