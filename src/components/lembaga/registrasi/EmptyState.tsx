"use client";
import Image from "next/image";

export default function EmptyState({
  icon, text
}: { icon: string; text: string }) {
  return (
    <div className="grid place-items-center py-8 text-black/50">
      <Image src={icon} alt="" width={44} height={44}/>
      <p className="mt-2 text-sm">{text}</p>
    </div>
  );
}
