import type { DataMode } from "../App";

const STORAGE_KEY = "kanban:data_mode";

export function loadDataMode(): DataMode {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved === "backend" ? "backend" : "local";
}

export function saveDataMode(mode: DataMode): void {
  localStorage.setItem(STORAGE_KEY, mode);
}
