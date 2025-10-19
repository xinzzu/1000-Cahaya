"use client";

import Image from "next/image";

type Props = {
  orgName: string;
  email: string;
  joinedAt?: string; // "Bergabung Okt 2025"
};

export default function OrgProfileHeader({ orgName, email, joinedAt }: Props) {
  return (
    <section
      className="rounded-2xl p-4 text-white"
      style={{ backgroundColor: "var(--color-primary)" }}
      aria-label="Informasi Lembaga"
    >
      <div className="flex items-center gap-4">
        <div className="grid h-14 w-14 place-items-center rounded-xl bg-white/20">
          {/* PNG ikon dari desain */}
          <Image
            src="/images/lembaga/profile/building.svg"
            alt="Ikon Lembaga"
            width={40}
            height={40}
            className="h-10 w-10"
            priority
          />
        </div>
        <div className="min-w-0">
          <h2 className="truncate text-lg font-semibold">{orgName}</h2>
          <p className="truncate text-sm/5">{email}</p>
          {joinedAt && (
            <span className="mt-1 inline-block rounded-full bg-white/20 px-2 py-0.5 text-xs">
              {joinedAt}
            </span>
          )}
        </div>
      </div>
    </section>
  );
}
