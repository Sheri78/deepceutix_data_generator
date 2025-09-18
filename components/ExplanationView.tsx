"use client";
import { Card } from "@/components/ui/card";

export default function ExplanationView({ text }: { text: string }) {
  return (
    <Card className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 my-6">
      <h3 className="text-xl font-semibold text-white mb-3">Explanation</h3>
      <p className="text-gray-200 whitespace-pre-line leading-relaxed">{text}</p>
    </Card>
  );
}
