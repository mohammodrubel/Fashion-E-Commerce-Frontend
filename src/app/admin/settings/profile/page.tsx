"use client"

import { useState } from "react"
import { toast } from "sonner"
import { Camera, Lock, Eye, EyeOff, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

type Role = "ADMIN" | "USER"

interface UserProfile {
  name: string
  email: string
  phone?: string
  role: Role
  isActive: boolean
}

const profile: UserProfile = {
  name: "Admin User",
  email: "admin@lumastyle.com",
  phone: "",
  role: "ADMIN",
  isActive: true,
}

export default function AdminProfilePage() {
  const [name, setName] = useState(profile.name)
  const [email, setEmail] = useState(profile.email)
  const [phone, setPhone] = useState(profile.phone ?? "")
  const [isSaving, setIsSaving] = useState(false)

  const [currentPw, setCurrentPw] = useState("")
  const [newPw, setNewPw] = useState("")
  const [confirmPw, setConfirmPw] = useState("")
  const [showCur, setShowCur] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showConf, setShowConf] = useState(false)
  const [isUpdatingPw, setIsUpdatingPw] = useState(false)

  function handleSave() {
    setIsSaving(true)
    setTimeout(() => {
      setIsSaving(false)
      toast.success(`Profile saved: ${name}`)
    }, 500)
  }

  function handleUpdatePassword() {
    if (!currentPw || !newPw || !confirmPw) return toast.error("Fill in all password fields")
    if (newPw !== confirmPw) return toast.error("Passwords do not match")
    setIsUpdatingPw(true)
    setTimeout(() => {
      setIsUpdatingPw(false)
      toast.success("Password updated successfully")
      setCurrentPw(""); setNewPw(""); setConfirmPw("")
    }, 500)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>Your name and photo as shown across the dashboard</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="flex items-center gap-4">
            <div className="relative shrink-0">
              <Avatar size="lg" className="size-16">
                <AvatarFallback className="text-lg font-semibold">{name.charAt(0).toUpperCase() || "A"}</AvatarFallback>
              </Avatar>
              <button
                type="button"
                className="absolute -right-1 -bottom-1 flex size-6 items-center justify-center rounded-full border bg-background shadow-sm transition-colors hover:bg-muted"
                title="Change Photo"
              >
                <Camera className="size-3 text-muted-foreground" strokeWidth={1.5} />
              </button>
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">{name}</p>
              <button type="button" className="mt-0.5 text-xs text-muted-foreground transition-colors hover:text-foreground">
                Change Photo
              </button>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="profile-name">Name</Label>
            <Input id="profile-name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="profile-email">Email</Label>
            <Input id="profile-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="profile-phone">Phone</Label>
            <Input id="profile-phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+880 1700-000000" />
            <p className="text-xs text-muted-foreground">Optional</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Role</Label>
              <div><Badge>{profile.role}</Badge></div>
              <p className="text-xs text-muted-foreground">Change via User Management</p>
            </div>
            <div className="space-y-1.5">
              <Label>Account Status</Label>
              <div>
                <Badge variant="outline" className="gap-1.5 border-emerald-200 text-emerald-700">
                  <span className="size-1.5 rounded-full bg-emerald-500" />
                  Active
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="justify-end border-t bg-transparent">
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? "Saving…" : "Save Changes"}
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Lock className="size-4" strokeWidth={1.5} /> Change Password</CardTitle>
          <CardDescription>Use a strong, unique password to keep your account secure</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="current-pw">Current Password</Label>
            <div className="relative">
              <Input
                id="current-pw"
                type={showCur ? "text" : "password"}
                value={currentPw}
                onChange={(e) => setCurrentPw(e.target.value)}
                placeholder="••••••••"
                className="pr-9"
              />
              <button type="button" onClick={() => setShowCur((v) => !v)} className="absolute top-1/2 right-2.5 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                {showCur ? <EyeOff className="size-4" strokeWidth={1.5} /> : <Eye className="size-4" strokeWidth={1.5} />}
              </button>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="new-pw">New Password</Label>
            <div className="relative">
              <Input
                id="new-pw"
                type={showNew ? "text" : "password"}
                value={newPw}
                onChange={(e) => setNewPw(e.target.value)}
                placeholder="Min. 8 characters"
                className="pr-9"
              />
              <button type="button" onClick={() => setShowNew((v) => !v)} className="absolute top-1/2 right-2.5 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                {showNew ? <EyeOff className="size-4" strokeWidth={1.5} /> : <Eye className="size-4" strokeWidth={1.5} />}
              </button>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="confirm-pw">Confirm New Password</Label>
            <div className="relative">
              <Input
                id="confirm-pw"
                type={showConf ? "text" : "password"}
                value={confirmPw}
                onChange={(e) => setConfirmPw(e.target.value)}
                placeholder="Repeat new password"
                className="pr-9"
              />
              <button type="button" onClick={() => setShowConf((v) => !v)} className="absolute top-1/2 right-2.5 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                {showConf ? <EyeOff className="size-4" strokeWidth={1.5} /> : <Eye className="size-4" strokeWidth={1.5} />}
              </button>
            </div>
            <p className="text-xs text-muted-foreground">
              Must be at least 8 characters, include an uppercase letter, a number, and a special character.
            </p>
          </div>
        </CardContent>
        <CardFooter className="justify-end border-t bg-transparent">
          <Button variant="outline" onClick={handleUpdatePassword} disabled={isUpdatingPw}>
            <ShieldCheck data-icon="inline-start" />
            {isUpdatingPw ? "Updating…" : "Update Password"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
