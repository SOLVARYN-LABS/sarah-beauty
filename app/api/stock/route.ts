import { isSeller } from "@/lib/server/auth";
import { readDb, writeDb } from "@/lib/server/db";
import type { StockMovement } from "@/lib/types";

export async function POST(request: Request) {
  if (!(await isSeller())) return Response.json({ error: "Non autorisé" }, { status: 401 });
  const body = (await request.json()) as { productId: string; delta: number; note: string };
  const db = readDb();
  const product = db.products.find((item) => item.id === body.productId);
  if (!product) return Response.json({ error: "Produit introuvable" }, { status: 404 });
  const next = Math.max(0, product.stock + body.delta);
  const movement: StockMovement = {
    id: crypto.randomUUID(),
    productId: product.id,
    sku: product.sku,
    name: product.name,
    quantity: next - product.stock,
    type: body.delta >= 0 ? "entree" : "sortie",
    note: body.note || "Ajustement",
    createdAt: new Date().toISOString(),
  };
  product.stock = next;
  db.movements.unshift(movement);
  writeDb(db);
  return Response.json({ products: db.products, movements: db.movements });
}
