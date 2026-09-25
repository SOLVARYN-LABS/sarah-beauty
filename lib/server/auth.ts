import { cookies } from "next/headers";

export const SELLER = {
  name: "Djohar",
  email: process.env.SELLER_EMAIL ?? "djohar@boutiqueayla.dz",
  password: process.env.SELLER_PASSWORD ?? "",
};

const COOKIE = "ayla_seller";

export async function setSellerCookie() {
  const jar = await cookies();
  jar.set(COOKIE, "djohar", { httpOnly: true, sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 14 });
}

export async function clearSellerCookie() {
  const jar = await cookies();
  jar.delete(COOKIE);
}

export async function isSeller() {
  const jar = await cookies();
  return jar.get(COOKIE)?.value === "djohar";
}
