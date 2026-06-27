import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

// ForgePanel — the structural surface for command-center layouts. Consistent
// padding and hairline border; depth via subtle shadow, never glow.

export type ForgePanelVariant = "base" | "elevated" | "command" | "inset";

const variants: Record<ForgePanelVariant, string> = {
  // Standard panel sitting on the app background.
  base: "bg-forge-panel border border-forge-border",
  // Lifted panel with restrained depth.
  elevated: "bg-forge-panel border border-forge-border shadow-forge-card",
  // The darkest "command" surface for top-level mission-control regions.
  command: "bg-forge-obsidian border border-forge-border",
  // Recessed region (e.g. an editor well inside a panel).
  inset: "bg-forge-void border border-forge-border/70",
};

export interface ForgePanelProps extends HTMLAttributes<HTMLDivElement> {
  variant?: ForgePanelVariant;
}

export const ForgePanel = forwardRef<HTMLDivElement, ForgePanelProps>(
  ({ variant = "base", className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("rounded-forge-panel p-5", variants[variant], className)}
        {...props}
      />
    );
  },
);

ForgePanel.displayName = "ForgePanel";
