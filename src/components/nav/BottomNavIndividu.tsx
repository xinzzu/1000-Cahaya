// components/nav/BottomNavIndividu.tsx
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ReactNode } from "react"

export type NavItem = {
  label: string
  href: string
  icon: ReactNode
  activeIcon?: ReactNode
  match?: "exact" | "startsWith"
}

type Props = {
  items?: NavItem[]
}

export default function BottomNavIndividu({ items = [] }: Props) {
  const pathname = usePathname()

  return (
    <nav
      className="
        fixed inset-x-0 bottom-0 z-50
        bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/70
        pb-[env(safe-area-inset-bottom)]
      "
      aria-label="Bottom navigation"
    >
      {/* lebar PWA */}
      <div className="mx-auto max-w-sm">
        {/* border top hanya sepanjang container */}
        <div className="border-t" style={{ borderColor: "var(--color-primary)" }}>
          <ul className="grid grid-cols-5">
            {items.map((it) => {
              const active =
                it.match === "exact"
                  ? pathname === it.href
                  : pathname === it.href || pathname.startsWith(it.href + "/")

              const iconNode = active && it.activeIcon ? it.activeIcon : it.icon

              return (
                <li key={it.href}>
                  <Link
                    href={it.href}
                    className="flex h-14 flex-col items-center justify-center gap-1"
                  >
                    {/* ikon; aktif biarkan hitam, non-aktif abu */}
                    <span className={active ? "text-black" : "text-black/50"}>
                      {iconNode}
                    </span>

                    {/* label: ketebalan SAMA; aktif beda warna saja */}
                    <span
                      className={
                        active
                          ? "text-[11px] leading-none font-medium text-black"
                          : "text-[11px] leading-none font-medium text-black/60"
                      }
                    >
                      {it.label}
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </nav>
  )
}
