"use client";

import { Suspense } from "react";
import { CatalogView } from "@/components/product/CatalogView";

export default function Page() {
  return (
    <Suspense>
      <CatalogView title="Accessoires" intro="Bijoux, sacs et détails qui complètent la silhouette." preset={(p) => ["Accessoires", "Bijoux"].includes(p.universe) || p.category === "accessoires" || p.category === "bijoux" || p.category === "sacs" || p.category === "bijoux-accessoires"} />
    </Suspense>
  );
}
