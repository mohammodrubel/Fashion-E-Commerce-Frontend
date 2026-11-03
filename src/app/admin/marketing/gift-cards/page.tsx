import { PageHeader } from "@/components/admin/page-header"
import { Plus, Gift, Copy, Pencil, Eye } from "lucide-react"

type CardStatus = "Active" | "Redeemed" | "Expired" | "Pending"

interface GiftCard {
  code: string
  value: string
  balance: string
  customer: string
  issuedDate: string
  expiry: string
  status: CardStatus
}

const giftCards: GiftCard[] = [
  { code: "GC-4829-XKQM", value: "$50.00", balance: "$50.00", customer: "Sarah Mitchell", issuedDate: "Oct 15, 2024", expiry: "Oct 15, 2025", status: "Active" },
  { code: "GC-7731-BPAZ", value: "$100.00", balance: "$34.50", customer: "James Okafor", issuedDate: "Sep 22, 2024", expiry: "Sep 22, 2025", status: "Active" },
  { code: "GC-1103-WRVT", value: "$25.00", balance: "$0.00", customer: "Emma Langdon", issuedDate: "Aug 01, 2024", expiry: "Aug 01, 2025", status: "Redeemed" },
  { code: "GC-9954-HMQE", value: "$75.00", balance: "$75.00", customer: "Priya Nair", issuedDate: "Oct 20, 2024", expiry: "Oct 20, 2025", status: "Active" },
  { code: "GC-3367-CYTF", value: "$200.00", balance: "$0.00", customer: "Daniel Ferreira", issuedDate: "Jul 10, 2024", expiry: "Jul 10, 2025", status: "Redeemed" },
  { code: "GC-6648-SNKL", value: "$50.00", balance: "$20.00", customer: "Yuki Tanaka", issuedDate: "Oct 01, 2024", expiry: "Oct 01, 2025", status: "Active" },
]

const statusConfig: Record<CardStatus, { bg: string; color: string }> = {
  Active: { bg: "#DCFCE7", color: "#166534" },
  Redeemed: { bg: "#F3F4F6", color: "#6B7280" },
  Expired: { bg: "#FEE2E2", color: "#991B1B" },
  Pending: { bg: "#FEF9C3", color: "#854D0E" },
}

export default function GiftCardsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Gift Cards"
        description="Issue and manage digital gift cards"
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Marketing", href: "/admin/marketing" }, { label: "Gift Cards" }]}
        actions={
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-white hover:opacity-90 transition-opacity"
            style={{ backgroundColor: "var(--primary)", fontSize: "13px" }}
          >
            <Plus className="w-4 h-4" strokeWidth={1.5} />
            Issue Gift Card
          </button>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Issued", value: "234", sub: "all time", color: "var(--primary)" },
          { label: "Active Cards", value: "189", sub: "with balance remaining", color: "#166534" },
          { label: "Redeemed", value: "45", sub: "fully used", color: "#6B7280" },
          { label: "Outstanding Value", value: "$8,240", sub: "unredeemed balance", color: "#1D4ED8" },
        ].map((c) => (
          <div key={c.label} className="bg-white rounded-xl border border-border/50 p-4">
            <p className="text-muted-foreground" style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.07em" }}>{c.label}</p>
            <p className="font-semibold mt-1" style={{ fontSize: "22px", color: c.color }}>{c.value}</p>
            <p className="text-muted-foreground" style={{ fontSize: "11px" }}>{c.sub}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-border/50">
        <div className="px-5 py-4" style={{ borderBottom: "1px solid var(--accent)" }}>
          <p className="font-medium text-foreground" style={{ fontSize: "14px" }}>Gift Card Registry</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--accent)" }}>
                {["Code", "Value", "Balance", "Customer", "Issued Date", "Expiry", "Status", "Actions"].map((h) => (
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
              {giftCards.map((card, i) => {
                const cfg = statusConfig[card.status]
                const valueNum = parseFloat(card.value.replace(/[$,]/g, ""))
                const balanceNum = parseFloat(card.balance.replace(/[$,]/g, ""))
                const usedPct = valueNum > 0 ? ((valueNum - balanceNum) / valueNum) * 100 : 100
                return (
                  <tr
                    key={card.code}
                    className="hover:bg-[var(--muted)] transition-colors"
                    style={{ borderBottom: i < giftCards.length - 1 ? "1px solid var(--accent)" : "none" }}
                  >
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: "#FAF0F2" }}>
                          <Gift className="w-3.5 h-3.5" style={{ color: "var(--primary)" }} strokeWidth={1.5} />
                        </div>
                        <div>
                          <code className="font-mono text-foreground" style={{ fontSize: "12px" }}>{card.code}</code>
                          <button className="ml-1.5 text-muted-foreground hover:text-foreground transition-colors">
                            <Copy className="w-3 h-3" strokeWidth={1.5} />
                          </button>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="font-semibold text-foreground" style={{ fontSize: "14px" }}>{card.value}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="space-y-1">
                        <span className="font-medium" style={{ fontSize: "13px", color: balanceNum === 0 ? "#9CA3AF" : "#166534" }}>{card.balance}</span>
                        <div className="h-1 rounded-full w-20 overflow-hidden" style={{ backgroundColor: "var(--accent)" }}>
                          <div className="h-full rounded-full" style={{ width: `${usedPct}%`, backgroundColor: "var(--primary)" }} />
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-foreground" style={{ fontSize: "13px" }}>{card.customer}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-muted-foreground" style={{ fontSize: "12px" }}>{card.issuedDate}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-muted-foreground" style={{ fontSize: "12px" }}>{card.expiry}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span
                        className="inline-flex items-center rounded-full px-2.5 py-0.5 font-medium"
                        style={{ fontSize: "11px", backgroundColor: cfg.bg, color: cfg.color }}
                      >
                        {card.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-1">
                        <button className="p-1.5 rounded-lg hover:bg-[var(--accent)] transition-colors text-muted-foreground hover:text-foreground">
                          <Eye className="w-3.5 h-3.5" strokeWidth={1.5} />
                        </button>
                        <button className="p-1.5 rounded-lg hover:bg-[var(--accent)] transition-colors text-muted-foreground hover:text-foreground">
                          <Pencil className="w-3.5 h-3.5" strokeWidth={1.5} />
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
          <p className="text-muted-foreground" style={{ fontSize: "12px" }}>Showing 6 of 234 gift cards</p>
        </div>
      </div>
    </div>
  )
}
