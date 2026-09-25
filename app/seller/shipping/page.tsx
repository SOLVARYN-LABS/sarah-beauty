"use client";

import { formatDA } from "@/lib/format";
import { useStore } from "@/lib/store";
import { wilayas } from "@/lib/wilayas";
import { StatusBadge } from "@/components/seller/StatusBadge";

export default function ShippingPage() {
  const orders = useStore((s) => s.orders);
  return (
    <div className="space-y-6">
      <h1 className="font-serif text-4xl">Expéditions 69 wilayas</h1>
      <div className="card-soft overflow-auto max-h-[420px]">
        <table className="w-full text-sm">
          <thead className="text-left text-[11px] uppercase tracking-[0.12em] text-muted sticky top-0 bg-paper">
            <tr><th className="p-3">Code</th><th>Wilaya</th><th>Domicile</th><th>StopDesk</th><th>Délai</th><th>Zone</th></tr>
          </thead>
          <tbody>
            {wilayas.map((w) => (
              <tr key={w.code} className="border-t border-line">
                <td className="p-3">{w.code}</td>
                <td>{w.name}</td>
                <td>{formatDA(w.home)}</td>
                <td>{formatDA(w.stopdesk)}</td>
                <td>{w.delay}</td>
                <td>{w.zone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="card-soft p-5">
        <h2 className="font-serif text-2xl mb-3">Colis à suivre</h2>
        <ul className="space-y-3 text-sm">
          {orders.map((o) => (
            <li key={o.id} className="flex flex-wrap gap-3 items-center justify-between border-b border-line pb-2">
              <span>{o.number} · {o.wilayaName} · {o.deliveryMode === "home" ? "Domicile" : "StopDesk"}</span>
              <StatusBadge status={o.status} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
