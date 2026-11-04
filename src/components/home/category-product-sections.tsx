"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useGetAllCategoriesQuery } from "@/redux/fetchers/category/categoryApi"
import { useGetAllProductsQuery } from "@/redux/fetchers/product/productApi"
import { ProductSlider } from "@/components/home/product-slider"
import { ProductCardSkeleton } from "@/components/shop/product-card"

interface Category {
  id: string
  name: string
  slug: string
  isActive: boolean
}

function CategorySection({ category }: { category: Category }) {
  const { data, isLoading } = useGetAllProductsQuery({
    categoryIds: category.id,
    status: "ACTIVE",
    limit: 8,
  })
  const products = data?.data ?? []

  if (isLoading) {
    return (
      <div className="px-6 md:px-10 py-10">
        <div className="h-7 w-48 rounded bg-muted animate-pulse mb-6" />
        <div className="flex gap-5 overflow-hidden">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="shrink-0 basis-full min-[426px]:basis-1/3 md:basis-1/4">
              <ProductCardSkeleton />
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (products.length === 0) return null

  return (
    <div className="px-6 md:px-10 py-10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-section-heading text-foreground">{category.name}</h2>
        <Link
          href={`/shop?category=${category.id}`}
          className="text-nav-link text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5 shrink-0"
        >
          View All
          <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
        </Link>
      </div>

      <ProductSlider products={products} />
    </div>
  )
}

export function CategoryProductSections() {
  const { data, isError } = useGetAllCategoriesQuery(undefined)
  const categories: Category[] = (data?.data ?? []).filter((c: Category) => c.isActive)

  if (isError || categories.length === 0) return null

  return (
    <section className="divide-y divide-border/60">
      {categories.map((category) => (
        <CategorySection key={category.id} category={category} />
      ))}
    </section>
  )
}
