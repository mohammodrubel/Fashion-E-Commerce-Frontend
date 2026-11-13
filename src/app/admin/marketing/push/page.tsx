import { PageHeader } from "@/components/admin/page-header"
import { Plus, Bell, MousePointer, Users, Send, Eye, Pencil, Trash2 } from "lucide-react"

type PushStatus = "Sent" | "Scheduled" | "Draft"

interface PushNotification {
  title: string
  message: string
  sentTo: string
  sentDate: string
  clickRate: string
  status: PushStatus
}

const notifications: PushNotification[] = []

const statusConfig: Record<PushStatus, { bg: string; color: string }> = {
  Sent: { bg: "#DCFCE7", color: "#166534" },
  Scheduled: { bg: "#FEF9C3", color: "#854D0E" },
  Draft: { bg: "#F3F4F6", color: "#6B7280" },
}

export default function PushNotificationsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Push Notifications"
        description="Send web and app push notifications to your customers"
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Marketing", href: "/admin/marketing" }, { label: "Push Notifications" }]}
        actions={
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-white hover:opacity-90 transition-opacity"
            style={{ backgroundColor: "var(--primary)", fontSize: "13px" }}
          >
            <Plus className="w-4 h-4" strokeWidth={1.5} />
            Send New
          </button>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Subscribers", value: "0", sub: "opted-in users", icon: Users },
          { label: "Sent This Month", value: "0", sub: "notifications", icon: Send },
          { label: "Avg Click Rate", value: "0.0%", sub: "industry avg: 0.0%", icon: MousePointer },
          { label: "Notifications Scheduled", value: "0", sub: "upcoming", icon: Bell },
        ].map((c) => (
          <div key={c.label} className="bg-white rounded-xl border border-border/50 p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-muted-foreground" style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.07em" }}>{c.label}</p>
                <p className="font-semibold text-foreground mt-1" style={{ fontSize: "22px" }}>{c.value}</p>
                <p className="text-muted-foreground" style={{ fontSize: "11px" }}>{c.sub}</p>
              </div>
              <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: "#FAF0F2" }}>
                <c.icon className="w-4 h-4" style={{ color: "var(--primary)" }} strokeWidth={1.5} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile preview + table layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Push preview mockup */}
        <div className="bg-white rounded-xl border border-border/50 p-5">
          <p className="font-medium text-foreground mb-4" style={{ fontSize: "13px" }}>Preview</p>
          <div className="rounded-xl overflow-hidden border border-border/50">
            {/* phone top bar */}
            <div className="px-3 py-2 flex items-center justify-between" style={{ backgroundColor: "#1F2937" }}>
              <span className="text-white" style={{ fontSize: "10px" }}>9:41</span>
              <span className="text-white" style={{ fontSize: "10px" }}>●●●</span>
            </div>
            {/* notification banner */}
            <div className="p-3" style={{ backgroundColor: "#F3F4F6" }}>
              <div className="bg-white rounded-xl p-3 shadow-sm">
                <div className="flex items-start gap-2">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: "var(--primary)" }}>
                    <Bell className="w-3.5 h-3.5 text-white" strokeWidth={1.5} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground" style={{ fontSize: "11px" }}>New Arrivals Just Dropped!</p>
                    <p className="text-muted-foreground mt-0.5" style={{ fontSize: "10px" }}>Check out our latest autumn collection — 40+ new styles added today.</p>
                    <p className="text-muted-foreground mt-1" style={{ fontSize: "9px" }}>velour.co · now</p>
                  </div>
                </div>
              </div>
            </div>
            {/* phone screen */}
            <div className="h-32" style={{ backgroundColor: "#111827" }} />
          </div>
        </div>

        {/* Notifications table */}
        <div className="lg:col-span-3 bg-white rounded-xl border border-border/50">
          <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid var(--accent)" }}>
            <p className="font-medium text-foreground" style={{ fontSize: "14px" }}>Notification History</p>
          </div>
          <div className="divide-y divide-[var(--accent)]">
            {notifications.map((n, i) => {
              const cfg = statusConfig[n.status]
              return (
                <div key={i} className="px-5 py-4 hover:bg-[var(--muted)] transition-colors">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5" style={{ backgroundColor: "#FAF0F2" }}>
                        <Bell className="w-4 h-4" style={{ color: "var(--primary)" }} strokeWidth={1.5} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="font-medium text-foreground" style={{ fontSize: "13px" }}>{n.title}</p>
                          <span
                            className="inline-flex items-center rounded-full px-2 py-0.5 font-medium shrink-0"
                            style={{ fontSize: "10px", backgroundColor: cfg.bg, color: cfg.color }}
                          >
                            {n.status}
                          </span>
                        </div>
                        <p className="text-muted-foreground mt-0.5 line-clamp-1" style={{ fontSize: "12px" }}>{n.message}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Users className="w-3 h-3" strokeWidth={1.5} />
                            <span style={{ fontSize: "11px" }}>{n.sentTo}</span>
                          </div>
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Send className="w-3 h-3" strokeWidth={1.5} />
                            <span style={{ fontSize: "11px" }}>{n.sentDate}</span>
                          </div>
                          {n.clickRate !== "—" && (
                            <div className="flex items-center gap-1" style={{ color: "#166534" }}>
                              <MousePointer className="w-3 h-3" strokeWidth={1.5} />
                              <span style={{ fontSize: "11px" }}>CTR: {n.clickRate}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <button className="p-1.5 rounded-lg hover:bg-[var(--accent)] transition-colors text-muted-foreground hover:text-foreground">
                        <Eye className="w-3.5 h-3.5" strokeWidth={1.5} />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-[var(--accent)] transition-colors text-muted-foreground hover:text-foreground">
                        <Pencil className="w-3.5 h-3.5" strokeWidth={1.5} />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-red-50 transition-colors text-muted-foreground hover:text-red-600">
                        <Trash2 className="w-3.5 h-3.5" strokeWidth={1.5} />
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
