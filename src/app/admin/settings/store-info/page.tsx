"use client"

import { useRef, useState } from "react"
import { toast } from "sonner"
import {
  Upload, Camera, Globe, X as XIcon, Building2, Store, Mail, Phone, MapPin, Link2,
  ImageIcon, Loader2, Check, Sparkles,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const socialLinks = [
  { label: "Instagram", icon: Camera, defaultValue: "" },
  { label: "Facebook", icon: Globe, defaultValue: "" },
  { label: "Twitter / X", icon: XIcon, defaultValue: "" },
  { label: "Website", icon: Link2, defaultValue: "" },
]

type SaveState = "idle" | "saving" | "saved"

export default function StoreInfoPage() {
  const [storeName, setStoreName] = useState("")
  const [tagline, setTagline] = useState("")
  const [description, setDescription] = useState(
    "",
  )
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [website, setWebsite] = useState("")
  const [supportEmail, setSupportEmail] = useState("")
  const [legalName, setLegalName] = useState("")
  const [taxId, setTaxId] = useState("")

  const [logoPreview, setLogoPreview] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [isDirty, setIsDirty] = useState(false)
  const [saveState, setSaveState] = useState<SaveState>("idle")

  function markDirty<T>(setter: (v: T) => void) {
    return (v: T) => { setter(v); setIsDirty(true) }
  }

  function handleLogoFile(file?: File | null) {
    if (!file) return
    if (!file.type.startsWith("image/")) {
      toast.error("Please choose an image file")
      return
    }
    setLogoPreview(URL.createObjectURL(file))
    setIsDirty(true)
  }

  function handleSave() {
    setSaveState("saving")
    setTimeout(() => {
      setSaveState("saved")
      setIsDirty(false)
      toast.success("Store information saved")
      setTimeout(() => setSaveState("idle"), 1800)
    }, 650)
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6 pb-4">
      {/* Hero */}
      <Card className="overflow-hidden ring-1 ring-foreground/10">
        <div className="h-20 bg-gradient-to-br from-primary via-primary to-primary/70" />
        <CardContent className="-mt-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:gap-5">
          <div className="relative shrink-0">
            <div className="flex size-20 items-center justify-center overflow-hidden rounded-2xl border-4 border-background bg-muted shadow-sm">
              {logoPreview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={logoPreview} alt="Store logo" className="size-full object-cover" />
              ) : (
                <span className="text-2xl font-bold text-primary">{storeName.charAt(0).toUpperCase() || "L"}</span>
              )}
            </div>
          </div>
          <div className="min-w-0 flex-1 pb-0.5">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="truncate text-lg font-semibold text-foreground">{storeName || "Your Store"}</h2>
              <Badge variant="secondary" className="gap-1">
                <Sparkles className="size-3" strokeWidth={1.5} />
                Live
              </Badge>
            </div>
            <p className="truncate text-sm text-muted-foreground">{tagline}</p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-1.5 pb-0.5 text-xs text-muted-foreground sm:flex-col sm:items-end sm:text-right">
            <span className="inline-flex items-center gap-1"><Mail className="size-3" strokeWidth={1.5} />{email}</span>
            <span className="inline-flex items-center gap-1"><Phone className="size-3" strokeWidth={1.5} />{phone}</span>
          </div>
        </CardContent>
      </Card>

      {/* Logo upload */}
      <Card className="transition-shadow hover:shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><ImageIcon className="size-4" strokeWidth={1.5} /> Store Logo</CardTitle>
          <CardDescription>Shown in the storefront header, emails, and checkout</CardDescription>
        </CardHeader>
        <CardContent>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleLogoFile(e.target.files?.[0])}
          />
          <div
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => {
              e.preventDefault()
              setIsDragging(false)
              handleLogoFile(e.dataTransfer.files?.[0])
            }}
            className={cn(
              "flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed px-6 py-8 text-center transition-colors",
              isDragging ? "border-primary bg-primary/5" : "border-border/70 hover:border-primary/40 hover:bg-muted/30",
            )}
          >
            {logoPreview ? (
              <div className="flex items-center gap-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={logoPreview} alt="Logo preview" className="size-16 rounded-lg object-cover ring-1 ring-foreground/10" />
                <div className="text-left">
                  <p className="text-sm font-medium text-foreground">Logo ready to save</p>
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); setLogoPreview(null); setIsDirty(true) }}
                    className="mt-1 text-xs text-muted-foreground underline-offset-2 hover:text-destructive hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10">
                  <Upload className="size-5 text-primary" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    <span className="text-primary">Click to upload</span> or drag and drop
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">PNG, SVG or WEBP · Max 2MB · Recommended 200×200px</p>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Store identity */}
      <Card className="transition-shadow hover:shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Store className="size-4" strokeWidth={1.5} /> Store Identity</CardTitle>
          <CardDescription>How your brand is introduced to customers</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="store-name">Store Name</Label>
            <Input id="store-name" value={storeName} onChange={(e) => markDirty(setStoreName)(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="store-tagline">Tagline</Label>
            <Input id="store-tagline" value={tagline} onChange={(e) => markDirty(setTagline)(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="store-description">Store Description</Label>
            <Textarea id="store-description" rows={4} value={description} onChange={(e) => markDirty(setDescription)(e.target.value)} />
            <p className="text-xs text-muted-foreground">{description.length}/500 characters</p>
          </div>
        </CardContent>
      </Card>

      {/* Contact information */}
      <Card className="transition-shadow hover:shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Mail className="size-4" strokeWidth={1.5} /> Contact Information</CardTitle>
          <CardDescription>Where customers and couriers can reach you</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="store-email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-muted-foreground" strokeWidth={1.5} />
                <Input id="store-email" type="email" value={email} onChange={(e) => markDirty(setEmail)(e.target.value)} className="pl-8" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="store-phone">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-muted-foreground" strokeWidth={1.5} />
                <Input id="store-phone" type="tel" value={phone} onChange={(e) => markDirty(setPhone)(e.target.value)} className="pl-8" />
              </div>
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="store-address">Business Address</Label>
              <div className="relative">
                <MapPin className="absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-muted-foreground" strokeWidth={1.5} />
                <Input id="store-address" value={address} onChange={(e) => markDirty(setAddress)(e.target.value)} className="pl-8" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="store-website">Website URL</Label>
              <div className="relative">
                <Link2 className="absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-muted-foreground" strokeWidth={1.5} />
                <Input id="store-website" type="url" value={website} onChange={(e) => markDirty(setWebsite)(e.target.value)} className="pl-8" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="store-support-email">Support Email</Label>
              <div className="relative">
                <Mail className="absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-muted-foreground" strokeWidth={1.5} />
                <Input id="store-support-email" type="email" value={supportEmail} onChange={(e) => markDirty(setSupportEmail)(e.target.value)} className="pl-8" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Social links */}
      <Card className="transition-shadow hover:shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Globe className="size-4" strokeWidth={1.5} /> Social Media Links</CardTitle>
          <CardDescription>Linked from your storefront footer</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {socialLinks.map((s) => {
            const Icon = s.icon
            return (
              <div key={s.label} className="flex items-center gap-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border bg-muted/30 transition-colors group-hover:bg-muted">
                  <Icon className="size-3.5 text-muted-foreground" strokeWidth={1.5} />
                </div>
                <Input defaultValue={s.defaultValue} onChange={() => setIsDirty(true)} className="flex-1" />
              </div>
            )
          })}
        </CardContent>
      </Card>

      {/* Business registration */}
      <Card className="transition-shadow hover:shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Building2 className="size-4" strokeWidth={1.5} /> Business Registration</CardTitle>
          <CardDescription>Legal entity details used on invoices</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="legal-name">Business Legal Name</Label>
              <Input id="legal-name" value={legalName} onChange={(e) => markDirty(setLegalName)(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="tax-id">Tax / BIN Number</Label>
              <Input id="tax-id" value={taxId} onChange={(e) => markDirty(setTaxId)(e.target.value)} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sticky save bar */}
      <div className="sticky bottom-4 z-10 flex items-center justify-between gap-3 rounded-xl border bg-popover/95 px-4 py-3 shadow-lg backdrop-blur supports-backdrop-filter:bg-popover/80">
        <p className="text-xs text-muted-foreground">
          {isDirty ? (
            <span className="inline-flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-amber-500" />
              Unsaved changes
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-emerald-500" />
              All changes saved
            </span>
          )}
        </p>
        <Button onClick={handleSave} disabled={saveState === "saving"}>
          {saveState === "saving" && <Loader2 className="animate-spin" data-icon="inline-start" />}
          {saveState === "saved" && <Check data-icon="inline-start" />}
          {saveState === "saving" ? "Saving…" : saveState === "saved" ? "Saved" : "Save Store Information"}
        </Button>
      </div>
    </div>
  )
}
