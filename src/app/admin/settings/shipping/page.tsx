"use client"

import { useState } from "react"
import { PageHeader } from "@/components/admin/page-header"
import { Truck, Plus, Info } from "lucide-react"

// No Prisma model — static config
// Note: Order.shippingCost stores the shipping cost at time of order placement.
interface ShippingMethod {
  id: string
  name: string
  zone: string
  price: number      // BDT
  estimatedDays: string
  isActive: boolean
}

const initialMethods: ShippingMethod[] = [
  { id: "sh-001", name: "Inside Dhaka",    zone: "Dhaka City",    price: 60,  estimatedDays: "1-2 days",   isActive: true  },
  { id: "sh-002", name: "Outside Dhaka",   zone: "Nationwide",    price: 120, estimatedDays: "3-5 days",   isActive: true  },
  { id: "sh-003", name: "Express (Dhaka)", zone: "Dhaka City",    price: 150, estimatedDays: "Same day",   isActive: true  },
  { id: "sh-004", name: "International",   zone: "International", price: 800, estimatedDays: "7-14 days",  isActive: false },
]

export default function ShippingPage() {
  const [methods, setMethods] = useState<ShippingMethod[]>(initialMethods)

  function toggleActive(id: string) {
    setMethods((prev) => prev.map((m) => m.id === id ? { ...m, isActive: !m.isActive } : m))
  }

  function updatePrice(id: string, val: string) {
    const num = parseInt(val, 10)
    if (isNaN(num) || num < 0) return
    setMethods((prev) => prev.map((m) => m.id === id ? { ...m, price: num } : m))
  }

  function updateDays(id: string, val: string) {
    setMethods((prev) => prev.map((m) => m.id === id ? { ...m, estimatedDays: val } : m))
  }

  function handleSave() {
    alert("Shipping configuration saved.")
  }

  return (
    <div style={{ backgroundColor: "#F8F7F5", minHeight: "100%" }}>
      <PageHeader
        title="Shipping Methods"
        description="Configure shipping zones and rates for customer orders"
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Settings", href: "/admin/settings" }, { label: "Shipping" }]}
        actions={
          <button
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-white transition-colors"
            style={{ fontSize: "13px", backgroundColor: "#501D2A" }}
          >
            <Plus className="w-4 h-4" strokeWidth={1.5} />
            Add Custom Method
          </button>
        }
      />

      <div className="max-w-3xl space-y-5">
        {/* Info note */}
        <div className="flex items-start gap-2.5 px-4 py-3 rounded-lg border border-blue-200/60 bg-blue-50" style={{ fontSize: "12px" }}>
          <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" strokeWidth={1.5} />
          <p className="text-blue-700">
            <strong>Note:</strong> <code className="font-mono">Order.shippingCost</code> field stores the shipping cost at time of order.
            Changes here apply to new orders only.
          </p>
        </div>

        {/* Shipping Methods Card */}
        <div className="bg-white rounded-xl border border-border/50">
          <div className="px-5 py-4 flex items-center gap-3" style={{ borderBottom: "1px solid #F0EDEF" }}>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#501D2A15" }}>
              <Truck className="w-4 h-4" style={{ color: "#501D2A" }} strokeWidth={1.5} />
            </div>
            <div>
              <h2 className="font-semibold text-foreground" style={{ fontSize: "14px" }}>Shipping Methods</h2>
              <p className="text-muted-foreground" style={{ fontSize: "12px" }}>Toggle, edit price and delivery estimate per method</p>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: "1px solid #F0EDEF" }}>
                  {["Method", "Zone", "Price (BDT)", "Est. Delivery", "Active"].map((h) => (
                    <th key={h} className="text-left px-5 py-3 text-muted-foreground font-medium" style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.07em" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {methods.map((m, i) => (
                  <tr
                    key={m.id}
                    className="hover:bg-[#F8F7F5] transition-colors"
                    style={{ borderBottom: i < methods.length - 1 ? "1px solid #F0EDEF" : "none" }}
                  >
                    {/* Name */}
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <Truck className="w-4 h-4 text-muted-foreground shrink-0" strokeWidth={1.5} />
                        <span className="font-medium text-foreground" style={{ fontSize: "13px" }}>{m.name}</span>
                      </div>
                    </td>
                    {/* Zone */}
                    <td className="px-5 py-3 text-muted-foreground" style={{ fontSize: "13px" }}>{m.zone}</td>
                    {/* Price — editable */}
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-1.5">
                        <span className="text-muted-foreground" style={{ fontSize: "13px" }}>৳</span>
                        <input
                          type="number"
                          min="0"
                          value={m.price}
                          onChange={(e) => updatePrice(m.id, e.target.value)}
                          className="w-20 px-2 py-1.5 rounded-lg border border-border/60 bg-white text-foreground focus:outline-none focus:border-primary/50 text-center"
                          style={{ fontSize: "13px" }}
                        />
                      </div>
                    </td>
                    {/* Estimated days — editable */}
                    <td className="px-5 py-3">
                      <input
                        type="text"
                        value={m.estimatedDays}
                        onChange={(e) => updateDays(m.id, e.target.value)}
                        className="w-28 px-2 py-1.5 rounded-lg border border-border/60 bg-white text-foreground focus:outline-none focus:border-primary/50"
                        style={{ fontSize: "13px" }}
                      />
                    </td>
                    {/* Toggle active */}
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleActive(m.id)}
                          className="relative inline-flex w-10 h-5 rounded-full transition-colors focus:outline-none"
                          style={{ backgroundColor: m.isActive ? "#501D2A" : "#E5E7EB" }}
                          aria-label={`Toggle ${m.name}`}
                        >
                          <span
                            className="absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform"
                            style={{ left: m.isActive ? "calc(100% - 18px)" : "2px" }}
                          />
                        </button>
                        <span
                          className="font-medium"
                          style={{ fontSize: "12px", color: m.isActive ? "#059669" : "#9CA3AF" }}
                        >
                          {m.isActive ? "Active" : "Inactive"}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-end px-5 py-4" style={{ borderTop: "1px solid #F0EDEF" }}>
            <button
              onClick={handleSave}
              className="px-4 py-2 rounded-lg text-white transition-colors"
              style={{ fontSize: "13px", backgroundColor: "#501D2A" }}
            >
              Save Shipping Config
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
