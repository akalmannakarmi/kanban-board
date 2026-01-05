import { Header } from "./components/Header";
import { Board } from "./components/Board";

function App() {
  return (
    <div className="h-screen flex flex-col bg-gradient-to-b from-amber-100 via-stone-100 to-lime-200 text-slate-800">
      <Header />
      <Board />
    </div>
  );
}

export default App;
