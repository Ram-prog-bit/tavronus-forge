"use client";

import { useState } from "react";
import Link from "next/link";
import ModeSelector from "./ModeSelector";
import OutputCard from "./OutputCard";
import { MODES, ModeId, getModeById } from "@/lib/modes";

export default function WorkspaceShell() {
  const [activeMode, setActiveMode] = useState<ModeId>("plan");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<{ title: string; content: string }[] | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const mode = getModeById(activeMode);

  const handleModeChange = (id: ModeId) => {
    setActiveMode(id);
    setInput("");
    setOutput(null);
  };

  const handleGenerate = async () => {
    if (!input.trim() || isGenerating) return;
    setIsGenerating(true);
    setOutput(null);
    // Simulate a 900ms "AI thinking" delay for realism
    await new Promise((r) => setTimeout(r, 900));
    setOutput(mode.outputSections.map((s) => ({ title: s.title, content: s.content })));
    setIsGenerating(false);
  };

  const handleClear = () => {
    setInput("");
    setOutput(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      handleGenerate();
    }
  };

  return (
    <div className="flex h-screen bg-forge-black overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`
          flex flex-col border-r border-forge-border/60 bg-forge-obsidian transition-all duration-200 flex-shrink-0
          ${sidebarOpen ? "w-56" : "w-0 overflow-hidden border-0"}
        `}
      >
        {/* Brand */}
        <div className="px-4 py-4 border-b border-forge-border/40">
          <Link href="/" className="block group">
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 border border-forge-blue/40 flex items-center justify-center flex-shrink-0"
                style={{ boxShadow: "0 0 8px rgba(45,142,255,0.2)" }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <polygon points="7,1 13,4 13,10 7,13 1,10 1,4" stroke="#2D8EFF" strokeWidth="1" fill="none" />
                  <circle cx="7" cy="7" r="1.5" fill="#2D8EFF" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-semibold text-forge-chrome tracking-widest uppercase forge-mono">
                  Tavronus
                </p>
                <p className="text-xs text-forge-blue/70 tracking-widest uppercase forge-mono -mt-0.5">
                  Forge
                </p>
              </div>
            </div>
            <p className="text-xs text-forge-muted/50 forge-mono mt-2 tracking-wide">
              by Tavronus Labs
            </p>
          </Link>
        </div>

        {/* Mode selector */}
        <div className="flex-1 px-2 py-3 overflow-y-auto">
          <p className="text-xs text-forge-muted/50 tracking-widest uppercase forge-mono px-1 mb-2">
            Modes
          </p>
          <ModeSelector activeMode={activeMode} onSelect={handleModeChange} />
        </div>

        {/* Sidebar footer */}
        <div className="px-4 py-3 border-t border-forge-border/40">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500/70 animate-pulse" />
            <span className="text-xs text-forge-muted/60 forge-mono">Local mode active</span>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* Top bar */}
        <header className="flex items-center justify-between px-4 h-12 border-b border-forge-border/60 bg-forge-obsidian/80 flex-shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-1.5 rounded text-forge-silver/50 hover:text-forge-chrome hover:bg-forge-panel/60 transition-colors"
              title="Toggle sidebar"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <rect x="1" y="2" width="12" height="1.5" rx="0.75" fill="currentColor" />
                <rect x="1" y="6.25" width="12" height="1.5" rx="0.75" fill="currentColor" />
                <rect x="1" y="10.5" width="12" height="1.5" rx="0.75" fill="currentColor" />
              </svg>
            </button>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-forge-chrome">{mode.label}</span>
              <span className="text-xs text-forge-muted/50 hidden sm:block">·</span>
              <span className="text-xs text-forge-silver/50 hidden sm:block">{mode.description}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs forge-mono text-forge-muted/50 hidden md:block">
              ⌘↵ to generate
            </span>
            <div
              className="flex items-center gap-1.5 px-2.5 py-1 rounded border border-forge-border/50 text-xs forge-mono"
              style={{ color: "rgba(45,142,255,0.6)" }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-forge-blue/60 animate-pulse" />
              Local mock mode
            </div>
            <Link
              href="/"
              className="text-xs text-forge-silver/40 hover:text-forge-silver/70 transition-colors forge-mono"
            >
              ← Home
            </Link>
          </div>
        </header>

        {/* Workspace body */}
        <div className="flex flex-1 min-h-0 overflow-hidden">
          {/* Command + output column */}
          <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
            {/* Input zone */}
            <div className="px-4 pt-4 pb-3 border-b border-forge-border/40 bg-forge-obsidian/30 flex-shrink-0">
              <div className="max-w-3xl mx-auto flex flex-col gap-3">
                {/* Mode badge */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold tracking-widest text-forge-blue/80 forge-mono uppercase">
                    {mode.icon} {mode.label}
                  </span>
                </div>

                {/* Textarea */}
                <div
                  className="rounded-lg border overflow-hidden transition-colors duration-150 focus-within:border-forge-blue/40"
                  style={{
                    borderColor: "rgba(37,43,53,0.8)",
                    background: "rgba(13,15,18,0.8)",
                  }}
                >
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={mode.placeholder}
                    rows={5}
                    className="w-full bg-transparent px-4 py-3 text-sm text-forge-chrome placeholder:text-forge-muted/40
                      forge-mono resize-none outline-none leading-relaxed"
                  />
                  {/* Textarea footer */}
                  <div className="flex items-center justify-between px-4 py-2 border-t border-forge-border/30 bg-forge-black/30">
                    <span className="text-xs text-forge-muted/40 forge-mono">
                      {input.length > 0 ? `${input.length} chars` : "Type your input above"}
                    </span>
                    <div className="flex items-center gap-2">
                      {(input || output) && (
                        <button
                          onClick={handleClear}
                          className="text-xs forge-mono text-forge-muted/50 hover:text-forge-silver/70
                            px-2.5 py-1 border border-forge-border/40 rounded hover:border-forge-border/70
                            transition-colors"
                        >
                          Clear
                        </button>
                      )}
                      <button
                        onClick={handleGenerate}
                        disabled={!input.trim() || isGenerating}
                        className={`
                          flex items-center gap-2 px-4 py-1.5 rounded text-sm font-medium forge-mono
                          transition-all duration-200
                          ${
                            !input.trim() || isGenerating
                              ? "opacity-40 cursor-not-allowed text-forge-silver bg-forge-panel border border-forge-border/40"
                              : "forge-btn-primary text-white cursor-pointer"
                          }
                        `}
                      >
                        {isGenerating ? (
                          <>
                            <svg className="animate-spin" width="12" height="12" viewBox="0 0 12 12" fill="none">
                              <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.5" strokeDasharray="16" strokeDashoffset="8" />
                            </svg>
                            Forging...
                          </>
                        ) : (
                          <>
                            <span className="opacity-70">⚡</span>
                            {mode.buttonLabel}
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Output zone */}
            <div className="flex-1 overflow-y-auto px-4 py-4">
              <div className="max-w-3xl mx-auto">
                {!output && !isGenerating && (
                  <div className="flex flex-col items-center justify-center h-full min-h-[200px] gap-3 text-center">
                    <div className="w-10 h-10 border border-forge-border/60 rounded flex items-center justify-center text-xl text-forge-muted/40">
                      {mode.icon}
                    </div>
                    <div>
                      <p className="text-sm text-forge-muted/60">
                        Enter your input and click{" "}
                        <span className="text-forge-blue/70 forge-mono">{mode.buttonLabel}</span>
                      </p>
                      <p className="text-xs text-forge-muted/40 mt-1 forge-mono">
                        or press ⌘↵
                      </p>
                    </div>
                  </div>
                )}

                {isGenerating && (
                  <div className="flex flex-col items-center justify-center h-full min-h-[200px] gap-4">
                    <div className="flex gap-1.5">
                      {[0, 1, 2].map((i) => (
                        <div
                          key={i}
                          className="w-1.5 h-1.5 rounded-full bg-forge-blue/60 animate-bounce"
                          style={{ animationDelay: `${i * 0.15}s` }}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-forge-muted/50 forge-mono">Forge is thinking...</p>
                  </div>
                )}

                {output && !isGenerating && (
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-forge-muted/50 forge-mono uppercase tracking-widest">
                          Forge Output
                        </span>
                        <span className="text-xs text-forge-blue/50 forge-mono">
                          · {output.length} sections
                        </span>
                      </div>
                    </div>
                    {output.map((card, i) => (
                      <OutputCard key={card.title} title={card.title} content={card.content} index={i} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Status bar */}
        <div className="flex items-center justify-between px-4 h-7 border-t border-forge-border/40 bg-forge-black/80 flex-shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-xs forge-mono text-forge-muted/40">
              Forge shell active
            </span>
            <span className="text-xs forge-mono text-forge-blue/40">·</span>
            <span className="text-xs forge-mono text-forge-muted/40">localhost:5642</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs forge-mono text-forge-muted/40">
              {mode.label}
            </span>
            <span className="text-xs forge-mono text-forge-muted/30">v0.1</span>
          </div>
        </div>
      </div>
    </div>
  );
}
