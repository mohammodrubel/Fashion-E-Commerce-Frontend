import Link from "next/link"
import { Clock, Mail, MessageSquare, CheckCircle2 } from "lucide-react"
import { SiteHeader } from "@/components/home/site-header"
import { SiteFooter } from "@/components/shared/footer"
import { SUPPORT_EMAIL } from "@/lib/site-config"

const sections = [
  { id: "general-terms", title: "1. General Terms" },
  { id: "orders-and-payments", title: "2. Orders and Payments" },
  { id: "pricing", title: "3. Pricing" },
  { id: "delivery-policy", title: "4. Delivery Policy" },
  { id: "return-and-refund-policy", title: "5. Return and Refund Policy" },
  { id: "customer-responsibilities", title: "6. Customer Responsibilities" },
  { id: "policy-updates", title: "7. Policy Updates" },
]

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="py-8 border-t border-border/60 first:border-t-0 first:pt-0">
      <h2 className="text-category-title text-foreground mb-3">{title}</h2>
      <div className="font-body text-muted-foreground leading-relaxed space-y-3" style={{ fontSize: "14px" }}>
        {children}
      </div>
    </section>
  )
}

const returnSteps = [
  { icon: Mail, text: "Email us with your order number and return request." },
  { icon: MessageSquare, text: "Or contact us through the Contact Us page." },
  { icon: Clock, text: "Submit your request within 2 days of delivery." },
  { icon: CheckCircle2, text: "Wait for our confirmation and return instructions." },
]

export default function TermsAndConditionsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <div className="px-6 md:px-10 pt-8">
        <div className="text-breadcrumb text-muted-foreground flex items-center gap-1.5">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <span>/</span>
          <span className="text-foreground">Terms &amp; Conditions</span>
        </div>
      </div>

      <div className="px-6 md:px-10 pt-10 pb-20 md:pt-14">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-page-title text-foreground">Terms &amp; Conditions</h1>
          <p className="font-body text-muted-foreground mt-4" style={{ fontSize: "13px" }}>
            Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </p>

          {/* ── Table of Contents ── */}
          <nav className="mt-10 bg-muted/40 rounded-xl border border-border/60 p-6">
            <h2 className="font-ui font-semibold text-foreground uppercase mb-4" style={{ fontSize: "11px", letterSpacing: "0.1em" }}>
              Table of Contents
            </h2>
            <ol className="space-y-2">
              {sections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="font-body text-muted-foreground hover:text-primary transition-colors"
                    style={{ fontSize: "13px" }}
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="mt-6">
            <Section id="general-terms" title="1. General Terms">
              <p>
                By using the LACHÉO website and placing an order, you agree to the
                terms described on this page. We may update these terms from time
                to time, as described in the Policy Updates section below.
              </p>
            </Section>

            <Section id="orders-and-payments" title="2. Orders and Payments">
              <p>
                When you place an order, you&apos;ll receive confirmation of the
                items, quantities, and total amount due. Depending on
                availability, payment can be made via Cash on Delivery, bKash,
                Nagad, card, or bank transfer. An order is confirmed once payment
                is successfully received or, for Cash on Delivery orders, once the
                order is accepted.
              </p>
            </Section>

            <Section id="pricing" title="3. Pricing">
              <p>
                All prices are listed in Bangladeshi Taka (BDT) and include any
                discount already applied to the item at checkout. Prices,
                availability, and discounts may change at any time without prior
                notice; the price shown at checkout is the price charged.
              </p>
            </Section>

            <Section id="delivery-policy" title="4. Delivery Policy">
              <p>
                Orders are shipped to the delivery address you provide at
                checkout. Please make sure your address, phone number, and contact
                details are accurate, as we are not responsible for delays or
                failed deliveries caused by incorrect information.
              </p>
            </Section>

            <Section id="return-and-refund-policy" title="5. Return and Refund Policy">
              <p>
                If you&apos;re not satisfied with your order, you must contact us
                within 2 days of receiving your product to request a return — see
                the highlighted steps below.
              </p>

              {/* ── Prominent 2-Day Return Deadline ── */}
              <div className="mt-6 rounded-xl border border-primary/30 bg-primary/5 p-6 not-prose">
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Clock className="w-4.5 h-4.5 text-primary" style={{ width: "18px", height: "18px" }} strokeWidth={1.5} />
                  </div>
                  <h3 className="font-ui font-semibold text-foreground" style={{ fontSize: "14px" }}>
                    Return requests must be made within 2 days of delivery
                  </h3>
                </div>
                <ol className="space-y-3">
                  {returnSteps.map((step, i) => {
                    const Icon = step.icon
                    return (
                      <li key={i} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0 font-ui font-semibold" style={{ fontSize: "11px" }}>
                          {i + 1}
                        </div>
                        <p className="font-body text-foreground flex items-center gap-2" style={{ fontSize: "13px" }}>
                          <Icon className="w-3.5 h-3.5 text-primary shrink-0" strokeWidth={1.5} />
                          {step.text}
                        </p>
                      </li>
                    )
                  })}
                </ol>
              </div>

              <p className="mt-5">
                Requests submitted after the 2-day window may not be eligible for
                return. Once we receive your request, we will confirm it and send
                you return instructions.
              </p>
            </Section>

            <Section id="customer-responsibilities" title="6. Customer Responsibilities">
              <p>
                You are responsible for providing accurate order, payment, and
                delivery information, keeping your account credentials secure, and
                reviewing your order details before completing checkout.
              </p>
            </Section>

            <Section id="policy-updates" title="7. Policy Updates">
              <p>
                We may update these Terms &amp; Conditions from time to time. The
                &quot;Last updated&quot; date at the top of this page reflects the
                most recent revision. Continuing to use our site after an update
                means you accept the revised terms.
              </p>
              <p>
                Questions about these terms can be sent to{" "}
                <a href={`mailto:${SUPPORT_EMAIL}`} className="text-primary hover:underline">
                  {SUPPORT_EMAIL}
                </a>{" "}
                or through our{" "}
                <Link href="/contact-us" className="text-primary hover:underline">
                  Contact Us
                </Link>{" "}
                page.
              </p>
            </Section>
          </div>
        </div>
      </div>

      <SiteFooter />
    </main>
  )
}
