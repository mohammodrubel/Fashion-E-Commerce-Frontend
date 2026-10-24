import { PageHeader } from "@/components/admin/page-header"
import { CreditCard, Download, CheckCircle, XCircle, AlertCircle } from "lucide-react"

const paymentRows = [
  { date: "Oct 20, 2024", method: "Stripe / Card", transactions: 48, amount: "$3,840", fees: "$114.00", net: "$3,726.00", status: "settled" },
  { date: "Oct 19, 2024", method: "PayPal", transactions: 22, amount: "$1,760", fees: "$65.50", net: "$1,694.50", status: "settled" },
  { date: "Oct 18, 2024", method: "Stripe / Card", transactions: 54, amount: "$4,320", fees: "$128.60", net: "$4,191.40", status: "settled" },
  { date: "Oct 17, 2024", method: "Bank Transfer", transactions: 8, amount: "$960", fees: "$0.00", net: "$960.00", status: "settled" },
  { date: "Oct 17, 2024", method: "Cash on Delivery", transactions: 14, amount: "$1,120", fees: "$0.00", net: "$1,120.00", status: "pending" },
  { date: "Oct 16, 2024", method: "Stripe / Card", transactions: 61, amount: "$4,880", fees: "$145.20", net: "$4,734.80", status: "settled" },
]

const methodBreakdown = [
  { method: "Credit/Debit Card", pct: 68, revenue: "$96,954", color: "#501D2A" },
  { method: "PayPal", pct: 22, revenue: "$31,368", color: "#7a3042" },
  { method: "Bank Transfer", pct: 6, revenue: "$8,555", color: "#c05070" },
  { method: "Cash on Delivery", pct: 4, revenue: "$5,703", color: "#d97706" },
]

export default function PaymentsReportPage() {
  return (
    <div>
      <PageHeader
        title="Payment Reports"
        description="Transaction volume, success rates, and payment method breakdown"
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Reports", href: "/admin/reports" }, { label: "Payments" }]}
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
            <span className="text-muted-foreground" style={{ fontSize: "13px" }}>Total Transactions</span>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#501D2A15" }}>
              <CreditCard className="w-4 h-4" style={{ color: "#501D2A" }} />
            </div>
          </div>
          <p className="text-2xl font-semibold text-foreground">1,847</p>
          <p className="text-muted-foreground" style={{ fontSize: "12px" }}>$142,580 total volume</p>
        </div>
        <div className="bg-white rounded-xl border border-border/50 p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-muted-foreground" style={{ fontSize: "13px" }}>Success Rate</span>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-emerald-50">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
            </div>
          </div>
          <p className="text-2xl font-semibold text-emerald-600">97.2%</p>
          <p className="text-muted-foreground" style={{ fontSize: "12px" }}>1,795 successful</p>
        </div>
        <div className="bg-white rounded-xl border border-border/50 p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-muted-foreground" style={{ fontSize: "13px" }}>Failed Transactions</span>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-rose-50">
              <XCircle className="w-4 h-4 text-rose-500" />
            </div>
          </div>
          <p className="text-2xl font-semibold text-rose-500">2.8%</p>
          <p className="text-muted-foreground" style={{ fontSize: "12px" }}>52 failed attempts</p>
        </div>
      </div>

      {/* Payment Method Donut */}
      <div className="bg-white rounded-xl border border-border/50 p-6 mb-6">
        <h2 className="font-semibold text-foreground mb-5" style={{ fontSize: "15px" }}>Payment Method Distribution</h2>
        <div className="flex items-center gap-8">
          {/* Simple donut via SVG */}
          <div className="shrink-0">
            <svg width="160" height="160" viewBox="0 0 160 160">
              <circle cx="80" cy="80" r="60" fill="none" stroke="#f3f4f6" strokeWidth="24" />
              <circle cx="80" cy="80" r="60" fill="none" stroke="#501D2A" strokeWidth="24"
                strokeDasharray={`${68 * 3.77} ${100 * 3.77}`} strokeDashoffset={`${25 * 3.77}`} />
              <circle cx="80" cy="80" r="60" fill="none" stroke="#7a3042" strokeWidth="24"
                strokeDasharray={`${22 * 3.77} ${100 * 3.77}`} strokeDashoffset={`${(25 - 68) * 3.77}`} />
              <circle cx="80" cy="80" r="60" fill="none" stroke="#c05070" strokeWidth="24"
                strokeDasharray={`${6 * 3.77} ${100 * 3.77}`} strokeDashoffset={`${(25 - 68 - 22) * 3.77}`} />
              <circle cx="80" cy="80" r="60" fill="none" stroke="#d97706" strokeWidth="24"
                strokeDasharray={`${4 * 3.77} ${100 * 3.77}`} strokeDashoffset={`${(25 - 68 - 22 - 6) * 3.77}`} />
              <text x="80" y="76" textAnchor="middle" style={{ fontSize: "14px", fontWeight: "600", fill: "#1f2937" }}>97.2%</text>
              <text x="80" y="92" textAnchor="middle" style={{ fontSize: "10px", fill: "#9ca3af" }}>Success</text>
            </svg>
          </div>
          <div className="flex-1 space-y-3">
            {methodBreakdown.map(m => (
              <div key={m.method}>
                <div className="flex justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: m.color }} />
                    <span className="text-foreground" style={{ fontSize: "13px" }}>{m.method}</span>
                  </div>
                  <span className="text-muted-foreground" style={{ fontSize: "12px" }}>{m.revenue} ({m.pct}%)</span>
                </div>
                <div className="w-full h-2 bg-muted/30 rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${m.pct}%`, backgroundColor: m.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-xl border border-border/50">
        <div className="px-6 py-4 border-b border-border/50">
          <h2 className="font-semibold text-foreground" style={{ fontSize: "15px" }}>Recent Transaction Summary</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50">
                {["Date", "Method", "Transactions", "Amount", "Fees", "Net"].map(h => (
                  <th key={h} className="text-left px-6 py-3 text-muted-foreground font-medium" style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.06em" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paymentRows.map((row, i) => (
                <tr key={i} className={`border-b border-border/30 hover:bg-muted/20 transition-colors ${i === paymentRows.length - 1 ? "border-b-0" : ""}`}>
                  <td className="px-6 py-3.5 text-muted-foreground" style={{ fontSize: "13px" }}>{row.date}</td>
                  <td className="px-6 py-3.5 font-medium text-foreground" style={{ fontSize: "13px" }}>{row.method}</td>
                  <td className="px-6 py-3.5 text-foreground" style={{ fontSize: "13px" }}>{row.transactions}</td>
                  <td className="px-6 py-3.5 text-foreground font-semibold" style={{ fontSize: "13px" }}>{row.amount}</td>
                  <td className="px-6 py-3.5 text-rose-500" style={{ fontSize: "13px" }}>−{row.fees}</td>
                  <td className="px-6 py-3.5 text-emerald-600 font-semibold" style={{ fontSize: "13px" }}>{row.net}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
