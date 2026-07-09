"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import { useEffect, useState } from "react";
import { getCurrentSession, signInAdmin } from "@/services/authService";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function redirectAuthenticatedUser() {
      try {
        const session = await getCurrentSession();

        if (session && isMounted) {
          router.replace("/admin");
        }
      } catch {
        // Keep the form visible if Supabase env vars are missing during setup.
      }
    }

    redirectAuthenticatedUser();

    return () => {
      isMounted = false;
    };
  }, [router]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      await signInAdmin(email, password);
      router.replace("/admin");
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Nao foi possivel entrar. Tente novamente.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="login-page">
      <section className="login-panel" aria-labelledby="login-title">
        <Link className="login-logo" href="/" aria-label="Voltar para a Lumina">
          <Image
            src="/logo/logo.png"
            alt="Lumina Semijoias"
            width={220}
            height={220}
            priority
          />
        </Link>
        <p className="admin-eyebrow">Area administrativa</p>
        <h1 id="login-title">Entrar no painel</h1>

        <form className="login-form" onSubmit={handleSubmit}>
          <label>
            E-mail
            <input
              required
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </label>
          <label>
            Senha
            <input
              required
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>

          {errorMessage ? (
            <p className="admin-message admin-message-error" role="alert">
              {errorMessage}
            </p>
          ) : null}

          <button className="primary-button" disabled={isSubmitting}>
            {isSubmitting ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </section>
    </main>
  );
}
