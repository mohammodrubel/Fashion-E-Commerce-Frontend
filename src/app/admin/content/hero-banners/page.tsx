import { PageHeader } from "@/components/admin/page-header"
import { Plus, Pencil, Trash2, Eye, ExternalLink } from "lucide-react"

interface HeroBanner {
  id: number
  title: string
  subtitle: string
  ctaText: string
  link: string
  status: "Active" | "Inactive"
  colorBg: string
  colorText: string
  priority: number
}

const banners: HeroBanner[] = [
  { id: 1, title: "Autumn Collection 2024", subtitle: "New arrivals — effortlessly styled for the season", ctaText: "Shop Now", link: "/collections/autumn-2024", status: "Active", colorBg: "#501D2A", colorText: "#FAF0F2", priority: 1 },
  { id: 2, title: "Up to 30% Off Knitwear", subtitle: "Cosy layers at unbeatable prices, this weekend only", ctaText: "Shop the Sale", link: "/sale/knitwear", status: "Active", colorBg: "#1F2937", colorText: "#F9FAFB", priority: 2 },
  { id: 3, title: "New: The Velvet Edit", subtitle: "Luxurious velvet pieces for your winter wardrobe", ctaText: "Explore", link: "/collections/velvet", status: "Inactive", colorBg: "#3B1F5E", colorText: "#FAF0F2", priority: 3 },
  { id: 4, title: "Free Shipping over $50", subtitle: "On all orders — no code needed", ctaText: "Start Shopping", link: "/", status: "Inactive", colorBg: "#166534", colorText: "#F0FDF4", priority: 4 },
]

export default function HeroBannersPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Hero Banners"
        description="Manage homepage hero banner slides"
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Content" }, { label: "Hero Banners" }]}
        actions={
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-white hover:opacity-90 transition-opacity"
            style={{ backgroundColor: "#501D2A", fontSize: "13px" }}
          >
            <Plus className="w-4 h-4" strokeWidth={1.5} />
            Add Banner
          </button>
        }
      />

      {/* Banner Preview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {banners.map((banner) => (
          <div
            key={banner.id}
            className="rounded-xl overflow-hidden border border-border/50"
            style={{ opacity: banner.status === "Inactive" ? 0.6 : 1 }}
          >
            {/* Banner visual */}
            <div className="relative h-28 flex flex-col justify-center px-6" style={{ backgroundColor: banner.colorBg }}>
              <div
                className="absolute top-2 right-2 rounded-full px-2 py-0.5 font-medium"
                style={{
                  fontSize: "10px",
                  backgroundColor: banner.status === "Active" ? "rgba(34,197,94,0.2)" : "rgba(255,255,255,0.15)",
                  color: banner.status === "Active" ? "#86EFAC" : "rgba(255,255,255,0.6)"
                }}
              >
                {banner.status}
              </div>
              <div className="absolute top-2 left-2 rounded-full w-6 h-6 flex items-center justify-center text-white font-bold" style={{ backgroundColor: "rgba(255,255,255,0.2)", fontSize: "11px" }}>
                {banner.priority}
              </div>
              <p className="font-bold" style={{ color: banner.colorText, fontSize: "15px" }}>{banner.title}</p>
              <p style={{ color: banner.colorText, fontSize: "11px", opacity: 0.8 }}>{banner.subtitle}</p>
              <div className="mt-2 inline-flex">
                <span className="px-3 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: "rgba(255,255,255,0.2)", color: banner.colorText }}>
                  {banner.ctaText} →
                </span>
              </div>
            </div>

            {/* Banner meta */}
            <div className="bg-white p-3 flex items-center justify-between">
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <ExternalLink className="w-3.5 h-3.5 text-muted-foreground shrink-0" strokeWidth={1.5} />
                <span className="text-muted-foreground truncate" style={{ fontSize: "11px" }}>{banner.link}</span>
              </div>
              <div className="flex items-center gap-1 ml-2 shrink-0">
                <button className="p-1.5 rounded-lg hover:bg-[#F0EDEF] transition-colors text-muted-foreground hover:text-foreground">
                  <Eye className="w-3.5 h-3.5" strokeWidth={1.5} />
                </button>
                <button className="p-1.5 rounded-lg hover:bg-[#F0EDEF] transition-colors text-muted-foreground hover:text-foreground">
                  <Pencil className="w-3.5 h-3.5" strokeWidth={1.5} />
                </button>
                <button className="p-1.5 rounded-lg hover:bg-red-50 transition-colors text-muted-foreground hover:text-red-600">
                  <Trash2 className="w-3.5 h-3.5" strokeWidth={1.5} />
                </button>
                {/* Toggle */}
                <button
                  className="relative inline-flex items-center rounded-full ml-1"
                  style={{ width: "32px", height: "18px", backgroundColor: banner.status === "Active" ? "#501D2A" : "#D1D5DB" }}
                >
                  <span
                    className="inline-block w-3.5 h-3.5 rounded-full bg-white shadow-sm transform"
                    style={{ transform: banner.status === "Active" ? "translateX(16px)" : "translateX(1px)" }}
                  />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Table view */}
      <div className="bg-white rounded-xl border border-border/50">
        <div className="px-5 py-4" style={{ borderBottom: "1px solid #F0EDEF" }}>
          <p className="font-medium text-foreground" style={{ fontSize: "14px" }}>All Banners</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid #F0EDEF" }}>
                {["#", "Title", "Subtitle", "CTA Text", "Link", "Status", "Actions"].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-muted-foreground font-medium" style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.07em" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {banners.map((banner, i) => (
                <tr
                  key={banner.id}
                  className="hover:bg-[#F8F7F5] transition-colors"
                  style={{ borderBottom: i < banners.length - 1 ? "1px solid #F0EDEF" : "none" }}
                >
                  <td className="px-5 py-3.5">
                    <div className="w-6 h-6 rounded flex items-center justify-center text-white font-bold" style={{ backgroundColor: banner.colorBg, fontSize: "11px" }}>
                      {banner.priority}
                    </div>
                  </td>
                  <td className="px-5 py-3.5"><p className="font-medium text-foreground" style={{ fontSize: "13px" }}>{banner.title}</p></td>
                  <td className="px-5 py-3.5 max-w-xs"><p className="text-muted-foreground truncate" style={{ fontSize: "12px" }}>{banner.subtitle}</p></td>
                  <td className="px-5 py-3.5"><span className="text-foreground" style={{ fontSize: "13px" }}>{banner.ctaText}</span></td>
                  <td className="px-5 py-3.5"><span className="text-muted-foreground font-mono" style={{ fontSize: "12px" }}>{banner.link}</span></td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <button
                        className="relative inline-flex items-center rounded-full"
                        style={{ width: "32px", height: "18px", backgroundColor: banner.status === "Active" ? "#501D2A" : "#D1D5DB" }}
                      >
                        <span className="inline-block w-3.5 h-3.5 rounded-full bg-white shadow-sm" style={{ transform: banner.status === "Active" ? "translateX(16px)" : "translateX(1px)" }} />
                      </button>
                      <span style={{ fontSize: "12px", color: banner.status === "Active" ? "#166534" : "#6B7280" }}>{banner.status}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1">
                      <button className="p-1.5 rounded-lg hover:bg-[#F0EDEF] transition-colors text-muted-foreground hover:text-foreground"><Pencil className="w-3.5 h-3.5" strokeWidth={1.5} /></button>
                      <button className="p-1.5 rounded-lg hover:bg-red-50 transition-colors text-muted-foreground hover:text-red-600"><Trash2 className="w-3.5 h-3.5" strokeWidth={1.5} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
