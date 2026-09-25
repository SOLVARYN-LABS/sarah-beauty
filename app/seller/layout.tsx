"use client";

import type { ReactNode } from "react";
import { SellerShell } from "@/components/seller/SellerShell";

export default function SellerLayout({ children }: { children: ReactNode }) {
  return <SellerShell>{children}</SellerShell>;
}
