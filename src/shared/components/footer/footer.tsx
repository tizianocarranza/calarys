import Link from "next/link";

import styles from "./footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
        <h2 className={styles.brand} aria-label="Calarys">
          CALARYS
        </h2>

      <div className={styles.bottom}>
        <span>© 2026 CALARYS</span>

        <div className={styles.legal}>
          <Link href="/privacy">Privacy</Link>
          <span>•</span>
          <Link href="/terms">Terms</Link>
        </div>
      </div>
    </footer>
  );
}