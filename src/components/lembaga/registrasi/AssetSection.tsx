"use client";
import Image from "next/image";
import type { ReactNode } from "react";

export default function AssetSection({
  icon, title, subtitle,
  children, onAdd
}: {
  icon: string; title: string; subtitle: string;
  children: ReactNode; onAdd?: () => void;
}) {
  return (
    <section
      className="rounded-2xl border p-3"
      style={{ borderColor: "var(--color-primary)" }}
    >
      <div className="flex items-center gap-3">
        <div className="grid h-11 w-11 place-items-center rounded-xl bg-[color:var(--color-secondary)]">
          <Image src={icon} alt="" width={24} height={24} />
        </div>
        <div className="flex-1">
          <div className="font-semibold">{title}</div>
          <div className="text-sm text-black/60">{subtitle}</div>
        </div>
        {onAdd && (
          <button
            onClick={onAdd}
            className="h-9 w-9 grid place-items-center rounded-full bg-[color:var(--color-primary)] text-white"
            aria-label="Tambah"
          >+</button>
        )}
      </div>
      <div className="mt-3">{children}</div>
    </section>
  );
}
    