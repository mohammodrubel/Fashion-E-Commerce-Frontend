import { PageHeader } from "@/components/admin/page-header"
import { Plus, Copy, Pencil, Trash2, Search } from "lucide-react"

type CouponStatus = "Active" | "Inactive" | "Expired"

interface Coupon {
  code: string
  type: "Percentage" | "Fixed"
  discount: string
  minOrder: string
  used: number
  limit: number
  expiry: string
  status: CouponStatus
}

const coupons: Coupon[] = [
  { code: "SUMMER20", type: "Percentage", discount: "20%", minOrder: "$50", used: 34, limit: 100, expiry: "Dec 31, 2024", status: "Active" },
  { code: "WELCOME15", type: "Percentage", discount: "15%", minOrder: "$30", used: 89, limit: 500, expiry: "Jan 31, 2025", status: "Active" },
  { code: "FLAT10OFF", type: "Fixed", discount: "$10", minOrder: "$60", used: 12, limit: 50, expiry: "Nov 30, 2024", status: "Active" },
  { code: "VIP25", type: "Percentage", discount: "25%", minOrder: "$100", used: 7, limit: 30, expiry: "Dec 15, 2024", status: "Active" },
  { code: "FREESHIP", type: "Fixed", discount: "$0", minOrder: "$0", used: 45, limit: 200, expiry: "Dec 31, 2024", status: "Active" },
  { code: "FLASH30", type: "Percentage", discount: "30%", minOrder: "$80", used: 30, limit: 30, expiry: "Oct 15, 2024", status: "Expired" },
  { code: "FALL2024", type: "Percentage", discount: "10%", minOrder: "$40", used: 0, limit: 150, expiry: "Dec 01, 2024", status: "Inactive" },
  { code: "NEWYEAR", type: "Percentage", discount: "12%", minOrder: "$45", used: 0, limit: 300, expiry: "Jan 15, 2025", status: "Inactive" },
]

const statusConfig: Record<CouponStatus, { bg: string; color: string }> = {
  Active: { bg: "#DCFCE7", color: "#166534" },
  Inactive: { bg: "#F3F4F6", color: "#6B7280" },
  Expired: { bg: "#FEE2E2", color: "#991B1B" },
}

export default function CouponsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Discount Coupons"
        description="Create and manage promotional coupon codes"
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Marketing", href: "/admin/marketing" }, { label: "Coupons" }]}
        actions={
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-white hover:opacity-90 transition-opacity"
            style={{ backgroundColor: "var(--primary)", fontSize: "13px" }}
          >
            <Plus className="w-4 h-4" strokeWidth={1.5} />
            Create Coupon
          </button>
        }
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Coupons", value: "8", sub: "across all types" },
          { label: "Active", value: "5", sub: "currently valid" },
          { label: "Total Uses", value: "217", sub: "this month" },
          { label: "Revenue Influenced", value: "$4,820", sub: "from coupon orders" },
        ].map((card) => (
          <div key={card.label} className="bg-white rounded-xl border border-border/50 p-4">
            <p className="text-muted-foreground" style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.07em" }}>{card.label}</p>
            <p className="font-semibold text-foreground mt-1" style={{ fontSize: "22px" }}>{card.value}</p>
            <p className="text-muted-foreground" style={{ fontSize: "11px" }}>{card.sub}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-border/50">
        <div className="flex items-center justify-between gap-3 px-5 py-4" style={{ borderBottom: "1px solid var(--accent)" }}>
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
            <input
              type="text"
              placeholder="Search coupons..."
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-border/60 bg-[var(--muted)] placeholder:text-muted-foreground focus:outline-none focus:border-primary/40"
              style={{ fontSize: "13px" }}
            />
          </div>
          <select className="px-3 py-2 rounded-lg border border-border/60 bg-white text-muted-foreground focus:outline-none" style={{ fontSize: "13px" }}>
            <option>All Status</option>
            <option>Active</option>
            <option>Inactive</option>
            <option>Expired</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--accent)" }}>
                {["Code", "Type", "Discount", "Min Order", "Usage / Limit", "Expiry", "Status", "Actions"].map((h) => (
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
              {coupons.map((c, i) => {
                const cfg = statusConfig[c.status]
                const usagePct = c.limit > 0 ? (c.used / c.limit) * 100 : 0
                return (
                  <tr
                    key={c.code}
                    className="hover:bg-[var(--muted)] transition-colors"
                    style={{ borderBottom: i < coupons.length - 1 ? "1px solid var(--accent)" : "none" }}
                  >
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <code
                          className="font-mono font-semibold tracking-wider px-2 py-0.5 rounded"
                          style={{ fontSize: "12px", backgroundColor: "var(--muted)", color: "var(--primary)", border: "1px dashed #C4849A" }}
                        >
                          {c.code}
                        </code>
                        <button className="p-1 rounded hover:bg-[var(--accent)] transition-colors text-muted-foreground hover:text-foreground">
                          <Copy className="w-3 h-3" strokeWidth={1.5} />
                        </button>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span
                        className="inline-flex items-center rounded-full px-2 py-0.5 font-medium"
                        style={{
                          fontSize: "11px",
                          backgroundColor: c.type === "Percentage" ? "#EFF6FF" : "#FFF7ED",
                          color: c.type === "Percentage" ? "#1D4ED8" : "#9A3412"
                        }}
                      >
                        {c.type}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="font-semibold text-foreground" style={{ fontSize: "14px" }}>{c.discount}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-foreground" style={{ fontSize: "13px" }}>{c.minOrder}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-foreground" style={{ fontSize: "13px" }}>{c.used} / {c.limit}</span>
                        </div>
                        <div className="h-1.5 rounded-full w-24 overflow-hidden" style={{ backgroundColor: "var(--accent)" }}>
                          <div
                            className="h-full rounded-full"
                            style={{ width: `${usagePct}%`, backgroundColor: usagePct >= 90 ? "#EF4444" : "var(--primary)" }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-muted-foreground" style={{ fontSize: "13px" }}>{c.expiry}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        {/* Toggle */}
                        <button
                          className="relative inline-flex items-center rounded-full transition-colors shrink-0"
                          style={{
                            width: "36px", height: "20px",
                            backgroundColor: c.status === "Active" ? "var(--primary)" : "#D1D5DB"
                          }}
                        >
                          <span
                            className="inline-block w-4 h-4 rounded-full bg-white shadow-sm transform transition-transform"
                            style={{ transform: c.status === "Active" ? "translateX(18px)" : "translateX(2px)" }}
                          />
                        </button>
                        <span
                          className="inline-flex items-center rounded-full px-2 py-0.5 font-medium"
                          style={{ fontSize: "11px", backgroundColor: cfg.bg, color: cfg.color }}
                        >
                          {c.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-1">
                        <button className="p-1.5 rounded-lg hover:bg-[var(--accent)] transition-colors text-muted-foreground hover:text-foreground">
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

        <div className="px-5 py-4" style={{ borderTop: "1px solid var(--accent)" }}>
          <p className="text-muted-foreground" style={{ fontSize: "12px" }}>Showing 8 coupons</p>
        </div>
      </div>
    </div>
  )
}
