import { isSeller } from "@/lib/server/auth";
import { readDb, writeDb } from "@/lib/server/db";
import type { OrderStatus } from "@/lib/types";

export async function GET(_request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const order = readDb().orders.find((item) => item.id === id);
  if (!order) return Response.json({ error: "Introuvable" }, { status: 404 });
  return Response.json({ order });
}

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  if (!(await isSeller())) return Response.json({ error: "Non autorisé" }, { status: 401 });
  const { id } = await context.params;
  const { status } = (await request.json()) as { status: OrderStatus };
  const db = readDb();
  const order = db.orders.find((item) => item.id === id);
  if (!order) return Response.json({ error: "Introuvable" }, { status: 404 });
  order.status = status;
  writeDb(db);
  return Response.json({ orders: db.orders });
}
