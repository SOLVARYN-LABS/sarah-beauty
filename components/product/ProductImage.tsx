export function ProductImage({
  src,
  alt,
  className,
}: {
  src?: string;
  alt: string;
  className?: string;
}) {
  const photo = src?.trim().replace(/^\/uploads\//, "/api/uploads/");
  if (!photo) {
    return <div className={`bg-[#efe7de] ${className ?? ""}`} aria-hidden />;
  }
  if (/\.pdf($|\?)/i.test(photo) || photo.startsWith("data:application/pdf")) {
    return <iframe title={alt || "Document PDF"} src={photo} className={`bg-[#efe7de] ${className ?? ""}`} />;
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={photo} alt={alt} className={className} />
  );
}
