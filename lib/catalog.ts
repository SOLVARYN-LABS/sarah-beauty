export const categories = [
  {
    slug: "brosses",
    title: "Brosses",
    subtitle: "Chauffantes, ioniques, voyage",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1400&q=80",
  },
  {
    slug: "vetements",
    title: "Vêtements",
    subtitle: "Pièces du quotidien",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1400&q=80",
  },
] as const;

export const navLinks = [
  { href: "/", key: "nav.home" },
  { href: "/boutique", key: "nav.shop" },
  { href: "/nouveautes", key: "nav.new" },
  { href: "/beaute", key: "nav.beauty" },
  { href: "/cheveux", key: "nav.hair" },
  { href: "/mode", key: "nav.fashion" },
  { href: "/accessoires", key: "nav.accessories" },
  { href: "/promotions", key: "nav.sales" },
] as const;

export const coupons: Record<string, number> = {
  AYLA10: 0.1,
  AYLA20: 0.2,
};

export const WHATSAPP = "213558568228";
export const WHATSAPP_DISPLAY = "0558 56 82 28";

export const categoryAliases: Record<string, string> = {
  "brosses-chauffantes": "brosses",
  "maquillage-skincare": "maquillage",
};
