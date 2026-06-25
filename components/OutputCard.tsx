"use client";

import { useState, memo } from "react";

interface OutputCardProps {
  title: string;
  index: number;
  label?: string;
  body?: string[];
  code?: string;
  /** Legacy single-string body (used by ForgeCommandCenter). */
  content?: string;
  /** When provided, shows an "Apply to File" action (passes the card title). */
  onApply?: (title: string) => void;
  applyDisabled?: boolean;
  applyHint?: string;
}

function OutputCard({ title, index, label, body, code, content, onApply, applyDisabled, applyHint }: OutputCardProps) {
  const [copied, setCopied] = useState(false);

  const copyText = body
    ? body.join("\n") + (code ? `\n\n${code}` : "")
    : content ?? "";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(copyText);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      const el = document.createElement("textarea");
      el.value = copyText;
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
      className="group forge-card-raised rounded border border-forge-border/30 hover:border-forge-border/45 transition-colors overflow-hidden"
      style={{
        background: "rgba(13, 15, 18, 0.7)",
        animation: `slide-up 0.3s ease-out ${index * 0.05}s both`,
      }}
    >
      {/* Card header */}
      <div className="flex items-center justify-between px-3 py-1.5 border-b border-forge-border/30 bg-forge-panel/25">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-0.5 h-3 bg-forge-blue/50 rounded-full flex-shrink-0" />
          <span className="text-[10px] font-semibold text-forge-chrome/85 tracking-wider uppercase forge-mono truncate">
            {title}
          </span>
          {label && (
            <span className="text-[8px] forge-mono text-forge-muted/55 border border-forge-border/30 rounded px-1.5 py-px uppercase tracking-wider flex-shrink-0">
              {label}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1.5 flex-shrink-0">
          {onApply && (
            <button
              onClick={() => onApply(title)}
              disabled={applyDisabled}
              title={applyDisabled ? applyHint : "Apply this change to the active file"}
              aria-label={`Apply ${title} to file`}
              className={`forge-press flex items-center gap-1 px-2 py-0.5 rounded text-[10px] forge-mono ${
                applyDisabled
                  ? "text-forge-muted/25 cursor-not-allowed border border-transparent"
                  : "text-forge-blue/60 border border-forge-blue/25 hover:text-forge-blue/85 hover:border-forge-blue/40"
              }`}
            >
              <svg width="9" height="9" viewBox="0 0 12 12" fill="none">
                <path d="M2 6.5L5 9.5L10 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Apply
            </button>
          )}
          <button
            onClick={handleCopy}
            className={`
              forge-press flex items-center gap-1 px-2 py-0.5 rounded text-[10px] forge-mono
              ${copied
                ? "text-green-400/75 border border-green-500/25"
                : "text-forge-silver/55 border border-transparent hover:border-forge-border/45 hover:text-forge-chrome/80"}
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
      </div>

      {/* Card body */}
      <div className="px-3 py-2.5">
        {body ? (
          <>
            {body.length > 0 && (
              <ul className="flex flex-col gap-1">
                {body.map((line, i) => (
                  <li
                    key={i}
                    className="flex gap-2 text-[12px] text-forge-silver/75 forge-mono leading-relaxed"
                  >
                    <span className="text-forge-blue/55 flex-shrink-0 select-none">›</span>
                    <span className="whitespace-pre-wrap break-words">{line}</span>
                  </li>
                ))}
              </ul>
            )}
            {code && (
              <pre className="mt-2 p-2.5 rounded bg-forge-black/50 border border-forge-border/30
                text-[11px] text-forge-silver/75 forge-mono whitespace-pre-wrap break-words overflow-x-auto leading-relaxed">
                {code}
              </pre>
            )}
          </>
        ) : (
          <pre className="text-[12px] text-forge-silver/75 forge-mono whitespace-pre-wrap leading-relaxed break-words">
            {content}
          </pre>
        )}
      </div>
    </div>
  );
}

export default memo(OutputCard);
