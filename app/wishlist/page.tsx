"use client";

import Link from "next/link";
import { ProductCard } from "@/components/product/ProductCard";
import { useStore } from "@/lib/store";

export default function WishlistPage() {
  const ids = useStore((s) => s.wishlist);
  const products = useStore((s) => s.products).filter((p) => ids.includes(p.id));
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="font-serif text-5xl mb-8">Favoris</h1>
      {products.length === 0 ? (
        <p>Aucun favori pour le moment. <Link className="underline" href="/boutique">Explorer la boutique</Link></p>
      ) : (
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {products.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  );
}
