"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import SummaryCard from "@/components/ui/summary/SummaryCard"
import Button from "@/components/ui/Button"

const K = {
  transport: "survey.transport.kg",
  energy: "survey.energy.kg",
  lifestyle: "survey.waste.kg",
  profileName: "profile.name",
  summary: "summary:last",
  onboardingDone: "onboarding:done",
} as const

function readNumber(key: string, fallback = 0) {
  if (typeof window === "undefined") return fallback
  const v = window.localStorage.getItem(key)
  const n = v ? Number(v) : NaN
  return Number.isFinite(n) ? n : fallback
}

export default function HasilPage() {
  const router = useRouter()

  const [transportKg, setTransportKg] = useState(0)
  const [energyKg, setEnergyKg] = useState(0)
  const [lifestyleKg, setLifestyleKg] = useState(0)
  const [name, setName] = useState("John Doe")

  useEffect(() => {
    setTransportKg(readNumber(K.transport, 60))
    setEnergyKg(readNumber(K.energy, 80))
    setLifestyleKg(readNumber(K.lifestyle, 15))
    const nm = (typeof window !== "undefined" && localStorage.getItem(K.profileName)) || ""
    if (nm) setName(nm)
  }, [])

  const totalKg = useMemo(
    () => transportKg + energyKg + lifestyleKg,
    [transportKg, energyKg, lifestyleKg]
  )

  const trees = Math.max(1, Math.round(totalKg / 5))
  const equivalencyText = `Jumlah ini setara dengan menebang ${trees} pohon setiap bulan`

  function handleStart() {
    // simpan ringkasan terakhir & tandai onboarding selesai
    localStorage.setItem(
      K.summary,
      JSON.stringify({ totalKg, transportKg, energyKg, lifestyleKg, trees, at: Date.now() })
    )
    localStorage.setItem(K.onboardingDone, "true")
    // arahkan ke beranda aplikasi
    router.replace("/app")
  }

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
          Angka ini bukanlah rapor, melainkan titik start di petamu. Setiap aksi kecil adalah
          langkah baru dalam petualangan hijau mu.
        </p>
      </div>

      <div className="fixed inset-x-0 bottom-4 px-4 z-50">
        <div className="mx-auto max-w-sm">
          <Button type="button" size="md" className="w-full sm:h-10 shadow-lg" onClick={handleStart}>
            Mulai
          </Button>
        </div>
      </div>
    </main>
  )
}
