"use client"

import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import Image from "next/image"
import Button from "@/components/ui/Button"

export default function ActivationContent() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [countdown, setCountdown] = useState(59)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Countdown timer
  useEffect(() => {
    if (!mounted) return

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [mounted])

  const handleActivationClick = () => {
    console.log("Klik link aktivasi")
    // TODO: Navigate to next page after activation
    router.push("/onboarding") // Ganti dengan route yang sesuai
  }

  const handleResend = () => {
    console.log("Kirim ulang link aktivasi")
    setCountdown(59) // Reset countdown
    // TODO: Implement resend activation link
  }

  if (!mounted) {
    return (
      <main className="min-h-dvh bg-white text-black px-5 py-8">
        <div className="w-full max-w-sm mx-auto flex flex-col items-center justify-center min-h-[calc(100dvh-4rem)]">
          <div className="h-32 w-32 bg-gray-100 rounded-full animate-pulse" />
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-dvh bg-white text-black px-5 py-8" suppressHydrationWarning>
      <div className="w-full max-w-sm mx-auto flex flex-col items-center justify-center min-h-[calc(100dvh-4rem)]">
        {/* Icon Success */}
        <div className="mb-8">
          <Image
            src="/check-badge.svg"
            alt="Success"
            width={120}
            height={120}
            className="w-[120px] h-[120px]"
            priority
          />
        </div>

        {/* Title */}
        <h1 className="text-2xl font-semibold text-center mb-3">
          Link Aktivasi Terkirim!
        </h1>

        {/* Description */}
        <p className="text-sm text-center text-black/70 mb-6 max-w-[300px]">
          Silahkan cek pesan WhatsApp Anda! Kami telah mengirimkan link aktivasi Anda untuk melanjutkan prosesnya.
        </p>

        {/* Resend Timer */}
        <div className="mb-8 text-center">
          <p className="text-sm text-black/70">
            <span className="font-medium">Tidak menerima pesan?</span>{" "}
            {countdown > 0 ? (
              <button disabled className="text-black/40 cursor-not-allowed">
                Ulangi
              </button>
            ) : (
              <button
                onClick={handleResend}
                className="text-primary font-semibold hover:underline"
              >
                Ulangi
              </button>
            )}
          </p>
          {countdown > 0 && (
            <p className="text-xs text-primary font-mono mt-1">
              00:{countdown.toString().padStart(2, "0")}
            </p>
          )}
        </div>

        {/* CTA Button */}
        <Button size="lg" fullWidth onClick={handleActivationClick}>
          Klik Link Aktivasi
        </Button>
      </div>
    </main>
  )
}