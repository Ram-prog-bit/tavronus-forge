import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

// ForgeButton — the primary interactive control primitive.
// Variants use the electric-blue accent tastefully (one primary action per view);
// no giant glow, clear focus ring, explicit disabled state.

export type ForgeButtonVariant = "primary" | "secondary" | "ghost" | "danger" | "icon";
export type ForgeButtonSize = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-forge-control font-medium " +
  "select-none whitespace-nowrap transition-colors duration-150 " +
  "focus-visible:outline-none focus-visible:shadow-forge-focus " +
  "disabled:pointer-events-none disabled:opacity-45";

const variants: Record<ForgeButtonVariant, string> = {
  primary:
    "bg-forge-blue text-white hover:bg-[#3D98FF] active:bg-forge-blue-dim " +
    "shadow-forge-glow-sm",
  secondary:
    "bg-forge-gunmetal text-forge-chrome border border-forge-border " +
    "hover:border-forge-border-strong hover:bg-forge-panel",
  ghost:
    "bg-transparent text-forge-silver hover:text-forge-chrome hover:bg-forge-gunmetal",
  danger:
    "bg-transparent text-forge-danger border border-forge-danger/40 " +
    "hover:bg-forge-danger/10 active:bg-forge-danger/15",
  icon:
    "bg-transparent text-forge-silver hover:text-forge-chrome hover:bg-forge-gunmetal " +
    "aspect-square",
};

const sizes: Record<ForgeButtonSize, string> = {
  sm: "h-8 px-3 text-xs",
  md: "h-9 px-4 text-sm",
  lg: "h-11 px-6 text-sm",
};

// Icon buttons are square — width tracks height, padding is symmetric.
const iconSizes: Record<ForgeButtonSize, string> = {
  sm: "h-8 w-8 p-0",
  md: "h-9 w-9 p-0",
  lg: "h-11 w-11 p-0",
};

export interface ForgeButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ForgeButtonVariant;
  size?: ForgeButtonSize;
}

export const ForgeButton = forwardRef<HTMLButtonElement, ForgeButtonProps>(
  ({ variant = "secondary", size = "md", className, type = "button", ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          base,
          variants[variant],
          variant === "icon" ? iconSizes[size] : sizes[size],
          className,
        )}
        {...props}
      />
    );
  },
);

ForgeButton.displayName = "ForgeButton";
