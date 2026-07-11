import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const SITE = "https://mri-gta-brasil.github.io/mri_brasil";
const CATEGORIES = [
  "S_FULL_AMB_M",
  "S_FULL_AMB_F",
  "S_FULL_SER",
  "S_FULL_GAN",
  "POLICE_SCANNER",
  "ONESHOT_AMBIENCE",
  "STREAMED_AMBIENCE",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE}/`, changeFrequency: "weekly", priority: 1 },
    ...CATEGORIES.map((c) => ({
      url: `${SITE}/browser/${c}/`,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
  ];
}
