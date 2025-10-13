import { forwardRef, InputHTMLAttributes, ReactNode, useId } from "react";
import { twMerge } from "tailwind-merge";

export type TextFieldProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size"
> & {
  label?: string;
  helper?: string;
  error?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  /** sm=40px, md=44px, lg=48px */
  fieldSize?: "sm" | "md" | "lg";
  inputClassName?: string;
};

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  function TextField(
    {
      label,
      helper,
      error,
      leftIcon,
      rightIcon,
      className,
      inputClassName,
      fieldSize = "lg",
      id,
      ...props
    },
    ref
  ) {
    const autoId = useId();
    const fieldId = id ?? `tf-${autoId}`;
    const helperId = helper ? `${fieldId}-helper` : undefined;
    const errorId = error ? `${fieldId}-error` : undefined;

    const heights = { sm: "h-10", md: "h-11", lg: "h-12" } as const;

    return (
      <label className="block" htmlFor={fieldId}>
        {label && (
          <span className="mb-1 block text-sm font-medium text-black">
            {label}
          </span>
        )}
        <div
          className={twMerge(
            "flex items-center gap-2 rounded-xl border bg-white px-6",
            "focus-within:ring-2",
            heights[fieldSize],
            className
          )}
          style={{
            borderColor: "var(--color-primary)",
            boxShadow: "0 0 0 0 rgba(0,0,0,0)",
          }}
        >
          {leftIcon && <span className="text-black/50">{leftIcon}</span>}
          <input
            id={fieldId}
            ref={ref}
            className={twMerge(
              "h-full w-full bg-transparent text-sm outline-none placeholder:text-black/40",
              inputClassName
            )}
            aria-invalid={!!error}
            aria-describedby={
              [helperId, errorId].filter(Boolean).join(" ") || undefined
            }
            {...props}
          />
          {rightIcon && <span className="text-black/50">{rightIcon}</span>}
        </div>
        {helper && !error && (
          <span id={helperId} className="mt-1 block text-xs text-black/60">
            {helper}
          </span>
        )}
        {error && (
          <span id={errorId} className="mt-1 block text-xs text-rose-600">
            {error}
          </span>
        )}
      </label>
    );
  }
);

export default TextField;
