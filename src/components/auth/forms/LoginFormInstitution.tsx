"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"
import Image from "next/image"
import Button from "@/components/ui/Button"
import TextField from "@/components/ui/TextField"
import PasswordInput from "@/components/ui/PasswordInput"

export default function InstitutionRegisterContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const type = searchParams?.get("type") || "lembaga"

  const [mounted, setMounted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors = {
      email: "",
      password: "",
      confirmPassword: "",
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email wajib diisi"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Format email tidak valid"
    }

    if (!formData.password) {
      newErrors.password = "Password wajib diisi"
    } else if (formData.password.length < 6) {
      newErrors.password = "Password minimal 6 karakter"
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Konfirmasi password wajib diisi"
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Password tidak cocok"
    }

    setErrors(newErrors)
    return !Object.values(newErrors).some((error) => error !== "")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    setTimeout(() => {
      console.log("Institution Register:", { email: formData.email, type })
      router.push(`/activate?email=${formData.email}&type=${type}&action=register`)
      setIsLoading(false)
    }, 1000)
  }

  const isFormValid =
    formData.email.trim() &&
    formData.password.length >= 6 &&
    formData.confirmPassword === formData.password

  if (!mounted) {
    return null
  }

  return (
    <main className="min-h-dvh bg-white text-black px-5 py-8" suppressHydrationWarning>
      <div className="w-full max-w-sm mx-auto">
        <button
          onClick={() => router.back()}
          className="mb-8 p-2 -ml-2 hover:bg-black/5 rounded-lg transition-colors active:scale-95"
          aria-label="Kembali"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-semibold">Masuk</h1>
          <div className="w-16 h-16 flex-shrink-0">
            <Image
              src="/logo-1000-cahaya.svg"
              alt="1000 Cahaya"
              width={64}
              height={64}
              className="w-full h-full"
              priority
            />
          </div>
        </div>
        <p className="text-sm text-black/70 mb-8">Selamat datang kembali!</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <TextField
            id="email"
            type="email"
            label="Email Kerja/Lembaga"
            placeholder="Masukkan email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            error={errors.email}
            required
            autoComplete="email"
            autoFocus
          />

          <PasswordInput
            id="password"
            label="Password"
            placeholder="Masukkan password"
            value={formData.password}
            onChange={(e) => handleChange("password", e.target.value)}
            error={errors.password}
            required
            autoComplete="new-password"
          />
          <Button
            type="submit"
            size="lg"
            fullWidth
            disabled={!isFormValid || isLoading}
          >
            {isLoading ? "Memproses..." : "Daftar"}
          </Button>
        </form>
      </div>
    </main>
  )
}