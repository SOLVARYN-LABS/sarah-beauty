"use client";

import { Suspense } from "react";
import { CatalogView } from "@/components/product/CatalogView";

export default function Page() {
  return (
    <Suspense>
      <CatalogView title="Mode" intro="Pochettes et pièces à porter avec une routine Ayla." preset={(p) => p.universe === "Mode" || p.category === "vetements" || p.category === "sacs-pochettes"} />
    </Suspense>
  );
}
