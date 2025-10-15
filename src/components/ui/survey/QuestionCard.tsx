import { PropsWithChildren } from "react";

export default function QuestionCard({ children }: PropsWithChildren) {
  return (
    <section
      className="rounded-2xl border p-4"
      style={{ borderColor: "var(--color-primary)" }}
    >
      {children}
    </section>
  );
}
