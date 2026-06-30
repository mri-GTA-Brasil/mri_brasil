import Link from "next/link";

interface Pack {
  id: string;
  icon: string;
  name: string;
  desc: string;
  size: string;
}

const PACKS: Pack[] = [
  {
    id: "mri_brasil_props",
    icon: "🏙️",
    name: "Props & cenário",
    desc: "Placas de rua, mobiliário urbano, bandeiras, semáforos, pedágios e mais.",
    size: "~148 MB",
  },
  {
    id: "mri_brasil_peds_policia",
    icon: "👮",
    name: "Personagens (polícia & forças)",
    desc: "Skins de PM, polícia civil/federal, COE, ROCAM, exército, SAMU, PROTEGE e gangues.",
    size: "~164 MB",
  },
  {
    id: "mri_brasil_viaturas",
    icon: "🚓",
    name: "Viaturas",
    desc: "Liveries de viaturas de polícia e federal em tema brasileiro.",
    size: "~59 MB",
  },
  {
    id: "mri_brasil_correios",
    icon: "📦",
    name: "Correios",
    desc: "Skins de carteiro e van de entrega.",
    size: "~10 MB",
  },
  {
    id: "mri_brasil_mapa_aeroporto",
    icon: "✈️",
    name: "Aeroporto",
    desc: "Retextura da área do aeroporto em tema BR.",
    size: "~158 MB",
  },
  {
    id: "mri_brasil_mapa_zancudo",
    icon: "🪖",
    name: "Fort Zancudo",
    desc: "Retextura da base militar.",
    size: "~61 MB",
  },
];

export default function AmbientePage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-5 py-14 sm:py-20">
      <header className="text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted">
          🏙️ Ambientação São Paulo
        </span>
        <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl">
          Pacotes de ambientação visual
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">
          Props, personagens, viaturas e retexturas que deixam o mundo com a cara
          do Brasil. Instale só os pacotes que quiser no seu servidor.
        </p>
        <Link
          href="/"
          className="mt-4 inline-block text-sm text-brand-green hover:underline"
        >
          ← Início
        </Link>
      </header>

      <section className="mt-12 grid gap-4 sm:grid-cols-2">
        {PACKS.map((p) => (
          <div
            key={p.id}
            className="rounded-2xl border border-border bg-card/60 p-5"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{p.icon}</span>
                <h2 className="font-semibold leading-tight">{p.name}</h2>
              </div>
              <span className="shrink-0 rounded-full bg-background/40 px-2 py-0.5 text-xs text-muted tabular-nums">
                {p.size}
              </span>
            </div>
            <p className="mt-3 text-sm text-muted">{p.desc}</p>
            <code className="mt-3 block truncate text-xs text-brand-green/80">
              ensure {p.id}
            </code>
          </div>
        ))}
      </section>

      <section className="mt-10 rounded-3xl border border-border bg-card/60 p-6 text-sm text-muted">
        <p>
          📦 Cada pacote é um resource independente em{" "}
          <code className="rounded bg-card px-1 text-xs">resource/[mri_brasil]/</code>
          . Copie a pasta para o seu servidor e dê{" "}
          <code className="rounded bg-card px-1 text-xs">ensure</code> só nos que
          quiser.
        </p>
        <p className="mt-3">
          🙏 Os assets de ambientação têm como fonte o{" "}
          <a
            href="https://www.gta5-mods.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-green hover:underline"
          >
            GTA5-Mods
          </a>{" "}
          e seus autores.
        </p>
      </section>

      <footer className="mt-12 border-t border-border pt-6 text-center text-sm text-muted">
        <a
          href="https://github.com/mri-GTA-Brasil/mri_brasil"
          className="text-brand-green hover:underline"
        >
          github.com/mri-GTA-Brasil
        </a>
      </footer>
    </main>
  );
}
