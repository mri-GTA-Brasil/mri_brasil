import Link from "next/link";
import SegmentedBar from "@/components/SegmentedBar";
import { getProgress } from "@/lib/progress";
import { getCategoriesWithSummary, getDubStats } from "@/lib/clips";

export default function Home() {
  const { projectName, tagline } = getProgress();
  const cats = getCategoriesWithSummary();
  const stats = getDubStats();
  const hasData = stats.clips > 0;

  const nf = (n: number) => n.toLocaleString("pt-BR");

  return (
    <main className="mx-auto w-full max-w-5xl px-5 py-14 sm:py-20">
      {/* Cabeçalho */}
      <header className="text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted">
          🇧🇷 FiveM · Dublagem PT-BR
        </span>
        <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl">
          <span className="bg-linear-to-r from-brand-green via-brand-yellow to-brand-green bg-clip-text text-transparent">
            {projectName}
          </span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-muted">{tagline}</p>
      </header>

      {hasData && (
        <>
          {/* Progresso real da dublagem (detecção automática) */}
          <section className="mt-12 rounded-3xl border border-border bg-card/60 p-6 sm:p-8 backdrop-blur">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-sm font-medium uppercase tracking-wider text-muted">
                  Progresso da dublagem
                </h2>
                <p className="mt-1 text-5xl font-bold tabular-nums">
                  {stats.percent}
                  <span className="text-2xl text-muted">%</span>
                </p>
                <p className="mt-1 text-sm text-muted">
                  das falas já estão em português
                </p>
              </div>
              <div className="flex flex-col gap-1.5 text-sm">
                <Legend color="bg-brand-green" label="Dubladas (PT)" n={stats.pt} />
                <Legend
                  color="bg-brand-yellow"
                  label="Faltam (EN)"
                  n={stats.en}
                />
                <Legend
                  color="bg-muted/40"
                  label="Efeitos / sem fala"
                  n={stats.unknown}
                />
              </div>
            </div>
            <div className="mt-5">
              <SegmentedBar
                pt={stats.pt}
                en={stats.en}
                unknown={stats.unknown}
                size="lg"
              />
            </div>
            <p className="mt-3 text-xs text-muted">
              {nf(stats.clips)} falas catalogadas. O percentual considera só falas
              ({nf(stats.pt)} de {nf(stats.speech)}); efeitos e trechos sem fala
              ficam de fora. Classificação por idioma é automática — serve de guia.
            </p>
          </section>

          {/* Categorias com progresso real → entram no catálogo */}
          <section className="mt-12">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-semibold">Por categoria</h2>
              <span className="text-sm text-muted">clique para ouvir as falas</span>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {cats.map((c) => {
                const s = c.summary;
                const disabled = !s || s.clips === 0;
                const speech = s ? s.pt + s.en : 0;
                const p = speech > 0 ? Math.round((s!.pt / speech) * 100) : 0;
                const inner = (
                  <div
                    className={`h-full rounded-2xl border border-border bg-card/60 p-5 transition-colors ${
                      disabled ? "opacity-50" : "hover:border-brand-green/40"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl" aria-hidden>
                          {c.icon}
                        </span>
                        <h3 className="font-semibold leading-tight">{c.name}</h3>
                      </div>
                      {s && s.en > 0 && (
                        <span className="shrink-0 rounded-full bg-brand-yellow/15 px-2 py-0.5 text-xs text-brand-yellow tabular-nums">
                          {nf(s.en)} faltam
                        </span>
                      )}
                    </div>
                    <p className="mt-2 text-sm text-muted">{c.description}</p>
                    {s ? (
                      <div className="mt-4">
                        <SegmentedBar pt={s.pt} en={s.en} unknown={s.unknown} />
                        <div className="mt-2 flex items-center justify-between text-sm">
                          <span className="text-muted tabular-nums">
                            {nf(s.pt)} / {nf(speech)} dubladas
                          </span>
                          <span className="font-semibold tabular-nums">{p}%</span>
                        </div>
                      </div>
                    ) : (
                      <p className="mt-4 text-xs text-muted">
                        Sem clipes disponíveis (formato não suportado).
                      </p>
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
            </div>
          </section>
        </>
      )}

      {/* Ambientação visual */}
      <Link
        href="/ambiente"
        className="mt-12 block rounded-3xl border border-border bg-card/60 p-6 sm:p-8 backdrop-blur transition-colors hover:border-brand-green/40"
      >
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="flex items-center gap-2 text-xl font-semibold">
              🏙️ Ambientação São Paulo
            </h2>
            <p className="mt-2 text-sm text-muted">
              Props, personagens, viaturas e retexturas em tema brasileiro —
              veja os pacotes disponíveis.
            </p>
          </div>
          <span className="shrink-0 text-2xl text-brand-green">→</span>
        </div>
      </Link>

      {/* Créditos aos criadores originais */}
      <section className="mt-12 rounded-3xl border border-border bg-card/60 p-6 sm:p-8 backdrop-blur">
        <h2 className="text-xl font-semibold">🙏 Créditos</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Este projeto é uma <span className="text-foreground">continuação</span> de
          uma ideia iniciada por uma equipe de criadores que começou a dublagem do
          GTA V em PT-BR e, infelizmente, descontinuou o trabalho. Toda a base de
          áudio existe graças a eles:
        </p>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {[
            { handle: "@matiasproducoes", url: "https://www.youtube.com/@matiasproducoes" },
            { handle: "@godoyy", url: "https://www.youtube.com/@godoyy" },
            { handle: "@ballasstreetgames", url: "https://www.youtube.com/@ballasstreetgames" },
            { handle: "@nemesisfandubs", url: "https://www.youtube.com/@nemesisfandubs" },
          ].map((c) => (
            <li key={c.handle}>
              <a
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-xl border border-border bg-background/40 px-3 py-2 text-sm transition-colors hover:border-brand-yellow/40 hover:text-brand-yellow"
              >
                <span aria-hidden>▶️</span>
                {c.handle}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="https://www.youtube.com/watch?v=y_aqU7Wrdeo"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block text-sm text-brand-green hover:underline"
        >
          📺 Vídeo de apresentação do projeto original
        </a>
      </section>

      {/* Rodapé */}
      <footer className="mt-16 border-t border-border pt-6 text-center text-sm text-muted">
        <p>
          Projeto comunitário · feito com 💛💚 para a comunidade FiveM brasileira
        </p>
        <a
          href="https://github.com/mri-GTA-Brasil/mri_brasil"
          className="mt-3 inline-block text-brand-green hover:underline"
        >
          github.com/mri-GTA-Brasil
        </a>
      </footer>
    </main>
  );
}

function Legend({ color, label, n }: { color: string; label: string; n: number }) {
  return (
    <span className="flex items-center gap-2 tabular-nums">
      <span className={`inline-block h-2.5 w-2.5 rounded-full ${color}`} />
      <span className="text-muted">{label}</span>
      <span className="ml-auto font-semibold">{n.toLocaleString("pt-BR")}</span>
    </span>
  );
}
