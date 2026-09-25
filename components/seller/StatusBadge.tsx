"use client";

import type { OrderStatus } from "@/lib/types";
import { useI18n } from "@/lib/i18n";

const labels: Record<OrderStatus, string> = {
  "a-confirmer": "À confirmer",
  confirmee: "Confirmée",
  preparation: "Préparation",
  expediee: "Expédiée",
  livree: "Livrée & payée",
  annulee: "Annulée",
  retournee: "Retournée",
};

const tones: Record<OrderStatus, string> = {
  "a-confirmer": "bg-[#f3e4c8] text-[#6b4b1e]",
  confirmee: "bg-[#e5f2ea] text-success",
  preparation: "bg-beige text-plum",
  expediee: "bg-[#efe4d4] text-plum",
  livree: "bg-[#dceee4] text-success",
  annulee: "bg-[#f8e4e4] text-danger",
  retournee: "bg-[#f8e4e4] text-danger",
};

export function StatusBadge({ status }: { status: OrderStatus }) {
  const { t } = useI18n();
  const key = `status.${status}` as const;
  return (
    <span className={`text-[11px] tracking-[0.08em] px-2 py-1 rounded-full ${tones[status]}`}>
      {t(key)}
    </span>
  );
}

export const statusOptions = (Object.keys(labels) as OrderStatus[]).map((value) => ({
  value,
  label: labels[value],
}));
