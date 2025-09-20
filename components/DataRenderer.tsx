// components/DataRenderer.tsx
"use client";
import React from "react";
import ChartView from "../components/ChartView";
import TableView from "../components/TableView";
import CodeBlock from "../components/CodeBlock";
import PythonExecutionResult from "../components/PythonExecutionResult";
import type { ResponseData, PythonExecutionResult as PyResult } from "../lib/types";

type Props = {
  responseData: ResponseData | null;
  pythonExecution: PyResult | null;
  executePythonCode: (code: string) => Promise<void>;
};

export default function DataRenderer({ responseData, pythonExecution, executePythonCode }: Props) {
  if (!responseData) return null;

  return (
    <div className="space-y-6">
      {responseData.chart?.x && responseData.chart?.y && (
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 animate-fade-in-up">
          <h2 className="text-xl font-bold text-white mb-4">Chart Visualization</h2>
          <ChartView data={responseData.chart} title="Dissolution Profile" xLabel="Time (min)" yLabel="% Released" />
        </div>
      )}

      {responseData.tables && responseData.tables.length > 0 && (
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 animate-fade-in-up">
          <h2 className="text-xl font-bold text-white mb-4">Data Tables</h2>
          {responseData.tables.map((table, idx) => (
            <TableView key={idx} headers={table.headers} rows={table.rows} />
          ))}
        </div>
      )}

      {responseData.code && (
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 animate-fade-in-up">
          <h2 className="text-xl font-bold text-white mb-4">Generated Code</h2>
          <CodeBlock code={responseData.code} language="python" onExecute={executePythonCode} />
        </div>
      )}

      {pythonExecution && (
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 animate-fade-in-up">
          <h2 className="text-xl font-bold text-white mb-4">Execution Results</h2>
          <PythonExecutionResult result={pythonExecution} />
        </div>
      )}

      {responseData.explanation && (
        <div className="bg-white/10 p-4 rounded-xl text-white">
          <h2 className="text-lg font-bold mb-2">Explanation</h2>
          <p className="whitespace-pre-wrap">{responseData.explanation}</p>
        </div>
      )}
    </div>
  );
}
