"use client"

import { useState } from "react"
import { toast } from "sonner"
import { PageHeader } from "@/components/admin/page-header"
import { Plus, Pencil, Trash2, Palette, Info, X, Loader2 } from "lucide-react"
import {
  useGetAllColorsQuery,
  useCreateColorMutation,
  useUpdateColorMutation,
  useDeleteColorMutation,
} from "@/redux/fetchers/color/colorApi"

const INPUT_CLASS =
  "w-full px-3 py-2.5 rounded-lg border border-border/60 bg-white text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"

const LABEL_CLASS = "block font-medium text-foreground mb-1.5"

interface Color {
  id: string
  name: string
  hexCode: string
  usedIn: number
}

const DEFAULT_HEX = "#501D2A"

function isLightHex(hex: string) {
  const v = hex.toUpperCase()
  return v === "#FFFFFF" || v === "#FFFDD0" || v === "#F5F0EB"
}

export default function ColorsPage() {
  const { data, isLoading, isFetching } = useGetAllColorsQuery(undefined)
  const [createColor, { isLoading: isCreating }] = useCreateColorMutation()
  const [updateColor, { isLoading: isUpdating }] = useUpdateColorMutation()
  const [deleteColor, { isLoading: isDeleting }] = useDeleteColorMutation()

  const colors: Color[] = (data?.data ?? []).map((c: any) => ({
    id: c.id,
    name: c.name,
    hexCode: c.hexCode || DEFAULT_HEX,
    usedIn: c._count?.variants ?? 0,
  }))

  const [formName, setFormName] = useState("")
  const [formHex, setFormHex] = useState(DEFAULT_HEX)
  const [editingId, setEditingId] = useState<string | null>(null)

  const isSaving = isCreating || isUpdating

  function startEdit(color: Color) {
    setEditingId(color.id)
    setFormName(color.name)
    setFormHex(color.hexCode)
  }

  function cancelEdit() {
    setEditingId(null)
    setFormName("")
    setFormHex(DEFAULT_HEX)
  }

  async function handleSubmit() {
    const name = formName.trim()
    if (!name) {
      toast.error("Color name is required")
      return
    }

    try {
      if (editingId) {
        await updateColor({ id: editingId, data: { name, hexCode: formHex } }).unwrap()
        toast.success("Color updated successfully")
      } else {
        await createColor({ name, hexCode: formHex }).unwrap()
        toast.success("Color created successfully")
      }
      cancelEdit()
    } catch (err: any) {
      toast.error(err?.data?.message || "Something went wrong. Please try again.")
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this color? This cannot be undone.")) return

    try {
      await deleteColor(id).unwrap()
      toast.success("Color deleted successfully")
      if (editingId === id) cancelEdit()
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to delete color.")
    }
  }

  return (
    <div className="space-y-6" style={{ backgroundColor: "#F8F7F5", minHeight: "100%" }}>
      <PageHeader
        title="Colors"
        description="Manage color options shared across all product variants"
        breadcrumbs={[
          { label: "Admin", href: "/admin" },
          { label: "Products", href: "/admin/products" },
          { label: "Colors" },
        ]}
      />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* ── Left: Color table (2/3) ──────────────────────────── */}
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
                <Palette className="w-4 h-4" style={{ color: "#501D2A" }} strokeWidth={1.5} />
              </div>
              <div>
                <h2 className="font-semibold text-foreground" style={{ fontSize: "14px" }}>
                  All Colors
                </h2>
                <p className="text-muted-foreground" style={{ fontSize: "12px" }}>
                  {isLoading ? "Loading…" : `${colors.length} color options`}
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
                  {["", "Name", "Hex Code", "Used In (Variants)", "Actions"].map((h) => (
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
                {!isLoading && colors.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-5 py-8 text-center text-muted-foreground"
                      style={{ fontSize: "13px" }}
                    >
                      No colors yet. Add one from the form.
                    </td>
                  </tr>
                )}
                {colors.map((color, i) => (
                  <tr
                    key={color.id}
                    className="hover:bg-[#F8F7F5] transition-colors"
                    style={{
                      borderBottom: i < colors.length - 1 ? "1px solid #F0EDEF" : "none",
                    }}
                  >
                    {/* Swatch */}
                    <td className="pl-5 pr-2 py-3.5">
                      <div
                        className="w-8 h-8 rounded-full border-2 shadow-sm shrink-0"
                        style={{
                          backgroundColor: color.hexCode,
                          borderColor: isLightHex(color.hexCode) ? "#E5E0DC" : "transparent",
                        }}
                      />
                    </td>

                    {/* Name */}
                    <td className="px-3 py-3.5">
                      <span className="font-medium text-foreground" style={{ fontSize: "13px" }}>
                        {color.name}
                      </span>
                    </td>

                    {/* Hex Code */}
                    <td className="px-3 py-3.5">
                      <span className="font-mono text-muted-foreground" style={{ fontSize: "12px" }}>
                        {color.hexCode.toUpperCase()}
                      </span>
                    </td>

                    {/* Used In */}
                    <td className="px-3 py-3.5">
                      <div className="flex items-center gap-2">
                        <span
                          className="inline-flex items-center rounded-full px-2.5 py-0.5 font-medium bg-[#F0EDEF]"
                          style={{ fontSize: "12px", color: "#501D2A" }}
                        >
                          {color.usedIn}
                        </span>
                        <span className="text-muted-foreground" style={{ fontSize: "12px" }}>
                          variants
                        </span>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-3 pr-5 py-3.5">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => startEdit(color)}
                          className="p-1.5 rounded-lg hover:bg-[#F0EDEF] transition-colors text-muted-foreground hover:text-foreground"
                        >
                          <Pencil className="w-3.5 h-3.5" strokeWidth={1.5} />
                        </button>
                        <button
                          onClick={() => handleDelete(color.id)}
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
                {editingId ? "Edit Color" : "Add Color"}
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
                  Color Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. Midnight Black"
                  className={INPUT_CLASS}
                  style={{ fontSize: "13px" }}
                />
              </div>

              {/* Hex Code with color picker */}
              <div>
                <label className={LABEL_CLASS} style={{ fontSize: "12px" }}>
                  Hex Code
                </label>
                <div className="flex items-center gap-2">
                  {/* Native color picker */}
                  <div className="relative">
                    <input
                      type="color"
                      value={formHex}
                      onChange={(e) => setFormHex(e.target.value)}
                      className="w-10 h-10 rounded-lg border border-border/60 cursor-pointer p-0.5"
                      style={{ backgroundColor: "white" }}
                      title="Pick a color"
                    />
                  </div>
                  {/* Hex text input */}
                  <input
                    type="text"
                    value={formHex.toUpperCase()}
                    onChange={(e) => {
                      const val = e.target.value
                      if (/^#[0-9A-Fa-f]{0,6}$/.test(val)) setFormHex(val)
                    }}
                    placeholder="#000000"
                    className={INPUT_CLASS + " font-mono flex-1"}
                    style={{ fontSize: "13px" }}
                    maxLength={7}
                  />
                  {/* Live preview */}
                  <div
                    className="w-10 h-10 rounded-lg border border-border/40 shrink-0"
                    style={{ backgroundColor: formHex }}
                  />
                </div>
                <p className="text-muted-foreground mt-1" style={{ fontSize: "11px" }}>
                  Click the color swatch to open the color picker, or type a hex code directly.
                </p>
              </div>

              {/* Info note */}
              <div
                className="flex items-start gap-2.5 p-3.5 rounded-lg"
                style={{ backgroundColor: "#F8F7F5", border: "1px solid #F0EDEF" }}
              >
                <Info className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: "#501D2A" }} strokeWidth={1.5} />
                <p className="text-muted-foreground" style={{ fontSize: "12px" }}>
                  Color names must be unique. They are shared across all products and referenced in product variants.
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
                {editingId ? "Update Color" : "Save Color"}
              </button>
            </div>
          </div>

          {/* Swatch grid preview */}
          <div className="bg-white rounded-xl border border-border/50 p-5">
            <h3 className="font-semibold text-foreground mb-3" style={{ fontSize: "13px" }}>
              Color Swatches
            </h3>
            <div className="grid grid-cols-5 gap-2">
              {colors.map((color) => (
                <div key={color.id} className="flex flex-col items-center gap-1 group">
                  <div
                    className="w-9 h-9 rounded-full border shadow-sm group-hover:scale-110 transition-transform cursor-default"
                    style={{
                      backgroundColor: color.hexCode,
                      borderColor: isLightHex(color.hexCode) ? "#E5E0DC" : "transparent",
                    }}
                    title={`${color.name} · ${color.hexCode.toUpperCase()}`}
                  />
                  <p
                    className="text-muted-foreground text-center truncate w-full"
                    style={{ fontSize: "9px" }}
                  >
                    {color.name}
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
