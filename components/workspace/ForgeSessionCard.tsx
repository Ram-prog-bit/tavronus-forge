"use client";

import type { ForgeSession } from "@/hooks/useForgeAI";

interface ForgeSessionCardProps {
  session: ForgeSession | null;
  onReset: () => void;
}

export default function ForgeSessionCard({ session, onReset }: ForgeSessionCardProps) {
  return (
    <div className="px-3 py-2.5 border-b border-forge-border/20 flex-shrink-0">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-[9px] uppercase tracking-widest forge-mono text-forge-muted/40">
          Current Forge Session
        </span>
        {session && (
          <button
            onClick={onReset}
            aria-label="Reset Forge session"
            className="text-[9px] forge-mono text-forge-muted/30 hover:text-forge-silver/55 transition-colors"
          >
            Reset
          </button>
        )}
      </div>

      {session ? (
        <div
          className="rounded border border-forge-border/25 bg-forge-black/30 p-2.5 flex flex-col gap-1.5"
          style={{ boxShadow: "inset 0 0 0 1px rgba(45,142,255,0.04)" }}
        >
          {/* Goal */}
          <div className="flex items-start gap-2 text-[10px] forge-mono">
            <span className="text-forge-muted/35 w-[58px] flex-shrink-0">Goal</span>
            <span className="text-forge-silver/65 flex-1 min-w-0 truncate" title={session.projectGoal}>
              {session.projectGoal || "—"}
            </span>
          </div>

          {/* Phase */}
          <div className="flex items-center gap-2 text-[10px] forge-mono">
            <span className="text-forge-muted/35 w-[58px] flex-shrink-0">Phase</span>
            <span className="flex items-center gap-1.5 text-forge-blue/70">
              <span className="w-1.5 h-1.5 rounded-full bg-forge-blue/60 animate-pulse" />
              {session.phase}
            </span>
          </div>

          {/* Artifacts */}
          <div className="flex items-start gap-2 text-[10px] forge-mono">
            <span className="text-forge-muted/35 w-[58px] flex-shrink-0 pt-0.5">Artifacts</span>
            <div className="flex flex-wrap gap-1 flex-1 min-w-0">
              {session.artifactsCreated.length ? (
                session.artifactsCreated.map((a) => (
                  <span
                    key={a}
                    className="px-1.5 py-px rounded bg-forge-gunmetal/70 border border-forge-border/25 text-forge-silver/55"
                  >
                    {a}
                  </span>
                ))
              ) : (
                <span className="text-forge-silver/40">—</span>
              )}
            </div>
          </div>

          {/* Current File */}
          <div className="flex items-start gap-2 text-[10px] forge-mono">
            <span className="text-forge-muted/35 w-[58px] flex-shrink-0">File</span>
            <span className="text-forge-silver/65 flex-1 min-w-0 truncate">
              {session.currentFile || "Workspace context"}
            </span>
          </div>

          {/* Next Step */}
          <div className="flex items-start gap-2 text-[10px] forge-mono">
            <span className="text-forge-muted/35 w-[58px] flex-shrink-0">Next</span>
            <span className="text-forge-blue/55 flex-1 min-w-0 break-words">
              {session.nextStep}
            </span>
          </div>
        </div>
      ) : (
        <p className="text-[10px] text-forge-muted/30 forge-mono leading-relaxed">
          No active Forge session yet. Generate a plan to start tracking this build.
        </p>
      )}
    </div>
  );
}
