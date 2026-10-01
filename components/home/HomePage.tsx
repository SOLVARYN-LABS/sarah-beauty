"use client";

import Link from "next/link";
import { categories } from "@/lib/catalog";
import { useStore } from "@/lib/store";
import { CategoryCard } from "@/components/product/CategoryCard";
import { ProductCard } from "@/components/product/ProductCard";
import { DeliveryCalculator } from "@/components/delivery/DeliveryCalculator";
import { useI18n } from "@/lib/i18n";

const hero =
  "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=1400&q=80";
const story =
  "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=1400&q=80";
const insta = [
  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=600&q=80",
];

export function HomePage() {
  const products = useStore((s) => s.products);
  const featured = products.slice(0, 4);
  const { t, locale } = useI18n();

  return (
    <div>
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-10 grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
        <div>
          <p className="text-[11px] tracking-[0.22em] uppercase text-champagne">{t("hero.kicker")}</p>
          <h1 className="font-serif text-5xl md:text-7xl leading-[0.95] mt-4 text-plum">
            {t("hero.title")} <span className="italic">{t("hero.titleEm")}</span>
          </h1>
          <p className="text-muted max-w-xl mt-5 leading-relaxed">{t("hero.text")}</p>
          <div className="flex flex-wrap gap-3 mt-7">
            <Link href="/boutique/maquillage" className="btn-dark px-6 py-3">{t("hero.cta")}</Link>
            <Link href="/nouveautes" className="btn-ghost px-6 py-3">{t("hero.news")}</Link>
          </div>
          <div className="grid grid-cols-3 gap-3 mt-10 max-w-lg">
            {(["benefit.1", "benefit.2", "benefit.3"] as const).map((item) => (
              <div key={item} className="border border-line bg-paper px-3 py-4 text-center text-xs tracking-[0.08em] uppercase">
                {t(item)}
              </div>
            ))}
          </div>
        </div>
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={hero} alt="Portrait Sarah Beauty" className="w-full aspect-[4/5] object-cover" />
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        <div className="flex items-end justify-between mb-6">
          <h2 className="font-serif text-4xl">{t("univers")}</h2>
          <Link href="/boutique" className="text-xs tracking-[0.16em] uppercase">{t("shopAll")}</Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat, index) => (
            <CategoryCard
              key={cat.slug}
              href={`/boutique/${cat.slug}`}
              title={locale === "ar" ? cat.titleAr : cat.title}
              subtitle={cat.subtitle}
              image={cat.image}
              delay={index * 80}
            />
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-6 py-10">
        <h2 className="font-serif text-4xl mb-6">{t("featured")}</h2>
        {featured.length === 0 ? (
          <p className="text-muted">{t("featured.empty")}</p>
        ) : (
          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5">
            {featured.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        )}
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-6 py-6">
        <DeliveryCalculator />
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-6 py-12 grid lg:grid-cols-2 gap-8 items-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={story} alt="Architecture" className="w-full h-[420px] object-cover" />
        <div>
          <p className="text-[11px] tracking-[0.2em] uppercase text-champagne">{t("story.kicker")}</p>
          <h2 className="font-serif text-5xl mt-2">{t("story.title")}</h2>
          <p className="text-muted mt-4 leading-relaxed">{t("story.text")}</p>
          <Link href="/cheveux" className="btn-ghost inline-block mt-6 px-5 py-3">{t("story.cta")}</Link>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        <h2 className="font-serif text-4xl mb-6 text-center">{t("voices")}</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {([
            ["voice.1.who", "voice.1"],
            ["voice.2.who", "voice.2"],
            ["voice.3.who", "voice.3"],
          ] as const).map(([name, text]) => (
            <blockquote key={name} className="card-soft p-6">
              <p className="font-serif text-2xl leading-snug">“{t(text)}”</p>
              <footer className="text-xs tracking-[0.14em] uppercase mt-4 text-muted">{t(name)}</footer>
            </blockquote>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-6 py-10">
        <h2 className="font-serif text-4xl text-center">{t("insta")}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
          {insta.map((src) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={src} src={src} alt="Routine Sarah Beauty" className="aspect-square object-cover" />
          ))}
        </div>
      </section>

      <section className="bg-plum text-cream">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <p className="text-[11px] tracking-[0.2em] uppercase text-champagne">{t("partner.kicker")}</p>
            <h2 className="font-serif text-4xl mt-2">{t("partner.title")}</h2>
            <p className="text-[#e6dcd3] mt-2 max-w-xl">{t("partner.text")}</p>
          </div>
          <Link href="/seller" className="border border-champagne px-6 py-3 text-xs tracking-[0.16em]">{t("partner.cta")}</Link>
        </div>
      </section>
    </div>
  );
}
