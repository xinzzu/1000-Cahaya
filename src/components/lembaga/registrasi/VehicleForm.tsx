"use client";
import { useState } from "react";
import Button from "@/components/ui/Button";
import TextField from "@/components/ui/TextField";
import Select from "@/components/ui/Select";
import { VEHICLE_TYPES, FUEL_TYPES } from "./constants";

export default function VehicleForm({
  onSave, onCancel
}: {
  onSave: (name: string, vehicleType?: string, fuelType?: string) => void;
  onCancel: () => void;
}) {
  const [name, setName] = useState("");
  const [vtype, setVtype] = useState("");
  const [fuel, setFuel] = useState("");

  const canSubmit = !!name.trim();

  return (
    <div
      className="mt-3 rounded-2xl border p-3"
      style={{ borderColor: "var(--color-primary)" }}
    >
      <div className="font-semibold mb-2">Form Kendaraan Baru</div>
      <div className="space-y-3">
        <TextField
          id="vname"
          label="Nama/Identitas Kendaraan"
          placeholder="Contoh: Mobil Avanza 1"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Select
          id="vtype"
          label="Jenis Kendaraan"
          placeholder="Pilih jenis kendaraan"
          options={VEHICLE_TYPES.map(v => ({ value: v, label: v }))}
          value={vtype}
          onChange={(e) => setVtype(e.target.value)}
        />
        <Select
          id="fuel"
          label="Jenis Bahan Bakar"
          placeholder="Pilih jenis bahan bakar"
          options={FUEL_TYPES.map(v => ({ value: v, label: v }))}
          value={fuel}
          onChange={(e) => setFuel(e.target.value)}
        />
        <div className="flex gap-2">
          <Button
            className="flex-1"
            disabled={!canSubmit}
            onClick={() => onSave(name.trim(), vtype || undefined, fuel || undefined)}
          >
            Simpan Kendaraan
          </Button>
          <Button variant="outline" className="w-24" onClick={onCancel}>
            Batal
          </Button>
        </div>
      </div>
    </div>
  );
}
