"use client"

import { useState } from "react"
import { PageHeader } from "@/components/admin/page-header"
import { Plus, Pencil, Trash2, Palette, Info } from "lucide-react"

const INPUT_CLASS =
  "w-full px-3 py-2.5 rounded-lg border border-border/60 bg-white text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"

const LABEL_CLASS = "block font-medium text-foreground mb-1.5"

interface Color {
  id: string
  name: string
  hexCode: string
  usedIn: number
}

const initialColors: Color[] = [
  { id: "COL01", name: "Black", hexCode: "#000000", usedIn: 89 },
  { id: "COL02", name: "White", hexCode: "#FFFFFF", usedIn: 76 },
  { id: "COL03", name: "Red", hexCode: "#DC2626", usedIn: 34 },
  { id: "COL04", name: "Navy", hexCode: "#1e3a5f", usedIn: 28 },
  { id: "COL05", name: "Beige", hexCode: "#F5F0EB", usedIn: 45 },
  { id: "COL06", name: "Olive", hexCode: "#6B7A2A", usedIn: 22 },
  { id: "COL07", name: "Pink", hexCode: "#F472B6", usedIn: 31 },
  { id: "COL08", name: "Grey", hexCode: "#9CA3AF", usedIn: 55 },
  { id: "COL09", name: "Brown", hexCode: "#92400E", usedIn: 18 },
  { id: "COL10", name: "Cream", hexCode: "#FFFDD0", usedIn: 42 },
]

export default function ColorsPage() {
  const [colors] = useState<Color[]>(initialColors)
  const [formName, setFormName] = useState("")
  const [formHex, setFormHex] = useState("#501D2A")

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
        actions={
          <button
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-white text-sm hover:opacity-90 transition-opacity"
            style={{ backgroundColor: "#501D2A" }}
          >
            <Plus className="w-4 h-4" strokeWidth={1.5} />
            Add Color
          </button>
        }
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
                  {colors.length} color options
                </p>
              </div>
            </div>
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
                          borderColor:
                            color.hexCode.toUpperCase() === "#FFFFFF" ||
                            color.hexCode.toUpperCase() === "#FFFDD0" ||
                            color.hexCode.toUpperCase() === "#F5F0EB"
                              ? "#E5E0DC"
                              : "transparent",
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
                        <button className="p-1.5 rounded-lg hover:bg-[#F0EDEF] transition-colors text-muted-foreground hover:text-foreground">
                          <Pencil className="w-3.5 h-3.5" strokeWidth={1.5} />
                        </button>
                        <button className="p-1.5 rounded-lg hover:bg-red-50 transition-colors text-muted-foreground hover:text-red-600">
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

        {/* ── Right: Add form (1/3) ────────────────────────────── */}
        <div className="xl:col-span-1 space-y-4">
          <div className="bg-white rounded-xl border border-border/50 p-5">
            <h2 className="font-semibold text-foreground mb-5" style={{ fontSize: "14px" }}>
              Add Color
            </h2>

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
                className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-lg text-white text-sm hover:opacity-90 transition-opacity font-medium"
                style={{ backgroundColor: "#501D2A" }}
              >
                <Plus className="w-4 h-4" strokeWidth={1.5} />
                Save Color
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
                      borderColor:
                        color.hexCode.toUpperCase() === "#FFFFFF" ||
                        color.hexCode.toUpperCase() === "#FFFDD0" ||
                        color.hexCode.toUpperCase() === "#F5F0EB"
                          ? "#E5E0DC"
                          : "transparent",
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
