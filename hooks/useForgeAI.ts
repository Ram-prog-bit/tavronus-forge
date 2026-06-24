"use client";

import { useState, useRef, useCallback } from "react";
import { ModeId } from "@/lib/modes";
import { ForgeArtifact, buildForgeArtifacts, analyzeEditorContent } from "@/lib/forgeArtifacts";

const GENERATE_DELAY = 900;

export function useForgeAI() {
  const [aiInput, setAiInput] = useState("");
  const [activeMode, setActiveModeState] = useState<ModeId>("review");
  const [aiOutput, setAiOutput] = useState<ForgeArtifact[] | null>(null);
  const [outputContext, setOutputContext] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

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
      setAiOutput(buildForgeArtifacts(activeMode, aiInput, context, editorContent));
      setOutputContext(
        analysis.hasContent
          ? `Context: ${context} · ${analysis.lineCount} lines · ${analysis.languageGuess} detected`
          : `Context: ${context}`
      );
      setIsGenerating(false);
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
  };
}
