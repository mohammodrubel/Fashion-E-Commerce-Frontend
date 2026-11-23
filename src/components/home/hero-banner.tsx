"use client"

import { getImageProps } from "next/image"
import { useGetActiveBannerQuery } from "@/redux/fetchers/banner/bannerApi"

const IMG_HEIGHT = "h-[70vh] min-h-[460px] md:h-[680px]"

// Skeleton mirrors the final split layout so nothing jumps when data arrives.
function HeroSkeleton() {
  return (
    <section className="relative w-full overflow-hidden flex flex-col md:flex-row">
      <div
        className={`relative w-full md:w-[52%] shrink-0 animate-pulse bg-muted ${IMG_HEIGHT}`}
      />
      <div className="relative flex-1 flex flex-col items-start justify-center gap-5 px-8 py-16 md:px-16 bg-muted/60">
        <div className="h-px w-10 bg-foreground/20" />
        <div className="h-3 w-40 rounded bg-muted animate-pulse" />
        <div className="h-14 w-3/4 rounded bg-muted animate-pulse" />
        <div className="h-4 w-28 rounded bg-muted animate-pulse mt-4" />
      </div>
    </section>
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function HeroBanner({ initialBanner }: { initialBanner?: any }) {
  // Banner is fetched on the server (see app/page.tsx) so the LCP image is in
  // the initial HTML. The client query is only a fallback when that failed.
  const { data, isLoading } = useGetActiveBannerQuery(undefined, { skip: !!initialBanner })
  const banner = initialBanner ?? data?.data

  if (!initialBanner && isLoading) return <HeroSkeleton />

  if (!banner) return null

  // Art direction via <picture>: the browser downloads only the matching
  // image. This is the LCP element, so it is eager + high priority.
  const alt = banner.heading as string
  const common = {
    alt,
    fill: true,
    loading: "eager" as const,
    fetchPriority: "high" as const,
    className: "object-contain",
  }
  const { props: desktop } = getImageProps({
    ...common,
    src: banner.desktopImage,
    // Image is height-bound (680px, object-contain) so it never exceeds ~570px wide.
    sizes: "(min-width: 768px) min(52vw, 570px), 100vw",
  })
  const { props: mobile } = getImageProps({
    ...common,
    src: banner.mobileImage || banner.desktopImage,
    sizes: "100vw",
  })

  return (
    <section className="relative w-full overflow-hidden flex flex-col md:flex-row">
      {/* Left — model image, full-bleed on mobile, ~52% on desktop */}
      <div
        className={`relative w-full md:w-[52%] shrink-0 ${IMG_HEIGHT}`}
        style={{ backgroundColor: banner.backgroundColor || "#F2F0F2" }}
      >
        <picture>
          <source media="(min-width: 768px)" srcSet={desktop.srcSet} sizes={desktop.sizes} />
          <img {...mobile} alt={alt} />
        </picture>
      </div>

      {/* Right — content panel */}
      <div
        className="relative flex-1 flex flex-col items-start justify-center px-8 py-16 md:px-16"
        style={{ backgroundColor: banner.backgroundColor || "#F2F0F2" }}
      >
        {banner.collectionLabel && (
          <>
            <div className="w-10 h-px bg-foreground/40 mb-4" />
            <span className="text-hero-collection-label text-foreground/70 mb-5">
              {banner.collectionLabel}
            </span>
          </>
        )}

        <div className="flex items-end gap-4">
          <h1 className="text-hero-heading text-foreground">{banner.heading}</h1>
          {banner.seasonYear && (
            <span className="text-hero-season text-foreground/60 pb-2 hidden sm:inline">
              {banner.seasonYear}
            </span>
          )}
        </div>

        {banner.discoverText && (
          <div className="mt-8">
            <span className="text-hero-discover text-foreground pb-1 border-b border-foreground/50">
              {banner.discoverText}
            </span>
          </div>
        )}
      </div>
    </section>
  )
}
