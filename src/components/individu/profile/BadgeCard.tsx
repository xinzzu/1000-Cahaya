"use client";

import Image from "next/image";

type Props = {
  iconSrc: string; // PNG
  title: string;
  desc: string;
};

export default function BadgeCard({ iconSrc, title, desc }: Props) {
  return (
    <div
      className="rounded-2xl border bg-backgroundCard px-4 py-4" 
      style={{ borderColor: "var(--color-primary)" }}
    >
      {/* Container untuk ikon */}
      <div className="mb-4">
        <div className="grid h-12 w-12 place-items-center rounded-full">
          <Image src={iconSrc} alt="" width={50} height={50} />
        </div>
      </div>

      {/* Konten teks rata kiri */}
      <div className="text-left">
        <div className="font-semibold text-[14px]">{title}</div>
        <p className="mt-1 text-[12px] text-black/50">{desc}</p>
      </div>
    </div>
  );
}
