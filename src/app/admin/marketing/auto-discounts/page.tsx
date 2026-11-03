import { PageHeader } from "@/components/admin/page-header"
import { Plus, Pencil, Trash2, Settings2 } from "lucide-react"

type RuleStatus = "Active" | "Inactive"

interface AutoDiscount {
  name: string
  type: string
  conditions: string
  discount: string
  priority: number
  usageCount: number
  status: RuleStatus
}

const rules: AutoDiscount[] = [
  {
    name: "Buy 2 Get 10% Off",
    type: "Cart Quantity",
    conditions: "Min 2 items in cart",
    discount: "10% off entire cart",
    priority: 1,
    usageCount: 342,
    status: "Active",
  },
  {
    name: "Free Shipping over $50",
    type: "Order Threshold",
    conditions: "Cart subtotal ≥ $50",
    discount: "Free standard shipping",
    priority: 2,
    usageCount: 891,
    status: "Active",
  },
  {
    name: "Spend $150 Save $20",
    type: "Order Threshold",
    conditions: "Cart subtotal ≥ $150",
    discount: "$20 off order total",
    priority: 3,
    usageCount: 156,
    status: "Active",
  },
  {
    name: "Category Bundle Deal",
    type: "Category Rule",
    conditions: "3+ items from Dresses",
    discount: "15% off Dresses",
    priority: 4,
    usageCount: 0,
    status: "Inactive",
  },
]

export default function AutoDiscountsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Automatic Discounts"
        description="Rules-based discounts applied automatically at checkout"
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Marketing", href: "/admin/marketing" }, { label: "Auto Discounts" }]}
        actions={
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-white hover:opacity-90 transition-opacity"
            style={{ backgroundColor: "var(--primary)", fontSize: "13px" }}
          >
            <Plus className="w-4 h-4" strokeWidth={1.5} />
            Add Rule
          </button>
        }
      />

      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Rules", value: "4", sub: "defined" },
          { label: "Active Rules", value: "3", sub: "running now" },
          { label: "Total Activations", value: "1,389", sub: "all time" },
          { label: "Revenue Influenced", value: "$8,340", sub: "this month" },
        ].map((c) => (
          <div key={c.label} className="bg-white rounded-xl border border-border/50 p-4">
            <p className="text-muted-foreground" style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.07em" }}>{c.label}</p>
            <p className="font-semibold text-foreground mt-1" style={{ fontSize: "22px" }}>{c.value}</p>
            <p className="text-muted-foreground" style={{ fontSize: "11px" }}>{c.sub}</p>
          </div>
        ))}
      </div>

      {/* Rules table */}
      <div className="bg-white rounded-xl border border-border/50">
        <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid var(--accent)" }}>
          <div>
            <p className="font-medium text-foreground" style={{ fontSize: "14px" }}>Discount Rules</p>
            <p className="text-muted-foreground" style={{ fontSize: "12px" }}>Drag to change priority order</p>
          </div>
          <Settings2 className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--accent)" }}>
                {["Priority", "Rule Name", "Type", "Conditions", "Discount", "Uses", "Status", "Actions"].map((h) => (
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
              {rules.map((rule, i) => (
                <tr
                  key={rule.name}
                  className="hover:bg-[var(--muted)] transition-colors"
                  style={{ borderBottom: i < rules.length - 1 ? "1px solid var(--accent)" : "none" }}
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded flex items-center justify-center text-white font-semibold shrink-0" style={{ backgroundColor: "var(--primary)", fontSize: "11px" }}>
                        {rule.priority}
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <p className="font-medium text-foreground" style={{ fontSize: "13px" }}>{rule.name}</p>
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className="inline-flex items-center rounded-full px-2.5 py-0.5 font-medium"
                      style={{ fontSize: "11px", backgroundColor: "#EFF6FF", color: "#1D4ED8" }}
                    >
                      {rule.type}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-muted-foreground" style={{ fontSize: "12px" }}>{rule.conditions}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="font-medium" style={{ fontSize: "13px", color: "#166534" }}>{rule.discount}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-foreground" style={{ fontSize: "13px" }}>{rule.usageCount.toLocaleString()}</span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        className="relative inline-flex items-center rounded-full shrink-0 transition-colors"
                        style={{
                          width: "36px", height: "20px",
                          backgroundColor: rule.status === "Active" ? "var(--primary)" : "#D1D5DB"
                        }}
                      >
                        <span
                          className="inline-block w-4 h-4 rounded-full bg-white shadow-sm transform transition-transform"
                          style={{ transform: rule.status === "Active" ? "translateX(18px)" : "translateX(2px)" }}
                        />
                      </button>
                      <span
                        className="text-muted-foreground"
                        style={{ fontSize: "12px" }}
                      >
                        {rule.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
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
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-5 py-4 rounded-b-xl" style={{ borderTop: "1px solid var(--accent)", backgroundColor: "var(--muted)" }}>
          <p className="text-muted-foreground" style={{ fontSize: "12px" }}>
            Rules are evaluated in priority order. First matching rule wins.
          </p>
        </div>
      </div>
    </div>
  )
}
