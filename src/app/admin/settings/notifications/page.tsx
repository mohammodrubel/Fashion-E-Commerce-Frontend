import { PageHeader } from "@/components/admin/page-header"
import { Mail, MessageSquare, Bell, Save } from "lucide-react"

const groups = [
  {
    label: "Email Notifications",
    icon: Mail,
    iconColor: "#501D2A",
    iconBg: "#501D2A15",
    description: "Receive email alerts for store events",
    items: [
      { label: "New order placed", enabled: true },
      { label: "Order shipped", enabled: true },
      { label: "Order cancelled", enabled: true },
      { label: "Low stock alert", enabled: true },
      { label: "New customer registered", enabled: false },
      { label: "Refund requested", enabled: true },
      { label: "Daily summary report", enabled: false },
    ],
  },
  {
    label: "SMS Notifications",
    icon: MessageSquare,
    iconColor: "#059669",
    iconBg: "#f0fdf4",
    description: "Text message alerts for critical events",
    items: [
      { label: "New order placed", enabled: false },
      { label: "High-value order ($500+)", enabled: true },
      { label: "Payment failed", enabled: true },
      { label: "Critical low stock", enabled: true },
      { label: "Security alert (login)", enabled: true },
    ],
  },
  {
    label: "Push Notifications",
    icon: Bell,
    iconColor: "#d97706",
    iconBg: "#fffbeb",
    description: "In-browser or mobile app push alerts",
    items: [
      { label: "New order placed", enabled: true },
      { label: "Order status update", enabled: true },
      { label: "Customer message", enabled: true },
      { label: "New product review", enabled: false },
      { label: "Inventory alert", enabled: true },
      { label: "Promotion performance", enabled: false },
    ],
  },
]

export default function NotificationsPage() {
  return (
    <div>
      <PageHeader
        title="Notification Settings"
        description="Control which alerts and updates you receive across different channels"
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Settings", href: "/admin/settings" }, { label: "Notifications" }]}
      />

      <div className="max-w-3xl space-y-5">
        {groups.map(group => {
          const Icon = group.icon
          return (
            <div key={group.label} className="bg-white rounded-xl border border-border/50">
              <div className="px-6 py-4 border-b border-border/50 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: group.iconBg }}>
                  <Icon className="w-4 h-4" style={{ color: group.iconColor }} />
                </div>
                <div>
                  <h2 className="font-semibold text-foreground" style={{ fontSize: "14px" }}>{group.label}</h2>
                  <p className="text-muted-foreground" style={{ fontSize: "12px" }}>{group.description}</p>
                </div>
              </div>
              <div className="divide-y divide-border/30">
                {group.items.map(item => (
                  <div key={item.label} className="px-6 py-3.5 flex items-center justify-between hover:bg-muted/10 transition-colors">
                    <span className="text-foreground" style={{ fontSize: "13px" }}>{item.label}</span>
                    <button
                      className="relative inline-flex w-9 h-5 rounded-full transition-colors"
                      style={{ backgroundColor: item.enabled ? group.iconColor : "#e5e7eb" }}
                    >
                      <span
                        className="absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform"
                        style={{ left: item.enabled ? "calc(100% - 18px)" : "2px" }}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )
        })}

        <div className="flex justify-end">
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-white"
            style={{ fontSize: "13px", backgroundColor: "#501D2A" }}
          >
            <Save className="w-4 h-4" />
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  )
}
