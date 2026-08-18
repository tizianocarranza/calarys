"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import styles from "./navbar.module.css";

export function Navbar() {
  const pathname = usePathname();
  const isLanding = pathname === "/";

  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { label: "Components", href: "/components" },
    { label: "Collections", href: "/collections" },
    { label: "Journal", href: "/journal" },
    { label: "GitHub ↗", href: "https://github.com" },
  ];

  const handleMenuClick = () => {
    setMenuOpen((current) => !current);
  };

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <nav
      className={styles.navbar}
      data-variant={isLanding ? "landing" : "default"}
      data-menu-open={menuOpen}
    >
      <div className={styles.inner}>
        <Link href="/" className={styles.logo} onClick={handleLinkClick}>
          CALARYS
        </Link>

        <div className={styles.links}>
          {links.map(({ label, href }) => (
            <Link href={href} key={label}>
              {label}
            </Link>
          ))}
        </div>

        <button className={styles.search} type="button">
          <span>Search</span>
          <kbd className={styles.kbd}>⌘K</kbd>
        </button>

        <button
          className={styles.menuButton}
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={handleMenuClick}
        >
          <span />
          <span />
        </button>

        <div
          className={styles.menu}
          data-open={menuOpen}
          aria-hidden={!menuOpen}
        >
          <div className={styles.menuInner}>
            <div className={styles.menuLinks}>
              {links.map(({ label, href }, index) => (
                <Link
                  href={href}
                  key={label}
                  onClick={handleLinkClick}
                  style={{ "--index": index } as React.CSSProperties}
                >
                  {label}
                </Link>
              ))}
            </div>

            <div className={styles.menuFooter}>
              <span>Designed with intention.</span>
              <span>© 2026</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
