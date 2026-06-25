"use client";

import { memo, useRef, useState, useEffect, useLayoutEffect } from "react";
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

function TabStrip({
  openTabs, activeTabId, workspaceMode, projectName, onActivate, onClose,
}: TabStripProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [overflow, setOverflow] = useState({ left: false, right: false });

  const updateOverflow = () => {
    const el = scrollRef.current;
    if (!el) return;
    setOverflow({
      left: el.scrollLeft > 2,
      right: el.scrollLeft + el.clientWidth < el.scrollWidth - 2,
    });
  };

  // Keep the active tab in view when it changes or tabs are added/removed.
  useLayoutEffect(() => {
    if (activeTabId) tabRefs.current[activeTabId]?.scrollIntoView({ inline: "nearest", block: "nearest" });
    updateOverflow();
  }, [activeTabId, openTabs.length]);

  // Recompute overflow hints on resize.
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const ro = new ResizeObserver(updateOverflow);
    ro.observe(el);
    updateOverflow();
    return () => ro.disconnect();
  }, [openTabs.length]);

  // Roving-tabindex keyboard navigation between tabs (ARIA tabs pattern).
  const handleTabKeyDown = (e: React.KeyboardEvent, idx: number) => {
    const n = openTabs.length;
    if (n === 0) return;
    let target = -1;
    if (e.key === "ArrowRight") target = (idx + 1) % n;
    else if (e.key === "ArrowLeft") target = (idx - 1 + n) % n;
    else if (e.key === "Home") target = 0;
    else if (e.key === "End") target = n - 1;
    else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onActivate(openTabs[idx].id);
      return;
    } else return;
    e.preventDefault();
    const t = openTabs[target];
    if (t) {
      onActivate(t.id);
      requestAnimationFrame(() => tabRefs.current[t.id]?.focus());
    }
  };

  return (
    <div className="flex-1 relative min-w-0 h-full">
      {/* Left / right overflow fades */}
      {overflow.left && (
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-6 z-10
          bg-gradient-to-r from-[#0b0d10] to-transparent" />
      )}
      {overflow.right && (
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-6 z-10
          bg-gradient-to-l from-[#0b0d10] to-transparent" />
      )}

      <div
        ref={scrollRef}
        onScroll={updateOverflow}
        role="tablist"
        aria-label="Open files"
        className="flex items-center h-full min-w-0 overflow-x-auto"
        style={{ scrollbarWidth: "none" }}
      >
        {openTabs.length === 0 ? (
          <span className="px-3 text-[11px] forge-mono text-forge-muted/18 truncate">
            {workspaceMode === "mock-project" || workspaceMode === "project"
              ? projectName
              : "Forge Workspace"}
          </span>
        ) : (
          openTabs.map((tab, idx) => {
            const isActive = tab.id === activeTabId;
            return (
              <div
                key={tab.id}
                ref={(el) => { tabRefs.current[tab.id] = el; }}
                role="tab"
                aria-selected={isActive}
                tabIndex={isActive ? 0 : -1}
                onClick={() => onActivate(tab.id)}
                onKeyDown={(e) => handleTabKeyDown(e, idx)}
                className={`group flex items-center gap-1.5 px-3 h-full border-r border-forge-border/25
                  text-[11px] forge-mono cursor-pointer flex-shrink-0 transition-colors outline-none
                  focus-visible:bg-white/[0.05] ${
                  isActive
                    ? "bg-forge-obsidian/55 text-forge-chrome/85"
                    : "text-forge-muted/45 hover:text-forge-silver/65 hover:bg-white/[0.03]"
                }`}
                style={isActive ? { boxShadow: "inset 0 1.5px 0 rgba(45,142,255,0.7)" } : undefined}
              >
                {tab.isDirty ? (
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-forge-blue/90 flex-shrink-0"
                    style={{ boxShadow: "0 0 4px rgba(45,142,255,0.45)" }}
                    title="Unsaved"
                  />
                ) : (
                  <span className="text-[7px] flex-shrink-0" style={{ color: getFileColor(extOf(tab.name)) }}>●</span>
                )}
                <span className="truncate max-w-[120px]">{tab.name}</span>
                <button
                  onClick={(e) => { e.stopPropagation(); onClose(tab.id); }}
                  aria-label={`Close ${tab.name}`}
                  className="text-forge-muted/25 hover:text-forge-chrome/75 hover:bg-white/[0.08] rounded-sm px-[3px] transition-colors leading-none flex-shrink-0 ml-0.5"
                >
                  ×
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default memo(TabStrip);
