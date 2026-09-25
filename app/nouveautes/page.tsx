"use client";

import { Suspense } from "react";
import { CatalogView } from "@/components/product/CatalogView";

export default function Page() {
  return (
    <Suspense>
      <CatalogView title="Nouveautés" intro="Les pièces qui viennent d'arriver dans la maison." preset={(p) => Boolean(p.isNew)} />
    </Suspense>
  );
}
