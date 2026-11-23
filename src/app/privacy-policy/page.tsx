import Link from "next/link"
import { SiteHeader } from "@/components/home/site-header"
import { SiteFooter } from "@/components/shared/footer"
import { SUPPORT_EMAIL } from "@/lib/site-config"

const sections = [
  { id: "information-we-collect", title: "1. Information We Collect" },
  { id: "personal-data", title: "2. Personal Data" },
  { id: "account-order-information", title: "3. Account and Order Information" },
  { id: "cookies", title: "4. Cookies" },
  { id: "payment-information", title: "5. Payment Information" },
  { id: "third-party-services", title: "6. Third-Party Services" },
  { id: "data-security-retention", title: "7. Data Security and Retention" },
  { id: "your-rights", title: "8. Your Rights" },
  { id: "contact-us", title: "9. Contact Us" },
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

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <div className="mx-auto w-full max-w-[1600px] px-6 md:px-10 pt-8">
        <div className="text-breadcrumb text-muted-foreground flex items-center gap-1.5">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <span>/</span>
          <span className="text-foreground">Privacy Policy</span>
        </div>
      </div>

      <div className="mx-auto w-full max-w-[1600px] px-6 md:px-10 pt-10 pb-20 md:pt-14">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-page-title text-foreground">Privacy Policy</h1>
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
            <Section id="information-we-collect" title="1. Information We Collect">
              <p>
                We collect information you provide directly to us when you create an
                account, place an order, save an address, or contact us — including
                your name, email address, phone number, and delivery address.
              </p>
            </Section>

            <Section id="personal-data" title="2. Personal Data">
              <p>
                Personal data is used to process your orders, manage your account,
                respond to your requests, and improve the products and services we
                offer. We do not sell your personal data to third parties.
              </p>
            </Section>

            <Section id="account-order-information" title="3. Account and Order Information">
              <p>
                Your account stores your name, email, phone number, saved delivery
                addresses, and order history, so you can track past purchases and
                check out faster in the future.
              </p>
              <p>
                If you sign in with Google, we receive the name, email address, and
                profile information you&apos;ve made available through your Google
                account to create and sign you into your LACHÉO account.
              </p>
            </Section>

            <Section id="cookies" title="4. Cookies">
              <p>
                We use cookies and similar local storage technologies to keep you
                signed in, remember items in your cart and wishlist, and understand
                how our site is used. You can control cookies through your browser
                settings; disabling them may affect site functionality such as
                staying signed in or keeping items in your cart.
              </p>
            </Section>

            <Section id="payment-information" title="5. Payment Information">
              <p>
                Payments are processed through our payment partners. We do not store
                your full card details on our servers. Depending on availability,
                payment may be made via Cash on Delivery, bKash, Nagad, card, or
                bank transfer.
              </p>
            </Section>

            <Section id="third-party-services" title="6. Third-Party Services">
              <p>
                We work with trusted third-party providers to operate our store —
                including payment processors, delivery partners, and cloud hosting
                and image-storage services. These providers only receive the
                information necessary to perform their services for us.
              </p>
            </Section>

            <Section id="data-security-retention" title="7. Data Security and Retention">
              <p>
                We use industry-standard measures — including encrypted password
                storage and secure connections — to protect your information. We
                retain account and order data for as long as your account remains
                active, or as needed to comply with our legal and accounting
                obligations.
              </p>
            </Section>

            <Section id="your-rights" title="8. Your Rights">
              <p>
                You can view and update your personal information, manage your
                saved addresses, and change your password at any time from your
                account page. You may also request that we delete your account by
                contacting us.
              </p>
            </Section>

            <Section id="contact-us" title="9. Contact Us">
              <p>
                If you have any questions about this Privacy Policy, you can reach
                us at{" "}
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
