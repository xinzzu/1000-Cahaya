import { ComponentPropsWithoutRef } from "react"


// src/components/ui/Button.tsx
// src/components/ui/Button.tsx
type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  variant?: "primary" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
  fullWidth?: boolean
}

export default function Button({
  variant = "primary",
  size = "md",
  fullWidth,
  className,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-xl text-sm font-medium transition focus:outline-none focus:ring-2 disabled:opacity-50 disabled:pointer-events-none"
  const variants = {
    primary: "bg-[#22C55E] text-white hover:opacity-95 focus:ring-[#22C55E]/40",
    outline: "border border-black/15 bg-white text-black hover:bg-black/[0.03] focus:ring-black/15",
    ghost: "text-black hover:bg-black/[0.04] focus:ring-black/15",
  }
  const sizes = {
    // Tambahkan padding horizontal (px-...) di sini
    sm: "h-10 px-4",  // Tinggi 40px, padding kiri-kanan 16px
    md: "h-11 px-5",  // Tinggi 44px, padding kiri-kanan 20px (px-5 adalah 1.25rem/20px)
    lg: "h-12 px-6",  // Tinggi 48px, padding kiri-kanan 24px (disarankan PWA/mobile)
  }
  const width = fullWidth ? "w-full" : ""
  return <button className={[base, variants[variant], sizes[size], width, className].join(" ")} {...props} />
}