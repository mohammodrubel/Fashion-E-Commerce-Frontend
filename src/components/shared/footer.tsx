import { Logo } from "@/components/shared/logo"

export function SiteFooter() {
  return (
    <footer style={{ backgroundColor: "#0D0B0C" }} className="px-6 md:px-16 py-14">
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center gap-4">
        <Logo variant="dark" />
        <p className="text-footer-copyright text-white/40 mt-6">
          © {new Date().getFullYear()} LACHÉO. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
