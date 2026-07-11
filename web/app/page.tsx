import Link from "next/link";
import Waveform from "@/components/Waveform";
import { getCategoriesWithSummary, getDubStats } from "@/lib/clips";

const PACKS = [
  { id: "mri_brasil_props", name: "Props & cenário", desc: "Placas de rua, mobiliário urbano, bandeiras, semáforos, pedágios.", size: "148 MB" },
  { id: "mri_brasil_peds_policia", name: "Polícia & forças", desc: "Skins de PM, PC, PF, COE, ROCAM, exército, SAMU e gangues.", size: "164 MB" },
  { id: "mri_brasil_viaturas", name: "Viaturas", desc: "Liveries de viaturas de polícia e federal.", size: "59 MB" },
  { id: "mri_brasil_correios", name: "Correios", desc: "Carteiros e van de entrega.", size: "10 MB" },
  { id: "mri_brasil_mapa_aeroporto", name: "Aeroporto", desc: "Retextura da área do aeroporto.", size: "158 MB" },
  { id: "mri_brasil_mapa_zancudo", name: "Fort Zancudo", desc: "Retextura da base militar.", size: "61 MB" },
];

const CREATORS = [
  { handle: "@matiasproducoes", url: "https://www.youtube.com/@matiasproducoes" },
  { handle: "@godoyy", url: "https://www.youtube.com/@godoyy" },
  { handle: "@ballasstreetgames", url: "https://www.youtube.com/@ballasstreetgames" },
  { handle: "@nemesisfandubs", url: "https://www.youtube.com/@nemesisfandubs" },
];

const nf = (n: number) => n.toLocaleString("pt-BR");

export default function Home() {
  const stats = getDubStats();
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
          <a href="#top" className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-brand-green shadow-[0_0_10px_var(--brand-green)]" />
            <span className="font-mono text-sm font-medium tracking-tight">
              mri <span className="text-muted">/ GTA Brasil</span>
            </span>
          </a>
          <nav className="flex items-center gap-5 text-sm text-muted sm:gap-6">
            <a href="#categorias" className="hidden transition-colors hover:text-foreground sm:inline">Vozes</a>
            <a href="#ambiente" className="hidden transition-colors hover:text-foreground sm:inline">Ambientação</a>
            <a href="https://github.com/mri-GTA-Brasil/mri_brasil" className="hidden transition-colors hover:text-foreground sm:inline">GitHub ↗</a>
            <a
              href="https://discord.mriqbox.com.br"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-brand-green px-3.5 py-1.5 font-medium text-background transition-opacity hover:opacity-90"
            >
              Discord
            </a>
          </nav>
        </div>
      </header>

      <main id="top" className="mx-auto w-full max-w-5xl px-5">
        {/* Hero */}
        <section className="pt-16 sm:pt-24">
          <p className="eyebrow">FiveM · Dublagem PT-BR</p>
          <h1 className="mt-5 max-w-3xl font-display text-5xl font-black leading-[0.95] tracking-tight sm:text-7xl">
            Los Santos agora
            <br />
            fala <span className="text-brand-green">português</span>.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            Um mutirão da comunidade redublando o GTA V inteiro — dos PMs às
            gangues, do rádio da polícia aos pedestres de esquina. Uma cidade
            ganhando voz brasileira, fala por fala.
          </p>
          <p className="mt-5 text-sm text-muted">
            Um projeto da{" "}
            <a
              href="https://www.mriqbox.com.br"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline decoration-brand-green/40 underline-offset-4 transition-colors hover:text-brand-green"
            >
              mri Qbox Brasil
            </a>{" "}
            — a maior comunidade open-source de FiveM do Brasil.
          </p>

          <div className="mt-12 rounded-2xl border border-border bg-surface/50 p-6 sm:p-9">
            <Waveform
              percent={stats.percent}
              pt={stats.pt}
              en={stats.en}
              effects={stats.unknown}
            />
          </div>

          <p className="mt-5 tnum text-sm text-muted">
            {nf(stats.clips)} clipes catalogados · {cats.length} categorias de voz ·
            idioma detectado automaticamente
          </p>
        </section>

        {/* Vozes por categoria */}
        <section id="categorias" className="mt-28 scroll-mt-20">
          <p className="eyebrow">As vozes</p>
          <h2 className="mt-4 max-w-2xl font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Cada tipo de voz do jogo, redublado por partes
          </h2>
          <p className="mt-4 max-w-xl text-muted">
            A barra mostra quanto de cada grupo já está em português. Clique para
            ouvir as falas, uma a uma.
          </p>

          <div className="mt-10 border-t border-border">
            {cats.map((c) => (
              <Link
                key={c.id}
                href={`/browser/${c.id}/`}
                className="group grid grid-cols-1 gap-4 border-b border-border py-6 transition-colors hover:bg-surface/40 sm:grid-cols-[1fr_auto] sm:items-center sm:gap-8"
              >
                <div className="min-w-0">
                  <h3 className="font-display text-xl font-semibold">{c.name}</h3>
                  <p className="mt-1 truncate text-sm text-muted">{c.description}</p>
                </div>
                <div className="flex items-center gap-5 sm:w-80 sm:justify-end">
                  <div className="flex-1 sm:max-w-[9rem]">
                    <div className="h-[3px] w-full overflow-hidden rounded-full bg-border">
                      <div
                        className="h-full rounded-full bg-brand-green"
                        style={{ width: `${c.pct}%` }}
                      />
                    </div>
                    <div className="mt-2 flex justify-between tnum text-xs">
                      <span className="text-muted">{nf(c.summary!.pt)}/{nf(c.speech)}</span>
                      {c.summary!.en > 0 && (
                        <span className="text-brand-yellow">{nf(c.summary!.en)} faltam</span>
                      )}
                    </div>
                  </div>
                  <span className="tnum w-12 text-right font-display text-2xl font-bold">
                    {c.pct}%
                  </span>
                  <span className="text-muted transition-transform group-hover:translate-x-0.5" aria-hidden>→</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Ambientação */}
        <section id="ambiente" className="mt-28 scroll-mt-20">
          <p className="eyebrow">Ambientação visual</p>
          <h2 className="mt-4 max-w-2xl font-display text-3xl font-bold tracking-tight sm:text-4xl">
            E não é só a voz — a cidade também muda de cara
          </h2>
          <p className="mt-4 max-w-xl text-muted">
            Pacotes de props, personagens, viaturas e retexturas em tema São
            Paulo. Independentes — instale só o que quiser.
          </p>

          <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
            {PACKS.map((p) => (
              <div key={p.id} className="bg-background p-5">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-display font-semibold">{p.name}</h3>
                  <span className="tnum shrink-0 text-xs text-muted">{p.size}</span>
                </div>
                <p className="mt-2 text-sm text-muted">{p.desc}</p>
                <code className="mt-3 block truncate font-mono text-xs text-brand-green/80">
                  ensure {p.id}
                </code>
              </div>
            ))}
          </div>
        </section>

        {/* Projeto + instalação */}
        <section className="mt-28 grid gap-8 border-t border-border pt-14 sm:grid-cols-[auto_1fr] sm:gap-16">
          <p className="eyebrow sm:pt-1">O projeto</p>
          <div className="max-w-xl">
            <p className="text-lg leading-relaxed">
              O <span className="text-brand-green">mri Brasil</span> substitui os
              áudios e assets nativos do GTA V pelos equivalentes brasileiros. Não
              roda script no servidor — são pacotes de substituição que você dá{" "}
              <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-sm">ensure</code>{" "}
              e pronto.
            </p>
            <p className="mt-4 leading-relaxed text-muted">
              Cada categoria vira um resource independente, então o servidor carrega
              só o que precisa. O código, os pacotes e as instruções estão abertos no
              GitHub.
            </p>
            <a
              href="https://github.com/mri-GTA-Brasil/mri_brasil"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-5 py-2.5 text-sm font-medium transition-colors hover:border-brand-green/50"
            >
              Ver no GitHub e instalar ↗
            </a>
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
              <a
                href="https://discord.mriqbox.com.br"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-green px-6 py-3 font-medium text-background transition-opacity hover:opacity-90"
              >
                Entrar no Discord
              </a>
              <a
                href="https://github.com/mri-Qbox-Brasil"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium transition-colors hover:border-brand-green/50"
              >
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
            infelizmente, parou. Este projeto retoma e expande o trabalho.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {CREATORS.map((c) => (
              <a
                key={c.handle}
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-xl border border-border bg-surface/40 px-4 py-3 text-sm transition-colors hover:border-brand-green/40 hover:text-brand-green"
              >
                <span className="font-mono">{c.handle}</span>
                <span aria-hidden>↗</span>
              </a>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted">
            <a href="https://www.youtube.com/watch?v=y_aqU7Wrdeo" target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
              📺 Vídeo do projeto original
            </a>
            <span>
              Assets visuais: fonte{" "}
              <a href="https://www.gta5-mods.com/" target="_blank" rel="noopener noreferrer" className="hover:text-foreground">GTA5-Mods</a>
            </span>
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
