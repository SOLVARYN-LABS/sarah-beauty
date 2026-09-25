"use client";

import { useState } from "react";
import { formatDA } from "@/lib/format";
import { useStore } from "@/lib/store";

export default function InventoryPage() {
  const products = useStore((s) => s.products);
  const movements = useStore((s) => s.movements);
  const adjust = useStore((s) => s.adjustStock);
  const [productId, setProductId] = useState(products[0]?.id ?? "");
  const [qty, setQty] = useState(10);
  const [note, setNote] = useState("Réassort fournisseur");

  return (
    <div className="space-y-6">
      <h1 className="font-serif text-4xl">Mouvements de stock</h1>
      <form
        className="card-soft p-5 grid md:grid-cols-4 gap-3 items-end"
        onSubmit={(e) => {
          e.preventDefault();
          adjust(productId, qty, note);
        }}
      >
        <label className="text-xs uppercase tracking-[0.12em]">Article
          <select className="field mt-1" value={productId} onChange={(e) => setProductId(e.target.value)}>
            {products.map((p) => <option key={p.id} value={p.id}>{p.sku} — {p.name}</option>)}
          </select>
        </label>
        <label className="text-xs uppercase tracking-[0.12em]">Quantité (+ entrée / − sortie)
          <input className="field mt-1" type="number" value={qty} onChange={(e) => setQty(Number(e.target.value))} />
        </label>
        <label className="text-xs uppercase tracking-[0.12em]">Note
          <input className="field mt-1" value={note} onChange={(e) => setNote(e.target.value)} />
        </label>
        <button className="btn-dark py-3">Enregistrer l&apos;entrée</button>
      </form>
      <div className="card-soft overflow-auto">
        <table className="w-full text-sm">
          <thead className="text-left text-[11px] uppercase tracking-[0.12em] text-muted">
            <tr><th className="p-3">Produit</th><th>SKU</th><th>Prix</th><th>Stock</th><th>Vendus</th></tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-t border-line">
                <td className="p-3">{p.name}</td>
                <td>{p.sku}</td>
                <td>{formatDA(p.price)}</td>
                <td className={p.stock <= 5 ? "text-danger" : ""}>{p.stock}</td>
                <td>{p.sold}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="card-soft p-5">
        <h2 className="font-serif text-2xl mb-3">Derniers mouvements</h2>
        <ul className="text-sm space-y-2">
          {movements.slice(0, 12).map((m) => (
            <li key={m.id} className="flex justify-between border-b border-line pb-2">
              <span>{m.name} · {m.note}</span>
              <span className={m.quantity < 0 ? "text-danger" : "text-success"}>{m.quantity > 0 ? `+${m.quantity}` : m.quantity}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
