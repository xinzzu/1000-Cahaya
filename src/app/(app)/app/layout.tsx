import BottomNav, { type NavItem } from "@/components/nav/BottomNavIndividu"
import Image from "next/image"

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const items: NavItem[] = [
    { label: "Beranda", href: "/app", icon: <Image src="/icons/home.svg" alt="" width={24} height={24} />, match: "startsWith" },
    { label: "Tantangan", href: "/app/tantangan", icon: <Image src="/icons/challenge.svg" alt="" width={24} height={24} /> },
    { label: "Catat", href: "/app/catat", icon: <Image src="/icons/add.svg" alt="" width={24} height={24} />, match: "exact" },
    { label: "Analisis", href: "/app/analisis", icon: <Image src="/icons/chart.svg" alt="" width={24} height={24} /> },
    { label: "Profil", href: "/app/profil", icon: <Image src="/icons/user.svg" alt="" width={24} height={24} /> },
  ]

  return (
    <div className="min-h-dvh bg-white text-black">
      <main className="mx-auto max-w-sm px-4 pb-16 pt-4">{children}</main>
      <BottomNav items={items} />
    </div>
  )
}
