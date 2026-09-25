import { readFile } from "fs/promises";
import path from "path";

const types: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".pdf": "application/pdf",
};

export async function GET(_request: Request, context: { params: Promise<{ name: string }> }) {
  const { name } = await context.params;
  const safe = path.basename(name);
  if (!safe || safe !== name) return new Response("Introuvable", { status: 404 });
  const folders = [
    path.join(process.cwd(), "data", "uploads"),
    path.join(process.cwd(), "public", "uploads"),
  ];
  for (const folder of folders) {
    try {
      const body = await readFile(path.join(folder, safe));
      return new Response(body, {
        headers: {
          "Content-Type": types[path.extname(safe).toLowerCase()] ?? "application/octet-stream",
          "Cache-Control": "public, max-age=86400",
        },
      });
    } catch {
      // Le fichier est dans l'autre dossier, ou il n'existe pas.
    }
  }
  return new Response("Introuvable", { status: 404 });
}
