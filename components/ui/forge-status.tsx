import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

// ForgeStatus — agent/process status with a dot + label. Never color-only: a
// text label always accompanies the dot for accessibility. The only permitted
// infinite animation is the tiny pulse on actively-running states.

export type ForgeStatusValue =
  | "idle"
  | "planning"
  | "inspecting"
  | "working"
  | "blocked"
  | "needsApproval"
  | "complete"
  | "failed";

interface StatusMeta {
  label: string;
  dot: string; // dot color class
  text: string; // label color class
  pulse: boolean; // tiny live pulse for active states
}

const meta: Record<ForgeStatusValue, StatusMeta> = {
  idle: { label: "Idle", dot: "bg-forge-muted", text: "text-forge-silver", pulse: false },
  planning: { label: "Planning", dot: "bg-forge-blue", text: "text-forge-chrome", pulse: true },
  inspecting: { label: "Inspecting", dot: "bg-forge-blue", text: "text-forge-chrome", pulse: true },
  working: { label: "Working", dot: "bg-forge-blue", text: "text-forge-chrome", pulse: true },
  blocked: { label: "Blocked", dot: "bg-forge-danger", text: "text-forge-danger", pulse: false },
  needsApproval: { label: "Needs approval", dot: "bg-forge-warn", text: "text-forge-warn", pulse: false },
  complete: { label: "Complete", dot: "bg-forge-success", text: "text-forge-success", pulse: false },
  failed: { label: "Failed", dot: "bg-forge-danger", text: "text-forge-danger", pulse: false },
};

export interface ForgeStatusProps extends HTMLAttributes<HTMLSpanElement> {
  status: ForgeStatusValue;
  /** Override the default label text. */
  label?: string;
}

export const ForgeStatus = forwardRef<HTMLSpanElement, ForgeStatusProps>(
  ({ status, label, className, ...props }, ref) => {
    const m = meta[status];
    const text = label ?? m.label;
    return (
      <span
        ref={ref}
        className={cn("inline-flex items-center gap-1.5 text-xs font-medium", m.text, className)}
        role="status"
        aria-label={text}
        {...props}
      >
        <span className="relative inline-flex h-2 w-2 shrink-0">
          {m.pulse && (
            <span
              className={cn(
                "absolute inline-flex h-full w-full rounded-full opacity-60",
                "motion-safe:animate-ping",
                m.dot,
              )}
            />
          )}
          <span className={cn("relative inline-flex h-2 w-2 rounded-full", m.dot)} />
        </span>
        {text}
      </span>
    );
  },
);

ForgeStatus.displayName = "ForgeStatus";
