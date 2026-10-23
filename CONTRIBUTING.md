# Contributing to Calarys

## Setup

```bash
corepack enable   # uses the pnpm version pinned in package.json
pnpm install
pnpm dev          # http://localhost:3000
```

## Workflow

1. Branch off an up-to-date `main`: `feat/<topic>`, `fix/<topic>`, `refactor/<topic>`, `chore/<topic>` or `docs/<topic>`.
2. Make focused commits using [Conventional Commits](https://www.conventionalcommits.org/), scoped when useful: `feat(ui): add tooltip component`, `fix(docs): …`.
3. Verify before pushing:
   ```bash
   pnpm typecheck
   pnpm lint
   pnpm build   # for changes to routes, layouts or rendering
   ```
4. Open a pull request against `main`. PRs are merged with a merge commit and the branch is deleted afterwards.

## Adding a component

A component lives in two places: the implementation in `packages/ui` and its playground definition in `apps/docs/src/registry`.

### 1. Implement it in `@calarys/ui`

Create `packages/ui/src/components/<name>/`:

```
<name>/
├── index.ts            # export * from "./<name>";
├── <name>.tsx
└── <name>.module.css
```

```tsx
"use client";

import { type CSSProperties } from "react";

import styles from "./<name>.module.css";

export type MyComponentProps = {
  accentColor?: string;
  size?: "sm" | "md" | "lg";
};

export function MyComponent({
  accentColor = "#181714",
  size = "md",
}: MyComponentProps) {
  const style = {
    "--my-component-accent": accentColor,
  } as CSSProperties;

  return <div className={styles.root} data-size={size} style={style} />;
}
```

Guidelines:

- Visual props become CSS custom properties; variants become `data-*` attributes styled with attribute selectors.
- For pointer-driven effects, write CSS variables to the element via a ref instead of storing positions in React state.
- Reuse shared tokens from `packages/ui/src/styles/styles.css` (`--calarys-shadow-component-*`).
- Keep it accessible: real semantic elements, `:focus-visible` styles, `prefers-reduced-motion` support.

Then export it from `packages/ui/src/components/index.ts`.

### 2. Register it in the docs playground

Create `apps/docs/src/registry/<name>/definition.tsx`:

```tsx
import { MyComponent } from "@calarys/ui";

import { defineComponent } from "../../features/playground/types/playground";

export type MyComponentConfig = {
  accentColor: string;
  size: "sm" | "md" | "lg";
};

export const myComponentDefinition = defineComponent<MyComponentConfig>({
  id: "my-component",
  name: "My Component",
  description: "One sentence describing the interaction.",
  version: "0.1.0",
  category: "effects",
  tags: ["interaction"],

  defaultConfig: { accentColor: "#181714", size: "md" },

  controls: [
    { key: "accentColor", label: "Accent", type: "color" },
    {
      key: "size",
      label: "Size",
      type: "select",
      options: [
        { label: "Small", value: "sm" },
        { label: "Medium", value: "md" },
        { label: "Large", value: "lg" },
      ],
    },
  ],

  render: (config) => <MyComponent {...config} />,

  generateCode: (config) => `<MyComponent
  accentColor="${config.accentColor}"
  size="${config.size}"
/>`,
});
```

- Available control types: `range` (`min`, `max`, `step`, optional `suffix`), `color`, `toggle`, `select` (`options`).
- Categories: `buttons`, `cards`, `controls`, `navigation`, `text`, `effects`.
- If the preview needs sample content, add a `<name>-demo.tsx` wrapper next to the definition (see `spotlight-card-demo.tsx`).

Add `apps/docs/src/registry/<name>/index.ts` re-exporting the definition and register it in `apps/docs/src/registry/component-registry.ts` (the key must match `id`). The explorer and the `/components/<id>` page pick it up automatically.

### 3. Finish up

- Optionally showcase it on the landing page (`apps/docs/src/app/page.tsx`).
- Add its props table to [`packages/ui/README.md`](packages/ui/README.md) and the components table in the root [`README.md`](README.md).
- Run `pnpm typecheck && pnpm lint` and check the playground in the browser.
