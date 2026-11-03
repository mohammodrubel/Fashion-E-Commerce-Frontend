import { PageHeader } from "@/components/admin/page-header"
import { Plus, GripVertical, Pencil, Trash2, ChevronRight, ExternalLink } from "lucide-react"

interface MenuItem {
  label: string
  link: string
  children?: MenuItem[]
}

const mainMenu: MenuItem[] = [
  { label: "New In", link: "/new-in" },
  {
    label: "Shop", link: "#",
    children: [
      { label: "Dresses", link: "/dresses" },
      { label: "Tops & Blouses", link: "/tops" },
      { label: "Trousers & Jeans", link: "/trousers" },
      { label: "Knitwear", link: "/knitwear" },
      { label: "Outerwear", link: "/outerwear" },
      { label: "Skirts", link: "/skirts" },
    ],
  },
  {
    label: "Collections", link: "#",
    children: [
      { label: "Autumn 2024", link: "/collections/autumn-2024" },
      { label: "The Velvet Edit", link: "/collections/velvet" },
    ],
  },
  { label: "Sale", link: "/sale" },
  { label: "About", link: "/about" },
]

const footerMenu: MenuItem[] = [
  {
    label: "Company", link: "#",
    children: [
      { label: "About Us", link: "/about" },
      { label: "Sustainability", link: "/sustainability" },
      { label: "Careers", link: "/careers" },
      { label: "Press", link: "/press" },
    ],
  },
  {
    label: "Customer Service", link: "#",
    children: [
      { label: "Contact Us", link: "/contact" },
      { label: "FAQ", link: "/faq" },
      { label: "Returns & Exchanges", link: "/returns" },
      { label: "Shipping Info", link: "/shipping" },
    ],
  },
  {
    label: "Legal", link: "#",
    children: [
      { label: "Privacy Policy", link: "/privacy" },
      { label: "Terms of Service", link: "/terms" },
      { label: "Cookie Policy", link: "/cookies" },
    ],
  },
]

function MenuItemRow({ item, depth = 0 }: { item: MenuItem; depth?: number }) {
  return (
    <div>
      <div
        className="flex items-center gap-2 py-2 px-3 rounded-lg hover:bg-[var(--muted)] transition-colors group"
        style={{ paddingLeft: `${12 + depth * 20}px` }}
      >
        {depth === 0 ? (
          <GripVertical className="w-3.5 h-3.5 text-muted-foreground/40 group-hover:text-muted-foreground shrink-0 cursor-grab" strokeWidth={1.5} />
        ) : (
          <ChevronRight className="w-3 h-3 text-muted-foreground/40 shrink-0" strokeWidth={1.5} />
        )}
        <div className="flex-1 min-w-0">
          <span className={`text-foreground ${depth === 0 ? "font-medium" : ""}`} style={{ fontSize: depth === 0 ? "13px" : "12px" }}>
            {item.label}
          </span>
        </div>
        <span className="text-muted-foreground font-mono truncate" style={{ fontSize: "11px" }}>{item.link}</span>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity ml-1">
          <button className="p-1 rounded hover:bg-[var(--accent)] transition-colors text-muted-foreground hover:text-foreground">
            <Pencil className="w-3 h-3" strokeWidth={1.5} />
          </button>
          <button className="p-1 rounded hover:bg-red-50 transition-colors text-muted-foreground hover:text-red-600">
            <Trash2 className="w-3 h-3" strokeWidth={1.5} />
          </button>
        </div>
      </div>
      {item.children?.map((child) => (
        <MenuItemRow key={child.label} item={child} depth={depth + 1} />
      ))}
    </div>
  )
}

function MenuCard({ title, items, description }: { title: string; items: MenuItem[]; description: string }) {
  return (
    <div className="bg-white rounded-xl border border-border/50">
      <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid var(--accent)" }}>
        <div>
          <p className="font-semibold text-foreground" style={{ fontSize: "14px" }}>{title}</p>
          <p className="text-muted-foreground" style={{ fontSize: "12px" }}>{description}</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-dashed border-border text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
            style={{ fontSize: "12px" }}
          >
            <Plus className="w-3 h-3" strokeWidth={1.5} />
            Add Item
          </button>
        </div>
      </div>
      <div className="p-3">
        {items.map((item) => (
          <MenuItemRow key={item.label} item={item} />
        ))}
      </div>
    </div>
  )
}

export default function NavigationPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Navigation Menus"
        description="Manage site navigation structure and menu items"
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Content" }, { label: "Navigation" }]}
        actions={
          <div className="flex items-center gap-2">
            <a
              href="/"
              target="_blank"
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border/60 bg-white text-muted-foreground hover:text-foreground transition-colors"
              style={{ fontSize: "13px" }}
            >
              <ExternalLink className="w-4 h-4" strokeWidth={1.5} />
              Preview Site
            </a>
            <button
              className="px-4 py-2 rounded-lg text-white hover:opacity-90 transition-opacity"
              style={{ backgroundColor: "var(--primary)", fontSize: "13px" }}
            >
              Save Changes
            </button>
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MenuCard
          title="Main Navigation"
          description="Primary nav bar shown to all visitors"
          items={mainMenu}
        />
        <MenuCard
          title="Footer Menu"
          description="Links shown in the site footer"
          items={footerMenu}
        />
      </div>

      <div className="bg-white rounded-xl border border-border/50 p-5">
        <p className="font-medium text-foreground mb-2" style={{ fontSize: "13px" }}>Navigation Tips</p>
        <ul className="space-y-1">
          {[
            "Drag items by the grip handle to reorder",
            "Nest items under a parent to create dropdown menus",
            "Use # as the link for group headings with no direct destination",
            "Changes are saved automatically and published on 'Save Changes'",
          ].map((tip) => (
            <li key={tip} className="flex items-start gap-2">
              <span style={{ color: "var(--primary)", fontSize: "13px" }}>•</span>
              <span className="text-muted-foreground" style={{ fontSize: "12px" }}>{tip}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
