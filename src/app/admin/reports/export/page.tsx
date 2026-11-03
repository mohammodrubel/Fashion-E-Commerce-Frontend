import { PageHeader } from "@/components/admin/page-header"
import { Download, FileText, Table2, FileSpreadsheet, Calendar, ChevronDown } from "lucide-react"

const reportTypes = [
  {
    name: "Sales Overview",
    description: "Total revenue, orders, and trends for selected period",
    icon: "📊",
    formats: ["CSV", "PDF", "Excel"],
    lastExported: "Oct 18, 2024",
  },
  {
    name: "Sales by Product",
    description: "Units sold and revenue breakdown per product SKU",
    icon: "📦",
    formats: ["CSV", "Excel"],
    lastExported: "Oct 15, 2024",
  },
  {
    name: "Customer Data",
    description: "Customer list with purchase history and loyalty tiers",
    icon: "👤",
    formats: ["CSV", "PDF"],
    lastExported: "Oct 10, 2024",
  },
  {
    name: "Tax Report",
    description: "Taxable sales, collected amounts, and net tax by month",
    icon: "🧾",
    formats: ["CSV", "PDF", "Excel"],
    lastExported: "Oct 1, 2024",
  },
  {
    name: "Inventory Report",
    description: "Current stock levels, values, and turnover metrics",
    icon: "🏭",
    formats: ["CSV", "Excel"],
    lastExported: "Oct 20, 2024",
  },
  {
    name: "Orders Report",
    description: "All orders with status, products, and customer info",
    icon: "🛍️",
    formats: ["CSV", "PDF", "Excel"],
    lastExported: "Oct 19, 2024",
  },
  {
    name: "Refund Report",
    description: "Refunded orders with amounts and reasons",
    icon: "↩️",
    formats: ["CSV", "PDF"],
    lastExported: "Oct 5, 2024",
  },
  {
    name: "Marketing Performance",
    description: "Campaign ROI, ROAS, and conversion data",
    icon: "📣",
    formats: ["CSV", "Excel"],
    lastExported: "Sep 30, 2024",
  },
]

const formatIcons: Record<string, typeof FileText> = {
  CSV: Table2,
  PDF: FileText,
  Excel: FileSpreadsheet,
}

const formatColors: Record<string, string> = {
  CSV: "#059669",
  PDF: "#dc2626",
  Excel: "#0f9d58",
}

export default function ExportReportsPage() {
  return (
    <div>
      <PageHeader
        title="Export Reports"
        description="Download store data in your preferred format"
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Reports", href: "/admin/reports" }, { label: "Export" }]}
      />

      {/* Date Range & Filters */}
      <div className="bg-white rounded-xl border border-border/50 p-4 mb-6 flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-muted-foreground" />
          <span className="text-muted-foreground" style={{ fontSize: "13px" }}>Date Range:</span>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="text"
            readOnly
            defaultValue="Oct 1, 2024"
            className="border border-border/50 rounded-lg px-3 py-1.5 bg-muted/20 text-foreground"
            style={{ fontSize: "13px", width: "120px" }}
          />
          <span className="text-muted-foreground" style={{ fontSize: "13px" }}>to</span>
          <input
            type="text"
            readOnly
            defaultValue="Oct 24, 2024"
            className="border border-border/50 rounded-lg px-3 py-1.5 bg-muted/20 text-foreground"
            style={{ fontSize: "13px", width: "120px" }}
          />
        </div>
        <div className="flex items-center gap-1 ml-auto">
          {["This Week", "This Month", "Last Quarter", "This Year"].map(p => (
            <button
              key={p}
              className="px-3 py-1 rounded-lg text-muted-foreground hover:bg-muted/30 border border-border/50 bg-white transition-colors"
              style={{ fontSize: "12px" }}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Report Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reportTypes.map(report => (
          <div key={report.name} className="bg-white rounded-xl border border-border/50 p-5">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-3">
                <div className="text-2xl">{report.icon}</div>
                <div>
                  <h3 className="font-semibold text-foreground" style={{ fontSize: "14px" }}>{report.name}</h3>
                  <p className="text-muted-foreground mt-0.5" style={{ fontSize: "12px" }}>{report.description}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 mb-4">
              <span className="text-muted-foreground" style={{ fontSize: "11px" }}>Last exported:</span>
              <span className="text-foreground" style={{ fontSize: "11px" }}>{report.lastExported}</span>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {report.formats.map(fmt => {
                const Icon = formatIcons[fmt]
                return (
                  <button
                    key={fmt}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border/50 bg-muted/20 hover:bg-muted/40 transition-colors"
                    style={{ fontSize: "12px" }}
                  >
                    <Icon className="w-3.5 h-3.5" style={{ color: formatColors[fmt] }} />
                    <span className="text-foreground font-medium">{fmt}</span>
                    <Download className="w-3 h-3 text-muted-foreground" />
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Scheduled Exports */}
      <div className="bg-white rounded-xl border border-border/50 mt-6">
        <div className="px-6 py-4 border-b border-border/50 flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-foreground" style={{ fontSize: "15px" }}>Scheduled Exports</h2>
            <p className="text-muted-foreground" style={{ fontSize: "12px" }}>Auto-generate and email reports on a schedule</p>
          </div>
          <button
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-white"
            style={{ fontSize: "13px", backgroundColor: "var(--primary)" }}
          >
            + Schedule Export
          </button>
        </div>
        <div className="divide-y divide-border/30">
          {[
            { report: "Sales Overview", frequency: "Weekly", day: "Every Monday", recipients: "admin@yourstore.com", format: "PDF" },
            { report: "Tax Report", frequency: "Monthly", day: "1st of month", recipients: "accountant@firm.com", format: "CSV" },
            { report: "Inventory Report", frequency: "Daily", day: "Every day at 7am", recipients: "warehouse@yourstore.com", format: "Excel" },
          ].map(s => (
            <div key={s.report} className="px-6 py-4 flex items-center justify-between hover:bg-muted/20 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#20212715" }}>
                  <Calendar className="w-4 h-4" style={{ color: "var(--primary)" }} />
                </div>
                <div>
                  <p className="font-medium text-foreground" style={{ fontSize: "13px" }}>{s.report} — {s.format}</p>
                  <p className="text-muted-foreground" style={{ fontSize: "12px" }}>{s.day} → {s.recipients}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-medium" style={{ fontSize: "11px" }}>{s.frequency}</span>
                <button className="text-muted-foreground hover:text-foreground" style={{ fontSize: "12px" }}>Edit</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
