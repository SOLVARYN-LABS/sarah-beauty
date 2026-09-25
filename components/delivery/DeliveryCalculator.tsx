"use client";

import { useMemo, useState } from "react";
import { wilayas } from "@/lib/wilayas";
import { formatDA } from "@/lib/format";
import { delayLabel, useI18n, wilayaLabel } from "@/lib/i18n";
import type { DeliveryMode } from "@/lib/types";

export function DeliveryCalculator({
  compact = false,
  value,
  onChange,
}: {
  compact?: boolean;
  value?: { wilayaCode: string; mode: DeliveryMode };
  onChange?: (next: { wilayaCode: string; mode: DeliveryMode }) => void;
}) {
  const [code, setCode] = useState(value?.wilayaCode ?? "16");
  const [mode, setMode] = useState<DeliveryMode>(value?.mode ?? "home");
  const wilaya = useMemo(() => wilayas.find((w) => w.code === code), [code]);
  const price = wilaya ? (mode === "home" ? wilaya.home : wilaya.stopdesk) : 0;
  const { t, locale } = useI18n();

  function update(nextCode: string, nextMode: DeliveryMode) {
    setCode(nextCode);
    setMode(nextMode);
    onChange?.({ wilayaCode: nextCode, mode: nextMode });
  }

  return (
    <div className={compact ? "" : "card-soft p-6"}>
      {!compact && (
        <>
          <p className="text-[11px] tracking-[0.18em] uppercase text-muted">{t("delivery.kicker")}</p>
          <h3 className="font-serif text-3xl mt-1">{t("delivery.title")}</h3>
        </>
      )}
      <label className="block text-xs tracking-[0.14em] uppercase mt-4 mb-2">{t("delivery.wilaya")}</label>
      <select
        value={code}
        onChange={(e) => update(e.target.value, mode)}
        className="w-full bg-paper border border-line px-3 py-3 text-sm"
      >
        {wilayas.map((w) => (
          <option key={w.code} value={w.code}>
            {w.code} — {wilayaLabel(w.code, w.name, locale)}
          </option>
        ))}
      </select>
      <div className="grid grid-cols-2 gap-3 mt-4">
        <button
          type="button"
          onClick={() => update(code, "home")}
          className={`border px-3 py-3 text-left text-sm ${mode === "home" ? "border-plum bg-[#f3ebe4]" : "border-line"}`}
        >
          <span className="block text-[11px] tracking-[0.12em] uppercase">{t("delivery.home")}</span>
          {wilaya && formatDA(wilaya.home)}
        </button>
        <button
          type="button"
          onClick={() => update(code, "stopdesk")}
          className={`border px-3 py-3 text-left text-sm ${mode === "stopdesk" ? "border-plum bg-[#f3ebe4]" : "border-line"}`}
        >
          <span className="block text-[11px] tracking-[0.12em] uppercase">{t("delivery.desk")}</span>
          {wilaya && formatDA(wilaya.stopdesk)}
        </button>
      </div>
      {wilaya && (
        <p className="text-sm mt-4 text-muted">
          {wilayaLabel(wilaya.code, wilaya.name, locale)} · {t("delivery.delay")} {delayLabel(wilaya.delay, locale)} · <span className="text-plum">{formatDA(price)}</span>
        </p>
      )}
    </div>
  );
}
