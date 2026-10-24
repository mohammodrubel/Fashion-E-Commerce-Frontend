"use client"

import { useState } from "react"
import { PageHeader } from "@/components/admin/page-header"
import { UserPlus, Users } from "lucide-react"

// Matches User model exactly
type Role = "ADMIN" | "USER"

interface User {
  id: string
  name: string
  email: string
  role: Role
  isActive: boolean          // Boolean @default(true)
  // Extra display fields not in Prisma but realistic
  phone?: string
  joinedAt: string
  initials: string
}

const users: User[] = [
  { id: "u-001", name: "Rafiq Hossain",   email: "rafiq@lumastyle.com",   role: "ADMIN", isActive: true,  phone: "+880 1711-000001", joinedAt: "Jan 2024", initials: "RH" },
  { id: "u-002", name: "Nadia Islam",     email: "nadia@lumastyle.com",   role: "ADMIN", isActive: true,  phone: "+880 1812-000002", joinedAt: "Mar 2024", initials: "NI" },
  { id: "u-003", name: "Farhan Ahmed",    email: "farhan@gmail.com",      role: "USER",  isActive: true,  phone: "+880 1923-000003", joinedAt: "Jun 2024", initials: "FA" },
  { id: "u-004", name: "Sumaiya Khanam",  email: "sumaiya@yahoo.com",     role: "USER",  isActive: false, phone: "+880 1700-000004", joinedAt: "Aug 2024", initials: "SK" },
  { id: "u-005", name: "Tanvir Chowdhury",email: "tanvir@hotmail.com",    role: "USER",  isActive: true,  phone: undefined,          joinedAt: "Sep 2024", initials: "TC" },
  { id: "u-006", name: "Priya Roy",       email: "priya.roy@gmail.com",   role: "USER",  isActive: true,  phone: "+880 1601-000006", joinedAt: "Oct 2024", initials: "PR" },
]

const adminCount    = users.filter((u) => u.role === "ADMIN").length
const customerCount = 1240

export default function UsersPage() {
  const [activeMap, setActiveMap] = useState<Record<string, boolean>>(
    Object.fromEntries(users.map((u) => [u.id, u.isActive]))
  )

  function toggleActive(id: string) {
    setActiveMap((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <div style={{ backgroundColor: "#F8F7F5", minHeight: "100%" }}>
      <PageHeader
        title="User Management"
        description="Manage admin and customer accounts — User model"
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Settings", href: "/admin/settings" }, { label: "Users" }]}
        actions={
          <button
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-white transition-colors"
            style={{ fontSize: "13px", backgroundColor: "#501D2A" }}
          >
            <UserPlus className="w-4 h-4" strokeWidth={1.5} />
            Invite User
          </button>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Admin Users",      value: String(adminCount),                   icon: Users, color: "#501D2A" },
          { label: "Customer Accounts",value: customerCount.toLocaleString("en-BD"),icon: Users, color: "#2563EB" },
          { label: "Active",           value: String(users.filter(u => u.isActive).length),    icon: Users, color: "#059669" },
          { label: "Deactivated",      value: String(users.filter(u => !u.isActive).length),   icon: Users, color: "#9CA3AF" },
        ].map((s) => {
          const Icon = s.icon
          return (
            <div key={s.label} className="bg-white rounded-xl border border-border/50 p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-muted-foreground" style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.07em" }}>{s.label}</span>
                <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: s.color + "15" }}>
                  <Icon className="w-3.5 h-3.5" style={{ color: s.color }} strokeWidth={1.5} />
                </div>
              </div>
              <p className="font-semibold text-foreground" style={{ fontSize: "20px" }}>{s.value}</p>
            </div>
          )
        })}
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl border border-border/50">
        <div className="px-5 py-4" style={{ borderBottom: "1px solid #F0EDEF" }}>
          <h2 className="font-semibold text-foreground" style={{ fontSize: "14px" }}>Admin Team</h2>
          <p className="text-muted-foreground mt-0.5" style={{ fontSize: "12px" }}>role = ADMIN | USER — isActive toggle updates User.isActive</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid #F0EDEF" }}>
                {["User", "Email", "Phone", "Role", "Active", "Joined", "Actions"].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-muted-foreground font-medium" style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.07em" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map((user, i) => {
                const isActive = activeMap[user.id]
                return (
                  <tr
                    key={user.id}
                    className="hover:bg-[#F8F7F5] transition-colors"
                    style={{ borderBottom: i < users.length - 1 ? "1px solid #F0EDEF" : "none" }}
                  >
                    {/* Avatar + Name */}
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold shrink-0"
                          style={{ backgroundColor: "#501D2A", fontSize: "12px" }}
                        >
                          {user.initials}
                        </div>
                        <span className="font-medium text-foreground" style={{ fontSize: "13px" }}>{user.name}</span>
                      </div>
                    </td>
                    {/* Email */}
                    <td className="px-5 py-3 text-muted-foreground" style={{ fontSize: "13px" }}>{user.email}</td>
                    {/* Phone */}
                    <td className="px-5 py-3 text-muted-foreground" style={{ fontSize: "13px" }}>{user.phone ?? "—"}</td>
                    {/* Role badge — ADMIN=#501D2A, USER=gray */}
                    <td className="px-5 py-3">
                      {user.role === "ADMIN" ? (
                        <span
                          className="inline-flex items-center rounded-full px-2.5 py-0.5 font-medium"
                          style={{ fontSize: "11px", backgroundColor: "#501D2A1A", color: "#501D2A" }}
                        >
                          ADMIN
                        </span>
                      ) : (
                        <span
                          className="inline-flex items-center rounded-full px-2.5 py-0.5 font-medium bg-gray-100 text-gray-600"
                          style={{ fontSize: "11px" }}
                        >
                          USER
                        </span>
                      )}
                    </td>
                    {/* isActive toggle */}
                    <td className="px-5 py-3">
                      <button
                        onClick={() => toggleActive(user.id)}
                        className="relative inline-flex w-10 h-5 rounded-full transition-colors focus:outline-none"
                        style={{ backgroundColor: isActive ? "#501D2A" : "#E5E7EB" }}
                        title={isActive ? "Deactivate" : "Activate"}
                        aria-label={`Toggle isActive for ${user.name}`}
                      >
                        <span
                          className="absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform"
                          style={{ left: isActive ? "calc(100% - 18px)" : "2px" }}
                        />
                      </button>
                    </td>
                    {/* Joined */}
                    <td className="px-5 py-3 text-muted-foreground" style={{ fontSize: "13px" }}>{user.joinedAt}</td>
                    {/* Actions */}
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <button className="text-muted-foreground hover:text-foreground transition-colors" style={{ fontSize: "12px" }}>Edit</button>
                        <span className="text-border/60" style={{ fontSize: "12px" }}>|</span>
                        <button
                          onClick={() => toggleActive(user.id)}
                          className="transition-colors"
                          style={{ fontSize: "12px", color: isActive ? "#DC2626" : "#059669" }}
                        >
                          {isActive ? "Deactivate" : "Activate"}
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
