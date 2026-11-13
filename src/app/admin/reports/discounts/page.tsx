import { PageHeader } from "@/components/admin/page-header"
import { Tag, Download, Percent, TrendingDown } from "lucide-react"

const coupons: { code: string; type: string; discount: string; uses: number; totalDiscount: string; avgOrder: string; revenueImpact: string; }[] = []

export default function DiscountsReportPage() {
  return (
    <div>
      <PageHeader
        title="Discount Report"
        description="Coupon usage and discount impact on revenue"
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Reports", href: "/admin/reports" }, { label: "Discounts" }]}
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

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-border/50 p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-muted-foreground" style={{ fontSize: "13px" }}>Total Discounts Given</span>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#20212715" }}>
              <TrendingDown className="w-4 h-4" style={{ color: "var(--primary)" }} />
            </div>
          </div>
          <p className="text-2xl font-semibold text-foreground">$12,840</p>
          <p className="text-muted-foreground" style={{ fontSize: "12px" }}>Across all active coupons</p>
        </div>
        <div className="bg-white rounded-xl border border-border/50 p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-muted-foreground" style={{ fontSize: "13px" }}>Total Coupon Uses</span>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-amber-50">
              <Tag className="w-4 h-4 text-amber-600" />
            </div>
          </div>
          <p className="text-2xl font-semibold text-foreground">324</p>
          <p className="text-muted-foreground" style={{ fontSize: "12px" }}>6 active campaigns</p>
        </div>
        <div className="bg-white rounded-xl border border-border/50 p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-muted-foreground" style={{ fontSize: "13px" }}>Avg Discount Amount</span>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-rose-50">
              <Percent className="w-4 h-4 text-rose-500" />
            </div>
          </div>
          <p className="text-2xl font-semibold text-foreground">$39.63</p>
          <p className="text-muted-foreground" style={{ fontSize: "12px" }}>Per order with coupon</p>
        </div>
      </div>

      {/* Coupon Table */}
      <div className="bg-white rounded-xl border border-border/50">
        <div className="px-6 py-4 border-b border-border/50">
          <h2 className="font-semibold text-foreground" style={{ fontSize: "15px" }}>Coupon Performance</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50">
                {["Discount Code", "Type", "Discount", "Uses", "Total Discount", "Avg Order", "Revenue Impact"].map(h => (
                  <th key={h} className="text-left px-6 py-3 text-muted-foreground font-medium" style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.06em" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {coupons.map((c, i) => (
                <tr key={c.code} className={`border-b border-border/30 hover:bg-muted/20 transition-colors ${i === coupons.length - 1 ? "border-b-0" : ""}`}>
                  <td className="px-6 py-3.5" style={{ fontSize: "13px" }}>
                    <code className="px-2 py-0.5 rounded bg-muted/40 text-foreground font-mono font-medium" style={{ fontSize: "12px" }}>{c.code}</code>
                  </td>
                  <td className="px-6 py-3.5 text-muted-foreground" style={{ fontSize: "13px" }}>{c.type}</td>
                  <td className="px-6 py-3.5" style={{ fontSize: "13px" }}>
                    <span className="font-semibold" style={{ color: "var(--primary)" }}>{c.discount}</span>
                  </td>
                  <td className="px-6 py-3.5 text-foreground font-medium" style={{ fontSize: "13px" }}>{c.uses}</td>
                  <td className="px-6 py-3.5 text-rose-500 font-medium" style={{ fontSize: "13px" }}>−{c.totalDiscount}</td>
                  <td className="px-6 py-3.5 text-muted-foreground" style={{ fontSize: "13px" }}>{c.avgOrder}</td>
                  <td className="px-6 py-3.5 text-rose-500" style={{ fontSize: "13px" }}>{c.revenueImpact}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t border-border/50 bg-muted/10">
                <td className="px-6 py-3 font-semibold text-foreground" style={{ fontSize: "13px" }}>Total</td>
                <td className="px-6 py-3" />
                <td className="px-6 py-3" />
                <td className="px-6 py-3 font-semibold text-foreground" style={{ fontSize: "13px" }}>324</td>
                <td className="px-6 py-3 font-semibold text-rose-500" style={{ fontSize: "13px" }}>−$12,840.00</td>
                <td className="px-6 py-3 text-muted-foreground" style={{ fontSize: "13px" }}>$212.00</td>
                <td className="px-6 py-3 font-semibold text-rose-500" style={{ fontSize: "13px" }}>-9.0%</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  )
}
