import data from "@/data/progress.json";

export type Status = "concluido" | "em_andamento" | "planejado";

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  total: number;
  done: number;
  status: Status;
}

export interface ProgressData {
  projectName: string;
  tagline: string;
  lastUpdated: string;
  categories: Category[];
}

export const STATUS_LABELS: Record<Status, string> = {
  concluido: "Concluído",
  em_andamento: "Em andamento",
  planejado: "Planejado",
};

export function getProgress(): ProgressData {
  return data as ProgressData;
}

export function pct(done: number, total: number): number {
  if (total <= 0) return 0;
  return Math.round((done / total) * 100);
}

export function getTotals(categories: Category[]) {
  const total = categories.reduce((acc, c) => acc + c.total, 0);
  const done = categories.reduce((acc, c) => acc + c.done, 0);
  return { total, done, percent: pct(done, total) };
}
