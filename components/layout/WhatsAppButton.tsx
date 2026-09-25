import { WHATSAPP, WHATSAPP_DISPLAY } from "@/lib/catalog";

export function WhatsAppButton() {
  const href = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Bonjour Boutique Ayla, je souhaite un conseil.")}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-4 end-4 z-30 bg-[#1f6b45] text-cream text-[10px] sm:text-xs tracking-[0.08em] sm:tracking-[0.14em] px-3 py-2.5 shadow-lg"
    >
      WHATSAPP · {WHATSAPP_DISPLAY}
    </a>
  );
}
