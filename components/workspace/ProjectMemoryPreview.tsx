import { ForgeCard, ForgeBadge } from "@/components/ui";
import { cn } from "@/lib/utils";

// ProjectMemoryPreview — a STATIC / DOCS-BACKED summary of project truth. This is a
// UI representation of the project docs (CLAUDE.md, Reality Map, etc.). It does NOT
// read files at runtime, and it is NOT live cloud memory or a database.
// See docs/FORGE_V2_REALITY_MAP.md.

interface MemoryCard {
  id: string;
  title: string;
  summary: string;
  source: string;
  category: "thesis" | "constraint" | "branch" | "real" | "planned" | "design" | "agents" | "next";
}

const MEMORY: MemoryCard[] = [
  {
    id: "m-thesis",
    title: "Product thesis",
    summary: "Mission control for AI coding agents — a local-first command center for plan, code, review, test, ship.",
    source: "CLAUDE.md",
    category: "thesis",
  },
  {
    id: "m-constraints",
    title: "Sacred constraints",
    summary: "Port 5642 fixed; no real integrations without approval; never delete v1 backup; no master push without approval.",
    source: "CLAUDE.md",
    category: "constraint",
  },
  {
    id: "m-branch",
    title: "Branch & deployment",
    summary: "Active branch forge-v2-rebuild (preview). master = stable production. Backup branch + snapshot tag preserved.",
    source: "Git / Vercel flow",
    category: "branch",
  },
  {
    id: "m-real",
    title: "Real today",
    summary: "Local app, design system, app shell, workspace surface, static mock command-center previews, docs memory.",
    source: "Reality Map",
    category: "real",
  },
  {
    id: "m-planned",
    title: "Planned / not connected",
    summary: "Real AI orchestration, backend, auth, database, terminal/filesystem/browser automation, real ingestion/patch apply.",
    source: "Reality Map",
    category: "planned",
  },
  {
    id: "m-design",
    title: "Design direction",
    summary: "Premium dark command center: ~90% obsidian/chrome, ~8% electric blue, ~2% violet aura. No glow/purple spam.",
    source: "Design System Doc",
    category: "design",
  },
  {
    id: "m-agents",
    title: "Agent crew",
    summary: "10 active subagents (CEO, Design Director, Frontend, QA/UI, Release/Test, Memory, Patch Guardian, Research, Security, Docs) + 5 dormant.",
    source: "Agent System Doc",
    category: "agents",
  },
  {
    id: "m-next",
    title: "Next milestone",
    summary: "Finish command-center polish, run final preview QA, then human-approved production merge prep.",
    source: "Next Steps",
    category: "next",
  },
];

const CATEGORY_BADGE: Record<MemoryCard["category"], { variant: "real" | "planned" | "info" | "mock"; label: string }> = {
  thesis: { variant: "info", label: "Thesis" },
  constraint: { variant: "mock", label: "Constraint" },
  branch: { variant: "info", label: "Branch" },
  real: { variant: "real", label: "Real" },
  planned: { variant: "planned", label: "Planned" },
  design: { variant: "info", label: "Design" },
  agents: { variant: "info", label: "Agents" },
  next: { variant: "info", label: "Next" },
};

export default function ProjectMemoryPreview({ className }: { className?: string }) {
  return (
    <section
      className={cn(
        "rounded-forge-panel border border-forge-border bg-forge-obsidian/40 p-4",
        className,
      )}
      aria-label="Project Memory preview"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-sm font-semibold text-forge-chrome">Project Memory</span>
          <ForgeBadge variant="mock">Static</ForgeBadge>
        </div>
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <ForgeBadge variant="info">Docs-backed</ForgeBadge>
          <ForgeBadge variant="planned">No database</ForgeBadge>
        </div>
      </div>
      <p className="text-[11px] text-forge-silver/55 leading-relaxed mb-3">
        This preview summarizes the project docs. It is not live cloud memory or a database —
        nothing is read from files at runtime.
      </p>

      {/* Memory grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {MEMORY.map((m) => {
          const badge = CATEGORY_BADGE[m.category];
          return (
            <ForgeCard key={m.id} variant="subtle" className="p-3">
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="text-xs font-semibold text-forge-chrome truncate">{m.title}</span>
                <ForgeBadge variant={badge.variant} className="flex-shrink-0">{badge.label}</ForgeBadge>
              </div>
              <p className="text-[11px] text-forge-silver/60 leading-relaxed mb-2">{m.summary}</p>
              <p className="text-[9px] forge-mono text-forge-muted/50">Source: {m.source}</p>
            </ForgeCard>
          );
        })}
      </div>

      <p className="text-[10px] text-forge-muted/55 forge-mono leading-relaxed mt-3">
        Future versions may connect a real memory layer that syncs docs, commits, deployments,
        and agent reports. Today this is static, docs-backed UI copy — no database, cloud
        memory, or backend is connected.
      </p>
    </section>
  );
}
