import { useState } from "react";

export default function InboxUI() {
  const [items, setItems] = useState([
    { id: 1, title: "Team Update", selected: false },
    { id: 2, title: "Invoice", selected: false },
    { id: 3, title: "Security Alert", selected: false },
    { id: 4, title: "Subscription", selected: false },
    { id: 5, title: "Maintenance", selected: false },
  ]);

  const [showPopup, setShowPopup] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const toggleSelect = (id) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, selected: !item.selected } : item
    ));
  };

  const deleteItems = () => {
    setItems(items.filter(item => !item.selected));
    setShowPopup(false);
  };

  const selectedCount = items.filter(i => i.selected).length;

  return (
    <div className={`h-screen flex items-center justify-center transition-all duration-500 ${darkMode ? "bg-gradient-to-br from-black via-slate-900 to-slate-800" : "bg-gradient-to-br from-gray-200 via-white to-gray-100"}`}>
      <div className={`w-[320px] h-[640px] rounded-3xl p-5 relative overflow-hidden border transition-all duration-500 ${darkMode ? "text-white bg-white/5 backdrop-blur-xl border-white/10" : "text-black bg-white border-gray-300 shadow-xl"}`}>
        {}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold tracking-wide">Inbox</h2>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="text-lg"
            >
              {darkMode ? "🌙" : "☀️"}
            </button>
            <button
              onClick={() => setShowPopup(true)}
              className="text-xl hover:scale-110 transition"
            >
              🗑️
            </button>
          </div>
        </div>

        {}
        {selectedCount > 0 && (
          <p className={`text-xs mt-1 ${darkMode ? "text-teal-400" : "text-blue-500"}`}>
            {selectedCount} selected
          </p>
        )}

        {}
        <div className="mt-4 space-y-3 overflow-y-auto h-[520px] pr-1 no-scrollbar">
          {items.map(item => (
            <div
              key={item.id}
              className={`flex justify-between items-center p-3 rounded-xl transition-all duration-300 cursor-pointer group ${
                item.selected
                  ? darkMode
                    ? "bg-teal-400/20 scale-110 shadow-xl shadow-teal-400/40"
                    : "bg-blue-200 scale-110 shadow-xl shadow-blue-300"
                  : darkMode
                  ? "bg-white/5 hover:bg-white/10 hover:shadow-xl hover:shadow-black/40"
                  : "bg-gray-100 hover:bg-gray-200 hover:shadow-lg"
              }`}
            >
              <div>
                <p className="text-sm font-semibold">{item.title}</p>
                <p className={`text-xs ${darkMode ? "text-gray-300 group-hover:text-gray-200" : "text-gray-600"}`}>
                  Sample description
                </p>
              </div>
              <input
                type="checkbox"
                checked={item.selected}
                onChange={() => toggleSelect(item.id)}
                className="accent-teal-400 w-4 h-4"
              />
            </div>
          ))}
        </div>

        {}
        {showPopup && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className={`p-6 rounded-2xl text-center w-[85%] shadow-xl border animate-fadeIn ${darkMode ? "bg-slate-900 text-white border-white/10" : "bg-white text-black border-gray-300"}`}>
              <p className="mb-4 text-sm">
                Delete {selectedCount || "selected"} items?
              </p>
              <div className="flex justify-center gap-3">
                <button
                  onClick={deleteItems}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
                >
                  Delete
                </button>
                <button
                  onClick={() => setShowPopup(false)}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.25s ease-out;
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
