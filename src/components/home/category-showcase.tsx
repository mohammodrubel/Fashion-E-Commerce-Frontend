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

export function CategoryShowcase() {
  const { data, isLoading, isError } = useGetAllCategoriesQuery(undefined)

  const categories: Category[] = (data?.data ?? []).filter(
    (c: Category) => c.isActive && c.image
  )

  if (isError) return null

  if (isLoading) {
    return (
      <section className="px-6 md:px-10 py-16 md:py-20">
        <div className="flex gap-8 md:justify-center overflow-x-auto">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="shrink-0 w-32 h-32 md:w-44 md:h-44 rounded-full bg-muted animate-pulse" />
          ))}
        </div>
      </section>
    )
  }

  if (categories.length === 0) return null

  return (
    <section className="py-16 md:py-20">
      <div
        className="flex gap-8 md:gap-12 md:justify-center overflow-x-auto px-6 md:px-10 -mx-0 snap-x snap-mandatory [scrollbar-width:none] [-webkit-overflow-scrolling:touch]"
      >
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/shop/${category.slug}`}
            className="group flex flex-col items-center shrink-0 snap-center"
          >
            <div className="relative w-32 h-32 md:w-44 md:h-44 rounded-full overflow-hidden bg-muted">
              <Image
                src={category.image as string}
                alt={category.name}
                fill
                sizes="(min-width: 768px) 176px, 128px"
                className="object-cover transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 group-hover:blur-sm"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/45 transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                <span
                  className="font-editorial font-semibold text-white text-center px-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{ fontSize: "clamp(15px, 1.6vw, 20px)" }}
                >
                  {category.name}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
