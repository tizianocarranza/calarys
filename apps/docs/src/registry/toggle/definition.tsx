import { defineComponent } from "../../features/playground/types/playground";

import { ToggleDemo } from "./toggle-demo";

export type ToggleConfig = {
  disabled: boolean;
  activeColor: string;
  inactiveColor: string;
  thumbColor: string;
  shadow: boolean;
  size: "sm" | "md" | "lg";
};

export const toggleDefinition = defineComponent<ToggleConfig>({
  id: "toggle",

  name: "Toggle",

  description:
    "An accessible toggle switch with smooth transitions and customizable colors and sizes.",

  version: "0.1.0",

  category: "controls",

  tags: ["toggle", "switch", "interaction", "form"],

  defaultConfig: {
    disabled: false,
    activeColor: "#181714",
    inactiveColor: "#d8d6d1",
    thumbColor: "#ffffff",
    shadow: false,
    size: "md",
  },

  controls: [
    {
      key: "disabled",
      label: "Disabled",
      type: "toggle",
    },
    {
      key: "activeColor",
      label: "Active color",
      type: "color",
    },
    {
      key: "inactiveColor",
      label: "Inactive color",
      type: "color",
    },
    {
      key: "thumbColor",
      label: "Thumb color",
      type: "color",
    },
    {
      key: "shadow",
      label: "Shadow",
      type: "toggle",
    },
    {
      key: "size",
      label: "Size",
      type: "select",
      options: [
        {
          label: "Small",
          value: "sm",
        },
        {
          label: "Medium",
          value: "md",
        },
        {
          label: "Large",
          value: "lg",
        },
      ],
    },
  ],

  render: (config) => <ToggleDemo {...config} />,

  generateCode: (config) => {
    return `<Toggle
  disabled={${config.disabled}}
  activeColor="${config.activeColor}"
  inactiveColor="${config.inactiveColor}"
  thumbColor="${config.thumbColor}"
  shadow={${config.shadow}}
  size="${config.size}"
/>`;
  },
});
