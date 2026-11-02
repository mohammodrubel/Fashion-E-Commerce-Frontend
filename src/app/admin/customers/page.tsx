"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { toast } from "sonner"
import { PageHeader } from "@/components/admin/page-header"
import {
  Plus, Search, Pencil, Trash2, Users, UserCheck, ShieldOff, ShieldCheck,
  ChevronDown, ChevronLeft, ChevronRight, Loader2,
} from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { TableSkeletonRows } from "@/components/admin/table-skeleton-rows"
import {
  useGetAllUsersQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} from "@/redux/fetchers/user/userApi"

export default function AllCustomersPage() {
  const [searchInput, setSearchInput] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [isActive, setIsActive] = useState<string>("")
  const [page, setPage] = useState(1)
  const limit = 10

  useEffect(() => {
    const t = setTimeout(() => {
      setSearchTerm(searchInput.trim())
      setPage(1)
    }, 400)
    return () => clearTimeout(t)
  }, [searchInput])

  const queryParams = useMemo(
    () => ({
      page,
      limit,
      role: "USER",
      sort: "createdAt",
      order: "desc",
      ...(searchTerm ? { searchTerm } : {}),
      ...(isActive ? { isActive } : {}),
    }),
    [page, searchTerm, isActive],
  )

  const { data, isLoading, isFetching } = useGetAllUsersQuery(queryParams)
  const { data: activeCountData } = useGetAllUsersQuery({ role: "USER", isActive: "true", page: 1, limit: 1 })
  const { data: blockedCountData } = useGetAllUsersQuery({ role: "USER", isActive: "false", page: 1, limit: 1 })

  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation()
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation()

  const customers = data?.data ?? []
  const meta = data?.meta ?? { page: 1, limit, total: 0, totalPage: 1 }

  async function handleToggleBlock(id: string, nextActive: boolean) {
    if (!confirm(nextActive ? "Unblock this customer?" : "Block this customer? They will not be able to log in.")) return
    try {
      await updateUser({ id, data: { isActive: nextActive } }).unwrap()
      toast.success(nextActive ? "Customer unblocked" : "Customer blocked")
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update customer.")
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this customer? This cannot be undone.")) return
    try {
      await deleteUser(id).unwrap()
      toast.success("Customer deleted successfully")
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to delete customer.")
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="All Customers"
        description="Manage your customer base and relationships"
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Customers" }]}
        actions={
          <Link
            href="/admin/customers/new"
            className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
            style={{ fontSize: "13px" }}
          >
            <Plus className="w-4 h-4" strokeWidth={1.5} /> Add Customer
          </Link>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {[
          { label: "Total Customers", value: String(meta.total ?? 0), sub: "matching current filters", icon: Users, color: "#501D2A" },
          { label: "Active", value: String(activeCountData?.meta?.total ?? 0), sub: "can log in", icon: UserCheck, color: "#2D6B4F" },
          { label: "Blocked", value: String(blockedCountData?.meta?.total ?? 0), sub: "cannot log in", icon: ShieldOff, color: "#DC2626" },
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
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search by name, email, phone..."
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-border/60 bg-[#F8F7F5] text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/40"
              style={{ fontSize: "13px" }}
            />
          </div>
          <div className="relative">
            <select
              value={isActive}
              onChange={(e) => { setIsActive(e.target.value); setPage(1) }}
              className="appearance-none pl-3 pr-8 py-2 rounded-lg border border-border/60 bg-white hover:bg-[#F8F7F5] transition-colors text-foreground"
              style={{ fontSize: "13px" }}
            >
              <option value="">All status</option>
              <option value="true">Active</option>
              <option value="false">Blocked</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" strokeWidth={1.5} />
          </div>
          {isFetching && !isLoading && (
            <Loader2 className="w-4 h-4 animate-spin text-muted-foreground ml-auto" strokeWidth={1.5} />
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid #F0EDEF" }}>
                {["Customer", "Email", "Phone", "Orders", "Addresses", "Joined", "Status", "Actions"].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-muted-foreground font-medium" style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.07em" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {isLoading && <TableSkeletonRows columns={8} />}
              {!isLoading && customers.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-5 py-8 text-center text-muted-foreground" style={{ fontSize: "13px" }}>
                    No customers found.
                  </td>
                </tr>
              )}
              {customers.map((c: any, i: number) => {
                const initials = (c.name || "?").split(" ").map((w: string) => w[0]).join("").slice(0, 2).toUpperCase()
                return (
                  <tr
                    key={c.id}
                    className="hover:bg-[#F8F7F5] transition-colors"
                    style={{ borderBottom: i < customers.length - 1 ? "1px solid #F0EDEF" : "none" }}
                  >
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold shrink-0" style={{ backgroundColor: "#501D2A", fontSize: "11px" }}>
                          {initials}
                        </div>
                        <p className="font-medium text-foreground" style={{ fontSize: "13px" }}>{c.name}</p>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-muted-foreground" style={{ fontSize: "13px" }}>{c.email}</td>
                    <td className="px-5 py-3 text-muted-foreground" style={{ fontSize: "13px" }}>{c.phone || "—"}</td>
                    <td className="px-5 py-3 text-foreground font-medium" style={{ fontSize: "13px" }}>{c._count?.orders ?? 0}</td>
                    <td className="px-5 py-3 text-foreground" style={{ fontSize: "13px" }}>{c._count?.addresses ?? 0}</td>
                    <td className="px-5 py-3 text-muted-foreground" style={{ fontSize: "13px" }}>{new Date(c.createdAt).toLocaleDateString()}</td>
                    <td className="px-5 py-3">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 font-medium ${c.isActive ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-600"}`} style={{ fontSize: "11px" }}>
                        {c.isActive ? "Active" : "Blocked"}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-1">
                        <Link
                          href={`/admin/customers/${c.id}/edit`}
                          className="p-1.5 rounded-lg hover:bg-[#F0EDEF] transition-colors text-muted-foreground hover:text-foreground inline-flex"
                        >
                          <Pencil className="w-3.5 h-3.5" strokeWidth={1.5} />
                        </Link>
                        <button
                          onClick={() => handleToggleBlock(c.id, !c.isActive)}
                          disabled={isUpdating}
                          className="p-1.5 rounded-lg hover:bg-amber-50 transition-colors text-muted-foreground hover:text-amber-700 disabled:opacity-50"
                          title={c.isActive ? "Block" : "Unblock"}
                        >
                          {c.isActive ? <ShieldOff className="w-3.5 h-3.5" strokeWidth={1.5} /> : <ShieldCheck className="w-3.5 h-3.5" strokeWidth={1.5} />}
                        </button>
                        <button
                          onClick={() => handleDelete(c.id)}
                          disabled={isDeleting}
                          className="p-1.5 rounded-lg hover:bg-red-50 transition-colors text-muted-foreground hover:text-red-600 disabled:opacity-50"
                        >
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

        <div className="flex items-center justify-between px-5 py-4" style={{ borderTop: "1px solid #F0EDEF" }}>
          <p className="text-muted-foreground" style={{ fontSize: "12px" }}>
            {isLoading ? <Skeleton className="h-3 w-40" /> : `Showing ${customers.length} of ${meta.total ?? 0} customers`}
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={(meta.page ?? 1) <= 1}
              className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[#F0EDEF] text-muted-foreground disabled:opacity-40 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" strokeWidth={1.5} />
            </button>
            <span className="px-3 text-foreground" style={{ fontSize: "13px" }}>
              Page {meta.page ?? 1} of {meta.totalPage ?? 1}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(meta.totalPage ?? 1, p + 1))}
              disabled={(meta.page ?? 1) >= (meta.totalPage ?? 1)}
              className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[#F0EDEF] text-muted-foreground disabled:opacity-40 transition-colors"
            >
              <ChevronRight className="w-4 h-4" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
