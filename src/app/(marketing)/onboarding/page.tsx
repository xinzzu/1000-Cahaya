import type { Metadata } from "next"
import OnboardingOne from "@/components/onboarding/OnboardingScreen"

export const metadata: Metadata = {
  title: "Onboarding",
  description: "Perkenalan singkat sebelum mulai.",
}

export default function OnboardingPage() {
  return <OnboardingOne />
}
