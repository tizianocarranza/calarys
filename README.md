# Calarys

> Designed with intention.

Calarys is a small, curated library of premium, interaction-focused React components, paired with a documentation site where every component can be explored, tuned live and copied as code.

Each component is built around one carefully crafted interaction — a button that is pulled toward the cursor, a card lit by a spotlight that follows the pointer, a toggle with a tactile, springy thumb — and exposes its look and feel through a small set of typed props.

## Components

| Component | Category | Description |
| --- | --- | --- |
| `MagneticButton` | buttons | A button that is magnetically attracted to the cursor within a configurable radius. |
| `SpotlightCard` | cards | A card with a soft radial spotlight that follows the pointer. |
| `Toggle` | controls | An accessible switch (native checkbox) with smooth transitions, three sizes and custom colors. |

See [`packages/ui/README.md`](packages/ui/README.md) for the full props reference.

## Tech stack

- **pnpm workspaces** monorepo (`pnpm@10.24.0`)
- **React 19** + **TypeScript 5** (strict)
- **CSS Modules** + CSS custom properties for component styling
- **Next.js 16** (App Router) for the docs site, with **Tailwind CSS v4** and **Lenis** smooth scrolling

## Repository layout

```
calarys/
├── apps/
│   └── docs/          # @calarys/docs — Next.js site: landing, component explorer, live playground
├── packages/
│   └── ui/            # @calarys/ui — the component library (source-only TypeScript package)
├── package.json       # root scripts
└── pnpm-workspace.yaml
```

## Getting started

Requirements: Node.js 20+ and pnpm 10 (`corepack enable` picks up the pinned version).

```bash
pnpm install
pnpm dev          # start the docs site at http://localhost:3000
```

| Script | What it does |
| --- | --- |
| `pnpm dev` | Runs the docs site in development mode. |
| `pnpm build` | Builds the docs site for production. |
| `pnpm lint` | Lints every workspace package with ESLint. |
| `pnpm typecheck` | Type-checks every workspace package. |

## Using `@calarys/ui`

The package currently lives inside this workspace and is consumed as source (no build step). Add it as a workspace dependency, import the shared tokens once, then use the components:

```tsx
// app/layout.tsx
import "@calarys/ui/styles.css";
```

```tsx
import { MagneticButton, SpotlightCard, Toggle } from "@calarys/ui";

<MagneticButton radius={140} strength={0.35}>Get started</MagneticButton>

<SpotlightCard spotlightColor="#fff3c4" shadow>
  <h3>Timeless design</h3>
</SpotlightCard>

<Toggle size="lg" defaultChecked onChange={(checked) => console.log(checked)} />
```

## Documentation

- [`CONTRIBUTING.md`](CONTRIBUTING.md) — workflow and step-by-step guide for adding a component
- [`packages/ui/README.md`](packages/ui/README.md) — component API reference
- [`apps/docs/README.md`](apps/docs/README.md) — how the docs site, registry and playground work
- [`CLAUDE.md`](CLAUDE.md) — guidance for AI coding agents working in this repo
