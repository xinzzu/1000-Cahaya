// src/components/ui/ProgressBar.tsx
export default function ProgressBar({
  total = 3,
  active = 0,               // 0-based: step pertama = 0
}: { total?: number; active?: number }) {
  return (
    <div className="px-4 pt-4">
      <div className="mx-auto flex max-w-sm items-center gap-6" aria-hidden>
        {Array.from({ length: total }).map((_, i) => (
          <span
            key={i}
            className="h-1 rounded-full flex-1"
            style={{
              backgroundColor:
                i <= active ? "var(--color-primary)" : "rgba(0,0,0,.1)",
            }}
          />
        ))}
      </div>
    </div>
  )
}
