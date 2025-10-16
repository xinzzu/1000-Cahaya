"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import Button from "@/components/ui/Button"

// Rute tujuan untuk pengguna lembaga
const NEXT_ROUTE = "/lembaga/register-aset";

export default function OnboardingLembaga() {
  const router = useRouter()

  return (
    <main className="min-h-dvh grid place-items-center bg-white text-black px-5">
      <section className="w-full max-w-sm text-center">
        <h1 className="text-[26px] leading-snug font-semibold whitespace-pre-line">
          {"Selamat Datang, Lembaga Peduli Bumi!"}
        </h1>

        <p className="mt-3 text-sm text-black/70 whitespace-pre-line">
          {"Langkah pertama adalah mendaftarkan aset Anda.\n" +
           "Ini akan menjadi dasar untuk menghitung\n" +
           "jejak karbon lembaga Anda."}
        </p>
            
        <div className="mt-8 mb-10">
          <Image
            src="/onboarding.svg" // Anda bisa menggunakan gambar yang sama atau berbeda
            alt=""
            width={360}
            height={220}
            className="mx-auto h-auto w-full max-w-[360px]"
            priority
          />
        </div>

        <Button
          size="lg"
          className="w-full sm:h-10"
          onClick={() => router.push(NEXT_ROUTE)}
        >
          Mulai Daftarkan Aset
        </Button>
      </section>
    </main>
  )
}
