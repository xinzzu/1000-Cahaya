"use client"

import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import Link from "next/link"
import Button from "@/components/ui/Button"
import TextField from "@/components/ui/TextField"
import PasswordInput from "@/components/ui/PasswordInput"
import InstitutionAuthLayout from "@/components/auth/shared/InstitutionAuthLayout"
import { AUTH_ROUTES } from "@/config/routes"

/**
 * Login form for Institution users (Email/Password based)
 */
export default function LoginFormInstitution() {
  const router = useRouter()

  const [mounted, setMounted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const [errors, setErrors] = useState({
    email: "",
    password: "",
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
    const newErrors = { email: "", password: "" }

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

    setErrors(newErrors)
    return !Object.values(newErrors).some((error) => error !== "")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      console.log("Institution Login:", formData)
      router.push(`${AUTH_ROUTES.activate}?email=${formData.email}&type=institution`)
      setIsLoading(false)
    }, 1000)
  }

  const isFormValid = formData.email.trim() && formData.password.length >= 6

  if (!mounted) return null

  return (
    <InstitutionAuthLayout title="Masuk" subtitle="Selamat datang kembali!">
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

        <div>
          <PasswordInput
            id="password"
            label="Password"
            placeholder="Masukkan password"
            value={formData.password}
            onChange={(e) => handleChange("password", e.target.value)}
            error={errors.password}
            required
            autoComplete="current-password"
          />
          <div className="mt-2 text-right">
            <Link
              href={AUTH_ROUTES.forgotPassword}
              className="text-sm text-primary font-semibold hover:underline"
            >
              Lupa password?
            </Link>
          </div>
        </div>

        <Button type="submit" size="lg" fullWidth disabled={!isFormValid || isLoading}>
          {isLoading ? "Memproses..." : "Masuk"}
        </Button>
      </form>
    </InstitutionAuthLayout>
  )
}