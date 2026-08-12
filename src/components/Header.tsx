"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { site } from "@/config/site";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { SearchIcon, MenuIcon, CloseIcon } from "./icons";

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  function onSearch(e: React.FormEvent) {
    e.preventDefault();
    const q = query.trim();
    router.push(q ? `/catalogo?q=${encodeURIComponent(q)}` : "/catalogo");
    setOpen(false);
  }

  return (
    <header className="sticky top-0 z-40 border-b border-line/10 bg-bg/85 backdrop-blur">
      <div className="container-dk flex h-16 items-center gap-4">
        <Link href="/" className="flex items-center gap-2.5" aria-label={site.name}>
          <Logo className="h-8 w-8" />
          <span className="font-display text-lg font-extrabold tracking-tight">
            DK <span className="text-primary">Eletromóveis</span>
          </span>
        </Link>

        <nav className="ml-4 hidden items-center gap-1 md:flex">
          {site.nav.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "bg-primary/12 text-primary"
                    : "text-content/80 hover:bg-surface-2"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <form
          onSubmit={onSearch}
          className="ml-auto hidden items-center rounded-full border border-line/20 bg-surface px-3 lg:flex"
          role="search"
        >
          <SearchIcon width={18} height={18} className="text-muted" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="search"
            placeholder="Buscar produto ou código…"
            className="w-56 bg-transparent px-2 py-2.5 text-sm outline-none placeholder:text-muted"
            aria-label="Buscar no catálogo"
          />
        </form>

        <div className="ml-auto flex items-center gap-2 lg:ml-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full border border-line/25 md:hidden"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      {open && (
        <div className="border-t border-line/10 bg-bg md:hidden">
          <div className="container-dk flex flex-col gap-1 py-3">
            <form onSubmit={onSearch} className="mb-2 flex items-center rounded-full border border-line/20 px-3" role="search">
              <SearchIcon width={18} height={18} className="text-muted" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                type="search"
                placeholder="Buscar produto ou código…"
                className="w-full bg-transparent px-2 py-2.5 text-sm outline-none placeholder:text-muted"
                aria-label="Buscar no catálogo"
              />
            </form>
            {site.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-surface-2"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
