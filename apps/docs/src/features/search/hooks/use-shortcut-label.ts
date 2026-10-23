import { useSyncExternalStore } from "react";

function subscribe() {
  return () => {};
}

function getSnapshot() {
  return /Mac|iPhone|iPad/.test(navigator.userAgent) ? "⌘K" : "Ctrl K";
}

function getServerSnapshot() {
  return "⌘K";
}

export function useShortcutLabel() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
