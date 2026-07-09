import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { CategoryCard } from "@/components/products/CategoryCard";
import { categories } from "@/lib/categories";

function InstagramIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <rect x="4" y="4" width="16" height="16" rx="4.5" />
      <circle cx="12" cy="12" r="3.4" />
      <path d="M17.3 6.9h.1" />
    </svg>
  );
}

const benefits = [
  {
    title: "Alta qualidade",
    text: "Semijoias com 3 banhos de ouro e 1 banho de paládio.",
    icon: "diamond",
  },
  {
    title: "Garantia de 1 ano",
    text: "Mais segurança para você escolher.",
    icon: "shield",
  },
  {
    title: "Embalagem especial",
    text: "Pronta para presentear com carinho.",
    icon: "gift",
  },
  {
    title: "Parcele em até 3x",
    text: "Sem juros no cartão.",
    icon: "card",
  },
];

const instagramImages = [
  "/banners/belaspulseiras.jpeg",
  "/banners/belosconjuntos.jpeg",
  "/banners/belobrinco.jpeg",
  "/banners/brincoazulbelo.jpeg",
  "/banners/conjuntofofo.jpeg",
  "/banners/brincoazullindo.jpeg",
];

const footerBenefits = [
  {
    title: "Atendimento via WhatsApp",
    text: "Fale com a gente",
    icon: "whatsapp",
  },
  {
    title: "Envio para todo o Brasil",
    text: "Com carinho e segurança",
    icon: "truck",
  },
  {
    title: "Clientes felizes",
    text: "Satisfação garantida",
    icon: "badge",
  },
];

function BenefitIcon({ name }: { name: string }) {
  if (name === "diamond") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path d="M6.5 4h11L22 9l-10 11L2 9l4.5-5Z" />
        <path d="M2 9h20M8 4l-2 5 6 11 6-11-2-5M8 4l4 5 4-5" />
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
      <path d="M3 10h18M7 15h4" />
    </svg>
  );
}

function FooterBenefitIcon({ name }: { name: string }) {
  if (name === "whatsapp") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path d="M4.2 20 5.6 16.1a8.2 8.2 0 1 1 3.1 2.7L4.2 20Z" />
        <path d="M9.1 8.5c.2 3.1 2 5.2 5.2 6.3l1.4-1.4" />
      </svg>
    );
  }

  if (name === "truck") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path d="M3 6h11v9H3zM14 10h3.8l2.2 2.6V15h-6z" />
        <path d="M6.5 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM17.5 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM3 10H1.8M3 13H1" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M12 3.2 14.3 5l2.9-.2.9 2.8 2.4 1.6-1.1 2.8 1.1 2.8-2.4 1.6-.9 2.8-2.9-.2-2.3 1.8L9.7 19l-2.9.2-.9-2.8-2.4-1.6 1.1-2.8-1.1-2.8 2.4-1.6.9-2.8 2.9.2L12 3.2Z" />
      <path d="m8.7 12 2.1 2.1 4.6-4.7" />
    </svg>
  );
}

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <section className="hero-section" id="inicio">
          <div className="hero-overlay" />
          <div className="container hero-content">
            <p className="eyebrow">Lumina Semijoias</p>
            <h1>
              Seu brilho,
              <span>sua essência.</span>
            </h1>
            <div className="gold-divider" />
            <p className="hero-copy">
              Semijoias que iluminam momentos e revelam quem você é.
            </p>
            <a className="primary-button" href="/catalogo">
              Conheça o catálogo <span aria-hidden="true">→</span>
            </a>
          </div>
        </section>

        <section className="benefits-bar" aria-label="Benefícios da loja">
          <div className="container benefits-grid">
            {benefits.map((benefit) => (
              <article className="benefit-item" key={benefit.title}>
                <span className="benefit-icon" aria-hidden="true">
                  <BenefitIcon name={benefit.icon} />
                </span>
                <div>
                  <h2>{benefit.title}</h2>
                  <p>{benefit.text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section section-light" id="catalogo">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow">Categorias</p>
              <h2>Encontre a semijoia perfeita</h2>
              <div className="gold-mark" />
            </div>
            <div className="categories-grid">
              {categories.map((category) => (
                <CategoryCard category={category} key={category.name} />
              ))}
            </div>
            <a className="mobile-categories-link" href="/catalogo">
              Ver todas as categorias <span aria-hidden="true">→</span>
            </a>
          </div>
        </section>

        <section className="section section-light about-section" id="sobre">
          <div className="container about-card">
            <div
              className="about-image"
              role="img"
              aria-label="Mulher usando colares e brincos dourados"
            />
            <div className="about-copy">
              <p className="eyebrow">Sobre nós</p>
              <h2>
                Muito mais que semijoias,
                <span>histórias que brilham.</span>
              </h2>
              <div className="gold-divider" />
              <p>
                A Lumina nasceu para valorizar sua essência em cada detalhe.
                Cada peça é escolhida com carinho para acompanhar você em todos
                os momentos.
              </p>
              <a className="secondary-button" href="/sobre-nos">
                Conheça nossa história <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </section>

        <section className="instagram-section">
          <div className="container">
            <div className="section-heading section-heading-dark">
              <p className="eyebrow">Siga nosso Instagram</p>
              <h2>Inspirações que iluminam</h2>
              <div className="gold-mark" />
            </div>
            <div className="instagram-grid">
              {instagramImages.map((imageUrl) => (
                <div
                  className="instagram-tile"
                  key={imageUrl}
                  style={{ backgroundImage: `url(${imageUrl})` }}
                  aria-hidden="true"
                />
              ))}
            </div>
            <a
              className="primary-button instagram-button"
              href="https://www.instagram.com/lumina_jp/"
              target="_blank"
              rel="noreferrer"
            >
              Ver mais no Instagram <InstagramIcon />
            </a>
          </div>
        </section>

        <section className="footer-benefits-section" aria-label="Informações da loja">
          <div className="container footer-benefits-grid">
            {footerBenefits.map((benefit) => (
              <article className="footer-benefit-item" key={benefit.title}>
                <span className="footer-benefit-icon" aria-hidden="true">
                  <FooterBenefitIcon name={benefit.icon} />
                </span>
                <div>
                  <h2>{benefit.title}</h2>
                  <p>{benefit.text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
