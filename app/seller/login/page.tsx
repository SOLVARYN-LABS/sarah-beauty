"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import { useI18n } from "@/lib/i18n";

export default function SellerLoginPage() {
  const login = useStore((s) => s.loginSeller);
  const router = useRouter();
  const [error, setError] = useState("");
  const { t, locale, setLocale } = useI18n();

  return (
    <div className="min-h-screen grid place-items-center bg-ivory px-4">
      <form
        className="card-soft p-8 w-full max-w-md"
        onSubmit={(e) => {
          e.preventDefault();
          const data = new FormData(e.currentTarget);
          void login(String(data.get("email")), String(data.get("password"))).then((ok) => {
            if (!ok) {
              setError(t("seller.bad"));
              return;
            }
            router.push("/seller");
          });
        }}
      >
        <p className="font-serif tracking-[0.2em]">AYLA 04</p>
        <div className="mt-4 flex text-[11px] border border-line w-fit">
          <button type="button" onClick={() => setLocale("fr")} className={`px-2 py-1 ${locale === "fr" ? "bg-plum text-cream" : ""}`}>FR</button>
          <button type="button" onClick={() => setLocale("ar")} className={`px-2 py-1 ${locale === "ar" ? "bg-plum text-cream" : ""}`}>عربي</button>
        </div>
        <h1 className="font-serif text-4xl mt-2">{t("seller.login")}</h1>
        <p className="text-sm text-muted mt-2">{t("seller.hint")}</p>
        <label className="block text-xs tracking-[0.12em] uppercase mt-6">{t("seller.email")}
          <input name="email" type="email" required className="field mt-1" />
        </label>
        <label className="block text-xs tracking-[0.12em] uppercase mt-4">{t("seller.password")}
          <input name="password" type="password" required className="field mt-1" />
        </label>
        {error && <p className="text-danger text-sm mt-3">{error}</p>}
        <button className="btn-dark w-full py-3 mt-6">{t("seller.enter")}</button>
      </form>
    </div>
  );
}
