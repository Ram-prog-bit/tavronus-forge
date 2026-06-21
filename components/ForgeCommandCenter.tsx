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
      "A task manager SaaS with AI-powered priority scoring, project grouping, and a daily focus dashboard. Users can add tasks, set deadlines, and let the AI suggest what to work on first.",
  },
  {
    label: "Generate a prompt",
    mode: "prompt",
    icon: "◈",
    example:
      "Generate a Claude prompt for building a Next.js 14 API route with Supabase auth, row-level security, and Zod input validation. The route handles POST /api/tasks.",
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

function ForgeLogo() {
  return (
    <div
      className="w-6 h-6 border border-forge-blue/40 flex items-center justify-center flex-shrink-0"
      style={{ boxShadow: "0 0 8px rgba(45,142,255,0.2)" }}
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
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
    setTimeout(() => {
      textareaRef.current?.focus();
    }, 50);
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
    <div className="flex h-screen bg-forge-black overflow-hidden select-none">
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
              <p className="text-xs font-semibold text-forge-chrome tracking-widest uppercase forge-mono">
                Tavronus
              </p>
              <p className="text-xs text-forge-blue/70 tracking-widest uppercase forge-mono -mt-0.5">
                Forge
              </p>
            </div>
          </div>
          <p className="text-xs text-forge-muted/40 forge-mono mt-2 tracking-wide">
            by Tavronus Labs
          </p>
        </div>

        {/* Mode selector */}
        <div className="flex-1 px-2 py-3 overflow-y-auto">
          <p className="text-xs text-forge-muted/40 tracking-widest uppercase forge-mono px-1 mb-2">
            Modes
          </p>
          <ModeSelector activeMode={activeMode} onSelect={handleModeChange} />
        </div>

        {/* Sidebar footer */}
        <div className="px-4 py-3 border-t border-forge-border/40">
          <Link
            href="/workspace"
            className="flex items-center gap-2 text-xs text-forge-silver/40 hover:text-forge-blue/70 transition-colors forge-mono group"
          >
            <span className="group-hover:text-forge-blue/70">⌗</span>
            Full Workspace
          </Link>
        </div>
      </aside>

      {/* ── MAIN BODY ─────────────────────────────────────────────── */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* TOP BAR */}
        <header className="flex items-center justify-between px-4 h-12 border-b border-forge-border/60 bg-forge-obsidian/80 flex-shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-1.5 rounded text-forge-silver/40 hover:text-forge-chrome hover:bg-forge-panel/60 transition-colors"
              title="Toggle sidebar"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
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
          <div className="flex items-center gap-3">
            <span className="text-xs forge-mono text-forge-muted/40 hidden sm:block">
              ⌘↵ to generate
            </span>
            <div
              className="flex items-center gap-1.5 px-2.5 py-1 rounded border border-forge-border/50 text-xs forge-mono"
              style={{ color: "rgba(45,142,255,0.55)" }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-forge-blue/50 animate-pulse" />
              Local mock mode
            </div>
            <Link
              href="/workspace"
              className="hidden sm:flex items-center gap-1.5 text-xs text-forge-silver/40 hover:text-forge-chrome transition-colors forge-mono border border-forge-border/40 hover:border-forge-border/70 px-2.5 py-1 rounded"
            >
              Workspace →
            </Link>
          </div>
        </header>

        {/* COMMAND AREA + OUTPUT PANEL */}
        <div className="flex flex-1 min-h-0 overflow-hidden">
          {/* ── CENTER: Command input ──────────────────────────────── */}
          <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
            {/* Compact app header — NOT marketing */}
            <div className="px-6 pt-7 pb-5 flex-shrink-0 border-b border-forge-border/30">
              <div className="max-w-2xl">
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1.5 px-2 py-0.5 border border-forge-blue/20 bg-forge-blue/5 rounded">
                    <div className="w-1 h-1 rounded-full bg-forge-blue/60" />
                    <span className="text-xs forge-mono text-forge-blue/60 tracking-widest">
                      TAVRONUS FORGE v0.1
                    </span>
                  </div>
                </div>
                <h1 className="text-2xl font-bold text-forge-chrome tracking-tight mb-1.5">
                  Command your build.
                </h1>
                <p className="text-sm text-forge-silver/45 leading-relaxed">
                  Plan, prompt, review, debug, and ship from one AI coding cockpit.
                </p>
              </div>
            </div>

            {/* Starter action chips */}
            <div className="px-6 py-4 flex-shrink-0 border-b border-forge-border/25">
              <p className="text-xs text-forge-muted/40 forge-mono uppercase tracking-widest mb-3">
                Quick start
              </p>
              <div className="flex flex-wrap gap-2">
                {STARTER_ACTIONS.map((action) => {
                  const isActive = activeMode === action.mode;
                  return (
                    <button
                      key={action.mode}
                      onClick={() => handleStarterAction(action)}
                      className={`
                        flex items-center gap-1.5 px-3 py-1.5 rounded border text-xs forge-mono
                        transition-all duration-150 active:scale-95
                        ${
                          isActive
                            ? "border-forge-blue/40 bg-forge-blue/10 text-forge-blue/90"
                            : "border-forge-border/50 text-forge-silver/50 hover:border-forge-blue/25 hover:text-forge-chrome hover:bg-forge-panel/40"
                        }
                      `}
                    >
                      <span className={isActive ? "text-forge-blue" : "text-forge-muted/60"}>
                        {action.icon}
                      </span>
                      {action.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Command textarea */}
            <div className="px-6 py-4 flex-shrink-0">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs text-forge-blue/60 forge-mono uppercase tracking-widest">
                  {mode.icon} {mode.label}
                </span>
              </div>
              <div
                className="rounded-lg border overflow-hidden transition-colors duration-150 focus-within:border-forge-blue/35"
                style={{
                  borderColor: "rgba(37,43,53,0.9)",
                  background: "rgba(13,15,18,0.85)",
                }}
              >
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={mode.placeholder}
                  rows={6}
                  className="w-full bg-transparent px-4 py-3 text-sm text-forge-chrome placeholder:text-forge-muted/35
                    forge-mono resize-none outline-none leading-relaxed select-text"
                />
                <div className="flex items-center justify-between px-4 py-2 border-t border-forge-border/30 bg-forge-black/30">
                  <span className="text-xs text-forge-muted/35 forge-mono">
                    {input.length > 0 ? `${input.length} chars` : "Describe an app, feature, bug, prompt, or code problem..."}
                  </span>
                  <div className="flex items-center gap-2">
                    {(input || output) && (
                      <button
                        onClick={handleClear}
                        className="text-xs forge-mono text-forge-muted/45 hover:text-forge-silver/70
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
                            ? "opacity-35 cursor-not-allowed text-forge-silver bg-forge-panel border border-forge-border/40"
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
                          <span>⚡</span>
                          Forge Output
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile output — shown only on small screens (lg hides the right panel) */}
            <div className="flex-1 overflow-y-auto px-6 pb-4 lg:hidden">
              <MobileOutputArea
                output={output}
                isGenerating={isGenerating}
                modeIcon={mode.icon}
                modeButtonLabel={mode.buttonLabel}
              />
            </div>
          </div>

          {/* ── RIGHT PANEL: Forge Output ──────────────────────────── */}
          <div className="hidden lg:flex flex-col w-80 xl:w-96 flex-shrink-0 border-l border-forge-border/50 bg-forge-obsidian/30 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-forge-border/40 flex-shrink-0">
              <span className="text-xs text-forge-muted/50 uppercase tracking-widest forge-mono">
                Forge Output
              </span>
              {output && (
                <span className="text-xs text-forge-blue/50 forge-mono">
                  {output.length} sections
                </span>
              )}
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {!output && !isGenerating && (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center px-4">
                  <div
                    className="w-10 h-10 border border-forge-border/50 rounded flex items-center justify-center text-xl"
                    style={{ color: "rgba(138,149,163,0.25)" }}
                  >
                    {mode.icon}
                  </div>
                  <div>
                    <p className="text-xs text-forge-muted/40 leading-relaxed">
                      No output yet.
                    </p>
                    <p className="text-xs text-forge-muted/30 mt-1 leading-relaxed">
                      Choose a command or describe what you want to build.
                    </p>
                  </div>
                </div>
              )}

              {isGenerating && (
                <div className="flex flex-col items-center justify-center h-full gap-4">
                  <div className="flex gap-1.5">
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-forge-blue/60 animate-bounce"
                        style={{ animationDelay: `${i * 0.15}s` }}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-forge-muted/40 forge-mono">Forge is thinking...</p>
                </div>
              )}

              {output && !isGenerating && (
                <div className="flex flex-col gap-3">
                  {output.map((card, i) => (
                    <OutputCard
                      key={card.title}
                      title={card.title}
                      content={card.content}
                      index={i}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* STATUS BAR */}
        <div className="flex items-center justify-between px-4 h-7 border-t border-forge-border/40 bg-forge-black/80 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500/60 animate-pulse" />
            <span className="text-xs forge-mono text-forge-muted/40">Forge shell active</span>
            <span className="text-xs forge-mono text-forge-blue/25">·</span>
            <span className="text-xs forge-mono text-forge-muted/35">localhost:5642</span>
            <span className="text-xs forge-mono text-forge-blue/25">·</span>
            <span className="text-xs forge-mono text-forge-muted/35">mock mode</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs forge-mono text-forge-muted/30">{mode.label}</span>
            <span className="text-xs forge-mono text-forge-muted/25">·</span>
            <span className="text-xs forge-mono text-forge-muted/25">v0.1</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Small utility component for mobile output (below textarea on small screens)
function MobileOutputArea({
  output,
  isGenerating,
  modeIcon,
  modeButtonLabel,
}: {
  output: { title: string; content: string }[] | null;
  isGenerating: boolean;
  modeIcon: string;
  modeButtonLabel: string;
}) {
  if (!output && !isGenerating) {
    return (
      <div className="flex items-center justify-center py-12 text-center">
        <div>
          <p className="text-xs text-forge-muted/35 forge-mono">
            Click{" "}
            <span className="text-forge-blue/50">⚡ Forge Output</span> to generate
          </p>
        </div>
      </div>
    );
  }

  if (isGenerating) {
    return (
      <div className="flex flex-col items-center justify-center py-12 gap-4">
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-forge-blue/60 animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
        <p className="text-xs text-forge-muted/40 forge-mono">Forge is thinking...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 pt-2">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-xs text-forge-muted/40 forge-mono uppercase tracking-widest">
          Forge Output
        </span>
        {output && (
          <span className="text-xs text-forge-blue/40 forge-mono">· {output?.length} sections</span>
        )}
      </div>
      {output?.map((card, i) => (
        <OutputCard key={card.title} title={card.title} content={card.content} index={i} />
      ))}
    </div>
  );
}
