import { SiteHeader } from "@/components/home/site-header";
import { HeroBanner } from "@/components/home/hero-banner";
import { CategoryShowcase } from "@/components/home/category-showcase";
import { CategoryProductSections } from "@/components/home/category-product-sections";
import { SiteFooter } from "@/components/shared/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <HeroBanner />

      <CategoryShowcase />

      <CategoryProductSections />

      <SiteFooter />
    </main>
  );
}
