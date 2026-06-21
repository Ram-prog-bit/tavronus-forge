"use client";

import { useState } from "react";
import BootScreen from "@/components/BootScreen";
import LandingPage from "@/components/LandingPage";

export default function Home() {
  const [booted, setBooted] = useState(false);

  return (
    <>
      {!booted && <BootScreen onComplete={() => setBooted(true)} />}
      <div
        style={{
          opacity: booted ? 1 : 0,
          transition: "opacity 0.5s ease",
          pointerEvents: booted ? "auto" : "none",
        }}
      >
        <LandingPage />
      </div>
    </>
  );
}
