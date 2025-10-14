"use client";

import Link from "next/link";
import Image from "next/image";
import VehicleCard from "@/components/catat/transport/Transportasi";
import Button from "@/components/ui/Button";

const VEHICLES = [
  {
    key: "mobil",
    icon: "/images/transport/car.png",
    title: "Mobil",
    subtitle: "Perjalanan dengan mobil",
  },
  {
    key: "motor",
    icon: "/images/transport/motorcycle.png",
    title: "Motor",
    subtitle: "Perjalanan dengan motor",
  },
  {
    key: "bus",
    icon: "/images/transport/bus.png",
    title: "Bus",
    subtitle: "Perjalanan dengan bus",
  },
  {
    key: "pesawat",
    icon: "/images/transport/plane.png",
    title: "Pesawat",
    subtitle: "Perjalanan dengan pesawat",
  },
  {
    key: "kereta",
    icon: "/images/transport/train.png",
    title: "Kereta",
    subtitle: "Perjalanan dengan kereta",
  },
];

export default function TransportIndexPage() {
  return (
    <main className="mx-auto max-w-sm px-4 pt-4 pb-[88px]">
      {/* Top bar + back */}
      <div className="flex items-center gap-3">
        <Link
          href="/app/catat"
          aria-label="Kembali"
          className="grid h-9 w-9 place-items-center rounded-full hover:bg-black/[0.05]"
        >
          <Image src="/arrow-left.svg" alt="" width={20} height={20} />
        </Link>
        <h1 className="flex-1 text-center text-base font-semibold">
          Aktivitas Perjalanan
        </h1>
        <div className="h-9 w-9" /> {/* spacer kanan */}
      </div>

      {/* divider primary pendek */}
      <div className="mt-3 h-[2px] w-full" style={{ backgroundColor: "var(--color-primary)" }} />

      <p className="mt-4 text-sm font-medium">
        Pilih Kendaraan yang kamu gunakan
      </p>

      <div className="mt-3 space-y-3">
        {VEHICLES.map((v) => (
          <VehicleCard
            key={v.key}
            icon={v.icon}
            title={v.title}
            subtitle={v.subtitle}
            href={`/app/catat/transportasi/${v.key}`} // siapkan halaman detail nanti
          />
        ))}
      </div>

      {/* bottom action (disable dulu) */}
      <div className="fixed inset-x-0 bottom-4 px-4">
        <div className="mx-auto max-w-sm">
          <Button size="md" className="w-full sm:h-10" disabled>
            Simpan Data
          </Button>
        </div>
      </div>
    </main>
  );
}
