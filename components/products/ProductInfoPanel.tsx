"use client";

import { useState } from "react";

type ProductInfoPanelProps = {
  details: string[];
};

const productInfoIcons = ["◎", "◇", "▣", "✓"];

export function ProductInfoPanel({ details }: ProductInfoPanelProps) {
  const [isOpen, setIsOpen] = useState(true);
  const contentId = "product-info-list";

  return (
    <section className={`product-info-panel ${isOpen ? "is-open" : "is-collapsed"}`}>
      <h2>
        Informações do produto
        <button
          className="product-info-toggle"
          type="button"
          aria-controls={contentId}
          aria-expanded={isOpen}
          aria-label={isOpen ? "Ocultar informações do produto" : "Mostrar informações do produto"}
          onClick={() => setIsOpen((currentState) => !currentState)}
        >
          <span className="product-info-chevron" aria-hidden="true" />
        </button>
      </h2>
      <ul id={contentId} hidden={!isOpen}>
        {details.map((detail, index) => (
          <li key={detail}>
            <span aria-hidden="true">{productInfoIcons[index]}</span>
            <p className={detail.includes("Em estoque") ? "in-stock" : undefined}>{detail}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
