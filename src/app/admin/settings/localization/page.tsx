import { PageHeader } from "@/components/admin/page-header"
import { Languages, Save } from "lucide-react"

const languages = [
  { name: "English (US)", code: "en-US", default: true, enabled: true, completeness: "100%" },
  { name: "French", code: "fr", default: false, enabled: true, completeness: "94%" },
  { name: "Spanish", code: "es", default: false, enabled: false, completeness: "78%" },
  { name: "German", code: "de", default: false, enabled: false, completeness: "62%" },
]

export default function LocalizationPage() {
  return (
    <div>
      <PageHeader
        title="Language & Localization"
        description="Configure language, date, time, and number formats"
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Settings", href: "/admin/settings" }, { label: "Localization" }]}
      />

      <div className="max-w-3xl space-y-6">
        {/* Format Settings */}
        <div className="bg-white rounded-xl border border-border/50 p-6">
          <h2 className="font-semibold text-foreground mb-4" style={{ fontSize: "14px" }}>Format Preferences</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-foreground font-medium mb-1.5" style={{ fontSize: "13px" }}>Default Language</label>
              <select className="w-full border border-border/50 rounded-lg px-3 py-2 text-foreground bg-white" style={{ fontSize: "13px" }}>
                <option>English (US)</option>
                <option>French</option>
                <option>Spanish</option>
              </select>
            </div>
            <div>
              <label className="block text-foreground font-medium mb-1.5" style={{ fontSize: "13px" }}>Date Format</label>
              <select className="w-full border border-border/50 rounded-lg px-3 py-2 text-foreground bg-white" style={{ fontSize: "13px" }}>
                <option>MM/DD/YYYY (10/24/2024)</option>
                <option>DD/MM/YYYY (24/10/2024)</option>
                <option>YYYY-MM-DD (2024-10-24)</option>
                <option>MMM DD, YYYY (Oct 24, 2024)</option>
              </select>
            </div>
            <div>
              <label className="block text-foreground font-medium mb-1.5" style={{ fontSize: "13px" }}>Time Format</label>
              <select className="w-full border border-border/50 rounded-lg px-3 py-2 text-foreground bg-white" style={{ fontSize: "13px" }}>
                <option>12-hour (3:45 PM)</option>
                <option>24-hour (15:45)</option>
              </select>
            </div>
            <div>
              <label className="block text-foreground font-medium mb-1.5" style={{ fontSize: "13px" }}>Number Format</label>
              <select className="w-full border border-border/50 rounded-lg px-3 py-2 text-foreground bg-white" style={{ fontSize: "13px" }}>
                <option>1,234.56 (US)</option>
                <option>1.234,56 (EU)</option>
                <option>1 234,56 (French)</option>
              </select>
            </div>
            <div>
              <label className="block text-foreground font-medium mb-1.5" style={{ fontSize: "13px" }}>First Day of Week</label>
              <select className="w-full border border-border/50 rounded-lg px-3 py-2 text-foreground bg-white" style={{ fontSize: "13px" }}>
                <option>Sunday</option>
                <option>Monday</option>
              </select>
            </div>
            <div>
              <label className="block text-foreground font-medium mb-1.5" style={{ fontSize: "13px" }}>Weight Unit</label>
              <select className="w-full border border-border/50 rounded-lg px-3 py-2 text-foreground bg-white" style={{ fontSize: "13px" }}>
                <option>Pounds (lbs)</option>
                <option>Kilograms (kg)</option>
                <option>Ounces (oz)</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-white" style={{ fontSize: "13px", backgroundColor: "#501D2A" }}>
              <Save className="w-4 h-4" />
              Save Formats
            </button>
          </div>
        </div>

        {/* Languages Table */}
        <div className="bg-white rounded-xl border border-border/50">
          <div className="px-6 py-4 border-b border-border/50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Languages className="w-4 h-4 text-muted-foreground" />
              <h2 className="font-semibold text-foreground" style={{ fontSize: "15px" }}>Store Languages</h2>
            </div>
            <button className="flex items-center gap-2 rounded-lg px-3 py-2 text-white" style={{ fontSize: "12px", backgroundColor: "#501D2A" }}>
              + Add Language
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50">
                  {["Language", "Code", "Completeness", "Default", "Enabled"].map(h => (
                    <th key={h} className="text-left px-6 py-3 text-muted-foreground font-medium" style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.06em" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {languages.map((lang, i) => (
                  <tr key={lang.code} className={`border-b border-border/30 hover:bg-muted/20 transition-colors ${i === languages.length - 1 ? "border-b-0" : ""}`}>
                    <td className="px-6 py-3.5 font-medium text-foreground" style={{ fontSize: "13px" }}>{lang.name}</td>
                    <td className="px-6 py-3.5" style={{ fontSize: "13px" }}>
                      <code className="px-1.5 py-0.5 rounded bg-muted/40 text-muted-foreground font-mono" style={{ fontSize: "12px" }}>{lang.code}</code>
                    </td>
                    <td className="px-6 py-3.5" style={{ fontSize: "13px" }}>
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 rounded-full bg-muted/40 overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: lang.completeness, backgroundColor: "#501D2A" }} />
                        </div>
                        <span className="text-muted-foreground">{lang.completeness}</span>
                      </div>
                    </td>
                    <td className="px-6 py-3.5" style={{ fontSize: "13px" }}>
                      {lang.default ? (
                        <span className="px-2 py-0.5 rounded-full text-white font-medium" style={{ fontSize: "10px", backgroundColor: "#501D2A" }}>Default</span>
                      ) : (
                        <button className="text-muted-foreground hover:text-foreground" style={{ fontSize: "12px" }}>Set Default</button>
                      )}
                    </td>
                    <td className="px-6 py-3.5" style={{ fontSize: "13px" }}>
                      <button className="relative inline-flex w-9 h-5 rounded-full" style={{ backgroundColor: lang.enabled ? "#501D2A" : "#e5e7eb" }}>
                        <span className="absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm" style={{ left: lang.enabled ? "calc(100% - 18px)" : "2px" }} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
