"use client";

import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { useI18n } from "@/lib/i18n";

export function Footer() {
  const { t, locale } = useI18n();
  return (
    <footer className="bg-plum-deep text-[#f3ebe4] mt-16">
      <div className="max-w-7xl mx-auto px-6 py-14 grid gap-10 md:grid-cols-4">
        <div>
          <Logo light />
          <p className="text-sm text-[#d9cfc6] mt-3 leading-relaxed">
            {t("footer.about")}
          </p>
          <p className="text-xs tracking-[0.14em] mt-4 text-champagne">@sarahbeauty</p>
        </div>
        <div>
          <p className="text-xs tracking-[0.18em] uppercase text-champagne mb-3">{t("footer.ship")}</p>
          <ul className="text-sm space-y-2 text-[#e7ddd4]">
            <li>{t("footer.ship.1")}</li>
            <li>{t("footer.ship.2")}</li>
            <li>{t("footer.ship.4")}</li>
          </ul>
        </div>
        <div>
          <p className="text-xs tracking-[0.18em] uppercase text-champagne mb-3">{t("footer.house")}</p>
          <ul className="text-sm space-y-2">
            <li><Link href="/boutique/maquillage">Maquillage</Link></li>
            <li><Link href="/boutique/soins-peau">Soins de la peau</Link></li>
            <li><Link href="/boutique/vetements">Vêtements</Link></li>
            <li><Link href="/boutique/accessoires">Accessoires</Link></li>
            <li><Link href="/seller">{t("footer.house.4")}</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-xs tracking-[0.18em] uppercase text-champagne mb-3">{t("footer.club")}</p>
          <p className="text-sm text-[#e7ddd4] mb-4">{t("footer.club.text")}</p>
          <Link href="/compte" className="inline-block border border-champagne px-4 py-2 text-xs tracking-[0.16em]">
            {t("footer.join")}
          </Link>
        </div>
      </div>
      <div className="border-t border-white/10 px-6 py-4 text-[11px] tracking-[0.12em] flex flex-wrap gap-3 justify-between text-[#cfc4ba]">
        <span>© 2026 SARAH BEAUTY{locale === "ar" ? ". كل الحقوق محفوظة." : ". Tous droits réservés."}</span>
        <span>{t("footer.legal")}</span>
      </div>
    </footer>
  );
}
