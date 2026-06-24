"use client";

import { getFileColor, extOf } from "@/lib/mockFiles";
import type { OpenTab } from "@/hooks/useTabs";

interface TabStripProps {
  openTabs: OpenTab[];
  activeTabId: string | null;
  workspaceMode: "file" | "workspace" | "mock-project" | "project";
  projectName: string;
  onActivate: (id: string) => void;
  onClose: (id: string) => void;
}

export default function TabStrip({
  openTabs, activeTabId, workspaceMode, projectName, onActivate, onClose,
}: TabStripProps) {
  return (
    <div
      className="flex-1 flex items-center h-full min-w-0 overflow-x-auto"
      style={{ scrollbarWidth: "none" }}
    >
      {openTabs.length === 0 ? (
        <span className="px-3 text-[11px] forge-mono text-forge-muted/18 truncate">
          {workspaceMode === "mock-project" || workspaceMode === "project"
            ? projectName
            : "Forge Workspace"}
        </span>
      ) : (
        openTabs.map((tab) => {
          const isActive = tab.id === activeTabId;
          return (
            <div
              key={tab.id}
              onClick={() => onActivate(tab.id)}
              className={`group flex items-center gap-1.5 px-3 h-full border-r border-forge-border/18
                text-[11px] forge-mono cursor-pointer flex-shrink-0 transition-colors ${
                isActive
                  ? "bg-forge-black/25 text-forge-chrome/65"
                  : "text-forge-muted/35 hover:text-forge-silver/55 hover:bg-white/[0.02]"
              }`}
              style={isActive ? { boxShadow: "inset 0 1.5px 0 rgba(45,142,255,0.55)" } : undefined}
            >
              {tab.isDirty ? (
                <span className="w-1.5 h-1.5 rounded-full bg-forge-blue/70 flex-shrink-0" title="Unsaved" />
              ) : (
                <span className="text-[7px] flex-shrink-0" style={{ color: getFileColor(extOf(tab.name)) }}>●</span>
              )}
              <span className="truncate max-w-[120px]">{tab.name}</span>
              <button
                onClick={(e) => { e.stopPropagation(); onClose(tab.id); }}
                className="text-forge-muted/25 hover:text-forge-chrome/60 transition-colors leading-none flex-shrink-0 ml-0.5"
              >
                ×
              </button>
            </div>
          );
        })
      )}
    </div>
  );
}
