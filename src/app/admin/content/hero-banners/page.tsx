"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { PageHeader } from "@/components/admin/page-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Plus, Pencil, Trash2, Upload, ImageIcon, Loader2 } from "lucide-react"
import { toast } from "sonner"
import {
  useGetAllBannersQuery,
  useCreateBannerMutation,
  useUpdateBannerMutation,
  useDeleteBannerMutation,
} from "@/redux/fetchers/banner/bannerApi"

interface HeroBanner {
  id: string
  desktopImage: string
  mobileImage?: string | null
  collectionLabel?: string | null
  heading: string
  seasonYear?: string | null
  discoverText?: string | null
  backgroundColor?: string | null
  isActive: boolean
}

const emptyForm = {
  collectionLabel: "",
  heading: "",
  seasonYear: "",
  discoverText: "",
  backgroundColor: "#F2F0F2",
  isActive: false,
}

export default function HeroBannersPage() {
  const { data, isLoading } = useGetAllBannersQuery(undefined)
  const [createBanner, { isLoading: creating }] = useCreateBannerMutation()
  const [updateBanner, { isLoading: updating }] = useUpdateBannerMutation()
  const [deleteBanner] = useDeleteBannerMutation()

  const banners: HeroBanner[] = data?.data ?? []

  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState<HeroBanner | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [desktopFile, setDesktopFile] = useState<File | null>(null)
  const [mobileFile, setMobileFile] = useState<File | null>(null)
  const [desktopPreview, setDesktopPreview] = useState<string>("")
  const [mobilePreview, setMobilePreview] = useState<string>("")
  const desktopInputRef = useRef<HTMLInputElement>(null)
  const mobileInputRef = useRef<HTMLInputElement>(null)

  const saving = creating || updating

  function openCreate() {
    setEditing(null)
    setForm(emptyForm)
    setDesktopFile(null)
    setMobileFile(null)
    setDesktopPreview("")
    setMobilePreview("")
    setOpen(true)
  }

  function openEdit(banner: HeroBanner) {
    setEditing(banner)
    setForm({
      collectionLabel: banner.collectionLabel ?? "",
      heading: banner.heading,
      seasonYear: banner.seasonYear ?? "",
      discoverText: banner.discoverText ?? "",
      backgroundColor: banner.backgroundColor ?? "#F2F0F2",
      isActive: banner.isActive,
    })
    setDesktopFile(null)
    setMobileFile(null)
    setDesktopPreview(banner.desktopImage)
    setMobilePreview(banner.mobileImage ?? "")
    setOpen(true)
  }

  useEffect(() => {
    if (!desktopFile) return
    const url = URL.createObjectURL(desktopFile)
    setDesktopPreview(url)
    return () => URL.revokeObjectURL(url)
  }, [desktopFile])

  useEffect(() => {
    if (!mobileFile) return
    const url = URL.createObjectURL(mobileFile)
    setMobilePreview(url)
    return () => URL.revokeObjectURL(url)
  }, [mobileFile])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!editing && !desktopFile) {
      toast.error("Desktop banner image is required.")
      return
    }
    if (!form.heading.trim()) {
      toast.error("Main heading is required.")
      return
    }

    const fd = new FormData()
    fd.append("heading", form.heading)
    if (form.collectionLabel) fd.append("collectionLabel", form.collectionLabel)
    if (form.seasonYear) fd.append("seasonYear", form.seasonYear)
    if (form.discoverText) fd.append("discoverText", form.discoverText)
    if (form.backgroundColor) fd.append("backgroundColor", form.backgroundColor)
    fd.append("isActive", String(form.isActive))
    if (desktopFile) fd.append("desktopImage", desktopFile)
    if (mobileFile) fd.append("mobileImage", mobileFile)

    try {
      if (editing) {
        await updateBanner({ id: editing.id, data: fd }).unwrap()
        toast.success("Banner updated.")
      } else {
        await createBanner(fd).unwrap()
        toast.success("Banner created.")
      }
      setOpen(false)
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to save banner.")
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this banner? This cannot be undone.")) return
    try {
      await deleteBanner(id).unwrap()
      toast.success("Banner deleted.")
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to delete banner.")
    }
  }

  async function handleToggleActive(banner: HeroBanner) {
    const fd = new FormData()
    fd.append("isActive", String(!banner.isActive))
    try {
      await updateBanner({ id: banner.id, data: fd }).unwrap()
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update banner.")
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Hero Banners"
        description="Manage the homepage hero banner"
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Content" }, { label: "Hero Banners" }]}
        actions={
          <Button onClick={openCreate} className="btn-label">
            <Plus className="w-4 h-4" strokeWidth={1.5} />
            Add Banner
          </Button>
        }
      />

      {isLoading ? (
        <div className="text-muted-foreground text-sm">Loading banners…</div>
      ) : banners.length === 0 ? (
        <div className="bg-card rounded-xl border border-border p-12 flex flex-col items-center justify-center text-center">
          <ImageIcon className="w-8 h-8 text-muted-foreground mb-3" strokeWidth={1.5} />
          <p className="font-body font-medium text-foreground" style={{ fontSize: "14px" }}>No banners yet</p>
          <p className="text-muted-foreground mt-1" style={{ fontSize: "12px" }}>Create your first hero banner for the homepage.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {banners.map((banner) => (
            <div
              key={banner.id}
              className="rounded-xl overflow-hidden border border-border bg-card"
              style={{ opacity: banner.isActive ? 1 : 0.65 }}
            >
              <div className="relative h-36 flex" style={{ backgroundColor: banner.backgroundColor || "#F2F0F2" }}>
                <div className="relative w-1/2 h-full shrink-0">
                  <Image src={banner.desktopImage} alt={banner.heading} fill className="object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-center px-4 min-w-0">
                  {banner.collectionLabel && (
                    <span className="text-hero-collection-label truncate" style={{ fontSize: "8px", letterSpacing: "0.3em" }}>
                      {banner.collectionLabel}
                    </span>
                  )}
                  <p className="font-editorial font-semibold truncate" style={{ fontSize: "20px" }}>{banner.heading}</p>
                  {banner.discoverText && (
                    <span className="font-editorial font-semibold mt-1 inline-block w-fit border-b border-foreground/50" style={{ fontSize: "11px" }}>
                      {banner.discoverText}
                    </span>
                  )}
                </div>
                <span
                  className="absolute top-2 right-2 rounded-full px-2 py-0.5 font-ui font-medium"
                  style={{
                    fontSize: "9px",
                    backgroundColor: banner.isActive ? "rgba(34,197,94,0.15)" : "rgba(0,0,0,0.08)",
                    color: banner.isActive ? "#166534" : "#6B7280",
                  }}
                >
                  {banner.isActive ? "Active" : "Inactive"}
                </span>
              </div>

              <div className="p-3 flex items-center justify-between">
                <span className="font-ui text-muted-foreground" style={{ fontSize: "11px" }}>
                  {banner.seasonYear || "—"}
                </span>
                <div className="flex items-center gap-1">
                  <Switch checked={banner.isActive} onCheckedChange={() => handleToggleActive(banner)} />
                  <button onClick={() => openEdit(banner)} className="p-1.5 rounded-lg hover:bg-accent transition-colors text-muted-foreground hover:text-foreground">
                    <Pencil className="w-3.5 h-3.5" strokeWidth={1.5} />
                  </button>
                  <button onClick={() => handleDelete(banner.id)} className="p-1.5 rounded-lg hover:bg-destructive/10 transition-colors text-muted-foreground hover:text-destructive">
                    <Trash2 className="w-3.5 h-3.5" strokeWidth={1.5} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Banner" : "Add Banner"}</DialogTitle>
            <DialogDescription>Only the fields below are shown on the homepage hero.</DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Live preview */}
            <div className="rounded-lg overflow-hidden border border-border flex h-28">
              <div className="relative w-1/2 h-full bg-muted shrink-0">
                {desktopPreview ? (
                  <Image src={desktopPreview} alt="Desktop preview" fill className="object-cover" unoptimized />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    <ImageIcon className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                )}
              </div>
              <div className="flex-1 flex flex-col justify-center px-4 min-w-0" style={{ backgroundColor: form.backgroundColor || "#F2F0F2" }}>
                {form.collectionLabel && (
                  <span className="text-hero-collection-label truncate" style={{ fontSize: "8px", letterSpacing: "0.3em" }}>{form.collectionLabel}</span>
                )}
                <p className="font-editorial font-semibold truncate" style={{ fontSize: "20px" }}>{form.heading || "Heading"}</p>
                {form.discoverText && (
                  <span className="font-editorial font-semibold mt-1 inline-block w-fit border-b border-foreground/50" style={{ fontSize: "11px" }}>{form.discoverText}</span>
                )}
              </div>
            </div>

            {/* Images */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="form-label-text">
                  Desktop Image {!editing && "*"}
                  <span className="text-muted-foreground/70 normal-case font-normal" style={{ fontSize: "10px" }}>(1200 × 1100px)</span>
                </Label>
                <input ref={desktopInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => setDesktopFile(e.target.files?.[0] ?? null)} />
                <button
                  type="button"
                  onClick={() => desktopInputRef.current?.click()}
                  className="w-full h-20 rounded-lg border border-dashed border-border flex flex-col items-center justify-center gap-1 text-muted-foreground hover:border-ring transition-colors"
                >
                  <Upload className="w-4 h-4" strokeWidth={1.5} />
                  <span style={{ fontSize: "11px" }}>{desktopFile ? desktopFile.name : "Upload image"}</span>
                </button>
              </div>
              <div className="space-y-1.5">
                <Label className="form-label-text">
                  Mobile Image
                  <span className="text-muted-foreground/70 normal-case font-normal" style={{ fontSize: "10px" }}>(1000 × 1500px)</span>
                </Label>
                <input ref={mobileInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => setMobileFile(e.target.files?.[0] ?? null)} />
                <button
                  type="button"
                  onClick={() => mobileInputRef.current?.click()}
                  className="w-full h-20 rounded-lg border border-dashed border-border flex flex-col items-center justify-center gap-1 text-muted-foreground hover:border-ring transition-colors"
                >
                  <Upload className="w-4 h-4" strokeWidth={1.5} />
                  <span style={{ fontSize: "11px" }}>{mobileFile ? mobileFile.name : "Upload image"}</span>
                </button>
              </div>
            </div>

            {/* Text fields */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="form-label-text">Collection Label</Label>
                <Input className="text-field-value" placeholder="COLLECTION" value={form.collectionLabel} onChange={(e) => setForm({ ...form, collectionLabel: e.target.value })} />
              </div>
              <div className="space-y-1.5">
                <Label className="form-label-text">Season / Year</Label>
                <Input className="text-field-value" placeholder="16-17" value={form.seasonYear} onChange={(e) => setForm({ ...form, seasonYear: e.target.value })} />
              </div>
              <div className="space-y-1.5">
                <Label className="form-label-text">Main Heading *</Label>
                <Input className="text-field-value" placeholder="Fall Winter" value={form.heading} onChange={(e) => setForm({ ...form, heading: e.target.value })} required />
              </div>
              <div className="space-y-1.5">
                <Label className="form-label-text">Discover Text</Label>
                <Input className="text-field-value" placeholder="Discover" value={form.discoverText} onChange={(e) => setForm({ ...form, discoverText: e.target.value })} />
              </div>
              <div className="space-y-1.5">
                <Label className="form-label-text">Right Side Background Color</Label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={form.backgroundColor}
                    onChange={(e) => setForm({ ...form, backgroundColor: e.target.value })}
                    className="w-8 h-8 rounded border border-border cursor-pointer"
                  />
                  <Input className="text-field-value" value={form.backgroundColor} onChange={(e) => setForm({ ...form, backgroundColor: e.target.value })} />
                </div>
              </div>
              <div className="flex items-center gap-2 pt-6">
                <Switch checked={form.isActive} onCheckedChange={(checked) => setForm({ ...form, isActive: checked })} />
                <Label className="form-label-text">Set as active banner</Label>
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" className="btn-label" onClick={() => setOpen(false)}>Cancel</Button>
              <Button type="submit" disabled={saving} className="btn-label">
                {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                {editing ? "Save Changes" : "Create Banner"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
