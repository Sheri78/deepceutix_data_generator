"use client";
import React from "react";
import { Particle } from "../hooks/useParticles";
import type { ThemeStyles } from "../lib/getThemeStyles";

type Props = {
  theme: ThemeStyles;
  particles: Particle[];
};

export default function AnimatedBackground({ theme, particles }: Props) {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className={`absolute inset-0 bg-gradient-to-br ${theme.background}`} />
      <div
        className={`absolute top-0 -left-4 w-96 h-96 bg-gradient-to-r ${theme.orb1} rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob`}
      />
      <div
        className={`absolute top-0 -right-4 w-96 h-96 bg-gradient-to-r ${theme.orb2} rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000`}
      />
      <div
        className={`absolute -bottom-8 left-20 w-96 h-96 bg-gradient-to-r ${theme.orb3} rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000`}
      />
      <div className="absolute inset-0">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute animate-float bg-white rounded-full opacity-20"
            style={{
              left: p.left,
              top: p.top,
              width: p.width,
              height: p.height,
              animationDelay: p.animationDelay,
              animationDuration: p.animationDuration,
            }}
          />
        ))}
      </div>
    </div>
  );
}
