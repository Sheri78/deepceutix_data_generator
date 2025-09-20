// components/ThemeSelector.tsx
"use client";
import React from "react";

export default function ThemeSelector({ colorTheme, setColorTheme }: { colorTheme: string; setColorTheme: (s: string) => void }) {
  const options = [
    { name: "purple", colors: "from-purple-500 to-pink-500" },
    { name: "ocean", colors: "from-cyan-500 to-blue-500" },
    { name: "emerald", colors: "from-emerald-500 to-teal-500" },
    { name: "rose", colors: "from-rose-500 to-pink-500" },
    { name: "cosmic", colors: "from-indigo-500 to-purple-500" },
    { name: "pharma", colors: "from-blue-400 to-teal-300" },
  ];

  return (
    <div className="fixed bottom-8 left-8 z-50 flex flex-col gap-2 p-2 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg animate-fade-in">
      {options.map((opt) => (
        <button
          key={opt.name}
          onClick={() => setColorTheme(opt.name)}
          className={`w-8 h-8 rounded-full bg-gradient-to-r ${opt.colors} transition-all duration-300 hover:scale-110 ${
            colorTheme === opt.name ? "ring-2 ring-white ring-offset-2 ring-offset-transparent scale-110" : "hover:ring-1 hover:ring-white/50"
          }`}
          title={opt.name.charAt(0).toUpperCase() + opt.name.slice(1)}
        />
      ))}
    </div>
  );
}
