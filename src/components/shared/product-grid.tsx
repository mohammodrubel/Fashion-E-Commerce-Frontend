import { cn } from "@/lib/utils"
import { ProductCard, ProductCardSkeleton, type ProductCardData } from "@/components/shop/product-card"

/**
 * Global responsive column rules, used by every product listing on the site
 * (Shop, homepage sections, category/featured/new-arrivals/related/search):
 * 320–445px: 1 · 446–768px: 2 · 769–1199px: 3 · 1200px+: 4.
 * The breakpoints (grid-2/grid-3/grid-4) are custom — defined in globals.css
 * since none of Tailwind's default sm/md/lg/xl land on these exact widths.
 */
export const PRODUCT_GRID_CLASSES = "grid grid-cols-1 grid-2:grid-cols-2 grid-3:grid-cols-3 grid-4:grid-cols-4 gap-x-5 gap-y-10"

interface ProductGridProps {
  products?: ProductCardData[]
  loading?: boolean
  skeletonCount?: number
  className?: string
}

export function ProductGrid({ products, loading, skeletonCount = 8, className }: ProductGridProps) {
  if (loading) {
    return (
      <div className={cn(PRODUCT_GRID_CLASSES, className)}>
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    )
  }

  return (
    <div className={cn(PRODUCT_GRID_CLASSES, className)}>
      {(products ?? []).map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
