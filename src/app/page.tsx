import { ComponentShowcase } from "@/shared/components";
import { MagneticButton } from "@/registry/magnetic-button";
import styles from "./page.module.css";
import {
  SpotlightCard,
  spotlightCardDefinition,
  SpotlightCardDemo,
} from "@/registry/spotlight-card";
import { ToggleDemo } from "@/registry/toggle/toggle-demo";

export default function Home() {
  return (
    <main>
      <section className={styles.hero}>
        <h1 className={styles.title}>
          Designed
          <br />
          with intention.
        </h1>

        <div className={styles.explore}>
          <div className={styles.exploreLine} />

          <span className={styles.exploreLabel}>EXPLORE CALARYS</span>
        </div>
      </section>

      <ComponentShowcase
        items={[
          
          {
            id: "magnetic-button",
            component: <MagneticButton>Explore 1</MagneticButton>,
          },
          
          {
            id: "spotlight-card",
            component: <SpotlightCardDemo border={false} shadow={true} />,
          },
         
          
          {
            id: "toggle",
            component: <><ToggleDemo size="sm" shadow={true} /> <ToggleDemo size="md"/> <ToggleDemo size="lg" shadow={true} /></>,
          }, 
        ]}
      />
    </main>
  );
}
