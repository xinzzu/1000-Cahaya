"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import Button from "@/components/ui/Button"

// Rute tujuan untuk pengguna individu
const NEXT_ROUTE = "/survey/transportasi";

export default function OnboardingIndividu() {
  const router = useRouter()

  return (
    <section className="w-full max-w-sm text-center">
      <h1 className="text-[26px] leading-snug font-semibold whitespace-pre-line">
        {"Setiap Langkahmu\nMeninggalkan Jejak"}
      </h1>

      <p className="mt-3 text-sm text-black/70 whitespace-pre-line">
        {"Yuk, hitung jejak karbonmu dalam satu bulan\n" +
          "dan mulai petualangan untuk menguranginya!\n" +
          "Jawabanmu tidak perlu 100% akurat, cukup perkiraan saja ya!"}
      </p>

      <div className="mt-8 mb-10">
        <Image
          src="/onboarding.svg"
          alt="Ilustrasi jejak karbon"
          width={360}
          height={220}
          className="mx-auto h-auto w-full max-w-[360px]"
          priority
        />
      </div>

      <Button
        size="lg"
        className="w-full"
        onClick={() => router.push(NEXT_ROUTE)}
      >
        Mulai Sekarang!
      </Button>
    </section>
  )
}

