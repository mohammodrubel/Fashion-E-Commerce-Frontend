"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useSelector } from "react-redux"
import { ShoppingBag, Truck, Banknote, Check } from "lucide-react"
import { toast } from "sonner"
import { SiteHeader } from "@/components/home/site-header"
import { SiteFooter } from "@/components/shared/footer"
import { Button } from "@/components/ui/button"
import { FormInput } from "@/components/auth/form-input"
import { useRequireAuth } from "@/lib/useRequireAuth"
import { useGetMyAddressesQuery } from "@/redux/fetchers/address/addressApi"
import type { RootState } from "@/redux/store"

interface CartItem {
  id: string
  name: string
  slug?: string
  image?: string
  price: number
  quantity: number
  sizeId?: string
  colorId?: string
}

interface SavedAddress {
  id: string
  fullName: string
  phone: string
  addressLine: string
  city: string
  district?: string | null
  postalCode?: string | null
  isDefault: boolean
}

interface ShippingForm {
  fullName: string
  phone: string
  addressLine: string
  city: string
  district: string
  postalCode: string
}

const EMPTY_FORM: ShippingForm = {
  fullName: "",
  phone: "",
  addressLine: "",
  city: "",
  district: "",
  postalCode: "",
}

const EMPTY_ADDRESSES: SavedAddress[] = []

function lineKey(item: Pick<CartItem, "id" | "sizeId" | "colorId">) {
  return `${item.id}::${item.sizeId ?? ""}::${item.colorId ?? ""}`
}

function toForm(a: SavedAddress): ShippingForm {
  return {
    fullName: a.fullName,
    phone: a.phone,
    addressLine: a.addressLine,
    city: a.city,
    district: a.district ?? "",
    postalCode: a.postalCode ?? "",
  }
}

export default function CheckoutPage() {
  const { ready } = useRequireAuth()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const items: CartItem[] = useSelector((state: RootState) => (state as any).cart?.product ?? [])
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const totalAmount: number = useSelector((state: RootState) => (state as any).cart?.totalAmount ?? 0)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const totalQuantity: number = useSelector((state: RootState) => (state as any).cart?.totalQuantity ?? 0)

  const { data: addressData } = useGetMyAddressesQuery(undefined, { skip: !ready })
  const addresses: SavedAddress[] = addressData?.data ?? EMPTY_ADDRESSES

  // undefined = nothing chosen yet (use the default/first saved address),
  // string = a saved address was picked, null = user is typing a custom one.
  const [pickedId, setPickedId] = useState<string | null | undefined>(undefined)
  const [customForm, setCustomForm] = useState<ShippingForm>(EMPTY_FORM)
  const [errors, setErrors] = useState<Partial<Record<keyof ShippingForm, string>>>({})

  const selectedAddress =
    pickedId === null
      ? undefined
      : addresses.find((a) => a.id === pickedId) ??
        (pickedId === undefined ? addresses.find((a) => a.isDefault) ?? addresses[0] : undefined)
  const selectedAddressId = selectedAddress?.id ?? null
  const form: ShippingForm = selectedAddress ? toForm(selectedAddress) : customForm

  function update(field: keyof ShippingForm, value: string) {
    setCustomForm({ ...form, [field]: value })
    setPickedId(null)
    setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  function pickAddress(a: SavedAddress) {
    setPickedId(a.id)
    setErrors({})
  }

  function validate() {
    const next: Partial<Record<keyof ShippingForm, string>> = {}
    if (!form.fullName.trim()) next.fullName = "Full name is required."
    if (!/^[0-9+\-\s]{7,15}$/.test(form.phone.trim())) next.phone = "Enter a valid phone number."
    if (!form.addressLine.trim()) next.addressLine = "Address is required."
    if (!form.city.trim()) next.city = "City is required."
    setErrors(next)
    return Object.keys(next).length === 0
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) {
      toast.error("Please fix the highlighted fields.")
      return
    }
    // The backend has no order endpoint yet (no /order module), so there is
    // nothing to submit to. Wire this up once that API exists.
    toast.info("Order placement is not connected to the backend yet.")
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <div className="mx-auto w-full max-w-[1600px] px-6 md:px-10 py-10 md:py-14">
        <div className="text-breadcrumb text-muted-foreground flex items-center gap-1.5 mb-6">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <span>/</span>
          <Link href="/cart" className="hover:text-foreground transition-colors">Cart</Link>
          <span>/</span>
          <span className="text-foreground">Checkout</span>
        </div>

        <h1 className="text-page-title text-foreground mb-10">Checkout</h1>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <ShoppingBag className="w-8 h-8 text-muted-foreground mb-3" strokeWidth={1.5} />
            <p className="text-foreground font-body" style={{ fontSize: "14px" }}>Your cart is empty.</p>
            <Button render={<Link href="/shop" />} variant="outline" className="btn-label mt-4 h-9">
              Continue Shopping
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="flex flex-col md:flex-row gap-10">
            {/* Left — shipping + payment */}
            <div className="flex-1 min-w-0 space-y-10">
              {/* Shipping */}
              <section>
                <div className="flex items-center gap-2 mb-5">
                  <Truck className="h-4 w-4 text-foreground/70" strokeWidth={1.5} />
                  <p className="text-order-summary-heading text-foreground">Shipping Details</p>
                </div>

                {addresses.length > 0 && (
                  <div className="mb-6 grid grid-cols-1 gap-3 grid-3:grid-cols-2">
                    {addresses.map((a) => {
                      const active = selectedAddressId === a.id
                      return (
                        <button
                          key={a.id}
                          type="button"
                          onClick={() => pickAddress(a)}
                          className={`relative border p-4 text-left transition-colors ${
                            active ? "border-foreground" : "border-border hover:border-foreground/50"
                          }`}
                        >
                          {active && (
                            <span className="absolute right-3 top-3 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-primary-foreground">
                              <Check className="h-2.5 w-2.5" strokeWidth={2.5} />
                            </span>
                          )}
                          <p className="text-product-name text-foreground" style={{ fontSize: "14px" }}>
                            {a.fullName}
                            {a.isDefault && (
                              <span className="ml-2 text-muted-foreground" style={{ fontSize: "10px" }}>
                                DEFAULT
                              </span>
                            )}
                          </p>
                          <p className="text-filter-option mt-1 text-muted-foreground">{a.phone}</p>
                          <p className="text-filter-option text-muted-foreground">
                            {[a.addressLine, a.city, a.district, a.postalCode].filter(Boolean).join(", ")}
                          </p>
                        </button>
                      )
                    })}
                  </div>
                )}

                <div className="grid grid-cols-1 gap-x-8 gap-y-6 grid-3:grid-cols-2">
                  <FormInput
                    label="Full Name"
                    value={form.fullName}
                    onChange={(e) => update("fullName", e.target.value)}
                    error={errors.fullName}
                    autoComplete="name"
                  />
                  <FormInput
                    label="Phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    error={errors.phone}
                    autoComplete="tel"
                  />
                  <div className="grid-3:col-span-2">
                    <FormInput
                      label="Address"
                      value={form.addressLine}
                      onChange={(e) => update("addressLine", e.target.value)}
                      error={errors.addressLine}
                      autoComplete="street-address"
                    />
                  </div>
                  <FormInput
                    label="City"
                    value={form.city}
                    onChange={(e) => update("city", e.target.value)}
                    error={errors.city}
                    autoComplete="address-level2"
                  />
                  <FormInput
                    label="District"
                    value={form.district}
                    onChange={(e) => update("district", e.target.value)}
                    autoComplete="address-level1"
                  />
                  <FormInput
                    label="Postal Code"
                    value={form.postalCode}
                    onChange={(e) => update("postalCode", e.target.value)}
                    autoComplete="postal-code"
                  />
                </div>
              </section>

              {/* Payment */}
              <section>
                <div className="flex items-center gap-2 mb-5">
                  <Banknote className="h-4 w-4 text-foreground/70" strokeWidth={1.5} />
                  <p className="text-order-summary-heading text-foreground">Payment Method</p>
                </div>
                <div className="flex items-center justify-between border border-foreground p-4">
                  <div>
                    <p className="text-product-name text-foreground" style={{ fontSize: "14px" }}>
                      Cash on Delivery
                    </p>
                    <p className="text-filter-option mt-1 text-muted-foreground">
                      Pay with cash when your order arrives.
                    </p>
                  </div>
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Check className="h-2.5 w-2.5" strokeWidth={2.5} />
                  </span>
                </div>
              </section>
            </div>

            {/* Right — order summary */}
            <aside className="w-full md:w-96 shrink-0">
              <div className="bg-white border border-border p-6 md:sticky md:top-40">
                <p className="text-order-summary-heading text-foreground mb-5">
                  Order Summary
                  <span className="ml-2 text-muted-foreground" style={{ fontSize: "12px" }}>
                    ({totalQuantity} {totalQuantity === 1 ? "item" : "items"})
                  </span>
                </p>

                <div className="divide-y divide-border border-y border-border">
                  {items.map((item) => (
                    <div key={lineKey(item)} className="flex items-center gap-3 py-4">
                      <div className="relative h-20 w-16 shrink-0 overflow-hidden bg-muted">
                        {item.image ? (
                          <Image src={item.image} alt={item.name} fill className="object-cover" />
                        ) : null}
                        <span
                          className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center bg-primary px-1 text-primary-foreground"
                          style={{ fontSize: "9px", fontWeight: 600 }}
                        >
                          {item.quantity}
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-product-name truncate text-foreground" style={{ fontSize: "14px" }}>
                          {item.name}
                        </p>
                        <p className="text-filter-option text-muted-foreground">
                          ${item.price.toFixed(2)} × {item.quantity}
                        </p>
                      </div>
                      <p className="text-price shrink-0 text-foreground">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between mt-5 mb-2">
                  <span className="text-filter-option text-muted-foreground">Subtotal</span>
                  <span className="text-price text-foreground">${totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between mb-5">
                  <span className="text-filter-option text-muted-foreground">Shipping</span>
                  <span className="text-filter-option text-muted-foreground">Calculated after order</span>
                </div>
                <div className="flex items-center justify-between border-t border-border pt-4 mb-6">
                  <span className="text-foreground font-editorial font-semibold" style={{ fontSize: "16px" }}>Total</span>
                  <span className="text-total-price text-foreground">${totalAmount.toFixed(2)}</span>
                </div>

                <Button type="submit" className="btn-label w-full h-10">
                  Place Order
                </Button>
                <Link
                  href="/cart"
                  className="link-text mt-4 block text-center text-muted-foreground underline underline-offset-4 hover:text-foreground"
                >
                  Back to cart
                </Link>
              </div>
            </aside>
          </form>
        )}
      </div>

      <SiteFooter />
    </main>
  )
}
