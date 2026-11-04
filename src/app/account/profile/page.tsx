"use client"

import { useRef, useState } from "react"
import {
  Camera, MapPin, Plus, Edit2, Trash2, Check, Home, Lock, KeyRound
} from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose,
} from "@/components/ui/dialog"
import { useGetMeQuery, useUpdateMeMutation, useUpdateMyPhotoMutation } from "@/redux/fetchers/user/userApi"
import {
  useGetMyAddressesQuery, useCreateMyAddressMutation, useUpdateMyAddressMutation, useDeleteMyAddressMutation,
} from "@/redux/fetchers/address/addressApi"
import { useChangePasswordMutation, useSetPasswordMutation } from "@/redux/fetchers/auth/authApi"
import { getErrorMessage } from "@/lib/get-error-message"

interface MeData {
  id: string
  name: string
  email: string
  phone: string | null
  avatar: string | null
  hasPassword: boolean
  createdAt: string
}

interface PersonalInfoCardProps {
  me: MeData
  updateMe: ReturnType<typeof useUpdateMeMutation>[0]
  savingProfile: boolean
}

function PersonalInfoCard({ me, updateMe, savingProfile }: PersonalInfoCardProps) {
  const [name, setName] = useState(me.name ?? "")
  const [email, setEmail] = useState(me.email ?? "")
  const [phone, setPhone] = useState(me.phone ?? "")

  async function handleSaveProfile(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim() || !email.trim()) {
      toast.error("Name and email are required.")
      return
    }
    try {
      await updateMe({ name, email, phone: phone || undefined }).unwrap()
      toast.success("Profile updated successfully")
    } catch (err) {
      toast.error(getErrorMessage(err, "Could not update profile"))
    }
  }

  return (
    <form onSubmit={handleSaveProfile} className="bg-white rounded-xl border border-border/50 p-5">
      <h2 className="font-semibold text-foreground mb-5" style={{ fontSize: "14px" }}>
        Personal Information
      </h2>
      <div className="space-y-4">
        <div>
          <label className="block text-muted-foreground mb-1.5" style={{ fontSize: "12px", fontWeight: 500 }}>
            Full Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClass()}
            style={{ borderRadius: "8px", fontSize: "13px" }}
          />
        </div>

        <div>
          <label className="block text-muted-foreground mb-1.5" style={{ fontSize: "12px", fontWeight: 500 }}>
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass()}
            style={{ borderRadius: "8px", fontSize: "13px" }}
          />
        </div>

        <div>
          <label className="block text-muted-foreground mb-1.5" style={{ fontSize: "12px", fontWeight: 500 }}>
            Phone Number
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={inputClass()}
            style={{ borderRadius: "8px", fontSize: "13px" }}
          />
        </div>
      </div>

      <div className="flex justify-end mt-5">
        <Button type="submit" disabled={savingProfile} className="h-9">
          <Check style={{ width: "14px", height: "14px" }} strokeWidth={2} />
          {savingProfile ? "Saving…" : "Save Changes"}
        </Button>
      </div>
    </form>
  )
}

interface AddressForm {
  id?: string
  fullName: string
  phone: string
  addressLine: string
  city: string
  district: string
  postalCode: string
  isDefault: boolean
}

const EMPTY_ADDRESS: AddressForm = {
  fullName: "", phone: "", addressLine: "", city: "", district: "", postalCode: "", isDefault: false,
}

function inputClass(hasError?: boolean) {
  return cn(
    "w-full h-9 px-3 bg-muted border border-border/60 text-foreground focus:outline-none focus:border-primary/50 transition-colors",
    hasError && "border-destructive"
  )
}

export default function ProfilePage() {
  const { data: meData, isLoading: meLoading } = useGetMeQuery(undefined)
  const me = meData?.data
  const [updateMe, { isLoading: savingProfile }] = useUpdateMeMutation()
  const [updateMyPhoto, { isLoading: uploadingPhoto }] = useUpdateMyPhotoMutation()
  const [changePassword, { isLoading: changingPassword }] = useChangePasswordMutation()
  const [setPassword, { isLoading: settingPassword }] = useSetPasswordMutation()

  const { data: addressesData, isLoading: addressesLoading } = useGetMyAddressesQuery(undefined)
  const [createMyAddress, { isLoading: creatingAddress }] = useCreateMyAddressMutation()
  const [updateMyAddress, { isLoading: updatingAddress }] = useUpdateMyAddressMutation()
  const [deleteMyAddress] = useDeleteMyAddressMutation()

  const fileInputRef = useRef<HTMLInputElement>(null)

  // Password
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  // Address dialog
  const [addressDialogOpen, setAddressDialogOpen] = useState(false)
  const [addressForm, setAddressForm] = useState<AddressForm>(EMPTY_ADDRESS)
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; label: string } | null>(null)

  const addresses = addressesData?.data ?? []

  async function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const formData = new FormData()
    formData.append("photo", file)
    try {
      await updateMyPhoto(formData).unwrap()
      toast.success("Photo updated successfully")
    } catch (err) {
      toast.error(getErrorMessage(err, "Could not update photo"))
    } finally {
      e.target.value = ""
    }
  }

  async function handlePasswordSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (newPassword.length < 6) {
      toast.error("New password must be at least 6 characters.")
      return
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.")
      return
    }
    if (me?.hasPassword && !oldPassword) {
      toast.error("Enter your current password.")
      return
    }

    try {
      if (me?.hasPassword) {
        await changePassword({ old_password: oldPassword, new_password: newPassword }).unwrap()
        toast.success("Password changed successfully")
      } else {
        await setPassword({ new_password: newPassword }).unwrap()
        toast.success("Password set successfully — you can now sign in with email and password too")
      }
      setOldPassword("")
      setNewPassword("")
      setConfirmPassword("")
    } catch (err) {
      toast.error(getErrorMessage(err, "Could not update password"))
    }
  }

  function openAddAddress() {
    setAddressForm(EMPTY_ADDRESS)
    setAddressDialogOpen(true)
  }

  function openEditAddress(addr: AddressForm & { id: string }) {
    setAddressForm({
      id: addr.id,
      fullName: addr.fullName,
      phone: addr.phone,
      addressLine: addr.addressLine,
      city: addr.city,
      district: addr.district ?? "",
      postalCode: addr.postalCode ?? "",
      isDefault: addr.isDefault,
    })
    setAddressDialogOpen(true)
  }

  async function handleAddressSubmit(e: React.FormEvent) {
    e.preventDefault()
    const { fullName, phone: addrPhone, addressLine, city, district, postalCode, isDefault, id } = addressForm
    if (!fullName.trim() || !addrPhone.trim() || !addressLine.trim() || !city.trim()) {
      toast.error("Please fill in all required address fields.")
      return
    }

    const payload = {
      fullName, phone: addrPhone, addressLine, city,
      district: district || undefined,
      postalCode: postalCode || undefined,
      isDefault,
    }

    try {
      if (id) {
        await updateMyAddress({ id, data: payload }).unwrap()
        toast.success("Address updated successfully")
      } else {
        await createMyAddress(payload).unwrap()
        toast.success("Address added successfully")
      }
      setAddressDialogOpen(false)
    } catch (err) {
      toast.error(getErrorMessage(err, "Could not save address"))
    }
  }

  async function handleSetDefault(id: string) {
    try {
      await updateMyAddress({ id, data: { isDefault: true } }).unwrap()
    } catch {
      toast.error("Could not set default address")
    }
  }

  async function handleDeleteAddress() {
    if (!deleteTarget) return
    try {
      await deleteMyAddress(deleteTarget.id).unwrap()
      toast.success("Address removed")
    } catch (err) {
      toast.error(getErrorMessage(err, "Could not remove address"))
    } finally {
      setDeleteTarget(null)
    }
  }

  return (
    <div className="space-y-6">
      {/* ── Page Header ── */}
      <div>
        <h1 className="font-semibold text-foreground" style={{ fontSize: "20px" }}>My Profile</h1>
        <p className="text-muted-foreground mt-0.5" style={{ fontSize: "13px" }}>
          Manage your personal information, password and delivery addresses
        </p>
      </div>

      {/* ── Profile Picture ── */}
      <div className="bg-white rounded-xl border border-border/50 p-5 flex items-center gap-5">
        <div className="relative shrink-0">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center bg-primary text-primary-foreground font-bold overflow-hidden"
            style={{ fontSize: "28px" }}
          >
            {me?.avatar ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={me.avatar} alt={me.name} className="w-full h-full object-cover" />
            ) : (
              (me?.name?.charAt(0).toUpperCase() ?? "?")
            )}
          </div>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploadingPhoto}
            className="absolute bottom-0 right-0 w-7 h-7 rounded-full flex items-center justify-center bg-primary text-primary-foreground shadow-md border-2 border-white transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            <Camera style={{ width: "13px", height: "13px" }} strokeWidth={1.5} />
          </button>
          <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
        </div>
        <div>
          <p className="font-semibold text-foreground" style={{ fontSize: "15px" }}>
            {meLoading ? "Loading…" : me?.name}
          </p>
          <p className="text-muted-foreground" style={{ fontSize: "12px" }}>{me?.email}</p>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploadingPhoto}
            className="mt-2 px-3 py-1.5 rounded-lg border border-border hover:bg-muted transition-colors text-foreground disabled:opacity-50"
            style={{ fontSize: "12px" }}
          >
            {uploadingPhoto ? "Uploading…" : "Change Photo"}
          </button>
        </div>
      </div>

      {/* ── Personal Information ── */}
      {me ? (
        <PersonalInfoCard key={me.id} me={me} updateMe={updateMe} savingProfile={savingProfile} />
      ) : (
        <div className="h-64 rounded-xl bg-white border border-border/50 animate-pulse" />
      )}

      {/* ── Password ── */}
      <div id="password" className="bg-white rounded-xl border border-border/50 p-5">
        <div className="flex items-center gap-2 mb-1">
          <Lock className="w-4 h-4 text-primary" strokeWidth={1.5} />
          <h2 className="font-semibold text-foreground" style={{ fontSize: "14px" }}>
            {me?.hasPassword ? "Change Password" : "Set a Password"}
          </h2>
        </div>
        <p className="text-muted-foreground mb-5" style={{ fontSize: "12px" }}>
          {me?.hasPassword
            ? "Update the password used to sign in with your email."
            : "Your account currently signs in with Google only. Set a password to also sign in with your email."}
        </p>

        <form onSubmit={handlePasswordSubmit} className="space-y-4 max-w-md">
          {me?.hasPassword && (
            <div>
              <label className="block text-muted-foreground mb-1.5" style={{ fontSize: "12px", fontWeight: 500 }}>
                Current Password
              </label>
              <input
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className={inputClass()}
                style={{ borderRadius: "8px", fontSize: "13px" }}
                autoComplete="current-password"
              />
            </div>
          )}
          <div>
            <label className="block text-muted-foreground mb-1.5" style={{ fontSize: "12px", fontWeight: 500 }}>
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className={inputClass()}
              style={{ borderRadius: "8px", fontSize: "13px" }}
              autoComplete="new-password"
            />
          </div>
          <div>
            <label className="block text-muted-foreground mb-1.5" style={{ fontSize: "12px", fontWeight: 500 }}>
              Confirm New Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={inputClass()}
              style={{ borderRadius: "8px", fontSize: "13px" }}
              autoComplete="new-password"
            />
          </div>

          <Button type="submit" disabled={changingPassword || settingPassword} className="h-9">
            <KeyRound style={{ width: "14px", height: "14px" }} strokeWidth={2} />
            {changingPassword || settingPassword
              ? "Saving…"
              : me?.hasPassword ? "Update Password" : "Set Password"}
          </Button>
        </form>
      </div>

      {/* ── Saved Addresses ── */}
      <div id="addresses" className="bg-white rounded-xl border border-border/50">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border/60">
          <div>
            <h2 className="font-semibold text-foreground" style={{ fontSize: "14px" }}>
              Saved Addresses
            </h2>
            <p className="text-muted-foreground mt-0.5" style={{ fontSize: "12px" }}>
              Manage your delivery addresses
            </p>
          </div>
          <Button onClick={openAddAddress} className="h-9">
            <Plus style={{ width: "13px", height: "13px" }} strokeWidth={2} />
            Add Address
          </Button>
        </div>

        {addressesLoading ? (
          <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="h-36 rounded-xl bg-muted animate-pulse" />
            ))}
          </div>
        ) : addresses.length === 0 ? (
          <div className="py-14 flex flex-col items-center gap-3 text-center">
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-primary/10">
              <MapPin className="w-5 h-5 text-primary" strokeWidth={1.5} />
            </div>
            <p className="text-foreground font-medium" style={{ fontSize: "13px" }}>No saved addresses</p>
            <Button variant="outline" onClick={openAddAddress} className="h-9">
              <Plus style={{ width: "13px", height: "13px" }} strokeWidth={2} />
              Add Address
            </Button>
          </div>
        ) : (
          <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {addresses.map((addr: AddressForm & { id: string }) => (
              <div
                key={addr.id}
                className={cn(
                  "relative rounded-xl border p-4 transition-colors",
                  addr.isDefault ? "border-primary/30 bg-primary/5" : "border-border/50 hover:border-border"
                )}
              >
                {addr.isDefault && (
                  <span
                    className="absolute top-3 right-3 inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-medium bg-primary/10 text-primary"
                    style={{ fontSize: "10px" }}
                  >
                    <Check style={{ width: "9px", height: "9px" }} strokeWidth={2.5} />
                    Default
                  </span>
                )}

                <div className="flex items-center gap-2 mb-2.5">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-primary/10">
                    <Home className="w-3.5 h-3.5 text-primary" strokeWidth={1.5} />
                  </div>
                  <span className="font-semibold text-foreground" style={{ fontSize: "13px" }}>
                    {addr.fullName}
                  </span>
                </div>

                <div className="flex items-start gap-2 mb-3">
                  <MapPin className="w-3.5 h-3.5 text-muted-foreground mt-0.5 shrink-0" strokeWidth={1.5} />
                  <div>
                    <p className="text-muted-foreground" style={{ fontSize: "12px", lineHeight: 1.6 }}>
                      {addr.addressLine}
                      <br />
                      {addr.city}{addr.district ? `, ${addr.district}` : ""} {addr.postalCode ?? ""}
                    </p>
                    <p className="text-muted-foreground mt-1" style={{ fontSize: "12px" }}>{addr.phone}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2.5 border-t border-border/40">
                  <button
                    type="button"
                    onClick={() => openEditAddress(addr)}
                    className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
                    style={{ fontSize: "12px" }}
                  >
                    <Edit2 style={{ width: "12px", height: "12px" }} strokeWidth={1.5} />
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeleteTarget({ id: addr.id, label: addr.addressLine })}
                    className="flex items-center gap-1.5 text-muted-foreground hover:text-red-500 transition-colors"
                    style={{ fontSize: "12px" }}
                  >
                    <Trash2 style={{ width: "12px", height: "12px" }} strokeWidth={1.5} />
                    Delete
                  </button>
                  {!addr.isDefault && (
                    <button
                      type="button"
                      onClick={() => handleSetDefault(addr.id)}
                      className="ml-auto flex items-center gap-1.5 text-primary hover:opacity-80 transition-opacity"
                      style={{ fontSize: "12px" }}
                    >
                      Set as Default
                    </button>
                  )}
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={openAddAddress}
              className="rounded-xl border-2 border-dashed border-border hover:border-primary/40 transition-colors p-4 flex flex-col items-center justify-center gap-2 text-muted-foreground hover:text-foreground min-h-[140px] group"
            >
              <div className="w-9 h-9 rounded-full flex items-center justify-center bg-muted group-hover:bg-primary/10 transition-colors">
                <Plus style={{ width: "16px", height: "16px" }} strokeWidth={1.5} />
              </div>
              <span style={{ fontSize: "12px" }}>Add New Address</span>
            </button>
          </div>
        )}
      </div>

      {/* ── Add / Edit Address Dialog ── */}
      <Dialog open={addressDialogOpen} onOpenChange={setAddressDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{addressForm.id ? "Edit Address" : "Add New Address"}</DialogTitle>
            <DialogDescription>Delivery address details for your orders.</DialogDescription>
          </DialogHeader>

          <form onSubmit={handleAddressSubmit} className="space-y-3">
            <div>
              <label className="block text-muted-foreground mb-1.5" style={{ fontSize: "12px", fontWeight: 500 }}>Full Name</label>
              <input
                value={addressForm.fullName}
                onChange={(e) => setAddressForm((f) => ({ ...f, fullName: e.target.value }))}
                className={inputClass()}
                style={{ borderRadius: "8px", fontSize: "13px" }}
              />
            </div>
            <div>
              <label className="block text-muted-foreground mb-1.5" style={{ fontSize: "12px", fontWeight: 500 }}>Phone</label>
              <input
                value={addressForm.phone}
                onChange={(e) => setAddressForm((f) => ({ ...f, phone: e.target.value }))}
                className={inputClass()}
                style={{ borderRadius: "8px", fontSize: "13px" }}
              />
            </div>
            <div>
              <label className="block text-muted-foreground mb-1.5" style={{ fontSize: "12px", fontWeight: 500 }}>Address Line</label>
              <input
                value={addressForm.addressLine}
                onChange={(e) => setAddressForm((f) => ({ ...f, addressLine: e.target.value }))}
                className={inputClass()}
                style={{ borderRadius: "8px", fontSize: "13px" }}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-muted-foreground mb-1.5" style={{ fontSize: "12px", fontWeight: 500 }}>City</label>
                <input
                  value={addressForm.city}
                  onChange={(e) => setAddressForm((f) => ({ ...f, city: e.target.value }))}
                  className={inputClass()}
                  style={{ borderRadius: "8px", fontSize: "13px" }}
                />
              </div>
              <div>
                <label className="block text-muted-foreground mb-1.5" style={{ fontSize: "12px", fontWeight: 500 }}>District</label>
                <input
                  value={addressForm.district}
                  onChange={(e) => setAddressForm((f) => ({ ...f, district: e.target.value }))}
                  className={inputClass()}
                  style={{ borderRadius: "8px", fontSize: "13px" }}
                />
              </div>
            </div>
            <div>
              <label className="block text-muted-foreground mb-1.5" style={{ fontSize: "12px", fontWeight: 500 }}>Postal Code</label>
              <input
                value={addressForm.postalCode}
                onChange={(e) => setAddressForm((f) => ({ ...f, postalCode: e.target.value }))}
                className={inputClass()}
                style={{ borderRadius: "8px", fontSize: "13px" }}
              />
            </div>
            <label className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                checked={addressForm.isDefault}
                onChange={(e) => setAddressForm((f) => ({ ...f, isDefault: e.target.checked }))}
              />
              <span className="text-muted-foreground" style={{ fontSize: "12px" }}>Set as default address</span>
            </label>

            <DialogFooter>
              <DialogClose render={<Button type="button" variant="outline" />}>Cancel</DialogClose>
              <Button type="submit" disabled={creatingAddress || updatingAddress}>
                {creatingAddress || updatingAddress ? "Saving…" : "Save Address"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* ── Delete Address Confirm ── */}
      <Dialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete this address?</DialogTitle>
            <DialogDescription>
              {deleteTarget?.label} will be permanently removed from your saved addresses.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose render={<Button variant="outline" />}>Cancel</DialogClose>
            <Button variant="destructive" onClick={handleDeleteAddress}>Delete Address</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
