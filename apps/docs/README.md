# @calarys/docs

The Calarys website: a landing page, a searchable component explorer and an interactive playground for every component in [`@calarys/ui`](../../packages/ui).

Built with Next.js 16 (App Router), React 19, Tailwind CSS v4, CSS Modules and Lenis smooth scrolling.

> This app uses Next.js 16, which has breaking changes compared to earlier versions. Read the relevant guide in `node_modules/next/dist/docs/` before using Next.js APIs (see [`AGENTS.md`](AGENTS.md)).

## Routes

| Route | Description |
| --- | --- |
| `/` | Hero ("Designed with intention.") and a showcase of live components. |
| `/components` | Explorer with text search (name, description, category, tags) and category filters. |
| `/collections`, `/journal` | "Coming soon" placeholders. |
| `/privacy`, `/terms` | Minimal legal pages. |
| `/components/[id]` | Tabs: **Preview** (live playground with controls and generated code), **Code** (component source from `@calarys/ui`), **Usage** (import, example, props table). Statically generated for every registered component. |

## Structure

```
src/
├── app/          # routes and root layout (fonts, Navbar, Footer, SmoothScrollProvider)
├── features/
│   ├── component-docs/  # ComponentTabs, ComponentSource, ComponentUsage
│   ├── explorer/     # ComponentExplorer, ExplorerSearch, ComponentCard
│   ├── playground/   # ComponentPlayground + defineComponent and control types
│   └── search/       # CommandPalette (⌘K / Ctrl+K) searching components and pages
├── registry/     # one folder per component + component-registry.ts
└── shared/       # Navbar, Footer, ComponentShowcase, PageIntro, providers, global styles and tokens
```

## The component registry

`src/registry/component-registry.ts` maps each component id to a definition created with `defineComponent<TConfig>()`:

- metadata: `id`, `name`, `exportName`, `description`, `version`, `category`, `tags`
- `props`: documentation rows for the Usage tab
- `defaultConfig`: initial playground values
- `controls`: `range`, `color`, `toggle` or `select` inputs bound to config keys
- `render(config)`: the live preview
- `generateCode(config)`: the JSX snippet shown in the playground

Both the explorer and the playground pages read from this registry, so registering a definition is all that is needed to publish a new component. See [`CONTRIBUTING.md`](../../CONTRIBUTING.md) for the full walkthrough.

## Scripts

Run from the repo root (`pnpm dev`, `pnpm build`, `pnpm lint`) or inside this folder:

```bash
pnpm dev         # next dev
pnpm build       # next build
pnpm start       # next start
pnpm lint        # eslint
pnpm typecheck   # tsc --noEmit
```
