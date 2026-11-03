import { PageHeader } from "@/components/admin/page-header"
import { Star, CheckCircle, XCircle, Trash2, Search, SlidersHorizontal, MessageSquare } from "lucide-react"

interface Review {
  id: string
  customer: string
  initials: string
  product: string
  rating: number
  excerpt: string
  date: string
  status: "Approved" | "Pending" | "Rejected"
}

const reviews: Review[] = [
  { id: "R001", customer: "Sarah Johnson", initials: "SJ", product: "Floral Wrap Midi Dress", rating: 5, excerpt: "Absolutely love this dress! The fabric is so soft and the fit is perfect. I've received so many compliments...", date: "Oct 20, 2026", status: "Approved" },
  { id: "R002", customer: "Michael Chen", initials: "MC", product: "Oversized Linen Blazer", rating: 4, excerpt: "Great quality blazer. The linen is lightweight and breathable. Runs slightly large so size down...", date: "Oct 19, 2026", status: "Pending" },
  { id: "R003", customer: "Emma Wilson", initials: "EW", product: "Silk Cami Blouse", rating: 5, excerpt: "This is my third purchase of this top in different colors. The silk quality is exceptional for the price...", date: "Oct 17, 2026", status: "Approved" },
  { id: "R004", customer: "James Brown", initials: "JB", product: "High-Rise Skinny Jeans", rating: 2, excerpt: "Disappointed with the quality. The stitching started coming undone after just two washes...", date: "Oct 15, 2026", status: "Pending" },
  { id: "R005", customer: "Olivia Davis", initials: "OD", product: "Classic Trench Coat", rating: 5, excerpt: "A timeless investment piece. Impeccable tailoring, perfect length, and the belt really completes the look...", date: "Oct 12, 2026", status: "Approved" },
  { id: "R006", customer: "Liam Martinez", initials: "LM", product: "Wide Leg Linen Trousers", rating: 1, excerpt: "The color looked completely different from the photos. Not at all what I expected. Very misleading...", date: "Oct 10, 2026", status: "Rejected" },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className="w-3.5 h-3.5"
          style={{ color: s <= rating ? "#D97706" : "#E5E7EB" }}
          strokeWidth={1.5}
          fill={s <= rating ? "currentColor" : "none"}
        />
      ))}
    </div>
  )
}

const statusConfig = {
  Approved: "bg-emerald-50 text-emerald-700",
  Pending: "bg-amber-50 text-amber-700",
  Rejected: "bg-red-50 text-red-600",
}

export default function CustomerReviewsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Customer Reviews"
        description="Moderate and manage product reviews submitted by customers"
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Customers", href: "/admin/customers" }, { label: "Reviews" }]}
      />

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Reviews", value: "1,084", sub: "all time" },
          { label: "Avg Rating", value: "4.3 ★", sub: "store average" },
          { label: "Pending", value: "14", sub: "need review" },
          { label: "Approved", value: "1,036", sub: "published" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-border/50 p-4">
            <p className="text-muted-foreground" style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.07em" }}>{s.label}</p>
            <p className="font-semibold text-foreground mt-1" style={{ fontSize: "22px" }}>{s.value}</p>
            <p className="text-muted-foreground" style={{ fontSize: "11px" }}>{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-border/50">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 px-5 py-4" style={{ borderBottom: "1px solid var(--accent)" }}>
          <div className="relative flex-1 w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
            <input
              type="text"
              placeholder="Search reviews..."
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-border/60 bg-[var(--muted)] placeholder:text-muted-foreground focus:outline-none focus:border-primary/40"
              style={{ fontSize: "13px" }}
            />
          </div>
          <button className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border/60 bg-white hover:bg-[var(--muted)] transition-colors text-muted-foreground" style={{ fontSize: "13px" }}>
            <SlidersHorizontal className="w-3.5 h-3.5" strokeWidth={1.5} /> Filter
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--accent)" }}>
                {["Customer", "Product", "Rating", "Review", "Date", "Status", "Actions"].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-muted-foreground font-medium" style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.07em" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {reviews.map((r, i) => (
                <tr
                  key={r.id}
                  className="hover:bg-[var(--muted)] transition-colors"
                  style={{ borderBottom: i < reviews.length - 1 ? "1px solid var(--accent)" : "none" }}
                >
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full flex items-center justify-center text-white font-semibold shrink-0" style={{ backgroundColor: "var(--primary)", fontSize: "10px" }}>
                        {r.initials}
                      </div>
                      <span className="font-medium text-foreground" style={{ fontSize: "13px" }}>{r.customer}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <span className="text-foreground" style={{ fontSize: "13px" }}>{r.product}</span>
                  </td>
                  <td className="px-5 py-3">
                    <StarRating rating={r.rating} />
                  </td>
                  <td className="px-5 py-3 max-w-xs">
                    <div className="flex items-start gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5 text-muted-foreground shrink-0 mt-0.5" strokeWidth={1.5} />
                      <p className="text-muted-foreground line-clamp-2" style={{ fontSize: "12px" }}>{r.excerpt}</p>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-muted-foreground" style={{ fontSize: "13px" }}>{r.date}</td>
                  <td className="px-5 py-3">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 font-medium ${statusConfig[r.status]}`} style={{ fontSize: "11px" }}>
                      {r.status}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-1">
                      {r.status !== "Approved" && (
                        <button className="flex items-center gap-1 px-2 py-1 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors" style={{ fontSize: "11px" }}>
                          <CheckCircle className="w-3 h-3" strokeWidth={2} /> Approve
                        </button>
                      )}
                      {r.status !== "Rejected" && (
                        <button className="flex items-center gap-1 px-2 py-1 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors" style={{ fontSize: "11px" }}>
                          <XCircle className="w-3 h-3" strokeWidth={2} /> Reject
                        </button>
                      )}
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
