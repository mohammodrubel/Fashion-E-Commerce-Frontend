"use client"

import { useMemo, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { useDispatch, useSelector } from "react-redux"
import { Heart, Minus, Plus, ShoppingBag, PackageCheck, PackageX } from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { SiteHeader } from "@/components/home/site-header"
import { SiteFooter } from "@/components/shared/footer"
import { Button } from "@/components/ui/button"
import { ProductSlider } from "@/components/home/product-slider"
import { useGetSingleProductQuery, useGetAllProductsQuery } from "@/redux/fetchers/product/productApi"
import { useGetAllSizesQuery } from "@/redux/fetchers/size/sizeApi"
import { addToCart, setQuantity as setCartQuantity } from "@/redux/fetchers/cart/cartSlice"
import { addToWishlist } from "@/redux/fetchers/wishlist/wishlist"
import type { RootState } from "@/redux/store"
import type { ProductCardData } from "@/components/shop/product-card"

interface Size {
  id: string
  name: string
}

interface Color {
  id: string
  name: string
  hexCode: string | null
}

interface Variant {
  id: string
  sizeId: string
  colorId: string
  sku: string
  stock: number
  isActive: boolean
  size: Size
  color: Color
}

interface Product {
  id: string
  name: string
  slug: string
  shortDescription: string | null
  description: string | null
  sku: string | null
  regularPrice: string | number
  salePrice: string | number | null
  categoryId: string
  category: { id: string; name: string; slug: string } | null
  images: { url: string }[]
  variants: Variant[]
}

const SIZE_ORDER = ["XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL"]

function sortSizes(sizes: Size[]) {
  return [...sizes].sort((a, b) => {
    const ai = SIZE_ORDER.indexOf(a.name.toUpperCase())
    const bi = SIZE_ORDER.indexOf(b.name.toUpperCase())
    if (ai === -1 && bi === -1) return a.name.localeCompare(b.name)
    if (ai === -1) return 1
    if (bi === -1) return -1
    return ai - bi
  })
}

export default function ProductDetailsPage() {
  const params = useParams<{ slug: string }>()
  const dispatch = useDispatch()
  const { data, isLoading, isError } = useGetSingleProductQuery(params.slug)
  const { data: sizesData } = useGetAllSizesQuery(undefined)
  const product: Product | undefined = data?.data

  const [activeImage, setActiveImage] = useState(0)
  const [selectedColorId, setSelectedColorId] = useState<string | null>(null)
  const [selectedSizeId, setSelectedSizeId] = useState<string | null>(null)
  const [qty, setQty] = useState(1)

  const isWishlisted = useSelector((state: RootState) =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (state as any).wishlist?.product?.find((p: any) => p.id === product?.id)?.wishlist
  )

  const colors: Color[] = useMemo(() => {
    if (!product) return []
    const map = new Map<string, Color>()
    product.variants.filter((v) => v.isActive).forEach((v) => map.set(v.color.id, v.color))
    return Array.from(map.values())
  }, [product])

  const allSizes: Size[] = sortSizes(sizesData?.data ?? [])

  // No color explicitly picked yet — default to the first one without an
  // effect; clicking a swatch still goes through setSelectedColorId as usual.
  const effectiveColorId = selectedColorId ?? colors[0]?.id ?? null

  // Reset size/quantity when the effective color changes. Adjusting state
  // during render (React's documented pattern for "reset on prop change")
  // instead of in an effect, so there's no extra commit/flicker.
  const [prevColorId, setPrevColorId] = useState(effectiveColorId)
  if (prevColorId !== effectiveColorId) {
    setPrevColorId(effectiveColorId)
    setSelectedSizeId(null)
    setQty(1)
  }

  function variantFor(sizeId: string, colorId: string | null) {
    if (!product || !colorId) return undefined
    return product.variants.find((v) => v.isActive && v.sizeId === sizeId && v.colorId === colorId)
  }

  const selectedVariant = selectedSizeId ? variantFor(selectedSizeId, effectiveColorId) : undefined

  if (isLoading) {
    return (
      <main className="min-h-screen bg-background text-foreground">
        <SiteHeader />
        <div className="px-6 md:px-10 py-16 grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="aspect-[4/5] bg-muted animate-pulse rounded-md" />
          <div className="space-y-4">
            <div className="h-5 w-24 bg-muted animate-pulse rounded" />
            <div className="h-10 w-2/3 bg-muted animate-pulse rounded" />
            <div className="h-6 w-32 bg-muted animate-pulse rounded" />
          </div>
        </div>
        <SiteFooter />
      </main>
    )
  }

  if (isError || !product) {
    return (
      <main className="min-h-screen bg-background text-foreground">
        <SiteHeader />
        <div className="px-6 md:px-10 py-24 text-center">
          <p className="text-page-title text-foreground">Product not found</p>
          <Button render={<Link href="/shop" />} variant="outline" className="btn-label mt-6 h-10">
            Back to Shop
          </Button>
        </div>
        <SiteFooter />
      </main>
    )
  }

  const regular = Number(product.regularPrice)
  const sale = product.salePrice != null ? Number(product.salePrice) : null
  const hasDiscount = sale !== null && sale < regular
  const discountPct = hasDiscount ? Math.round(((regular - sale!) / regular) * 100) : 0
  const effectivePrice = hasDiscount ? (sale as number) : regular
  const image = product.images?.[activeImage]?.url ?? product.images?.[0]?.url

  function handleAddToCart() {
    if (!product) return
    if (colors.length > 0 && !effectiveColorId) {
      toast.error("Please select a color first.")
      return
    }
    if (!selectedSizeId) {
      toast.error("Please select a size first.")
      return
    }
    if (!selectedVariant || selectedVariant.stock <= 0) {
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
        sizeId: selectedVariant.sizeId,
        colorId: selectedVariant.colorId,
        stock: selectedVariant.stock,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any)
    )
    if (qty > 1) {
      dispatch(
        setCartQuantity({
          id: product.id,
          sizeId: selectedVariant.sizeId,
          colorId: selectedVariant.colorId,
          quantity: qty,
        })
      )
    }
  }

  function handleWishlistToggle() {
    if (!product) return
    dispatch(
      addToWishlist({
        ...product,
        wishlist: true,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any)
    )
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      {/* ── Breadcrumb ── */}
      <div className="px-6 md:px-10 pt-8">
        <div className="text-breadcrumb text-muted-foreground flex items-center gap-1.5 flex-wrap">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-foreground transition-colors">Shop</Link>
          {product.category && (
            <>
              <span>/</span>
              <Link href={`/shop?category=${product.category.id}`} className="hover:text-foreground transition-colors">
                {product.category.name}
              </Link>
            </>
          )}
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </div>
      </div>

      {/* ── Main ── */}
      <div className="px-6 md:px-10 py-10 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
        {/* Gallery */}
        <div>
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-muted group">
            {image ? (
              <Image
                src={image}
                alt={product.name}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                priority
                className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-muted-foreground text-sm">No image</div>
            )}
            {hasDiscount && (
              <span className="text-discount-label absolute left-3 top-3 rounded-full bg-primary px-2.5 py-1 text-primary-foreground">
                -{discountPct}%
              </span>
            )}
          </div>

          {product.images.length > 1 && (
            <div className="flex gap-3 mt-4 overflow-x-auto">
              {product.images.map((img, i) => (
                <button
                  key={img.url + i}
                  onClick={() => setActiveImage(i)}
                  className={cn(
                    "relative w-20 h-24 shrink-0 overflow-hidden bg-muted border transition-colors",
                    activeImage === i ? "border-foreground" : "border-transparent hover:border-border"
                  )}
                >
                  <Image src={img.url} alt={`${product.name} ${i + 1}`} fill sizes="80px" className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          {product.category && (
            <span className="text-category-label text-muted-foreground">{product.category.name}</span>
          )}
          <h1 className="text-pdp-name text-foreground mt-2">{product.name}</h1>

          <div className="flex items-center gap-3 mt-4">
            {hasDiscount && (
              <span className="text-pdp-price-original text-muted-foreground">${regular.toFixed(2)}</span>
            )}
            <span className="text-pdp-price text-foreground">${effectivePrice.toFixed(2)}</span>
          </div>

          {product.shortDescription && (
            <p className="text-pdp-description text-muted-foreground mt-5 leading-relaxed">
              {product.shortDescription}
            </p>
          )}

          <div className="h-px bg-border/60 my-7" />

          {/* Color */}
          {colors.length > 0 && (
            <div className="mb-7">
              <p className="form-label-text text-foreground uppercase mb-3" style={{ letterSpacing: "0.08em" }}>
                Color
                {effectiveColorId && (
                  <span className="text-muted-foreground font-normal ml-1.5 normal-case" style={{ letterSpacing: 0 }}>
                    — {colors.find((c) => c.id === effectiveColorId)?.name}
                  </span>
                )}
              </p>
              <div className="flex items-center gap-3">
                {colors.map((color) => (
                  <button
                    key={color.id}
                    type="button"
                    aria-label={color.name}
                    onClick={() => setSelectedColorId(color.id)}
                    className={cn(
                      "w-9 h-9 rounded-full p-0.5 border-2 transition-colors",
                      effectiveColorId === color.id ? "border-foreground" : "border-transparent hover:border-border"
                    )}
                  >
                    <span
                      className="block w-full h-full rounded-full border border-border/40"
                      style={{ backgroundColor: color.hexCode ?? "#ccc" }}
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size */}
          <div className="mb-7">
            <p className="form-label-text text-foreground uppercase mb-3" style={{ letterSpacing: "0.08em" }}>
              Size
            </p>
            <div className="flex flex-wrap gap-2.5">
              {allSizes.map((size) => {
                const variant = variantFor(size.id, effectiveColorId)
                const existsForProduct = product.variants.some((v) => v.isActive && v.sizeId === size.id)
                const existsForColor = Boolean(variant)
                const outOfStock = existsForColor && variant!.stock <= 0
                const selectable = existsForColor && !outOfStock
                const selected = selectedSizeId === size.id

                return (
                  <button
                    key={size.id}
                    type="button"
                    disabled={!selectable}
                    onClick={() => selectable && setSelectedSizeId(size.id)}
                    title={
                      !existsForProduct
                        ? "Not available for this product"
                        : !existsForColor
                        ? "Not available in this color"
                        : outOfStock
                        ? "Out of stock"
                        : size.name
                    }
                    className={cn(
                      "relative w-11 h-11 flex items-center justify-center border text-sm font-ui transition-colors",
                      selected
                        ? "bg-primary text-primary-foreground border-primary"
                        : selectable
                        ? "border-border text-foreground hover:border-foreground"
                        : "border-border/50 text-muted-foreground/50 cursor-not-allowed"
                    )}
                  >
                    {size.name}
                    {/* Doesn't exist for this product at all — diagonal strike corner to corner */}
                    {!existsForProduct && (
                      <span
                        aria-hidden
                        className="absolute inset-0 pointer-events-none text-border"
                        style={{
                          background:
                            "linear-gradient(to bottom right, transparent calc(50% - 0.5px), currentColor calc(50% - 0.5px) calc(50% + 0.5px), transparent calc(50% + 0.5px))",
                        }}
                      />
                    )}
                    {/* Exists but sold out for this color — subtle X, not a diagonal cut */}
                    {outOfStock && (
                      <span
                        aria-hidden
                        className="absolute inset-0 flex items-center justify-center text-muted-foreground/60 pointer-events-none"
                        style={{ fontSize: "9px" }}
                      >
                        <PackageX className="w-3.5 h-3.5" strokeWidth={1.5} />
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Stock */}
          {selectedVariant && (
            <div className="flex items-center gap-2 mb-7">
              <PackageCheck className="w-4 h-4 text-primary" strokeWidth={1.5} />
              <span className="font-body text-foreground" style={{ fontSize: "13px" }}>
                {selectedVariant.stock <= 5
                  ? `Only ${selectedVariant.stock} left in stock`
                  : `${selectedVariant.stock} in stock`}
              </span>
            </div>
          )}

          {/* Quantity + actions */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center border border-border h-11">
              <button
                type="button"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="w-10 h-full flex items-center justify-center text-foreground/70 hover:text-foreground transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus className="w-3.5 h-3.5" strokeWidth={1.5} />
              </button>
              <span className="w-10 text-center font-body text-sm">{qty}</span>
              <button
                type="button"
                onClick={() => setQty((q) => (selectedVariant ? Math.min(selectedVariant.stock, q + 1) : q + 1))}
                className="w-10 h-full flex items-center justify-center text-foreground/70 hover:text-foreground transition-colors"
                aria-label="Increase quantity"
              >
                <Plus className="w-3.5 h-3.5" strokeWidth={1.5} />
              </button>
            </div>

            <Button onClick={handleAddToCart} className="btn-label h-11 px-8 flex-1 sm:flex-none">
              <ShoppingBag className="w-4 h-4" strokeWidth={1.5} />
              Add to Cart
            </Button>

            <button
              type="button"
              onClick={handleWishlistToggle}
              aria-label="Toggle wishlist"
              className="w-11 h-11 flex items-center justify-center border border-border text-foreground/70 hover:text-destructive transition-colors"
            >
              <Heart className="w-4.5 h-4.5" strokeWidth={1.5} fill={isWishlisted ? "currentColor" : "none"} />
            </button>
          </div>

          {colors.length > 0 && allSizes.length > 0 && (
            <>
              <div className="h-px bg-border/60 my-8" />
              <StockMatrix
                colors={colors}
                sizes={allSizes}
                variants={product.variants}
                selectedSizeId={selectedSizeId}
                effectiveColorId={effectiveColorId}
              />
            </>
          )}

          {product.description && (
            <>
              <div className="h-px bg-border/60 my-8" />
              <h2 className="text-pdp-subheading text-foreground mb-3">Details</h2>
              <p className="text-pdp-description text-muted-foreground leading-relaxed whitespace-pre-line">
                {product.description}
              </p>
            </>
          )}
        </div>
      </div>

      <RelatedProducts categoryId={product.categoryId} excludeId={product.id} />

      <SiteFooter />
    </main>
  )
}

function StockMatrix({
  colors,
  sizes,
  variants,
  selectedSizeId,
  effectiveColorId,
}: {
  colors: Color[]
  sizes: Size[]
  variants: Variant[]
  selectedSizeId: string | null
  effectiveColorId: string | null
}) {
  function stockOf(sizeId: string, colorId: string) {
    const variant = variants.find((v) => v.isActive && v.sizeId === sizeId && v.colorId === colorId)
    return variant ? variant.stock : null
  }

  return (
    <div>
      <h2 className="text-pdp-subheading text-foreground mb-2">Availability by Size &amp; Color</h2>
      <p className="font-body text-muted-foreground mb-5" style={{ fontSize: "13px" }}>
        Stock remaining for every size and color combination.
      </p>

      <div className="overflow-x-auto">
        <table className="border-collapse" style={{ minWidth: "480px" }}>
          <thead>
            <tr>
              <th className="text-left form-label-text text-muted-foreground uppercase px-4 py-3 border-b border-border/60" style={{ letterSpacing: "0.06em" }}>
                Color
              </th>
              {sizes.map((size) => (
                <th
                  key={size.id}
                  className={cn(
                    "text-center font-ui font-semibold text-foreground px-4 py-3 border-b border-border/60",
                    size.id === selectedSizeId && "bg-primary/5"
                  )}
                  style={{ fontSize: "12px" }}
                >
                  {size.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {colors.map((color) => (
              <tr key={color.id} className={cn(color.id === effectiveColorId && "bg-primary/5")}>
                <td className="px-4 py-3 border-b border-border/40">
                  <span className="flex items-center gap-2.5">
                    <span
                      className="w-4 h-4 rounded-full border border-border/50 shrink-0"
                      style={{ backgroundColor: color.hexCode ?? "#ccc" }}
                    />
                    <span className="font-body text-foreground" style={{ fontSize: "13px" }}>
                      {color.name}
                    </span>
                  </span>
                </td>
                {sizes.map((size) => {
                  const stock = stockOf(size.id, color.id)
                  const isSelectedCell = size.id === selectedSizeId && color.id === effectiveColorId
                  return (
                    <td
                      key={size.id}
                      className={cn(
                        "text-center px-4 py-3 border-b border-border/40 font-body",
                        isSelectedCell && "bg-primary/10",
                        stock === null
                          ? "text-muted-foreground/40"
                          : stock === 0
                          ? "text-destructive/70"
                          : stock <= 5
                          ? "text-amber-600"
                          : "text-foreground font-medium"
                      )}
                      style={{ fontSize: "13px" }}
                    >
                      {stock === null ? "—" : stock}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function RelatedProducts({ categoryId, excludeId }: { categoryId: string; excludeId: string }) {
  const { data } = useGetAllProductsQuery({ categoryIds: categoryId, status: "ACTIVE", limit: 9 })
  const products: ProductCardData[] = (data?.data ?? []).filter((p: ProductCardData) => p.id !== excludeId)

  if (products.length === 0) return null

  return (
    <section className="px-6 md:px-10 py-16 border-t border-border/60">
      <h2 className="text-related-heading text-foreground text-center mb-10">You May Also Like</h2>
      <ProductSlider products={products} />
    </section>
  )
}
