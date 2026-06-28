import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

// ForgeCard — a contained content block with optional header/footer slots.
// Clean border, strong spacing, no decoration without reason. Every card should
// earn its place (see the Anti-Vibe-Coded rules in the design system doc).

export type ForgeCardVariant = "default" | "raised" | "interactive" | "subtle";

const variants: Record<ForgeCardVariant, string> = {
  default: "bg-forge-panel border border-forge-border",
  raised: "bg-forge-panel-raised border border-forge-border shadow-forge-card",
  // Hover lift for clickable cards — border brightens, no scale jump, no glow burst.
  interactive:
    "bg-forge-panel border border-forge-border transition-colors duration-150 " +
    "hover:border-forge-border-strong cursor-pointer " +
    "focus-visible:outline-none focus-visible:shadow-forge-focus",
  subtle: "bg-forge-gunmetal border border-forge-border/60",
};

export interface ForgeCardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: ForgeCardVariant;
}

export const ForgeCard = forwardRef<HTMLDivElement, ForgeCardProps>(
  ({ variant = "default", className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("rounded-forge-card p-4", variants[variant], className)}
        {...props}
      />
    );
  },
);
ForgeCard.displayName = "ForgeCard";

export const ForgeCardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("mb-3 flex items-center justify-between gap-3", className)}
      {...props}
    />
  ),
);
ForgeCardHeader.displayName = "ForgeCardHeader";

export const ForgeCardTitle = forwardRef<
  HTMLHeadingElement,
  HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-sm font-medium text-forge-chrome", className)}
    {...props}
  />
));
ForgeCardTitle.displayName = "ForgeCardTitle";

export const ForgeCardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("mt-4 flex items-center gap-2 border-t border-forge-border pt-3", className)}
      {...props}
    />
  ),
);
ForgeCardFooter.displayName = "ForgeCardFooter";
