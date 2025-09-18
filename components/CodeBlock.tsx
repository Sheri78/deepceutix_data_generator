"use client";
import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { Card } from "@/components/ui/card";

interface CodeBlockProps {
  code: string;
  language?: string;
}

export default function CodeBlock({ code, language = "python" }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      setCopied(false);
    }
  };

  return (
    <Card className="bg-black/70 border border-white/20 rounded-2xl my-6 relative">
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 z-10 px-3 py-1 text-xs rounded bg-white/10 hover:bg-white/20 border border-white/20 text-white transition"
        aria-label="Copy code"
        type="button"
      >
        {copied ? "Copied!" : "Copy"}
      </button>
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
