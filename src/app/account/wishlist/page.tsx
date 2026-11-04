"use client"

import Link from "next/link"
import { useSelector } from "react-redux"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProductCard, type ProductCardData } from "@/components/shop/product-card"
import type { RootState } from "@/redux/store"

export default function AccountWishlistPage() {
  // The full product (same shape the Shop card renders — sizes, stock,
  // discount, images) is stored directly on the wishlist item, so it
  // renders through the exact same <ProductCard/> with no data loss.
  const products: ProductCardData[] = useSelector((state: RootState) =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ((state as any).wishlist?.product ?? []).filter((p: any) => p.wishlist)
  )

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-semibold text-foreground" style={{ fontSize: "20px" }}>My Wishlist</h1>
        <p className="text-muted-foreground mt-0.5" style={{ fontSize: "13px" }}>
          {products.length} saved item{products.length === 1 ? "" : "s"}
        </p>
      </div>

      {products.length === 0 ? (
        <div className="bg-white rounded-xl border border-border/50 py-16 flex flex-col items-center gap-3 text-center">
          <div className="w-12 h-12 rounded-full flex items-center justify-center bg-primary/10">
            <Heart className="w-6 h-6 text-primary" strokeWidth={1.5} />
          </div>
          <p className="font-medium text-foreground" style={{ fontSize: "14px" }}>Your wishlist is empty</p>
          <p className="text-muted-foreground" style={{ fontSize: "12px" }}>
            Save items you love while you shop
          </p>
          <Button render={<Link href="/shop" />} variant="outline" className="btn-label mt-2 h-9">
            Continue Shopping
          </Button>
        </div>
      ) : (
        // Fixed 1 / 2 / 3 columns (never 4) — the account layout's sidebar
        // narrows the content area vs. Shop's full-width grid, so capping
        // at 3 here (instead of reusing ProductGrid's up-to-4 breakpoints)
        // keeps each card's width — and the card itself — uncompressed.
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-10">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}
