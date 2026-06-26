"use client";

import { useState, useEffect, useRef, useCallback, useMemo, memo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import OutputCard from "./OutputCard";
import TabStrip from "./workspace/TabStrip";
import EditorPane, { type WelcomeCommand } from "./workspace/EditorPane";
import ForgeSessionCard from "./workspace/ForgeSessionCard";
import ApplyPreview, { type PendingApply } from "./workspace/ApplyPreview";
import { ModeId, getModeById, MODES } from "@/lib/modes";
import { FileNode, getFileColor, getFileIcon } from "@/lib/mockFiles";
import { buildTreeFromPaths } from "@/lib/vfs";
import { buildPatch } from "@/lib/forgePatch";
import { useTabs } from "@/hooks/useTabs";
import { useForgeAI } from "@/hooks/useForgeAI";
import { useVfs } from "@/hooks/useVfs";

// Artifact cards that offer an Apply-to-File action (code-oriented titles).
const ACTIONABLE_TITLES = new Set([
  "Suggested Improvements",
  "Issues Found",
  "Fix Plan",
  "Code Areas To Inspect",
  "Build Steps",
  "Cursor Prompt",
  "Today",
]);

// Display-only metadata for the Forge AI panel (no behavior — purely UI copy).
// One-word "kind" describing what each mode produces, shown under the chips.
const MODE_KIND: Record<ModeId, string> = {
  plan: "Blueprint",
  prompt: "Prompts",
  review: "Audit",
  debug: "Diagnosis",
  checklist: "Tasks",
};

// Mode-aware placeholder so the input reads like a command composer.
const MODE_PLACEHOLDER: Record<ModeId, string> = {
  plan: "Describe the product or feature to blueprint…",
  prompt: "Describe what you want a copy-paste AI prompt for…",
  review: "Describe what to review — or open a file and ask…",
  debug: "Paste the error or describe the bug to diagnose…",
  checklist: "Describe the product to turn into day-one tasks…",
};

// ── Sub-components ───────────────────────────────────────────────────────────

function ForgeLogo() {
  return (
    <div
      className="w-4 h-4 border border-forge-blue/35 flex items-center justify-center flex-shrink-0"
      style={{ boxShadow: "0 0 4px rgba(45,142,255,0.08)" }}
    >
      <svg width="9" height="9" viewBox="0 0 14 14" fill="none">
        <polygon points="7,1 13,4 13,10 7,13 1,10 1,4" stroke="#2D8EFF" strokeWidth="1.2" fill="none" />
        <circle cx="7" cy="7" r="1.5" fill="#2D8EFF" />
      </svg>
    </div>
  );
}

interface TreeNodeProps {
  node: FileNode;
  path: string;
  depth: number;
  activeFilePath: string;
  expandedPaths: Set<string>;
  onFileSelect: (path: string, name: string) => void;
  onDirToggle: (path: string) => void;
}

const TreeNode = memo(function TreeNode({
  node, path, depth, activeFilePath, expandedPaths, onFileSelect, onDirToggle,
}: TreeNodeProps) {
  const indent = depth * 10;
  const isExpanded = expandedPaths.has(path);

  if (node.type === "dir") {
    return (
      <div>
        <button
          onClick={() => onDirToggle(path)}
          className="forge-press w-full flex items-center gap-1.5 py-[3px] text-left hover:bg-white/[0.03]"
          style={{ paddingLeft: `${6 + indent}px`, paddingRight: "8px" }}
        >
          <span className="text-forge-muted/55 text-[9px] w-3 flex-shrink-0">
            {isExpanded ? "▾" : "▸"}
          </span>
          <span className="text-[11px] text-forge-silver/70 truncate">{node.name}</span>
        </button>
        {isExpanded &&
          node.children?.map((child) => (
            <TreeNode
              key={child.name}
              node={child}
              path={`${path}/${child.name}`}
              depth={depth + 1}
              activeFilePath={activeFilePath}
              expandedPaths={expandedPaths}
              onFileSelect={onFileSelect}
              onDirToggle={onDirToggle}
            />
          ))}
      </div>
    );
  }

  const isActive = activeFilePath === path;
  return (
    <button
      onClick={() => onFileSelect(path, node.name)}
      className={`
        forge-press w-full flex items-center gap-1.5 py-[3px] text-left
        ${isActive
          ? "bg-forge-blue/12 border-l-[2px] border-forge-blue/70"
          : "border-l-[2px] border-transparent hover:bg-white/[0.03]"}
      `}
      style={{ paddingLeft: `${indent + 8}px`, paddingRight: "8px" }}
    >
      <span className="w-3 flex-shrink-0" />
      <span
        className="text-[8px] forge-mono font-semibold w-3.5 text-center flex-shrink-0 leading-none"
        style={{ color: getFileColor(node.ext) }}
      >
        {getFileIcon(node.ext)}
      </span>
      <span className={`text-[11px] truncate ${isActive ? "text-forge-chrome" : "text-forge-silver/70"}`}>
        {node.name}
      </span>
    </button>
  );
});

// ── Command palette ──────────────────────────────────────────────────────────

interface PaletteCommand {
  label: string;
  hint: string;
  onClick: () => void;
}

function CommandPalette({
  commands,
  onClose,
}: {
  commands: PaletteCommand[];
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = commands.filter((c) =>
    c.label.toLowerCase().includes(query.trim().toLowerCase())
  );

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    setSelected(0);
  }, [query]);

  const runAt = (i: number) => {
    const cmd = filtered[i];
    if (cmd) {
      cmd.onClick();
      onClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelected((s) => Math.min(s + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelected((s) => Math.max(s - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      runAt(selected);
    } else if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-start justify-center pt-[18vh] px-4"
      onMouseDown={onClose}
    >
      <div className="absolute inset-0 bg-black/60" />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        className="relative w-full max-w-[520px] rounded-lg border border-forge-blue/25 bg-forge-gunmetal/95 overflow-hidden"
        style={{ boxShadow: "0 0 0 1px rgba(45,142,255,0.1), 0 28px 70px rgba(0,0,0,0.6), 0 4px 12px rgba(0,0,0,0.5)" }}
        onMouseDown={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-forge-border/25">
          <span className="text-[10px] uppercase tracking-widest forge-mono text-forge-muted/55">
            Forge Command Palette
          </span>
          <kbd className="text-[9px] forge-mono text-forge-muted/45 border border-forge-border/30 rounded px-1.5 py-0.5">
            Esc
          </kbd>
        </div>

        {/* Search */}
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search commands..."
          aria-label="Search commands"
          className="w-full bg-transparent px-4 py-3 text-sm text-forge-chrome forge-mono outline-none
            placeholder:text-forge-muted/45 border-b border-forge-border/30 focus:border-forge-blue/45 transition-colors"
        />

        {/* List */}
        <div className="max-h-[300px] overflow-y-auto py-1">
          {filtered.length === 0 ? (
            <p className="px-4 py-3 text-[11px] forge-mono text-forge-silver/50">
              No matching commands.
            </p>
          ) : (
            filtered.map((c, i) => (
              <button
                key={c.label}
                onMouseEnter={() => setSelected(i)}
                onClick={() => runAt(i)}
                className={`forge-press w-full flex items-center justify-between pl-3.5 pr-4 py-2 text-left border-l-2 ${
                  i === selected
                    ? "bg-forge-blue/12 border-forge-blue/70"
                    : "border-transparent hover:bg-forge-panel/25"
                }`}
              >
                <span
                  className={`text-[12px] forge-mono ${
                    i === selected ? "text-forge-chrome" : "text-forge-silver/70"
                  }`}
                >
                  {c.label}
                </span>
                <span
                  className={`text-[10px] forge-mono ${
                    i === selected ? "text-forge-blue/60" : "text-forge-muted/50"
                  }`}
                >
                  {c.hint}
                </span>
              </button>
            ))
          )}
        </div>

        {/* Footer hints */}
        <div className="flex items-center gap-3 px-4 py-1.5 border-t border-forge-border/25 text-[9px] forge-mono text-forge-muted/45">
          <span><span className="text-forge-silver/55">↑↓</span> navigate</span>
          <span><span className="text-forge-silver/55">↵</span> run</span>
          <span><span className="text-forge-silver/55">esc</span> dismiss</span>
        </div>
      </div>
    </div>
  );
}

// ── Main component ───────────────────────────────────────────────────────────

export default function WorkspaceShell() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const urlMode = searchParams.get("mode") ?? "project";
  const urlName = searchParams.get("name") ?? "tavronus-forge-demo";

  const [workspaceMode, setWorkspaceMode] =
    useState<"file" | "workspace" | "mock-project" | "project">("workspace");

  // Explorer
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedPaths, setExpandedPaths] = useState<Set<string>>(
    new Set([
      "tavronus-forge-demo",
      "tavronus-forge-demo/app",
      "tavronus-forge-demo/components",
      "tavronus-forge-demo/lib",
      "app",
      "components",
      "lib",
    ])
  );

  // Overlays / panels
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [menu, setMenu] = useState<{ name: string; left: number; top: number } | null>(null);
  const [settings, setSettings] = useState<{ left: number; top: number } | null>(null);
  const [aiPanelOpen, setAiPanelOpen] = useState(true);
  const [terminalOpen, setTerminalOpen] = useState(true);

  const editorRef = useRef<HTMLTextAreaElement>(null);

  // Persistent virtual file system (localStorage-backed content store)
  const { vfs, readFile, writeFile } = useVfs();

  // Tab / file state (sources file content from the VFS)
  const {
    openTabs, activeTabId, activeTab, activeFileName, activeFilePath, editorContent,
    createNewFile, openFile, closeTab, activateTab, updateActiveContent, updateTabViewState,
    markActiveSaved, resetTabs, initBlank, initFile, initProjectDefault,
  } = useTabs(readFile);

  // Forge AI state
  const {
    aiInput, setAiInput, activeMode, setActiveMode, aiOutput, outputContext, outputFile,
    isGenerating, generate, clearOutput, resetOutput, focusInput, aiInputRef,
    session, updateSessionFile, updateSessionGoal, resetSession,
  } = useForgeAI();

  // Pending mock apply (preview before it touches the active tab).
  const [pendingApply, setPendingApply] = useState<PendingApply | null>(null);

  const mode = getModeById(activeMode);

  // Explorer tree derived from the VFS. Project modes show the demo project
  // namespace; file mode shows the flat file set. Seeded to match the originals.
  const fileTree = useMemo(() => {
    const isProject = workspaceMode === "mock-project" || workspaceMode === "project";
    const paths = Object.keys(vfs).filter((p) =>
      isProject ? p.startsWith("tavronus-forge-demo/") : !p.startsWith("tavronus-forge-demo/")
    );
    return buildTreeFromPaths(paths);
  }, [vfs, workspaceMode]);

  // URL → initial workspace state
  useEffect(() => {
    if (urlMode === "file") {
      setWorkspaceMode("file");
      if (urlName.startsWith("untitled")) initBlank();
      else initFile(urlName);
      resetOutput();
    } else if (urlMode === "mock-project") {
      setWorkspaceMode("mock-project");
      resetTabs();
      resetOutput();
    } else if (urlMode === "workspace") {
      setWorkspaceMode("workspace");
      resetTabs();
      resetOutput();
    } else {
      setWorkspaceMode("project");
      initProjectDefault(urlName);
      resetOutput();
    }
  }, [urlMode, urlName, initBlank, initFile, initProjectDefault, resetTabs, resetOutput]);

  // Global keyboard: Ctrl/Cmd+K toggles palette, Escape closes overlays
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === "k" || e.key === "K")) {
        e.preventDefault();
        setMenu(null);
        setSettings(null);
        setPaletteOpen((o) => !o);
      } else if (e.key === "Escape") {
        setPaletteOpen(false);
        setMenu(null);
        setSettings(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Keep the Forge session's Current File in sync with the active tab.
  useEffect(() => {
    updateSessionFile(activeFileName || "Workspace context");
  }, [activeFileName, updateSessionFile]);

  const toggleDir = useCallback((path: string) => {
    setExpandedPaths((prev) => {
      const next = new Set(prev);
      if (next.has(path)) next.delete(path);
      else next.add(path);
      return next;
    });
  }, []);

  // ── Coordinated actions (tabs + AI + workspace mode) ──────────────────────
  const handleNewFile = useCallback(() => {
    createNewFile();
    setWorkspaceMode("file");
    resetOutput();
  }, [createNewFile, resetOutput]);

  const handleOpenFile = useCallback((path: string, name: string) => {
    openFile(path, name);
    resetOutput();
  }, [openFile, resetOutput]);

  // Capture the active tab's scroll/caret before leaving it.
  const saveActiveView = useCallback(() => {
    const ta = editorRef.current;
    if (ta && activeTabId) {
      updateTabViewState(activeTabId, {
        scrollTop: ta.scrollTop,
        selectionStart: ta.selectionStart,
        selectionEnd: ta.selectionEnd,
      });
    }
  }, [activeTabId, updateTabViewState]);

  const handleActivateTab = useCallback((id: string) => {
    if (id === activeTabId) return;
    saveActiveView();
    activateTab(id);
    resetOutput();
  }, [activeTabId, saveActiveView, activateTab, resetOutput]);

  // Confirm before discarding a dirty tab's unsaved edits.
  const handleCloseTab = useCallback((id: string) => {
    const tab = openTabs.find((t) => t.id === id);
    if (tab?.isDirty && !window.confirm(`Discard unsaved changes to ${tab.name}?`)) return;
    closeTab(id);
  }, [openTabs, closeTab]);

  const showWelcome = useCallback((nextMode: "workspace" | "mock-project") => {
    if (openTabs.some((t) => t.isDirty) && !window.confirm("Discard unsaved changes?")) return;
    setWorkspaceMode(nextMode);
    resetTabs();
    resetOutput();
  }, [openTabs, resetTabs, resetOutput]);

  const focusForgeAI = useCallback((m: ModeId) => {
    setActiveMode(m);
    setAiPanelOpen(true);
    focusInput();
  }, [setActiveMode, focusInput]);

  // editorContent is committed synchronously on every keystroke, so this always
  // hands generate() the latest typed content (no debounce/flush needed).
  const handleGenerate = useCallback(() => {
    generate(activeFileName || "Workspace context", editorContent);
  }, [generate, activeFileName, editorContent]);

  const handleAIKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      handleGenerate();
    }
  };

  const copyEditor = useCallback(() => {
    if (editorContent) navigator.clipboard?.writeText(editorContent).catch(() => {});
  }, [editorContent]);

  // Mock save: persist the active tab's content to the VFS and clear its dirty dot.
  const handleSave = useCallback(() => {
    if (!activeTab) return;
    writeFile(activeTab.path, activeTab.content);
    markActiveSaved();
  }, [activeTab, writeFile, markActiveSaved]);

  // Refs let the (stable) apply handler read the latest tab/mode at click time.
  const activeTabRef = useRef(activeTab);
  activeTabRef.current = activeTab;
  const activeModeRef = useRef(activeMode);
  activeModeRef.current = activeMode;

  // Apply-to-file: build a mock patch from the CURRENT active tab and preview it.
  const handleApply = useCallback((title: string) => {
    const t = activeTabRef.current;
    if (!t) return;
    const patch = buildPatch(activeModeRef.current, t.content, t.name);
    setPendingApply({
      artifactTitle: title,
      targetFile: t.name,
      summary: patch.summary,
      before: t.content,
      after: patch.after,
    });
  }, []);

  // Accept: update the active tab only (becomes dirty). No VFS write — Ctrl+S saves.
  const handleAccept = useCallback(() => {
    if (pendingApply) updateActiveContent(pendingApply.after);
    setPendingApply(null);
  }, [pendingApply, updateActiveContent]);

  // Ctrl/Cmd+S → save. Uses a ref so the listener subscribes once (no per-keystroke churn).
  const saveRef = useRef(handleSave);
  saveRef.current = handleSave;
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === "s" || e.key === "S")) {
        e.preventDefault();
        saveRef.current();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const welcomeCommands: WelcomeCommand[] = [
    { label: "New File",          onClick: handleNewFile },
    { label: "Open Workspace",    onClick: () => showWelcome("workspace") },
    { label: "Open Mock Project", onClick: () => showWelcome("mock-project") },
    { label: "Generate Prompt",   onClick: () => focusForgeAI("prompt") },
    { label: "Review Code",       onClick: () => focusForgeAI("review") },
    { label: "Debug Error",       onClick: () => focusForgeAI("debug") },
  ];

  const paletteCommands: PaletteCommand[] = [
    { label: "New File",          hint: "file",      onClick: handleNewFile },
    { label: "Open Workspace",    hint: "workspace", onClick: () => showWelcome("workspace") },
    { label: "Open Mock Project", hint: "project",   onClick: () => showWelcome("mock-project") },
    { label: "Generate Prompt",   hint: "forge ai",  onClick: () => focusForgeAI("prompt") },
    { label: "Review Code",       hint: "forge ai",  onClick: () => focusForgeAI("review") },
    { label: "Debug Error",       hint: "forge ai",  onClick: () => focusForgeAI("debug") },
    { label: "Clear Output",      hint: "forge ai",  onClick: clearOutput },
  ];

  const menus: { name: string; items: { label: string; onClick: () => void; disabled?: boolean }[] }[] = [
    { name: "File", items: [
      { label: "New File", onClick: handleNewFile },
      { label: "Save", onClick: handleSave, disabled: !activeTab },
      { label: "Open Workspace", onClick: () => showWelcome("workspace") },
      { label: "Open Mock Project", onClick: () => showWelcome("mock-project") },
    ] },
    { name: "Edit", items: [
      { label: "Copy", onClick: copyEditor, disabled: !editorContent },
      { label: "Clear Output", onClick: clearOutput, disabled: !aiInput && !aiOutput },
    ] },
    { name: "Selection", items: [
      { label: "Select All", onClick: () => { editorRef.current?.focus(); editorRef.current?.select(); }, disabled: !activeTab },
    ] },
    { name: "View", items: [
      { label: "Toggle Explorer", onClick: () => setSidebarOpen((o) => !o) },
      { label: "Toggle Forge AI", onClick: () => setAiPanelOpen((o) => !o) },
    ] },
    { name: "Go", items: [
      { label: "Command Palette…", onClick: () => setPaletteOpen(true) },
    ] },
    { name: "Run", items: [
      { label: "Forge Output", onClick: () => handleGenerate(), disabled: !aiInput.trim() || isGenerating },
    ] },
    { name: "Terminal", items: [
      { label: "Toggle Terminal", onClick: () => setTerminalOpen((o) => !o) },
    ] },
    { name: "Help", items: [
      { label: "About Forge", onClick: () => router.push("/about") },
    ] },
  ];

  // ── Render ───────────────────────────────────────────────────────────────

  return (
    <div className="flex flex-col h-screen bg-forge-black text-forge-chrome overflow-hidden">

      {/* ── TOP BAR — IDE chrome ─────────────────────────────────── */}
      <header className="relative z-10 forge-topbar-depth flex items-center h-9 border-b border-forge-border/45 bg-[#0b0d10] flex-shrink-0 select-none overflow-hidden">

        {/* LEFT: sidebar toggle + brand + menu items */}
        <div className="flex items-center h-full flex-shrink-0">

          {/* Sidebar toggle */}
          <button
            onClick={() => setSidebarOpen((o) => !o)}
            title="Toggle explorer"
            aria-label="Toggle explorer"
            className="px-2.5 h-full flex items-center text-forge-silver/45 hover:text-forge-chrome/80 hover:bg-white/[0.04] transition-colors"
          >
            <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
              <rect y="0" width="12" height="1.4" rx="0.7" fill="currentColor" />
              <rect y="4.3" width="12" height="1.4" rx="0.7" fill="currentColor" />
              <rect y="8.6" width="12" height="1.4" rx="0.7" fill="currentColor" />
            </svg>
          </button>

          {/* Brand block */}
          <div className="flex items-center gap-1.5 px-3 h-full border-r border-forge-border/30">
            <ForgeLogo />
            <div className="flex flex-col justify-center leading-none">
              <span className="text-[9px] font-semibold text-forge-chrome/90 tracking-[0.10em] uppercase">
                Tavronus Forge
              </span>
              <span className="text-[8px] text-forge-muted/45 mt-[3px] tracking-wide hidden sm:block">
                by Tavronus Labs
              </span>
            </div>
          </div>

          {/* Menu items — desktop only */}
          <nav className="hidden lg:flex items-center h-full" aria-label="App menu">
            {menus.map((m) => (
              <button
                key={m.name}
                aria-haspopup="menu"
                aria-expanded={menu?.name === m.name}
                onClick={(e) => {
                  const r = e.currentTarget.getBoundingClientRect();
                  setSettings(null);
                  setMenu((cur) =>
                    cur?.name === m.name ? null : { name: m.name, left: r.left, top: r.bottom }
                  );
                }}
                className={`forge-press px-2.5 h-full text-[11px] ${
                  menu?.name === m.name
                    ? "text-forge-chrome/90 bg-white/[0.07]"
                    : "text-forge-silver/55 hover:text-forge-chrome/85 hover:bg-white/[0.04]"
                }`}
              >
                {m.name}
              </button>
            ))}
          </nav>
        </div>

        {/* CENTER: tab strip — fills remaining space */}
        <TabStrip
          openTabs={openTabs}
          activeTabId={activeTabId}
          workspaceMode={workspaceMode}
          projectName={urlName}
          onActivate={handleActivateTab}
          onClose={handleCloseTab}
        />

        {/* RIGHT: status + utility icons */}
        <div className="flex items-center h-full flex-shrink-0">

          {/* Ready */}
          <div className="hidden sm:flex items-center gap-1 px-2.5 text-[10px] forge-mono text-green-400/65">
            <span>✓</span>
            <span>Ready</span>
          </div>

          <div className="w-px h-3.5 bg-forge-border/30 mx-0.5 hidden sm:block" />

          {/* Local Mock Mode */}
          <div
            className="hidden lg:flex items-center gap-1.5 px-2.5 text-[10px] forge-mono"
            style={{ color: "rgba(45,142,255,0.62)" }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-forge-blue/60 animate-pulse" />
            <span>Local Mock Mode</span>
          </div>

          <div className="w-px h-3.5 bg-forge-border/30 mx-0.5 hidden lg:block" />

          {/* Command palette trigger */}
          <button
            onClick={() => { setMenu(null); setSettings(null); setPaletteOpen(true); }}
            title="Command palette"
            aria-label="Open command palette"
            aria-haspopup="dialog"
            className="hidden sm:flex items-center gap-1.5 mx-1 px-2 py-1 rounded border border-forge-border/35
              text-forge-silver/55 hover:text-forge-chrome/80 hover:border-forge-border/60 transition-colors"
          >
            <svg width="9" height="9" viewBox="0 0 12 12" fill="none">
              <circle cx="5" cy="5" r="3.2" stroke="currentColor" strokeWidth="1.2" />
              <path d="M7.6 7.6L10.5 10.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            <span className="text-[10px] forge-mono">Search</span>
            <kbd className="text-[8px] forge-mono text-forge-muted/50 border border-forge-border/35 rounded px-1 py-px leading-none">
              Ctrl K
            </kbd>
          </button>

          {/* Plus: new file */}
          <button
            onClick={handleNewFile}
            title="New file"
            aria-label="New file"
            className="px-2 h-full flex items-center text-forge-muted/45 hover:text-forge-chrome/65 hover:bg-white/[0.04] transition-colors"
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M5 1v8M1 5h8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </button>

          {/* Layout panels */}
          <button
            onClick={() => setSidebarOpen((o) => !o)}
            title="Toggle layout"
            aria-label="Toggle layout"
            className="px-2 h-full flex items-center text-forge-muted/45 hover:text-forge-chrome/65 hover:bg-white/[0.04] transition-colors"
          >
            <svg width="11" height="10" viewBox="0 0 11 10" fill="none">
              <rect x="0.5" y="0.5" width="3"  height="9" rx="0.4" stroke="currentColor" strokeWidth="0.9" />
              <rect x="5"   y="0.5" width="5.5" height="4" rx="0.4" stroke="currentColor" strokeWidth="0.9" />
              <rect x="5"   y="5.5" width="5.5" height="4" rx="0.4" stroke="currentColor" strokeWidth="0.9" />
            </svg>
          </button>

          {/* Forge AI — blue tinted */}
          <button
            title="Focus Forge AI"
            aria-label="Focus Forge AI input"
            onClick={() => { setMenu(null); setSettings(null); setAiPanelOpen(true); focusInput(); }}
            className="px-2 h-full flex items-center text-forge-blue/55 hover:text-forge-blue/85 hover:bg-white/[0.04] transition-colors"
          >
            <svg width="11" height="11" viewBox="0 0 14 14" fill="none">
              <polygon points="7,1 13,4 13,10 7,13 1,10 1,4" stroke="currentColor" strokeWidth="1.2" fill="none" />
              <circle cx="7" cy="7" r="1.4" fill="currentColor" />
            </svg>
          </button>

          {/* Settings */}
          <button
            title="Settings"
            aria-label="Settings"
            aria-haspopup="dialog"
            aria-expanded={!!settings}
            onClick={(e) => {
              const r = e.currentTarget.getBoundingClientRect();
              setMenu(null);
              setSettings((cur) => (cur ? null : { left: r.right, top: r.bottom }));
            }}
            className={`px-2 h-full flex items-center transition-colors hover:bg-white/[0.04] ${
              settings ? "text-forge-chrome/70" : "text-forge-muted/45 hover:text-forge-chrome/65"
            }`}
          >
            <svg width="11" height="11" viewBox="0 0 14 14" fill="none">
              <circle cx="7" cy="7" r="2.2" stroke="currentColor" strokeWidth="1" />
              <path d="M7 1v2M7 11v2M1 7h2M11 7h2M3.22 3.22l1.41 1.41M9.37 9.37l1.41 1.41M3.22 10.78l1.41-1.41M9.37 4.63l1.41-1.41"
                stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" />
            </svg>
          </button>

          <div className="w-px h-3.5 bg-forge-border/30 mx-1" />

          {/* Home */}
          <Link
            href="/"
            className="px-2.5 h-full flex items-center text-[10px] forge-mono text-forge-muted/45 hover:text-forge-chrome/65 transition-colors"
          >
            ← Home
          </Link>
        </div>
      </header>

      {/* ── Floating overlays: menu dropdowns + settings popover ──── */}
      {(menu || settings) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => { setMenu(null); setSettings(null); }}
        />
      )}

      {menu && (
        <div
          role="menu"
          aria-label={`${menu.name} menu`}
          className="fixed z-50 min-w-[190px] rounded-b-md border border-forge-border/30 bg-forge-gunmetal/95 py-1"
          style={{ left: menu.left, top: menu.top, boxShadow: "0 14px 34px rgba(0,0,0,0.5)" }}
        >
          {menus.find((m) => m.name === menu.name)?.items.map((it) => (
            <button
              key={it.label}
              role="menuitem"
              disabled={it.disabled}
              onClick={() => { if (!it.disabled) { it.onClick(); setMenu(null); } }}
              className={`forge-press w-full text-left px-3 py-1.5 text-[11px] forge-mono ${
                it.disabled
                  ? "text-forge-muted/40 cursor-not-allowed"
                  : "text-forge-silver/70 hover:bg-forge-blue/12 hover:text-forge-chrome"
              }`}
            >
              {it.label}
            </button>
          ))}
        </div>
      )}

      {settings && (
        <div
          className="fixed z-50 w-[180px] rounded-md border border-forge-blue/25 bg-forge-gunmetal/95 p-3"
          style={{
            left: settings.left,
            top: settings.top,
            transform: "translateX(-100%)",
            boxShadow: "0 14px 34px rgba(0,0,0,0.5)",
          }}
        >
          <p className="text-[9px] uppercase tracking-widest forge-mono text-forge-muted/55 mb-2">
            Settings
          </p>
          <div className="flex flex-col gap-1.5 text-[11px] forge-mono">
            {[
              ["Theme", "Dark"],
              ["Mode", "Mock"],
              ["Port", "5642"],
              ["Version", "v0.1"],
            ].map(([k, v]) => (
              <div key={k} className="flex items-center justify-between">
                <span className="text-forge-muted/55">{k}</span>
                <span className="text-forge-silver/75">{v}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── MAIN BODY ─────────────────────────────────────────────── */}
      <div className="flex flex-1 min-h-0 overflow-hidden">

        {/* ── LEFT: Explorer ──────────────────────────────────────── */}
        <aside
          className={`
            flex flex-col border-r border-forge-border/45 bg-forge-obsidian/40 flex-shrink-0
            transition-all duration-200
            ${sidebarOpen ? "w-56" : "w-0 overflow-hidden border-r-0"}
          `}
        >
          <div className="flex items-center px-3 py-2 border-b border-forge-border/30">
            <span className="text-[9px] text-forge-muted/55 uppercase tracking-widest forge-mono">
              Explorer
            </span>
          </div>
          <div className="flex-1 overflow-y-auto py-1">
            {workspaceMode === "workspace" ? (
              <div className="px-3 py-4 flex flex-col gap-1.5">
                <p className="text-[11px] text-forge-silver/50 forge-mono">No project opened</p>
                <p className="text-[10px] text-forge-muted/35 forge-mono leading-relaxed">
                  Start a new file or open the mock project.
                </p>
              </div>
            ) : (
              fileTree.map((node) => (
                <TreeNode
                  key={node.name}
                  node={node}
                  path={node.name}
                  depth={0}
                  activeFilePath={activeFilePath}
                  expandedPaths={expandedPaths}
                  onFileSelect={handleOpenFile}
                  onDirToggle={toggleDir}
                />
              ))
            )}
          </div>
        </aside>

        {/* ── CENTER: Editor ──────────────────────────────────────── */}
        <EditorPane
          activeTab={activeTab}
          content={editorContent}
          onChange={updateActiveContent}
          welcomeCommands={welcomeCommands}
          editorRef={editorRef}
        />

        {/* ── RIGHT: Forge AI ─────────────────────────────────────── */}
        {aiPanelOpen && (
        <div className="flex flex-col w-96 flex-shrink-0 bg-forge-obsidian/35 overflow-hidden">

          {/* AI panel header */}
          <div className="flex items-center justify-between px-4 h-9 border-b border-forge-border/40 flex-shrink-0">
            <div className="flex items-center gap-1.5 min-w-0">
              <svg width="11" height="11" viewBox="0 0 14 14" fill="none" className="flex-shrink-0">
                <polygon points="7,1 13,4 13,10 7,13 1,10 1,4" stroke="#2D8EFF" strokeWidth="1.2" fill="none" />
                <circle cx="7" cy="7" r="1.4" fill="#2D8EFF" />
              </svg>
              <span className="text-xs font-semibold text-forge-chrome/90 tracking-wide">
                Forge AI
              </span>
            </div>
            <span
              className="flex items-center gap-1.5 text-[9px] forge-mono uppercase tracking-wider
                text-forge-blue/60 border border-forge-blue/25 rounded px-1.5 py-0.5 flex-shrink-0"
              title="Responses are generated locally from mock templates — no external AI is called."
            >
              <span className="w-1 h-1 rounded-full bg-forge-blue/60 animate-pulse" />
              Local Mock
            </span>
          </div>

          {/* Mode chips — the tool loaded into the assistant */}
          <div className="flex flex-wrap gap-1.5 px-3 pt-3 pb-2.5 border-b border-forge-border/30 flex-shrink-0">
            {MODES.map((m) => {
              const isActive = activeMode === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => setActiveMode(m.id)}
                  aria-pressed={isActive}
                  title={m.description}
                  className={`
                    forge-press px-2.5 py-1 rounded text-[11px] forge-mono font-medium
                    ${isActive
                      ? "border border-forge-blue/55 bg-forge-blue/15 text-forge-blue"
                      : "border border-forge-border/40 text-forge-silver/55 hover:text-forge-chrome/80 hover:border-forge-border/60 hover:bg-white/[0.03]"}
                  `}
                  style={isActive ? { boxShadow: "0 0 6px rgba(45,142,255,0.14)" } : undefined}
                >
                  {m.shortLabel}
                </button>
              );
            })}
          </div>

          {/* Active mode summary + what Forge is looking at */}
          <div className="px-3 py-2.5 border-b border-forge-border/30 flex-shrink-0 flex flex-col gap-1.5">
            <div className="flex items-baseline gap-2">
              <span className="text-[11px] font-semibold forge-mono text-forge-chrome/85 tracking-wide flex-shrink-0">
                {mode.label}
              </span>
              <span className="text-[9px] forge-mono uppercase tracking-wider text-forge-blue/55 flex-shrink-0">
                {MODE_KIND[activeMode]}
              </span>
            </div>
            <p className="text-[10px] text-forge-silver/55 forge-mono leading-relaxed">
              {mode.description}
            </p>
            <div className="flex items-center gap-1.5 text-[10px] forge-mono text-forge-muted/55 min-w-0">
              <span className="w-1 h-1 rounded-full bg-forge-blue/55 flex-shrink-0" />
              {activeFileName ? (
                <span className="truncate">
                  Editor-aware · <span className="text-forge-silver/70">{activeFileName}</span>
                </span>
              ) : (
                <span className="truncate">Workspace context · no file open</span>
              )}
            </div>
          </div>

          {/* AI input — command composer */}
          <div className="px-3 py-3 border-b border-forge-border/30 flex-shrink-0">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[9px] uppercase tracking-widest forge-mono text-forge-muted/55">
                Command
              </span>
              <span className="text-[9px] forge-mono text-forge-muted/40">
                <span className="text-forge-silver/50">⌘⏎</span> to forge
              </span>
            </div>
            <div className="rounded border border-forge-border/40 bg-forge-black/40
              focus-within:border-forge-blue/45 transition-colors">
              <textarea
                ref={aiInputRef}
                value={aiInput}
                onChange={(e) => setAiInput(e.target.value)}
                onKeyDown={handleAIKeyDown}
                placeholder={MODE_PLACEHOLDER[activeMode]}
                aria-label="Forge AI prompt"
                rows={4}
                className="w-full bg-transparent
                  text-xs text-forge-chrome forge-mono placeholder:text-forge-muted/45
                  outline-none resize-none px-3 py-2.5 leading-relaxed"
              />
            </div>
            <div className="flex items-center gap-2 mt-2">
              {(aiInput || aiOutput) && (
                <button
                  onClick={clearOutput}
                  className="text-[11px] forge-mono px-3 py-1.5 border border-forge-border/40 rounded
                    text-forge-silver/60 hover:text-forge-chrome/80 hover:border-forge-border/60
                    transition-colors flex-shrink-0"
                >
                  Clear
                </button>
              )}
              <button
                onClick={handleGenerate}
                disabled={!aiInput.trim() || isGenerating}
                className={`
                  flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded
                  text-xs font-semibold forge-mono transition-all duration-200
                  ${!aiInput.trim() || isGenerating
                    ? "opacity-25 cursor-not-allowed text-forge-silver bg-forge-panel/50 border border-forge-border/25"
                    : "forge-btn-primary text-white cursor-pointer"}
                `}
              >
                {isGenerating ? (
                  <>
                    <svg className="animate-spin" width="10" height="10" viewBox="0 0 12 12" fill="none">
                      <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.5"
                        strokeDasharray="16" strokeDashoffset="8" />
                    </svg>
                    Forging...
                  </>
                ) : (
                  <>⚡ Forge Output</>
                )}
              </button>
            </div>
          </div>

          {/* Forge session tracker */}
          <ForgeSessionCard session={session} onReset={resetSession} onEditGoal={updateSessionGoal} />

          {/* AI output */}
          <div className="flex-1 overflow-y-auto p-3">
            {isGenerating ? (
              <div className="flex flex-col items-center justify-center min-h-[100px] gap-3 pt-8">
                <div className="flex gap-1.5">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="w-1.5 h-1.5 rounded-full bg-forge-blue/40 animate-bounce"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </div>
                <p className="text-[10px] text-forge-silver/55 forge-mono">Forging...</p>
              </div>
            ) : aiOutput ? (
              <div className="flex flex-col gap-2">
                {outputContext && (
                  <div className="flex items-center gap-1.5 px-2 py-1.5 mb-0.5 rounded border border-forge-border/30 bg-forge-black/30">
                    <span className="w-1 h-1 rounded-full bg-forge-blue/60 flex-shrink-0" />
                    <span className="text-[10px] forge-mono text-forge-silver/55 truncate">
                      {outputContext}
                    </span>
                  </div>
                )}
                {aiOutput.map((card, i) => {
                  // Apply shows on code-oriented cards, only when there's an active
                  // tab and the output targeted a file. It's enabled only when that
                  // tab still matches the generated file (avoids the wrong-file apply).
                  const showApply = ACTIONABLE_TITLES.has(card.title) && !!activeTab && outputFile !== null;
                  const canApply = showApply && activeFileName === outputFile;
                  return (
                    <OutputCard
                      key={card.title}
                      title={card.title}
                      label={card.label}
                      body={card.body}
                      code={card.code}
                      index={i}
                      onApply={showApply ? handleApply : undefined}
                      applyDisabled={!canApply}
                      applyHint={!canApply ? `Switch to ${outputFile} to apply` : undefined}
                    />
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center min-h-[100px] gap-3 text-center pt-8 px-3">
                <svg width="22" height="22" viewBox="0 0 14 14" fill="none" className="opacity-25">
                  <polygon points="7,1 13,4 13,10 7,13 1,10 1,4" stroke="#2D8EFF" strokeWidth="1" fill="none" />
                  <circle cx="7" cy="7" r="1.4" fill="#2D8EFF" />
                </svg>
                <div className="flex flex-col gap-1">
                  <p className="text-xs text-forge-silver/60 forge-mono">No output yet</p>
                  <p className="text-[10px] text-forge-muted/45 forge-mono leading-relaxed max-w-[220px]">
                    Write a command above, then press{" "}
                    <span className="text-forge-silver/55">Forge Output</span> to generate{" "}
                    <span className="text-forge-blue/55">{mode.label}</span> artifacts for this context.
                  </p>
                </div>
              </div>
            )}
          </div>

        </div>
        )}
      </div>

      {/* ── BOTTOM: Terminal + status ────────────────────────────── */}
      <div className="border-t border-forge-border/45 bg-forge-black flex-shrink-0">

        {/* Optional terminal / output line */}
        {terminalOpen && (
          <div className="flex items-center gap-2.5 px-4 h-8 border-b border-forge-border/30 bg-forge-obsidian/30">
            <span className="text-[10px] forge-mono text-forge-muted/50">$</span>
            <span className="text-[10px] forge-mono text-forge-silver/60">next dev -p 5642</span>
            <span className="text-[10px] forge-mono text-forge-muted/30">·</span>
            <span className="text-[10px] forge-mono text-green-400/70">ready</span>
            <span className="text-[10px] forge-mono text-forge-muted/30">·</span>
            <span className="text-[10px] forge-mono text-forge-blue/65">http://localhost:5642</span>
          </div>
        )}

        {/* Status bar */}
        <div className="flex items-center justify-between px-4 h-6">
          <div className="flex items-center gap-2.5">
            <span className="flex items-center gap-1.5 text-[10px] forge-mono text-green-400/70">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400/70" />
              Forge shell active
            </span>
            <span className="text-[10px] forge-mono text-forge-muted/30">·</span>
            <span className="text-[10px] forge-mono text-forge-silver/50">localhost:5642</span>
            <span className="text-[10px] forge-mono text-forge-muted/30">·</span>
            <span className="text-[10px] forge-mono text-forge-silver/50">mock mode</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] forge-mono text-forge-silver/55">{mode.label}</span>
            <span className="text-[10px] forge-mono text-forge-muted/30">·</span>
            <span className="text-[10px] forge-mono text-forge-muted/45">v0.1</span>
          </div>
        </div>
      </div>

      {/* ── Command palette ──────────────────────────────────────── */}
      {paletteOpen && (
        <CommandPalette commands={paletteCommands} onClose={() => setPaletteOpen(false)} />
      )}

      {/* ── Apply-to-file preview ────────────────────────────────── */}
      <ApplyPreview
        pending={pendingApply}
        onAccept={handleAccept}
        onCancel={() => setPendingApply(null)}
      />

    </div>
  );
}
