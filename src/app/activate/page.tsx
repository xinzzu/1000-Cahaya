"use client";

import { Suspense } from "react";
import ActivationContent from "@/components/auth/shared/ActivationContent";

export default function ActivatePage() {
  return (
    <Suspense fallback={<ActivateSkeleton />}>
      <ActivationContent />
    </Suspense>
  );
}

function ActivateSkeleton() {
  return (
    <main className="min-h-dvh bg-white px-5 py-8">
      <div className="mx-auto w-full max-w-sm">
        <div className="h-6 w-40 rounded bg-gray-100 animate-pulse mb-6" />
        <div className="space-y-3">
          <div className="h-12 rounded-xl bg-gray-100 animate-pulse" />
          <div className="h-12 rounded-xl bg-gray-100 animate-pulse" />
        </div>
      </div>
    </main>
  );
}
