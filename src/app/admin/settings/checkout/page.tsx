import { PageHeader } from "@/components/admin/page-header"
import { CreditCard, Save } from "lucide-react"

export default function CheckoutSettingsPage() {
  return (
    <div>
      <PageHeader
        title="Checkout Settings"
        description="Configure the checkout experience for your customers"
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Settings", href: "/admin/settings" }, { label: "Checkout" }]}
      />

      <div className="max-w-3xl space-y-6">
        {/* Checkout Flow */}
        <div className="bg-white rounded-xl border border-border/50 p-6">
          <div className="flex items-center gap-2 mb-4">
            <CreditCard className="w-4 h-4 text-muted-foreground" />
            <h2 className="font-semibold text-foreground" style={{ fontSize: "14px" }}>Checkout Flow</h2>
          </div>
          <div className="space-y-3">
            {[
              { id: "one-page", label: "One-Page Checkout", description: "All checkout steps on a single page — faster and mobile-friendly", selected: true },
              { id: "multi-step", label: "Multi-Step Checkout", description: "Traditional 3-step flow: Cart → Address → Payment", selected: false },
            ].map(opt => (
              <label key={opt.id} className={`flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-colors ${opt.selected ? "border-[#501D2A] bg-[#501D2A05]" : "border-border/50 hover:bg-muted/20"}`}>
                <div className="w-4 h-4 rounded-full border-2 flex items-center justify-center mt-0.5 shrink-0" style={{ borderColor: opt.selected ? "#501D2A" : "#d1d5db" }}>
                  {opt.selected && <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#501D2A" }} />}
                </div>
                <div>
                  <p className="font-medium text-foreground" style={{ fontSize: "13px" }}>{opt.label}</p>
                  <p className="text-muted-foreground" style={{ fontSize: "12px" }}>{opt.description}</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Required Fields */}
        <div className="bg-white rounded-xl border border-border/50 p-6">
          <h2 className="font-semibold text-foreground mb-4" style={{ fontSize: "14px" }}>Required Checkout Fields</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Phone number", required: true },
              { label: "Company name", required: false },
              { label: "Address line 2", required: false },
              { label: "Date of birth", required: false },
              { label: "State / Province", required: true },
              { label: "ZIP / Postal code", required: true },
            ].map(field => (
              <label key={field.label} className="flex items-center gap-3 cursor-pointer p-2 rounded hover:bg-muted/20">
                <div
                  className="w-4 h-4 rounded border flex items-center justify-center shrink-0"
                  style={{ borderColor: field.required ? "transparent" : "#d1d5db", backgroundColor: field.required ? "#501D2A" : "transparent" }}
                >
                  {field.required && <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 12 12"><path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                </div>
                <span className="text-foreground" style={{ fontSize: "13px" }}>{field.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Policies */}
        <div className="bg-white rounded-xl border border-border/50 p-6">
          <h2 className="font-semibold text-foreground mb-4" style={{ fontSize: "14px" }}>Policies & Agreements</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground" style={{ fontSize: "13px" }}>Require Terms & Conditions Checkbox</p>
                <p className="text-muted-foreground" style={{ fontSize: "12px" }}>Customers must accept T&C before placing an order</p>
              </div>
              <button className="relative inline-flex w-10 h-6 rounded-full" style={{ backgroundColor: "#501D2A" }}>
                <span className="absolute right-1 top-1 w-4 h-4 rounded-full bg-white shadow-sm" />
              </button>
            </div>
            <div className="border-t border-border/30 pt-4 flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground" style={{ fontSize: "13px" }}>Show Privacy Policy Link</p>
                <p className="text-muted-foreground" style={{ fontSize: "12px" }}>Display privacy policy link at checkout</p>
              </div>
              <button className="relative inline-flex w-10 h-6 rounded-full" style={{ backgroundColor: "#501D2A" }}>
                <span className="absolute right-1 top-1 w-4 h-4 rounded-full bg-white shadow-sm" />
              </button>
            </div>
            <div className="border-t border-border/30 pt-4">
              <label className="block text-foreground font-medium mb-1.5" style={{ fontSize: "13px" }}>Order Notes Field</label>
              <select className="w-full border border-border/50 rounded-lg px-3 py-2 text-foreground bg-white" style={{ fontSize: "13px" }}>
                <option>Show as optional field</option>
                <option>Hide completely</option>
                <option>Show as required field</option>
              </select>
            </div>
          </div>
        </div>

        {/* Guest Checkout */}
        <div className="bg-white rounded-xl border border-border/50 p-6">
          <h2 className="font-semibold text-foreground mb-4" style={{ fontSize: "14px" }}>Guest Checkout</h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground" style={{ fontSize: "13px" }}>Enable Guest Checkout</p>
              <p className="text-muted-foreground" style={{ fontSize: "12px" }}>Allow customers to check out without creating an account</p>
            </div>
            <button className="relative inline-flex w-10 h-6 rounded-full" style={{ backgroundColor: "#501D2A" }}>
              <span className="absolute right-1 top-1 w-4 h-4 rounded-full bg-white shadow-sm" />
            </button>
          </div>
        </div>

        <div className="flex justify-end">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-white" style={{ fontSize: "13px", backgroundColor: "#501D2A" }}>
            <Save className="w-4 h-4" />
            Save Checkout Settings
          </button>
        </div>
      </div>
    </div>
  )
}
