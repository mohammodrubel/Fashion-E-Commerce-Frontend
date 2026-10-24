import { PageHeader } from "@/components/admin/page-header"
import { Search, Save, Globe } from "lucide-react"

export default function SEOSettingsPage() {
  return (
    <div>
      <PageHeader
        title="SEO Settings"
        description="Optimize your store for search engines and social sharing"
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Settings", href: "/admin/settings" }, { label: "SEO" }]}
      />

      <div className="max-w-3xl space-y-6">
        {/* Meta Templates */}
        <div className="bg-white rounded-xl border border-border/50 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Search className="w-4 h-4 text-muted-foreground" />
            <h2 className="font-semibold text-foreground" style={{ fontSize: "14px" }}>Meta Tag Templates</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-foreground font-medium mb-1.5" style={{ fontSize: "13px" }}>Meta Title Template</label>
              <input
                defaultValue="{page_title} | Maison Élite"
                className="w-full border border-border/50 rounded-lg px-3 py-2 text-foreground bg-white"
                style={{ fontSize: "13px" }}
              />
              <p className="text-muted-foreground mt-1" style={{ fontSize: "11px" }}>Variables: {"{page_title}"}, {"{store_name}"}, {"{category}"}</p>
            </div>
            <div>
              <label className="block text-foreground font-medium mb-1.5" style={{ fontSize: "13px" }}>Meta Description Template</label>
              <textarea
                rows={3}
                defaultValue="Shop {page_title} at Maison Élite — curated fashion with free shipping on orders over $75."
                className="w-full border border-border/50 rounded-lg px-3 py-2 text-foreground bg-white resize-none"
                style={{ fontSize: "13px" }}
              />
              <p className="text-muted-foreground mt-1" style={{ fontSize: "11px" }}>Recommended 150–160 characters. Current length: 86 chars.</p>
            </div>
          </div>
        </div>

        {/* Analytics */}
        <div className="bg-white rounded-xl border border-border/50 p-6">
          <h2 className="font-semibold text-foreground mb-4" style={{ fontSize: "14px" }}>Analytics & Tracking</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-foreground font-medium mb-1.5" style={{ fontSize: "13px" }}>Google Analytics 4 Measurement ID</label>
              <input
                defaultValue="G-XXXXXXXXXX"
                className="w-full border border-border/50 rounded-lg px-3 py-2 text-foreground bg-white"
                style={{ fontSize: "13px" }}
              />
            </div>
            <div>
              <label className="block text-foreground font-medium mb-1.5" style={{ fontSize: "13px" }}>Facebook Pixel ID</label>
              <input
                defaultValue="123456789012345"
                className="w-full border border-border/50 rounded-lg px-3 py-2 text-foreground bg-white"
                style={{ fontSize: "13px" }}
              />
            </div>
            <div>
              <label className="block text-foreground font-medium mb-1.5" style={{ fontSize: "13px" }}>Google Tag Manager Container ID</label>
              <input
                placeholder="GTM-XXXXXXX"
                className="w-full border border-border/50 rounded-lg px-3 py-2 text-foreground bg-white"
                style={{ fontSize: "13px" }}
              />
            </div>
          </div>
        </div>

        {/* Sitemap & Robots */}
        <div className="bg-white rounded-xl border border-border/50 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Globe className="w-4 h-4 text-muted-foreground" />
            <h2 className="font-semibold text-foreground" style={{ fontSize: "14px" }}>Sitemap & Crawling</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground" style={{ fontSize: "13px" }}>Auto-Generate Sitemap</p>
                <p className="text-muted-foreground" style={{ fontSize: "12px" }}>Automatically update sitemap.xml when content changes</p>
              </div>
              <button className="relative inline-flex w-10 h-6 rounded-full" style={{ backgroundColor: "#501D2A" }}>
                <span className="absolute right-1 top-1 w-4 h-4 rounded-full bg-white shadow-sm" />
              </button>
            </div>
            <div className="border-t border-border/30 pt-4">
              <p className="text-muted-foreground mb-2" style={{ fontSize: "12px" }}>
                Sitemap URL: <span className="font-mono text-foreground">https://www.maisonelite.com/sitemap.xml</span>
              </p>
            </div>
            <div className="border-t border-border/30 pt-4 flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground" style={{ fontSize: "13px" }}>Custom robots.txt</p>
                <p className="text-muted-foreground" style={{ fontSize: "12px" }}>Edit your robots.txt file manually</p>
              </div>
              <button className="relative inline-flex w-10 h-6 rounded-full" style={{ backgroundColor: "#e5e7eb" }}>
                <span className="absolute left-1 top-1 w-4 h-4 rounded-full bg-white shadow-sm" />
              </button>
            </div>
            <div className="border-t border-border/30 pt-4">
              <label className="block text-foreground font-medium mb-1.5" style={{ fontSize: "13px" }}>robots.txt Content</label>
              <textarea
                rows={5}
                defaultValue={"User-agent: *\nAllow: /\nDisallow: /admin/\nDisallow: /checkout/\nSitemap: https://www.maisonelite.com/sitemap.xml"}
                className="w-full border border-border/50 rounded-lg px-3 py-2 text-foreground bg-muted/20 font-mono resize-none"
                style={{ fontSize: "12px" }}
                readOnly
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-white" style={{ fontSize: "13px", backgroundColor: "#501D2A" }}>
            <Save className="w-4 h-4" />
            Save SEO Settings
          </button>
        </div>
      </div>
    </div>
  )
}
