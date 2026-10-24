import { PageHeader } from "@/components/admin/page-header"
import { Pencil, Search, TrendingUp } from "lucide-react"

type SEOScore = "Good" | "Average" | "Poor"

interface SEOEntry {
  page: string
  metaTitle: string
  metaDescription: string
  focusKeyword: string
  score: SEOScore
  issues: string[]
}

const seoEntries: SEOEntry[] = [
  {
    page: "Homepage",
    metaTitle: "Velour — Effortless Fashion for the Modern Wardrobe",
    metaDescription: "Shop women's clothing at Velour. New arrivals, seasonal collections, and timeless essentials. Free shipping over $50.",
    focusKeyword: "women's clothing online",
    score: "Good",
    issues: [],
  },
  {
    page: "Dresses",
    metaTitle: "Women's Dresses | Midi, Maxi & Wrap Styles — Velour",
    metaDescription: "Discover our edit of women's dresses — from wrap midis to elegant maxis. New styles added weekly. Shop at Velour.",
    focusKeyword: "women's dresses",
    score: "Good",
    issues: [],
  },
  {
    page: "About Us",
    metaTitle: "About Velour — Our Story & Values",
    metaDescription: "Learn about Velour's commitment to sustainable fashion, our founding story, and the values behind every piece we make.",
    focusKeyword: "sustainable fashion brand",
    score: "Good",
    issues: [],
  },
  {
    page: "Contact Us",
    metaTitle: "Contact Velour — Get in Touch",
    metaDescription: "Have a question? Reach our customer support team via email, live chat, or phone. We're here to help.",
    focusKeyword: "contact velour",
    score: "Average",
    issues: ["Meta description could be longer"],
  },
  {
    page: "FAQ",
    metaTitle: "Frequently Asked Questions — Velour",
    metaDescription: "Find answers to common questions about shipping, returns, sizing, and more at Velour.",
    focusKeyword: "fashion faq shipping returns",
    score: "Average",
    issues: ["Focus keyword not found in meta title"],
  },
  {
    page: "Autumn Collection",
    metaTitle: "Autumn 2024 Collection",
    metaDescription: "Shop the collection.",
    focusKeyword: "",
    score: "Poor",
    issues: ["Meta title too short", "Meta description too short", "No focus keyword set"],
  },
  {
    page: "Sale",
    metaTitle: "Sale — Up to 50% Off Women's Fashion | Velour",
    metaDescription: "Shop our sale section for discounts on dresses, tops, knitwear, and more. Up to 50% off selected styles.",
    focusKeyword: "women's fashion sale",
    score: "Good",
    issues: [],
  },
  {
    page: "Size Guide",
    metaTitle: "Size Guide — Find Your Perfect Fit | Velour",
    metaDescription: "Our detailed size guide covers all measurements for tops, dresses, trousers, and outerwear at Velour.",
    focusKeyword: "size guide women's clothing",
    score: "Good",
    issues: [],
  },
]

const scoreConfig: Record<SEOScore, { bg: string; color: string; dot: string; label: string }> = {
  Good: { bg: "#DCFCE7", color: "#166534", dot: "#22C55E", label: "Good" },
  Average: { bg: "#FEF9C3", color: "#854D0E", dot: "#EAB308", label: "Needs Work" },
  Poor: { bg: "#FEE2E2", color: "#991B1B", dot: "#EF4444", label: "Poor" },
}

const scoreCounts = {
  Good: seoEntries.filter((e) => e.score === "Good").length,
  Average: seoEntries.filter((e) => e.score === "Average").length,
  Poor: seoEntries.filter((e) => e.score === "Poor").length,
}

export default function SEOPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="SEO Metadata"
        description="Manage meta titles, descriptions, and focus keywords for all pages"
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Content" }, { label: "SEO" }]}
        actions={
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-white hover:opacity-90 transition-opacity"
            style={{ backgroundColor: "#501D2A", fontSize: "13px" }}
          >
            <TrendingUp className="w-4 h-4" strokeWidth={1.5} />
            Run SEO Audit
          </button>
        }
      />

      {/* Score Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "SEO Score", value: "74", sub: "out of 100", color: "#854D0E" },
          { label: "Good Pages", value: String(scoreCounts.Good), sub: `of ${seoEntries.length} pages`, color: "#166534" },
          { label: "Need Work", value: String(scoreCounts.Average), sub: "pages", color: "#854D0E" },
          { label: "Poor Pages", value: String(scoreCounts.Poor), sub: "need attention", color: "#991B1B" },
        ].map((c) => (
          <div key={c.label} className="bg-white rounded-xl border border-border/50 p-4">
            <p className="text-muted-foreground" style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.07em" }}>{c.label}</p>
            <p className="font-semibold mt-1" style={{ fontSize: "22px", color: c.color }}>{c.value}</p>
            <p className="text-muted-foreground" style={{ fontSize: "11px" }}>{c.sub}</p>
          </div>
        ))}
      </div>

      {/* SEO Table */}
      <div className="bg-white rounded-xl border border-border/50">
        <div className="flex items-center gap-3 px-5 py-4" style={{ borderBottom: "1px solid #F0EDEF" }}>
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
            <input
              type="text"
              placeholder="Search pages..."
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-border/60 bg-[#F8F7F5] placeholder:text-muted-foreground focus:outline-none focus:border-primary/40"
              style={{ fontSize: "13px" }}
            />
          </div>
          <select className="px-3 py-2 rounded-lg border border-border/60 bg-white text-muted-foreground focus:outline-none" style={{ fontSize: "13px" }}>
            <option>All Scores</option>
            <option>Good</option>
            <option>Average</option>
            <option>Poor</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid #F0EDEF" }}>
                {["Page", "Meta Title", "Meta Description", "Focus Keyword", "SEO Score", "Actions"].map((h) => (
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
              {seoEntries.map((entry, i) => {
                const cfg = scoreConfig[entry.score]
                const titleLen = entry.metaTitle.length
                const descLen = entry.metaDescription.length
                const isTitleOk = titleLen >= 30 && titleLen <= 60
                const isDescOk = descLen >= 120 && descLen <= 160
                return (
                  <tr
                    key={entry.page}
                    className="hover:bg-[#F8F7F5] transition-colors"
                    style={{ borderBottom: i < seoEntries.length - 1 ? "1px solid #F0EDEF" : "none" }}
                  >
                    <td className="px-5 py-3.5">
                      <p className="font-medium text-foreground" style={{ fontSize: "13px" }}>{entry.page}</p>
                    </td>
                    <td className="px-5 py-3.5 max-w-[220px]">
                      <p className="text-foreground truncate" style={{ fontSize: "12px" }}>{entry.metaTitle}</p>
                      <p style={{ fontSize: "10px", color: isTitleOk ? "#166534" : "#991B1B" }}>{titleLen} chars {isTitleOk ? "✓" : "(optimal: 30–60)"}</p>
                    </td>
                    <td className="px-5 py-3.5 max-w-[280px]">
                      <p className="text-muted-foreground line-clamp-2" style={{ fontSize: "11px" }}>{entry.metaDescription}</p>
                      <p style={{ fontSize: "10px", color: isDescOk ? "#166534" : "#991B1B" }}>{descLen} chars {isDescOk ? "✓" : "(optimal: 120–160)"}</p>
                    </td>
                    <td className="px-5 py-3.5">
                      {entry.focusKeyword ? (
                        <span className="inline-flex items-center rounded-full px-2 py-0.5 font-medium" style={{ fontSize: "10px", backgroundColor: "#F3F4F6", color: "#374151" }}>
                          {entry.focusKeyword}
                        </span>
                      ) : (
                        <span className="text-muted-foreground italic" style={{ fontSize: "11px" }}>Not set</span>
                      )}
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: cfg.dot }} />
                          <span className="font-medium" style={{ fontSize: "12px", color: cfg.color }}>{cfg.label}</span>
                        </div>
                        {entry.issues.length > 0 && (
                          <div className="space-y-0.5">
                            {entry.issues.map((issue) => (
                              <p key={issue} className="text-muted-foreground" style={{ fontSize: "10px" }}>· {issue}</p>
                            ))}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <button className="p-1.5 rounded-lg hover:bg-[#F0EDEF] transition-colors text-muted-foreground hover:text-foreground">
                        <Pencil className="w-3.5 h-3.5" strokeWidth={1.5} />
                      </button>
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
