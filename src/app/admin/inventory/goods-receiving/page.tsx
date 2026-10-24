import { PageHeader } from "@/components/admin/page-header"
import { PackageCheck, AlertTriangle, CheckCircle, ChevronDown } from "lucide-react"

interface Receipt {
  date: string
  po: string
  supplier: string
  itemsReceived: number
  itemsOrdered: number
  discrepancy: "None" | "Short" | "Over" | "Damaged"
  notes: string
  receivedBy: string
}

const receipts: Receipt[] = [
  { date: "Oct 23, 2026", po: "PO-2041", supplier: "Silk Supply Co.", itemsReceived: 148, itemsOrdered: 150, discrepancy: "Short", notes: "2 units of TOP-SCB-004 not included, back-ordered", receivedBy: "J. Doe" },
  { date: "Oct 19, 2026", po: "PO-2038", supplier: "FabricHouse EU", itemsReceived: 200, itemsOrdered: 200, discrepancy: "None", notes: "Full shipment received in good condition", receivedBy: "K. Smith" },
  { date: "Oct 14, 2026", po: "PO-2036", supplier: "Denim Works USA", itemsReceived: 60, itemsOrdered: 60, discrepancy: "None", notes: "", receivedBy: "L. Torres" },
  { date: "Oct 8, 2026", po: "PO-2034", supplier: "Nordic Knits Ltd.", itemsReceived: 45, itemsOrdered: 40, discrepancy: "Over", notes: "5 extra units of KN-RIB-006 included (accepted)", receivedBy: "J. Doe" },
  { date: "Oct 2, 2026", po: "PO-2032", supplier: "LeatherCraft Co.", itemsReceived: 52, itemsOrdered: 55, discrepancy: "Damaged", notes: "3 units arrived damaged (AC-LBB-022) — filed claim", receivedBy: "K. Smith" },
]

const discrepancyConfig = {
  None: { className: "bg-emerald-50 text-emerald-700", icon: CheckCircle },
  Short: { className: "bg-amber-50 text-amber-700", icon: AlertTriangle },
  Over: { className: "bg-blue-50 text-blue-700", icon: AlertTriangle },
  Damaged: { className: "bg-red-50 text-red-600", icon: AlertTriangle },
}

export default function GoodsReceivingPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Goods Receiving"
        description="Record incoming stock against purchase orders"
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Inventory", href: "/admin/inventory" }, { label: "Goods Receiving" }]}
      />

      {/* Receiving Form */}
      <div className="bg-white rounded-xl border border-border/50 p-5">
        <div className="flex items-center gap-2.5 mb-5" style={{ borderBottom: "1px solid #F0EDEF", paddingBottom: "14px" }}>
          <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#F0EDEF" }}>
            <PackageCheck className="w-3.5 h-3.5" style={{ color: "#501D2A" }} strokeWidth={1.5} />
          </div>
          <h2 className="font-semibold text-foreground" style={{ fontSize: "14px" }}>Receive Goods</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block font-medium text-foreground mb-1.5" style={{ fontSize: "13px" }}>Purchase Order <span className="text-red-500">*</span></label>
            <div className="relative">
              <select className="w-full px-3 py-2 rounded-lg border border-border/60 bg-[#F8F7F5] text-foreground focus:outline-none focus:border-primary/40 appearance-none" style={{ fontSize: "13px" }}>
                <option>Select PO...</option>
                <option>PO-2042 — FabricHouse EU ($6,250)</option>
                <option>PO-2043 — Nordic Knits Ltd. ($2,100)</option>
                <option>PO-2044 — Denim Works USA ($1,550)</option>
                <option>PO-2045 — LeatherCraft Co. ($4,800)</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" strokeWidth={1.5} />
            </div>
          </div>
          <div>
            <label className="block font-medium text-foreground mb-1.5" style={{ fontSize: "13px" }}>Received Date <span className="text-red-500">*</span></label>
            <input type="date" className="w-full px-3 py-2 rounded-lg border border-border/60 bg-[#F8F7F5] text-foreground focus:outline-none focus:border-primary/40" style={{ fontSize: "13px" }} defaultValue="2026-10-24" />
          </div>
          <div>
            <label className="block font-medium text-foreground mb-1.5" style={{ fontSize: "13px" }}>Received By</label>
            <input type="text" placeholder="Staff name..." className="w-full px-3 py-2 rounded-lg border border-border/60 bg-[#F8F7F5] text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/40" style={{ fontSize: "13px" }} />
          </div>
        </div>

        {/* Line Items */}
        <div className="rounded-lg border border-border/60 overflow-hidden mb-4">
          <div className="grid grid-cols-4 gap-0 px-4 py-2.5 font-medium text-muted-foreground" style={{ backgroundColor: "#F8F7F5", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.07em" }}>
            <span>Product / SKU</span>
            <span>Ordered</span>
            <span>Received Qty</span>
            <span>Condition</span>
          </div>
          {[
            { product: "Oversized Linen Blazer", sku: "TOP-LBZ-002", ordered: 40 },
            { product: "Wide Leg Linen Trousers", sku: "PT-WLL-005", ordered: 30 },
            { product: "Floral Wrap Midi Dress", sku: "DR-FLW-001", ordered: 50 },
          ].map((item, i) => (
            <div
              key={item.sku}
              className="grid grid-cols-4 gap-0 px-4 py-3 items-center"
              style={{ borderTop: i > 0 ? "1px solid #F0EDEF" : "none" }}
            >
              <div>
                <p className="font-medium text-foreground" style={{ fontSize: "13px" }}>{item.product}</p>
                <p className="text-muted-foreground font-mono" style={{ fontSize: "11px" }}>{item.sku}</p>
              </div>
              <span className="text-foreground" style={{ fontSize: "13px" }}>{item.ordered}</span>
              <input type="number" defaultValue={item.ordered} className="w-20 px-2 py-1.5 rounded border border-border/60 bg-white text-foreground focus:outline-none focus:border-primary/40 text-center" style={{ fontSize: "13px" }} />
              <div className="relative w-32">
                <select className="w-full px-2 py-1.5 rounded border border-border/60 bg-white text-foreground focus:outline-none focus:border-primary/40 appearance-none" style={{ fontSize: "12px" }}>
                  <option>Good</option>
                  <option>Damaged</option>
                  <option>Short</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground pointer-events-none" strokeWidth={1.5} />
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block font-medium text-foreground mb-1.5" style={{ fontSize: "13px" }}>Notes / Discrepancy Details</label>
            <textarea rows={2} placeholder="Note any missing items, damage, or extras..." className="w-full px-3 py-2 rounded-lg border border-border/60 bg-[#F8F7F5] text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/40 resize-none" style={{ fontSize: "13px" }} />
          </div>
        </div>

        <div className="flex justify-end">
          <button className="flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2 rounded-lg hover:bg-primary/90 transition-colors" style={{ fontSize: "13px" }}>
            <PackageCheck className="w-4 h-4" strokeWidth={1.5} /> Confirm Receipt
          </button>
        </div>
      </div>

      {/* Recent Receipts Table */}
      <div className="bg-white rounded-xl border border-border/50">
        <div className="px-5 py-4" style={{ borderBottom: "1px solid #F0EDEF" }}>
          <h2 className="font-semibold text-foreground" style={{ fontSize: "14px" }}>Recent Goods Receipts</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid #F0EDEF" }}>
                {["Date", "PO #", "Supplier", "Received", "Ordered", "Discrepancy", "Notes", "By"].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-muted-foreground font-medium" style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.07em" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {receipts.map((r, i) => {
                const cfg = discrepancyConfig[r.discrepancy]
                const DiscIcon = cfg.icon
                return (
                  <tr key={i} className="hover:bg-[#F8F7F5] transition-colors" style={{ borderBottom: i < receipts.length - 1 ? "1px solid #F0EDEF" : "none" }}>
                    <td className="px-5 py-3 text-muted-foreground" style={{ fontSize: "13px" }}>{r.date}</td>
                    <td className="px-5 py-3 font-mono font-medium text-foreground" style={{ fontSize: "13px" }}>{r.po}</td>
                    <td className="px-5 py-3 text-foreground" style={{ fontSize: "13px" }}>{r.supplier}</td>
                    <td className="px-5 py-3 font-semibold text-foreground" style={{ fontSize: "13px" }}>{r.itemsReceived}</td>
                    <td className="px-5 py-3 text-muted-foreground" style={{ fontSize: "13px" }}>{r.itemsOrdered}</td>
                    <td className="px-5 py-3">
                      <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 font-medium ${cfg.className}`} style={{ fontSize: "11px" }}>
                        <DiscIcon className="w-3 h-3" strokeWidth={2} />
                        {r.discrepancy}
                      </span>
                    </td>
                    <td className="px-5 py-3 max-w-xs">
                      <p className="text-muted-foreground truncate" style={{ fontSize: "12px" }}>{r.notes || "—"}</p>
                    </td>
                    <td className="px-5 py-3 text-muted-foreground" style={{ fontSize: "13px" }}>{r.receivedBy}</td>
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
