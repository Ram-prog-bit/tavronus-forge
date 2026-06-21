"use client";

import { useState } from "react";
import BootScreen from "@/components/BootScreen";
import StartScreen from "@/components/StartScreen";

export default function Home() {
  const [booted, setBooted] = useState(false);

  return (
    <>
      {!booted && <BootScreen onComplete={() => setBooted(true)} />}
      <div
        style={{
          opacity: booted ? 1 : 0,
          transition: "opacity 0.45s ease",
          pointerEvents: booted ? "auto" : "none",
          height: "100vh",
        }}
      >
        <StartScreen />
      </div>
    </>
  );
}
