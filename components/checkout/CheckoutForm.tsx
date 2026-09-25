"use client";

import { useMemo, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { wilayas } from "@/lib/wilayas";
import { formatDA } from "@/lib/format";
import { quoteCoupon, useStore } from "@/lib/store";
import type { DeliveryMode } from "@/lib/types";
import { useI18n, wilayaLabel } from "@/lib/i18n";
import { ProductImage } from "@/components/product/ProductImage";

const schema = z.object({
  lastName: z.string().min(2, "Nom requis"),
  firstName: z.string().min(2, "Prénom requis"),
  phone: z.string().min(8, "Téléphone requis"),
  phone2: z.string().optional(),
  wilayaCode: z.string().min(2, "Wilaya requise"),
  commune: z.string().min(2, "Commune requise"),
  address: z.string().min(6, "Adresse requise"),
  deliveryMode: z.enum(["home", "stopdesk"]),
});

type FormValues = z.infer<typeof schema>;

export function CheckoutForm() {
  const router = useRouter();
  const cart = useStore((s) => s.cart);
  const products = useStore((s) => s.products);
  const placeOrder = useStore((s) => s.placeOrder);
  const [coupon, setCoupon] = useState("");
  const [applied, setApplied] = useState("");
  const [error, setError] = useState("");
  const { t, locale } = useI18n();
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      lastName: "",
      firstName: "",
      phone: "+213 ",
      phone2: "",
      wilayaCode: "16",
      commune: "Hydra",
      address: "",
      deliveryMode: "home",
    },
  });
  const wilayaCode = form.watch("wilayaCode");
  const mode = form.watch("deliveryMode");
  const wilaya = wilayas.find((w) => w.code === wilayaCode) ?? wilayas[15];
  const lines = cart
    .map((line) => ({ ...line, product: products.find((p) => p.id === line.productId) }))
    .filter((l) => l.product);
  const subtotal = lines.reduce((s, l) => s + l.product!.price * l.quantity, 0);
  const quote = useMemo(() => quoteCoupon(subtotal, applied), [subtotal, applied]);
  const delivery = mode === "home" ? wilaya.home : wilaya.stopdesk;
  const total = subtotal - quote.discount + delivery;

  async function onSubmit(values: FormValues) {
    const result = await placeOrder({ ...values, deliveryMode: values.deliveryMode as DeliveryMode, coupon: applied });
    if (!result.ok) {
      setError(result.error);
      return;
    }
    router.push(`/commande/${result.order.id}`);
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="grid lg:grid-cols-[1.3fr_0.8fr] gap-8">
      <div className="space-y-6">
        <section className="card-soft p-6">
          <p className="text-xs tracking-[0.16em] uppercase text-muted">{t("checkout.1")}</p>
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <Field label={t("field.last")} error={form.formState.errors.lastName?.message}>
              <input {...form.register("lastName")} className="field" placeholder="Benali" />
            </Field>
            <Field label={t("field.first")} error={form.formState.errors.firstName?.message}>
              <input {...form.register("firstName")} className="field" placeholder="Amira" />
            </Field>
            <Field label={t("field.phone")} error={form.formState.errors.phone?.message}>
              <input {...form.register("phone")} className="field" />
            </Field>
            <Field label={t("field.phone2")}>
              <input {...form.register("phone2")} className="field" />
            </Field>
          </div>
        </section>
        <section className="card-soft p-6">
          <p className="text-xs tracking-[0.16em] uppercase text-muted">{t("checkout.2")}</p>
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <Field label={t("field.wilaya")}>
              <select {...form.register("wilayaCode")} className="field" onChange={(e) => {
                form.setValue("wilayaCode", e.target.value);
                const next = wilayas.find((w) => w.code === e.target.value);
                if (next) form.setValue("commune", next.communes[0]);
              }}>
                {wilayas.map((w) => (
                  <option key={w.code} value={w.code}>{w.code} — {wilayaLabel(w.code, w.name, locale)}</option>
                ))}
              </select>
            </Field>
            <Field label={t("field.commune")} error={form.formState.errors.commune?.message}>
              <select {...form.register("commune")} className="field">
                {wilaya.communes.map((c) => <option key={c}>{c}</option>)}
              </select>
            </Field>
          </div>
          <Field label={t("field.address")} error={form.formState.errors.address?.message}>
            <textarea {...form.register("address")} className="field min-h-24" placeholder={t("field.addressPh")} />
          </Field>
          <div className="grid md:grid-cols-2 gap-3 mt-4">
            <label className={`border p-4 text-sm cursor-pointer ${mode === "home" ? "border-plum bg-[#f4ece6]" : "border-line"}`}>
              <input type="radio" value="home" {...form.register("deliveryMode")} className="mr-2" />
              {t("homeDelivery")} · {formatDA(wilaya.home)}
              <span className="block text-xs text-muted mt-1">Délai {wilaya.delay}</span>
            </label>
            <label className={`border p-4 text-sm cursor-pointer ${mode === "stopdesk" ? "border-plum bg-[#f4ece6]" : "border-line"}`}>
              <input type="radio" value="stopdesk" {...form.register("deliveryMode")} className="mr-2" />
              {t("deskDelivery")} · {formatDA(wilaya.stopdesk)}
            </label>
          </div>
        </section>
        <section className="card-soft p-6">
          <p className="text-xs tracking-[0.16em] uppercase text-muted">{t("checkout.3")}</p>
          <div className="border border-plum bg-[#f4ece6] p-4 mt-4 text-sm">
            {t("pay.cod")}
          </div>
        </section>
        {error && <p className="text-danger text-sm">{error}</p>}
        <button className="btn-dark w-full py-4" type="submit">{t("confirm")} ({formatDA(total)})</button>
        <p className="text-center text-[11px] tracking-[0.12em] uppercase text-muted">
          {t("confirm.note")}
        </p>
      </div>
      <aside className="card-soft p-6 h-fit space-y-4">
        <p className="text-xs tracking-[0.16em] uppercase text-muted">{t("summary")}</p>
        {lines.map((line) => (
          <div key={line.productId} className="flex gap-3 text-sm">
            <ProductImage src={line.product!.images.find((image) => image.trim())} alt="" className="w-16 h-20 object-cover" />
            <div>
              <p className="font-serif text-lg leading-tight">{line.product!.name}</p>
              <p>{formatDA(line.product!.price)} × {line.quantity}</p>
            </div>
          </div>
        ))}
        <div className="flex gap-2">
          <input value={coupon} onChange={(e) => setCoupon(e.target.value)} placeholder={t("couponPh")} className="field" />
          <button type="button" className="btn-ghost px-4" onClick={() => setApplied(coupon.trim())}>{t("apply")}</button>
        </div>
        {applied && !quote.valid && <p className="text-danger text-xs">{t("coupon.bad")}</p>}
        {quote.code && <p className="text-success text-xs">{t("coupon.ok", { code: quote.code })}</p>}
        <Row label={t("cart.sub")} value={formatDA(subtotal)} />
        <Row label={t("shipping")} value={formatDA(delivery)} />
        <Row label={t("discount")} value={`− ${formatDA(quote.discount)}`} />
        <div className="flex justify-between font-serif text-3xl pt-2 border-t border-line">
          <span>{t("total")}</span><span>{formatDA(total)}</span>
        </div>
      </aside>
    </form>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
  return (
    <label className="block text-xs tracking-[0.12em] uppercase text-muted">
      {label}
      <div className="mt-1">{children}</div>
      {error && <span className="normal-case tracking-normal text-danger">{error}</span>}
    </label>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return <div className="flex justify-between text-sm"><span>{label}</span><span>{value}</span></div>;
}
