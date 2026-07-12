import fs from "fs";
import path from "path";
import Link from "next/link";
import Waveform from "@/components/Waveform";
import BundleBuilder from "@/components/BundleBuilder";
import { getCategoriesWithSummary, getDubStats } from "@/lib/clips";
import { fmtSize, type Pkg, type Bundle } from "@/lib/packages";

const CREATORS = [
  { handle: "@matiasproducoes", url: "https://www.youtube.com/@matiasproducoes" },
  { handle: "@godoyy", url: "https://www.youtube.com/@godoyy" },
  { handle: "@ballasstreetgames", url: "https://www.youtube.com/@ballasstreetgames" },
  { handle: "@nemesisfandubs", url: "https://www.youtube.com/@nemesisfandubs" },
];

const nf = (n: number) => n.toLocaleString("pt-BR");
const BASE_PATH = process.env.NODE_ENV === "production" ? "/mri_brasil" : "";

function readJson<T>(file: string): T[] {
  try {
    const p = path.join(process.cwd(), "public", file);
    return JSON.parse(fs.readFileSync(p, "utf-8")) as T[];
  } catch {
    return [];
  }
}

export default function Home() {
  const stats = getDubStats();
  const packages = readJson<Pkg>("packages.json");
  const bundles = readJson<Bundle>("bundles.json");
  const totalBytes = packages.reduce((n, p) => n + p.size, 0);
  const cats = getCategoriesWithSummary()
    .map((c) => {
      const s = c.summary;
      const speech = s ? s.pt + s.en : 0;
      return { ...c, speech, pct: speech ? Math.round((s!.pt / speech) * 100) : 0 };
    })
    .filter((c) => c.speech > 0)
    .sort((a, b) => b.speech - a.speech);

  return (
    <>
      {/* Cabeçalho */}
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-5">
          <a href="#top" className="flex items-center gap-2.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${BASE_PATH}/mriqbox-logo.png`}
              alt="mri Qbox Brasil"
              width={26}
              height={26}
              className="rounded-md"
            />
            <span className="font-mono text-sm font-medium tracking-tight">
              mri <span className="text-muted">/ GTA Brasil</span>
            </span>
          </a>
          <nav className="flex items-center gap-5 text-sm text-muted sm:gap-6">
            <a href="#baixar" className="transition-colors hover:text-foreground">Baixar</a>
            <a href="#progresso" className="hidden transition-colors hover:text-foreground sm:inline">Progresso</a>
            <a href="https://github.com/mri-Qbox-Brasil" target="_blank" rel="noopener noreferrer" className="hidden transition-colors hover:text-foreground sm:inline">GitHub ↗</a>
            <a href="https://discord.mriqbox.com.br" target="_blank" rel="noopener noreferrer" className="rounded-full bg-brand-green px-3.5 py-1.5 font-medium text-background transition-opacity hover:opacity-90">Discord</a>
          </nav>
        </div>
      </header>

      <main id="top" className="mx-auto w-full max-w-5xl px-5">
        {/* Hero */}
        <section className="pt-16 sm:pt-24">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${BASE_PATH}/flag-br.svg`} alt="Bandeira do Brasil" className="h-3.5 w-auto rounded-[2px] ring-1 ring-border" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${BASE_PATH}/flag-sp.svg`} alt="Bandeira de São Paulo" className="h-3.5 w-auto rounded-[2px] ring-1 ring-border" />
            </span>
            <p className="eyebrow">FiveM · Dublagem PT-BR</p>
          </div>
          <h1 className="mt-5 max-w-3xl font-display text-5xl font-black leading-[0.95] tracking-tight sm:text-7xl">
            Los Santos agora
            <br />
            fala <span className="text-brand-green">português</span>.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            Pacotes prontos que trocam as vozes e os assets do GTA V pelos
            brasileiros. Escolha o que quer, baixe e dê{" "}
            <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-base">ensure</code>.
          </p>
          <p className="mt-5 text-sm text-muted">
            Um projeto da{" "}
            <a href="https://www.mriqbox.com.br" target="_blank" rel="noopener noreferrer" className="text-foreground underline decoration-brand-green/40 underline-offset-4 transition-colors hover:text-brand-green">mri Qbox Brasil</a>{" "}
            — a maior comunidade open-source de FiveM do Brasil.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#baixar" className="rounded-full bg-brand-green px-6 py-3 font-medium text-background transition-opacity hover:opacity-90">
              Montar meu pack ↓
            </a>
            <a href="#progresso" className="rounded-full border border-border px-6 py-3 text-sm font-medium transition-colors hover:border-brand-green/50">
              Ver o progresso
            </a>
          </div>
        </section>

        {/* Monte seu pack — foco */}
        <section id="baixar" className="mt-24 scroll-mt-20 sm:mt-28">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="eyebrow">Monte seu pack</p>
              <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
                Escolha, baixe, instale
              </h2>
            </div>
            {packages.length > 0 && (
              <p className="tnum text-sm text-muted">
                {packages.length} pacotes · {fmtSize(totalBytes)} no total
              </p>
            )}
          </div>
          <p className="mt-4 max-w-2xl text-muted">
            Vozes em português + ambientação com a cara de{" "}
            <span className="text-foreground">São Paulo</span> — PM-SP, viaturas,
            bandeiras paulistas e dos times, torcidas. Cada pacote é independente;
            marque os que quiser que a gente monta o{" "}
            <code className="rounded bg-surface px-1 font-mono text-sm">server.cfg</code> pra você.
          </p>

          <div className="mt-10">
            {packages.length > 0 ? (
              <BundleBuilder packages={packages} bundles={bundles} />
            ) : (
              <div className="rounded-2xl border border-border bg-surface/40 p-10 text-center text-muted">
                Os pacotes estão sendo empacotados. Volte em instantes.
              </div>
            )}
          </div>
        </section>

        {/* Progresso da dublagem */}
        <section id="progresso" className="mt-28 scroll-mt-20 border-t border-border pt-14">
          <p className="eyebrow">Progresso</p>
          <h2 className="mt-4 max-w-2xl font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Quanto da cidade já fala português
          </h2>
          <p className="mt-4 max-w-xl text-muted">
            Detecção automática de idioma em {nf(stats.clips)} clipes de voz. Clique
            numa categoria pra ouvir as falas, uma a uma.
          </p>

          <div className="mt-10 rounded-2xl border border-border bg-surface/50 p-6 sm:p-9">
            <Waveform
              percent={stats.percent}
              pt={stats.pt}
              en={stats.en}
              effects={stats.unknown}
            />
          </div>

          <div className="mt-8 border-t border-border">
            {cats.map((c) => (
              <Link
                key={c.id}
                href={`/browser/${c.id}/`}
                className="group grid grid-cols-1 gap-4 border-b border-border py-5 transition-colors hover:bg-surface/40 sm:grid-cols-[1fr_auto] sm:items-center sm:gap-8"
              >
                <div className="min-w-0">
                  <h3 className="font-display font-semibold">{c.name}</h3>
                  <p className="mt-0.5 truncate text-sm text-muted">{c.description}</p>
                </div>
                <div className="flex items-center gap-5 sm:w-72 sm:justify-end">
                  <div className="h-[3px] flex-1 overflow-hidden rounded-full bg-border sm:max-w-[8rem]">
                    <div className="h-full rounded-full bg-brand-green" style={{ width: `${c.pct}%` }} />
                  </div>
                  <span className="tnum w-11 text-right font-display text-xl font-bold">{c.pct}%</span>
                  <span className="text-muted transition-transform group-hover:translate-x-0.5" aria-hidden>→</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Comunidade / Discord */}
        <section id="comunidade" className="mt-28 scroll-mt-20">
          <div className="overflow-hidden rounded-2xl border border-brand-green/25 bg-linear-to-b from-brand-green/[0.07] to-transparent p-8 sm:p-12">
            <p className="eyebrow">Comunidade</p>
            <h2 className="mt-4 max-w-2xl font-display text-3xl font-bold tracking-tight sm:text-4xl">
              A gente já traduziu o código. Agora é a vez das vozes.
            </h2>
            <p className="mt-5 max-w-2xl leading-relaxed text-muted">
              A{" "}
              <a href="https://www.mriqbox.com.br" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-brand-green">mri Qbox Brasil</a>{" "}
              é a maior comunidade open-source de FiveM do Brasil — mantemos o
              framework <span className="text-foreground">Qbox</span> 100% em português,
              grátis e aberto. Esta dublagem é a mesma ideia na outra ponta: se o
              código já fala português, as vozes do jogo também vão falar. Chega junto.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a href="https://discord.mriqbox.com.br" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-full bg-brand-green px-6 py-3 font-medium text-background transition-opacity hover:opacity-90">
                Entrar no Discord
              </a>
              <a href="https://github.com/mri-Qbox-Brasil" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-full border border-border px-6 py-3 text-sm font-medium transition-colors hover:border-brand-green/50">
                Conhecer o framework Qbox ↗
              </a>
            </div>
          </div>
        </section>

        {/* Créditos */}
        <section id="creditos" className="mt-28 scroll-mt-20 border-t border-border pt-14">
          <p className="eyebrow">Créditos</p>
          <h2 className="mt-4 max-w-2xl font-display text-2xl font-bold tracking-tight sm:text-3xl">
            Uma continuação — a base de voz existe graças a eles
          </h2>
          <p className="mt-4 max-w-xl text-muted">
            A dublagem original do GTA V em PT-BR foi iniciada por uma equipe que,
            infelizmente, parou. Este projeto retoma e expande o trabalho. Assets
            visuais têm fonte{" "}
            <a href="https://www.gta5-mods.com/" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-brand-green">GTA5-Mods</a>.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {CREATORS.map((c) => (
              <a key={c.handle} href={c.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between rounded-xl border border-border bg-surface/40 px-4 py-3 text-sm transition-colors hover:border-brand-green/40 hover:text-brand-green">
                <span className="font-mono">{c.handle}</span>
                <span aria-hidden>↗</span>
              </a>
            ))}
          </div>
        </section>

        {/* Rodapé */}
        <footer className="mt-28 flex flex-col gap-6 border-t border-border py-10 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            Um projeto da{" "}
            <a href="https://www.mriqbox.com.br" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-brand-green">mri Qbox Brasil</a>
            {" "}· mantido por{" "}
            <a href="https://github.com/mur4i" className="text-foreground hover:text-brand-green">Murai</a>
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono">
            <a href="https://discord.mriqbox.com.br" target="_blank" rel="noopener noreferrer" className="hover:text-foreground">Discord</a>
            <a href="https://www.mriqbox.com.br" target="_blank" rel="noopener noreferrer" className="hover:text-foreground">mriqbox.com.br</a>
            <a href="https://github.com/mri-GTA-Brasil/mri_brasil" className="hover:text-foreground">GitHub</a>
          </div>
        </footer>
      </main>
    </>
  );
}
