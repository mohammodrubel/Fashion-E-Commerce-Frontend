import { PageHeader } from "@/components/admin/page-header"
import { Star, CheckCircle, XCircle, Flag, MoreHorizontal, Search } from "lucide-react"

interface Review {
  id: string
  customer: string
  avatar: string
  product: string
  rating: number
  review: string
  date: string
  status: "Published" | "Pending" | "Flagged"
  helpful: number
}

const reviews: Review[] = []

const statusConfig = {
  Published: { className: "bg-emerald-50 text-emerald-700", icon: CheckCircle },
  Pending: { className: "bg-amber-50 text-amber-700", icon: MoreHorizontal },
  Flagged: { className: "bg-red-50 text-red-700", icon: Flag },
}

const ratingDist = [
  { stars: 5, count: 0, pct: 0 },
  { stars: 4, count: 0, pct: 0 },
  { stars: 3, count: 0, pct: 0 },
  { stars: 2, count: 0, pct: 0 },
  { stars: 1, count: 0, pct: 0 },
]

function StarRating({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          style={{ width: size, height: size, color: s <= rating ? "#F59E0B" : "#E5E7EB" }}
          fill={s <= rating ? "#F59E0B" : "none"}
          strokeWidth={1.5}
        />
      ))}
    </div>
  )
}

export default function ReviewsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Reviews & Ratings"
        description="Monitor and manage customer product reviews"
        breadcrumbs={[
          { label: "Admin", href: "/admin" },
          { label: "Products", href: "/admin/products" },
          { label: "Reviews" },
        ]}
      />

      {/* Rating Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Overall Rating */}
        <div className="bg-white rounded-xl border border-border/50 p-6 flex flex-col items-center justify-center text-center">
          <p className="text-muted-foreground mb-2" style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.07em" }}>Overall Rating</p>
          <div className="font-bold text-foreground" style={{ fontSize: "56px", lineHeight: 1 }}>4.2</div>
          <p className="text-muted-foreground" style={{ fontSize: "12px" }}>out of 5</p>
          <div className="my-3">
            <StarRating rating={4} size={18} />
          </div>
          <p className="text-muted-foreground" style={{ fontSize: "12px" }}>Based on 208 reviews</p>
        </div>

        {/* Rating Distribution */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-border/50 p-6">
          <h2 className="font-semibold text-foreground mb-4" style={{ fontSize: "14px" }}>Rating Distribution</h2>
          <div className="space-y-2.5">
            {ratingDist.map((d) => (
              <div key={d.stars} className="flex items-center gap-3">
                <div className="flex items-center gap-1 shrink-0 w-20">
                  <span className="text-muted-foreground" style={{ fontSize: "12px" }}>{d.stars} stars</span>
                </div>
                <div className="flex-1 rounded-full h-2.5" style={{ backgroundColor: "var(--accent)" }}>
                  <div
                    className="h-2.5 rounded-full transition-all"
                    style={{ width: `${d.pct}%`, backgroundColor: d.stars >= 4 ? "var(--primary)" : d.stars === 3 ? "#F59E0B" : "#EF4444" }}
                  />
                </div>
                <div className="flex items-center gap-2 shrink-0 w-16 text-right">
                  <span className="text-foreground font-medium" style={{ fontSize: "12px" }}>{d.count}</span>
                  <span className="text-muted-foreground" style={{ fontSize: "11px" }}>({d.pct}%)</span>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-4 mt-5 pt-4" style={{ borderTop: "1px solid var(--accent)" }}>
            <div className="text-center">
              <p className="font-semibold text-foreground" style={{ fontSize: "20px" }}>170</p>
              <p className="text-muted-foreground" style={{ fontSize: "11px" }}>Published</p>
            </div>
            <div className="text-center">
              <p className="font-semibold text-amber-600" style={{ fontSize: "20px" }}>28</p>
              <p className="text-muted-foreground" style={{ fontSize: "11px" }}>Pending</p>
            </div>
            <div className="text-center">
              <p className="font-semibold text-red-600" style={{ fontSize: "20px" }}>10</p>
              <p className="text-muted-foreground" style={{ fontSize: "11px" }}>Flagged</p>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Table */}
      <div className="bg-white rounded-xl border border-border/50">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 px-5 py-4" style={{ borderBottom: "1px solid var(--accent)" }}>
          <h2 className="font-semibold text-foreground" style={{ fontSize: "14px" }}>Recent Reviews</h2>
          <div className="relative ml-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
            <input
              type="text"
              placeholder="Search reviews..."
              className="pl-9 pr-4 py-2 rounded-lg border border-border/60 bg-[var(--muted)] text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/40"
              style={{ fontSize: "13px", width: "220px" }}
            />
          </div>
        </div>

        <div className="divide-y" style={{ borderColor: "var(--accent)" }}>
          {reviews.map((review) => {
            const statusCfg = statusConfig[review.status]
            return (
              <div key={review.id} className="px-5 py-4 hover:bg-[var(--muted)] transition-colors">
                <div className="flex items-start gap-4">
                  {/* Avatar */}
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-white font-semibold shrink-0"
                    style={{ backgroundColor: "var(--primary)", fontSize: "12px" }}
                  >
                    {review.avatar}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-1">
                      <div>
                        <span className="font-medium text-foreground" style={{ fontSize: "13px" }}>{review.customer}</span>
                        <span className="text-muted-foreground mx-2" style={{ fontSize: "11px" }}>on</span>
                        <span className="text-foreground" style={{ fontSize: "13px" }}>{review.product}</span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 font-medium ${statusCfg.className}`}
                          style={{ fontSize: "11px" }}
                        >
                          {review.status}
                        </span>
                        <span className="text-muted-foreground" style={{ fontSize: "11px" }}>{review.date}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                      <StarRating rating={review.rating} size={13} />
                      <span className="font-medium text-foreground" style={{ fontSize: "12px" }}>{review.rating}.0</span>
                    </div>

                    <p className="text-muted-foreground leading-relaxed" style={{ fontSize: "13px" }}>{review.review}</p>

                    <div className="flex items-center gap-3 mt-3">
                      <span className="text-muted-foreground" style={{ fontSize: "11px" }}>{review.helpful} people found this helpful</span>
                      <div className="flex items-center gap-1.5 ml-auto">
                        <button className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg hover:bg-emerald-50 transition-colors text-muted-foreground hover:text-emerald-700" style={{ fontSize: "12px" }}>
                          <CheckCircle className="w-3.5 h-3.5" strokeWidth={1.5} /> Approve
                        </button>
                        <button className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg hover:bg-red-50 transition-colors text-muted-foreground hover:text-red-600" style={{ fontSize: "12px" }}>
                          <XCircle className="w-3.5 h-3.5" strokeWidth={1.5} /> Reject
                        </button>
                        <button className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg hover:bg-amber-50 transition-colors text-muted-foreground hover:text-amber-700" style={{ fontSize: "12px" }}>
                          <Flag className="w-3.5 h-3.5" strokeWidth={1.5} /> Flag
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
