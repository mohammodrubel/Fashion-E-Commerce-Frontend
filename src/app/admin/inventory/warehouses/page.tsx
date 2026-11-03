import { PageHeader } from "@/components/admin/page-header"
import { Plus, Warehouse, MapPin, User, Package, Pencil } from "lucide-react"

interface WarehouseData {
  name: string
  location: string
  address: string
  manager: string
  totalSkus: number
  totalUnits: number
  capacity: number
  maxCapacity: number
  color: string
  status: "Active" | "Maintenance"
  zones: string[]
}

const warehouses: WarehouseData[] = [
  {
    name: "Main Warehouse",
    location: "New York, NY",
    address: "1200 Industrial Blvd, Brooklyn, NY 11201",
    manager: "Jake Donovan",
    totalSkus: 198,
    totalUnits: 4820,
    capacity: 72,
    maxCapacity: 6700,
    color: "#202127",
    status: "Active",
    zones: ["Apparel A", "Apparel B", "Accessories", "Footwear", "Returns"],
  },
  {
    name: "East Branch",
    location: "Boston, MA",
    address: "88 Commerce Street, Boston, MA 02110",
    manager: "Priya Mehta",
    totalSkus: 87,
    totalUnits: 1940,
    capacity: 45,
    maxCapacity: 4300,
    color: "#2D5A8E",
    status: "Active",
    zones: ["Apparel", "Accessories", "Dispatch"],
  },
  {
    name: "West Branch",
    location: "Los Angeles, CA",
    address: "540 Harbor Freight Way, Los Angeles, CA 90021",
    manager: "Marco Reyes",
    totalSkus: 57,
    totalUnits: 1230,
    capacity: 38,
    maxCapacity: 3200,
    color: "#2D6B4F",
    status: "Active",
    zones: ["Apparel", "Dispatch"],
  },
]

export default function WarehousesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Warehouses"
        description="Manage your warehouse locations and their inventory"
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Inventory", href: "/admin/inventory" }, { label: "Warehouses" }]}
        actions={
          <button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors" style={{ fontSize: "13px" }}>
            <Plus className="w-4 h-4" strokeWidth={1.5} /> Add Warehouse
          </button>
        }
      />

      {/* Summary Strip */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total Warehouses", value: "3" },
          { label: "Total SKUs Managed", value: "342" },
          { label: "Combined Units", value: "7,990" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-border/50 p-4">
            <p className="text-muted-foreground" style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.07em" }}>{s.label}</p>
            <p className="font-semibold text-foreground mt-1" style={{ fontSize: "22px" }}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Warehouse Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {warehouses.map((w) => (
          <div key={w.name} className="bg-white rounded-xl border border-border/50 overflow-hidden">
            {/* Card Header */}
            <div className="p-5" style={{ borderBottom: "1px solid var(--accent)" }}>
              <div className="flex items-start justify-between mb-3">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ backgroundColor: w.color + "15" }}>
                  <Warehouse className="w-5 h-5" style={{ color: w.color }} strokeWidth={1.5} />
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center rounded-full px-2.5 py-0.5 bg-emerald-50 text-emerald-700 font-medium" style={{ fontSize: "11px" }}>{w.status}</span>
                  <button className="p-1.5 rounded-lg hover:bg-[var(--accent)] transition-colors text-muted-foreground">
                    <Pencil className="w-3.5 h-3.5" strokeWidth={1.5} />
                  </button>
                </div>
              </div>
              <h3 className="font-semibold text-foreground" style={{ fontSize: "15px" }}>{w.name}</h3>
              <div className="flex items-center gap-1 mt-1">
                <MapPin className="w-3 h-3 text-muted-foreground" strokeWidth={1.5} />
                <p className="text-muted-foreground" style={{ fontSize: "12px" }}>{w.address}</p>
              </div>
            </div>

            {/* Stats */}
            <div className="p-5 space-y-4">
              <div className="flex items-center gap-2">
                <User className="w-3.5 h-3.5 text-muted-foreground" strokeWidth={1.5} />
                <span className="text-muted-foreground" style={{ fontSize: "12px" }}>Manager:</span>
                <span className="font-medium text-foreground" style={{ fontSize: "12px" }}>{w.manager}</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-lg" style={{ backgroundColor: "var(--muted)" }}>
                  <p className="text-muted-foreground" style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.06em" }}>Total SKUs</p>
                  <p className="font-semibold text-foreground mt-0.5" style={{ fontSize: "18px" }}>{w.totalSkus}</p>
                </div>
                <div className="p-3 rounded-lg" style={{ backgroundColor: "var(--muted)" }}>
                  <div className="flex items-center gap-1.5">
                    <Package className="w-3 h-3 text-muted-foreground" strokeWidth={1.5} />
                    <p className="text-muted-foreground" style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.06em" }}>Units</p>
                  </div>
                  <p className="font-semibold text-foreground mt-0.5" style={{ fontSize: "18px" }}>{w.totalUnits.toLocaleString()}</p>
                </div>
              </div>

              {/* Capacity Bar */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-muted-foreground" style={{ fontSize: "12px" }}>Capacity Used</span>
                  <span className="font-semibold" style={{ fontSize: "12px", color: w.color }}>{w.capacity}%</span>
                </div>
                <div className="w-full rounded-full h-2" style={{ backgroundColor: "var(--accent)" }}>
                  <div className="h-2 rounded-full transition-all" style={{ width: `${w.capacity}%`, backgroundColor: w.color }} />
                </div>
                <p className="text-muted-foreground mt-1" style={{ fontSize: "11px" }}>{w.totalUnits.toLocaleString()} / {w.maxCapacity.toLocaleString()} units</p>
              </div>

              {/* Zones */}
              <div>
                <p className="text-muted-foreground mb-2" style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.06em" }}>Zones</p>
                <div className="flex flex-wrap gap-1.5">
                  {w.zones.map((z) => (
                    <span key={z} className="inline-flex items-center rounded px-2 py-0.5 bg-[var(--muted)] text-muted-foreground" style={{ fontSize: "11px" }}>{z}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
