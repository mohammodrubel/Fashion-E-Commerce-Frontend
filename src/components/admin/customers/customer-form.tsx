"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { User, Lock, MapPin, Eye, EyeOff, CheckCircle2, Save, Loader2 } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { PageHeader } from "@/components/admin/page-header"
import {
  useCreateUserMutation,
  useUpdateUserMutation,
  useGetSingleUserQuery,
} from "@/redux/fetchers/user/userApi"

type Role = "USER" | "ADMIN"

const inputCls =
  "w-full px-3 py-2.5 rounded-lg border border-border/60 bg-white text-foreground focus:outline-none focus:border-primary/50 transition-colors"
const labelCls = "block font-medium text-foreground mb-1.5"

function SectionCard({ icon: Icon, title, children }: { icon: React.ElementType; title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl border border-border/50 p-5">
      <div className="flex items-center gap-2.5 mb-5" style={{ borderBottom: "1px solid var(--accent)", paddingBottom: "14px" }}>
        <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: "var(--accent)" }}>
          <Icon className="w-3.5 h-3.5" style={{ color: "var(--primary)" }} strokeWidth={1.5} />
        </div>
        <h2 className="font-semibold text-foreground" style={{ fontSize: "14px" }}>{title}</h2>
      </div>
      {children}
    </div>
  )
}

function Toggle({ value, onChange, labelOn = "Active", labelOff = "Inactive" }: { value: boolean; onChange: (v: boolean) => void; labelOn?: string; labelOff?: string }) {
  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={() => onChange(!value)}
        className="relative inline-flex w-10 h-6 rounded-full transition-colors shrink-0"
        style={{ backgroundColor: value ? "var(--primary)" : "#D1D5DB" }}
      >
        <span className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-200" style={{ left: value ? "calc(100% - 20px)" : "4px" }} />
      </button>
      <span className="font-medium" style={{ fontSize: "13px", color: value ? "var(--primary)" : "#6B7280" }}>
        {value ? labelOn : labelOff}
      </span>
    </div>
  )
}

function getPasswordStrength(pwd: string): { score: number; label: string; color: string } {
  if (!pwd) return { score: 0, label: "", color: "" }
  let score = 0
  if (pwd.length >= 8) score++
  if (/[A-Z]/.test(pwd)) score++
  if (/[0-9]/.test(pwd)) score++
  if (/[^A-Za-z0-9]/.test(pwd)) score++
  if (score <= 1) return { score, label: "Weak", color: "#EF4444" }
  if (score === 2) return { score, label: "Fair", color: "#F59E0B" }
  if (score === 3) return { score, label: "Good", color: "#10B981" }
  return { score, label: "Strong", color: "#059669" }
}

export function CustomerForm({
  customerId,
  basePath = "/admin/customers",
  breadcrumbLabel = "Customers",
  entityLabel = "Customer",
}: {
  customerId?: string
  basePath?: string
  breadcrumbLabel?: string
  entityLabel?: string
}) {
  const isEdit = Boolean(customerId)
  const router = useRouter()

  const { data: customerData, isLoading: isLoadingCustomer } = useGetSingleUserQuery(customerId as string, { skip: !isEdit })
  const [createUser, { isLoading: isCreating }] = useCreateUserMutation()
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation()
  const isSaving = isCreating || isUpdating

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [role, setRole] = useState<Role>("USER")
  const [isActive, setIsActive] = useState(true)

  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const [addrFullName, setAddrFullName] = useState("")
  const [addrPhone, setAddrPhone] = useState("")
  const [addrLine, setAddrLine] = useState("")
  const [addrCity, setAddrCity] = useState("")
  const [addrDistrict, setAddrDistrict] = useState("")
  const [addrPostal, setAddrPostal] = useState("")
  const [addrIsDefault, setAddrIsDefault] = useState(false)

  useEffect(() => {
    if (!isEdit || !customerData?.data) return
    const c = customerData.data
    setName(c.name ?? "")
    setEmail(c.email ?? "")
    setPhone(c.phone ?? "")
    setRole(c.role ?? "USER")
    setIsActive(Boolean(c.isActive))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, customerData])

  const pwStrength = getPasswordStrength(password)
  const pwMatch = confirmPassword.length > 0 && password === confirmPassword
  const pwMismatch = confirmPassword.length > 0 && password !== confirmPassword

  const requirements = [
    { label: "At least 6 characters", met: password.length >= 6 },
    { label: "At least one uppercase letter", met: /[A-Z]/.test(password) },
    { label: "At least one number", met: /[0-9]/.test(password) },
    { label: "At least one special character", met: /[^A-Za-z0-9]/.test(password) },
  ]

  async function handleSubmit() {
    if (!name.trim()) return toast.error("Full name is required")
    if (!email.trim()) return toast.error("Email is required")

    if (!isEdit) {
      if (password.length < 6) return toast.error("Password must be at least 6 characters")
      if (password !== confirmPassword) return toast.error("Passwords do not match")
    }

    try {
      if (isEdit) {
        await updateUser({
          id: customerId as string,
          data: { name: name.trim(), email: email.trim(), phone: phone.trim() || undefined, role, isActive },
        }).unwrap()
        toast.success(`${entityLabel} updated successfully`)
      } else {
        const hasAddress = addrLine.trim() && addrCity.trim()
        await createUser({
          name: name.trim(),
          email: email.trim(),
          password,
          phone: phone.trim() || undefined,
          role,
          isActive,
          ...(hasAddress
            ? {
                address: {
                  fullName: addrFullName.trim() || name.trim(),
                  phone: addrPhone.trim() || phone.trim(),
                  addressLine: addrLine.trim(),
                  city: addrCity.trim(),
                  district: addrDistrict.trim() || undefined,
                  postalCode: addrPostal.trim() || undefined,
                  isDefault: addrIsDefault,
                },
              }
            : {}),
        }).unwrap()
        toast.success(`${entityLabel} created successfully`)
      }
      router.push(basePath)
    } catch (err: any) {
      toast.error(err?.data?.message || "Something went wrong. Please try again.")
    }
  }

  if (isEdit && isLoadingCustomer) {
    return (
      <div className="space-y-6" style={{ backgroundColor: "var(--muted)", minHeight: "100vh" }}>
        <div className="flex items-center justify-between">
          <Skeleton className="h-7 w-48" />
          <Skeleton className="h-9 w-28 rounded-lg" />
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 bg-white rounded-xl border border-border/50 p-5 space-y-4">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-10 w-full rounded-lg" />
            <Skeleton className="h-10 w-full rounded-lg" />
            <Skeleton className="h-10 w-full rounded-lg" />
            <Skeleton className="h-24 w-full rounded-lg" />
          </div>
          <div className="space-y-5">
            <div className="bg-white rounded-xl border border-border/50 p-5 space-y-3">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-16 w-full rounded-lg" />
            </div>
            <div className="bg-white rounded-xl border border-border/50 p-5 space-y-3">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-10 w-full rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6" style={{ backgroundColor: "var(--muted)", minHeight: "100vh" }}>
      <PageHeader
        title={isEdit ? `Edit ${entityLabel}` : `Add New ${entityLabel}`}
        description={isEdit ? `Update ${entityLabel.toLowerCase()} account details` : `Create a new ${entityLabel.toLowerCase()} account manually`}
        breadcrumbs={[
          { label: "Admin", href: "/admin" },
          { label: breadcrumbLabel, href: basePath },
          { label: isEdit ? `Edit ${entityLabel}` : `New ${entityLabel}` },
        ]}
        actions={
          <div className="flex items-center gap-2">
            <a href={basePath} className="px-4 py-2 rounded-lg border border-border/60 text-muted-foreground hover:text-foreground hover:bg-white transition-colors" style={{ fontSize: "13px" }}>
              Cancel
            </a>
            <button
              onClick={handleSubmit}
              disabled={isSaving}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-white font-semibold transition-opacity hover:opacity-90 disabled:opacity-60"
              style={{ backgroundColor: "var(--primary)", fontSize: "13px" }}
            >
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin" strokeWidth={1.5} /> : <Save className="w-4 h-4" strokeWidth={1.5} />}
              {isEdit ? "Save Changes" : `Create ${entityLabel}`}
            </button>
          </div>
        }
      />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <SectionCard icon={User} title="Personal Information">
            <div className="space-y-4">
              <div>
                <label className={labelCls} style={{ fontSize: "12px" }}>Full Name <span className="text-red-500">*</span></label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Sarah Johnson" className={inputCls} style={{ fontSize: "13px" }} />
              </div>
              <div>
                <label className={labelCls} style={{ fontSize: "12px" }}>Email Address <span className="text-red-500">*</span></label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="customer@example.com" className={inputCls} style={{ fontSize: "13px" }} />
              </div>
              <div>
                <label className={labelCls} style={{ fontSize: "12px" }}>Phone (optional)</label>
                <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+880 1X-XXXXXXXX" className={inputCls} style={{ fontSize: "13px" }} />
              </div>
              <div>
                <label className={labelCls} style={{ fontSize: "12px" }}>Role <span className="text-red-500">*</span></label>
                <select value={role} onChange={(e) => setRole(e.target.value as Role)} className={inputCls + " appearance-none"} style={{ fontSize: "13px" }}>
                  <option value="USER">Customer</option>
                  <option value="ADMIN">Administrator</option>
                </select>
              </div>
              <div>
                <label className={labelCls} style={{ fontSize: "12px" }}>Account Status</label>
                <Toggle value={isActive} onChange={setIsActive} />
                <p className="text-muted-foreground mt-1.5" style={{ fontSize: "11px" }}>Inactive (blocked) accounts cannot log in to the store.</p>
              </div>
            </div>
          </SectionCard>
        </div>

        <div className="space-y-5">
          {!isEdit && (
            <SectionCard icon={Lock} title="Account Settings">
              <div className="space-y-4">
                <div>
                  <label className={labelCls} style={{ fontSize: "12px" }}>Set Initial Password <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Minimum 6 characters"
                      className="w-full px-3 py-2.5 pr-10 rounded-lg border border-border/60 bg-white text-foreground focus:outline-none focus:border-primary/50 transition-colors"
                      style={{ fontSize: "13px" }}
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                      {showPassword ? <EyeOff className="w-4 h-4" strokeWidth={1.5} /> : <Eye className="w-4 h-4" strokeWidth={1.5} />}
                    </button>
                  </div>
                  {password.length > 0 && (
                    <div className="mt-2">
                      <div className="flex gap-1 mb-1">
                        {[1, 2, 3, 4].map((n) => (
                          <div key={n} className="h-1 flex-1 rounded-full transition-colors" style={{ backgroundColor: n <= pwStrength.score ? pwStrength.color : "#E5E7EB" }} />
                        ))}
                      </div>
                      <p className="font-medium" style={{ fontSize: "11px", color: pwStrength.color }}>{pwStrength.label}</p>
                    </div>
                  )}
                </div>

                <div>
                  <label className={labelCls} style={{ fontSize: "12px" }}>Confirm Password <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <input
                      type={showConfirm ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Re-enter password"
                      className={`w-full px-3 py-2.5 pr-10 rounded-lg border bg-white text-foreground focus:outline-none transition-colors ${pwMismatch ? "border-red-400 focus:border-red-400" : pwMatch ? "border-emerald-400 focus:border-emerald-400" : "border-border/60 focus:border-primary/50"}`}
                      style={{ fontSize: "13px" }}
                    />
                    <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                      {showConfirm ? <EyeOff className="w-4 h-4" strokeWidth={1.5} /> : <Eye className="w-4 h-4" strokeWidth={1.5} />}
                    </button>
                  </div>
                  {pwMismatch && <p className="text-red-500 mt-1" style={{ fontSize: "11px" }}>Passwords do not match</p>}
                  {pwMatch && <p className="text-emerald-600 mt-1 flex items-center gap-1" style={{ fontSize: "11px" }}><CheckCircle2 className="w-3 h-3" strokeWidth={2} /> Passwords match</p>}
                </div>

                <div className="p-3 rounded-lg" style={{ backgroundColor: "var(--muted)", border: "1px solid var(--accent)" }}>
                  <p className="font-medium text-muted-foreground mb-2" style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.07em" }}>Password Requirements</p>
                  <ul className="space-y-1">
                    {requirements.map((r) => (
                      <li key={r.label} className="flex items-center gap-2">
                        <div className="w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: r.met ? "#ECFDF5" : "#F3F4F6" }}>
                          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: r.met ? "#10B981" : "#D1D5DB" }} />
                        </div>
                        <span style={{ fontSize: "11px", color: r.met ? "#059669" : "#6B7280" }}>{r.label}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </SectionCard>
          )}

          {!isEdit && (
            <SectionCard icon={MapPin} title="Initial Address (Optional)">
              <div className="space-y-3">
                <div>
                  <label className={labelCls} style={{ fontSize: "12px" }}>Full Name</label>
                  <input type="text" value={addrFullName} onChange={(e) => setAddrFullName(e.target.value)} placeholder="Recipient name" className={inputCls} style={{ fontSize: "13px" }} />
                </div>
                <div>
                  <label className={labelCls} style={{ fontSize: "12px" }}>Phone</label>
                  <input type="text" value={addrPhone} onChange={(e) => setAddrPhone(e.target.value)} placeholder="+880 1X-XXXXXXXX" className={inputCls} style={{ fontSize: "13px" }} />
                </div>
                <div>
                  <label className={labelCls} style={{ fontSize: "12px" }}>Address Line</label>
                  <input type="text" value={addrLine} onChange={(e) => setAddrLine(e.target.value)} placeholder="House, Road, Area" className={inputCls} style={{ fontSize: "13px" }} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={labelCls} style={{ fontSize: "12px" }}>City</label>
                    <input type="text" value={addrCity} onChange={(e) => setAddrCity(e.target.value)} placeholder="Dhaka" className={inputCls} style={{ fontSize: "13px" }} />
                  </div>
                  <div>
                    <label className={labelCls} style={{ fontSize: "12px" }}>District (optional)</label>
                    <input type="text" value={addrDistrict} onChange={(e) => setAddrDistrict(e.target.value)} placeholder="Dhaka" className={inputCls} style={{ fontSize: "13px" }} />
                  </div>
                </div>
                <div>
                  <label className={labelCls} style={{ fontSize: "12px" }}>Postal Code (optional)</label>
                  <input type="text" value={addrPostal} onChange={(e) => setAddrPostal(e.target.value)} placeholder="1207" className={inputCls} style={{ fontSize: "13px" }} />
                </div>
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input type="checkbox" checked={addrIsDefault} onChange={(e) => setAddrIsDefault(e.target.checked)} className="w-4 h-4 rounded border-border/60 accent-[var(--primary)]" />
                  <span className="text-foreground" style={{ fontSize: "13px" }}>Set as default address</span>
                </label>
              </div>
            </SectionCard>
          )}

          {isEdit && (
            <div className="bg-white rounded-xl border border-border/50 p-5">
              <p className="text-muted-foreground" style={{ fontSize: "12px" }}>
                Manage this customer&apos;s saved addresses from the{" "}
                <a href="/admin/customers/addresses" className="underline hover:opacity-70" style={{ color: "var(--primary)" }}>
                  Addresses
                </a>{" "}
                page.
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 bg-white rounded-xl border border-border/50 px-5 py-4">
        <a href={basePath} className="px-5 py-2.5 rounded-lg border border-border/60 text-muted-foreground hover:text-foreground hover:bg-[var(--muted)] transition-colors font-medium" style={{ fontSize: "13px" }}>
          Cancel
        </a>
        <button
          onClick={handleSubmit}
          disabled={isSaving}
          className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-white font-semibold transition-opacity hover:opacity-90 disabled:opacity-60"
          style={{ backgroundColor: "var(--primary)", fontSize: "13px" }}
        >
          {isSaving ? <Loader2 className="w-4 h-4 animate-spin" strokeWidth={1.5} /> : <Save className="w-4 h-4" strokeWidth={1.5} />}
          {isEdit ? "Save Changes" : `Create ${entityLabel}`}
        </button>
      </div>
    </div>
  )
}
