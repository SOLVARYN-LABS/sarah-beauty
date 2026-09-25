"use client";

import { formatDA } from "@/lib/format";
import { useStore } from "@/lib/store";
import { StatusBadge } from "@/components/seller/StatusBadge";

export default function PaymentsPage() {
  const orders = useStore((s) => s.orders);
  const expected = orders.filter((o) => o.status !== "annulee" && o.status !== "retournee").reduce((s, o) => s + o.total, 0);
  const collected = orders.filter((o) => o.status === "livree").reduce((s, o) => s + o.total, 0);
  return (
    <div className="space-y-6">
      <h1 className="font-serif text-4xl">Paiements & COD</h1>
      <div className="grid md:grid-cols-3 gap-3">
        <div className="card-soft p-5"><p className="text-xs uppercase tracking-[0.14em] text-muted">À encaisser</p><p className="font-serif text-3xl mt-2">{formatDA(expected - collected)}</p></div>
        <div className="card-soft p-5"><p className="text-xs uppercase tracking-[0.14em] text-muted">Encaissé</p><p className="font-serif text-3xl mt-2">{formatDA(collected)}</p></div>
        <div className="card-soft p-5"><p className="text-xs uppercase tracking-[0.14em] text-muted">Commandes COD</p><p className="font-serif text-3xl mt-2">{orders.length}</p></div>
      </div>
      <div className="card-soft overflow-auto">
        <table className="w-full text-sm">
          <thead className="text-left text-[11px] uppercase tracking-[0.12em] text-muted">
            <tr><th className="p-3">Commande</th><th>Cliente</th><th>Wilaya</th><th>COD</th><th>Statut</th></tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id} className="border-t border-line">
                <td className="p-3">{o.number}</td>
                <td>{o.firstName} {o.lastName}</td>
                <td>{o.wilayaName}</td>
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
