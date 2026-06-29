import Link from "next/link";
import ProgressBar from "@/components/ProgressBar";
import { getCategoriesWithSummary } from "@/lib/clips";

export default function BrowserPage() {
  const cats = getCategoriesWithSummary();

  const totals = cats.reduce(
    (acc, c) => {
      if (!c.summary) return acc;
      acc.clips += c.summary.clips;
      acc.pt += c.summary.pt;
      acc.en += c.summary.en;
      acc.unknown += c.summary.unknown;
      return acc;
    },
    { clips: 0, pt: 0, en: 0, unknown: 0 }
  );

  const hasData = totals.clips > 0;
  const dubPct = hasData ? Math.round((totals.pt / totals.clips) * 100) : 0;

  return (
    <main className="mx-auto w-full max-w-5xl px-5 py-14 sm:py-20">
      <header className="text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted">
          🎵 Catálogo de falas
        </span>
        <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl">
          O que falta dublar
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">
          Cada fala do jogo, extraída e classificada automaticamente por idioma.
          O que está <span className="text-brand-green">em português</span> já foi
          dublado; o que está <span className="text-brand-yellow">em inglês</span>{" "}
          ainda falta.
        </p>
        <Link
          href="/"
          className="mt-4 inline-block text-sm text-brand-green hover:underline"
        >
          ← Voltar para o progresso
        </Link>
      </header>

      {!hasData ? (
        <div className="mt-16 rounded-3xl border border-border bg-card/60 p-10 text-center">
          <p className="text-4xl">⏳</p>
          <p className="mt-4 text-muted">
            O catálogo ainda está sendo gerado. Rode o workflow{" "}
            <code className="rounded bg-card px-1 text-xs">Build clips</code> no
            GitHub Actions.
          </p>
        </div>
      ) : (
        <>
          {/* Resumo global da detecção */}
          <section className="mt-12 rounded-3xl border border-border bg-card/60 p-6 sm:p-8 backdrop-blur">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-sm font-medium uppercase tracking-wider text-muted">
                  Dublado (detecção automática)
                </h2>
                <p className="mt-1 text-4xl font-bold tabular-nums">
                  {dubPct}
                  <span className="text-2xl text-muted">%</span>
                </p>
              </div>
              <div className="flex gap-4 text-sm">
                <Legend color="bg-brand-green" label="PT" n={totals.pt} />
                <Legend color="bg-brand-yellow" label="EN" n={totals.en} />
                <Legend color="bg-muted/40" label="?" n={totals.unknown} />
              </div>
            </div>
            <div className="mt-5">
              <ProgressBar percent={dubPct} size="lg" />
            </div>
            <p className="mt-3 text-xs text-muted">
              {totals.clips.toLocaleString("pt-BR")} falas no total. A detecção é
              automática (modelo de idioma) e serve de guia — não é 100% exata.
            </p>
          </section>

          {/* Categorias */}
          <section className="mt-10 grid gap-4 sm:grid-cols-2">
            {cats.map((c) => {
              const s = c.summary;
              const p = s && s.clips > 0 ? Math.round((s.pt / s.clips) * 100) : 0;
              const disabled = !s || s.clips === 0;
              const inner = (
                <div
                  className={`h-full rounded-2xl border border-border bg-card/60 p-5 transition-colors ${
                    disabled ? "opacity-50" : "hover:border-brand-green/40"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{c.icon}</span>
                      <h3 className="font-semibold">{c.name}</h3>
                    </div>
                    {s && s.en > 0 && (
                      <span className="rounded-full bg-brand-yellow/15 px-2 py-0.5 text-xs text-brand-yellow">
                        {s.en.toLocaleString("pt-BR")} faltam
                      </span>
                    )}
                  </div>
                  {s ? (
                    <>
                      <div className="mt-3">
                        <ProgressBar percent={p} />
                      </div>
                      <p className="mt-2 text-xs text-muted tabular-nums">
                        {s.pt.toLocaleString("pt-BR")} /{" "}
                        {s.clips.toLocaleString("pt-BR")} em PT · {s.files} arquivos
                      </p>
                    </>
                  ) : (
                    <p className="mt-3 text-xs text-muted">Sem clipes disponíveis.</p>
                  )}
                </div>
              );
              return disabled ? (
                <div key={c.id}>{inner}</div>
              ) : (
                <Link key={c.id} href={`/browser/${c.id}/`}>
                  {inner}
                </Link>
              );
            })}
          </section>
        </>
      )}

      <footer className="mt-16 border-t border-border pt-6 text-center text-sm text-muted">
        <p>
          Falas extraídas dos pacotes de áudio · idioma detectado automaticamente
        </p>
      </footer>
    </main>
  );
}

function Legend({ color, label, n }: { color: string; label: string; n: number }) {
  return (
    <span className="flex items-center gap-1.5 tabular-nums">
      <span className={`inline-block h-2.5 w-2.5 rounded-full ${color}`} />
      <span className="text-muted">{label}</span>
      <span className="font-semibold">{n.toLocaleString("pt-BR")}</span>
    </span>
  );
}
