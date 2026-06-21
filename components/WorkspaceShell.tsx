"use client";

import { useState } from "react";
import Link from "next/link";
import ModeSelector from "./ModeSelector";
import OutputCard from "./OutputCard";
import { ModeId, getModeById } from "@/lib/modes";

const RECENT_BUILDS = [
  { label: "Tavronus Forge v0.1", mode: "plan" as ModeId, time: "today" },
  { label: "Homework Tracker", mode: "plan" as ModeId, time: "yesterday" },
  { label: "Gym Dashboard", mode: "checklist" as ModeId, time: "2d ago" },
];

function ForgeLogo() {
  return (
    <div
      className="w-6 h-6 border border-forge-blue/40 flex items-center justify-center flex-shrink-0"
      style={{ boxShadow: "0 0 8px rgba(45,142,255,0.18)" }}
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <polygon points="7,1 13,4 13,10 7,13 1,10 1,4" stroke="#2D8EFF" strokeWidth="1" fill="none" />
        <circle cx="7" cy="7" r="1.5" fill="#2D8EFF" />
      </svg>
    </div>
  );
}

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
    await new Promise((r) => setTimeout(r, 850));
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

      {/* ── LEFT SIDEBAR ─────────────────────────────────────────── */}
      <aside
        className={`
          flex flex-col border-r border-forge-border/60 bg-forge-obsidian flex-shrink-0
          transition-all duration-200
          ${sidebarOpen ? "w-52" : "w-0 overflow-hidden border-r-0"}
        `}
      >
        {/* Brand */}
        <div className="px-4 py-4 border-b border-forge-border/40">
          <Link href="/" className="block group">
            <div className="flex items-center gap-2.5">
              <ForgeLogo />
              <div>
                <p className="text-xs font-semibold text-forge-chrome tracking-widest uppercase forge-mono leading-tight">
                  Tavronus
                </p>
                <p className="text-xs text-forge-blue/70 tracking-widest uppercase forge-mono leading-tight">
                  Forge
                </p>
              </div>
            </div>
            <p className="text-[10px] text-forge-muted/35 forge-mono mt-1.5">
              by Tavronus Labs
            </p>
          </Link>
        </div>

        {/* Modes */}
        <div className="px-2 py-3 border-b border-forge-border/30">
          <p className="text-[10px] text-forge-muted/35 tracking-widest uppercase forge-mono px-1 mb-2">
            Modes
          </p>
          <ModeSelector activeMode={activeMode} onSelect={handleModeChange} />
        </div>

        {/* Recent builds */}
        <div className="flex-1 px-2 py-3 overflow-y-auto">
          <p className="text-[10px] text-forge-muted/35 tracking-widest uppercase forge-mono px-1 mb-2">
            Recent
          </p>
          <div className="flex flex-col gap-0.5">
            {RECENT_BUILDS.map((build) => (
              <button
                key={build.label}
                onClick={() => handleModeChange(build.mode)}
                className="w-full flex items-start justify-between px-2 py-2 rounded text-left
                  border border-transparent hover:border-forge-border/40 hover:bg-forge-panel/30
                  transition-all duration-150 group"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-forge-muted/25 text-[10px] forge-mono flex-shrink-0">◦</span>
                  <span className="text-xs text-forge-silver/45 group-hover:text-forge-silver/70 truncate transition-colors">
                    {build.label}
                  </span>
                </div>
                <span className="text-[9px] text-forge-muted/25 forge-mono flex-shrink-0 ml-1 pt-0.5">
                  {build.time}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Sidebar footer */}
        <div className="px-4 py-3 border-t border-forge-border/40">
          <div className="flex items-center gap-1.5">
            <div className="w-1 h-1 rounded-full bg-green-500/60 animate-pulse" />
            <span className="text-[10px] text-forge-muted/30 forge-mono">Mock mode active</span>
          </div>
        </div>
      </aside>

      {/* ── MAIN BODY ─────────────────────────────────────────────── */}
      <div className="flex flex-col flex-1 min-w-0">

        {/* TOP BAR */}
        <header className="flex items-center justify-between px-4 h-11 border-b border-forge-border/60 bg-forge-obsidian/80 flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-1.5 rounded text-forge-silver/40 hover:text-forge-chrome hover:bg-forge-panel/50 transition-colors"
              title="Toggle sidebar"
            >
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                <rect x="1" y="2" width="12" height="1.5" rx="0.75" fill="currentColor" />
                <rect x="1" y="6.25" width="12" height="1.5" rx="0.75" fill="currentColor" />
                <rect x="1" y="10.5" width="12" height="1.5" rx="0.75" fill="currentColor" />
              </svg>
            </button>
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-medium text-forge-chrome">{mode.label}</span>
              <span className="text-[10px] text-forge-muted/30 hidden sm:block">·</span>
              <span className="text-xs text-forge-silver/35 hidden sm:block">{mode.description}</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <span className="text-[10px] forge-mono text-forge-muted/30 hidden md:block">
              ⌘↵ generate
            </span>
            <div
              className="flex items-center gap-1.5 px-2 py-1 rounded border border-forge-border/40 text-[10px] forge-mono"
              style={{ color: "rgba(45,142,255,0.5)" }}
            >
              <div className="w-1 h-1 rounded-full bg-forge-blue/50 animate-pulse" />
              Local Mock Mode
            </div>
            <div className="w-px h-3 bg-forge-border/40" />
            <Link
              href="/"
              className="text-[10px] text-forge-silver/35 hover:text-forge-chrome transition-colors forge-mono"
            >
              ← Command Center
            </Link>
          </div>
        </header>

        {/* ── BODY: CENTER EDITOR + RIGHT OUTPUT ────────────────────── */}
        <div className="flex flex-1 min-h-0 overflow-hidden">

          {/* CENTER: Editor / command input */}
          <div className="flex flex-col flex-1 min-w-0 overflow-hidden">

            {/* Mode badge + label */}
            <div className="px-5 pt-5 pb-3 flex-shrink-0 border-b border-forge-border/30 bg-forge-obsidian/20">
              <div className="max-w-3xl mx-auto">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-forge-blue/70 forge-mono uppercase tracking-widest">
                      {mode.icon} {mode.label}
                    </span>
                    <span className="text-[10px] text-forge-muted/25 forge-mono">·</span>
                    <span className="text-[10px] text-forge-muted/35 forge-mono">
                      What are we building?
                    </span>
                  </div>
                </div>

                {/* Textarea */}
                <div
                  className="rounded-lg border overflow-hidden transition-colors duration-150 focus-within:border-forge-blue/30"
                  style={{
                    borderColor: "rgba(37,43,53,0.8)",
                    background: "rgba(13,15,18,0.9)",
                  }}
                >
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={mode.placeholder}
                    rows={7}
                    className="w-full bg-transparent px-4 py-3 text-sm text-forge-chrome placeholder:text-forge-muted/30
                      forge-mono resize-none outline-none leading-relaxed"
                  />
                  {/* Toolbar */}
                  <div className="flex items-center justify-between px-4 py-2 border-t border-forge-border/25 bg-forge-black/30">
                    <span className="text-[10px] text-forge-muted/30 forge-mono">
                      {input.length > 0 ? `${input.length} chars` : "Type your input above"}
                    </span>
                    <div className="flex items-center gap-1.5">
                      {(input || output) && (
                        <button
                          onClick={handleClear}
                          className="text-xs forge-mono text-forge-muted/40 hover:text-forge-silver/60
                            px-2.5 py-1 border border-forge-border/30 rounded hover:border-forge-border/60
                            transition-colors"
                        >
                          Clear
                        </button>
                      )}
                      <button
                        onClick={handleGenerate}
                        disabled={!input.trim() || isGenerating}
                        className={`
                          flex items-center gap-1.5 px-4 py-1.5 rounded text-xs font-semibold forge-mono
                          transition-all duration-200
                          ${
                            !input.trim() || isGenerating
                              ? "opacity-30 cursor-not-allowed text-forge-silver bg-forge-panel border border-forge-border/30"
                              : "forge-btn-primary text-white cursor-pointer"
                          }
                        `}
                      >
                        {isGenerating ? (
                          <>
                            <svg className="animate-spin" width="11" height="11" viewBox="0 0 12 12" fill="none">
                              <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.5" strokeDasharray="16" strokeDashoffset="8" />
                            </svg>
                            Forging...
                          </>
                        ) : (
                          <>⚡ Forge Output</>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile output (inline on small screens) */}
            <div className="flex-1 overflow-y-auto px-5 py-4 xl:hidden">
              <div className="max-w-3xl mx-auto">
                <WorkspaceOutputArea
                  output={output}
                  isGenerating={isGenerating}
                  modeIcon={mode.icon}
                />
              </div>
            </div>
          </div>

          {/* ── RIGHT PANEL: Forge Output ───────────────────────────── */}
          <div className="hidden xl:flex flex-col w-[360px] flex-shrink-0 border-l border-forge-border/40 bg-forge-obsidian/20 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-forge-border/40 flex-shrink-0">
              <span className="text-[10px] text-forge-muted/40 uppercase tracking-widest forge-mono">
                Forge Output
              </span>
              {output && (
                <span className="text-[10px] text-forge-blue/40 forge-mono tabular-nums">
                  {output.length} sections
                </span>
              )}
            </div>

            <div className="flex-1 overflow-y-auto p-3">
              <WorkspaceOutputArea
                output={output}
                isGenerating={isGenerating}
                modeIcon={mode.icon}
              />
            </div>
          </div>
        </div>

        {/* STATUS BAR */}
        <div className="flex items-center justify-between px-4 h-6 border-t border-forge-border/40 bg-forge-black/80 flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-1 h-1 rounded-full bg-green-500/60 animate-pulse" />
            <span className="text-[10px] forge-mono text-forge-muted/35">Forge shell active</span>
            <span className="text-[10px] forge-mono text-forge-blue/20">·</span>
            <span className="text-[10px] forge-mono text-forge-muted/30">localhost:5642</span>
            <span className="text-[10px] forge-mono text-forge-blue/20">·</span>
            <span className="text-[10px] forge-mono text-forge-muted/30">mock mode</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] forge-mono text-forge-muted/25">{mode.label}</span>
            <span className="text-[10px] forge-mono text-forge-muted/20">·</span>
            <span className="text-[10px] forge-mono text-forge-muted/20">v0.1</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function WorkspaceOutputArea({
  output,
  isGenerating,
  modeIcon,
}: {
  output: { title: string; content: string }[] | null;
  isGenerating: boolean;
  modeIcon: string;
}) {
  if (isGenerating) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[200px] gap-3">
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-forge-blue/50 animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
        <p className="text-[10px] text-forge-muted/35 forge-mono">Forge is thinking...</p>
      </div>
    );
  }

  if (!output) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[200px] gap-3 text-center">
        <div
          className="w-9 h-9 border border-forge-border/40 rounded flex items-center justify-center text-base"
          style={{ color: "rgba(138,149,163,0.2)" }}
        >
          {modeIcon}
        </div>
        <div>
          <p className="text-xs text-forge-muted/30">No output yet.</p>
          <p className="text-[10px] text-forge-muted/20 mt-0.5">
            Enter input and click ⚡ Forge Output
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex items-center gap-2 mb-0.5">
        <span className="text-[10px] text-forge-muted/35 forge-mono uppercase tracking-widest">
          Forge Output
        </span>
        <span className="text-[10px] text-forge-blue/35 forge-mono">· {output.length} sections</span>
      </div>
      {output.map((card, i) => (
        <OutputCard key={card.title} title={card.title} content={card.content} index={i} />
      ))}
    </div>
  );
}
