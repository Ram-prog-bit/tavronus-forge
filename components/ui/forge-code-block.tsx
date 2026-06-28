import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

// ForgeCodeBlock — basic monospace code surface, with an optional minimal diff
// mode for future Patch Review. This is intentionally NOT a diff engine: callers
// pass already-classified lines. Additions/removals use restrained green/red.

export interface ForgeCodeLine {
  text: string;
  type?: "context" | "add" | "remove";
}

const lineStyle: Record<NonNullable<ForgeCodeLine["type"]>, string> = {
  context: "text-forge-silver",
  add: "bg-forge-success/8 text-forge-success",
  remove: "bg-forge-danger/8 text-forge-danger",
};

const linePrefix: Record<NonNullable<ForgeCodeLine["type"]>, string> = {
  context: " ",
  add: "+",
  remove: "-",
};

export interface ForgeCodeBlockProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  /** Plain code (rendered as context lines). */
  code?: string;
  /** Pre-classified diff lines. Takes precedence over `code`. */
  diff?: ForgeCodeLine[];
}

export function ForgeCodeBlock({
  title,
  code,
  diff,
  className,
  ...props
}: ForgeCodeBlockProps) {
  const lines: ForgeCodeLine[] =
    diff ?? (code ?? "").split("\n").map((text) => ({ text, type: "context" as const }));

  return (
    <div
      className={cn(
        "overflow-hidden rounded-forge-card border border-forge-border bg-forge-void",
        className,
      )}
      {...props}
    >
      {title && (
        <div className="flex items-center justify-between border-b border-forge-border px-3 py-2 font-mono text-[11px] text-forge-silver">
          <span>{title}</span>
        </div>
      )}
      <pre className="max-h-96 overflow-auto px-0 py-1 font-mono text-xs leading-relaxed">
        {lines.map((line, i) => {
          const type = line.type ?? "context";
          return (
            <div key={i} className={cn("flex px-3", lineStyle[type])}>
              <span className="mr-3 select-none text-forge-muted">{linePrefix[type]}</span>
              <span className="whitespace-pre-wrap break-all">{line.text || " "}</span>
            </div>
          );
        })}
      </pre>
    </div>
  );
}
