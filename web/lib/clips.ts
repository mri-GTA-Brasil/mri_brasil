import fs from "fs";
import path from "path";
import { getProgress, type Category } from "@/lib/progress";

export const BASE_PATH =
  process.env.NODE_ENV === "production" ? "/mri_brasil" : "";

// l: 'p' = português (dublado), 'e' = inglês (falta dublar), 'u' = indeterminado
export type Lang = "p" | "e" | "u";

export interface Clip {
  i: number;
  l: Lang;
}

export interface FileClips {
  pack: string;
  clips: Clip[];
}

export type CategoryClips = Record<string, FileClips>;

export interface CategorySummary {
  files: number;
  clips: number;
  pt: number;
  en: number;
  unknown: number;
}

export type Summary = Record<string, CategorySummary>;

export function getSummary(): Summary {
  try {
    const p = path.join(process.cwd(), "public", "clips", "summary.json");
    return JSON.parse(fs.readFileSync(p, "utf-8")) as Summary;
  } catch {
    return {};
  }
}

export interface CategoryMeta extends Category {
  summary: CategorySummary | null;
}

/** Junta o metadado da categoria (nome, ícone) com os números reais da detecção. */
export function getCategoriesWithSummary(): CategoryMeta[] {
  const { categories } = getProgress();
  const summary = getSummary();
  return categories.map((c) => ({ ...c, summary: summary[c.id] ?? null }));
}

export function findCategoryMeta(id: string): CategoryMeta | undefined {
  return getCategoriesWithSummary().find((c) => c.id === id);
}

export interface DubStats {
  pt: number;
  en: number;
  unknown: number;
  clips: number;
  speech: number; // pt + en (universo que precisa de dublagem)
  percent: number; // pt / speech
}

/** Agrega os números de detecção de todas as categorias. */
export function getDubStats(): DubStats {
  const summary = getSummary();
  let pt = 0,
    en = 0,
    unknown = 0,
    clips = 0;
  for (const s of Object.values(summary)) {
    pt += s.pt;
    en += s.en;
    unknown += s.unknown;
    clips += s.clips;
  }
  const speech = pt + en;
  const percent = speech > 0 ? Math.round((pt / speech) * 100) : 0;
  return { pt, en, unknown, clips, speech, percent };
}
