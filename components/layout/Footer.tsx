import Image from "next/image";
import Link from "next/link";

const CONTACT_EMAIL = "luminasemijoias.pb@gmail.com";
const WHATSAPP_URL = "https://wa.me/5583993274989";

function FooterIcon({ name }: { name: "instagram" | "mail" | "whatsapp" }) {
  if (name === "instagram") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <rect x="4" y="4" width="16" height="16" rx="4.5" />
        <circle cx="12" cy="12" r="3.4" />
        <path d="M17.3 6.9h.1" />
      </svg>
    );
  }

  if (name === "mail") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <rect x="3.8" y="5.2" width="16.4" height="13.6" rx="2" />
        <path d="m4.8 7.6 7.2 5.3 7.2-5.3" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M4.2 20 5.6 16.1a8.2 8.2 0 1 1 3.1 2.7L4.2 20Z" />
      <path d="M9.1 8.5c.2 3.1 2 5.2 5.2 6.3l1.4-1.4" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="site-footer" id="contato">
      <div className="footer-main">
        <div className="container footer-grid">
          <div className="footer-brand">
            <Link className="footer-logo" href="/" aria-label="Lumina Semijoias">
              <Image
                src="/logo/logo.png"
                alt="Lumina Semijoias"
                width={220}
                height={220}
              />
            </Link>
            <p>Semijoias que iluminam momentos e revelam quem você é.</p>
            <div className="social-links" aria-label="Redes sociais">
              <a
                href="https://www.instagram.com/lumina_jp/"
                aria-label="Instagram da Lumina"
                target="_blank"
                rel="noreferrer"
              >
                <FooterIcon name="instagram" />
              </a>
              <a
                href={WHATSAPP_URL}
                aria-label="WhatsApp da Lumina"
                target="_blank"
                rel="noreferrer"
              >
                <FooterIcon name="whatsapp" />
              </a>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                aria-label="E-mail da Lumina"
              >
                <FooterIcon name="mail" />
              </a>
            </div>
          </div>

          <nav className="footer-links" aria-label="Institucional">
            <h2>Institucional</h2>
            <Link href="/">Início</Link>
            <Link href="/catalogo">Catálogo</Link>
            <Link href="/sobre-nos">Sobre nós</Link>
            <Link href="/cuidados">Cuidados</Link>
            <Link href="/contato">Contato</Link>
          </nav>

          <div className="footer-links footer-contact">
            <h2>Fale conosco</h2>
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">
              <FooterIcon name="whatsapp" />
              <span>(83) 99326-4989</span>
            </a>
            <a
              href="https://www.instagram.com/lumina_jp/"
              target="_blank"
              rel="noreferrer"
            >
              <FooterIcon name="instagram" />
              <span>@luminasemijoias</span>
            </a>
            <a href={`mailto:${CONTACT_EMAIL}`}>
              <FooterIcon name="mail" />
              <span>{CONTACT_EMAIL}</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
