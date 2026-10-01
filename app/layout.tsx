import type { Metadata } from "next";
import { Cormorant_Garamond, Noto_Naskh_Arabic, Outfit } from "next/font/google";
import "./globals.css";
import { FrameClient } from "@/components/layout/FrameClient";
import { ShopHydrator } from "@/components/shop/ShopHydrator";
import { I18nProvider } from "@/lib/i18n";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});

const sans = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-outfit",
});

const arabic = Noto_Naskh_Arabic({
  subsets: ["arabic"],
  weight: ["500", "600", "700"],
  variable: "--font-arabic",
});

export const metadata: Metadata = {
  title: "Sarah Beauty",
  description: "Maquillage, soins, parfums, vêtements et accessoires. Livraison 69 wilayas, paiement à la livraison.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${serif.variable} ${sans.variable} ${arabic.variable}`}>
      <body>
        <I18nProvider>
          <ShopHydrator />
          <FrameClient>{children}</FrameClient>
        </I18nProvider>
      </body>
    </html>
  );
}
