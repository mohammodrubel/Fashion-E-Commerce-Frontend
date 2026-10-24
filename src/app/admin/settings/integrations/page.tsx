import { PageHeader } from "@/components/admin/page-header"
import { CheckCircle, Plus, Settings, ExternalLink } from "lucide-react"

const integrations = [
  {
    name: "Google Analytics 4",
    description: "Track website traffic, conversions, and customer behavior",
    category: "Analytics",
    status: "connected",
    lastSync: "Just now",
    color: "#E37400",
    bg: "#fff7ed",
  },
  {
    name: "Mailchimp",
    description: "Sync customers and automate email marketing campaigns",
    category: "Email Marketing",
    status: "connected",
    lastSync: "2 hours ago",
    color: "#FFE01B",
    textColor: "#2c2c2c",
    bg: "#fffef0",
  },
  {
    name: "Stripe",
    description: "Payment processing and financial reporting integration",
    category: "Payments",
    status: "connected",
    lastSync: "Live sync",
    color: "#6772e5",
    bg: "#f5f6ff",
  },
  {
    name: "WhatsApp Business",
    description: "Send order updates and support messages via WhatsApp",
    category: "Messaging",
    status: "disconnected",
    lastSync: "—",
    color: "#25D366",
    bg: "#f0fdf4",
  },
  {
    name: "Facebook Catalog",
    description: "Sync your product catalog with Facebook & Instagram shops",
    category: "Social Commerce",
    status: "connected",
    lastSync: "Daily at 2am",
    color: "#1877F2",
    bg: "#eff6ff",
  },
  {
    name: "Google Shopping",
    description: "List your products in Google Shopping search results",
    category: "Advertising",
    status: "disconnected",
    lastSync: "—",
    color: "#4285F4",
    bg: "#eff6ff",
  },
  {
    name: "Klaviyo",
    description: "Advanced email and SMS marketing automation platform",
    category: "Email Marketing",
    status: "disconnected",
    lastSync: "—",
    color: "#007bff",
    bg: "#eff6ff",
  },
  {
    name: "ShipStation",
    description: "Fulfillment automation and shipping label generation",
    category: "Shipping",
    status: "disconnected",
    lastSync: "—",
    color: "#c0392b",
    bg: "#fef2f2",
  },
]

export default function IntegrationsPage() {
  const connected = integrations.filter(i => i.status === "connected").length

  return (
    <div>
      <PageHeader
        title="API & Integrations"
        description="Connect your store with third-party services and platforms"
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Settings", href: "/admin/settings" }, { label: "Integrations" }]}
        actions={
          <button className="flex items-center gap-2 rounded-lg border border-border/50 bg-white px-3 py-2 text-foreground hover:bg-muted/30 transition-colors" style={{ fontSize: "13px" }}>
            <ExternalLink className="w-4 h-4" />
            Browse Integrations
          </button>
        }
      />

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-border/50 p-4">
          <p className="text-muted-foreground mb-1" style={{ fontSize: "12px" }}>Total Integrations</p>
          <p className="text-2xl font-semibold text-foreground">{integrations.length}</p>
        </div>
        <div className="bg-white rounded-xl border border-border/50 p-4">
          <p className="text-muted-foreground mb-1" style={{ fontSize: "12px" }}>Connected</p>
          <p className="text-2xl font-semibold text-emerald-600">{connected}</p>
        </div>
        <div className="bg-white rounded-xl border border-border/50 p-4">
          <p className="text-muted-foreground mb-1" style={{ fontSize: "12px" }}>Available to Connect</p>
          <p className="text-2xl font-semibold text-muted-foreground">{integrations.length - connected}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {integrations.map(int => (
          <div key={int.name} className="bg-white rounded-xl border border-border/50 p-5">
            <div className="flex items-start gap-4 mb-4">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center font-bold text-white shrink-0"
                style={{ backgroundColor: int.color, fontSize: "14px" }}
              >
                {int.name.charAt(0)}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-0.5">
                  <h3 className="font-semibold text-foreground" style={{ fontSize: "14px" }}>{int.name}</h3>
                  <span className="px-1.5 py-0.5 rounded bg-muted/40 text-muted-foreground" style={{ fontSize: "10px" }}>{int.category}</span>
                </div>
                <p className="text-muted-foreground" style={{ fontSize: "12px" }}>{int.description}</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                {int.status === "connected" ? (
                  <>
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-emerald-600 font-medium" style={{ fontSize: "12px" }}>Connected</span>
                    <span className="text-muted-foreground" style={{ fontSize: "11px" }}>· {int.lastSync}</span>
                  </>
                ) : (
                  <span className="text-muted-foreground" style={{ fontSize: "12px" }}>Not connected</span>
                )}
              </div>
              <button
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg font-medium transition-colors"
                style={{
                  fontSize: "12px",
                  backgroundColor: int.status === "connected" ? "transparent" : "#501D2A",
                  color: int.status === "connected" ? "#6b7280" : "#ffffff",
                  border: int.status === "connected" ? "1px solid #e5e7eb" : "none",
                }}
              >
                {int.status === "connected" ? (
                  <><Settings className="w-3.5 h-3.5" /> Configure</>
                ) : (
                  <><Plus className="w-3.5 h-3.5" /> Connect</>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
