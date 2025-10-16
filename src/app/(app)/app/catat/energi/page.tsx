"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import EnergySourceCard from "@/components/individu/catat/energi/EnergySourceCard";
import { EnergyEntry, EnergySource } from "@/components/individu/catat/energi/types";
import { loadEnergy, saveEnergy, clearEnergy } from "@/components/individu/catat/energi/storage";

import Select from "@/components/ui/Select";
import TextField from "@/components/ui/TextField";
import Button from "@/components/ui/Button";
import SuccessDialog from "@/components/ui/SuccessDialog";

const POWER_OPTIONS = [
  { value: "450",  label: "450 VA"  },
  { value: "900",  label: "900 VA"  },
  { value: "1300", label: "1.300 VA"},
  { value: "2200", label: "2.200 VA"},
  { value: "3500", label: "3.500 VA"},
  { value: "5500", label: "5.500 VA"},
];

export default function EnergiPage() {
  const router = useRouter();

  const [source, setSource]   = useState<EnergySource>("pln");
  const [powerVA, setPowerVA] = useState<string>("");
  const [bill, setBill]       = useState<string>("0"); // tampilan berformat
  const [showSuccess, setShowSuccess] = useState(false);

  // load dummy sebelumnya
  useEffect(() => {
    const loaded = loadEnergy();
    if (loaded) {
      setSource(loaded.source);
      setPowerVA(String(loaded.powerVA));
      setBill(formatRp(String(loaded.billRp)));
    }
  }, []);

  const billNumber = useMemo(() => parseInt(bill.replace(/\D/g, "") || "0", 10), [bill]);

  const canSave = useMemo(
    () => !!powerVA && billNumber > 0,
    [powerVA, billNumber]
  );

  function onSave() {
    const entry: EnergyEntry = {
      source,
      powerVA: parseInt(powerVA, 10),
      billRp: billNumber,
    };
    saveEnergy(entry);
    setShowSuccess(true);
  }

  function onSuccessClose() {
    setShowSuccess(false);
    router.push("/app/catat");
  }

  return (
    <>
      {/* header */}
      <header className="mb-3 flex items-center gap-2">
        <button onClick={() => router.back()} aria-label="Kembali" className="grid h-9 w-9 place-items-center">
          <Image src="/arrow-left.svg" alt="" width={18} height={18} />
        </button>
        <h1 className="flex-1 text-center text-lg font-semibold">Penggunaan Listrik</h1>
        <div className="h-9 w-9" />
      </header>

      <div className="mb-4 h-[2px] w-full" style={{ backgroundColor: "var(--color-primary)" }} />

      <section className="space-y-4">
        <p className="text-sm">Darimana sumber energi listrik rumah tanggamu?</p>
        <div className="grid grid-cols-2 gap-3">
          <EnergySourceCard
            value="pln"
            selected={source === "pln"}
            onSelect={setSource}
            title="PLN"
            img="/images/catat/energi/pln.png"
          />
          <EnergySourceCard
            value="clean"
            selected={source === "clean"}
            onSelect={setSource}
            title="Energi Bersih"
            img="/images/catat/energi/clean.png"
          />
        </div>

        <div>
          <p className="mb-2 text-sm">Berapa daya yang terpasang (VA)?</p>
          <Select
            id="power"
            placeholder="Pilih daya"
            options={POWER_OPTIONS}
            value={powerVA}
            onChange={(e) => setPowerVA(e.target.value)}
          />
        </div>

        <div>
          <p className="mb-2 text-sm">Berapa tagihan listrik bulananmu?</p>
          <div className="flex items-center gap-2">
            <span className="rounded-xl border px-3 py-3 text-sm text-black/60 border-[#D9D9D9]">Rp</span>
            <div className="flex-1">
              <TextField
                id="bill"
                placeholder="0"
                value={bill}
                inputMode="numeric"
                onChange={(e) => setBill(formatRp(e.target.value))}
              />
            </div>
          </div>
        </div>
      </section>

      <div className="mt-6 space-y-2">
        <Button className="w-full" disabled={!canSave} onClick={onSave}>
          Simpan Data
        </Button>
        <Button variant="outline" className="w-full" onClick={() => { clearEnergy(); setPowerVA(""); setBill("0"); }}>
          Hapus Data (Dev)
        </Button>
      </div>

      <SuccessDialog
        open={showSuccess}
        onClose={onSuccessClose}
        message="Data penggunaan listrik berhasil disimpan!"
      />
    </>
  );
}

/* helpers */
function formatRp(input: string) {
  const n = input.replace(/\D/g, "");
  if (!n) return "0";
  return n.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
