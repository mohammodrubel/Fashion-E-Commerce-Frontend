import { Skeleton } from "@/components/ui/skeleton"

/**
 * Plain `<tr>`/`<td>` skeleton rows for the hand-rolled `<table>` markup used
 * across the admin dashboard's list pages (not the shadcn Table component).
 */
export function TableSkeletonRows({ rows = 5, columns }: { rows?: number; columns: number }) {
  return (
    <>
      {Array.from({ length: rows }).map((_, r) => (
        <tr key={r} style={{ borderBottom: r < rows - 1 ? "1px solid var(--accent)" : "none" }}>
          {Array.from({ length: columns }).map((_, c) => (
            <td key={c} className="px-5 py-3.5">
              <Skeleton className="h-4 w-full max-w-32" />
            </td>
          ))}
        </tr>
      ))}
    </>
  )
}
