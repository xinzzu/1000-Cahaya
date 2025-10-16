export default function FlowLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-white text-black">
      <main className="mx-auto max-w-sm px-4 pt-4 pb-6">{children}</main>
    </div>
  );
}
