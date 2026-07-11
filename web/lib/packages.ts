export interface Pkg {
  id: string;
  category: "dublagem" | "ambientacao";
  name: string;
  desc: string;
  size: number;
  url: string;
}

export function fmtSize(bytes: number): string {
  if (bytes >= 1e9) return `${(bytes / 1e9).toFixed(2).replace(".", ",")} GB`;
  return `${Math.round(bytes / 1e6)} MB`;
}

export const CATEGORY_LABEL: Record<
  Pkg["category"],
  { label: string; icon: string; note?: string }
> = {
  dublagem: { label: "Dublagem", icon: "🎙️", note: "Vozes em português (PT-BR)" },
  ambientacao: {
    label: "Ambientação — São Paulo",
    icon: "🏙️",
    note: "Visual paulista: PM-SP, viaturas, bandeiras e torcidas",
  },
};
