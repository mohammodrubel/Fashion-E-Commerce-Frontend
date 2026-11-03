import { PageHeader } from "@/components/admin/page-header"
import { Plus, Eye, Pencil, Trash2, ExternalLink, TrendingUp } from "lucide-react"

type LPStatus = "Published" | "Draft" | "Paused"

interface LandingPage {
  title: string
  url: string
  campaign: string
  conversions: number
  views: number
  convRate: string
  status: LPStatus
  lastUpdated: string
}

const pages: LandingPage[] = [
  { title: "Black Friday 2024", url: "/lp/black-friday-2024", campaign: "Black Friday Blitz", conversions: 0, views: 0, convRate: "—", status: "Draft", lastUpdated: "Oct 22, 2024" },
  { title: "Summer Sale Landing", url: "/lp/summer-sale", campaign: "Summer Glow Sale", conversions: 842, views: 12400, convRate: "6.8%", status: "Published", lastUpdated: "Jun 01, 2024" },
  { title: "New Customer Welcome", url: "/lp/welcome", campaign: "Welcome Series", conversions: 1240, views: 8920, convRate: "13.9%", status: "Published", lastUpdated: "Jan 01, 2024" },
  { title: "Autumn Collection Reveal", url: "/lp/autumn-2024", campaign: "Autumn 2024", conversions: 384, views: 4210, convRate: "9.1%", status: "Published", lastUpdated: "Sep 20, 2024" },
  { title: "Knitwear Edit", url: "/lp/knitwear", campaign: "Knitwear Launch", conversions: 0, views: 0, convRate: "—", status: "Paused", lastUpdated: "Oct 15, 2024" },
]

const statusConfig: Record<LPStatus, { bg: string; color: string }> = {
  Published: { bg: "#DCFCE7", color: "#166534" },
  Draft: { bg: "#F3F4F6", color: "#6B7280" },
  Paused: { bg: "#FEF9C3", color: "#854D0E" },
}

export default function LandingPagesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Landing Pages"
        description="Campaign-specific landing pages with conversion tracking"
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Content" }, { label: "Landing Pages" }]}
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

      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Pages", value: "5", sub: "3 published" },
          { label: "Total Views", value: "25,530", sub: "all landing pages" },
          { label: "Total Conversions", value: "2,466", sub: "across all pages" },
          { label: "Avg Conv. Rate", value: "9.6%", sub: "published pages" },
        ].map((c) => (
          <div key={c.label} className="bg-white rounded-xl border border-border/50 p-4">
            <p className="text-muted-foreground" style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.07em" }}>{c.label}</p>
            <p className="font-semibold text-foreground mt-1" style={{ fontSize: "22px" }}>{c.value}</p>
            <p className="text-muted-foreground" style={{ fontSize: "11px" }}>{c.sub}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-border/50">
        <div className="px-5 py-4" style={{ borderBottom: "1px solid var(--accent)" }}>
          <p className="font-medium text-foreground" style={{ fontSize: "14px" }}>All Landing Pages</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--accent)" }}>
                {["Title", "URL", "Campaign", "Views", "Conversions", "Conv. Rate", "Status", "Actions"].map((h) => (
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
              {pages.map((page, i) => {
                const cfg = statusConfig[page.status]
                return (
                  <tr
                    key={page.url}
                    className="hover:bg-[var(--muted)] transition-colors"
                    style={{ borderBottom: i < pages.length - 1 ? "1px solid var(--accent)" : "none" }}
                  >
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: "#FAF0F2" }}>
                          <TrendingUp className="w-3.5 h-3.5" style={{ color: "var(--primary)" }} strokeWidth={1.5} />
                        </div>
                        <p className="font-medium text-foreground" style={{ fontSize: "13px" }}>{page.title}</p>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-muted-foreground font-mono" style={{ fontSize: "11px" }}>{page.url}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-foreground" style={{ fontSize: "12px" }}>{page.campaign}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-foreground" style={{ fontSize: "13px" }}>{page.views > 0 ? page.views.toLocaleString() : "—"}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="font-medium text-foreground" style={{ fontSize: "13px" }}>{page.conversions > 0 ? page.conversions.toLocaleString() : "—"}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="font-semibold" style={{ fontSize: "13px", color: page.convRate !== "—" ? "#166534" : "#9CA3AF" }}>{page.convRate}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span
                        className="inline-flex items-center rounded-full px-2.5 py-0.5 font-medium"
                        style={{ fontSize: "11px", backgroundColor: cfg.bg, color: cfg.color }}
                      >
                        {page.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-1">
                        <a href={page.url} target="_blank" className="p-1.5 rounded-lg hover:bg-[var(--accent)] transition-colors text-muted-foreground hover:text-foreground">
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
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
