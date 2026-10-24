import { PageHeader } from "@/components/admin/page-header"
import { Plus, Pencil, Trash2 } from "lucide-react"

interface PromoBanner {
  id: number
  title: string
  subtitle: string
  ctaText: string
  placement: string
  status: "Active" | "Inactive"
  bg: string
  textColor: string
  accentColor: string
}

const banners: PromoBanner[] = [
  { id: 1, title: "Free Shipping", subtitle: "On all orders over $50 — no code needed", ctaText: "Shop Now", placement: "Homepage Strip", status: "Active", bg: "#501D2A", textColor: "#FAF0F2", accentColor: "#C4849A" },
  { id: 2, title: "New Season Dresses", subtitle: "Spring into summer style", ctaText: "Explore", placement: "Category Page", status: "Active", bg: "#7C3D52", textColor: "#FAF0F2", accentColor: "#F9A8C9" },
  { id: 3, title: "Members Get 15% Off", subtitle: "Sign up and save on your first order", ctaText: "Join Free", placement: "Sidebar", status: "Active", bg: "#1F2937", textColor: "#F9FAFB", accentColor: "#9CA3AF" },
  { id: 4, title: "Refer & Earn $20", subtitle: "Share your unique link and both earn a reward", ctaText: "Refer a Friend", placement: "Product Page", status: "Active", bg: "#166534", textColor: "#F0FDF4", accentColor: "#86EFAC" },
  { id: 5, title: "Black Friday Countdown", subtitle: "Biggest sale of the year — 5 days to go!", ctaText: "Get Notified", placement: "Homepage Banner", status: "Inactive", bg: "#111827", textColor: "#FBBF24", accentColor: "#EF4444" },
  { id: 6, title: "The Knitwear Edit", subtitle: "Cosy styles for cooler days", ctaText: "Shop Knitwear", placement: "Homepage Banner", status: "Inactive", bg: "#4C1D95", textColor: "#EDE9FE", accentColor: "#C4B5FD" },
]

export default function PromoBannersPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Promotional Banners"
        description="Manage promotional banner images and placements"
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Content" }, { label: "Promo Banners" }]}
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {banners.map((banner) => (
          <div
            key={banner.id}
            className="rounded-xl overflow-hidden border border-border/50 hover:shadow-md transition-shadow"
            style={{ opacity: banner.status === "Inactive" ? 0.65 : 1 }}
          >
            {/* Banner visual preview */}
            <div
              className="relative h-32 flex flex-col justify-center px-5 overflow-hidden"
              style={{ backgroundColor: banner.bg }}
            >
              {/* Decorative circle */}
              <div
                className="absolute -right-8 -top-8 w-32 h-32 rounded-full opacity-10"
                style={{ backgroundColor: banner.accentColor }}
              />
              <div
                className="absolute -right-4 bottom-0 w-20 h-20 rounded-full opacity-10"
                style={{ backgroundColor: banner.accentColor }}
              />

              <div className="relative z-10">
                <p className="font-bold" style={{ color: banner.textColor, fontSize: "16px" }}>{banner.title}</p>
                <p style={{ color: banner.textColor, fontSize: "11px", opacity: 0.75, marginTop: "2px" }}>{banner.subtitle}</p>
                <div className="mt-2.5 inline-flex items-center px-3 py-1 rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.2)" }}>
                  <span style={{ color: banner.textColor, fontSize: "10px", fontWeight: 600 }}>{banner.ctaText} →</span>
                </div>
              </div>

              <div
                className="absolute top-2 right-2 rounded-full px-2 py-0.5 font-medium"
                style={{
                  fontSize: "9px",
                  backgroundColor: banner.status === "Active" ? "rgba(34,197,94,0.25)" : "rgba(255,255,255,0.15)",
                  color: banner.status === "Active" ? "#86EFAC" : "rgba(255,255,255,0.5)"
                }}
              >
                {banner.status}
              </div>
            </div>

            {/* Banner meta + actions */}
            <div className="bg-white p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground" style={{ fontSize: "12px" }}>{banner.title}</p>
                  <span
                    className="inline-flex items-center rounded-full px-2 py-0.5 mt-1"
                    style={{ fontSize: "10px", backgroundColor: "#F3F4F6", color: "#6B7280" }}
                  >
                    {banner.placement}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <button className="p-1.5 rounded-lg hover:bg-[#F0EDEF] transition-colors text-muted-foreground hover:text-foreground">
                    <Pencil className="w-3.5 h-3.5" strokeWidth={1.5} />
                  </button>
                  <button className="p-1.5 rounded-lg hover:bg-red-50 transition-colors text-muted-foreground hover:text-red-600">
                    <Trash2 className="w-3.5 h-3.5" strokeWidth={1.5} />
                  </button>
                  <button
                    className="relative inline-flex items-center rounded-full ml-1"
                    style={{ width: "32px", height: "18px", backgroundColor: banner.status === "Active" ? "#501D2A" : "#D1D5DB" }}
                  >
                    <span
                      className="inline-block w-3.5 h-3.5 rounded-full bg-white shadow-sm"
                      style={{ transform: banner.status === "Active" ? "translateX(16px)" : "translateX(1px)" }}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Add new */}
        <button className="rounded-xl border border-dashed border-border hover:border-primary/40 hover:bg-[#FAF0F2] transition-colors flex flex-col items-center justify-center gap-3 min-h-[180px] group">
          <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: "#FAF0F2" }}>
            <Plus className="w-4 h-4" style={{ color: "#501D2A" }} strokeWidth={1.5} />
          </div>
          <p className="text-muted-foreground group-hover:text-foreground transition-colors font-medium" style={{ fontSize: "12px" }}>Add Banner</p>
        </button>
      </div>
    </div>
  )
}
