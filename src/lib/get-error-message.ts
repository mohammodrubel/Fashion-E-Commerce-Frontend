export function getErrorMessage(err: unknown, fallback: string): string {
  if (
    typeof err === "object" &&
    err !== null &&
    "data" in err &&
    typeof (err as { data?: unknown }).data === "object" &&
    (err as { data?: { message?: unknown } }).data !== null
  ) {
    const message = (err as { data?: { message?: unknown } }).data?.message
    if (typeof message === "string") return message
  }
  return fallback
}
