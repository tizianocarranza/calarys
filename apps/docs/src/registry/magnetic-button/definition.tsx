import { defineComponent } from "../../features/playground/types/playground";

import { MagneticButton } from "@calarys/ui"

export type MagneticButtonConfig = {
  label: string;
  radius: number;
  strength: number;
  duration: number;
  backgroundColor: string;
  textColor: string;
};

export const magneticButtonDefinition = defineComponent<MagneticButtonConfig>({
  id: "magnetic-button",

  name: "Magnetic Button",

  description: "A subtle magnetic interaction that follows the cursor.",

  version: "0.1.0",

  exportName: "MagneticButton",

  category: "buttons",
  tags: ["interaction", "cursor", "motion"],

  props: [
    {
      name: "children",
      type: "string",
      defaultValue: '"Magnetic Button"',
      description: "Button label.",
    },
    {
      name: "radius",
      type: "number",
      defaultValue: "140",
      description: "Attraction radius in px.",
    },
    {
      name: "strength",
      type: "number",
      defaultValue: "0.35",
      description: "Fraction of the pointer distance the button follows (0–1).",
    },
    {
      name: "duration",
      type: "number",
      defaultValue: "250",
      description: "Transition duration in ms.",
    },
    {
      name: "backgroundColor",
      type: "string",
      defaultValue: '"#111111"',
      description: "Button background.",
    },
    {
      name: "textColor",
      type: "string",
      defaultValue: '"#ffffff"',
      description: "Label color.",
    },
  ],

  defaultConfig: {
    label: "Magnetic Button",
    radius: 140,
    strength: 0.35,
    duration: 250,
    backgroundColor: "#111111",
    textColor: "#ffffff",
  },

  controls: [
    {
      key: "radius",
      label: "Radius",
      type: "range",
      min: 40,
      max: 300,
      step: 10,
      suffix: "px",
    },
    {
      key: "strength",
      label: "Strength",
      type: "range",
      min: 0,
      max: 1,
      step: 0.05,
    },
    {
      key: "duration",
      label: "Duration",
      type: "range",
      min: 50,
      max: 800,
      step: 25,
      suffix: "ms",
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
  ],

  render: (config) => (
    <MagneticButton
      radius={config.radius}
      strength={config.strength}
      duration={config.duration}
      backgroundColor={config.backgroundColor}
      textColor={config.textColor}
    >
      {config.label}
    </MagneticButton>
  ),

  generateCode: (config) => {
    return `<MagneticButton
  radius={${config.radius}}
  strength={${config.strength}}
  duration={${config.duration}}
  backgroundColor="${config.backgroundColor}"
  textColor="${config.textColor}"
>
  ${config.label}
</MagneticButton>`;
  },
});
