"use client"

import { useState } from "react"
import { PageHeader } from "@/components/admin/page-header"
import { Camera, Save, Lock, Eye, EyeOff } from "lucide-react"

// Reflects User model fields
type Role = "ADMIN" | "USER"

interface UserProfile {
  id: string
  name: string
  email: string
  phone?: string
  role: Role
  isActive: boolean
}

const profile: UserProfile = {
  id: "u-001",
  name: "Admin User",
  email: "admin@lumaStyle.com",
  phone: "",
  role: "ADMIN",
  isActive: true,
}

export default function AdminProfilePage() {
  const [name,  setName]  = useState(profile.name)
  const [email, setEmail] = useState(profile.email)
  const [phone, setPhone] = useState(profile.phone ?? "")

  const [currentPw,  setCurrentPw]  = useState("")
  const [newPw,      setNewPw]      = useState("")
  const [confirmPw,  setConfirmPw]  = useState("")
  const [showCur,    setShowCur]    = useState(false)
  const [showNew,    setShowNew]    = useState(false)
  const [showConf,   setShowConf]   = useState(false)

  function handleSave() {
    alert(`Profile saved: ${name} / ${email}`)
  }

  function handleUpdatePassword() {
    if (!currentPw || !newPw || !confirmPw) return
    if (newPw !== confirmPw) { alert("Passwords do not match."); return }
    alert("Password updated successfully.")
    setCurrentPw(""); setNewPw(""); setConfirmPw("")
  }

  const inputClass = "w-full px-3 py-2.5 rounded-lg border border-border/60 bg-white text-foreground focus:outline-none focus:border-primary/50"

  return (
    <div style={{ backgroundColor: "#F8F7F5", minHeight: "100%" }}>
      <PageHeader
        title="Admin Profile"
        description="Manage your account details — User model"
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Settings", href: "/admin/settings" }, { label: "Profile" }]}
      />

      <div className="max-w-2xl space-y-6">
        {/* Card: Profile Information */}
        <div className="bg-white rounded-xl border border-border/50 p-6">
          <h2 className="font-semibold text-foreground mb-5" style={{ fontSize: "14px" }}>Profile Information</h2>

          {/* Avatar */}
          <div className="flex items-center gap-5 mb-6">
            <div className="relative shrink-0">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold"
                style={{ backgroundColor: "#501D2A", fontSize: "22px" }}
              >
                A
              </div>
              <button
                className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-white border border-border flex items-center justify-center shadow-sm hover:bg-[#F8F7F5] transition-colors"
                title="Change Photo"
              >
                <Camera className="w-3 h-3 text-muted-foreground" strokeWidth={1.5} />
              </button>
            </div>
            <div>
              <p className="font-semibold text-foreground" style={{ fontSize: "15px" }}>{name}</p>
              <button className="text-muted-foreground hover:text-foreground transition-colors mt-0.5" style={{ fontSize: "12px" }}>
                Change Photo
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {/* name */}
            <div>
              <label className="block font-medium text-foreground mb-1.5" style={{ fontSize: "12px" }}>Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={inputClass}
                style={{ fontSize: "13px" }}
              />
            </div>
            {/* email */}
            <div>
              <label className="block font-medium text-foreground mb-1.5" style={{ fontSize: "12px" }}>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass}
                style={{ fontSize: "13px" }}
              />
            </div>
            {/* phone — optional, not in Prisma User but realistic */}
            <div>
              <label className="block font-medium text-foreground mb-1.5" style={{ fontSize: "12px" }}>Phone <span className="text-muted-foreground font-normal">(optional)</span></label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+880 1700-000000"
                className={inputClass}
                style={{ fontSize: "13px" }}
              />
            </div>
            {/* role — read-only */}
            <div>
              <label className="block font-medium text-foreground mb-1.5" style={{ fontSize: "12px" }}>Role</label>
              <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg border border-border/60 bg-[#F8F7F5]" style={{ fontSize: "13px" }}>
                <span
                  className="inline-flex items-center rounded-full px-2.5 py-0.5 font-medium"
                  style={{ fontSize: "11px", backgroundColor: "#501D2A1A", color: "#501D2A" }}
                >
                  ADMIN
                </span>
                <span className="text-muted-foreground" style={{ fontSize: "12px" }}>Read-only — change via User Management</span>
              </div>
            </div>
            {/* isActive — read-only */}
            <div>
              <label className="block font-medium text-foreground mb-1.5" style={{ fontSize: "12px" }}>Account Status</label>
              <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg border border-border/60 bg-[#F8F7F5]" style={{ fontSize: "13px" }}>
                <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 font-medium bg-emerald-50 text-emerald-700" style={{ fontSize: "11px" }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Active
                </span>
                <span className="text-muted-foreground" style={{ fontSize: "12px" }}>isActive = true</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card: Change Password */}
        <div className="bg-white rounded-xl border border-border/50 p-6">
          <div className="flex items-center gap-2 mb-5">
            <Lock className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
            <h2 className="font-semibold text-foreground" style={{ fontSize: "14px" }}>Change Password</h2>
          </div>
          <div className="space-y-4">
            {/* Current Password */}
            <div>
              <label className="block font-medium text-foreground mb-1.5" style={{ fontSize: "12px" }}>Current Password</label>
              <div className="relative">
                <input
                  type={showCur ? "text" : "password"}
                  value={currentPw}
                  onChange={(e) => setCurrentPw(e.target.value)}
                  placeholder="••••••••"
                  className={inputClass + " pr-10"}
                  style={{ fontSize: "13px" }}
                />
                <button
                  type="button"
                  onClick={() => setShowCur((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showCur ? <EyeOff className="w-4 h-4" strokeWidth={1.5} /> : <Eye className="w-4 h-4" strokeWidth={1.5} />}
                </button>
              </div>
            </div>
            {/* New Password */}
            <div>
              <label className="block font-medium text-foreground mb-1.5" style={{ fontSize: "12px" }}>New Password</label>
              <div className="relative">
                <input
                  type={showNew ? "text" : "password"}
                  value={newPw}
                  onChange={(e) => setNewPw(e.target.value)}
                  placeholder="Min. 8 characters"
                  className={inputClass + " pr-10"}
                  style={{ fontSize: "13px" }}
                />
                <button
                  type="button"
                  onClick={() => setShowNew((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showNew ? <EyeOff className="w-4 h-4" strokeWidth={1.5} /> : <Eye className="w-4 h-4" strokeWidth={1.5} />}
                </button>
              </div>
            </div>
            {/* Confirm New Password */}
            <div>
              <label className="block font-medium text-foreground mb-1.5" style={{ fontSize: "12px" }}>Confirm New Password</label>
              <div className="relative">
                <input
                  type={showConf ? "text" : "password"}
                  value={confirmPw}
                  onChange={(e) => setConfirmPw(e.target.value)}
                  placeholder="Repeat new password"
                  className={inputClass + " pr-10"}
                  style={{ fontSize: "13px" }}
                />
                <button
                  type="button"
                  onClick={() => setShowConf((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showConf ? <EyeOff className="w-4 h-4" strokeWidth={1.5} /> : <Eye className="w-4 h-4" strokeWidth={1.5} />}
                </button>
              </div>
            </div>
            {/* Password rules note */}
            <p className="text-muted-foreground" style={{ fontSize: "12px" }}>
              Password must be at least 8 characters, include an uppercase letter, a number, and a special character.
            </p>
          </div>
          <div className="flex justify-end mt-4 pt-4" style={{ borderTop: "1px solid #F0EDEF" }}>
            <button
              onClick={handleUpdatePassword}
              className="px-4 py-2 rounded-lg border border-border/60 text-foreground hover:bg-[#F8F7F5] transition-colors"
              style={{ fontSize: "13px" }}
            >
              Update Password
            </button>
          </div>
        </div>

        {/* Save Changes */}
        <div className="flex justify-end pb-6">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-white transition-colors"
            style={{ fontSize: "13px", backgroundColor: "#501D2A" }}
          >
            <Save className="w-4 h-4" strokeWidth={1.5} />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}
