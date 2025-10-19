"use client";
import { useRouter } from "next/navigation";
import OrgProfileHeader from "@/components/lembaga/profile/HeaderCard";
import SettingsItem from "@/components/lembaga/profile/SettingsItem";
import LogoutButtonLembaga from "@/components/lembaga/profile/LogoutButton";
import SettingsSection from "@/components/lembaga/profile/SettingsSection";

export default function OrgProfilePage() {
  const router = useRouter();
  // TODO: gantikan dengan data asli
  const org = {
    name: "Nama Lembaga",
    email: "emailpic@mail.com",
    joined: "Bergabung Okt 2025",
  };

function onLogout() {
    // TODO: clear auth token, localStorage, dll.
    console.log("logout clicked, redirecting to /");
    
    // ✅ 3. Gunakan router untuk navigasi
    router.push("/");
  }

  return (
    <main className="min-h-dvh bg-white text-black">
      <div className="mx-auto max-w-lg px-4 pb-[88px] pt-4">
        {/* Judul */}
        <header className="text-center">
          <h1 className="text-2xl font-semibold">Profil</h1>
        </header>

        {/* Divider */}
        <div
          className="mt-3 h-[2px] w-full"
          style={{ backgroundColor: "var(--color-primary)" }}
        />

        {/* Kartu identitas lembaga */}
        <div className="mt-4">
          <OrgProfileHeader
            orgName={org.name}
            email={org.email}
            joinedAt={org.joined}
          />
        </div>

        {/* Pengaturan */}
        <section className="mt-6">
          <h2 className="mb-2 text-base font-semibold">
            Pengaturan Akun & Lainnya
          </h2>

          <SettingsSection>
            <SettingsItem
              title="Edit Profil"
              subtitle="Ubah info personal"
              iconSrc="/icons/lembaga/profile/ic-edit.svg"
              href="/app/profil/edit"
            />

            <SettingsItem
              title="Keamanan"
              subtitle="Password"
              iconSrc="/icons/lembaga/profile/ic-security.svg"
              href="/app/profil/keamanan"
            />

            <SettingsItem
              title="Bantuan & Saran"
              subtitle="Pusat bantuan dan masukan"
              iconSrc="/icons/lembaga/profile/ic-help.svg"
              href="/support"
            />

            <SettingsItem
              title="Syarat & Ketentuan"
              subtitle="Kebijakan privasi"
              iconSrc="/icons/lembaga/profile/ic-terms.svg"
              href="/terms"
              showDivider={false} // item terakhir tanpa garis bawah
            />
          </SettingsSection>
        </section>

        {/* Keluar */}
        <LogoutButtonLembaga onClick={onLogout} />

        {/* versi app */}
        <p className="mt-4 text-center text-xs text-black/50">
          1000CahayaMu App v1.0.0
        </p>
      </div>
    </main>
  );
}
