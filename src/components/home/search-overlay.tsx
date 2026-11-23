"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Search, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useGetAllProductsQuery } from "@/redux/fetchers/product/productApi"

interface SuggestionProduct {
  id: string
  name: string
  slug: string
  regularPrice: string | number
  salePrice?: string | number | null
  images?: { url: string }[]
  category?: { name: string } | null
}

interface SearchOverlayProps {
  open: boolean
  onClose: () => void
}

export function SearchOverlay({ open, onClose }: SearchOverlayProps) {
  const router = useRouter()
  const [query, setQuery] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)
  const [debounced, setDebounced] = useState("")

  // Debounce so we don't hit the API on every keystroke.
  useEffect(() => {
    const id = setTimeout(() => setDebounced(query.trim()), 250)
    return () => clearTimeout(id)
  }, [query])

  const shouldSearch = open && debounced.length >= 2
  const { data, isFetching } = useGetAllProductsQuery(
    { searchTerm: debounced, limit: 6, status: "ACTIVE" },
    { skip: !shouldSearch }
  )
  const suggestions: SuggestionProduct[] = shouldSearch ? (data?.data ?? []) : []
  const showSkeleton = shouldSearch && isFetching && suggestions.length === 0
  const showEmpty = shouldSearch && !isFetching && suggestions.length === 0

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  useEffect(() => {
    if (open) {
      const id = setTimeout(() => inputRef.current?.focus(), 350)
      return () => clearTimeout(id)
    }
  }, [open])

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [onClose])

  function goToProduct(slug: string) {
    router.push(`/product/${slug}`)
    setQuery("")
    onClose()
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = query.trim()
    if (!trimmed) return
    router.push(`/shop?q=${encodeURIComponent(trimmed)}`)
    onClose()
  }

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 transition-opacity duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
        open ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
      aria-hidden={!open}
    >
      {/* Backdrop — blurs the whole site behind the overlay */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-xl" onClick={onClose} />

      <button
        onClick={onClose}
        aria-label="Close search"
        className="fixed top-5 right-6 z-10 text-foreground/70 hover:text-foreground transition-colors"
      >
        <X className="w-5 h-5" strokeWidth={1.5} />
      </button>

      {/* Faint wordmark watermark, centered behind the search field */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <span
          className="font-editorial font-semibold text-foreground/[0.05] uppercase whitespace-nowrap"
          style={{ fontSize: "clamp(64px, 18vw, 220px)", letterSpacing: "0.08em" }}
        >
          LACHÉO
        </span>
      </div>

      <div className="relative h-full flex items-start justify-center px-6 pt-[22vh]">
        <form onSubmit={handleSubmit} className="w-full max-w-lg">
          <div
            className={cn(
              "flex items-center gap-4 border-b border-foreground/30 pb-4 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
              open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
            )}
            style={{ transitionDelay: open ? "150ms" : "0ms" }}
          >
            <Search
              className={cn(
                "w-5 h-5 text-foreground/50 shrink-0 transition-transform duration-300",
                shouldSearch && isFetching && "animate-pulse scale-110"
              )}
              strokeWidth={1.5}
            />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for products..."
              className="font-editorial w-full bg-transparent outline-none text-foreground placeholder:text-foreground/30"
              style={{ fontSize: "clamp(20px, 3vw, 28px)" }}
            />
          </div>
          {shouldSearch && (suggestions.length > 0 || showEmpty || showSkeleton) && (
            <ul className="animate-in fade-in slide-in-from-top-2 duration-300 mt-4 max-h-[50vh] overflow-y-auto divide-y divide-foreground/10 bg-background/90 border border-foreground/10">
              {showSkeleton &&
                Array.from({ length: 3 }).map((_, i) => (
                  <li key={i} className="flex items-center gap-4 px-3 py-3">
                    <span className="h-14 w-11 shrink-0 animate-pulse bg-foreground/10" />
                    <span className="flex-1 space-y-2">
                      <span className="block h-3 w-2/3 animate-pulse bg-foreground/10" />
                      <span className="block h-2.5 w-1/3 animate-pulse bg-foreground/10" />
                    </span>
                  </li>
                ))}
              {suggestions.map((p, i) => {
                const regular = Number(p.regularPrice)
                const sale = p.salePrice != null ? Number(p.salePrice) : null
                const onSale = sale !== null && sale < regular
                const img = p.images?.[0]?.url
                return (
                  <li
                    key={p.id}
                    className="animate-in fade-in slide-in-from-bottom-2 duration-300 fill-mode-backwards"
                    style={{ animationDelay: `${i * 50}ms` }}
                  >
                    <button
                      type="button"
                      onClick={() => goToProduct(p.slug)}
                      className="group flex w-full items-center gap-4 px-3 py-3 text-left hover:bg-foreground/5 hover:pl-4 transition-all duration-300"
                    >
                      <span className="relative h-14 w-11 shrink-0 overflow-hidden bg-muted">
                        {img && (
                          <Image src={img} alt={p.name} fill sizes="44px" className="object-cover transition-transform duration-500 group-hover:scale-110" />
                        )}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm text-foreground">{p.name}</span>
                        {p.category?.name && (
                          <span className="block truncate text-xs text-foreground/50">{p.category.name}</span>
                        )}
                      </span>
                      <span className="shrink-0 text-sm text-foreground">
                        {onSale ? (
                          <>
                            <span className="mr-2 text-foreground/40 line-through">{regular}</span>
                            {sale}
                          </>
                        ) : (
                          regular
                        )}
                      </span>
                    </button>
                  </li>
                )
              })}
              {showEmpty && (
                <li className="px-3 py-4 text-sm text-foreground/50">No products found</li>
              )}
            </ul>
          )}
          <p
            className={cn(
              "font-ui text-foreground/40 uppercase text-center mt-6 transition-opacity duration-500",
              open ? "opacity-100" : "opacity-0"
            )}
            style={{ fontSize: "10px", letterSpacing: "0.2em", transitionDelay: open ? "250ms" : "0ms" }}
          >
            Press Enter to search
          </p>
        </form>
      </div>
    </div>
  )
}
