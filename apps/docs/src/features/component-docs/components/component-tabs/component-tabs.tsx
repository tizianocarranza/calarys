"use client";

import {
  type KeyboardEvent,
  type ReactNode,
  useId,
  useRef,
  useState,
} from "react";

import styles from "./component-tabs.module.css";

type ComponentTabsProps = {
  preview: ReactNode;
  code: ReactNode;
  usage: ReactNode;
};

const tabs = [
  { key: "preview", label: "Preview" },
  { key: "code", label: "Code" },
  { key: "usage", label: "Usage" },
] as const;

type TabKey = (typeof tabs)[number]["key"];

export function ComponentTabs({ preview, code, usage }: ComponentTabsProps) {
  const id = useId();
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const [activeTab, setActiveTab] = useState<TabKey>("preview");

  const panels: Record<TabKey, ReactNode> = { preview, code, usage };

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const currentIndex = tabs.findIndex((tab) => tab.key === activeTab);

    let nextIndex = currentIndex;

    if (event.key === "ArrowRight") nextIndex = currentIndex + 1;
    if (event.key === "ArrowLeft") nextIndex = currentIndex - 1;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = tabs.length - 1;

    if (nextIndex === currentIndex) return;

    event.preventDefault();

    nextIndex = (nextIndex + tabs.length) % tabs.length;

    setActiveTab(tabs[nextIndex].key);
    tabRefs.current[nextIndex]?.focus();
  }

  return (
    <>
      <div
        className={styles.tabs}
        role="tablist"
        aria-label="Component sections"
        onKeyDown={handleKeyDown}
      >
        {tabs.map((tab, index) => {
          const isActive = tab.key === activeTab;

          return (
            <button
              key={tab.key}
              ref={(element) => {
                tabRefs.current[index] = element;
              }}
              id={`${id}-tab-${tab.key}`}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`${id}-panel-${tab.key}`}
              tabIndex={isActive ? 0 : -1}
              className={styles.tab}
              onClick={() => {
                setActiveTab(tab.key);
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {tabs.map((tab) => (
        <div
          key={tab.key}
          id={`${id}-panel-${tab.key}`}
          role="tabpanel"
          aria-labelledby={`${id}-tab-${tab.key}`}
          hidden={tab.key !== activeTab}
        >
          {panels[tab.key]}
        </div>
      ))}
    </>
  );
}
