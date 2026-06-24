import { ModeId } from "./modes";

export type ForgeArtifact = {
  title: string;
  label: string;
  body: string[];
  code?: string;
};

// Trim a user prompt down to a short, reusable subject line.
function summarize(prompt: string): string {
  const t = prompt.trim().replace(/\s+/g, " ");
  if (!t) return "your idea";
  return t.length > 90 ? `${t.slice(0, 87)}…` : t;
}

// ── Mode builders ─────────────────────────────────────────────────────────────

function planArtifacts(idea: string, context: string): ForgeArtifact[] {
  return [
    {
      title: "Blueprint",
      label: "Concept",
      body: [
        `Product: ${idea}`,
        "Primary user goal: ship a focused first version that proves the core loop.",
        "MVP scope: one main screen, mock data, and the single most important action.",
        `Working context: ${context}`,
      ],
    },
    {
      title: "File Structure",
      label: "Scaffold",
      body: ["Suggested starting structure:"],
      code: [
        "app/",
        "  layout.tsx",
        "  page.tsx",
        "components/",
        "  ui/",
        "lib/",
        "  data.ts",
        "types/",
        "  index.ts",
        "README.md",
      ].join("\n"),
    },
    {
      title: "Build Steps",
      label: "Roadmap",
      body: [
        "1. Scaffold the Next.js app with TypeScript and Tailwind.",
        "2. Define the core data types in types/index.ts.",
        "3. Build the main screen with mock data from lib/data.ts.",
        "4. Wire the primary action (create / update / submit).",
        "5. Add empty, loading, and error states.",
        "6. Polish layout, spacing, and responsive behavior.",
        "7. Write a short README and deploy to Vercel.",
      ],
    },
    {
      title: "Avoid For Now",
      label: "Scope guard",
      body: [
        "Auth — start with a single local/mock user.",
        "Payments — defer until the core loop is proven.",
        "Database — use mock state or local storage first.",
        "Real AI API — mock the responses in v1.",
        "Skip these unless your prompt specifically requires them.",
      ],
    },
  ];
}

function promptArtifacts(idea: string, context: string): ForgeArtifact[] {
  return [
    {
      title: "Claude Code Prompt",
      label: "Claude Code",
      body: ["Strongest, most detailed prompt — paste into Claude Code:"],
      code: [
        `You are building: ${idea}.`,
        `Context: ${context}.`,
        "",
        "Stack: Next.js (App Router) + TypeScript + Tailwind CSS. Local mock state only —",
        "no auth, database, or external APIs yet.",
        "",
        "Do this:",
        "1. Define the core TypeScript types first.",
        "2. Build the main screen with realistic mock data.",
        "3. Implement the single most important user action end to end.",
        "4. Add empty, loading, and error states.",
        "5. Keep components small and typed; explain each step briefly.",
        "",
        "Ask clarifying questions before assuming the data shape.",
      ].join("\n"),
    },
    {
      title: "GPT Prompt",
      label: "GPT",
      body: ["Use GPT to reason through architecture and trade-offs:"],
      code: [
        `I'm designing: ${idea}.`,
        "Walk me through the architecture for a Next.js + TypeScript MVP.",
        "Cover: data model, component breakdown, state management, and the",
        "riskiest part to get wrong. Give pros/cons, then recommend one path.",
      ].join("\n"),
    },
    {
      title: "Cursor Prompt",
      label: "Cursor",
      body: ["Inline, surgical edit prompt for Cursor:"],
      code: [
        `In ${context}, implement the core UI for: ${idea}.`,
        "Edit only the relevant component. Keep the existing style and imports.",
        "Use typed props, no new dependencies, and mock data where needed.",
      ].join("\n"),
    },
    {
      title: "Testing Prompt",
      label: "QA",
      body: ["Prompt to validate the feature after building:"],
      code: [
        `Act as a QA tester for: ${idea}.`,
        "List the manual test steps, edge cases, and empty/error states to verify.",
        "Then give a short pass/fail checklist I can run in the browser.",
      ].join("\n"),
    },
  ];
}

function reviewArtifacts(idea: string, context: string): ForgeArtifact[] {
  return [
    {
      title: "Strengths",
      label: "What works",
      body: [
        `Clear intent: ${idea}.`,
        `Review target: ${context}.`,
        "Scope is contained enough to ship a focused first version.",
        "Uses a familiar, well-supported stack (Next.js + TypeScript).",
      ],
    },
    {
      title: "Issues Found",
      label: "Risks",
      body: [
        "Edge cases (empty, loading, error) may not be handled yet.",
        "Types could be loose — verify props and data shapes are explicit.",
        "Accessibility: check focus states, labels, and keyboard support.",
        "No tests or manual QA pass documented yet.",
      ],
    },
    {
      title: "Suggested Improvements",
      label: "Fixes",
      body: [
        "Add explicit TypeScript types for all data and props.",
        "Render empty and error states, not just the happy path.",
        "Extract repeated UI into small, reusable components.",
        "Add a short README describing how to run and test it.",
      ],
    },
    {
      title: "Testing Checklist",
      label: "Manual QA",
      body: [
        "Load the main screen — confirm it renders with mock data.",
        "Trigger the primary action and confirm state updates.",
        "Test the empty state with no data.",
        "Resize to mobile width and check layout.",
        "Confirm no console errors on the happy path.",
      ],
    },
  ];
}

function debugArtifacts(idea: string, context: string): ForgeArtifact[] {
  return [
    {
      title: "Likely Cause",
      label: "Diagnosis",
      body: [
        `Reported issue: ${idea}.`,
        `Most likely area: ${context}.`,
        "Common roots: undefined data at render, a missing await, or a",
        "client/server boundary mismatch (e.g. a hook used without a wrapper).",
      ],
    },
    {
      title: "Fix Plan",
      label: "Strategy",
      body: [
        "1. Reproduce the error and read the full stack trace.",
        "2. Isolate the smallest component that triggers it.",
        "3. Add a guard for undefined/null before the failing line.",
        "4. Confirm client/server directives ('use client', Suspense) are correct.",
        "5. Apply the fix and re-run the build.",
      ],
    },
    {
      title: "Code Areas To Inspect",
      label: "Targets",
      body: [
        `Start in: ${context}.`,
        "The component that renders the failing data.",
        "Any data-fetching or hook calls near the error line.",
        "Layout / page wrappers (Suspense, providers, 'use client').",
      ],
    },
    {
      title: "Verify",
      label: "Confirm",
      body: [
        "Re-run the dev server and reload the page — error is gone.",
        "Run a production build to confirm it compiles.",
        "Test the original failing flow plus one edge case.",
        "Check the console for warnings introduced by the fix.",
      ],
    },
  ];
}

function checklistArtifacts(idea: string, context: string): ForgeArtifact[] {
  return [
    {
      title: "Today",
      label: "Now",
      body: [
        `Define the core data model for: ${idea}.`,
        "Scaffold the main screen with mock data.",
        "Wire the single most important action.",
        `Working in: ${context}.`,
      ],
    },
    {
      title: "This Week",
      label: "Sprint",
      body: [
        "Add empty, loading, and error states.",
        "Polish layout, spacing, and responsiveness.",
        "Extract reusable components and tighten types.",
        "Write a short README and deploy a preview.",
      ],
    },
    {
      title: "Ship Criteria",
      label: "Definition of done",
      body: [
        "Core loop works end to end with mock data.",
        "No console errors on the happy path.",
        "Works at mobile and desktop widths.",
        "Deployed and reachable at a live URL.",
      ],
    },
    {
      title: "Done Log",
      label: "Status",
      body: [
        "✓ Idea captured and scoped.",
        "✓ Build plan drafted.",
        "☐ Main screen implemented.",
        "☐ Primary action wired.",
        "☐ Deployed to production.",
      ],
    },
  ];
}

// ── Entry point ───────────────────────────────────────────────────────────────

export function buildForgeArtifacts(
  mode: ModeId,
  prompt: string,
  context: string
): ForgeArtifact[] {
  const idea = summarize(prompt);
  switch (mode) {
    case "plan":
      return planArtifacts(idea, context);
    case "prompt":
      return promptArtifacts(idea, context);
    case "review":
      return reviewArtifacts(idea, context);
    case "debug":
      return debugArtifacts(idea, context);
    case "checklist":
      return checklistArtifacts(idea, context);
    default:
      return [];
  }
}
