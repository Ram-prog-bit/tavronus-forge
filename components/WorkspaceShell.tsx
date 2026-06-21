"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import OutputCard from "./OutputCard";
import { ModeId, getModeById, MODES } from "@/lib/modes";
import { FileNode, FILE_MODE_TREE, PROJECT_MODE_TREE, MOCK_CODE, getFileColor } from "@/lib/mockFiles";

// ── Helpers ────────────────────────────────────────────────────────────────

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

// ── Sub-components ─────────────────────────────────────────────────────────

function ForgeLogo() {
  return (
    <div
      className="w-5 h-5 border border-forge-blue/40 flex items-center justify-center flex-shrink-0"
      style={{ boxShadow: "0 0 6px rgba(45,142,255,0.15)" }}
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
          <span className="text-forge-muted/30 text-[9px] w-3 flex-shrink-0">
            {isExpanded ? "▾" : "▸"}
          </span>
          <span className="text-[11px] text-forge-silver/45 truncate">{node.name}</span>
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
        w-full flex items-center gap-1.5 py-[3px] text-left transition-colors
        ${isActive
          ? "bg-forge-blue/10 border-l-[2px] border-forge-blue/60"
          : "border-l-[2px] border-transparent hover:bg-forge-panel/25"}
      `}
      style={{ paddingLeft: `${indent + 8}px`, paddingRight: "8px" }}
    >
      <span className="w-3 flex-shrink-0" />
      <span className="text-[7px] flex-shrink-0" style={{ color: getFileColor(node.ext) }}>
        ●
      </span>
      <span className={`text-[11px] truncate ${isActive ? "text-forge-chrome" : "text-forge-silver/45"}`}>
        {node.name}
      </span>
    </button>
  );
}

// ── Main component ──────────────────────────────────────────────────────────

export default function WorkspaceShell() {
  const searchParams = useSearchParams();
  const urlMode = searchParams.get("mode") ?? "project";
  const urlName = searchParams.get("name") ?? "tavronus-forge-demo";

  // Editor
  const [activeFilePath, setActiveFilePath] = useState("");
  const [activeFileName, setActiveFileName] = useState("");
  const [editorContent, setEditorContent] = useState("");

  // Explorer
  const [expandedPaths, setExpandedPaths] = useState<Set<string>>(
    new Set([
      "tavronus-forge-demo",
      "tavronus-forge-demo/app",
      "tavronus-forge-demo/components",
      "tavronus-forge-demo/lib",
      "app",
      "components",
    ])
  );

  // AI panel
  const [activeMode, setActiveMode] = useState<ModeId>("review");
  const [aiInput, setAiInput] = useState("");
  const [aiOutput, setAiOutput] = useState<{ title: string; content: string }[] | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Layout
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [terminalOpen, setTerminalOpen] = useState(true);

  // Refs for scroll sync between line numbers and textarea
  const editorRef = useRef<HTMLTextAreaElement>(null);
  const lineNumRef = useRef<HTMLDivElement>(null);

  const mode = getModeById(activeMode);
  const fileTree = urlMode === "file" ? FILE_MODE_TREE : PROJECT_MODE_TREE;

  // Initialise active file from URL params
  useEffect(() => {
    if (urlMode === "file") {
      const content = getContent(urlName, urlName);
      setActiveFilePath(urlName);
      setActiveFileName(urlName);
      setEditorContent(content);
    } else {
      const defaultPath = `${urlName}/app/page.tsx`;
      const content = getContent(defaultPath, "page.tsx");
      setActiveFilePath(defaultPath);
      setActiveFileName("page.tsx");
      setEditorContent(content);
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

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="flex flex-col h-screen bg-forge-black text-forge-chrome overflow-hidden">

      {/* ── TOP BAR ─────────────────────────────────────────────── */}
      <header className="flex items-center h-10 border-b border-forge-border/50 bg-forge-obsidian/60 flex-shrink-0">

        {/* Brand + sidebar toggle */}
        <div className="flex items-center gap-2 px-3 border-r border-forge-border/40 h-full flex-shrink-0">
          <button
            onClick={() => setSidebarOpen((o) => !o)}
            className="p-1.5 rounded text-forge-silver/30 hover:text-forge-chrome hover:bg-forge-panel/40 transition-colors"
            title="Toggle explorer"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <rect x="0" y="1"   width="12" height="1.5" rx="0.75" fill="currentColor" />
              <rect x="0" y="5.25" width="12" height="1.5" rx="0.75" fill="currentColor" />
              <rect x="0" y="9.5" width="12" height="1.5" rx="0.75" fill="currentColor" />
            </svg>
          </button>
          <ForgeLogo />
          <span className="text-[10px] text-forge-chrome/55 tracking-widest uppercase forge-mono hidden sm:block">
            Forge
          </span>
        </div>

        {/* File tab */}
        <div className="flex-1 flex items-center h-full overflow-hidden">
          {activeFileName && (
            <div className="flex items-center gap-2 px-4 h-full border-r border-forge-border/30 bg-forge-black/25 text-xs forge-mono text-forge-chrome/65 flex-shrink-0">
              <span className="text-[8px]" style={{ color: getFileColor(fileExt) }}>●</span>
              <span>{activeFileName}</span>
              <button
                onClick={() => {
                  setActiveFilePath("");
                  setActiveFileName("");
                  setEditorContent("");
                }}
                className="text-forge-muted/30 hover:text-forge-chrome/60 ml-1 transition-colors text-[11px]"
                title="Close file"
              >
                ×
              </button>
            </div>
          )}
        </div>

        {/* Right: status + home */}
        <div className="flex items-center gap-3 px-3 flex-shrink-0">
          <div
            className="hidden md:flex items-center gap-1.5 px-2 py-0.5 rounded border border-forge-border/30 text-[10px] forge-mono"
            style={{ color: "rgba(45,142,255,0.45)" }}
          >
            <div className="w-1 h-1 rounded-full bg-forge-blue/40 animate-pulse" />
            mock mode
          </div>
          <div className="w-px h-3 bg-forge-border/40" />
          <Link
            href="/"
            className="text-[10px] text-forge-silver/30 hover:text-forge-chrome transition-colors forge-mono"
          >
            ← Home
          </Link>
        </div>
      </header>

      {/* ── MAIN BODY ───────────────────────────────────────────── */}
      <div className="flex flex-1 min-h-0 overflow-hidden">

        {/* LEFT: File Explorer */}
        <aside
          className={`
            flex flex-col border-r border-forge-border/40 bg-forge-obsidian/40 flex-shrink-0
            transition-all duration-200
            ${sidebarOpen ? "w-44" : "w-0 overflow-hidden border-r-0"}
          `}
        >
          <div className="flex items-center px-3 py-1.5 border-b border-forge-border/30">
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

        {/* CENTER: Code Editor */}
        <div className="flex flex-col flex-1 min-w-0 overflow-hidden border-r border-forge-border/30">

          {/* Editor meta bar */}
          <div className="flex items-center justify-between px-4 py-1 border-b border-forge-border/20 bg-forge-obsidian/20 flex-shrink-0">
            <div className="flex items-center gap-2 text-[10px] forge-mono text-forge-muted/30">
              <span>{activeFileName || "No file open"}</span>
              {activeFileName && (
                <>
                  <span>·</span>
                  <span>{lineCount} lines</span>
                </>
              )}
            </div>
            <div className="flex items-center gap-2 text-[10px] forge-mono text-forge-muted/20">
              {fileExt === "tsx" || fileExt === "ts" ? "TypeScript JSX" : fileExt.toUpperCase() || "Plain Text"}
              <span>·</span>
              UTF-8
            </div>
          </div>

          {/* Editor body */}
          {activeFileName ? (
            <div className="flex flex-1 min-h-0 overflow-hidden">
              {/* Line numbers */}
              <div
                ref={lineNumRef}
                className="w-10 flex-shrink-0 border-r border-forge-border/15 overflow-hidden"
                style={{ scrollbarWidth: "none" }}
              >
                <div className="py-3 select-none">
                  {Array.from({ length: lineCount }, (_, i) => (
                    <div
                      key={i}
                      className="text-right pr-3 text-[11px] text-forge-muted/20 forge-mono"
                      style={{ lineHeight: "1.55rem" }}
                    >
                      {i + 1}
                    </div>
                  ))}
                </div>
              </div>
              {/* Editable textarea */}
              <textarea
                ref={editorRef}
                value={editorContent}
                onChange={(e) => setEditorContent(e.target.value)}
                onScroll={handleEditorScroll}
                className="flex-1 bg-transparent text-forge-chrome text-[13px] forge-mono
                  outline-none resize-none px-4 py-3 overflow-auto"
                style={{ lineHeight: "1.55rem" }}
                spellCheck={false}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
              />
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-sm text-forge-muted/20 forge-mono">
                Select a file from the explorer
              </p>
            </div>
          )}
        </div>

        {/* RIGHT: Forge AI Panel */}
        <div className="flex flex-col w-72 flex-shrink-0 bg-forge-obsidian/30 overflow-hidden">

          {/* Panel header */}
          <div className="flex items-center gap-2 px-4 py-2.5 border-b border-forge-border/40 flex-shrink-0">
            <span className="text-xs font-semibold text-forge-chrome">◈ Forge AI</span>
          </div>

          {/* Mode icon tabs */}
          <div className="flex border-b border-forge-border/30 flex-shrink-0">
            {MODES.map((m) => (
              <button
                key={m.id}
                onClick={() => {
                  setActiveMode(m.id);
                  setAiOutput(null);
                }}
                title={m.label}
                className={`
                  flex-1 py-1.5 text-sm transition-colors
                  ${activeMode === m.id
                    ? "text-forge-blue border-b-[1.5px] border-forge-blue bg-forge-blue/5"
                    : "text-forge-muted/35 hover:text-forge-silver/60 border-b-[1.5px] border-transparent"}
                `}
              >
                {m.icon}
              </button>
            ))}
          </div>

          {/* Mode label */}
          <div className="px-4 py-2 border-b border-forge-border/20 flex-shrink-0">
            <span className="text-[10px] text-forge-blue/50 forge-mono uppercase tracking-widest">
              {mode.icon} {mode.label}
            </span>
            <p className="text-[10px] text-forge-muted/30 mt-0.5 leading-relaxed">
              {mode.description}
            </p>
          </div>

          {/* AI input */}
          <div className="px-3 py-3 border-b border-forge-border/20 flex-shrink-0">
            <textarea
              value={aiInput}
              onChange={(e) => setAiInput(e.target.value)}
              onKeyDown={handleAIKeyDown}
              placeholder={mode.placeholder}
              rows={4}
              className="w-full bg-forge-black/40 border border-forge-border/40 rounded
                text-xs text-forge-chrome forge-mono placeholder:text-forge-muted/25
                outline-none resize-none px-3 py-2 leading-relaxed
                focus:border-forge-blue/25 transition-colors"
            />
            <div className="flex gap-2 mt-2">
              {(aiInput || aiOutput) && (
                <button
                  onClick={() => {
                    setAiInput("");
                    setAiOutput(null);
                  }}
                  className="text-[10px] forge-mono px-2.5 py-1.5 border border-forge-border/40 rounded
                    text-forge-muted/40 hover:text-forge-silver/60 hover:border-forge-border/60 transition-colors"
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
                    ? "opacity-30 cursor-not-allowed text-forge-silver bg-forge-panel border border-forge-border/30"
                    : "forge-btn-primary text-white cursor-pointer"}
                `}
              >
                {isGenerating ? (
                  <>
                    <svg className="animate-spin" width="10" height="10" viewBox="0 0 12 12" fill="none">
                      <circle
                        cx="6" cy="6" r="5"
                        stroke="currentColor" strokeWidth="1.5"
                        strokeDasharray="16" strokeDashoffset="8"
                      />
                    </svg>
                    Forging...
                  </>
                ) : (
                  <>⚡ Forge Output</>
                )}
              </button>
            </div>
            <p className="text-[9px] text-forge-muted/18 forge-mono mt-1.5 text-right">
              ⌘↵ to generate
            </p>
          </div>

          {/* AI output */}
          <div className="flex-1 overflow-y-auto p-3">
            {isGenerating ? (
              <div className="flex flex-col items-center justify-center min-h-[80px] gap-3 pt-6">
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
              <div className="flex flex-col items-center justify-center min-h-[80px] gap-2 text-center pt-6">
                <span className="text-2xl text-forge-muted/12">{mode.icon}</span>
                <p className="text-[10px] text-forge-muted/25 forge-mono">No output yet</p>
                <p className="text-[9px] text-forge-muted/15 forge-mono leading-relaxed">
                  Type a prompt and click<br />⚡ Forge Output
                </p>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* ── TERMINAL ────────────────────────────────────────────── */}
      <div
        className={`
          border-t border-forge-border/40 bg-forge-black flex-shrink-0 overflow-hidden
          transition-all duration-200
          ${terminalOpen ? "h-[6.5rem]" : "h-7"}
        `}
      >
        {/* Terminal tab */}
        <div className="flex items-center justify-between px-3 h-7 border-b border-forge-border/30 bg-forge-obsidian/40">
          <div className="flex items-center">
            <button className="flex items-center gap-1.5 text-[10px] text-forge-chrome/55 forge-mono border-b border-forge-blue/40 pb-px">
              Terminal
            </button>
          </div>
          <button
            onClick={() => setTerminalOpen((o) => !o)}
            className="text-[10px] text-forge-muted/30 hover:text-forge-chrome transition-colors px-1 forge-mono"
            title={terminalOpen ? "Collapse terminal" : "Expand terminal"}
          >
            {terminalOpen ? "∨" : "∧"}
          </button>
        </div>
        {/* Terminal content */}
        {terminalOpen && (
          <div className="px-4 py-2 overflow-y-auto h-[calc(100%-1.75rem)]">
            <pre className="text-[11px] forge-mono leading-relaxed text-forge-muted/45 whitespace-pre select-text">
{`$ npm run dev

   ▲ Next.js 14.2.5

   - Local:        `}<span className="text-forge-blue/55">http://localhost:5642</span>{`
   - Environments: .env.local

 ✓ Starting...
 ✓ Ready in 1.2s`}
            </pre>
            <span className="text-[11px] forge-mono text-forge-muted/40">$ </span>
            <span className="inline-block w-1.5 h-[0.7rem] bg-forge-muted/25 animate-pulse align-middle ml-px" />
          </div>
        )}
      </div>

      {/* ── STATUS BAR ──────────────────────────────────────────── */}
      <div className="flex items-center justify-between px-4 h-6 border-t border-forge-border/40 bg-forge-black/80 flex-shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-1 h-1 rounded-full bg-green-500/60 animate-pulse" />
          <span className="text-[10px] forge-mono text-forge-muted/35">Forge</span>
          <span className="text-[10px] forge-mono text-forge-blue/20">·</span>
          <span className="text-[10px] forge-mono text-forge-muted/30">localhost:5642</span>
          <span className="text-[10px] forge-mono text-forge-blue/20">·</span>
          <span className="text-[10px] forge-mono text-forge-muted/25">mock mode</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] forge-mono text-forge-muted/25">{mode.label}</span>
          <span className="text-[10px] forge-mono text-forge-blue/15">·</span>
          <span className="text-[10px] forge-mono text-forge-muted/20">v0.1</span>
        </div>
      </div>

    </div>
  );
}
