import { PageHeader } from "@/components/admin/page-header"
import { Plus, ArrowRight, TrendingUp, Pencil, Trash2, Eye } from "lucide-react"

type RuleType = "Upsell" | "Cross-sell"

interface UpsellRule {
  triggerProduct: string
  triggerCategory: string
  suggestedProducts: string[]
  ruleType: RuleType
  placement: string
  conversionRate: string
  impressions: number
  conversions: number
  status: "Active" | "Inactive"
}

const rules: UpsellRule[] = [
  {
    triggerProduct: "Floral Wrap Midi Dress",
    triggerCategory: "Dresses",
    suggestedProducts: ["Strappy Heeled Sandals", "Woven Leather Belt", "Linen Tote Bag"],
    ruleType: "Cross-sell",
    placement: "Product Page",
    conversionRate: "14.2%",
    impressions: 2840,
    conversions: 403,
    status: "Active",
  },
  {
    triggerProduct: "Silk Cami Blouse",
    triggerCategory: "Tops",
    suggestedProducts: ["Premium Silk Cami (Upgrade)", "Silk Slip Skirt Set"],
    ruleType: "Upsell",
    placement: "Cart Page",
    conversionRate: "9.7%",
    impressions: 1560,
    conversions: 151,
    status: "Active",
  },
  {
    triggerProduct: "Any Knitwear",
    triggerCategory: "Knitwear",
    suggestedProducts: ["Ribbed Knit Cardigan", "Cashmere Blend Scarf", "Wide Leg Trousers"],
    ruleType: "Cross-sell",
    placement: "Checkout",
    conversionRate: "11.4%",
    impressions: 980,
    conversions: 112,
    status: "Active",
  },
  {
    triggerProduct: "Classic Trench Coat",
    triggerCategory: "Outerwear",
    suggestedProducts: ["Trench Coat Belt (Upgrade)", "Leather Gloves", "Merino Scarf"],
    ruleType: "Upsell",
    placement: "Product Page",
    conversionRate: "7.8%",
    impressions: 640,
    conversions: 50,
    status: "Inactive",
  },
]

const typeConfig: Record<RuleType, { bg: string; color: string }> = {
  Upsell: { bg: "#FDF4FF", color: "#7E22CE" },
  "Cross-sell": { bg: "#EFF6FF", color: "#1D4ED8" },
}

export default function UpsellPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Upsell & Cross-sell"
        description="Configure product recommendation rules to increase average order value"
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Marketing", href: "/admin/marketing" }, { label: "Upsell" }]}
        actions={
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-white hover:opacity-90 transition-opacity"
            style={{ backgroundColor: "#501D2A", fontSize: "13px" }}
          >
            <Plus className="w-4 h-4" strokeWidth={1.5} />
            Add Rule
          </button>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Active Rules", value: "3", sub: "of 4 total" },
          { label: "Total Impressions", value: "6,020", sub: "this month" },
          { label: "Total Conversions", value: "716", sub: "11.9% avg rate" },
          { label: "AOV Uplift", value: "+$18.40", sub: "vs no recommendation" },
        ].map((c) => (
          <div key={c.label} className="bg-white rounded-xl border border-border/50 p-4">
            <p className="text-muted-foreground" style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.07em" }}>{c.label}</p>
            <p className="font-semibold text-foreground mt-1" style={{ fontSize: "22px" }}>{c.value}</p>
            <p className="text-muted-foreground" style={{ fontSize: "11px" }}>{c.sub}</p>
          </div>
        ))}
      </div>

      {/* Rule Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {rules.map((rule, idx) => {
          const typeCfg = typeConfig[rule.ruleType]
          return (
            <div key={idx} className="bg-white rounded-xl border border-border/50 p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: "#FAF0F2" }}>
                    <TrendingUp className="w-4 h-4" style={{ color: "#501D2A" }} strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className="inline-flex items-center rounded-full px-2 py-0.5 font-medium"
                        style={{ fontSize: "10px", backgroundColor: typeCfg.bg, color: typeCfg.color }}
                      >
                        {rule.ruleType}
                      </span>
                      <span
                        className="inline-flex items-center rounded-full px-2 py-0.5 font-medium"
                        style={{
                          fontSize: "10px",
                          backgroundColor: rule.status === "Active" ? "#DCFCE7" : "#F3F4F6",
                          color: rule.status === "Active" ? "#166534" : "#6B7280"
                        }}
                      >
                        {rule.status}
                      </span>
                    </div>
                    <p className="text-muted-foreground mt-1" style={{ fontSize: "11px" }}>Placement: {rule.placement}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button className="p-1.5 rounded-lg hover:bg-[#F0EDEF] transition-colors text-muted-foreground hover:text-foreground">
                    <Eye className="w-3.5 h-3.5" strokeWidth={1.5} />
                  </button>
                  <button className="p-1.5 rounded-lg hover:bg-[#F0EDEF] transition-colors text-muted-foreground hover:text-foreground">
                    <Pencil className="w-3.5 h-3.5" strokeWidth={1.5} />
                  </button>
                  <button className="p-1.5 rounded-lg hover:bg-red-50 transition-colors text-muted-foreground hover:text-red-600">
                    <Trash2 className="w-3.5 h-3.5" strokeWidth={1.5} />
                  </button>
                </div>
              </div>

              {/* Trigger → Suggestion flow */}
              <div className="flex items-center gap-2 p-3 rounded-lg mb-3" style={{ backgroundColor: "#F8F7F5" }}>
                <div className="flex-1 min-w-0">
                  <p className="text-muted-foreground" style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.07em" }}>Trigger</p>
                  <p className="font-medium text-foreground truncate" style={{ fontSize: "12px" }}>{rule.triggerProduct}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground shrink-0" strokeWidth={1.5} />
                <div className="flex-1 min-w-0">
                  <p className="text-muted-foreground" style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.07em" }}>Suggest</p>
                  <div className="flex flex-col gap-0.5">
                    {rule.suggestedProducts.slice(0, 2).map((p) => (
                      <p key={p} className="text-foreground truncate" style={{ fontSize: "11px" }}>• {p}</p>
                    ))}
                    {rule.suggestedProducts.length > 2 && (
                      <p className="text-muted-foreground" style={{ fontSize: "11px" }}>+{rule.suggestedProducts.length - 2} more</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center p-2 rounded-lg" style={{ backgroundColor: "#F8F7F5" }}>
                  <p className="font-semibold text-foreground" style={{ fontSize: "14px" }}>{rule.impressions.toLocaleString()}</p>
                  <p className="text-muted-foreground" style={{ fontSize: "10px" }}>Impressions</p>
                </div>
                <div className="text-center p-2 rounded-lg" style={{ backgroundColor: "#F8F7F5" }}>
                  <p className="font-semibold text-foreground" style={{ fontSize: "14px" }}>{rule.conversions}</p>
                  <p className="text-muted-foreground" style={{ fontSize: "10px" }}>Conversions</p>
                </div>
                <div className="text-center p-2 rounded-lg" style={{ backgroundColor: "#FAF0F2" }}>
                  <p className="font-semibold" style={{ fontSize: "14px", color: "#501D2A" }}>{rule.conversionRate}</p>
                  <p className="text-muted-foreground" style={{ fontSize: "10px" }}>Conv. Rate</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
