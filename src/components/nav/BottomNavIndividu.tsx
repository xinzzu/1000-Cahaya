// src/components/nav/BottomNavIndividu.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export type NavItem = {
  label: string;
  href: string;
  iconSrc: string;              // ← cukup satu file ikon
  match?: "exact" | "startsWith";
};

export default function BottomNavIndividu({ items = [] as NavItem[] }) {
  const pathname = usePathname() || "/";

  return (
    <nav
      aria-label="Bottom navigation"
      className="fixed inset-x-0 bottom-0 z-50 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/70"
    >
      <div className="h-px w-full" style={{ backgroundColor: "var(--color-primary)" }} />
      <div className="mx-auto max-w-sm">
        <ul className="grid grid-cols-5">
          {items.map((it) => {
            const active =
              it.match === "exact"
                ? pathname === it.href
                : pathname === it.href || pathname.startsWith(it.href + "/");

            const color = active ? "var(--color-primary)" : "#000";

            return (
              <li key={it.href}>
                <Link
                  href={it.href}
                  aria-current={active ? "page" : undefined}
                  className="flex h-16 flex-col items-center justify-center gap-1 select-none"
                >
                  {/* Ikon dikunci 24x24, warna via background-color + mask */}
                  <span
                    aria-hidden
                    className="
                      block h-6 w-6 shrink-0
                      bg-current
                      [mask-size:contain] [mask-position:center] [mask-repeat:no-repeat]
                      [-webkit-mask-size:contain] [-webkit-mask-position:center] [-webkit-mask-repeat:no-repeat]
                    "
                    style={{
                      color,
                      maskImage: `url(${it.iconSrc})`,
                      WebkitMaskImage: `url(${it.iconSrc})`,
                    }}
                  />
                  <span className="text-[11px] leading-none font-medium" style={{ color }}>
                    {it.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
