# @calarys/ui

The Calarys component library: premium, interaction-focused React components styled with CSS Modules and CSS custom properties.

## Usage

The package is private to this workspace and shipped as TypeScript source (no build step). Peer dependencies: `react` and `react-dom` ^19.

```json
{ "dependencies": { "@calarys/ui": "workspace:*" } }
```

Import the shared tokens once (e.g. in your root layout), then the components:

```tsx
import "@calarys/ui/styles.css";
import { MagneticButton, SpotlightCard, Toggle } from "@calarys/ui";
```

All components are client components (`"use client"`).

## Components

### `MagneticButton`

A pill button that moves toward the pointer while it is within `radius` of its center.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `string` | `"Magnetic Button"` | Button label. |
| `radius` | `number` | `140` | Attraction radius in px. |
| `strength` | `number` | `0.35` | Fraction of the pointer distance the button follows (0–1). |
| `duration` | `number` | `250` | Transition duration in ms. |
| `backgroundColor` | `string` | `"#111111"` | Button background. |
| `textColor` | `string` | `"#ffffff"` | Label color. |

### `SpotlightCard`

A card with a radial spotlight that follows the pointer and fades out on leave.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `ReactNode` | — | Card content (required). |
| `radius` | `number` | `200` | Spotlight radius in px. |
| `intensity` | `number` | `0.65` | Spotlight opacity (0–1). |
| `spotlightColor` | `string` | `"#ffffff"` | Spotlight color. |
| `backgroundColor` | `string` | `"#e9e7e2"` | Card background. |
| `textColor` | `string` | `"#181714"` | Text color. |
| `border` | `boolean` | `true` | Show a 1px border. |
| `borderColor` | `string` | `"rgba(0, 0, 0, 0.12)"` | Border color. |
| `shadow` | `boolean` | `false` | Apply `--calarys-shadow-component-lg`. |
| `padding` | `number` | `32` | Inner padding in px. |
| `cornerRadius` | `number` | `24` | Border radius in px. |

### `Toggle`

An accessible switch built on a visually hidden native checkbox. Works controlled (`checked` + `onChange`) or uncontrolled (`defaultChecked`).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `checked` | `boolean` | — | Controlled state. |
| `defaultChecked` | `boolean` | `false` | Initial state when uncontrolled. |
| `onChange` | `(checked: boolean) => void` | — | Called with the next state. |
| `disabled` | `boolean` | `false` | Disables interaction. |
| `activeColor` | `string` | `"#181714"` | Track color when on. |
| `inactiveColor` | `string` | `"#d8d6d1"` | Track color when off. |
| `thumbColor` | `string` | `"#ffffff"` | Thumb color. |
| `shadow` | `boolean` | `false` | Apply `--calarys-shadow-component-sm` to the track. |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Switch size. |

## Style tokens

Defined in `src/styles/styles.css` (exported as `@calarys/ui/styles.css`):

| Token | Use |
| --- | --- |
| `--calarys-shadow-component-sm` | Small elevation (e.g. toggle track). |
| `--calarys-shadow-component-md` | Medium elevation. |
| `--calarys-shadow-component-lg` | Large elevation (e.g. spotlight card). |

## Scripts

```bash
pnpm --filter @calarys/ui typecheck
pnpm --filter @calarys/ui lint
pnpm --filter @calarys/ui test
```

See [`CONTRIBUTING.md`](../../CONTRIBUTING.md) for how to add a component.
