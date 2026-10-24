import { defineComponent } from "../../features/playground/types/playground";

import { LightSourceDemo } from "./light-source-demo";

export type LightSourceConfig = {
  color: string;
  intensity: number;
  reach: number;
  finish: "none" | "onyx" | "ivory";
};

export const lightSourceDefinition = defineComponent<LightSourceConfig>({
  id: "light-source",

  name: "Light Source",

  description:
    "One light for the whole page: every Calarys component inside it shades, highlights and casts shadows from the same pointer-driven source.",

  version: "0.1.0",

  category: "effects",

  tags: ["light", "cursor", "shadow", "provider", "interaction"],

  exportName: "LightSource",

  props: [
    {
      name: "children",
      type: "ReactNode",
      description: "Content to light (required). Usually the whole app.",
    },
    {
      name: "color",
      type: "string",
      defaultValue: '"#ffffff"',
      description: "Light color used for highlights and rims.",
    },
    {
      name: "intensity",
      type: "number",
      defaultValue: "0.6",
      description: "Highlight strength (0–1).",
    },
    {
      name: "reach",
      type: "number",
      defaultValue: "480",
      description:
        "Distance in px from a component's edge at which the light fades out.",
    },
    {
      name: "finish",
      type: '"onyx" | "ivory"',
      description:
        "Curated set of materials for every component inside: matte surfaces, gloss parts you touch, metal edges and emitting active states. Without it the components keep their plain look.",
    },
  ],

  defaultConfig: {
    color: "#ffffff",
    intensity: 0.6,
    reach: 480,
    finish: "none",
  },

  controls: [
    {
      key: "color",
      label: "Light color",
      type: "color",
    },
    {
      key: "intensity",
      label: "Intensity",
      type: "range",
      min: 0,
      max: 1,
      step: 0.05,
    },
    {
      key: "reach",
      label: "Reach",
      type: "range",
      min: 120,
      max: 1200,
      step: 20,
      suffix: "px",
    },
    {
      key: "finish",
      label: "Finish",
      type: "select",
      options: [
        { label: "None", value: "none" },
        { label: "Onyx", value: "onyx" },
        { label: "Ivory", value: "ivory" },
      ],
    },
  ],

  render: (config) => <LightSourceDemo {...config} />,

  generateCode: (config) => {
    const finish =
      config.finish === "none" ? "" : `\n  finish="${config.finish}"`;

    return `<LightSource
  color="${config.color}"
  intensity={${config.intensity}}
  reach={${config.reach}}${finish}
>
  {/* Your app */}
</LightSource>`;
  },
});
