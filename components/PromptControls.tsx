// components/PromptControls.tsx
"use client";
import React from "react";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import type { ThemeStyles } from "../lib/getThemeStyles";

type Props = {
  prompt: string;
  setPrompt: (v: string) => void;
  model: string;
  setModel: (v: string) => void;
  isGenerating: boolean;
  onGenerate: () => Promise<void>;
  onExport: () => void;
  theme: ThemeStyles;
};

export default function PromptControls({
  prompt,
  setPrompt,
  model,
  setModel,
  isGenerating,
  onGenerate,
  onExport,
  theme,
}: Props) {
  return (
    <div>
      <div className="space-y-3 group">
        <label className={`text-lg font-semibold ${theme.text} block`}>Scientific Prompt</label>
        <div className="relative">
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe your pharmaceutical dissolution study parameters..."
            className={`resize-none min-h-[120px] bg-white/10 border border-white/20 text-white placeholder:${theme.textSecondary} backdrop-blur-sm rounded-2xl ${theme.focus} focus:border-transparent transition-all duration-300 group-hover:bg-white/15`}
          />
          <div className="absolute bottom-3 right-3 opacity-50">
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce animation-delay-200" />
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce animation-delay-400" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 mt-4">
        <div className="flex-1 space-y-2">
          <label className={`text-sm font-medium ${theme.text} block`}>AI Model</label>
          <Select onValueChange={setModel} defaultValue={model}>
            <SelectTrigger className="bg-white/10 border border-white/20 text-white backdrop-blur-sm rounded-xl hover:bg-white/15 transition-all duration-300">
              <SelectValue placeholder="Select AI model" />
            </SelectTrigger>
            <SelectContent className="bg-purple-900/90 backdrop-blur-xl border border-white/20 rounded-xl">
              <SelectItem value="Gemini" className="text-white hover:bg-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full" />
                  Gemini
                </div>
              </SelectItem>
              <SelectItem value="DeepSeek" className="text-white hover:bg-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full" />
                  DeepSeek
                </div>
              </SelectItem>
              <SelectItem value="Llama" className="text-white hover:bg-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-orange-400 rounded-full" />
                  Llama 3.3
                </div>
              </SelectItem>
              <SelectItem value="qwen2.5" className="text-white hover:bg-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-orange-400 rounded-full" />
                  QWEN2.5
                </div>
              </SelectItem>
              <SelectItem value="gpt-oss-20b" className="text-white hover:bg-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-orange-400 rounded-full" />
                  GPT-OSS
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-3 items-center">
          <Button
            onClick={onGenerate}
            disabled={isGenerating}
            className={`bg-gradient-to-r ${theme.button} text-white font-semibold px-8 py-3 rounded-xl shadow-lg ${theme.buttonShadow} transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:scale-100`}
          >
            {isGenerating ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Generating...
              </div>
            ) : (
              "Generate Data"
            )}
          </Button>

          <Button
            onClick={onExport}
            className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:scale-100"
          >
            Export CSV
          </Button>
        </div>
      </div>
    </div>
  );
}
