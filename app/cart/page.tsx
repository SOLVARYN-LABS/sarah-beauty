"use client";

import Link from "next/link";
import { formatDA } from "@/lib/format";
import { quoteCoupon, useStore } from "@/lib/store";
import { ProductImage } from "@/components/product/ProductImage";
import { useState } from "react";

export default function CartPage() {
  const cart = useStore((s) => s.cart);
  const products = useStore((s) => s.products);
  const setQty = useStore((s) => s.setQty);
  const remove = useStore((s) => s.removeFromCart);
  const [coupon, setCoupon] = useState("");
  const [applied, setApplied] = useState("");
  const lines = cart.map((l) => ({ ...l, product: products.find((p) => p.id === l.productId) })).filter((l) => l.product);
  const subtotal = lines.reduce((s, l) => s + l.product!.price * l.quantity, 0);
  const quote = quoteCoupon(subtotal, applied);

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="font-serif text-5xl mb-8">Panier</h1>
      {lines.length === 0 ? (
        <p>Votre panier est vide. <Link href="/boutique" className="underline">Continuer vos achats</Link></p>
      ) : (
        <div className="grid lg:grid-cols-[1.3fr_0.7fr] gap-8">
          <div className="space-y-4">
            {lines.map((line) => (
              <div key={line.productId} className="card-soft p-4 flex gap-4">
                <ProductImage src={line.product!.images.find((image) => image.trim())} alt="" className="w-24 h-28 object-cover" />
                <div className="flex-1">
                  <p className="font-serif text-2xl">{line.product!.name}</p>
                  <p className="text-sm text-muted">{line.product!.sku}</p>
                  <p className="mt-2">{formatDA(line.product!.price)}</p>
                  <div className="flex items-center gap-2 mt-3">
                    <button onClick={() => setQty(line.productId, line.quantity - 1)} className="border border-line w-8 h-8">−</button>
                    <span>{line.quantity}</span>
                    <button onClick={() => setQty(line.productId, line.quantity + 1)} className="border border-line w-8 h-8">+</button>
                    <button onClick={() => remove(line.productId)} className="ml-auto text-xs tracking-widest">RETIRER</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <aside className="card-soft p-5 h-fit space-y-3">
            <div className="flex gap-2">
              <input value={coupon} onChange={(e) => setCoupon(e.target.value)} placeholder="SARAH10" className="field" />
              <button className="btn-ghost px-3" onClick={() => setApplied(coupon)}>OK</button>
            </div>
            <p className="flex justify-between text-sm"><span>Sous-total</span><span>{formatDA(subtotal)}</span></p>
            <p className="flex justify-between text-sm"><span>Réduction</span><span>− {formatDA(quote.discount)}</span></p>
            <p className="text-xs text-muted">La livraison est calculée au checkout selon la wilaya.</p>
            <Link href="/checkout" className="btn-dark block text-center py-3">Passer au paiement</Link>
          </aside>
        </div>
      )}
    </div>
  );
}
