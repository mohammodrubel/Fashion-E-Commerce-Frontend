import { PageHeader } from "@/components/admin/page-header"
import { Plus, Eye, Pencil, Trash2, Search, Filter } from "lucide-react"

type PostStatus = "Published" | "Draft" | "Scheduled"

interface BlogPost {
  title: string
  category: string
  author: string
  publishedDate: string
  views: number
  status: PostStatus
  colorBg: string
  initials: string
}

const posts: BlogPost[] = [
  { title: "10 Ways to Style a Wrap Dress This Autumn", category: "Style Tips", author: "Isabelle Moore", publishedDate: "Oct 20, 2024", views: 4820, status: "Published", colorBg: "var(--primary)", initials: "WD" },
  { title: "The Capsule Wardrobe Guide for 2024", category: "Trends", author: "Marcus Reid", publishedDate: "Oct 15, 2024", views: 7340, status: "Published", colorBg: "#7C3D52", initials: "CW" },
  { title: "Behind The Brand: Our Sustainability Journey", category: "Behind The Brand", author: "Lena Fischer", publishedDate: "Oct 10, 2024", views: 2180, status: "Published", colorBg: "#166534", initials: "BB" },
  { title: "How To Care For Silk & Delicate Fabrics", category: "How To", author: "Isabelle Moore", publishedDate: "Oct 05, 2024", views: 3960, status: "Published", colorBg: "#1D4ED8", initials: "CF" },
  { title: "Top Knitwear Trends: Winter 2024 Preview", category: "Trends", author: "Marcus Reid", publishedDate: "Oct 30, 2024", views: 0, status: "Scheduled", colorBg: "#9D5B6B", initials: "KN" },
  { title: "Our Favourite Autumn Colour Palettes", category: "Style Tips", author: "Isabelle Moore", publishedDate: "—", views: 0, status: "Draft", colorBg: "#6B7280", initials: "CP" },
]

const statusConfig: Record<PostStatus, { bg: string; color: string }> = {
  Published: { bg: "#DCFCE7", color: "#166534" },
  Draft: { bg: "#F3F4F6", color: "#6B7280" },
  Scheduled: { bg: "#FEF9C3", color: "#854D0E" },
}

const categories = ["All", "Style Tips", "Trends", "Behind The Brand", "Sustainability", "How To"]

export default function BlogPostsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Blog Posts"
        description="Create and manage editorial content"
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Content" }, { label: "Blog" }]}
        actions={
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-white hover:opacity-90 transition-opacity"
            style={{ backgroundColor: "var(--primary)", fontSize: "13px" }}
          >
            <Plus className="w-4 h-4" strokeWidth={1.5} />
            New Post
          </button>
        }
      />

      <div className="bg-white rounded-xl border border-border/50">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 px-5 py-4" style={{ borderBottom: "1px solid var(--accent)" }}>
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
            <input
              type="text"
              placeholder="Search posts..."
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-border/60 bg-[var(--muted)] placeholder:text-muted-foreground focus:outline-none focus:border-primary/40"
              style={{ fontSize: "13px" }}
            />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                className="px-3 py-1.5 rounded-full border transition-colors"
                style={{
                  fontSize: "12px",
                  backgroundColor: cat === "All" ? "var(--primary)" : "white",
                  color: cat === "All" ? "white" : "#6B7280",
                  borderColor: cat === "All" ? "var(--primary)" : "#E5E7EB"
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--accent)" }}>
                {["", "Title", "Category", "Author", "Published", "Views", "Status", "Actions"].map((h) => (
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
              {posts.map((post, i) => {
                const cfg = statusConfig[post.status]
                return (
                  <tr
                    key={i}
                    className="hover:bg-[var(--muted)] transition-colors"
                    style={{ borderBottom: i < posts.length - 1 ? "1px solid var(--accent)" : "none" }}
                  >
                    <td className="px-5 py-3.5">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-semibold shrink-0"
                        style={{ backgroundColor: post.colorBg, fontSize: "11px" }}
                      >
                        {post.initials}
                      </div>
                    </td>
                    <td className="px-5 py-3.5 max-w-xs">
                      <p className="font-medium text-foreground line-clamp-2" style={{ fontSize: "13px" }}>{post.title}</p>
                    </td>
                    <td className="px-5 py-3.5">
                      <span
                        className="inline-flex items-center rounded-full px-2 py-0.5 font-medium"
                        style={{ fontSize: "10px", backgroundColor: "#FAF0F2", color: "var(--primary)" }}
                      >
                        {post.category}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-foreground" style={{ fontSize: "13px" }}>{post.author}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-muted-foreground" style={{ fontSize: "12px" }}>{post.publishedDate}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-foreground" style={{ fontSize: "13px" }}>{post.views > 0 ? post.views.toLocaleString() : "—"}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span
                        className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 font-medium"
                        style={{ fontSize: "11px", backgroundColor: cfg.bg, color: cfg.color }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: cfg.color }} />
                        {post.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-1">
                        <button className="p-1.5 rounded-lg hover:bg-[var(--accent)] transition-colors text-muted-foreground hover:text-foreground">
                          <Eye className="w-3.5 h-3.5" strokeWidth={1.5} />
                        </button>
                        <button className="p-1.5 rounded-lg hover:bg-[var(--accent)] transition-colors text-muted-foreground hover:text-foreground">
                          <Pencil className="w-3.5 h-3.5" strokeWidth={1.5} />
                        </button>
                        <button className="p-1.5 rounded-lg hover:bg-red-50 transition-colors text-muted-foreground hover:text-red-600">
                          <Trash2 className="w-3.5 h-3.5" strokeWidth={1.5} />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <div className="px-5 py-4" style={{ borderTop: "1px solid var(--accent)" }}>
          <p className="text-muted-foreground" style={{ fontSize: "12px" }}>Showing 6 posts</p>
        </div>
      </div>
    </div>
  )
}
