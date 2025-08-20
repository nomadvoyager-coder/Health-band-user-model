import React from "react";

function App() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">
          🚀 Tailwind is Working!
        </h1>
        <p className="text-gray-700 text-lg">
          If you see this styled text, Tailwind CSS is working perfectly.
        </p>
        <button className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
          Click Me
        </button>
      </div>
    </div>
  );
}

export default App;
