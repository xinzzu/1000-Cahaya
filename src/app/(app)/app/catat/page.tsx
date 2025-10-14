"use client"

import Image from "next/image"
import Button from "@/components/ui/Button"

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
  const total = saved.reduce((a, b) => a + b.value, 0)

  return (
    <main className="pb-24">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-xl font-semibold">Catat Aktivitas</h1>
        <p className="text-sm text-black/60">Hitung jejak karbon bulanan Anda</p>
      </div>

      {/* Divider primary pendek (sesuai lebar PWA) */}
      <div
        className="mt-3 h-[2px] w-full"
        style={{ backgroundColor: "var(--color-primary)" }}
      />

      {/* Pilih Kategori */}
      <h2 className="mt-5 text-base font-semibold">Pilih Kategori</h2>
      <div className="mt-3 space-y-3">
        {categories.map((c) => (
          <a
            key={c.title}
            href={c.href}
            className="flex items-center gap-3 rounded-2xl border p-3"
            style={{ borderColor: "var(--color-primary)" }}
          >
            <div className="grid h-14 w-14 place-items-center rounded-xl bg-[color:var(--color-secondary)]">
              <Image src={c.icon} alt="" width={32} height={32} />
            </div>
            <div className="flex-1">
              <div className="font-medium">{c.title}</div>
              <div className="text-sm text-black/60">{c.subtitle}</div>
            </div>
            {/* chevron kanan */}
            <Image src="/icons/chevron-right.svg" alt="" width={6.32} height={11.31} />
          </a>
        ))}
      </div>

      {/* Aktivitas tersimpan */}
      <div className="mt-6 flex items-center gap-2">
        <Image src="/images/catat/pencil-bolt.png" alt="" width={30} height={30 } />
        <h3 className="text-base font-semibold">Aktivitas Tersimpan Bulan ini</h3>
      </div>

      <div className="mt-2 divide-y">
        {saved.map((s) => (
          <div key={s.title} className="flex items-start gap-3 py-3">
            <Image src={s.icon} alt="" width={22} height={22} />
            <div className="flex-1">
              <div className="text-[15px]">{s.title}</div>
              <div className="text-sm text-black/60">{s.sub}</div>
            </div>
            <div className="text-right">
              <div className="text-[15px] font-semibold">{s.value}</div>
              <div className="text-xs text-black/60">{s.unitRight}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Hasil Perhitungan */}
      <h3 className="mt-5 text-center text-base font-semibold">Hasil Perhitungan</h3>
      <div
        className="mt-3 rounded-2xl border p-4 text-center"
        style={{ borderColor: "var(--color-primary)" }}
      >
        <div className="text-5xl font-semibold text-[color:var(--color-primary)]">
          {total}
        </div>
        <div className="text-sm">kg CO₂e bulan ini</div>
      </div>

      {/* CTA Riwayat */}
      <div className="mt-4">
        <Button size="md" className="w-full sm:h-10">
          Lihat Riwayat Jejak Karbon Anda
        </Button>
      </div>
    </main>
  )
}
