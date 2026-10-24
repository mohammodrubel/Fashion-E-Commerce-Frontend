import { PageHeader } from "@/components/admin/page-header"
import { Users, Save, Mail } from "lucide-react"

export default function CustomerSettingsPage() {
  return (
    <div>
      <PageHeader
        title="Customer Settings"
        description="Configure customer registration, verification, and account rules"
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Settings", href: "/admin/settings" }, { label: "Customer Settings" }]}
      />

      <div className="max-w-3xl space-y-6">
        {/* Registration */}
        <div className="bg-white rounded-xl border border-border/50 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-4 h-4 text-muted-foreground" />
            <h2 className="font-semibold text-foreground" style={{ fontSize: "14px" }}>Registration Options</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground" style={{ fontSize: "13px" }}>Allow Customer Registration</p>
                <p className="text-muted-foreground" style={{ fontSize: "12px" }}>Let visitors create accounts on your store</p>
              </div>
              <button className="relative inline-flex w-10 h-6 rounded-full" style={{ backgroundColor: "#501D2A" }}>
                <span className="absolute right-1 top-1 w-4 h-4 rounded-full bg-white shadow-sm" />
              </button>
            </div>
            <div className="border-t border-border/30 pt-4 flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground" style={{ fontSize: "13px" }}>Email Verification Required</p>
                <p className="text-muted-foreground" style={{ fontSize: "12px" }}>New customers must verify email before first purchase</p>
              </div>
              <button className="relative inline-flex w-10 h-6 rounded-full" style={{ backgroundColor: "#501D2A" }}>
                <span className="absolute right-1 top-1 w-4 h-4 rounded-full bg-white shadow-sm" />
              </button>
            </div>
            <div className="border-t border-border/30 pt-4 flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground" style={{ fontSize: "13px" }}>Social Login (Google / Apple)</p>
                <p className="text-muted-foreground" style={{ fontSize: "12px" }}>Allow sign-up and login via OAuth providers</p>
              </div>
              <button className="relative inline-flex w-10 h-6 rounded-full" style={{ backgroundColor: "#e5e7eb" }}>
                <span className="absolute left-1 top-1 w-4 h-4 rounded-full bg-white shadow-sm" />
              </button>
            </div>
          </div>
        </div>

        {/* Guest Checkout */}
        <div className="bg-white rounded-xl border border-border/50 p-6">
          <h2 className="font-semibold text-foreground mb-4" style={{ fontSize: "14px" }}>Guest Checkout</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground" style={{ fontSize: "13px" }}>Allow Guest Checkout</p>
                <p className="text-muted-foreground" style={{ fontSize: "12px" }}>Customers can purchase without creating an account</p>
              </div>
              <button className="relative inline-flex w-10 h-6 rounded-full" style={{ backgroundColor: "#501D2A" }}>
                <span className="absolute right-1 top-1 w-4 h-4 rounded-full bg-white shadow-sm" />
              </button>
            </div>
            <div className="border-t border-border/30 pt-4 flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground" style={{ fontSize: "13px" }}>Prompt Guest Account Creation Post-Purchase</p>
                <p className="text-muted-foreground" style={{ fontSize: "12px" }}>Offer account creation on the order confirmation page</p>
              </div>
              <button className="relative inline-flex w-10 h-6 rounded-full" style={{ backgroundColor: "#501D2A" }}>
                <span className="absolute right-1 top-1 w-4 h-4 rounded-full bg-white shadow-sm" />
              </button>
            </div>
          </div>
        </div>

        {/* Customer Groups */}
        <div className="bg-white rounded-xl border border-border/50 p-6">
          <h2 className="font-semibold text-foreground mb-4" style={{ fontSize: "14px" }}>Customer Groups Auto-Assignment</h2>
          <div className="space-y-3">
            {[
              { group: "Bronze", condition: "First purchase", threshold: "$0", color: "#92400e", bg: "#fef3c7" },
              { group: "Silver", condition: "Cumulative spend ≥", threshold: "$200", color: "#6b7280", bg: "#f9fafb" },
              { group: "Gold", condition: "Cumulative spend ≥", threshold: "$500", color: "#d97706", bg: "#fffbeb" },
              { group: "Platinum", condition: "Cumulative spend ≥", threshold: "$1,000", color: "#7c3aed", bg: "#f5f3ff" },
            ].map(g => (
              <div key={g.group} className="flex items-center gap-4 p-3 rounded-lg border border-border/30">
                <span className="px-2.5 py-1 rounded-full font-medium" style={{ fontSize: "12px", color: g.color, backgroundColor: g.bg }}>{g.group}</span>
                <span className="text-foreground" style={{ fontSize: "13px" }}>{g.condition}</span>
                <input defaultValue={g.threshold} className="border border-border/50 rounded-lg px-3 py-1.5 text-foreground bg-white w-24" style={{ fontSize: "13px" }} />
              </div>
            ))}
          </div>
        </div>

        {/* Marketing Preferences */}
        <div className="bg-white rounded-xl border border-border/50 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Mail className="w-4 h-4 text-muted-foreground" />
            <h2 className="font-semibold text-foreground" style={{ fontSize: "14px" }}>Marketing Preferences</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground" style={{ fontSize: "13px" }}>Default Marketing Opt-In</p>
                <p className="text-muted-foreground" style={{ fontSize: "12px" }}>Pre-check the marketing emails checkbox at signup</p>
              </div>
              <button className="relative inline-flex w-10 h-6 rounded-full" style={{ backgroundColor: "#e5e7eb" }}>
                <span className="absolute left-1 top-1 w-4 h-4 rounded-full bg-white shadow-sm" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-white" style={{ fontSize: "13px", backgroundColor: "#501D2A" }}>
            <Save className="w-4 h-4" />
            Save Customer Settings
          </button>
        </div>
      </div>
    </div>
  )
}
