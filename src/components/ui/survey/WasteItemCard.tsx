// src/components/survey/WasteItemCard.tsx
"use client"

import Image from "next/image"
import { useState } from "react"
import TextField from "@/components/ui/TextField"
import { twMerge } from "tailwind-merge"

const digitsOnly = (v: string) => v.replace(/[^\d]/g, "")
const stripLeadingZeros = (v: string) => v.replace(/^0+(?=\d)/, "")

type Props = {
  iconSrc: string
  title: string
  subtitle: string
  value: string
  onChange: (next: string) => void
}

export default function WasteItemCard({
  iconSrc, title, subtitle, value, onChange,
}: Props) {
  const [focused, setFocused] = useState(false)

  // aktif kalau ada fokus ATAU nilainya > 0
  const active = focused || Number(value) > 0

  return (
    <div
      className="rounded-2xl border p-4 flex gap-4 items-start"
      // ⟵ border kartu: default #D9D9D9, aktif -> primary
      style={{ borderColor: active ? "var(--color-primary)" : "#D9D9D9" }}
    >
      <div className="h-14 w-14 rounded-xl grid place-items-center bg-[color:var(--color-secondary)] shrink-0">
        <Image src={iconSrc} alt="" width={32} height={32} />
      </div>

      <div className="flex-1 min-w-0">
        <div className="font-semibold">{title}</div>
        <div className="text-sm text-black/70">{subtitle}</div>

        <div className="mt-3 flex items-center gap-2">
          <TextField
            type="text"
            inputMode="numeric"
            value={value}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onChange={(e) => {
              const raw = stripLeadingZeros(digitsOnly(e.target.value))
              onChange(raw === "" ? "0" : raw)
            }}
            placeholder="0"
            fieldSize="lg"
            className={twMerge(
              "w-full",
              // ⟵ border input: default #D9D9D9, aktif -> primary
              active
                ? "border-[color:var(--color-primary)] focus-within:ring-[color:var(--color-primary)]/30"
                : "border-[#D9D9D9] focus-within:ring-[color:var(--color-primary)]/30"
            )}
          />
          <span className="text-sm">kg</span>
        </div>
      </div>
    </div>
  )
}
