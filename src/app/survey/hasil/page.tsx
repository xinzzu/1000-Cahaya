"use client"

import { useEffect, useMemo, useState } from "react"
import SummaryCard from "@/components/ui/summary/SummaryCard"
import Button from "@/components/ui/Button"

// Util baca penyimpanan sederhana
function readNumber(key: string, fallback = 0) {
  if (typeof window === "undefined") return fallback
  const v = window.localStorage.getItem(key)
  const n = v ? Number(v) : NaN
  return Number.isFinite(n) ? n : fallback
}

export default function HasilPage() {
  // Ambil nilai dari localStorage (gampang diintegrasikan dari step-step sebelumnya)
  const [transportKg, setTransportKg] = useState(0)
  const [energyKg, setEnergyKg]       = useState(0)
  const [lifestyleKg, setLifestyleKg] = useState(0)
  const [name, setName]               = useState("Jhon Doe")

  useEffect(() => {
    // TODO: sesuaikan key sesuai implementasi submit di tiap step
    setTransportKg(readNumber("survey.transport.kg", 60))
    setEnergyKg(readNumber("survey.energy.kg", 80))
    setLifestyleKg(readNumber("survey.waste.kg", 15))
    const nm = typeof window !== "undefined" ? window.localStorage.getItem("profile.name") : null
    if (nm) setName(nm)
  }, [])

  const totalKg = useMemo(() => transportKg + energyKg + lifestyleKg, [transportKg, energyKg, lifestyleKg])

  // contoh ekuivalensi (bebas kamu ganti rumusnya)
  // misal 1 pohon "setara" 5 kg/bulan → total/5 ≈ jumlah pohon
  const trees = Math.max(1, Math.round(totalKg / 5))
  const equivalencyText = `Jumlah ini setara dengan menebang ${trees} pohon setiap bulan`

  return (
    <main className="min-h-dvh bg-white text-black">
      <div className="mx-auto max-w-sm px-4 pb-28 pt-6">
        <SummaryCard
          name={name}
          totalKg={totalKg}
          transportKg={transportKg}
          energyKg={energyKg}
          lifestyleKg={lifestyleKg}
          equivalencyText={equivalencyText}
        />

        <p className="mt-6 text-center text-sm text-black/70">
          Angka ini bukanlah rapor, melainkan titik start di petamu. Setiap aksi
          kecil adalah langkah baru dalam petualangan hijau mu.
        </p>
      </div>

      <div className="fixed inset-x-0 bottom-4 px-4 z-50">
        <div className="mx-auto max-w-sm">
          <Button type="button" size="md" className="w-full sm:h-10 shadow-lg">
            Mulai
          </Button>
        </div>
      </div>
    </main>
  )
}
