"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useDispatch, useSelector } from "react-redux"
import { ShoppingBag, Minus, Plus, X } from "lucide-react"
import { toast } from "sonner"
import { SiteHeader } from "@/components/home/site-header"
import { SiteFooter } from "@/components/shared/footer"
import { Button } from "@/components/ui/button"
import { CartVariantPicker } from "@/components/cart/cart-variant-picker"
import { productApi } from "@/redux/fetchers/product/productApi"
import {
  incrementQuantity,
  decrementQuantity,
  setQuantity,
  syncStock,
  changeVariant,
  removeItem,
  removeCart,
} from "@/redux/fetchers/cart/cartSlice"
import type { RootState, AppDispatch } from "@/redux/store"

interface CartItem {
  id: string
  name: string
  slug?: string
  image?: string
  price: number
  quantity: number
  sizeId?: string
  colorId?: string
  stock?: number
}

interface ApiVariant {
  sizeId: string
  colorId: string
  stock: number
  isActive: boolean
}

// Hits the real /product/:id endpoint with forceRefetch, bypassing RTK
// Query's cache, so the cap is always checked against the server's current
// number — not whatever was cached client-side at add/variant-change time.
async function fetchLiveStock(dispatch: AppDispatch, item: CartItem): Promise<number> {
  const result = await dispatch(
    productApi.endpoints.getSingleProduct.initiate(item.id, { forceRefetch: true })
  ).unwrap()

  const product = result?.data
  if (!product) return 0

  if (!item.sizeId) return product.stockQuantity ?? 0

  const variants: ApiVariant[] = product.variants ?? []
  const variant = variants.find(
    (v) => v.isActive && v.sizeId === item.sizeId && (item.colorId ? v.colorId === item.colorId : true)
  )
  return variant ? variant.stock : 0
}

export default function CartPage() {
  const dispatch = useDispatch<AppDispatch>()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const items: CartItem[] = useSelector((state: RootState) => (state as any).cart?.product ?? [])
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const totalAmount: number = useSelector((state: RootState) => (state as any).cart?.totalAmount ?? 0)

  const [checkingId, setCheckingId] = useState<string | null>(null)
  const [draftQuantity, setDraftQuantity] = useState<Record<string, string>>({})

  async function handleIncrement(item: CartItem) {
    setCheckingId(item.id)
    try {
      const liveStock = await fetchLiveStock(dispatch, item)
      dispatch(syncStock({ id: item.id, stock: liveStock }))

      if (item.quantity + 1 > liveStock) {
        toast.error("Maximum available stock reached.")
        return
      }
      dispatch(incrementQuantity({ id: item.id }))
    } catch {
      toast.error("Could not verify stock. Please try again.")
    } finally {
      setCheckingId(null)
    }
  }

  async function handleQuantityCommit(item: CartItem, rawValue: string) {
    const parsed = Number(rawValue)
    if (!rawValue || !Number.isFinite(parsed) || !Number.isInteger(parsed) || parsed < 1) {
      toast.error("Enter a valid quantity.")
      setDraftQuantity((prev) => ({ ...prev, [item.id]: String(item.quantity) }))
      return
    }

    if (parsed === item.quantity) return

    setCheckingId(item.id)
    try {
      const liveStock = await fetchLiveStock(dispatch, item)
      dispatch(syncStock({ id: item.id, stock: liveStock }))
      dispatch(setQuantity({ id: item.id, quantity: parsed }))
    } catch {
      toast.error("Could not verify stock. Please try again.")
    } finally {
      setCheckingId(null)
      setDraftQuantity((prev) => {
        const next = { ...prev }
        delete next[item.id]
        return next
      })
    }
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <div className="px-6 md:px-10 py-10 md:py-14">
        <div className="text-breadcrumb text-muted-foreground flex items-center gap-1.5 mb-6">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <span>/</span>
          <span className="text-foreground">Cart</span>
        </div>

        <h1 className="text-page-title text-foreground mb-10">Shopping Cart</h1>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <ShoppingBag className="w-8 h-8 text-muted-foreground mb-3" strokeWidth={1.5} />
            <p className="text-foreground font-body" style={{ fontSize: "14px" }}>Your cart is empty.</p>
            <Button render={<Link href="/shop" />} variant="outline" className="btn-label mt-4 h-9">
              Continue Shopping
            </Button>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row gap-10">
            {/* Items */}
            <div className="flex-1 min-w-0 divide-y divide-border border-t border-b border-border">
              {items.map((item) => {
                const atCap = item.stock !== undefined && item.quantity >= item.stock
                const isChecking = checkingId === item.id

                return (
                  <div key={`${item.id}-${item.sizeId ?? ""}`} className="flex items-start gap-4 py-5">
                    <Link href={`/product/${item.slug ?? item.id}`} className="relative h-24 w-20 shrink-0 overflow-hidden bg-muted">
                      {item.image ? (
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      ) : null}
                    </Link>

                    <div className="flex-1 min-w-0">
                      <Link href={`/product/${item.slug ?? item.id}`}>
                        <p className="text-product-name text-foreground truncate">{item.name}</p>
                      </Link>
                      <p className="text-price mt-1 text-foreground">${item.price.toFixed(2)}</p>

                      <CartVariantPicker
                        productId={item.id}
                        currentSizeId={item.sizeId}
                        currentColorId={item.colorId}
                        onChange={({ sizeId, colorId, price, stock }) =>
                          dispatch(changeVariant({ id: item.id, sizeId, colorId, price, stock }))
                        }
                      />

                      {atCap && (
                        <p className="text-breadcrumb mt-1 text-destructive">Maximum available stock reached.</p>
                      )}
                    </div>

                    <div className="flex items-center gap-1 border border-border rounded-lg mt-1">
                      <button
                        type="button"
                        onClick={() => dispatch(decrementQuantity({ id: item.id }))}
                        disabled={isChecking}
                        aria-label="Decrease quantity"
                        className="flex h-8 w-8 items-center justify-center text-muted-foreground hover:text-foreground disabled:opacity-30"
                      >
                        <Minus className="h-3 w-3" strokeWidth={1.5} />
                      </button>
                      <input
                        type="number"
                        min={1}
                        step={1}
                        inputMode="numeric"
                        value={draftQuantity[item.id] ?? item.quantity}
                        onChange={(e) => setDraftQuantity((prev) => ({ ...prev, [item.id]: e.target.value }))}
                        onBlur={(e) => handleQuantityCommit(item, e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") (e.target as HTMLInputElement).blur()
                        }}
                        disabled={isChecking}
                        aria-label="Quantity"
                        className="text-price-original w-10 bg-transparent text-center text-foreground outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                        style={{ fontSize: "13px" }}
                      />
                      <button
                        type="button"
                        onClick={() => handleIncrement(item)}
                        disabled={atCap || isChecking}
                        aria-label="Increase quantity"
                        className="flex h-8 w-8 items-center justify-center text-muted-foreground hover:text-foreground disabled:cursor-not-allowed disabled:opacity-30"
                      >
                        <Plus className="h-3 w-3" strokeWidth={1.5} />
                      </button>
                    </div>

                    <p className="text-price w-20 shrink-0 text-right text-foreground mt-1">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>

                    <button
                      type="button"
                      onClick={() => dispatch(removeItem({ id: item.id }))}
                      aria-label="Remove item"
                      className="shrink-0 text-muted-foreground hover:text-destructive transition-colors mt-1"
                    >
                      <X className="h-4 w-4" strokeWidth={1.5} />
                    </button>
                  </div>
                )
              })}

              <div className="pt-5">
                <button
                  type="button"
                  onClick={() => dispatch(removeCart())}
                  className="link-text text-muted-foreground underline underline-offset-4 hover:text-foreground"
                >
                  Clear cart
                </button>
              </div>
            </div>

            {/* Order summary */}
            <aside className="w-full md:w-80 shrink-0">
              <div className="bg-white border border-border p-6">
                <p className="text-order-summary-heading text-foreground mb-5">Order Summary</p>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-filter-option text-muted-foreground">Subtotal</span>
                  <span className="text-price text-foreground">${totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between mb-5">
                  <span className="text-filter-option text-muted-foreground">Shipping</span>
                  <span className="text-filter-option text-muted-foreground">Calculated at checkout</span>
                </div>
                <div className="flex items-center justify-between border-t border-border pt-4 mb-6">
                  <span className="text-foreground font-editorial font-semibold" style={{ fontSize: "16px" }}>Total</span>
                  <span className="text-total-price text-foreground">${totalAmount.toFixed(2)}</span>
                </div>
                <Button render={<Link href="/checkout" />} className="btn-label w-full h-10">
                  Proceed to Checkout
                </Button>
              </div>
            </aside>
          </div>
        )}
      </div>

      <SiteFooter />
    </main>
  )
}
