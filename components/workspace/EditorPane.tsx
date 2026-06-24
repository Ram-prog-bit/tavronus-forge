"use client";

import { useRef, type RefObject } from "react";
import type { OpenTab } from "@/hooks/useTabs";

export interface WelcomeCommand {
  label: string;
  keys: string[];
  onClick: () => void;
}

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

  const lineCount = content ? content.split("\n").length : 1;
  const langLabel = activeTab?.language ?? "Plain Text";

  const handleScroll = () => {
    if (editorRef.current && lineNumRef.current) {
      lineNumRef.current.scrollTop = editorRef.current.scrollTop;
    }
  };

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
              <span>{lineCount} lines</span>
            </>
          ) : (
            <span>No file open</span>
          )}
        </div>
        <div className="flex items-center gap-2 text-[10px] forge-mono text-forge-muted/20">
          <span>{langLabel}</span>
          <span>·</span>
          <span>UTF-8</span>
        </div>
      </div>

      {/* Editor body */}
      {activeTab ? (
        <div className="flex flex-1 min-h-0 overflow-hidden">
          {/* Line numbers */}
          <div
            ref={lineNumRef}
            className="w-10 flex-shrink-0 border-r border-forge-border/12 overflow-hidden"
            style={{ scrollbarWidth: "none" }}
          >
            <div className="py-3 select-none">
              {Array.from({ length: lineCount }, (_, i) => (
                <div
                  key={i}
                  className="text-right pr-3 text-[11px] text-forge-muted/18 forge-mono"
                  style={{ lineHeight: "1.6rem" }}
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
