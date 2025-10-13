// import { forwardRef, InputHTMLAttributes, ReactNode, useId } from "react"
// import { twMerge } from "tailwind-merge"

// type Props = InputHTMLAttributes<HTMLInputElement> & {
//   label?: string
//   helper?: string
//   error?: string
//   leftIcon?: ReactNode
//   rightIcon?: ReactNode
//   /** sm=40px, md=44px, lg=48px  */
//   fieldSize?: "sm" | "md" | "lg"
//   inputClassName?: string
// }

// const TextField = forwardRef<HTMLInputElement, Props>(function TextField(
//   {
//     label,
//     helper,
//     error,
//     leftIcon,
//     rightIcon,
//     className,
//     inputClassName,
//     fieldSize = "lg",   // default 48px untuk PWA
//     id,
//     ...props
//   },
//   ref
// ) {
//   const autoId = useId()
//   const fieldId = id ?? `tf-${autoId}`
//   const helperId = helper ? `${fieldId}-helper` : undefined
//   const errorId = error ? `${fieldId}-error` : undefined

//   const heights = {
//     sm: "h-10",
//     md: "h-11",
//     lg: "h-12",
//   } as const

//   return (
//     <label className="block" htmlFor={fieldId}>
//       {label && <span className="mb-1 block text-sm font-medium text-black">{label}</span>}

//       <div
//         className={twMerge(
//           "flex items-center gap-2 rounded-xl border bg-white px-3",
//           "focus-within:ring-2 focus-within:ring-black/15",
//           "disabled:opacity-50 disabled:pointer-events-none",
//           heights[fieldSize],                               // ✅ aman
//           error ? "border-rose-500/60" : "border-black/15",
//           className
//         )}
//       >
//         {leftIcon && <span className="text-black/50">{leftIcon}</span>}

//         <input
//           id={fieldId}
//           ref={ref}
//           className={twMerge(
//             "h-full w-full bg-transparent text-sm outline-none placeholder:text-black/40",
//             inputClassName
//           )}
//           aria-invalid={!!error}
//           aria-describedby={[helperId, errorId].filter(Boolean).join(" ") || undefined}
//           {...props}
//         />

//         {rightIcon && <span className="text-black/50">{rightIcon}</span>}
//       </div>

//       {helper && !error && <span id={helperId} className="mt-1 block text-xs text-black/60">{helper}</span>}
//       {error && <span id={errorId} className="mt-1 block text-xs text-rose-600">{error}</span>}
//     </label>
//   )
// })

// export default TextField

import { ComponentPropsWithoutRef, forwardRef } from "react"

interface TextFieldProps extends ComponentPropsWithoutRef<"input"> {
  label?: string
  error?: string
  helperText?: string
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, error, helperText, className = "", ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={props.id} className="block text-sm font-medium mb-2 text-black">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={[
            "w-full px-4 py-3 rounded-xl border bg-white text-black transition-all",
            "placeholder:text-black/40",
            "focus:outline-none focus:ring-2",
            error
              ? "border-red-500 focus:ring-red-500/30 focus:border-red-500"
              : "border-black/15 focus:ring-primary/30 focus:border-primary",
            "disabled:bg-gray-50 disabled:text-black/40 disabled:cursor-not-allowed",
            className,
          ]
            .filter(Boolean)
            .join(" ")}
          {...props}
        />
        {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
        {!error && helperText && (
          <p className="mt-1 text-xs text-black/60">{helperText}</p>
        )}
      </div>
    )
  }
)

TextField.displayName = "TextField"

export default TextField