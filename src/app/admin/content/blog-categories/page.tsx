import { PageHeader } from "@/components/admin/page-header"
import { Plus, Pencil, Trash2 } from "lucide-react"

interface BlogCategory {
  name: string
  slug: string
  description: string
  postsCount: number
  status: "Active" | "Inactive"
  color: string
}

const categories: BlogCategory[] = [
  { name: "Style Tips", slug: "style-tips", description: "Outfit ideas, styling advice, and everyday fashion guidance", postsCount: 18, status: "Active", color: "var(--primary)" },
  { name: "Trends", slug: "trends", description: "What's hot right now — seasonal and runway-inspired looks", postsCount: 14, status: "Active", color: "#7C3D52" },
  { name: "Behind The Brand", slug: "behind-the-brand", description: "Our story, team highlights, and brand values", postsCount: 6, status: "Active", color: "#166534" },
  { name: "Sustainability", slug: "sustainability", description: "Our commitment to ethical fashion and the environment", postsCount: 8, status: "Active", color: "#065F46" },
  { name: "How To", slug: "how-to", description: "Practical guides — care, repair, and wardrobe organisation", postsCount: 10, status: "Active", color: "#1D4ED8" },
]

export default function BlogCategoriesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Blog Categories"
        description="Organise blog posts into categories"
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Content" }, { label: "Blog Categories" }]}
        actions={
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-white hover:opacity-90 transition-opacity"
            style={{ backgroundColor: "var(--primary)", fontSize: "13px" }}
          >
            <Plus className="w-4 h-4" strokeWidth={1.5} />
            Add Category
          </button>
        }
      />

      {/* Quick stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Categories", value: "5" },
          { label: "Total Posts", value: "56" },
          { label: "Avg Posts / Category", value: "11.2" },
          { label: "Most Popular", value: "Style Tips" },
        ].map((c) => (
          <div key={c.label} className="bg-white rounded-xl border border-border/50 p-4">
            <p className="text-muted-foreground" style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.07em" }}>{c.label}</p>
            <p className="font-semibold text-foreground mt-1" style={{ fontSize: "18px" }}>{c.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-border/50">
        <div className="px-5 py-4" style={{ borderBottom: "1px solid var(--accent)" }}>
          <p className="font-medium text-foreground" style={{ fontSize: "14px" }}>Categories</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--accent)" }}>
                {["Name", "Slug", "Description", "Posts", "Status", "Actions"].map((h) => (
                  <th
                    key={h}
                    className="text-left px-5 py-3 text-muted-foreground font-medium"
                    style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.07em" }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {categories.map((cat, i) => (
                <tr
                  key={cat.slug}
                  className="hover:bg-[var(--muted)] transition-colors"
                  style={{ borderBottom: i < categories.length - 1 ? "1px solid var(--accent)" : "none" }}
                >
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-semibold shrink-0"
                        style={{ backgroundColor: cat.color, fontSize: "11px" }}
                      >
                        {cat.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                      </div>
                      <span className="font-medium text-foreground" style={{ fontSize: "13px" }}>{cat.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-muted-foreground font-mono" style={{ fontSize: "12px" }}>{cat.slug}</span>
                  </td>
                  <td className="px-5 py-3.5 max-w-xs">
                    <span className="text-muted-foreground line-clamp-1" style={{ fontSize: "12px" }}>{cat.description}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-foreground" style={{ fontSize: "15px" }}>{cat.postsCount}</span>
                      <div className="h-2 rounded-full w-16 overflow-hidden" style={{ backgroundColor: "var(--accent)" }}>
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${(cat.postsCount / 20) * 100}%`, backgroundColor: cat.color }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <span
                      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 font-medium"
                      style={{
                        fontSize: "11px",
                        backgroundColor: cat.status === "Active" ? "#DCFCE7" : "#F3F4F6",
                        color: cat.status === "Active" ? "#166534" : "#6B7280"
                      }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: cat.status === "Active" ? "#22C55E" : "#9CA3AF" }} />
                      {cat.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1">
                      <button className="p-1.5 rounded-lg hover:bg-[var(--accent)] transition-colors text-muted-foreground hover:text-foreground">
                        <Pencil className="w-3.5 h-3.5" strokeWidth={1.5} />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-red-50 transition-colors text-muted-foreground hover:text-red-600">
                        <Trash2 className="w-3.5 h-3.5" strokeWidth={1.5} />
                      </button>
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
