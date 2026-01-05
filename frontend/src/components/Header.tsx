import { useState } from "react";

export function Header() {
  const [syncEnabled, setSyncEnabled] = useState(false);

  return (
    <header className="h-20 border-b border-stone-300 bg-stone-50 grid grid-cols-3 items-center px-6">
      <div />

      <h1 className="text-4xl font-extrabold text-center text-orange-600 tracking-wide">
        Kanban Board
      </h1>

      <div className="justify-self-end flex items-center gap-3">
        <span className="text-sm text-slate-600">Sync backend</span>

        <button
          onClick={() => setSyncEnabled((v) => !v)}
          className={`relative w-11 h-6 rounded-full transition-colors ${
            syncEnabled ? "bg-emerald-500" : "bg-stone-300"
          }`}
        >
          <span
            className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
              syncEnabled ? "translate-x-5" : "translate-x-0.5"
            }`}
          />
        </button>
      </div>
    </header>
  );
}

