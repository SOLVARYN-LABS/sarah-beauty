"use client";

import { useRouter } from "next/navigation";
import { ProductForm } from "@/components/seller/ProductForm";
import { useStore } from "@/lib/store";
import type { Product } from "@/lib/types";

export default function NewProductPage() {
  const upsert = useStore((s) => s.upsertProduct);
  const router = useRouter();

  function save(product: Product) {
    void upsert(product).then(() => router.push("/seller/products"));
  }

  return (
    <div className="max-w-3xl">
      <h1 className="font-serif text-4xl mb-6">Nouveau produit</h1>
      <ProductForm onSave={save} />
    </div>
  );
}
