"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { CategoryClips, CategorySummary, Lang } from "@/lib/clips";

type Filter = "all" | "e" | "p" | "u";

const LANG_BADGE: Record<Lang, { label: string; cls: string }> = {
  p: { label: "PT", cls: "bg-brand-green/15 text-brand-green" },
  e: { label: "EN", cls: "bg-brand-yellow/15 text-brand-yellow" },
  u: { label: "?", cls: "bg-muted/15 text-muted" },
};

interface Props {
  category: string;
  basePath: string;
  summary: CategorySummary | null;
}

export default function CatalogView({ category, basePath, summary }: Props) {
  const [data, setData] = useState<CategoryClips | null>(null);
  const [error, setError] = useState(false);
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    fetch(`${basePath}/clips/cat/${category}.json`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((j) => alive && setData(j))
      .catch(() => alive && setError(true));
    return () => {
      alive = false;
    };
  }, [basePath, category]);

  const files = useMemo(() => {
    if (!data) return [];
    let list = Object.entries(data).map(([stem, fc]) => {
      const en = fc.clips.filter((c) => c.l === "e").length;
      const pt = fc.clips.filter((c) => c.l === "p").length;
      return { stem, ...fc, en, pt, total: fc.clips.length };
    });
    if (query) {
      const q = query.toLowerCase();
      list = list.filter((f) => f.stem.toLowerCase().includes(q));
    }
    if (filter === "e") list = list.filter((f) => f.en > 0);
    if (filter === "p") list = list.filter((f) => f.pt > 0);
    if (filter === "u")
      list = list.filter((f) => f.clips.some((c) => c.l === "u"));
    // mais "falta dublar" primeiro
    list.sort((a, b) => b.en - a.en || a.stem.localeCompare(b.stem));
    return list;
  }, [data, query, filter]);

  if (error)
    return (
      <p className="mt-12 text-center text-muted">
        Catálogo desta categoria ainda não foi gerado.
      </p>
    );
  if (!data)
    return <p className="mt-12 text-center text-muted">Carregando falas…</p>;

  return (
    <div className="mt-8">
      {/* Controles */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          type="search"
          placeholder="Filtrar por arquivo/personagem…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-xl border border-border bg-card px-4 py-2 text-sm outline-none focus:border-brand-green/60 sm:max-w-xs"
        />
        <div className="flex gap-1.5">
          <FilterBtn cur={filter} v="all" set={setFilter}>
            Todos
          </FilterBtn>
          <FilterBtn cur={filter} v="e" set={setFilter}>
            🟡 Falta dublar
          </FilterBtn>
          <FilterBtn cur={filter} v="p" set={setFilter}>
            🟢 Dublado
          </FilterBtn>
          <FilterBtn cur={filter} v="u" set={setFilter}>
            ? Efeitos
          </FilterBtn>
        </div>
      </div>

      <p className="mt-3 text-xs text-muted">
        {files.length} arquivos
        {summary && ` · ${summary.clips.toLocaleString("pt-BR")} falas`}
      </p>

      {/* Lista de arquivos */}
      <div className="mt-4 space-y-2">
        {files.map((f) => (
          <FileRow
            key={f.stem}
            file={f}
            basePath={basePath}
            isOpen={open === f.stem}
            onToggle={() => setOpen(open === f.stem ? null : f.stem)}
            filter={filter}
          />
        ))}
        {files.length === 0 && (
          <p className="py-8 text-center text-sm text-muted">
            Nenhum arquivo com esse filtro.
          </p>
        )}
      </div>
    </div>
  );
}

function FilterBtn({
  cur,
  v,
  set,
  children,
}: {
  cur: Filter;
  v: Filter;
  set: (f: Filter) => void;
  children: React.ReactNode;
}) {
  const active = cur === v;
  return (
    <button
      onClick={() => set(v)}
      className={`rounded-lg border px-2.5 py-1.5 text-xs transition-colors ${
        active
          ? "border-brand-green/50 bg-brand-green/10 text-foreground"
          : "border-border bg-card/60 text-muted hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}

interface FileRowData {
  stem: string;
  pack: string;
  clips: { i: number; l: Lang }[];
  en: number;
  pt: number;
  total: number;
}

function FileRow({
  file,
  basePath,
  isOpen,
  onToggle,
  filter,
}: {
  file: FileRowData;
  basePath: string;
  isOpen: boolean;
  onToggle: () => void;
  filter: Filter;
}) {
  const ptPct = file.total > 0 ? Math.round((file.pt / file.total) * 100) : 0;
  const visibleClips = useMemo(() => {
    if (filter === "all") return file.clips;
    return file.clips.filter((c) => c.l === filter);
  }, [file.clips, filter]);

  return (
    <div className="rounded-2xl border border-border bg-card/60">
      <button
        onClick={onToggle}
        className="flex w-full items-center gap-3 px-4 py-3 text-left"
      >
        <span className="text-xs text-muted">{isOpen ? "▼" : "▶"}</span>
        <span className="flex-1 truncate font-mono text-sm">{file.stem}</span>
        {file.en > 0 && (
          <span className="rounded-full bg-brand-yellow/15 px-2 py-0.5 text-xs text-brand-yellow tabular-nums">
            {file.en} EN
          </span>
        )}
        <span className="hidden text-xs text-muted tabular-nums sm:inline">
          {file.pt}/{file.total} PT ({ptPct}%)
        </span>
        <span className="h-1.5 w-16 overflow-hidden rounded-full bg-background">
          <span
            className="block h-full rounded-full bg-brand-green"
            style={{ width: `${ptPct}%` }}
          />
        </span>
      </button>

      {isOpen && (
        <div className="border-t border-border px-3 pb-3 pt-2">
          <ClipGrid clips={visibleClips} file={file} basePath={basePath} />
        </div>
      )}
    </div>
  );
}

const PAGE = 60;

function ClipGrid({
  clips,
  file,
  basePath,
}: {
  clips: { i: number; l: Lang }[];
  file: FileRowData;
  basePath: string;
}) {
  const [limit, setLimit] = useState(PAGE);
  const [playing, setPlaying] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const shown = clips.slice(0, limit);

  function play(i: number) {
    if (playing === i) {
      audioRef.current?.pause();
      setPlaying(null);
      return;
    }
    setPlaying(i);
  }

  if (clips.length === 0)
    return <p className="py-3 text-center text-xs text-muted">Nada aqui.</p>;

  return (
    <div>
      {playing !== null && (
        <audio
          key={playing}
          ref={audioRef}
          src={`${basePath}/clips/audio/${file.pack}/${file.stem}/${playing}.ogg`}
          autoPlay
          controls
          onEnded={() => setPlaying(null)}
          className="mb-2 h-8 w-full"
        />
      )}
      <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3 md:grid-cols-4">
        {shown.map((c) => {
          const badge = LANG_BADGE[c.l];
          const active = playing === c.i;
          return (
            <button
              key={c.i}
              onClick={() => play(c.i)}
              className={`flex items-center gap-2 rounded-lg border px-2 py-1.5 text-left text-xs transition-colors ${
                active
                  ? "border-brand-green/50 bg-brand-green/10"
                  : "border-border bg-background/40 hover:border-brand-green/30"
              }`}
            >
              <span>{active ? "⏹" : "▶"}</span>
              <span className="flex-1 tabular-nums text-muted">#{c.i}</span>
              <span className={`rounded px-1 text-[10px] ${badge.cls}`}>
                {badge.label}
              </span>
            </button>
          );
        })}
      </div>
      {clips.length > limit && (
        <button
          onClick={() => setLimit(limit + PAGE)}
          className="mt-2 w-full rounded-lg border border-border bg-card/60 py-1.5 text-xs text-muted hover:text-foreground"
        >
          Ver mais ({clips.length - limit} restantes)
        </button>
      )}
    </div>
  );
}
