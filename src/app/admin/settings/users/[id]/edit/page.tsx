"use client"

import { useParams } from "next/navigation"
import { CustomerForm } from "@/components/admin/customers/customer-form"

export default function EditSystemUserPage() {
  const params = useParams<{ id: string }>()
  return (
    <CustomerForm
      customerId={params.id}
      basePath="/admin/settings/users"
      breadcrumbLabel="User Management"
      entityLabel="User"
    />
  )
}
