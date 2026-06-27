import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

// ForgeLogBlock — monospace block for logs / build output. Severity tone shows
// on the gutter/title, not by recoloring every line (keeps logs readable).

export type ForgeLogTone = "default" | "success" | "warn" | "danger";

const toneAccent: Record<ForgeLogTone, string> = {
  default: "border-l-forge-border",
  success: "border-l-forge-success",
  warn: "border-l-forge-warn",
  danger: "border-l-forge-danger",
};

const toneTitle: Record<ForgeLogTone, string> = {
  default: "text-forge-silver",
  success: "text-forge-success",
  warn: "text-forge-warn",
  danger: "text-forge-danger",
};

export interface ForgeLogBlockProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  tone?: ForgeLogTone;
  /** Log lines; alternatively pass content as children. */
  lines?: string[];
}

export function ForgeLogBlock({
  title,
  tone = "default",
  lines,
  className,
  children,
  ...props
}: ForgeLogBlockProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-forge-card border border-forge-border bg-forge-void",
        className,
      )}
      {...props}
    >
      {title && (
        <div
          className={cn(
            "border-b border-forge-border px-3 py-2 text-[11px] font-medium uppercase tracking-wide",
            toneTitle[tone],
          )}
        >
          {title}
        </div>
      )}
      <div
        className={cn(
          "max-h-72 overflow-auto border-l-2 px-3 py-2 font-mono text-xs leading-relaxed text-forge-silver",
          toneAccent[tone],
        )}
      >
        {lines
          ? lines.map((line, i) => (
              <div key={i} className="whitespace-pre-wrap break-all">
                {line || " "}
              </div>
            ))
          : children}
      </div>
    </div>
  );
}
