"use client";

import { ProductCard } from "./ProductCard";
import type { Product } from "@/lib/types";
import { useI18n } from "@/lib/i18n";

export function ProductGrid({ products }: { products: Product[] }) {
  const { t } = useI18n();
  if (products.length === 0) {
    return <p className="text-muted py-16 text-center">{t("none")}</p>;
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
