"use client";

import { useState, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

// ForgeTabs — a lightweight, accessible tab strip primitive. Controlled or
// uncontrolled. Single electric-blue active indicator; inactive tabs are silver.
// This is a NEW primitive for future screens — it does not replace the existing
// workspace TabStrip.

export interface ForgeTabItem {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface ForgeTabsProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  items: ForgeTabItem[];
  /** Controlled active value. */
  value?: string;
  /** Initial value when uncontrolled. */
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

export function ForgeTabs({
  items,
  value,
  defaultValue,
  onValueChange,
  className,
  ...props
}: ForgeTabsProps) {
  const [internal, setInternal] = useState(defaultValue ?? items[0]?.value);
  const active = value ?? internal;

  const select = (v: string) => {
    if (value === undefined) setInternal(v);
    onValueChange?.(v);
  };

  return (
    <div
      role="tablist"
      className={cn("flex items-center gap-1 border-b border-forge-border", className)}
      {...props}
    >
      {items.map((item) => {
        const isActive = item.value === active;
        return (
          <button
            key={item.value}
            type="button"
            role="tab"
            aria-selected={isActive}
            disabled={item.disabled}
            onClick={() => select(item.value)}
            className={cn(
              "relative -mb-px h-9 px-3 text-sm font-medium transition-colors duration-150",
              "focus-visible:outline-none focus-visible:shadow-forge-focus rounded-t-forge-control",
              "disabled:pointer-events-none disabled:opacity-45",
              isActive
                ? "text-forge-chrome"
                : "text-forge-silver hover:text-forge-chrome",
            )}
          >
            {item.label}
            {isActive && (
              <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-forge-blue" />
            )}
          </button>
        );
      })}
    </div>
  );
}
