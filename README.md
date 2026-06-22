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
│   ├── layout.tsx      # Root layout with Header & Footer
│   ├── page.tsx        # Homepage
│   └── globals.css     # Global styles & theme tokens
├── components/
│   ├── home/           # Homepage sections
│   ├── layout/         # Header, Footer
│   └── ui/             # Reusable UI components
└── lib/
    ├── tools.ts        # Tool & category data
    └── types.ts        # Shared TypeScript types
```

## License

Private — Vidsembly
