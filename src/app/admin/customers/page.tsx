import { PageHeader } from "@/components/admin/page-header"
import {
  Plus, Search, SlidersHorizontal, MoreHorizontal, Eye, Pencil, Trash2,
  Users, UserCheck, UserPlus, Crown, ChevronDown,
} from "lucide-react"

interface Customer {
  id: string
  name: string
  initials: string
  email: string
  phone: string
  orders: number
  spent: string
  joined: string
  status: "Active" | "Inactive" | "Blocked"
  group: "Regular" | "Silver" | "Gold" | "Platinum" | "VIP"
}

const customers: Customer[] = [
  { id: "C001", name: "Sarah Johnson", initials: "SJ", email: "sarah.johnson@email.com", phone: "+1 (555) 234-5678", orders: 14, spent: "$1,842.00", joined: "Mar 12, 2024", status: "Active", group: "Gold" },
  { id: "C002", name: "Michael Chen", initials: "MC", email: "m.chen@email.com", phone: "+1 (555) 876-5432", orders: 8, spent: "$964.50", joined: "Jun 3, 2024", status: "Active", group: "Silver" },
  { id: "C003", name: "Emma Wilson", initials: "EW", email: "emma.w@email.com", phone: "+1 (555) 321-9876", orders: 31, spent: "$5,320.00", joined: "Jan 8, 2023", status: "Active", group: "VIP" },
  { id: "C004", name: "James Brown", initials: "JB", email: "jbrown@email.com", phone: "+1 (555) 654-3210", orders: 3, spent: "$187.00", joined: "Sep 19, 2024", status: "Active", group: "Regular" },
  { id: "C005", name: "Olivia Davis", initials: "OD", email: "olivia.d@email.com", phone: "+1 (555) 112-4567", orders: 22, spent: "$3,108.00", joined: "Apr 4, 2023", status: "Active", group: "Platinum" },
  { id: "C006", name: "Liam Martinez", initials: "LM", email: "liam.m@email.com", phone: "+1 (555) 789-0123", orders: 5, spent: "$412.00", joined: "Nov 27, 2024", status: "Inactive", group: "Regular" },
  { id: "C007", name: "Sophia Anderson", initials: "SA", email: "sophia.a@email.com", phone: "+1 (555) 456-7890", orders: 18, spent: "$2,265.00", joined: "Feb 14, 2024", status: "Active", group: "Gold" },
  { id: "C008", name: "Noah Taylor", initials: "NT", email: "noah.t@email.com", phone: "+1 (555) 234-0987", orders: 1, spent: "$89.00", joined: "Oct 5, 2025", status: "Active", group: "Regular" },
]

const statusConfig = {
  Active: "bg-emerald-50 text-emerald-700",
  Inactive: "bg-gray-100 text-gray-500",
  Blocked: "bg-red-50 text-red-600",
}

const groupConfig = {
  Regular: "bg-gray-100 text-gray-600",
  Silver: "bg-slate-100 text-slate-600",
  Gold: "bg-amber-50 text-amber-700",
  Platinum: "bg-blue-50 text-blue-700",
  VIP: "bg-purple-50 text-purple-700",
}

export default function AllCustomersPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="All Customers"
        description="Manage your customer base and relationships"
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Customers" }]}
        actions={
          <a
            href="/admin/customers/new"
            className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
            style={{ fontSize: "13px" }}
          >
            <Plus className="w-4 h-4" strokeWidth={1.5} /> Add Customer
          </a>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Customers", value: "1,243", sub: "all time", icon: Users, color: "#501D2A" },
          { label: "Active", value: "1,098", sub: "last 90 days", icon: UserCheck, color: "#2D6B4F" },
          { label: "New This Month", value: "47", sub: "October 2026", icon: UserPlus, color: "#2D5A8E" },
          { label: "VIP", value: "89", sub: "top tier", icon: Crown, color: "#7C3AED" },
        ].map((s) => {
          const Icon = s.icon
          return (
            <div key={s.label} className="bg-white rounded-xl border border-border/50 p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-muted-foreground" style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.07em" }}>{s.label}</span>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: s.color + "15" }}>
                  <Icon className="w-4 h-4" style={{ color: s.color }} strokeWidth={1.5} />
                </div>
              </div>
              <p className="font-semibold text-foreground" style={{ fontSize: "22px" }}>{s.value}</p>
              <p className="text-muted-foreground" style={{ fontSize: "11px" }}>{s.sub}</p>
            </div>
          )
        })}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-border/50">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 px-5 py-4" style={{ borderBottom: "1px solid #F0EDEF" }}>
          <div className="relative flex-1 w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
            <input
              type="text"
              placeholder="Search customers..."
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-border/60 bg-[#F8F7F5] text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/40"
              style={{ fontSize: "13px" }}
            />
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border/60 bg-white hover:bg-[#F8F7F5] transition-colors text-muted-foreground" style={{ fontSize: "13px" }}>
              <SlidersHorizontal className="w-3.5 h-3.5" strokeWidth={1.5} />
              Filter
            </button>
            <button className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border/60 bg-white hover:bg-[#F8F7F5] transition-colors text-muted-foreground" style={{ fontSize: "13px" }}>
              Group
              <ChevronDown className="w-3.5 h-3.5" strokeWidth={1.5} />
            </button>
            <button className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border/60 bg-white hover:bg-[#F8F7F5] transition-colors text-muted-foreground" style={{ fontSize: "13px" }}>
              Status
              <ChevronDown className="w-3.5 h-3.5" strokeWidth={1.5} />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid #F0EDEF" }}>
                {["Customer", "Email", "Phone", "Orders", "Total Spent", "Joined", "Status", "Actions"].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-muted-foreground font-medium" style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.07em" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {customers.map((c, i) => (
                <tr
                  key={c.id}
                  className="hover:bg-[#F8F7F5] transition-colors"
                  style={{ borderBottom: i < customers.length - 1 ? "1px solid #F0EDEF" : "none" }}
                >
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold shrink-0" style={{ backgroundColor: "#501D2A", fontSize: "11px" }}>
                        {c.initials}
                      </div>
                      <div>
                        <p className="font-medium text-foreground" style={{ fontSize: "13px" }}>{c.name}</p>
                        <span className={`inline-flex items-center rounded-full px-2 py-0 font-medium ${groupConfig[c.group]}`} style={{ fontSize: "10px" }}>{c.group}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-muted-foreground" style={{ fontSize: "13px" }}>{c.email}</td>
                  <td className="px-5 py-3 text-muted-foreground" style={{ fontSize: "13px" }}>{c.phone}</td>
                  <td className="px-5 py-3 text-foreground font-medium" style={{ fontSize: "13px" }}>{c.orders}</td>
                  <td className="px-5 py-3 font-medium text-foreground" style={{ fontSize: "13px" }}>{c.spent}</td>
                  <td className="px-5 py-3 text-muted-foreground" style={{ fontSize: "13px" }}>{c.joined}</td>
                  <td className="px-5 py-3">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 font-medium ${statusConfig[c.status]}`} style={{ fontSize: "11px" }}>{c.status}</span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-1">
                      <button className="p-1.5 rounded-lg hover:bg-[#F0EDEF] transition-colors text-muted-foreground hover:text-foreground">
                        <Eye className="w-3.5 h-3.5" strokeWidth={1.5} />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-[#F0EDEF] transition-colors text-muted-foreground hover:text-foreground">
                        <Pencil className="w-3.5 h-3.5" strokeWidth={1.5} />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-red-50 transition-colors text-muted-foreground hover:text-red-600">
                        <Trash2 className="w-3.5 h-3.5" strokeWidth={1.5} />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-[#F0EDEF] transition-colors text-muted-foreground hover:text-foreground">
                        <MoreHorizontal className="w-3.5 h-3.5" strokeWidth={1.5} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between px-5 py-4" style={{ borderTop: "1px solid #F0EDEF" }}>
          <p className="text-muted-foreground" style={{ fontSize: "12px" }}>Showing 8 of 1,243 customers</p>
          <div className="flex items-center gap-1">
            {["1", "2", "3", "...", "156"].map((p) => (
              <button key={p} className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${p === "1" ? "bg-primary text-primary-foreground" : "hover:bg-[#F0EDEF] text-muted-foreground"}`} style={{ fontSize: "13px" }}>{p}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
