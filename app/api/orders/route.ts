import { coupons } from "@/lib/catalog";
import { readDb, writeDb } from "@/lib/server/db";
import { getWilaya } from "@/lib/wilayas";
import type { DeliveryMode, Order, OrderItem, StockMovement } from "@/lib/types";

type Body = {
  firstName: string;
  lastName: string;
  phone: string;
  phone2?: string;
  wilayaCode: string;
  commune: string;
  address: string;
  deliveryMode: DeliveryMode;
  coupon?: string;
  items: { productId: string; quantity: number }[];
};

export async function POST(request: Request) {
  const body = (await request.json()) as Body;
  const db = readDb();
  if (!body.items?.length) return Response.json({ ok: false, error: "Votre panier est vide." }, { status: 400 });
  const wilaya = getWilaya(body.wilayaCode);
  if (!wilaya) return Response.json({ ok: false, error: "Choisissez une wilaya." }, { status: 400 });

  const items: OrderItem[] = [];
  for (const line of body.items) {
    const product = db.products.find((item) => item.id === line.productId);
    if (!product || product.stock < line.quantity) {
      return Response.json({ ok: false, error: `Stock insuffisant pour ${product?.name ?? "cet article"}.` }, { status: 400 });
    }
    items.push({
      productId: product.id,
      name: product.name,
      sku: product.sku,
      price: product.price,
      quantity: line.quantity,
      image: product.images[0] ?? "",
    });
  }

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const code = body.coupon?.trim().toUpperCase();
  const rate = code ? coupons[code] : 0;
  if (code && !rate) return Response.json({ ok: false, error: "Code promo invalide." }, { status: 400 });
  const discount = Math.round(subtotal * (rate || 0));
  const deliveryPrice = body.deliveryMode === "home" ? wilaya.home : wilaya.stopdesk;
  const order: Order = {
    id: crypto.randomUUID(),
    number: `#AY-${1001 + db.orders.length}`,
    createdAt: new Date().toISOString(),
    firstName: body.firstName,
    lastName: body.lastName,
    phone: body.phone,
    phone2: body.phone2,
    wilayaCode: wilaya.code,
    wilayaName: wilaya.name,
    commune: body.commune,
    address: body.address,
    deliveryMode: body.deliveryMode,
    items,
    subtotal,
    deliveryPrice,
    discount,
    coupon: rate ? code : undefined,
    total: subtotal - discount + deliveryPrice,
    status: "a-confirmer",
    channel: "Boutique web",
  };
  const movements: StockMovement[] = items.map((item) => ({
    id: crypto.randomUUID(),
    productId: item.productId,
    sku: item.sku,
    name: item.name,
    quantity: -item.quantity,
    type: "commande",
    note: `Commande ${order.number}`,
    createdAt: order.createdAt,
  }));
  for (const item of items) {
    const product = db.products.find((entry) => entry.id === item.productId);
    if (!product) continue;
    product.stock -= item.quantity;
    product.sold += item.quantity;
  }
  db.orders.unshift(order);
  db.movements.unshift(...movements);
  writeDb(db);
  return Response.json({ ok: true, order, products: db.products });
}
