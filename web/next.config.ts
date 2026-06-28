import type { NextConfig } from "next";

// Em produção (GitHub Pages) o site é servido em /mri_brasil.
// Em dev (next dev) NODE_ENV !== "production", então roda na raiz.
const isProd = process.env.NODE_ENV === "production";
const repo = "mri_brasil";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  basePath: isProd ? `/${repo}` : "",
  // GitHub Pages serve melhor com URLs em diretório (/, /me/ -> index.html)
  trailingSlash: true,
};

export default nextConfig;
