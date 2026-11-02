"use client"

import { CustomerForm } from "@/components/admin/customers/customer-form"

export default function NewSystemUserPage() {
  return (
    <CustomerForm
      basePath="/admin/settings/users"
      breadcrumbLabel="User Management"
      entityLabel="User"
    />
  )
}
