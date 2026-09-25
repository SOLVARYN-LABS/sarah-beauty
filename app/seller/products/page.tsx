"use client";

import Link from "next/link";
import { formatDA } from "@/lib/format";
import { useStore } from "@/lib/store";

export default function SellerProductsPage() {
  const products = useStore((s) => s.products);
  const remove = useStore((s) => s.deleteProduct);
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-serif text-4xl">Catalogue & stocks</h1>
        <Link href="/seller/products/new" className="btn-dark px-4 py-3">Nouveau produit</Link>
      </div>
      <div className="card-soft overflow-auto">
        <table className="w-full text-sm">
          <thead className="text-left text-[11px] tracking-[0.12em] uppercase text-muted">
            <tr>
              <th className="p-3">Produit</th><th>SKU</th><th>Catégorie</th><th>Prix</th><th>Stock</th><th>Vendus</th><th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-t border-line">
                <td className="p-3">{p.name}</td>
                <td>{p.sku}</td>
                <td>{p.category}</td>
                <td>{formatDA(p.price)}</td>
                <td className={p.stock <= 5 ? "text-danger" : ""}>{p.stock}{p.stock <= 5 ? " · alerte" : ""}</td>
                <td>{p.sold}</td>
                <td className="p-3 text-right space-x-3">
                  <Link href={`/seller/products/${p.id}`}>Modifier</Link>
                  <button onClick={() => remove(p.id)} className="text-danger">Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
