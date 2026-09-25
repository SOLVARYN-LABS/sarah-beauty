"use client";

import Link from "next/link";
import { WHATSAPP, WHATSAPP_DISPLAY } from "@/lib/catalog";
import { useI18n } from "@/lib/i18n";

export function Footer() {
  const { t, locale } = useI18n();
  return (
    <footer className="bg-plum-deep text-[#f3ebe4] mt-16 pb-16 sm:pb-0">
      <div className="max-w-7xl mx-auto px-6 py-14 grid gap-10 md:grid-cols-4">
        <div>
          <p className="font-serif tracking-[0.2em] text-lg">BOUTIQUE AYLA</p>
          <p className="text-sm text-[#d9cfc6] mt-3 leading-relaxed">
            {t("footer.about")}
          </p>
          <p className="text-xs tracking-[0.14em] mt-4 text-champagne">@_boutique_ayla</p>
        </div>
        <div>
          <p className="text-xs tracking-[0.18em] uppercase text-champagne mb-3">{t("footer.ship")}</p>
          <ul className="text-sm space-y-2 text-[#e7ddd4]">
            <li>{t("footer.ship.1")}</li>
            <li>{t("footer.ship.2")}</li>
            <li>
              <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noreferrer">
                WhatsApp {WHATSAPP_DISPLAY}
              </a>
            </li>
            <li>{t("footer.ship.4")}</li>
          </ul>
        </div>
        <div>
          <p className="text-xs tracking-[0.18em] uppercase text-champagne mb-3">{t("footer.house")}</p>
          <ul className="text-sm space-y-2">
            <li><Link href="/boutique/brosses">{t("footer.house.1")}</Link></li>
            <li><Link href="/cheveux">{t("footer.house.2")}</Link></li>
            <li><Link href="/boutique/vetements">{t("footer.house.3")}</Link></li>
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
        <span>© 2026 BOUTIQUE AYLA 04{locale === "ar" ? ". كل الحقوق محفوظة." : ". Tous droits réservés."}</span>
        <span>{t("footer.legal")}</span>
      </div>
    </footer>
  );
}
