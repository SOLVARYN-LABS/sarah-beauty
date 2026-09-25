"use client";

import { use } from "react";
import { StatusBadge, statusOptions } from "@/components/seller/StatusBadge";
import { formatDA } from "@/lib/format";
import { useStore } from "@/lib/store";
import type { OrderStatus } from "@/lib/types";

export default function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const order = useStore((s) => s.orders.find((o) => o.id === id));
  const update = useStore((s) => s.updateOrderStatus);
  if (!order) return <p>Commande introuvable.</p>;
  return (
    <div className="max-w-3xl space-y-4">
      <div className="flex items-center gap-3">
        <h1 className="font-serif text-4xl">{order.number}</h1>
        <StatusBadge status={order.status} />
      </div>
      <div className="card-soft p-6 text-sm space-y-2">
        <p>{order.lastName} {order.firstName}</p>
        <p>{order.phone} {order.phone2 ? `· ${order.phone2}` : ""}</p>
        <p>{order.address}, {order.commune}, {order.wilayaName}</p>
        <p>{order.deliveryMode === "home" ? "Domicile" : "StopDesk"} · {formatDA(order.deliveryPrice)}</p>
        <ul className="pt-3">
          {order.items.map((item) => (
            <li key={item.productId}>{item.quantity} × {item.name} — {formatDA(item.price * item.quantity)}</li>
          ))}
        </ul>
        <p>Sous-total {formatDA(order.subtotal)} · réduction {formatDA(order.discount)} · total {formatDA(order.total)}</p>
      </div>
      <label className="text-xs uppercase tracking-[0.12em]">Statut
        <select
          className="field mt-1"
          value={order.status}
          onChange={(e) => update(order.id, e.target.value as OrderStatus)}
        >
          {statusOptions.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
        </select>
      </label>
    </div>
  );
}
