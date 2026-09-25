import Link from "next/link";

export function CategoryCard({
  href,
  title,
  subtitle,
  image,
  delay = 0,
}: {
  href: string;
  title: string;
  subtitle: string;
  image: string;
  delay?: number;
}) {
  return (
    <Link
      href={href}
      className="category-card group relative block aspect-[4/5] overflow-hidden bg-plum"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={image} alt={title} className="category-photo h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-plum-deep/80 via-transparent to-transparent" />
      <div className="absolute bottom-0 p-5 text-cream">
        <p className="font-serif text-2xl">{title}</p>
        <p className="text-xs tracking-[0.12em] uppercase text-beige mt-1">{subtitle}</p>
      </div>
    </Link>
  );
}
