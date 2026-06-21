"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import ModeSelector from "./ModeSelector";
import OutputCard from "./OutputCard";
import { ModeId, getModeById } from "@/lib/modes";

const STARTER_ACTIONS: {
  label: string;
  mode: ModeId;
  icon: string;
  example: string;
}[] = [
  {
    label: "Plan a project",
    mode: "plan",
    icon: "⬡",
    example:
      "I want to build a Next.js app that helps students track homework assignments and SAT practice sessions.",
  },
  {
    label: "Generate a prompt",
    mode: "prompt",
    icon: "◈",
    example:
      "Make me a Claude prompt to build a clean gym tracker app with Next.js, Supabase, and Tailwind.",
  },
  {
    label: "Review code",
    mode: "review",
    icon: "◫",
    example:
      "export async function POST(req: Request) {\n  const body = await req.json()\n  const result = await db.query(`SELECT * FROM users WHERE id = ${body.id}`)\n  return Response.json(result)\n}",
  },
  {
    label: "Debug an error",
    mode: "debug",
    icon: "⚡",
    example:
      "TypeError: Cannot read properties of undefined (reading 'map')\n    at TaskList (components/TaskList.tsx:24:18)\n    at renderWithHooks (react-dom.development.js:14985:18)",
  },
];

function ForgeLogo({ size = "sm" }: { size?: "sm" | "md" }) {
  const dim = size === "md" ? 20 : 14;
  const box = size === "md" ? "w-8 h-8" : "w-6 h-6";
  return (
    <div
      className={`${box} border border-forge-blue/40 flex items-center justify-center flex-shrink-0`}
      style={{ boxShadow: "0 0 8px rgba(45,142,255,0.18)" }}
    >
      <svg width={dim} height={dim} viewBox="0 0 14 14" fill="none">
        <polygon points="7,1 13,4 13,10 7,13 1,10 1,4" stroke="#2D8EFF" strokeWidth="1" fill="none" />
        <circle cx="7" cy="7" r="1.5" fill="#2D8EFF" />
      </svg>
    </div>
  );
}

export default function ForgeCommandCenter() {
  const [activeMode, setActiveMode] = useState<ModeId>("plan");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<{ title: string; content: string }[] | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const mode = getModeById(activeMode);

  const handleStarterAction = (action: (typeof STARTER_ACTIONS)[0]) => {
    setActiveMode(action.mode);
    setInput(action.example);
    setOutput(null);
    setTimeout(() => textareaRef.current?.focus(), 50);
  };

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
          ${sidebarOpen ? "w-48" : "w-0 overflow-hidden border-r-0"}
        `}
      >
        {/* Brand */}
        <div className="px-4 py-4 border-b border-forge-border/40">
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
          <p className="text-[10px] text-forge-muted/35 forge-mono mt-2 tracking-wide">
            by Tavronus Labs
          </p>
        </div>

        {/* Mode selector */}
        <div className="flex-1 px-2 py-3 overflow-y-auto">
          <p className="text-[10px] text-forge-muted/35 tracking-widest uppercase forge-mono px-1 mb-2">
            Modes
          </p>
          <ModeSelector activeMode={activeMode} onSelect={handleModeChange} />
        </div>

        {/* Sidebar footer */}
        <div className="px-4 py-3 border-t border-forge-border/40 space-y-2">
          <Link
            href="/workspace"
            className="flex items-center gap-1.5 text-[10px] text-forge-silver/35 hover:text-forge-blue/60 transition-colors forge-mono group w-full"
          >
            <span className="text-forge-muted/40 group-hover:text-forge-blue/50">⌗</span>
            Full Workspace
          </Link>
          <div className="flex items-center gap-1.5">
            <div className="w-1 h-1 rounded-full bg-green-500/60 animate-pulse" />
            <span className="text-[10px] text-forge-muted/30 forge-mono">Mock mode</span>
          </div>
        </div>
      </aside>

      {/* ── MAIN BODY ─────────────────────────────────────────────── */}
      <div className="flex flex-col flex-1 min-w-0">

        {/* TOP BAR */}
        <header className="flex items-center justify-between px-4 h-11 border-b border-forge-border/50 bg-forge-obsidian/80 flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-1.5 rounded text-forge-silver/35 hover:text-forge-chrome hover:bg-forge-panel/50 transition-colors"
              title="Toggle sidebar"
            >
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                <rect x="1" y="2" width="12" height="1.5" rx="0.75" fill="currentColor" />
                <rect x="1" y="6.25" width="12" height="1.5" rx="0.75" fill="currentColor" />
                <rect x="1" y="10.5" width="12" height="1.5" rx="0.75" fill="currentColor" />
              </svg>
            </button>
            {!sidebarOpen && (
              <div className="flex items-center gap-2">
                <ForgeLogo />
                <span className="text-xs font-semibold text-forge-chrome tracking-widest forge-mono uppercase">
                  Tavronus Forge
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2.5">
            <span className="text-[10px] forge-mono text-forge-muted/35 hidden md:block">
              ⌘↵ generate
            </span>
            <div className="flex items-center gap-1.5 px-2 py-1 rounded border border-forge-border/40 text-[10px] forge-mono"
              style={{ color: "rgba(45,142,255,0.5)" }}>
              <div className="w-1 h-1 rounded-full bg-forge-blue/50 animate-pulse" />
              Local Mock Mode
            </div>
            <div className="w-px h-3 bg-forge-border/40" />
            <Link
              href="/workspace"
              className="hidden sm:block text-[10px] text-forge-silver/35 hover:text-forge-chrome transition-colors forge-mono border border-forge-border/30 hover:border-forge-border/60 px-2 py-1 rounded"
            >
              Workspace →
            </Link>
          </div>
        </header>

        {/* ── BODY: CENTER + RIGHT ──────────────────────────────────── */}
        <div className="flex flex-1 min-h-0 overflow-hidden">

          {/* CENTER: Command area */}
          <div className="flex flex-col flex-1 min-w-0 overflow-hidden">

            {/* App-first hero — compact, not marketing */}
            <div className="px-6 pt-6 pb-4 flex-shrink-0">
              <div className="max-w-2xl">
                {/* Version badge */}
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded border border-forge-blue/15 bg-forge-blue/5 mb-3">
                  <div className="w-1 h-1 rounded-full bg-forge-blue/50" />
                  <span className="text-[10px] forge-mono text-forge-blue/50 tracking-widest">
                    TAVRONUS FORGE v0.1
                  </span>
                </div>

                {/* Primary headline */}
                <h1 className="text-xl font-bold text-forge-chrome tracking-tight leading-snug mb-1">
                  Command your build.
                </h1>
                <p className="text-xs text-forge-silver/40 leading-relaxed">
                  Plan, prompt, review, debug, and ship from one cockpit.
                </p>
              </div>
            </div>

            {/* Starter actions */}
            <div className="px-6 pb-4 flex-shrink-0">
              <p className="text-[10px] text-forge-muted/30 forge-mono uppercase tracking-widest mb-2">
                Quick start
              </p>
              <div className="flex flex-wrap gap-1.5">
                {STARTER_ACTIONS.map((action) => {
                  const isActive = activeMode === action.mode && input === action.example;
                  return (
                    <button
                      key={action.mode}
                      onClick={() => handleStarterAction(action)}
                      className={`
                        flex items-center gap-1.5 px-2.5 py-1.5 rounded border text-xs forge-mono
                        transition-all duration-150 active:scale-95
                        ${
                          isActive
                            ? "border-forge-blue/40 bg-forge-blue/10 text-forge-blue/80"
                            : "border-forge-border/40 text-forge-silver/45 hover:border-forge-blue/20 hover:text-forge-chrome hover:bg-forge-panel/40"
                        }
                      `}
                    >
                      <span className={`text-sm leading-none ${isActive ? "text-forge-blue/70" : "text-forge-muted/40"}`}>
                        {action.icon}
                      </span>
                      {action.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Command input */}
            <div className="px-6 pb-4 flex-shrink-0">
              {/* Mode label above input */}
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[10px] text-forge-blue/50 forge-mono uppercase tracking-widest">
                  {mode.icon} {mode.label} Mode
                </span>
                <span className="text-[10px] text-forge-muted/25 forge-mono">·</span>
                <span className="text-[10px] text-forge-muted/30 forge-mono">
                  What are we building?
                </span>
              </div>

              <div
                className="rounded-lg border overflow-hidden transition-colors duration-150 focus-within:border-forge-blue/30"
                style={{
                  borderColor: "rgba(37,43,53,0.8)",
                  background: "rgba(13,15,18,0.9)",
                }}
              >
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={mode.placeholder}
                  rows={6}
                  className="w-full bg-transparent px-4 py-3 text-sm text-forge-chrome placeholder:text-forge-muted/30
                    forge-mono resize-none outline-none leading-relaxed"
                />
                {/* Textarea toolbar */}
                <div className="flex items-center justify-between px-4 py-2 border-t border-forge-border/25 bg-forge-black/30">
                  <span className="text-[10px] text-forge-muted/30 forge-mono">
                    {input.length > 0 ? `${input.length} chars` : "Describe an app, feature, bug, prompt, or code problem..."}
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

            {/* Mobile output (hidden on lg — right panel takes over) */}
            <div className="flex-1 overflow-y-auto px-6 pb-4 lg:hidden">
              <OutputArea output={output} isGenerating={isGenerating} modeIcon={mode.icon} />
            </div>
          </div>

          {/* ── RIGHT PANEL: Forge Output ───────────────────────────── */}
          <div className="hidden lg:flex flex-col w-[340px] xl:w-[380px] flex-shrink-0 border-l border-forge-border/40 bg-forge-obsidian/20 overflow-hidden">
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
              <OutputArea output={output} isGenerating={isGenerating} modeIcon={mode.icon} />
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

/* Shared output area — used by both right panel (desktop) and inline (mobile) */
function OutputArea({
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
      <div className="flex flex-col items-center justify-center h-full min-h-[160px] gap-3">
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
      <div className="flex flex-col items-center justify-center h-full min-h-[160px] gap-3 text-center px-4">
        <div
          className="w-8 h-8 border border-forge-border/40 rounded flex items-center justify-center text-base"
          style={{ color: "rgba(138,149,163,0.2)" }}
        >
          {modeIcon}
        </div>
        <div>
          <p className="text-xs text-forge-muted/30">No output yet.</p>
          <p className="text-[10px] text-forge-muted/20 mt-0.5 leading-relaxed">
            Choose a command or describe what you want to build.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2.5">
      {output.map((card, i) => (
        <OutputCard key={card.title} title={card.title} content={card.content} index={i} />
      ))}
    </div>
  );
}
