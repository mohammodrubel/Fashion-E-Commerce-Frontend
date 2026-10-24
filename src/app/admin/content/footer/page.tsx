import { PageHeader } from "@/components/admin/page-header"
import { Save, Plus, Trash2, ExternalLink, Camera, Globe, X, Play } from "lucide-react"

const footerColumns = [
  {
    id: "company",
    title: "Company",
    links: [
      { label: "About Us", url: "/about" },
      { label: "Sustainability", url: "/sustainability" },
      { label: "Careers", url: "/careers" },
      { label: "Press", url: "/press" },
    ],
  },
  {
    id: "help",
    title: "Customer Service",
    links: [
      { label: "Contact Us", url: "/contact" },
      { label: "FAQ", url: "/faq" },
      { label: "Returns & Exchanges", url: "/returns" },
      { label: "Shipping Information", url: "/shipping" },
      { label: "Order Tracking", url: "/track" },
    ],
  },
  {
    id: "legal",
    title: "Legal",
    links: [
      { label: "Privacy Policy", url: "/privacy" },
      { label: "Terms of Service", url: "/terms" },
      { label: "Cookie Policy", url: "/cookies" },
      { label: "Accessibility", url: "/accessibility" },
    ],
  },
]

const socialLinks = [
  { platform: "Instagram", handle: "@velour_official", url: "https://instagram.com/velour_official", icon: Camera, color: "#E1306C" },
  { platform: "TikTok", handle: "@velour", url: "https://tiktok.com/@velour", icon: Play, color: "#010101" },
  { platform: "Facebook", handle: "Velour Fashion", url: "https://facebook.com/velourfashion", icon: Globe, color: "#1877F2" },
  { platform: "Pinterest", handle: "@velour_fashion", url: "https://pinterest.com/velour_fashion", icon: X, color: "#E60023" },
]

export default function FooterManagementPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Footer Management"
        description="Configure links, social profiles, and footer content"
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Content" }, { label: "Footer" }]}
        actions={
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-white hover:opacity-90 transition-opacity"
            style={{ backgroundColor: "#501D2A", fontSize: "13px" }}
          >
            <Save className="w-4 h-4" strokeWidth={1.5} />
            Save Changes
          </button>
        }
      />

      {/* Footer Preview */}
      <div className="bg-white rounded-xl border border-border/50 p-5">
        <p className="font-medium text-foreground mb-3" style={{ fontSize: "14px" }}>Footer Preview</p>
        <div className="rounded-xl overflow-hidden">
          <div className="px-6 py-6 grid grid-cols-2 sm:grid-cols-4 gap-6" style={{ backgroundColor: "#1F2937" }}>
            {/* Brand column */}
            <div>
              <p className="font-bold text-white" style={{ fontSize: "16px" }}>Velour</p>
              <p className="mt-2" style={{ fontSize: "11px", color: "rgba(255,255,255,0.55)", lineHeight: "1.6" }}>Effortless fashion for the modern wardrobe. Sustainable. Considered. Beautiful.</p>
            </div>
            {/* Link columns */}
            {footerColumns.map((col) => (
              <div key={col.id}>
                <p className="font-semibold text-white mb-2" style={{ fontSize: "12px" }}>{col.title}</p>
                <div className="space-y-1">
                  {col.links.slice(0, 4).map((link) => (
                    <p key={link.label} style={{ fontSize: "11px", color: "rgba(255,255,255,0.55)" }}>{link.label}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="px-6 py-3 flex items-center justify-between" style={{ backgroundColor: "#111827" }}>
            <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)" }}>© 2024 Velour. All rights reserved.</p>
            <div className="flex items-center gap-2">
              {[Camera, Globe, X].map((Icon, i) => (
                <div key={i} className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: "rgba(255,255,255,0.1)" }}>
                  <Icon className="w-3 h-3 text-white/60" strokeWidth={1.5} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Company Info */}
        <div className="bg-white rounded-xl border border-border/50 p-6">
          <h2 className="font-semibold text-foreground mb-4" style={{ fontSize: "14px" }}>Company Info</h2>
          <div className="space-y-3">
            <div>
              <label className="block font-medium text-muted-foreground mb-1" style={{ fontSize: "11px" }}>Brand Name</label>
              <input type="text" defaultValue="Velour" className="w-full px-3 py-2 rounded-lg border border-border/60 bg-[#F8F7F5] text-foreground focus:outline-none focus:border-primary/40" style={{ fontSize: "13px" }} />
            </div>
            <div>
              <label className="block font-medium text-muted-foreground mb-1" style={{ fontSize: "11px" }}>Tagline</label>
              <textarea defaultValue="Effortless fashion for the modern wardrobe. Sustainable. Considered. Beautiful." rows={3} className="w-full px-3 py-2 rounded-lg border border-border/60 bg-[#F8F7F5] text-foreground focus:outline-none focus:border-primary/40 resize-none" style={{ fontSize: "13px" }} />
            </div>
            <div>
              <label className="block font-medium text-muted-foreground mb-1" style={{ fontSize: "11px" }}>Copyright Text</label>
              <input type="text" defaultValue="© 2024 Velour. All rights reserved." className="w-full px-3 py-2 rounded-lg border border-border/60 bg-[#F8F7F5] text-foreground focus:outline-none focus:border-primary/40" style={{ fontSize: "13px" }} />
            </div>
          </div>

          {/* Social Links */}
          <div className="mt-5 pt-5" style={{ borderTop: "1px solid #F0EDEF" }}>
            <div className="flex items-center justify-between mb-3">
              <p className="font-semibold text-foreground" style={{ fontSize: "13px" }}>Follow Us</p>
              <button className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors" style={{ fontSize: "11px" }}>
                <Plus className="w-3 h-3" strokeWidth={1.5} /> Add
              </button>
            </div>
            <div className="space-y-2">
              {socialLinks.map((social) => (
                <div key={social.platform} className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#F8F7F5] transition-colors group">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: social.color + "20" }}>
                    <social.icon className="w-3.5 h-3.5" style={{ color: social.color }} strokeWidth={1.5} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground" style={{ fontSize: "12px" }}>{social.platform}</p>
                    <p className="text-muted-foreground truncate" style={{ fontSize: "11px" }}>{social.handle}</p>
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <a href={social.url} target="_blank" className="p-1 rounded hover:bg-[#F0EDEF] text-muted-foreground hover:text-foreground transition-colors">
                      <ExternalLink className="w-3 h-3" strokeWidth={1.5} />
                    </a>
                    <button className="p-1 rounded hover:bg-red-50 text-muted-foreground hover:text-red-600 transition-colors">
                      <Trash2 className="w-3 h-3" strokeWidth={1.5} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer columns */}
        <div className="lg:col-span-2 space-y-4">
          {footerColumns.map((col) => (
            <div key={col.id} className="bg-white rounded-xl border border-border/50 p-5">
              <div className="flex items-center justify-between mb-3">
                <input
                  type="text"
                  defaultValue={col.title}
                  className="font-semibold text-foreground bg-transparent border-b border-transparent hover:border-border/60 focus:border-primary/40 focus:outline-none px-0"
                  style={{ fontSize: "14px" }}
                />
                <button className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors" style={{ fontSize: "11px" }}>
                  <Plus className="w-3 h-3" strokeWidth={1.5} /> Add Link
                </button>
              </div>
              <div className="space-y-2">
                {col.links.map((link, idx) => (
                  <div key={idx} className="flex items-center gap-2 group">
                    <input
                      type="text"
                      defaultValue={link.label}
                      className="flex-1 px-3 py-1.5 rounded-lg border border-border/60 bg-[#F8F7F5] text-foreground focus:outline-none focus:border-primary/40"
                      style={{ fontSize: "12px" }}
                    />
                    <input
                      type="text"
                      defaultValue={link.url}
                      className="flex-1 px-3 py-1.5 rounded-lg border border-border/60 bg-[#F8F7F5] text-muted-foreground font-mono focus:outline-none focus:border-primary/40"
                      style={{ fontSize: "11px" }}
                    />
                    <button className="p-1.5 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-red-50 transition-all text-muted-foreground hover:text-red-600">
                      <Trash2 className="w-3.5 h-3.5" strokeWidth={1.5} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
