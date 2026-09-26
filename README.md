<p align="center">
  <img src="src/assets/images/stixmagic2.jpeg" alt="STIX MAGIC" width="160">
</p>

<h1 align="center">STIX MAGIC · Sticker Motion Library</h1>

<p align="center"><b>Modular sticker-style studio that combines base styles, overlays, masks and motion presets into animated stickers</b></p>

<p align="center">
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue" alt="License: MIT"></a>
  <img src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB" alt="React">
  <img src="https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white" alt="Vite">
  <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind CSS">
</p>

A browser studio for STIX MAGIC stickers, built on the GitHub Spark template. You upload an image, pick from a style gallery built out of composable systems (base styles grouped into families, overlays, masks, motion presets and size profiles, validated by a combo engine), preview the animated result and export it, alone or in batches, as images, GIFs or preset JSON. Background removal and image analysis go through the Spark LLM runtime (`spark.llm`). Favourites and onboarding state persist in Spark KV. It is for the STIX MAGIC team designing the sticker-style catalogue. The system design is documented in [`ARCHITECTURE.md`](ARCHITECTURE.md).

## Architecture

```mermaid
flowchart LR
  user([Creator]) --> upload[ImageUpload]
  upload --> bg["Background removal<br/>use-background-removal · backgroundRemoval.ts"]
  bg -->|spark.llm| llm[Spark LLM runtime]
  user --> gallery[StyleGallery · SettingsMenu]
  gallery --> engine["use-transformation<br/>transformationEngine · comboEngine"]
  lib[("styleLibrary · overlaySystem · maskSystem<br/>motionPresets · sizeProfiles")] --> engine
  engine --> preview[AnimatedPreview · AnimationPlayground]
  preview --> export["ExportDialog / BatchExportDialog<br/>gifEncoder · exportUtils"]
  export --> files[/PNG · GIF · preset JSON/]
  gallery <--> kv[("Spark useKV<br/>favorites · onboarding")]
```

## Stack

- React 19 + TypeScript on Vite (GitHub Spark template, `@github/spark` KV and LLM hooks)
- Tailwind CSS 4, shadcn/ui on Radix, Phosphor icons, Framer Motion
- Canvas-based rendering with an in-repo GIF encoder (`src/lib/gifEncoder.ts`)

## Project structure

```text
ARCHITECTURE.md  PRD*.md  STIX-MAGIC-BRANDING.md
src/
  App.tsx             studio shell
  components/         StyleGallery, ImageUpload, AnimatedPreview, Export dialogs, loaders…
  hooks/              use-transformation, use-background-removal, use-favorites, use-onboarding
  lib/                styleLibrary, comboEngine, overlay/mask/motion systems, gifEncoder, export utils
  assets/             brand images and video
```

## Local development

```bash
# Install dependencies
npm install

# Vite dev server
npm run dev

# Type-check and production build
npm run build

# ESLint
npm run lint
```

## Deploy

No deploy target is configured in this repo (no workflows or hosting config). `npm run build` outputs a static bundle to `dist/`. The LLM-backed background removal and the KV persistence need the GitHub Spark runtime.

## Status

Several product specs exist (`PRD.md`, `PRD-UPDATED.md`, `PRD-MASK-INTEGRATED.md`, `PRD-MOVEMENT-INTEGRATED.md`). Pick one as canonical and archive the rest before further implementation. Related: [stixmagic-bot](https://github.com/FriskyDevelopments/stixmagic-bot).

## License

See [LICENSE](LICENSE).
