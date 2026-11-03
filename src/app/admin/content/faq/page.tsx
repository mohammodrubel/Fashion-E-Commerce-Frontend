import { PageHeader } from "@/components/admin/page-header"
import { Plus, ChevronDown, Pencil, Trash2, GripVertical } from "lucide-react"

interface FAQItem {
  question: string
  answer: string
  category: string
}

const faqs: FAQItem[] = [
  {
    category: "Orders & Shipping",
    question: "How long does standard shipping take?",
    answer: "Standard shipping typically takes 3–5 business days within the UK. International orders take 7–14 business days. Express shipping (1–2 days) is available at checkout for an additional fee.",
  },
  {
    category: "Orders & Shipping",
    question: "Do you offer free shipping?",
    answer: "Yes! We offer free standard shipping on all UK orders over £50. There's no discount code needed — it's applied automatically at checkout.",
  },
  {
    category: "Returns & Exchanges",
    question: "What is your return policy?",
    answer: "We accept returns within 30 days of delivery. Items must be unworn, unwashed, and in original packaging with all tags attached. Sale items can be exchanged but not refunded.",
  },
  {
    category: "Returns & Exchanges",
    question: "How do I start a return?",
    answer: "Log into your account, go to 'My Orders', and select the item you'd like to return. You'll receive a prepaid returns label by email within 24 hours.",
  },
  {
    category: "Sizing & Fit",
    question: "How do your sizes run?",
    answer: "Our clothing runs true to size. We recommend checking the size guide on each product page, as some styles (especially knitwear) may be designed for a looser or more fitted look.",
  },
  {
    category: "Sizing & Fit",
    question: "Do you offer petite or plus sizes?",
    answer: "Yes — we offer sizes 6–22 across most of our range, with select styles available in petite (P) and tall (T) fits. Filter by fit type on the category page.",
  },
  {
    category: "Payments & Billing",
    question: "What payment methods do you accept?",
    answer: "We accept Visa, Mastercard, American Express, PayPal, Apple Pay, Google Pay, and Klarna (buy now, pay later). All transactions are secured with SSL encryption.",
  },
  {
    category: "Payments & Billing",
    question: "Can I use multiple discount codes?",
    answer: "Only one discount code can be applied per order. Discount codes cannot be combined with other promotional offers unless specified otherwise.",
  },
]

const categories = [...new Set(faqs.map((f) => f.category))]

export default function FAQPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="FAQ Management"
        description="Manage frequently asked questions shown on the FAQ page"
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Content" }, { label: "FAQ" }]}
        actions={
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-white hover:opacity-90 transition-opacity"
            style={{ backgroundColor: "var(--primary)", fontSize: "13px" }}
          >
            <Plus className="w-4 h-4" strokeWidth={1.5} />
            Add Question
          </button>
        }
      />

      <div className="space-y-6">
        {categories.map((category) => {
          const categoryFaqs = faqs.filter((f) => f.category === category)
          return (
            <div key={category} className="bg-white rounded-xl border border-border/50 overflow-hidden">
              {/* Category header */}
              <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid var(--accent)", backgroundColor: "#FDFCFB" }}>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-5 rounded-full" style={{ backgroundColor: "var(--primary)" }} />
                  <p className="font-semibold text-foreground" style={{ fontSize: "14px" }}>{category}</p>
                  <span
                    className="rounded-full px-2 py-0.5 font-medium"
                    style={{ fontSize: "11px", backgroundColor: "#FAF0F2", color: "var(--primary)" }}
                  >
                    {categoryFaqs.length} questions
                  </span>
                </div>
                <button
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-dashed border-border/60 text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors"
                  style={{ fontSize: "12px" }}
                >
                  <Plus className="w-3 h-3" strokeWidth={1.5} />
                  Add to Category
                </button>
              </div>

              {/* FAQ Items */}
              <div className="divide-y divide-[var(--accent)]">
                {categoryFaqs.map((faq, idx) => (
                  <div key={idx} className="group">
                    {/* Question header */}
                    <div className="flex items-center gap-3 px-5 py-3.5 hover:bg-[var(--muted)] transition-colors">
                      <GripVertical className="w-4 h-4 text-muted-foreground/30 group-hover:text-muted-foreground cursor-grab shrink-0" strokeWidth={1.5} />
                      <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" strokeWidth={1.5} />
                      <p className="flex-1 font-medium text-foreground" style={{ fontSize: "13px" }}>{faq.question}</p>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1.5 rounded-lg hover:bg-[var(--accent)] transition-colors text-muted-foreground hover:text-foreground">
                          <Pencil className="w-3.5 h-3.5" strokeWidth={1.5} />
                        </button>
                        <button className="p-1.5 rounded-lg hover:bg-red-50 transition-colors text-muted-foreground hover:text-red-600">
                          <Trash2 className="w-3.5 h-3.5" strokeWidth={1.5} />
                        </button>
                      </div>
                    </div>
                    {/* Answer (shown expanded by default for admin view) */}
                    <div className="px-5 pb-4" style={{ paddingLeft: "64px" }}>
                      <p className="text-muted-foreground" style={{ fontSize: "13px", lineHeight: "1.6" }}>{faq.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      <div className="bg-white rounded-xl border border-border/50 p-4 flex items-center justify-between">
        <p className="text-muted-foreground" style={{ fontSize: "12px" }}>Showing {faqs.length} questions across {categories.length} categories</p>
        <button
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-dashed border-border text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
          style={{ fontSize: "12px" }}
        >
          <Plus className="w-3.5 h-3.5" strokeWidth={1.5} />
          Add Category
        </button>
      </div>
    </div>
  )
}
