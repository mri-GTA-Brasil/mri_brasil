import fs from "fs";
import path from "path";
import Link from "next/link";
import AmbienteGallery from "@/components/AmbienteGallery";
import { groupModels, BASE_PATH, type Model3D } from "@/lib/models3d";

function readModels(): Model3D[] {
  try {
    const p = path.join(process.cwd(), "public", "models3d", "manifest.json");
    return JSON.parse(fs.readFileSync(p, "utf-8")) as Model3D[];
  } catch {
    return [];
  }
}

export default function AmbientePage() {
  const groups = groupModels(readModels());
  const total = groups.reduce((n, g) => n + g.models.length, 0);
  const textured = groups.reduce(
    (n, g) => n + g.models.filter((m) => m.images > 0).length,
    0
  );

  return (
    <main className="mx-auto w-full max-w-5xl px-5 py-14 sm:py-20">
      <header className="text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted">
          🏙️ Ambientação São Paulo
        </span>
        <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl">
          Modelos 3D em tema BR
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">
          Viaturas, props e cenário do pacote de ambientação — convertidos do
          jogo e exibidos em 3D interativo, com as texturas brasileiras.
        </p>
        <Link
          href="/"
          className="mt-4 inline-block text-sm text-brand-green hover:underline"
        >
          ← Início
        </Link>
      </header>

      {groups.length === 0 ? (
        <div className="mt-16 rounded-3xl border border-border bg-card/60 p-10 text-center text-muted">
          Nenhum modelo 3D disponível ainda.
        </div>
      ) : (
        <>
          <p className="mt-8 text-center text-sm text-muted">
            {total} modelos · {textured} com textura BR · arraste para girar,
            scroll para zoom
          </p>
          <AmbienteGallery groups={groups} basePath={BASE_PATH} />
        </>
      )}

      <section className="mt-12 rounded-3xl border border-border bg-card/60 p-6 text-sm text-muted">
        <p>
          🙏 Os assets de ambientação (modelos e texturas) têm como fonte o{" "}
          <a
            href="https://www.gta5-mods.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-green hover:underline"
          >
            GTA5-Mods
          </a>{" "}
          e seus autores. Os modelos foram convertidos para visualização no
          navegador (geometria + textura). Skins de personagens e retexturas de
          mapa (aeroporto, Fort Zancudo) entram como galeria de imagens em breve.
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
