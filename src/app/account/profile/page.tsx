"use client"

import { useState } from "react"
import {
  Camera, MapPin, Plus, Edit2, Trash2, Check, Home, Building
} from "lucide-react"
import { cn } from "@/lib/utils"

interface Address {
  id: string
  label: string
  name: string
  line1: string
  line2?: string
  city: string
  state: string
  zip: string
  country: string
  isDefault: boolean
  type: "home" | "work" | "other"
}

const savedAddresses: Address[] = [
  {
    id: "addr-1",
    label: "Home",
    name: "Sarah Johnson",
    line1: "142 Rosewood Avenue",
    city: "Brooklyn",
    state: "NY",
    zip: "11201",
    country: "United States",
    isDefault: true,
    type: "home",
  },
  {
    id: "addr-2",
    label: "Office",
    name: "Sarah Johnson",
    line1: "56 Fashion District Blvd",
    line2: "Suite 1400",
    city: "New York",
    state: "NY",
    zip: "10018",
    country: "United States",
    isDefault: false,
    type: "work",
  },
]

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={cn(
        "relative inline-flex h-5 w-9 rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none"
      )}
      style={{ backgroundColor: checked ? "#501D2A" : "#DCD5D8" }}
      aria-checked={checked}
      role="switch"
    >
      <span
        className={cn(
          "pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow transition-transform duration-200"
        )}
        style={{ transform: checked ? "translateX(16px)" : "translateX(0px)" }}
      />
    </button>
  )
}

export default function ProfilePage() {
  // Personal Info
  const [firstName,   setFirstName]   = useState("Sarah")
  const [lastName,    setLastName]    = useState("Johnson")
  const [email,       setEmail]       = useState("sarah.johnson@email.com")
  const [phone,       setPhone]       = useState("+1 (212) 555-0172")
  const [dob,         setDob]         = useState("1991-06-14")
  const [gender,      setGender]      = useState("Female")

  // Account Settings
  const [language,    setLanguage]    = useState("English (US)")
  const [newsletter,  setNewsletter]  = useState(true)
  const [marketing,   setMarketing]   = useState(false)

  // Addresses
  const [addresses,   setAddresses]   = useState<Address[]>(savedAddresses)

  function removeAddress(id: string) {
    setAddresses((prev) => prev.filter((a) => a.id !== id))
  }

  function setDefault(id: string) {
    setAddresses((prev) =>
      prev.map((a) => ({ ...a, isDefault: a.id === id }))
    )
  }

  return (
    <div className="space-y-6">
      {/* ── Page Header ── */}
      <div>
        <h1 className="font-semibold text-foreground" style={{ fontSize: "20px" }}>My Profile</h1>
        <p className="text-muted-foreground mt-0.5" style={{ fontSize: "13px" }}>
          Manage your personal information and account preferences
        </p>
      </div>

      {/* ── Profile Picture ── */}
      <div className="bg-white rounded-xl border border-border/50 p-5 flex items-center gap-5">
        <div className="relative shrink-0">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center text-white font-bold"
            style={{ backgroundColor: "#501D2A", fontSize: "28px" }}
          >
            S
          </div>
          <button
            className="absolute bottom-0 right-0 w-7 h-7 rounded-full flex items-center justify-center text-white shadow-md border-2 border-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#501D2A" }}
          >
            <Camera style={{ width: "13px", height: "13px" }} strokeWidth={1.5} />
          </button>
        </div>
        <div>
          <p className="font-semibold text-foreground" style={{ fontSize: "15px" }}>
            {firstName} {lastName}
          </p>
          <p className="text-muted-foreground" style={{ fontSize: "12px" }}>{email}</p>
          <button
            className="mt-2 px-3 py-1.5 rounded-lg border border-border hover:bg-[#F8F7F5] transition-colors text-foreground"
            style={{ fontSize: "12px" }}
          >
            Change Photo
          </button>
        </div>
      </div>

      {/* ── Two-Column Form ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Information */}
        <div className="bg-white rounded-xl border border-border/50 p-5">
          <h2 className="font-semibold text-foreground mb-5" style={{ fontSize: "14px" }}>
            Personal Information
          </h2>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-muted-foreground mb-1.5" style={{ fontSize: "12px", fontWeight: 500 }}>
                  First Name
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full h-9 px-3 bg-[#F8F7F5] border border-border/60 text-foreground focus:outline-none focus:border-primary/50 transition-colors"
                  style={{ borderRadius: "8px", fontSize: "13px" }}
                />
              </div>
              <div>
                <label className="block text-muted-foreground mb-1.5" style={{ fontSize: "12px", fontWeight: 500 }}>
                  Last Name
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full h-9 px-3 bg-[#F8F7F5] border border-border/60 text-foreground focus:outline-none focus:border-primary/50 transition-colors"
                  style={{ borderRadius: "8px", fontSize: "13px" }}
                />
              </div>
            </div>

            <div>
              <label className="block text-muted-foreground mb-1.5" style={{ fontSize: "12px", fontWeight: 500 }}>
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-9 px-3 bg-[#F8F7F5] border border-border/60 text-foreground focus:outline-none focus:border-primary/50 transition-colors"
                style={{ borderRadius: "8px", fontSize: "13px" }}
              />
            </div>

            <div>
              <label className="block text-muted-foreground mb-1.5" style={{ fontSize: "12px", fontWeight: 500 }}>
                Phone Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full h-9 px-3 bg-[#F8F7F5] border border-border/60 text-foreground focus:outline-none focus:border-primary/50 transition-colors"
                style={{ borderRadius: "8px", fontSize: "13px" }}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-muted-foreground mb-1.5" style={{ fontSize: "12px", fontWeight: 500 }}>
                  Date of Birth
                </label>
                <input
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="w-full h-9 px-3 bg-[#F8F7F5] border border-border/60 text-foreground focus:outline-none focus:border-primary/50 transition-colors"
                  style={{ borderRadius: "8px", fontSize: "13px" }}
                />
              </div>
              <div>
                <label className="block text-muted-foreground mb-1.5" style={{ fontSize: "12px", fontWeight: 500 }}>
                  Gender
                </label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full h-9 px-3 bg-[#F8F7F5] border border-border/60 text-foreground focus:outline-none focus:border-primary/50 transition-colors appearance-none"
                  style={{ borderRadius: "8px", fontSize: "13px" }}
                >
                  <option>Female</option>
                  <option>Male</option>
                  <option>Non-binary</option>
                  <option>Prefer not to say</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Account Settings */}
        <div className="bg-white rounded-xl border border-border/50 p-5">
          <h2 className="font-semibold text-foreground mb-5" style={{ fontSize: "14px" }}>
            Account Settings
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-muted-foreground mb-1.5" style={{ fontSize: "12px", fontWeight: 500 }}>
                Language Preference
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full h-9 px-3 bg-[#F8F7F5] border border-border/60 text-foreground focus:outline-none focus:border-primary/50 transition-colors appearance-none"
                style={{ borderRadius: "8px", fontSize: "13px" }}
              >
                <option>English (US)</option>
                <option>English (UK)</option>
                <option>French</option>
                <option>Spanish</option>
                <option>German</option>
                <option>Arabic</option>
              </select>
            </div>

            <div className="h-px bg-border/40" />

            <div className="space-y-3">
              <p className="text-muted-foreground" style={{ fontSize: "12px", fontWeight: 500 }}>
                Communication Preferences
              </p>

              {/* Newsletter */}
              <div className="flex items-start justify-between gap-4 py-2.5 px-3 rounded-lg hover:bg-[#F8F7F5] transition-colors">
                <div>
                  <p className="text-foreground" style={{ fontSize: "13px", fontWeight: 500 }}>
                    Newsletter Subscription
                  </p>
                  <p className="text-muted-foreground mt-0.5" style={{ fontSize: "11px" }}>
                    Receive our weekly style edits and lookbooks
                  </p>
                </div>
                <Toggle checked={newsletter} onChange={setNewsletter} />
              </div>

              {/* Marketing */}
              <div className="flex items-start justify-between gap-4 py-2.5 px-3 rounded-lg hover:bg-[#F8F7F5] transition-colors">
                <div>
                  <p className="text-foreground" style={{ fontSize: "13px", fontWeight: 500 }}>
                    Marketing Emails
                  </p>
                  <p className="text-muted-foreground mt-0.5" style={{ fontSize: "11px" }}>
                    Exclusive offers, early access and promotions
                  </p>
                </div>
                <Toggle checked={marketing} onChange={setMarketing} />
              </div>
            </div>

            <div className="h-px bg-border/40" />

            {/* Danger Zone */}
            <div>
              <p className="text-muted-foreground mb-2" style={{ fontSize: "12px", fontWeight: 500 }}>
                Account Actions
              </p>
              <div className="flex gap-2 flex-wrap">
                <button
                  className="px-3 py-2 rounded-lg border border-border hover:bg-[#F8F7F5] transition-colors text-muted-foreground"
                  style={{ fontSize: "12px" }}
                >
                  Download My Data
                </button>
                <button
                  className="px-3 py-2 rounded-lg border border-red-200 text-red-500 hover:bg-red-50 transition-colors"
                  style={{ fontSize: "12px" }}
                >
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Save Changes ── */}
      <div className="flex justify-end">
        <button
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-white font-medium hover:opacity-90 transition-opacity"
          style={{ backgroundColor: "#501D2A", fontSize: "13px" }}
        >
          <Check style={{ width: "14px", height: "14px" }} strokeWidth={2} />
          Save Changes
        </button>
      </div>

      {/* ── Saved Addresses ── */}
      <div className="bg-white rounded-xl border border-border/50">
        <div
          className="flex items-center justify-between px-5 py-4"
          style={{ borderBottom: "1px solid #F0EDEF" }}
        >
          <div>
            <h2 className="font-semibold text-foreground" style={{ fontSize: "14px" }}>
              Saved Addresses
            </h2>
            <p className="text-muted-foreground mt-0.5" style={{ fontSize: "12px" }}>
              Manage your delivery addresses
            </p>
          </div>
          <button
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-white hover:opacity-90 transition-opacity"
            style={{ backgroundColor: "#501D2A", fontSize: "12px", fontWeight: 500 }}
          >
            <Plus style={{ width: "13px", height: "13px" }} strokeWidth={2} />
            Add Address
          </button>
        </div>

        <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {addresses.map((addr) => {
            const AddrIcon = addr.type === "work" ? Building : Home
            return (
              <div
                key={addr.id}
                className={cn(
                  "relative rounded-xl border p-4 transition-colors",
                  addr.isDefault ? "border-[#501D2A]/30 bg-[#F9F5F6]" : "border-border/50 hover:border-border"
                )}
              >
                {/* Default badge */}
                {addr.isDefault && (
                  <span
                    className="absolute top-3 right-3 inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-medium"
                    style={{ backgroundColor: "#F0EDEF", color: "#501D2A", fontSize: "10px" }}
                  >
                    <Check style={{ width: "9px", height: "9px" }} strokeWidth={2.5} />
                    Default
                  </span>
                )}

                {/* Label row */}
                <div className="flex items-center gap-2 mb-2.5">
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: "#F0EDEF" }}
                  >
                    <AddrIcon className="w-3.5 h-3.5" style={{ color: "#501D2A" }} strokeWidth={1.5} />
                  </div>
                  <span className="font-semibold text-foreground" style={{ fontSize: "13px" }}>
                    {addr.label}
                  </span>
                </div>

                {/* Address detail */}
                <div className="flex items-start gap-2 mb-3">
                  <MapPin className="w-3.5 h-3.5 text-muted-foreground mt-0.5 shrink-0" strokeWidth={1.5} />
                  <div>
                    <p className="text-foreground" style={{ fontSize: "12px", fontWeight: 500 }}>
                      {addr.name}
                    </p>
                    <p className="text-muted-foreground" style={{ fontSize: "12px", lineHeight: 1.6 }}>
                      {addr.line1}
                      {addr.line2 && <>, {addr.line2}</>}
                      <br />
                      {addr.city}, {addr.state} {addr.zip}
                      <br />
                      {addr.country}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-2.5 border-t border-border/40">
                  <button
                    className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
                    style={{ fontSize: "12px" }}
                  >
                    <Edit2 style={{ width: "12px", height: "12px" }} strokeWidth={1.5} />
                    Edit
                  </button>
                  <button
                    onClick={() => removeAddress(addr.id)}
                    className="flex items-center gap-1.5 text-muted-foreground hover:text-red-500 transition-colors"
                    style={{ fontSize: "12px" }}
                  >
                    <Trash2 style={{ width: "12px", height: "12px" }} strokeWidth={1.5} />
                    Delete
                  </button>
                  {!addr.isDefault && (
                    <button
                      onClick={() => setDefault(addr.id)}
                      className="ml-auto flex items-center gap-1.5 hover:opacity-80 transition-opacity"
                      style={{ color: "#501D2A", fontSize: "12px" }}
                    >
                      Set as Default
                    </button>
                  )}
                </div>
              </div>
            )
          })}

          {/* Add Address placeholder card */}
          <button
            className="rounded-xl border-2 border-dashed border-border hover:border-[#501D2A]/40 transition-colors p-4 flex flex-col items-center justify-center gap-2 text-muted-foreground hover:text-foreground min-h-[140px] group"
          >
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center group-hover:bg-[#F0EDEF] transition-colors"
              style={{ backgroundColor: "#F8F7F5" }}
            >
              <Plus style={{ width: "16px", height: "16px" }} strokeWidth={1.5} />
            </div>
            <span style={{ fontSize: "12px" }}>Add New Address</span>
          </button>
        </div>
      </div>
    </div>
  )
}
