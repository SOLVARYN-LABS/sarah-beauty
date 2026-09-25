"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { formatDA } from "@/lib/format";
import { useStore } from "@/lib/store";
import { useI18n } from "@/lib/i18n";
import { ProductImage } from "@/components/product/ProductImage";

export function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const cart = useStore((s) => s.cart);
  const products = useStore((s) => s.products);
  const setQty = useStore((s) => s.setQty);
  const remove = useStore((s) => s.removeFromCart);
  const lines = cart
    .map((line) => ({ ...line, product: products.find((p) => p.id === line.productId) }))
    .filter((l) => l.product);
  const subtotal = lines.reduce((s, l) => s + l.product!.price * l.quantity, 0);
  const { t } = useI18n();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-plum-deep/40" onClick={onClose}>
      <aside className="absolute end-0 top-0 h-full w-full max-w-md bg-cream p-6 flex flex-col" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-serif text-3xl">{t("cart.title")}</h2>
          <button onClick={onClose} aria-label="Fermer"><X /></button>
        </div>
        <div className="flex-1 overflow-auto space-y-4">
          {lines.length === 0 && <p className="text-muted">{t("cart.empty")}</p>}
          {lines.map((line) => (
            <div key={line.productId} className="flex gap-3 border-b border-line pb-4">
              <ProductImage src={line.product!.images.find((image) => image.trim())} alt="" className="w-20 h-24 object-cover" />
              <div className="flex-1">
                <p className="font-serif text-lg leading-tight">{line.product!.name}</p>
                <p className="text-sm mt-1">{formatDA(line.product!.price)}</p>
                <div className="flex items-center gap-2 mt-2 text-sm">
                  <button onClick={() => setQty(line.productId, line.quantity - 1)} className="border border-line w-7 h-7">−</button>
                  <span>{line.quantity}</span>
                  <button onClick={() => setQty(line.productId, line.quantity + 1)} className="border border-line w-7 h-7">+</button>
                  <button onClick={() => remove(line.productId)} className="ms-auto text-xs tracking-widest text-muted">{t("cart.remove")}</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="border-t border-line pt-4 space-y-3">
          <div className="flex justify-between"><span>{t("cart.sub")}</span><span>{formatDA(subtotal)}</span></div>
          <Link href="/cart" onClick={onClose} className="btn-ghost block text-center py-3">{t("cart.view")}</Link>
          <Link href="/checkout" onClick={onClose} className="btn-dark block text-center py-3">{t("cart.checkout")}</Link>
        </div>
      </aside>
    </div>
  );
}
