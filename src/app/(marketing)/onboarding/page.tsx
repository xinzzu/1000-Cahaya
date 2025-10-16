"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import OnboardingIndividu from "@/components/onboarding/OnboardingIndividu";
import OnboardingLembaga from "@/components/onboarding/OnboardingLembaga";

// Komponen utama yang akan membaca URL
function OnboardingSwitcher() {
  const searchParams = useSearchParams();
  const userType = searchParams.get("type");

  if (userType === "lembaga") {
    return <OnboardingLembaga />;
  }
  
  // Default ke alur individu jika 'type' tidak ada atau bukan 'lembaga'
  return <OnboardingIndividu />;
}

// Halaman Onboarding
export default function OnboardingPage() {
  return (
    // Suspense diperlukan karena useSearchParams digunakan di Client Component
    <Suspense fallback={<div>Loading...</div>}>
      <OnboardingSwitcher />
    </Suspense>
  );
}
