"use client"

import { useState } from "react"
import { toast } from "sonner"
import { PageHeader } from "@/components/admin/page-header"
import { Plus, Pencil, Trash2, Ruler, Info, X, Loader2 } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { TableSkeletonRows } from "@/components/admin/table-skeleton-rows"
import {
  useGetAllSizesQuery,
  useCreateSizeMutation,
  useUpdateSizeMutation,
  useDeleteSizeMutation,
} from "@/redux/fetchers/size/sizeApi"

const INPUT_CLASS =
  "w-full px-3 py-2.5 rounded-lg border border-border/60 bg-white text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"

const LABEL_CLASS = "block font-medium text-foreground mb-1.5"

interface Size {
  id: string
  name: string
  usedIn: number
}

export default function SizesPage() {
  const { data, isLoading, isFetching } = useGetAllSizesQuery(undefined)
  const [createSize, { isLoading: isCreating }] = useCreateSizeMutation()
  const [updateSize, { isLoading: isUpdating }] = useUpdateSizeMutation()
  const [deleteSize, { isLoading: isDeleting }] = useDeleteSizeMutation()

  const sizes: Size[] = (data?.data ?? []).map((s: any) => ({
    id: s.id,
    name: s.name,
    usedIn: s._count?.variants ?? 0,
  }))

  const [formName, setFormName] = useState("")
  const [editingId, setEditingId] = useState<string | null>(null)

  const isSaving = isCreating || isUpdating

  function startEdit(size: Size) {
    setEditingId(size.id)
    setFormName(size.name)
  }

  function cancelEdit() {
    setEditingId(null)
    setFormName("")
  }

  async function handleSubmit() {
    const name = formName.trim()
    if (!name) {
      toast.error("Size name is required")
      return
    }

    try {
      if (editingId) {
        await updateSize({ id: editingId, data: { name } }).unwrap()
        toast.success("Size updated successfully")
      } else {
        await createSize({ name }).unwrap()
        toast.success("Size created successfully")
      }
      cancelEdit()
    } catch (err: any) {
      toast.error(err?.data?.message || "Something went wrong. Please try again.")
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this size? This cannot be undone.")) return

    try {
      await deleteSize(id).unwrap()
      toast.success("Size deleted successfully")
      if (editingId === id) cancelEdit()
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to delete size.")
    }
  }

  return (
    <div className="space-y-6" style={{ backgroundColor: "#F8F7F5", minHeight: "100%" }}>
      <PageHeader
        title="Sizes"
        description="Manage size options shared across all products"
        breadcrumbs={[
          { label: "Admin", href: "/admin" },
          { label: "Products", href: "/admin/products" },
          { label: "Sizes" },
        ]}
      />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* ── Left: Size table (2/3) ──────────────────────────── */}
        <div className="xl:col-span-2 bg-white rounded-xl border border-border/50">
          <div
            className="flex items-center justify-between px-5 py-4"
            style={{ borderBottom: "1px solid #F0EDEF" }}
          >
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: "#F0EDEF" }}
              >
                <Ruler className="w-4 h-4" style={{ color: "#501D2A" }} strokeWidth={1.5} />
              </div>
              <div>
                <h2 className="font-semibold text-foreground" style={{ fontSize: "14px" }}>
                  All Sizes
                </h2>
                <p className="text-muted-foreground" style={{ fontSize: "12px" }}>
                  {isLoading ? <Skeleton className="h-3 w-24" /> : `${sizes.length} size options`}
                </p>
              </div>
            </div>
            {isFetching && !isLoading && (
              <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" strokeWidth={1.5} />
            )}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: "1px solid #F0EDEF" }}>
                  {["Name", "Used In (Variants)", "Actions"].map((h) => (
                    <th
                      key={h}
                      className="text-left px-5 py-3 text-muted-foreground font-medium"
                      style={{
                        fontSize: "11px",
                        textTransform: "uppercase",
                        letterSpacing: "0.07em",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {isLoading && <TableSkeletonRows columns={3} />}
                {!isLoading && sizes.length === 0 && (
                  <tr>
                    <td
                      colSpan={3}
                      className="px-5 py-8 text-center text-muted-foreground"
                      style={{ fontSize: "13px" }}
                    >
                      No sizes yet. Add one from the form.
                    </td>
                  </tr>
                )}
                {sizes.map((size, i) => (
                  <tr
                    key={size.id}
                    className="hover:bg-[#F8F7F5] transition-colors"
                    style={{
                      borderBottom: i < sizes.length - 1 ? "1px solid #F0EDEF" : "none",
                    }}
                  >
                    {/* Name */}
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-white shrink-0"
                          style={{ backgroundColor: "#501D2A", fontSize: "12px" }}
                        >
                          {size.name.length <= 4 ? size.name : size.name.slice(0, 3)}
                        </div>
                        <span className="font-medium text-foreground" style={{ fontSize: "13px" }}>
                          {size.name}
                        </span>
                      </div>
                    </td>

                    {/* Used In */}
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <span
                          className="inline-flex items-center rounded-full px-2.5 py-0.5 font-medium bg-[#F0EDEF]"
                          style={{ fontSize: "12px", color: "#501D2A" }}
                        >
                          {size.usedIn}
                        </span>
                        <span className="text-muted-foreground" style={{ fontSize: "12px" }}>
                          variants
                        </span>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => startEdit(size)}
                          className="p-1.5 rounded-lg hover:bg-[#F0EDEF] transition-colors text-muted-foreground hover:text-foreground"
                        >
                          <Pencil className="w-3.5 h-3.5" strokeWidth={1.5} />
                        </button>
                        <button
                          onClick={() => handleDelete(size.id)}
                          disabled={isDeleting}
                          className="p-1.5 rounded-lg hover:bg-red-50 transition-colors text-muted-foreground hover:text-red-600 disabled:opacity-50"
                        >
                          <Trash2 className="w-3.5 h-3.5" strokeWidth={1.5} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Right: Add/Edit form (1/3) ───────────────────────── */}
        <div className="xl:col-span-1 space-y-4">
          <div className="bg-white rounded-xl border border-border/50 p-5">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-semibold text-foreground" style={{ fontSize: "14px" }}>
                {editingId ? "Edit Size" : "Add Size"}
              </h2>
              {editingId && (
                <button
                  onClick={cancelEdit}
                  className="p-1 rounded-lg hover:bg-[#F0EDEF] transition-colors text-muted-foreground hover:text-foreground"
                >
                  <X className="w-3.5 h-3.5" strokeWidth={1.5} />
                </button>
              )}
            </div>

            <div className="space-y-4">
              {/* Name */}
              <div>
                <label className={LABEL_CLASS} style={{ fontSize: "12px" }}>
                  Size Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. XS, S, M, L, XL, Free Size"
                  className={INPUT_CLASS}
                  style={{ fontSize: "13px" }}
                />
              </div>

              {/* Info note */}
              <div
                className="flex items-start gap-2.5 p-3.5 rounded-lg"
                style={{ backgroundColor: "#F8F7F5", border: "1px solid #F0EDEF" }}
              >
                <Info className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: "#501D2A" }} strokeWidth={1.5} />
                <p className="text-muted-foreground" style={{ fontSize: "12px" }}>
                  Size names must be unique. They are shared across all products and referenced in product variants.
                </p>
              </div>

              {/* Submit */}
              <button
                onClick={handleSubmit}
                disabled={isSaving}
                className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-lg text-white text-sm hover:opacity-90 transition-opacity font-medium disabled:opacity-60"
                style={{ backgroundColor: "#501D2A" }}
              >
                {isSaving ? (
                  <Loader2 className="w-4 h-4 animate-spin" strokeWidth={1.5} />
                ) : (
                  <Plus className="w-4 h-4" strokeWidth={1.5} />
                )}
                {editingId ? "Update Size" : "Save Size"}
              </button>
            </div>
          </div>

          {/* Quick reference card */}
          <div className="bg-white rounded-xl border border-border/50 p-5">
            <h3 className="font-semibold text-foreground mb-3" style={{ fontSize: "13px" }}>
              Size Overview
            </h3>
            <div className="grid grid-cols-4 gap-2">
              {sizes.map((size) => (
                <div
                  key={size.id}
                  className="rounded-lg p-2 text-center border border-border/40 hover:border-primary/30 transition-colors cursor-default"
                >
                  <p className="font-bold text-foreground" style={{ fontSize: "13px" }}>
                    {size.name.length <= 4 ? size.name : size.name.slice(0, 3)}
                  </p>
                  <p className="text-muted-foreground" style={{ fontSize: "10px" }}>
                    {size.usedIn} uses
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
