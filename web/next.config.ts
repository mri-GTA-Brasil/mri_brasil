import type { NextConfig } from "next";

// Em produção (GitHub Pages) o site é servido em /mri_brasil.
// Em dev (next dev) NODE_ENV !== "production", então roda na raiz.
const isProd = process.env.NODE_ENV === "production";
const repo = "mri_brasil";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  basePath: isProd ? `/${repo}` : "",
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_BASE_PATH: isProd ? `/${repo}` : "",
  },
};

export default nextConfig;
