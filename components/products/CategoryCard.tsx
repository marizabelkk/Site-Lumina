import Link from "next/link";
import type { Category } from "@/lib/categories";

type CategoryCardProps = {
  category: Category;
};

export function CategoryCard({ category }: CategoryCardProps) {
  const categoryHref = `/catalogo?categoria=${encodeURIComponent(category.name)}`;

  return (
    <article className="category-card">
      <Link
        className="category-card-link"
        href={categoryHref}
        aria-label={`Ver ${category.name} no catalogo`}
      >
        <div
          className="category-image"
          role="img"
          aria-label={category.alt}
          style={{ backgroundImage: `url(${category.imageUrl})` }}
        >
          {category.badge ? <span>{category.badge}</span> : null}
        </div>
        <div className="category-content">
          <h3>{category.name}</h3>
          <span className="category-cta">
            Ver mais <span aria-hidden="true">-&gt;</span>
          </span>
        </div>
      </Link>
    </article>
  );
}
