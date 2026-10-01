export const BRAND = "SARAH BEAUTY";

export const categories = [
  {
    slug: "maquillage",
    title: "Maquillage",
    titleAr: "المكياج",
    subtitle: "Teint, yeux, lèvres",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1400&q=80",
  },
  {
    slug: "soins-peau",
    title: "Soins de la peau",
    titleAr: "العناية بالبشرة",
    subtitle: "Sérums, crèmes, rituels",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1400&q=80",
  },
  {
    slug: "soins-capillaires",
    title: "Soins capillaires",
    titleAr: "العناية بالشعر",
    subtitle: "Masques, huiles, fibre",
    image: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=1400&q=80",
  },
  {
    slug: "brosses",
    title: "Brosses & outils",
    titleAr: "الفراش والأدوات",
    subtitle: "Lisseurs, brosses, pinceaux",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1400&q=80",
  },
  {
    slug: "parfums",
    title: "Parfums",
    titleAr: "العطور",
    subtitle: "Eaux de parfum et brumes",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=1400&q=80",
  },
  {
    slug: "vetements",
    title: "Vêtements",
    titleAr: "الملابس",
    subtitle: "Robes, ensembles, quotidien",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1400&q=80",
  },
  {
    slug: "accessoires",
    title: "Accessoires",
    titleAr: "الإكسسوارات",
    subtitle: "Foulards, ceintures, lunettes",
    image: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?auto=format&fit=crop&w=1400&q=80",
  },
  {
    slug: "bijoux",
    title: "Bijoux",
    titleAr: "المجوهرات",
    subtitle: "Boucles, colliers, bagues",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1400&q=80",
  },
  {
    slug: "sacs",
    title: "Sacs",
    titleAr: "الحقائب",
    subtitle: "Sacs à main et pochettes",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1400&q=80",
  },
  {
    slug: "ongles",
    title: "Ongles",
    titleAr: "الأظافر",
    subtitle: "Vernis, soins, manucure",
    image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=1400&q=80",
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
  SARAH10: 0.1,
  SARAH20: 0.2,
  AYLA10: 0.1,
  AYLA20: 0.2,
};

export const categoryAliases: Record<string, string> = {
  "brosses-chauffantes": "brosses",
  "maquillage-skincare": "maquillage",
  "sacs-pochettes": "sacs",
  "bijoux-accessoires": "bijoux",
};
