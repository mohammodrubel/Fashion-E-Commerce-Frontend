"use client"

import { useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProductCard, type ProductCardData } from "@/components/shop/product-card"

interface ProductSliderProps {
  products: ProductCardData[]
}

// Items per view: 1 up to 425px, 3 from 426px to 768px, 4 above 768px —
// matched with basis-* classes below so a "slide" always moves by exactly
// one full screenful of cards at the current breakpoint.
export function ProductSlider({ products }: ProductSliderProps) {
  const trackRef = useRef<HTMLDivElement>(null)

  function scrollByPage(direction: 1 | -1) {
    const track = trackRef.current
    if (!track) return
    track.scrollBy({ left: direction * track.clientWidth, behavior: "smooth" })
  }

  return (
    <div className="relative group/slider">
      <div
        ref={trackRef}
        className="flex gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [-webkit-overflow-scrolling:touch]"
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="shrink-0 snap-start basis-full min-[426px]:basis-1/3 md:basis-1/4"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {products.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => scrollByPage(-1)}
            aria-label="Previous products"
            className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 opacity-0 group-hover/slider:opacity-100 transition-opacity"
          >
            <Button render={<span />} variant="secondary" size="icon-sm" className="rounded-full shadow-md">
              <ChevronLeft className="w-4 h-4" strokeWidth={1.5} />
            </Button>
          </button>
          <button
            type="button"
            onClick={() => scrollByPage(1)}
            aria-label="Next products"
            className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 opacity-0 group-hover/slider:opacity-100 transition-opacity"
          >
            <Button render={<span />} variant="secondary" size="icon-sm" className="rounded-full shadow-md">
              <ChevronRight className="w-4 h-4" strokeWidth={1.5} />
            </Button>
          </button>
        </>
      )}
    </div>
  )
}
