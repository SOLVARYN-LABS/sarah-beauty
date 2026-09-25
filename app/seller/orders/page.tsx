"use client";

import Link from "next/link";
import { StatusBadge } from "@/components/seller/StatusBadge";
import { formatDA } from "@/lib/format";
import { useStore } from "@/lib/store";

export default function OrdersPage() {
  const orders = useStore((s) => s.orders);

  function exportCsv() {
    const header = "numero,cliente,telephone,wilaya,commune,total,statut\n";
    const rows = orders
      .map((o) => `${o.number},${o.firstName} ${o.lastName},${o.phone},${o.wilayaName},${o.commune},${o.total},${o.status}`)
      .join("\n");
    const blob = new Blob([header + rows], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "commandes-ayla.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-serif text-4xl">Commandes & envois</h1>
        <button onClick={exportCsv} className="btn-ghost px-4 py-2">Exporter le bordereau</button>
      </div>
      <div className="card-soft overflow-auto">
        <table className="w-full text-sm">
          <thead className="text-left text-[11px] tracking-[0.12em] uppercase text-muted">
            <tr>
              <th className="p-3">N°</th><th>Cliente</th><th>Contact</th><th>Wilaya</th><th>Articles</th><th>Total COD</th><th>Statut</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id} className="border-t border-line">
                <td className="p-3"><Link href={`/seller/orders/${o.id}`}>{o.number}</Link></td>
                <td>{o.firstName} {o.lastName}<div className="text-xs text-muted">{o.channel}</div></td>
                <td>{o.phone}</td>
                <td>{o.wilayaCode} {o.wilayaName}<div className="text-xs text-muted">{o.commune}</div></td>
                <td>{o.items.map((i) => `${i.quantity}× ${i.name}`).join(", ")}</td>
                <td>{formatDA(o.total)}</td>
                <td><StatusBadge status={o.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
