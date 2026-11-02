"use client"

import { useParams } from "next/navigation"
import { CustomerForm } from "@/components/admin/customers/customer-form"

export default function EditCustomerPage() {
  const params = useParams<{ id: string }>()
  return <CustomerForm customerId={params.id} />
}
