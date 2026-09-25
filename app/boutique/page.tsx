"use client";

import { Suspense } from "react";
import { CatalogView } from "@/components/product/CatalogView";

export default function BoutiquePage() {
  return (
    <Suspense>
      <CatalogView
        title="La boutique"
        intro="Brosses, soins, mode et accessoires sélectionnés par la maison. Filtrez, comparez, commandez en paiement à la livraison."
      />
    </Suspense>
  );
}
