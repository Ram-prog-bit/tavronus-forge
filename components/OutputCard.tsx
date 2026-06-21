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
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // fallback for browsers without clipboard API
      const el = document.createElement("textarea");
      el.value = content;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    }
  };

  return (
    <div
      className="group rounded-lg border border-forge-border/60 overflow-hidden"
      style={{
        background: "rgba(22, 26, 32, 0.8)",
        animation: `slide-up 0.35s ease-out ${index * 0.06}s both`,
        boxShadow: "0 1px 0 rgba(255,255,255,0.03)",
      }}
    >
      {/* Card header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-forge-border/40 bg-forge-panel/40">
        <div className="flex items-center gap-2.5">
          <div className="w-1 h-4 bg-forge-blue/70 rounded-full" />
          <span className="text-xs font-medium text-forge-chrome tracking-wide uppercase forge-mono">
            {title}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded text-xs forge-mono transition-all duration-200
            text-forge-silver/60 border border-forge-border/40 hover:border-forge-blue/40 hover:text-forge-blue/80
            hover:bg-forge-blue/5 active:scale-95"
        >
          {copied ? (
            <>
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Copied
            </>
          ) : (
            <>
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                <rect x="4" y="1" width="7" height="8" rx="1" stroke="currentColor" strokeWidth="1.2" />
                <path d="M1 4h2v7h7v-2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
              Copy
            </>
          )}
        </button>
      </div>

      {/* Card body */}
      <div className="px-4 py-3">
        <pre className="text-sm text-forge-silver/90 forge-mono whitespace-pre-wrap leading-relaxed break-words">
          {content}
        </pre>
      </div>
    </div>
  );
}
