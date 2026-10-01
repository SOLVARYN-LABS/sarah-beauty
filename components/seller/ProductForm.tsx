"use client";

import { useState } from "react";
import type { Product } from "@/lib/types";
import { categories } from "@/lib/catalog";
import { ProductImage } from "@/components/product/ProductImage";

function readFile(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Lecture de la photo impossible."));
    reader.readAsDataURL(file);
  });
}

function fileToProductPhoto(file: File) {
  const extension = file.name.split(".").pop()?.toLowerCase() ?? "";
  const isPdf = file.type === "application/pdf" || extension === "pdf";
  if (file.size > 8 * 1024 * 1024) return Promise.reject(new Error("Fichier trop lourd (8 Mo maximum)."));
  if (isPdf) return readFile(file);
  const isImage = file.type.startsWith("image/") || ["jpg", "jpeg", "png", "webp"].includes(extension);
  if (!isImage) return Promise.reject(new Error("Choisis une photo JPG, PNG ou WEBP."));
  return readFile(file).then(
    (dataUrl) =>
      new Promise<string>((resolve, reject) => {
        const image = new Image();
        image.onload = () => {
          const max = 1400;
          const scale = Math.min(1, max / Math.max(image.width, image.height));
          const canvas = document.createElement("canvas");
          canvas.width = Math.max(1, Math.round(image.width * scale));
          canvas.height = Math.max(1, Math.round(image.height * scale));
          const context = canvas.getContext("2d");
          if (!context) {
            reject(new Error("Cette photo ne peut pas être préparée."));
            return;
          }
          context.drawImage(image, 0, 0, canvas.width, canvas.height);
          resolve(canvas.toDataURL("image/jpeg", 0.85));
        };
        image.onerror = () => reject(new Error("Cette photo ne peut pas être lue. Choisis un JPG ou un PNG."));
        image.src = dataUrl;
      }),
  );
}

export function ProductForm({ initial, onSave }: { initial?: Product; onSave: (product: Product) => void }) {
  const [imageUrl, setImageUrl] = useState(initial?.images.find((image) => image.trim()) ?? "");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  async function uploadFile(file: File) {
    setUploadError("");
    setUploading(true);
    try {
      const photo = await fileToProductPhoto(file);
      setImageUrl(photo);
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : "Cette photo ne peut pas être ajoutée.");
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
        <select name="category" defaultValue={initial?.category ?? "maquillage"} className="field mt-1">
          {categories.map((category) => (
            <option key={category.slug} value={category.slug}>{category.title}</option>
          ))}
        </select>
      </label>
      <label className="text-xs uppercase tracking-[0.12em]">Univers
        <select name="universe" defaultValue={initial?.universe ?? "Cheveux"} className="field mt-1">
          <option>Beauté</option><option>Cheveux</option><option>Parfums</option><option>Mode</option><option>Accessoires</option><option>Bijoux</option>
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
            accept="image/jpeg,image/png,image/webp,image/jpg,.jpg,.jpeg,.png,.webp,.pdf,application/pdf"
            className="hidden"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) void uploadFile(file);
            }}
          />
          {uploading ? "Préparation de la photo…" : "Choisir une photo dans la galerie (JPG, PNG ou WEBP)"}
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
