"use client"; // Diperlukan karena kita menggunakan hook dan dynamic import

import dynamic from "next/dynamic";

import HideOnPaths from "@/components/nav/HideOnPaths";
import type { NavItemLembaga } from "@/components/nav/BottomNavLembaga";

// Menggunakan dynamic import untuk memastikan BottomNavLembaga hanya dirender di sisi klien
const BottomNavLembaga = dynamic(() => import("@/components/nav/BottomNavLembaga"));

// Tentukan path di mana navigasi bawah akan disembunyikan
const HIDE_NAV_PATHS = [
  "/lembaga/register-aset",
  // Tambahkan path lain di sini jika diperlukan, contoh: "/lembaga/laporan/buat"
];

export default function LembagaLayout({ children }: { children: React.ReactNode }) {
  // Definisikan item-item navigasi beserta ikonnya di sini
  const navItems: NavItemLembaga[] = [
    { 
      label: "Beranda",  
      href: "/lembaga", 
      iconSrc: "/icons/home.svg",
      match: "exact" 
    },
    { 
      label: "Riwayat",     
      href: "/lembaga/riwayat", // Mengarah ke halaman daftar/register aset
      iconSrc: "/icons/history.svg" // Pastikan ikon ini ada
    },
    { 
      label: "Analisis", 
      href: "/lembaga/analisis", 
      iconSrc: "/icons/chart.svg" 
    },
    { 
      label: "Profil",   
      href: "/lembaga/profile",   
      iconSrc: "/icons/user.svg"
    },
  ];

  return (
    <div className="min-h-dvh bg-white text-black"> {/* Latar belakang abu-abu seperti desain beranda */}
      <main className="mx-auto max-w-lg px-4 pt-4 pb-[88px]">
        {children}
      </main>

      {/* Navigasi bawah akan disembunyikan pada path yang ada di HIDE_NAV_PATHS */}
      <HideOnPaths paths={HIDE_NAV_PATHS}>
        <BottomNavLembaga items={navItems} />
      </HideOnPaths>
    </div>
  );
}