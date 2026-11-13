export interface AdminPageMeta {
  title: string
  description: string
}

// Longest matching prefix wins. Keep in sync with sidebar nav.
const meta: Record<string, AdminPageMeta> = {
  "/admin": { title: "Dashboard", description: "Overview of store performance and recent activity." },
  "/admin/content/hero-banners": { title: "Homepage Banner", description: "Manage hero banners shown on the storefront homepage." },
  "/admin/products": { title: "Products", description: "Manage your catalog, pricing and availability." },
  "/admin/products/new": { title: "Add New Product", description: "Create a new product listing." },
  "/admin/products/categories": { title: "Categories", description: "Organize products into categories." },
  "/admin/products/sizes": { title: "Sizes", description: "Manage available product sizes." },
  "/admin/products/colors": { title: "Colors", description: "Manage available product colors." },
  "/admin/products/variants": { title: "Product Variants", description: "Manage size and color variants." },
  "/admin/products/published": { title: "Active Products", description: "Products currently visible in the store." },
  "/admin/orders": { title: "Orders", description: "Track, process and fulfil customer orders." },
  "/admin/orders/new": { title: "Create New Order", description: "Manually create an order for a customer." },
  "/admin/orders/pending": { title: "Pending Orders", description: "Orders awaiting confirmation." },
  "/admin/orders/processing": { title: "Processing Orders", description: "Orders currently being prepared." },
  "/admin/orders/confirmed": { title: "Confirmed Orders", description: "Orders confirmed and ready to ship." },
  "/admin/orders/shipped": { title: "Shipped Orders", description: "Orders on their way to customers." },
  "/admin/orders/delivered": { title: "Delivered Orders", description: "Successfully delivered orders." },
  "/admin/orders/cancelled": { title: "Cancelled Orders", description: "Orders that were cancelled." },
  "/admin/orders/returned": { title: "Returned Orders", description: "Orders returned by customers." },
  "/admin/customers": { title: "Customers", description: "View and manage your customer base." },
  "/admin/customers/new": { title: "Add New Customer", description: "Create a new customer account." },
  "/admin/customers/addresses": { title: "Customer Addresses", description: "Saved shipping and billing addresses." },
  "/admin/customers/order-history": { title: "Order History", description: "Past orders by customer." },
  "/admin/customers/blocked": { title: "Blocked Customers", description: "Customers restricted from the store." },
  "/admin/inventory": { title: "Inventory", description: "Stock overview across your catalog." },
  "/admin/inventory/stock-levels": { title: "Stock Levels", description: "Current stock for every item." },
  "/admin/inventory/low-stock": { title: "Low Stock", description: "Items running low and needing restock." },
  "/admin/inventory/out-of-stock": { title: "Out of Stock", description: "Items that are currently unavailable." },
  "/admin/inventory/adjustments": { title: "Stock Adjustments", description: "Manually adjust stock quantities." },
  "/admin/inventory/damaged": { title: "Damaged Stock", description: "Items recorded as damaged." },
  "/admin/inventory/history": { title: "Stock History", description: "Log of all stock movements." },
  "/admin/reports": { title: "Reports", description: "Sales and performance analytics." },
  "/admin/reports/sales-by-product": { title: "Sales by Product", description: "Revenue and units sold per product." },
  "/admin/reports/sales-by-category": { title: "Sales by Category", description: "Revenue breakdown by category." },
  "/admin/reports/sales-by-customer": { title: "Sales by Customer", description: "Revenue breakdown by customer." },
  "/admin/reports/orders": { title: "Orders Report", description: "Order volume and status trends." },
  "/admin/reports/revenue": { title: "Revenue & Profit", description: "Revenue and profit over time." },
  "/admin/reports/export": { title: "Export Reports", description: "Download reports as files." },
  "/admin/settings": { title: "Settings", description: "Configure your store and account." },
  "/admin/settings/store-info": { title: "Store Information", description: "Business name, contact and store details." },
  "/admin/settings/profile": { title: "Admin Profile", description: "Manage your personal account details." },
  "/admin/settings/users": { title: "User Management", description: "Manage admin users and permissions." },
  "/admin/settings/shipping": { title: "Shipping Methods", description: "Configure delivery options and rates." },
  "/admin/settings/activity-logs": { title: "Activity Logs", description: "Audit trail of admin actions." },
}

export function getAdminPageMeta(pathname: string): AdminPageMeta {
  const clean = pathname.replace(/\/+$/, "") || "/admin"
  let p = clean
  while (p) {
    if (meta[p]) return meta[p]
    const i = p.lastIndexOf("/")
    if (i <= 0) break
    p = p.slice(0, i)
  }
  return meta["/admin"]
}


//admin meta
