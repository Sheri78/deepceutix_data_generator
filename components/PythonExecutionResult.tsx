"use client";
import { Card } from "@/components/ui/card";

interface PythonExecutionResultProps {
  result: {
    output?: string;
    error?: string;
    imagePath?: string;
    data?: any;
  };
}

export default function PythonExecutionResult({ result }: PythonExecutionResultProps) {
  return (
    <div className="space-y-4">
      {/* Console Output */}
      {(result.output || result.error) && (
        <Card className="bg-black/80 border border-white/20 rounded-2xl p-4">
          <h3 className="text-lg font-bold text-white mb-2">Console Output</h3>
          {result.output && (
            <pre className="text-green-400 text-sm whitespace-pre-wrap font-mono">
              {result.output}
            </pre>
          )}
          {result.error && (
            <pre className="text-red-400 text-sm whitespace-pre-wrap font-mono mt-2">
              Error: {result.error}
            </pre>
          )}
        </Card>
      )}

      {/* Generated Plot */}
      {result.imagePath && (
        <Card className="bg-white/5 border border-white/20 rounded-2xl p-4">
          <h3 className="text-lg font-bold text-white mb-2">Generated Plot</h3>
          <img 
            src={`http://localhost:3001${result.imagePath}`} 
            alt="Generated plot" 
            className="w-full rounded-lg"
            onError={(e) => {
              console.error('Failed to load image:', result.imagePath);
              e.currentTarget.style.display = 'none';
            }}
          />
        </Card>
      )}

      {/* Extracted Data */}
      {result.data && (
        <Card className="bg-white/5 border border-white/20 rounded-2xl p-4">
          <h3 className="text-lg font-bold text-white mb-2">Extracted Data</h3>
          <pre className="text-gray-300 text-sm whitespace-pre-wrap font-mono">
            {JSON.stringify(result.data, null, 2)}
          </pre>
        </Card>
      )}
    </div>
  );
}