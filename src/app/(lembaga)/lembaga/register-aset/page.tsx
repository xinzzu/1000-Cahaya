"use client";

import { useEffect, useMemo, useState } from "react";
import { nanoid } from "nanoid";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Pastikan ini diimpor
import Button from "@/components/ui/Button";
import SuccessDialog from "@/components/ui/SuccessDialog";

import AssetSection from "@/components/lembaga/registrasi/AssetSection";
import EmptyState from "@/components/lembaga/registrasi/EmptyState";
import AssetItem from "@/components/lembaga/registrasi/AssetItem";
import BuildingForm from "@/components/lembaga/registrasi/BuildingForm";
import VehicleForm from "@/components/lembaga/registrasi/VehicleForm";

import {
  loadAssets, addBuilding, removeBuilding,
  addVehicle, removeVehicle
} from "@/components/lembaga/registrasi/storage";

import type { Building, Vehicle, VehicleType, FuelType, OrgAssets } from "@/components/lembaga/registrasi/types";

const initialAssets: OrgAssets = { buildings: [], vehicles: [] };

export default function OrgAssetsPage() {
  const router = useRouter(); // Inisialisasi router
  const [showBuildForm, setShowBuildForm] = useState(false);
  const [showVehicleForm, setShowVehicleForm] = useState(false);
  const [data, setData] = useState<OrgAssets>(initialAssets);
  const [ok, setOk] = useState(false);

  useEffect(() => { setData(loadAssets()); }, []);

  const canSubmit = useMemo(
    () => data.buildings.length + data.vehicles.length > 0,
    [data]
  );

  function saveBuilding(name: string, area?: number) {
    const b: Building = { id: nanoid(), name, area };
    addBuilding(b);
    setData(loadAssets());
    setShowBuildForm(false);
  }
  function saveVehicle(name: string, vt?: string, ft?: string) {
    const v: Vehicle = { id: nanoid(), name, vehicleType: vt as VehicleType, fuelType: ft as FuelType };
    addVehicle(v);
    setData(loadAssets());
    setShowVehicleForm(false);
  }

  // ✅ Fungsi untuk menangani penutupan dialog dan navigasi
  function handleSuccessAndNavigate() {
    setOk(false); // Tutup dialog
    router.push('/lembaga/dashboard'); // Arahkan ke homepage lembaga
  }

  return (
    <>
      {/* header */}
      <header className="text-center">
        <h1 className="text-xl font-semibold">Daftarkan Aset</h1>
        <p className="text-sm text-black/60">Pendaftaran aset untuk lembaga Anda</p>
      </header>

      <div className="mt-3 h-[2px] w-full" style={{ backgroundColor: "var(--color-primary)" }} />

      {/* Section Bangunan */}
      <div className="mt-4 space-y-3">
        <AssetSection
          icon="/icons/lembaga/registrasi/ic-building.svg"
          title="Daftar Bangunan Anda"
          subtitle="Tambahkan bangunan yang dimiliki"
          onAdd={() => setShowBuildForm(true)}
        >
          {showBuildForm && (
            <BuildingForm onSave={saveBuilding} onCancel={() => setShowBuildForm(false)} />
          )}

          {data.buildings.length === 0 ? (
            <EmptyState icon="/icons/lembaga/registrasi/empty-building.svg" text="Belum ada bangunan terdaftar" />
          ) : (
            <div className="space-y-2">
              <div className="text-sm font-semibold text-black/70">Bangunan Terdaftar</div>
              {data.buildings.map(b => (
                <AssetItem
                  key={b.id}
                  title={b.name}
                  subtitle={b.area ? `Luas: ${b.area} m²` : undefined}
                  onDelete={() => { removeBuilding(b.id); setData(loadAssets()); }}
                />
              ))}
            </div>
          )}
        </AssetSection>

        {/* Section Kendaraan */}
        <AssetSection
          icon="/icons/lembaga/registrasi/ic-vehicle.svg"
          title="Daftar Kendaraan Operasional"
          subtitle="Tambahkan kendaraan yang dimiliki"
          onAdd={() => setShowVehicleForm(true)}
        >
          {showVehicleForm && (
            <VehicleForm onSave={saveVehicle} onCancel={() => setShowVehicleForm(false)} />
          )}

          {data.vehicles.length === 0 ? (
            <EmptyState icon="/icons/lembaga/registrasi/empty-vehicle.svg" text="Belum ada kendaraan terdaftar" />
          ) : (
            <div className="space-y-2">
              <div className="text-sm font-semibold text-black/70">Kendaraan Terdaftar</div>
              {data.vehicles.map(v => (
                <AssetItem
                  key={v.id}
                  title={v.name}
                  subtitle={[
                    v.vehicleType,
                    v.fuelType ? `• ${v.fuelType}` : undefined,
                  ].filter(Boolean).join(" ")}
                  onDelete={() => { removeVehicle(v.id); setData(loadAssets()); }}
                />
              ))}
            </div>
          )}
        </AssetSection>
      </div>

      {/* CTA bawah */}
      <div className="mt-6">
        <Button className="w-full" disabled={!canSubmit} onClick={() => setOk(true)}>
          Simpan
        </Button>
      </div>

      <SuccessDialog
        open={ok}
        // ✅ Hubungkan onClose dengan fungsi navigasi yang baru
        onClose={handleSuccessAndNavigate}
        message="Aset lembaga berhasil disimpan!"
      />
    </>
  );
}