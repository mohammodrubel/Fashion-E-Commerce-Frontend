"use client"

import { useState } from "react"
import { PageHeader } from "@/components/admin/page-header"
import { Store, Building2, Save, Info } from "lucide-react"

// PaymentMethod enum from Prisma (referenced here for context)
// enum PaymentMethod { COD BKASH NAGAD CARD BANK_TRANSFER }
// Order status mapped to Prisma OrderStatus enum
const ORDER_STATUSES = ["PENDING", "CONFIRMED", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED", "RETURNED"] as const
type OrderStatus = typeof ORDER_STATUSES[number]

export default function GeneralSettingsPage() {
  const [storeName,     setStoreName]     = useState("LumaStyle")
  const [storeEmail,    setStoreEmail]    = useState("hello@lumastyle.com")
  const [storePhone,    setStorePhone]    = useState("+880 2-55000000")
  const [orderPrefix,   setOrderPrefix]   = useState("LS-")
  const [defaultStatus, setDefaultStatus] = useState<OrderStatus>("PENDING")

  const [bizReg,     setBizReg]     = useState("")
  const [bizAddress, setBizAddress] = useState("")
  const [bizCity,    setBizCity]    = useState("Dhaka, Bangladesh")

  function handleSave() {
    alert(`Settings saved for: ${storeName}`)
  }

  const labelClass   = "block font-medium text-foreground mb-1.5"
  const inputClass   = "w-full px-3 py-2.5 rounded-lg border border-border/60 bg-white text-foreground focus:outline-none focus:border-primary/50"
  const readonlyClass= "w-full px-3 py-2.5 rounded-lg border border-border/60 bg-[#F8F7F5] text-muted-foreground cursor-not-allowed"

  return (
    <div style={{ backgroundColor: "#F8F7F5", minHeight: "100%" }}>
      <PageHeader
        title="General Settings"
        description="Configure your store's basic information and preferences"
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Settings", href: "/admin/settings" }, { label: "General" }]}
      />

      <div className="max-w-2xl space-y-6">
        {/* Card: Store Configuration */}
        <div className="bg-white rounded-xl border border-border/50">
          <div className="px-6 py-4 flex items-center gap-3" style={{ borderBottom: "1px solid #F0EDEF" }}>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#501D2A15" }}>
              <Store className="w-4 h-4" style={{ color: "#501D2A" }} strokeWidth={1.5} />
            </div>
            <div>
              <h2 className="font-semibold text-foreground" style={{ fontSize: "14px" }}>Store Configuration</h2>
              <p className="text-muted-foreground" style={{ fontSize: "12px" }}>Core store identity and order settings</p>
            </div>
          </div>
          <div className="p-6 space-y-4">
            {/* Store Name */}
            <div>
              <label className={labelClass} style={{ fontSize: "12px" }}>Store Name</label>
              <input
                type="text"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                className={inputClass}
                style={{ fontSize: "13px" }}
              />
            </div>
            {/* Store Email */}
            <div>
              <label className={labelClass} style={{ fontSize: "12px" }}>Store Email</label>
              <input
                type="email"
                value={storeEmail}
                onChange={(e) => setStoreEmail(e.target.value)}
                className={inputClass}
                style={{ fontSize: "13px" }}
              />
            </div>
            {/* Store Phone */}
            <div>
              <label className={labelClass} style={{ fontSize: "12px" }}>Store Phone</label>
              <input
                type="tel"
                value={storePhone}
                onChange={(e) => setStorePhone(e.target.value)}
                className={inputClass}
                style={{ fontSize: "13px" }}
              />
            </div>
            {/* Default Currency — read-only */}
            <div>
              <label className={labelClass} style={{ fontSize: "12px" }}>Default Currency</label>
              <input
                type="text"
                value="BDT — Bangladeshi Taka"
                readOnly
                className={readonlyClass}
                style={{ fontSize: "13px" }}
              />
              <div className="flex items-center gap-1.5 mt-1.5">
                <Info className="w-3.5 h-3.5 text-muted-foreground shrink-0" strokeWidth={1.5} />
                <p className="text-muted-foreground" style={{ fontSize: "12px" }}>
                  Currency is fixed per Prisma schema — all <code className="font-mono text-xs">price</code> and <code className="font-mono text-xs">totalAmount</code> fields use BDT.
                </p>
              </div>
            </div>
            {/* Order Number Prefix */}
            <div>
              <label className={labelClass} style={{ fontSize: "12px" }}>Order Number Prefix</label>
              <input
                type="text"
                value={orderPrefix}
                onChange={(e) => setOrderPrefix(e.target.value)}
                placeholder="e.g. LS-"
                className={inputClass}
                style={{ fontSize: "13px" }}
              />
              <p className="text-muted-foreground mt-1" style={{ fontSize: "12px" }}>
                Orders will be numbered as <strong>{orderPrefix}0001</strong>, <strong>{orderPrefix}0002</strong>…
              </p>
            </div>
            {/* Default Order Status */}
            <div>
              <label className={labelClass} style={{ fontSize: "12px" }}>Default Order Status</label>
              <select
                value={defaultStatus}
                onChange={(e) => setDefaultStatus(e.target.value as OrderStatus)}
                className={inputClass}
                style={{ fontSize: "13px" }}
              >
                {ORDER_STATUSES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Card: Business Information */}
        <div className="bg-white rounded-xl border border-border/50">
          <div className="px-6 py-4 flex items-center gap-3" style={{ borderBottom: "1px solid #F0EDEF" }}>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-blue-50">
              <Building2 className="w-4 h-4 text-blue-600" strokeWidth={1.5} />
            </div>
            <div>
              <h2 className="font-semibold text-foreground" style={{ fontSize: "14px" }}>Business Information</h2>
              <p className="text-muted-foreground" style={{ fontSize: "12px" }}>Legal and address details</p>
            </div>
          </div>
          <div className="p-6 space-y-4">
            {/* Business Registration */}
            <div>
              <label className={labelClass} style={{ fontSize: "12px" }}>Business Registration</label>
              <input
                type="text"
                value={bizReg}
                onChange={(e) => setBizReg(e.target.value)}
                placeholder="e.g. RJSC-2024-000123"
                className={inputClass}
                style={{ fontSize: "13px" }}
              />
            </div>
            {/* Business Address */}
            <div>
              <label className={labelClass} style={{ fontSize: "12px" }}>Business Address</label>
              <textarea
                rows={3}
                value={bizAddress}
                onChange={(e) => setBizAddress(e.target.value)}
                placeholder="Street, area, district…"
                className={inputClass + " resize-none"}
                style={{ fontSize: "13px" }}
              />
            </div>
            {/* City */}
            <div>
              <label className={labelClass} style={{ fontSize: "12px" }}>City</label>
              <input
                type="text"
                value={bizCity}
                onChange={(e) => setBizCity(e.target.value)}
                className={inputClass}
                style={{ fontSize: "13px" }}
              />
            </div>
          </div>
        </div>

        {/* Save */}
        <div className="flex justify-end pb-6">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-white transition-colors"
            style={{ fontSize: "13px", backgroundColor: "#501D2A" }}
          >
            <Save className="w-4 h-4" strokeWidth={1.5} />
            Save Settings
          </button>
        </div>
      </div>
    </div>
  )
}
