"use client"

import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import Button from "@/components/ui/Button"
import TextField from "@/components/ui/TextField"
import PasswordInput from "@/components/ui/PasswordInput"
import InstitutionAuthLayout from "@/components/auth/shared/InstitutionAuthLayout"
import { AUTH_ROUTES } from "@/config/routes"

/**
 * Register form for Institution users (Email/Password based)
 */
export default function RegisterFormInstitution() {
  const router = useRouter()

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
    if (!validateForm()) return

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      console.log("Institution Register:", { email: formData.email })
      router.push(
        `${AUTH_ROUTES.activate}?email=${formData.email}&type=institution&action=register`
      )
      setIsLoading(false)
    }, 1000)
  }

  const isFormValid =
    formData.email.trim() &&
    formData.password.length >= 6 &&
    formData.confirmPassword === formData.password

  if (!mounted) return null

  return (
    <InstitutionAuthLayout title="Daftar" subtitle="Selamat datang!">
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

        <PasswordInput
          id="confirmPassword"
          label="Konfirmasi Password"
          placeholder="Masukkan konfirmasi password"
          value={formData.confirmPassword}
          onChange={(e) => handleChange("confirmPassword", e.target.value)}
          error={errors.confirmPassword}
          required
          autoComplete="new-password"
        />

        <Button type="submit" size="lg" fullWidth disabled={!isFormValid || isLoading}>
          {isLoading ? "Memproses..." : "Daftar"}
        </Button>
      </form>
    </InstitutionAuthLayout>
  )
}