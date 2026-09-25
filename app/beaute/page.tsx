"use client";

import { Suspense } from "react";
import { CatalogView } from "@/components/product/CatalogView";

export default function Page() {
  return (
    <Suspense>
      <CatalogView title="Beauté" intro="Soins, sérums et gestes de lumière." preset={(p) => p.universe === "Beauté" || p.category === "maquillage" || p.category === "soins-capillaires"} />
    </Suspense>
  );
}
