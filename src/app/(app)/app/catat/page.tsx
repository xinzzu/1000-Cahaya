"use client"

import Image from "next/image"
import Button from "@/components/ui/Button"
import ActivityHeader from "@/components/individu/catat/ActivityHeader"
import CategoryCard from "@/components/individu/catat/CategoryCard"
import SavedActivityItem from "@/components/individu/catat/SavedActivityItem"
import CalculationResult from "@/components/individu/catat/CalculationResult"

// ✅ 1. Definisikan tipe data untuk kategori dan item tersimpan
type Category = {
  icon: string
  title: string
  subtitle: string
  href: string
}

type SavedItem = {
  icon: string
  title: string
  sub: string
  value: number
  unitRight: string
}

// ✅ 2. Pindahkan kembali data dummy ke file ini
const categories: Category[] = [
  {
    icon: "/images/catat/transport.png",
    title: "Transportasi",
    subtitle: "Perjalanan harian Anda",
    href: "/app/catat/transportasi",
  },
  {
    icon: "/images/catat/energy.png",
    title: "Penggunaan Listrik",
    subtitle: "Aktivitas konsumsi energi",
    href: "/app/catat/energi",
  },
  {
    icon: "/images/catat/plastic.png",
    title: "Limbah Plastik",
    subtitle: "Penggunaan plastik",
    href: "/app/catat/plastik",
  },
]

const saved: SavedItem[] = [
  {
    icon: "/images/catat/car.png",
    title: "Perjalanan naik mobil 15 kali",
    sub: "total 150 km",
    value: 55,
    unitRight: "kg CO₂e",
  },
  {
    icon: "/images/catat/plug.png",
    title: "Penggunaan Listrik",
    sub: "220 kWh",
    value: 60,
    unitRight: "kg CO₂e",
  },
  {
    icon: "/images/catat/leaf.png",
    title: "Sampah Organik",
    sub: "total 60 kg",
    value: 30,
    unitRight: "kg CO₂e",
  },
]

export default function CatatPage() {
  // ✅ 3. Beri tipe pada parameter 'a' dan 'b'
  const total = saved.reduce((a: number, b: SavedItem) => a + b.value, 0)

  return (
    <main>
      <ActivityHeader />

      {/* Pilih Kategori */}
      <h2 className="mt-5 text-base font-semibold">Pilih Kategori</h2>
      <div className="mt-3 space-y-3">
        {/* ✅ 4. Beri tipe pada parameter 'c' */}
        {categories.map((c: Category) => (
          <CategoryCard
            key={c.title}
            icon={c.icon}
            title={c.title}
            subtitle={c.subtitle}
            href={c.href}
          />
        ))}
      </div>

      {/* Aktivitas tersimpan */}
      <div className="mt-6 flex items-center gap-2">
        <Image src="/images/catat/pencil-bolt.png" alt="" width={30} height={30} />
        <h3 className="text-base font-semibold">Aktivitas Tersimpan Bulan ini</h3>
      </div>

      <div className="mt-2">
        {/* ✅ 5. Beri tipe pada parameter 's' dan 'i' */}
        {saved.map((s: SavedItem, i: number) => (
          <SavedActivityItem
            key={s.title}
            icon={s.icon} 
            title={s.title}
            sub={s.sub}
            value={s.value}
            unitRight={s.unitRight}
            isLastItem={i === saved.length - 1}
          />
        ))}
      </div>
      
      <CalculationResult total={total} />

      <div className="mt-4">
        <Button size="md" className="w-full sm:h-10">
          Lihat Riwayat Jejak Karbon Anda
        </Button>
      </div>
    </main>
  )
}