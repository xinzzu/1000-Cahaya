"use client";

import GreetingHeader from "@/components/lembaga/dashboard/GreetingHeader";
import LastReportCard from "@/components/lembaga/dashboard/LastReport";

export default function OrgHomePage() {
  return (
    <main>
      <GreetingHeader />

      <div
        className="mt-4 h-[2px] w-full"
        style={{ backgroundColor: "var(--color-primary)" }}
      />

      <LastReportCard />
    </main>
  );
}
