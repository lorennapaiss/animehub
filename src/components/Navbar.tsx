"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { favoritesEventName, readFavorites } from "@/lib/favorites";

export function Navbar() {
  const router = useRouter();
  const sp = useSearchParams();

  const eventName = useMemo(() => favoritesEventName(), []);
  const [count, setCount] = useState(0);

  const initialQ = sp.get("q") ?? "";
  const [q, setQ] = useState(initialQ);

  useEffect(() => {
    const sync = () => setCount(readFavorites().length);
    sync();
    window.addEventListener(eventName, sync);
    return () => window.removeEventListener(eventName, sync);
  }, [eventName]);

  useEffect(() => {
    setQ(initialQ);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialQ]);

  function submitSearch() {
    const query = q.trim();
    if (!query) {
      router.push("/");
      return;
    }
    router.push(`/?q=${encodeURIComponent(query)}`);
  }

  return (
    <header className="sticky top-0 z-50">
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-violet-400/60 to-transparent" />

      <div className="border-b border-black/5 bg-[#F7F3EE]/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-4 py-1.5">
          {/* BRAND */}
          <a href="/" className="group flex items-center gap-3 shrink-0">
            {/* LOGO PNG */}
            <div className="relative">
              <div className="absolute -inset-2 rounded-3xl bg-violet-500/10 blur-xl opacity-0 transition group-hover:opacity-100" />

              {/* Container com tamanho fixo pra caber na navbar */}
              <div className="relative flex items-center">
              <Image
                src="/logo.png"
                alt="AnimeHub"
                width={1200}
                height={360}
                priority
                className="h-20 w-auto"
              />
            </div>

            </div>

            {/* Texto (opcional) — mantive só o beta e o subtítulo */}
            <div className="hidden sm:flex flex-col">
              <div className="flex items-center gap-2 leading-none">
                <span className="rounded-full bg-violet-100 px-2 py-0.5 text-[10px] font-bold text-violet-700">
                  beta
                </span>
              </div>

              <span className="mt-1 text-[11px] leading-none text-zinc-500">
                descobrir <span className="text-zinc-300">•</span> favoritar{" "}
                <span className="text-zinc-300">•</span> explorar
              </span>
            </div>
          </a>

          {/* SEARCH (desktop) */}
          <div className="hidden md:flex flex-1 max-w-md">
            <form
              className="w-full"
              onSubmit={(e) => {
                e.preventDefault();
                submitSearch();
              }}
            >
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400">
                  ⌕
                </span>

                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Buscar anime..."
                  className="w-full rounded-2xl border border-black/10 bg-[#FFFCFA] pl-11 pr-20 py-2.5 outline-none focus:border-violet-400"
                />

                {q.trim() ? (
                  <button
                    type="button"
                    onClick={() => {
                      setQ("");
                      router.push("/");
                    }}
                    className="absolute right-12 top-1/2 -translate-y-1/2 rounded-xl px-2 py-1 text-xs font-semibold text-zinc-600 hover:bg-zinc-100 transition"
                    title="Limpar"
                  >
                    ✕
                  </button>
                ) : null}

                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl bg-violet-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-violet-700 transition"
                >
                  Buscar
                </button>
              </div>
            </form>
          </div>

          {/* ACTIONS */}
          <nav className="flex items-center gap-2 shrink-0">
            <a
              href="/favorites"
              className="inline-flex items-center gap-2 rounded-2xl border border-black/10 bg-white px-4 py-2 text-sm font-semibold transition hover:bg-violet-50 hover:border-violet-200"
            >
              <span className="hidden sm:inline">Favoritos</span>
              <span className="inline sm:hidden">★</span>
              <span className="grid min-w-6 place-items-center rounded-full bg-violet-600 px-2 py-0.5 text-xs font-bold text-white">
                {count}
              </span>
            </a>

            <a
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-2xl bg-violet-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-violet-700 shadow-[0_10px_30px_rgba(124,58,237,0.22)]"
            >
              GitHub
            </a>
          </nav>
        </div>

        {/* SEARCH (mobile) */}
        <div className="md:hidden px-4 pb-3">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              submitSearch();
            }}
          >
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400">
                ⌕
              </span>
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Buscar anime..."
                className="w-full rounded-2xl border border-black/10 bg-[#FFFCFA] pl-11 pr-24 py-2.5 outline-none focus:border-violet-400"
              />
              {q.trim() ? (
                <button
                  type="button"
                  onClick={() => {
                    setQ("");
                    router.push("/");
                  }}
                  className="absolute right-14 top-1/2 -translate-y-1/2 rounded-xl px-2 py-1 text-xs font-semibold text-zinc-600 hover:bg-zinc-100 transition"
                  title="Limpar"
                >
                  ✕
                </button>
              ) : null}
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl bg-violet-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-violet-700 transition"
              >
                Buscar
              </button>
            </div>
          </form>
        </div>
      </div>
    </header>
  );
}
