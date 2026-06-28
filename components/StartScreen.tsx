"use client";

import Link from "next/link";
import { ForgeBadge } from "@/components/ui";

function ForgeLogo() {
  return (
    <div
      className="w-6 h-6 border border-forge-blue/30 flex items-center justify-center flex-shrink-0"
      style={{ boxShadow: "0 0 6px rgba(45,142,255,0.10)" }}
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
    description: "Create a fresh TSX file.",
    href: "/workspace?mode=file&name=untitled.tsx",
  },
  {
    key: "open-workspace",
    icon: "⌘",
    label: "Open Workspace",
    description: "Enter the Forge cockpit.",
    href: "/workspace?mode=workspace",
  },
  {
    key: "open-project",
    icon: "⌗",
    label: "Open Mock Project",
    description: "Load the demo file tree.",
    href: "/workspace?mode=mock-project&name=tavronus-forge-demo",
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
      <header className="flex items-center justify-between px-5 h-10 border-b border-forge-border/35 bg-forge-obsidian/50 flex-shrink-0">
        <div className="flex items-center gap-2.5">
          <ForgeLogo />
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-semibold text-forge-chrome tracking-widest uppercase forge-mono">
              Tavronus
            </span>
            <span className="text-[11px] text-forge-blue/55 tracking-widest uppercase forge-mono">
              Forge
            </span>
          </div>
          <div className="w-px h-3 bg-forge-border/30 mx-1" />
          <span className="text-[10px] text-forge-muted/25 forge-mono hidden sm:block">
            by Tavronus Labs
          </span>
        </div>

        <div className="flex items-center gap-3">
          <ForgeBadge variant="mock" className="hidden sm:inline-flex forge-mono">
            Local Mock Mode
          </ForgeBadge>
          <Link
            href="/about"
            className="text-[10px] text-forge-muted/30 hover:text-forge-silver/60 transition-colors forge-mono"
          >
            About
          </Link>
        </div>
      </header>

      {/* ── MAIN CONTENT ────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col items-center justify-center overflow-y-auto px-6 py-10">
        <div className="w-full max-w-lg">

          {/* Hero */}
          <div className="mb-8">
            <h1 className="text-xl font-semibold text-forge-chrome mb-1.5 tracking-tight">
              Start building.
            </h1>
            <p className="text-[13px] text-forge-silver/35">
              Create a file or open a project.
            </p>
            <p className="text-[10px] text-forge-blue/45 forge-mono tracking-[0.3em] uppercase mt-3">
              Plan. Prompt. Code. Ship.
            </p>
          </div>

          {/* Action cards — flat horizontal tiles */}
          <div className="flex flex-col gap-1.5 mb-8">
            {ACTIONS.map((action) => (
              <Link
                key={action.key}
                href={action.href}
                className="flex items-center gap-4 px-4 py-3 rounded-lg border border-forge-border/30
                  bg-forge-panel/5 hover:bg-forge-panel/20 hover:border-forge-border/50
                  transition-all duration-100 group"
              >
                <span className="text-forge-muted/35 text-sm w-5 text-center flex-shrink-0 group-hover:text-forge-blue/55 transition-colors forge-mono">
                  {action.icon}
                </span>
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="text-[13px] font-medium text-forge-chrome/85 group-hover:text-forge-chrome transition-colors">
                    {action.label}
                  </span>
                  <span className="text-[11px] text-forge-muted/35 truncate hidden sm:block">
                    {action.description}
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Demo Recent section — these are illustrative mock entries, not real history */}
          <div>
            <p className="text-[9px] text-forge-muted/25 uppercase tracking-widest forge-mono mb-2">
              Demo Recent{" "}
              <span className="text-forge-muted/18 lowercase tracking-normal">· sample entries</span>
            </p>
            <div className="flex flex-col">
              {RECENT.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-3 py-2 border-b border-forge-border/15
                    hover:bg-forge-panel/10 px-2 -mx-2 rounded transition-colors group"
                >
                  <span className="text-forge-muted/20 text-[10px] forge-mono w-3 flex-shrink-0">
                    {item.type === "file" ? "◦" : "⌗"}
                  </span>
                  <span className="text-[12px] text-forge-silver/40 group-hover:text-forge-chrome/70 transition-colors truncate forge-mono">
                    {item.label}
                  </span>
                  <span className="ml-auto text-[9px] text-forge-muted/20 forge-mono flex-shrink-0">
                    {item.time}
                  </span>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ── STATUS BAR ──────────────────────────────────────────── */}
      <div className="flex items-center justify-between px-4 h-6 border-t border-forge-border/30 bg-forge-black flex-shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-1 h-1 rounded-full bg-forge-success/45 animate-pulse" />
          <span className="text-[10px] forge-mono text-forge-muted/30">Forge shell active</span>
          <span className="text-[10px] forge-mono text-forge-border/40">·</span>
          <span className="text-[10px] forge-mono text-forge-muted/25">localhost:5642</span>
          <span className="text-[10px] forge-mono text-forge-border/40">·</span>
          <span className="text-[10px] forge-mono text-forge-muted/22">mock mode</span>
        </div>
        <span className="text-[10px] forge-mono text-forge-muted/18">v0.1</span>
      </div>

    </div>
  );
}
