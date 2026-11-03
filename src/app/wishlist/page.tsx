"use client"

import Link from "next/link"
import { useSelector } from "react-redux"
import { Heart } from "lucide-react"
import { SiteHeader } from "@/components/home/site-header"
import { SiteFooter } from "@/components/shared/footer"
import { Button } from "@/components/ui/button"
import { ProductGrid } from "@/components/shared/product-grid"
import type { ProductCardData } from "@/components/shop/product-card"
import type { RootState } from "@/redux/store"

interface WishlistItem {
  id: string
  name: string
  slug?: string
  image?: string
  price: number
  wishlist: boolean
}

export default function WishlistPage() {
  const items: WishlistItem[] = useSelector((state: RootState) =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ((state as any).wishlist?.product ?? []).filter((p: WishlistItem) => p.wishlist)
  )

  const products: ProductCardData[] = items.map((item) => ({
    id: item.id,
    name: item.name,
    slug: item.slug ?? item.id,
    regularPrice: item.price,
    salePrice: null,
    stockQuantity: 1,
    images: item.image ? [{ url: item.image }] : [],
    variants: [],
    category: null,
  }))

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <div className="px-6 md:px-10 py-10 md:py-14">
        <div className="text-breadcrumb text-muted-foreground flex items-center gap-1.5 mb-6">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <span>/</span>
          <span className="text-foreground">Wishlist</span>
        </div>

        <h1 className="text-page-title text-foreground mb-10">Wishlist</h1>

        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <Heart className="w-8 h-8 text-muted-foreground mb-3" strokeWidth={1.5} />
            <p className="text-foreground font-body" style={{ fontSize: "14px" }}>Your wishlist is empty.</p>
            <Button render={<Link href="/shop" />} variant="outline" className="btn-label mt-4 h-9">
              Continue Shopping
            </Button>
          </div>
        ) : (
          <ProductGrid products={products} />
        )}
      </div>

      <SiteFooter />
    </main>
  )
}
