import { readDb } from "@/lib/server/db";

export async function GET() {
  const db = readDb();
  return Response.json({ products: db.products });
}
