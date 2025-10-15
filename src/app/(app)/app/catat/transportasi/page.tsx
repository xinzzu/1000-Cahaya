"use client";

import { useEffect, useMemo, useState } from "react";
import Button from "@/components/ui/Button";
import TransportItem from "@/components/catat/transportasi/TransportItem";
import TransportModal from "@/components/catat/transportasi/TransportModal";
import { loadTransport, saveTransport, clearTransport } from "@/components/catat/transportasi/storage";
import { TransportEntry, VehicleType } from "@/components/catat/transportasi/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import SuccessDialog from "@/components/ui/SuccessDialog";

// Daftar kendaraan
const VEHICLES: Array<{ type: VehicleType; icon: string; subtitle: string }> = [
  { type: "mobil",   icon: "/images/catat/transport/car.png",    subtitle: "Perjalanan dengan mobil" },
  { type: "motor",   icon: "/images/catat/transport/motorcycle.png",  subtitle: "Perjalanan dengan motor" },
  { type: "bus",     icon: "/images/catat/transport/bus.png",    subtitle: "Perjalanan dengan bus" },
  { type: "pesawat", icon: "/images/catat/transport/plane.png",  subtitle: "Perjalanan dengan pesawat" },
  { type: "kereta",  icon: "/images/catat/transport/train.png",  subtitle: "Perjalanan dengan kereta" },
];

export default function TransportasiPage() {
  const router = useRouter();
  const [data, setData] = useState<Partial<Record<VehicleType, TransportEntry>>>({});
  const [openType, setOpenType] = useState<VehicleType | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    setData(loadTransport());
  }, []);

  const filledCount = useMemo(
    () => Object.values(data).filter(Boolean).length,
    [data]
  );

  function handleSave(entry: TransportEntry) {
    saveTransport(entry);
    setData(loadTransport());
  }

  function handleClear() {
    clearTransport();
    setData({});
    console.log("Data transportasi dihapus");
  }
  
  function handleSuccessDialogClose() {
    setShowSuccess(false);
    router.push('/app/catat');
  }

  return (
    <>
      {/* header */}
      <header className="mb-3 flex items-center gap-2">
        <button onClick={() => router.back()} aria-label="Kembali" className="h-9 w-9 grid place-items-center">
          <Image src="/arrow-left.svg" alt="" width={18} height={18} />
        </button>
        <h1 className="flex-1 text-center text-lg font-semibold">
          Aktivitas Perjalanan
        </h1>
        <div className="h-9 w-9" />
      </header>

      <div
        className="mb-4 h-[2px] w-full"
        style={{ backgroundColor: "var(--color-primary)" }}
      />

      <p className="text-sm">Pilih Kendaraan yang kamu gunakan</p>

      <div className="mt-3">
        {VEHICLES.map((v) => (
          <TransportItem
            key={v.type}
            type={v.type}
            icon={v.icon}
            subtitle={v.subtitle}
            value={data[v.type]}
            onClick={() => setOpenType(v.type)}
          />
        ))}
      </div>

      <div className="mt-4 space-y-2">
        <Button
          className="w-full"
          disabled={filledCount === 0}
          onClick={() => setShowSuccess(true)}
        >
          Simpan Data
        </Button>
        <Button
          variant="outline"
          className="w-full"
          onClick={handleClear}
        >
          Hapus Data (Dev)
        </Button>
      </div>
      
      <SuccessDialog
        open={showSuccess}
        onClose={handleSuccessDialogClose}
        message="Data aktivitas perjalanan berhasil disimpan!"
      />

      {/* Modal */}
      {openType && (
        <TransportModal
          open={!!openType}
          type={openType}
          initial={data[openType]}
          onClose={() => setOpenType(null)}
          onSave={handleSave}
        />
      )}
    </>
  );
}