import { PageHeader } from "@/components/admin/page-header"
import { Upload, Save, Camera, Globe, X } from "lucide-react"

export default function StoreInfoPage() {
  return (
    <div>
      <PageHeader
        title="Store Information"
        description="Your store's public profile, branding, and contact details"
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Settings", href: "/admin/settings" }, { label: "Store Info" }]}
      />

      <div className="max-w-3xl space-y-6">
        {/* Logo */}
        <div className="bg-white rounded-xl border border-border/50 p-6">
          <h2 className="font-semibold text-foreground mb-4" style={{ fontSize: "14px" }}>Store Logo</h2>
          <div className="flex items-center gap-6">
            <div
              className="w-24 h-24 rounded-xl border-2 border-dashed border-border flex items-center justify-center bg-muted/20"
            >
              <div className="text-center">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-1" style={{ backgroundColor: "#501D2A" }}>
                  <span className="text-white font-bold" style={{ fontSize: "16px" }}>M</span>
                </div>
                <span className="text-muted-foreground" style={{ fontSize: "10px" }}>Current Logo</span>
              </div>
            </div>
            <div>
              <button
                className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border/50 bg-white text-foreground hover:bg-muted/30 transition-colors mb-2"
                style={{ fontSize: "13px" }}
              >
                <Upload className="w-4 h-4" />
                Upload New Logo
              </button>
              <p className="text-muted-foreground" style={{ fontSize: "11px" }}>PNG, SVG or WEBP. Max 2MB. Recommended 200×200px.</p>
            </div>
          </div>
        </div>

        {/* Store Identity */}
        <div className="bg-white rounded-xl border border-border/50 p-6">
          <h2 className="font-semibold text-foreground mb-4" style={{ fontSize: "14px" }}>Store Identity</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-foreground font-medium mb-1.5" style={{ fontSize: "13px" }}>Store Name</label>
              <input defaultValue="Maison Élite" className="w-full border border-border/50 rounded-lg px-3 py-2 text-foreground bg-white" style={{ fontSize: "13px" }} />
            </div>
            <div>
              <label className="block text-foreground font-medium mb-1.5" style={{ fontSize: "13px" }}>Tagline</label>
              <input defaultValue="Where style meets substance." className="w-full border border-border/50 rounded-lg px-3 py-2 text-foreground bg-white" style={{ fontSize: "13px" }} />
            </div>
            <div>
              <label className="block text-foreground font-medium mb-1.5" style={{ fontSize: "13px" }}>Store Description</label>
              <textarea
                rows={4}
                defaultValue="Maison Élite is a curated fashion boutique offering timeless pieces from independent designers. We believe great style starts with quality materials and purposeful design."
                className="w-full border border-border/50 rounded-lg px-3 py-2 text-foreground bg-white resize-none"
                style={{ fontSize: "13px" }}
              />
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-white rounded-xl border border-border/50 p-6">
          <h2 className="font-semibold text-foreground mb-4" style={{ fontSize: "14px" }}>Contact Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-foreground font-medium mb-1.5" style={{ fontSize: "13px" }}>Email Address</label>
              <input defaultValue="hello@maisonelite.com" type="email" className="w-full border border-border/50 rounded-lg px-3 py-2 text-foreground bg-white" style={{ fontSize: "13px" }} />
            </div>
            <div>
              <label className="block text-foreground font-medium mb-1.5" style={{ fontSize: "13px" }}>Phone Number</label>
              <input defaultValue="+1 (212) 555-0192" type="tel" className="w-full border border-border/50 rounded-lg px-3 py-2 text-foreground bg-white" style={{ fontSize: "13px" }} />
            </div>
            <div className="col-span-2">
              <label className="block text-foreground font-medium mb-1.5" style={{ fontSize: "13px" }}>Business Address</label>
              <input defaultValue="142 Fifth Avenue, New York, NY 10011, USA" className="w-full border border-border/50 rounded-lg px-3 py-2 text-foreground bg-white" style={{ fontSize: "13px" }} />
            </div>
            <div>
              <label className="block text-foreground font-medium mb-1.5" style={{ fontSize: "13px" }}>Website URL</label>
              <input defaultValue="https://www.maisonelite.com" type="url" className="w-full border border-border/50 rounded-lg px-3 py-2 text-foreground bg-white" style={{ fontSize: "13px" }} />
            </div>
            <div>
              <label className="block text-foreground font-medium mb-1.5" style={{ fontSize: "13px" }}>Support Email</label>
              <input defaultValue="support@maisonelite.com" type="email" className="w-full border border-border/50 rounded-lg px-3 py-2 text-foreground bg-white" style={{ fontSize: "13px" }} />
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="bg-white rounded-xl border border-border/50 p-6">
          <h2 className="font-semibold text-foreground mb-4" style={{ fontSize: "14px" }}>Social Media Links</h2>
          <div className="space-y-3">
            {[
              { label: "Instagram", icon: Camera, value: "https://instagram.com/maisonelite" },
              { label: "Facebook", icon: Globe, value: "https://facebook.com/maisonelite" },
              { label: "Twitter / X", icon: X, value: "https://x.com/maisonelite" },
              { label: "Website", icon: Globe, value: "https://www.maisonelite.com" },
            ].map(s => {
              const Icon = s.icon
              return (
                <div key={s.label} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg border border-border/50 flex items-center justify-center bg-muted/20 shrink-0">
                    <Icon className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <input defaultValue={s.value} className="flex-1 border border-border/50 rounded-lg px-3 py-2 text-foreground bg-white" style={{ fontSize: "13px" }} />
                </div>
              )
            })}
          </div>
        </div>

        {/* Business Registration */}
        <div className="bg-white rounded-xl border border-border/50 p-6">
          <h2 className="font-semibold text-foreground mb-4" style={{ fontSize: "14px" }}>Business Registration</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-foreground font-medium mb-1.5" style={{ fontSize: "13px" }}>Business Legal Name</label>
              <input defaultValue="Maison Élite LLC" className="w-full border border-border/50 rounded-lg px-3 py-2 text-foreground bg-white" style={{ fontSize: "13px" }} />
            </div>
            <div>
              <label className="block text-foreground font-medium mb-1.5" style={{ fontSize: "13px" }}>Tax / EIN Number</label>
              <input defaultValue="47-1234567" className="w-full border border-border/50 rounded-lg px-3 py-2 text-foreground bg-white" style={{ fontSize: "13px" }} />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-white"
            style={{ fontSize: "13px", backgroundColor: "#501D2A" }}
          >
            <Save className="w-4 h-4" />
            Save Store Information
          </button>
        </div>
      </div>
    </div>
  )
}
