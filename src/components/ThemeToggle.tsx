"use client";

import { useEffect, useState } from "react";
import { SunIcon, MoonIcon } from "./icons";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggle() {
    const root = document.documentElement;
    const next = !root.classList.contains("dark");
    root.classList.toggle("dark", next);
    try {
      localStorage.setItem("dk-theme", next ? "dark" : "light");
    } catch {
      /* ignore */
    }
    setDark(next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="grid h-10 w-10 place-items-center rounded-full border border-line/25 text-content transition-colors hover:bg-surface-2"
      aria-label={dark ? "Ativar tema claro" : "Ativar tema escuro"}
    >
      {mounted && dark ? <MoonIcon width={18} height={18} /> : <SunIcon width={18} height={18} />}
    </button>
  );
}
