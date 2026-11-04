import Link from "next/link"
import { Logo } from "@/components/shared/logo"

const footerLinks = [
  { label: "About Us", href: "/about-us" },
  { label: "Contact Us", href: "/contact-us" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
]

export function SiteFooter() {
  return (
    <footer style={{ backgroundColor: "#0D0B0C" }} className="px-6 md:px-16 py-14">
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center gap-4">
        <Logo variant="dark" />

        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-6">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-footer-link text-white/60 hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <p className="text-footer-copyright text-white/40 mt-6">
          © {new Date().getFullYear()} LACHÉO. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
