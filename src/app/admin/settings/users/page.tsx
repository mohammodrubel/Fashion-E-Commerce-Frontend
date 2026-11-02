"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { toast } from "sonner"
import {
  UserPlus, Users, Search, Pencil, Trash2, ChevronLeft, ChevronRight, Loader2,
} from "lucide-react"
import {
  useGetAllUsersQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} from "@/redux/fetchers/user/userApi"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"

export default function UserManagementPage() {
  const [searchInput, setSearchInput] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [role, setRole] = useState<string>("")
  const [isActive, setIsActive] = useState<string>("")
  const [page, setPage] = useState(1)
  const limit = 10

  useEffect(() => {
    const t = setTimeout(() => { setSearchTerm(searchInput.trim()); setPage(1) }, 400)
    return () => clearTimeout(t)
  }, [searchInput])

  const queryParams = useMemo(
    () => ({
      page,
      limit,
      sort: "createdAt",
      order: "desc",
      ...(searchTerm ? { searchTerm } : {}),
      ...(role ? { role } : {}),
      ...(isActive ? { isActive } : {}),
    }),
    [page, searchTerm, role, isActive],
  )

  const { data, isLoading, isFetching } = useGetAllUsersQuery(queryParams)
  const { data: adminCountData } = useGetAllUsersQuery({ role: "ADMIN", page: 1, limit: 1 })
  const { data: userCountData } = useGetAllUsersQuery({ role: "USER", page: 1, limit: 1 })
  const { data: activeCountData } = useGetAllUsersQuery({ isActive: "true", page: 1, limit: 1 })
  const { data: blockedCountData } = useGetAllUsersQuery({ isActive: "false", page: 1, limit: 1 })

  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation()
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation()

  const users = data?.data ?? []
  const meta = data?.meta ?? { page: 1, limit, total: 0, totalPage: 1 }

  async function handleToggleActive(id: string, nextActive: boolean) {
    if (!confirm(nextActive ? "Activate this account?" : "Deactivate this account? It will not be able to log in.")) return
    try {
      await updateUser({ id, data: { isActive: nextActive } }).unwrap()
      toast.success(nextActive ? "Account activated" : "Account deactivated")
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update account.")
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this account? This cannot be undone.")) return
    try {
      await deleteUser(id).unwrap()
      toast.success("Account deleted successfully")
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to delete account.")
    }
  }

  const stats = [
    { label: "Admin Users", value: adminCountData?.meta?.total ?? 0 },
    { label: "Customer Accounts", value: userCountData?.meta?.total ?? 0 },
    { label: "Active", value: activeCountData?.meta?.total ?? 0 },
    { label: "Deactivated", value: blockedCountData?.meta?.total ?? 0 },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-semibold text-foreground">User Management</h2>
          <p className="text-sm text-muted-foreground">Admin and customer accounts on the User model.</p>
        </div>
        <Button render={<Link href="/admin/settings/users/new" />}>
          <UserPlus data-icon="inline-start" />
          Add User
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardContent className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">{s.label}</p>
                <p className="mt-1 text-xl font-semibold text-foreground">{s.value}</p>
              </div>
              <Users className="size-4 text-muted-foreground" strokeWidth={1.5} />
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Users</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1 sm:max-w-xs">
              <Search className="absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-muted-foreground" strokeWidth={1.5} />
              <Input
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search by name, email, phone..."
                className="pl-8"
              />
            </div>
            <Select value={role || "all"} onValueChange={(v) => { setRole(!v || v === "all" ? "" : v); setPage(1) }}>
              <SelectTrigger className="w-full sm:w-36"><SelectValue placeholder="All roles" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All roles</SelectItem>
                <SelectItem value="ADMIN">Admin</SelectItem>
                <SelectItem value="USER">Customer</SelectItem>
              </SelectContent>
            </Select>
            <Select value={isActive || "all"} onValueChange={(v) => { setIsActive(!v || v === "all" ? "" : v); setPage(1) }}>
              <SelectTrigger className="w-full sm:w-36"><SelectValue placeholder="All status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All status</SelectItem>
                <SelectItem value="true">Active</SelectItem>
                <SelectItem value="false">Deactivated</SelectItem>
              </SelectContent>
            </Select>
            {isFetching && !isLoading && <Loader2 className="size-4 animate-spin text-muted-foreground sm:ml-auto" strokeWidth={1.5} />}
          </div>

          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Active</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading && Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i}>
                    {Array.from({ length: 7 }).map((_, c) => (
                      <TableCell key={c}><Skeleton className="h-4 w-full max-w-28" /></TableCell>
                    ))}
                  </TableRow>
                ))}
                {!isLoading && users.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                      No users found.
                    </TableCell>
                  </TableRow>
                )}
                {users.map((user: any) => {
                  const initials = (user.name || "?").split(" ").map((w: string) => w[0]).join("").slice(0, 2).toUpperCase()
                  return (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center gap-2.5">
                          <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                            {initials}
                          </div>
                          <span className="font-medium text-foreground">{user.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{user.email}</TableCell>
                      <TableCell className="text-muted-foreground">{user.phone ?? "—"}</TableCell>
                      <TableCell>
                        <Badge variant={user.role === "ADMIN" ? "default" : "secondary"}>{user.role}</Badge>
                      </TableCell>
                      <TableCell>
                        <Switch
                          checked={user.isActive}
                          disabled={isUpdating}
                          onCheckedChange={() => handleToggleActive(user.id, !user.isActive)}
                          aria-label={`Toggle active status for ${user.name}`}
                        />
                      </TableCell>
                      <TableCell className="text-muted-foreground">{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            render={<Link href={`/admin/settings/users/${user.id}/edit`} />}
                          >
                            <Pencil />
                          </Button>
                          <Button variant="ghost" size="icon-sm" disabled={isDeleting} onClick={() => handleDelete(user.id)}>
                            <Trash2 className="text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {isLoading ? <Skeleton className="h-3 w-32" /> : `Showing ${users.length} of ${meta.total ?? 0} users`}
            </p>
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="icon-sm"
                disabled={(meta.page ?? 1) <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                <ChevronLeft />
              </Button>
              <span className="px-2 text-sm text-foreground">
                Page {meta.page ?? 1} of {meta.totalPage ?? 1}
              </span>
              <Button
                variant="outline"
                size="icon-sm"
                disabled={(meta.page ?? 1) >= (meta.totalPage ?? 1)}
                onClick={() => setPage((p) => Math.min(meta.totalPage ?? 1, p + 1))}
              >
                <ChevronRight />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
