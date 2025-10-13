"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import TextField from "@/components/ui/TextField";
import SelectCard from "@/components/ui/SelectCard";
import ProgressBar from "@/components/ui/ProgressBar";

type Source = "pln" | "bersih";

const DAYA_OPTS = [
  "450 VA",
  "900 VA",
  "1300 VA",
  "2200 VA",
  "3500 – 5500 VA",
  "≥ 6600 VA",
] as const;

const onlyDigits = (v: string) => v.replace(/[^\d]/g, "");
const stripLeadingZeros = (v: string) => v.replace(/^0+(?=\d)/, "");

export default function EnergiListrikPage() {
  const router = useRouter();
  const [source, setSource] = useState<Source | null>(null);
  const [daya, setDaya] = useState<string>(""); // "" = belum dipilih
  const [bill, setBill] = useState<string>("0"); // rupiah (angka saja)
  const digitsOnly = (v: string) => v.replace(/[^\d]/g, "");
  const stripLeadingZeros = (v: string) => v.replace(/^0+(?=\d)/, "");
  const formatIDR = (raw: string) =>
    raw === "" ? "0" : new Intl.NumberFormat("id-ID").format(Number(raw));

  const [billRaw, setBillRaw] = useState<string>("0"); // angka tanpa titik

  const canNext = useMemo(() => {
    const b = Number(billRaw);
    return !!source && !!daya && Number.isFinite(b) && b > 0;
  }, [source, daya, billRaw]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canNext) return;
    // TODO: commit/kirim ke server
    // payload contoh: { source, daya, avgBill: Number(bill) }
    router.push("/survey/akhir"); // ganti ke step berikutnya
  }

  return (
    <main className="min-h-dvh bg-white text-black">
      {/* step ke-2 -> active=1 (0-based) */}
      <ProgressBar total={3} active={1} />

      <form onSubmit={onSubmit} className="mx-auto max-w-sm px-4 pb-28 pt-4">
        <div className="flex items-center justify-between">
          <div className="h-8 w-8" />
          <h1 className="flex-1 text-center text-xl font-semibold">
            Energi Listrik 💡
          </h1>
          <div className="h-8 w-8" />
        </div>

        {/* Q1: sumber listrik */}
        <p className="mt-6 text-sm font-medium  [text-wrap:balance]">
          {"Darimana sumber energi listrik rumah tangga?"}
        </p>

        <div
          className="mt-3 grid grid-cols-2 gap-3"
          role="radiogroup"
          aria-label="Sumber listrik"
        >
          <SelectCard
            label="PLN"
            iconSrc="/pln.png" // taruh icon di /public/pln.png
            selected={source === "pln"}
            onClick={() => setSource("pln")}
            className="w-full h-[80px]"
          />
          <SelectCard
            label="Energi Bersih"
            iconSrc="/renewable.png" // taruh icon /public/renewable.png
            selected={source === "bersih"}
            onClick={() => setSource("bersih")}
            className="w-full h-[80px]"
          />
        </div>

        {/* Q2: daya terpasang */}
        <p className="mt-6 text-sm font-medium">
          Berapa daya yang terpasang (VA)?
        </p>
        <div
          className="mt-2 h-12 w-full rounded-xl border px-3 text-sm"
          style={{ borderColor: "var(--color-primary)" }}
        >
          {/* native select (tanpa lib), gaya konsisten dengan TextField */}
          <select
            className="h-full w-full bg-transparent outline-none"
            value={daya}
            onChange={(e) => setDaya(e.target.value)}
          >
            <option value="" disabled>
              Pilih daya
            </option>
            {DAYA_OPTS.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        {/* Q3: rata-rata tagihan bulanan */}
        <p className="mt-6 text-sm font-medium">
          Berapa rata-rata tagihan listrik bulananmu?
        </p>
        <div className="mt-2 flex items-center gap-2">
          <span className="text-sm">Rp</span>
          <TextField
            type="text"
            inputMode="numeric"
            pattern="\d*"
            value={formatIDR(billRaw)} // ⟵ tampilkan dengan titik
            onFocus={(e) => e.currentTarget.select()}
            onChange={(e) => {
              const raw = stripLeadingZeros(digitsOnly(e.target.value));
              setBillRaw(raw === "" ? "0" : raw);
            }}
            onBlur={() => {
              if (!billRaw) setBillRaw("0");
            }}
            onKeyDown={(e) => {
              const blocked = ["e", "E", "+", "-", ".", ","];
              if (blocked.includes(e.key)) e.preventDefault();
            }}
            placeholder="0"
            fieldSize="lg"
            className="flex-1 min-w-0"
          />
        </div>

        {/* spacer + CTA */}
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
