export type ModeId = "plan" | "prompt" | "review" | "debug" | "checklist";

export interface Mode {
  id: ModeId;
  label: string;
  shortLabel: string;
  description: string;
}

export const MODES: Mode[] = [
  {
    id: "plan",
    label: "Plan",
    shortLabel: "Plan",
    description: "Turn an idea into a clean MVP blueprint.",
  },
  {
    id: "prompt",
    label: "Prompt",
    shortLabel: "Prompt",
    description: "Generate copy-paste prompts for any AI coding tool.",
  },
  {
    id: "review",
    label: "Review",
    shortLabel: "Review",
    description: "Paste code and get a full review with issues and fixes.",
  },
  {
    id: "debug",
    label: "Debug",
    shortLabel: "Debug",
    description: "Paste an error and get cause, fix steps, and verification.",
  },
  {
    id: "checklist",
    label: "Checklist",
    shortLabel: "Checklist",
    description: "Turn a product idea into day-one tasks and done criteria.",
  },
];

export function getModeById(id: ModeId): Mode {
  return MODES.find((m) => m.id === id) ?? MODES[0];
}
