import { PageHeader } from "@/components/admin/page-header"
import { RefreshCcw, Download, AlertCircle } from "lucide-react"

const refundData = [
  { month: "May 2024", orders: 194, refunded: 7, refundAmount: "$764.00", rate: "3.6%" },
  { month: "June 2024", orders: 210, refunded: 8, refundAmount: "$822.00", rate: "3.8%" },
  { month: "July 2024", orders: 187, refunded: 6, refundAmount: "$612.00", rate: "3.2%" },
  { month: "August 2024", orders: 203, refunded: 7, refundAmount: "$724.00", rate: "3.4%" },
  { month: "September 2024", orders: 176, refunded: 6, refundAmount: "$638.00", rate: "3.4%" },
  { month: "October 2024", orders: 161, refunded: 5, refundAmount: "$332.00", rate: "3.1%" },
]

export default function RefundsReportPage() {
  return (
    <div>
      <PageHeader
        title="Refund Report"
        description="Refund trends, rates, and monthly breakdown"
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Reports", href: "/admin/reports" }, { label: "Refunds" }]}
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
            <span className="text-muted-foreground" style={{ fontSize: "13px" }}>Total Refunds</span>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-rose-50">
              <RefreshCcw className="w-4 h-4 text-rose-500" />
            </div>
          </div>
          <p className="text-2xl font-semibold text-foreground">$4,892</p>
          <p className="text-muted-foreground" style={{ fontSize: "12px" }}>May – Oct 2024</p>
        </div>
        <div className="bg-white rounded-xl border border-border/50 p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-muted-foreground" style={{ fontSize: "13px" }}>Avg Refund Rate</span>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-amber-50">
              <AlertCircle className="w-4 h-4 text-amber-600" />
            </div>
          </div>
          <p className="text-2xl font-semibold text-foreground">3.4%</p>
          <p className="text-emerald-600" style={{ fontSize: "12px" }}>Below 5% industry avg</p>
        </div>
        <div className="bg-white rounded-xl border border-border/50 p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-muted-foreground" style={{ fontSize: "13px" }}>Avg Refund Amount</span>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#20212715" }}>
              <RefreshCcw className="w-4 h-4" style={{ color: "var(--primary)" }} />
            </div>
          </div>
          <p className="text-2xl font-semibold text-foreground">$47.10</p>
          <p className="text-muted-foreground" style={{ fontSize: "12px" }}>Per refunded order</p>
        </div>
      </div>

      {/* Top Refund Reasons */}
      <div className="bg-white rounded-xl border border-border/50 p-6 mb-6">
        <h2 className="font-semibold text-foreground mb-4" style={{ fontSize: "15px" }}>Top Refund Reasons</h2>
        <div className="space-y-3">
          {[
            { reason: "Wrong size ordered", count: 24, pct: 59 },
            { reason: "Item not as described", count: 9, pct: 22 },
            { reason: "Defective / damaged", count: 5, pct: 12 },
            { reason: "Changed mind", count: 3, pct: 7 },
          ].map(r => (
            <div key={r.reason}>
              <div className="flex justify-between mb-1">
                <span style={{ fontSize: "13px" }} className="text-foreground">{r.reason}</span>
                <span style={{ fontSize: "12px" }} className="text-muted-foreground">{r.count} orders ({r.pct}%)</span>
              </div>
              <div className="w-full h-2 bg-muted/30 rounded-full overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${r.pct}%`, backgroundColor: "var(--primary)" }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Monthly Table */}
      <div className="bg-white rounded-xl border border-border/50">
        <div className="px-6 py-4 border-b border-border/50">
          <h2 className="font-semibold text-foreground" style={{ fontSize: "15px" }}>Monthly Refund Breakdown</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50">
                {["Month", "Total Orders", "Refunded Orders", "Refund Amount", "Refund Rate"].map(h => (
                  <th key={h} className="text-left px-6 py-3 text-muted-foreground font-medium" style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.06em" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {refundData.map((row, i) => (
                <tr key={row.month} className={`border-b border-border/30 hover:bg-muted/20 transition-colors ${i === refundData.length - 1 ? "border-b-0" : ""}`}>
                  <td className="px-6 py-3.5 font-medium text-foreground" style={{ fontSize: "13px" }}>{row.month}</td>
                  <td className="px-6 py-3.5 text-muted-foreground" style={{ fontSize: "13px" }}>{row.orders}</td>
                  <td className="px-6 py-3.5 text-rose-500 font-medium" style={{ fontSize: "13px" }}>{row.refunded}</td>
                  <td className="px-6 py-3.5 text-rose-500 font-semibold" style={{ fontSize: "13px" }}>−{row.refundAmount}</td>
                  <td className="px-6 py-3.5" style={{ fontSize: "13px" }}>
                    <span className="px-2 py-0.5 rounded-full text-rose-600 bg-rose-50 font-medium" style={{ fontSize: "11px" }}>{row.rate}</span>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t border-border/50 bg-muted/10">
                <td className="px-6 py-3 font-semibold text-foreground" style={{ fontSize: "13px" }}>Total</td>
                <td className="px-6 py-3 font-semibold text-foreground" style={{ fontSize: "13px" }}>1,131</td>
                <td className="px-6 py-3 font-semibold text-rose-500" style={{ fontSize: "13px" }}>39</td>
                <td className="px-6 py-3 font-semibold text-rose-500" style={{ fontSize: "13px" }}>−$4,892.00</td>
                <td className="px-6 py-3 font-semibold text-muted-foreground" style={{ fontSize: "13px" }}>3.4% avg</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  )
}
