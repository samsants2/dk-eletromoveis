"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Category, Product, ProductLine, Seller, Spec } from "@/lib/types";
import { CATEGORY_LABELS, LINE_LABELS } from "@/lib/types";
import { Logo } from "@/components/Logo";

const CATEGORIES: Category[] = ["moveis", "eletromoveis"];
const LINES: ProductLine[] = ["sala", "cozinha", "quarto", "escritorio", "area-externa"];

type Tab = "produtos" | "midias";

async function uploadFile(file: File, folder: "produtos" | "midia") {
  const fd = new FormData();
  fd.append("file", file);
  fd.append("folder", folder);
  const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error ?? "Falha no upload.");
  return data.path as string;
}

export function AdminDashboard({
  initialProducts,
  sellers,
}: {
  initialProducts: Product[];
  sellers: Seller[];
}) {
  const [tab, setTab] = useState<Tab>("produtos");
  const [products, setProducts] = useState<Product[]>(initialProducts);

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.reload();
  }

  return (
    <div className="container-dk py-8">
      {/* Cabeçalho do painel */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line/12 pb-5">
        <div className="flex items-center gap-3">
          <Logo className="h-9 w-9" />
          <div>
            <h1 className="text-lg font-extrabold leading-tight">Painel administrativo</h1>
            <p className="text-xs text-muted">DK Eletromóveis</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/" className="btn btn-outline !py-2 text-sm" target="_blank">
            Ver site
          </Link>
          <button onClick={logout} className="btn btn-outline !py-2 text-sm">
            Sair
          </button>
        </div>
      </div>

      {/* Abas */}
      <div className="mt-6 flex gap-2">
        <TabButton active={tab === "produtos"} onClick={() => setTab("produtos")}>
          Produtos ({products.length})
        </TabButton>
        <TabButton active={tab === "midias"} onClick={() => setTab("midias")}>
          Mídias do site
        </TabButton>
      </div>

      <div className="mt-6">
        {tab === "produtos" ? (
          <ProductsTab
            products={products}
            sellers={sellers}
            onCreated={(p) => setProducts((prev) => [p, ...prev])}
            onUpdated={(p) =>
              setProducts((prev) => prev.map((x) => (x.id === p.id ? p : x)))
            }
            onDeleted={(id) => setProducts((prev) => prev.filter((x) => x.id !== id))}
          />
        ) : (
          <MediaTab />
        )}
      </div>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
        active ? "bg-primary/12 text-primary" : "text-content/80 hover:bg-surface-2"
      }`}
    >
      {children}
    </button>
  );
}

/* ------------------------------ Produtos ------------------------------ */

interface FormState {
  name: string;
  code: string;
  brand: string;
  category: Category;
  line: ProductLine;
  shortDescription: string;
  description: string;
  sellerId: string;
  available: boolean;
  featured: boolean;
}

function ProductsTab({
  products,
  sellers,
  onCreated,
  onUpdated,
  onDeleted,
}: {
  products: Product[];
  sellers: Seller[];
  onCreated: (p: Product) => void;
  onUpdated: (p: Product) => void;
  onDeleted: (id: string) => void;
}) {
  const emptyForm: FormState = {
    name: "",
    code: "",
    brand: "",
    category: "moveis",
    line: "sala",
    shortDescription: "",
    description: "",
    sellerId: sellers[0]?.id ?? "",
    available: true,
    featured: false,
  };

  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [specs, setSpecs] = useState<Spec[]>([{ label: "", value: "" }]);
  const [image, setImage] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const isEditing = editingId !== null;

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function resetForm() {
    setEditingId(null);
    setForm(emptyForm);
    setSpecs([{ label: "", value: "" }]);
    setImage("");
    setMsg(null);
  }

  function startEdit(p: Product) {
    setEditingId(p.id);
    setForm({
      name: p.name,
      code: p.code,
      brand: p.brand,
      category: p.category,
      line: p.line,
      shortDescription: p.shortDescription,
      description: p.description,
      sellerId: p.sellerId,
      available: p.available,
      featured: p.featured,
    });
    setSpecs(p.specs.length ? p.specs : [{ label: "", value: "" }]);
    setImage(p.image ?? "");
    setMsg(null);
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  async function onImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setMsg(null);
    try {
      const path = await uploadFile(file, "produtos");
      setImage(path);
    } catch (err) {
      setMsg({ type: "err", text: (err as Error).message });
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMsg(null);
    const payload = {
      ...form,
      image, // string (pode ser "" para remover a imagem)
      specs: specs.filter((s) => s.label && s.value),
    };
    try {
      const res = await fetch(
        isEditing ? `/api/admin/products/${editingId}` : "/api/admin/products",
        {
          method: isEditing ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error ?? "Falha ao salvar.");

      if (isEditing) {
        onUpdated(data.product as Product);
        setMsg({ type: "ok", text: `Produto “${data.product.name}” atualizado.` });
        resetForm();
      } else {
        onCreated(data.product as Product);
        setMsg({ type: "ok", text: `Produto “${data.product.name}” cadastrado.` });
        setForm(emptyForm);
        setSpecs([{ label: "", value: "" }]);
        setImage("");
      }
    } catch (err) {
      setMsg({ type: "err", text: (err as Error).message });
    } finally {
      setSaving(false);
    }
  }

  async function onDelete(p: Product) {
    if (!window.confirm(`Excluir o produto “${p.name}”? Esta ação não pode ser desfeita.`))
      return;
    setDeletingId(p.id);
    try {
      const res = await fetch(`/api/admin/products/${p.id}`, { method: "DELETE" });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error ?? "Falha ao excluir.");
      onDeleted(p.id);
      if (editingId === p.id) resetForm();
    } catch (err) {
      setMsg({ type: "err", text: (err as Error).message });
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
      {/* Formulário de cadastro / edição */}
      <form ref={formRef} onSubmit={onSubmit} className="card h-fit p-6">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-lg font-bold">
            {isEditing ? "Editar produto" : "Cadastrar novo produto"}
          </h2>
          {isEditing && (
            <button
              type="button"
              onClick={resetForm}
              className="text-sm font-medium text-muted hover:text-content hover:underline"
            >
              Cancelar edição
            </button>
          )}
        </div>
        {isEditing && (
          <p className="mt-1 text-xs text-muted">
            Editando <span className="font-mono">{form.code}</span> — as alterações
            substituem o produto existente.
          </p>
        )}

        {/* Upload / troca de imagem */}
        <div className="mt-4">
          <label className="mb-1.5 block text-sm font-medium">Imagem do produto</label>
          <div className="flex items-center gap-4">
            <div className="relative grid h-24 w-24 shrink-0 place-items-center overflow-hidden rounded-xl border border-line/15 bg-surface-2 text-xs text-muted">
              {image ? (
                <Image src={image} alt="Prévia" fill className="object-cover" sizes="96px" />
              ) : (
                <span>Sem imagem</span>
              )}
            </div>
            <div className="text-sm">
              <input
                type="file"
                accept="image/*"
                onChange={onImageChange}
                className="block w-full text-sm text-muted file:mr-3 file:rounded-full file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-semibold file:text-primary-ink hover:file:brightness-105"
              />
              {uploading && <p className="mt-1 text-xs text-muted">Enviando imagem…</p>}
              <p className="mt-1 text-xs text-muted">
                {isEditing
                  ? "Selecione um arquivo para substituir a imagem atual."
                  : "JPG, PNG, WEBP ou AVIF, até 8 MB."}
              </p>
              {image && (
                <button
                  type="button"
                  onClick={() => setImage("")}
                  className="mt-1 text-xs text-[#b4632a] hover:underline"
                >
                  Remover imagem
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <TextField label="Nome" value={form.name} onChange={(v) => set("name", v)} required />
          <TextField
            label="Código"
            value={form.code}
            onChange={(v) => set("code", v)}
            placeholder={isEditing ? "" : "gerado automaticamente"}
          />
          <TextField label="Marca" value={form.brand} onChange={(v) => set("brand", v)} required />
          <SelectField
            label="Vendedor (CTA)"
            value={form.sellerId}
            onChange={(v) => set("sellerId", v)}
            options={sellers.map((s) => ({ value: s.id, label: `${s.name} — ${s.role}` }))}
          />
          <SelectField
            label="Categoria"
            value={form.category}
            onChange={(v) => set("category", v as Category)}
            options={CATEGORIES.map((c) => ({ value: c, label: CATEGORY_LABELS[c] }))}
          />
          <SelectField
            label="Linha"
            value={form.line}
            onChange={(v) => set("line", v as ProductLine)}
            options={LINES.map((l) => ({ value: l, label: LINE_LABELS[l] }))}
          />
        </div>

        <div className="mt-4">
          <TextField
            label="Descrição curta"
            value={form.shortDescription}
            onChange={(v) => set("shortDescription", v)}
            required
          />
        </div>

        <div className="mt-4">
          <label className="mb-1.5 block text-sm font-medium">Descrição completa</label>
          <textarea
            value={form.description}
            onChange={(e) => set("description", e.target.value)}
            className="min-h-24 w-full resize-y rounded-xl border border-line/22 bg-bg px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>

        {/* Especificações */}
        <div className="mt-4">
          <label className="mb-1.5 block text-sm font-medium">Especificações técnicas</label>
          <div className="flex flex-col gap-2">
            {specs.map((s, i) => (
              <div key={i} className="flex gap-2">
                <input
                  value={s.label}
                  onChange={(e) =>
                    setSpecs((prev) =>
                      prev.map((x, j) => (j === i ? { ...x, label: e.target.value } : x)),
                    )
                  }
                  placeholder="Ex.: Dimensões"
                  className="w-1/2 rounded-lg border border-line/22 bg-bg px-3 py-2 text-sm outline-none focus:border-primary"
                />
                <input
                  value={s.value}
                  onChange={(e) =>
                    setSpecs((prev) =>
                      prev.map((x, j) => (j === i ? { ...x, value: e.target.value } : x)),
                    )
                  }
                  placeholder="Ex.: 180 × 90 cm"
                  className="w-1/2 rounded-lg border border-line/22 bg-bg px-3 py-2 text-sm outline-none focus:border-primary"
                />
                <button
                  type="button"
                  onClick={() => setSpecs((prev) => prev.filter((_, j) => j !== i))}
                  className="shrink-0 rounded-lg border border-line/22 px-3 text-sm text-muted hover:bg-surface-2"
                  aria-label="Remover especificação"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setSpecs((prev) => [...prev, { label: "", value: "" }])}
            className="mt-2 text-sm font-medium text-primary hover:underline"
          >
            + Adicionar especificação
          </button>
        </div>

        <div className="mt-4 flex flex-wrap gap-5">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.available}
              onChange={(e) => set("available", e.target.checked)}
              className="h-4 w-4 accent-[color:rgb(var(--primary))]"
            />
            Disponível em estoque
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) => set("featured", e.target.checked)}
              className="h-4 w-4 accent-[color:rgb(var(--primary))]"
            />
            Destaque na home
          </label>
        </div>

        {msg && (
          <p
            className={`mt-4 text-sm ${msg.type === "ok" ? "text-secondary" : "text-[#b4632a]"}`}
            role="status"
          >
            {msg.text}
          </p>
        )}

        <div className="mt-5 flex gap-3">
          <button
            type="submit"
            disabled={saving || uploading}
            className="btn btn-primary flex-1 disabled:opacity-60"
          >
            {saving
              ? "Salvando…"
              : isEditing
                ? "Salvar alterações"
                : "Cadastrar produto"}
          </button>
          {isEditing && (
            <button type="button" onClick={resetForm} className="btn btn-outline">
              Cancelar
            </button>
          )}
        </div>
      </form>

      {/* Lista de produtos */}
      <div>
        <h2 className="mb-3 text-lg font-bold">Produtos cadastrados</h2>
        <div className="flex flex-col gap-2">
          {products.map((p) => (
            <div
              key={p.id}
              className={`card flex items-center gap-3 p-3 ${
                editingId === p.id ? "ring-2 ring-primary/40" : ""
              }`}
            >
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-surface-2">
                {p.image ? (
                  <Image src={p.image} alt={p.name} fill className="object-cover" sizes="56px" />
                ) : (
                  <span className="grid h-full w-full place-items-center text-[10px] text-muted">
                    sem foto
                  </span>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">{p.name}</p>
                <p className="text-xs text-muted">
                  {CATEGORY_LABELS[p.category]} · {LINE_LABELS[p.line]} · {p.brand}
                </p>
                <div className="mt-1 flex items-center gap-2">
                  <span className="font-mono text-[11px] text-muted">{p.code}</span>
                  {p.featured && (
                    <span className="rounded-full bg-primary/12 px-2 py-0.5 text-[10px] font-medium text-primary">
                      destaque
                    </span>
                  )}
                  {!p.available && (
                    <span className="rounded-full bg-sand/30 px-2 py-0.5 text-[10px] font-medium text-ink">
                      sob consulta
                    </span>
                  )}
                </div>
              </div>
              <div className="flex shrink-0 flex-col gap-1.5">
                <button
                  type="button"
                  onClick={() => startEdit(p)}
                  className="rounded-lg border border-line/22 px-3 py-1 text-xs font-medium hover:bg-surface-2"
                >
                  Editar
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(p)}
                  disabled={deletingId === p.id}
                  className="rounded-lg border border-line/22 px-3 py-1 text-xs font-medium text-[#b4632a] hover:bg-surface-2 disabled:opacity-50"
                >
                  {deletingId === p.id ? "Excluindo…" : "Excluir"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------ Mídias ------------------------------ */

function MediaTab() {
  const [files, setFiles] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [msg, setMsg] = useState<string>("");

  async function load() {
    const res = await fetch("/api/admin/media");
    const data = await res.json().catch(() => ({ files: [] }));
    setFiles(data.files ?? []);
  }

  useEffect(() => {
    load();
  }, []);

  async function onUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const list = e.target.files;
    if (!list || list.length === 0) return;
    setUploading(true);
    setMsg("");
    try {
      for (const file of Array.from(list)) {
        await uploadFile(file, "midia");
      }
      await load();
      setMsg("Mídia(s) enviada(s) com sucesso.");
    } catch (err) {
      setMsg((err as Error).message);
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  return (
    <div>
      <div className="card p-6">
        <h2 className="text-lg font-bold">Enviar novas mídias</h2>
        <p className="mt-1 text-sm text-muted">
          Banners, fotos institucionais e imagens de campanha. Ficam disponíveis em
          <code className="mx-1 rounded bg-surface-2 px-1">/midia</code>
          para uso no site.
        </p>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={onUpload}
          className="mt-4 block text-sm text-muted file:mr-3 file:rounded-full file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-semibold file:text-primary-ink hover:file:brightness-105"
        />
        {uploading && <p className="mt-2 text-xs text-muted">Enviando…</p>}
        {msg && <p className="mt-2 text-sm text-secondary">{msg}</p>}
      </div>

      <h3 className="mb-3 mt-8 text-sm font-semibold uppercase tracking-wide text-muted">
        Mídias enviadas ({files.length})
      </h3>
      {files.length === 0 ? (
        <p className="text-sm text-muted">Nenhuma mídia enviada ainda.</p>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {files.map((f) => (
            <figure key={f} className="card overflow-hidden">
              <div className="relative aspect-square bg-surface-2">
                <Image src={f} alt={f} fill className="object-cover" sizes="200px" />
              </div>
              <figcaption className="flex items-center justify-between gap-2 p-2">
                <code className="truncate text-[11px] text-muted">{f}</code>
                <button
                  type="button"
                  onClick={() => navigator.clipboard?.writeText(f)}
                  className="shrink-0 text-[11px] font-medium text-primary hover:underline"
                >
                  copiar
                </button>
              </figcaption>
            </figure>
          ))}
        </div>
      )}
    </div>
  );
}

/* ------------------------------ Campos ------------------------------ */

function TextField({
  label,
  value,
  onChange,
  required,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-xl border border-line/22 bg-bg px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
      />
    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-line/22 bg-bg px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}
