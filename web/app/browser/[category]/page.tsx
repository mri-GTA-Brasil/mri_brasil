import { notFound } from "next/navigation";
import Link from "next/link";
import CatalogView from "@/components/CatalogView";
import { getProgress } from "@/lib/progress";
import { findCategoryMeta, BASE_PATH } from "@/lib/clips";

export function generateStaticParams() {
  return getProgress().categories.map((c) => ({ category: c.id }));
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const meta = findCategoryMeta(category);
  if (!meta) notFound();

  return (
    <main className="mx-auto w-full max-w-5xl px-5 py-14 sm:py-20">
      <header>
        <Link
          href="/browser/"
          className="text-sm text-brand-green hover:underline"
        >
          ← Todas as categorias
        </Link>
        <div className="mt-4 flex items-center gap-3">
          <span className="text-4xl">{meta.icon}</span>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{meta.name}</h1>
            <p className="text-sm text-muted">{meta.description}</p>
          </div>
        </div>
      </header>

      <CatalogView
        category={category}
        basePath={BASE_PATH}
        summary={meta.summary}
      />
    </main>
  );
}
