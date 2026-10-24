import {
  LightSource,
  MagneticButton,
  SpotlightCard,
  Toggle,
  type LightSourceProps,
} from "@calarys/ui";

import styles from "./light-source-demo.module.css";

type LightSourceDemoProps = Omit<LightSourceProps, "children" | "finish"> & {
  finish: LightSourceProps["finish"] | "none";
};

// The three components share one light: move the pointer between them and
// watch highlights and shadows agree on where it comes from.
// With a finish the components take its materials and colors; without one
// the card keeps the warm plain look.
export function LightSourceDemo({ finish, ...props }: LightSourceDemoProps) {
  const hasFinish = finish !== "none";

  return (
    <LightSource {...props} finish={hasFinish ? finish : undefined}>
      <div className={styles.scene} data-finish={finish}>
        <SpotlightCard
          spotlightColor={hasFinish ? undefined : "#fff3c4"}
          backgroundColor={hasFinish ? undefined : "#eceae6"}
          shadow
          padding={28}
        >
          <div className={styles.card}>
            <span className={styles.label}>One light</span>

            <h3>
              Every surface,
              <br />
              the same sun.
            </h3>
          </div>
        </SpotlightCard>

        <div className={styles.controls}>
          <MagneticButton radius={110}>Follow the light</MagneticButton>

          <div className={styles.toggles}>
            <Toggle size="sm" defaultChecked />
            <Toggle />
            <Toggle size="lg" activeColor="#3a3833" defaultChecked />
          </div>
        </div>
      </div>
    </LightSource>
  );
}
