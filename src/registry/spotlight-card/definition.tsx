import { defineComponent } from "@/features/playground/types/playground";

import { SpotlightCard } from "./spotlight-card";

import styles from "./spotlight-card.module.css";
import { SpotlightCardDemo } from "./spotlight-card-demo";

export type SpotlightCardConfig = {
  radius: number;
  intensity: number;
  spotlightColor: string;
  backgroundColor: string;
  textColor: string;
  border: boolean;
  shadow: boolean;
  padding: number;
  cornerRadius: number;
};

export const spotlightCardDefinition = defineComponent<SpotlightCardConfig>({
  id: "spotlight-card",

  name: "Spotlight Card",

  description:
    "A marble-textured card with a dynamic spotlight that follows the cursor.",

  version: "0.1.0",

  category: "cards",

  tags: ["cursor", "spotlight", "marble", "interaction"],

  defaultConfig: {
    radius: 200,
    intensity: 0.65,
    spotlightColor: "#fff3c4",
    backgroundColor: "#eceae6",
    textColor: "#181714",
    border: true,
    shadow: true,
    padding: 32,
    cornerRadius: 24,
  },

  controls: [
    {
      key: "radius",
      label: "Radius",
      type: "range",
      min: 80,
      max: 400,
      step: 10,
      suffix: "px",
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
      key: "spotlightColor",
      label: "Spotlight color",
      type: "color",
    },
    {
      key: "backgroundColor",
      label: "Background",
      type: "color",
    },
    {
      key: "textColor",
      label: "Text",
      type: "color",
    },
    {
      key: "border",
      label: "Border",
      type: "toggle",
    },
    {
      key: "shadow",
      label: "Shadow",
      type: "toggle",
    },
    {
      key: "padding",
      label: "Padding",
      type: "range",
      min: 16,
      max: 64,
      step: 4,
      suffix: "px",
    },
    {
      key: "cornerRadius",
      label: "Corner radius",
      type: "range",
      min: 0,
      max: 48,
      step: 2,
      suffix: "px",
    },
  ],

  render: (config) => <SpotlightCardDemo {...config} />,

  generateCode: (config) => {
    return `<SpotlightCard
  radius={${config.radius}}
  intensity={${config.intensity}}
  spotlightColor="${config.spotlightColor}"
  backgroundColor="${config.backgroundColor}"
  textColor="${config.textColor}"
  border={${config.border}}
  shadow={${config.shadow}}
  padding={${config.padding}}
  cornerRadius={${config.cornerRadius}}
>
  {/* Your content */}
</SpotlightCard>`;
  },
});
