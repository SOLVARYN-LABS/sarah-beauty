"use client";

import { Suspense } from "react";
import { CatalogView } from "@/components/product/CatalogView";

export default function Page() {
  return (
    <Suspense>
      <CatalogView title="Beauté" intro="Maquillage, soins de la peau, parfums et ongles." preset={(p) => p.universe === "Beauté" || p.category === "maquillage" || p.category === "soins-peau" || p.category === "parfums" || p.category === "ongles"} />
    </Suspense>
  );
}
