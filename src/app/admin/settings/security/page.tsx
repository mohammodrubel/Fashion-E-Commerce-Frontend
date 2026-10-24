import { PageHeader } from "@/components/admin/page-header"
import { Shield, Monitor, AlertTriangle, Lock, CheckCircle, XCircle } from "lucide-react"

const sessions = [
  { device: "Chrome 118 · MacBook Pro", location: "New York, US", ip: "74.125.46.22", lastActive: "Active now", current: true },
  { device: "Safari 17 · iPhone 15 Pro", location: "New York, US", ip: "74.125.46.31", lastActive: "2 hours ago", current: false },
  { device: "Chrome 117 · Windows 11", location: "Brooklyn, US", ip: "96.120.7.144", lastActive: "Yesterday 4:32 PM", current: false },
]

const loginAttempts = [
  { time: "Oct 24, 2024 9:14 AM", ip: "74.125.46.22", location: "New York, US", result: "success" },
  { time: "Oct 24, 2024 9:13 AM", ip: "74.125.46.22", location: "New York, US", result: "success" },
  { time: "Oct 22, 2024 11:42 PM", ip: "218.255.12.44", location: "Shanghai, CN", result: "failed" },
  { time: "Oct 22, 2024 11:41 PM", ip: "218.255.12.44", location: "Shanghai, CN", result: "failed" },
  { time: "Oct 21, 2024 3:08 PM", ip: "96.120.7.144", location: "Brooklyn, US", result: "success" },
]

export default function SecuritySettingsPage() {
  return (
    <div>
      <PageHeader
        title="Security Settings"
        description="Manage authentication, sessions, and access controls"
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Settings", href: "/admin/settings" }, { label: "Security" }]}
      />

      <div className="max-w-3xl space-y-6">
        {/* SSL Status */}
        <div className="bg-white rounded-xl border border-border/50 p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-emerald-50">
                <Lock className="w-4 h-4 text-emerald-600" />
              </div>
              <div>
                <p className="font-semibold text-foreground" style={{ fontSize: "14px" }}>SSL Certificate</p>
                <p className="text-muted-foreground" style={{ fontSize: "12px" }}>maisonelite.com — Expires Apr 18, 2025</p>
              </div>
            </div>
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 font-medium" style={{ fontSize: "12px" }}>
              <CheckCircle className="w-3.5 h-3.5" />
              Valid & Secure
            </span>
          </div>
        </div>

        {/* Two-Factor Auth */}
        <div className="bg-white rounded-xl border border-border/50 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#501D2A15" }}>
              <Shield className="w-4 h-4" style={{ color: "#501D2A" }} />
            </div>
            <div>
              <h2 className="font-semibold text-foreground" style={{ fontSize: "14px" }}>Two-Factor Authentication</h2>
              <p className="text-muted-foreground" style={{ fontSize: "12px" }}>Require 2FA for all admin users</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
              <span className="text-foreground" style={{ fontSize: "13px" }}>Authenticator App (TOTP)</span>
              <span className="px-2 py-0.5 rounded-full text-emerald-700 bg-emerald-50 font-medium" style={{ fontSize: "11px" }}>Enabled</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground" style={{ fontSize: "13px" }}>Enforce 2FA for All Admins</p>
                <p className="text-muted-foreground" style={{ fontSize: "12px" }}>All team members must set up 2FA to access admin</p>
              </div>
              <button className="relative inline-flex w-10 h-6 rounded-full" style={{ backgroundColor: "#e5e7eb" }}>
                <span className="absolute left-1 top-1 w-4 h-4 rounded-full bg-white shadow-sm" />
              </button>
            </div>
          </div>
        </div>

        {/* Active Sessions */}
        <div className="bg-white rounded-xl border border-border/50">
          <div className="px-6 py-4 border-b border-border/50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Monitor className="w-4 h-4 text-muted-foreground" />
              <h2 className="font-semibold text-foreground" style={{ fontSize: "14px" }}>Active Sessions</h2>
            </div>
            <button className="text-rose-500 hover:text-rose-600" style={{ fontSize: "12px" }}>Revoke All Others</button>
          </div>
          <div className="divide-y divide-border/30">
            {sessions.map((s, i) => (
              <div key={i} className="px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${s.current ? "bg-emerald-500" : "bg-muted-foreground/30"}`} />
                  <div>
                    <p className="font-medium text-foreground" style={{ fontSize: "13px" }}>
                      {s.device}
                      {s.current && <span className="ml-2 px-1.5 py-0.5 rounded text-emerald-700 bg-emerald-50" style={{ fontSize: "10px" }}>Current</span>}
                    </p>
                    <p className="text-muted-foreground" style={{ fontSize: "11px" }}>{s.location} · {s.ip} · {s.lastActive}</p>
                  </div>
                </div>
                {!s.current && (
                  <button className="text-rose-500 hover:text-rose-600 transition-colors" style={{ fontSize: "12px" }}>Revoke</button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* IP Whitelist */}
        <div className="bg-white rounded-xl border border-border/50 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-semibold text-foreground" style={{ fontSize: "14px" }}>IP Whitelist</h2>
              <p className="text-muted-foreground" style={{ fontSize: "12px" }}>Restrict admin access to specific IP addresses</p>
            </div>
            <button className="relative inline-flex w-10 h-6 rounded-full" style={{ backgroundColor: "#e5e7eb" }}>
              <span className="absolute left-1 top-1 w-4 h-4 rounded-full bg-white shadow-sm" />
            </button>
          </div>
          <div className="p-3 rounded-lg bg-amber-50 border border-amber-200">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              <p className="text-amber-700" style={{ fontSize: "12px" }}>
                Enable with caution. Incorrect IP settings can lock you out of the admin panel.
              </p>
            </div>
          </div>
        </div>

        {/* Login Attempts */}
        <div className="bg-white rounded-xl border border-border/50">
          <div className="px-6 py-4 border-b border-border/50">
            <h2 className="font-semibold text-foreground" style={{ fontSize: "14px" }}>Recent Login Attempts</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50">
                  {["Time", "IP Address", "Location", "Result"].map(h => (
                    <th key={h} className="text-left px-6 py-3 text-muted-foreground font-medium" style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.06em" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loginAttempts.map((a, i) => (
                  <tr key={i} className={`border-b border-border/30 hover:bg-muted/20 ${i === loginAttempts.length - 1 ? "border-b-0" : ""}`}>
                    <td className="px-6 py-3 text-muted-foreground" style={{ fontSize: "12px" }}>{a.time}</td>
                    <td className="px-6 py-3 font-mono text-foreground" style={{ fontSize: "12px" }}>{a.ip}</td>
                    <td className="px-6 py-3 text-muted-foreground" style={{ fontSize: "12px" }}>{a.location}</td>
                    <td className="px-6 py-3" style={{ fontSize: "12px" }}>
                      <span className={`flex items-center gap-1.5 w-fit font-medium ${a.result === "success" ? "text-emerald-600" : "text-rose-500"}`}>
                        {a.result === "success" ? <CheckCircle className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                        {a.result === "success" ? "Success" : "Failed"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
