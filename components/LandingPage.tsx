"use client";

import Link from "next/link";
import FakeIDEPreview from "./FakeIDEPreview";

const FEATURES = [
  {
    icon: "⬡",
    title: "Plan the build",
    desc: "Turn messy ideas into MVP architecture, features, file structures, and first steps.",
  },
  {
    icon: "◈",
    title: "Command the AI",
    desc: "Generate stronger prompts for Claude, Codex, Cursor, Replit, Bolt, and future Forge agents.",
  },
  {
    icon: "⚡",
    title: "Debug the code",
    desc: "Paste code or errors and get fixes, root-cause analysis, and verification steps.",
  },
];

const MODES = [
  { label: "Plan Mode", desc: "MVP architecture, features, file structure, first build steps." },
  { label: "Prompt Mode", desc: "Generate copy-paste prompts for any AI coding tool." },
  { label: "Code Review", desc: "Explanation, bug list, safer version, and testing steps." },
  { label: "Debug Mode", desc: "Error meaning, likely cause, fix steps, and verification." },
  { label: "Build Checklist", desc: "Day-one tasks, week-one MVP steps, and done criteria." },
];

export default function LandingPage() {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-forge-black text-forge-chrome">
      {/* Subtle grid bg */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(45,142,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(45,142,255,0.015) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* ─── NAV ─── */}
      <nav className="fixed top-0 left-0 right-0 z-40 border-b border-forge-border/50"
        style={{ background: "rgba(8,10,12,0.85)", backdropFilter: "blur(16px)" }}>
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 border border-forge-blue/40 flex items-center justify-center"
              style={{ boxShadow: "0 0 10px rgba(45,142,255,0.2)" }}>
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                <polygon points="7.5,1 14,4.5 14,10.5 7.5,14 1,10.5 1,4.5" stroke="#2D8EFF" strokeWidth="1.2" fill="none" />
                <circle cx="7.5" cy="7.5" r="2" fill="#2D8EFF" />
              </svg>
            </div>
            <div>
              <span className="text-sm font-semibold text-forge-chrome tracking-wider forge-mono">
                TAVRONUS FORGE
              </span>
              <span className="text-xs text-forge-muted/50 forge-mono ml-2 hidden sm:inline">
                by Tavronus Labs
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => scrollToSection("features")}
              className="hidden md:block px-3 py-1.5 text-sm text-forge-silver/60 hover:text-forge-chrome transition-colors forge-underline"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection("modes")}
              className="hidden md:block px-3 py-1.5 text-sm text-forge-silver/60 hover:text-forge-chrome transition-colors forge-underline"
            >
              Modes
            </button>
            <button
              onClick={() => scrollToSection("workflow")}
              className="hidden md:block px-3 py-1.5 text-sm text-forge-silver/60 hover:text-forge-chrome transition-colors forge-underline"
            >
              Workflow
            </button>
            <Link
              href="/workspace"
              className="ml-3 px-4 py-2 rounded text-sm font-medium forge-btn-primary text-white"
            >
              Enter the Forge
            </Link>
          </div>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto flex flex-col items-center text-center gap-6">
          {/* Badge */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-forge-blue/25 bg-forge-blue/5">
            <div className="w-1.5 h-1.5 rounded-full bg-forge-blue animate-pulse" />
            <span className="text-xs text-forge-blue/80 forge-mono tracking-wide">
              Tavronus Forge v0.1 · Local AI Coding Workspace
            </span>
          </div>

          {/* Headline */}
          <h1
            className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-forge-chrome leading-[1.05]"
            style={{
              textShadow: "0 0 40px rgba(45,142,255,0.15)",
            }}
          >
            Command your build.
          </h1>

          {/* Subheadline */}
          <p className="text-lg text-forge-silver/70 max-w-2xl leading-relaxed">
            Tavronus Forge is a simple AI coding cockpit for planning projects, generating
            prompts, reviewing code, debugging errors, and building software from one workspace.
          </p>

          {/* Tagline */}
          <p className="text-sm text-forge-blue/60 forge-mono tracking-[0.3em] uppercase">
            Plan. Prompt. Code. Ship.
          </p>

          {/* Honest mock status — parity with the in-app Local Mock labels */}
          <p className="text-xs text-forge-muted/55 forge-mono">
            Local mock today · no external AI is called yet · real AI planned (v0.2)
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 mt-2">
            <Link
              href="/workspace"
              className="forge-btn-primary text-white px-7 py-3 rounded text-sm font-semibold tracking-wide"
            >
              Enter the Forge →
            </Link>
            <button
              onClick={() => scrollToSection("preview")}
              className="px-6 py-3 rounded text-sm font-medium text-forge-silver/70 border border-forge-border/60
                hover:border-forge-blue/30 hover:text-forge-chrome transition-all"
            >
              View Workspace
            </button>
          </div>
        </div>
      </section>

      {/* ─── FAKE IDE PREVIEW ─── */}
      <section id="preview" className="px-6 pb-24">
        <div className="max-w-5xl mx-auto">
          <FakeIDEPreview />
        </div>
      </section>

      {/* ─── FEATURES ─── */}
      <section id="features" className="py-20 px-6 border-t border-forge-border/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs text-forge-blue/60 forge-mono uppercase tracking-widest mb-3">
              Core capabilities
            </p>
            <h2 className="text-3xl font-bold text-forge-chrome">
              One cockpit. Every build command.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="rounded-lg border border-forge-border/50 p-6 group hover:border-forge-blue/30 transition-all duration-300"
                style={{ background: "rgba(22,26,32,0.6)" }}
              >
                <div className="text-2xl mb-3 text-forge-blue/70">{f.icon}</div>
                <h3 className="text-base font-semibold text-forge-chrome mb-2">{f.title}</h3>
                <p className="text-sm text-forge-silver/60 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── MODES ─── */}
      <section id="modes" className="py-20 px-6 border-t border-forge-border/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs text-forge-blue/60 forge-mono uppercase tracking-widest mb-3">
              Command modes
            </p>
            <h2 className="text-3xl font-bold text-forge-chrome">Five modes. One workspace.</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {MODES.map((m, i) => (
              <Link
                key={m.label}
                href="/workspace"
                className="group rounded-lg border border-forge-border/50 p-5 hover:border-forge-blue/30
                  hover:bg-forge-blue/5 transition-all duration-200"
                style={{ background: "rgba(22,26,32,0.4)" }}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-sm font-semibold text-forge-chrome">{m.label}</h3>
                  <span className="text-xs forge-mono text-forge-blue/50 opacity-0 group-hover:opacity-100 transition-opacity">
                    →
                  </span>
                </div>
                <p className="text-xs text-forge-silver/50 leading-relaxed">{m.desc}</p>
              </Link>
            ))}
            {/* Placeholder for 6th cell */}
            <div
              className="rounded-lg border border-dashed border-forge-border/30 p-5 flex items-center justify-center"
              style={{ background: "rgba(13,15,18,0.3)" }}
            >
              <span className="text-xs text-forge-muted/30 forge-mono">More modes coming</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── WORKFLOW ─── */}
      <section id="workflow" className="py-20 px-6 border-t border-forge-border/30">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs text-forge-blue/60 forge-mono uppercase tracking-widest mb-3">
              Vision
            </p>
            <h2 className="text-3xl font-bold text-forge-chrome mb-4">
              From local MVP to coding cockpit.
            </h2>
            <p className="text-forge-silver/60 leading-relaxed">
              Forge v0.1 starts as a local browser workspace. The long-term vision is a
              Cursor/VS Code-style AI development assistant with file awareness, terminal
              workflows, AI code editing, and project memory.
            </p>
          </div>

          {/* Roadmap items */}
          <div className="flex flex-col gap-3">
            {[
              { v: "v0.1", label: "Local workspace shell + 5 command modes", active: true },
              { v: "v0.2", label: "Real AI integration (Claude API)", active: false },
              { v: "v0.3", label: "File awareness + project context", active: false },
              { v: "v1.0", label: "Full Cursor-style coding cockpit", active: false },
            ].map((item) => (
              <div
                key={item.v}
                className={`flex items-center gap-4 px-5 py-3.5 rounded-lg border transition-colors
                  ${
                    item.active
                      ? "border-forge-blue/30 bg-forge-blue/5"
                      : "border-forge-border/40 bg-forge-obsidian/30 opacity-50"
                  }`}
              >
                <span
                  className={`text-xs forge-mono font-semibold w-10 flex-shrink-0 ${
                    item.active ? "text-forge-blue" : "text-forge-muted"
                  }`}
                >
                  {item.v}
                </span>
                <div className={`w-px h-4 ${item.active ? "bg-forge-blue/40" : "bg-forge-border"}`} />
                <span className="text-sm text-forge-silver/70">{item.label}</span>
                {item.active && (
                  <div className="ml-auto flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500/70 animate-pulse" />
                    <span className="text-xs forge-mono text-green-500/60">Live</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Planned Forge Protocols — honest, non-functional roadmap nod.
              Clearly a future concept, never presented as a working feature. */}
          <div className="mt-4 rounded-lg border border-dashed border-forge-border/40 bg-forge-obsidian/30 px-5 py-4">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="forge-planned-tag text-[9px] forge-mono uppercase tracking-wider rounded px-1.5 py-0.5">
                Planned
              </span>
              <h3 className="text-sm font-semibold text-forge-chrome/85">Forge Protocols</h3>
            </div>
            <p className="text-xs text-forge-silver/55 leading-relaxed">
              A future workflow layer on top of the cockpit — structured passes for UI polish,
              checks, audits, and ship. A concept we&apos;re exploring, not active in Local Mock today.
            </p>
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="py-24 px-6 border-t border-forge-border/30">
        <div className="max-w-2xl mx-auto text-center flex flex-col gap-5 items-center">
          <h2 className="text-4xl font-bold text-forge-chrome">
            Start from one command.
          </h2>
          <p className="text-forge-silver/50 text-sm">
            Plan, prompt, review, debug, and ship — all from one workspace.
          </p>
          <Link
            href="/workspace"
            className="forge-btn-primary text-white px-8 py-3.5 rounded text-sm font-semibold tracking-wide"
          >
            Enter the Forge →
          </Link>
          <p className="text-xs forge-mono text-forge-muted/40">
            Runs locally at{" "}
            <span className="text-forge-blue/50">http://localhost:5642</span>
          </p>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="border-t border-forge-border/30 px-6 py-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-forge-muted/40 forge-mono">
            © 2025 Tavronus Labs · Tavronus Forge v0.1
          </p>
          <p className="text-xs text-forge-muted/30 forge-mono">
            Plan. Prompt. Code. Ship.
          </p>
        </div>
      </footer>
    </div>
  );
}
