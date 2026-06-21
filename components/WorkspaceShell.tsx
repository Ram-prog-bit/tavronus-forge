"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import OutputCard from "./OutputCard";
import { ModeId, getModeById, MODES } from "@/lib/modes";
import { FileNode, FILE_MODE_TREE, PROJECT_MODE_TREE, MOCK_CODE, getFileColor } from "@/lib/mockFiles";

// ── Helpers ─────────────────────────────────────────────────────────────────

function getContent(path: string, name: string): string {
  if (MOCK_CODE[path]) return MOCK_CODE[path];
  const parts = path.split("/");
  if (parts.length >= 2) {
    const twoSeg = `${parts[parts.length - 2]}/${parts[parts.length - 1]}`;
    if (MOCK_CODE[twoSeg]) return MOCK_CODE[twoSeg];
  }
  return MOCK_CODE[name] ?? `// ${name}\n// No preview available.`;
}

function extOf(name: string): string {
  const i = name.lastIndexOf(".");
  return i === -1 ? "" : name.slice(i + 1);
}

// ── Sub-components ───────────────────────────────────────────────────────────

function ForgeLogo() {
  return (
    <div
      className="w-5 h-5 border border-forge-blue/40 flex items-center justify-center flex-shrink-0"
      style={{ boxShadow: "0 0 6px rgba(45,142,255,0.12)" }}
    >
      <svg width="11" height="11" viewBox="0 0 14 14" fill="none">
        <polygon points="7,1 13,4 13,10 7,13 1,10 1,4" stroke="#2D8EFF" strokeWidth="1" fill="none" />
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

function TreeNode({
  node, path, depth, activeFilePath, expandedPaths, onFileSelect, onDirToggle,
}: TreeNodeProps) {
  const indent = depth * 10;
  const isExpanded = expandedPaths.has(path);

  if (node.type === "dir") {
    return (
      <div>
        <button
          onClick={() => onDirToggle(path)}
          className="w-full flex items-center gap-1.5 py-[3px] text-left hover:bg-forge-panel/25 transition-colors"
          style={{ paddingLeft: `${6 + indent}px`, paddingRight: "8px" }}
        >
          <span className="text-forge-muted/25 text-[9px] w-3 flex-shrink-0">
            {isExpanded ? "▾" : "▸"}
          </span>
          <span className="text-[11px] text-forge-silver/40 truncate">{node.name}</span>
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
        w-full flex items-center gap-1.5 py-[3px] text-left transition-all duration-100
        ${isActive
          ? "bg-forge-blue/8 border-l-[2px] border-forge-blue/60"
          : "border-l-[2px] border-transparent hover:bg-forge-panel/20"}
      `}
      style={{ paddingLeft: `${indent + 8}px`, paddingRight: "8px" }}
    >
      <span className="w-3 flex-shrink-0" />
      <span className="text-[7px] flex-shrink-0" style={{ color: getFileColor(node.ext) }}>●</span>
      <span className={`text-[11px] truncate ${isActive ? "text-forge-chrome" : "text-forge-silver/40"}`}>
        {node.name}
      </span>
    </button>
  );
}

// ── Main component ───────────────────────────────────────────────────────────

export default function WorkspaceShell() {
  const searchParams = useSearchParams();
  const urlMode = searchParams.get("mode") ?? "project";
  const urlName = searchParams.get("name") ?? "tavronus-forge-demo";

  // Editor
  const [activeFilePath, setActiveFilePath] = useState("");
  const [activeFileName, setActiveFileName] = useState("");
  const [editorContent, setEditorContent] = useState("");

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

  // AI panel
  const [activeMode, setActiveMode] = useState<ModeId>("review");
  const [aiInput, setAiInput] = useState("");
  const [aiOutput, setAiOutput] = useState<{ title: string; content: string }[] | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Scroll sync
  const editorRef = useRef<HTMLTextAreaElement>(null);
  const lineNumRef = useRef<HTMLDivElement>(null);

  const mode = getModeById(activeMode);
  const fileTree = urlMode === "file" ? FILE_MODE_TREE : PROJECT_MODE_TREE;

  useEffect(() => {
    if (urlMode === "file") {
      setActiveFilePath(urlName);
      setActiveFileName(urlName);
      setEditorContent(getContent(urlName, urlName));
    } else {
      const defaultPath = `${urlName}/app/page.tsx`;
      setActiveFilePath(defaultPath);
      setActiveFileName("page.tsx");
      setEditorContent(getContent(defaultPath, "page.tsx"));
    }
  }, [urlMode, urlName]);

  const handleFileSelect = useCallback((path: string, name: string) => {
    setActiveFilePath(path);
    setActiveFileName(name);
    setEditorContent(getContent(path, name));
    setAiOutput(null);
  }, []);

  const toggleDir = useCallback((path: string) => {
    setExpandedPaths((prev) => {
      const next = new Set(prev);
      if (next.has(path)) next.delete(path);
      else next.add(path);
      return next;
    });
  }, []);

  const handleGenerate = async () => {
    if (!aiInput.trim() || isGenerating) return;
    setIsGenerating(true);
    setAiOutput(null);
    await new Promise((r) => setTimeout(r, 900));
    setAiOutput(mode.outputSections.map((s) => ({ title: s.title, content: s.content })));
    setIsGenerating(false);
  };

  const handleAIKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      handleGenerate();
    }
  };

  const handleEditorScroll = () => {
    if (editorRef.current && lineNumRef.current) {
      lineNumRef.current.scrollTop = editorRef.current.scrollTop;
    }
  };

  const lineCount = editorContent.split("\n").length;
  const fileExt = extOf(activeFileName);
  const langLabel =
    fileExt === "tsx" ? "TypeScript JSX"
    : fileExt === "ts" ? "TypeScript"
    : fileExt === "json" ? "JSON"
    : fileExt === "css" ? "CSS"
    : "Plain Text";

  // ── Render ───────────────────────────────────────────────────────────────

  return (
    <div className="flex flex-col h-screen bg-forge-black text-forge-chrome overflow-hidden">

      {/* ── TOP BAR ───────────────────────────────────────────────── */}
      <header className="flex items-center h-10 border-b border-forge-border/40 bg-forge-obsidian/50 flex-shrink-0">

        {/* Sidebar toggle + brand */}
        <div className="flex items-center gap-2 px-3 border-r border-forge-border/30 h-full flex-shrink-0">
          <button
            onClick={() => setSidebarOpen((o) => !o)}
            className="p-1.5 rounded text-forge-silver/25 hover:text-forge-chrome hover:bg-forge-panel/40 transition-colors"
            title="Toggle explorer"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <rect x="0" y="1"    width="12" height="1.5" rx="0.75" fill="currentColor" />
              <rect x="0" y="5.25" width="12" height="1.5" rx="0.75" fill="currentColor" />
              <rect x="0" y="9.5"  width="12" height="1.5" rx="0.75" fill="currentColor" />
            </svg>
          </button>
          <ForgeLogo />
          <span className="text-[10px] text-forge-chrome/50 tracking-widest uppercase forge-mono hidden sm:block">
            Forge
          </span>
        </div>

        {/* File tab */}
        <div className="flex-1 flex items-center h-full overflow-hidden">
          {activeFileName ? (
            <div className="flex items-center gap-2 px-4 h-full border-r border-forge-border/25 bg-forge-black/20 text-[11px] forge-mono text-forge-chrome/60 flex-shrink-0">
              <span className="text-[8px]" style={{ color: getFileColor(fileExt) }}>●</span>
              <span>{activeFileName}</span>
              <button
                onClick={() => { setActiveFilePath(""); setActiveFileName(""); setEditorContent(""); }}
                className="text-forge-muted/25 hover:text-forge-chrome/50 ml-0.5 transition-colors leading-none"
                title="Close"
              >
                ×
              </button>
            </div>
          ) : (
            <span className="px-4 text-[11px] forge-mono text-forge-muted/25">
              {urlName}
            </span>
          )}
        </div>

        {/* Right: status */}
        <div className="flex items-center gap-3 px-4 flex-shrink-0">
          <div
            className="hidden sm:flex items-center gap-1.5 text-[10px] forge-mono"
            style={{ color: "rgba(45,142,255,0.5)" }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-forge-blue/50 animate-pulse" />
            Local Mock Mode
          </div>
          <div className="w-px h-3 bg-forge-border/30 hidden sm:block" />
          <div className="flex items-center gap-1 text-[10px] forge-mono text-green-500/50">
            <span>✓</span>
            <span>Ready</span>
          </div>
          <div className="w-px h-3 bg-forge-border/30" />
          <Link
            href="/"
            className="text-[10px] text-forge-muted/30 hover:text-forge-chrome/60 transition-colors forge-mono"
          >
            ← Home
          </Link>
        </div>
      </header>

      {/* ── MAIN BODY ─────────────────────────────────────────────── */}
      <div className="flex flex-1 min-h-0 overflow-hidden">

        {/* ── LEFT: Explorer ──────────────────────────────────────── */}
        <aside
          className={`
            flex flex-col border-r border-forge-border/35 bg-forge-obsidian/35 flex-shrink-0
            transition-all duration-200
            ${sidebarOpen ? "w-56" : "w-0 overflow-hidden border-r-0"}
          `}
        >
          <div className="flex items-center px-3 py-2 border-b border-forge-border/25">
            <span className="text-[9px] text-forge-muted/30 uppercase tracking-widest forge-mono">
              Explorer
            </span>
          </div>
          <div className="flex-1 overflow-y-auto py-1">
            {fileTree.map((node) => (
              <TreeNode
                key={node.name}
                node={node}
                path={node.name}
                depth={0}
                activeFilePath={activeFilePath}
                expandedPaths={expandedPaths}
                onFileSelect={handleFileSelect}
                onDirToggle={toggleDir}
              />
            ))}
          </div>
        </aside>

        {/* ── CENTER: Editor ──────────────────────────────────────── */}
        <div className="flex flex-col flex-1 min-w-0 overflow-hidden border-r border-forge-border/25">

          {/* Editor meta bar */}
          <div className="flex items-center justify-between px-4 h-8 border-b border-forge-border/20 bg-forge-obsidian/15 flex-shrink-0">
            <div className="flex items-center gap-2 text-[10px] forge-mono text-forge-muted/30">
              {activeFileName ? (
                <>
                  <span>{activeFileName}</span>
                  <span>·</span>
                  <span className="text-forge-muted/20">mock file</span>
                  <span>·</span>
                  <span>{lineCount} lines</span>
                </>
              ) : (
                <span>No file open</span>
              )}
            </div>
            <div className="flex items-center gap-2 text-[10px] forge-mono text-forge-muted/20">
              <span>{langLabel}</span>
              <span>·</span>
              <span>UTF-8</span>
            </div>
          </div>

          {/* Editor body */}
          {activeFileName ? (
            <div className="flex flex-1 min-h-0 overflow-hidden">
              {/* Line numbers */}
              <div
                ref={lineNumRef}
                className="w-10 flex-shrink-0 border-r border-forge-border/12 overflow-hidden"
                style={{ scrollbarWidth: "none" }}
              >
                <div className="py-3 select-none">
                  {Array.from({ length: lineCount }, (_, i) => (
                    <div
                      key={i}
                      className="text-right pr-3 text-[11px] text-forge-muted/18 forge-mono"
                      style={{ lineHeight: "1.6rem" }}
                    >
                      {i + 1}
                    </div>
                  ))}
                </div>
              </div>
              {/* Textarea */}
              <textarea
                ref={editorRef}
                value={editorContent}
                onChange={(e) => setEditorContent(e.target.value)}
                onScroll={handleEditorScroll}
                className="flex-1 bg-transparent text-forge-chrome text-[13px] forge-mono
                  outline-none resize-none px-4 py-3 overflow-auto"
                style={{ lineHeight: "1.6rem" }}
                spellCheck={false}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
              />
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-sm text-forge-muted/18 forge-mono">
                Select a file from the explorer
              </p>
            </div>
          )}
        </div>

        {/* ── RIGHT: Forge AI ─────────────────────────────────────── */}
        <div className="flex flex-col w-96 flex-shrink-0 bg-forge-obsidian/25 overflow-hidden">

          {/* AI panel header */}
          <div className="flex items-center justify-between px-4 h-10 border-b border-forge-border/35 flex-shrink-0">
            <span className="text-xs font-medium text-forge-chrome/75 tracking-wide">
              ◈ Forge AI
            </span>
            {activeFileName && (
              <span className="text-[10px] forge-mono text-forge-muted/28">
                Context:{" "}
                <span className="text-forge-silver/38">{activeFileName}</span>
              </span>
            )}
          </div>

          {/* Mode chips */}
          <div className="flex flex-wrap gap-1.5 px-3 py-3 border-b border-forge-border/20 flex-shrink-0">
            {MODES.map((m) => (
              <button
                key={m.id}
                onClick={() => { setActiveMode(m.id); setAiOutput(null); }}
                className={`
                  px-2.5 py-1 rounded text-[11px] forge-mono font-medium transition-all duration-150
                  ${activeMode === m.id
                    ? "border border-forge-blue/50 bg-forge-blue/10 text-forge-blue"
                    : "border border-forge-border/35 text-forge-muted/45 hover:text-forge-silver/60 hover:border-forge-border/55"}
                `}
                style={activeMode === m.id ? { boxShadow: "0 0 5px rgba(45,142,255,0.08)" } : undefined}
              >
                {m.shortLabel}
              </button>
            ))}
          </div>

          {/* Mode description (single subtle line) */}
          <div className="px-3 py-2 border-b border-forge-border/15 flex-shrink-0">
            <p className="text-[10px] text-forge-muted/30 forge-mono leading-relaxed">
              {mode.description}
            </p>
          </div>

          {/* AI input */}
          <div className="px-3 py-3 border-b border-forge-border/20 flex-shrink-0">
            <textarea
              value={aiInput}
              onChange={(e) => setAiInput(e.target.value)}
              onKeyDown={handleAIKeyDown}
              placeholder="Ask Forge about this file or project..."
              rows={4}
              className="w-full bg-forge-black/40 border border-forge-border/35 rounded
                text-xs text-forge-chrome forge-mono placeholder:text-forge-muted/22
                outline-none resize-none px-3 py-2.5 leading-relaxed
                focus:border-forge-blue/25 transition-colors"
            />
            <div className="flex items-center gap-2 mt-2">
              {(aiInput || aiOutput) && (
                <button
                  onClick={() => { setAiInput(""); setAiOutput(null); }}
                  className="text-[11px] forge-mono px-3 py-1.5 border border-forge-border/35 rounded
                    text-forge-muted/40 hover:text-forge-silver/60 hover:border-forge-border/55
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
                <p className="text-[10px] text-forge-muted/30 forge-mono">Forging...</p>
              </div>
            ) : aiOutput ? (
              <div className="flex flex-col gap-2">
                {aiOutput.map((card, i) => (
                  <OutputCard key={card.title} title={card.title} content={card.content} index={i} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center min-h-[100px] gap-2 text-center pt-8">
                <p className="text-xs text-forge-muted/25 forge-mono">No output yet.</p>
                <p className="text-[10px] text-forge-muted/18 forge-mono leading-relaxed max-w-[200px]">
                  Ask Forge to plan, prompt, review, debug, or create a checklist.
                </p>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* ── BOTTOM: Terminal + status ────────────────────────────── */}
      <div className="border-t border-forge-border/35 bg-forge-black flex-shrink-0">

        {/* Compact terminal line */}
        <div className="flex items-center gap-3 px-4 h-8 border-b border-forge-border/20 bg-forge-obsidian/30">
          <span className="text-[10px] forge-mono text-forge-muted/30">$</span>
          <span className="text-[10px] forge-mono text-forge-muted/40">npm run dev</span>
          <span className="text-[10px] forge-mono text-forge-muted/20">·</span>
          <span className="text-[10px] forge-mono text-green-500/50">✓ ready</span>
          <span className="text-[10px] forge-mono text-forge-muted/20">—</span>
          <span className="text-[10px] forge-mono text-forge-blue/45">http://localhost:5642</span>
          <span className="inline-block w-1.5 h-[0.65rem] bg-forge-muted/20 animate-pulse align-middle ml-0.5" />
        </div>

        {/* Status bar */}
        <div className="flex items-center justify-between px-4 h-6">
          <div className="flex items-center gap-2.5">
            <div className="w-1 h-1 rounded-full bg-green-500/55 animate-pulse" />
            <span className="text-[10px] forge-mono text-forge-muted/35">Forge shell active</span>
            <span className="text-[10px] forge-mono text-forge-border/50">·</span>
            <span className="text-[10px] forge-mono text-forge-muted/25">localhost:5642</span>
            <span className="text-[10px] forge-mono text-forge-border/50">·</span>
            <span className="text-[10px] forge-mono text-forge-muted/25">mock mode</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] forge-mono text-forge-muted/22">{mode.label}</span>
            <span className="text-[10px] forge-mono text-forge-border/40">·</span>
            <span className="text-[10px] forge-mono text-forge-muted/18">v0.1</span>
          </div>
        </div>
      </div>

    </div>
  );
}
