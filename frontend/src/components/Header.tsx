import type { DataMode } from "../App";

interface Props {
  mode: DataMode;
  onToggle: () => void;
}

export function Header({ mode, onToggle }: Props) {
  const enabled = mode === "backend";

  return (
    <header className="h-20 border-b border-stone-300 bg-stone-50 grid grid-cols-3 items-center px-6">
      <div />

      <h1 className="text-4xl font-extrabold text-center text-orange-600">
        Kanban Board
      </h1>

      <div className="justify-self-end flex items-center gap-3">
        <span className="text-sm text-slate-600">
          {enabled ? "Backend mode" : "Local mode"}
        </span>

        <button
          onClick={onToggle}
          className={`relative inline-flex items-center w-12 h-6 rounded-full transition-colors ${
            enabled ? "bg-emerald-500" : "bg-stone-300"
          }`}
        >
          <span
            className={`inline-block h-5 w-5 rounded-full bg-white shadow transform transition-transform ${
              enabled ? "translate-x-6.5" : "translate-x-1"
            }`}
          />
        </button>
      </div>
    </header>
  );
}

