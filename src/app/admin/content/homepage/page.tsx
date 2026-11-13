import { PageHeader } from "@/components/admin/page-header"
import { Eye, GripVertical, Pencil, EyeOff, Plus } from "lucide-react"

interface Section {
  id: string
  name: string
  description: string
  visible: boolean
  type: string
  lastUpdated: string
}

const sections: Section[] = []

const typeColors: Record<string, { bg: string; color: string }> = {
  Banner: { bg: "#FAF0F2", color: "var(--primary)" },
  Grid: { bg: "#EFF6FF", color: "#1D4ED8" },
  "Product Carousel": { bg: "#F0FDF4", color: "#166534" },
  Form: { bg: "#FDF4FF", color: "#7E22CE" },
}

export default function HomepageBuilderPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Homepage Builder"
        description="Arrange and configure homepage sections"
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Content" }, { label: "Homepage" }]}
        actions={
          <div className="flex items-center gap-2">
            <a
              href="/"
              target="_blank"
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border/60 bg-white text-muted-foreground hover:text-foreground hover:bg-[var(--muted)] transition-colors"
              style={{ fontSize: "13px" }}
            >
              <Eye className="w-4 h-4" strokeWidth={1.5} />
              Preview
            </a>
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-white hover:opacity-90 transition-opacity"
              style={{ backgroundColor: "var(--primary)", fontSize: "13px" }}
            >
              Publish Changes
            </button>
          </div>
        }
      />

      {/* Page visual preview */}
      <div className="bg-white rounded-xl border border-border/50 p-5 overflow-hidden">
        <p className="font-medium text-foreground mb-4" style={{ fontSize: "14px" }}>Homepage Preview</p>
        <div className="rounded-xl overflow-hidden border border-border/50" style={{ maxWidth: "400px" }}>
          {/* Mini browser chrome */}
          <div className="flex items-center gap-1.5 px-3 py-2" style={{ backgroundColor: "#F3F4F6" }}>
            <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
            <div className="flex-1 ml-2 px-2 py-0.5 rounded-md bg-white" style={{ fontSize: "10px", color: "#6B7280" }}>velour.co</div>
          </div>
          {/* Page sections visual */}
          <div className="space-y-0.5 p-1" style={{ backgroundColor: "var(--muted)" }}>
            <div className="h-14 rounded flex items-center justify-center text-white font-medium" style={{ backgroundColor: "var(--primary)", fontSize: "10px" }}>Hero Banner</div>
            <div className="grid grid-cols-4 gap-0.5">
              {["Dress", "Top", "Jean", "More"].map((c) => (
                <div key={c} className="h-8 rounded flex items-center justify-center" style={{ backgroundColor: "#7C3D52", fontSize: "9px", color: "white" }}>{c}</div>
              ))}
            </div>
            <div className="h-10 rounded flex items-center justify-center" style={{ backgroundColor: "#9D5B6B", fontSize: "10px", color: "white" }}>New Arrivals</div>
            <div className="h-10 rounded flex items-center justify-center" style={{ backgroundColor: "#C4849A", fontSize: "10px", color: "white" }}>Best Sellers</div>
            <div className="h-6 rounded flex items-center justify-center" style={{ backgroundColor: "#1F2937", fontSize: "9px", color: "white" }}>Promo Banner</div>
            <div className="h-8 rounded flex items-center justify-center" style={{ backgroundColor: "#E5E7EB", fontSize: "9px", color: "#6B7280" }}>Newsletter</div>
          </div>
        </div>
      </div>

      {/* Sections list */}
      <div className="bg-white rounded-xl border border-border/50">
        <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid var(--accent)" }}>
          <div>
            <p className="font-medium text-foreground" style={{ fontSize: "14px" }}>Page Sections</p>
            <p className="text-muted-foreground" style={{ fontSize: "12px" }}>Drag handles to reorder sections</p>
          </div>
          <button
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-dashed border-border text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
            style={{ fontSize: "12px" }}
          >
            <Plus className="w-3.5 h-3.5" strokeWidth={1.5} />
            Add Section
          </button>
        </div>

        <div className="divide-y divide-[var(--accent)]">
          {sections.map((section, i) => {
            const typeCfg = typeColors[section.type] ?? { bg: "#F3F4F6", color: "#6B7280" }
            return (
              <div key={section.id} className="flex items-center gap-4 px-5 py-3.5 hover:bg-[var(--muted)] transition-colors group">
                {/* Drag handle */}
                <div className="flex flex-col items-center cursor-grab text-muted-foreground opacity-40 group-hover:opacity-100 transition-opacity">
                  <GripVertical className="w-4 h-4" strokeWidth={1.5} />
                </div>

                {/* Order number */}
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-white font-semibold shrink-0"
                  style={{ backgroundColor: "var(--primary)", fontSize: "11px" }}
                >
                  {i + 1}
                </div>

                {/* Section info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-foreground" style={{ fontSize: "13px" }}>{section.name}</p>
                    <span
                      className="inline-flex items-center rounded-full px-2 py-0.5 font-medium"
                      style={{ fontSize: "10px", backgroundColor: typeCfg.bg, color: typeCfg.color }}
                    >
                      {section.type}
                    </span>
                    {!section.visible && (
                      <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-medium" style={{ fontSize: "10px", backgroundColor: "#F3F4F6", color: "#6B7280" }}>
                        <EyeOff className="w-3 h-3" strokeWidth={1.5} /> Hidden
                      </span>
                    )}
                  </div>
                  <p className="text-muted-foreground" style={{ fontSize: "12px" }}>{section.description}</p>
                </div>

                {/* Last updated */}
                <p className="text-muted-foreground hidden sm:block shrink-0" style={{ fontSize: "11px" }}>Updated {section.lastUpdated}</p>

                {/* Actions */}
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-border/60 text-muted-foreground hover:text-foreground hover:bg-white transition-colors"
                    style={{ fontSize: "11px" }}
                  >
                    <Pencil className="w-3 h-3" strokeWidth={1.5} />
                    Edit
                  </button>
                  <button
                    className="p-1.5 rounded-lg border border-border/60 text-muted-foreground hover:text-foreground hover:bg-white transition-colors"
                  >
                    <EyeOff className="w-3.5 h-3.5" strokeWidth={1.5} />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
