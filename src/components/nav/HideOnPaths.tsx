"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

type Props = {
  paths: string[];
  children: ReactNode;
};

export default function HideOnPaths({ paths, children }: Props) {
  const pathname = usePathname();

  // Jika path saat ini ada di dalam daftar 'paths', jangan render apa pun.
  if (paths.includes(pathname)) {
    return null;
  }

  // Jika tidak, render komponen 'children'-nya.
  return <>{children}</>;
}