// components/nav/BottomNavIndividu.tsx
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import type { ReactNode } from "react"

export type NavItem = {
  label: string
  href: string
  icon: ReactNode
  activeIcon?: ReactNode
  match?: "exact" | "startsWith"
}

const normalize = (p: string) => p.replace(/\/+$/, "") || "/"
const isMatch = (pathname: string, href: string, match?: "exact" | "startsWith") =>
  match === "exact" ? pathname === href : pathname === href || pathname.startsWith(href + "/")

export default function BottomNavIndividu({ items = [] as NavItem[] }) {
  // 1) Call all hooks every render (order never changes)
  const rawPath = usePathname()
  const livePath = normalize(rawPath || "/")
  const frozenPath = useRef(livePath).current

  // 2) No-SSR for this widget (avoids hydration diffs)
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  // If nothing matches on first mount, highlight index 0 (Beranda)
  const hasActive = items.some((it) => isMatch(frozenPath, normalize(it.href), it.match))
  const defaultActiveIndex = hasActive ? -1 : 0

  // Render nothing until client mounted (but hooks still ran above)
  if (!mounted) return null

  return (
    <nav
      aria-label="Bottom navigation"
      className="fixed inset-x-0 bottom-0 z-50 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/70 pb-[env(safe-area-inset-bottom)]"
    >
      <div className="mx-auto max-w-sm">
        <div className="border-t" style={{ borderColor: "var(--color-primary)" }}>
          <ul className="grid grid-cols-5">
            {items.map((it, idx) => {
              const href = normalize(it.href)
              const active =
                defaultActiveIndex === idx ? true : isMatch(frozenPath, href, it.match)
              const iconNode = active && it.activeIcon ? it.activeIcon : it.icon
              const color = active ? "var(--color-primary)" : "#000"

              return (
                <li key={it.href}>
                  <Link
                    href={it.href}
                    className="flex h-16 flex-col items-center justify-center gap-1 active:scale-[0.98] transition"
                    aria-current={active ? "page" : undefined}
                  >
                    <span
                      className="grid h-6 w-6 place-items-center shrink-0 [&>svg]:h-6 [&>svg]:w-6 [&>img]:h-6 [&>img]:w-6"
                      style={{ color }}
                    >
                      {iconNode}
                    </span>
                    <span
                      className="text-[11px] leading-none font-medium"
                      style={{ color }}
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
