"use client";

import Link from "next/link";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { useCart } from "@/hooks/useCart";
import { formatCurrency } from "@/lib/products";

function BagIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M7 8h10l1.1 12H5.9L7 8Z" />
      <path d="M9 8a3 3 0 0 1 6 0" />
    </svg>
  );
}

function CartUtilityIcon({ name }: { name: "gift" | "trash" | "truck" | "shield" }) {
  if (name === "gift") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path d="M3 10h18v11H3zM2 7h20v3H2zM12 7v14" />
        <path d="M12 7H8.8a2.3 2.3 0 1 1 2.3-2.3C11.1 6 12 7 12 7Zm0 0h3.2a2.3 2.3 0 1 0-2.3-2.3C12.9 6 12 7 12 7Z" />
      </svg>
    );
  }

  if (name === "trash") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path d="M4 7h16M10 11v6M14 11v6M6 7l1 14h10l1-14M9 7V4h6v3" />
      </svg>
    );
  }

  if (name === "truck") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path d="M3 7h11v9H3zM14 10h4l3 3v3h-7z" />
        <circle cx="7" cy="18" r="2" />
        <circle cx="18" cy="18" r="2" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M12 3 20 6v6c0 5-3.2 8-8 9-4.8-1-8-4-8-9V6l8-3Z" />
      <path d="m8.8 12 2.2 2.2 4.5-4.6" />
    </svg>
  );
}

export default function CarrinhoPage() {
  const {
    checkoutUrl,
    clearItems,
    lines,
    removeItem,
    subtotal,
    total,
    totalItems,
    updateQuantity,
  } = useCart();
  const freeShippingGoal = 400;
  const missingForFreeShipping = Math.max(0, freeShippingGoal - subtotal);
  const shippingProgress = Math.min(100, (subtotal / freeShippingGoal) * 100);

  return (
    <>
      <Header />
      <main>
        <section className="cart-hero">
          <div className="cart-hero-overlay" />
          <div className="container cart-hero-content">
            <div className="cart-title-row">
              <span className="cart-title-icon">
                <BagIcon />
              </span>
              <h1>Sua sacolinha</h1>
            </div>
            <div className="gold-divider" />
            <p>Confira seus itens antes de finalizar a compra.</p>
          </div>
        </section>

        <section className="cart-section">
          <div className="container cart-breadcrumb">
            <Link href="/">Início</Link>
            <span aria-hidden="true">›</span>
            <span>Sacolinha</span>
          </div>

          <div className="container cart-layout">
            <div className="cart-main">
              <div className="free-shipping-bar">
                <span className="free-shipping-icon">
                  <CartUtilityIcon name="gift" />
                </span>
                <p>
                  {missingForFreeShipping > 0 ? (
                    <>
                      Faltam <strong>{formatCurrency(missingForFreeShipping)}</strong>{" "}
                      para você ganhar <b>frete grátis!</b>
                    </>
                  ) : (
                    <>
                      Você ganhou <b>frete grátis!</b>
                    </>
                  )}
                </p>
                <div className="shipping-progress">
                  <span style={{ width: `${shippingProgress}%` }} />
                </div>
                <strong>{formatCurrency(missingForFreeShipping)}</strong>
              </div>

              <div className="cart-list-head">
                <h2>Produtos ({totalItems})</h2>
                <button type="button" onClick={clearItems} disabled={!lines.length}>
                  Limpar sacola <CartUtilityIcon name="trash" />
                </button>
              </div>

              <div className="cart-items">
                {lines.length ? (
                  lines.map((item) => (
                    <article className="cart-item" key={item.product.id}>
                      <Link
                        className="cart-item-product"
                        href={`/produto/${item.product.id}`}
                        aria-label={`Ver detalhes de ${item.product.name}`}
                      >
                        <div
                          className="cart-item-image"
                          role="img"
                          aria-label={item.product.name}
                          style={{ backgroundImage: `url(${item.product.image})` }}
                        />
                        <div className="cart-item-info">
                          <h3>{item.product.name}</h3>
                          <p>Banho: {item.product.material ?? item.product.category}</p>
                          <span>
                            {item.product.available ? "✓ Em estoque" : "Indisponível"}
                          </span>
                        </div>
                        <strong className="cart-item-price">
                          {formatCurrency(item.product.price)}
                        </strong>
                      </Link>
                      <div className="quantity-control" aria-label="Quantidade">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity - 1)
                          }
                        >
                          −
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity + 1)
                          }
                        >
                          +
                        </button>
                      </div>
                      <button
                        className="remove-item"
                        type="button"
                        aria-label={`Remover ${item.product.name}`}
                        onClick={() => removeItem(item.product.id)}
                      >
                        <CartUtilityIcon name="trash" />
                      </button>
                    </article>
                  ))
                ) : (
                  <div className="empty-cart">
                    <h3>Sua sacolinha está vazia.</h3>
                    <p>Escolha suas semijoias favoritas no catálogo.</p>
                  </div>
                )}
              </div>

              <Link className="continue-shopping" href="/catalogo">
                <span aria-hidden="true">←</span>
                Continuar comprando
              </Link>
            </div>

            <aside className="order-sidebar" aria-label="Resumo do pedido">
              <section className="order-summary-card">
                <h2>Resumo do pedido</h2>
                <div className="summary-line">
                  <span>Subtotal ({totalItems} itens)</span>
                  <strong>{formatCurrency(subtotal)}</strong>
                </div>
                <div className="summary-line">
                  <span>Frete informado no WhatsApp.</span>
                </div>
                <div className="summary-total">
                  <span>Total</span>
                  <strong>{formatCurrency(total)}</strong>
                </div>
                <p>ou até 3x de {formatCurrency(total / 3)} sem juros</p>
                <a
                  className="checkout-whatsapp"
                  href={lines.length ? checkoutUrl : undefined}
                  target="_blank"
                  rel="noreferrer"
                  aria-disabled={!lines.length}
                >
                  Finalizar pelo WhatsApp
                </a>
                <small>
                  <CartUtilityIcon name="shield" />
                  Ambiente seguro e protegido
                </small>
              </section>

              <section className="cart-info-card">
                <CartUtilityIcon name="truck" />
                <div>
                  <h3>Entrega para todo o Brasil</h3>
                  <p>Escolha a melhor forma de entrega no próximo passo.</p>
                </div>
              </section>

              <section className="cart-info-card">
                <CartUtilityIcon name="gift" />
                <div>
                  <h3>Embalagem especial</h3>
                  <p>Suas semijoias vão com todo carinho e cuidado que merecem.</p>
                </div>
              </section>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
