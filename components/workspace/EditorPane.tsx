"use client";

import { useRef, useState, useEffect, useLayoutEffect, type RefObject } from "react";
import type { OpenTab } from "@/hooks/useTabs";

export interface WelcomeCommand {
  label: string;
  keys: string[];
  onClick: () => void;
}

// 1.6rem line-height at a 16px root = 25.6px per line. Padding mirrors the
// textarea's py-3 (12px top) so gutter numbers align with text rows.
const LINE_HEIGHT = 25.6;
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

      {/* Command rows */}
      <div className="flex flex-col w-full max-w-[258px]">
        {commands.map(({ label, keys, onClick }, i) => (
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
            <div className="flex items-center gap-[3px]">
              {keys.map((key) => (
                <kbd
                  key={key}
                  className="inline-flex items-center px-[5px] py-[2px] rounded text-[9px]
                    forge-mono text-forge-muted/22 group-hover:text-forge-muted/35 leading-none
                    bg-forge-gunmetal/60 border border-forge-border/20 transition-colors"
                >
                  {key}
                </kbd>
              ))}
            </div>
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

  // Measure the textarea viewport so we only render visible line numbers.
  useEffect(() => {
    const ta = editorRef.current;
    if (!ta) return;
    const measure = () => setViewHeight(ta.clientHeight || 600);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(ta);
    return () => ro.disconnect();
  }, [editorRef, activeId]);

  // Restore caret + scroll when switching to a different tab.
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

  // Visible window of line numbers (virtualized — bounded regardless of file size).
  const start = Math.max(0, Math.floor(scrollTop / LINE_HEIGHT) - OVERSCAN);
  const end = Math.min(lineCount, Math.ceil((scrollTop + viewHeight) / LINE_HEIGHT) + OVERSCAN);
  const lineNumbers: number[] = [];
  for (let i = start; i < end; i++) lineNumbers.push(i);

  return (
    <div className="flex flex-col flex-1 min-w-0 overflow-hidden border-r border-forge-border/25">

      {/* Editor meta bar */}
      <div className="flex items-center justify-between px-4 h-8 border-b border-forge-border/20 bg-forge-obsidian/15 flex-shrink-0">
        <div className="flex items-center gap-2 text-[10px] forge-mono text-forge-muted/30">
          {activeTab ? (
            <>
              <span>{activeTab.name}</span>
              <span>·</span>
              <span className={activeTab.isDirty ? "text-forge-blue/45" : "text-forge-muted/20"}>
                {activeTab.isDirty ? "Unsaved" : activeTab.isUntitled ? "new file" : "mock file"}
              </span>
              <span>·</span>
              <span>{lineCount} {lineCount === 1 ? "line" : "lines"}</span>
              {isLargeFile && (
                <>
                  <span>·</span>
                  <span className="text-forge-blue/35">large file · optimized</span>
                </>
              )}
            </>
          ) : (
            <span>No file open</span>
          )}
        </div>
        {activeTab && (
          <div className="flex items-center gap-2 text-[10px] forge-mono text-forge-muted/20">
            <span>{langLabel}</span>
            <span>·</span>
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
            className="w-10 flex-shrink-0 border-r border-forge-border/12 overflow-hidden"
            style={{ scrollbarWidth: "none" }}
          >
            <div className="relative select-none" style={{ height: lineCount * LINE_HEIGHT + PADDING_TOP * 2 }}>
              {lineNumbers.map((i) => (
                <div
                  key={i}
                  className="absolute right-0 pr-3 text-right text-[11px] text-forge-muted/18 forge-mono"
                  style={{ top: PADDING_TOP + i * LINE_HEIGHT, height: "1.6rem", lineHeight: "1.6rem" }}
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </div>
          {/* Textarea */}
          <textarea
            ref={editorRef}
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
