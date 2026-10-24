"use client";

import {
  type KeyboardEvent,
  type MouseEvent,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/navigation";

import type { ExplorerItem } from "@/features/explorer/types/explorer";
import { matchesSearch } from "@/features/explorer/utils/explorer-items";

import styles from "./command-palette.module.css";

type CommandPaletteProps = {
  items: ExplorerItem[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

type PaletteResult = {
  id: string;
  label: string;
  hint: string;
  href: string;
  group: "Components" | "Pages";
};

const pages: PaletteResult[] = [
  {
    id: "page-components",
    label: "Components",
    hint: "Browse the library",
    href: "/components",
    group: "Pages",
  },
  {
    id: "page-collections",
    label: "Collections",
    hint: "Coming soon",
    href: "/collections",
    group: "Pages",
  },
  {
    id: "page-journal",
    label: "Journal",
    hint: "Coming soon",
    href: "/journal",
    group: "Pages",
  },
  {
    id: "page-demo",
    label: "Demo",
    hint: "Noct, a lighting app built with Calarys",
    href: "/demo",
    group: "Pages",
  },
];

export function CommandPalette({
  items,
  open,
  onOpenChange,
}: CommandPaletteProps) {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const listboxId = useId();

  const [search, setSearch] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const componentResults: PaletteResult[] = items
    .filter((item) => matchesSearch(item, search))
    .map((item) => ({
      id: `component-${item.id}`,
      label: item.name,
      hint: item.category,
      href: `/components/${item.id}`,
      group: "Components",
    }));

  const normalizedSearch = search.trim().toLowerCase();

  const pageResults = pages.filter((page) =>
    page.label.toLowerCase().includes(normalizedSearch),
  );

  const results = [...componentResults, ...pageResults];
  const activeResult = results[activeIndex];

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
    }

    if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  useEffect(() => {
    function handleKeyDown(event: globalThis.KeyboardEvent) {
      if (event.key.toLowerCase() !== "k") return;
      if (!event.metaKey && !event.ctrlKey) return;

      event.preventDefault();
      onOpenChange(!open);
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onOpenChange]);

  function handleClose() {
    setSearch("");
    setActiveIndex(0);
    onOpenChange(false);
  }

  function selectResult(result: PaletteResult) {
    router.push(result.href);
    dialogRef.current?.close();
  }

  function handleBackdropClick(event: MouseEvent<HTMLDialogElement>) {
    if (event.target === event.currentTarget) {
      dialogRef.current?.close();
    }
  }

  function handleInputKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (results.length === 0) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((index) => (index + 1) % results.length);
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex(
        (index) => (index - 1 + results.length) % results.length,
      );
    }

    if (event.key === "Enter" && activeResult) {
      event.preventDefault();
      selectResult(activeResult);
    }
  }

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-label="Search Calarys"
      onClose={handleClose}
      onClick={handleBackdropClick}
    >
      <div className={styles.panel}>
        <input
          className={styles.input}
          type="text"
          role="combobox"
          aria-expanded="true"
          aria-controls={listboxId}
          aria-activedescendant={activeResult?.id}
          aria-autocomplete="list"
          placeholder="Search components and pages..."
          autoComplete="off"
          spellCheck={false}
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
            setActiveIndex(0);
          }}
          onKeyDown={handleInputKeyDown}
        />

        {results.length > 0 ? (
          <ul
            id={listboxId}
            className={styles.results}
            role="listbox"
            aria-label="Search results"
            data-lenis-prevent
          >
            {results.map((result, index) => {
              const showGroup =
                index === 0 || results[index - 1].group !== result.group;

              return (
                <li key={result.id} role="presentation">
                  {showGroup && (
                    <span className={styles.group} aria-hidden="true">
                      {result.group}
                    </span>
                  )}

                  <div
                    id={result.id}
                    className={styles.result}
                    role="option"
                    aria-selected={index === activeIndex}
                    onPointerMove={() => {
                      setActiveIndex(index);
                    }}
                    onClick={() => {
                      selectResult(result);
                    }}
                  >
                    <span>{result.label}</span>
                    <span className={styles.hint}>{result.hint}</span>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className={styles.empty}>No results for “{search.trim()}”.</p>
        )}

        <div className={styles.footer} aria-hidden="true">
          <span>↑↓ Navigate</span>
          <span>↵ Open</span>
          <span>Esc Close</span>
        </div>
      </div>
    </dialog>
  );
}
