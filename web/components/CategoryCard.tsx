import { Category, STATUS_LABELS, pct } from "@/lib/progress";
import ProgressBar from "./ProgressBar";

const STATUS_STYLES: Record<string, string> = {
  concluido: "bg-brand-green/15 text-brand-green border-brand-green/30",
  em_andamento: "bg-brand-yellow/15 text-brand-yellow border-brand-yellow/30",
  planejado: "bg-muted/10 text-muted border-border",
};

export default function CategoryCard({ category }: { category: Category }) {
  const percent = pct(category.done, category.total);
  return (
    <article className="rounded-2xl border border-border bg-card p-5 transition-colors hover:border-brand-green/40">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="text-2xl" aria-hidden>
            {category.icon}
          </span>
          <h3 className="font-semibold leading-tight">{category.name}</h3>
        </div>
        <span
          className={`shrink-0 rounded-full border px-2.5 py-0.5 text-xs font-medium ${STATUS_STYLES[category.status] ?? STATUS_STYLES.planejado}`}
        >
          {STATUS_LABELS[category.status] ?? category.status}
        </span>
      </div>

      <p className="mt-3 text-sm text-muted">{category.description}</p>

      <div className="mt-4">
        <ProgressBar percent={percent} />
        <div className="mt-2 flex items-center justify-between text-sm">
          <span className="text-muted">
            {category.done} / {category.total} áudios
          </span>
          <span className="font-semibold tabular-nums">{percent}%</span>
        </div>
      </div>
    </article>
  );
}
