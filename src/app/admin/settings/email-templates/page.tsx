import { PageHeader } from "@/components/admin/page-header"
import { Mail, Eye, Edit, CheckCircle } from "lucide-react"

const templates = [
  {
    name: "Order Confirmation",
    description: "Sent immediately when a customer places an order",
    trigger: "Order placed",
    lastEdited: "Oct 10, 2024",
    status: "active",
    opens: "68%",
  },
  {
    name: "Shipping Notification",
    description: "Notifies customers when their order has shipped",
    trigger: "Order shipped",
    lastEdited: "Sep 28, 2024",
    status: "active",
    opens: "82%",
  },
  {
    name: "Order Delivered",
    description: "Confirms delivery and invites the customer to leave a review",
    trigger: "Order delivered",
    lastEdited: "Sep 15, 2024",
    status: "active",
    opens: "54%",
  },
  {
    name: "Password Reset",
    description: "Sent when a customer requests to reset their password",
    trigger: "Password reset request",
    lastEdited: "Aug 20, 2024",
    status: "active",
    opens: "91%",
  },
  {
    name: "Welcome Email",
    description: "Greeting email for new customer account sign-ups",
    trigger: "Account created",
    lastEdited: "Oct 5, 2024",
    status: "active",
    opens: "74%",
  },
  {
    name: "Abandoned Cart",
    description: "Reminder to customers who left items in their cart",
    trigger: "Cart abandoned > 2h",
    lastEdited: "Oct 12, 2024",
    status: "active",
    opens: "48%",
  },
  {
    name: "Refund Processed",
    description: "Confirms that a refund has been issued to the customer",
    trigger: "Refund completed",
    lastEdited: "Sep 20, 2024",
    status: "active",
    opens: "77%",
  },
  {
    name: "Review Request",
    description: "Ask customers for a product review 7 days after delivery",
    trigger: "7 days post-delivery",
    lastEdited: "Sep 1, 2024",
    status: "inactive",
    opens: "32%",
  },
]

export default function EmailTemplatesPage() {
  return (
    <div>
      <PageHeader
        title="Email Templates"
        description="Customize automated transactional emails sent to customers"
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Settings", href: "/admin/settings" }, { label: "Email Templates" }]}
      />

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-border/50 p-4">
          <p className="text-muted-foreground mb-1" style={{ fontSize: "12px" }}>Total Templates</p>
          <p className="text-2xl font-semibold text-foreground">8</p>
        </div>
        <div className="bg-white rounded-xl border border-border/50 p-4">
          <p className="text-muted-foreground mb-1" style={{ fontSize: "12px" }}>Active</p>
          <p className="text-2xl font-semibold text-emerald-600">7</p>
        </div>
        <div className="bg-white rounded-xl border border-border/50 p-4">
          <p className="text-muted-foreground mb-1" style={{ fontSize: "12px" }}>Avg Open Rate</p>
          <p className="text-2xl font-semibold text-foreground">65.8%</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {templates.map(tpl => (
          <div key={tpl.name} className="bg-white rounded-xl border border-border/50 p-5">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: "#501D2A15" }}>
                <Mail className="w-4 h-4" style={{ color: "#501D2A" }} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-foreground" style={{ fontSize: "14px" }}>{tpl.name}</h3>
                  <span
                    className="px-1.5 py-0.5 rounded-full font-medium"
                    style={{
                      fontSize: "10px",
                      color: tpl.status === "active" ? "#059669" : "#6b7280",
                      backgroundColor: tpl.status === "active" ? "#f0fdf4" : "#f9fafb",
                    }}
                  >
                    {tpl.status === "active" ? "Active" : "Inactive"}
                  </span>
                </div>
                <p className="text-muted-foreground" style={{ fontSize: "12px" }}>{tpl.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 mb-4 pl-12">
              <div className="flex items-center gap-1">
                <span className="text-muted-foreground" style={{ fontSize: "11px" }}>Trigger:</span>
                <span className="text-foreground" style={{ fontSize: "11px" }}>{tpl.trigger}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-muted-foreground" style={{ fontSize: "11px" }}>Opens:</span>
                <span className="font-medium" style={{ fontSize: "11px", color: "#501D2A" }}>{tpl.opens}</span>
              </div>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-border/30">
              <span className="text-muted-foreground" style={{ fontSize: "11px" }}>Edited {tpl.lastEdited}</span>
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-border/50 text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-colors" style={{ fontSize: "12px" }}>
                  <Eye className="w-3.5 h-3.5" />
                  Preview
                </button>
                <button
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-white transition-colors"
                  style={{ fontSize: "12px", backgroundColor: "#501D2A" }}
                >
                  <Edit className="w-3.5 h-3.5" />
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
