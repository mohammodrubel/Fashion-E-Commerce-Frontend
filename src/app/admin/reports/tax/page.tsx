import { PageHeader } from "@/components/admin/page-header"
import { Download, Receipt } from "lucide-react"

const taxData = [
  { month: "May 2024", taxableSales: "$0", taxRate: "0.0%", taxCollected: "$0.00", taxRefunded: "$0.00", netTax: "$0.00" },
  { month: "June 2024", taxableSales: "$0", taxRate: "0.0%", taxCollected: "$0.00", taxRefunded: "$0.00", netTax: "$0.00" },
  { month: "July 2024", taxableSales: "$0", taxRate: "0.0%", taxCollected: "$0.00", taxRefunded: "$0.00", netTax: "$0.00" },
  { month: "August 2024", taxableSales: "$0", taxRate: "0.0%", taxCollected: "$0.00", taxRefunded: "$0.00", netTax: "$0.00" },
  { month: "September 2024", taxableSales: "$0", taxRate: "0.0%", taxCollected: "$0.00", taxRefunded: "$0.00", netTax: "$0.00" },
  { month: "October 2024", taxableSales: "$0", taxRate: "0.0%", taxCollected: "$0.00", taxRefunded: "$0.00", netTax: "$0.00" },
]

export default function TaxReportPage() {
  return (
    <div>
      <PageHeader
        title="Tax Report"
        description="Tax collected, refunded, and net tax obligations by month"
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Reports", href: "/admin/reports" }, { label: "Tax Report" }]}
        actions={
          <div className="flex items-center gap-2">
            <button
              className="flex items-center gap-2 rounded-lg border border-border/50 bg-white px-3 py-2 text-foreground hover:bg-muted/30 transition-colors"
              style={{ fontSize: "13px" }}
            >
              <Download className="w-4 h-4" />
              Export for Accountant
            </button>
          </div>
        }
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-border/50 p-5">
          <div className="flex items-center gap-2 mb-3">
            <Receipt className="w-4 h-4" style={{ color: "var(--primary)" }} />
            <span className="text-muted-foreground" style={{ fontSize: "13px" }}>Total Taxable Sales</span>
          </div>
          <p className="text-2xl font-semibold text-foreground">$87,420</p>
          <p className="text-muted-foreground mt-0.5" style={{ fontSize: "12px" }}>May – Oct 2024</p>
        </div>
        <div className="bg-white rounded-xl border border-border/50 p-5">
          <div className="flex items-center gap-2 mb-3">
            <Receipt className="w-4 h-4 text-emerald-600" />
            <span className="text-muted-foreground" style={{ fontSize: "13px" }}>Total Tax Collected</span>
          </div>
          <p className="text-2xl font-semibold text-foreground">$7,430.70</p>
          <p className="text-muted-foreground mt-0.5" style={{ fontSize: "12px" }}>At 8.5% rate</p>
        </div>
        <div className="bg-white rounded-xl border border-border/50 p-5">
          <div className="flex items-center gap-2 mb-3">
            <Receipt className="w-4 h-4 text-emerald-700" />
            <span className="text-muted-foreground" style={{ fontSize: "13px" }}>Net Tax Owed</span>
          </div>
          <p className="text-2xl font-semibold text-emerald-700">$7,243.00</p>
          <p className="text-muted-foreground mt-0.5" style={{ fontSize: "12px" }}>After refunds deducted</p>
        </div>
      </div>

      {/* Tax Table */}
      <div className="bg-white rounded-xl border border-border/50">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border/50">
          <h2 className="font-semibold text-foreground" style={{ fontSize: "15px" }}>Monthly Tax Summary</h2>
          <span className="px-2.5 py-1 rounded-full text-amber-700 bg-amber-50 font-medium" style={{ fontSize: "11px" }}>Tax Rate: 8.5%</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50">
                {["Month", "Taxable Sales", "Tax Rate", "Tax Collected", "Tax Refunded", "Net Tax"].map(h => (
                  <th key={h} className="text-left px-6 py-3 text-muted-foreground font-medium" style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.06em" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {taxData.map((row, i) => (
                <tr key={row.month} className={`border-b border-border/30 hover:bg-muted/20 transition-colors ${i === taxData.length - 1 ? "border-b-0" : ""}`}>
                  <td className="px-6 py-3.5 font-medium text-foreground" style={{ fontSize: "13px" }}>{row.month}</td>
                  <td className="px-6 py-3.5 text-foreground" style={{ fontSize: "13px" }}>{row.taxableSales}</td>
                  <td className="px-6 py-3.5" style={{ fontSize: "13px" }}>
                    <span className="px-2 py-0.5 rounded bg-muted/40 text-muted-foreground" style={{ fontSize: "11px" }}>{row.taxRate}</span>
                  </td>
                  <td className="px-6 py-3.5 text-emerald-600 font-medium" style={{ fontSize: "13px" }}>{row.taxCollected}</td>
                  <td className="px-6 py-3.5 text-rose-500" style={{ fontSize: "13px" }}>−{row.taxRefunded}</td>
                  <td className="px-6 py-3.5 text-foreground font-semibold" style={{ fontSize: "13px" }}>{row.netTax}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-border/50 bg-muted/10">
                <td className="px-6 py-3.5 font-bold text-foreground" style={{ fontSize: "13px" }}>Total</td>
                <td className="px-6 py-3.5 font-bold text-foreground" style={{ fontSize: "13px" }}>$87,420.00</td>
                <td className="px-6 py-3.5 text-muted-foreground" style={{ fontSize: "13px" }}>—</td>
                <td className="px-6 py-3.5 font-bold text-emerald-600" style={{ fontSize: "13px" }}>$7,430.70</td>
                <td className="px-6 py-3.5 font-bold text-rose-500" style={{ fontSize: "13px" }}>−$187.70</td>
                <td className="px-6 py-3.5 font-bold text-foreground" style={{ fontSize: "13px" }}>$7,243.00</td>
              </tr>
            </tfoot>
          </table>
        </div>
        <div className="px-6 py-3 border-t border-border/30 bg-amber-50/50 rounded-b-xl">
          <p className="text-amber-700" style={{ fontSize: "12px" }}>
            This report is for informational purposes. Consult a tax professional for filing. Tax data reflects domestic sales only.
          </p>
        </div>
      </div>
    </div>
  )
}
