"use client";

import { use, useState } from "react";
import Link from "next/link";
import { formatDA } from "@/lib/format";
import { useStore } from "@/lib/store";
import { DeliveryCalculator } from "@/components/delivery/DeliveryCalculator";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductImage } from "@/components/product/ProductImage";

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const products = useStore((s) => s.products);
  const add = useStore((s) => s.addToCart);
  const product = products.find((p) => p.slug === slug);
  const [qty, setQty] = useState(1);
  const [photo, setPhoto] = useState(0);
  const [notice, setNotice] = useState("");

  if (!product) {
    return <div className="max-w-3xl mx-auto py-24 text-center">Cet article n&apos;est plus au catalogue. <Link href="/boutique" className="underline">Retour boutique</Link></div>;
  }

  const photos = product.images.filter((src) => src.trim());
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3);
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
      <p className="text-xs text-muted mb-6"><Link href="/boutique">Boutique</Link> / {product.name}</p>
      <div className="grid lg:grid-cols-2 gap-10">
        <div>
          <ProductImage src={photos[photo]} alt={product.name} className="w-full aspect-[4/5] object-cover bg-beige" />
          <div className="flex gap-2 mt-3">
            {photos.map((src, i) => (
              <button key={src} onClick={() => setPhoto(i)} className={`w-20 h-24 border ${photo === i ? "border-plum" : "border-line"}`}>
                <ProductImage src={src} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="text-[11px] tracking-[0.18em] uppercase text-champagne">{product.badge ?? product.universe}</p>
          <h1 className="font-serif text-5xl mt-2">{product.name}</h1>
          <p className="text-sm text-muted mt-2">{product.rating.toFixed(1)} / 5 · {product.reviewCount} avis · {product.sku}</p>
          <div className="flex items-baseline gap-3 mt-4">
            <span className="font-serif text-4xl">{formatDA(product.price)}</span>
            {product.oldPrice && <span className="line-through text-muted">{formatDA(product.oldPrice)}</span>}
          </div>
          <p className="mt-4 leading-relaxed text-ink/80">{product.description}</p>
          <p className={`text-sm mt-3 ${product.stock < 6 ? "text-danger" : "text-success"}`}>
            {product.stock === 0 ? "Rupture de stock" : `${product.stock} pièces disponibles`}
          </p>
          <div className="flex items-center gap-3 mt-5">
            <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="border border-line w-10 h-10">−</button>
            <span>{qty}</span>
            <button onClick={() => setQty((q) => Math.min(product.stock, q + 1))} className="border border-line w-10 h-10">+</button>
          </div>
          <div className="flex flex-wrap gap-3 mt-5">
            <button
              className="btn-dark px-6 py-3"
              disabled={product.stock === 0}
              onClick={() => {
                add(product.id, qty);
                setNotice("Ajouté au panier.");
              }}
            >
              Ajouter au panier
            </button>
            <Link href="/checkout" onClick={() => add(product.id, qty)} className="btn-ghost px-6 py-3">Acheter maintenant</Link>
          </div>
          {notice && <p className="text-sm text-success mt-3">{notice}</p>}
          <ul className="mt-6 space-y-2 text-sm">
            {product.benefits.map((b) => <li key={b}>· {b}</li>)}
          </ul>
          <div className="mt-8">
            <h2 className="font-serif text-2xl mb-3">Spécifications</h2>
            <dl className="divide-y divide-line border border-line">
              {product.specs.map((spec) => (
                <div key={spec.label} className="grid grid-cols-2 px-4 py-3 text-sm">
                  <dt className="text-muted">{spec.label}</dt>
                  <dd>{spec.value}</dd>
                </div>
              ))}
            </dl>
            <p className="text-sm mt-4 text-muted">{product.warranty}</p>
          </div>
          <div className="mt-8">
            <DeliveryCalculator compact />
          </div>
        </div>
      </div>
      <section className="mt-14">
        <h2 className="font-serif text-3xl mb-4">Avis</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {product.reviews.map((review) => (
            <article key={review.id} className="card-soft p-5">
              <p className="text-champagne">{"★".repeat(review.rating)}</p>
              <p className="mt-2">{review.comment}</p>
              <p className="text-xs tracking-[0.12em] uppercase text-muted mt-3">{review.author} · {review.city} · {review.date}</p>
            </article>
          ))}
        </div>
      </section>
      {related.length > 0 && (
        <section className="mt-14">
          <h2 className="font-serif text-3xl mb-4">Vous aimerez aussi</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {related.map((item) => <ProductCard key={item.id} product={item} />)}
          </div>
        </section>
      )}
    </div>
  );
}
