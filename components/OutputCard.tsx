"use client";

import { useState } from "react";

interface OutputCardProps {
  title: string;
  content: string;
  index: number;
}

export default function OutputCard({ title, content, index }: OutputCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      const el = document.createElement("textarea");
      el.value = content;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    }
  };

  return (
    <div
      className="group rounded border border-forge-border/25 overflow-hidden"
      style={{
        background: "rgba(13, 15, 18, 0.7)",
        animation: `slide-up 0.3s ease-out ${index * 0.05}s both`,
      }}
    >
      {/* Card header */}
      <div className="flex items-center justify-between px-3 py-1.5 border-b border-forge-border/20 bg-forge-panel/20">
        <div className="flex items-center gap-2">
          <div className="w-0.5 h-3 bg-forge-blue/50 rounded-full" />
          <span className="text-[10px] font-medium text-forge-chrome/70 tracking-wider uppercase forge-mono">
            {title}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className={`
            flex items-center gap-1 px-2 py-0.5 rounded text-[10px] forge-mono transition-all duration-150
            ${copied
              ? "text-green-400/70 border border-green-500/20"
              : "text-forge-muted/40 border border-transparent hover:border-forge-border/40 hover:text-forge-silver/60"}
          `}
        >
          {copied ? (
            <>
              <svg width="9" height="9" viewBox="0 0 12 12" fill="none">
                <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Copied
            </>
          ) : (
            <>
              <svg width="9" height="9" viewBox="0 0 12 12" fill="none">
                <rect x="4" y="1" width="7" height="8" rx="1" stroke="currentColor" strokeWidth="1.2" />
                <path d="M1 4h2v7h7v-2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
              Copy
            </>
          )}
        </button>
      </div>

      {/* Card body */}
      <div className="px-3 py-2.5">
        <pre className="text-[12px] text-forge-silver/75 forge-mono whitespace-pre-wrap leading-relaxed break-words">
          {content}
        </pre>
      </div>
    </div>
  );
}
