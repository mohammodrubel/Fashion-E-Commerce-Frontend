"use client"

import { useEffect, useMemo, useState } from "react"
import { toast } from "sonner"
import { PageHeader } from "@/components/admin/page-header"
import { ShieldOff, ShieldCheck, AlertTriangle, Search, Loader2, ChevronLeft, ChevronRight } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { useGetAllUsersQuery, useUpdateUserMutation } from "@/redux/fetchers/user/userApi"

export default function BlockedCustomersPage() {
  const [searchInput, setSearchInput] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [page, setPage] = useState(1)
  const limit = 10

  useEffect(() => {
    const t = setTimeout(() => { setSearchTerm(searchInput.trim()); setPage(1) }, 400)
    return () => clearTimeout(t)
  }, [searchInput])

  const queryParams = useMemo(
    () => ({
      page,
      limit,
      role: "USER",
      isActive: "false",
      sort: "updatedAt",
      order: "desc",
      ...(searchTerm ? { searchTerm } : {}),
    }),
    [page, searchTerm],
  )

  const { data, isLoading, isFetching } = useGetAllUsersQuery(queryParams)
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation()

  const blocked = data?.data ?? []
  const meta = data?.meta ?? { page: 1, limit, total: 0, totalPage: 1 }

  async function handleUnblock(id: string) {
    if (!confirm("Unblock this customer? They will regain full access to their account.")) return
    try {
      await updateUser({ id, data: { isActive: true } }).unwrap()
      toast.success("Customer unblocked")
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to unblock customer.")
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Blocked Customers"
        description="Accounts that have been blocked from accessing the store"
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Customers", href: "/admin/customers" }, { label: "Blocked" }]}
      />

      <div className="flex items-start gap-3 p-4 rounded-xl border" style={{ backgroundColor: "#FFF7ED", borderColor: "#FED7AA" }}>
        <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" style={{ color: "#C2410C" }} strokeWidth={1.5} />
        <div>
          <p className="font-medium" style={{ fontSize: "13px", color: "#C2410C" }}>Handle blocked accounts with care</p>
          <p className="text-muted-foreground mt-0.5" style={{ fontSize: "12px" }}>
            Unblocking a customer restores full access to their account and all purchase capabilities.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-border/50">
        <div className="flex items-center gap-3 px-5 py-4" style={{ borderBottom: "1px solid #F0EDEF" }}>
          <ShieldOff className="w-4 h-4" style={{ color: "#DC2626" }} strokeWidth={1.5} />
          <h2 className="font-semibold text-foreground" style={{ fontSize: "14px" }}>
            Blocked Accounts {isLoading ? "" : `(${meta.total ?? 0})`}
          </h2>
          <div className="relative flex-1 max-w-xs ml-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search blocked customers..."
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-border/60 bg-[#F8F7F5] placeholder:text-muted-foreground focus:outline-none focus:border-primary/40"
              style={{ fontSize: "13px" }}
            />
          </div>
          {isFetching && !isLoading && (
            <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" strokeWidth={1.5} />
          )}
        </div>

        {!isLoading && blocked.length === 0 && (
          <p className="px-5 py-8 text-center text-muted-foreground" style={{ fontSize: "13px" }}>
            No blocked customers.
          </p>
        )}

        {isLoading && (
          <div className="divide-y" style={{ borderColor: "#F0EDEF" }}>
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4 px-5 py-5">
                <Skeleton className="size-10 shrink-0 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-3 w-56" />
                </div>
                <Skeleton className="h-8 w-24 shrink-0 rounded-lg" />
              </div>
            ))}
          </div>
        )}

        <div className="divide-y" style={{ borderColor: "#F0EDEF" }}>
          {blocked.map((c: any) => {
            const initials = (c.name || "?").split(" ").map((w: string) => w[0]).join("").slice(0, 2).toUpperCase()
            return (
              <div key={c.id} className="px-5 py-5 hover:bg-[#F8F7F5] transition-colors">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="relative shrink-0">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold" style={{ backgroundColor: "#9CA3AF", fontSize: "12px" }}>
                        {initials}
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-red-600 flex items-center justify-center">
                        <ShieldOff className="w-3 h-3 text-white" strokeWidth={2} />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-foreground" style={{ fontSize: "14px" }}>{c.name}</p>
                        <span className="inline-flex items-center rounded-full px-2 py-0.5 bg-red-50 text-red-600 font-medium" style={{ fontSize: "10px" }}>Blocked</span>
                      </div>
                      <p className="text-muted-foreground" style={{ fontSize: "12px" }}>{c.email}{c.phone ? ` · ${c.phone}` : ""}</p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5 shrink-0 sm:text-right">
                    <p className="text-muted-foreground" style={{ fontSize: "11px" }}>{c._count?.orders ?? 0} orders on record</p>
                    <p className="text-muted-foreground" style={{ fontSize: "11px" }}>Updated {new Date(c.updatedAt).toLocaleDateString()}</p>
                  </div>

                  <div className="shrink-0">
                    <button
                      onClick={() => handleUnblock(c.id)}
                      disabled={isUpdating}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-emerald-200 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 transition-colors disabled:opacity-50"
                      style={{ fontSize: "12px" }}
                    >
                      <ShieldCheck className="w-3.5 h-3.5" strokeWidth={1.5} />
                      Unblock
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {meta.totalPage > 1 && (
          <div className="flex items-center justify-between px-5 py-4" style={{ borderTop: "1px solid #F0EDEF" }}>
            <p className="text-muted-foreground" style={{ fontSize: "12px" }}>Page {meta.page} of {meta.totalPage}</p>
            <div className="flex items-center gap-1">
              <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={(meta.page ?? 1) <= 1} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[#F0EDEF] text-muted-foreground disabled:opacity-40 transition-colors">
                <ChevronLeft className="w-4 h-4" strokeWidth={1.5} />
              </button>
              <button onClick={() => setPage((p) => Math.min(meta.totalPage ?? 1, p + 1))} disabled={(meta.page ?? 1) >= (meta.totalPage ?? 1)} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[#F0EDEF] text-muted-foreground disabled:opacity-40 transition-colors">
                <ChevronRight className="w-4 h-4" strokeWidth={1.5} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
