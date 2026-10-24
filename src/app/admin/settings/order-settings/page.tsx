import { PageHeader } from "@/components/admin/page-header"
import { ShoppingCart, Save } from "lucide-react"

export default function OrderSettingsPage() {
  return (
    <div>
      <PageHeader
        title="Order Settings"
        description="Configure order processing, confirmation, and invoice behavior"
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Settings", href: "/admin/settings" }, { label: "Order Settings" }]}
      />

      <div className="max-w-3xl space-y-6">
        {/* Order Identification */}
        <div className="bg-white rounded-xl border border-border/50 p-6">
          <div className="flex items-center gap-2 mb-4">
            <ShoppingCart className="w-4 h-4 text-muted-foreground" />
            <h2 className="font-semibold text-foreground" style={{ fontSize: "14px" }}>Order Identification</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-foreground font-medium mb-1.5" style={{ fontSize: "13px" }}>Order Number Prefix</label>
              <div className="flex items-center gap-2">
                <input defaultValue="ORD-" className="border border-border/50 rounded-lg px-3 py-2 text-foreground bg-white w-28" style={{ fontSize: "13px" }} />
                <span className="text-muted-foreground" style={{ fontSize: "12px" }}>Orders will appear as ORD-4521, ORD-4522, etc.</span>
              </div>
            </div>
            <div>
              <label className="block text-foreground font-medium mb-1.5" style={{ fontSize: "13px" }}>Invoice Prefix</label>
              <div className="flex items-center gap-2">
                <input defaultValue="INV-" className="border border-border/50 rounded-lg px-3 py-2 text-foreground bg-white w-28" style={{ fontSize: "13px" }} />
                <span className="text-muted-foreground" style={{ fontSize: "12px" }}>Invoice format: INV-2024-0001</span>
              </div>
            </div>
          </div>
        </div>

        {/* Processing Rules */}
        <div className="bg-white rounded-xl border border-border/50 p-6">
          <h2 className="font-semibold text-foreground mb-4" style={{ fontSize: "14px" }}>Order Processing</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-1">
              <div>
                <p className="font-medium text-foreground" style={{ fontSize: "13px" }}>Auto-Confirm Orders</p>
                <p className="text-muted-foreground" style={{ fontSize: "12px" }}>Automatically confirm new orders upon payment verification</p>
              </div>
              <button className="relative inline-flex w-10 h-6 rounded-full" style={{ backgroundColor: "#501D2A" }}>
                <span className="absolute right-1 top-1 w-4 h-4 rounded-full bg-white shadow-sm" />
              </button>
            </div>
            <div className="border-t border-border/30 pt-4">
              <label className="block text-foreground font-medium mb-1.5" style={{ fontSize: "13px" }}>Order Cancellation Window</label>
              <div className="flex items-center gap-2">
                <input defaultValue="24" className="border border-border/50 rounded-lg px-3 py-2 text-foreground bg-white w-20" style={{ fontSize: "13px" }} />
                <span className="text-muted-foreground" style={{ fontSize: "13px" }}>hours after order placement</span>
              </div>
              <p className="text-muted-foreground mt-1" style={{ fontSize: "11px" }}>Customers can cancel orders within this window. Set to 0 to disable.</p>
            </div>
            <div className="border-t border-border/30 pt-4 flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground" style={{ fontSize: "13px" }}>Auto-Generate Invoices</p>
                <p className="text-muted-foreground" style={{ fontSize: "12px" }}>Automatically create PDF invoices when orders are confirmed</p>
              </div>
              <button className="relative inline-flex w-10 h-6 rounded-full" style={{ backgroundColor: "#501D2A" }}>
                <span className="absolute right-1 top-1 w-4 h-4 rounded-full bg-white shadow-sm" />
              </button>
            </div>
            <div className="border-t border-border/30 pt-4">
              <label className="block text-foreground font-medium mb-1.5" style={{ fontSize: "13px" }}>Minimum Order Amount</label>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground" style={{ fontSize: "13px" }}>$</span>
                <input defaultValue="0.00" className="border border-border/50 rounded-lg px-3 py-2 text-foreground bg-white w-24" style={{ fontSize: "13px" }} />
                <span className="text-muted-foreground" style={{ fontSize: "12px" }}>Set to $0 for no minimum</span>
              </div>
            </div>
          </div>
        </div>

        {/* Fulfillment */}
        <div className="bg-white rounded-xl border border-border/50 p-6">
          <h2 className="font-semibold text-foreground mb-4" style={{ fontSize: "14px" }}>Fulfillment Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-foreground font-medium mb-1.5" style={{ fontSize: "13px" }}>Default Fulfillment Status</label>
              <select className="w-full border border-border/50 rounded-lg px-3 py-2 text-foreground bg-white" style={{ fontSize: "13px" }}>
                <option>Pending</option>
                <option>Confirmed</option>
                <option>Processing</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground" style={{ fontSize: "13px" }}>Notify Customer on Status Change</p>
                <p className="text-muted-foreground" style={{ fontSize: "12px" }}>Send email when order status is updated</p>
              </div>
              <button className="relative inline-flex w-10 h-6 rounded-full" style={{ backgroundColor: "#501D2A" }}>
                <span className="absolute right-1 top-1 w-4 h-4 rounded-full bg-white shadow-sm" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-white" style={{ fontSize: "13px", backgroundColor: "#501D2A" }}>
            <Save className="w-4 h-4" />
            Save Order Settings
          </button>
        </div>
      </div>
    </div>
  )
}
