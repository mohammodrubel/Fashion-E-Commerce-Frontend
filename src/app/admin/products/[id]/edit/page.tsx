"use client"

import { useParams } from "next/navigation"
import { ProductForm } from "@/components/admin/products/product-form"

export default function EditProductPage() {
  const params = useParams<{ id: string }>()
  return <ProductForm productId={params.id} />
}
