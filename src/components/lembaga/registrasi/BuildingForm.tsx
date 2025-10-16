"use client";
import { useState } from "react";
import Button from "@/components/ui/Button";
import TextField from "@/components/ui/TextField";

export default function BuildingForm({
  onSave, onCancel
}: {
  onSave: (name: string, area?: number) => void;
  onCancel: () => void;
}) {
  const [name, setName] = useState("");
  const [area, setArea] = useState<string>("");

  const canSubmit = name.trim().length > 0;

  return (
    <div
      className="mt-3 rounded-2xl border p-3"
      style={{ borderColor: "var(--color-primary)" }}
    >
      <div className="font-semibold mb-2">Form Bangunan Baru</div>
      <div className="space-y-3">
        <TextField
          id="bname"
          label="Nama Bangunan"
          placeholder="Contoh: Bangunan Utama"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          id="barea"
          label="Luas Bangunan (m²) (Opsional)"
          placeholder="Contoh: 1500"
          inputMode="numeric"
          value={area}
          onChange={(e) => setArea(e.target.value.replace(/\D/g, ""))}
        />
        <div className="flex gap-2">
          <Button
            className="flex-1"
            disabled={!canSubmit}
            onClick={() => onSave(name.trim(), area ? Number(area) : undefined)}
          >
            Simpan Bangunan
          </Button>
          <Button variant="outline" className="w-24" onClick={onCancel}>
            Batal
          </Button>
        </div>
      </div>
    </div>
  );
}
