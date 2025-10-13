"use client"

import dynamic from "next/dynamic"

const InstitutionRegisterContent = dynamic(
  () => import("@/components/auth/forms/RegisterFormInstitution"),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-dvh grid place-items-center bg-white">
        <div className="text-center text-black/60">Memuat...</div>
      </div>
    ),
  }
)

export default function InstitutionRegisterPage() {
  return <InstitutionRegisterContent />
}