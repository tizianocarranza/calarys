import { defineComponent } from "../../features/playground/types/playground";

import { LightSourceDemo } from "./light-source-demo";

export type LightSourceConfig = {
  color: string;
  intensity: number;
  reach: number;
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
  ],

  defaultConfig: {
    color: "#ffffff",
    intensity: 0.6,
    reach: 480,
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
  ],

  render: (config) => <LightSourceDemo {...config} />,

  generateCode: (config) => {
    return `<LightSource
  color="${config.color}"
  intensity={${config.intensity}}
  reach={${config.reach}}
>
  {/* Your app */}
</LightSource>`;
  },
});
