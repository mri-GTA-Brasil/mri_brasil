"use client";

import { useState, useRef } from "react";
import type { FileEntry } from "@/lib/previews";

interface Props {
  files: FileEntry[];
  basePath: string;
}

export default function AudioBrowser({ files, basePath }: Props) {
  const [query, setQuery] = useState("");
  const [activeUrl, setActiveUrl] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const filtered = query
    ? files.filter((f) =>
        f.file.toLowerCase().includes(query.toLowerCase())
      )
    : files;

  function play(url: string) {
    if (activeUrl === url) {
      audioRef.current?.pause();
      setActiveUrl(null);
      return;
    }
    setActiveUrl(url);
    // audio element will autoPlay via key change
  }

  return (
    <div>
      {files.length > 10 && (
        <input
          type="search"
          placeholder="Filtrar por nome…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="mb-3 w-full rounded-xl border border-border bg-card px-4 py-2 text-sm outline-none focus:border-brand-green/60"
        />
      )}

      {activeUrl && (
        <audio
          key={activeUrl}
          ref={audioRef}
          src={activeUrl}
          autoPlay
          onEnded={() => setActiveUrl(null)}
          controls
          className="mb-3 h-8 w-full"
        />
      )}

      <div className="space-y-1 max-h-96 overflow-y-auto pr-1">
        {filtered.length === 0 ? (
          <p className="text-sm text-muted py-4 text-center">Nenhum resultado.</p>
        ) : (
          filtered.map(({ pack, category, file }) => {
            const url = `${basePath}/previews/${pack}/${category}/${file}`;
            const isActive = activeUrl === url;
            const label = file.replace(/\.ogg$/, "").replace(/_/g, " ");

            return (
              <button
                key={url}
                onClick={() => play(url)}
                className={`flex w-full items-center gap-3 rounded-xl border px-4 py-2 text-left text-sm transition-colors ${
                  isActive
                    ? "border-brand-green/40 bg-brand-green/10 text-brand-green"
                    : "border-border bg-card/60 text-muted hover:border-brand-yellow/30 hover:text-foreground"
                }`}
              >
                <span className="shrink-0 text-xs">{isActive ? "⏹" : "▶"}</span>
                <span className="flex-1 truncate font-mono text-xs">{label}</span>
              </button>
            );
          })
        )}
      </div>

      {filtered.length > 0 && (
        <p className="mt-2 text-xs text-muted text-right">
          {filtered.length} arquivo{filtered.length !== 1 ? "s" : ""}
          {query && ` de ${files.length}`}
        </p>
      )}
    </div>
  );
}
