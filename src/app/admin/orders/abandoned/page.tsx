import { ShoppingCart, Mail, Clock } from "lucide-react"
import { PageHeader } from "@/components/admin/page-header"

const carts = [
  {
    cartId: "CART-7841",
    customer: "Guest User",
    email: "guest_a7k2@email.com",
    avatar: "G",
    products: ["Classic White Tee", "Straight-Leg Jeans"],
    cartValue: "$128.00",
    abandonedAt: "Oct 24, 2026 · 8:14 AM",
    recoveryStatus: "Not Sent",
  },
  {
    cartId: "CART-7835",
    customer: "Rebecca Ford",
    email: "rebecca.f@email.com",
    avatar: "R",
    products: ["Silk Wrap Blouse", "Leather Belt", "Tote Bag"],
    cartValue: "$234.50",
    abandonedAt: "Oct 23, 2026 · 7:02 PM",
    recoveryStatus: "Email Sent",
  },
  {
    cartId: "CART-7829",
    customer: "Guest User",
    email: "guest_m9q1@email.com",
    avatar: "G",
    products: ["Knit Cardigan (S)"],
    cartValue: "$59.00",
    abandonedAt: "Oct 23, 2026 · 3:45 PM",
    recoveryStatus: "Not Sent",
  },
  {
    cartId: "CART-7822",
    customer: "Dylan Reed",
    email: "dylan.r@email.com",
    avatar: "D",
    products: ["Chino Trousers", "Oxford Shirt", "Canvas Sneakers"],
    cartValue: "$197.00",
    abandonedAt: "Oct 22, 2026 · 11:30 AM",
    recoveryStatus: "Recovered",
  },
  {
    cartId: "CART-7815",
    customer: "Guest User",
    email: "guest_p3x8@email.com",
    avatar: "G",
    products: ["Summer Floral Dress"],
    cartValue: "$72.00",
    abandonedAt: "Oct 22, 2026 · 9:00 AM",
    recoveryStatus: "Email Sent",
  },
  {
    cartId: "CART-7810",
    customer: "Fiona Grant",
    email: "fiona.g@email.com",
    avatar: "F",
    products: ["Cashmere Scarf", "Wool Coat"],
    cartValue: "$385.00",
    abandonedAt: "Oct 21, 2026 · 6:55 PM",
    recoveryStatus: "Not Sent",
  },
]

const recoveryStyles: Record<string, string> = {
  "Not Sent":  "bg-gray-100 text-gray-600",
  "Email Sent":"bg-blue-50 text-blue-700",
  "Recovered": "bg-emerald-50 text-emerald-700",
}

export default function AbandonedCheckoutsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Abandoned Checkouts"
        description="Carts left behind — send recovery emails to win them back"
        breadcrumbs={[
          { label: "Admin",  href: "/admin" },
          { label: "Orders", href: "/admin/orders" },
          { label: "Abandoned" },
        ]}
        actions={
          <div className="flex items-center gap-3">
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-medium bg-gray-100 text-gray-600"
              style={{ fontSize: "12px" }}
            >
              <ShoppingCart className="w-3.5 h-3.5" strokeWidth={2} />
              {carts.length} Abandoned
            </span>
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-white font-medium transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#501D2A", fontSize: "13px" }}
            >
              <Mail className="w-4 h-4" strokeWidth={1.5} />
              Send All Recovery Emails
            </button>
          </div>
        }
      />

      {/* Summary strip */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total Abandoned Value", value: `$${carts.reduce((s, c) => s + parseFloat(c.cartValue.replace("$", "")), 0).toFixed(2)}`, color: "text-foreground" },
          { label: "Emails Sent",           value: carts.filter((c) => c.recoveryStatus === "Email Sent").length.toString(), color: "text-blue-700" },
          { label: "Recovered",             value: carts.filter((c) => c.recoveryStatus === "Recovered").length.toString(),  color: "text-emerald-700" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-border/50 p-4">
            <p className="text-muted-foreground mb-1" style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.07em" }}>
              {s.label}
            </p>
            <p className={`font-semibold ${s.color}`} style={{ fontSize: "20px" }}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-border/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid #F0EDEF" }}>
                {["Cart ID", "Customer / Email", "Products", "Cart Value", "Abandoned At", "Recovery Status", "Actions"].map((h) => (
                  <th
                    key={h}
                    className="text-left px-5 py-3.5 text-muted-foreground font-medium whitespace-nowrap"
                    style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.07em" }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {carts.map((cart, i) => (
                <tr
                  key={cart.cartId}
                  className="hover:bg-[#F8F7F5] transition-colors"
                  style={{ borderBottom: i < carts.length - 1 ? "1px solid #F0EDEF" : "none" }}
                >
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <ShoppingCart className="w-3.5 h-3.5 text-muted-foreground" strokeWidth={1.5} />
                      <span className="font-semibold text-foreground" style={{ fontSize: "13px" }}>{cart.cartId}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center text-white shrink-0"
                        style={{ backgroundColor: "#501D2A", fontSize: "11px", fontWeight: 600 }}
                      >
                        {cart.avatar}
                      </div>
                      <div>
                        <p className="text-foreground" style={{ fontSize: "13px" }}>{cart.customer}</p>
                        <p className="text-muted-foreground" style={{ fontSize: "11px" }}>{cart.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="max-w-[200px]">
                      {cart.products.map((p, pi) => (
                        <span key={pi} className="block text-muted-foreground truncate" style={{ fontSize: "12px" }}>
                          {p}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="font-medium text-foreground" style={{ fontSize: "13px" }}>{cart.cartValue}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3 h-3 text-muted-foreground" strokeWidth={1.5} />
                      <span className="text-muted-foreground whitespace-nowrap" style={{ fontSize: "12px" }}>{cart.abandonedAt}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 font-medium whitespace-nowrap ${recoveryStyles[cart.recoveryStatus] ?? "bg-gray-100 text-gray-600"}`}
                      style={{ fontSize: "11px" }}
                    >
                      {cart.recoveryStatus}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    {cart.recoveryStatus !== "Recovered" ? (
                      <button
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-white font-medium transition-opacity hover:opacity-90 whitespace-nowrap"
                        style={{ backgroundColor: "#501D2A", fontSize: "12px" }}
                      >
                        <Mail className="w-3.5 h-3.5" strokeWidth={1.5} />
                        Send Recovery Email
                      </button>
                    ) : (
                      <span className="text-emerald-700 font-medium" style={{ fontSize: "12px" }}>
                        Order Recovered
                      </span>
                    )}
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
