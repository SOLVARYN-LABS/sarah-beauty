export function formatDA(value: number) {
  return `${new Intl.NumberFormat("fr-DZ").format(value)} DA`;
}

export function formatPriceCompact(value: number) {
  return new Intl.NumberFormat("fr-DZ").format(value);
}

export function discountPercent(price: number, oldPrice?: number) {
  if (!oldPrice || oldPrice <= price) return 0;
  return Math.round(((oldPrice - price) / oldPrice) * 100);
}

export function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}
