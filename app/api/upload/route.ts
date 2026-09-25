import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { isSeller } from "@/lib/server/auth";

const allowed = new Set(["image/jpeg", "image/png", "application/pdf"]);

export async function POST(request: Request) {
  if (!(await isSeller())) return Response.json({ error: "Non autorisé" }, { status: 401 });
  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File)) return Response.json({ error: "Fichier manquant" }, { status: 400 });
  const extension = path.extname(file.name).toLowerCase();
  const validExt = [".jpg", ".jpeg", ".png", ".pdf"].includes(extension);
  if (!allowed.has(file.type) && !validExt) {
    return Response.json({ error: "Formats acceptés : JPG, PNG, PDF." }, { status: 400 });
  }
  if (file.size > 8 * 1024 * 1024) {
    return Response.json({ error: "Fichier trop lourd (8 Mo maximum)." }, { status: 400 });
  }
  const safeExt = extension === ".jpeg" ? ".jpg" : extension || (file.type === "application/pdf" ? ".pdf" : ".jpg");
  const name = `${crypto.randomUUID()}${safeExt}`;
  const dir = path.join(process.cwd(), "public", "uploads");
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, name), Buffer.from(await file.arrayBuffer()));
  return Response.json({ url: `/uploads/${name}` });
}
