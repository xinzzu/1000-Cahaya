"use client"

import { useRouter } from "next/navigation"
import { ReactNode } from "react"
import Image from "next/image"

interface AuthLayoutProps {
  title: string
  subtitle: string
  children: ReactNode
  showBack?: boolean
}

export default function AuthLayout({ title, subtitle, children, showBack = true }: AuthLayoutProps) {
  const router = useRouter()

  return (
    <main className="min-h-dvh bg-white text-black px-5 py-8" suppressHydrationWarning>
      <div className="w-full max-w-sm mx-auto">
        {/* Back Button */}
        {showBack && (
          <button
            onClick={() => router.back()}
            className="mb-8 p-2 -ml-2 hover:bg-black/5 rounded-lg transition-colors active:scale-95"
            aria-label="Kembali"
          >
            <Image
              src="/arrow-left.svg"
              alt=""
              width={24}
              height={24}
              className="w-6 h-6"
            />
          </button>
        )}

        {/* Title */}
        <h1 className="text-2xl font-semibold mb-2">{title}</h1>
        <p className="text-sm text-black/70 mb-8">{subtitle}</p>

        {/* Content */}
        {children}
      </div>
    </main>
  )
}