"use client";

import { useEffect, useMemo, useState } from "react";
import QuestionCard from "@/components/ui/survey/QuestionCard";
import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import ProgressBar from "@/components/ui/survey/ProgressBar";

import { RadioOption } from "@/components/ui/survey/Radio";

/** kunci penyimpanan dummy */
const LS_KEY = "survey.waste.behavior";

/** opsi pertanyaan */
const Q1 = [
  { id: "buang", label: "Dibuang ke tempat sampah umum" },
  { id: "kompos", label: "Diolah menjadi kompos" },
  { id: "ternak", label: "Diberikan ke hewan ternak" },
] as const;

const Q2 = [
  { id: "jarang", label: "Jarang (0–1 kali)" },
  { id: "cukup", label: "Cukup Sering (2–4 kali)" },
  { id: "sering", label: "Sering Banget (>5 kali)" },
] as const;

type Answer = {
  foodWaste: typeof Q1[number]["id"] | null;
  singleUse: typeof Q2[number]["id"] | null;
};

export default function LimbahGayaHidupPage() {
  const router = useRouter();

  const [ans, setAns] = useState<Answer>({ foodWaste: null, singleUse: null });

  // restore dari localStorage (dummy)
  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<Answer>;
        setAns((p) => ({ ...p, ...parsed }));
      }
    } catch {}
  }, []);

  const ready = useMemo(() => !!(ans.foodWaste && ans.singleUse), [ans]);

  function setFoodWaste(v: Answer["foodWaste"]) {
    setAns((p) => ({ ...p, foodWaste: v }));
  }
  function setSingleUse(v: Answer["singleUse"]) {
    setAns((p) => ({ ...p, singleUse: v }));
  }

  function submit() {
    // simpan dummy
    localStorage.setItem(LS_KEY, JSON.stringify(ans));

    // kamu bisa ikutkan kontribusi ke ringkasan:
    // contoh sederhana → store angka ke summary:last
    const summary = {
      // tambahkan bidang lain jika perlu
      lifestyleNote: ans,
    };
    localStorage.setItem("summary:last:lifestyle", JSON.stringify(summary));

    // arahkan ke hasil (atau step berikutnya)
    router.push("/survey/hasil");
  }

  return (
    <main className="min-h-dvh bg-white text-black">
      <ProgressBar total={3} active={2} />
      <div className="mx-auto max-w-sm px-4 pb-28 pt-6">
        {/* judul */}
        <h1 className="text-center text-2xl font-semibold">
          Limbah & Gaya Hidup <span role="img" aria-label="recycle">♻️</span>
        </h1>

        <div className="mt-4 space-y-4">
          <QuestionCard>
            <p className="mb-3 text-[15px] font-medium">
              Sisa makanan di rumahmu paling sering diapakan?
            </p>

            <div className="space-y-2">
              {Q1.map((o) => (
                <RadioOption
                  key={o.id}
                  label={o.label}
                  checked={ans.foodWaste === o.id}
                  onChange={() => setFoodWaste(o.id)}
                />
              ))}
            </div>
          </QuestionCard>

          <QuestionCard>
            <p className="mb-3 text-[15px] font-medium">
              Dalam seminggu, seberapa sering kamu belanja menggunakan kemasan sekali pakai?
            </p>

            <div className="space-y-2">
              {Q2.map((o) => (
                <RadioOption
                  key={o.id}
                  label={o.label}
                  checked={ans.singleUse === o.id}
                  onChange={() => setSingleUse(o.id)}
                />
              ))}
            </div>
          </QuestionCard>
        </div>
      </div>

      {/* CTA fixed bawah */}
      <div className="fixed inset-x-0 bottom-4 z-50 px-4">
        <div className="mx-auto max-w-sm">
          <Button
            type="button"
            size="md"
            className="w-full sm:h-10"
            disabled={!ready}
            onClick={submit}
          >
            Selesai & Lihat hasilnya!
          </Button>
        </div>
      </div>
    </main>
  );
}
