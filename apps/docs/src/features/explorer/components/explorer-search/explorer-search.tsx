"use client";

import {
  Children,
  type ReactNode,
  useMemo,
  useState,
} from "react";

import type { ExplorerItem } from "../../types/explorer";

import styles from "./explorer-search.module.css";

type ExplorerSearchProps = {
  items: ExplorerItem[];
  children: ReactNode;
};

export function ExplorerSearch({
  items,
  children,
}: ExplorerSearchProps) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState("all");

  const cards = Children.toArray(children);

  const categories = useMemo(() => {
    return Array.from(
      new Set(items.map((item) => item.category)),
    ).sort();
  }, [items]);

  const filteredIndexes = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return items.reduce<number[]>((indexes, item, index) => {
      const matchesCategory =
        selectedCategory === "all" ||
        item.category === selectedCategory;

      const searchableContent = [
        item.name,
        item.description,
        item.category,
        ...item.tags,
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        normalizedSearch.length === 0 ||
        searchableContent.includes(normalizedSearch);

      if (matchesCategory && matchesSearch) {
        indexes.push(index);
      }

      return indexes;
    }, []);
  }, [items, search, selectedCategory]);

  const hasActiveFilters =
    search.trim().length > 0 ||
    selectedCategory !== "all";

  function resetFilters() {
    setSearch("");
    setSelectedCategory("all");
  }

  return (
    <section
      className={styles.explorer}
      aria-label="Component explorer"
    >
      <div className={styles.toolbar}>
        <div className={styles.searchWrapper}>
          <label
            htmlFor="component-search"
            className={styles.visuallyHidden}
          >
            Search components
          </label>

          <input
            id="component-search"
            type="search"
            value={search}
            placeholder="Search components..."
            className={styles.search}
            onChange={(event) => {
              setSearch(event.target.value);
            }}
          />
        </div>

        <div
          className={styles.categories}
          aria-label="Filter components by category"
        >
          <button
            type="button"
            className={
              selectedCategory === "all"
                ? styles.activeFilter
                : styles.filter
            }
            aria-pressed={selectedCategory === "all"}
            onClick={() => {
              setSelectedCategory("all");
            }}
          >
            All
          </button>

          {categories.map((category) => {
            const isActive =
              selectedCategory === category;

            return (
              <button
                key={category}
                type="button"
                className={
                  isActive
                    ? styles.activeFilter
                    : styles.filter
                }
                aria-pressed={isActive}
                onClick={() => {
                  setSelectedCategory(category);
                }}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>

      <div className={styles.resultsHeader}>
        <p aria-live="polite">
          {filteredIndexes.length}{" "}
          {filteredIndexes.length === 1
            ? "component"
            : "components"}
        </p>

        {hasActiveFilters && (
          <button
            type="button"
            className={styles.clearButton}
            onClick={resetFilters}
          >
            Clear filters
          </button>
        )}
      </div>

      {filteredIndexes.length > 0 ? (
        <div
          className={styles.grid}
          aria-label="Available components"
        >
          {filteredIndexes.map((index) => cards[index])}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <span>No results</span>

          <h2>No components found.</h2>

          <p>
            Try another search term or remove the selected
            category.
          </p>

          <button
            type="button"
            onClick={resetFilters}
          >
            Reset filters
          </button>
        </div>
      )}
    </section>
  );
}