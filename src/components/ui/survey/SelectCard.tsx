// src/components/ui/SelectCard.tsx
import Image from "next/image"
import { twMerge } from "tailwind-merge"

type Props = {
  label: string
  iconSrc: string
  selected?: boolean
  onClick?: () => void
  className?: string
}

export default function SelectCard({
  label, iconSrc, selected, onClick, className,
}: Props) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={!!selected}
      onClick={onClick}
      className={twMerge(
        "w-[108px] h-[110px] rounded-2xl border transition",
        "flex flex-col items-center justify-center gap-2 px-3",
        "focus:outline-none focus:ring-2",
        selected
          ? "bg-[var(--color-secondary)]" // dipilih → hijau muda
          : "bg-white hover:bg-[color:var(--color-secondary)]/60",
        className
      )}
      // pastikan garis border selalu hijau primary
      style={{ borderColor: "var(--color-primary)" }}
    >
      <Image src={iconSrc} alt="" width={22} height={22} />
      <span className="text-sm font-medium">{label}</span>
    </button>
  )
}
