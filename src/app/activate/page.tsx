"use client"

import dynamic from "next/dynamic"

// Dynamic import untuk menghindari hydration mismatch
const ActivationContent = dynamic(
  () => import("@/components/auth/ActivationContent"),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-dvh grid place-items-center bg-white">
        <div className="text-center text-black/60">Memuat...</div>
      </div>
    ),
  }
)

export default function ActivatePage() {
  return <ActivationContent />
}