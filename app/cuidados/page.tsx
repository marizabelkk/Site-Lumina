import Link from "next/link";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

const dailyCare = [
  {
    title: "Evite contato com perfumes",
    text: "Aplique perfumes, cremes e loções antes de colocar suas semijoias.",
    icon: "perfume",
  },
  {
    title: "Tire antes de usar produtos químicos",
    text: "Retire suas peças antes de usar produtos de limpeza, álcool ou cosméticos.",
    icon: "bottles",
  },
  {
    title: "Retire ao praticar atividades físicas",
    text: "O suor excessivo pode danificar o banho da peça e diminuir seu brilho.",
    icon: "weight",
  },
  {
    title: "Evite contato com água",
    text: "Retire suas semijoias antes de tomar banho, nadar ou entrar no mar.",
    icon: "drops",
  },
  {
    title: "Limpe com delicadeza",
    text: "Use uma flanela macia e seca para limpar suas peças e remover impurezas.",
    icon: "cloth",
  },
  {
    title: "Guarde corretamente",
    text: "Armazene em local seco, fresco e separado para evitar atritos e arranhões.",
    icon: "box",
  },
];

const avoidItems = [
  { title: "Produtos químicos e de limpeza", icon: "chemical" },
  { title: "Água do mar e piscina", icon: "waves" },
  { title: "Excesso de suor e umidade", icon: "drop" },
  { title: "Atrito com outras peças", icon: "rings" },
  { title: "Quedas e impactos", icon: "impact" },
  { title: "Guardar as peças úmidas", icon: "case" },
];

function CareIcon({ name }: { name: string }) {
  if (name === "perfume") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path d="M10 3h4v3h-4zM8.5 9h7l2 2.8V21h-11v-9.2L8.5 9Z" />
        <path d="M9 6h6v3H9zM9 14.4h6M18.8 5.4l1.8-1.2M19.7 8h2M5.2 5.4 3.4 4.2M4.3 8h-2" />
      </svg>
    );
  }

  if (name === "bottles") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path d="M7 3h4v4.4L8.7 10v11H4.8V10L7 7.4V3ZM16 4h3v4.8l2 2.2v10h-7V11l2-2.2V4Z" />
        <path d="M5.4 15.5h4.2M14.8 15.5h5.4M7.2 7.4h3.5M16 8.8h3" />
      </svg>
    );
  }

  if (name === "weight") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path d="M7 9v6M4 10.5v3M17 9v6M20 10.5v3M7 12h10" />
        <path d="M3 12h2M19 12h2" />
      </svg>
    );
  }

  if (name === "drops") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path d="M12 3s-6 6.8-6 11.2a6 6 0 0 0 12 0C18 9.8 12 3 12 3Z" />
        <path d="m5 20 14-16M9.2 16.1c.7.8 1.6 1.2 2.8 1.2" />
      </svg>
    );
  }

  if (name === "cloth") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path d="M5 17.8c4.7-.6 8-3 9.8-7.3l4.4 2.2c-1.9 4.7-5.4 7.5-10.4 8.3L5 17.8Z" />
        <path d="M13.2 6.2 21 10l-1.8 2.7-4.4-2.2-5 2.3 3.4-6.6ZM16 5.4l1.1 2.4M19.3 6.6l-2.2 1.2" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M5 9.2h14V21H5zM7.8 5.2h8.4l2.8 4H5l2.8-4Z" />
      <path d="M9 5.2A3 3 0 0 1 12 3a3 3 0 0 1 3 2.2M8.2 13.2h7.6M8.2 16.8h7.6" />
    </svg>
  );
}

function AvoidIcon({ name }: { name: string }) {
  if (name === "chemical") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 1.8 3h10.4A2 2 0 0 0 19 18l-5-9V3" />
        <path d="M8 16h8" />
      </svg>
    );
  }

  if (name === "waves") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path d="M3 8c2 2 4 2 6 0s4-2 6 0 4 2 6 0M3 13c2 2 4 2 6 0s4-2 6 0 4 2 6 0M3 18c2 2 4 2 6 0s4-2 6 0 4 2 6 0" />
      </svg>
    );
  }

  if (name === "drop") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path d="M12 3s-6 7-6 12a6 6 0 0 0 12 0c0-5-6-12-6-12Z" />
      </svg>
    );
  }

  if (name === "rings") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <circle cx="9" cy="13" r="5" />
        <circle cx="15" cy="13" r="5" />
      </svg>
    );
  }

  if (name === "impact") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path d="m12 3 1 7 5-5-3 7 7-1-7 3 5 5-7-3-1 7-1-7-7 3 5-5-7-3 7 1-3-7 5 5 1-7Z" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M5 8h14v12H5zM7 4h10v4H7z" />
      <path d="M10 13h4" />
    </svg>
  );
}

export default function CuidadosPage() {
  return (
    <>
      <Header activeItem="cuidados" />
      <main>
        <section className="care-hero">
          <div className="care-hero-overlay" />
          <div className="container care-hero-content">
            <h1>
              <span className="hero-line-white">Cuidados que mantêm</span>
              <span>seu brilho por muito mais tempo.</span>
            </h1>
            <div className="gold-divider" />
            <p>
              Peças especiais merecem cuidados especiais. Siga nossas dicas e
              mantenha suas semijoias sempre lindas como no primeiro dia.
            </p>
          </div>
        </section>

        <section className="care-daily-section">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow">Como cuidar no dia a dia</p>
              <h2>Pequenos hábitos, grande diferença.</h2>
              <div className="gold-mark" />
            </div>
            <div className="care-grid">
              {dailyCare.map((item) => (
                <article className="care-card" key={item.title}>
                  <span className="care-icon">
                    <CareIcon name={item.icon} />
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="avoid-section">
          <div className="container">
            <div className="section-heading section-heading-dark">
              <p className="eyebrow">Evite sempre</p>
              <h2>O que pode danificar suas semijoias</h2>
              <div className="gold-mark" />
            </div>
            <div className="avoid-grid">
              {avoidItems.map((item) => (
                <article className="avoid-card" key={item.title}>
                  <span className="avoid-icon">
                    <AvoidIcon name={item.icon} />
                    <small>×</small>
                  </span>
                  <h3>{item.title}</h3>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="storage-section">
          <div className="container storage-grid">
            <div className="storage-copy">
              <p className="eyebrow">Armazenamento ideal</p>
              <h2>
                Guarde com carinho,
                <span>preserve para sempre.</span>
              </h2>
              <div className="gold-spark" />
              <p>
                Guarde suas semijoias em saquinhos individuais ou no porta-joias,
                longe da luz, umidade e calor excessivo. Assim, você evita riscos
                e mantém o banho impecável por muito mais tempo.
              </p>
              <Link className="secondary-button" href="/catalogo">
                Ver nosso catálogo <span aria-hidden="true">→</span>
              </Link>
            </div>

            <div className="storage-visual">
              <div
                className="storage-photo"
                role="img"
                aria-label="Porta-joias com semijoias delicadas"
              />
              <div className="storage-note">
                <span aria-hidden="true">✦</span>
                <p>
                  Suas semijoias foram feitas para te acompanhar em cada momento
                  especial. Cuide bem delas e elas continuarão brilhando com você!
                </p>
                <strong aria-hidden="true">♥</strong>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
