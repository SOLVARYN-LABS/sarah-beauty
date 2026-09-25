"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { useState, type FormEvent } from "react";
import { navLinks } from "@/lib/catalog";
import { useI18n } from "@/lib/i18n";
import { useStore } from "@/lib/store";
import { CartDrawer } from "@/components/cart/CartDrawer";

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const cart = useStore((s) => s.cart);
  const wishlist = useStore((s) => s.wishlist);
  const [open, setOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const count = cart.reduce((n, i) => n + i.quantity, 0);
  const { t, locale, setLocale } = useI18n();

  function submitSearch(e: FormEvent) {
    e.preventDefault();
    const q = query.trim();
    router.push(q ? `/boutique?q=${encodeURIComponent(q)}` : "/boutique");
    setSearchOpen(false);
    setOpen(false);
  }

  return (
    <header className="sticky top-0 z-40">
      <div className="bg-plum text-center text-[9px] leading-4 tracking-[0.04em] sm:text-[10px] sm:tracking-[0.22em] text-[#f4ece4] uppercase py-2 px-3">
        {t("announce")}
      </div>
      <div className="bg-cream/95 backdrop-blur border-b border-line">
        <div className="mx-auto max-w-7xl px-3 md:px-6 h-14 sm:h-16 flex items-center gap-2">
          <button className="lg:hidden shrink-0 p-1" onClick={() => setOpen(true)} aria-label={t("menu")}>
            <Menu size={20} />
          </button>
          <Link href="/" className="font-serif text-[17px] sm:text-xl tracking-[0.04em] sm:tracking-[0.18em] text-plum min-w-0 truncate">
            <span className="hidden sm:inline">BOUTIQUE </span>AYLA <span className="text-champagne">04</span>
          </Link>
          <nav className="hidden lg:flex items-center gap-5 mx-auto text-[13px] text-ink/80">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={pathname === link.href ? "text-plum border-b border-plum pb-0.5" : "hover:text-plum"}
              >
                {t(link.key)}
              </Link>
            ))}
          </nav>
          <div className="ms-auto flex items-center gap-1 text-plum shrink-0">
            <div className="flex text-[10px] sm:text-[11px] border border-line">
              <button type="button" onClick={() => setLocale("fr")} className={`px-1.5 sm:px-2 py-1 ${locale === "fr" ? "bg-plum text-cream" : ""}`}>FR</button>
              <button type="button" onClick={() => setLocale("ar")} className={`px-1.5 sm:px-2 py-1 ${locale === "ar" ? "bg-plum text-cream" : ""}`}>عربي</button>
            </div>
            <button className="p-1" aria-label={t("search")} onClick={() => setSearchOpen((v) => !v)}>
              <Search size={18} />
            </button>
            <Link href="/compte" className="hidden sm:inline p-1" aria-label={t("account")}>
              <User size={18} />
            </Link>
            <Link href="/wishlist" className="relative hidden sm:inline p-1" aria-label={t("wishlist")}>
              <Heart size={18} />
              {wishlist.length > 0 && (
                <span className="absolute -top-2 -right-2 text-[10px] bg-plum text-cream rounded-full w-4 h-4 grid place-items-center">
                  {wishlist.length}
                </span>
              )}
            </Link>
            <button className="relative p-1" aria-label={t("cart")} onClick={() => setCartOpen(true)}>
              <ShoppingBag size={18} />
              {count > 0 && (
                <span className="absolute -top-2 -right-2 text-[10px] bg-plum text-cream rounded-full w-4 h-4 grid place-items-center">
                  {count}
                </span>
              )}
            </button>
            <Link href="/seller" className="hidden md:inline text-[11px] tracking-[0.16em] border border-plum px-3 py-1.5">
              {t("seller")}
            </Link>
          </div>
        </div>
        {searchOpen && (
          <form onSubmit={submitSearch} className="border-t border-line px-4 py-3 max-w-7xl mx-auto">
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("search")}
              className="w-full bg-paper border border-line px-4 py-3 text-sm"
            />
          </form>
        )}
      </div>
      {open && (
        <div className="fixed inset-0 z-50 bg-plum-deep/40 lg:hidden" onClick={() => setOpen(false)}>
          <div className="bg-cream h-full w-80 p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-8">
              <span className="font-serif tracking-[0.16em]">AYLA 04</span>
              <button onClick={() => setOpen(false)} aria-label={t("close")}>
                <X size={18} />
              </button>
            </div>
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="text-lg font-serif">
                  {t(link.key)}
                </Link>
              ))}
              <Link href="/compte" onClick={() => setOpen(false)} className="text-lg font-serif sm:hidden">
                {t("account")}
              </Link>
              <Link href="/wishlist" onClick={() => setOpen(false)} className="text-lg font-serif sm:hidden">
                {t("wishlist")}
              </Link>
              <Link href="/seller" onClick={() => setOpen(false)} className="text-sm tracking-[0.14em] mt-4">
                {t("seller")}
              </Link>
            </div>
          </div>
        </div>
      )}
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </header>
  );
}
