"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ProductGrid } from "@/components/product/ProductGrid";
import { useStore } from "@/lib/store";
import { useI18n } from "@/lib/i18n";
import type { Product } from "@/lib/types";

const universes = ["Tous", "Cheveux", "Beauté", "Mode", "Accessoires"];

export function CatalogView({
  title,
  intro,
  preset,
}: {
  title: string;
  intro: string;
  preset?: (product: Product) => boolean;
}) {
  const products = useStore((s) => s.products);
  const params = useSearchParams();
  const router = useRouter();
  const initialQ = params.get("q") ?? "";
  const [q, setQ] = useState(initialQ);
  const [universe, setUniverse] = useState("Tous");
  const [maxPrice, setMaxPrice] = useState(15000);
  const [available, setAvailable] = useState(false);
  const [minRating, setMinRating] = useState(0);
  const [sort, setSort] = useState("featured");
  const [page, setPage] = useState(1);
  const pageSize = 6;
  const { t } = useI18n();

  const filtered = useMemo(() => {
    let list = products.filter((p) => (preset ? preset(p) : true));
    if (q.trim()) {
      const query = q.toLowerCase();
      list = list.filter((p) => `${p.name} ${p.sku} ${p.description}`.toLowerCase().includes(query));
    }
    if (universe !== "Tous") list = list.filter((p) => p.universe === universe);
    list = list.filter((p) => p.price <= maxPrice);
    if (available) list = list.filter((p) => p.stock > 0);
    if (minRating) list = list.filter((p) => p.rating >= minRating);
    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
    if (sort === "new") list = [...list].sort((a, b) => Number(b.isNew) - Number(a.isNew));
    return list;
  }, [products, preset, q, universe, maxPrice, available, minRating, sort]);

  const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const slice = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
      <p className="text-[11px] tracking-[0.2em] uppercase text-muted">Collection officielle Sarah Beauty</p>
      <h1 className="font-serif text-4xl md:text-5xl mt-2 max-w-3xl">{title}</h1>
      <p className="text-muted max-w-2xl mt-3">{intro}</p>
      <div className="grid lg:grid-cols-[260px_1fr] gap-8 mt-10">
        <aside className="card-soft p-5 h-fit space-y-5">
          <div className="flex items-center justify-between">
            <p className="text-xs tracking-[0.16em] uppercase">{t("filters")}</p>
            <button
              className="text-xs text-muted"
              onClick={() => {
                setUniverse("Tous");
                setMaxPrice(15000);
                setAvailable(false);
                setMinRating(0);
                setQ("");
                setPage(1);
                router.replace("/boutique");
              }}
            >
              {t("reset")}
            </button>
          </div>
          <input
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setPage(1);
            }}
            placeholder={t("searchShort")}
            className="w-full border border-line bg-paper px-3 py-2 text-sm"
          />
          <div>
            <p className="text-xs tracking-[0.14em] uppercase mb-2">{t("universe")}</p>
            {universes.map((item) => (
              <label key={item} className="flex items-center gap-2 text-sm py-1">
                <input type="radio" checked={universe === item} onChange={() => { setUniverse(item); setPage(1); }} />
                {item === "Tous" ? t("all") : item === "Cheveux" ? t("nav.hair") : item === "Beauté" ? t("nav.beauty") : item === "Mode" ? t("nav.fashion") : t("nav.accessories")}
              </label>
            ))}
          </div>
          <div>
            <p className="text-xs tracking-[0.14em] uppercase mb-2">{t("priceMax")} · {maxPrice.toLocaleString("fr-DZ")} DA</p>
            <input type="range" min={2000} max={15000} step={100} value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} className="w-full" />
          </div>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={available} onChange={(e) => setAvailable(e.target.checked)} />
            {t("available")}
          </label>
          <div>
            <p className="text-xs tracking-[0.14em] uppercase mb-2">{t("reviews")}</p>
            {[4, 3].map((n) => (
              <label key={n} className="flex items-center gap-2 text-sm py-1">
                <input type="radio" checked={minRating === n} onChange={() => setMinRating(minRating === n ? 0 : n)} />
                {t("stars", { n })}
              </label>
            ))}
          </div>
        </aside>
        <div>
          <div className="flex items-center justify-between mb-5 gap-3">
            <p className="text-sm text-muted">{filtered.length} {filtered.length > 1 ? t("articles") : t("article")}</p>
            <select value={sort} onChange={(e) => setSort(e.target.value)} className="border border-line bg-paper px-3 py-2 text-sm">
              <option value="featured">{t("sort.featured")}</option>
              <option value="new">{t("sort.new")}</option>
              <option value="price-asc">{t("sort.asc")}</option>
              <option value="price-desc">{t("sort.desc")}</option>
              <option value="rating">{t("sort.rating")}</option>
            </select>
          </div>
          <ProductGrid products={slice} />
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
              <button key={n} onClick={() => setPage(n)} className={`w-9 h-9 border ${page === n ? "bg-plum text-cream border-plum" : "border-line"}`}>
                {n}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
