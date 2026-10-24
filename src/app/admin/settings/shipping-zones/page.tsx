import { PageHeader } from "@/components/admin/page-header"
import { Globe, ChevronDown, Plus, Edit } from "lucide-react"

const zones = [
  {
    name: "Domestic (USA)",
    regions: "50 US states + territories",
    countries: ["Alabama", "Alaska", "Arizona", "California", "New York", "+46 more"],
    methods: ["Standard", "Express", "Overnight", "Economy", "Free Shipping"],
    status: "active",
    orders: 1420,
  },
  {
    name: "European Union",
    regions: "27 EU member states",
    countries: ["France", "Germany", "Italy", "Spain", "Netherlands", "+22 more"],
    methods: ["International Economy", "International Express"],
    status: "active",
    orders: 218,
  },
  {
    name: "North America (CA & MX)",
    regions: "Canada and Mexico",
    countries: ["Canada", "Mexico"],
    methods: ["International Economy", "International Express"],
    status: "active",
    orders: 142,
  },
  {
    name: "International",
    regions: "Rest of World",
    countries: ["Australia", "Japan", "South Korea", "UAE", "Brazil", "+120 more"],
    methods: ["International Economy"],
    status: "active",
    orders: 67,
  },
]

export default function ShippingZonesPage() {
  return (
    <div>
      <PageHeader
        title="Shipping Zones"
        description="Define geographic zones and the shipping methods available in each"
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Settings", href: "/admin/settings" }, { label: "Shipping Zones" }]}
        actions={
          <button
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-white"
            style={{ fontSize: "13px", backgroundColor: "#501D2A" }}
          >
            <Plus className="w-4 h-4" />
            Add Zone
          </button>
        }
      />

      <div className="space-y-4">
        {zones.map(zone => (
          <div key={zone.name} className="bg-white rounded-xl border border-border/50">
            <div className="px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#501D2A15" }}>
                  <Globe className="w-4 h-4" style={{ color: "#501D2A" }} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-foreground" style={{ fontSize: "14px" }}>{zone.name}</h3>
                    <span className="px-2 py-0.5 rounded-full text-emerald-700 bg-emerald-50 font-medium" style={{ fontSize: "10px" }}>Active</span>
                  </div>
                  <p className="text-muted-foreground" style={{ fontSize: "12px" }}>{zone.regions} · {zone.orders} orders this year</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground" style={{ fontSize: "12px" }}>
                  <Edit className="w-3.5 h-3.5" />
                  Edit
                </button>
              </div>
            </div>
            <div className="px-6 pb-4 border-t border-border/30 pt-4">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-muted-foreground mb-2" style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.06em" }}>Countries / Regions</p>
                  <div className="flex flex-wrap gap-1.5">
                    {zone.countries.map(c => (
                      <span key={c} className="px-2 py-0.5 rounded bg-muted/40 text-foreground" style={{ fontSize: "11px" }}>{c}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-muted-foreground mb-2" style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.06em" }}>Shipping Methods</p>
                  <div className="flex flex-wrap gap-1.5">
                    {zone.methods.map(m => (
                      <span key={m} className="px-2 py-0.5 rounded border border-border/50 text-foreground bg-white" style={{ fontSize: "11px" }}>{m}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
