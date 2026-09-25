"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { coupons } from "./catalog";
import type { CartItem, DeliveryMode, Order, OrderStatus, Product, StockMovement } from "./types";

type CheckoutInput = {
  firstName: string;
  lastName: string;
  phone: string;
  phone2?: string;
  wilayaCode: string;
  commune: string;
  address: string;
  deliveryMode: DeliveryMode;
  coupon?: string;
};

type Store = {
  products: Product[];
  cart: CartItem[];
  wishlist: string[];
  orders: Order[];
  movements: StockMovement[];
  sellerAuth: boolean;
  sellerName: string;
  hydrated: boolean;
  setHydrated: () => void;
  loadShop: () => Promise<void>;
  loadSeller: () => Promise<boolean>;
  addToCart: (productId: string, quantity?: number) => void;
  setQty: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  loginSeller: (email: string, password: string) => Promise<boolean>;
  logoutSeller: () => Promise<void>;
  placeOrder: (input: CheckoutInput) => Promise<{ ok: true; order: Order } | { ok: false; error: string }>;
  updateOrderStatus: (id: string, status: OrderStatus) => Promise<void>;
  upsertProduct: (product: Product) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  adjustStock: (productId: string, delta: number, note: string) => Promise<void>;
  rememberOrder: (order: Order) => void;
};

export const useStore = create<Store>()(
  persist(
    (set, get) => ({
      products: [],
      cart: [],
      wishlist: [],
      orders: [],
      movements: [],
      sellerAuth: false,
      sellerName: "",
      hydrated: false,
      setHydrated: () => set({ hydrated: true }),
      loadShop: async () => {
        const response = await fetch("/api/shop");
        const data = (await response.json()) as { products: Product[] };
        set({ products: data.products ?? [], hydrated: true });
      },
      loadSeller: async () => {
        const response = await fetch("/api/seller/session");
        if (!response.ok) {
          set({ sellerAuth: false, hydrated: true });
          return false;
        }
        const data = (await response.json()) as {
          name: string;
          products: Product[];
          orders: Order[];
          movements: StockMovement[];
        };
        set({
          sellerAuth: true,
          sellerName: data.name,
          products: data.products,
          orders: data.orders,
          movements: data.movements,
          hydrated: true,
        });
        return true;
      },
      addToCart: (productId, quantity = 1) => {
        const product = get().products.find((item) => item.id === productId);
        if (!product || product.stock < 1) return;
        set((state) => {
          const found = state.cart.find((item) => item.productId === productId);
          if (found) {
            return {
              cart: state.cart.map((item) =>
                item.productId === productId
                  ? { ...item, quantity: Math.min(product.stock, item.quantity + quantity) }
                  : item,
              ),
            };
          }
          return { cart: [...state.cart, { productId, quantity: Math.min(product.stock, quantity) }] };
        });
      },
      setQty: (productId, quantity) => {
        const product = get().products.find((item) => item.id === productId);
        if (!product) return;
        if (quantity <= 0) {
          set((state) => ({ cart: state.cart.filter((item) => item.productId !== productId) }));
          return;
        }
        set((state) => ({
          cart: state.cart.map((item) =>
            item.productId === productId ? { ...item, quantity: Math.min(product.stock, quantity) } : item,
          ),
        }));
      },
      removeFromCart: (productId) => set((state) => ({ cart: state.cart.filter((item) => item.productId !== productId) })),
      clearCart: () => set({ cart: [] }),
      toggleWishlist: (productId) =>
        set((state) => ({
          wishlist: state.wishlist.includes(productId)
            ? state.wishlist.filter((id) => id !== productId)
            : [...state.wishlist, productId],
        })),
      loginSeller: async (email, password) => {
        const response = await fetch("/api/seller/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
        if (!response.ok) return false;
        await get().loadSeller();
        return true;
      },
      logoutSeller: async () => {
        await fetch("/api/seller/logout", { method: "POST" });
        set({ sellerAuth: false, sellerName: "", orders: [], movements: [] });
      },
      placeOrder: async (input) => {
        const response = await fetch("/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...input, items: get().cart }),
        });
        const data = (await response.json()) as { ok: boolean; error?: string; order?: Order; products?: Product[] };
        if (!response.ok || !data.ok || !data.order) return { ok: false, error: data.error ?? "Commande impossible." };
        set({ cart: [], products: data.products ?? get().products, orders: [data.order, ...get().orders] });
        return { ok: true, order: data.order };
      },
      updateOrderStatus: async (id, status) => {
        const response = await fetch(`/api/orders/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status }),
        });
        if (!response.ok) return;
        const data = (await response.json()) as { orders: Order[] };
        set({ orders: data.orders });
      },
      upsertProduct: async (product) => {
        const response = await fetch("/api/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(product),
        });
        if (!response.ok) return;
        const data = (await response.json()) as { products: Product[] };
        set({ products: data.products });
      },
      deleteProduct: async (id) => {
        const response = await fetch("/api/products", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }),
        });
        if (!response.ok) return;
        const data = (await response.json()) as { products: Product[] };
        set({
          products: data.products,
          cart: get().cart.filter((item) => item.productId !== id),
          wishlist: get().wishlist.filter((item) => item !== id),
        });
      },
      adjustStock: async (productId, delta, note) => {
        const response = await fetch("/api/stock", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productId, delta, note }),
        });
        if (!response.ok) return;
        const data = (await response.json()) as { products: Product[]; movements: StockMovement[] };
        set({ products: data.products, movements: data.movements });
      },
      rememberOrder: (order) => set((state) => ({ orders: [order, ...state.orders.filter((item) => item.id !== order.id)] })),
    }),
    {
      name: "boutique-ayla-client",
      partialize: (state) => ({ cart: state.cart, wishlist: state.wishlist }),
    },
  ),
);

export function quoteCoupon(subtotal: number, coupon?: string) {
  const code = coupon?.trim().toUpperCase();
  const rate = code ? (coupons[code] ?? 0) : 0;
  return { code: rate ? code : undefined, discount: Math.round(subtotal * rate), valid: !code || rate > 0 };
}
