"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useCart } from "@/hooks/useCart";
import { formatCurrency } from "@/lib/products";
import { getProducts } from "@/services/productService";
import type { Product } from "@/types/product";

const menuItems = [
  { id: "inicio", label: "Início", href: "/" },
  { id: "catalogo", label: "Catálogo", href: "/catalogo" },
  { id: "sobre", label: "Sobre nós", href: "/sobre-nos" },
  { id: "cuidados", label: "Cuidados", href: "/cuidados" },
  { id: "contato", label: "Contato", href: "/contato" },
];

function normalizeSearchText(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("pt-BR");
}

function HeaderIcon({ name }: { name: "search" | "bag" }) {
  if (name === "search") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <circle cx="10.8" cy="10.8" r="6.8" />
        <path d="m16 16 4.2 4.2" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M7 8h10l1.1 12H5.9L7 8Z" />
      <path d="M9 8a3 3 0 0 1 6 0" />
    </svg>
  );
}

type HeaderProps = {
  activeItem?: "inicio" | "catalogo" | "sobre" | "cuidados" | "contato";
  cartCount?: number;
};

export function Header({ activeItem = "inicio", cartCount }: HeaderProps) {
  const router = useRouter();
  const { totalItems } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [catalogProducts, setCatalogProducts] = useState<Product[]>([]);
  const [hasLoadedProducts, setHasLoadedProducts] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const searchFormRef = useRef<HTMLFormElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const displayedCartCount = cartCount ?? totalItems;
  const normalizedSearchTerm = normalizeSearchText(searchTerm.trim());

  useEffect(() => {
    if (isSearchOpen) {
      searchInputRef.current?.focus();
    }
  }, [isSearchOpen]);

  useEffect(() => {
    function handleOutsideClick(event: PointerEvent) {
      if (
        isSearchOpen &&
        searchFormRef.current &&
        !searchFormRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false);
      }
    }

    document.addEventListener("pointerdown", handleOutsideClick);

    return () => {
      document.removeEventListener("pointerdown", handleOutsideClick);
    };
  }, [isSearchOpen]);

  useEffect(() => {
    if (!isSearchOpen || hasLoadedProducts) {
      return;
    }

    let isMounted = true;

    getProducts()
      .then((products) => {
        if (isMounted) {
          setCatalogProducts(products);
        }
      })
      .catch(() => {
        if (isMounted) {
          setCatalogProducts([]);
        }
      })
      .finally(() => {
        if (isMounted) {
          setHasLoadedProducts(true);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [hasLoadedProducts, isSearchOpen]);

  const matchingProducts = useMemo(() => {
    if (!normalizedSearchTerm) {
      return catalogProducts.slice(0, 4);
    }

    return catalogProducts
      .filter((product) =>
        normalizeSearchText(
          [
            product.name,
            product.category,
            product.description,
            product.reference,
            product.material,
            product.color,
          ]
            .filter(Boolean)
            .join(" "),
        ).includes(normalizedSearchTerm),
      )
      .slice(0, 4);
  }, [catalogProducts, normalizedSearchTerm]);
  function navigateToSearch(term: string) {
    const normalizedSearch = term.trim();
    const searchHref = normalizedSearch
      ? `/catalogo?busca=${encodeURIComponent(normalizedSearch)}`
      : "/catalogo";

    router.push(searchHref);
    setIsMobileMenuOpen(false);
  }

  function handleSearchSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!isSearchOpen) {
      setIsSearchOpen(true);
      return;
    }

    navigateToSearch(searchTerm);
  }

  return (
    <>
      <header className="site-header">
        <div className="container header-inner">
          <button
            className="mobile-menu-toggle"
            type="button"
            aria-expanded={isMobileMenuOpen}
            aria-label="Abrir menu"
            onClick={() => setIsMobileMenuOpen((isOpen) => !isOpen)}
          >
            <span />
            <span />
            <span />
          </button>

          <Link
            className="brand brand-logo"
            href="/"
            aria-label="Lumina Semijoias"
          >
            <Image
              src="/logo/logo.png"
              alt="Lumina Semijoias"
              width={220}
              height={220}
              priority
            />
          </Link>

          <nav className="main-nav" aria-label="Menu principal">
            {menuItems.map((item) => (
              <Link
                className={item.id === activeItem ? "is-active" : undefined}
                href={item.href}
                key={item.label}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="header-actions" aria-label="Ações da loja">
            <form
              className={`header-search ${isSearchOpen ? "is-open" : ""}`}
              ref={searchFormRef}
              role="search"
              onSubmit={handleSearchSubmit}
            >
              <label className="sr-only" htmlFor="header-search-input">
                Buscar produtos
              </label>
              <input
                id="header-search-input"
                ref={searchInputRef}
                type="text"
                placeholder=""
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
              {isSearchOpen && searchTerm ? (
                <button
                  className="header-search-clear"
                  type="button"
                  aria-label="Limpar busca"
                  onClick={() => setSearchTerm("")}
                >
                  ×
                </button>
              ) : null}
              <button type="submit" aria-label="Buscar produtos">
                <HeaderIcon name="search" />
              </button>
              {isSearchOpen ? (
                <div className="search-panel">
                  <div className="search-panel-grid">
                    <section className="search-products-preview">
                      <h2>Produtos</h2>
                      <div className="search-product-list">
                        {matchingProducts.length ? (
                          matchingProducts.map((product) => (
                            <Link
                              className="search-product-item"
                              href={`/produto/${product.id}`}
                              key={product.id}
                              onClick={() => setIsSearchOpen(false)}
                            >
                              <span>{product.category}</span>
                              <strong>{product.name}</strong>
                              <small>{formatCurrency(product.price)}</small>
                            </Link>
                          ))
                        ) : (
                          <p>
                            {!hasLoadedProducts
                              ? "Carregando produtos..."
                              : "Nenhum produto encontrado."}
                          </p>
                        )}
                      </div>
                      <button
                        className="search-see-all"
                        type="button"
                        onClick={() => navigateToSearch(searchTerm)}
                      >
                        Ver tudo{searchTerm ? ` "${searchTerm}"` : ""}
                      </button>
                    </section>
                  </div>
                </div>
              ) : null}
            </form>
            <Link className="cart-action" href="/carrinho" aria-label="Carrinho">
              <HeaderIcon name="bag" />
              <span>{displayedCartCount}</span>
            </Link>
          </div>
        </div>
      </header>

      <nav
        className={`mobile-nav ${isMobileMenuOpen ? "is-open" : ""}`}
        aria-label="Menu principal mobile"
      >
        {menuItems.map((item) => (
          <Link
            className={item.id === activeItem ? "is-active" : undefined}
            href={item.href}
            key={item.label}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </>
  );
}
