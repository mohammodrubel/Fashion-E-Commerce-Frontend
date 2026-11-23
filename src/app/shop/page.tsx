"use client"

import { Suspense, useEffect, useMemo, useRef, useState } from "react"
import Link from "next/link"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { SlidersHorizontal, X, RefreshCcw, PackageSearch, Search } from "lucide-react"
import { cn } from "@/lib/utils"
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

// Rounded to the start of the day so the value is stable between renders;
// a per-millisecond timestamp would change the query args every render and
// make RTK Query refetch in a loop while "New Arrivals" is on.
function newArrivalsStart(): string {
  const dayMs = 24 * 60 * 60 * 1000
  const today = Math.floor(Date.now() / dayMs) * dayMs
  return new Date(today - NEW_ARRIVALS_WINDOW_DAYS * dayMs).toISOString()
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

  const newArrivalsFrom = useMemo(
    () => (filters.newArrivals ? newArrivalsStart() : undefined),
    [filters.newArrivals]
  )

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
    startDate: newArrivalsFrom,
  }

  // currentData is only the result for the *current* filters (undefined while
// a new filter is loading), so products from the previous filter are never
// shown faded/stale.
  const { currentData, isLoading, isFetching, isError, refetch } = useGetAllProductsQuery(queryParams)
  const isLoadingProducts = isLoading || (isFetching && !currentData)
  const products: ProductCardData[] = currentData?.data ?? []
  const meta = currentData?.meta ?? { page: 1, limit: PAGE_SIZE, total: 0, totalPage: 1 }

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

  const gridTopRef = useRef<HTMLDivElement>(null)
  const singleCategoryId = filters.categoryIds.length === 1 ? filters.categoryIds[0] : null

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      {/* Page hero */}
      <section className="border-b border-border bg-gradient-to-b from-white to-background">
        <div className="mx-auto max-w-[1600px] px-6 md:px-10 pt-8 pb-10 md:pt-10 md:pb-12 text-center">
          <div className="text-breadcrumb text-muted-foreground flex items-center justify-center gap-1.5 mb-5">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <span>/</span>
            <span className="text-foreground">Shop</span>
          </div>

          <p className="text-label-caps text-muted-foreground mb-3" style={{ letterSpacing: "0.35em" }}>
            The Collection
          </p>
          <h1 className="text-page-title text-foreground">Shop</h1>
          <p className="subtitle-text text-muted-foreground mt-3">Considered pieces, made to last.</p>

          {categories.length > 0 && (
            <div className="mt-8 -mx-6 px-6 md:mx-0 md:px-0 overflow-x-auto [scrollbar-width:none]">
              <div className="flex md:flex-wrap md:justify-center gap-2 w-max md:w-auto mx-auto">
                <button
                  type="button"
                  onClick={() => updateParams({ category: null })}
                  aria-pressed={filters.categoryIds.length === 0}
                  className={cn(
                    "text-label-caps shrink-0 rounded-full border px-4 py-2 transition-colors",
                    filters.categoryIds.length === 0
                      ? "border-foreground bg-foreground text-background"
                      : "border-border bg-white text-foreground/70 hover:border-foreground/50 hover:text-foreground"
                  )}
                >
                  All
                </button>
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {categories.map((cat: any) => {
                  const active = singleCategoryId === cat.id
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => updateParams({ category: active ? null : cat.id })}
                      aria-pressed={active}
                      className={cn(
                        "text-label-caps shrink-0 rounded-full border px-4 py-2 transition-colors",
                        active
                          ? "border-foreground bg-foreground text-background"
                          : "border-border bg-white text-foreground/70 hover:border-foreground/50 hover:text-foreground"
                      )}
                    >
                      {cat.name}
                    </button>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </section>

      <div className="mx-auto max-w-[1600px] px-6 md:px-10 py-8 md:py-12">
        <div className="flex flex-col md:flex-row gap-8 lg:gap-10">
          {/* Desktop sidebar */}
          <aside className="hidden md:block w-60 shrink-0">
            <div className="rounded-xl border border-border bg-white p-5 shadow-sm">
              <ShopFilterPanel {...filterPanelProps} />
            </div>
          </aside>

          {/* Main column */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="mb-5 flex flex-wrap items-center gap-3 rounded-xl border border-border bg-white p-3">
              <div className="relative min-w-[180px] flex-1">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" strokeWidth={1.5} />
                <Input
                  type="text"
                  value={searchInput}
                  onChange={(e) => {
                    setSearchInput(e.target.value)
                    debouncedUpdate({ q: e.target.value || null })
                  }}
                  placeholder="Search products…"
                  className="text-field-value h-9 border-transparent bg-muted pl-9 pr-8 focus-visible:bg-white"
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

              <div className="ml-auto flex items-center gap-3">
                <span className="text-breadcrumb text-muted-foreground hidden sm:inline whitespace-nowrap">
                  {meta.total === 0 ? "No products" : `Showing ${rangeStart}–${rangeEnd} of ${meta.total}`}
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
              <div className="mb-6 flex flex-wrap items-center gap-2">
                {activeChips.map((chip, i) => (
                  <button
                    key={`${chip.label}-${i}`}
                    type="button"
                    onClick={chip.onRemove}
                    className="text-filter-option inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-secondary-foreground transition-colors hover:bg-accent"
                  >
                    {chip.label}
                    <X className="h-3 w-3" strokeWidth={1.5} />
                  </button>
                ))}
                <button
                  type="button"
                  onClick={clearAll}
                  className="link-text ml-1 text-muted-foreground underline underline-offset-4 hover:text-foreground"
                >
                  Clear all
                </button>
              </div>
            )}

            {/* Grid / states */}
            <div ref={gridTopRef} className="scroll-mt-52" />
            {isError ? (
              <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-white py-24 text-center">
                <p className="text-foreground font-body" style={{ fontSize: "14px" }}>Something went wrong loading products.</p>
                <Button type="button" variant="outline" onClick={() => refetch()} className="btn-label mt-4 h-9">
                  <RefreshCcw className="h-3.5 w-3.5" strokeWidth={1.5} />
                  Retry
                </Button>
              </div>
            ) : isLoadingProducts ? (
              <ProductGrid loading skeletonCount={8} />
            ) : products.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-white py-24 text-center">
                <PackageSearch className="w-8 h-8 text-muted-foreground mb-3" strokeWidth={1.5} />
                <p className="text-foreground font-body" style={{ fontSize: "14px" }}>No products match your filters.</p>
                {activeFilterCount > 0 && (
                  <Button type="button" variant="outline" onClick={clearAll} className="btn-label mt-4 h-9">
                    Clear Filters
                  </Button>
                )}
              </div>
            ) : (
              <ProductGrid products={products} />
            )}

            {!isError && products.length > 0 && (
              <ShopPagination
                page={meta.page}
                totalPages={meta.totalPage}
                onPageChange={(p) => {
                  updateParams({ page: String(p) }, false)
                  gridTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
                }}
              />
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
