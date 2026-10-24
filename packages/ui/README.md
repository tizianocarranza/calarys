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
import { LightSource, MagneticButton, SpotlightCard, Toggle } from "@calarys/ui";
```

All components are client components (`"use client"`).

## Components

### `LightSource`

One light for the whole page. Wrap your app (or a section) in it and every Calarys component inside shades itself from the same pointer-driven light: the Magnetic Button gets a specular highlight and a rim, the Spotlight Card's glow and rim follow the light (nearby cards catch its spill) and its shadow falls away from it, and the Toggle's thumb and groove are shaded from its direction. Outside a `LightSource` the components behave as before.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `ReactNode` | — | Content to light (required). |
| `color` | `string` | `"#ffffff"` | Light color used for highlights and rims. |
| `intensity` | `number` | `0.6` | Highlight strength (0–1). |
| `reach` | `number` | `480` | Distance in px from a component's edge at which the light fades out. |
| `finish` | `"onyx" \| "ivory"` | — | Curated materials for every component inside (see [Materials](#materials)). Without it the components keep their plain look. |

To light your own components, call `useLight(ref)` on an element. Inside a `LightSource` it sets `data-lit="true"` on it and keeps these CSS variables up to date (one layout read per frame for all lit elements):

| Variable | Value |
| --- | --- |
| `--light-x`, `--light-y` | Light position relative to the element, in px. |
| `--light-nx`, `--light-ny` | Unit vector from the element's center toward the light. |
| `--light-proximity` | `0`–`1`; `1` while the light is over the element, `0` when it is out of reach or off the window. |

The source also sets `--calarys-light-color` and `--calarys-light-intensity` for its subtree.

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
| `onClick` | `MouseEventHandler<HTMLButtonElement>` | — | Called when the button is pressed. |

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
| `aria-label` | `string` | — | Accessible name for the checkbox (the toggle has no visible label). |

## Materials

Calarys never asks which material you like: each part of a component has a role, and the role decides its material.

| Role | Material | Parts |
| --- | --- | --- |
| Surface (what you look at) | Matte: wide, soft sheen over a fine grain | Card faces, toggle tracks |
| Touch (what you press or move) | Gloss: clearcoat and a tight highlight | Buttons, toggle thumbs |
| Structure (what frames) | Metal: a 1px ring whose shine faces the light | Card and button edges |
| Active (what is on) | Emission: it gives off light | A toggle that is on |

Each part carries its role's material as `data-calarys-material`. Materials render inside a `LightSource` with a `finish`, which sets their colors:

- `onyx`: matte black, polished graphite, dark steel, a warm LED.
- `ivory`: ivory ceramic, black lacquer, brass, an amber LED.

Colors stay free: a color prop you pass wins over the finish, and the materials still apply on top of it. Color props you leave unset take the finish's colors, and outside a finish they fall back to the defaults listed above.

## Style tokens

Defined in `src/styles/styles.css` (exported as `@calarys/ui/styles.css`):

| Token | Use |
| --- | --- |
| `--calarys-shadow-component-sm` | Small elevation (e.g. toggle track). |
| `--calarys-shadow-component-md` | Medium elevation. |
| `--calarys-shadow-component-lg` | Large elevation (e.g. spotlight card). |

`styles.css` also registers `--light-proximity` with `@property`, so lit components can transition it, and defines `--calarys-grain` plus the finish tokens (`--calarys-surface`, `--calarys-surface-text`, `--calarys-groove`, `--calarys-touch`, `--calarys-touch-text`, `--calarys-handle`, `--calarys-metal`, `--calarys-metal-shine`, `--calarys-emission`, `--calarys-emission-glow`) under `[data-calarys-finish="onyx" | "ivory"]`.

## Scripts

```bash
pnpm --filter @calarys/ui typecheck
pnpm --filter @calarys/ui lint
pnpm --filter @calarys/ui test
```

See [`CONTRIBUTING.md`](../../CONTRIBUTING.md) for how to add a component.
