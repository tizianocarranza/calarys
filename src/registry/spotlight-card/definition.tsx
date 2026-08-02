import { defineComponent } from "@/features/playground/types/playground";

import {
  SpotlightCard,
  type MarbleTexture,
} from "./spotlight-card";

import styles from "./spotlight-card.module.css";

export type SpotlightCardConfig = {
  radius: number;
  intensity: number;
  spotlightColor: string;
  backgroundColor: string;
  textColor: string;
  border: boolean;
  padding: number;
  cornerRadius: number;
  texture: MarbleTexture;
};

export const spotlightCardDefinition =
  defineComponent<SpotlightCardConfig>({
    id: "spotlight-card",

    name: "Spotlight Card",

    description:
      "A marble-textured card with a dynamic spotlight that follows the cursor.",

    version: "0.1.0",

    category: "cards",

    tags: [
      "cursor",
      "spotlight",
      "marble",
      "interaction",
    ],

    defaultConfig: {
      radius: 200,
      intensity: 0.65,
      spotlightColor: "#fff3c4",
      backgroundColor: "#eceae6",
      textColor: "#181714",
      border: true,
      padding: 32,
      cornerRadius: 24,
      texture: "ivory",
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
        key: "texture",
        label: "Marble texture",
        type: "select",
        options: [
          {
            label: "Ivory",
            value: "ivory",
          },
          {
            label: "White",
            value: "white",
          },
          {
            label: "Dark",
            value: "dark",
          },
          {
            label: "None",
            value: "none",
          },
        ],
      },
      {
        key: "border",
        label: "Border",
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

    render: (config) => (
      <SpotlightCard {...config}>
        <div className={styles.demoHeader}>
          <span className={styles.badge}>Premium</span>

          <span className={styles.arrow} aria-hidden="true">
            ↗
          </span>
        </div>

        <div className={styles.demoBody}>
          <h3>
            Timeless design,
            <br />
            modern <em>performance.</em>
          </h3>

          <p>
            Beautiful, interactive components crafted with
            attention to detail and built to elevate your
            projects.
          </p>

          <span className={styles.cta}>
            Explore components
            <span aria-hidden="true">→</span>
          </span>
        </div>
      </SpotlightCard>
    ),

    generateCode: (config) => {
      return `<SpotlightCard
  radius={${config.radius}}
  intensity={${config.intensity}}
  spotlightColor="${config.spotlightColor}"
  backgroundColor="${config.backgroundColor}"
  textColor="${config.textColor}"
  texture="${config.texture}"
  border={${config.border}}
  padding={${config.padding}}
  cornerRadius={${config.cornerRadius}}
>
  {/* Your content */}
</SpotlightCard>`;
    },
  });