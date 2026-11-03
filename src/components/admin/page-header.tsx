import Link from "next/link"
import { ChevronRight } from "lucide-react"

interface Breadcrumb {
  label: string
  href?: string
}

interface PageHeaderProps {
  title: string
  description?: string
  breadcrumbs?: Breadcrumb[]
  actions?: React.ReactNode
}

export function PageHeader({ title, description, breadcrumbs, actions }: PageHeaderProps) {
  return (
    <div className="flex items-start justify-between gap-4 mb-6">
      <div>
        {breadcrumbs && breadcrumbs.length > 0 && (
          <div className="flex items-center gap-1.5 mb-1.5">
            {breadcrumbs.map((crumb, i) => (
              <div key={i} className="flex items-center gap-1.5">
                {i > 0 && <ChevronRight className="w-3 h-3 text-muted-foreground/50" strokeWidth={1.5} />}
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.08em" }}
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span
                    className="text-muted-foreground/60"
                    style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.08em" }}
                  >
                    {crumb.label}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
        <h1 className="text-admin-page-heading text-foreground">
          {title}
        </h1>
        {description && (
          <p className="text-muted-foreground mt-0.5" style={{ fontSize: "13px" }}>
            {description}
          </p>
        )}
      </div>
      {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
    </div>
  )
}
