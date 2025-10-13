import { twMerge } from "tailwind-merge"

export default function SelectPill({
  label,
  selected,
  onClick,
  className,
}: {
  label: string
  selected?: boolean
  onClick?: () => void
  className?: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      role="radio"
      aria-checked={!!selected}
      className={twMerge(
        "h-10 rounded-xl border px-4 text-sm font-medium transition",
        "focus:outline-none focus:ring-2 focus:ring-[color:var(--color-primary)]/30",
        selected
          ? "bg-[color:var(--color-secondary)]"
          : "bg-white hover:bg-[color:var(--color-secondary)]/60",
        className
      )}
      // pastikan border selalu hijau primary
      style={{ borderColor: "var(--color-primary)" }}
    >
      {label}
    </button>
  )
}
