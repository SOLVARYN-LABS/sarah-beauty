export function ProductImage({
  src,
  alt,
  className,
}: {
  src?: string;
  alt: string;
  className?: string;
}) {
  if (!src?.trim()) {
    return <div className={`bg-[#efe7de] ${className ?? ""}`} aria-hidden />;
  }
  if (/\.pdf($|\?)/i.test(src)) {
    return <iframe title={alt || "Document PDF"} src={src} className={`bg-[#efe7de] ${className ?? ""}`} />;
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} className={className} />
  );
}
