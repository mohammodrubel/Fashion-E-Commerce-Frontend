import { cn } from "@/lib/utils"

interface PasswordStrengthProps {
  password: string
}

function getStrength(password: string): 0 | 1 | 2 | 3 {
  if (!password) return 0
  let score = 0
  if (password.length >= 6) score++
  if (password.length >= 10 && /[A-Z]/.test(password)) score++
  if (/\d/.test(password) || /[^A-Za-z0-9]/.test(password)) score++
  return Math.min(score, 3) as 0 | 1 | 2 | 3
}

const labels: Record<1 | 2 | 3, string> = {
  1: "Weak",
  2: "Fair",
  3: "Strong",
}

const barColors: Record<1 | 2 | 3, string> = {
  1: "bg-destructive",
  2: "bg-amber-500",
  3: "bg-emerald-600",
}

export function PasswordStrength({ password }: PasswordStrengthProps) {
  const strength = getStrength(password)

  if (!password) return null

  return (
    <div className="space-y-1.5 pt-0.5">
      <div className="flex gap-1">
        {([1, 2, 3] as const).map((level) => (
          <div
            key={level}
            className={cn(
              "flex-1 h-px transition-colors duration-300",
              strength >= level ? barColors[strength as 1 | 2 | 3] : "bg-border"
            )}
          />
        ))}
      </div>
      <p
        className={cn(
          "transition-colors duration-300",
          strength === 1 && "text-destructive",
          strength === 2 && "text-amber-600 dark:text-amber-400",
          strength === 3 && "text-emerald-700 dark:text-emerald-400"
        )}
        style={{ fontSize: "10px", letterSpacing: "0.1em" }}
      >
        {labels[strength as 1 | 2 | 3] ?? ""}
      </p>
    </div>
  )
}
