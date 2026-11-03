import { MessageSquare, Plus } from "lucide-react"
import { PageHeader } from "@/components/admin/page-header"

const orderNotes = [
  {
    orderId: "#5003",
    customer: "Emma Wilson",
    avatar: "E",
    notes: [
      {
        id: 1,
        author: "Admin",
        authorAvatar: "A",
        timestamp: "Oct 23, 2026 · 9:20 AM",
        text: "Customer called to confirm the XS size for the silk blouse. Verified and updated.",
      },
      {
        id: 2,
        author: "Warehouse",
        authorAvatar: "W",
        timestamp: "Oct 23, 2026 · 11:00 AM",
        text: "All 5 items picked. One item (Wrap Blouse) has slight delay — notified fulfillment team.",
      },
    ],
  },
  {
    orderId: "#5006",
    customer: "Liam Martinez",
    avatar: "L",
    notes: [
      {
        id: 3,
        author: "Admin",
        authorAvatar: "A",
        timestamp: "Oct 22, 2026 · 2:05 PM",
        text: "Order placed on hold pending PayPal payment verification. Customer emailed.",
      },
    ],
  },
  {
    orderId: "#5009",
    customer: "Ava Thomas",
    avatar: "A",
    notes: [
      {
        id: 4,
        author: "Support",
        authorAvatar: "S",
        timestamp: "Oct 21, 2026 · 3:30 PM",
        text: "Customer reported wrong size in return form. Confirmed return approved. Awaiting item receipt.",
      },
    ],
  },
  {
    orderId: "#5005",
    customer: "Olivia Davis",
    avatar: "O",
    notes: [
      {
        id: 5,
        author: "Admin",
        authorAvatar: "A",
        timestamp: "Oct 22, 2026 · 4:00 PM",
        text: "VIP customer — priority packing requested. Added gift note per customer request.",
      },
    ],
  },
  {
    orderId: "#5020",
    customer: "Grace Allen",
    avatar: "G",
    notes: [
      {
        id: 6,
        author: "Support",
        authorAvatar: "S",
        timestamp: "Oct 23, 2026 · 1:20 PM",
        text: "Address format issue flagged. Customer confirmed corrected address via email. Updated in system.",
      },
    ],
  },
]

export default function OrderNotesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Order Notes"
        description="Internal notes and comments on orders"
        breadcrumbs={[
          { label: "Admin",  href: "/admin" },
          { label: "Orders", href: "/admin/orders" },
          { label: "Notes" },
        ]}
        actions={
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-white font-medium transition-opacity hover:opacity-90"
            style={{ backgroundColor: "var(--primary)", fontSize: "13px" }}
          >
            <Plus className="w-4 h-4" strokeWidth={2} />
            Add Note
          </button>
        }
      />

      <div className="space-y-4">
        {orderNotes.map((order) => (
          <div key={order.orderId} className="bg-white rounded-xl border border-border/50 overflow-hidden">
            {/* Order header */}
            <div
              className="flex items-center gap-3 px-5 py-3.5"
              style={{ borderBottom: "1px solid var(--accent)", backgroundColor: "var(--muted)" }}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-white shrink-0"
                style={{ backgroundColor: "var(--primary)", fontSize: "11px", fontWeight: 600 }}
              >
                {order.avatar}
              </div>
              <div>
                <span className="font-semibold text-foreground" style={{ fontSize: "13px" }}>
                  {order.orderId}
                </span>
                <span className="text-muted-foreground mx-2" style={{ fontSize: "13px" }}>·</span>
                <span className="text-muted-foreground" style={{ fontSize: "13px" }}>{order.customer}</span>
              </div>
              <span
                className="ml-auto inline-flex items-center gap-1 text-muted-foreground"
                style={{ fontSize: "11px" }}
              >
                <MessageSquare className="w-3 h-3" strokeWidth={1.5} />
                {order.notes.length} note{order.notes.length !== 1 ? "s" : ""}
              </span>
            </div>

            {/* Notes */}
            <div className="p-5 space-y-4">
              {order.notes.map((note, j) => (
                <div
                  key={note.id}
                  className="flex gap-3"
                  style={j < order.notes.length - 1 ? { paddingBottom: "1rem", borderBottom: "1px solid var(--accent)" } : {}}
                >
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-white shrink-0 mt-0.5"
                    style={{ backgroundColor: "#A5ABC0", fontSize: "11px", fontWeight: 600 }}
                  >
                    {note.authorAvatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-foreground" style={{ fontSize: "12px" }}>
                        {note.author}
                      </span>
                      <span className="text-muted-foreground" style={{ fontSize: "11px" }}>
                        {note.timestamp}
                      </span>
                    </div>
                    <p className="text-foreground leading-relaxed" style={{ fontSize: "13px" }}>
                      {note.text}
                    </p>
                  </div>
                </div>
              ))}

              {/* Add note input */}
              <div className="flex gap-3 pt-2" style={{ borderTop: "1px solid var(--accent)" }}>
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-white shrink-0 mt-0.5"
                  style={{ backgroundColor: "var(--primary)", fontSize: "11px", fontWeight: 600 }}
                >
                  A
                </div>
                <div className="flex-1 flex gap-2">
                  <input
                    type="text"
                    placeholder="Add a note…"
                    className="flex-1 min-w-0 px-3 py-2 rounded-lg border border-border/60 bg-[var(--muted)] text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-border focus:bg-white transition-colors"
                    style={{ fontSize: "13px" }}
                  />
                  <button
                    className="px-3 py-2 rounded-lg text-white font-medium transition-opacity hover:opacity-90 whitespace-nowrap"
                    style={{ backgroundColor: "var(--primary)", fontSize: "12px" }}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
