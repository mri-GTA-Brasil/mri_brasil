import Link from "next/link";
import AudioBrowser from "@/components/AudioBrowser";
import { getPreviewManifest, groupByCategory } from "@/lib/previews";
import { getProgress } from "@/lib/progress";

const BASE_PATH =
  process.env.NODE_ENV === "production" ? "/mri_brasil" : "";

export default function BrowserPage() {
  const manifest = getPreviewManifest();
  const grouped = groupByCategory(manifest);
  const { categories } = getProgress();

  const totalFiles = Object.values(grouped).reduce(
    (sum, arr) => sum + arr.length,
    0
  );
  const hasFiles = totalFiles > 0;

  return (
    <main className="mx-auto w-full max-w-5xl px-5 py-14 sm:py-20">
      {/* Cabeçalho */}
      <header className="text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted">
          🎵 Preview de Áudio
        </span>
        <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl">
          Arquivo de Áudio
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-muted">
          {hasFiles
            ? `${totalFiles} clipes disponíveis — preview do primeiro subsong de cada personagem`
            : "Os previews são gerados automaticamente conforme novos AWC são adicionados ao repositório."}
        </p>
        <Link
          href="/"
          className="mt-4 inline-block text-sm text-brand-green hover:underline"
        >
          ← Voltar para o progresso
        </Link>
      </header>

      {!hasFiles && (
        <div className="mt-16 rounded-3xl border border-border bg-card/60 p-10 text-center">
          <p className="text-4xl">🔇</p>
          <p className="mt-4 text-muted">
            Nenhum preview disponível ainda.
            <br />
            Rode o workflow{" "}
            <code className="rounded bg-card px-1 text-xs">
              Convert AWC → OGG
            </code>{" "}
            via GitHub Actions para gerar os OGGs.
          </p>
        </div>
      )}

      {/* Seções por categoria */}
      {categories.map((cat) => {
        const files = grouped[cat.id];
        if (!files || files.length === 0) return null;

        return (
          <section
            key={cat.id}
            className="mt-10 rounded-3xl border border-border bg-card/60 p-6 sm:p-8"
          >
            <div className="mb-4 flex items-center gap-2">
              <span className="text-2xl">{cat.icon}</span>
              <div>
                <h2 className="text-lg font-semibold">{cat.name}</h2>
                <p className="text-xs text-muted">{cat.description}</p>
              </div>
            </div>
            <AudioBrowser files={files} basePath={BASE_PATH} />
          </section>
        );
      })}

      {/* Rodapé */}
      <footer className="mt-16 border-t border-border pt-6 text-center text-sm text-muted">
        <p>
          Preview: primeiro subsong de cada AWC · dublagem PT-BR por{" "}
          <a
            href="https://github.com/mri-GTA-Brasil"
            className="text-brand-green hover:underline"
          >
            mri GTA Brasil
          </a>
        </p>
      </footer>
    </main>
  );
}
