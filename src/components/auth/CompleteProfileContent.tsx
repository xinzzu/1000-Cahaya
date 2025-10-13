"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"
import Image from "next/image"
import Button from "@/components/ui/Button"
import TextField from "@/components/ui/TextField"
import Select from "@/components/ui/Select"

// Mock data - ganti dengan data dari API
const JENIS_KELAMIN = [
  { value: "laki-laki", label: "Laki-laki" },
  { value: "perempuan", label: "Perempuan" },
]

const PROVINSI = [
  { value: "yogyakarta", label: "Daerah Istimewa Yogyakarta" },
  { value: "jawa-tengah", label: "Jawa Tengah" },
  { value: "jawa-timur", label: "Jawa Timur" },
  { value: "jawa-barat", label: "Jawa Barat" },
]

const KABUPATEN = [
  { value: "bantul", label: "Kabupaten Bantul" },
  { value: "sleman", label: "Kabupaten Sleman" },
  { value: "gunungkidul", label: "Kabupaten Gunungkidul" },
  { value: "kulon-progo", label: "Kabupaten Kulon Progo" },
]

const KECAMATAN = [
  { value: "banguntapan", label: "Banguntapan" },
  { value: "sewon", label: "Sewon" },
  { value: "kasihan", label: "Kasihan" },
  { value: "piyungan", label: "Piyungan" },
]

const KELURAHAN = [
  { value: "tamanan", label: "Tamanan" },
  { value: "jagalan", label: "Jagalan" },
  { value: "potorono", label: "Potorono" },
  { value: "baturetno", label: "Baturetno" },
]

export default function CompleteProfileContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  // ✅ FIX: Definisikan type dengan null safety
  const type = searchParams?.get("type") || "individu"
  const phone = searchParams?.get("phone") || ""

  const [mounted, setMounted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    namaLengkap: "",
    jenisKelamin: "",
    provinsi: "",
    kabupaten: "",
    kecamatan: "",
    kelurahan: "",
  })

  const [errors, setErrors] = useState({
    namaLengkap: "",
    jenisKelamin: "",
    provinsi: "",
    kabupaten: "",
    kecamatan: "",
    kelurahan: "",
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error saat user mulai input
    if (errors[field as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors = {
      namaLengkap: "",
      jenisKelamin: "",
      provinsi: "",
      kabupaten: "",
      kecamatan: "",
      kelurahan: "",
    }

    if (!formData.namaLengkap.trim()) {
      newErrors.namaLengkap = "Nama lengkap wajib diisi"
    }
    if (!formData.jenisKelamin) {
      newErrors.jenisKelamin = "Jenis kelamin wajib dipilih"
    }
    if (!formData.provinsi) {
      newErrors.provinsi = "Provinsi wajib dipilih"
    }
    if (!formData.kabupaten) {
      newErrors.kabupaten = "Kabupaten/Kota wajib dipilih"
    }
    if (!formData.kecamatan) {
      newErrors.kecamatan = "Kecamatan wajib dipilih"
    }
    if (!formData.kelurahan) {
      newErrors.kelurahan = "Kelurahan wajib dipilih"
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

    // Simulate API call
    setTimeout(() => {
      console.log("Form submitted:", { ...formData, type, phone })
      // TODO: Navigate to dashboard or next page
      router.push("/dashboard")
      setIsLoading(false)
    }, 1000)
  }

  const isFormValid =
    formData.namaLengkap.trim() &&
    formData.jenisKelamin &&
    formData.provinsi &&
    formData.kabupaten &&
    formData.kecamatan &&
    formData.kelurahan

  if (!mounted) {
    return (
      <main className="min-h-dvh bg-white px-5 py-8">
        <div className="w-full max-w-sm mx-auto">
          <div className="h-8 w-32 bg-gray-100 rounded animate-pulse mb-8" />
          <div className="space-y-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-[72px] bg-gray-100 rounded-xl animate-pulse" />
            ))}
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-dvh bg-white text-black px-5 py-8" suppressHydrationWarning>
      <div className="w-full max-w-sm mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-semibold">Lengkapi Data Anda</h1>
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

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nama Lengkap */}
          <TextField
            id="namaLengkap"
            label="Nama Lengkap"
            placeholder="Masukkan Nama Lengkap"
            value={formData.namaLengkap}
            onChange={(e) => handleChange("namaLengkap", e.target.value)}
            error={errors.namaLengkap}
            required
          />

          {/* Jenis Kelamin */}
          <Select
            id="jenisKelamin"
            label="Jenis Kelamin"
            placeholder="Pilih jenis kelamin"
            options={JENIS_KELAMIN}
            value={formData.jenisKelamin}
            onChange={(e) => handleChange("jenisKelamin", e.target.value)}
            error={errors.jenisKelamin}
            required
          />

          {/* Provinsi */}
          <Select
            id="provinsi"
            label="Provinsi"
            placeholder="Pilih provinsi"
            options={PROVINSI}
            value={formData.provinsi}
            onChange={(e) => handleChange("provinsi", e.target.value)}
            error={errors.provinsi}
            required
          />

          {/* Kabupaten/Kota */}
          <Select
            id="kabupaten"
            label="Kabupaten/Kota"
            placeholder="Pilih kabupaten/kota"
            options={KABUPATEN}
            value={formData.kabupaten}
            onChange={(e) => handleChange("kabupaten", e.target.value)}
            error={errors.kabupaten}
            required
          />

          {/* Kecamatan */}
          <Select
            id="kecamatan"
            label="Kecamatan"
            placeholder="Pilih kecamatan"
            options={KECAMATAN}
            value={formData.kecamatan}
            onChange={(e) => handleChange("kecamatan", e.target.value)}
            error={errors.kecamatan}
            required
          />

          {/* Kelurahan */}
          <Select
            id="kelurahan"
            label="Kelurahan"
            placeholder="Pilih kelurahan"
            options={KELURAHAN}
            value={formData.kelurahan}
            onChange={(e) => handleChange("kelurahan", e.target.value)}
            error={errors.kelurahan}
            required
          />

          {/* Submit Button */}
          <Button
            type="submit"
            size="lg"
            fullWidth
            disabled={!isFormValid || isLoading}
          >
            {isLoading ? "Menyimpan..." : "Simpan"}
          </Button>
        </form>
      </div>
    </main>
  )
}