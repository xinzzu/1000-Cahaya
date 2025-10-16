"use client";

import Image from "next/image";

export default function AssetItem({
  title,
  subtitle,
  onDelete,
}: {
  title: string;
  subtitle?: string;
  onDelete?: () => void;
}) {
  return (
    <div
      className="flex items-center justify-between rounded-xl border p-3 bg-white shadow-sm"
      style={{ borderColor: "var(--color-primary)" }}
    >
      <div className="min-w-0">
        <div className="font-medium truncate">{title}</div>
        {subtitle && <div className="text-sm text-black/60 truncate">{subtitle}</div>}
      </div>
      {onDelete && (
        <button
          type="button"
          onClick={onDelete}
          className="h-8 w-8 grid place-items-center rounded-md text-red-500 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors flex-shrink-0"
          aria-label={`Hapus ${title}`}
          title="Hapus"
        >
          <Image
            src="/icons/lembaga/registrasi/trash.svg"
            alt="Hapus"
            width={18}
            height={18}
          />
        </button>
      )}
    </div>
  );
}
