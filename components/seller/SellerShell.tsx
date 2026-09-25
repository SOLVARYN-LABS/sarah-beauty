"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { useStore } from "@/lib/store";
import { useI18n } from "@/lib/i18n";

const links = [
  { href: "/seller", key: "seller.overview" },
  { href: "/seller/orders", key: "seller.orders" },
  { href: "/seller/products", key: "seller.catalog" },
  { href: "/seller/shipping", key: "seller.shipping" },
  { href: "/seller/payments", key: "seller.payments" },
  { href: "/seller/inventory", key: "seller.moves" },
  { href: "/seller/settings", key: "seller.settings" },
] as const;

export function SellerShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const auth = useStore((s) => s.sellerAuth);
  const sellerName = useStore((s) => s.sellerName);
  const loadSeller = useStore((s) => s.loadSeller);
  const logout = useStore((s) => s.logoutSeller);
  const [checked, setChecked] = useState(pathname === "/seller/login");
  const { t, locale, setLocale } = useI18n();

  useEffect(() => {
    if (pathname === "/seller/login") return;
    void loadSeller().finally(() => setChecked(true));
  }, [loadSeller, pathname]);

  useEffect(() => {
    if (checked && !auth && pathname !== "/seller/login") router.replace("/seller/login");
  }, [auth, checked, pathname, router]);

  if (pathname === "/seller/login") return <>{children}</>;
  if (!checked || !auth) return <div className="min-h-screen grid place-items-center text-muted">{t("seller.opening")}</div>;

  return (
    <div className="min-h-screen grid lg:grid-cols-[250px_1fr] bg-ivory">
      <aside className="bg-plum-deep text-[#f4ece4] p-6 flex flex-col">
        <p className="font-serif tracking-[0.22em] text-lg">AYLA 04</p>
        <div className="mt-4 flex text-[11px] border border-white/20 w-fit">
          <button type="button" onClick={() => setLocale("fr")} className={`px-2 py-1 ${locale === "fr" ? "bg-white/15" : ""}`}>FR</button>
          <button type="button" onClick={() => setLocale("ar")} className={`px-2 py-1 ${locale === "ar" ? "bg-white/15" : ""}`}>عربي</button>
        </div>
        <p className="text-[11px] tracking-[0.18em] uppercase text-champagne mt-4">{sellerName || t("seller")}</p>
        <nav className="mt-10 flex flex-col gap-1 text-sm">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link key={link.href} href={link.href} className={`px-3 py-2 ${active ? "bg-white/10" : "hover:bg-white/5"}`}>
                {t(link.key)}
              </Link>
            );
          })}
        </nav>
        <div className="mt-auto space-y-3 text-sm">
          <Link href="/" className="block text-champagne">{t("seller.back")}</Link>
          <button onClick={() => { void logout().then(() => router.push("/seller/login")); }} className="text-[#d9cfc6]">{t("seller.out")}</button>
        </div>
      </aside>
      <div className="p-4 md:p-8">{children}</div>
    </div>
  );
}
