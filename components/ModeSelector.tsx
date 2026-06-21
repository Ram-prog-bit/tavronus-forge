"use client";

import { MODES, ModeId } from "@/lib/modes";

interface ModeSelectorProps {
  activeMode: ModeId;
  onSelect: (id: ModeId) => void;
}

const MODE_ICONS: Record<ModeId, string> = {
  plan: "⬡",
  prompt: "◈",
  review: "◫",
  debug: "⚡",
  checklist: "☑",
};

export default function ModeSelector({ activeMode, onSelect }: ModeSelectorProps) {
  return (
    <nav className="flex flex-col gap-0.5">
      {MODES.map((mode) => {
        const isActive = mode.id === activeMode;
        return (
          <button
            key={mode.id}
            onClick={() => onSelect(mode.id)}
            className={`
              w-full flex items-center gap-3 px-3 py-2.5 rounded text-left transition-all duration-150
              ${
                isActive
                  ? "bg-forge-blue/10 border border-forge-blue/30 text-forge-chrome"
                  : "border border-transparent text-forge-silver/60 hover:text-forge-silver hover:bg-forge-panel/60"
              }
            `}
          >
            <span
              className={`text-base leading-none flex-shrink-0 ${isActive ? "text-forge-blue" : "text-forge-muted"}`}
            >
              {MODE_ICONS[mode.id]}
            </span>
            <span className="text-sm font-medium">{mode.label}</span>
            {isActive && (
              <span className="ml-auto w-1 h-1 rounded-full bg-forge-blue flex-shrink-0" />
            )}
          </button>
        );
      })}
    </nav>
  );
}
