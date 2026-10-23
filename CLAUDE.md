# CLAUDE.md

Guidance for Claude Code (and other agents) working in this repository.

## Project overview

Calarys is a pnpm monorepo containing a library of premium, interaction-focused React components and the site that documents them.

- `packages/ui` → `@calarys/ui`: the components. **Source-only** package: `main`, `types` and `exports` point at `src/`, there is no build step. Next.js compiles it directly from the workspace.
- `apps/docs` → `@calarys/docs`: Next.js 16 (App Router) site with a landing page, a searchable component explorer and a live playground per component.

## Commands

Run from the repo root (pnpm only, never npm/yarn):

```bash
pnpm install
pnpm dev         # docs site on http://localhost:3000
pnpm build       # production build of the docs site
pnpm lint        # ESLint in every package
pnpm typecheck   # tsc --noEmit in every package
```

There is no test runner. Before finishing a change, run `pnpm typecheck` and `pnpm lint` (and `pnpm build` for routing/rendering changes).

## Next.js version warning

@apps/docs/AGENTS.md

The docs app uses Next.js 16.2 and React 19.2. Check `apps/docs/node_modules/next/dist/docs/` before relying on Next.js APIs from memory (e.g. route `params` are a `Promise` and must be awaited).

## Architecture

### `packages/ui`

```
src/
├── index.ts                 # export * from "./components"
├── global.d.ts              # *.module.css typings
├── styles/styles.css        # shared tokens (--calarys-*), imported by consumers as "@calarys/ui/styles.css"
└── components/
    ├── index.ts             # barrel: one export * per component
    └── <kebab-name>/
        ├── index.ts         # export * from "./<kebab-name>"
        ├── <kebab-name>.tsx
        └── <kebab-name>.module.css
```

Component conventions (follow them for every new component):

- Start with `"use client"` when using hooks/events.
- Export a named function component (`export function MagneticButton`) and its props type (`export type MagneticButtonProps`).
- Declare defaults in the parameter destructuring.
- Map visual props to **CSS custom properties** passed via an inline `style` object cast `as CSSProperties` (e.g. `"--button-background": backgroundColor`). The CSS Module consumes those variables.
- Express boolean/enum variants with **`data-*` attributes** (`data-size`, `data-shadow`, `data-border`, `data-disabled`) and style them with attribute selectors.
- Pointer-driven effects write CSS variables directly on the DOM node through a ref (`style.setProperty`) instead of React state, to avoid re-renders; throttle with `requestAnimationFrame` when needed and clean up on unmount.
- Use shared tokens from `styles/styles.css` (`--calarys-shadow-component-sm|md|lg`); add new cross-component tokens there with the `--calarys-` prefix.
- Plain CSS Modules only — no Tailwind inside `packages/ui`. Respect `prefers-reduced-motion` and keep focus styles (`:focus-visible`).

### `apps/docs`

```
src/
├── app/                       # routes (App Router)
│   ├── layout.tsx             # fonts (Instrument Sans, Cormorant Garamond), Navbar, Footer, SmoothScrollProvider, global CSS
│   ├── page.tsx               # landing: hero + ComponentShowcase
│   └── components/
│       ├── page.tsx           # explorer: list + search + category filter
│       └── [id]/page.tsx      # playground page (generateStaticParams, dynamicParams = false)
├── features/
│   ├── explorer/              # ComponentExplorer, ExplorerSearch (client), ComponentCard
│   └── playground/            # ComponentPlayground (client) + types/playground.ts (defineComponent, control types)
├── registry/
│   ├── component-registry.ts  # id → definition map, ComponentId type, helpers
│   └── <kebab-name>/          # definition.tsx (+ optional <name>-demo.tsx wrapper) + index.ts
└── shared/
    ├── components/            # Navbar, Footer, ComponentShowcase
    ├── providers/             # SmoothScrollProvider (Lenis)
    └── styles/                # globals.css, tokens.css (Tailwind v4 @theme + site colors)
```

Data flow: `component-registry.ts` is the single source of truth. `/components` lists `getComponentDefinitions()`; `/components/[id]` validates the id with `isComponentId`, and `ComponentPlayground` holds the config state, renders form controls from `definition.controls`, previews via `definition.renderConfig(config)` and shows `definition.generateCodeFromConfig(config)`.

`defineComponent<TConfig>()` (in `features/playground/types/playground.ts`) takes `{ id, name, description, version, category, tags, defaultConfig, controls, render, generateCode }`. Control types: `range` (min/max/step/suffix), `color`, `toggle`, `select` (options). `TConfig` values must be `string | number | boolean`. Categories: `buttons | cards | controls | navigation | text | effects`.

Path alias: `@/*` → `apps/docs/src/*`. Styling in the docs app mixes CSS Modules (most components) with Tailwind utilities (layout).

## Adding a new component

1. `packages/ui/src/components/<name>/` with `<name>.tsx`, `<name>.module.css`, `index.ts`; add `export * from "./<name>";` to `packages/ui/src/components/index.ts`.
2. `apps/docs/src/registry/<name>/definition.tsx` using `defineComponent<Config>()`; keep `defaultConfig` in sync with the component defaults and make `generateCode` reproduce every prop.
3. If the preview needs content or a client boundary, add `<name>-demo.tsx` next to the definition (see `spotlight-card-demo.tsx`, `toggle-demo.tsx`).
4. `apps/docs/src/registry/<name>/index.ts` re-exports the definition; register it in `component-registry.ts` (key must equal `id`).
5. Optionally add it to the landing `ComponentShowcase` in `apps/docs/src/app/page.tsx`.
6. Document the props in `packages/ui/README.md`, then run `pnpm typecheck && pnpm lint`.

## Code style

- TypeScript strict, `type` aliases (not `interface`), named exports, kebab-case file and folder names, PascalCase components.
- Double quotes, semicolons, 2-space indent, trailing commas in multiline literals.
- Import types with `type` modifiers (`import { type CSSProperties } from "react"`).
- Keep components small and self-contained; no new runtime dependencies in `packages/ui` without a strong reason.

## Git workflow

- Never commit directly to `main`. Branch as `feat/…`, `fix/…`, `refactor/…`, `chore/…` or `docs/…`.
- Conventional commit messages (`feat(ui): …`, `refactor: …`, `chore: …`, `docs: …`).
- Open a PR against `main` with `gh pr create`; PRs are merged with a merge commit (`gh pr merge --merge --delete-branch`).

## Known issues / placeholders

- Navbar links `/collections` and `/journal`, footer links `/privacy` and `/terms` have no pages yet.
- The Navbar "Search ⌘K" button and the "Code" / "Usage" tabs on component pages are non-functional placeholders.
- No tests and no CI.
