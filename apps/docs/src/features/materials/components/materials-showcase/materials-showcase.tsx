"use client";

import {
  LightSource,
  MagneticButton,
  SpotlightCard,
  Toggle,
  type LightSourceFinish,
} from "@calarys/ui";

import styles from "./materials-showcase.module.css";

const rules = [
  {
    role: "Surface",
    material: "Matte",
    rule: "What you look at absorbs light and stays back: a wide, soft sheen over a fine grain.",
    parts: "Card faces, toggle tracks",
  },
  {
    role: "Touch",
    material: "Gloss",
    rule: "What you press or move catches the light and invites the hand: a clearcoat and a tight highlight.",
    parts: "Buttons, toggle thumbs",
  },
  {
    role: "Structure",
    material: "Metal",
    rule: "What frames and holds is precise: a thin ring whose shine always faces the light.",
    parts: "Card and button edges",
  },
  {
    role: "Active",
    material: "Emission",
    rule: "What is on is not a material at all: it gives off its own light.",
    parts: "A toggle that is on",
  },
];

const finishes: Array<{
  id: LightSourceFinish;
  name: string;
  description: string;
}> = [
  {
    id: "onyx",
    name: "Onyx",
    description: "Matte black, polished graphite, dark steel, a warm LED.",
  },
  {
    id: "ivory",
    name: "Ivory",
    description: "Ivory ceramic, black lacquer, brass, an amber LED.",
  },
];

// Colors stay free: the same materials hold on any color.
const swatches = [
  { name: "Finish color" },
  { name: "Oxblood", background: "#4a1c22", text: "#f2e6e3" },
  { name: "Forest", background: "#1f3329", text: "#e3eee7" },
];

export function MaterialsShowcase() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <span className={styles.eyebrow}>Foundations</span>

        <h1 className={styles.title}>Materials</h1>

        <p className={styles.lead}>
          Calarys never asks which material you like. Each part of a component
          has a role, and the role decides the material. You choose a finish
          for the whole system; colors stay yours.
        </p>
      </header>

      <ol className={styles.rules}>
        {rules.map((rule) => (
          <li key={rule.role} className={styles.rule}>
            <span className={styles.ruleRole}>{rule.role}</span>
            <span className={styles.ruleMaterial}>{rule.material}</span>
            <p className={styles.ruleText}>{rule.rule}</p>
            <span className={styles.ruleParts}>{rule.parts}</span>
          </li>
        ))}
      </ol>

      {finishes.map((finish) => (
        <LightSource
          key={finish.id}
          finish={finish.id}
          intensity={finish.id === "onyx" ? 0.4 : 0.6}
        >
          <section
            className={styles.finish}
            data-finish={finish.id}
            aria-labelledby={`finish-${finish.id}`}
          >
            <div className={styles.finishHeader}>
              <h2 id={`finish-${finish.id}`} className={styles.finishName}>
                {finish.name}
              </h2>

              <p className={styles.finishDescription}>{finish.description}</p>
            </div>

            <div className={styles.grid}>
              {swatches.map((swatch) => (
                <SpotlightCard
                  key={swatch.name}
                  padding={24}
                  cornerRadius={20}
                  intensity={0.35}
                  backgroundColor={swatch.background}
                  textColor={swatch.text}
                >
                  <div className={styles.swatch}>
                    <span className={styles.swatchLabel}>{swatch.name}</span>

                    <div className={styles.swatchToggles}>
                      <Toggle
                        defaultChecked
                        aria-label={`${finish.name} ${swatch.name} toggle on`}
                      />
                      <Toggle
                        aria-label={`${finish.name} ${swatch.name} toggle off`}
                      />
                    </div>
                  </div>
                </SpotlightCard>
              ))}
            </div>

            <div className={styles.buttons}>
              <MagneticButton radius={90}>{`Gloss on ${finish.name}`}</MagneticButton>
            </div>
          </section>
        </LightSource>
      ))}
    </div>
  );
}
