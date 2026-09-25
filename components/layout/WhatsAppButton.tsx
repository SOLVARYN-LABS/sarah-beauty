import { WHATSAPP, WHATSAPP_DISPLAY } from "@/lib/catalog";

export function WhatsAppButton() {
  const href = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Bonjour Boutique Ayla, je souhaite un conseil.")}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 end-5 z-30 bg-[#1f6b45] text-cream text-xs tracking-[0.14em] px-4 py-3 shadow-lg"
    >
      WHATSAPP · {WHATSAPP_DISPLAY}
    </a>
  );
}
