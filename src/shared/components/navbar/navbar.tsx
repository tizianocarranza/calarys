"use client";

import Link from "next/link";
import styles from "./navbar.module.css";
import { usePathname } from "next/navigation";

export function Navbar() {
  const pathname = usePathname();
  const isLanding = pathname === "/";

  return (
    <nav
      className={styles.navbar}
      data-variant={isLanding ? "landing" : "default"}
    >
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

        <button className={styles.menuButton} aria-label="Open menu">
          <span />
          <span />
        </button>
      </div>
    </nav>
  );
}
