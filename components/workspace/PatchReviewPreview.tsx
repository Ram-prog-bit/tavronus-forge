import {
  ForgeCard,
  ForgeBadge,
  ForgeStatus,
  ForgeButton,
  ForgeCodeBlock,
  type ForgeStatusValue,
  type ForgeCodeLine,
} from "@/components/ui";
import { cn } from "@/lib/utils";

// PatchReviewPreview — a STATIC / MOCK preview of how Forge will review proposed
// changes before applying them. No diff engine, no Git, no filesystem writes, no
// patch application. Every record and diff below is hand-written. Approval
// controls are disabled. See docs/FORGE_V2_REALITY_MAP.md.

interface PatchItem {
  id: string;
  title: string;
  filePath: string;
  changeType: string;
  risk: "low" | "medium" | "high";
  status: ForgeStatusValue;
  statusLabel: string;
  proposedBy: string;
  reviewedBy: string;
  summary: string;
  evidenceRef: string;
  rollbackNote: string;
}

const PATCHES: PatchItem[] = [
  {
    id: "pr-1",
    title: "Workspace shell layout polish",
    filePath: "components/WorkspaceShell.tsx",
    changeType: "Layout polish",
    risk: "low",
    status: "complete",
    statusLabel: "Approved",
    proposedBy: "Frontend Agent",
    reviewedBy: "Patch Guardian",
    summary: "Route status tokens unified to forge-success; no behavior change.",
    evidenceRef: "Evidence: build + route check",
    rollbackNote: "Revert single commit",
  },
  {
    id: "pr-2",
    title: "Mock/real label copy update",
    filePath: "components/LandingPage.tsx",
    changeType: "Copy / honesty label",
    risk: "low",
    status: "complete",
    statusLabel: "Approved",
    proposedBy: "Design Director",
    reviewedBy: "Patch Guardian",
    summary: 'Roadmap "Live" relabeled to "Local"; honesty section added.',
    evidenceRef: "Evidence: honesty check",
    rollbackNote: "Revert single commit",
  },
  {
    id: "pr-3",
    title: "Evidence Vault preview component",
    filePath: "components/workspace/EvidenceVaultPreview.tsx",
    changeType: "UI primitive usage",
    risk: "medium",
    status: "needsApproval",
    statusLabel: "Needs visual QA",
    proposedBy: "Frontend Agent",
    reviewedBy: "QA/UI Agent",
    summary: "New static surface; needs a human visual pass on the preview URL.",
    evidenceRef: "Evidence: design system check",
    rollbackNote: "Remove component + import",
  },
  {
    id: "pr-4",
    title: "Reality Map update",
    filePath: "docs/FORGE_V2_REALITY_MAP.md",
    changeType: "Docs update",
    risk: "low",
    status: "complete",
    statusLabel: "Approved",
    proposedBy: "Memory Agent",
    reviewedBy: "Patch Guardian",
    summary: "Marked design foundation + mock surfaces real with honest scope.",
    evidenceRef: "Evidence: docs/memory update",
    rollbackNote: "Revert single commit",
  },
  {
    id: "pr-5",
    title: "Dependency audit note",
    filePath: "package.json",
    changeType: "Risk note",
    risk: "medium",
    status: "blocked",
    statusLabel: "Warning",
    proposedBy: "Security Agent",
    reviewedBy: "Patch Guardian",
    summary: "Pre-existing Next/eslint-config-next advisories — not fixed (tracked).",
    evidenceRef: "Evidence: dependency audit note",
    rollbackNote: "No change applied",
  },
];

const RISK_BADGE: Record<PatchItem["risk"], { variant: "safe" | "planned" | "risk"; label: string }> = {
  low: { variant: "safe", label: "Low risk" },
  medium: { variant: "planned", label: "Medium risk" },
  high: { variant: "risk", label: "High risk" },
};

// Static sample diff — illustrative only, not produced by a diff engine.
const SAMPLE_DIFF: ForgeCodeLine[] = [
  { text: "components/WorkspaceShell.tsx", type: "context" },
  { text: '<span className="... text-green-400/70">', type: "remove" },
  { text: '<span className="... text-forge-success/70">', type: "add" },
  { text: "  Forge shell active", type: "context" },
  { text: '<div className="... bg-green-400/70" />', type: "remove" },
  { text: '<div className="... bg-forge-success/70" />', type: "add" },
];

export default function PatchReviewPreview({ className }: { className?: string }) {
  return (
    <section
      className={cn(
        "rounded-forge-panel border border-forge-border bg-forge-obsidian/40 p-4",
        className,
      )}
      aria-label="Patch Review preview"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-sm font-semibold text-forge-chrome">Patch Review</span>
          <ForgeBadge variant="mock">Static preview</ForgeBadge>
        </div>
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <ForgeBadge variant="planned">No Git</ForgeBadge>
          <ForgeBadge variant="planned">No filesystem</ForgeBadge>
        </div>
      </div>
      <p className="text-[11px] text-forge-silver/55 leading-relaxed mb-3">
        How Forge will review proposed changes — risk, evidence, and approval — before
        anything is applied. These are example patches; no diff engine or patch application
        exists yet.
      </p>

      {/* Patch list */}
      <div className="flex flex-col gap-2">
        {PATCHES.map((p) => {
          const risk = RISK_BADGE[p.risk];
          return (
            <ForgeCard key={p.id} variant="subtle" className="p-3">
              <div className="flex items-center justify-between gap-2 mb-1">
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className="text-xs font-medium text-forge-chrome truncate">{p.title}</span>
                </div>
                <ForgeStatus status={p.status} label={p.statusLabel} className="flex-shrink-0" />
              </div>
              <p className="text-[10px] forge-mono text-forge-blue/55 truncate mb-1.5">{p.filePath}</p>
              <p className="text-[11px] text-forge-silver/60 leading-relaxed mb-2">{p.summary}</p>
              <div className="flex items-center flex-wrap gap-x-2 gap-y-1 text-[10px] forge-mono text-forge-muted/55">
                <ForgeBadge variant="info">{p.changeType}</ForgeBadge>
                <span className="text-forge-silver/50">{p.proposedBy}</span>
                <span>→</span>
                <span>{p.reviewedBy}</span>
                <ForgeBadge variant={risk.variant} className="ml-auto flex-shrink-0">{risk.label}</ForgeBadge>
              </div>
              <div className="flex items-center flex-wrap gap-x-2 gap-y-1 text-[9px] forge-mono text-forge-muted/45 mt-1.5">
                <span>{p.evidenceRef}</span>
                <span>·</span>
                <span>Rollback: {p.rollbackNote}</span>
              </div>
            </ForgeCard>
          );
        })}
      </div>

      {/* Sample diff */}
      <div className="mt-3">
        <p className="text-[10px] uppercase tracking-widest forge-mono text-forge-muted/55 mb-1.5">
          Example diff preview · static
        </p>
        <ForgeCodeBlock title="Sample patch — not generated by a diff engine" diff={SAMPLE_DIFF} />
      </div>

      {/* Disabled approval controls */}
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <ForgeButton variant="secondary" size="sm" disabled>Review only</ForgeButton>
        <ForgeButton variant="primary" size="sm" disabled>Approve preview</ForgeButton>
        <ForgeButton variant="danger" size="sm" disabled>Request changes</ForgeButton>
        <span className="text-[10px] text-forge-muted/55 forge-mono">Controls disabled in mock mode</span>
      </div>

      {/* Honesty footer */}
      <p className="text-[10px] text-forge-muted/55 forge-mono leading-relaxed mt-3">
        Static local preview — future versions may connect Git diffs, Claude patches, and
        GitHub PR review. No filesystem, Git, or patch application is connected today.
      </p>
    </section>
  );
}
