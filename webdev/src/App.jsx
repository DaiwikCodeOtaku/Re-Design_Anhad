import { useState } from "react";
import App1 from "./App1";
import App2 from "./App2";
import App3 from "./App3";

function App() {
  const [view, setView] = useState(1);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6">
      
      {/* 🔹 Switch Buttons */}
      <div className="flex gap-4">
        <button
          onClick={() => setView(1)}
          className={`px-4 py-2 rounded-xl ${view === 1 ? "bg-black text-white" : "bg-gray-200"}`}
        >
          App 1
        </button>

        <button
          onClick={() => setView(2)}
          className={`px-4 py-2 rounded-xl ${view === 2 ? "bg-black text-white" : "bg-gray-200"}`}
        >
          App 2
        </button>

        <button
          onClick={() => setView(3)}
          className={`px-4 py-2 rounded-xl ${view === 3 ? "bg-black text-white" : "bg-gray-200"}`}
        >
          App 3
        </button>
      </div>

      {/* 🔹 Render Selected App */}
      <div className="w-full flex justify-center">
        {view === 1 && <App1 />}
        {view === 2 && <App2 />}
        {view === 3 && <App3 />}
      </div>
    </div>
  );
}

export default App;
