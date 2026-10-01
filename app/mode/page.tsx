"use client";

import { Suspense } from "react";
import { CatalogView } from "@/components/product/CatalogView";

export default function Page() {
  return (
    <Suspense>
      <CatalogView title="Mode" intro="Vêtements, sacs et pièces à porter au quotidien." preset={(p) => p.universe === "Mode" || p.category === "vetements" || p.category === "sacs" || p.category === "sacs-pochettes"} />
    </Suspense>
  );
}
