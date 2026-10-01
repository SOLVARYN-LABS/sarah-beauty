"use client";

import { Suspense } from "react";
import { CatalogView } from "@/components/product/CatalogView";

export default function Page() {
  return (
    <Suspense>
      <CatalogView title="Cheveux" intro="Soins capillaires, brosses et outils de styling." preset={(p) => p.universe === "Cheveux" || p.category === "brosses" || p.category === "soins-capillaires"} />
    </Suspense>
  );
}
