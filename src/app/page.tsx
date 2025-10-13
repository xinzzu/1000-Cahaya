"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Button from "@/components/ui/Button";
import InstallPrompt from "@/components/InstallPrompt";
import LoginTypeModal from "@/components/LoginTypeModal";
import RegisterTypeModal from "@/components/RegisterTypeModal";

export default function WelcomePage() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  return (
    <>
      <main className="min-h-dvh grid place-items-center bg-white text-black px-5">
        <section className="w-full max-w-sm text-center">
          {/* Headings */}
          <h1 className="text-[26px] leading-snug font-semibold">
            Ukur Dampakmu
            <br />Ciptakan Perubahan
          </h1>
          <p className="mt-2 text-sm text-black/70">
            Platform jejak karbon untuk personal dan organisasi
          </p>

          {/* Illustration */}
          <div className="mt-8 mb-10">
            <Image
              src="/carbon-illustration.png"
              alt="Ilustrasi energi hijau dan jejak karbon"
              width={360}
              height={260}
              className="mx-auto h-auto w-full max-w-[360px]"
              priority
            />
          </div>

          {/* Actions - VERTIKAL (ATAS BAWAH) */}
          <div className="space-y-3">
            {/* Masuk Button */}
            <Button
              size="lg"
              className="w-full h-12"
              onClick={() => setIsLoginModalOpen(true)}
            >
              Masuk
            </Button>

            {/* Daftar Button */}
            <Button
              variant="outline"
              size="lg"
              className="w-full h-12 border-primary text-primary hover:bg-primary/5 focus:ring-primary/30"
              onClick={() => setIsRegisterModalOpen(true)}
            >
              Belum ada akun? Daftar dulu
            </Button>
          </div>

          {/* Terms */}
          <p className="mt-6 text-xs text-black/60">
            Dengan masuk atau mendaftar, kamu menyetujui{" "}
            <Link
              href="/terms"
              className="font-semibold text-primary hover:underline"
            >
              Syarat &amp; Ketentuan
            </Link>{" "}
            dan{" "}
            <Link
              href="/privacy"
              className="font-semibold text-primary hover:underline"
            >
              Kebijakan Privasi
            </Link>{" "}
            yang berlaku.
          </p>
        </section>
      </main>

      {/* Install Prompt */}
      <InstallPrompt />

      {/* Modals */}
      <LoginTypeModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
      <RegisterTypeModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
      />
    </>
  );
}
