// src/app/(app)/analisis/page.tsx
"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import TrendChart from "@/components/analisis/TrendChart";
import DonutChart from "@/components/analisis/DonutChart";
import Button from "@/components/ui/Button";

type Range = "week" | "month" | "year";

const monthSeries = [
  { name: "Jan", value: 250.6 },
  { name: "Feb", value: 302.7 },
  { name: "Mar", value: 208.2 },
  { name: "Apr", value: 170.5 },
  { name: "Mei", value: 270.0 },
  { name: "Jun", value: 400.0 },
  { name: "Jul", value: 240.2 },
  { name: "Agu", value: 190.8 },
  { name: "Sep", value: 180.7 },
  { name: "Okt", value: 230.5 },
  { name: "Nov", value: 355.5 },
  { name: "Des", value: 230.5 },
];

const categoryBreakdown = [
  { key: "Transportasi", value: 90, color: "#6C63FF" },
  { key: "Listrik", value: 36, color: "#FF8A80" },
  { key: "Limbah", value: 36, color: "#1BC5BD" },
];

export default function AnalisisPage() {
  const [range, setRange] = useState<Range>("month");

  // ganti dataset sesuai tab (dummy dulu)
  const series = useMemo(() => {
    if (range === "month") return monthSeries;
    if (range === "week")
      return [
        { name: "Sen", value: 21 },
        { name: "Sel", value: 18 },
        { name: "Rab", value: 26 },
        { name: "Kam", value: 14 },
        { name: "Jum", value: 20 },
        { name: "Sab", value: 12 },
        { name: "Min", value: 11 },
      ];
    // year
    return [
      { name: "2020", value: 1700 },
      { name: "2021", value: 1650 },
      { name: "2022", value: 1550 },
      { name: "2023", value: 1490 },
      { name: "2024", value: 1500 },
    ];
  }, [range]);

  const totalThisMonth = 150; // dummy
  const recordedDays = 20;
  const changePct = -15;
  const changeAbs = 26.5;

  return (
    <main className="mx-auto max-w-sm px-4 pt-4 pb-[88px]">
      {/* Header */}
      <header className="text-center">
        <h1 className="text-xl font-semibold">Analisis Jejak Karbon</h1>
        <p className="text-sm text-black/60">
          Analisis dampak aktivitas harian Anda
        </p>
      </header>

      {/* Tabs */}
      <div className="mt-4 grid grid-cols-3 gap-2">
        {[
          { key: "week", label: "Minggu" },
          { key: "month", label: "Bulan" },
          { key: "year", label: "Tahun" },
        ].map((t) => {
          const active = range === (t.key as Range);
          return (
            <button
              key={t.key}
              onClick={() => setRange(t.key as Range)}
              className={[
                "h-10 rounded-xl border",
                active
                  ? "bg-[color:var(--color-secondary)] border-[color:var(--color-primary)] text-[color:var(--color-primary)]"
                  : "border-black/15",
              ].join(" ")}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      {/* Tren */}
      <section className="mt-5">
        <div className="mb-2 flex items-center gap-2">
          <Image
            src="/images/analisis/trend.png"
            alt=""
            width={24}
            height={24}
          />
          <h2 className="text-base font-semibold">Tren Jejak Karbon Anda</h2>
        </div>

        <div className="mt-4 rounded-2xl">
          <TrendChart data={series} />
          <p className="text-center text-xs" style={{ color: "#6C63FF" }}>
            kg CO₂e
          </p>
        </div>
      </section>

      {/* Donut */}
      <section className="mt-6">
        <div className="mb-2 flex items-center gap-2">
          <Image src="/images/analisis/pie.png" alt="" width={24} height={24} />
          <h2 className="text-base font-semibold">
            Analisis Berdasarkan Kategori
          </h2>
        </div>

        <div className="mt-4 rounded-2xl ">
          <DonutChart data={categoryBreakdown} />
        </div>
      </section>

      {/* Ringkasan */}
      <section className="mt-6">
        <div className="mb-2 flex items-center gap-2">
          <Image
            src="/images/analisis/summary.png"
            alt=""
            width={24}
            height={24}
          />
          <h2 className="text-base font-semibold">Ringkasan Jejak Karbon</h2>
        </div>

        {/* Card 1 */}
        <article
          className="mt-4 rounded-2xl border p-3"
          style={{ borderColor: "var(--color-primary)" }}
        >
          <div className="text-sm ">Total Emisi Bulan Ini</div>
          <div className="mt-1 flex items-end justify-between">
            <div>
              <div className="text-5xl font-semibold text-[color:var(--color-primary)]">
                {totalThisMonth}
              </div>
              <div className="text-sm text-black/70">
                kg CO₂e · {recordedDays} hari tercatat
              </div>
            </div>
            <Button
              size="sm"
              onClick={() => console.log("Tombol bagikan diklik")}
            >
              <div className="flex items-center gap-2">
                <Image
                  src="/icons/tantangan/share.svg"
                  alt=""
                  width={12}
                  height={12}
                />
                <span>Bagikan</span>
              </div>
            </Button>
          </div>
        </article>

        {/* Card 2 */}
        <article
          className="mt-3 rounded-2xl border p-3"
          style={{ borderColor: "var(--color-primary)" }}
        >
          <div className="text-sm">Perubahan dari Bulan lalu</div>
          <div className="mt-1 flex items-end justify-between">
            <div>
              <div className="text-5xl font-semibold text-[color:var(--color-primary)]">
                {changePct > 0 ? "+" : ""}
                {changePct}%
              </div>
              <div className="text-sm text-black/70">
                {changePct < 0 ? "Berkurang" : "Bertambah"} {changeAbs} kg CO₂e
              </div>
            </div>
            <Button
              size="sm"
              onClick={() => console.log("Tombol bagikan diklik")}
            >
              <div className="flex items-center gap-2">
                <Image
                  src="/icons/tantangan/share.svg"
                  alt=""
                  width={16}
                  height={16}
                />
                <span>Bagikan</span>
              </div>
            </Button>
          </div>
        </article>
      </section>
    </main>
  );
}
