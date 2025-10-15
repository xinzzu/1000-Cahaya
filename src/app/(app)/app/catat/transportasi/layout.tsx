// Halaman transportasi butuh tampilan full tanpa BottomNav
export default function TransportasiLayout({
  children,
}: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-white text-black">
      <main className="mx-auto max-w-sm px-4 pt-4 pb-4">{children}</main>
    </div>
  );
}
