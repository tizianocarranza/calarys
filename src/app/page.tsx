import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.hero}>
      <h1 className={styles.title}>
        Designed
        <br />
        with intention.
      </h1>

      <div className={styles.explore}>
        <div className={styles.exploreLine} />

        <span className={styles.exploreLabel}>EXPLORE CALARYS</span>
      </div>
    </main>
  );
}
