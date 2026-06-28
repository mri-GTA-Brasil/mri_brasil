# 🇧🇷 mri_brasil

> **Transformando o FiveM em Brasil** — dublagem e localização em Português Brasileiro para servidores FiveM (GTA V) e RedM (RDR2).

[![FiveM](https://img.shields.io/badge/FiveM-resource-orange)](https://fivem.net/)
[![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)]()
[![PT-BR](https://img.shields.io/badge/idioma-PT--BR-green)]()

---

## 📖 Sobre o projeto

O **mri_brasil** é um projeto comunitário com um objetivo simples e ambicioso: **deixar o ambiente do GTA V dentro do FiveM com a cara — e a voz — do Brasil.**

A ideia começou pela **dublagem de áudio**: substituir as falas dos NPCs, o scanner da polícia e os sons ambientes do jogo (originalmente em inglês) por versões em **português brasileiro**. Mas a visão é maior — evoluir para um pacote completo de localização e ambientação brasileira.

Este é um **resource de substituição de assets**: ele não roda scripts no servidor nem no cliente. Funciona registrando pacotes de áudio nativos do jogo (`AUDIO_WAVEPACK`) e substituindo os arquivos `.awc` originais pelas versões dubladas.

## 🎯 Objetivos

- [x] Estruturar o resource base (`fxmanifest.lua`)
- [ ] Publicar os pacotes de áudio dublados (`.awc`), por partes
- [ ] Dublagem das falas de NPCs ambientes (masculino e feminino)
- [ ] Dublagem das falas de NPCs de serviço (polícia, bombeiros, SWAT, etc.)
- [ ] Dublagem das falas de gangues
- [ ] Localização do scanner da polícia em PT-BR
- [ ] Sons de ambiente brasileiros (rádio, anúncios, vozes de rua)
- [ ] Documentação de instalação e contribuição

## 📂 Estrutura

```
mri_brasil/
├── resource/             # O resource FiveM/RedM em si
│   ├── fxmanifest.lua      # Manifesto do resource
│   └── sfx/                # Pacotes de áudio (.awc) — adicionados por partes
│       ├── ONESHOT_AMBIENCE/   # Sons ambientes pontuais (PA aeroporto, veículos distantes…)
│       ├── POLICE_SCANNER/     # Scanner / rádio da polícia
│       ├── STREAMED_AMBIENCE/  # Sons de ambiente em streaming
│       ├── S_FULL_AMB_F/       # Falas de NPCs ambientes femininos
│       ├── S_FULL_AMB_M/       # Falas de NPCs ambientes masculinos
│       ├── S_FULL_GAN/         # Falas de gangues (Ballas, Families, Lost MC…)
│       └── S_FULL_SER/         # Falas de NPCs de serviço (cops, pilotos, SWAT…)
└── web/                  # Site de progresso da dublagem (Next.js)
```

> ℹ️ Os arquivos de áudio (`.awc`) ainda **não estão neste repositório** — serão publicados em etapas. A estrutura acima documenta o destino de cada pacote.

## 🚀 Instalação

> ⚠️ Em breve. As instruções completas serão adicionadas quando os pacotes de áudio forem publicados.

Resumo do funcionamento previsto:

1. Copie a pasta [`resource/`](resource/) para dentro de `resources/` do seu servidor, renomeando-a para `mri_brasil`.
2. Adicione `ensure mri_brasil` ao seu `server.cfg`.
3. Reinicie o servidor — os áudios dublados substituem os originais automaticamente.

## 🤝 Contribuindo

Este é um projeto aberto à comunidade. Dublagens, revisões de tradução, melhorias de áudio e documentação são bem-vindas. Diretrizes de contribuição serão adicionadas em breve.

## 📝 Licença

A definir.

## 👤 Autor

Criado e mantido por **Murai** ([@mur4i](https://github.com/mur4i)).

---

<p align="center"><i>Feito com 💛💚 para a comunidade FiveM brasileira.</i></p>
