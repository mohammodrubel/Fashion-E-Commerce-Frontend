import { PageHeader } from "@/components/admin/page-header"
import { Save, Camera, Globe, X, Play, AtSign, Link, Share2, ExternalLink } from "lucide-react"

const platforms = [
  {
    name: "Instagram",
    icon: Camera,
    color: "#E1306C",
    bg: "#fdf2f8",
    placeholder: "https://instagram.com/yourstore",
    value: "https://instagram.com/maisonelite",
    handle: "@maisonelite",
    followers: "12.4K",
  },
  {
    name: "Facebook",
    icon: Globe,
    color: "#1877F2",
    bg: "#eff6ff",
    placeholder: "https://facebook.com/yourstore",
    value: "https://facebook.com/maisonelite",
    handle: "Maison Élite",
    followers: "8.2K",
  },
  {
    name: "Twitter / X",
    icon: X,
    color: "#000000",
    bg: "#f9fafb",
    placeholder: "https://x.com/yourstore",
    value: "https://x.com/maisonelite",
    handle: "@maisonelite",
    followers: "3.1K",
  },
  {
    name: "TikTok",
    icon: Play,
    color: "#000000",
    bg: "#f9fafb",
    placeholder: "https://tiktok.com/@yourstore",
    value: "https://tiktok.com/@maisonelite",
    handle: "@maisonelite",
    followers: "24.8K",
  },
  {
    name: "Pinterest",
    icon: Share2,
    color: "#E60023",
    bg: "#fff1f2",
    placeholder: "https://pinterest.com/yourstore",
    value: "https://pinterest.com/maisonelite",
    handle: "maisonelite",
    followers: "5.6K",
  },
  {
    name: "YouTube",
    icon: Play,
    color: "#FF0000",
    bg: "#fff1f2",
    placeholder: "https://youtube.com/@yourstore",
    value: "",
    handle: "—",
    followers: "—",
  },
]

export default function SocialMediaPage() {
  return (
    <div>
      <PageHeader
        title="Social Media Links"
        description="Connect your social media profiles to display in your store's footer and about page"
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Settings", href: "/admin/settings" }, { label: "Social Media" }]}
      />

      <div className="max-w-3xl space-y-6">
        <div className="space-y-3">
          {platforms.map(p => {
            const Icon = p.icon
            return (
              <div key={p.name} className="bg-white rounded-xl border border-border/50 p-5">
                <div className="flex items-center gap-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: p.bg }}
                  >
                    <Icon className="w-5 h-5" style={{ color: p.color }} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="font-semibold text-foreground" style={{ fontSize: "13px" }}>{p.name}</span>
                      {p.followers !== "—" && (
                        <span className="text-muted-foreground" style={{ fontSize: "11px" }}>{p.followers} followers</span>
                      )}
                    </div>
                    <input
                      defaultValue={p.value}
                      placeholder={p.placeholder}
                      className="w-full border border-border/50 rounded-lg px-3 py-2 text-foreground bg-white"
                      style={{ fontSize: "13px" }}
                    />
                  </div>
                  {p.value && (
                    <a
                      href={p.value}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-lg border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-colors shrink-0"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Footer Preview */}
        <div className="bg-white rounded-xl border border-border/50 p-6">
          <h2 className="font-semibold text-foreground mb-4" style={{ fontSize: "14px" }}>Footer Preview</h2>
          <div className="rounded-lg p-4" style={{ backgroundColor: "#501D2A" }}>
            <p className="text-white/60 mb-3" style={{ fontSize: "11px" }}>Follow us on social media</p>
            <div className="flex items-center gap-3">
              {platforms.filter(p => p.value).map(p => {
                const Icon = p.icon
                return (
                  <div
                    key={p.name}
                    className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer"
                  >
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                )
              })}
            </div>
          </div>
          <p className="text-muted-foreground mt-2" style={{ fontSize: "11px" }}>Only platforms with a URL configured will appear.</p>
        </div>

        <div className="flex justify-end">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-white" style={{ fontSize: "13px", backgroundColor: "#501D2A" }}>
            <Save className="w-4 h-4" />
            Save Social Links
          </button>
        </div>
      </div>
    </div>
  )
}
