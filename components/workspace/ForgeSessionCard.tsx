"use client";

import { useState } from "react";
import type { ForgeSession } from "@/hooks/useForgeAI";

const MAX_CHIPS = 6;

interface ForgeSessionCardProps {
  session: ForgeSession | null;
  onReset: () => void;
  onEditGoal: (goal: string) => void;
}

export default function ForgeSessionCard({ session, onReset, onEditGoal }: ForgeSessionCardProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState("");
  const [expanded, setExpanded] = useState(false);

  const startEdit = () => {
    setDraft(session?.projectGoal ?? "");
    setEditing(true);
  };

  const saveEdit = () => {
    if (!editing) return;
    const next = draft.trim();
    if (next) onEditGoal(next);
    setEditing(false);
  };

  const cancelEdit = () => setEditing(false);

  const chips = session?.artifactsCreated ?? [];
  const visible = expanded ? chips : chips.slice(0, MAX_CHIPS);
  const hidden = chips.length - visible.length;

  return (
    <div className="px-3 py-2.5 border-b border-forge-border/30 flex-shrink-0">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-[9px] uppercase tracking-widest forge-mono text-forge-muted/55">
          Current Forge Session
        </span>
        {session && (
          <div className="flex items-center gap-2">
            <button
              onClick={startEdit}
              aria-label="Edit project goal"
              className="forge-press text-[9px] forge-mono text-forge-silver/50 hover:text-forge-chrome/75"
            >
              Edit
            </button>
            <button
              onClick={onReset}
              aria-label="Reset Forge session"
              className="forge-press text-[9px] forge-mono text-forge-silver/50 hover:text-forge-chrome/75"
            >
              Reset
            </button>
          </div>
        )}
      </div>

      {session ? (
        <div
          className="rounded border border-forge-border/30 bg-forge-black/30 p-2.5 flex flex-col gap-1.5"
          style={{ boxShadow: "inset 0 0 0 1px rgba(45,142,255,0.04)" }}
        >
          {/* Goal */}
          <div className="flex items-start gap-2 text-[10px] forge-mono">
            <span className="text-forge-muted/55 w-[58px] flex-shrink-0">Goal</span>
            {editing ? (
              <input
                autoFocus
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onBlur={saveEdit}
                onKeyDown={(e) => {
                  if (e.key === "Enter") { e.preventDefault(); saveEdit(); }
                  else if (e.key === "Escape") { e.preventDefault(); cancelEdit(); }
                }}
                aria-label="Project goal"
                className="flex-1 min-w-0 bg-forge-black/40 border border-forge-blue/30 rounded
                  px-1.5 py-0.5 text-forge-chrome outline-none focus:border-forge-blue/50"
              />
            ) : (
              <span className="text-forge-silver/75 flex-1 min-w-0 truncate" title={session.projectGoal}>
                {session.projectGoal || "—"}
              </span>
            )}
          </div>

          {/* Phase */}
          <div className="flex items-center gap-2 text-[10px] forge-mono">
            <span className="text-forge-muted/55 w-[58px] flex-shrink-0">Phase</span>
            <span className="flex items-center gap-1.5 text-forge-blue/70">
              <span className="w-1.5 h-1.5 rounded-full bg-forge-blue/60 animate-pulse" />
              {session.phase}
            </span>
          </div>

          {/* Artifacts (capped, expandable) */}
          <div className="flex items-start gap-2 text-[10px] forge-mono">
            <span className="text-forge-muted/55 w-[58px] flex-shrink-0 pt-0.5">Artifacts</span>
            <div className="flex flex-wrap gap-1 flex-1 min-w-0">
              {chips.length ? (
                <>
                  {visible.map((a) => (
                    <span
                      key={a}
                      className="px-1.5 py-px rounded bg-forge-gunmetal/70 border border-forge-border/30 text-forge-silver/70"
                    >
                      {a}
                    </span>
                  ))}
                  {hidden > 0 && (
                    <button
                      onClick={() => setExpanded(true)}
                      className="px-1.5 py-px rounded border border-forge-blue/25 text-forge-blue/55 hover:text-forge-blue/80 transition-colors"
                    >
                      +{hidden} more
                    </button>
                  )}
                  {expanded && chips.length > MAX_CHIPS && (
                    <button
                      onClick={() => setExpanded(false)}
                      className="px-1.5 py-px rounded border border-forge-border/25 text-forge-muted/40 hover:text-forge-silver/55 transition-colors"
                    >
                      show less
                    </button>
                  )}
                </>
              ) : (
                <span className="text-forge-silver/40">—</span>
              )}
            </div>
          </div>

          {/* Current File */}
          <div className="flex items-start gap-2 text-[10px] forge-mono">
            <span className="text-forge-muted/55 w-[58px] flex-shrink-0">File</span>
            <span className="text-forge-silver/65 flex-1 min-w-0 truncate">
              {session.currentFile || "Workspace context"}
            </span>
          </div>

          {/* Next Step */}
          <div className="flex items-start gap-2 text-[10px] forge-mono">
            <span className="text-forge-muted/55 w-[58px] flex-shrink-0">Next</span>
            <span className="text-forge-blue/70 flex-1 min-w-0 break-words">
              {session.nextStep}
            </span>
          </div>
        </div>
      ) : (
        <p className="text-[10px] text-forge-silver/50 forge-mono leading-relaxed">
          No active Forge session yet. Generate a plan to start tracking this build.
        </p>
      )}
    </div>
  );
}
