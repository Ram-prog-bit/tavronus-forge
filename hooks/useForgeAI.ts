"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { ModeId } from "@/lib/modes";
import { ForgeArtifact, buildForgeArtifacts, analyzeEditorContent } from "@/lib/forgeArtifacts";

const GENERATE_DELAY = 900;
const SESSION_KEY = "tavronus-forge-session-v1";

// ── Forge Session ─────────────────────────────────────────────────────────────

export type ForgePhase =
  | "Idle" | "Planning" | "Prompting" | "Reviewing" | "Debugging" | "Shipping";

export type ForgeSession = {
  projectGoal: string;
  phase: ForgePhase;
  artifactsCreated: string[];
  currentFile: string;
  nextStep: string;
};

const PHASE_BY_MODE: Record<ModeId, ForgePhase> = {
  plan: "Planning",
  prompt: "Prompting",
  review: "Reviewing",
  debug: "Debugging",
  checklist: "Shipping",
};

const NEXT_STEP_BY_PHASE: Record<ForgePhase, string> = {
  Idle: "Generate a plan to start tracking this build",
  Planning: "Generate a Claude Code prompt",
  Prompting: "Copy prompt into Claude Code",
  Reviewing: "Fix the highest-impact issue",
  Debugging: "Apply fix and verify",
  Shipping: "Run build and final QA",
};

// Defensive validation for anything we read back out of localStorage.
function isValidSession(v: unknown): v is ForgeSession {
  if (!v || typeof v !== "object") return false;
  const s = v as Record<string, unknown>;
  return (
    typeof s.projectGoal === "string" &&
    typeof s.phase === "string" &&
    Array.isArray(s.artifactsCreated) &&
    s.artifactsCreated.every((a) => typeof a === "string") &&
    typeof s.currentFile === "string" &&
    typeof s.nextStep === "string"
  );
}

export function useForgeAI() {
  const [aiInput, setAiInput] = useState("");
  const [activeMode, setActiveModeState] = useState<ModeId>("review");
  const [aiOutput, setAiOutput] = useState<ForgeArtifact[] | null>(null);
  const [outputContext, setOutputContext] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Forge Session — persists across Clear and reloads; reset only intentionally.
  const [session, setSession] = useState<ForgeSession | null>(null);

  // Hydrate from localStorage once on mount (client only — no SSR mismatch).
  useEffect(() => {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (isValidSession(parsed)) setSession(parsed);
      }
    } catch {
      /* ignore corrupt / unavailable storage */
    }
  }, []);

  // Persist on change. The first run is skipped so the initial null can never
  // clobber a stored session before hydration applies.
  const firstPersist = useRef(true);
  useEffect(() => {
    if (firstPersist.current) {
      firstPersist.current = false;
      return;
    }
    try {
      if (session) localStorage.setItem(SESSION_KEY, JSON.stringify(session));
      else localStorage.removeItem(SESSION_KEY);
    } catch {
      /* ignore storage errors (quota / disabled) */
    }
  }, [session]);

  // Monotonic request id — bumping it invalidates any in-flight generation,
  // so a stale (delayed) result can never overwrite current state.
  const reqRef = useRef(0);
  const aiInputRef = useRef<HTMLTextAreaElement>(null);

  // Clear output only (used on tab/file/route changes). Cancels in-flight work.
  const resetOutput = useCallback(() => {
    reqRef.current++;
    setAiOutput(null);
    setOutputContext(null);
    setIsGenerating(false);
  }, []);

  // Clear button — wipes input + output and cancels in-flight work.
  const clearOutput = useCallback(() => {
    reqRef.current++;
    setAiInput("");
    setAiOutput(null);
    setOutputContext(null);
    setIsGenerating(false);
  }, []);

  // Switching modes cancels in-flight generation and clears stale output.
  const setActiveMode = useCallback((m: ModeId) => {
    reqRef.current++;
    setActiveModeState(m);
    setAiOutput(null);
    setOutputContext(null);
    setIsGenerating(false);
  }, []);

  const focusInput = useCallback(() => {
    requestAnimationFrame(() => aiInputRef.current?.focus());
  }, []);

  // Current File follows the active tab live (only when a session exists).
  const updateSessionFile = useCallback((file: string) => {
    setSession((prev) => (prev && prev.currentFile !== file ? { ...prev, currentFile: file } : prev));
  }, []);

  // Manual goal edit from the session card.
  const updateSessionGoal = useCallback((goal: string) => {
    setSession((prev) => (prev ? { ...prev, projectGoal: goal } : prev));
  }, []);

  const resetSession = useCallback(() => setSession(null), []);

  const generate = useCallback(
    async (context: string, editorContent: string) => {
      if (!aiInput.trim() || isGenerating) return;
      const reqId = ++reqRef.current;
      setIsGenerating(true);
      setAiOutput(null);
      setOutputContext(null);

      await new Promise((r) => setTimeout(r, GENERATE_DELAY));

      // Superseded by Clear / mode switch / tab switch / a newer generate?
      if (reqRef.current !== reqId) return;

      const analysis = analyzeEditorContent(editorContent);
      const artifacts = buildForgeArtifacts(activeMode, aiInput, context, editorContent);
      setAiOutput(artifacts);
      setOutputContext(
        analysis.hasContent
          ? `Context: ${context} · ${analysis.lineCount} lines · ${analysis.languageGuess} detected`
          : `Context: ${context}`
      );
      setIsGenerating(false);

      // Advance the Forge session from this successful generation.
      const phase = PHASE_BY_MODE[activeMode];
      const titles = artifacts.map((a) => a.title);
      const goal = aiInput.trim();
      setSession((prev) => ({
        // Keep the original goal — only the first generation (or a manual edit) sets it.
        projectGoal: prev?.projectGoal || goal,
        phase,
        artifactsCreated: Array.from(new Set([...(prev?.artifactsCreated ?? []), ...titles])),
        currentFile: context,
        nextStep: NEXT_STEP_BY_PHASE[phase],
      }));
    },
    [aiInput, isGenerating, activeMode]
  );

  return {
    aiInput,
    setAiInput,
    activeMode,
    setActiveMode,
    aiOutput,
    outputContext,
    isGenerating,
    generate,
    clearOutput,
    resetOutput,
    focusInput,
    aiInputRef,
    session,
    updateSessionFile,
    updateSessionGoal,
    resetSession,
  };
}
