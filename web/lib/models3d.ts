export const BASE_PATH =
  process.env.NODE_ENV === "production" ? "/mri_brasil" : "";

export interface Model3D {
  pack_key: string;
  category: string;
  name: string;
  glb: string;
  meshes: number;
  images: number;
  size: number;
}

export interface PackGroup {
  pack_key: string;
  label: string;
  icon: string;
  models: Model3D[];
}

const PACK_LABELS: Record<string, { label: string; icon: string }> = {
  viaturas: { label: "Viaturas", icon: "🚓" },
  props: { label: "Props & cenário", icon: "🏙️" },
  correios: { label: "Correios", icon: "📦" },
  peds: { label: "Personagens", icon: "👮" },
};

/** Agrupa o manifest por pacote (função pura, segura no cliente). */
export function groupModels(manifest: Model3D[]): PackGroup[] {
  const order = ["viaturas", "props", "correios"];
  const byPack: Record<string, Model3D[]> = {};
  for (const m of manifest) {
    (byPack[m.pack_key] ??= []).push(m);
  }
  return order
    .filter((k) => byPack[k]?.length)
    .map((k) => ({
      pack_key: k,
      label: PACK_LABELS[k]?.label ?? k,
      icon: PACK_LABELS[k]?.icon ?? "📦",
      models: byPack[k].sort((a, b) => a.name.localeCompare(b.name)),
    }));
}

/** Nomes "humanos" a partir do stem do arquivo. */
export function prettyName(name: string): string {
  return name
    .replace(/^prop_/, "")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}
