"use client";

import Link from "next/link";

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

const ACTIONS = [
  {
    key: "new",
    icon: "+",
    label: "New File",
    description: "Start with a blank file in the Forge editor.",
    href: "/workspace?mode=file&name=untitled.tsx",
    shortcut: "⌘N",
  },
  {
    key: "open-file",
    icon: "↑",
    label: "Open File",
    description: "Load an existing file into the Forge workspace.",
    href: "/workspace?mode=file&name=example-component.tsx",
    shortcut: "⌘O",
  },
  {
    key: "open-project",
    icon: "⌗",
    label: "Open Project",
    description: "Open a project folder and browse its files.",
    href: "/workspace?mode=project&name=tavronus-forge-demo",
    shortcut: "⌘⇧O",
  },
];

const RECENT = [
  {
    label: "tavronus-forge-v0.1",
    type: "project",
    time: "today",
    href: "/workspace?mode=project&name=tavronus-forge-v01",
  },
  {
    label: "homework-tracker.tsx",
    type: "file",
    time: "yesterday",
    href: "/workspace?mode=file&name=homework-tracker.tsx",
  },
  {
    label: "gym-dashboard-app",
    type: "project",
    time: "2d ago",
    href: "/workspace?mode=project&name=gym-dashboard-app",
  },
  {
    label: "ai-prompt-builder",
    type: "project",
    time: "3d ago",
    href: "/workspace?mode=project&name=ai-prompt-builder",
  },
];

export default function StartScreen() {
  return (
    <div className="flex flex-col h-screen bg-forge-black overflow-hidden">

      {/* ── TOP BAR ─────────────────────────────────────────────── */}
      <header className="flex items-center justify-between px-5 h-10 border-b border-forge-border/50 bg-forge-obsidian/60 flex-shrink-0">
        <div className="flex items-center gap-2.5">
          <ForgeLogo />
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-semibold text-forge-chrome tracking-widest uppercase forge-mono">
              Tavronus
            </span>
            <span className="text-xs text-forge-blue/60 tracking-widest uppercase forge-mono">
              Forge
            </span>
          </div>
          <div className="w-px h-3 bg-forge-border/40 mx-1" />
          <span className="text-[10px] text-forge-muted/30 forge-mono hidden sm:block">
            by Tavronus Labs
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div
            className="hidden sm:flex items-center gap-1.5 px-2 py-1 rounded border border-forge-border/40 text-[10px] forge-mono"
            style={{ color: "rgba(45,142,255,0.5)" }}
          >
            <div className="w-1 h-1 rounded-full bg-forge-blue/50 animate-pulse" />
            Local Mock Mode
          </div>
          <Link
            href="/about"
            className="text-[10px] text-forge-silver/30 hover:text-forge-chrome transition-colors forge-mono"
          >
            About
          </Link>
        </div>
      </header>

      {/* ── MAIN CONTENT ────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col items-center justify-center overflow-y-auto px-6 py-10">
        <div className="w-full max-w-2xl">

          {/* Hero */}
          <div className="mb-10">
            <h1 className="text-2xl font-bold text-forge-chrome mb-2 tracking-tight">
              Start building.
            </h1>
            <p className="text-sm text-forge-silver/40">
              Create a new file, open an existing one, or load a project into the Forge workspace.
            </p>
          </div>

          {/* Action cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-10">
            {ACTIONS.map((action) => (
              <Link
                key={action.key}
                href={action.href}
                className="flex flex-col gap-4 p-5 rounded-xl border border-forge-border/50
                  bg-forge-panel/10 hover:border-forge-blue/35 hover:bg-forge-panel/25
                  transition-all duration-150 group cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div
                    className="w-8 h-8 flex items-center justify-center text-base
                      border border-forge-border/40 rounded text-forge-silver/40
                      group-hover:border-forge-blue/35 group-hover:text-forge-blue/70
                      transition-all duration-150"
                  >
                    {action.icon}
                  </div>
                  <span className="text-[9px] text-forge-muted/20 forge-mono">
                    {action.shortcut}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-forge-chrome mb-0.5 group-hover:text-white transition-colors">
                    {action.label}
                  </p>
                  <p className="text-xs text-forge-silver/35 leading-relaxed">
                    {action.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {/* Recent section */}
          <div>
            <p className="text-[10px] text-forge-muted/30 uppercase tracking-widest forge-mono mb-3">
              Recent
            </p>
            <div className="flex flex-col">
              {RECENT.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-3 py-2.5 border-b border-forge-border/20
                    hover:bg-forge-panel/15 px-2 -mx-2 rounded transition-colors group"
                >
                  <span className="text-forge-muted/25 text-[10px] forge-mono w-3 flex-shrink-0">
                    {item.type === "file" ? "◦" : "⌗"}
                  </span>
                  <span className="text-sm text-forge-silver/45 group-hover:text-forge-chrome transition-colors truncate">
                    {item.label}
                  </span>
                  <span className="ml-auto text-[10px] text-forge-muted/25 forge-mono flex-shrink-0">
                    {item.time}
                  </span>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ── STATUS BAR ──────────────────────────────────────────── */}
      <div className="flex items-center justify-between px-4 h-6 border-t border-forge-border/40 bg-forge-black/80 flex-shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-1 h-1 rounded-full bg-green-500/50 animate-pulse" />
          <span className="text-[10px] forge-mono text-forge-muted/35">Forge shell active</span>
          <span className="text-[10px] forge-mono text-forge-blue/20">·</span>
          <span className="text-[10px] forge-mono text-forge-muted/30">localhost:5642</span>
          <span className="text-[10px] forge-mono text-forge-blue/20">·</span>
          <span className="text-[10px] forge-mono text-forge-muted/25">mock mode</span>
        </div>
        <span className="text-[10px] forge-mono text-forge-muted/20">v0.1</span>
      </div>

    </div>
  );
}
