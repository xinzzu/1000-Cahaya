"use client";

import { ComponentPropsWithoutRef } from "react";

type RadioOptionProps = {
  checked?: boolean;
  label: string;
  onChange?: () => void;
} & Omit<ComponentPropsWithoutRef<"button">, "onChange">;

export function RadioOption({ checked, label, onChange, ...rest }: RadioOptionProps) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={[
        "flex w-full items-center gap-3 rounded-xl p-3 text-left",
        "transition-colors",
      
      ].join(" ")}
      {...rest}
    >
      {/* bullet */}
      <span
        className={[
          "grid h-5 w-5 place-items-center rounded-full border",
          checked
            ? "border-[color:var(--color-primary)]"
            : "border-black/30",
        ].join(" ")}
        aria-hidden
      >
        <span
          className={[
            "h-2.5 w-2.5 rounded-full",
            checked ? "bg-[color:var(--color-primary)]" : "bg-transparent",
          ].join(" ")}
        />
      </span>

      <span className="text-[15px]">{label}</span>
    </button>
  );
}
