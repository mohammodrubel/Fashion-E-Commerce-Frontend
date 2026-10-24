import { PageHeader } from "@/components/admin/page-header"
import { MapPin, Search, Pencil, Trash2, CheckCircle, Home, Building2 } from "lucide-react"

interface Address {
  id: string
  customer: string
  initials: string
  type: "Home" | "Work" | "Other"
  street: string
  city: string
  state: string
  country: string
  postal: string
  isDefault: boolean
}

const addresses: Address[] = [
  { id: "A001", customer: "Sarah Johnson", initials: "SJ", type: "Home", street: "142 Maple Avenue, Apt 3B", city: "New York", state: "NY", country: "United States", postal: "10001", isDefault: true },
  { id: "A002", customer: "Sarah Johnson", initials: "SJ", type: "Work", street: "350 Fifth Avenue, Floor 12", city: "New York", state: "NY", country: "United States", postal: "10118", isDefault: false },
  { id: "A003", customer: "Michael Chen", initials: "MC", type: "Home", street: "87 Sunset Blvd", city: "Los Angeles", state: "CA", country: "United States", postal: "90028", isDefault: true },
  { id: "A004", customer: "Emma Wilson", initials: "EW", type: "Home", street: "22 Baker Street", city: "London", state: "", country: "United Kingdom", postal: "W1U 3BW", isDefault: true },
  { id: "A005", customer: "Olivia Davis", initials: "OD", type: "Home", street: "56 Park Lane", city: "Chicago", state: "IL", country: "United States", postal: "60611", isDefault: true },
  { id: "A006", customer: "Olivia Davis", initials: "OD", type: "Work", street: "233 S Wacker Dr, Suite 400", city: "Chicago", state: "IL", country: "United States", postal: "60606", isDefault: false },
  { id: "A007", customer: "Sophia Anderson", initials: "SA", type: "Home", street: "1200 Ocean Drive, Unit 7", city: "Miami", state: "FL", country: "United States", postal: "33139", isDefault: true },
  { id: "A008", customer: "James Brown", initials: "JB", type: "Other", street: "450 University Ave", city: "Toronto", state: "ON", country: "Canada", postal: "M5G 1V2", isDefault: true },
]

const typeConfig = {
  Home: { icon: Home, color: "#501D2A", bg: "#F0EDEF" },
  Work: { icon: Building2, color: "#2D5A8E", bg: "#EFF6FF" },
  Other: { icon: MapPin, color: "#6B7280", bg: "#F3F4F6" },
}

export default function CustomerAddressesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Customer Addresses"
        description="Manage shipping and billing addresses for all customers"
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Customers", href: "/admin/customers" }, { label: "Addresses" }]}
      />

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total Addresses", value: "2,187" },
          { label: "Home Addresses", value: "1,402" },
          { label: "Work Addresses", value: "785" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-border/50 p-4">
            <p className="text-muted-foreground" style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.07em" }}>{s.label}</p>
            <p className="font-semibold text-foreground mt-1" style={{ fontSize: "22px" }}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-border/50">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 px-5 py-4" style={{ borderBottom: "1px solid #F0EDEF" }}>
          <div className="relative flex-1 w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
            <input
              type="text"
              placeholder="Search by customer or city..."
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-border/60 bg-[#F8F7F5] placeholder:text-muted-foreground focus:outline-none focus:border-primary/40"
              style={{ fontSize: "13px" }}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid #F0EDEF" }}>
                {["Customer", "Type", "Street Address", "City", "Country", "Postal", "Default", "Actions"].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-muted-foreground font-medium" style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.07em" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {addresses.map((a, i) => {
                const typeCfg = typeConfig[a.type]
                const TypeIcon = typeCfg.icon
                return (
                  <tr
                    key={a.id}
                    className="hover:bg-[#F8F7F5] transition-colors"
                    style={{ borderBottom: i < addresses.length - 1 ? "1px solid #F0EDEF" : "none" }}
                  >
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full flex items-center justify-center text-white font-semibold shrink-0" style={{ backgroundColor: "#501D2A", fontSize: "10px" }}>
                          {a.initials}
                        </div>
                        <span className="font-medium text-foreground" style={{ fontSize: "13px" }}>{a.customer}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-1.5">
                        <div className="w-6 h-6 rounded flex items-center justify-center" style={{ backgroundColor: typeCfg.bg }}>
                          <TypeIcon className="w-3 h-3" style={{ color: typeCfg.color }} strokeWidth={1.5} />
                        </div>
                        <span className="text-foreground" style={{ fontSize: "13px" }}>{a.type}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-muted-foreground" style={{ fontSize: "13px" }}>{a.street}</td>
                    <td className="px-5 py-3 text-foreground" style={{ fontSize: "13px" }}>{a.city}{a.state ? `, ${a.state}` : ""}</td>
                    <td className="px-5 py-3 text-foreground" style={{ fontSize: "13px" }}>{a.country}</td>
                    <td className="px-5 py-3 text-muted-foreground font-mono" style={{ fontSize: "12px" }}>{a.postal}</td>
                    <td className="px-5 py-3">
                      {a.isDefault ? (
                        <CheckCircle className="w-4 h-4 text-emerald-600" strokeWidth={2} />
                      ) : (
                        <span className="text-muted-foreground/40" style={{ fontSize: "13px" }}>—</span>
                      )}
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-1">
                        <button className="p-1.5 rounded-lg hover:bg-[#F0EDEF] transition-colors text-muted-foreground hover:text-foreground">
                          <Pencil className="w-3.5 h-3.5" strokeWidth={1.5} />
                        </button>
                        <button className="p-1.5 rounded-lg hover:bg-red-50 transition-colors text-muted-foreground hover:text-red-600">
                          <Trash2 className="w-3.5 h-3.5" strokeWidth={1.5} />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <div className="px-5 py-4" style={{ borderTop: "1px solid #F0EDEF" }}>
          <p className="text-muted-foreground" style={{ fontSize: "12px" }}>Showing 8 of 2,187 addresses</p>
        </div>
      </div>
    </div>
  )
}
