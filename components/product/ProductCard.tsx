"use client";

import Link from "next/link";
import { Heart, ShoppingBag } from "lucide-react";
import type { Product } from "@/lib/types";
import { discountPercent, formatDA } from "@/lib/format";
import { useStore } from "@/lib/store";
import { useI18n } from "@/lib/i18n";
import { ProductImage } from "@/components/product/ProductImage";

export function ProductCard({ product }: { product: Product }) {
  const toggle = useStore((s) => s.toggleWishlist);
  const wished = useStore((s) => s.wishlist.includes(product.id));
  const add = useStore((s) => s.addToCart);
  const off = discountPercent(product.price, product.oldPrice);
  const low = product.stock > 0 && product.stock <= 5;
  const { t } = useI18n();

  return (
    <article className="card-soft group overflow-hidden flex flex-col">
      <div className="relative aspect-[4/5] bg-[#efe7de] overflow-hidden">
        <Link href={`/produit/${product.slug}`} className="block h-full">
          <ProductImage
            src={product.images.find((image) => image.trim())}
            alt={product.name}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          />
        </Link>
        {product.badge && (
          <span className="absolute top-3 left-3 bg-plum text-cream text-[10px] tracking-[0.14em] px-2 py-1">
            {product.badge}
          </span>
        )}
        {off > 0 && (
          <span className="absolute top-3 right-3 bg-beige text-plum text-[10px] tracking-[0.12em] px-2 py-1">
            −{off}%
          </span>
        )}
        <button
          aria-label="Favori"
          onClick={() => toggle(product.id)}
          className="absolute bottom-3 right-3 bg-paper/90 p-2"
        >
          <Heart size={16} className={wished ? "fill-plum text-plum" : ""} />
        </button>
      </div>
      <div className="p-4 flex flex-col gap-2 flex-1">
        <p className="text-[11px] tracking-[0.16em] uppercase text-muted">{product.universe}</p>
        <Link href={`/produit/${product.slug}`} className="font-serif text-xl leading-tight">
          {product.name}
        </Link>
        <div className="text-xs text-champagne tracking-wide">
          {"★".repeat(Math.round(product.rating))}{" "}
          <span className="text-muted">{product.rating.toFixed(1)} · {product.reviewCount} avis</span>
        </div>
        <div className="flex items-baseline gap-2 mt-1">
          <span className="text-plum">{formatDA(product.price)}</span>
          {product.oldPrice && (
            <span className="text-xs text-muted line-through">{formatDA(product.oldPrice)}</span>
          )}
        </div>
        <p className={`text-xs ${product.stock === 0 ? "text-danger" : low ? "text-danger" : "text-success"}`}>
          {product.stock === 0 ? t("out") : low ? t("lowStock", { n: product.stock }) : t("inStock")}
        </p>
        <button
          disabled={product.stock === 0}
          onClick={() => add(product.id)}
          className="btn-dark mt-auto py-3 disabled:opacity-40 flex items-center justify-center gap-2"
        >
          <ShoppingBag size={14} /> {t("add")}
        </button>
      </div>
    </article>
  );
}
