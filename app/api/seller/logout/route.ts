import { clearSellerCookie } from "@/lib/server/auth";

export async function POST() {
  await clearSellerCookie();
  return Response.json({ ok: true });
}
