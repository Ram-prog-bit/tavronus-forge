"use client";

import { useEffect } from "react";

export type PendingApply = {
  artifactTitle: string;
  targetFile: string;
  summary: string;
  before: string;
  after: string;
};

const MAX_LINES = 40;
const MAX_CHARS = 4000;

function truncate(s: string): { text: string; truncated: boolean } {
  let text = s;
  let truncated = false;
  const lines = text.split("\n");
  if (lines.length > MAX_LINES) {
    text = lines.slice(0, MAX_LINES).join("\n");
    truncated = true;
  }
  if (text.length > MAX_CHARS) {
    text = text.slice(0, MAX_CHARS);
    truncated = true;
  }
  return { text, truncated };
}

function Block({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  const { text, truncated } = truncate(value);
  return (
    <div>
      <p className={`text-[9px] uppercase tracking-widest forge-mono mb-1 ${accent ? "text-forge-blue/50" : "text-forge-muted/40"}`}>
        {label}
      </p>
      <pre
        className={`p-2.5 rounded border text-[11px] forge-mono whitespace-pre-wrap break-words overflow-x-auto leading-relaxed max-h-[28vh] overflow-y-auto ${
          accent
            ? "bg-forge-black/50 border-forge-blue/20 text-forge-silver/80"
            : "bg-forge-black/40 border-forge-border/20 text-forge-silver/55"
        }`}
      >
        {text || "(empty)"}
      </pre>
      {truncated && (
        <p className="text-[9px] forge-mono text-forge-muted/30 mt-1">Preview truncated for readability.</p>
      )}
    </div>
  );
}

interface ApplyPreviewProps {
  pending: PendingApply | null;
  onAccept: () => void;
  onCancel: () => void;
}

export default function ApplyPreview({ pending, onAccept, onCancel }: ApplyPreviewProps) {
  useEffect(() => {
    if (!pending) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { e.preventDefault(); onCancel(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [pending, onCancel]);

  if (!pending) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-start justify-center pt-[10vh] px-4"
      onMouseDown={onCancel}
    >
      <div className="absolute inset-0 bg-black/60" />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Apply change preview"
        className="relative w-full max-w-[680px] max-h-[80vh] flex flex-col rounded-lg border border-forge-blue/25 bg-forge-gunmetal/95 overflow-hidden"
        style={{ boxShadow: "0 0 0 1px rgba(45,142,255,0.06), 0 16px 48px rgba(0,0,0,0.55)" }}
        onMouseDown={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-4 py-2.5 border-b border-forge-border/25 flex items-center justify-between flex-shrink-0">
          <div className="min-w-0">
            <p className="text-[9px] uppercase tracking-widest forge-mono text-forge-muted/40">Apply to File</p>
            <p className="text-[12px] forge-mono text-forge-chrome/75 mt-0.5 truncate">{pending.targetFile}</p>
          </div>
          <kbd className="text-[9px] forge-mono text-forge-muted/30 border border-forge-border/25 rounded px-1.5 py-0.5 flex-shrink-0">
            Esc
          </kbd>
        </div>

        {/* Summary */}
        <div className="px-4 py-2 border-b border-forge-border/20 flex items-center gap-2 flex-shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-forge-blue/60 flex-shrink-0" />
          <span className="text-[11px] forge-mono text-forge-silver/60">{pending.summary}</span>
        </div>

        {/* Before / after */}
        <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-3">
          <Block label="Before" value={pending.before} />
          <Block label="After" value={pending.after} accent />
        </div>

        {/* Actions */}
        <div className="px-4 py-2.5 border-t border-forge-border/25 flex items-center justify-end gap-2 flex-shrink-0">
          <button
            onClick={onCancel}
            className="text-[11px] forge-mono px-3 py-1.5 border border-forge-border/35 rounded
              text-forge-muted/45 hover:text-forge-silver/65 hover:border-forge-border/55 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onAccept}
            className="text-[11px] font-semibold forge-mono px-4 py-1.5 rounded forge-btn-primary text-white"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
