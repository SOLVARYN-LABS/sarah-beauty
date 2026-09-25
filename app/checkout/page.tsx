"use client";

import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { useI18n } from "@/lib/i18n";

export default function CheckoutPage() {
  const { t } = useI18n();
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <p className="text-[11px] tracking-[0.18em] uppercase text-muted">{t("checkout.kicker")}</p>
      <h1 className="font-serif text-5xl mt-2 mb-8">{t("checkout.title")}</h1>
      <CheckoutForm />
    </div>
  );
}
