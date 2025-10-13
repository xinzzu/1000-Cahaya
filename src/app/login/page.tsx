"use client"

import dynamic from "next/dynamic"

// Dynamic import untuk menghindari hydration mismatch
const LoginForm = dynamic(
  () => import("@/components/auth/LoginForm"),
  {
    ssr: false, // Disable server-side rendering
    loading: () => (
      <div className="min-h-dvh grid place-items-center bg-white">
        <div className="text-center text-black/60">Memuat...</div>
      </div>
    ),
  }
)

export default function LoginPage() {
  return <LoginForm />
}