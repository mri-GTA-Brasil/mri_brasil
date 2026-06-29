interface Props {
  pt: number;
  en: number;
  unknown?: number;
  size?: "sm" | "lg";
}

/** Barra de progresso em 3 cores: PT (dublado), EN (falta), ? (efeitos). */
export default function SegmentedBar({ pt, en, unknown = 0, size = "sm" }: Props) {
  const total = pt + en + unknown || 1;
  const h = size === "lg" ? "h-4" : "h-2.5";
  const w = (n: number) => `${(n / total) * 100}%`;
  return (
    <div className={`flex w-full ${h} overflow-hidden rounded-full bg-border`}>
      <span
        className="bg-brand-green transition-all duration-700"
        style={{ width: w(pt) }}
        title={`${pt} em PT`}
      />
      <span
        className="bg-brand-yellow transition-all duration-700"
        style={{ width: w(en) }}
        title={`${en} em EN`}
      />
      {unknown > 0 && (
        <span
          className="bg-muted/40 transition-all duration-700"
          style={{ width: w(unknown) }}
          title={`${unknown} efeitos/indeterminado`}
        />
      )}
    </div>
  );
}
