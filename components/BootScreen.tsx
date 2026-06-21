"use client";

import { useEffect, useState } from "react";

interface BootScreenProps {
  onComplete: () => void;
}

const BOOT_MESSAGES = [
  "Initializing Forge Core...",
  "Calibrating prompt engine...",
  "Mounting workspace shell...",
  "Binding AI command layer...",
  "Forge ready.",
];

export default function BootScreen({ onComplete }: BootScreenProps) {
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const totalDuration = 1500;
    const steps = 60;
    const stepDuration = totalDuration / steps;

    let current = 0;
    const progressTimer = setInterval(() => {
      current += 1;
      setProgress(Math.min(current * (100 / steps), 100));

      if (current >= steps) {
        clearInterval(progressTimer);
        setTimeout(() => {
          setDone(true);
          setTimeout(onComplete, 400);
        }, 100);
      }
    }, stepDuration);

    const messageTimer = setInterval(() => {
      setMessageIndex((prev) => Math.min(prev + 1, BOOT_MESSAGES.length - 1));
    }, totalDuration / BOOT_MESSAGES.length);

    return () => {
      clearInterval(progressTimer);
      clearInterval(messageTimer);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-forge-black transition-opacity duration-400 ${
        done ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{ transition: "opacity 0.4s ease" }}
    >
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(45,142,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(45,142,255,0.5) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center gap-8 w-full max-w-sm px-8">
        {/* Logo mark */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 border border-forge-blue/40 flex items-center justify-center mb-1"
            style={{ boxShadow: "0 0 20px rgba(45,142,255,0.2)" }}>
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <polygon points="14,2 26,8 26,20 14,26 2,20 2,8" stroke="#2D8EFF" strokeWidth="1.5" fill="none" />
              <polygon points="14,7 21,11 21,18 14,22 7,18 7,11" stroke="#2D8EFF" strokeWidth="0.8" fill="rgba(45,142,255,0.05)" />
              <circle cx="14" cy="14" r="2" fill="#2D8EFF" />
            </svg>
          </div>

          <h1 className="text-2xl font-semibold tracking-widest text-forge-chrome forge-mono uppercase">
            TAVRONUS FORGE
          </h1>
          <p className="text-xs text-forge-silver tracking-[0.3em] forge-mono uppercase">
            by Tavronus Labs
          </p>
        </div>

        {/* Tagline */}
        <p className="text-sm text-forge-blue/80 tracking-[0.2em] forge-mono uppercase">
          Command your build.
        </p>

        {/* Progress bar */}
        <div className="w-full flex flex-col gap-2">
          <div className="w-full h-px bg-forge-border relative overflow-hidden">
            <div
              className="absolute left-0 top-0 h-full bg-forge-blue transition-all ease-linear"
              style={{
                width: `${progress}%`,
                boxShadow: "0 0 8px rgba(45,142,255,0.8)",
                transition: "width 25ms linear",
              }}
            />
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-forge-muted forge-mono">
              {BOOT_MESSAGES[messageIndex]}
            </span>
            <span className="text-xs text-forge-blue forge-mono tabular-nums">
              {Math.round(progress)}%
            </span>
          </div>
        </div>
      </div>

      {/* Bottom stamp */}
      <div className="absolute bottom-8 text-center">
        <p className="text-xs text-forge-muted/50 forge-mono tracking-widest uppercase">
          v0.1 · Local AI Coding Workspace
        </p>
      </div>
    </div>
  );
}
