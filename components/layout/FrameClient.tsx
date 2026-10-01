"use client";

import { usePathname } from "next/navigation";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function FrameClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const seller = pathname.startsWith("/seller");
  if (seller) return <>{children}</>;
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
