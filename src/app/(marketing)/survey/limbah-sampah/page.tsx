"use client"

import { useMemo, useState } from "react"
import Button from "@/components/ui/Button"
import ProgressBar from "@/components/ui/survey/ProgressBar"
import WasteItemCard from "@/components/ui/survey/WasteItemCard"
import {useRouter} from "next/navigation"

export default function LimbahSampahPage() {
  const [organic, setOrganic] = useState("0")
  const [anorganic, setAnorganic] = useState("0")
  const [hazard, setHazard] = useState("0") // B3
  const router = useRouter()
  const canFinish = useMemo(() => {
    return [organic, anorganic, hazard].some(v => Number(v) > 0)
  }, [organic, anorganic, hazard])

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!canFinish) return;
    // TODO: kirim payload
    // { organic: +organic, anorganic: +anorganic, hazard: +hazard }
    // lalu ke ringkasan/hasil
    router.push("/survey/hasil");
  }

  return (
    <main className="min-h-dvh bg-white text-black">
      <ProgressBar total={3} active={2} />

      <form onSubmit={onSubmit} className="mx-auto max-w-sm px-4 pb-28 pt-4">
        <div className="flex items-center justify-between">
          <div className="h-8 w-8" />
          <h1 className="flex-1 text-center text-xl font-semibold">
            Limbah/Sampah ♻️
          </h1>
          <div className="h-8 w-8" />
        </div>

        <p className="mt-6 text-sm font-medium">
          Berapa banyak produksi sampah yang anda hasilkan dalam satu hari?
        </p>

        <div className="mt-4 space-y-4">
          <WasteItemCard
            iconSrc="/waste-organic.png"
            title="Sampah Organik"
            subtitle="Sampah yang berasal dari bahan alami"
            value={organic}
            onChange={setOrganic}
          />
          <WasteItemCard
            iconSrc="/waste-anorganic.png"
            title="Sampah Anorganik"
            subtitle="Sampah yang sulit terurai"
            value={anorganic}
            onChange={setAnorganic}
          />
          <WasteItemCard
            iconSrc="/waste-b3.png"
            title="Sampah B3"
            subtitle="Sampah yang mengandung bahan berbahaya dan beracun"
            value={hazard}
            onChange={setHazard}
          />
        </div>

        {/* CTA bawah selaras konten */}
        <div className="fixed inset-x-0 bottom-4 px-4 z-50">
          <div className="mx-auto max-w-sm">
            <Button type="submit" size="md" className="w-full sm:h-10 shadow-lg" disabled={!canFinish}>
              Selesai & Lihat hasilnya!
            </Button>
          </div>
        </div>
      </form>
    </main>
  )
}
