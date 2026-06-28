import CategoryCard from "@/components/CategoryCard";
import ProgressBar from "@/components/ProgressBar";
import { getProgress, getTotals } from "@/lib/progress";

export default function Home() {
  const { projectName, tagline, lastUpdated, categories } = getProgress();
  const totals = getTotals(categories);

  const formattedDate = new Date(lastUpdated).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

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

      {/* Progresso geral */}
      <section className="mt-12 rounded-3xl border border-border bg-card/60 p-6 sm:p-8 backdrop-blur">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-sm font-medium uppercase tracking-wider text-muted">
              Progresso geral
            </h2>
            <p className="mt-1 text-4xl font-bold tabular-nums">
              {totals.percent}
              <span className="text-2xl text-muted">%</span>
            </p>
          </div>
          <p className="text-sm text-muted">
            <span className="font-semibold text-foreground tabular-nums">
              {totals.done.toLocaleString("pt-BR")}
            </span>{" "}
            de{" "}
            <span className="font-semibold text-foreground tabular-nums">
              {totals.total.toLocaleString("pt-BR")}
            </span>{" "}
            áudios dublados
          </p>
        </div>
        <div className="mt-5">
          <ProgressBar percent={totals.percent} size="lg" />
        </div>
      </section>

      {/* Categorias */}
      <section className="mt-12">
        <h2 className="mb-5 text-xl font-semibold">Pacotes de áudio</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {categories.map((c) => (
            <CategoryCard key={c.id} category={c} />
          ))}
        </div>
      </section>

      {/* Rodapé */}
      <footer className="mt-16 border-t border-border pt-6 text-center text-sm text-muted">
        <p>
          Última atualização: <span className="text-foreground">{formattedDate}</span>
        </p>
        <p className="mt-2">
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
