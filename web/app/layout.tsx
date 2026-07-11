import type { Metadata } from "next";
import { Archivo, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
});

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const SITE = "https://mri-gta-brasil.github.io/mri_brasil";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "mri GTA Brasil — Los Santos agora fala português",
    template: "%s · mri GTA Brasil",
  },
  description:
    "Mutirão da comunidade redublando o GTA V inteiro em português brasileiro para o FiveM — dos PMs às gangues, do rádio da polícia aos pedestres. 44 mil falas, uma cidade ganhando voz BR.",
  keywords: [
    "GTA V dublado",
    "GTA 5 português",
    "dublagem PT-BR",
    "FiveM Brasil",
    "vozes GTA português",
    "scanner polícia dublado",
    "roleplay brasil",
    "mri brasil",
    "mri Qbox Brasil",
    "Qbox Brasil",
    "framework FiveM português",
    "FiveM dublagem",
  ],
  authors: [{ name: "Murai", url: "https://github.com/mur4i" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: SITE,
    siteName: "mri GTA Brasil",
    title: "Los Santos agora fala português",
    description:
      "O GTA V inteiro redublado em PT-BR para o FiveM. 44 mil falas, acompanhe o progresso e ouça as vozes.",
  },
  twitter: {
    card: "summary_large_image",
    title: "mri GTA Brasil — Los Santos agora fala português",
    description:
      "O GTA V inteiro redublado em PT-BR para o FiveM. 44 mil falas, acompanhe o progresso.",
  },
  robots: { index: true, follow: true },
  category: "games",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  name: "mri GTA Brasil",
  inLanguage: "pt-BR",
  about: "Dublagem em português brasileiro do GTA V para o FiveM",
  creator: { "@type": "Person", name: "Murai", url: "https://github.com/mur4i" },
  url: SITE,
  genre: "Video game modification",
  isPartOf: {
    "@type": "Organization",
    name: "mri Qbox Brasil",
    description:
      "Comunidade open-source de FiveM do Brasil — framework Qbox em português.",
    url: "https://www.mriqbox.com.br",
    sameAs: [
      "https://github.com/mri-Qbox-Brasil",
      "https://discord.mriqbox.com.br",
      "https://www.patreon.com/mriQboxBrasil",
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      className={`${archivo.variable} ${plexSans.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
