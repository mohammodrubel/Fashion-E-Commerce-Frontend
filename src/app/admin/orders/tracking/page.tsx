import { Search, Package, CheckCircle, Truck, MapPin, Clock } from "lucide-react"
import { PageHeader } from "@/components/admin/page-header"

const sampleTracking = {
  orderId: "#5002",
  customer: "Michael Chen",
  tracking: "1Z999AA10123456784",
  carrier: "UPS",
  estimatedDelivery: "Oct 27, 2026",
  currentStatus: "Shipped",
  destination: "New York, NY 10001",
  timeline: [
    {
      status: "Ordered",
      label: "Order Placed",
      description: "Order confirmed and payment processed",
      date: "Oct 24, 2026",
      time: "9:32 AM",
      done: true,
      active: false,
    },
    {
      status: "Confirmed",
      label: "Order Confirmed",
      description: "Order verified and assigned to warehouse",
      date: "Oct 24, 2026",
      time: "10:15 AM",
      done: true,
      active: false,
    },
    {
      status: "Processing",
      label: "Packed & Ready",
      description: "Items picked, packed, and labelled",
      date: "Oct 24, 2026",
      time: "2:00 PM",
      done: true,
      active: false,
    },
    {
      status: "Shipped",
      label: "Shipped",
      description: "Package handed to UPS — in transit",
      date: "Oct 24, 2026",
      time: "5:45 PM",
      done: true,
      active: true,
    },
    {
      status: "Delivered",
      label: "Delivered",
      description: "Package delivered to recipient",
      date: "Est. Oct 27, 2026",
      time: "—",
      done: false,
      active: false,
    },
  ],
}

const stepIcon = (status: string) => {
  switch (status) {
    case "Ordered":     return Clock
    case "Confirmed":   return CheckCircle
    case "Processing":  return Package
    case "Shipped":     return Truck
    case "Delivered":   return MapPin
    default:            return Clock
  }
}

export default function OrderTrackingPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Order Tracking"
        description="Track orders by order ID or tracking number"
        breadcrumbs={[
          { label: "Admin",  href: "/admin" },
          { label: "Orders", href: "/admin/orders" },
          { label: "Tracking" },
        ]}
      />

      {/* Search */}
      <div className="bg-white rounded-xl border border-border/50 p-5">
        <p className="text-muted-foreground mb-3" style={{ fontSize: "13px" }}>
          Enter an order ID (e.g. #5002) or tracking number to view shipment status.
        </p>
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
            <input
              type="text"
              placeholder="Order ID or tracking number…"
              defaultValue="#5002"
              className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-border/60 bg-[#F8F7F5] text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-border focus:bg-white transition-colors"
              style={{ fontSize: "13px" }}
            />
          </div>
          <button
            className="px-5 py-2.5 rounded-lg text-white font-medium transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#501D2A", fontSize: "13px" }}
          >
            Track
          </button>
        </div>
      </div>

      {/* Tracking Result */}
      <div className="bg-white rounded-xl border border-border/50 p-6">
        {/* Order Info */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5" style={{ borderBottom: "1px solid #F0EDEF" }}>
          <div>
            <h2 className="font-semibold text-foreground" style={{ fontSize: "15px" }}>
              Order {sampleTracking.orderId}
            </h2>
            <p className="text-muted-foreground mt-0.5" style={{ fontSize: "12px" }}>
              Customer: {sampleTracking.customer} · Destination: {sampleTracking.destination}
            </p>
          </div>
          <div className="flex flex-col items-start sm:items-end gap-1">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground" style={{ fontSize: "12px" }}>Carrier:</span>
              <span className="font-medium text-foreground" style={{ fontSize: "12px" }}>{sampleTracking.carrier}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground" style={{ fontSize: "12px" }}>Tracking #:</span>
              <span
                className="font-mono text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded"
                style={{ fontSize: "11px" }}
              >
                {sampleTracking.tracking}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground" style={{ fontSize: "12px" }}>Est. Delivery:</span>
              <span className="font-medium text-foreground" style={{ fontSize: "12px" }}>{sampleTracking.estimatedDelivery}</span>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="mt-6">
          <h3 className="font-semibold text-foreground mb-6" style={{ fontSize: "13px", textTransform: "uppercase", letterSpacing: "0.07em" }}>
            Shipment Timeline
          </h3>

          <div className="relative">
            {/* Vertical line */}
            <div
              className="absolute left-5 top-5 bottom-5 w-px"
              style={{ backgroundColor: "#F0EDEF" }}
            />

            <div className="space-y-0">
              {sampleTracking.timeline.map((step, i) => {
                const Icon = stepIcon(step.status)
                const isLast = i === sampleTracking.timeline.length - 1

                return (
                  <div key={step.status} className="relative flex gap-4">
                    {/* Icon */}
                    <div
                      className="relative z-10 w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                      style={{
                        backgroundColor: step.active
                          ? "#501D2A"
                          : step.done
                          ? "#F0EDEF"
                          : "#F8F7F5",
                        border: step.active
                          ? "2px solid #501D2A"
                          : step.done
                          ? "2px solid #D4C8CC"
                          : "2px dashed #D4C8CC",
                      }}
                    >
                      <Icon
                        className="w-4 h-4"
                        style={{
                          color: step.active ? "#fff" : step.done ? "#501D2A" : "#9C7A83",
                        }}
                        strokeWidth={step.active ? 2 : 1.5}
                      />
                    </div>

                    {/* Content */}
                    <div className={`flex-1 min-w-0 ${!isLast ? "pb-8" : ""}`}>
                      <div className="flex items-start justify-between gap-4 pt-1.5">
                        <div>
                          <p
                            className="font-medium"
                            style={{
                              fontSize: "13px",
                              color: step.active ? "#501D2A" : step.done ? "#1a1a1a" : "#9C7A83",
                            }}
                          >
                            {step.label}
                            {step.active && (
                              <span
                                className="ml-2 inline-flex items-center rounded-full px-2 py-0.5 bg-amber-50 text-amber-700 font-medium"
                                style={{ fontSize: "10px" }}
                              >
                                Current
                              </span>
                            )}
                          </p>
                          <p className="text-muted-foreground mt-0.5" style={{ fontSize: "12px" }}>
                            {step.description}
                          </p>
                        </div>
                        <div className="text-right shrink-0">
                          <p
                            className="font-medium"
                            style={{
                              fontSize: "12px",
                              color: step.done ? "#1a1a1a" : "#9C7A83",
                            }}
                          >
                            {step.date}
                          </p>
                          <p className="text-muted-foreground" style={{ fontSize: "11px" }}>{step.time}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
