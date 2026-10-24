import { PageHeader } from "@/components/admin/page-header"
import { Plus, Star, Pencil, Trash2, Eye } from "lucide-react"

type TestimonialStatus = "Published" | "Pending" | "Rejected"

interface Testimonial {
  customer: string
  rating: number
  quote: string
  product: string
  date: string
  status: TestimonialStatus
  avatarColor: string
}

const testimonials: Testimonial[] = [
  { customer: "Olivia H.", rating: 5, quote: "Absolutely love my Floral Wrap Dress — the quality is exceptional and the colour is even better in person. Received so many compliments!", product: "Floral Wrap Midi Dress", date: "Oct 18, 2024", status: "Published", avatarColor: "#501D2A" },
  { customer: "Priya N.", rating: 5, quote: "Fast shipping, beautiful packaging, and the silk blouse is stunning. Will definitely be back for more.", product: "Silk Cami Blouse", date: "Oct 15, 2024", status: "Published", avatarColor: "#7C3D52" },
  { customer: "Sophie L.", rating: 4, quote: "Great quality knitwear. Fits true to size and super soft. Only giving 4 stars because the sleeve was slightly longer than expected.", product: "Ribbed Knit Sweater", date: "Oct 12, 2024", status: "Published", avatarColor: "#1D4ED8" },
  { customer: "Aisha K.", rating: 5, quote: "The trench coat is worth every penny. Looks incredibly chic, great cut, and the lining feels luxurious. Love it.", product: "Classic Trench Coat", date: "Oct 10, 2024", status: "Published", avatarColor: "#166534" },
  { customer: "Emma J.", rating: 3, quote: "The dress is beautiful but took 2 weeks to arrive. Customer service was helpful when I reached out. Would order again.", product: "Floral Wrap Midi Dress", date: "Oct 08, 2024", status: "Pending", avatarColor: "#9A3412" },
  { customer: "Marcus T.", rating: 5, quote: "Bought the linen blazer for my wife and she's obsessed — already wore it 3 times this week!", product: "Oversized Linen Blazer", date: "Oct 05, 2024", status: "Published", avatarColor: "#1F2937" },
]

const statusConfig: Record<TestimonialStatus, { bg: string; color: string }> = {
  Published: { bg: "#DCFCE7", color: "#166534" },
  Pending: { bg: "#FEF9C3", color: "#854D0E" },
  Rejected: { bg: "#FEE2E2", color: "#991B1B" },
}

export default function TestimonialsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Testimonials"
        description="Manage customer reviews and testimonials displayed on the storefront"
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Content" }, { label: "Testimonials" }]}
        actions={
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-white hover:opacity-90 transition-opacity"
            style={{ backgroundColor: "#501D2A", fontSize: "13px" }}
          >
            <Plus className="w-4 h-4" strokeWidth={1.5} />
            Add Testimonial
          </button>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Reviews", value: "248", sub: "all time" },
          { label: "Published", value: "204", sub: "showing on site" },
          { label: "Pending Review", value: "32", sub: "awaiting approval" },
          { label: "Avg Rating", value: "4.7", sub: "out of 5 stars" },
        ].map((c) => (
          <div key={c.label} className="bg-white rounded-xl border border-border/50 p-4">
            <p className="text-muted-foreground" style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.07em" }}>{c.label}</p>
            <p className="font-semibold text-foreground mt-1" style={{ fontSize: "22px" }}>{c.value}</p>
            <p className="text-muted-foreground" style={{ fontSize: "11px" }}>{c.sub}</p>
          </div>
        ))}
      </div>

      {/* Testimonial Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {testimonials.map((t, i) => {
          const cfg = statusConfig[t.status]
          return (
            <div key={i} className="bg-white rounded-xl border border-border/50 p-5 flex flex-col hover:shadow-md transition-shadow">
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-white font-semibold shrink-0"
                    style={{ backgroundColor: t.avatarColor, fontSize: "12px" }}
                  >
                    {t.customer.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <p className="font-medium text-foreground" style={{ fontSize: "13px" }}>{t.customer}</p>
                    <div className="flex items-center gap-0.5 mt-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className="w-3 h-3"
                          fill={star <= t.rating ? "#F59E0B" : "none"}
                          stroke={star <= t.rating ? "#F59E0B" : "#D1D5DB"}
                          strokeWidth={1.5}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <span
                  className="inline-flex items-center rounded-full px-2 py-0.5 font-medium shrink-0"
                  style={{ fontSize: "10px", backgroundColor: cfg.bg, color: cfg.color }}
                >
                  {t.status}
                </span>
              </div>

              {/* Quote */}
              <blockquote className="flex-1 text-muted-foreground italic" style={{ fontSize: "12px", lineHeight: "1.6" }}>
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              {/* Product + Date */}
              <div className="mt-3 pt-3 flex items-center justify-between" style={{ borderTop: "1px solid #F0EDEF" }}>
                <div>
                  <span
                    className="inline-flex items-center rounded-full px-2 py-0.5 font-medium"
                    style={{ fontSize: "10px", backgroundColor: "#FAF0F2", color: "#501D2A" }}
                  >
                    {t.product}
                  </span>
                  <p className="text-muted-foreground mt-1" style={{ fontSize: "10px" }}>{t.date}</p>
                </div>
                <div className="flex items-center gap-1">
                  <button className="p-1.5 rounded-lg hover:bg-[#F0EDEF] transition-colors text-muted-foreground hover:text-foreground">
                    <Eye className="w-3 h-3" strokeWidth={1.5} />
                  </button>
                  <button className="p-1.5 rounded-lg hover:bg-[#F0EDEF] transition-colors text-muted-foreground hover:text-foreground">
                    <Pencil className="w-3 h-3" strokeWidth={1.5} />
                  </button>
                  <button className="p-1.5 rounded-lg hover:bg-red-50 transition-colors text-muted-foreground hover:text-red-600">
                    <Trash2 className="w-3 h-3" strokeWidth={1.5} />
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
