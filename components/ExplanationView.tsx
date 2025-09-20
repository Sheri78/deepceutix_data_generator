"use client";
import { useState } from "react";
import { Card } from "@/components/ui/card";

export default function ExplanationView({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      setCopied(false);
    }
  };

  return (
    <Card className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 my-6 relative">
      <div className="absolute top-3 right-3 z-10">
        <button
          onClick={handleCopy}
          className="px-3 py-1 text-xs rounded bg-white/10 hover:bg-white/20 border border-white/20 text-white transition"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <h3 className="text-xl font-semibold text-white mb-3">Explanation</h3>
      <p className="text-gray-200 whitespace-pre-line leading-relaxed">{text}</p>
    </Card>
  );
}
