"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { useGetSingleProductQuery } from "@/redux/fetchers/product/productApi"

interface VariantSize {
  id: string
  name: string
}

interface VariantColor {
  id: string
  name: string
  hexCode?: string | null
}

interface ProductVariantApi {
  sizeId: string
  colorId: string
  stock: number
  price: string | number
  isActive: boolean
  size?: VariantSize | null
  color?: VariantColor | null
}

interface CartVariantPickerProps {
  productId: string
  currentSizeId?: string
  currentColorId?: string
  onChange: (args: { sizeId: string; colorId?: string; price: number; stock: number }) => void
}

export function CartVariantPicker({ productId, currentSizeId, currentColorId, onChange }: CartVariantPickerProps) {
  const { data, isLoading } = useGetSingleProductQuery(productId)
  const variants: ProductVariantApi[] = (data?.data?.variants ?? []).filter(
    (v: ProductVariantApi) => v.isActive && v.size
  )

  const [selectedSizeId, setSelectedSizeId] = useState<string | undefined>(currentSizeId)
  const [selectedColorId, setSelectedColorId] = useState<string | undefined>(currentColorId)

  const sizes = Array.from(new Map(variants.map((v) => [v.sizeId, v.size as VariantSize])).values())

  function colorsForSize(sizeId?: string): VariantColor[] {
    return Array.from(
      new Map(
        variants
          .filter((v) => v.sizeId === sizeId && v.color)
          .map((v) => [v.colorId, v.color as VariantColor])
      ).values()
    )
  }

  // Default to the current (or first available) size once variant data arrives.
  useEffect(() => {
    if (selectedSizeId || sizes.length === 0) return
    const defaultSize = sizes.find((s) => s.id === currentSizeId) ?? sizes[0]
    setSelectedSizeId(defaultSize.id)
    const colors = colorsForSize(defaultSize.id)
    const defaultColor = colors.find((c) => c.id === currentColorId) ?? colors[0]
    setSelectedColorId(defaultColor?.id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sizes.length])

  if (isLoading || sizes.length === 0) return null

  const colors = colorsForSize(selectedSizeId)
  const selectedVariant =
    variants.find((v) => v.sizeId === selectedSizeId && v.colorId === selectedColorId) ??
    variants.find((v) => v.sizeId === selectedSizeId)

  const stockForSize = colors.length
    ? (selectedColorId
        ? (selectedVariant?.stock ?? 0)
        : variants.filter((v) => v.sizeId === selectedSizeId).reduce((sum, v) => sum + v.stock, 0))
    : 0

  function handleSizeSelect(sizeId: string) {
    setSelectedSizeId(sizeId)
    const nextColors = colorsForSize(sizeId)
    const nextColorId = nextColors[0]?.id
    setSelectedColorId(nextColorId)
    const variant =
      variants.find((v) => v.sizeId === sizeId && v.colorId === nextColorId) ??
      variants.find((v) => v.sizeId === sizeId)
    if (variant) {
      onChange({ sizeId, colorId: nextColorId, price: Number(variant.price), stock: variant.stock })
    }
  }

  function handleColorSelect(colorId: string) {
    setSelectedColorId(colorId)
    const variant = variants.find((v) => v.sizeId === selectedSizeId && v.colorId === colorId)
    if (variant && selectedSizeId) {
      onChange({ sizeId: selectedSizeId, colorId, price: Number(variant.price), stock: variant.stock })
    }
  }

  const selectedSizeName = sizes.find((s) => s.id === selectedSizeId)?.name
  const selectedColorObj = colors.find((c) => c.id === selectedColorId)

  return (
    <div className="mt-2 space-y-1.5">
      {(selectedSizeName || selectedColorObj) && (
        <div className="flex flex-col gap-1">
          {selectedColorObj && (
            <span className="font-ui font-medium text-foreground inline-flex items-center gap-1.5" style={{ fontSize: "12px" }}>
              Color:
              <span
                className="inline-block w-2.5 h-2.5 rounded-full border border-border/50"
                style={{ backgroundColor: selectedColorObj.hexCode || "#DFE1E9" }}
              />
              {selectedColorObj.name}
            </span>
          )}
          {selectedSizeName && (
            <span className="font-ui font-medium text-foreground" style={{ fontSize: "12px" }}>
              Size: {selectedSizeName}
            </span>
          )}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-1.5">
        <span className="text-category-label text-muted-foreground">Size:</span>
        {sizes.map((size) => {
          const count = colorsForSize(size.id).length
          return (
            <button
              key={size.id}
              type="button"
              onClick={() => handleSizeSelect(size.id)}
              className={cn(
                "flex h-7 items-center justify-center rounded border px-2 transition-colors",
                selectedSizeId === size.id
                  ? "border-foreground bg-foreground text-background"
                  : "border-border text-foreground hover:border-foreground/50"
              )}
              style={{ fontSize: "11px" }}
            >
              {size.name}
              {count > 0 && <span className="ml-1 opacity-60">({count})</span>}
            </button>
          )
        })}
      </div>

      {colors.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-category-label text-muted-foreground">Color:</span>
          {colors.map((color) => (
            <button
              key={color.id}
              type="button"
              title={color.name}
              onClick={() => handleColorSelect(color.id)}
              className={cn(
                "h-5 w-5 rounded-full border-2 transition-all",
                selectedColorId === color.id ? "border-foreground scale-110" : "border-border"
              )}
              style={{ backgroundColor: color.hexCode || "#DFE1E9" }}
            >
              <span className="sr-only">{color.name}</span>
            </button>
          ))}
        </div>
      )}

      <p className="text-breadcrumb text-muted-foreground">
        {stockForSize > 0 ? `${stockForSize} in stock` : "Out of stock"}
      </p>
    </div>
  )
}
