"use client"

import Link from "next/link"
import { Package } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function OrdersPage() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-semibold text-foreground" style={{ fontSize: "20px" }}>My Orders</h1>
        <p className="text-muted-foreground mt-0.5" style={{ fontSize: "13px" }}>
          Track and manage your orders
        </p>
      </div>

      <div className="bg-white rounded-xl border border-border/50 py-20 flex flex-col items-center gap-3 text-center">
        <div className="w-12 h-12 rounded-full flex items-center justify-center bg-primary/10">
          <Package className="w-6 h-6 text-primary" strokeWidth={1.5} />
        </div>
        <p className="font-medium text-foreground" style={{ fontSize: "14px" }}>You don&apos;t have any orders yet</p>
        <p className="text-muted-foreground" style={{ fontSize: "12px" }}>
          When you place an order, it will show up here.
        </p>
        <Button render={<Link href="/shop" />} variant="outline" className="btn-label mt-2 h-9">
          Continue Shopping
        </Button>
      </div>
    </div>
  )
}
