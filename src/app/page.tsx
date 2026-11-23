import { SiteHeader } from "@/components/home/site-header";
import { HeroBanner } from "@/components/home/hero-banner";
import { CategoryShowcase } from "@/components/home/category-showcase";
import { CategoryProductSections } from "@/components/home/category-product-sections";
import { API_URL } from "@/lib/api-url";
import { SiteFooter } from "@/components/shared/footer";

async function getActiveBanner() {
  try {
    const res = await fetch(`${API_URL}/banner/active`, { next: { revalidate: 60 } })
    if (!res.ok) return null
    const json = await res.json()
    return json?.data ?? null
  } catch {
    return null
  }
}

export default async function Home() {
  const banner = await getActiveBanner()

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <HeroBanner initialBanner={banner} />

      <CategoryShowcase />

      <CategoryProductSections />

      <SiteFooter />
    </main>
  );
}
