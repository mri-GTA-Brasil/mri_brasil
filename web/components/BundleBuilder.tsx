"use client";

import { useMemo, useState } from "react";
import { fmtSize, CATEGORY_LABEL, type Pkg, type Bundle } from "@/lib/packages";

export default function BundleBuilder({
  packages,
  bundles,
}: {
  packages: Pkg[];
  bundles: Bundle[];
}) {
  const [sel, setSel] = useState<Set<string>>(new Set());
  const [copied, setCopied] = useState(false);
  const [copiedCmd, setCopiedCmd] = useState(false);

  const groups = useMemo(() => {
    const g: Record<string, Pkg[]> = { dublagem: [], ambientacao: [] };
    for (const p of packages) g[p.category]?.push(p);
    return g;
  }, [packages]);

  const selected = packages.filter((p) => sel.has(p.id));
  const totalSize = selected.reduce((n, p) => n + p.size, 0);

  const toggle = (id: string) =>
    setSel((s) => {
      const n = new Set(s);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });

  const setPreset = (ids: string[]) => setSel(new Set(ids));

  const cfg =
    "# mri Brasil — pacotes selecionados\n" +
    selected.map((p) => `ensure ${p.id}`).join("\n");

  // Se a seleção casa exatamente com um pacotão, dá pra baixar 1 arquivo só.
  const selIds = new Set(selected.map((p) => p.id));
  const matchedBundle =
    bundles.find(
      (b) =>
        b.packages.length === selIds.size &&
        b.packages.every((id) => selIds.has(id))
    ) ?? null;

  const terminalCmd = matchedBundle
    ? `curl -L -O "${matchedBundle.url}"`
    : "curl -L " + selected.map((p) => `-O "${p.url}"`).join(" ");

  function downloadSingle(u: string) {
    const a = document.createElement("a");
    a.href = u;
    a.download = "";
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  async function copyCmd() {
    try {
      await navigator.clipboard.writeText(terminalCmd);
      setCopiedCmd(true);
      setTimeout(() => setCopiedCmd(false), 1800);
    } catch {
      /* ignore */
    }
  }

  async function copyCfg() {
    try {
      await navigator.clipboard.writeText(cfg);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* ignore */
    }
  }

  function downloadAll() {
    selected.forEach((p, i) => {
      setTimeout(() => {
        const a = document.createElement("a");
        a.href = p.url;
        a.download = "";
        document.body.appendChild(a);
        a.click();
        a.remove();
      }, i * 700);
    });
  }

  return (
    <div>
      {/* Baixar tudo de uma vez — 1 arquivo */}
      {bundles.length > 0 && (
        <div className="mb-8 rounded-2xl border border-border bg-surface/40 p-5">
          <p className="eyebrow">Baixar tudo de uma vez</p>
          <div className="mt-3 grid gap-2 sm:grid-cols-3">
            {bundles.map((b, i) => (
              <a
                key={b.id}
                href={b.url}
                className={`flex items-center justify-between gap-3 rounded-xl border px-4 py-3 text-sm transition-colors ${
                  i === 0
                    ? "border-brand-green/50 bg-brand-green/[0.08] hover:bg-brand-green/[0.14]"
                    : "border-border bg-background/40 hover:border-brand-green/40"
                }`}
              >
                <span className="min-w-0">
                  <span className="block font-medium">{b.label}</span>
                  <span className="block truncate text-xs text-muted">
                    {b.packages.length} pacotes
                  </span>
                </span>
                <span className="tnum shrink-0 text-xs text-muted">
                  {fmtSize(b.size)} ↓
                </span>
              </a>
            ))}
          </div>
          <p className="mt-3 text-xs text-muted">
            Um único arquivo — uma confirmação só. Ou monte um pack personalizado
            abaixo.
          </p>
        </div>
      )}

      {/* Atalhos */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="eyebrow mr-1">Atalhos</span>
        <Preset onClick={() => setPreset(packages.map((p) => p.id))}>Tudo</Preset>
        <Preset onClick={() => setPreset(groups.dublagem.map((p) => p.id))}>Só dublagem</Preset>
        <Preset onClick={() => setPreset(groups.ambientacao.map((p) => p.id))}>Só ambientação</Preset>
        <Preset onClick={() => setPreset([])} muted>Limpar</Preset>
      </div>

      {/* Grupos */}
      {(["dublagem", "ambientacao"] as const).map((cat) => (
        <section key={cat} className="mt-8">
          <div className="mb-3">
            <h3 className="flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-wider text-muted">
              <span>{CATEGORY_LABEL[cat].icon}</span> {CATEGORY_LABEL[cat].label}
              <span className="font-mono text-xs normal-case">
                ({groups[cat].length})
              </span>
            </h3>
            {CATEGORY_LABEL[cat].note && (
              <p className="mt-1 text-xs text-muted">{CATEGORY_LABEL[cat].note}</p>
            )}
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            {groups[cat].map((p) => {
              const on = sel.has(p.id);
              return (
                <div
                  key={p.id}
                  onClick={() => toggle(p.id)}
                  role="checkbox"
                  aria-checked={on}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      toggle(p.id);
                    }
                  }}
                  className={`group cursor-pointer rounded-xl border p-4 transition-colors ${
                    on
                      ? "border-brand-green/60 bg-brand-green/[0.06]"
                      : "border-border bg-surface/40 hover:border-brand-green/30"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span
                      className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border text-xs ${
                        on
                          ? "border-brand-green bg-brand-green text-background"
                          : "border-border text-transparent"
                      }`}
                      aria-hidden
                    >
                      ✓
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline justify-between gap-2">
                        <h4 className="font-medium leading-tight">{p.name}</h4>
                        <span className="tnum shrink-0 text-xs text-muted">
                          {fmtSize(p.size)}
                        </span>
                      </div>
                      <p className="mt-1 text-sm leading-snug text-muted">{p.desc}</p>
                      <a
                        href={p.url}
                        onClick={(e) => e.stopPropagation()}
                        className="mt-2 inline-block font-mono text-xs text-muted transition-colors hover:text-brand-green"
                      >
                        baixar avulso ↓
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ))}

      {/* server.cfg + instalação */}
      <section className="mt-10 grid gap-6 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-xl border border-border bg-surface/40 p-5">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-semibold">3 passos pra instalar</h3>
          </div>
          <ol className="mt-4 space-y-3 text-sm text-muted">
            <li className="flex gap-3">
              <span className="tnum text-brand-green">1</span>
              <span>Baixe os pacotes selecionados (botão abaixo) e descompacte.</span>
            </li>
            <li className="flex gap-3">
              <span className="tnum text-brand-green">2</span>
              <span>
                Jogue as pastas <code className="rounded bg-background px-1 font-mono text-xs">mri_brasil_*</code>{" "}
                dentro de <code className="rounded bg-background px-1 font-mono text-xs">resources/</code> do servidor.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="tnum text-brand-green">3</span>
              <span>Cole as linhas ao lado no <code className="rounded bg-background px-1 font-mono text-xs">server.cfg</code> e reinicie.</span>
            </li>
          </ol>
        </div>

        <div className="rounded-xl border border-border bg-surface/40 p-5">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-semibold">server.cfg</h3>
            <button
              onClick={copyCfg}
              disabled={selected.length === 0}
              className="rounded-lg border border-border px-3 py-1 font-mono text-xs transition-colors enabled:hover:border-brand-green/50 disabled:opacity-40"
            >
              {copied ? "copiado ✓" : "copiar"}
            </button>
          </div>
          <pre className="mt-3 max-h-52 overflow-auto rounded-lg bg-background p-3 font-mono text-xs leading-relaxed text-foreground/90">
            {selected.length ? cfg : "# selecione pacotes acima…"}
          </pre>
        </div>
      </section>

      {/* Barra de ação fixa */}
      {selected.length > 0 && (
        <div className="sticky bottom-4 z-40 mt-8">
          <div className="mx-auto flex flex-col gap-3 rounded-2xl border border-brand-green/30 bg-surface/90 p-3 pl-5 shadow-xl backdrop-blur-md sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm">
              <span className="tnum font-semibold">{selected.length}</span>{" "}
              pacote{selected.length !== 1 ? "s" : ""} ·{" "}
              <span className="tnum text-muted">{fmtSize(totalSize)}</span>
              {matchedBundle ? (
                <span className="ml-2 text-xs text-brand-green">· 1 arquivo só</span>
              ) : (
                <span className="ml-2 text-xs text-muted">· {selected.length} arquivos</span>
              )}
            </p>
            <div className="flex w-full flex-wrap gap-2 sm:w-auto">
              <button
                onClick={copyCfg}
                className="flex-1 rounded-full border border-border px-4 py-2.5 text-sm font-medium transition-colors hover:border-brand-green/50 sm:flex-none"
              >
                {copied ? "server.cfg copiado ✓" : "server.cfg"}
              </button>
              {matchedBundle ? (
                <a
                  href={matchedBundle.url}
                  className="flex-1 rounded-full bg-brand-green px-5 py-2.5 text-center text-sm font-medium text-background transition-opacity hover:opacity-90 sm:flex-none"
                >
                  Baixar 1 arquivo ↓
                </a>
              ) : (
                <>
                  <button
                    onClick={copyCmd}
                    title="Comando pra baixar tudo de uma vez no terminal do servidor"
                    className="flex-1 rounded-full border border-border px-4 py-2.5 text-sm font-medium transition-colors hover:border-brand-green/50 sm:flex-none"
                  >
                    {copiedCmd ? "comando copiado ✓" : "Comando (curl)"}
                  </button>
                  <button
                    onClick={downloadAll}
                    className="flex-1 rounded-full bg-brand-green px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90 sm:flex-none"
                  >
                    Baixar {selected.length} ↓
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Preset({
  children,
  onClick,
  muted,
}: {
  children: React.ReactNode;
  onClick: () => void;
  muted?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
        muted
          ? "border-border text-muted hover:text-foreground"
          : "border-border bg-surface/60 hover:border-brand-green/50 hover:text-brand-green"
      }`}
    >
      {children}
    </button>
  );
}
