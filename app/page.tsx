"use client";
import { useState } from "react";
import ChartView from "../components/ChartView";
import TableView from "../components/TableView";
import CodeBlock from "../components/CodeBlock";
import ExplanationView from "../components/ExplanationView";
import PythonExecutionResult from "../components/PythonExecutionResult";
import Papa from "papaparse";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

import useParticles from "../hooks/useParticles";
import getThemeStyles from "../lib/getThemeStyles";
import { generateDataApi, executePythonApi } from "../lib/api";
import type { ResponseData, PythonExecutionResult as PyResult } from "../lib/types";

import AnimatedBackground from "../components/AnimatedBackground";
import HeaderHero from "../components/HeaderHero";
import PromptControls from "../components/PromptControls";
import DataRenderer from "../components/DataRenderer";
import ThemeSelector from "../components/ThemeSelector";
import GlobalStyles from "../components/GlobalStyles";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [model, setModel] = useState("Gemini");
  const [responseData, setResponseData] = useState<ResponseData | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [colorTheme, setColorTheme] = useState("purple");
  const [pythonExecution, setPythonExecution] = useState<PyResult | null>(null);

  const particles = useParticles(20);
  const theme = getThemeStyles(colorTheme);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      alert("Please enter a scientific prompt first!");
      return;
    }
    setIsGenerating(true);
    try {
      const data = await generateDataApi(prompt, model);
      setResponseData(data);
    } catch (err) {
      console.error("Error generating data:", err);
      alert("Something went wrong while generating data.");
    } finally {
      setIsGenerating(false);
    }
  };

  const executePythonCode = async (code: string) => {
    try {
      const result = await executePythonApi(code);
      setPythonExecution(result);
      if (result.data?.x && result.data?.y) {
        setResponseData((prev) => ({
          ...prev,
          chart: { x: result.data.x, y: result.data.y, label: "Executed Code Result" },
        }));
      }
    } catch (err) {
      console.error("Error executing Python code:", err);
      setPythonExecution({ error: "Failed to execute Python code" });
    }
  };

  const handleExport = () => {
    if (!responseData) return;
    if (responseData.tables && responseData.tables.length > 0) {
      const table = responseData.tables[0];
      const csv = Papa.unparse({ fields: table.headers, data: table.rows });
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", "table_data.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else if (responseData.chart) {
      if (responseData.chart && responseData.chart.x && responseData.chart.y) {
        const csv = Papa.unparse({
          fields: ["x", "y"],
          data: responseData.chart.x.map((v, i) => [v, responseData.chart!.y[i]]),
        });
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", `${responseData.chart.label || "chart"}_data.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  };

  return (
    <>
      <GlobalStyles />
      <AnimatedBackground theme={theme} particles={particles} />
      <main className="min-h-screen p-4 md:p-8 flex items-center justify-center relative">
        <div className="w-full max-w-4xl space-y-8">
          <HeaderHero theme={theme} />

          <Card className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-3xl overflow-hidden animate-slide-up hover:shadow-purple-500/25 transition-all duration-500 hover:scale-[1.02]">
            <CardHeader className={`bg-gradient-to-r ${theme.cardHeader} backdrop-blur-sm border-b border-white/10`}>
              <CardTitle className="text-2xl md:text-3xl font-bold text-white text-center flex items-center justify-center gap-3">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                Data Generator Studio
                <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse animation-delay-1000" />
              </CardTitle>
            </CardHeader>

            <CardContent className="p-6 md:p-8 space-y-8">
              <PromptControls
                prompt={prompt}
                setPrompt={setPrompt}
                model={model}
                setModel={setModel}
                isGenerating={isGenerating}
                onGenerate={handleGenerate}
                onExport={handleExport}
                theme={theme}
              />

              <div className="flex justify-center">
                <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className={`text-sm ${theme.text} font-medium`}>{responseData ? "Data Ready" : "Awaiting Generation"}</span>
                </div>
              </div>

              {responseData && (
                <DataRenderer responseData={responseData} pythonExecution={pythonExecution} executePythonCode={executePythonCode} />
              )}
            </CardContent>
          </Card>

          <div className={`text-center ${theme.textSecondary} text-sm`}>
            <p>Powered by advanced AI models for pharmaceutical research</p>
          </div>
        </div>
      </main>

      <ThemeSelector colorTheme={colorTheme} setColorTheme={setColorTheme} />
    </>
  );
}
