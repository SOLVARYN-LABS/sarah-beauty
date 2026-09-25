import { isSeller } from "@/lib/server/auth";
import { readDb, writeDb } from "@/lib/server/db";
import type { Product } from "@/lib/types";

export async function POST(request: Request) {
  if (!(await isSeller())) return Response.json({ error: "Non autorisé" }, { status: 401 });
  const product = (await request.json()) as Product;
  const db = readDb();
  const index = db.products.findIndex((item) => item.id === product.id);
  if (index >= 0) db.products[index] = product;
  else db.products.unshift(product);
  writeDb(db);
  return Response.json({ products: db.products });
}

export async function DELETE(request: Request) {
  if (!(await isSeller())) return Response.json({ error: "Non autorisé" }, { status: 401 });
  const { id } = (await request.json()) as { id: string };
  const db = readDb();
  db.products = db.products.filter((item) => item.id !== id);
  writeDb(db);
  return Response.json({ products: db.products });
}
