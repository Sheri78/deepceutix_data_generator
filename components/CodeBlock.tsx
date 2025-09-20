"use client";
import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface CodeBlockProps {
  code: string;
  language?: string;
  onExecute?: (code: string) => void;
}

export default function CodeBlock({ code, language = "python", onExecute }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [executing, setExecuting] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      setCopied(false);
    }
  };

  const handleExecute = async () => {
    if (onExecute && language === "python") {
      setExecuting(true);
      await onExecute(code);
      setExecuting(false);
    }
  };

  return (
    <Card className="bg-black/70 border border-white/20 rounded-2xl my-6 relative">
      <div className="absolute top-3 right-3 z-10 flex gap-2">
        {language === "python" && onExecute && (
          <Button
            onClick={handleExecute}
            disabled={executing}
            className="px-3 py-1 text-xs rounded bg-green-600 hover:bg-green-700 border border-green-500 text-white transition"
          >
            {executing ? "Running..." : "▶ Run"}
          </Button>
        )}
        <button
          onClick={handleCopy}
          className="px-3 py-1 text-xs rounded bg-white/10 hover:bg-white/20 border border-white/20 text-white transition"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <SyntaxHighlighter
        language={language}
        style={oneDark}
        showLineNumbers
        wrapLongLines
        customStyle={{
          borderRadius: "1rem",
          padding: "1rem",
          fontSize: "0.9rem",
        }}
      >
        {code}
      </SyntaxHighlighter>
    </Card>
  );
}
