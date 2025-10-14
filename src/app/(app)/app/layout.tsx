import BottomNav, { type NavItem } from "@/components/nav/BottomNavIndividu"
import Image from "next/image"

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const items: NavItem[] = [
    {
      label: "Beranda",
      href: "/app",
      icon: <Image src="/icons/home.svg" alt="Ikon Beranda" width={24} height={24} />,
      activeIcon: <Image src="/icons/home-active.svg" alt="Ikon Beranda Aktif" width={24} height={24} />,
      match: "exact",
    },
    {
      label: "Tantangan",
      href: "/app/tantangan",
      icon: <Image src="/icons/challenge.svg" alt="Ikon Tantangan" width={24} height={24} />,
      activeIcon: <Image src="/icons/challenge-active.svg" alt="Ikon Tantangan Aktif" width={24} height={24} />,
    },
    {
      label: "Catat",
      href: "/app/catat",
      icon: <Image src="/icons/add.svg" alt="Ikon Catat" width={24} height={24} />,
      activeIcon: <Image src="/icons/add-active.svg" alt="Ikon Catat Aktif" width={24} height={24} />,
      match: "exact",
    },
    {
      label: "Analisis",
      href: "/app/analisis",
      icon: <Image src="/icons/chart.svg" alt="Ikon Analisis" width={24} height={24} />,
      activeIcon: <Image src="/icons/chart-active.svg" alt="Ikon Analisis Aktif" width={24} height={24} />,
    },
    {
      label: "Profil",
      href: "/app/profil",
      icon: <Image src="/icons/user.svg" alt="Ikon Profil" width={24} height={24} />,
      activeIcon: <Image src="/icons/user-active.svg" alt="Ikon Profil Aktif" width={24} height={24} />,
    },
  ]

  return (
    <div className="min-h-dvh bg-white text-black">
      <main className="mx-auto max-w-sm px-4 pb-[88px] pt-4">{children}</main>
      <BottomNav items={items} />
    </div>
  )
}
