"use client";

import Link from "next/link";
import { use, useEffect, useState } from "react";
import { formatDA } from "@/lib/format";
import { useStore } from "@/lib/store";
import { StatusBadge } from "@/components/seller/StatusBadge";
import type { Order } from "@/lib/types";

export default function OrderPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const stored = useStore((s) => s.orders.find((o) => o.id === id));
  const remember = useStore((s) => s.rememberOrder);
  const [loaded, setLoaded] = useState<Order | null>(null);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    if (stored) return;
    void fetch(`/api/orders/${id}`).then(async (response) => {
      if (!response.ok) {
        setMissing(true);
        return;
      }
      const data = (await response.json()) as { order: Order };
      setLoaded(data.order);
      remember(data.order);
    });
  }, [id, remember, stored]);

  const order = stored ?? loaded;
  if (!order) {
    if (!missing) return <div className="max-w-3xl mx-auto py-24 text-center text-muted">Chargement de la commande…</div>;
    return <div className="max-w-3xl mx-auto py-24 text-center">Commande introuvable. <Link href="/" className="underline">Retour à l&apos;accueil</Link></div>;
  }
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <p className="text-[11px] tracking-[0.2em] uppercase text-champagne">Commande confirmée</p>
      <h1 className="font-serif text-5xl mt-2">{order.number}</h1>
      <p className="mt-4 text-muted">Merci {order.firstName}. Votre commande est enregistrée et visible dans l&apos;espace vendeur. Le stock a été mis à jour. Règlement à la livraison.</p>
      <div className="card-soft p-6 mt-8 space-y-2 text-sm">
        <StatusBadge status={order.status} />
        <p>{order.lastName} {order.firstName} · {order.phone}</p>
        <p>{order.address}, {order.commune}, {order.wilayaCode} {order.wilayaName}</p>
        <p>{order.deliveryMode === "home" ? "Livraison à domicile" : "StopDesk"} · {formatDA(order.deliveryPrice)}</p>
        <ul className="pt-3 space-y-1">
          {order.items.map((item) => <li key={item.productId}>{item.quantity} × {item.name}</li>)}
        </ul>
        <p className="font-serif text-3xl pt-3">{formatDA(order.total)}</p>
      </div>
      <Link href="/boutique" className="btn-dark inline-block mt-8 px-6 py-3">Continuer</Link>
    </div>
  );
}
