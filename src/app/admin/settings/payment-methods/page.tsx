"use client"

import { useState } from "react"
import { Truck, Smartphone, CreditCard, Building2, Save, CheckCircle } from "lucide-react"
import { PageHeader } from "@/components/admin/page-header"

// ─── Types matching Prisma PaymentMethod enum ─────────────────────────────────

type PaymentMethod = "COD" | "BKASH" | "NAGAD" | "CARD" | "BANK_TRANSFER"

// ─── Helpers ─────────────────────────────────────────────────────────────────

const inputCls =
  "w-full px-3 py-2.5 rounded-lg border border-border/60 bg-white text-foreground focus:outline-none focus:border-primary/50 transition-colors"
const labelCls = "block font-medium text-foreground mb-1.5"

function Toggle({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!value)}
      className="relative inline-flex w-11 h-6 rounded-full transition-colors shrink-0"
      style={{ backgroundColor: value ? "#501D2A" : "#D1D5DB" }}
      aria-label={value ? "Disable" : "Enable"}
    >
      <span
        className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-200"
        style={{ left: value ? "calc(100% - 20px)" : "4px" }}
      />
    </button>
  )
}

// ─── State shape ──────────────────────────────────────────────────────────────

interface MethodConfig {
  enabled: boolean
  merchantNumber?: string
  accountNumber?: string
  gateway?: string
  apiKey?: string
  bankName?: string
  bankAccount?: string
  branch?: string
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function PaymentMethodsPage() {
  const [saved, setSaved] = useState(false)

  const [config, setConfig] = useState<Record<PaymentMethod, MethodConfig>>({
    COD:           { enabled: true },
    BKASH:         { enabled: true,  merchantNumber: "" },
    NAGAD:         { enabled: true,  accountNumber: "" },
    CARD:          { enabled: true,  gateway: "",  apiKey: "" },
    BANK_TRANSFER: { enabled: true,  bankName: "", bankAccount: "", branch: "" },
  })

  const update = (method: PaymentMethod, partial: Partial<MethodConfig>) =>
    setConfig((prev) => ({ ...prev, [method]: { ...prev[method], ...partial } }))

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div className="space-y-6" style={{ backgroundColor: "#F8F7F5", minHeight: "100vh" }}>
      <PageHeader
        title="Payment Methods"
        description="Configure which payment methods are available at checkout"
        breadcrumbs={[
          { label: "Admin",    href: "/admin" },
          { label: "Settings", href: "/admin/settings" },
          { label: "Payment Methods" },
        ]}
        actions={
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-white font-semibold transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#501D2A", fontSize: "13px" }}
          >
            {saved ? (
              <>
                <CheckCircle className="w-4 h-4" strokeWidth={2} />
                Saved
              </>
            ) : (
              <>
                <Save className="w-4 h-4" strokeWidth={1.5} />
                Save Changes
              </>
            )}
          </button>
        }
      />

      <div className="space-y-4">

        {/* ── 1. COD ── */}
        <div className="bg-white rounded-xl border border-border/50 p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4 flex-1">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: "#FEF3C7" }}
              >
                <Truck className="w-6 h-6" style={{ color: "#D97706" }} strokeWidth={1.5} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-0.5">
                  <h3 className="font-semibold text-foreground" style={{ fontSize: "15px" }}>COD</h3>
                  <span
                    className="px-2 py-0.5 rounded-full font-medium"
                    style={{ fontSize: "10px", backgroundColor: "#FEF3C7", color: "#D97706" }}
                  >
                    Cash on Delivery
                  </span>
                </div>
                <p className="text-muted-foreground" style={{ fontSize: "12px" }}>
                  Customer pays when order arrives at the doorstep. No transaction fees.
                </p>
                <div
                  className="mt-3 flex items-center gap-2 px-3 py-2 rounded-lg"
                  style={{ backgroundColor: "#F8F7F5", border: "1px solid #F0EDEF" }}
                >
                  <span className="text-muted-foreground" style={{ fontSize: "12px" }}>
                    No additional configuration required for Cash on Delivery.
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end gap-1.5 shrink-0">
              <Toggle value={config.COD.enabled} onChange={(v) => update("COD", { enabled: v })} />
              <span
                className="font-medium"
                style={{ fontSize: "11px", color: config.COD.enabled ? "#501D2A" : "#9CA3AF" }}
              >
                {config.COD.enabled ? "Enabled" : "Disabled"}
              </span>
            </div>
          </div>
        </div>

        {/* ── 2. BKASH ── */}
        <div className="bg-white rounded-xl border border-border/50 p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4 flex-1 min-w-0">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: "#FDF2F8" }}
              >
                <Smartphone className="w-6 h-6" style={{ color: "#E11D74" }} strokeWidth={1.5} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <h3 className="font-semibold text-foreground" style={{ fontSize: "15px" }}>BKASH</h3>
                  <span
                    className="px-2 py-0.5 rounded-full font-medium"
                    style={{ fontSize: "10px", backgroundColor: "#FDF2F8", color: "#E11D74" }}
                  >
                    Mobile Banking
                  </span>
                </div>
                <p className="text-muted-foreground" style={{ fontSize: "12px" }}>
                  Bangladesh&apos;s most popular mobile banking and payment platform.
                </p>
                <div className="mt-3">
                  <label className={labelCls} style={{ fontSize: "12px" }}>bKash Merchant Number</label>
                  <input
                    type="text"
                    value={config.BKASH.merchantNumber ?? ""}
                    onChange={(e) => update("BKASH", { merchantNumber: e.target.value })}
                    placeholder="+880 1XXXXXXXXX"
                    className={inputCls}
                    style={{ fontSize: "13px" }}
                    disabled={!config.BKASH.enabled}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end gap-1.5 shrink-0">
              <Toggle value={config.BKASH.enabled} onChange={(v) => update("BKASH", { enabled: v })} />
              <span
                className="font-medium"
                style={{ fontSize: "11px", color: config.BKASH.enabled ? "#501D2A" : "#9CA3AF" }}
              >
                {config.BKASH.enabled ? "Enabled" : "Disabled"}
              </span>
            </div>
          </div>
        </div>

        {/* ── 3. NAGAD ── */}
        <div className="bg-white rounded-xl border border-border/50 p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4 flex-1 min-w-0">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: "#FFF7ED" }}
              >
                <Smartphone className="w-6 h-6" style={{ color: "#EA580C" }} strokeWidth={1.5} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <h3 className="font-semibold text-foreground" style={{ fontSize: "15px" }}>NAGAD</h3>
                  <span
                    className="px-2 py-0.5 rounded-full font-medium"
                    style={{ fontSize: "10px", backgroundColor: "#FFF7ED", color: "#EA580C" }}
                  >
                    Mobile Banking
                  </span>
                </div>
                <p className="text-muted-foreground" style={{ fontSize: "12px" }}>
                  Nagad digital financial service by Bangladesh Post Office.
                </p>
                <div className="mt-3">
                  <label className={labelCls} style={{ fontSize: "12px" }}>Nagad Account Number</label>
                  <input
                    type="text"
                    value={config.NAGAD.accountNumber ?? ""}
                    onChange={(e) => update("NAGAD", { accountNumber: e.target.value })}
                    placeholder="+880 1XXXXXXXXX"
                    className={inputCls}
                    style={{ fontSize: "13px" }}
                    disabled={!config.NAGAD.enabled}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end gap-1.5 shrink-0">
              <Toggle value={config.NAGAD.enabled} onChange={(v) => update("NAGAD", { enabled: v })} />
              <span
                className="font-medium"
                style={{ fontSize: "11px", color: config.NAGAD.enabled ? "#501D2A" : "#9CA3AF" }}
              >
                {config.NAGAD.enabled ? "Enabled" : "Disabled"}
              </span>
            </div>
          </div>
        </div>

        {/* ── 4. CARD ── */}
        <div className="bg-white rounded-xl border border-border/50 p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4 flex-1 min-w-0">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: "#EFF6FF" }}
              >
                <CreditCard className="w-6 h-6" style={{ color: "#2563EB" }} strokeWidth={1.5} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <h3 className="font-semibold text-foreground" style={{ fontSize: "15px" }}>CARD</h3>
                  <span
                    className="px-2 py-0.5 rounded-full font-medium"
                    style={{ fontSize: "10px", backgroundColor: "#EFF6FF", color: "#2563EB" }}
                  >
                    Credit / Debit Card
                  </span>
                </div>
                <p className="text-muted-foreground" style={{ fontSize: "12px" }}>
                  Accept Visa, Mastercard, and other major cards via your payment gateway.
                </p>
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className={labelCls} style={{ fontSize: "12px" }}>Payment Gateway</label>
                    <input
                      type="text"
                      value={config.CARD.gateway ?? ""}
                      onChange={(e) => update("CARD", { gateway: e.target.value })}
                      placeholder="e.g. SSLCommerz, ShurjoPay"
                      className={inputCls}
                      style={{ fontSize: "13px" }}
                      disabled={!config.CARD.enabled}
                    />
                  </div>
                  <div>
                    <label className={labelCls} style={{ fontSize: "12px" }}>API Key</label>
                    <input
                      type="password"
                      value={config.CARD.apiKey ?? ""}
                      onChange={(e) => update("CARD", { apiKey: e.target.value })}
                      placeholder="Enter gateway API key"
                      className={inputCls}
                      style={{ fontSize: "13px" }}
                      disabled={!config.CARD.enabled}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end gap-1.5 shrink-0">
              <Toggle value={config.CARD.enabled} onChange={(v) => update("CARD", { enabled: v })} />
              <span
                className="font-medium"
                style={{ fontSize: "11px", color: config.CARD.enabled ? "#501D2A" : "#9CA3AF" }}
              >
                {config.CARD.enabled ? "Enabled" : "Disabled"}
              </span>
            </div>
          </div>
        </div>

        {/* ── 5. BANK_TRANSFER ── */}
        <div className="bg-white rounded-xl border border-border/50 p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4 flex-1 min-w-0">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: "#ECFDF5" }}
              >
                <Building2 className="w-6 h-6" style={{ color: "#059669" }} strokeWidth={1.5} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <h3 className="font-semibold text-foreground" style={{ fontSize: "15px" }}>BANK TRANSFER</h3>
                  <span
                    className="px-2 py-0.5 rounded-full font-medium"
                    style={{ fontSize: "10px", backgroundColor: "#ECFDF5", color: "#059669" }}
                  >
                    Bank Transfer
                  </span>
                </div>
                <p className="text-muted-foreground" style={{ fontSize: "12px" }}>
                  Accept direct bank wire transfers. Customer submits proof of payment manually.
                </p>
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className={labelCls} style={{ fontSize: "12px" }}>Bank Name</label>
                    <input
                      type="text"
                      value={config.BANK_TRANSFER.bankName ?? ""}
                      onChange={(e) => update("BANK_TRANSFER", { bankName: e.target.value })}
                      placeholder="e.g. Dutch-Bangla Bank"
                      className={inputCls}
                      style={{ fontSize: "13px" }}
                      disabled={!config.BANK_TRANSFER.enabled}
                    />
                  </div>
                  <div>
                    <label className={labelCls} style={{ fontSize: "12px" }}>Account Number</label>
                    <input
                      type="text"
                      value={config.BANK_TRANSFER.bankAccount ?? ""}
                      onChange={(e) => update("BANK_TRANSFER", { bankAccount: e.target.value })}
                      placeholder="XXXX-XXXXXXXXXX"
                      className={inputCls}
                      style={{ fontSize: "13px" }}
                      disabled={!config.BANK_TRANSFER.enabled}
                    />
                  </div>
                  <div>
                    <label className={labelCls} style={{ fontSize: "12px" }}>Branch</label>
                    <input
                      type="text"
                      value={config.BANK_TRANSFER.branch ?? ""}
                      onChange={(e) => update("BANK_TRANSFER", { branch: e.target.value })}
                      placeholder="e.g. Gulshan Branch"
                      className={inputCls}
                      style={{ fontSize: "13px" }}
                      disabled={!config.BANK_TRANSFER.enabled}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end gap-1.5 shrink-0">
              <Toggle
                value={config.BANK_TRANSFER.enabled}
                onChange={(v) => update("BANK_TRANSFER", { enabled: v })}
              />
              <span
                className="font-medium"
                style={{ fontSize: "11px", color: config.BANK_TRANSFER.enabled ? "#501D2A" : "#9CA3AF" }}
              >
                {config.BANK_TRANSFER.enabled ? "Enabled" : "Disabled"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Save bar ── */}
      <div
        className="flex items-center justify-between bg-white rounded-xl border border-border/50 px-5 py-4"
      >
        <p className="text-muted-foreground" style={{ fontSize: "12px" }}>
          Changes apply to all future checkout sessions immediately after saving.
        </p>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-white font-semibold transition-opacity hover:opacity-90"
          style={{ backgroundColor: "#501D2A", fontSize: "13px" }}
        >
          {saved ? (
            <>
              <CheckCircle className="w-4 h-4" strokeWidth={2} />
              Saved!
            </>
          ) : (
            <>
              <Save className="w-4 h-4" strokeWidth={1.5} />
              Save Changes
            </>
          )}
        </button>
      </div>
    </div>
  )
}
