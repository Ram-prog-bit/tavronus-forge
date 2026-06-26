# Tavronus Forge — Product Brief

## One-sentence definition

Tavronus Forge is a local, IDE-like **AI coding cockpit** where a developer
plans a build, generates copy-ready prompts, reviews and debugs code, and tracks
build artifacts — today entirely from honest local/mock templates, designed so a
real AI provider can be added later without changing the workflow.

## Target user

A **builder-developer** who already uses AI coding tools (Claude Code, Cursor,
GPT) and wants a single, calm, premium workspace to:

- turn a rough idea into a structured plan,
- produce strong, paste-ready prompts for whichever AI tool they use,
- get a quick review / debug pass on a file they're working on,
- and keep the resulting artifacts organized.

Secondary: a developer evaluating "what a serious local AI cockpit could feel
like" before any model is wired in.

## Problem being solved

AI-assisted development today is scattered: prompts live in chat windows, plans
live in notes, reviews live in throwaway threads, and none of it is anchored to
the file you're actually editing. Forge collapses that into one **editor-aware**
surface — the assistant always knows which file/context you're on, and its
output is structured to be copied straight into your real tools.

Crucially, it solves this **honestly**: instead of faking intelligence, the MVP
proves the *workflow and surface* with deterministic templates, and labels its
mock nature plainly.

## Core loop

1. **Open the workspace** — start screen → New File / Open Workspace / Open Mock Project.
2. **Open or create a file** — tabs + the localStorage VFS hold your content.
3. **Choose a Forge AI mode** — Plan · Prompt · Review · Debug · Checklist.
4. **Generate an artifact** — write a command, Forge Output produces structured cards
   that read the current editor text (editor-aware, deterministic).
5. **Copy / apply / use the output** — copy the whole card or just the snippet/prompt,
   or open ApplyPreview to mock-patch the open tab.
6. **Save the mock file or keep building** — Ctrl/Cmd+S persists to localStorage; loop again.

## Product principles

- **Local-first** — everything runs in the browser; no account, no server round-trip,
  no data leaves the machine.
- **Honest mock mode** — never imply real AI, real saves, or real execution. The
  "Local Mock" badge and "mock file" language are deliberate product stances, not
  placeholders to hide.
- **AI cockpit, not chatbot** — modes are *tools loaded into a workspace*, output is
  *structured artifacts*, not a scrolling chat transcript.
- **Developer density** — compact, information-rich, monospace-forward. Respect the
  user's screen and attention; no oversized marketing chrome inside the tool.
- **Premium dark IDE feel** — obsidian/gunmetal surfaces, chrome text, a single
  electric-blue accent. Restrained, serious, never neon.
- **Copy-ready artifacts** — every output is built to leave the app cleanly: framed
  snippets, dedicated copy buttons, prompts that wrap and paste without cleanup.

## Brand language

- **Tavronus AI / Tavronus Labs** — the maker / umbrella.
- **Tavronus Forge** — this product.
- **Plan. Prompt. Code. Ship.** — the tagline and the shape of the core loop.
- Voice: precise, calm, technical, confident. No hype, no hacker cosplay.

## What the MVP proves

- The **workflow** is coherent: plan → prompt → review/debug → artifact → copy/apply
  is a loop a developer can actually run.
- The **surface** is credible: it looks and feels like a serious IDE/AI cockpit,
  polished across eight UI passes (contrast, depth, micro-interactions, panel,
  artifact, and keyboard ergonomics).
- The **editor-aware context** model works: output reflects the file you're on and
  is scoped (File vs Workspace) so it's clear what each artifact is about.
- The product can be **honest about being mock** and still feel premium — proving the
  identity doesn't depend on faking intelligence.

## What it does not prove yet

- That the **generated content** is *useful* — it's templated, not reasoned; only a
  real model (or a real user-testing pass) can validate quality.
- That there's **demand / retention** — no user testing has been run.
- That a **real AI integration** is worth the cost/complexity — that's a Phase 1
  decision, not an assumption.
- That **real file/project workflows** (import, write, diff, rollback) hold up — those
  are mocked today and unproven.
