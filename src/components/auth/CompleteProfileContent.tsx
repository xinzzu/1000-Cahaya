"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";
import TextField from "@/components/ui/TextField";
import Select from "@/components/ui/Select";

// === Tipe Data untuk State & Mode ===
type Mode = "individu" | "lembaga";

type IndividuData = {
  namaLengkap: string;
  jenisKelamin: string;
  provinsi: string;
  kabupaten: string;
  kecamatan: string;
  kelurahan: string;
};

type LembagaData = {
  namaLembaga: string;
  jenisLembaga: string;
  provinsi: string;
  kabupaten: string;
  kecamatan: string;
  kelurahan: string;
};

// === Mock data (ganti dengan API) ===
const JENIS_KELAMIN = [
  { value: "laki-laki", label: "Laki-laki" },
  { value: "perempuan", label: "Perempuan" },
];

const JENIS_LEMBAGA = [
  { value: "sekolah", label: "Sekolah" },
  { value: "kampus", label: "Kampus" },
  { value: "perusahaan", label: "Perusahaan" },
  { value: "organisasi", label: "Organisasi" },
];

const PROVINSI = [
  { value: "yogyakarta", label: "Daerah Istimewa Yogyakarta" },
  { value: "jawa-tengah", label: "Jawa Tengah" },
  { value: "jawa-timur", label: "Jawa Timur" },
  { value: "jawa-barat", label: "Jawa Barat" },
];

const KABUPATEN = [
  { value: "bantul", label: "Kabupaten Bantul" },
  { value: "sleman", label: "Kabupaten Sleman" },
  { value: "gunungkidul", label: "Kabupaten Gunungkidul" },
  { value: "kulon-progo", label: "Kabupaten Kulon Progo" },
];

const KECAMATAN = [
  { value: "banguntapan", label: "Banguntapan" },
  { value: "sewon", label: "Sewon" },
  { value: "kasihan", label: "Kasihan" },
  { value: "piyungan", label: "Piyungan" },
];

const KELURAHAN = [
  { value: "tamanan", label: "Tamanan" },
  { value: "jagalan", label: "Jagalan" },
  { value: "potorono", label: "Potorono" },
  { value: "baturetno", label: "Baturetno" },
];

export default function CompleteProfileContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialType = (searchParams?.get("type") as Mode) || "individu";
  const phone = searchParams?.get("phone") || "";

  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<Mode>(initialType);

  const [individu, setIndividu] = useState<IndividuData>({
    namaLengkap: "",
    jenisKelamin: "",
    provinsi: "",
    kabupaten: "",
    kecamatan: "",
    kelurahan: "",
  });

  const [lembaga, setLembaga] = useState<LembagaData>({
    namaLembaga: "",
    jenisLembaga: "",
    provinsi: "",
    kabupaten: "",
    kecamatan: "",
    kelurahan: "",
  });

  const [errorsInd, setErrorsInd] = useState<Partial<IndividuData>>({});
  const [errorsOrg, setErrorsOrg] = useState<Partial<LembagaData>>({});

  useEffect(() => setMounted(true), []);

  function setField(
    field: keyof IndividuData | keyof LembagaData,
    value: string
  ) {
    if (mode === "individu") {
      const fieldName = field as keyof IndividuData;
      setIndividu((p) => ({ ...p, [fieldName]: value }));
      if (errorsInd[fieldName]) {
        setErrorsInd((e) => ({ ...e, [fieldName]: undefined }));
      }
    } else {
      const fieldName = field as keyof LembagaData;
      setLembaga((p) => ({ ...p, [fieldName]: value }));
      if (errorsOrg[fieldName]) {
        setErrorsOrg((e) => ({ ...e, [fieldName]: undefined }));
      }
    }
  }

  function validate(): boolean {
    if (mode === "individu") {
      const e: Partial<IndividuData> = {};
      if (!individu.namaLengkap.trim())
        e.namaLengkap = "Nama lengkap wajib diisi";
      if (!individu.jenisKelamin)
        e.jenisKelamin = "Jenis kelamin wajib dipilih";
      if (!individu.provinsi) e.provinsi = "Provinsi wajib dipilih";
      if (!individu.kabupaten) e.kabupaten = "Kabupaten/Kota wajib dipilih";
      if (!individu.kecamatan) e.kecamatan = "Kecamatan wajib dipilih";
      if (!individu.kelurahan) e.kelurahan = "Kelurahan wajib dipilih";
      setErrorsInd(e);
      return Object.keys(e).length === 0;
    } else {
      const e: Partial<LembagaData> = {};
      if (!lembaga.namaLembaga.trim())
        e.namaLembaga = "Nama lembaga wajib diisi";
      if (!lembaga.jenisLembaga) e.jenisLembaga = "Jenis lembaga wajib dipilih";
      if (!lembaga.provinsi) e.provinsi = "Provinsi wajib dipilih";
      if (!lembaga.kabupaten) e.kabupaten = "Kabupaten/Kota wajib dipilih";
      if (!lembaga.kecamatan) e.kecamatan = "Kecamatan wajib dipilih";
      if (!lembaga.kelurahan) e.kelurahan = "Kelurahan wajib dipilih";
      setErrorsOrg(e);
      return Object.keys(e).length === 0;
    }
  }

  const isFormValid = useMemo(() => {
    if (mode === "individu") {
      const v = individu;
      return !!(
        v.namaLengkap.trim() &&
        v.jenisKelamin &&
        v.provinsi &&
        v.kabupaten &&
        v.kecamatan &&
        v.kelurahan
      );
    }
    const v = lembaga;
    return !!(
      v.namaLembaga.trim() &&
      v.jenisLembaga &&
      v.provinsi &&
      v.kabupaten &&
      v.kecamatan &&
      v.kelurahan
    );
  }, [mode, individu, lembaga]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);

    // simulasi kirim ke API
    setTimeout(() => {
      const payload =
        mode === "individu"
          ? { type: "individu", phone, ...individu }
          : { type: "lembaga", phone, ...lembaga };

      console.log("Complete profile payload:", payload);

      // ✅ PERUBAHAN UTAMA: Arahkan ke satu halaman onboarding dengan query param
      router.push(`/onboarding?type=${mode}`);
      
      setIsLoading(false);
    }, 900);
  }

  if (!mounted) {
    // skeleton
    return (
      <main className="min-h-dvh bg-white px-5 py-8">
        <div className="mx-auto w-full max-w-sm">
          <div className="mb-8 h-8 w-40 animate-pulse rounded bg-gray-100" />
          <div className="space-y-6">
            {Array.from({ length: 7 }).map((_, i) => (
              <div
                key={i}
                className="h-[72px] animate-pulse rounded-xl bg-gray-100"
              />
            ))}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-dvh bg-white text-black px-5 py-8">
      <div className="mx-auto w-full max-w-sm">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Lengkapi Data Anda</h1>
          <div className="h-14 w-14">
            <Image
              src="/logo-1000-cahaya.svg"
              alt="1000 Cahaya"
              width={56}
              height={56}
              className="h-full w-full"
              priority
            />
          </div>
        </div>

        {/* Toggle Individu/Lembaga */}
        <div className="rounded-2xl bg-[#EFEFEF] p-1">
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setMode("individu")}
              className={[
                "h-10 rounded-xl text-sm font-medium transition",
                mode === "individu"
                  ? "bg-white text-[color:var(--color-primary)] shadow"
                  : "text-[#727272]",
              ].join(" ")}
            >
              Individu
            </button>
            <button
              type="button"
              onClick={() => setMode("lembaga")}
              className={[
                "h-10 rounded-xl text-sm font-medium transition",
                mode === "lembaga"
                  ? "bg-white text-[color:var(--color-primary)] shadow"
                  : "text-[#727272]",
              ].join(" ")}
            >
              Lembaga
            </button>
          </div>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          {mode === "individu" ? (
            <>
              <TextField
                id="namaLengkap"
                label="Nama Lengkap"
                placeholder="Masukkan Nama Lengkap"
                value={individu.namaLengkap}
                onChange={(e) => setField("namaLengkap", e.target.value)}
                error={errorsInd.namaLengkap}
                required
              />
              <Select
                id="jenisKelamin"
                label="Jenis Kelamin"
                placeholder="Pilih jenis kelamin"
                options={JENIS_KELAMIN}
                value={individu.jenisKelamin}
                onChange={(e) => setField("jenisKelamin", e.target.value)}
                error={errorsInd.jenisKelamin}
                required
              />
              <Select
                id="provinsi"
                label="Provinsi"
                placeholder="Pilih provinsi"
                options={PROVINSI}
                value={individu.provinsi}
                onChange={(e) => setField("provinsi", e.target.value)}
                error={errorsInd.provinsi}
                required
              />
              <Select
                id="kabupaten"
                label="Kabupaten/Kota"
                placeholder="Pilih kabupaten/kota"
                options={KABUPATEN}
                value={individu.kabupaten}
                onChange={(e) => setField("kabupaten", e.target.value)}
                error={errorsInd.kabupaten}
                required
              />
              <Select
                id="kecamatan"
                label="Kecamatan"
                placeholder="Pilih kecamatan"
                options={KECAMATAN}
                value={individu.kecamatan}
                onChange={(e) => setField("kecamatan", e.target.value)}
                error={errorsInd.kecamatan}
                required
              />
              <Select
                id="kelurahan"
                label="Kelurahan"
                placeholder="Pilih kelurahan"
                options={KELURAHAN}
                value={individu.kelurahan}
                onChange={(e) => setField("kelurahan", e.target.value)}
                error={errorsInd.kelurahan}
                required
              />
            </>
          ) : (
            <>
              <TextField
                id="namaLembaga"
                label="Nama Lembaga"
                placeholder="Masukkan Nama Lembaga"
                value={lembaga.namaLembaga}
                onChange={(e) => setField("namaLembaga", e.target.value)}
                error={errorsOrg.namaLembaga}
                required
              />
              <Select
                id="jenisLembaga"
                label="Jenis Lembaga"
                placeholder="Pilih jenis lembaga"
                options={JENIS_LEMBAGA}
                value={lembaga.jenisLembaga}
                onChange={(e) => setField("jenisLembaga", e.target.value)}
                error={errorsOrg.jenisLembaga}
                required
              />
              <Select
                id="provinsiOrg"
                label="Provinsi"
                placeholder="Pilih provinsi"
                options={PROVINSI}
                value={lembaga.provinsi}
                onChange={(e) => setField("provinsi", e.target.value)}
                error={errorsOrg.provinsi}
                required
              />
              <Select
                id="kabupatenOrg"
                label="Kabupaten/Kota"
                placeholder="Pilih kabupaten/kota"
                options={KABUPATEN}
                value={lembaga.kabupaten}
                onChange={(e) => setField("kabupaten", e.target.value)}
                error={errorsOrg.kabupaten}
                required
              />
              <Select
                id="kecamatanOrg"
                label="Kecamatan"
                placeholder="Pilih kecamatan"
                options={KECAMATAN}
                value={lembaga.kecamatan}
                onChange={(e) => setField("kecamatan", e.target.value)}
                error={errorsOrg.kecamatan}
                required
              />
              <Select
                id="kelurahanOrg"
                label="Kelurahan"
                placeholder="Pilih kelurahan"
                options={KELURAHAN}
                value={lembaga.kelurahan}
                onChange={(e) => setField("kelurahan", e.target.value)}
                error={errorsOrg.kelurahan}
                required
              />
            </>
          )}

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
  );
}