"use client";

import HistoryList from "@/components/lembaga/riwayat/HistoryList";
import type { OrgReport } from "@/components/lembaga/riwayat/types";

// Dummy data dulu
const MOCK: OrgReport[] = [
  { id: "2025-09", year: 2025, month: 9,  totalEmisi: 1250, pengurangan: 25.6, trendPct: -15 },
  { id: "2025-08", year: 2025, month: 8,  totalEmisi: 1250, pengurangan: 25.6, trendPct: -15 },
];

export default function RiwayatPage() {
  return (
    <main className="min-h-dvh text-black ">
      <div className="mx-auto max-w-lg px-4 pb-[60px] pt-4">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl font-semibold">Riwayat Laporan</h1>
          <p className="text-sm text-black/60">
            Laporan Emisi Karbon Bulanan
          </p>
        </div>

        {/* separator tipis */}
        <div className="mt-4 h-[2px] w-full"
             style={{ backgroundColor: "var(--color-primary)" }} />

        {/* List */}
        <div className="mt-4">
          <HistoryList items={MOCK} />
        </div>
      </div>
    </main>
  );
}
