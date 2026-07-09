"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "@/hooks/useCart";
import { useFavorites } from "@/hooks/useFavorites";
import { formatCurrency, getInstallmentText } from "@/lib/products";
import type { Product } from "@/types/product";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [wasAdded, setWasAdded] = useState(false);
  const favorite = isFavorite(product.id);

  useEffect(() => {
    if (!wasAdded) {
      return;
    }

    const feedbackTimer = window.setTimeout(() => setWasAdded(false), 1400);

    return () => window.clearTimeout(feedbackTimer);
  }, [wasAdded]);

  function handleAddToCart() {
    addItem(product.id, 1, product);
    setWasAdded(true);
  }

  return (
    <article className="product-card">
      <Link
        href={`/produto/${product.id}`}
        className="product-image"
        role="img"
        aria-label={`${product.name} - ${product.category}`}
        style={{ backgroundImage: `url(${product.image})` }}
      >
        {product.isNew ? <span className="product-badge">Novo</span> : null}
      </Link>
      <button
        className={`wishlist-button ${favorite ? "is-favorite" : ""}`}
        type="button"
        aria-label={
          favorite
            ? `Remover ${product.name} dos favoritos`
            : `Adicionar ${product.name} aos favoritos`
        }
        aria-pressed={favorite}
        onClick={() => toggleFavorite(product.id)}
      >
        <svg aria-hidden="true" viewBox="0 0 24 24">
          <path d="M20.5 5.6c-1.8-1.7-4.6-1.5-6.2.4L12 8.6 9.7 6C8.1 4.1 5.3 3.9 3.5 5.6c-2 1.9-2 5 0 6.9l8.5 8 8.5-8c2-1.9 2-5 0-6.9Z" />
        </svg>
      </button>

      <div className="product-content">
        <h2>
          <Link href={`/produto/${product.id}`}>{product.name}</Link>
        </h2>
        <p className="product-price">{formatCurrency(product.price)}</p>
        <p className="product-installment">{getInstallmentText(product.price)}</p>
        <button
          className={`bag-button ${wasAdded ? "is-added" : ""}`}
          type="button"
          aria-label={`Adicionar ${product.name} à sacolinha`}
          disabled={!product.available}
          onClick={handleAddToCart}
        >
          {wasAdded ? (
            <span aria-hidden="true">✓</span>
          ) : (
            <svg aria-hidden="true" viewBox="0 0 24 24">
              <path d="M7 8h10l1.1 12H5.9L7 8Z" />
              <path d="M9 8a3 3 0 0 1 6 0" />
            </svg>
          )}
        </button>
      </div>
    </article>
  );
}
