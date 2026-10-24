import { PageHeader } from "@/components/admin/page-header"
import { DollarSign, RefreshCcw, Plus } from "lucide-react"

const currencies = [
  { name: "US Dollar", code: "USD", symbol: "$", rate: "1.000", autoUpdate: true, status: true, base: true },
  { name: "Euro", code: "EUR", symbol: "€", rate: "0.924", autoUpdate: true, status: true, base: false },
  { name: "British Pound", code: "GBP", symbol: "£", rate: "0.793", autoUpdate: true, status: true, base: false },
  { name: "Canadian Dollar", code: "CAD", symbol: "CA$", rate: "1.362", autoUpdate: false, status: true, base: false },
  { name: "Australian Dollar", code: "AUD", symbol: "A$", rate: "1.531", autoUpdate: false, status: false, base: false },
]

export default function CurrencyPage() {
  return (
    <div>
      <PageHeader
        title="Currency Settings"
        description="Manage currencies and exchange rates for your store"
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Settings", href: "/admin/settings" }, { label: "Currency" }]}
        actions={
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 rounded-lg border border-border/50 bg-white px-3 py-2 text-foreground hover:bg-muted/30 transition-colors" style={{ fontSize: "13px" }}>
              <RefreshCcw className="w-4 h-4" />
              Sync Rates
            </button>
            <button className="flex items-center gap-2 rounded-lg px-3 py-2 text-white" style={{ fontSize: "13px", backgroundColor: "#501D2A" }}>
              <Plus className="w-4 h-4" />
              Add Currency
            </button>
          </div>
        }
      />

      {/* Base Currency Selector */}
      <div className="bg-white rounded-xl border border-border/50 p-5 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#501D2A15" }}>
            <DollarSign className="w-4 h-4" style={{ color: "#501D2A" }} />
          </div>
          <div>
            <h2 className="font-semibold text-foreground" style={{ fontSize: "14px" }}>Base Currency</h2>
            <p className="text-muted-foreground" style={{ fontSize: "12px" }}>All prices and reports use this currency as reference</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <select className="border border-border/50 rounded-lg px-3 py-2 text-foreground bg-white" style={{ fontSize: "13px" }}>
            <option>USD — US Dollar ($)</option>
            <option>EUR — Euro (€)</option>
            <option>GBP — British Pound (£)</option>
          </select>
          <p className="text-muted-foreground" style={{ fontSize: "12px" }}>Changing base currency will recalculate all prices.</p>
        </div>
      </div>

      {/* Currencies Table */}
      <div className="bg-white rounded-xl border border-border/50">
        <div className="px-6 py-4 border-b border-border/50 flex items-center justify-between">
          <h2 className="font-semibold text-foreground" style={{ fontSize: "15px" }}>Enabled Currencies</h2>
          <p className="text-muted-foreground" style={{ fontSize: "12px" }}>Rates last updated: Oct 24, 2024 at 8:00 AM</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50">
                {["Currency", "Code", "Symbol", "Exchange Rate", "Auto Update", "Status"].map(h => (
                  <th key={h} className="text-left px-6 py-3 text-muted-foreground font-medium" style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.06em" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currencies.map((cur, i) => (
                <tr key={cur.code} className={`border-b border-border/30 hover:bg-muted/20 transition-colors ${i === currencies.length - 1 ? "border-b-0" : ""}`}>
                  <td className="px-6 py-3.5" style={{ fontSize: "13px" }}>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground">{cur.name}</span>
                      {cur.base && <span className="px-1.5 py-0.5 rounded text-white font-medium" style={{ fontSize: "10px", backgroundColor: "#501D2A" }}>Base</span>}
                    </div>
                  </td>
                  <td className="px-6 py-3.5" style={{ fontSize: "13px" }}>
                    <code className="px-1.5 py-0.5 rounded bg-muted/40 text-muted-foreground font-mono" style={{ fontSize: "12px" }}>{cur.code}</code>
                  </td>
                  <td className="px-6 py-3.5 text-foreground font-semibold" style={{ fontSize: "13px" }}>{cur.symbol}</td>
                  <td className="px-6 py-3.5" style={{ fontSize: "13px" }}>
                    <div className="flex items-center gap-2">
                      {cur.base ? (
                        <span className="text-muted-foreground">Base rate</span>
                      ) : (
                        <input defaultValue={cur.rate} className="border border-border/50 rounded-lg px-2 py-1 text-foreground bg-white w-20" style={{ fontSize: "12px" }} />
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-3.5" style={{ fontSize: "13px" }}>
                    <button className="relative inline-flex w-9 h-5 rounded-full" style={{ backgroundColor: cur.autoUpdate ? "#501D2A" : "#e5e7eb" }}>
                      <span className="absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm" style={{ left: cur.autoUpdate ? "calc(100% - 18px)" : "2px" }} />
                    </button>
                  </td>
                  <td className="px-6 py-3.5" style={{ fontSize: "13px" }}>
                    <button className="relative inline-flex w-9 h-5 rounded-full" style={{ backgroundColor: cur.status ? "#501D2A" : "#e5e7eb" }}>
                      <span className="absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm" style={{ left: cur.status ? "calc(100% - 18px)" : "2px" }} />
                    </button>
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
