import Link from "next/link";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

const values = [
  {
    title: "Qualidade Premium",
    text: "Acabamento premium com 3 banhos de ouro e 1 banho de paládio, para mais brilho, resistência e sofisticação.",
    icon: "diamond",
  },
  {
    title: "Confiança e Transparência",
    text: "Relacionamento honesto e seguro com você.",
    icon: "shield",
  },
  {
    title: "Feito com Amor",
    text: "Cada escolha é feita com carinho e dedicação.",
    icon: "heart",
  },
  {
    title: "Tendências com Exclusividade",
    text: "Peças atuais, exclusivas e cheias de personalidade.",
    icon: "spark",
  },
  {
    title: "Você em Primeiro Lugar",
    text: "Nossa missão é valorizar sua essência sempre.",
    icon: "crown",
  },
];

const behindImages = [
  {
    label: "Semijoias douradas sobre tecido claro",
    url: "/banners/nossahistoria1.jpg",
  },
  {
    label: "Detalhe de montagem de pingente",
    url: "/banners/nossahistoria2.jpg",
  },
  {
    label: "Embalagem verde sofisticada",
    url: "/banners/nossahistoria.jpg",
  },
  {
    label: "Mulher usando colar delicado",
    url: "/banners/nossahistoria3.jpg",
  },
];

function ValueIcon({ name }: { name: string }) {
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

  if (name === "heart") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path d="M20.5 5.6c-1.8-1.7-4.6-1.5-6.2.4L12 8.6 9.7 6C8.1 4.1 5.3 3.9 3.5 5.6c-2 1.9-2 5 0 6.9l8.5 8 8.5-8c2-1.9 2-5 0-6.9Z" />
      </svg>
    );
  }

  if (name === "spark") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path d="M12 3 10 10l-7 2 7 2 2 7 2-7 7-2-7-2-2-7Z" />
        <path d="M19 3v4M17 5h4M5 17v4M3 19h4" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M4 19h16M6 16 4 6l5 4 3-6 3 6 5-4-2 10H6Z" />
      <path d="M8 13h8" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
    >
      <rect x="4" y="4" width="16" height="16" rx="4.5" />
      <circle cx="12" cy="12" r="3.4" />
      <circle cx="17.2" cy="6.8" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function SobreNosPage() {
  return (
    <>
      <Header activeItem="sobre" />
      <main>
        <section className="about-hero-page">
          <div className="about-hero-shade" />
          <div className="container about-hero-inner">
            <div className="about-hero-copy">
              <p className="eyebrow">Sobre nós</p>
              <div className="gold-spark" />
              <h1>
                <span className="hero-line-white">Muito mais que semijoias,</span>
                <span>histórias que brilham.</span>
              </h1>
              <p>
                A Lumina Semijoias nasceu para valorizar sua essência em cada
                detalhe. Cada peça é escolhida com carinho para acompanhar você
                em todos os momentos.
              </p>
              <Link className="primary-button" href="#nossa-historia">
                Conheça nossa história <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </section>

        <section className="about-story-section" id="nossa-historia">
          <div className="container about-story-grid">
            <div
              className="story-photo"
              role="img"
              aria-label="Embalagem sofisticada da Lumina com semijoias"
            />
            <div className="story-text">
              <p className="eyebrow">Nossa história</p>
              <div className="gold-spark" />
              <h2>
                <span className="story-line-dark">Feita para brilhar com você,</span>
                <span>em cada detalhe.</span>
              </h2>
              <p>
                A Lumina Semijoias nasceu do desejo de levar beleza, brilho e
                significado para o dia a dia das mulheres.
              </p>
              <p>
                Cada peça é cuidadosamente desenvolvida com três banhos de ouro
                e um banho de paládio, proporcionando mais brilho, resistência e
                 um acabamento sofisticado para acompanhar você por muito mais tempo.
              </p>
              <p>
                Nosso propósito é oferecer peças de alta qualidade, com design
                atual e acabamento impecável, para que você se sinta única e
                confiante todos os dias.
              </p>
              <p className="signature">Equipe Lumina ♡</p>
            </div>
          </div>
        </section>

        <section className="values-section">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow">Nossos valores</p>
              <h2>Mais que beleza, compromisso.</h2>
            </div>
            <div className="values-grid">
              {values.map((value) => (
                <article className="value-card" key={value.title}>
                  <span className="value-icon">
                    <ValueIcon name={value.icon} />
                  </span>
                  <h3>{value.title}</h3>
                  <p>{value.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="behind-section">
          <div className="container behind-grid">
            <div className="behind-copy">
              <p className="eyebrow">Por trás de cada peça</p>
              <div className="gold-spark" />
              <h2>Cuidado em cada escolha e em cada detalhe.</h2>
              <p>
                Selecionamos cada peça com rigor e carinho para garantir que
                chegue até você com todo o brilho e qualidade que merece.
              </p>
              <Link className="secondary-button" href="/catalogo">
                Ver nosso catálogo <span aria-hidden="true">→</span>
              </Link>
            </div>
            <div className="behind-gallery">
              {behindImages.map((image) => (
                <div
                  className="behind-photo"
                  key={image.url}
                  role="img"
                  aria-label={image.label}
                  style={{ backgroundImage: `url(${image.url})` }}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="about-cta-band">
          <div className="container about-cta-inner">
            <div className="cta-spark" aria-hidden="true">
              ✦
            </div>
            <h2>
              Lumina é sobre você.
              <span>É sobre o seu brilho.</span>
            </h2>
            <p>Estamos aqui para te acompanhar em todos os seus momentos.</p>
            <a
              className="primary-button instagram-button"
              href="https://www.instagram.com/lumina_jp/"
              target="_blank"
              rel="noreferrer"
              aria-label="Abrir o Instagram da Lumina em uma nova aba"
            >
              Falar com a gente <InstagramIcon />
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
