import { isSeller, SELLER } from "@/lib/server/auth";
import { readDb } from "@/lib/server/db";

export async function GET() {
  if (!(await isSeller())) return Response.json({ ok: false }, { status: 401 });
  const db = readDb();
  return Response.json({ ok: true, name: SELLER.name, ...db });
}
