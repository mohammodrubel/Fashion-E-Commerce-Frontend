import { PageHeader } from "@/components/admin/page-header"
import { Receipt, Plus, Edit } from "lucide-react"

const taxRules = [
  { region: "New York, USA", rate: "8.875%", type: "State + City", status: "active" },
  { region: "California, USA", rate: "10.25%", type: "State + Local", status: "active" },
  { region: "Texas, USA", rate: "8.25%", type: "State + Local", status: "active" },
  { region: "European Union", rate: "20.0%", type: "VAT", status: "active" },
  { region: "United Kingdom", rate: "20.0%", type: "VAT", status: "active" },
]

export default function TaxSettingsPage() {
  return (
    <div>
      <PageHeader
        title="Tax Configuration"
        description="Manage tax rules and rates for different regions"
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Settings", href: "/admin/settings" }, { label: "Tax" }]}
        actions={
          <button
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-white"
            style={{ fontSize: "13px", backgroundColor: "#501D2A" }}
          >
            <Plus className="w-4 h-4" />
            Add Tax Rule
          </button>
        }
      />

      {/* Auto-tax Toggle */}
      <div className="bg-white rounded-xl border border-border/50 p-5 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#501D2A15" }}>
              <Receipt className="w-4 h-4" style={{ color: "#501D2A" }} />
            </div>
            <div>
              <p className="font-semibold text-foreground" style={{ fontSize: "14px" }}>Automatic Tax Calculation</p>
              <p className="text-muted-foreground" style={{ fontSize: "12px" }}>Auto-calculate taxes based on customer location using the rules below</p>
            </div>
          </div>
          <button className="relative inline-flex w-10 h-6 rounded-full" style={{ backgroundColor: "#501D2A" }}>
            <span className="absolute right-1 top-1 w-4 h-4 rounded-full bg-white shadow-sm" />
          </button>
        </div>
      </div>

      {/* Tax settings options */}
      <div className="bg-white rounded-xl border border-border/50 p-5 mb-6">
        <h2 className="font-semibold text-foreground mb-4" style={{ fontSize: "14px" }}>Tax Display Settings</h2>
        <div className="space-y-3">
          {[
            { label: "Show prices inclusive of tax", checked: false },
            { label: "Show tax breakdown at checkout", checked: true },
            { label: "Apply tax on shipping", checked: false },
            { label: "Tax-exempt orders require documentation", checked: true },
          ].map(opt => (
            <label key={opt.label} className="flex items-center gap-3 cursor-pointer">
              <div className={`w-4 h-4 rounded border flex items-center justify-center ${opt.checked ? "border-transparent" : "border-border"}`}
                style={{ backgroundColor: opt.checked ? "#501D2A" : "transparent" }}>
                {opt.checked && <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 12 12"><path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
              </div>
              <span className="text-foreground" style={{ fontSize: "13px" }}>{opt.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Tax Rules Table */}
      <div className="bg-white rounded-xl border border-border/50">
        <div className="px-6 py-4 border-b border-border/50">
          <h2 className="font-semibold text-foreground" style={{ fontSize: "15px" }}>Tax Rules</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50">
                {["Region", "Tax Rate", "Tax Type", "Status", "Actions"].map(h => (
                  <th key={h} className="text-left px-6 py-3 text-muted-foreground font-medium" style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.06em" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {taxRules.map((rule, i) => (
                <tr key={rule.region} className={`border-b border-border/30 hover:bg-muted/20 transition-colors ${i === taxRules.length - 1 ? "border-b-0" : ""}`}>
                  <td className="px-6 py-3.5 font-medium text-foreground" style={{ fontSize: "13px" }}>{rule.region}</td>
                  <td className="px-6 py-3.5 font-semibold" style={{ fontSize: "13px", color: "#501D2A" }}>{rule.rate}</td>
                  <td className="px-6 py-3.5" style={{ fontSize: "13px" }}>
                    <span className="px-2 py-0.5 rounded bg-muted/40 text-muted-foreground" style={{ fontSize: "11px" }}>{rule.type}</span>
                  </td>
                  <td className="px-6 py-3.5" style={{ fontSize: "13px" }}>
                    <button className="relative inline-flex w-9 h-5 rounded-full" style={{ backgroundColor: "#501D2A" }}>
                      <span className="absolute right-0.5 top-0.5 w-4 h-4 rounded-full bg-white shadow-sm" />
                    </button>
                  </td>
                  <td className="px-6 py-3.5" style={{ fontSize: "13px" }}>
                    <button className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground">
                      <Edit className="w-3.5 h-3.5" />
                      Edit
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
