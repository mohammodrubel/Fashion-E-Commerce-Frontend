import { PageHeader } from "@/components/admin/page-header"
import { Plus, Pencil, Trash2, Eye, ExternalLink } from "lucide-react"

type PageStatus = "Published" | "Draft"

interface SitePage {
  title: string
  slug: string
  lastUpdated: string
  status: PageStatus
  author: string
  wordCount: number
}

const pages: SitePage[] = [
  { title: "About Us", slug: "/about", lastUpdated: "Oct 15, 2024", status: "Published", author: "Admin", wordCount: 842 },
  { title: "Contact Us", slug: "/contact", lastUpdated: "Sep 28, 2024", status: "Published", author: "Admin", wordCount: 310 },
  { title: "Privacy Policy", slug: "/privacy", lastUpdated: "Aug 01, 2024", status: "Published", author: "Legal", wordCount: 2840 },
  { title: "Terms of Service", slug: "/terms", lastUpdated: "Aug 01, 2024", status: "Published", author: "Legal", wordCount: 3200 },
  { title: "FAQ", slug: "/faq", lastUpdated: "Oct 20, 2024", status: "Published", author: "Support", wordCount: 1240 },
  { title: "Returns & Exchanges", slug: "/returns", lastUpdated: "Oct 10, 2024", status: "Published", author: "Support", wordCount: 680 },
  { title: "Shipping Information", slug: "/shipping", lastUpdated: "Oct 10, 2024", status: "Published", author: "Support", wordCount: 520 },
  { title: "Size Guide", slug: "/size-guide", lastUpdated: "Sep 05, 2024", status: "Published", author: "Merch", wordCount: 960 },
]

export default function WebsitePagesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Website Pages"
        description="Manage static pages on your storefront"
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Content" }, { label: "Pages" }]}
        actions={
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-white hover:opacity-90 transition-opacity"
            style={{ backgroundColor: "var(--primary)", fontSize: "13px" }}
          >
            <Plus className="w-4 h-4" strokeWidth={1.5} />
            Create Page
          </button>
        }
      />

      <div className="bg-white rounded-xl border border-border/50">
        <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid var(--accent)" }}>
          <div>
            <p className="font-medium text-foreground" style={{ fontSize: "14px" }}>All Pages</p>
            <p className="text-muted-foreground" style={{ fontSize: "12px" }}>{pages.length} pages total</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--accent)" }}>
                {["Page Title", "Slug", "Author", "Word Count", "Last Updated", "Status", "Actions"].map((h) => (
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
              {pages.map((page, i) => (
                <tr
                  key={page.slug}
                  className="hover:bg-[var(--muted)] transition-colors"
                  style={{ borderBottom: i < pages.length - 1 ? "1px solid var(--accent)" : "none" }}
                >
                  <td className="px-5 py-3.5">
                    <p className="font-medium text-foreground" style={{ fontSize: "13px" }}>{page.title}</p>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-muted-foreground font-mono" style={{ fontSize: "12px" }}>{page.slug}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-foreground" style={{ fontSize: "13px" }}>{page.author}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-muted-foreground" style={{ fontSize: "12px" }}>{page.wordCount.toLocaleString()} words</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-muted-foreground" style={{ fontSize: "12px" }}>{page.lastUpdated}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span
                      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 font-medium"
                      style={{
                        fontSize: "11px",
                        backgroundColor: page.status === "Published" ? "#DCFCE7" : "#FEF9C3",
                        color: page.status === "Published" ? "#166534" : "#854D0E"
                      }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: page.status === "Published" ? "#22C55E" : "#EAB308" }} />
                      {page.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1">
                      <a href={page.slug} target="_blank" className="p-1.5 rounded-lg hover:bg-[var(--accent)] transition-colors text-muted-foreground hover:text-foreground">
                        <ExternalLink className="w-3.5 h-3.5" strokeWidth={1.5} />
                      </a>
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
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
