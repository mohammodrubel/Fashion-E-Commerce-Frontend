import Link from "next/link"
import { Sparkles, Heart, ShieldCheck, Truck } from "lucide-react"
import { SiteHeader } from "@/components/home/site-header"
import { SiteFooter } from "@/components/shared/footer"
import { Button } from "@/components/ui/button"

const values = [
  {
    icon: Sparkles,
    title: "Considered Design",
    desc: "Every piece is chosen for how it looks, feels and lasts — not just how it trends.",
  },
  {
    icon: Heart,
    title: "Everyday Luxury",
    desc: "We believe the pieces you reach for daily deserve the same care as the ones saved for occasions.",
  },
  {
    icon: ShieldCheck,
    title: "Trusted Service",
    desc: "Secure checkout, clear policies, and a team that stands behind every order.",
  },
  {
    icon: Truck,
    title: "Reliable Delivery",
    desc: "From our warehouse to your door, every order is tracked and handled with care.",
  },
]

export default function AboutUsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      {/* ── Breadcrumb ── */}
      <div className="mx-auto w-full max-w-[1600px] px-6 md:px-10 pt-8">
        <div className="text-breadcrumb text-muted-foreground flex items-center gap-1.5">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <span>/</span>
          <span className="text-foreground">About Us</span>
        </div>
      </div>

      {/* ── Hero ── */}
      <section className="mx-auto w-full max-w-[1600px] px-6 md:px-10 pt-10 pb-16 md:pt-14 md:pb-20 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="text-hero-collection-label text-muted-foreground">Our Story</span>
          <h1 className="text-page-title-lg text-foreground mt-4">
            Lifestyle, considered.
          </h1>
          <p className="subtitle-text text-muted-foreground mt-6 leading-relaxed">
            LACHÉO is a home for everyday luxury — pieces designed to be worn,
            used and lived in, not just admired.
          </p>
        </div>
      </section>

      {/* ── Brand Introduction ── */}
      <section className="mx-auto w-full max-w-[1600px] px-6 md:px-10 py-16 md:py-20 border-t border-border/60">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-section-heading text-foreground">Who We Are</h2>
          <p className="font-body text-muted-foreground mt-5 leading-relaxed" style={{ fontSize: "15px" }}>
            LACHÉO is a lifestyle and fashion destination built around one idea:
            that quality, thoughtful design and everyday ease don&apos;t have to
            be mutually exclusive. From wardrobe essentials to considered
            accessories, every product we carry is selected with the same
            question in mind — would we reach for this ourselves, every day?
          </p>
        </div>
      </section>

      {/* ── Our Story ── */}
      <section className="mx-auto w-full max-w-[1600px] px-6 md:px-10 py-16 md:py-20 border-t border-border/60">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
          <div>
            <span className="text-category-label text-muted-foreground">Our Story</span>
            <h2 className="text-section-heading text-foreground mt-3">
              Built around how people actually live.
            </h2>
          </div>
          <p className="font-body text-muted-foreground leading-relaxed" style={{ fontSize: "15px" }}>
            LACHÉO started from a simple observation: the best wardrobes
            aren&apos;t built from one-off statement pieces, but from items
            that earn their place through daily use. That shaped how we
            curate — fewer, better pieces, chosen for how they wear over
            time, not just how they photograph.
          </p>
        </div>
      </section>

      {/* ── Mission & Vision ── */}
      <section className="mx-auto w-full max-w-[1600px] px-6 md:px-10 py-16 md:py-20 border-t border-border/60 bg-muted/30">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="bg-card rounded-xl border border-border/60 p-8">
            <h3 className="text-category-title text-foreground">Our Mission</h3>
            <p className="font-body text-muted-foreground mt-4 leading-relaxed" style={{ fontSize: "14px" }}>
              To make considered, well-made lifestyle products easy to find,
              easy to buy, and easy to live with — every single day.
            </p>
          </div>
          <div className="bg-card rounded-xl border border-border/60 p-8">
            <h3 className="text-category-title text-foreground">Our Vision</h3>
            <p className="font-body text-muted-foreground mt-4 leading-relaxed" style={{ fontSize: "14px" }}>
              To be the destination our customers trust first — for quality,
              for service, and for a shopping experience that feels as
              considered as the products themselves.
            </p>
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section className="mx-auto w-full max-w-[1600px] px-6 md:px-10 py-16 md:py-20 border-t border-border/60">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-category-label text-muted-foreground">Why LACHÉO</span>
            <h2 className="text-section-heading text-foreground mt-3">Why Choose Us</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v) => {
              const Icon = v.icon
              return (
                <div key={v.title} className="text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-ui font-semibold text-foreground" style={{ fontSize: "14px" }}>
                    {v.title}
                  </h3>
                  <p className="font-body text-muted-foreground mt-2 leading-relaxed" style={{ fontSize: "13px" }}>
                    {v.desc}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Shop CTA ── */}
      <section className="mx-auto w-full max-w-[1600px] px-6 md:px-10 py-16 md:py-20 border-t border-border/60 text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="text-promo-heading text-foreground">Explore the Collection</h2>
          <p className="text-promo-description text-muted-foreground mt-4">
            Discover the pieces LACHÉO is built around.
          </p>
          <Button render={<Link href="/shop" />} className="btn-label mt-7 h-11 px-8">
            Shop Now
          </Button>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
