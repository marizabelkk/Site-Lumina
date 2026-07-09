"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ProductCard } from "@/components/products/ProductCard";
import { useFavorites } from "@/hooks/useFavorites";
import { categories } from "@/lib/categories";
import type { Product } from "@/types/product";

type CatalogClientProps = {
  initialProducts: Product[];
  initialCategory?: string;
  initialSearchTerm?: string;
  errorMessage?: string;
};

const allProductsLabel = "Todos os produtos";
const favoritesLabel = "Favoritos";
const launchesLabel =
  categories.find((category) => category.badge)?.name ?? "Lançamentos";
const productsPerPage = 12;
const sortOptions = [
  { value: "recentes", label: "Mais recentes" },
  { value: "preco-menor", label: "Menor preço" },
  { value: "preco-maior", label: "Maior preço" },
];

function FilterIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M4 7h10M18 7h2M4 17h2M10 17h10" />
      <circle cx="16" cy="7" r="2" />
      <circle cx="8" cy="17" r="2" />
    </svg>
  );
}

function formatCurrency(value: number) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function CatalogClient({
  initialProducts,
  initialCategory,
  initialSearchTerm,
  errorMessage,
}: CatalogClientProps) {
  const { favoriteIds, favoriteCount } = useFavorites();
  const searchTerm = (initialSearchTerm ?? "").trim();
  const normalizedSearchTerm = searchTerm.toLocaleLowerCase("pt-BR");
  const priceBounds = useMemo(() => {
    const prices = initialProducts
      .map((product) => product.price)
      .filter((price) => Number.isFinite(price));

    if (!prices.length) {
      return { min: 0, max: 0 };
    }

    return {
      min: Math.floor(Math.min(...prices)),
      max: Math.ceil(Math.max(...prices)),
    };
  }, [initialProducts]);

  const [selectedCategory, setSelectedCategory] = useState(
    initialCategory || allProductsLabel,
  );
  const [maxPrice, setMaxPrice] = useState(priceBounds.max);
  const [filtersOpen, setFiltersOpen] = useState(true);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [sortBy, setSortBy] = useState("recentes");
  const [sortMenuOpen, setSortMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const categoryOptions = useMemo(() => {
    const categoryNames = [
      ...categories.map((category) => category.name),
      ...initialProducts.map((product) => product.category),
    ];

    return Array.from(new Set(categoryNames.filter(Boolean)));
  }, [initialProducts]);

  const filteredProducts = useMemo(() => {
    const nextProducts = initialProducts.filter((product) => {
      const matchesCategory =
        selectedCategory === allProductsLabel ||
        (selectedCategory === favoritesLabel && favoriteIds.includes(product.id)) ||
        (selectedCategory === launchesLabel && product.isNew) ||
        product.category === selectedCategory;
      const matchesPrice =
        product.price >= priceBounds.min && product.price <= maxPrice;
      const searchableProductText = [
        product.name,
        product.description,
        product.category,
        product.reference,
        product.material,
        product.color,
      ]
        .filter(Boolean)
        .join(" ")
        .toLocaleLowerCase("pt-BR");
      const matchesSearch =
        !normalizedSearchTerm || searchableProductText.includes(normalizedSearchTerm);

      return matchesCategory && matchesPrice && matchesSearch;
    });

    if (sortBy === "preco-menor") {
      return [...nextProducts].sort((a, b) => a.price - b.price);
    }

    if (sortBy === "preco-maior") {
      return [...nextProducts].sort((a, b) => b.price - a.price);
    }

    return nextProducts;
  }, [
    favoriteIds,
    initialProducts,
    maxPrice,
    priceBounds.min,
    normalizedSearchTerm,
    selectedCategory,
    sortBy,
  ]);

  const pageCount = Math.max(1, Math.ceil(filteredProducts.length / productsPerPage));
  const activePage = Math.min(currentPage, pageCount);
  const visibleProducts = useMemo(() => {
    const startIndex = (activePage - 1) * productsPerPage;

    return filteredProducts.slice(startIndex, startIndex + productsPerPage);
  }, [activePage, filteredProducts]);
  const resultStart = filteredProducts.length
    ? (activePage - 1) * productsPerPage + 1
    : 0;
  const resultEnd = Math.min(activePage * productsPerPage, filteredProducts.length);
  const paginationItems = useMemo(() => {
    const pages = new Set([1, pageCount, activePage - 1, activePage, activePage + 1]);

    return Array.from(pages)
      .filter((page) => page >= 1 && page <= pageCount)
      .sort((a, b) => a - b)
      .reduce<(number | "ellipsis")[]>((items, page) => {
        const previous = items[items.length - 1];

        if (typeof previous === "number" && page - previous > 1) {
          items.push("ellipsis");
        }

        items.push(page);
        return items;
      }, []);
  }, [activePage, pageCount]);
  const selectedSortLabel =
    sortOptions.find((option) => option.value === sortBy)?.label ?? sortOptions[0].label;

  function clearFilters() {
    setSelectedCategory(allProductsLabel);
    setMaxPrice(priceBounds.max);
    setSortBy("recentes");
    setCurrentPage(1);
  }

  function updateMaxPrice(value: number) {
    setMaxPrice(Math.max(Math.min(value, priceBounds.max), priceBounds.min));
    setCurrentPage(1);
  }

  function updateCategory(category: string) {
    setSelectedCategory(category);
    setCurrentPage(1);
  }

  function updateSort(value: string) {
    setSortBy(value);
    setSortMenuOpen(false);
    setCurrentPage(1);
  }

  function goToPage(page: number) {
    setCurrentPage(Math.max(1, Math.min(page, pageCount)));
  }

  function renderFilterPanel(panelId: string) {
    return (
      <div className="filter-panel" id={panelId}>
        <div className="filter-group">
          <div className="filter-toggle">Preço</div>
          <div className="price-control">
            <label className="price-slider-row">
              <span className="price-slider-head">
                <span>Até</span>
                <strong>{formatCurrency(maxPrice)}</strong>
              </span>
              <input
                aria-label="Preço máximo"
                type="range"
                min={priceBounds.min}
                max={priceBounds.max}
                value={maxPrice}
                onChange={(event) => updateMaxPrice(Number(event.target.value))}
              />
            </label>
          </div>
          <div className="price-labels">
            <span>{formatCurrency(priceBounds.min)}</span>
            <span>{formatCurrency(priceBounds.max)}</span>
          </div>
        </div>

        <button className="clear-filters" type="button" onClick={clearFilters}>
          Limpar filtros
        </button>
      </div>
    );
  }

  return (
    <>
      <Header activeItem="catalogo" />
      <main>
        <section className="catalog-hero">
          <div className="catalog-hero-overlay" />
          <div className="container catalog-hero-content">
            <h1>Catálogo</h1>
            <div className="gold-divider" />
            <p>
              Explore nossa seleção de semijoias e encontre a peça perfeita para
              você.
            </p>
          </div>
        </section>

        <section className="catalog-section">
          <div className="container catalog-toolbar">
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <Link href="/">Início</Link>
              <span aria-hidden="true">›</span>
              <span>Catálogo</span>
            </nav>

            <button
              className="mobile-filter-button"
              type="button"
              aria-expanded={mobileFiltersOpen}
              aria-controls="catalog-mobile-filter-panel"
              onClick={() => setMobileFiltersOpen((isOpen) => !isOpen)}
            >
              <FilterIcon />
              Filtros
            </button>

            <div className="sort-control">
              <span>Ordenar por:</span>
              <div className="sort-select">
                <button
                  className="sort-select-button"
                  type="button"
                  aria-haspopup="listbox"
                  aria-expanded={sortMenuOpen}
                  onClick={() => setSortMenuOpen((isOpen) => !isOpen)}
                >
                  <span>{selectedSortLabel}</span>
                  <svg aria-hidden="true" viewBox="0 0 24 24">
                    <path d="m7 10 5 5 5-5" />
                  </svg>
                </button>
                {sortMenuOpen ? (
                  <div className="sort-select-menu" role="listbox">
                    {sortOptions.map((option) => (
                      <button
                        className={sortBy === option.value ? "is-selected" : ""}
                        key={option.value}
                        type="button"
                        role="option"
                        aria-selected={sortBy === option.value}
                        onClick={() => updateSort(option.value)}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          {mobileFiltersOpen ? (
            <div className="container mobile-filter-panel">
              {renderFilterPanel("catalog-mobile-filter-panel")}
            </div>
          ) : null}

          <div className="container catalog-layout">
            <aside className="catalog-sidebar" aria-label="Filtros do catálogo">
              <section className="filter-block">
                <h2>Categorias</h2>
                <div className="filter-title-line" />
                <button
                  className={`category-filter ${
                    selectedCategory === allProductsLabel ? "active" : ""
                  }`}
                  type="button"
                  onClick={() => updateCategory(allProductsLabel)}
                >
                  <FilterIcon />
                  Todos os produtos
                </button>
                {categoryOptions.map((category) => (
                  <button
                    className={`category-filter ${
                      selectedCategory === category ? "active" : ""
                    }`}
                    key={category}
                    type="button"
                    onClick={() => updateCategory(category)}
                  >
                    <FilterIcon />
                    {category}
                  </button>
                ))}
                <button
                  className={`category-filter ${
                    selectedCategory === favoritesLabel ? "active" : ""
                  }`}
                  type="button"
                  onClick={() => updateCategory(favoritesLabel)}
                >
                  <FilterIcon />
                  Favoritos
                  <span className="filter-count">{favoriteCount}</span>
                </button>
              </section>

              <section className="filter-block filter-section">
                <button
                  className="filter-section-toggle"
                  type="button"
                  aria-expanded={filtersOpen}
                  aria-controls="catalog-filter-panel"
                  onClick={() => setFiltersOpen((isOpen) => !isOpen)}
                >
                  <span>Filtrar por</span>
                  <span aria-hidden="true">{filtersOpen ? "⌃" : "⌄"}</span>
                </button>
                <div className="filter-title-line" />

                {filtersOpen ? (
                  <div className="filter-panel" id="catalog-filter-panel">
                    <div className="filter-group">
                      <div className="filter-toggle">Preço</div>
                      <div className="price-control">
                        <label className="price-slider-row">
                          <span className="price-slider-head">
                            <span>Até</span>
                            <strong>{formatCurrency(maxPrice)}</strong>
                          </span>
                          <input
                            aria-label="Preço máximo"
                            type="range"
                            min={priceBounds.min}
                            max={priceBounds.max}
                            value={maxPrice}
                            onChange={(event) => updateMaxPrice(Number(event.target.value))}
                          />
                        </label>
                      </div>
                      <div className="price-labels">
                        <span>{formatCurrency(priceBounds.min)}</span>
                        <span>{formatCurrency(priceBounds.max)}</span>
                      </div>
                    </div>

                    <button className="clear-filters" type="button" onClick={clearFilters}>
                      Limpar filtros
                    </button>
                  </div>
                ) : null}
              </section>
            </aside>

            <div className="catalog-products">
              <div className="catalog-results-head">
                <p>
                  Mostrando {resultStart}-{resultEnd} de {filteredProducts.length} produtos
                  {searchTerm ? ` para "${searchTerm}"` : ""}
                </p>
                <div className="pagination top-pagination" aria-label="Paginação">
                  {paginationItems.map((item, index) =>
                    item === "ellipsis" ? (
                      <span key={`ellipsis-${index}`}>...</span>
                    ) : (
                      <button
                        className={activePage === item ? "active" : ""}
                        key={item}
                        type="button"
                        aria-current={activePage === item ? "page" : undefined}
                        onClick={() => goToPage(item)}
                      >
                        {item}
                      </button>
                    ),
                  )}
                  <button
                    type="button"
                    aria-label="Próxima página"
                    disabled={activePage === pageCount}
                    onClick={() => goToPage(activePage + 1)}
                  >
                    ›
                  </button>
                </div>
              </div>

              {errorMessage ? (
                <div className="catalog-feedback" role="status">
                  {errorMessage}
                </div>
              ) : null}

              {!errorMessage && !filteredProducts.length ? (
                <div className="catalog-feedback" role="status">
                  Nenhum produto encontrado.
                </div>
              ) : null}

              <div className="products-grid">
                {visibleProducts.map((product) => (
                  <ProductCard product={product} key={product.id} />
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
