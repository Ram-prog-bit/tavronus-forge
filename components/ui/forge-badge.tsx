import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

// ForgeBadge — compact label that makes mock/real honesty and status legible.
// Honesty variants map to the status palette; never a glowing pill. Color is
// supported by text so badges remain readable without relying on color alone.

export type ForgeBadgeVariant =
  | "real"
  | "mock"
  | "planned"
  | "tested"
  | "untested"
  | "risk"
  | "safe"
  | "info";

const variants: Record<ForgeBadgeVariant, string> = {
  real: "bg-forge-success/12 text-forge-success border-forge-success/25",
  mock: "bg-forge-mock/12 text-forge-silver border-forge-mock/25",
  planned: "bg-forge-warn/12 text-forge-warn border-forge-warn/25",
  tested: "bg-forge-success/12 text-forge-success border-forge-success/25",
  untested: "bg-forge-warn/12 text-forge-warn border-forge-warn/25",
  risk: "bg-forge-danger/12 text-forge-danger border-forge-danger/25",
  safe: "bg-forge-success/12 text-forge-success border-forge-success/25",
  info: "bg-forge-blue/12 text-forge-blue border-forge-blue/25",
};

// Human label shown when no children are provided — keeps honesty labels
// consistent across the app.
const defaultLabels: Record<ForgeBadgeVariant, string> = {
  real: "Real",
  mock: "Mock",
  planned: "Planned",
  tested: "Tested",
  untested: "Untested",
  risk: "Risk",
  safe: "Safe",
  info: "Info",
};

export interface ForgeBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: ForgeBadgeVariant;
}

export const ForgeBadge = forwardRef<HTMLSpanElement, ForgeBadgeProps>(
  ({ variant = "info", className, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center rounded-forge-badge border px-2 py-0.5",
          "text-[11px] font-medium leading-none tracking-wide",
          variants[variant],
          className,
        )}
        {...props}
      >
        {children ?? defaultLabels[variant]}
      </span>
    );
  },
);

ForgeBadge.displayName = "ForgeBadge";
