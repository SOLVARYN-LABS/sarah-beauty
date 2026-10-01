"use client";

import { Suspense, use } from "react";
import { CatalogView } from "@/components/product/CatalogView";
import { categories, categoryAliases } from "@/lib/catalog";

const titles: Record<string, { title: string; intro: string }> = {
  brosses: {
    title: "Brosses",
    intro: "La section est ouverte. Les brosses ajoutées par la maison apparaissent ici.",
  },
  maquillage: {
    title: "Maquillage",
    intro: "Teint, yeux et soins du visage publiés par la boutique.",
  },
  vetements: {
    title: "Vêtements",
    intro: "Les pièces mode ajoutées dans l'espace vendeur.",
  },
  "soins-capillaires": {
    title: "Soins capillaires",
    intro: "Sérums et rituels pour protéger la fibre avant et après la chaleur.",
  },
  "maquillage-skincare": {
    title: "Maquillage & skincare",
    intro: "Teint lumineux et gestes précis, dans la palette ivoire de la maison.",
  },
  "sacs-pochettes": {
    title: "Sacs & pochettes",
    intro: "Pièces du soir en satin champagne et lignes épurées.",
  },
  "bijoux-accessoires": {
    title: "Bijoux & accessoires",
    intro: "Or discret, fermoirs sûrs, finitions qui restent.",
  },
};

export default function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category: raw } = use(params);
  const category = categoryAliases[raw] ?? raw;
  const known = categories.find((c) => c.slug === category);
  const copy = titles[category] ?? {
    title: known?.title ?? "Collection",
    intro: known?.subtitle ?? "Sélection Sarah Beauty.",
  };
  return (
    <Suspense>
      <CatalogView
        title={copy.title}
        intro={copy.intro}
        preset={(product) => product.category === category}
      />
    </Suspense>
  );
}
