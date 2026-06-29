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
├── resource/                       # Os resources FiveM/RedM
│   └── [mri_brasil]/                 # Pasta agrupadora (instale só os pacotes que quiser)
│       │  ── 🎙️ Dublagem (áudio) ──
│       ├── mri_brasil_s_full_amb_m/     # NPCs ambientes masculinos        (107)
│       ├── mri_brasil_s_full_amb_f/     # NPCs ambientes femininos         (61)
│       ├── mri_brasil_s_full_ser/       # NPCs de serviço (cops, SWAT…)    (63)
│       ├── mri_brasil_s_full_gan/       # Gangues (Ballas, Families…)      (19)
│       ├── mri_brasil_oneshot_ambience/ # Ambiente pontual                 (93)
│       ├── mri_brasil_streamed_ambience_p1/  # Ambiente streaming (1/2)    (85)
│       ├── mri_brasil_streamed_ambience_p2/  # Ambiente streaming (2/2)    (85)
│       ├── mri_brasil_police_scanner_p1/     # Scanner da polícia (1/3)    (111)
│       ├── mri_brasil_police_scanner_p2/     # Scanner da polícia (2/3)    (111)
│       ├── mri_brasil_police_scanner_p3/     # Scanner da polícia (3/3)    (110)
│       │  ── 🏙️ Ambientação visual São Paulo (fonte: gta5-mods) ──
│       ├── mri_brasil_props/             # Props, placas e mobiliário urbano (~148 MB)
│       ├── mri_brasil_peds_policia/      # Skins de polícia, forças e gangues (~164 MB)
│       ├── mri_brasil_viaturas/          # Liveries de viaturas               (~59 MB)
│       ├── mri_brasil_correios/          # Carteiros + van de entrega         (~10 MB)
│       ├── mri_brasil_mapa_aeroporto/    # Retextura do aeroporto            (~158 MB)
│       └── mri_brasil_mapa_zancudo/      # Retextura de Fort Zancudo          (~61 MB)
└── web/                            # Site de progresso da dublagem (Next.js)
```

Os pacotes de **dublagem** têm uma pasta `sfx/<CATEGORIA>/` com os áudios `.awc`; os de **ambientação visual** têm uma pasta `stream/` com os modelos/texturas (`.ytd`, `.yft`, `.ydr`). Cada sub-resource tem seu próprio `fxmanifest.lua`, e os pacotes maiores são **divididos em partes** para o servidor carregar só o necessário.

> ℹ️ Os arquivos de áudio (`.awc`) ainda **não estão neste repositório** — serão publicados em etapas. A estrutura de pastas (com `.gitkeep`) já documenta o destino de cada pacote.

## 🚀 Instalação

A dublagem é dividida em **vários resources independentes** — você instala só os pacotes que quiser, evitando peso desnecessário no servidor.

1. Copie a pasta `[mri_brasil]` (de dentro de [`resource/`](resource/)) para a pasta `resources/` do seu servidor.
2. No `server.cfg`, dê `ensure` apenas nos pacotes desejados:

   ```cfg
   # Vozes de NPCs
   ensure mri_brasil_s_full_amb_m      # NPCs ambientes masculinos
   ensure mri_brasil_s_full_amb_f      # NPCs ambientes femininos
   ensure mri_brasil_s_full_ser        # NPCs de serviço (cops, SWAT…)
   ensure mri_brasil_s_full_gan        # Gangues

   # Ambiente
   ensure mri_brasil_oneshot_ambience
   ensure mri_brasil_streamed_ambience_p1
   ensure mri_brasil_streamed_ambience_p2

   # Scanner da polícia (dividido em 3 partes)
   ensure mri_brasil_police_scanner_p1
   ensure mri_brasil_police_scanner_p2
   ensure mri_brasil_police_scanner_p3

   # Ambientação visual São Paulo
   ensure mri_brasil_props             # props, placas, mobiliário urbano
   ensure mri_brasil_peds_policia      # skins de polícia, forças e gangues
   ensure mri_brasil_viaturas          # liveries de viaturas
   ensure mri_brasil_correios          # carteiros + van
   ensure mri_brasil_mapa_aeroporto    # retextura do aeroporto
   ensure mri_brasil_mapa_zancudo      # retextura de Fort Zancudo
   ```

3. Reinicie o servidor — os áudios dublados e os assets visuais substituem os originais automaticamente.

> 💡 Não quer o scanner da polícia? Basta não dar `ensure` nas partes `mri_brasil_police_scanner_*`. O mesmo vale para qualquer outro pacote.

## 🤝 Contribuindo

Este é um projeto aberto à comunidade. Dublagens, revisões de tradução, melhorias de áudio e documentação são bem-vindas. Diretrizes de contribuição serão adicionadas em breve.

## 📝 Licença

A definir.

## 🙏 Créditos

Este projeto é uma **continuação** de uma ideia que começou antes. A dublagem original do GTA V em PT-BR foi iniciada por uma equipe de criadores que, infelizmente, descontinuou o trabalho. Toda a base de áudio dublado existe graças a eles — e ficam aqui registrados os devidos créditos:

- [@matiasproducoes](https://www.youtube.com/@matiasproducoes)
- [@godoyy](https://www.youtube.com/@godoyy)
- [@ballasstreetgames](https://www.youtube.com/@ballasstreetgames)
- [@nemesisfandubs](https://www.youtube.com/@nemesisfandubs)

📺 Vídeo de apresentação do projeto original: [PROJETO GTA 5 DUBLADO — SAIBA TUDO SOBRE ESSE PROJETO INCRÍVEL](https://www.youtube.com/watch?v=y_aqU7Wrdeo)

### 🏙️ Ambientação visual (props, peds, viaturas, mapas)

Os assets de ambientação São Paulo (modelos, texturas e skins) têm como fonte o **[GTA5-Mods](https://www.gta5-mods.com/)** e seus respectivos autores. Os créditos individuais de cada mod serão detalhados conforme as fontes forem confirmadas.

> 🔗 É um dos autores dos assets visuais? Abra uma issue com o link do seu mod no GTA5-Mods para crédito direto, ou para ajuste/remoção.

> Se você é um dos criadores originais (dublagem) e deseja ajustar ou remover os créditos, abra uma issue ou entre em contato.

## 👤 Mantenedor atual

O projeto está sendo **recomeçado e mantido** por **Murai** ([@mur4i](https://github.com/mur4i)), com o objetivo de retomar e expandir a dublagem para a comunidade FiveM brasileira.

---

<p align="center"><i>Feito com 💛💚 para a comunidade FiveM brasileira.</i></p>
