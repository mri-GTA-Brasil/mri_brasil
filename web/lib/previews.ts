import fs from "fs";
import path from "path";

export const PACK_TO_CATEGORY: Record<string, string> = {
  mri_brasil_s_full_amb_m: "S_FULL_AMB_M",
  mri_brasil_s_full_amb_f: "S_FULL_AMB_F",
  mri_brasil_s_full_ser: "S_FULL_SER",
  mri_brasil_s_full_gan: "S_FULL_GAN",
  mri_brasil_oneshot_ambience: "ONESHOT_AMBIENCE",
  mri_brasil_streamed_ambience_p1: "STREAMED_AMBIENCE",
  mri_brasil_streamed_ambience_p2: "STREAMED_AMBIENCE",
  mri_brasil_police_scanner_p1: "POLICE_SCANNER",
  mri_brasil_police_scanner_p2: "POLICE_SCANNER",
  mri_brasil_police_scanner_p3: "POLICE_SCANNER",
};

export type PreviewManifest = Record<string, Record<string, string[]>>;

export interface FileEntry {
  pack: string;
  category: string;
  file: string;
}

export function getPreviewManifest(): PreviewManifest {
  try {
    const p = path.join(process.cwd(), "public", "previews", "manifest.json");
    return JSON.parse(fs.readFileSync(p, "utf-8")) as PreviewManifest;
  } catch {
    return {};
  }
}

export function groupByCategory(
  manifest: PreviewManifest
): Record<string, FileEntry[]> {
  const grouped: Record<string, FileEntry[]> = {};
  for (const [pack, cats] of Object.entries(manifest)) {
    for (const [category, files] of Object.entries(cats)) {
      const catId = PACK_TO_CATEGORY[pack] ?? category;
      if (!grouped[catId]) grouped[catId] = [];
      for (const file of files) {
        grouped[catId].push({ pack, category, file });
      }
    }
  }
  return grouped;
}
