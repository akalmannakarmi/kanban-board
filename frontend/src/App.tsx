import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { Board } from "./components/Board";
import { loadDataMode, saveDataMode } from "./utils/modeStorage";

export type DataMode = "local" | "backend";

function App() {
  const [mode, setMode] = useState<DataMode>(() => loadDataMode());

  useEffect(() => {
    saveDataMode(mode);
  }, [mode]);

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-stone-200 via-stone-100 to-amber-100">
      <Header
        mode={mode}
        onToggle={() =>
          setMode((m) => (m === "local" ? "backend" : "local"))
        }
      />
      <Board mode={mode} />
    </div>
  );
}

export default App;
