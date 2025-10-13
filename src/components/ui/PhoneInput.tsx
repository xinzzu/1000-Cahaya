import { ComponentPropsWithoutRef, forwardRef } from "react"

interface PhoneInputProps extends Omit<ComponentPropsWithoutRef<"input">, "type"> {
  label?: string
  error?: string
}

const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ label, error, className = "", ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={props.id} className="block text-sm font-medium mb-2 text-black">
            {label}
          </label>
        )}
        <div
          className={[
            "flex items-center gap-2 border rounded-xl px-4 py-3 transition-all",
            error
              ? "border-red-500 focus-within:ring-2 focus-within:ring-red-500/30"
              : "border-black/15 focus-within:ring-2 focus-within:ring-primary/30 focus-within:border-primary",
            className,
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <span className="text-black/60 font-medium select-none">+62</span>
          <input
            ref={ref}
            type="tel"
            className="flex-1 outline-none bg-transparent text-black placeholder:text-black/40"
            {...props}
          />
        </div>
        {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
      </div>
    )
  }
)

PhoneInput.displayName = "PhoneInput"

export default PhoneInput