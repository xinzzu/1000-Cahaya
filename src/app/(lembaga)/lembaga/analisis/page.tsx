"use client";

import { useState, useMemo } from "react";
import TrendBarLembaga, { MonthPoint } from "@/components/lembaga/analisis/TrendBar";
import TotalCard from "@/components/lembaga/analisis/TotalCard";
import Image from "next/image";
import DonutChartLembaga from "@/components/lembaga/analisis/Donut";


type CategoryPoint = { name: string; value: number; color: string };

export default function AnalysisPageLembaga() {
  // toggle Bulan/Tahun
  const [mode, setMode] = useState<"bulan" | "tahun">("bulan");

  // dummy data (ganti dari API nanti)
  const monthly: MonthPoint[] = [
    { label: "Jan", value: 250.6 },
    { label: "Feb", value: 302.7 },
    { label: "Mar", value: 208.2 },
    { label: "Apr", value: 170.5 },
    { label: "Mei", value: 270 },
    { label: "Jun", value: 400 },
    { label: "Jul", value: 240.2 },
    { label: "Agu", value: 190.8 },
    { label: "Sep", value: 180.7 },
    { label: "Okt", value: 230.5 },
    { label: "Nov", value: 355.5 },
    { label: "Des", value: 230.5 },
  ];

  const yearly: MonthPoint[] = [
    { label: "2021", value: 2500 },
    { label: "2022", value: 2890 },
    { label: "2023", value: 2710 },
    { label: "2024", value: 3000 },
    { label: "2025", value: 3150 },
  ];

  const categories: CategoryPoint[] = [
    { name: "Transportasi", value: 90, color: "#7C8CF8" },
    { name: "Listrik", value: 36, color: "#FF8B86" },
    { name: "Limbah", value: 36, color: "#31C2D0" },
  ];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const total = useMemo(
    () =>
      (mode === "bulan" ? monthly : yearly).reduce((a, b) => a + b.value, 0),
    [mode]
  );

  return (
    <main className="min-h-dvh text-black">
      <div className="mx-auto max-w-sm px-4 pb-[88px] pt-4">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl font-semibold">Analisis Jejak Karbon</h1>
          <p className="text-sm text-black/60">
            Analisis dampak organisasi Anda
          </p>
        </div>

        {/* divider */}
        <div
          className="mt-4 h-[2px] w-full"
          style={{ backgroundColor: "var(--color-primary)" }}
        />

        {/* Tabs Bulan/Tahun */}
        <div className="mt-3 grid grid-cols-2 gap-3">
          <button
            className={[
              "h-10 rounded-xl border text-sm font-semibold",
              mode === "bulan"
                ? "text-white"
                : "text-black",
            ].join(" ")}
            style={{
              backgroundColor:
                mode === "bulan" ? "var(--color-primary)" : "transparent",
              borderColor: "var(--color-primary)",
            }}
            onClick={() => setMode("bulan")}
          >
            Bulan
          </button>
          <button
            className={[
              "h-10 rounded-xl border text-sm font-semibold",
              mode === "tahun"
                ? "text-white"
                : "text-black",
            ].join(" ")}
            style={{
              backgroundColor:
                mode === "tahun" ? "var(--color-primary)" : "transparent",
              borderColor: "var(--color-primary)",
            }}
            onClick={() => setMode("tahun")}
          >
            Tahun
          </button>
        </div>

        {/* Tren */}
        <section className="mt-6">
          <div className="mb-2 flex items-center gap-2">
            <Image src="/images/lembaga/analisis/trend.png" alt="" width={30} height={30} />
            <h2 className="text-lg font-semibold">Tren Jejak Karbon</h2>
          </div>
          <TrendBarLembaga data={mode === "bulan" ? monthly : yearly} />
        </section>

        {/* Donut */}
        <section className="mt-8">
          <div className="mb-3 flex items-center gap-2">
            <Image src="/images/lembaga/analisis/pie.png" alt="" width={30} height={30} />
            <h2 className="text-lg font-semibold">
              Analisis Berdasarkan Kategori
            </h2>
          </div>
          <DonutChartLembaga
            data={categories.map((c) => ({
              key: c.name,
              value: c.value,
              color: c.color,
            }))}
          />
        </section>

        {/* Total Card */}
        <section className="mt-8">
          <div className="mb-6 flex items-center gap-2">
            <Image src="/images/lembaga/analisis/summary.png" alt="" width={30} height={30} />
            <h2 className="text-lg font-semibold">Total Jejak Karbon</h2>
          </div>
          <TotalCard total={1250} />
        </section>
      </div>
    </main>
  );
}
