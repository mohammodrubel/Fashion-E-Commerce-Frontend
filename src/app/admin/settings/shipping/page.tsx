"use client"

import { useState } from "react"
import { toast } from "sonner"
import { Truck, Plus, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose,
} from "@/components/ui/dialog"

// No Prisma model — static config. Order.shippingCost stores the cost at time of order placement.
interface ShippingMethod {
  id: string
  name: string
  zone: string
  price: number
  estimatedDays: string
  isActive: boolean
}

const initialMethods: ShippingMethod[] = [
  { id: "sh-001", name: "Inside Dhaka", zone: "Dhaka City", price: 60, estimatedDays: "1-2 days", isActive: true },
  { id: "sh-002", name: "Outside Dhaka", zone: "Nationwide", price: 120, estimatedDays: "3-5 days", isActive: true },
  { id: "sh-003", name: "Express (Dhaka)", zone: "Dhaka City", price: 150, estimatedDays: "Same day", isActive: true },
  { id: "sh-004", name: "International", zone: "International", price: 800, estimatedDays: "7-14 days", isActive: false },
]

export default function ShippingPage() {
  const [methods, setMethods] = useState<ShippingMethod[]>(initialMethods)
  const [isSaving, setIsSaving] = useState(false)

  const [dialogOpen, setDialogOpen] = useState(false)
  const [newName, setNewName] = useState("")
  const [newZone, setNewZone] = useState("")
  const [newPrice, setNewPrice] = useState("")
  const [newDays, setNewDays] = useState("")

  function toggleActive(id: string) {
    setMethods((prev) => prev.map((m) => (m.id === id ? { ...m, isActive: !m.isActive } : m)))
  }

  function updatePrice(id: string, val: string) {
    const num = parseInt(val, 10)
    if (Number.isNaN(num) || num < 0) return
    setMethods((prev) => prev.map((m) => (m.id === id ? { ...m, price: num } : m)))
  }

  function updateDays(id: string, val: string) {
    setMethods((prev) => prev.map((m) => (m.id === id ? { ...m, estimatedDays: val } : m)))
  }

  function handleDelete(id: string) {
    if (!confirm("Remove this shipping method?")) return
    setMethods((prev) => prev.filter((m) => m.id !== id))
    toast.success("Shipping method removed")
  }

  function handleAddMethod() {
    if (!newName.trim() || !newZone.trim() || !newPrice) {
      toast.error("Name, zone and price are required")
      return
    }
    setMethods((prev) => [
      ...prev,
      {
        id: `sh-${Date.now()}`,
        name: newName.trim(),
        zone: newZone.trim(),
        price: Number(newPrice) || 0,
        estimatedDays: newDays.trim() || "—",
        isActive: true,
      },
    ])
    toast.success("Shipping method added")
    setNewName(""); setNewZone(""); setNewPrice(""); setNewDays("")
    setDialogOpen(false)
  }

  function handleSave() {
    setIsSaving(true)
    setTimeout(() => {
      setIsSaving(false)
      toast.success("Shipping configuration saved")
    }, 500)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-semibold text-foreground">Shipping Methods</h2>
          <p className="text-sm text-muted-foreground">Configure shipping zones and rates for customer orders.</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <Button onClick={() => setDialogOpen(true)}>
            <Plus data-icon="inline-start" />
            Add Custom Method
          </Button>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Shipping Method</DialogTitle>
              <DialogDescription>Create a custom delivery option for a specific zone.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="new-method-name">Method Name</Label>
                <Input id="new-method-name" value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="e.g. Same-Day Delivery" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="new-method-zone">Zone</Label>
                <Input id="new-method-zone" value={newZone} onChange={(e) => setNewZone(e.target.value)} placeholder="e.g. Dhaka City" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="new-method-price">Price (BDT)</Label>
                  <Input id="new-method-price" type="number" min="0" value={newPrice} onChange={(e) => setNewPrice(e.target.value)} placeholder="0" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="new-method-days">Est. Delivery</Label>
                  <Input id="new-method-days" value={newDays} onChange={(e) => setNewDays(e.target.value)} placeholder="e.g. 2-3 days" />
                </div>
              </div>
            </div>
            <DialogFooter>
              <DialogClose render={<Button variant="outline" />}>Cancel</DialogClose>
              <Button onClick={handleAddMethod}>Add Method</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-start gap-2.5 rounded-lg border border-sky-200 bg-sky-50 px-4 py-3 text-sm text-sky-700">
        <Info className="mt-0.5 size-4 shrink-0" strokeWidth={1.5} />
        <p>
          <strong>Note:</strong> <code className="font-mono text-xs">Order.shippingCost</code> stores the shipping cost at
          time of order. Changes here apply to new orders only.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Truck className="size-4" strokeWidth={1.5} /> Shipping Methods</CardTitle>
          <CardDescription>Toggle, edit price and delivery estimate per method</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Method</TableHead>
                  <TableHead>Zone</TableHead>
                  <TableHead>Price (BDT)</TableHead>
                  <TableHead>Est. Delivery</TableHead>
                  <TableHead>Active</TableHead>
                  <TableHead className="text-right">Remove</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {methods.map((m) => (
                  <TableRow key={m.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Truck className="size-4 shrink-0 text-muted-foreground" strokeWidth={1.5} />
                        <span className="font-medium text-foreground">{m.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{m.zone}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5">
                        <span className="text-muted-foreground">৳</span>
                        <Input
                          type="number"
                          min="0"
                          value={m.price}
                          onChange={(e) => updatePrice(m.id, e.target.value)}
                          className="w-20 text-center"
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <Input value={m.estimatedDays} onChange={(e) => updateDays(m.id, e.target.value)} className="w-28" />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Switch checked={m.isActive} onCheckedChange={() => toggleActive(m.id)} />
                        <span className={m.isActive ? "text-xs font-medium text-emerald-600" : "text-xs font-medium text-muted-foreground"}>
                          {m.isActive ? "Active" : "Inactive"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" className="text-destructive" onClick={() => handleDelete(m.id)}>
                        Remove
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter className="justify-end border-t bg-transparent">
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? "Saving…" : "Save Shipping Config"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
