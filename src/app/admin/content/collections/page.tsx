import { PageHeader } from "@/components/admin/page-header"
import { Plus, Pencil, Trash2, Eye } from "lucide-react"

interface Collection {
  name: string
  slug: string
  description: string
  productCount: number
  status: "Active" | "Hidden" | "Scheduled"
  colorBg: string
  featured: boolean
  lastUpdated: string
}

const collections: Collection[] = [
  { name: "Autumn 2024", slug: "autumn-2024", description: "Warm tones and rich textures for the season ahead", productCount: 48, status: "Active", colorBg: "#501D2A", featured: true, lastUpdated: "Oct 15, 2024" },
  { name: "The Velvet Edit", slug: "velvet", description: "Sumptuous velvet pieces for elevated everyday dressing", productCount: 24, status: "Active", colorBg: "#4C1D95", featured: true, lastUpdated: "Oct 10, 2024" },
  { name: "New Arrivals", slug: "new-in", description: "Fresh stock added weekly — shop the latest first", productCount: 32, status: "Active", colorBg: "#7C3D52", featured: false, lastUpdated: "Oct 24, 2024" },
  { name: "Best Sellers", slug: "best-sellers", description: "Customer favourites — trending this month", productCount: 20, status: "Active", colorBg: "#1D4ED8", featured: false, lastUpdated: "Oct 22, 2024" },
  { name: "Winter Preview", slug: "winter-2024", description: "Early access to our upcoming winter collection", productCount: 16, status: "Scheduled", colorBg: "#1F2937", featured: false, lastUpdated: "Oct 20, 2024" },
  { name: "Sale", slug: "sale", description: "Discounted items — up to 50% off selected styles", productCount: 84, status: "Active", colorBg: "#166534", featured: false, lastUpdated: "Oct 18, 2024" },
]

const statusConfig = {
  Active: { bg: "#DCFCE7", color: "#166534" },
  Hidden: { bg: "#F3F4F6", color: "#6B7280" },
  Scheduled: { bg: "#FEF9C3", color: "#854D0E" },
}

export default function CollectionsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Collection Pages"
        description="Manage curated product collections and landing pages"
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Content" }, { label: "Collections" }]}
        actions={
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-white hover:opacity-90 transition-opacity"
            style={{ backgroundColor: "#501D2A", fontSize: "13px" }}
          >
            <Plus className="w-4 h-4" strokeWidth={1.5} />
            New Collection
          </button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {collections.map((col) => {
          const cfg = statusConfig[col.status]
          return (
            <div key={col.slug} className="bg-white rounded-xl border border-border/50 overflow-hidden hover:shadow-md transition-shadow group">
              {/* Image placeholder */}
              <div
                className="h-32 flex flex-col items-center justify-center relative"
                style={{ background: `linear-gradient(135deg, ${col.colorBg} 0%, ${col.colorBg}CC 100%)` }}
              >
                <p className="text-white font-bold text-center px-4" style={{ fontSize: "17px" }}>{col.name}</p>
                <p className="text-white/70 mt-1" style={{ fontSize: "11px" }}>{col.productCount} products</p>
                {col.featured && (
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.2)", fontSize: "9px", color: "white" }}>
                    ★ Featured
                  </div>
                )}
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground" style={{ fontSize: "14px" }}>{col.name}</p>
                    <p className="text-muted-foreground font-mono mt-0.5" style={{ fontSize: "11px" }}>/{col.slug}</p>
                  </div>
                  <span
                    className="inline-flex items-center rounded-full px-2 py-0.5 font-medium shrink-0 ml-2"
                    style={{ fontSize: "10px", backgroundColor: cfg.bg, color: cfg.color }}
                  >
                    {col.status}
                  </span>
                </div>
                <p className="text-muted-foreground mb-3 line-clamp-2" style={{ fontSize: "12px" }}>{col.description}</p>

                <div className="flex items-center justify-between pt-3" style={{ borderTop: "1px solid #F0EDEF" }}>
                  <span className="text-muted-foreground" style={{ fontSize: "11px" }}>Updated {col.lastUpdated}</span>
                  <div className="flex items-center gap-1">
                    <button className="p-1.5 rounded-lg hover:bg-[#F0EDEF] transition-colors text-muted-foreground hover:text-foreground">
                      <Eye className="w-3.5 h-3.5" strokeWidth={1.5} />
                    </button>
                    <button className="p-1.5 rounded-lg hover:bg-[#F0EDEF] transition-colors text-muted-foreground hover:text-foreground">
                      <Pencil className="w-3.5 h-3.5" strokeWidth={1.5} />
                    </button>
                    <button className="p-1.5 rounded-lg hover:bg-red-50 transition-colors text-muted-foreground hover:text-red-600">
                      <Trash2 className="w-3.5 h-3.5" strokeWidth={1.5} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )
        })}

        {/* Add collection card */}
        <button className="rounded-xl border border-dashed border-border hover:border-primary/40 hover:bg-[#FAF0F2] transition-colors flex flex-col items-center justify-center gap-3 min-h-[260px] group">
          <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: "#FAF0F2" }}>
            <Plus className="w-5 h-5" style={{ color: "#501D2A" }} strokeWidth={1.5} />
          </div>
          <p className="font-medium text-muted-foreground group-hover:text-foreground transition-colors" style={{ fontSize: "13px" }}>New Collection</p>
        </button>
      </div>
    </div>
  )
}
