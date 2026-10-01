"use client";

import { Suspense } from "react";
import { CatalogView } from "@/components/product/CatalogView";

export default function Page() {
  return (
    <Suspense>
      <CatalogView title="Promotions" intro="Les pièces de la maison actuellement en réduction. Code salon : SARAH10." preset={(p) => Boolean(p.isPromo)} />
    </Suspense>
  );
}
