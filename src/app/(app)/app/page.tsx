// src/app/(app)/app/page.tsx
"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [name, setName] = useState("John Doe");
  const [total, setTotal] = useState(155);

  useEffect(() => {
    const nm = localStorage.getItem("profile.name");
    if (nm) setName(nm);
    const sm = localStorage.getItem("summary:last");
    if (sm) {
      try {
        const p = JSON.parse(sm);
        if (typeof p?.totalKg === "number") setTotal(p.totalKg);
      } catch {}
    }
  }, []);

  return (
    <main>
      {/* HEADER */}
      <header className="flex items-center gap-3">
        {/* Avatar PNG */}
        <Image
          src="/images/User.png"
          alt={name}
          width={40}
          height={40}
          className="rounded-full ring-1 ring-object-cover"
          priority
        />

        <div className="flex-1">
          <h1 className="text-lg font-semibold">Halo, {name}</h1>
          <p className="text-sm text-black/60">
            Jejak Karbon untuk Bumi yang lebih Hijau!
          </p>
        </div>

        <button
          aria-label="Notifikasi"
          className="h-9 w-9 grid place-items-center "
        >
          <Image src="/icons/bells.svg" alt="" width={18} height={18} />
        </button>
      </header>
      {/* KARTU TOTAL */}
      <section
        className="mt-4 rounded-2xl border p-4"
        style={{ borderColor: "var(--color-primary)" }}
      >
        <p className="text-center text-black/70 text-sm">Jejak Karbon Anda:</p>
        <div className="mt-2 text-center text-5xl font-semibold text-[color:var(--color-primary)]">
          {total}
        </div>
        <p className="text-center text-sm">kg CO₂e bulan ini</p>
      </section>

      {/* KARTU LENCANA (icon SVG di kiri) */}
      <section
        className="mt-3 rounded-2xl border p-4 flex gap-3"
        style={{ borderColor: "var(--color-primary)" }}
      >
        <div className="h-9 w-9 grid place-items-center rounded-full bg-[color:var(--color-secondary)]">
          {/* export dari figma → /public/icons/badge-green.svg */}
          <Image src="/images/lencana.png" alt="" width={36} height={36} />
        </div>
        <div className="flex-1">
          <div className="font-semibold">Lencana “Jalur Hijau”</div>
          <div className="text-sm text-black/60">
            Menggunakan transportasi umum hari ini
          </div>
          <div className="text-sm">Bulan ini: Total {total} kg CO₂e</div>
        </div>
      </section>

      {/* INSPIRASI & WAWASAN (title + icon) */}
      <section className="mt-6">
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* export dari figma → /public/icons/bulb.svg */}
            <Image src="/images/inspirasi.png" alt="" width={24} height={24} />
            <h2 className="text-base font-semibold">Inspirasi & Wawasan</h2>
          </div>
          <button className="text-sm text-[color:var(--color-primary)]">
            Lihat Semua
          </button>
        </div>

        {/* KARTU ARTIKEL */}
        <article
          className="rounded-2xl border p-3"
          style={{ borderColor: "var(--color-primary)" }}
        >
          {/* banner PNG besar (yang sebelumnya kotak hijau) */}
          <div className="relative mb-3 aspect-[16/9] w-full overflow-hidden rounded-xl">
            {/* simpan di /public/images/green-banner.png */}
            <Image
              src="/images/banner.png"
              alt="Energy saving solutions"
              fill
              className="object-cover"
              priority
            />
          </div>

          <h3 className="font-semibold">5 Cara Jitu Hemat Listrik Saat WFH</h3>
          <p className="text-sm text-black/60">
            Tips mudah agar tagihan listrikmu aman selama kerja dari rumah.
          </p>
        </article>
      </section>
    </main>
  );
}
