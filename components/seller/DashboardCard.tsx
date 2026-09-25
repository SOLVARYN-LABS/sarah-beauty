import type { ReactNode } from "react";

export function DashboardCard({
  label,
  value,
  hint,
  tone = "default",
}: {
  label: string;
  value: string;
  hint?: string;
  tone?: "default" | "alert";
}) {
  return (
    <div className={`card-soft p-4 ${tone === "alert" ? "border-danger/40" : ""}`}>
      <p className="text-[11px] tracking-[0.14em] uppercase text-muted">{label}</p>
      <p className={`font-serif text-3xl mt-2 ${tone === "alert" ? "text-danger" : "text-plum"}`}>{value}</p>
      {hint && <p className="text-xs text-muted mt-1">{hint}</p>}
    </div>
  );
}

export function Panel({ title, children, action }: { title: string; children: ReactNode; action?: ReactNode }) {
  return (
    <section className="card-soft p-5">
      <div className="flex items-center justify-between gap-3 mb-4">
        <h2 className="font-serif text-2xl">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}
