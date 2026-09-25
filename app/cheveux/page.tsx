"use client";

import { Suspense } from "react";
import { CatalogView } from "@/components/product/CatalogView";

export default function Page() {
  return (
    <Suspense>
      <CatalogView title="Cheveux" intro="Brosses chauffantes, styling et soins de la fibre." preset={(p) => p.universe === "Cheveux" || p.category === "brosses"} />
    </Suspense>
  );
}
