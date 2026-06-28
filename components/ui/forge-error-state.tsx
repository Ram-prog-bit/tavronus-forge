import { type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

// ForgeErrorState — calm, plain-language error surface with a recovery action.
// Danger accent on the frame only; never a raw stack dump in the main UI.

export interface ForgeErrorStateProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
}

export function ForgeErrorState({
  title = "Something went wrong",
  description,
  icon,
  action,
  className,
  ...props
}: ForgeErrorStateProps) {
  return (
    <div
      role="alert"
      className={cn(
        "flex flex-col items-center justify-center rounded-forge-card",
        "border border-forge-danger/30 bg-forge-danger/5 px-6 py-10 text-center",
        className,
      )}
      {...props}
    >
      {icon && (
        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-forge-control bg-forge-danger/10 text-forge-danger">
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
