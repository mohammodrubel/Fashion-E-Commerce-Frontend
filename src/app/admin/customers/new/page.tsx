"use client"

import { useState } from "react"
import { User, Lock, MapPin, Eye, EyeOff, CheckCircle2 } from "lucide-react"
import { PageHeader } from "@/components/admin/page-header"

// ─── Types matching Prisma schema ────────────────────────────────────────────

type Role = "USER" | "ADMIN"

// ─── Helpers ─────────────────────────────────────────────────────────────────

const inputCls =
  "w-full px-3 py-2.5 rounded-lg border border-border/60 bg-white text-foreground focus:outline-none focus:border-primary/50 transition-colors"
const labelCls = "block font-medium text-foreground mb-1.5"

function SectionCard({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ElementType
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="bg-white rounded-xl border border-border/50 p-5">
      <div
        className="flex items-center gap-2.5 mb-5"
        style={{ borderBottom: "1px solid #F0EDEF", paddingBottom: "14px" }}
      >
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: "#F0EDEF" }}
        >
          <Icon className="w-3.5 h-3.5" style={{ color: "#501D2A" }} strokeWidth={1.5} />
        </div>
        <h2 className="font-semibold text-foreground" style={{ fontSize: "14px" }}>
          {title}
        </h2>
      </div>
      {children}
    </div>
  )
}

function Toggle({
  value,
  onChange,
  labelOn = "Active",
  labelOff = "Inactive",
}: {
  value: boolean
  onChange: (v: boolean) => void
  labelOn?: string
  labelOff?: string
}) {
  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={() => onChange(!value)}
        className="relative inline-flex w-10 h-6 rounded-full transition-colors shrink-0"
        style={{ backgroundColor: value ? "#501D2A" : "#D1D5DB" }}
      >
        <span
          className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-200"
          style={{ left: value ? "calc(100% - 20px)" : "4px" }}
        />
      </button>
      <span
        className="font-medium"
        style={{ fontSize: "13px", color: value ? "#501D2A" : "#6B7280" }}
      >
        {value ? labelOn : labelOff}
      </span>
    </div>
  )
}

// ─── Password strength ────────────────────────────────────────────────────────

function getPasswordStrength(pwd: string): { score: number; label: string; color: string } {
  if (!pwd) return { score: 0, label: "", color: "" }
  let score = 0
  if (pwd.length >= 8)  score++
  if (/[A-Z]/.test(pwd)) score++
  if (/[0-9]/.test(pwd)) score++
  if (/[^A-Za-z0-9]/.test(pwd)) score++
  if (score <= 1) return { score, label: "Weak",   color: "#EF4444" }
  if (score === 2) return { score, label: "Fair",   color: "#F59E0B" }
  if (score === 3) return { score, label: "Good",   color: "#10B981" }
  return              { score, label: "Strong", color: "#059669" }
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function NewCustomerPage() {
  // Personal info
  const [name, setName]         = useState("")
  const [email, setEmail]       = useState("")
  const [phone, setPhone]       = useState("")
  const [role, setRole]         = useState<Role>("USER")
  const [isActive, setIsActive] = useState(true)

  // Account
  const [password, setPassword]             = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword]       = useState(false)
  const [showConfirm, setShowConfirm]         = useState(false)

  // Address
  const [addrFullName, setAddrFullName]     = useState("")
  const [addrPhone, setAddrPhone]           = useState("")
  const [addrLine, setAddrLine]             = useState("")
  const [addrCity, setAddrCity]             = useState("")
  const [addrDistrict, setAddrDistrict]     = useState("")
  const [addrPostal, setAddrPostal]         = useState("")
  const [addrIsDefault, setAddrIsDefault]   = useState(false)

  const pwStrength    = getPasswordStrength(password)
  const pwMatch       = confirmPassword.length > 0 && password === confirmPassword
  const pwMismatch    = confirmPassword.length > 0 && password !== confirmPassword

  const requirements = [
    { label: "At least 8 characters",           met: password.length >= 8 },
    { label: "At least one uppercase letter",   met: /[A-Z]/.test(password) },
    { label: "At least one number",             met: /[0-9]/.test(password) },
    { label: "At least one special character",  met: /[^A-Za-z0-9]/.test(password) },
  ]

  return (
    <div className="space-y-6" style={{ backgroundColor: "#F8F7F5", minHeight: "100vh" }}>
      <PageHeader
        title="Add New Customer"
        description="Create a new customer account manually"
        breadcrumbs={[
          { label: "Admin",     href: "/admin" },
          { label: "Customers", href: "/admin/customers" },
          { label: "New Customer" },
        ]}
        actions={
          <div className="flex items-center gap-2">
            <a
              href="/admin/customers"
              className="px-4 py-2 rounded-lg border border-border/60 text-muted-foreground hover:text-foreground hover:bg-white transition-colors"
              style={{ fontSize: "13px" }}
            >
              Cancel
            </a>
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-white font-semibold transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#501D2A", fontSize: "13px" }}
            >
              Create Customer
            </button>
          </div>
        }
      />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* ── Left column (2/3) ── */}
        <div className="xl:col-span-2">
          <SectionCard icon={User} title="Personal Information">
            <div className="space-y-4">

              {/* Name */}
              <div>
                <label className={labelCls} style={{ fontSize: "12px" }}>
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Sarah Johnson"
                  className={inputCls}
                  style={{ fontSize: "13px" }}
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className={labelCls} style={{ fontSize: "12px" }}>
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="customer@example.com"
                  className={inputCls}
                  style={{ fontSize: "13px" }}
                  required
                />
              </div>

              {/* Phone */}
              <div>
                <label className={labelCls} style={{ fontSize: "12px" }}>
                  Phone (optional)
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+880 1X-XXXXXXXX"
                  className={inputCls}
                  style={{ fontSize: "13px" }}
                />
              </div>

              {/* Role */}
              <div>
                <label className={labelCls} style={{ fontSize: "12px" }}>
                  Role <span className="text-red-500">*</span>
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as Role)}
                  className="w-full px-3 py-2.5 rounded-lg border border-border/60 bg-white text-foreground focus:outline-none focus:border-primary/50 transition-colors appearance-none"
                  style={{ fontSize: "13px" }}
                >
                  <option value="USER">Customer</option>
                  <option value="ADMIN">Administrator</option>
                </select>
              </div>

              {/* Status toggle */}
              <div>
                <label className={labelCls} style={{ fontSize: "12px" }}>Account Status</label>
                <Toggle value={isActive} onChange={setIsActive} />
                <p className="text-muted-foreground mt-1.5" style={{ fontSize: "11px" }}>
                  Inactive accounts cannot log in to the store.
                </p>
              </div>
            </div>
          </SectionCard>
        </div>

        {/* ── Right column (1/3) ── */}
        <div className="space-y-5">
          {/* Account Settings */}
          <SectionCard icon={Lock} title="Account Settings">
            <div className="space-y-4">

              {/* Password */}
              <div>
                <label className={labelCls} style={{ fontSize: "12px" }}>
                  Set Initial Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Minimum 8 characters"
                    className="w-full px-3 py-2.5 pr-10 rounded-lg border border-border/60 bg-white text-foreground focus:outline-none focus:border-primary/50 transition-colors"
                    style={{ fontSize: "13px" }}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword
                      ? <EyeOff className="w-4 h-4" strokeWidth={1.5} />
                      : <Eye     className="w-4 h-4" strokeWidth={1.5} />}
                  </button>
                </div>

                {/* Strength bar */}
                {password.length > 0 && (
                  <div className="mt-2">
                    <div className="flex gap-1 mb-1">
                      {[1, 2, 3, 4].map((n) => (
                        <div
                          key={n}
                          className="h-1 flex-1 rounded-full transition-colors"
                          style={{
                            backgroundColor:
                              n <= pwStrength.score ? pwStrength.color : "#E5E7EB",
                          }}
                        />
                      ))}
                    </div>
                    <p className="font-medium" style={{ fontSize: "11px", color: pwStrength.color }}>
                      {pwStrength.label}
                    </p>
                  </div>
                )}
              </div>

              {/* Confirm password */}
              <div>
                <label className={labelCls} style={{ fontSize: "12px" }}>
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showConfirm ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter password"
                    className={`w-full px-3 py-2.5 pr-10 rounded-lg border bg-white text-foreground focus:outline-none transition-colors ${
                      pwMismatch
                        ? "border-red-400 focus:border-red-400"
                        : pwMatch
                        ? "border-emerald-400 focus:border-emerald-400"
                        : "border-border/60 focus:border-primary/50"
                    }`}
                    style={{ fontSize: "13px" }}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showConfirm
                      ? <EyeOff className="w-4 h-4" strokeWidth={1.5} />
                      : <Eye     className="w-4 h-4" strokeWidth={1.5} />}
                  </button>
                </div>
                {pwMismatch && (
                  <p className="text-red-500 mt-1" style={{ fontSize: "11px" }}>Passwords do not match</p>
                )}
                {pwMatch && (
                  <p className="text-emerald-600 mt-1 flex items-center gap-1" style={{ fontSize: "11px" }}>
                    <CheckCircle2 className="w-3 h-3" strokeWidth={2} /> Passwords match
                  </p>
                )}
              </div>

              {/* Requirements */}
              <div className="p-3 rounded-lg" style={{ backgroundColor: "#F8F7F5", border: "1px solid #F0EDEF" }}>
                <p className="font-medium text-muted-foreground mb-2" style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.07em" }}>
                  Password Requirements
                </p>
                <ul className="space-y-1">
                  {requirements.map((r) => (
                    <li key={r.label} className="flex items-center gap-2">
                      <div
                        className="w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0"
                        style={{ backgroundColor: r.met ? "#ECFDF5" : "#F3F4F6" }}
                      >
                        <div
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: r.met ? "#10B981" : "#D1D5DB" }}
                        />
                      </div>
                      <span
                        style={{
                          fontSize: "11px",
                          color: r.met ? "#059669" : "#6B7280",
                        }}
                      >
                        {r.label}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </SectionCard>

          {/* Initial Address */}
          <SectionCard icon={MapPin} title="Initial Address (Optional)">
            <div className="space-y-3">
              <div>
                <label className={labelCls} style={{ fontSize: "12px" }}>Full Name</label>
                <input
                  type="text"
                  value={addrFullName}
                  onChange={(e) => setAddrFullName(e.target.value)}
                  placeholder="Recipient name"
                  className={inputCls}
                  style={{ fontSize: "13px" }}
                />
              </div>
              <div>
                <label className={labelCls} style={{ fontSize: "12px" }}>Phone</label>
                <input
                  type="text"
                  value={addrPhone}
                  onChange={(e) => setAddrPhone(e.target.value)}
                  placeholder="+880 1X-XXXXXXXX"
                  className={inputCls}
                  style={{ fontSize: "13px" }}
                />
              </div>
              <div>
                <label className={labelCls} style={{ fontSize: "12px" }}>Address Line</label>
                <input
                  type="text"
                  value={addrLine}
                  onChange={(e) => setAddrLine(e.target.value)}
                  placeholder="House, Road, Area"
                  className={inputCls}
                  style={{ fontSize: "13px" }}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelCls} style={{ fontSize: "12px" }}>City</label>
                  <input
                    type="text"
                    value={addrCity}
                    onChange={(e) => setAddrCity(e.target.value)}
                    placeholder="Dhaka"
                    className={inputCls}
                    style={{ fontSize: "13px" }}
                  />
                </div>
                <div>
                  <label className={labelCls} style={{ fontSize: "12px" }}>District (optional)</label>
                  <input
                    type="text"
                    value={addrDistrict}
                    onChange={(e) => setAddrDistrict(e.target.value)}
                    placeholder="Dhaka"
                    className={inputCls}
                    style={{ fontSize: "13px" }}
                  />
                </div>
              </div>
              <div>
                <label className={labelCls} style={{ fontSize: "12px" }}>Postal Code (optional)</label>
                <input
                  type="text"
                  value={addrPostal}
                  onChange={(e) => setAddrPostal(e.target.value)}
                  placeholder="1207"
                  className={inputCls}
                  style={{ fontSize: "13px" }}
                />
              </div>

              {/* isDefault */}
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={addrIsDefault}
                  onChange={(e) => setAddrIsDefault(e.target.checked)}
                  className="w-4 h-4 rounded border-border/60 accent-[#501D2A]"
                />
                <span className="text-foreground" style={{ fontSize: "13px" }}>Set as default address</span>
              </label>
            </div>
          </SectionCard>
        </div>
      </div>

      {/* Bottom action bar */}
      <div
        className="flex items-center justify-end gap-3 bg-white rounded-xl border border-border/50 px-5 py-4"
      >
        <a
          href="/admin/customers"
          className="px-5 py-2.5 rounded-lg border border-border/60 text-muted-foreground hover:text-foreground hover:bg-[#F8F7F5] transition-colors font-medium"
          style={{ fontSize: "13px" }}
        >
          Cancel
        </a>
        <button
          className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-white font-semibold transition-opacity hover:opacity-90"
          style={{ backgroundColor: "#501D2A", fontSize: "13px" }}
        >
          Create Customer
        </button>
      </div>
    </div>
  )
}
