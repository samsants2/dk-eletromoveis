"use client";

import { useState } from "react";
import { Logo } from "@/components/Logo";

export function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        window.location.reload();
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? "Não foi possível entrar.");
      }
    } catch {
      setError("Erro de conexão. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container-dk grid min-h-[70vh] place-items-center py-16">
      <div className="w-full max-w-sm">
        <div className="mb-6 flex flex-col items-center text-center">
          <Logo className="h-12 w-12" />
          <h1 className="mt-4 text-2xl font-extrabold">Área administrativa</h1>
          <p className="mt-1 text-sm text-muted">
            Acesso restrito à equipe da DK Eletromóveis.
          </p>
        </div>

        <form onSubmit={onSubmit} className="card p-6">
          <label htmlFor="password" className="mb-1.5 block text-sm font-medium">
            Senha
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            className="w-full rounded-xl border border-line/22 bg-bg px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            placeholder="Digite a senha"
            required
          />
          {error && (
            <p className="mt-2 text-xs text-[#b4632a]" role="alert">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary mt-5 w-full disabled:opacity-60"
          >
            {loading ? "Entrando…" : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}
