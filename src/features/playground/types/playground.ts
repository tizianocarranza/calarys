import type { ReactNode } from "react";

export type PlaygroundValue = string | number | boolean;

export type PlaygroundConfig = Record<string, PlaygroundValue>;

type BaseControl<TConfig extends PlaygroundConfig> = {
  key: Extract<keyof TConfig, string>;
  label: string;
};

export type RangeControl<TConfig extends PlaygroundConfig> =
  BaseControl<TConfig> & {
    type: "range";
    min: number;
    max: number;
    step: number;
    suffix?: string;
  };

export type ColorControl<TConfig extends PlaygroundConfig> =
  BaseControl<TConfig> & {
    type: "color";
  };

export type ToggleControl<TConfig extends PlaygroundConfig> =
  BaseControl<TConfig> & {
    type: "toggle";
  };

export type SelectControl<TConfig extends PlaygroundConfig> =
  BaseControl<TConfig> & {
    type: "select";
    options: Array<{
      label: string;
      value: string;
    }>;
  };

export type PlaygroundControl<TConfig extends PlaygroundConfig> =
  | RangeControl<TConfig>
  | ColorControl<TConfig>
  | ToggleControl<TConfig>
  | SelectControl<TConfig>;

export function defineComponent<TConfig extends PlaygroundConfig>(
  definition: ComponentDefinition<TConfig>,
) {
  return {
    ...definition,

    renderDefault: () =>
      definition.render(definition.defaultConfig),

    renderConfig: (config: PlaygroundConfig) =>
      definition.render(config as TConfig),

    generateCodeFromConfig: (config: PlaygroundConfig) =>
      definition.generateCode(config as TConfig),
  };
}

export type ComponentCategory =
  | "buttons"
  | "cards"
  | "controls"
  | "navigation"
  | "text"
  | "effects";

export type ComponentDefinition<TConfig extends PlaygroundConfig> = {
  id: string;
  name: string;
  description: string;
  version: string;

  category: ComponentCategory;
  tags: string[];

  defaultConfig: TConfig;
  controls: PlaygroundControl<TConfig>[];

  render: (config: TConfig) => ReactNode;
  generateCode: (config: TConfig) => string;
};
