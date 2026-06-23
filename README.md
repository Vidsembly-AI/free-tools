# Vidsembly Free Tools

Free video, audio, presentation, and transcription tools powered by [Vidsembly](https://vidsembly.com).

Live at **tools.vidsembly.com** (coming soon).

## Tech Stack

- [Next.js 15](https://nextjs.org/) (App Router)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS 4](https://tailwindcss.com/)

## Getting Started

### Prerequisites

- Node.js 20+ (LTS recommended)
- npm

### Install dependencies

```bash
npm install
```

### Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for production

```bash
npm run build
npm start
```

### Lint

```bash
npm run lint
```

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout with Header & Footer
│   ├── page.tsx                # Homepage
│   ├── tools/[slug]/page.tsx   # Tool pages (use ToolPage template)
│   └── globals.css             # Global styles & theme tokens
├── components/
│   ├── home/                   # Homepage sections
│   ├── layout/                 # Header, Footer
│   ├── tools/                  # Shared tool UI (ToolPage, FAQ, CTA, etc.)
│   └── ui/                     # Reusable UI components
└── lib/
    ├── tools/
    │   ├── tool-data.ts        # Tool registry (SEO, FAQs, related tools)
    │   ├── seo.ts              # Metadata helpers
    │   └── schema.ts           # JSON-LD helpers
    ├── tools.ts                # Homepage tool listings
    └── types.ts                # Shared TypeScript types
```

## Adding a New Tool

1. Register the tool in `src/lib/tools/tool-data.ts`
2. Build the converter component in `src/components/tools/`
3. Create `src/app/tools/[slug]/page.tsx` using the `ToolPage` template

See `.cursor/rules/vidsembly-free-tools-platform.mdc` for full platform conventions.

## License

Private — Vidsembly
