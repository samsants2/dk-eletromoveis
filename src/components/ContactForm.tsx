"use client";

import { useState } from "react";
import { whatsappLink } from "@/lib/whatsapp";
import { defaultSeller } from "@/data/sellers";
import { WhatsAppIcon, CheckIcon } from "./icons";

type Errors = Partial<Record<"name" | "phone" | "message", string>>;

export function ContactForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  function validate(): boolean {
    const e: Errors = {};
    if (name.trim().length < 2) e.name = "Informe seu nome.";
    if (phone.replace(/\D/g, "").length < 10)
      e.phone = "Informe um telefone com DDD.";
    if (message.trim().length < 5) e.message = "Escreva uma mensagem.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function onSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    if (!validate()) return;
    // MVP: encaminha via WhatsApp com a mensagem montada.
    // (Na Fase 1/2, este envio pode ir para um endpoint de e-mail/CRM.)
    const text = `Olá! Meu nome é ${name.trim()}. ${message.trim()} (Telefone: ${phone.trim()})`;
    window.open(whatsappLink(defaultSeller.phone, text), "_blank", "noopener");
    setSent(true);
  }

  if (sent) {
    return (
      <div className="card grid place-items-center gap-3 p-10 text-center">
        <span className="grid h-12 w-12 place-items-center rounded-full bg-secondary/15 text-secondary">
          <CheckIcon width={24} height={24} />
        </span>
        <p className="text-lg font-semibold">Abrimos o WhatsApp para você</p>
        <p className="max-w-sm text-sm text-muted">
          Se a conversa não abriu automaticamente, verifique o bloqueador de
          pop-ups ou fale direto pelo botão de WhatsApp ao lado.
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="btn btn-outline mt-2"
        >
          Enviar outra mensagem
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="card p-6 sm:p-8">
      <div className="grid gap-5">
        <Field label="Nome" error={errors.name} htmlFor="name">
          <input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input"
            placeholder="Seu nome ou nome da loja"
            autoComplete="name"
          />
        </Field>

        <Field label="Telefone / WhatsApp" error={errors.phone} htmlFor="phone">
          <input
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="input"
            placeholder="(62) 90000-0000"
            inputMode="tel"
            autoComplete="tel"
          />
        </Field>

        <Field label="Mensagem" error={errors.message} htmlFor="message">
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="input min-h-28 resize-y"
            placeholder="Conte o que você procura…"
          />
        </Field>

        <button type="submit" className="btn btn-primary w-full sm:w-auto">
          <WhatsAppIcon width={18} height={18} />
          Enviar pelo WhatsApp
        </button>

        <p className="text-xs text-muted">
          Ao enviar, abriremos uma conversa no WhatsApp com sua mensagem já
          preenchida. Não compartilhamos seus dados.
        </p>
      </div>

      <style jsx>{`
        .input {
          width: 100%;
          border-radius: 12px;
          border: 1px solid rgb(var(--border) / 0.22);
          background: rgb(var(--bg));
          padding: 12px 14px;
          font-size: 0.95rem;
          outline: none;
          transition: border-color 0.15s ease, box-shadow 0.15s ease;
        }
        .input:focus {
          border-color: rgb(var(--primary));
          box-shadow: 0 0 0 3px rgb(var(--primary) / 0.15);
        }
      `}</style>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium">
        {label}
      </label>
      {children}
      {error && (
        <p className="mt-1 text-xs text-[#b4632a]" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
