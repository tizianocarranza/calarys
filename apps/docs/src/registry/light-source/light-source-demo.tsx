import {
  LightSource,
  MagneticButton,
  SpotlightCard,
  Toggle,
  type LightSourceProps,
} from "@calarys/ui";

import styles from "./light-source-demo.module.css";

type LightSourceDemoProps = Omit<LightSourceProps, "children">;

// The three components share one light: move the pointer between them and
// watch highlights and shadows agree on where it comes from.
export function LightSourceDemo(props: LightSourceDemoProps) {
  return (
    <LightSource {...props}>
      <div className={styles.scene}>
        <SpotlightCard
          spotlightColor="#fff3c4"
          backgroundColor="#eceae6"
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
