// components/HeaderHero.tsx
"use client";
import React from "react";
import type { ThemeStyles } from "../lib/getThemeStyles";

export default function HeaderHero({ theme }: { theme: ThemeStyles }) {
  return (
    <div className="text-center space-y-4 animate-fade-in">
      <h1
        className={`text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${theme.title} drop-shadow-lg`}
      >
        DeepCeutix
      </h1>
      <p className={`text-xl md:text-2xl ${theme.text} font-light tracking-wide`}>
        AI-Powered Scientific Data Generation
      </p>
      <div className={`h-1 w-32 bg-gradient-to-r ${theme.accent} rounded-full mx-auto animate-pulse`} />
    </div>
  );
}
