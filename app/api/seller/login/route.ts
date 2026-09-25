import { SELLER, setSellerCookie } from "@/lib/server/auth";

export async function POST(request: Request) {
  const body = (await request.json()) as { email?: string; password?: string };
  const email = body.email?.trim().toLowerCase();
  if (!SELLER.password || email !== SELLER.email || body.password !== SELLER.password) {
    return Response.json({ ok: false }, { status: 401 });
  }
  await setSellerCookie();
  return Response.json({ ok: true, name: SELLER.name });
}
