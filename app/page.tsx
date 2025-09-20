"use client";

import { useState, useEffect } from "react";
import ChartView from "../components/ChartView";
import TableView from "../components/TableView";
import CodeBlock from "../components/CodeBlock";
import ExplanationView from "../components/ExplanationView";
import PythonExecutionResult from "../components/PythonExecutionResult"; // Make sure this component exists
import Papa from "papaparse";
import {
  Button,
} from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [model, setModel] = useState("Gemini");
  const [responseData, setResponseData] = useState<any | null>(null); // Renamed from chartData
  const [isGenerating, setIsGenerating] = useState(false);
  const [colorTheme, setColorTheme] = useState("purple");
  const [particles, setParticles] = useState<any[]>([]);
  const [pythonExecution, setPythonExecution] = useState<{
    output?: string;
    error?: string;
    imagePath?: string;
    data?: any;
  } | null>(null);

  useEffect(() => {
    const generated = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      width: `${Math.random() * 6 + 2}px`,
      height: `${Math.random() * 6 + 2}px`,
      animationDelay: `${Math.random() * 3}s`,
      animationDuration: `${Math.random() * 3 + 2}s`,
    }));
    setParticles(generated);
  }, []);

  const getThemeStyles = () => {
    const themes = {
      purple: {
        background: "from-violet-900 via-purple-900 to-blue-900",
        orb1: "from-purple-400 to-pink-400",
        orb2: "from-yellow-400 to-orange-400", 
        orb3: "from-pink-400 to-red-400",
        title: "from-white via-purple-200 to-pink-200",
        accent: "from-purple-400 to-pink-400",
        button: "from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800",
        buttonShadow: "hover:shadow-purple-500/25",
        cardHeader: "from-purple-500/20 to-pink-500/20",
        text: "text-purple-100",
        textSecondary: "text-purple-200/70",
        focus: "focus:ring-purple-400"
      },
      ocean: {
        background: "from-slate-900 via-blue-900 to-cyan-900",
        orb1: "from-blue-400 to-cyan-400",
        orb2: "from-teal-400 to-blue-400",
        orb3: "from-cyan-400 to-indigo-400",
        title: "from-white via-cyan-200 to-blue-200",
        accent: "from-cyan-400 to-blue-400",
        button: "from-cyan-600 to-blue-700 hover:from-cyan-700 hover:to-blue-800",
        buttonShadow: "hover:shadow-cyan-500/25",
        cardHeader: "from-cyan-500/20 to-blue-500/20",
        text: "text-cyan-100",
        textSecondary: "text-cyan-200/70",
        focus: "focus:ring-cyan-400"
      },
      emerald: {
        background: "from-emerald-900 via-teal-900 to-green-900",
        orb1: "from-emerald-400 to-teal-400",
        orb2: "from-green-400 to-emerald-400",
        orb3: "from-teal-400 to-cyan-400",
        title: "from-white via-emerald-200 to-teal-200",
        accent: "from-emerald-400 to-teal-400",
        button: "from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800",
        buttonShadow: "hover:shadow-emerald-500/25",
        cardHeader: "from-emerald-500/20 to-teal-500/20",
        text: "text-emerald-100",
        textSecondary: "text-emerald-200/70",
        focus: "focus:ring-emerald-400"
      },
      rose: {
        background: "from-rose-900 via-pink-900 to-fuchsia-900",
        orb1: "from-rose-400 to-pink-400",
        orb2: "from-fuchsia-400 to-rose-400",
        orb3: "from-pink-400 to-purple-400",
        title: "from-white via-rose-200 to-pink-200",
        accent: "from-rose-400 to-pink-400",
        button: "from-rose-600 to-pink-700 hover:from-rose-700 hover:to-pink-800",
        buttonShadow: "hover:shadow-rose-500/25",
        cardHeader: "from-rose-500/20 to-pink-500/20",
        text: "text-rose-100",
        textSecondary: "text-rose-200/70",
        focus: "focus:ring-rose-400"
      },
      cosmic: {
        background: "from-indigo-900 via-purple-900 to-slate-900",
        orb1: "from-indigo-400 to-purple-400",
        orb2: "from-violet-400 to-indigo-400",
        orb3: "from-purple-400 to-slate-400",
        title: "from-white via-indigo-200 to-purple-200",
        accent: "from-indigo-400 to-purple-400",
        button: "from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800",
        buttonShadow: "hover:shadow-indigo-500/25",
        cardHeader: "from-indigo-500/20 to-purple-500/20",
        text: "text-indigo-100",
        textSecondary: "text-indigo-200/70",
        focus: "focus:ring-indigo-400"
      },
      pharma: {
        background: "from-blue-50 via-teal-100 to-white",
        orb1: "from-blue-300 to-teal-200",
        orb2: "from-green-200 to-blue-200",
        orb3: "from-teal-100 to-blue-100",
        title: "from-blue-900 via-teal-700 to-blue-600",
        accent: "from-blue-400 to-teal-400",
        button: "from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700",
        buttonShadow: "hover:shadow-blue-500/25",
        cardHeader: "from-blue-100/40 to-teal-100/40",
        text: "text-blue-900",
        textSecondary: "text-blue-800/70",
        focus: "focus:ring-blue-400"
      }
    };
    return themes[colorTheme as keyof typeof themes] || themes.purple;
  };

  const theme = getThemeStyles();

  // FIX: Define handleGenerate as an async function
  const handleGenerate = async () => {
    if (!prompt.trim()) {
      alert("Please enter a scientific prompt first!");
      return;
    }

    setIsGenerating(true);

    try {
      const res = await fetch("http://localhost:3001/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, model }),
      });

      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await res.json();
      setResponseData(data); // now data = { chart, tables, code, explanation }
    } catch (error) {
      console.error("Error generating data:", error);
      alert("Something went wrong while generating data.");
    } finally {
      setIsGenerating(false);
    }
  };

  // Updated handleExport function (Fix 4)
  const handleExport = () => {
    if (responseData?.tables && responseData.tables.length > 0) {
      const table = responseData.tables[0];
      const csv = Papa.unparse({
        fields: table.headers,
        data: table.rows,
      });
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", "table_data.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else if (responseData?.chart) {
      const csv = Papa.unparse({
        fields: ["x", "y"],
        data: responseData.chart.x.map((v: number, i: number) => [v, responseData.chart.y[i]]),
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
  };

  // Add this function
  const executePythonCode = async (code: string) => {
    try {
      const res = await fetch("http://localhost:3001/generate/execute-python", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });

      if (!res.ok) {
        throw new Error("Failed to execute Python code");
      }

      const result = await res.json();
      setPythonExecution(result);

      // If we got data from the execution, also update the chart
      if (result.data?.x && result.data?.y) {
        setResponseData((prev: any) => ({
          ...prev,
          chart: {
            x: result.data.x,
            y: result.data.y,
            label: 'Executed Code Result'
          }
        }));
      }
    } catch (error) {
      console.error("Error executing Python code:", error);
      setPythonExecution({ error: "Failed to execute Python code" });
    }
  };

  return (
    <>
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {/* Primary gradient overlay */}
        <div className={`absolute inset-0 bg-gradient-to-br ${theme.background}`} />
        
        {/* Animated gradient orbs */}
        <div className={`absolute top-0 -left-4 w-96 h-96 bg-gradient-to-r ${theme.orb1} rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob`} />
        <div className={`absolute top-0 -right-4 w-96 h-96 bg-gradient-to-r ${theme.orb2} rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000`} />
        <div className={`absolute -bottom-8 left-20 w-96 h-96 bg-gradient-to-r ${theme.orb3} rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000`} />
        
        {/* Floating particles - generated only on client */}
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

      <main className="min-h-screen p-4 md:p-8 flex items-center justify-center relative">
        <div className="w-full max-w-4xl space-y-8">
          {/* Header Section with Glass Morphism */}
          <div className="text-center space-y-4 animate-fade-in">
            <h1 className={`text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${theme.title} drop-shadow-lg`}>
              DeepCeutix
            </h1>
            <p className={`text-xl md:text-2xl ${theme.text} font-light tracking-wide`}>
              AI-Powered Scientific Data Generation
            </p>
            <div className={`h-1 w-32 bg-gradient-to-r ${theme.accent} rounded-full mx-auto animate-pulse`} />
          </div>

          {/* Main Card with Glass Morphism */}
          <Card className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-3xl overflow-hidden animate-slide-up hover:shadow-purple-500/25 transition-all duration-500 hover:scale-[1.02]">
            <CardHeader className={`bg-gradient-to-r ${theme.cardHeader} backdrop-blur-sm border-b border-white/10`}>
              <CardTitle className="text-2xl md:text-3xl font-bold text-white text-center flex items-center justify-center gap-3">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                Data Generator Studio
                <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse animation-delay-1000" />
              </CardTitle>
            </CardHeader>
            
            <CardContent className="p-6 md:p-8 space-y-8">
              {/* Prompt Input Section */}
              <div className="space-y-3 group">
                <label className={`text-lg font-semibold ${theme.text} block`}>
                  Scientific Prompt
                </label>
                <div className="relative">
                  <Textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe your pharmaceutical dissolution study parameters, drug formulation details, or experimental conditions..."
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

              {/* Controls Section */}
              <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4">
                {/* Model Selection */}
                <div className="flex-1 space-y-2">
                  <label className={`text-sm font-medium ${theme.text} block`}>
                    AI Model
                  </label>
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

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button 
                    onClick={handleGenerate} 
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
                    onClick={handleExport}
                    disabled={!responseData}
                    className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:scale-100"
                  >
                    Export CSV
                  </Button>
                </div>
              </div>

              {/* Dynamic Data Rendering Section */}
              {responseData && (
                <div className="space-y-6">
                  {/* Chart Section */}
                  {responseData.chart?.x && responseData.chart?.y && (
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 animate-fade-in-up">
                      <h2 className="text-xl font-bold text-white mb-4">Chart Visualization</h2>
                      <ChartView
                        data={responseData.chart}
                        title="Dissolution Profile"
                        xLabel="Time (min)"
                        yLabel="% Released"
                      />
                    </div>
                  )}

                  {/* Tables Section */}
                  {responseData.tables && responseData.tables.length > 0 && (
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 animate-fade-in-up">
                      <h2 className="text-xl font-bold text-white mb-4">Data Tables</h2>
                      {responseData.tables.map((table: any, idx: number) => (
                        <TableView key={idx} headers={table.headers} rows={table.rows} />
                      ))}
                    </div>
                  )}

                  {/* Code Section */}
                  {responseData.code && (
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 animate-fade-in-up">
                      <h2 className="text-xl font-bold text-white mb-4">Generated Code</h2>
                      <CodeBlock 
                        code={responseData.code} 
                        language="python" 
                        onExecute={executePythonCode}
                      />
                    </div>
                  )}

                  {/* Python Execution Results */}
                  {pythonExecution && (
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 animate-fade-in-up">
                      <h2 className="text-xl font-bold text-white mb-4">Execution Results</h2>
                      <PythonExecutionResult result={pythonExecution} />
                    </div>
                  )}

                  {/* Explanation Section */}
                  {responseData.explanation && (
                    <div className="bg-white/10 p-4 rounded-xl text-white">
                      <h2 className="text-lg font-bold mb-2">Explanation</h2>
                      <p className="whitespace-pre-wrap">{responseData.explanation}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Status Indicator */}
              <div className="flex justify-center">
                <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className={`text-sm ${theme.text} font-medium`}>
                    {responseData ? "Data Ready" : "Awaiting Generation"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className={`text-center ${theme.textSecondary} text-sm`}>
            <p>Powered by advanced AI models for pharmaceutical research</p>
          </div>
        </div>
      </main>

      {/* Color Theme Selector - bottom left, vertical */}
      <div className="fixed bottom-8 left-8 z-50 flex flex-col gap-2 p-2 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg animate-fade-in">
        {[ 
          { name: "purple", colors: "from-purple-500 to-pink-500" },
          { name: "ocean", colors: "from-cyan-500 to-blue-500" },
          { name: "emerald", colors: "from-emerald-500 to-teal-500" },
          { name: "rose", colors: "from-rose-500 to-pink-500" },
          { name: "cosmic", colors: "from-indigo-500 to-purple-500" },
          { name: "pharma", colors: "from-blue-400 to-teal-300" }, // New pharma theme
        ].map((themeOption) => (
          <button
            key={themeOption.name}
            onClick={() => setColorTheme(themeOption.name)}
            className={`w-8 h-8 rounded-full bg-gradient-to-r ${themeOption.colors} transition-all duration-300 hover:scale-110 ${
              colorTheme === themeOption.name 
                ? 'ring-2 ring-white ring-offset-2 ring-offset-transparent scale-110' 
                : 'hover:ring-1 hover:ring-white/50'
            }`}
            title={themeOption.name.charAt(0).toUpperCase() + themeOption.name.slice(1)}
          />
        ))}
      </div>

      <style jsx global>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.8s ease-out;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }

        .animation-delay-200 {
          animation-delay: 200ms;
        }

        .animation-delay-400 {
          animation-delay: 400ms;
        }

        .animation-delay-1000 {
          animation-delay: 1000ms;
        }

        .animation-delay-2000 {
          animation-delay: 2000ms;
        }

        .animation-delay-4000 {
          animation-delay: 4000ms;
        }
      `}</style>
    </>
  );
}