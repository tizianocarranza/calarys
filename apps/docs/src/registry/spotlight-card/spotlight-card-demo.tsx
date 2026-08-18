import { SpotlightCard, SpotlightCardProps } from "@calarys/ui";
import styles from "./spotlight-card-demo.module.css";

type SpotlightCardDemoProps = Omit<SpotlightCardProps, "children">;

export function SpotlightCardDemo(props: SpotlightCardDemoProps) {
  return (
    <SpotlightCard {...props}>
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
          Beautiful, interactive components crafted with attention to detail and
          built to elevate your projects.
        </p>

        <span className={styles.cta}>
          Explore components
          <span aria-hidden="true">→</span>
        </span>
      </div>
    </SpotlightCard>
  );
}
