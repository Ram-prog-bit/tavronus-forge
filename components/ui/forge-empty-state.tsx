import { type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

// ForgeEmptyState — calm placeholder for future surfaces (Project Memory, Agent
// Board, Evidence Vault, Patch Review). Never a blank void, never noisy: an
// optional icon, a title, a short description, and at most one primary action.

export interface ForgeEmptyStateProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
}

export function ForgeEmptyState({
  title,
  description,
  icon,
  action,
  className,
  ...props
}: ForgeEmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-forge-card",
        "border border-dashed border-forge-border px-6 py-12 text-center",
        className,
      )}
      {...props}
    >
      {icon && (
        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-forge-control bg-forge-gunmetal text-forge-silver">
          {icon}
        </div>
      )}
      <p className="text-sm font-medium text-forge-chrome">{title}</p>
      {description && (
        <p className="mt-1 max-w-sm text-xs leading-relaxed text-forge-silver">
          {description}
        </p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
