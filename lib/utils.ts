import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Compose conditional class names and resolve conflicting Tailwind utilities so
// the last-wins (e.g. `cn("px-2", condition && "px-4")` → "px-4"). Standard
// shadcn-style helper; the single class utility every Forge primitive uses.
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
