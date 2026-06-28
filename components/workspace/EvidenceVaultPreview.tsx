import {
  ForgeCard,
  ForgeBadge,
  ForgeStatus,
  ForgeLogBlock,
  type ForgeStatusValue,
} from "@/components/ui";
import { cn } from "@/lib/utils";

// EvidenceVaultPreview — a STATIC / MOCK preview of how Forge will organize proof
// (build checks, route checks, risk notes, reviews) during agent-assisted work.
// No backend, no database, no automated ingestion. Every record below is a hand-
// written example. See docs/FORGE_V2_REALITY_MAP.md.

type EvidenceType = "build" | "route" | "design" | "honesty" | "patch" | "qa" | "preview" | "docs" | "risk";

interface EvidenceItem {
  id: string;
  title: string;
  type: EvidenceType;
  status: ForgeStatusValue;
  statusLabel: string;
  source: string;
  summary: string;
  risk: "low" | "medium" | "high";
  relatedAgent: string;
  timestampLabel: string;
}

// Static example records — illustrative only, not collected automatically.
const EVIDENCE: EvidenceItem[] = [
  {
    id: "ev-build",
    title: "Build check",
    type: "build",
    status: "complete",
    statusLabel: "Passed",
    source: "npm run build (local)",
    summary: "Production build compiled; all routes generated.",
    risk: "low",
    relatedAgent: "Release/Test Agent",
    timestampLabel: "this session",
  },
  {
    id: "ev-route",
    title: "Route check",
    type: "route",
    status: "complete",
    statusLabel: "Passed",
    source: "local smoke test",
    summary: "/, /workspace, /about all returned HTTP 200 locally.",
    risk: "low",
    relatedAgent: "QA/UI Agent",
    timestampLabel: "this session",
  },
  {
    id: "ev-port",
    title: "Port check",
    type: "qa",
    status: "complete",
    statusLabel: "Passed",
    source: "package.json scripts",
    summary: "Sacred port 5642 preserved in dev and start scripts.",
    risk: "low",
    relatedAgent: "Release/Test Agent",
    timestampLabel: "this session",
  },
  {
    id: "ev-honesty",
    title: "Mock/real honesty check",
    type: "honesty",
    status: "complete",
    statusLabel: "Reviewed",
    source: "Reality Map",
    summary: "Mock/real/planned labels enforced across visible surfaces.",
    risk: "low",
    relatedAgent: "Design Director Agent",
    timestampLabel: "this session",
  },
  {
    id: "ev-design",
    title: "Design system check",
    type: "design",
    status: "complete",
    statusLabel: "Reviewed",
    source: "components/ui",
    summary: "Primitives + tokens applied; no glow/purple spam.",
    risk: "low",
    relatedAgent: "Design Director Agent",
    timestampLabel: "this session",
  },
  {
    id: "ev-patch",
    title: "Patch Guardian review",
    type: "patch",
    status: "complete",
    statusLabel: "Reviewed",
    source: "git diff (manual)",
    summary: "Diff scoped, additive, rollback = revert one commit.",
    risk: "low",
    relatedAgent: "Patch Guardian Agent",
    timestampLabel: "this session",
  },
  {
    id: "ev-preview",
    title: "Vercel preview note",
    type: "preview",
    status: "needsApproval",
    statusLabel: "Verify manually",
    source: "forge-v2-rebuild",
    summary: "Branch preview must be opened and verified by a human.",
    risk: "medium",
    relatedAgent: "Release/Test Agent",
    timestampLabel: "pending",
  },
  {
    id: "ev-risk",
    title: "Dependency audit note",
    type: "risk",
    status: "blocked",
    statusLabel: "Warning",
    source: "npm audit",
    summary: "Pre-existing Next/eslint-config-next advisories — tracked separately.",
    risk: "medium",
    relatedAgent: "Security Agent",
    timestampLabel: "tracked",
  },
  {
    id: "ev-docs",
    title: "Docs / memory update",
    type: "docs",
    status: "complete",
    statusLabel: "Passed",
    source: "docs/FORGE_V2_*",
    summary: "Reality Map and Daily Mission Log updated with provenance.",
    risk: "low",
    relatedAgent: "Memory Agent",
    timestampLabel: "this session",
  },
];

const TYPE_LABEL: Record<EvidenceType, string> = {
  build: "Build",
  route: "Route",
  design: "Design",
  honesty: "Honesty",
  patch: "Patch",
  qa: "QA",
  preview: "Preview",
  docs: "Docs",
  risk: "Risk",
};

const RISK_BADGE: Record<EvidenceItem["risk"], { variant: "safe" | "planned" | "risk"; label: string }> = {
  low: { variant: "safe", label: "Low risk" },
  medium: { variant: "planned", label: "Medium risk" },
  high: { variant: "risk", label: "High risk" },
};

// Static, non-functional filter chips — labeled as preview-only.
const FILTERS = ["All", "Build", "QA", "Risk", "Docs", "Preview"];

const SAMPLE_LOG = [
  "$ npm run build",
  "▲ Next.js 14.2.5",
  "✓ Compiled successfully",
  "✓ Generating static pages (6/6)",
  "Route (app)            /  /about  /workspace",
  "✓ build complete — example output, not captured live",
];

export default function EvidenceVaultPreview({ className }: { className?: string }) {
  return (
    <section
      className={cn(
        "rounded-forge-panel border border-forge-border bg-forge-obsidian/40 p-4",
        className,
      )}
      aria-label="Evidence Vault preview"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-sm font-semibold text-forge-chrome">Evidence Vault</span>
          <ForgeBadge variant="mock">Static preview</ForgeBadge>
        </div>
        <ForgeBadge variant="planned" className="flex-shrink-0">No backend</ForgeBadge>
      </div>
      <p className="text-[11px] text-forge-silver/55 leading-relaxed mb-3">
        How Forge will organize proof — build checks, route checks, risk notes, and reviews
        — during agent-assisted work. These are example records, not collected automatically.
      </p>

      {/* Static filter chips */}
      <div className="flex flex-wrap items-center gap-1.5 mb-3">
        {FILTERS.map((f, i) => (
          <span
            key={f}
            className={cn(
              "text-[10px] forge-mono rounded-forge-badge border px-2 py-0.5",
              i === 0
                ? "border-forge-blue/35 text-forge-blue/80 bg-forge-blue/10"
                : "border-forge-border/50 text-forge-silver/45",
            )}
          >
            {f}
          </span>
        ))}
        <span className="text-[9px] text-forge-muted/50 forge-mono ml-1">filters are static preview</span>
      </div>

      {/* Evidence list */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {EVIDENCE.map((ev) => {
          const risk = RISK_BADGE[ev.risk];
          return (
            <ForgeCard key={ev.id} variant="subtle" className="p-3">
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <div className="flex items-center gap-1.5 min-w-0">
                  <ForgeBadge variant="info" className="flex-shrink-0">{TYPE_LABEL[ev.type]}</ForgeBadge>
                  <span className="text-xs font-medium text-forge-chrome truncate">{ev.title}</span>
                </div>
                <ForgeStatus status={ev.status} label={ev.statusLabel} className="flex-shrink-0" />
              </div>
              <p className="text-[11px] text-forge-silver/60 leading-relaxed mb-2">{ev.summary}</p>
              <div className="flex items-center flex-wrap gap-x-2 gap-y-1 text-[10px] forge-mono text-forge-muted/55">
                <span className="text-forge-silver/50">{ev.source}</span>
                <span>·</span>
                <span>{ev.relatedAgent}</span>
                <span>·</span>
                <span>{ev.timestampLabel}</span>
                <ForgeBadge variant={risk.variant} className="ml-auto flex-shrink-0">{risk.label}</ForgeBadge>
              </div>
            </ForgeCard>
          );
        })}
      </div>

      {/* Sample evidence detail */}
      <div className="mt-3">
        <p className="text-[10px] uppercase tracking-widest forge-mono text-forge-muted/55 mb-1.5">
          Example evidence detail · static
        </p>
        <ForgeLogBlock title="Build check — sample output" tone="success" lines={SAMPLE_LOG} />
      </div>

      {/* Honesty footer */}
      <p className="text-[10px] text-forge-muted/55 forge-mono leading-relaxed mt-3">
        Static local preview — future versions may connect build logs, GitHub checks, Vercel
        previews, and agent reports. No backend, database, or automated ingestion is
        connected today.
      </p>
    </section>
  );
}
