"use client";

const FILE_TREE = [
  { name: "tavronus-forge/", depth: 0, isDir: true },
  { name: "app/", depth: 1, isDir: true },
  { name: "components/", depth: 1, isDir: true },
  { name: "lib/", depth: 1, isDir: true },
  { name: "prompts.ts", depth: 1, isDir: false },
  { name: "workspace.tsx", depth: 1, isDir: false },
];

const CODE_LINES = [
  { tokens: [{ text: "export default", cls: "text-[#569CD6]" }, { text: " function ", cls: "text-forge-chrome" }, { text: "ForgeWorkspace", cls: "text-[#DCDCAA]" }, { text: "() {", cls: "text-forge-chrome" }] },
  { tokens: [{ text: "  return ", cls: "text-[#569CD6]" }, { text: "(", cls: "text-forge-chrome" }] },
  { tokens: [{ text: "    <", cls: "text-forge-silver" }, { text: "CommandCenter", cls: "text-[#4EC9B0]" }, { text: " mode=", cls: "text-forge-chrome" }, { text: '"Plan"', cls: "text-[#CE9178]" }, { text: " />", cls: "text-forge-silver" }] },
  { tokens: [{ text: "  )", cls: "text-forge-chrome" }] },
  { tokens: [{ text: "}", cls: "text-forge-chrome" }] },
  { tokens: [] },
  { tokens: [{ text: "// Forge v0.1 — Command your build.", cls: "text-forge-muted" }] },
];

const AI_SUGGESTIONS = [
  "Generate MVP blueprint",
  "Create Claude prompt",
  "Review selected code",
  "Debug terminal error",
];

export default function FakeIDEPreview() {
  return (
    <div
      className="w-full rounded-lg overflow-hidden border border-forge-border/60"
      style={{
        background: "#0D0F12",
        boxShadow: "0 0 40px rgba(45,142,255,0.08), 0 24px 64px rgba(0,0,0,0.6)",
      }}
    >
      {/* Window chrome */}
      <div className="flex items-center gap-2 px-4 h-9 border-b border-forge-border/60 bg-forge-gunmetal/60">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]/70" />
        </div>
        <div className="flex-1 flex justify-center">
          <span className="text-xs text-forge-muted forge-mono">
            workspace.tsx — Tavronus Forge
          </span>
        </div>
      </div>

      {/* IDE body */}
      <div className="flex h-[340px] md:h-[380px]">
        {/* File explorer */}
        <div className="w-[160px] border-r border-forge-border/40 bg-forge-obsidian/80 flex-shrink-0 overflow-hidden">
          <div className="px-3 py-2 border-b border-forge-border/30">
            <span className="text-xs text-forge-muted tracking-widest uppercase forge-mono">Explorer</span>
          </div>
          <div className="px-1 py-1">
            {FILE_TREE.map((f, i) => (
              <div
                key={i}
                className="flex items-center gap-1.5 px-2 py-[3px] rounded-sm hover:bg-forge-panel/40 cursor-default"
                style={{ paddingLeft: `${8 + f.depth * 12}px` }}
              >
                <span className="text-xs forge-mono" style={{ color: f.isDir ? "#E8C07D" : "#8A95A3" }}>
                  {f.isDir ? (
                    <span className="text-forge-muted/70 mr-0.5">▾</span>
                  ) : (
                    <span className="text-forge-blue/50 mr-0.5">·</span>
                  )}
                  {f.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Main editor + right panel */}
        <div className="flex flex-col flex-1 min-w-0">
          {/* Tab bar */}
          <div className="flex items-center border-b border-forge-border/40 bg-forge-gunmetal/40 h-8">
            <div className="flex items-center gap-2 px-3 h-full border-r border-forge-blue/30 bg-forge-panel/60">
              <span className="text-xs forge-mono text-forge-chrome">workspace.tsx</span>
            </div>
            <div className="flex items-center gap-2 px-3 h-full opacity-50">
              <span className="text-xs forge-mono text-forge-silver">prompts.ts</span>
            </div>
          </div>

          <div className="flex flex-1 min-h-0">
            {/* Code editor */}
            <div className="flex-1 overflow-hidden relative">
              {/* Line numbers + code */}
              <div className="p-3 font-mono text-xs leading-relaxed h-full">
                {CODE_LINES.map((line, i) => (
                  <div key={i} className="flex gap-4">
                    <span className="text-forge-muted/40 select-none w-4 text-right flex-shrink-0">
                      {i + 1}
                    </span>
                    <span>
                      {line.tokens.map((t, j) => (
                        <span key={j} className={t.cls}>
                          {t.text}
                        </span>
                      ))}
                    </span>
                  </div>
                ))}
                {/* Cursor blink */}
                <div className="flex gap-4 mt-0.5">
                  <span className="text-forge-muted/40 select-none w-4 text-right flex-shrink-0">8</span>
                  <span className="inline-block w-[6px] h-[13px] bg-forge-blue/80 animate-pulse" />
                </div>
              </div>

              {/* Command bar overlay at bottom */}
              <div className="absolute bottom-3 left-3 right-3">
                <div
                  className="flex items-center gap-2 px-3 py-1.5 rounded border border-forge-blue/30"
                  style={{ background: "rgba(45,142,255,0.06)" }}
                >
                  <span className="text-forge-blue/70 text-xs">⌘</span>
                  <span className="text-xs text-forge-silver/60 forge-mono">What are we building?</span>
                  <span className="ml-auto text-xs text-forge-muted/50 forge-mono">Forge</span>
                </div>
              </div>
            </div>

            {/* Right AI panel */}
            <div className="w-[160px] border-l border-forge-border/40 bg-forge-obsidian/60 flex-shrink-0 hidden md:flex flex-col">
              <div className="px-3 py-2 border-b border-forge-border/30">
                <span className="text-xs text-forge-muted tracking-widest uppercase forge-mono">
                  Forge AI
                </span>
              </div>
              <div className="p-2 flex flex-col gap-1.5">
                <p className="text-xs text-forge-muted/70 px-1 pb-1">Detected:</p>
                {AI_SUGGESTIONS.map((s, i) => (
                  <div
                    key={i}
                    className="px-2 py-1.5 rounded-sm border border-forge-border/40 bg-forge-panel/30 cursor-default hover:border-forge-blue/30 hover:bg-forge-blue/5 transition-colors"
                  >
                    <span className="text-xs text-forge-silver forge-mono leading-tight">{s}</span>
                  </div>
                ))}
                <div className="mt-2 grid grid-cols-2 gap-1">
                  {["Plan", "Prompt", "Code", "Debug"].map((m) => (
                    <div
                      key={m}
                      className="px-1.5 py-1 rounded-sm text-center border border-forge-blue/20 bg-forge-blue/5"
                    >
                      <span className="text-xs text-forge-blue/70 forge-mono">{m}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Terminal */}
          <div className="border-t border-forge-border/40 bg-forge-black/80 px-4 py-2 h-14 flex-shrink-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs text-forge-muted/50 forge-mono uppercase tracking-widest">Terminal</span>
              <span className="w-1.5 h-1.5 rounded-full bg-green-500/60 animate-pulse" />
            </div>
            <div className="forge-mono text-xs">
              <span className="text-forge-blue/60">$ </span>
              <span className="text-forge-silver/60">npm run dev</span>
              <span className="text-forge-muted/40 ml-3">
                ready · started server on{" "}
                <span className="text-forge-blue/50">http://localhost:5642</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
