import { PageHeader } from "@/components/admin/page-header"
import { Database, Download, RefreshCcw, CheckCircle, Clock, Upload } from "lucide-react"

const backups = [
  { date: "Oct 24, 2024 2:00 AM", size: "26.4 MB", type: "Auto", status: "success" },
  { date: "Oct 23, 2024 2:00 AM", size: "25.8 MB", type: "Auto", status: "success" },
  { date: "Oct 20, 2024 11:32 AM", size: "24.1 MB", type: "Manual", status: "success" },
  { date: "Oct 22, 2024 2:00 AM", size: "—", type: "Auto", status: "failed" },
]

export default function BackupPage() {
  return (
    <div>
      <PageHeader
        title="Backup & Restore"
        description="Manage automatic and manual backups of your store data"
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Settings", href: "/admin/settings" }, { label: "Backup" }]}
        actions={
          <button
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-white"
            style={{ fontSize: "13px", backgroundColor: "#501D2A" }}
          >
            <Database className="w-4 h-4" />
            Create Backup Now
          </button>
        }
      />

      <div className="max-w-3xl space-y-6">
        {/* Last Backup Card */}
        <div className="bg-white rounded-xl border border-border/50 p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-emerald-50">
                <CheckCircle className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <p className="font-semibold text-foreground" style={{ fontSize: "15px" }}>Last Backup Successful</p>
                <p className="text-muted-foreground" style={{ fontSize: "13px" }}>Oct 24, 2024 at 2:00 AM — 26.4 MB</p>
                <p className="text-muted-foreground" style={{ fontSize: "12px" }}>Includes: Products, Orders, Customers, Settings, Media</p>
              </div>
            </div>
            <button
              className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border/50 bg-white text-foreground hover:bg-muted/30 transition-colors"
              style={{ fontSize: "13px" }}
            >
              <Download className="w-4 h-4" />
              Download
            </button>
          </div>
        </div>

        {/* Auto Backup Schedule */}
        <div className="bg-white rounded-xl border border-border/50 p-6">
          <h2 className="font-semibold text-foreground mb-4" style={{ fontSize: "14px" }}>Automatic Backup Schedule</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground" style={{ fontSize: "13px" }}>Enable Auto Backups</p>
                <p className="text-muted-foreground" style={{ fontSize: "12px" }}>Automatically back up your store on a schedule</p>
              </div>
              <button className="relative inline-flex w-10 h-6 rounded-full" style={{ backgroundColor: "#501D2A" }}>
                <span className="absolute right-1 top-1 w-4 h-4 rounded-full bg-white shadow-sm" />
              </button>
            </div>
            <div className="border-t border-border/30 pt-4 grid grid-cols-2 gap-4">
              <div>
                <label className="block text-foreground font-medium mb-1.5" style={{ fontSize: "13px" }}>Backup Frequency</label>
                <select className="w-full border border-border/50 rounded-lg px-3 py-2 text-foreground bg-white" style={{ fontSize: "13px" }}>
                  <option>Daily</option>
                  <option>Every 12 hours</option>
                  <option>Weekly</option>
                </select>
              </div>
              <div>
                <label className="block text-foreground font-medium mb-1.5" style={{ fontSize: "13px" }}>Backup Time</label>
                <input defaultValue="02:00 AM" className="w-full border border-border/50 rounded-lg px-3 py-2 text-foreground bg-white" style={{ fontSize: "13px" }} />
              </div>
              <div>
                <label className="block text-foreground font-medium mb-1.5" style={{ fontSize: "13px" }}>Retention Period</label>
                <select className="w-full border border-border/50 rounded-lg px-3 py-2 text-foreground bg-white" style={{ fontSize: "13px" }}>
                  <option>Keep last 7 backups</option>
                  <option>Keep last 14 backups</option>
                  <option>Keep last 30 backups</option>
                  <option>Keep all backups</option>
                </select>
              </div>
              <div>
                <label className="block text-foreground font-medium mb-1.5" style={{ fontSize: "13px" }}>Backup Destination</label>
                <select className="w-full border border-border/50 rounded-lg px-3 py-2 text-foreground bg-white" style={{ fontSize: "13px" }}>
                  <option>Server Storage</option>
                  <option>Amazon S3</option>
                  <option>Google Cloud Storage</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Backup History Table */}
        <div className="bg-white rounded-xl border border-border/50">
          <div className="px-6 py-4 border-b border-border/50">
            <h2 className="font-semibold text-foreground" style={{ fontSize: "15px" }}>Backup History</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50">
                  {["Date & Time", "Size", "Type", "Status", "Actions"].map(h => (
                    <th key={h} className="text-left px-6 py-3 text-muted-foreground font-medium" style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.06em" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {backups.map((b, i) => (
                  <tr key={i} className={`border-b border-border/30 hover:bg-muted/20 transition-colors ${i === backups.length - 1 ? "border-b-0" : ""}`}>
                    <td className="px-6 py-3.5" style={{ fontSize: "13px" }}>
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                        <span className="text-foreground">{b.date}</span>
                      </div>
                    </td>
                    <td className="px-6 py-3.5 text-muted-foreground" style={{ fontSize: "13px" }}>{b.size}</td>
                    <td className="px-6 py-3.5" style={{ fontSize: "13px" }}>
                      <span className={`px-2 py-0.5 rounded-full font-medium ${b.type === "Manual" ? "text-[#501D2A] bg-[#501D2A10]" : "text-muted-foreground bg-muted/40"}`} style={{ fontSize: "11px" }}>
                        {b.type}
                      </span>
                    </td>
                    <td className="px-6 py-3.5" style={{ fontSize: "13px" }}>
                      {b.status === "success" ? (
                        <span className="flex items-center gap-1.5 text-emerald-600">
                          <CheckCircle className="w-3.5 h-3.5" />
                          Success
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5 text-rose-500">
                          <RefreshCcw className="w-3.5 h-3.5" />
                          Failed
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-3.5" style={{ fontSize: "13px" }}>
                      <div className="flex items-center gap-3">
                        {b.status === "success" && (
                          <>
                            <button className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors" style={{ fontSize: "12px" }}>
                              <Download className="w-3.5 h-3.5" />
                              Download
                            </button>
                            <button className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors" style={{ fontSize: "12px" }}>
                              <Upload className="w-3.5 h-3.5" />
                              Restore
                            </button>
                          </>
                        )}
                        {b.status === "failed" && (
                          <button className="flex items-center gap-1 text-rose-500 hover:text-rose-600 transition-colors" style={{ fontSize: "12px" }}>
                            <RefreshCcw className="w-3.5 h-3.5" />
                            Retry
                          </button>
                        )}
                      </div>
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
