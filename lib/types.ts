export type CategorySlug =
  | "brosses"
  | "maquillage"
  | "vetements"
  | "soins-capillaires"
  | "sacs-pochettes"
  | "bijoux-accessoires";

export type Review = {
  id: string;
  author: string;
  city: string;
  rating: number;
  comment: string;
  date: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  sku: string;
  price: number;
  oldPrice?: number;
  category: CategorySlug;
  universe: string;
  images: string[];
  rating: number;
  reviewCount: number;
  stock: number;
  sold: number;
  badge?: string;
  description: string;
  benefits: string[];
  specs: { label: string; value: string }[];
  warranty: string;
  isNew?: boolean;
  isPromo?: boolean;
  reviews: Review[];
};

export type CartItem = {
  productId: string;
  quantity: number;
};

export type DeliveryMode = "home" | "stopdesk";

export type OrderStatus =
  | "a-confirmer"
  | "confirmee"
  | "preparation"
  | "expediee"
  | "livree"
  | "annulee"
  | "retournee";

export type OrderItem = {
  productId: string;
  name: string;
  sku: string;
  price: number;
  quantity: number;
  image: string;
};

export type Order = {
  id: string;
  number: string;
  createdAt: string;
  firstName: string;
  lastName: string;
  phone: string;
  phone2?: string;
  wilayaCode: string;
  wilayaName: string;
  commune: string;
  address: string;
  deliveryMode: DeliveryMode;
  items: OrderItem[];
  subtotal: number;
  deliveryPrice: number;
  discount: number;
  coupon?: string;
  total: number;
  status: OrderStatus;
  channel: string;
};

export type StockMovement = {
  id: string;
  productId: string;
  sku: string;
  name: string;
  quantity: number;
  type: "entree" | "sortie" | "commande";
  note: string;
  createdAt: string;
};

export type Wilaya = {
  code: string;
  name: string;
  home: number;
  stopdesk: number;
  delay: string;
  zone: string;
  communes: string[];
};
