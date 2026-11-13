"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { addToCart } from "@/redux/fetchers/cart/cartSlice"
import { addToWishlist } from "@/redux/fetchers/wishlist/wishlist"
import type { RootState } from "@/redux/store"

export interface ProductCardSize {
  id: string
  name: string
}

export interface ProductCardVariant {
  id: string
  sizeId: string
  colorId?: string
  isActive: boolean
  stock: number
  size?: ProductCardSize | null
}

export interface ProductCardData {
  id: string
  name: string
  slug: string
  regularPrice: string | number
  salePrice?: string | number | null
  stockQuantity: number
  images?: { url: string }[]
  variants?: ProductCardVariant[]
  category?: { name: string } | null
}

const EASE = "cubic-bezier(0,0,0.18,1)"

export function ProductCard({ product }: { product: ProductCardData }) {
  const dispatch = useDispatch()
  const [selectedSizeId, setSelectedSizeId] = useState<string | null>(null)

  const isWishlisted = useSelector((state: RootState) =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (state as any).wishlist?.product?.find((p: any) => p.id === product.id)?.wishlist
  )

  const image = product.images?.[0]?.url
  const regular = Number(product.regularPrice)
  const sale = product.salePrice != null ? Number(product.salePrice) : null
  const hasDiscount = sale !== null && sale < regular
  const discountPct = hasDiscount ? Math.round(((regular - sale!) / regular) * 100) : 0
  const inStock = product.stockQuantity > 0
  const effectivePrice = hasDiscount ? (sale as number) : regular

  const sizes = Array.from(
    new Map(
      (product.variants ?? [])
        .filter((v) => v.isActive && v.size)
        .map((v) => [v.sizeId, v.size as ProductCardSize])
    ).values()
  )

  // Exact variant for a size — always the first active variant so the cart
  // tracks one precise variantId/stock, never a sum across colors.
  function variantForSize(sizeId: string): ProductCardVariant | undefined {
    return (product.variants ?? []).find((v) => v.isActive && v.sizeId === sizeId)
  }

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault()
    if (!inStock) return
    if (sizes.length > 0 && !selectedSizeId) {
      toast.error("Please select a size first.")
      return
    }

    const variant = selectedSizeId ? variantForSize(selectedSizeId) : undefined
    const stock = variant ? variant.stock : product.stockQuantity
    if (stock <= 0) {
      toast.error("That size is out of stock.")
      return
    }

    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        slug: product.slug,
        image,
        price: effectivePrice,
        sizeId: selectedSizeId ?? undefined,
        colorId: variant?.colorId,
        stock,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any)
    )
  }

  function handleSizeSelect(e: React.MouseEvent, sizeId: string) {
    e.preventDefault()
    e.stopPropagation()
    setSelectedSizeId((current) => (current === sizeId ? null : sizeId))
  }

  function handleWishlistToggle(e: React.MouseEvent) {
    e.preventDefault()
    dispatch(
      // Store the full product (same shape the Shop card renders) so the
      // Wishlist page can render the identical card, sizes and all.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      addToWishlist(product as any)
    )
  }

  return (
    <div className="group relative w-full bg-white p-[15px]">
      {/* box-up */}
      <div className="relative h-[300px] w-full overflow-hidden text-center">
        <Link href={`/product/${product.slug}`} className="absolute inset-0 block">
          {image ? (
            <Image
              src={image}
              alt={product.name}
              fill
              sizes="(min-width: 1200px) 25vw, (min-width: 769px) 33vw, (min-width: 446px) 50vw, 100vw"
              className="object-cover transition-all duration-[800ms] group-hover:opacity-40 group-hover:blur-[7px]"
              style={{ transitionTimingFunction: EASE }}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-muted-foreground" style={{ fontSize: "11px" }}>
              No image
            </div>
          )}
        </Link>

        {hasDiscount && (
          <span className="text-discount-label pointer-events-none absolute left-2 top-2 rounded-full bg-primary px-2 py-1 text-primary-foreground">
            -{discountPct}%
          </span>
        )}
        {!inStock && (
          <span className="text-badge pointer-events-none absolute left-2 top-2 rounded-full bg-foreground/80 px-2 py-1 text-background">
            Out of stock
          </span>
        )}

        <button
          type="button"
          onClick={handleWishlistToggle}
          aria-label="Toggle wishlist"
          className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-background/90 text-foreground/70 opacity-0 transition-opacity duration-300 hover:text-destructive focus-visible:opacity-100 group-hover:opacity-100"
        >
          <Heart className="h-3.5 w-3.5" strokeWidth={1.5} fill={isWishlisted ? "currentColor" : "none"} />
        </button>

        {/* info-inner: name + available sizes, always visible, slides further up on hover */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-[25px] transition-all duration-[400ms] group-hover:bottom-[155px]"
          style={{ transitionTimingFunction: EASE }}
        >
          <span className="text-product-name block text-foreground" style={{ fontSize: "18px" }}>
            {product.name}
          </span>
          {sizes.length > 0 && (
            <span
              className="text-category-label pointer-events-auto block cursor-default text-muted-foreground"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
              }}
            >
              {sizes.map((s) => s.name).join(" , ")}
            </span>
          )}
        </div>
      </div>

      {/* box-down */}
      <div className="relative h-[60px] w-full overflow-hidden">
        <div
          className="absolute inset-y-0 left-[-660px] h-full w-[660px] bg-primary transition-all duration-[800ms] group-hover:left-0"
          style={{ transitionTimingFunction: EASE }}
        />

        <button
          type="button"
          onClick={handleAddToCart}
          disabled={!inStock}
          className="absolute inset-0 h-full w-full disabled:cursor-not-allowed"
        >
          <span
            className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-start gap-0.5 whitespace-nowrap text-foreground transition-all duration-[600ms] delay-100 group-hover:left-[20px] group-hover:translate-x-0 group-hover:-translate-y-1/2 group-hover:text-primary-foreground"
            style={{ transitionTimingFunction: EASE }}
          >
            <span
              className={cn("flex items-center", hasDiscount ? "w-[180px] justify-between" : "gap-1.5")}
              style={{ fontSize: "16px" }}
            >
              {hasDiscount && (
                <span className="text-muted-foreground line-through group-hover:text-primary-foreground/60" style={{ fontSize: "13px" }}>
                  ${regular.toFixed(2)}
                </span>
              )}
              <span>${effectivePrice.toFixed(2)}</span>
            </span>
            {sizes.length > 0 && (
              <span className="inline-flex flex-wrap items-center gap-x-3 gap-y-1.5">
                {sizes.map((s) => (
                  <span
                    key={s.id}
                    onClick={(e) => handleSizeSelect(e, s.id)}
                    className={cn(
                      "cursor-pointer rounded px-1 py-0.5 text-muted-foreground underline-offset-2 transition-colors group-hover:text-primary-foreground/70",
                      selectedSizeId === s.id && "text-foreground underline group-hover:text-primary-foreground"
                    )}
                    style={{ fontSize: "10px" }}
                  >
                    {s.name}
                  </span>
                ))}
              </span>
            )}
          </span>
          <span
            className="absolute top-1/2 -right-[120px] -translate-y-1/2 transition-all duration-[600ms] delay-100 group-hover:right-[15px]"
            style={{ transitionTimingFunction: EASE }}
          >
            <span
              className="font-ui font-medium whitespace-nowrap uppercase text-primary-foreground"
              style={{ fontSize: "12px", letterSpacing: "0.045em" }}
            >
              {inStock ? "Add in cart" : "Out of stock"}
            </span>
          </span>
        </button>
      </div>
    </div>
  )
}

export function ProductCardSkeleton() {
  return (
    <div className="w-full bg-white p-[15px]">
      <div className="h-[300px] w-full animate-pulse bg-muted" />
      <div className="mt-2 h-[60px] w-full animate-pulse bg-muted/60" />
    </div>
  )
}
