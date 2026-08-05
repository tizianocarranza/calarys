import Link from "next/link";
import styles from "./navbar.module.css";

export function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>
          CALARYS
        </Link>

        <div className={styles.links}>
          <Link href="/components">Components</Link>
          <Link href="/collections">Collections</Link>
          <Link href="/journal">Journal</Link>
          <Link href="https://github.com">GitHub ↗</Link>
        </div>

        <button className={styles.search}>
          <span>Search</span>

          <kbd className={styles.kbd}>⌘K</kbd>
        </button>
      </div>
    </nav>
  );
}