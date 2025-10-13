"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useState, useEffect, Suspense } from "react"
import Button from "@/components/ui/Button"
import PhoneInput from "@/components/ui/PhoneInput"
import Divider from "@/components/ui/Divider"
import AuthLayout from "@/components/auth/AuthLayout"

function RegisterFormIndividuContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const type = searchParams?.get("type") || "individu"

  const [mounted, setMounted] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    setMounted(true)
  }, [])

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (phoneNumber.length < 9) {
      setError("Nomor WhatsApp minimal 9 digit")
      return
    }

    setIsLoading(true)

    setTimeout(() => {
      console.log("Register Individu:", { phone: phoneNumber, type })
      router.push(`/activate?phone=${phoneNumber}&type=${type}&action=register`)
      setIsLoading(false)
    }, 1000)
  }

  const handleGoogleRegister = () => {
    console.log("Register dengan Google, Type:", type)
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "")
    setPhoneNumber(value)
    if (error) setError("")
  }

  if (!mounted) {
    return (
      <AuthLayout
        title="Masukkan Nomor WhatsApp"
        subtitle="Nomor whatsapp kamu akan dipakai untuk proses verifikasi dan masuk ke akun"
        showBack={false}
      >
        <div className="space-y-6">
          <div className="h-[88px]" />
          <div className="h-12 bg-gray-100 rounded-xl animate-pulse" />
        </div>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout
      title="Masukkan Nomor WhatsApp"
      subtitle="Nomor whatsapp kamu akan dipakai untuk proses verifikasi dan masuk ke akun"
    >
      <form onSubmit={handlePhoneSubmit} className="space-y-6">
        <PhoneInput
          id="phone"
          label="Nomor WhatsApp"
          placeholder="81xxxx"
          value={phoneNumber}
          onChange={handlePhoneChange}
          error={error}
          required
          maxLength={13}
          autoComplete="tel"
          autoFocus
        />

        <Button
          type="submit"
          size="lg"
          fullWidth
          disabled={phoneNumber.length < 9 || isLoading}
        >
          {isLoading ? "Memproses..." : "Lanjut"}
        </Button>
      </form>

      <Divider />

      <Button variant="outline" size="lg" fullWidth onClick={handleGoogleRegister}>
        <div className="flex items-center justify-center gap-3">
          <svg width="20" height="20" viewBox="0 0 48 48">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
          </svg>
          <span>Lanjutkan dengan Google</span>
        </div>
      </Button>
    </AuthLayout>
  )
}

export default function RegisterFormIndividu() {
  return (
    <Suspense fallback={null}>
      <RegisterFormIndividuContent />
    </Suspense>
  )
}