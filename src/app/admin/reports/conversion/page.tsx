import { PageHeader } from "@/components/admin/page-header"
import { ArrowDown, TrendingUp, Download, Users, ShoppingCart, Eye, CreditCard } from "lucide-react"

const funnelSteps = [
  { label: "Visitors", value: 48240, icon: Users, color: "#501D2A", width: "100%" },
  { label: "Product Views", value: 28944, icon: Eye, color: "#7a3042", width: "60%" },
  { label: "Add to Cart", value: 8831, icon: ShoppingCart, color: "#a34058", width: "18.3%" },
  { label: "Checkout Started", value: 4147, icon: CreditCard, color: "#c05070", width: "8.6%" },
  { label: "Purchase Completed", value: 1847, icon: TrendingUp, color: "#d97706", width: "3.8%" },
]

const conversionStats = [
  { label: "Visitor → View", rate: "60.0%", change: "+2.1%" },
  { label: "View → Cart", rate: "30.5%", change: "+0.8%" },
  { label: "Cart → Checkout", rate: "47.0%", change: "-1.2%" },
  { label: "Checkout → Purchase", rate: "44.5%", change: "+3.4%" },
  { label: "Overall Conversion", rate: "3.83%", change: "+0.4%" },
]

const deviceBreakdown = [
  { device: "Mobile", sessions: 26532, conversions: 921, rate: "3.47%" },
  { device: "Desktop", sessions: 18482, conversions: 812, rate: "4.39%" },
  { device: "Tablet", sessions: 3226, conversions: 114, rate: "3.53%" },
]

export default function ConversionPage() {
  return (
    <div>
      <PageHeader
        title="Conversion Analytics"
        description="Funnel performance from visitor to purchase"
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Reports", href: "/admin/reports" }, { label: "Conversion" }]}
        actions={
          <button
            className="flex items-center gap-2 rounded-lg border border-border/50 bg-white px-3 py-2 text-foreground hover:bg-muted/30 transition-colors"
            style={{ fontSize: "13px" }}
          >
            <Download className="w-4 h-4" />
            Export
          </button>
        }
      />

      {/* Funnel */}
      <div className="bg-white rounded-xl border border-border/50 p-6 mb-6">
        <h2 className="font-semibold text-foreground mb-6" style={{ fontSize: "15px" }}>Conversion Funnel</h2>
        <div className="flex flex-col items-center space-y-2">
          {funnelSteps.map((step, i) => {
            const Icon = step.icon
            const nextStep = funnelSteps[i + 1]
            const dropRate = nextStep ? (((step.value - nextStep.value) / step.value) * 100).toFixed(1) : null
            return (
              <div key={step.label} className="w-full">
                <div
                  className="mx-auto flex items-center justify-between px-6 py-4 rounded-xl text-white"
                  style={{
                    width: step.width,
                    minWidth: "280px",
                    backgroundColor: step.color,
                    transition: "width 0.3s ease",
                  }}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5 opacity-80" />
                    <span className="font-medium" style={{ fontSize: "14px" }}>{step.label}</span>
                  </div>
                  <span className="font-bold" style={{ fontSize: "16px" }}>{step.value.toLocaleString()}</span>
                </div>
                {dropRate && (
                  <div className="flex items-center justify-center gap-1 my-1">
                    <ArrowDown className="w-3 h-3 text-rose-400" />
                    <span className="text-rose-500" style={{ fontSize: "11px" }}>{dropRate}% drop-off</span>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Conversion Rates */}
      <div className="grid grid-cols-5 gap-3 mb-6">
        {conversionStats.map(s => (
          <div key={s.label} className="bg-white rounded-xl border border-border/50 p-4 text-center">
            <p className="text-muted-foreground mb-1" style={{ fontSize: "11px" }}>{s.label}</p>
            <p className="font-bold text-foreground" style={{ fontSize: "18px" }}>{s.rate}</p>
            <p className={`font-medium ${s.change.startsWith("+") ? "text-emerald-600" : "text-rose-500"}`} style={{ fontSize: "11px" }}>
              {s.change} MoM
            </p>
          </div>
        ))}
      </div>

      {/* Device Breakdown */}
      <div className="bg-white rounded-xl border border-border/50">
        <div className="px-6 py-4 border-b border-border/50">
          <h2 className="font-semibold text-foreground" style={{ fontSize: "15px" }}>Conversion by Device</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50">
                {["Device", "Sessions", "Purchases", "Conversion Rate"].map(h => (
                  <th key={h} className="text-left px-6 py-3 text-muted-foreground font-medium" style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.06em" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {deviceBreakdown.map((d, i) => (
                <tr key={d.device} className={`border-b border-border/30 hover:bg-muted/20 transition-colors ${i === deviceBreakdown.length - 1 ? "border-b-0" : ""}`}>
                  <td className="px-6 py-4 font-medium text-foreground" style={{ fontSize: "13px" }}>{d.device}</td>
                  <td className="px-6 py-4 text-muted-foreground" style={{ fontSize: "13px" }}>{d.sessions.toLocaleString()}</td>
                  <td className="px-6 py-4 text-foreground font-medium" style={{ fontSize: "13px" }}>{d.conversions.toLocaleString()}</td>
                  <td className="px-6 py-4" style={{ fontSize: "13px" }}>
                    <span className="font-semibold" style={{ color: "#501D2A" }}>{d.rate}</span>
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
