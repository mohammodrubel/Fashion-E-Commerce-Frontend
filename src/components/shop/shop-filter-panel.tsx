"use client"

import { useState, type ReactNode } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export interface ShopFilterOption {
  id: string
  name: string
  hexCode?: string | null
}

export interface ShopFiltersState {
  categoryIds: string[]
  colorIds: string[]
  sizeIds: string[]
  stock: "" | "IN_STOCK" | "OUT_OF_STOCK"
  minPrice: string
  maxPrice: string
  featured: boolean
  onSale: boolean
  newArrivals: boolean
}

interface ShopFilterPanelProps {
  categories: ShopFilterOption[]
  colors: ShopFilterOption[]
  sizes: ShopFilterOption[]
  priceBounds: { min: number; max: number }
  filters: ShopFiltersState
  onToggle: (key: "categoryIds" | "colorIds" | "sizeIds", id: string) => void
  onStockChange: (value: ShopFiltersState["stock"]) => void
  onPriceChange: (min: string, max: string) => void
  onFlagChange: (key: "featured" | "onSale" | "newArrivals", value: boolean) => void
  onClearAll: () => void
  activeCount: number
}

function FilterSection({ title, children }: { title: string; children: ReactNode }) {
  const [open, setOpen] = useState(true)

  return (
    <div className="border-b border-border py-2.5">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between"
      >
        <span className="text-filter-heading uppercase text-foreground">{title}</span>
        <ChevronDown
          className={cn("h-3.5 w-3.5 text-muted-foreground transition-transform duration-300", open && "rotate-180")}
          strokeWidth={1.5}
        />
      </button>
      <div
        className="grid transition-[grid-template-rows] duration-300 ease-in-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div className="pt-3 pb-1">{children}</div>
        </div>
      </div>
    </div>
  )
}

export function ShopFilterPanel({
  categories,
  colors,
  sizes,
  priceBounds,
  filters,
  onToggle,
  onStockChange,
  onPriceChange,
  onFlagChange,
  onClearAll,
  activeCount,
}: ShopFilterPanelProps) {
  return (
    <div>
      <div className="flex items-center justify-between pb-4">
        <span className="form-label-text text-foreground uppercase">
          Filters{activeCount > 0 ? ` (${activeCount})` : ""}
        </span>
        {activeCount > 0 && (
          <Button
            type="button"
            variant="link"
            size="xs"
            onClick={onClearAll}
            className="link-text h-auto p-0 text-muted-foreground underline underline-offset-4 hover:text-foreground"
          >
            Clear all
          </Button>
        )}
      </div>

      <FilterSection title="Availability">
        <div className="space-y-2">
          {([
            { label: "In Stock", value: "IN_STOCK" },
            { label: "Out of Stock", value: "OUT_OF_STOCK" },
          ] as const).map((opt) => (
            <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                checked={filters.stock === opt.value}
                onCheckedChange={() => onStockChange(filters.stock === opt.value ? "" : opt.value)}
              />
              <span className="text-filter-option text-foreground">{opt.label}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {categories.length > 0 && (
        <FilterSection title="Category">
          <div className="space-y-2">
            {categories.map((cat) => (
              <label key={cat.id} className="flex items-center gap-2 cursor-pointer">
                <Checkbox
                  checked={filters.categoryIds.includes(cat.id)}
                  onCheckedChange={() => onToggle("categoryIds", cat.id)}
                />
                <span className="text-filter-option text-foreground">{cat.name}</span>
              </label>
            ))}
          </div>
        </FilterSection>
      )}

      {colors.length > 0 && (
        <FilterSection title="Color">
          <div className="flex flex-wrap gap-2">
            {colors.map((color) => {
              const selected = filters.colorIds.includes(color.id)
              return (
                <button
                  key={color.id}
                  type="button"
                  title={color.name}
                  onClick={() => onToggle("colorIds", color.id)}
                  className={cn(
                    "h-7 w-7 rounded-full border-2 transition-all",
                    selected ? "border-foreground scale-110" : "border-border"
                  )}
                  style={{ backgroundColor: color.hexCode || "#DFE1E9" }}
                >
                  <span className="sr-only">{color.name}</span>
                </button>
              )
            })}
          </div>
        </FilterSection>
      )}

      {sizes.length > 0 && (
        <FilterSection title="Size">
          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => {
              const selected = filters.sizeIds.includes(size.id)
              return (
                <button
                  key={size.id}
                  type="button"
                  onClick={() => onToggle("sizeIds", size.id)}
                  className={cn(
                    "flex h-8 min-w-8 items-center justify-center rounded border px-2 text-filter-option transition-colors",
                    selected
                      ? "border-foreground bg-foreground text-background"
                      : "border-border text-foreground hover:border-foreground/50"
                  )}
                >
                  {size.name}
                </button>
              )
            })}
          </div>
        </FilterSection>
      )}

      <FilterSection title="Price">
        <div className="flex items-center gap-2">
          <Input
            type="number"
            min={priceBounds.min}
            max={priceBounds.max}
            placeholder={`${priceBounds.min}`}
            value={filters.minPrice}
            onChange={(e) => onPriceChange(e.target.value, filters.maxPrice)}
            className="text-field-value h-8"
          />
          <span className="text-muted-foreground">–</span>
          <Input
            type="number"
            min={priceBounds.min}
            max={priceBounds.max}
            placeholder={`${priceBounds.max}`}
            value={filters.maxPrice}
            onChange={(e) => onPriceChange(filters.minPrice, e.target.value)}
            className="text-field-value h-8"
          />
        </div>
      </FilterSection>

      <FilterSection title="Collections">
        <div className="space-y-2">
          {([
            { label: "Featured", key: "featured" },
            { label: "New Arrivals", key: "newArrivals" },
            { label: "On Sale", key: "onSale" },
          ] as const).map((opt) => (
            <label key={opt.key} className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                checked={filters[opt.key]}
                onCheckedChange={(checked) => onFlagChange(opt.key, checked === true)}
              />
              <span className="text-filter-option text-foreground">{opt.label}</span>
            </label>
          ))}
        </div>
      </FilterSection>
    </div>
  )
}
