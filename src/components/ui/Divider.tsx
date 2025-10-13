interface DividerProps {
  text?: string
}

export default function Divider({ text = "atau" }: DividerProps) {
  return (
    <div className="flex items-center gap-4 my-6">
      <div className="flex-1 h-px bg-black/10" />
      <span className="text-xs text-black/60">{text}</span>
      <div className="flex-1 h-px bg-black/10" />
    </div>
  )
}