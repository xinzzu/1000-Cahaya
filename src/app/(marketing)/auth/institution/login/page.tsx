"use client"

import dynamic from "next/dynamic"

const InstitutionLoginContent = dynamic(
  () => import("@/components/auth/forms/LoginFormInstitution"),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-dvh grid place-items-center bg-white">
        <div className="text-center text-black/60">Memuat...</div>
      </div>
    ),
  }
)

export default function InstitutionLoginPage() {
  return <InstitutionLoginContent />
}