"use client"

import dynamic from "next/dynamic"

// Dynamic import untuk menghindari hydration mismatch
const CompleteProfileContent = dynamic(
  () => import("@/components/auth/CompleteProfileContent"),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-dvh grid place-items-center bg-white">
        <div className="text-center text-black/60">Memuat...</div>
      </div>
    ),
  }
)

export default function CompleteProfilePage() {
  return <CompleteProfileContent />
}