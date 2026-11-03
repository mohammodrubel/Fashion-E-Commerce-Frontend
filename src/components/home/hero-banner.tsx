"use client"

import Image from "next/image"
import { useGetActiveBannerQuery } from "@/redux/fetchers/banner/bannerApi"

export function HeroBanner() {
  const { data, isLoading } = useGetActiveBannerQuery(undefined)
  const banner = data?.data

  if (isLoading) {
    return (
      <section className="relative w-full overflow-hidden h-[70vh] min-h-[460px] md:h-[680px]">
        <div className="absolute inset-0 animate-pulse bg-muted" />
      </section>
    )
  }

  if (!banner) return null

  return (
    <section className="relative w-full overflow-hidden flex flex-col md:flex-row">
      {/* Left — model image, full-bleed on mobile, ~52% on desktop */}
      <div className="relative w-full md:w-[52%] shrink-0 h-[70vh] min-h-[460px] md:h-[680px]">
        {/* Desktop image */}
        <div className="absolute inset-0 hidden md:block">
          <Image
            src={banner.desktopImage}
            alt={banner.heading}
            fill
            priority
            sizes="52vw"
            className="object-cover"
          />
        </div>
        {/* Mobile image (falls back to the desktop image if none was uploaded) */}
        <div className="absolute inset-0 md:hidden">
          <Image
            src={banner.mobileImage || banner.desktopImage}
            alt={banner.heading}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
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
