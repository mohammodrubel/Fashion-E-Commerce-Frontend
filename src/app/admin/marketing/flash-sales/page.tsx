import { PageHeader } from "@/components/admin/page-header"
import { Plus, Zap, Clock, Pencil, Trash2, Eye } from "lucide-react"

type SaleStatus = "Active" | "Upcoming" | "Ended"

interface FlashSale {
  name: string
  products: number
  discount: string
  start: string
  end: string
  status: SaleStatus
  revenue?: string
}

const flashSales: FlashSale[] = [
  { name: "Weekend Flash 30% Off", products: 24, discount: "30%", start: "Oct 26, 2024 00:00", end: "Oct 27, 2024 23:59", status: "Active", revenue: "$2,140" },
  { name: "Black Friday Preview", products: 48, discount: "40%", start: "Nov 29, 2024 06:00", end: "Nov 29, 2024 22:00", status: "Upcoming" },
  { name: "Cyber Monday Deals", products: 36, discount: "35%", start: "Dec 02, 2024 08:00", end: "Dec 02, 2024 20:00", status: "Upcoming" },
  { name: "Midnight Madness", products: 16, discount: "25%", start: "Oct 20, 2024 22:00", end: "Oct 21, 2024 04:00", status: "Ended", revenue: "$980" },
]

const statusConfig: Record<SaleStatus, { bg: string; color: string; dot: string }> = {
  Active: { bg: "#DCFCE7", color: "#166534", dot: "#22C55E" },
  Upcoming: { bg: "#FEF9C3", color: "#854D0E", dot: "#EAB308" },
  Ended: { bg: "#F3F4F6", color: "#6B7280", dot: "#9CA3AF" },
}

const tabs: SaleStatus[] = ["Active", "Upcoming", "Ended"]

// Countdown values for the active sale (static representation)
const countdown = { hours: "08", minutes: "34", seconds: "21" }

export default function FlashSalesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Flash Sales"
        description="Time-limited promotional events with deep discounts"
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Marketing", href: "/admin/marketing" }, { label: "Flash Sales" }]}
        actions={
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-white hover:opacity-90 transition-opacity"
            style={{ backgroundColor: "#501D2A", fontSize: "13px" }}
          >
            <Plus className="w-4 h-4" strokeWidth={1.5} />
            Create Flash Sale
          </button>
        }
      />

      {/* Active Sale Countdown */}
      <div className="rounded-xl border border-border/50 overflow-hidden" style={{ background: "linear-gradient(135deg, #501D2A 0%, #7C3D52 100%)" }}>
        <div className="px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: "rgba(255,255,255,0.15)" }}>
              <Zap className="w-5 h-5 text-white" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-white font-semibold" style={{ fontSize: "16px" }}>Weekend Flash 30% Off</p>
              <p className="text-white/70" style={{ fontSize: "12px" }}>24 products · Ends Oct 27, 2024</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-white/70" strokeWidth={1.5} />
            <span className="text-white/70" style={{ fontSize: "12px" }}>Ends in:</span>
            <div className="flex items-center gap-1">
              {[countdown.hours, countdown.minutes, countdown.seconds].map((val, i) => (
                <div key={i} className="flex items-center gap-1">
                  <div className="rounded-lg px-3 py-1.5 text-center" style={{ backgroundColor: "rgba(255,255,255,0.15)" }}>
                    <span className="text-white font-mono font-bold" style={{ fontSize: "20px" }}>{val}</span>
                    <p className="text-white/60" style={{ fontSize: "9px" }}>{["HRS", "MIN", "SEC"][i]}</p>
                  </div>
                  {i < 2 && <span className="text-white font-bold" style={{ fontSize: "18px" }}>:</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl border border-border/50">
        <div className="flex items-center gap-0 px-5 pt-4" style={{ borderBottom: "1px solid #F0EDEF" }}>
          {tabs.map((tab) => {
            const count = flashSales.filter((s) => s.status === tab).length
            return (
              <button
                key={tab}
                className="flex items-center gap-2 px-4 py-2 mr-1 rounded-t-lg font-medium transition-colors"
                style={{
                  fontSize: "13px",
                  backgroundColor: tab === "Active" ? "#F8F7F5" : "transparent",
                  color: tab === "Active" ? "#501D2A" : "#6B7280",
                  borderBottom: tab === "Active" ? "2px solid #501D2A" : "2px solid transparent",
                  marginBottom: "-1px"
                }}
              >
                {tab}
                <span
                  className="rounded-full px-1.5 py-0.5"
                  style={{ fontSize: "10px", backgroundColor: tab === "Active" ? "#501D2A" : "#F0EDEF", color: tab === "Active" ? "white" : "#6B7280" }}
                >
                  {count}
                </span>
              </button>
            )
          })}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid #F0EDEF" }}>
                {["Name", "Products", "Discount", "Start", "End", "Revenue", "Status", "Actions"].map((h) => (
                  <th
                    key={h}
                    className="text-left px-5 py-3 text-muted-foreground font-medium"
                    style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.07em" }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {flashSales.map((sale, i) => {
                const cfg = statusConfig[sale.status]
                return (
                  <tr
                    key={sale.name}
                    className="hover:bg-[#F8F7F5] transition-colors"
                    style={{ borderBottom: i < flashSales.length - 1 ? "1px solid #F0EDEF" : "none" }}
                  >
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: "#FAF0F2" }}>
                          <Zap className="w-3.5 h-3.5" style={{ color: "#501D2A" }} strokeWidth={1.5} />
                        </div>
                        <p className="font-medium text-foreground" style={{ fontSize: "13px" }}>{sale.name}</p>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-foreground" style={{ fontSize: "13px" }}>{sale.products} items</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="font-semibold" style={{ fontSize: "14px", color: "#501D2A" }}>{sale.discount}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-muted-foreground" style={{ fontSize: "12px" }}>{sale.start}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-muted-foreground" style={{ fontSize: "12px" }}>{sale.end}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="font-medium text-foreground" style={{ fontSize: "13px" }}>{sale.revenue ?? "—"}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span
                        className="flex items-center gap-1.5 w-fit rounded-full px-2.5 py-1 font-medium"
                        style={{ fontSize: "11px", backgroundColor: cfg.bg, color: cfg.color }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: cfg.dot }} />
                        {sale.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-1">
                        <button className="p-1.5 rounded-lg hover:bg-[#F0EDEF] transition-colors text-muted-foreground hover:text-foreground">
                          <Eye className="w-3.5 h-3.5" strokeWidth={1.5} />
                        </button>
                        <button className="p-1.5 rounded-lg hover:bg-[#F0EDEF] transition-colors text-muted-foreground hover:text-foreground">
                          <Pencil className="w-3.5 h-3.5" strokeWidth={1.5} />
                        </button>
                        <button className="p-1.5 rounded-lg hover:bg-red-50 transition-colors text-muted-foreground hover:text-red-600">
                          <Trash2 className="w-3.5 h-3.5" strokeWidth={1.5} />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
