"use client";

import { useEffect } from "react";
import { useStore } from "@/lib/store";

export function ShopHydrator() {
  const loadShop = useStore((state) => state.loadShop);
  useEffect(() => {
    void loadShop();
  }, [loadShop]);
  return null;
}
