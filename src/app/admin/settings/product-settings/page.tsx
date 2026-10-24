import { PageHeader } from "@/components/admin/page-header"
import { Package, Save, Star } from "lucide-react"

export default function ProductSettingsPage() {
  return (
    <div>
      <PageHeader
        title="Product Settings"
        description="Configure product display, SKU, stock, and review behavior"
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Settings", href: "/admin/settings" }, { label: "Product Settings" }]}
      />

      <div className="max-w-3xl space-y-6">
        {/* SKU & Inventory */}
        <div className="bg-white rounded-xl border border-border/50 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Package className="w-4 h-4 text-muted-foreground" />
            <h2 className="font-semibold text-foreground" style={{ fontSize: "14px" }}>SKU & Inventory</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-foreground font-medium mb-1.5" style={{ fontSize: "13px" }}>SKU Prefix</label>
              <div className="flex items-center gap-2">
                <input defaultValue="ME-" className="border border-border/50 rounded-lg px-3 py-2 text-foreground bg-white w-24" style={{ fontSize: "13px" }} />
                <span className="text-muted-foreground" style={{ fontSize: "12px" }}>Example: ME-DRS-BLK-001</span>
              </div>
            </div>
            <div className="border-t border-border/30 pt-4">
              <label className="block text-foreground font-medium mb-1.5" style={{ fontSize: "13px" }}>Low Stock Threshold</label>
              <div className="flex items-center gap-2">
                <input defaultValue="10" className="border border-border/50 rounded-lg px-3 py-2 text-foreground bg-white w-20" style={{ fontSize: "13px" }} />
                <span className="text-muted-foreground" style={{ fontSize: "12px" }}>units — trigger low stock alert below this</span>
              </div>
            </div>
            <div className="border-t border-border/30 pt-4 flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground" style={{ fontSize: "13px" }}>Allow Backorders</p>
                <p className="text-muted-foreground" style={{ fontSize: "12px" }}>Let customers order products that are out of stock</p>
              </div>
              <button className="relative inline-flex w-10 h-6 rounded-full" style={{ backgroundColor: "#e5e7eb" }}>
                <span className="absolute left-1 top-1 w-4 h-4 rounded-full bg-white shadow-sm" />
              </button>
            </div>
            <div className="border-t border-border/30 pt-4 flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground" style={{ fontSize: "13px" }}>Track Inventory by Variant</p>
                <p className="text-muted-foreground" style={{ fontSize: "12px" }}>Track stock per size/color variant instead of total</p>
              </div>
              <button className="relative inline-flex w-10 h-6 rounded-full" style={{ backgroundColor: "#501D2A" }}>
                <span className="absolute right-1 top-1 w-4 h-4 rounded-full bg-white shadow-sm" />
              </button>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div className="bg-white rounded-xl border border-border/50 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Star className="w-4 h-4 text-muted-foreground" />
            <h2 className="font-semibold text-foreground" style={{ fontSize: "14px" }}>Product Reviews</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground" style={{ fontSize: "13px" }}>Enable Product Reviews</p>
                <p className="text-muted-foreground" style={{ fontSize: "12px" }}>Allow customers to submit star ratings and written reviews</p>
              </div>
              <button className="relative inline-flex w-10 h-6 rounded-full" style={{ backgroundColor: "#501D2A" }}>
                <span className="absolute right-1 top-1 w-4 h-4 rounded-full bg-white shadow-sm" />
              </button>
            </div>
            <div className="border-t border-border/30 pt-4 flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground" style={{ fontSize: "13px" }}>Require Purchase to Review</p>
                <p className="text-muted-foreground" style={{ fontSize: "12px" }}>Only verified buyers can submit reviews</p>
              </div>
              <button className="relative inline-flex w-10 h-6 rounded-full" style={{ backgroundColor: "#501D2A" }}>
                <span className="absolute right-1 top-1 w-4 h-4 rounded-full bg-white shadow-sm" />
              </button>
            </div>
            <div className="border-t border-border/30 pt-4 flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground" style={{ fontSize: "13px" }}>Moderate Reviews Before Publishing</p>
                <p className="text-muted-foreground" style={{ fontSize: "12px" }}>New reviews require admin approval before they appear</p>
              </div>
              <button className="relative inline-flex w-10 h-6 rounded-full" style={{ backgroundColor: "#e5e7eb" }}>
                <span className="absolute left-1 top-1 w-4 h-4 rounded-full bg-white shadow-sm" />
              </button>
            </div>
          </div>
        </div>

        {/* Image Requirements */}
        <div className="bg-white rounded-xl border border-border/50 p-6">
          <h2 className="font-semibold text-foreground mb-4" style={{ fontSize: "14px" }}>Image Requirements</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-foreground font-medium mb-1.5" style={{ fontSize: "13px" }}>Recommended Width</label>
              <div className="flex items-center gap-2">
                <input defaultValue="1200" className="border border-border/50 rounded-lg px-3 py-2 text-foreground bg-white w-24" style={{ fontSize: "13px" }} />
                <span className="text-muted-foreground" style={{ fontSize: "12px" }}>px</span>
              </div>
            </div>
            <div>
              <label className="block text-foreground font-medium mb-1.5" style={{ fontSize: "13px" }}>Recommended Height</label>
              <div className="flex items-center gap-2">
                <input defaultValue="1500" className="border border-border/50 rounded-lg px-3 py-2 text-foreground bg-white w-24" style={{ fontSize: "13px" }} />
                <span className="text-muted-foreground" style={{ fontSize: "12px" }}>px</span>
              </div>
            </div>
            <div>
              <label className="block text-foreground font-medium mb-1.5" style={{ fontSize: "13px" }}>Max File Size</label>
              <div className="flex items-center gap-2">
                <input defaultValue="5" className="border border-border/50 rounded-lg px-3 py-2 text-foreground bg-white w-20" style={{ fontSize: "13px" }} />
                <span className="text-muted-foreground" style={{ fontSize: "12px" }}>MB per image</span>
              </div>
            </div>
            <div>
              <label className="block text-foreground font-medium mb-1.5" style={{ fontSize: "13px" }}>Allowed Formats</label>
              <input defaultValue="JPG, PNG, WEBP" className="border border-border/50 rounded-lg px-3 py-2 text-foreground bg-white w-full" style={{ fontSize: "13px" }} />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-white" style={{ fontSize: "13px", backgroundColor: "#501D2A" }}>
            <Save className="w-4 h-4" />
            Save Product Settings
          </button>
        </div>
      </div>
    </div>
  )
}
