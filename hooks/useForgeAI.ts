"use client";

import { useState, useRef, useCallback } from "react";
import { ModeId } from "@/lib/modes";
import { ForgeArtifact, buildForgeArtifacts, analyzeEditorContent } from "@/lib/forgeArtifacts";

const GENERATE_DELAY = 900;

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

export function useForgeAI() {
  const [aiInput, setAiInput] = useState("");
  const [activeMode, setActiveModeState] = useState<ModeId>("review");
  const [aiOutput, setAiOutput] = useState<ForgeArtifact[] | null>(null);
  const [outputContext, setOutputContext] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Forge Session — persists across Clear; reset only intentionally.
  const [session, setSession] = useState<ForgeSession | null>(null);

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
        projectGoal: goal || prev?.projectGoal || "",
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
    resetSession,
  };
}
