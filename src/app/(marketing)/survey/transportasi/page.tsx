"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import TextField from "@/components/ui/TextField";
import SelectCard from "@/components/ui/survey/SelectCard";
import SelectPill from "@/components/ui/survey/SelectPill";
import ProgressBar from "@/components/ui/survey/ProgressBar";

type Vehicle = "mobil" | "motor" | "bus";
type Fuel = "bensin" | "solar" | "listrik";

export default function TransportasiIndividuPage() {
  const router = useRouter();
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [distance, setDistance] = useState<string>("0");
  const [fuel, setFuel] = useState<Fuel | null>(null);
  const onlyDigits = (v: string) => v.replace(/[^\d]/g, "");
  const stripLeadingZeros = (v: string) => v.replace(/^0+(?=\d)/, "");
  const canNext = useMemo(() => {
    const d = Number(distance);
    return !!vehicle && !!fuel && Number.isFinite(d) && d > 0;
  }, [vehicle, fuel, distance]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canNext) return;
    // TODO: kirim/commit ke store atau server
    // example payload:
    // { vehicle, fuel, distance: Number(distance) }
    router.push("/survey/energi-listrik"); // ganti ke screen berikutnya kalau sudah ada
  }

  return (
    <main className="min-h-dvh bg-white text-black">
      <ProgressBar total={3} active={0} />

      <form onSubmit={onSubmit} className="mx-auto max-w-sm px-4 pb-28 pt-4">
        {/* header */}
        <div className="flex items-center justify-between">
          <div className="h-8 w-8" />
          <h1 className="flex-1 text-center text-xl font-semibold">
            Transportasi 🚗
          </h1>
          <div className="h-8 w-8" />
        </div>

        {/* Q1 */}
        <p className="mt-6 text-sm font-medium">
          Kendaraan apa yang paling sering kamu gunakan untuk bekerja atau
          beraktivitas?
        </p>
        <div
          className="mt-3 grid grid-cols-3 gap-8"
          role="radiogroup"
          aria-label="Jenis kendaraan"
        >
          <SelectCard
            label="Mobil"
            iconSrc="/car.png"
            selected={vehicle === "mobil"}
            onClick={() => setVehicle("mobil")}
          />
          <SelectCard
            label="Motor"
            iconSrc="/motors.png"
            selected={vehicle === "motor"}
            onClick={() => setVehicle("motor")}
          />
          <SelectCard
            label="Bus"
            iconSrc="/bus.png"
            selected={vehicle === "bus"}
            onClick={() => setVehicle("bus")}
          />
        </div>

        {/* Q2 */}
        <p className="mt-6 text-sm font-medium">
          Perkiraan jarak tempuhmu dalam satu hari (pulang–pergi)?
        </p>
        <div className="mt-2 flex items-center gap-2">
          <TextField
            type="text" // jangan "number" supaya bisa filter manual
            inputMode="numeric"
            pattern="\d*"
            value={distance}
            onFocus={(e) => e.currentTarget.select()} // auto-select "0"
            onChange={(e) => {
              const raw = onlyDigits(e.target.value);
              const cleaned = stripLeadingZeros(raw);
              setDistance(cleaned === "" ? "0" : cleaned);
            }}
            onBlur={() => {
              if (!distance) setDistance("0"); // fallback
            }}
            onKeyDown={(e) => {
              const blocked = ["e", "E", "+", "-", ".", ","];
              if (blocked.includes(e.key)) e.preventDefault();
            }}
            placeholder="0"
            fieldSize="lg"
            className="flex-1 min-w-0" // ⟵ biar bener2 panjang di dalam flex
          />
          <span className="text-sm">km</span>
        </div>

        {/* Q3 */}
        <p className="mt-6 text-sm font-medium">Bahan bakar yang digunakan?</p>
        <div className="mt-2 flex flex-wrap gap-3">
          <SelectPill
            label="Bensin"
            selected={fuel === "bensin"}
            onClick={() => setFuel("bensin")}
          />
          <SelectPill
            label="Solar"
            selected={fuel === "solar"}
            onClick={() => setFuel("solar")}
          />
          <SelectPill
            label="Listrik"
            selected={fuel === "listrik"}
            onClick={() => setFuel("listrik")}
          />
        </div>

        {/* spacer untuk tombol bawah */}
        <div className="h-28" />

        {/* CTA bawah */}
        <div className="fixed inset-x-0 bottom-4 px-4 z-50">
          <div className="mx-auto max-w-sm">
            <Button
              type="submit"
              size="md"
              className="w-full sm:h-10 shadow-lg"
              disabled={!canNext}
            >
              Selanjutnya
            </Button>
          </div>
        </div>
      </form>
    </main>
  );
}
