"use client";

import { useState } from "react";
import type { Product } from "@/lib/types";
import { ProductImage } from "@/components/product/ProductImage";

export function ProductForm({ initial, onSave }: { initial?: Product; onSave: (product: Product) => void }) {
  const [imageUrl, setImageUrl] = useState(initial?.images.find((image) => image.trim()) ?? "");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  async function uploadFile(file: File) {
    setUploadError("");
    setUploading(true);
    try {
      const body = new FormData();
      body.append("file", file);
      const response = await fetch("/api/upload", { method: "POST", body });
      const data = (await response.json()) as { url?: string; error?: string };
      if (!response.ok || !data.url) {
        setUploadError(data.error ?? "Envoi impossible.");
        return;
      }
      setImageUrl(data.url);
    } finally {
      setUploading(false);
    }
  }
  return (
    <form
      className="card-soft p-6 grid md:grid-cols-2 gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const name = String(data.get("name"));
        const product: Product = {
          id: initial?.id ?? crypto.randomUUID(),
          slug: initial?.slug ?? name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
          name,
          sku: String(data.get("sku")),
          price: Number(data.get("price")),
          oldPrice: Number(data.get("oldPrice")) || undefined,
          category: String(data.get("category")) as Product["category"],
          universe: String(data.get("universe")),
          images: [imageUrl.trim()].filter(Boolean),
          rating: initial?.rating ?? 5,
          reviewCount: initial?.reviewCount ?? 0,
          stock: Number(data.get("stock")),
          sold: initial?.sold ?? 0,
          description: String(data.get("description")),
          benefits: String(data.get("benefits")).split(",").map((s) => s.trim()).filter(Boolean),
          specs: initial?.specs ?? [{ label: "Référence", value: String(data.get("sku")) }],
          warranty: String(data.get("warranty") || "Garantie 12 mois."),
          reviews: initial?.reviews ?? [],
          isNew: Boolean(data.get("isNew")),
          isPromo: Boolean(data.get("isPromo")),
          badge: String(data.get("badge") || "") || undefined,
        };
        onSave(product);
      }}
    >
      <label className="text-xs uppercase tracking-[0.12em]">Nom<input name="name" defaultValue={initial?.name} required className="field mt-1" /></label>
      <label className="text-xs uppercase tracking-[0.12em]">SKU<input name="sku" defaultValue={initial?.sku} required className="field mt-1" /></label>
      <label className="text-xs uppercase tracking-[0.12em]">Prix<input name="price" type="number" defaultValue={initial?.price ?? 4900} required className="field mt-1" /></label>
      <label className="text-xs uppercase tracking-[0.12em]">Ancien prix<input name="oldPrice" type="number" defaultValue={initial?.oldPrice ?? ""} className="field mt-1" /></label>
      <label className="text-xs uppercase tracking-[0.12em]">Stock<input name="stock" type="number" defaultValue={initial?.stock ?? 10} required className="field mt-1" /></label>
      <label className="text-xs uppercase tracking-[0.12em]">Catégorie
        <select name="category" defaultValue={initial?.category ?? "brosses"} className="field mt-1">
          <option value="brosses">Brosses</option>
          <option value="vetements">Vêtements</option>
        </select>
      </label>
      <label className="text-xs uppercase tracking-[0.12em]">Univers
        <select name="universe" defaultValue={initial?.universe ?? "Cheveux"} className="field mt-1">
          <option>Cheveux</option><option>Beauté</option><option>Mode</option><option>Accessoires</option>
        </select>
      </label>
      <label className="text-xs uppercase tracking-[0.12em]">Badge<input name="badge" defaultValue={initial?.badge} className="field mt-1" /></label>
      <div className="md:col-span-2 space-y-3">
        <label className="text-xs uppercase tracking-[0.12em] block">Lien de l&apos;image
          <input value={imageUrl} onChange={(event) => setImageUrl(event.target.value)} placeholder="https://… ou fichier envoyé" className="field mt-1" />
        </label>
        <label
          className="block border border-dashed border-line bg-paper px-4 py-6 text-center text-sm cursor-pointer"
          onDragOver={(event) => event.preventDefault()}
          onDrop={(event) => {
            event.preventDefault();
            const file = event.dataTransfer.files[0];
            if (file) void uploadFile(file);
          }}
        >
          <input
            type="file"
            accept=".jpg,.jpeg,.png,.pdf,image/jpeg,image/png,application/pdf"
            className="hidden"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) void uploadFile(file);
            }}
          />
          {uploading ? "Envoi du fichier…" : "Déposer un fichier ici, ou cliquer pour choisir un JPG, PNG ou PDF"}
        </label>
        {uploadError && <p className="text-danger text-sm">{uploadError}</p>}
        {imageUrl && <ProductImage src={imageUrl} alt="Aperçu" className="h-40 w-32 object-cover" />}
      </div>
      <label className="md:col-span-2 text-xs uppercase tracking-[0.12em]">Description<textarea name="description" defaultValue={initial?.description} required className="field mt-1 min-h-28" /></label>
      <label className="md:col-span-2 text-xs uppercase tracking-[0.12em]">Bénéfices (séparés par des virgules)<input name="benefits" defaultValue={initial?.benefits.join(", ")} className="field mt-1" /></label>
      <label className="md:col-span-2 text-xs uppercase tracking-[0.12em]">Garantie<input name="warranty" defaultValue={initial?.warranty} className="field mt-1" /></label>
      <label className="text-sm"><input type="checkbox" name="isNew" defaultChecked={initial?.isNew} className="mr-2" />Nouveauté</label>
      <label className="text-sm"><input type="checkbox" name="isPromo" defaultChecked={initial?.isPromo} className="mr-2" />Promotion</label>
      <button className="btn-dark md:col-span-2 py-3">Enregistrer</button>
    </form>
  );
}
