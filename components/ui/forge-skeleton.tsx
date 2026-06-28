import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

// ForgeSkeleton — a single loading placeholder block. Uses a restrained pulse
// that is automatically disabled under prefers-reduced-motion (motion-safe).
// No heavy shimmer, no layout-shifting animation.

export interface ForgeSkeletonProps extends HTMLAttributes<HTMLDivElement> {}

export function ForgeSkeleton({ className, ...props }: ForgeSkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "rounded-forge-control bg-forge-gunmetal motion-safe:animate-pulse",
        "h-4 w-full",
        className,
      )}
      {...props}
    />
  );
}

// ForgeSkeletonText — a stack of skeleton lines for paragraph placeholders.
export interface ForgeSkeletonTextProps extends HTMLAttributes<HTMLDivElement> {
  lines?: number;
}

export function ForgeSkeletonText({
  lines = 3,
  className,
  ...props
}: ForgeSkeletonTextProps) {
  return (
    <div className={cn("space-y-2", className)} {...props}>
      {Array.from({ length: lines }).map((_, i) => (
        <ForgeSkeleton
          key={i}
          // Last line is shorter, like real text.
          className={cn("h-3", i === lines - 1 && "w-2/3")}
        />
      ))}
    </div>
  );
}
