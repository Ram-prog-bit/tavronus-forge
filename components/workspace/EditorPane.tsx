"use client";

import { useRef, useState, useEffect, useLayoutEffect, type RefObject } from "react";
import type { OpenTab } from "@/hooks/useTabs";

export interface WelcomeCommand {
  label: string;
  onClick: () => void;
}

// Gutter geometry. DEFAULT_LINE_HEIGHT (1.6rem @ 16px root = 25.6px) is only a
// fallback — the real line height is measured from the textarea at runtime, so
// the gutter stays aligned even if the root font size changes. PADDING_TOP
// mirrors the textarea's py-3 (12px) so line numbers line up with text rows.
const DEFAULT_LINE_HEIGHT = 25.6;
const PADDING_TOP = 12;
const OVERSCAN = 8;
const LARGE_FILE_LINES = 2000;

function WelcomeScreen({ commands }: { commands: WelcomeCommand[] }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-forge-black select-none px-6">

      {/* Logo */}
      <div className="mb-10">
        <img
          src="/tavronus-symbol.png"
          alt="Tavronus symbol"
          className="w-[115px] h-auto opacity-55 hover:opacity-80 transition-all duration-500"
          style={{ filter: "drop-shadow(0 0 10px rgba(45,142,255,0.12))" }}
        />
      </div>

      {/* Command rows — a subtle chevron signals clickability (no fake shortcut chips) */}
      <div className="flex flex-col w-full max-w-[258px]">
        {commands.map(({ label, onClick }, i) => (
          <button
            key={label}
            onClick={onClick}
            className={`group flex items-center justify-between py-[5px] px-1.5 -mx-1.5 rounded text-left
              hover:bg-forge-panel/20 transition-colors ${
              i < commands.length - 1 ? "border-b border-forge-border/10" : ""
            }`}
          >
            <span className="text-[11px] text-forge-muted/35 group-hover:text-forge-silver/65 forge-mono transition-colors">
              {label}
            </span>
            <span className="text-[11px] text-forge-muted/15 group-hover:text-forge-blue/40 transition-colors">
              ›
            </span>
          </button>
        ))}
      </div>

    </div>
  );
}

interface EditorPaneProps {
  activeTab: OpenTab | null;
  content: string;
  onChange: (value: string) => void;
  welcomeCommands: WelcomeCommand[];
  editorRef: RefObject<HTMLTextAreaElement>;
}

export default function EditorPane({ activeTab, content, onChange, welcomeCommands, editorRef }: EditorPaneProps) {
  const lineNumRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);
  const [viewHeight, setViewHeight] = useState(600);
  const [lineHeight, setLineHeight] = useState(DEFAULT_LINE_HEIGHT);

  // Latest active tab (read inside id-keyed effects without re-running them).
  const activeTabRef = useRef(activeTab);
  activeTabRef.current = activeTab;

  const activeId = activeTab?.id ?? null;
  const lineCount = content ? content.split("\n").length : 1;
  const langLabel = activeTab?.language ?? "Plain Text";
  const isLargeFile = lineCount > LARGE_FILE_LINES;

  const handleScroll = () => {
    const ta = editorRef.current;
    if (!ta) return;
    if (lineNumRef.current) lineNumRef.current.scrollTop = ta.scrollTop;
    setScrollTop(ta.scrollTop);
  };

  // Measure the textarea viewport (and its real line height) so we render only
  // the visible line numbers. ResizeObserver is disconnected on cleanup.
  useEffect(() => {
    const ta = editorRef.current;
    if (!ta) return;
    const measure = () => {
      setViewHeight(ta.clientHeight || 600);
      const lh = parseFloat(getComputedStyle(ta).lineHeight);
      if (Number.isFinite(lh) && lh > 0) setLineHeight(lh);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(ta);
    return () => ro.disconnect();
  }, [editorRef, activeId]);

  // Restore caret + scroll on tab switch. Keyed on the tab id only (not the tab
  // object) so it never fires while typing — otherwise the caret would jump.
  useLayoutEffect(() => {
    const ta = editorRef.current;
    const t = activeTabRef.current;
    if (!ta || !t) return;
    if (t.selectionStart != null) {
      ta.selectionStart = t.selectionStart;
      ta.selectionEnd = t.selectionEnd ?? t.selectionStart;
    }
    const top = t.scrollTop ?? 0;
    ta.scrollTop = top;
    if (lineNumRef.current) lineNumRef.current.scrollTop = top;
    setScrollTop(top);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeId]);

  // Virtualized line numbers: only the visible window (plus overscan) is
  // rendered, so a huge paste never creates one DOM node per line.
  const start = Math.max(0, Math.floor(scrollTop / lineHeight) - OVERSCAN);
  const end = Math.min(lineCount, Math.ceil((scrollTop + viewHeight) / lineHeight) + OVERSCAN);
  const lineNumbers: number[] = [];
  for (let i = start; i < end; i++) lineNumbers.push(i);

  return (
    <div className="forge-editor-recessed flex flex-col flex-1 min-w-0 overflow-hidden border-r border-forge-border/40">

      {/* Editor meta bar — same surface as the active tab; the active tab's 1px
          bottom-cut bridges the header divider so the tab reads as the editor's top lip */}
      <div className="flex items-center justify-between px-4 h-8 border-b border-forge-border/30 bg-forge-obsidian/50 flex-shrink-0">
        <div className="flex items-center gap-2 text-[10px] forge-mono text-forge-silver/55">
          {activeTab ? (
            <>
              <span className="text-forge-chrome/80">{activeTab.name}</span>
              <span className="text-forge-muted/40">·</span>
              <span className={activeTab.isDirty ? "text-forge-blue/70" : "text-forge-muted/45"}>
                {activeTab.isDirty ? "Unsaved" : activeTab.isUntitled ? "new file" : "mock file"}
              </span>
              <span className="text-forge-muted/40">·</span>
              <span>{lineCount} {lineCount === 1 ? "line" : "lines"}</span>
              {isLargeFile && (
                <>
                  <span className="text-forge-muted/40">·</span>
                  <span className="text-forge-blue/55">large file · optimized</span>
                </>
              )}
            </>
          ) : (
            <span>No file open</span>
          )}
        </div>
        {activeTab && (
          <div className="flex items-center gap-2 text-[10px] forge-mono text-forge-muted/45">
            <span>{langLabel}</span>
            <span className="text-forge-muted/30">·</span>
            <span>UTF-8</span>
          </div>
        )}
      </div>

      {/* Editor body */}
      {activeTab ? (
        <div className="flex flex-1 min-h-0 overflow-hidden">
          {/* Line numbers (virtualized) */}
          <div
            ref={lineNumRef}
            className="w-10 flex-shrink-0 border-r border-forge-border/30 overflow-hidden"
            style={{ scrollbarWidth: "none" }}
          >
            <div className="relative select-none" style={{ height: lineCount * lineHeight + PADDING_TOP * 2 }}>
              {lineNumbers.map((i) => (
                <div
                  key={i}
                  className="absolute right-0 pr-3 text-right text-[11px] text-forge-muted/40 forge-mono"
                  style={{ top: PADDING_TOP + i * lineHeight, height: lineHeight, lineHeight: `${lineHeight}px` }}
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </div>
          {/* Textarea stays immediately controlled (value = active tab content):
              edits commit synchronously, so Forge AI always reads the latest text
              and there is no second source of truth that could drift. */}
          <textarea
            ref={editorRef}
            aria-label="Code editor"
            value={content}
            onChange={(e) => onChange(e.target.value)}
            onScroll={handleScroll}
            className="flex-1 bg-transparent text-forge-chrome text-[13px] forge-mono
              outline-none resize-none px-4 py-3 overflow-auto"
            style={{ lineHeight: "1.6rem" }}
            spellCheck={false}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
          />
        </div>
      ) : (
        <WelcomeScreen commands={welcomeCommands} />
      )}
    </div>
  );
}
