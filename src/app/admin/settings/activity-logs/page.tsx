"use client"

import { useState } from "react"
import { toast } from "sonner"
import { Clock, Download, Filter, User, Package, ShoppingCart, Settings, Shield, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const logs = [
  { time: "Oct 24, 2026 9:42 AM", user: "Alexandra Dupont", avatar: "A", action: "Product Updated", details: "Updated pricing on 'Silk Wrap Dress' — ৳720 → ৳770", ip: "74.125.46.22", type: "product" },
  { time: "Oct 24, 2026 9:18 AM", user: "Marcus Webb", avatar: "M", action: "Order Status Changed", details: "Order #4521 marked as Shipped", ip: "96.120.11.8", type: "order" },
  { time: "Oct 24, 2026 8:55 AM", user: "Isabelle Morel", avatar: "I", action: "Coupon Created", details: "Created coupon FLASH50 — ৳50 off, 100 uses", ip: "74.125.46.55", type: "discount" },
  { time: "Oct 23, 2026 4:32 PM", user: "Alexandra Dupont", avatar: "A", action: "Settings Updated", details: "Changed timezone to Asia/Dhaka", ip: "74.125.46.22", type: "settings" },
  { time: "Oct 23, 2026 2:14 PM", user: "Theo Nakamura", avatar: "T", action: "Customer Refunded", details: "Issued ৳890 refund on Order #4490", ip: "24.50.31.109", type: "order" },
  { time: "Oct 23, 2026 11:20 AM", user: "Marcus Webb", avatar: "M", action: "Product Added", details: "New product 'Autumn Velvet Blazer' published", ip: "96.120.11.8", type: "product" },
  { time: "Oct 22, 2026 5:08 PM", user: "Alexandra Dupont", avatar: "A", action: "User Invited", details: "Sent invite to camille@lumastyle.com", ip: "74.125.46.22", type: "user" },
  { time: "Oct 22, 2026 3:45 PM", user: "Isabelle Morel", avatar: "I", action: "Inventory Updated", details: "Restocked 'Ribbed Tank Top' — 50 units added", ip: "74.125.46.55", type: "product" },
  { time: "Oct 21, 2026 1:22 PM", user: "Alexandra Dupont", avatar: "A", action: "Role Modified", details: "Updated 'Manager' role permissions", ip: "74.125.46.22", type: "security" },
  { time: "Oct 21, 2026 10:00 AM", user: "System", avatar: "S", action: "Backup Completed", details: "Automatic daily backup — 24.8 MB", ip: "Internal", type: "system" },
]

const typeConfig: Record<string, { icon: typeof Package; className: string }> = {
  product: { icon: Package, className: "bg-primary/10 text-primary" },
  order: { icon: ShoppingCart, className: "bg-emerald-50 text-emerald-600" },
  discount: { icon: Tag, className: "bg-amber-50 text-amber-600" },
  settings: { icon: Settings, className: "bg-muted text-muted-foreground" },
  user: { icon: User, className: "bg-violet-50 text-violet-600" },
  security: { icon: Shield, className: "bg-red-50 text-red-600" },
  system: { icon: Clock, className: "bg-sky-50 text-sky-600" },
}

export default function ActivityLogsPage() {
  const [userFilter, setUserFilter] = useState("all")
  const [actionFilter, setActionFilter] = useState("all")
  const [rangeFilter, setRangeFilter] = useState("7d")

  function handleApplyFilters() {
    toast.success("Filters applied")
  }

  function handleExport() {
    toast.success("Exporting activity logs…")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-semibold text-foreground">Activity Logs</h2>
          <p className="text-sm text-muted-foreground">Complete audit trail of all admin actions.</p>
        </div>
        <Button variant="outline" onClick={handleExport}>
          <Download data-icon="inline-start" />
          Export Logs
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Filter className="size-4" strokeWidth={1.5} /> Filters</CardTitle>
          <CardDescription>Narrow down the audit trail</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-center gap-3">
            <Select value={userFilter} onValueChange={(v) => setUserFilter(v ?? "all")}>
              <SelectTrigger className="w-44"><SelectValue placeholder="All users" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Users</SelectItem>
                <SelectItem value="alexandra">Alexandra Dupont</SelectItem>
                <SelectItem value="marcus">Marcus Webb</SelectItem>
                <SelectItem value="isabelle">Isabelle Morel</SelectItem>
              </SelectContent>
            </Select>
            <Select value={actionFilter} onValueChange={(v) => setActionFilter(v ?? "all")}>
              <SelectTrigger className="w-48"><SelectValue placeholder="All actions" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Actions</SelectItem>
                <SelectItem value="product">Product Changes</SelectItem>
                <SelectItem value="order">Order Changes</SelectItem>
                <SelectItem value="settings">Settings Changes</SelectItem>
                <SelectItem value="security">Security Events</SelectItem>
              </SelectContent>
            </Select>
            <Select value={rangeFilter} onValueChange={(v) => setRangeFilter(v ?? "7d")}>
              <SelectTrigger className="w-40"><SelectValue placeholder="Last 7 days" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="custom">Custom range</SelectItem>
              </SelectContent>
            </Select>
            <Button className="sm:ml-auto" onClick={handleApplyFilters}>Apply Filters</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Recent Activity
            <Badge variant="secondary">{logs.length} entries</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Details</TableHead>
                  <TableHead>IP Address</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {logs.map((log, i) => {
                  const type = typeConfig[log.type] ?? typeConfig.system
                  const Icon = type.icon
                  return (
                    <TableRow key={i}>
                      <TableCell className="text-muted-foreground">
                        <div className="flex items-center gap-1.5 whitespace-nowrap">
                          <Clock className="size-3" strokeWidth={1.5} />
                          {log.time}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                            {log.avatar}
                          </div>
                          <span className="font-medium text-foreground">{log.user}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 whitespace-nowrap">
                          <div className={`flex size-5 shrink-0 items-center justify-center rounded ${type.className}`}>
                            <Icon className="size-3" strokeWidth={1.5} />
                          </div>
                          <span className="font-medium text-foreground">{log.action}</span>
                        </div>
                      </TableCell>
                      <TableCell className="max-w-xs truncate text-muted-foreground">{log.details}</TableCell>
                      <TableCell>
                        <code className="font-mono text-xs text-muted-foreground">{log.ip}</code>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Showing {logs.length} of 1,247 entries</p>
            <div className="flex items-center gap-1">
              <Button variant="outline" size="sm">Previous</Button>
              <Button variant="outline" size="sm">Next</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
