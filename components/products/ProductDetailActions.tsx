"use client";

import { useState } from "react";
import { useCart } from "@/hooks/useCart";
import { useFavorites } from "@/hooks/useFavorites";
import { WHATSAPP_NUMBER } from "@/lib/cart";
import { formatCurrency } from "@/lib/products";
import type { Product } from "@/types/product";

type ProductDetailActionsProps = {
  product: Product;
};

function BagIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M7 8h10l1.1 12H5.9L7 8Z" />
      <path d="M9 8a3 3 0 0 1 6 0" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M20.5 5.6c-1.8-1.7-4.6-1.5-6.2.4L12 8.6 9.7 6C8.1 4.1 5.3 3.9 3.5 5.6c-2 1.9-2 5 0 6.9l8.5 8 8.5-8c2-1.9 2-5 0-6.9Z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M4.2 20 5.6 16.1a8.2 8.2 0 1 1 3.1 2.7L4.2 20Z" />
      <path d="M9.1 8.5c.2 3.1 2 5.2 5.2 6.3l1.4-1.4" />
    </svg>
  );
}

export function ProductDetailActions({ product }: ProductDetailActionsProps) {
  const { addItem } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [quantity, setQuantity] = useState(1);
  const [wasAdded, setWasAdded] = useState(false);
  const favorite = isFavorite(product.id);

  function addProduct() {
    addItem(product.id, quantity, product);
    setWasAdded(true);
    window.setTimeout(() => setWasAdded(false), 1400);
  }

  function buildProductWhatsAppUrl() {
    const message = `Olá! Quero comprar este produto da Lumina Semijoias:\n\n${quantity}x ${product.name}\nMaterial: ${product.material ?? "Semijoia"}\nTotal: ${formatCurrency(product.price * quantity)}`;

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  }

  return (
    <div className="product-detail-actions">
      <div className="detail-quantity-row">
        <span>Quantidade:</span>
        <div className="quantity-control" aria-label="Quantidade">
          <button
            type="button"
            onClick={() => setQuantity((currentQuantity) => Math.max(1, currentQuantity - 1))}
          >
            −
          </button>
          <span>{quantity}</span>
          <button
            type="button"
            onClick={() => setQuantity((currentQuantity) => currentQuantity + 1)}
          >
            +
          </button>
        </div>
      </div>

      <div className="product-favorite-row">
        <button
          className={`detail-favorite-button ${favorite ? "is-favorite" : ""}`}
          type="button"
          aria-pressed={favorite}
          onClick={() => toggleFavorite(product.id)}
        >
          <HeartIcon />
          {favorite ? "Favorito" : "Favoritar"}
        </button>
      </div>

      <button
        className={`detail-add-button ${wasAdded ? "is-added" : ""}`}
        type="button"
        disabled={!product.available}
        onClick={addProduct}
      >
        <BagIcon />
        {wasAdded ? "Adicionado ✓" : "Adicionar à sacolinha"}
      </button>

      <a
        className="detail-whatsapp-button"
        href={buildProductWhatsAppUrl()}
        target="_blank"
        rel="noreferrer"
      >
        <WhatsAppIcon />
        Comprar pelo WhatsApp
      </a>
    </div>
  );
}
