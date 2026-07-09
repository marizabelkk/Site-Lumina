import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

const CONTACT_EMAIL = "luminasemijoias.pb@gmail.com";
const INSTAGRAM_URL = "https://www.instagram.com/lumina_jp/";
const WHATSAPP_URL =
  "https://wa.me/558391737758?text=Ol%C3%A1!%20Quero%20falar%20com%20a%20Lumina%20Semijoias.";
const CONTACT_MAILTO = `mailto:${CONTACT_EMAIL}?subject=Contato pelo site Lumina`;

const channels = [
  {
    title: "WhatsApp",
    text: "Fale diretamente com a nossa equipe pelo WhatsApp.",
    action: "Chamar no WhatsApp",
    icon: "phone",
    href: WHATSAPP_URL,
    external: true,
  },
  {
    title: "Instagram",
    text: "Acompanhe novidades e fale conosco pelo direct.",
    action: "Ir para o Instagram",
    icon: "instagram",
    href: INSTAGRAM_URL,
    external: true,
  },
  {
    title: "E-mail",
    text: "Envie sua mensagem por e-mail que responderemos.",
    action: "Enviar e-mail",
    icon: "mail",
    href: CONTACT_MAILTO,
    external: false,
  },
];

const faqs = [
  {
    question: "Quais são as formas de pagamento?",
    answer:
      "Você pode pagar sua compra via PIX, cartão de crédito ou débito. Se tiver alguma dúvida, nossa equipe está à disposição para ajudar!",
  },
  {
    question: "Os banhos das semijoias são de qualidade?",
    answer:
      "Sim! Todas as nossas peças recebem 3 banhos de ouro e 1 banho de paládio, um processo que proporciona mais brilho, resistência e durabilidade. Além disso, cada semijoia passa por um rigoroso controle de qualidade para garantir um acabamento impecável e uma peça feita para acompanhar você por muito mais tempo.",
  },
  {
    question: "As semijoias possuem garantia?",
    answer: "Sim! Nossas semijoias possuem 1 ano de garantia contra defeitos de fabricação.",
  },
  {
    question: "Posso trocar ou devolver um produto?",
    answer:
      "Realizamos trocas, mas não fazemos devoluções. A troca pode ser solicitada dentro do período de garantia de 1 ano, desde que a peça atenda às condições da garantia. Você pode escolher outra peça de mesmo valor ou, se optar por uma peça de valor superior, basta pagar a diferença.",
  },
];

function ContactIcon({ name }: { name: string }) {
  if (name === "phone") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path d="M4.2 20 5.6 16.1a8.2 8.2 0 1 1 3.1 2.7L4.2 20Z" />
        <path d="M9.1 8.5c.2 3.1 2 5.2 5.2 6.3l1.4-1.4" />
      </svg>
    );
  }

  if (name === "instagram") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <rect x="4" y="4" width="16" height="16" rx="4" />
        <circle cx="12" cy="12" r="3.5" />
        <path d="M17 7h.1" />
      </svg>
    );
  }

  if (name === "mail") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <rect x="4" y="6" width="16" height="12" rx="1.5" />
        <path d="m4 8 8 6 8-6" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M12 21s7-5.2 7-11a7 7 0 1 0-14 0c0 5.8 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
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

export default function ContatoPage() {
  return (
    <>
      <Header activeItem="contato" />
      <main>
        <section className="contact-hero">
          <div className="contact-hero-overlay" />
          <div className="container contact-hero-content">
            <p className="eyebrow">Fale conosco</p>
            <div className="gold-spark" />
            <h1>
              <span className="hero-line-white">Estamos aqui para</span>
              <span>te atender.</span>
            </h1>
            <div className="gold-divider" />
            <p>
              Dúvidas, sugestões ou quer saber mais sobre nossas semijoias? Será
              um prazer falar com você!
            </p>
          </div>
        </section>

        <section className="contact-channels-section">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow">Escolha o melhor canal para você</p>
              <div className="gold-mark" />
            </div>
            <div className="contact-channels-grid">
              {channels.map((channel) => (
                <article className="contact-channel-card" key={channel.title}>
                  <span className="contact-channel-icon">
                    <ContactIcon name={channel.icon} />
                  </span>
                  <h2>{channel.title}</h2>
                  <p>{channel.text}</p>
                  <a
                    className="channel-button"
                    href={channel.href}
                    target={channel.external ? "_blank" : undefined}
                    rel={channel.external ? "noreferrer" : undefined}
                  >
                    {channel.action}
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="message-section">
          <div className="container message-grid">
            <div className="message-form-area">
              <p className="eyebrow">Envie sua mensagem</p>
              <div className="gold-spark" />
              <h2>Como podemos te ajudar?</h2>
              <p>
                Preencha o formulário ao lado e retornaremos o mais rápido
                possível.
              </p>
              <form
                className="contact-form"
                action={CONTACT_MAILTO}
                method="post"
                encType="text/plain"
              >
                <input aria-label="Nome completo" name="nome" placeholder="Nome completo" />
                <input aria-label="E-mail" name="email" placeholder="E-mail" type="email" />
                <input aria-label="WhatsApp" name="whatsapp" placeholder="WhatsApp" />
                <select aria-label="Assunto" name="assunto" defaultValue="">
                  <option value="" disabled>
                    Assunto
                  </option>
                  <option value="duvidas">Dúvidas</option>
                  <option value="pedido">Pedido</option>
                  <option value="trocas">Trocas</option>
                </select>
                <textarea aria-label="Mensagem" name="mensagem" placeholder="Mensagem" />
                <button type="submit">
                  Enviar mensagem <span aria-hidden="true">↗</span>
                </button>
              </form>
              <p className="privacy-note">
                Seus dados estão protegidos. Não compartilhamos suas informações.
              </p>
            </div>

            <div className="contact-service-card">
              <div className="service-hours">
                <span className="clock-icon" aria-hidden="true">
                  ◷
                </span>
                <h3>Horário de atendimento</h3>
                <p>Segunda a sexta: 9h às 18h</p>
                <p>Sábado: 9h às 13h</p>
                <p>Domingo: fechado</p>
                <div className="gold-spark" />
                <strong>Retornamos em até 24h úteis.</strong>
              </div>
              <div
                className="service-photo"
                role="img"
                aria-label="Caixa Lumina com semijoia dourada"
              />
            </div>
          </div>
        </section>

        <section className="faq-instagram-section">
          <div className="container faq-instagram-grid">
            <div className="faq-area">
              <p className="eyebrow">Dúvidas frequentes</p>
              <div className="gold-spark" />
              <h2>Perguntas frequentes</h2>
              <div className="faq-list">
                {faqs.map((faq) => (
                  <details key={faq.question}>
                    <summary>{faq.question}</summary>
                    <p>{faq.answer}</p>
                  </details>
                ))}
              </div>
            </div>

            <div className="instagram-callout">
              <div>
                <h2>
                  Acompanhe a Lumina e fique por dentro de todas as novidades!
                </h2>
                <a
                  className="secondary-button instagram-follow-button"
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noreferrer"
                >
                  Seguir no Instagram <InstagramIcon />
                </a>
              </div>
              <img
                className="instagram-phone"
                src="/banners/contato2.png?v=20260708"
                alt="Perfil da Lumina no Instagram"
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
