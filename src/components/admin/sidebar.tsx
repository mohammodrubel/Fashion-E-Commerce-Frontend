"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard, Package, ShoppingCart, Users, Warehouse,
  BarChart3, Settings, ChevronDown, Plus, List, Tag, Image,
  Archive, Eye, Clock, CheckCircle, XCircle, RotateCcw,
  RefreshCcw, Truck, FileEdit, UserPlus, UserX, MapPin,
  History, TrendingDown, AlertTriangle, BarChart2, Boxes,
  DollarSign, CreditCard, Download, Store, User, Activity,
  LogOut, X, Sparkles, Palette, Ruler, Grid3x3
} from "lucide-react"
import { cn } from "@/lib/utils"

interface SubItem {
  label: string
  href: string
  icon?: React.ElementType
}

interface NavSection {
  id: string
  icon: React.ElementType
  label: string
  href: string
  children?: SubItem[]
}

const navSections: NavSection[] = [
  {
    id: "products",
    icon: Package,
    label: "Products",
    href: "/admin/products",
    children: [
      { label: "All Products", href: "/admin/products", icon: List },
      { label: "Add New Product", href: "/admin/products/new", icon: Plus },
      { label: "Categories", href: "/admin/products/categories", icon: Tag },
      { label: "Sizes", href: "/admin/products/sizes", icon: Ruler },
      { label: "Colors", href: "/admin/products/colors", icon: Palette },
      { label: "Product Variants", href: "/admin/products/variants", icon: Grid3x3 },
      { label: "Images & Gallery", href: "/admin/products/images", icon: Image },
      { label: "Draft Products", href: "/admin/products/drafts", icon: FileEdit },
      { label: "Active Products", href: "/admin/products/published", icon: Eye },
      { label: "Archived Products", href: "/admin/products/archived", icon: Archive },
    ],
  },
  {
    id: "orders",
    icon: ShoppingCart,
    label: "Orders",
    href: "/admin/orders",
    children: [
      { label: "All Orders", href: "/admin/orders", icon: List },
      { label: "Create New Order", href: "/admin/orders/new", icon: Plus },
      { label: "Pending", href: "/admin/orders/pending", icon: Clock },
      { label: "Processing", href: "/admin/orders/processing", icon: RefreshCcw },
      { label: "Confirmed", href: "/admin/orders/confirmed", icon: CheckCircle },
      { label: "Shipped", href: "/admin/orders/shipped", icon: Truck },
      { label: "Delivered", href: "/admin/orders/delivered", icon: CheckCircle },
      { label: "Cancelled", href: "/admin/orders/cancelled", icon: XCircle },
      { label: "Returned", href: "/admin/orders/returned", icon: RotateCcw },
    ],
  },
  {
    id: "customers",
    icon: Users,
    label: "Customers",
    href: "/admin/customers",
    children: [
      { label: "All Customers", href: "/admin/customers", icon: List },
      { label: "Add New Customer", href: "/admin/customers/new", icon: UserPlus },
      { label: "Addresses", href: "/admin/customers/addresses", icon: MapPin },
      { label: "Order History", href: "/admin/customers/order-history", icon: History },
      { label: "Blocked Customers", href: "/admin/customers/blocked", icon: UserX },
    ],
  },
  {
    id: "inventory",
    icon: Warehouse,
    label: "Inventory",
    href: "/admin/inventory",
    children: [
      { label: "Overview", href: "/admin/inventory", icon: BarChart2 },
      { label: "Stock Levels", href: "/admin/inventory/stock-levels", icon: Boxes },
      { label: "Low Stock", href: "/admin/inventory/low-stock", icon: TrendingDown },
      { label: "Out of Stock", href: "/admin/inventory/out-of-stock", icon: XCircle },
      { label: "Stock Adjustments", href: "/admin/inventory/adjustments", icon: RefreshCcw },
      { label: "Damaged Stock", href: "/admin/inventory/damaged", icon: AlertTriangle },
      { label: "Stock History", href: "/admin/inventory/history", icon: History },
    ],
  },
  {
    id: "reports",
    icon: BarChart3,
    label: "Reports",
    href: "/admin/reports",
    children: [
      { label: "Sales Overview", href: "/admin/reports", icon: BarChart2 },
      { label: "Sales by Product", href: "/admin/reports/sales-by-product", icon: Package },
      { label: "Sales by Category", href: "/admin/reports/sales-by-category", icon: Tag },
      { label: "Sales by Customer", href: "/admin/reports/sales-by-customer", icon: Users },
      { label: "Orders Report", href: "/admin/reports/orders", icon: ShoppingCart },
      { label: "Revenue & Profit", href: "/admin/reports/revenue", icon: DollarSign },
      { label: "Payment Reports", href: "/admin/reports/payments", icon: CreditCard },
      { label: "Export Reports", href: "/admin/reports/export", icon: Download },
    ],
  },
  {
    id: "settings",
    icon: Settings,
    label: "Settings",
    href: "/admin/settings",
    children: [
      { label: "General Settings", href: "/admin/settings", icon: Settings },
      { label: "Store Information", href: "/admin/settings/store-info", icon: Store },
      { label: "Admin Profile", href: "/admin/settings/profile", icon: User },
      { label: "User Management", href: "/admin/settings/users", icon: Users },
      { label: "Payment Methods", href: "/admin/settings/payment-methods", icon: CreditCard },
      { label: "Shipping Methods", href: "/admin/settings/shipping", icon: Truck },
      { label: "Activity Logs", href: "/admin/settings/activity-logs", icon: Activity },
    ],
  },
]

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname()
  const [expandedSections, setExpandedSections] = useState<string[]>(() =>
    navSections
      .filter((s) => s.children?.some((c) => pathname.startsWith(c.href) && c.href !== "/admin"))
      .map((s) => s.id)
  )

  function toggleSection(id: string) {
    setExpandedSections((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    )
  }

  function isActive(href: string) {
    if (href === "/admin") return pathname === "/admin"
    if (href === "/admin/products") return pathname === "/admin/products"
    if (href === "/admin/orders") return pathname === "/admin/orders"
    if (href === "/admin/customers") return pathname === "/admin/customers"
    if (href === "/admin/inventory") return pathname === "/admin/inventory"
    if (href === "/admin/reports") return pathname === "/admin/reports"
    if (href === "/admin/settings") return pathname === "/admin/settings"
    return pathname.startsWith(href)
  }

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={onClose} />
      )}
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-screen w-60 flex flex-col transition-transform duration-300 lg:translate-x-0 lg:static lg:z-auto",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
        style={{ backgroundColor: "#13100F" }}
      >
        {/* Logo */}
        <div
          className="flex items-center justify-between h-16 px-4 shrink-0"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
        >
          <Link href="/admin" className="flex items-center gap-2.5">
            <div
              className="w-7 h-7 flex items-center justify-center rounded"
              style={{ backgroundColor: "#501D2A" }}
            >
              <Sparkles className="w-3.5 h-3.5 text-white" strokeWidth={1.5} />
            </div>
            <span
              className="text-white font-semibold"
              style={{ fontSize: "14px", letterSpacing: "0.05em" }}
            >
              LumaStyle
            </span>
          </Link>
          <button
            onClick={onClose}
            className="lg:hidden text-white/40 hover:text-white/70 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Nav */}
        <nav
          className="flex-1 overflow-y-auto py-3 px-2.5"
          style={{ scrollbarWidth: "none" }}
        >
          {/* Dashboard */}
          <Link
            href="/admin"
            className={cn(
              "flex items-center gap-2.5 px-3 py-2 rounded-lg mb-1 transition-all duration-150",
              pathname === "/admin"
                ? "text-white bg-[#501D2A]/50"
                : "text-white/50 hover:text-white/80 hover:bg-white/5"
            )}
          >
            <LayoutDashboard className="w-4 h-4 shrink-0" strokeWidth={1.5} />
            <span style={{ fontSize: "13px" }}>Dashboard</span>
          </Link>

          {/* Sections */}
          <div className="mt-1 space-y-0.5">
            {navSections.map((section) => {
              const isExpanded = expandedSections.includes(section.id)
              const hasActiveChild = section.children?.some((c) => isActive(c.href)) ?? false
              const Icon = section.icon

              return (
                <div key={section.id}>
                  <button
                    onClick={() => toggleSection(section.id)}
                    className={cn(
                      "w-full flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all duration-150 text-left",
                      hasActiveChild || isExpanded
                        ? "text-white/90 bg-white/[0.04]"
                        : "text-white/50 hover:text-white/75"
                    )}
                  >
                    <Icon className="w-4 h-4 shrink-0" strokeWidth={1.5} />
                    <span style={{ fontSize: "13px" }}>{section.label}</span>
                    <ChevronDown
                      className={cn(
                        "ml-auto w-3.5 h-3.5 shrink-0 transition-transform duration-200",
                        isExpanded ? "rotate-180" : ""
                      )}
                      strokeWidth={1.5}
                    />
                  </button>

                  {isExpanded && section.children && (
                    <div
                      className="mt-0.5 ml-3 pl-3 space-y-0.5"
                      style={{ borderLeft: "1px solid rgba(255,255,255,0.06)" }}
                    >
                      {section.children.map((child) => {
                        const active = isActive(child.href)
                        const ChildIcon = child.icon
                        return (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={cn(
                              "flex items-center gap-2 px-2.5 py-1.5 rounded-md transition-all duration-150",
                              active
                                ? "text-white bg-[#501D2A]/50"
                                : "text-white/40 hover:text-white/70 hover:bg-white/5"
                            )}
                          >
                            {ChildIcon && (
                              <ChildIcon className="w-3.5 h-3.5 shrink-0" strokeWidth={1.5} />
                            )}
                            <span style={{ fontSize: "12px" }}>{child.label}</span>
                          </Link>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </nav>

        {/* User */}
        <div
          className="shrink-0 px-3 py-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div className="flex items-center gap-2.5 px-2">
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-white shrink-0"
              style={{ backgroundColor: "#501D2A", fontSize: "11px", fontWeight: 600 }}
            >
              A
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-medium truncate" style={{ fontSize: "12px" }}>
                Admin User
              </p>
              <p className="text-white/40 truncate" style={{ fontSize: "10px" }}>
                ADMIN
              </p>
            </div>
            <button className="text-white/30 hover:text-white/60 transition-colors shrink-0">
              <LogOut className="w-3.5 h-3.5" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}
