"use client"

import Link from "next/link"
import Image from "next/image"
import { useGetAllCategoriesQuery } from "@/redux/fetchers/category/categoryApi"

interface Category {
  id: string
  name: string
  slug: string
  image: string | null
  isActive: boolean
}

const EASE = "cubic-bezier(0.16,1,0.3,1)"

export function CategoryShowcase() {
  const { data, isLoading, isError } = useGetAllCategoriesQuery(undefined)

  const categories: Category[] = (data?.data ?? []).filter(
    (c: Category) => c.isActive && c.image
  )

  if (isError) return null

  if (isLoading) {
    return (
      <section className="px-6 md:px-10 py-16 md:py-20">
        <div className="h-7 w-56 mx-auto rounded bg-muted animate-pulse mb-10" />
        <div className="flex gap-6 overflow-x-auto">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="shrink-0 w-[240px] sm:w-[280px] aspect-[3/4] rounded-md bg-muted animate-pulse" />
          ))}
        </div>
      </section>
    )
  }

  if (categories.length === 0) return null

  return (
    <section className="px-6 md:px-10 py-16 md:py-20">
      <div className="text-center mb-10 md:mb-14">
        <span className="text-category-label text-muted-foreground">Explore</span>
        <h2 className="text-section-heading text-foreground mt-3">Shop by Category</h2>
      </div>

      <div
        className="flex gap-6 md:gap-8 overflow-x-auto px-1 snap-x snap-mandatory [scrollbar-width:none] [-webkit-overflow-scrolling:touch] md:justify-center"
      >
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/shop?category=${category.id}`}
            className="group relative shrink-0 w-[240px] sm:w-[280px] md:w-[300px] aspect-[3/4] overflow-hidden snap-start bg-muted"
          >
            <Image
              src={category.image as string}
              alt={category.name}
              fill
              sizes="(min-width: 768px) 300px, 280px"
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              style={{ transitionTimingFunction: EASE }}
            />
            {/* Bottom gradient for legible, always-visible caption */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 p-5">
              <h3 className="text-category-title text-white">{category.name}</h3>
              <span
                className="text-category-label text-white/70 inline-flex items-center gap-1.5 mt-1 group-hover:text-white transition-colors"
              >
                Shop Now
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
