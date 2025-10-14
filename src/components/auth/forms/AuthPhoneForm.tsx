"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import Button from "@/components/ui/Button";
import PhoneInput from "@/components/ui/PhoneInput";
import Divider from "@/components/ui/Divider";
import AuthLayout from "@/components/auth/AuthLayout";

export type AuthMode = "login" | "register";

type Props = {
  mode: AuthMode;
  defaultType?: "individu" | "lembaga";
};

function toE164FromLocal62(localDigits: string) {
  const trimmed = localDigits.replace(/\D/g, "").replace(/^0+/, "");
  return `+62${trimmed}`;
}

export default function AuthPhoneForm({ mode, defaultType = "individu" }: Props) {
  const router = useRouter();
  const [phone, setPhone] = useState(""); // digit only
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const canSubmit = useMemo(() => phone.length >= 9, [phone]);

  const title = mode === "login" ? "Masuk" : "Daftar";
  const subtitle =
    mode === "login"
      ? "Nomor WhatsApp kamu dipakai untuk verifikasi dan masuk ke akun."
      : "Buat akun baru dengan nomor WhatsApp atau Google.";

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!canSubmit) {
      setError("Nomor WhatsApp minimal 9 digit");
      return;
    }

    setLoading(true);
    const e164 = toE164FromLocal62(phone);

    // 👉 Arahkan ke halaman OTP/aktivasi
    // bawa mode (login/register), phone (E.164), dan type (untuk register)
    const q = new URLSearchParams({
      mode,
      phone: e164,
      ...(mode === "register" ? { type: defaultType } : {}),
    }).toString();

    // (Simulasi call OTP → redirect)
    setTimeout(() => {
      router.push(`/activate?${q}`);
      setLoading(false);
    }, 400);
  }

  function onGoogle() {
    // Kalau pakai Google juga lewati ke activate untuk konsistensi UX (opsional)
    const q = new URLSearchParams({
      mode,
      phone: "", // tidak perlu nomor
      ...(mode === "register" ? { type: defaultType } : {}),
      provider: "google",
    }).toString();
    router.push(`/activate?${q}`);
  }

  return (
    <AuthLayout title={title} subtitle={subtitle}>
      <form onSubmit={onSubmit} className="space-y-6">
        <PhoneInput
          id="phone"
          label="Nomor WhatsApp"
          placeholder="81xxxx"
          value={phone}
          onValueChange={(v) => {
            setPhone(v);
            if (error) setError("");
          }}
          error={error}
          required
          maxLength={13}
          autoComplete="tel"
          autoFocus
        />

        <Button type="submit" size="lg" fullWidth disabled={!canSubmit || loading}>
          {loading ? "Memproses..." : title}
        </Button>
      </form>

      <Divider />

      <Button variant="outline" size="lg" fullWidth onClick={onGoogle}>
        <div className="flex items-center justify-center gap-3">
          {/* ikon Google svg disingkat */}
          <svg width="20" height="20" viewBox="0 0 48 48" aria-hidden>
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
          </svg>
          <span>{title} dengan Google</span>
        </div>
      </Button>
    </AuthLayout>
  );
}
