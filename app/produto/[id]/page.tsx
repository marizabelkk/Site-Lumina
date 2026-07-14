import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductDetailActions } from "@/components/products/ProductDetailActions";
import { ProductInfoPanel } from "@/components/products/ProductInfoPanel";
import { formatCurrency, getInstallmentText } from "@/lib/products";
import {
  getFeaturedProducts,
  getProductById,
  getProductsByCategory,
} from "@/services/productService";
import type { Product } from "@/types/product";

type ProdutoPageProps = {
  params: Promise<{ id: string }>;
};

export const dynamic = "force-dynamic";

function DetailIcon({ name }: { name: "diamond" | "shield" | "gift" | "card" }) {
  if (name === "diamond") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path d="M3 9 8 3h8l5 6-9 12L3 9Z" />
        <path d="M3 9h18M8 3l4 18 4-18" />
      </svg>
    );
  }

  if (name === "shield") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path d="M12 3 20 6v6c0 5-3.2 8-8 9-4.8-1-8-4-8-9V6l8-3Z" />
        <path d="m8.8 12 2.2 2.2 4.5-4.6" />
      </svg>
    );
  }

  if (name === "gift") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path d="M3 10h18v11H3zM2 7h20v3H2zM12 7v14" />
        <path d="M12 7H8.8a2.3 2.3 0 1 1 2.3-2.3C11.1 6 12 7 12 7Zm0 0h3.2a2.3 2.3 0 1 0-2.3-2.3C12.9 6 12 7 12 7Z" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 10h18M7 15h3" />
    </svg>
  );
}

export default async function ProdutoPage({ params }: ProdutoPageProps) {
  const { id } = await params;
  let product: Product | null;

  try {
    product = await getProductById(id);
  } catch {
    return (
      <>
        <Header activeItem="catalogo" />
        <main>
          <section className="product-page-section">
            <div className="container catalog-feedback" role="status">
              Não foi possível carregar este produto no momento. Tente novamente em alguns instantes.
            </div>
          </section>
        </main>
        <Footer />
      </>
    );
  }

  if (!product) {
    notFound();
  }

  const [sameCategoryProducts, featuredProducts] = await Promise.all([
    getProductsByCategory(product.category).catch(() => []),
    getFeaturedProducts().catch(() => []),
  ]);

  const relatedProducts = [...sameCategoryProducts, ...featuredProducts]
    .filter((currentProduct) => currentProduct.id !== product.id)
    .filter(
      (currentProduct, index, currentProducts) =>
        currentProducts.findIndex((item) => item.id === currentProduct.id) === index,
    )
    .slice(0, 4);

  const productDetails = [
    `Referência: ${(product.reference ?? product.id).slice(0, 8).toUpperCase()}`,
    "Hipoalergênico: Sim",
    "Garantia: 1 ano",
    `Disponibilidade: ${product.available ? "Em estoque" : "Indisponível"}`,
  ];

  return (
    <>
      <Header activeItem="catalogo" />
      <main>
        <section className="product-page-section">
          <div className="container product-page-breadcrumb">
            <Link href="/">Início</Link>
            <span aria-hidden="true">›</span>
            <Link href="/catalogo">Catálogo</Link>
            <span aria-hidden="true">›</span>
            <Link href={`/catalogo?categoria=${encodeURIComponent(product.category)}`}>
              {product.category}
            </Link>
            <span aria-hidden="true">›</span>
            <span>{product.name}</span>
          </div>

          <div className="container product-page-grid">
            <div className="product-gallery">
              <div
                className="product-main-image"
                role="img"
                aria-label={product.name}
                style={{ backgroundImage: `url(${product.image})` }}
              />
            </div>

            <aside className="product-buy-box" aria-label="Detalhes do produto">
              <h1>{product.name}</h1>
              <div className="product-buy-price">
                <strong>{formatCurrency(product.price)}</strong>
                <span>{getInstallmentText(product.price)} sem juros</span>
              </div>

              <p className="product-buy-description">{product.description}</p>

              <ProductInfoPanel details={productDetails} />

              <ProductDetailActions product={product} />
            </aside>
          </div>

          <div className="container product-benefits-strip">
            <article>
              <DetailIcon name="diamond" />
              <div>
                <h2>Semijoias de alta qualidade</h2>
                <p>Brilho e durabilidade que você pode confiar.</p>
              </div>
            </article>
            <article>
              <DetailIcon name="shield" />
              <div>
                <h2>Garantia de 1 ano</h2>
                <p>Mais segurança para você e suas peças.</p>
              </div>
            </article>
            <article>
              <DetailIcon name="gift" />
              <div>
                <h2>Embalagem especial</h2>
                <p>Para momentos únicos e inesquecíveis.</p>
              </div>
            </article>
            <article>
              <DetailIcon name="card" />
              <div>
                <h2>Parcele em até 3x</h2>
                <p>Sem juros no cartão de crédito.</p>
              </div>
            </article>
          </div>

          <section className="container related-products-section">
            <div className="section-heading">
              <h2>Você também pode gostar</h2>
              <div className="gold-mark" />
            </div>
            <div className="products-grid related-products-grid">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard product={relatedProduct} key={relatedProduct.id} />
              ))}
            </div>
          </section>
        </section>
      </main>
      <Footer />
    </>
  );
}
