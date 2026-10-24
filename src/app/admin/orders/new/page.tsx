"use client"

import { useState } from "react"
import {
  Search, Trash2, User, MapPin, CreditCard, FileText, Package,
  Truck, Smartphone, Building2, Plus, X, CheckCircle,
} from "lucide-react"
import { PageHeader } from "@/components/admin/page-header"

// ─── Types matching Prisma schema ───────────────────────────────────────────

type PaymentMethod = "COD" | "BKASH" | "NAGAD" | "CARD" | "BANK_TRANSFER"
type PaymentStatus = "PENDING" | "PAID" | "FAILED"

interface OrderItem {
  id: number
  productName: string
  sizeName: string
  colorName: string
  sku: string
  unitPrice: number
  quantity: number
}

interface Customer {
  id: string
  name: string
  email: string
  phone: string
  initials: string
}

// ─── Static data ─────────────────────────────────────────────────────────────

const sampleCustomers: Customer[] = [
  { id: "u1", name: "Sarah Johnson",  email: "sarah@email.com",   phone: "+880 1711-111111", initials: "SJ" },
  { id: "u2", name: "Michael Chen",   email: "michael@email.com", phone: "+880 1722-222222", initials: "MC" },
  { id: "u3", name: "Emma Wilson",    email: "emma@email.com",    phone: "+880 1733-333333", initials: "EW" },
]

const initialItems: OrderItem[] = [
  { id: 1, productName: "Classic White Tee", sizeName: "S", colorName: "White", sku: "CLT-S-WHT", unitPrice: 850,  quantity: 2 },
  { id: 2, productName: "Silk Blouse",        sizeName: "M", colorName: "Beige", sku: "SKBLOU-M-BEI", unitPrice: 2400, quantity: 1 },
]

const paymentMethods: { value: PaymentMethod; label: string; desc: string; Icon: React.ElementType }[] = [
  { value: "COD",           label: "COD",           desc: "Cash on Delivery",        Icon: Truck },
  { value: "BKASH",         label: "BKASH",         desc: "bKash Mobile Banking",    Icon: Smartphone },
  { value: "NAGAD",         label: "NAGAD",         desc: "Nagad Mobile Banking",    Icon: Smartphone },
  { value: "CARD",          label: "CARD",          desc: "Credit / Debit Card",     Icon: CreditCard },
  { value: "BANK_TRANSFER", label: "BANK TRANSFER", desc: "Bank Transfer",           Icon: Building2 },
]

// ─── Helpers ─────────────────────────────────────────────────────────────────

const inputCls =
  "w-full px-3 py-2.5 rounded-lg border border-border/60 bg-white text-foreground focus:outline-none focus:border-primary/50 transition-colors"
const labelCls = "block font-medium text-foreground mb-1.5"

function SectionCard({ icon: Icon, title, children }: { icon?: React.ElementType; title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl border border-border/50 p-5">
      <div className="flex items-center gap-2 mb-4" style={{ borderBottom: "1px solid #F0EDEF", paddingBottom: "12px" }}>
        {Icon && (
          <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#F0EDEF" }}>
            <Icon className="w-3.5 h-3.5" style={{ color: "#501D2A" }} strokeWidth={1.5} />
          </div>
        )}
        <h2 className="font-semibold text-foreground" style={{ fontSize: "14px" }}>{title}</h2>
      </div>
      {children}
    </div>
  )
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function CreateOrderPage() {
  const [customerQuery, setCustomerQuery] = useState("")
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)

  const [shippingName, setShippingName]       = useState("")
  const [shippingPhone, setShippingPhone]     = useState("")
  const [shippingAddress, setShippingAddress] = useState("")
  const [shippingCity, setShippingCity]       = useState("")

  const [items, setItems]                     = useState<OrderItem[]>(initialItems)
  const [shippingCost, setShippingCost]       = useState(80)
  const [discount, setDiscount]               = useState(0)

  const [paymentMethod, setPaymentMethod]     = useState<PaymentMethod>("COD")
  const [paymentStatus, setPaymentStatus]     = useState<PaymentStatus>("PENDING")
  const [transactionId, setTransactionId]     = useState("")
  const [notes, setNotes]                     = useState("")

  // Filtered customers
  const filteredCustomers = customerQuery.trim()
    ? sampleCustomers.filter(
        (c) =>
          c.name.toLowerCase().includes(customerQuery.toLowerCase()) ||
          c.email.toLowerCase().includes(customerQuery.toLowerCase()),
      )
    : sampleCustomers

  // Order summary calculations
  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0)
  const total    = subtotal + shippingCost - discount

  const removeItem = (id: number) => setItems((prev) => prev.filter((i) => i.id !== id))
  const updateQty  = (id: number, qty: number) =>
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, quantity: Math.max(1, qty) } : i)))

  const formatBDT = (n: number) => `BDT ${n.toLocaleString("en-BD")}`

  return (
    <div className="space-y-6" style={{ backgroundColor: "#F8F7F5", minHeight: "100vh" }}>
      <PageHeader
        title="Create New Order"
        description="Manually create an order on behalf of a customer"
        breadcrumbs={[
          { label: "Admin",  href: "/admin" },
          { label: "Orders", href: "/admin/orders" },
          { label: "New Order" },
        ]}
      />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* ── Left column (2/3) ── */}
        <div className="xl:col-span-2 space-y-5">

          {/* Customer */}
          <SectionCard icon={User} title="Customer">
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
              <input
                type="text"
                placeholder="Search by name or email..."
                value={customerQuery}
                onChange={(e) => {
                  setCustomerQuery(e.target.value)
                  if (selectedCustomer) setSelectedCustomer(null)
                }}
                className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-border/60 bg-white text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                style={{ fontSize: "13px" }}
              />
            </div>

            {/* Customer radio cards */}
            {!selectedCustomer && (
              <div className="space-y-2">
                {filteredCustomers.map((c) => (
                  <label
                    key={c.id}
                    className="flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors hover:border-primary/40"
                    style={{ borderColor: "#F0EDEF" }}
                  >
                    <input
                      type="radio"
                      name="customer"
                      className="accent-[#501D2A] shrink-0"
                      onChange={() => {
                        setSelectedCustomer(c)
                        setCustomerQuery(c.name)
                        setShippingName(c.name)
                        setShippingPhone(c.phone)
                      }}
                    />
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white shrink-0 font-semibold"
                      style={{ backgroundColor: "#501D2A", fontSize: "11px" }}
                    >
                      {c.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground" style={{ fontSize: "13px" }}>{c.name}</p>
                      <p className="text-muted-foreground" style={{ fontSize: "11px" }}>{c.email} · {c.phone}</p>
                    </div>
                  </label>
                ))}
              </div>
            )}

            {/* Selected customer card */}
            {selectedCustomer && (
              <div
                className="flex items-center gap-3 p-3 rounded-lg"
                style={{ backgroundColor: "#F8F7F5", border: "1px solid #F0EDEF" }}
              >
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white shrink-0 font-semibold"
                  style={{ backgroundColor: "#501D2A", fontSize: "12px" }}
                >
                  {selectedCustomer.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground" style={{ fontSize: "13px" }}>{selectedCustomer.name}</p>
                  <p className="text-muted-foreground truncate" style={{ fontSize: "12px" }}>
                    {selectedCustomer.email} · {selectedCustomer.phone}
                  </p>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-500" strokeWidth={1.5} />
                  <button
                    onClick={() => { setSelectedCustomer(null); setCustomerQuery("") }}
                    className="text-muted-foreground hover:text-red-500 transition-colors ml-1"
                  >
                    <X className="w-3.5 h-3.5" strokeWidth={2} />
                  </button>
                </div>
              </div>
            )}
          </SectionCard>

          {/* Shipping Address */}
          <SectionCard icon={MapPin} title="Shipping Address">
            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className={labelCls} style={{ fontSize: "12px" }}>
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={shippingName}
                    onChange={(e) => setShippingName(e.target.value)}
                    placeholder="Recipient full name"
                    className={inputCls}
                    style={{ fontSize: "13px" }}
                    required
                  />
                </div>
                <div>
                  <label className={labelCls} style={{ fontSize: "12px" }}>
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={shippingPhone}
                    onChange={(e) => setShippingPhone(e.target.value)}
                    placeholder="+880 1X-XXXXXXXX"
                    className={inputCls}
                    style={{ fontSize: "13px" }}
                    required
                  />
                </div>
              </div>
              <div>
                <label className={labelCls} style={{ fontSize: "12px" }}>
                  Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  placeholder="House, Road, Area"
                  className={inputCls}
                  style={{ fontSize: "13px" }}
                  required
                />
              </div>
              <div>
                <label className={labelCls} style={{ fontSize: "12px" }}>
                  City <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={shippingCity}
                  onChange={(e) => setShippingCity(e.target.value)}
                  placeholder="Dhaka"
                  className={inputCls}
                  style={{ fontSize: "13px" }}
                  required
                />
              </div>
              <p className="text-muted-foreground" style={{ fontSize: "11px" }}>
                This address will be used for delivery
              </p>
            </div>
          </SectionCard>

          {/* Order Items */}
          <SectionCard icon={Package} title="Order Items">
            {/* Product search */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
              <input
                type="text"
                placeholder="Search and add products..."
                className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-border/60 bg-white text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                style={{ fontSize: "13px" }}
              />
            </div>

            {/* Add item row */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-4 p-3 rounded-lg" style={{ backgroundColor: "#F8F7F5", border: "1px solid #F0EDEF" }}>
              <div>
                <label className={labelCls} style={{ fontSize: "11px" }}>Product</label>
                <select className="w-full px-2.5 py-2 rounded-lg border border-border/60 bg-white text-foreground focus:outline-none focus:border-primary/50 transition-colors appearance-none" style={{ fontSize: "12px" }}>
                  <option>Classic White Tee</option>
                  <option>Silk Blouse</option>
                  <option>Denim Jacket</option>
                </select>
              </div>
              <div>
                <label className={labelCls} style={{ fontSize: "11px" }}>Size</label>
                <select className="w-full px-2.5 py-2 rounded-lg border border-border/60 bg-white text-foreground focus:outline-none focus:border-primary/50 transition-colors appearance-none" style={{ fontSize: "12px" }}>
                  <option>S</option><option>M</option><option>L</option><option>XL</option>
                </select>
              </div>
              <div>
                <label className={labelCls} style={{ fontSize: "11px" }}>Color</label>
                <select className="w-full px-2.5 py-2 rounded-lg border border-border/60 bg-white text-foreground focus:outline-none focus:border-primary/50 transition-colors appearance-none" style={{ fontSize: "12px" }}>
                  <option>White</option><option>Beige</option><option>Black</option>
                </select>
              </div>
              <div>
                <label className={labelCls} style={{ fontSize: "11px" }}>Qty</label>
                <input
                  type="number"
                  defaultValue={1}
                  min={1}
                  className="w-full px-2.5 py-2 rounded-lg border border-border/60 bg-white text-foreground focus:outline-none focus:border-primary/50 transition-colors"
                  style={{ fontSize: "12px" }}
                />
              </div>
              <div>
                <label className={labelCls} style={{ fontSize: "11px" }}>Unit Price (BDT)</label>
                <input
                  type="number"
                  defaultValue={850}
                  min={0}
                  className="w-full px-2.5 py-2 rounded-lg border border-border/60 bg-white text-foreground focus:outline-none focus:border-primary/50 transition-colors"
                  style={{ fontSize: "12px" }}
                />
              </div>
              <div className="col-span-2 sm:col-span-5 flex justify-end">
                <button
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-white font-medium transition-opacity hover:opacity-90"
                  style={{ backgroundColor: "#501D2A", fontSize: "12px" }}
                >
                  <Plus className="w-3.5 h-3.5" strokeWidth={2} />
                  Add Item
                </button>
              </div>
            </div>

            {/* Items table */}
            <div className="rounded-lg overflow-hidden" style={{ border: "1px solid #F0EDEF" }}>
              <table className="w-full">
                <thead>
                  <tr style={{ backgroundColor: "#F8F7F5", borderBottom: "1px solid #F0EDEF" }}>
                    {["Product", "Size / Color", "SKU", "Unit Price", "Qty", "Total", ""].map((h) => (
                      <th
                        key={h}
                        className="text-left px-4 py-2.5 text-muted-foreground font-medium whitespace-nowrap"
                        style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.07em" }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, i) => (
                    <tr
                      key={item.id}
                      className="hover:bg-[#F8F7F5] transition-colors"
                      style={{ borderBottom: i < items.length - 1 ? "1px solid #F0EDEF" : "none" }}
                    >
                      <td className="px-4 py-3">
                        <span className="font-medium text-foreground" style={{ fontSize: "13px" }}>{item.productName}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-muted-foreground" style={{ fontSize: "12px" }}>
                          {item.sizeName} / {item.colorName}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="font-mono text-muted-foreground" style={{ fontSize: "11px" }}>{item.sku}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-foreground" style={{ fontSize: "13px" }}>
                          BDT {item.unitPrice.toLocaleString("en-BD")}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          value={item.quantity}
                          min={1}
                          onChange={(e) => updateQty(item.id, parseInt(e.target.value) || 1)}
                          className="w-14 px-2 py-1 rounded border border-border/60 text-foreground text-center focus:outline-none focus:border-primary/50 transition-colors"
                          style={{ fontSize: "13px" }}
                        />
                      </td>
                      <td className="px-4 py-3">
                        <span className="font-medium text-foreground" style={{ fontSize: "13px" }}>
                          BDT {(item.unitPrice * item.quantity).toLocaleString("en-BD")}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-muted-foreground hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" strokeWidth={1.5} />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {items.length === 0 && (
                    <tr>
                      <td colSpan={7} className="px-4 py-8 text-center text-muted-foreground" style={{ fontSize: "13px" }}>
                        No items added yet
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </SectionCard>

          {/* Order Notes */}
          <SectionCard icon={FileText} title="Order Notes">
            <div>
              <label className={labelCls} style={{ fontSize: "12px" }}>Internal Notes (optional)</label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add any internal notes about this order — not visible to customer..."
                className="w-full px-3 py-2.5 rounded-lg border border-border/60 bg-white text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors resize-none"
                style={{ fontSize: "13px" }}
              />
            </div>
          </SectionCard>
        </div>

        {/* ── Right column (1/3) ── */}
        <div className="xl:col-span-1 space-y-5">

          {/* Order Summary */}
          <div className="bg-white rounded-xl border border-border/50 p-5 sticky top-6">
            <h2 className="font-semibold text-foreground mb-4" style={{ fontSize: "14px" }}>Order Summary</h2>

            {/* Line items */}
            <div className="space-y-2 mb-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-foreground truncate" style={{ fontSize: "12px", fontWeight: 500 }}>
                      {item.productName} ({item.sizeName}/{item.colorName})
                    </p>
                    <p className="text-muted-foreground" style={{ fontSize: "11px" }}>× {item.quantity}</p>
                  </div>
                  <span className="text-foreground shrink-0" style={{ fontSize: "13px" }}>
                    BDT {(item.unitPrice * item.quantity).toLocaleString("en-BD")}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-3 pt-4" style={{ borderTop: "1px solid #F0EDEF" }}>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground" style={{ fontSize: "13px" }}>Subtotal</span>
                <span className="text-foreground" style={{ fontSize: "13px" }}>{formatBDT(subtotal)}</span>
              </div>

              {/* Shipping cost */}
              <div className="flex items-center justify-between gap-3">
                <span className="text-muted-foreground shrink-0" style={{ fontSize: "13px" }}>Shipping (BDT)</span>
                <input
                  type="number"
                  value={shippingCost}
                  min={0}
                  onChange={(e) => setShippingCost(Number(e.target.value) || 0)}
                  className="w-24 px-2.5 py-1.5 rounded-lg border border-border/60 bg-white text-foreground text-right focus:outline-none focus:border-primary/50 transition-colors"
                  style={{ fontSize: "13px" }}
                />
              </div>

              {/* Discount */}
              <div className="flex items-center justify-between gap-3">
                <span className="text-muted-foreground shrink-0" style={{ fontSize: "13px" }}>Discount (BDT)</span>
                <input
                  type="number"
                  value={discount}
                  min={0}
                  onChange={(e) => setDiscount(Number(e.target.value) || 0)}
                  className="w-24 px-2.5 py-1.5 rounded-lg border border-border/60 bg-white text-foreground text-right focus:outline-none focus:border-primary/50 transition-colors"
                  style={{ fontSize: "13px" }}
                />
              </div>

              {/* Total */}
              <div
                className="flex items-center justify-between pt-3"
                style={{ borderTop: "1px solid #F0EDEF" }}
              >
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-foreground" style={{ fontSize: "15px" }}>Total</span>
                  <span
                    className="px-1.5 py-0.5 rounded font-medium text-white"
                    style={{ backgroundColor: "#501D2A", fontSize: "10px" }}
                  >
                    BDT
                  </span>
                </div>
                <span className="font-bold" style={{ fontSize: "20px", color: "#501D2A" }}>
                  {total.toLocaleString("en-BD")}
                </span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="mt-5 space-y-2.5">
              <button
                className="w-full py-2.5 rounded-lg text-white font-semibold transition-opacity hover:opacity-90"
                style={{ backgroundColor: "#501D2A", fontSize: "13px" }}
              >
                Create Order
              </button>
              <button
                className="w-full py-2.5 rounded-lg border border-border/60 text-muted-foreground hover:text-foreground hover:bg-[#F8F7F5] transition-colors font-medium"
                style={{ fontSize: "13px" }}
              >
                Save as Draft
              </button>
            </div>
          </div>

          {/* Payment */}
          <div className="bg-white rounded-xl border border-border/50 p-5">
            <div className="flex items-center gap-2 mb-4" style={{ borderBottom: "1px solid #F0EDEF", paddingBottom: "12px" }}>
              <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#F0EDEF" }}>
                <CreditCard className="w-3.5 h-3.5" style={{ color: "#501D2A" }} strokeWidth={1.5} />
              </div>
              <h2 className="font-semibold text-foreground" style={{ fontSize: "14px" }}>Payment</h2>
            </div>

            {/* Payment method radio cards */}
            <div className="space-y-2 mb-4">
              {paymentMethods.map(({ value, label, desc, Icon }) => {
                const selected = paymentMethod === value
                return (
                  <label
                    key={value}
                    className="flex items-center gap-3 p-2.5 rounded-lg border cursor-pointer transition-colors"
                    style={{
                      borderColor: selected ? "#501D2A" : "#E5E3E0",
                      backgroundColor: selected ? "#F9F5F6" : "transparent",
                    }}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={value}
                      checked={selected}
                      onChange={() => setPaymentMethod(value)}
                      className="accent-[#501D2A] shrink-0"
                    />
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                      style={{ backgroundColor: selected ? "#501D2A" : "#F0EDEF" }}
                    >
                      <Icon
                        className="w-3.5 h-3.5"
                        style={{ color: selected ? "#fff" : "#501D2A" }}
                        strokeWidth={1.5}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground" style={{ fontSize: "12px" }}>{label}</p>
                      <p className="text-muted-foreground truncate" style={{ fontSize: "10px" }}>{desc}</p>
                    </div>
                  </label>
                )
              })}
            </div>

            {/* Payment Status */}
            <div className="mb-3">
              <label className={labelCls} style={{ fontSize: "12px" }}>Payment Status</label>
              <select
                value={paymentStatus}
                onChange={(e) => setPaymentStatus(e.target.value as PaymentStatus)}
                className="w-full px-3 py-2.5 rounded-lg border border-border/60 bg-white text-foreground focus:outline-none focus:border-primary/50 transition-colors appearance-none"
                style={{ fontSize: "13px" }}
              >
                <option value="PENDING">PENDING</option>
                <option value="PAID">PAID</option>
                <option value="FAILED">FAILED</option>
              </select>
            </div>

            {/* Transaction ID */}
            <div>
              <label className={labelCls} style={{ fontSize: "12px" }}>Transaction ID (optional)</label>
              <input
                type="text"
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
                placeholder="e.g. TXN-2026XXXX"
                className={inputCls}
                style={{ fontSize: "13px" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
