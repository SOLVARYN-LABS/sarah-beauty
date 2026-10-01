"use client";

import Link from "next/link";
import { DashboardCard, Panel } from "@/components/seller/DashboardCard";
import { StatusBadge } from "@/components/seller/StatusBadge";
import { formatDA } from "@/lib/format";
import { useStore } from "@/lib/store";
import { wilayas } from "@/lib/wilayas";

export default function SellerHome() {
  const products = useStore((s) => s.products);
  const orders = useStore((s) => s.orders);
  const revenue = orders.filter((o) => o.status !== "annulee").reduce((s, o) => s + o.total, 0);
  const avg = orders.length ? Math.round(revenue / orders.length) : 0;
  const low = products.filter((p) => p.stock <= 5);
  const shipped = orders.filter((o) => o.status === "expediee" || o.status === "livree").reduce((s, o) => s + o.items.reduce((n, i) => n + i.quantity, 0), 0);
  const confirmed = orders.filter((o) => o.status !== "a-confirmer" && o.status !== "annulee").length;
  const rate = orders.length ? Math.round((confirmed / orders.length) * 1000) / 10 : 0;
  const byZone = ["Centre", "Est", "Ouest", "Hauts Plateaux", "Sud"].map((zone) => {
    const codes = new Set(wilayas.filter((w) => w.zone === zone).map((w) => w.code));
    const count = orders.filter((o) => codes.has(o.wilayaCode)).length;
    return { zone, count };
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[11px] tracking-[0.18em] uppercase text-muted">Boutique officielle Algérie</p>
          <h1 className="font-serif text-4xl">Sarah Beauty</h1>
        </div>
        <div className="flex gap-2 text-xs">
          <span className="border border-line px-3 py-2">En ligne</span>
          <span className="border border-line px-3 py-2">Wilayas 69 / 69</span>
          <span className="border border-line px-3 py-2">Confirmation {rate}%</span>
          <Link href="/seller/products/new" className="btn-dark px-4 py-2">+ Nouveau produit</Link>
        </div>
      </div>
      <div className="grid md:grid-cols-5 gap-3">
        <DashboardCard label="Chiffre d'affaires" value={formatDA(revenue)} hint="Commandes en cours" />
        <DashboardCard label="Commandes" value={String(orders.length)} hint="Toutes wilayas" />
        <DashboardCard label="Panier moyen" value={formatDA(avg)} />
        <DashboardCard label="Alertes réassort" value={String(low.length)} hint="Stock ≤ 5" tone="alert" />
        <DashboardCard label="Volume expédié" value={String(shipped)} hint="Unités" />
      </div>
      <div className="grid lg:grid-cols-[1.4fr_0.8fr] gap-4">
        <Panel title="Inventaire & stocks">
          <table className="w-full text-sm">
            <thead className="text-left text-[11px] tracking-[0.12em] uppercase text-muted">
              <tr><th className="py-2">Produit</th><th>Prix</th><th>Stock</th></tr>
            </thead>
            <tbody>
              {products.slice(0, 5).map((p) => (
                <tr key={p.id} className="border-t border-line">
                  <td className="py-3">
                    <p>{p.name}</p>
                    <p className="text-xs text-muted">{p.sku}</p>
                  </td>
                  <td>{formatDA(p.price)}</td>
                  <td className={p.stock <= 5 ? "text-danger" : ""}>{p.stock}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>
        <Panel title="Répartition 69 wilayas">
          <ul className="space-y-3 text-sm">
            {byZone.map((z) => (
              <li key={z.zone} className="flex justify-between border-b border-line pb-2">
                <span>{z.zone}</span><span>{z.count} colis</span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
      <Panel title="Commandes récentes" action={<Link href="/seller/orders" className="text-xs tracking-[0.12em] uppercase">Tout voir</Link>}>
        <table className="w-full text-sm">
          <thead className="text-left text-[11px] tracking-[0.12em] uppercase text-muted">
            <tr><th className="py-2">Commande</th><th>Cliente</th><th>Wilaya</th><th>Total</th><th>Statut</th></tr>
          </thead>
          <tbody>
            {orders.slice(0, 6).map((o) => (
              <tr key={o.id} className="border-t border-line">
                <td className="py-3"><Link href={`/seller/orders/${o.id}`}>{o.number}</Link></td>
                <td>{o.firstName} {o.lastName}</td>
                <td>{o.wilayaCode} {o.wilayaName}</td>
                <td>{formatDA(o.total)}</td>
                <td><StatusBadge status={o.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Panel>
    </div>
  );
}
