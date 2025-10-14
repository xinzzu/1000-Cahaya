// src/app/(app)/app/layout.tsx
import BottomNav, { type NavItem } from "@/components/nav/BottomNavIndividu";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const items: NavItem[] = [
    { label: "Beranda",   href: "/app",            iconSrc: "/icons/home.svg",      match: "exact" },
    { label: "Tantangan", href: "/app/tantangan",  iconSrc: "/icons/challenge.svg", match: "exact" },
    { label: "Catat",     href: "/app/catat",      iconSrc: "/icons/add.svg",       match: "exact" },
    { label: "Analisis",  href: "/app/analisis",   iconSrc: "/icons/chart.svg",     match: "exact" },
    { label: "Profil",    href: "/app/profile",     iconSrc: "/icons/user.svg",      match: "exact" },
  ];

  return (
    <div className="min-h-dvh bg-white text-black">
      <main className="mx-auto max-w-sm px-4 pt-4 pb-[88px]">
        {children}
      </main>
      <BottomNav items={items} />
    </div>
  );
}
