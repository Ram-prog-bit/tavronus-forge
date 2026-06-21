import { Suspense } from "react";
import WorkspaceShell from "@/components/WorkspaceShell";

export const metadata = {
  title: "Workspace — Tavronus Forge",
  description: "Tavronus Forge AI coding cockpit workspace.",
};

export default function WorkspacePage() {
  return (
    <Suspense>
      <WorkspaceShell />
    </Suspense>
  );
}
