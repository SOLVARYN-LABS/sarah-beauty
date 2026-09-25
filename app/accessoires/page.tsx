"use client";

import { Suspense } from "react";
import { CatalogView } from "@/components/product/CatalogView";

export default function Page() {
  return (
    <Suspense>
      <CatalogView title="Accessoires" intro="Bijoux fins et détails qui complètent la silhouette." preset={(p) => p.universe === "Accessoires" || p.category === "bijoux-accessoires"} />
    </Suspense>
  );
}
