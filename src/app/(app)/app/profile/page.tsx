"use client";

import Image from "next/image";
import { useRouter } from "next/navigation"; // ✅ 1. Import useRouter
import ProfileHeaderCard from "@/components/profile/ProfileHeaderCard";
import SectionTitle from "@/components/profile/SectionTitle";
import BadgeCard from "@/components/profile/BadgeCard";
import SettingRow from "@/components/profile/SettingRow";
import LogoutBar from "@/components/profile/LogoutBar";

export default function ProfilPage() {
  const router = useRouter(); // ✅ 2. Inisialisasi router

  // nanti ganti dengan data dari store/API
  const user = {
    name: "John Doe",
    email: "johndoe@mail.com",
    joined: "Bergabung Okt 2025",
    level: 2,
    points: 50,
    rank: "#1240",
  };

  function onLogout() {
    // TODO: clear auth token, localStorage, dll.
    console.log("logout clicked, redirecting to /");
    
    // ✅ 3. Gunakan router untuk navigasi
    router.push("/");
  }

  return (
    <main className="min-h-dvh bg-white text-black">
      <div className="mx-auto max-w-sm px-4 pb-[88px] pt-4">
        <h1 className="mb-3 text-center text-xl font-semibold">Profil</h1>

        {/* garis tipis sesuai desain */}
        <div
          className="mx-auto mb-4 h-[2px] w-full"
          style={{ backgroundColor: "var(--color-primary)" }}
        />

        {/* HEADER CARD */}
        <ProfileHeaderCard
          name={user.name}
          email={user.email}
          joinedText={user.joined}
          level={user.level}
          totalPoints={user.points}
          rank={user.rank}
        />

        {/* KOLEKSI LENCANA */}
        <div className="mt-5">
          <SectionTitle
            action={
              <button className="text-sm text-[color:var(--color-primary)]">
                Lihat Semua
              </button>
            }
          >
            <div className="flex items-center gap-2">
              {/* PNG kecil (boleh diganti png/logo lencana) */}
              <Image src="/images/profile/badge-power.png" alt="" width={30} height={30} />
              Koleksi Lencana
            </div>
          </SectionTitle>

          <p className="mt-3 text-sm text-black/70">
            Kumpulan lencana adalah bukti nyata komitmenmu.
          </p>

          <div className="mt-4 grid grid-cols-2 gap-4">
            <BadgeCard
              iconSrc="/images/profile/badge-electric.png"
              title="Pahlawan Hemat Listrik"
              desc="Berhasil mengurangi konsumsi listrik 20% dalam sebulan"
            />
            <BadgeCard
              iconSrc="/images/profile/badge-rail.png"
              title="Jalur Hijau"
              desc="Menggunakan transportasi umum sebanyak 10 kali"
            />
          </div>
        </div>

        {/* PENGATURAN */}
        <div className="mt-6">
          <SectionTitle>Pengaturan Akun & Lainnya</SectionTitle>

          <div className="mt-2 divide-y">
            <SettingRow
              icon="/icons/profile/edit.svg"
              title="Edit Profil"
              subtitle="Ubah info personal"
              href="/app/profil/edit"
            />
            <SettingRow
              icon="/icons/profile/shield.svg"
              title="Keamanan"
              subtitle="Password"
              href="/app/profil/keamanan"
            />
            <SettingRow
              icon="/icons/profile/helps.svg"
              title="Bantuan & Saran"
              subtitle="Pusat bantuan dan masukan"
              href="/app/bantuan"
            />
            <SettingRow
              icon="/icons/profile/document.svg"
              title="Syarat & Ketentuan"
              subtitle="Kebijakan privasi"
              href="/terms"
            />
          </div>
        </div>

        {/* LOGOUT */}
        <LogoutBar onClick={onLogout} />

        {/* versi app kecil di bawah */}
        <p className="mt-3 text-center text-xs text-black/50">
          1000CahayaMu App v1.0.0
        </p>
      </div>
    </main>
  );
}