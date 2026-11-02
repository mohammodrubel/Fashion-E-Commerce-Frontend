"use client"

import { useEffect, useMemo, useState } from "react"
import { toast } from "sonner"
import { PageHeader } from "@/components/admin/page-header"
import { MapPin, Search, Pencil, Trash2, CheckCircle, Plus, X, Loader2, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { TableSkeletonRows } from "@/components/admin/table-skeleton-rows"
import {
  useGetAllAddressesQuery,
  useCreateAddressMutation,
  useUpdateAddressMutation,
  useDeleteAddressMutation,
} from "@/redux/fetchers/address/addressApi"
import { useGetAllUsersQuery } from "@/redux/fetchers/user/userApi"

const INPUT_CLASS =
  "w-full px-3 py-2.5 rounded-lg border border-border/60 bg-white text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
const LABEL_CLASS = "block font-medium text-foreground mb-1.5"

export default function CustomerAddressesPage() {
  const [searchInput, setSearchInput] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [page, setPage] = useState(1)
  const limit = 10

  useEffect(() => {
    const t = setTimeout(() => { setSearchTerm(searchInput.trim()); setPage(1) }, 400)
    return () => clearTimeout(t)
  }, [searchInput])

  const queryParams = useMemo(
    () => ({ page, limit, sort: "createdAt", order: "desc", ...(searchTerm ? { searchTerm } : {}) }),
    [page, searchTerm],
  )

  const { data, isLoading, isFetching } = useGetAllAddressesQuery(queryParams)
  const { data: customersData } = useGetAllUsersQuery({ role: "USER", page: 1, limit: 200 })
  const [createAddress, { isLoading: isCreating }] = useCreateAddressMutation()
  const [updateAddress, { isLoading: isUpdating }] = useUpdateAddressMutation()
  const [deleteAddress, { isLoading: isDeleting }] = useDeleteAddressMutation()
  const isSaving = isCreating || isUpdating

  const addresses = data?.data ?? []
  const meta = data?.meta ?? { page: 1, limit, total: 0, totalPage: 1 }
  const customers = customersData?.data ?? []

  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [userId, setUserId] = useState("")
  const [fullName, setFullName] = useState("")
  const [phone, setPhone] = useState("")
  const [addressLine, setAddressLine] = useState("")
  const [city, setCity] = useState("")
  const [district, setDistrict] = useState("")
  const [postalCode, setPostalCode] = useState("")
  const [isDefault, setIsDefault] = useState(false)

  function resetForm() {
    setEditingId(null)
    setUserId(""); setFullName(""); setPhone(""); setAddressLine("")
    setCity(""); setDistrict(""); setPostalCode(""); setIsDefault(false)
  }

  function startEdit(a: any) {
    setEditingId(a.id)
    setUserId(a.userId)
    setFullName(a.fullName)
    setPhone(a.phone)
    setAddressLine(a.addressLine)
    setCity(a.city)
    setDistrict(a.district || "")
    setPostalCode(a.postalCode || "")
    setIsDefault(a.isDefault)
    setShowForm(true)
  }

  async function handleSubmit() {
    if (!editingId && !userId) return toast.error("Select a customer")
    if (!fullName.trim() || !phone.trim() || !addressLine.trim() || !city.trim()) {
      return toast.error("Full name, phone, address line and city are required")
    }

    const payload = {
      fullName: fullName.trim(),
      phone: phone.trim(),
      addressLine: addressLine.trim(),
      city: city.trim(),
      district: district.trim() || undefined,
      postalCode: postalCode.trim() || undefined,
      isDefault,
    }

    try {
      if (editingId) {
        await updateAddress({ id: editingId, data: payload }).unwrap()
        toast.success("Address updated successfully")
      } else {
        await createAddress({ userId, ...payload }).unwrap()
        toast.success("Address created successfully")
      }
      resetForm()
      setShowForm(false)
    } catch (err: any) {
      toast.error(err?.data?.message || "Something went wrong. Please try again.")
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this address? This cannot be undone.")) return
    try {
      await deleteAddress(id).unwrap()
      toast.success("Address deleted successfully")
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to delete address.")
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Customer Addresses"
        description="Manage shipping addresses for all customers"
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Customers", href: "/admin/customers" }, { label: "Addresses" }]}
        actions={
          <button
            onClick={() => { resetForm(); setShowForm((v) => !v) }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-white text-sm hover:opacity-90 transition-opacity"
            style={{ backgroundColor: "#501D2A" }}
          >
            {showForm ? <X className="w-4 h-4" strokeWidth={1.5} /> : <Plus className="w-4 h-4" strokeWidth={1.5} />}
            {showForm ? "Close Form" : "Add Address"}
          </button>
        }
      />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className={showForm ? "xl:col-span-2" : "xl:col-span-3"}>
          <div className="bg-white rounded-xl border border-border/50">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 px-5 py-4" style={{ borderBottom: "1px solid #F0EDEF" }}>
              <div className="relative flex-1 w-full sm:max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Search by customer, city, address..."
                  className="w-full pl-9 pr-4 py-2 rounded-lg border border-border/60 bg-[#F8F7F5] placeholder:text-muted-foreground focus:outline-none focus:border-primary/40"
                  style={{ fontSize: "13px" }}
                />
              </div>
              {isFetching && !isLoading && (
                <Loader2 className="w-4 h-4 animate-spin text-muted-foreground ml-auto" strokeWidth={1.5} />
              )}
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr style={{ borderBottom: "1px solid #F0EDEF" }}>
                    {["Customer", "Address", "City", "District", "Postal", "Default", "Actions"].map((h) => (
                      <th key={h} className="text-left px-5 py-3 text-muted-foreground font-medium" style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.07em" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {isLoading && <TableSkeletonRows columns={7} />}
                  {!isLoading && addresses.length === 0 && (
                    <tr>
                      <td colSpan={7} className="px-5 py-8 text-center text-muted-foreground" style={{ fontSize: "13px" }}>
                        No addresses yet.
                      </td>
                    </tr>
                  )}
                  {addresses.map((a: any, i: number) => (
                    <tr key={a.id} className="hover:bg-[#F8F7F5] transition-colors" style={{ borderBottom: i < addresses.length - 1 ? "1px solid #F0EDEF" : "none" }}>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-full flex items-center justify-center text-white font-semibold shrink-0" style={{ backgroundColor: "#501D2A", fontSize: "10px" }}>
                            {(a.user?.name || "?").slice(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-medium text-foreground" style={{ fontSize: "13px" }}>{a.user?.name}</p>
                            <p className="text-muted-foreground" style={{ fontSize: "11px" }}>{a.fullName} · {a.phone}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3 text-muted-foreground" style={{ fontSize: "13px" }}>{a.addressLine}</td>
                      <td className="px-5 py-3 text-foreground" style={{ fontSize: "13px" }}>{a.city}</td>
                      <td className="px-5 py-3 text-muted-foreground" style={{ fontSize: "13px" }}>{a.district || "—"}</td>
                      <td className="px-5 py-3 text-muted-foreground font-mono" style={{ fontSize: "12px" }}>{a.postalCode || "—"}</td>
                      <td className="px-5 py-3">
                        {a.isDefault ? <CheckCircle className="w-4 h-4 text-emerald-600" strokeWidth={2} /> : <span className="text-muted-foreground/40" style={{ fontSize: "13px" }}>—</span>}
                      </td>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-1">
                          <button onClick={() => startEdit(a)} className="p-1.5 rounded-lg hover:bg-[#F0EDEF] transition-colors text-muted-foreground hover:text-foreground">
                            <Pencil className="w-3.5 h-3.5" strokeWidth={1.5} />
                          </button>
                          <button onClick={() => handleDelete(a.id)} disabled={isDeleting} className="p-1.5 rounded-lg hover:bg-red-50 transition-colors text-muted-foreground hover:text-red-600 disabled:opacity-50">
                            <Trash2 className="w-3.5 h-3.5" strokeWidth={1.5} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between px-5 py-4" style={{ borderTop: "1px solid #F0EDEF" }}>
              <p className="text-muted-foreground" style={{ fontSize: "12px" }}>
                {isLoading ? <Skeleton className="h-3 w-40" /> : `Showing ${addresses.length} of ${meta.total ?? 0} addresses`}
              </p>
              <div className="flex items-center gap-1">
                <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={(meta.page ?? 1) <= 1} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[#F0EDEF] text-muted-foreground disabled:opacity-40 transition-colors">
                  <ChevronLeft className="w-4 h-4" strokeWidth={1.5} />
                </button>
                <span className="px-3 text-foreground" style={{ fontSize: "13px" }}>Page {meta.page ?? 1} of {meta.totalPage ?? 1}</span>
                <button onClick={() => setPage((p) => Math.min(meta.totalPage ?? 1, p + 1))} disabled={(meta.page ?? 1) >= (meta.totalPage ?? 1)} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[#F0EDEF] text-muted-foreground disabled:opacity-40 transition-colors">
                  <ChevronRight className="w-4 h-4" strokeWidth={1.5} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {showForm && (
          <div className="xl:col-span-1">
            <div className="bg-white rounded-xl border border-border/50 p-5">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-semibold text-foreground flex items-center gap-2" style={{ fontSize: "14px" }}>
                  <MapPin className="w-4 h-4" style={{ color: "#501D2A" }} strokeWidth={1.5} />
                  {editingId ? "Edit Address" : "Add New Address"}
                </h2>
              </div>
              <div className="space-y-4">
                {!editingId && (
                  <div>
                    <label className={LABEL_CLASS} style={{ fontSize: "12px" }}>Customer <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <select value={userId} onChange={(e) => setUserId(e.target.value)} className={INPUT_CLASS + " appearance-none pr-8"} style={{ fontSize: "13px" }}>
                        <option value="">Select customer</option>
                        {customers.map((c: any) => <option key={c.id} value={c.id}>{c.name} ({c.email})</option>)}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" strokeWidth={1.5} />
                    </div>
                  </div>
                )}
                <div>
                  <label className={LABEL_CLASS} style={{ fontSize: "12px" }}>Full Name <span className="text-red-500">*</span></label>
                  <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Recipient name" className={INPUT_CLASS} style={{ fontSize: "13px" }} />
                </div>
                <div>
                  <label className={LABEL_CLASS} style={{ fontSize: "12px" }}>Phone <span className="text-red-500">*</span></label>
                  <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+880 1X-XXXXXXXX" className={INPUT_CLASS} style={{ fontSize: "13px" }} />
                </div>
                <div>
                  <label className={LABEL_CLASS} style={{ fontSize: "12px" }}>Address Line <span className="text-red-500">*</span></label>
                  <input type="text" value={addressLine} onChange={(e) => setAddressLine(e.target.value)} placeholder="House, Road, Area" className={INPUT_CLASS} style={{ fontSize: "13px" }} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={LABEL_CLASS} style={{ fontSize: "12px" }}>City <span className="text-red-500">*</span></label>
                    <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Dhaka" className={INPUT_CLASS} style={{ fontSize: "13px" }} />
                  </div>
                  <div>
                    <label className={LABEL_CLASS} style={{ fontSize: "12px" }}>District</label>
                    <input type="text" value={district} onChange={(e) => setDistrict(e.target.value)} placeholder="Dhaka" className={INPUT_CLASS} style={{ fontSize: "13px" }} />
                  </div>
                </div>
                <div>
                  <label className={LABEL_CLASS} style={{ fontSize: "12px" }}>Postal Code</label>
                  <input type="text" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} placeholder="1207" className={INPUT_CLASS} style={{ fontSize: "13px" }} />
                </div>
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input type="checkbox" checked={isDefault} onChange={(e) => setIsDefault(e.target.checked)} className="w-4 h-4 rounded border-border/60 accent-[#501D2A]" />
                  <span className="text-foreground" style={{ fontSize: "13px" }}>Set as default address</span>
                </label>

                <button
                  onClick={handleSubmit}
                  disabled={isSaving}
                  className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-lg text-white text-sm hover:opacity-90 transition-opacity font-medium mt-2 disabled:opacity-60"
                  style={{ backgroundColor: "#501D2A" }}
                >
                  {isSaving ? <Loader2 className="w-4 h-4 animate-spin" strokeWidth={1.5} /> : <Plus className="w-4 h-4" strokeWidth={1.5} />}
                  {editingId ? "Update Address" : "Save Address"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
