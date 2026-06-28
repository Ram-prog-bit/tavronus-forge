import {
  ForgeCard,
  ForgeBadge,
  ForgeStatus,
  type ForgeStatusValue,
} from "@/components/ui";
import { cn } from "@/lib/utils";

// MissionControlPreview — a STATIC / MOCK operating picture for Forge v2. Shows the
// current mission, build phase tracker, real-vs-planned systems, next action, and
// risks. No live state, no backend. Phases reflect docs/commits at authoring time.
// See docs/FORGE_V2_REALITY_MAP.md.

interface Phase {
  label: string;
  state: "complete" | "current" | "planned";
}

const PHASES: Phase[] = [
  { label: "V1 backup", state: "complete" },
  { label: "CEO engine priming", state: "complete" },
  { label: "Design System", state: "complete" },
  { label: "Shell / Layout", state: "complete" },
  { label: "Workspace command surface", state: "complete" },
  { label: "Home / About honesty", state: "complete" },
  { label: "Vercel preview QA", state: "complete" },
  { label: "Evidence Vault mock", state: "complete" },
  { label: "Patch Review mock", state: "complete" },
  { label: "Mission Control / Project Memory", state: "current" },
  { label: "Workspace integration polish", state: "planned" },
  { label: "Final V2 preview QA", state: "planned" },
];

const PHASE_META: Record<Phase["state"], { status: ForgeStatusValue; label: string }> = {
  complete: { status: "complete", label: "Done" },
  current: { status: "working", label: "Current" },
  planned: { status: "idle", label: "Planned" },
};

const REAL_TODAY = [
  "Local Next.js app + design system",
  "Shell, home, about, workspace surface",
  "Static Evidence Vault + Patch Review previews",
  "Docs-backed project memory",
  "Branch preview workflow",
];

const PLANNED = [
  "Real AI orchestration in-app",
  "Backend, auth, database",
  "Real evidence ingestion + patch apply",
  "Terminal / filesystem / browser automation",
];

const RISKS = [
  "Pre-existing npm audit advisories — tracked, not fixed",
  "GStack activation blocked by missing Bun (staged only)",
  "No production merge until human review",
  "Honesty: every mock surface must stay labeled",
];

export default function MissionControlPreview({ className }: { className?: string }) {
  return (
    <section
      className={cn(
        "rounded-forge-panel border border-forge-border bg-forge-obsidian/40 p-4",
        className,
      )}
      aria-label="Mission Control preview"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-sm font-semibold text-forge-chrome">Mission Control</span>
          <ForgeBadge variant="mock">Static preview</ForgeBadge>
        </div>
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <ForgeBadge variant="info">Docs-backed</ForgeBadge>
          <ForgeBadge variant="planned">No backend</ForgeBadge>
        </div>
      </div>
      <p className="text-[11px] text-forge-silver/55 leading-relaxed mb-3">
        A local preview of the Forge operating picture. Real integrations are not connected
        yet — this reflects project docs and commits, not live state.
      </p>

      {/* Current mission */}
      <ForgeCard variant="subtle" className="p-3 mb-3">
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <span className="text-xs font-semibold text-forge-chrome">Current mission</span>
          <ForgeStatus status="working" label="In progress" />
        </div>
        <p className="text-[11px] text-forge-silver/60 leading-relaxed">
          Forge v2 preview MVP — build a local/mock mission-control surface before any real
          integrations, with honest mock/real labeling at every step.
        </p>
        <div className="flex items-center flex-wrap gap-x-2 gap-y-1 text-[10px] forge-mono text-forge-muted/55 mt-2">
          <span>Branch <span className="text-forge-blue/60">forge-v2-rebuild</span></span>
          <span>·</span>
          <span>Local mock mode</span>
        </div>
      </ForgeCard>

      {/* Phase tracker */}
      <p className="text-[10px] uppercase tracking-widest forge-mono text-forge-muted/55 mb-1.5">
        Build phases
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-1.5 mb-3">
        {PHASES.map((p) => {
          const meta = PHASE_META[p.state];
          return (
            <div key={p.label} className="flex items-center justify-between gap-2">
              <span
                className={cn(
                  "text-[11px] truncate",
                  p.state === "complete" && "text-forge-silver/55",
                  p.state === "current" && "text-forge-chrome font-medium",
                  p.state === "planned" && "text-forge-muted/55",
                )}
              >
                {p.label}
              </span>
              <ForgeStatus status={meta.status} label={meta.label} className="flex-shrink-0" />
            </div>
          );
        })}
      </div>

      {/* Systems snapshot */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
        <ForgeCard variant="subtle" className="p-3">
          <div className="flex items-center gap-2 mb-2">
            <ForgeBadge variant="real" />
            <span className="text-xs font-semibold text-forge-chrome">Real today</span>
          </div>
          <ul className="flex flex-col gap-1">
            {REAL_TODAY.map((s) => (
              <li key={s} className="flex items-start gap-1.5 text-[11px] text-forge-silver/60">
                <span className="text-forge-success/70 mt-0.5 flex-shrink-0">✓</span>
                {s}
              </li>
            ))}
          </ul>
        </ForgeCard>
        <ForgeCard variant="subtle" className="p-3">
          <div className="flex items-center gap-2 mb-2">
            <ForgeBadge variant="planned" />
            <span className="text-xs font-semibold text-forge-chrome">Planned · not connected</span>
          </div>
          <ul className="flex flex-col gap-1">
            {PLANNED.map((s) => (
              <li key={s} className="flex items-start gap-1.5 text-[11px] text-forge-silver/55">
                <span className="text-forge-warn/70 mt-0.5 flex-shrink-0">○</span>
                {s}
              </li>
            ))}
          </ul>
        </ForgeCard>
      </div>

      {/* Next action */}
      <ForgeCard variant="subtle" className="p-3 mb-3">
        <div className="flex items-center gap-2 mb-1.5">
          <ForgeBadge variant="info">Next action</ForgeBadge>
        </div>
        <p className="text-[11px] text-forge-silver/60 leading-relaxed">
          Continue mock command-center polish, then run Final V2 Preview QA. Before any
          production: verify the Vercel preview, fix issues, then a human decides on merge to
          master. Still not connected: real AI / backend / filesystem / terminal.
        </p>
      </ForgeCard>

      {/* Risk strip */}
      <p className="text-[10px] uppercase tracking-widest forge-mono text-forge-muted/55 mb-1.5">
        Risks / blockers
      </p>
      <ul className="flex flex-col gap-1 mb-3">
        {RISKS.map((r) => (
          <li key={r} className="flex items-start gap-1.5 text-[11px] text-forge-silver/55">
            <span className="text-forge-warn/70 mt-0.5 flex-shrink-0">!</span>
            {r}
          </li>
        ))}
      </ul>

      <p className="text-[10px] text-forge-muted/55 forge-mono leading-relaxed">
        Static docs-backed preview — no backend, database, cloud memory, GitHub, Vercel, or
        Claude Code connection is active. Phase states reflect commits/docs, not live data.
      </p>
    </section>
  );
}
