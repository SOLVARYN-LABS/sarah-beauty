"use client";

import { useRouter } from "next/navigation";
import { use } from "react";
import { ProductForm } from "@/components/seller/ProductForm";
import { useStore } from "@/lib/store";
import type { Product } from "@/lib/types";

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const product = useStore((s) => s.products.find((p) => p.id === id));
  const upsert = useStore((s) => s.upsertProduct);
  const router = useRouter();
  if (!product) return <p>Produit introuvable.</p>;
  return (
    <div className="max-w-3xl">
      <h1 className="font-serif text-4xl mb-6">Modifier {product.name}</h1>
      <ProductForm
        initial={product}
        onSave={(next: Product) => {
          void upsert(next).then(() => router.push("/seller/products"));
        }}
      />
    </div>
  );
}
