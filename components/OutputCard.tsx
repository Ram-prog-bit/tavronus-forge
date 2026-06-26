"use client";

import { useState, memo } from "react";

// ── Display-only snippet classification (no parser, no deps) ──────────────────
// Distinguishes a prose "prompt" block from real code so each can be framed,
// numbered, and copied appropriately. Purely presentational.
const PROMPT_LABELS = /^(claude code|gpt|cursor|qa)$/i;

function isPromptBlock(label?: string): boolean {
  return !!label && PROMPT_LABELS.test(label.trim());
}

function inferLang(code: string): string {
  if (/(^|\n)\s*def\s+\w+|(^|\n)\s*class\s+\w+[^\n]*:/.test(code)) return "python";
  if (/<[A-Za-z][^>]*>|className=|:\s*(string|number|boolean)\b|interface\s+\w+/.test(code)) return "tsx";
  if (/(^|\n)[ \t]*[\w.-]+\/(\n|$)/.test(code)) return "tree";
  if (/\b(export|import|const|let|function)\b|=>/.test(code)) return "ts";
  return "code";
}

// Shared clipboard write with a legacy execCommand fallback (unchanged behavior).
async function writeClipboard(text: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const el = document.createElement("textarea");
    el.value = text;
    document.body.appendChild(el);
    el.select();
    try { document.execCommand("copy"); } finally { document.body.removeChild(el); }
  }
}

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
  const [snippetCopied, setSnippetCopied] = useState(false);

  const copyText = body
    ? body.join("\n") + (code ? `\n\n${code}` : "")
    : content ?? "";

  // Snippet framing metadata (display-only).
  const isPrompt = isPromptBlock(label);
  const snippetLang = code ? (isPrompt ? "Prompt" : inferLang(code)) : "";
  const codeLines = code ? code.split("\n") : [];

  const handleCopy = async () => {
    await writeClipboard(copyText);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  const handleCopySnippet = async () => {
    if (!code) return;
    await writeClipboard(code);
    setSnippetCopied(true);
    setTimeout(() => setSnippetCopied(false), 1600);
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
              title={applyDisabled ? applyHint : "Apply as a local mock edit to the open tab — save with ⌘S"}
              aria-label={`Apply ${title} as a local mock edit`}
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
            title={code ? "Copy the whole artifact (text + snippet)" : "Copy this artifact"}
            aria-label={`Copy ${title} artifact`}
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
      <div className="px-3 py-3">
        {body ? (
          <>
            {body.length > 0 && (
              <ul className="flex flex-col gap-1.5">
                {body.map((line, i) => (
                  <li
                    key={i}
                    className="flex gap-2 text-[12px] text-forge-silver/80 forge-mono leading-relaxed"
                  >
                    <span className="text-forge-blue/55 flex-shrink-0 select-none mt-px">›</span>
                    <span className="whitespace-pre-wrap break-words">{line}</span>
                  </li>
                ))}
              </ul>
            )}
            {code && (
              <div className={`rounded border border-forge-border/30 bg-forge-black/50 overflow-hidden ${body.length > 0 ? "mt-2.5" : ""}`}>
                {/* Snippet header — type/language label + dedicated copy */}
                <div className="flex items-center justify-between gap-2 px-2.5 py-1 border-b border-forge-border/25 bg-forge-black/40">
                  <span className="flex items-center gap-1.5 min-w-0">
                    <span className="w-1 h-1 rounded-full bg-forge-blue/50 flex-shrink-0" />
                    <span className="text-[8px] uppercase tracking-wider forge-mono text-forge-muted/60">
                      {snippetLang}
                    </span>
                    {isPrompt && label && (
                      <span className="text-[8px] uppercase tracking-wider forge-mono text-forge-blue/50 truncate">
                        · {label}
                      </span>
                    )}
                  </span>
                  <button
                    onClick={handleCopySnippet}
                    title={isPrompt ? "Copy the prompt text" : "Copy this snippet"}
                    aria-label={isPrompt ? `Copy ${title} prompt` : `Copy ${title} snippet`}
                    className={`forge-press flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] forge-mono flex-shrink-0 ${
                      snippetCopied
                        ? "text-green-400/75"
                        : "text-forge-silver/45 hover:text-forge-chrome/80"
                    }`}
                  >
                    {snippetCopied ? "Copied" : isPrompt ? "Copy prompt" : "Copy"}
                  </button>
                </div>

                {/* Snippet body — prose prompts wrap; code gets a line-number gutter */}
                {isPrompt ? (
                  <pre className="px-3 py-2.5 text-[11px] text-forge-silver/80 forge-mono
                    whitespace-pre-wrap break-words leading-relaxed">
                    {code}
                  </pre>
                ) : (
                  <div className="flex max-h-[320px] overflow-y-auto">
                    <div
                      aria-hidden
                      className="flex-shrink-0 select-none py-2.5 pl-2.5 pr-2 text-right
                        text-[11px] text-forge-muted/30 forge-mono leading-relaxed border-r border-forge-border/20"
                    >
                      {codeLines.map((_, i) => (
                        <div key={i}>{i + 1}</div>
                      ))}
                    </div>
                    <pre className="flex-1 min-w-0 py-2.5 px-3 text-[11px] text-forge-silver/75 forge-mono
                      whitespace-pre overflow-x-auto leading-relaxed">
                      {code}
                    </pre>
                  </div>
                )}
              </div>
            )}
          </>
        ) : (
          <pre className="text-[12px] text-forge-silver/80 forge-mono whitespace-pre-wrap leading-relaxed break-words">
            {content}
          </pre>
        )}
      </div>
    </div>
  );
}

export default memo(OutputCard);
