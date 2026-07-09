"use client";

type AdminHeaderProps = {
  email?: string | null;
  onLogout: () => void;
};

export function AdminHeader({ email, onLogout }: AdminHeaderProps) {
  return (
    <header className="admin-header">
      <div>
        <p className="admin-eyebrow">Lumina Semijoias</p>
        <h1>Painel administrativo</h1>
        {email ? <span>{email}</span> : null}
      </div>
      <button className="admin-ghost-button" type="button" onClick={onLogout}>
        Sair
      </button>
    </header>
  );
}
