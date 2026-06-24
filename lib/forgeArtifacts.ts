import { ModeId } from "./modes";

export type ForgeArtifact = {
  title: string;
  label: string;
  body: string[];
  code?: string;
};

export type EditorAnalysis = {
  hasContent: boolean;
  lineCount: number;
  languageGuess: string;
  patterns: string[];
  warnings: string[];
  summary: string;
};

// ── Lightweight editor analysis (keyword / regex, NOT a real parser) ──────────

export function analyzeEditorContent(content: string): EditorAnalysis {
  const text = content ?? "";
  if (!text.trim()) {
    return {
      hasContent: false,
      lineCount: 0,
      languageGuess: "",
      patterns: [],
      warnings: [],
      summary: "",
    };
  }

  const lineCount = text.split("\n").length;
  const has = (re: RegExp) => re.test(text);

  const isReact = has(/from\s+["']react["']/) || has(/\breturn\s*\(/) || has(/<[A-Za-z][\w-]*[\s/>]/);
  const isJSX = has(/<[A-Za-z][^>]*>/);
  const isTS =
    has(/\binterface\s+\w+/) ||
    has(/\btype\s+\w+\s*=/) ||
    has(/:\s*(string|number|boolean|any|void|React\.)/);
  const isPython = has(/^\s*def\s+\w+\s*\(/m) || has(/^\s*class\s+\w+/m);

  const patterns: string[] = [];
  if (isReact) patterns.push("React component");
  if (isJSX) patterns.push("JSX / UI markup");
  if (isTS) patterns.push("TypeScript");
  if (has(/\buseState\b/)) patterns.push("useState (local state)");
  if (has(/\buseEffect\b/)) patterns.push("useEffect (side effects)");
  if (has(/\buseSearchParams\b/)) patterns.push("useSearchParams (Next.js routing)");
  if (has(/\buseRouter\b/)) patterns.push("useRouter (navigation)");
  if (has(/\b(useRef|useCallback|useMemo)\b/)) patterns.push("memo/ref hooks");
  if (has(/\b(fetch|axios)\b/) || has(/\basync\b/) || has(/\bawait\b/)) patterns.push("async / data fetching");
  if (has(/\.map\s*\(/)) patterns.push("list rendering (.map)");
  if (has(/try\s*\{/)) patterns.push("try/catch error handling");
  if (has(/\b(isLoading|loading|error)\b/i)) patterns.push("loading / error states");
  if (has(/className=/)) patterns.push("Tailwind / CSS classes");
  if (isPython) patterns.push("Python def/class");

  const warnings: string[] = [];
  if (has(/console\.log/)) warnings.push("console.log debug statements present");
  if (has(/TODO|FIXME/)) warnings.push("TODO/FIXME comments present");
  if (isTS && has(/:\s*any\b/)) warnings.push("'any' types reduce type safety");

  let languageGuess = "code";
  if (isReact || isJSX) languageGuess = isTS ? "React / TypeScript" : "React / JSX";
  else if (isTS) languageGuess = "TypeScript";
  else if (isPython) languageGuess = "Python";

  const summary =
    `${languageGuess} · ${lineCount} lines` +
    (patterns.length ? ` · ${patterns.slice(0, 3).join(", ")}` : "");

  return { hasContent: true, lineCount, languageGuess, patterns, warnings, summary };
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function summarize(prompt: string): string {
  const t = prompt.trim().replace(/\s+/g, " ");
  if (!t) return "your idea";
  return t.length > 90 ? `${t.slice(0, 87)}…` : t;
}

const hasPat = (a: EditorAnalysis, p: string) => a.patterns.includes(p);
const hasWarn = (a: EditorAnalysis, frag: string) => a.warnings.some((w) => w.includes(frag));

// ── Plan ──────────────────────────────────────────────────────────────────────

function planArtifacts(idea: string, context: string, a: EditorAnalysis): ForgeArtifact[] {
  const blueprint = [
    `Product: ${idea}`,
    "Primary user goal: ship a focused first version that proves the core loop.",
    "MVP scope: one main screen, mock data, and the single most important action.",
  ];
  blueprint.push(
    a.hasContent
      ? `Current workspace context: ${context}, ${a.lineCount} lines, detected ${a.languageGuess}.`
      : `Working context: ${context}`
  );

  return [
    { title: "Blueprint", label: "Concept", body: blueprint },
    {
      title: "File Structure",
      label: "Scaffold",
      body: ["Suggested starting structure:"],
      code: ["app/", "  layout.tsx", "  page.tsx", "components/", "  ui/", "lib/", "  data.ts", "types/", "  index.ts", "README.md"].join("\n"),
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

// ── Prompt ────────────────────────────────────────────────────────────────────

function promptArtifacts(idea: string, context: string, a: EditorAnalysis): ForgeArtifact[] {
  const ctxLine = a.hasContent
    ? `Active file: ${context} (${a.languageGuess}, ${a.lineCount} lines).`
    : `No file is open — treat this as a fresh workspace (${context}).`;
  const detected = a.hasContent && a.patterns.length ? `Detected in the file: ${a.patterns.join(", ")}.` : "";

  return [
    {
      title: "Claude Code Prompt",
      label: "Claude Code",
      body: ["Strongest, most detailed prompt — paste into Claude Code:"],
      code: [
        `You are working on: ${idea}.`,
        ctxLine,
        detected,
        "",
        "Stack: Next.js (App Router) + TypeScript + Tailwind CSS. Local mock state only.",
        "",
        "Before editing:",
        `1. Open and read ${context} first.`,
        "2. Preserve the existing behavior, imports, and styling.",
        "3. Keep components small and strongly typed.",
        "",
        "Then implement the change, add empty/loading/error states, and",
        "explain each step briefly. Ask before assuming the data shape.",
      ].filter(Boolean).join("\n"),
    },
    {
      title: "GPT Prompt",
      label: "GPT",
      body: ["Use GPT to reason through architecture and trade-offs:"],
      code: [
        `I'm working on: ${idea}.`,
        ctxLine,
        "Walk me through the architecture and the riskiest part to get wrong.",
        "Give pros/cons, then recommend one path. Preserve current behavior.",
      ].filter(Boolean).join("\n"),
    },
    {
      title: "Cursor Prompt",
      label: "Cursor",
      body: ["Inline, surgical edit prompt for Cursor:"],
      code: [
        `In ${context}, implement: ${idea}.`,
        "Inspect the file first. Edit only the relevant section and keep the",
        "existing style, imports, and types. No new dependencies.",
      ].join("\n"),
    },
    {
      title: "Testing Prompt",
      label: "QA",
      body: ["Prompt to validate the feature after building:"],
      code: [
        `Act as a QA tester for: ${idea}.`,
        a.hasContent ? `Focus on ${context} and the behavior it drives.` : "",
        "List manual test steps, edge cases, and empty/error states, then a",
        "short pass/fail checklist I can run in the browser.",
      ].filter(Boolean).join("\n"),
    },
  ];
}

// ── Review ────────────────────────────────────────────────────────────────────

function reviewArtifacts(idea: string, context: string, a: EditorAnalysis): ForgeArtifact[] {
  // Strengths
  const strengths: string[] = [];
  if (a.hasContent) {
    strengths.push(`Review target: ${context} (${a.lineCount} lines, ${a.languageGuess}).`);
    if (hasPat(a, "React component")) strengths.push("Componentized React structure is easy to extend.");
    if (hasPat(a, "TypeScript")) strengths.push("TypeScript adds type safety to props and state.");
    if (hasPat(a, "useState (local state)") || hasPat(a, "useEffect (side effects)"))
      strengths.push("Uses hooks to manage state and side effects.");
    if (hasPat(a, "Tailwind / CSS classes")) strengths.push("Tailwind utility classes keep styling co-located.");
    if (hasPat(a, "list rendering (.map)")) strengths.push("Renders lists declaratively with .map.");
    if (hasPat(a, "try/catch error handling")) strengths.push("Includes try/catch error handling.");
    if (strengths.length === 1) strengths.push("Code is small and focused enough to reason about quickly.");
  } else {
    strengths.push(`Clear intent: ${idea}.`, `Workspace context — no file open to inspect.`, "Scope is contained enough to ship a focused first version.", "Uses a familiar, well-supported stack.");
  }

  // Issues
  const issues: string[] = [];
  if (a.hasContent) {
    a.warnings.forEach((w) => issues.push(`${w}.`));
    if (hasPat(a, "useSearchParams (Next.js routing)"))
      issues.push("Confirm this component is client-rendered or wrapped in <Suspense> where needed.");
    if (hasPat(a, "useEffect (side effects)"))
      issues.push("Check useEffect dependency arrays to avoid stale values or extra runs.");
    if (hasPat(a, "async / data fetching"))
      issues.push("Ensure async calls handle loading and error states.");
    if (!hasPat(a, "loading / error states"))
      issues.push("Empty / loading / error states may be missing.");
    if (!issues.length) issues.push("No obvious red flags — verify edge cases manually.");
  } else {
    issues.push("Edge cases (empty, loading, error) may not be handled yet.", "Types could be loose — verify props and data shapes.", "No tests or manual QA pass documented yet.");
  }

  // Improvements
  const improvements: string[] = [];
  if (a.hasContent) {
    if (hasWarn(a, "console.log")) improvements.push("Remove console.log debug statements before production.");
    if (hasWarn(a, "TODO")) improvements.push("Resolve TODO/FIXME comments before shipping.");
    if (hasWarn(a, "'any'")) improvements.push("Replace 'any' with explicit types.");
    if (!hasPat(a, "loading / error states")) improvements.push("Add explicit empty, loading, and error states.");
    if (hasPat(a, "React component")) improvements.push("Extract repeated UI into small, typed components.");
    improvements.push("Add a short note on how to run and test this file.");
  } else {
    improvements.push("Add explicit TypeScript types for all data and props.", "Render empty and error states, not just the happy path.", "Extract repeated UI into small, reusable components.", "Add a short README describing how to run and test it.");
  }

  // Testing checklist
  let testing: string[];
  if (a.hasContent && a.languageGuess.startsWith("React")) {
    testing = ["Render the component and confirm it shows without errors."];
    if (hasPat(a, "useState (local state)")) testing.push("Trigger state changes and confirm the UI updates.");
    if (hasPat(a, "useEffect (side effects)")) testing.push("Confirm effects run only when their dependencies change.");
    if (hasPat(a, "list rendering (.map)")) testing.push("Test with an empty list and a long list.");
    testing.push("Resize to mobile width and check layout.", "Confirm no console errors on the happy path.");
  } else {
    testing = ["Load the main screen — confirm it renders.", "Trigger the primary action and confirm state updates.", "Test the empty state with no data.", "Resize to mobile width and check layout.", "Confirm no console errors on the happy path."];
  }

  return [
    { title: "Strengths", label: "What works", body: strengths },
    { title: "Issues Found", label: "Risks", body: issues },
    { title: "Suggested Improvements", label: "Fixes", body: improvements },
    { title: "Testing Checklist", label: "Manual QA", body: testing },
  ];
}

// ── Debug ─────────────────────────────────────────────────────────────────────

function debugArtifacts(idea: string, context: string, a: EditorAnalysis): ForgeArtifact[] {
  const cause: string[] = [`Reported issue: ${idea}.`];
  if (a.hasContent) {
    cause.push(`Most likely area: ${context} (${a.languageGuess}, ${a.lineCount} lines).`);
    if (hasPat(a, "useSearchParams (Next.js routing)"))
      cause.push("useSearchParams must run in a 'use client' component wrapped in <Suspense>; otherwise the build fails or static rendering breaks.");
    if (hasPat(a, "useEffect (side effects)"))
      cause.push("A useEffect may be reading stale state or running on every render.");
    if (hasPat(a, "async / data fetching"))
      cause.push("An async value may be undefined on the first render before data resolves.");
    if (cause.length === 2) cause.push("Common roots: undefined data at render or a client/server boundary mismatch.");
  } else {
    cause.push(`Most likely area: ${context}.`, "Common roots: undefined data at render, a missing await, or a client/server boundary mismatch.");
  }

  const fixPlan: string[] = ["1. Reproduce the error and read the full stack trace.", "2. Isolate the smallest component that triggers it."];
  if (hasPat(a, "useSearchParams (Next.js routing)"))
    fixPlan.push("3. Add 'use client' and wrap the component in <Suspense>.");
  else fixPlan.push("3. Add a guard for undefined/null before the failing line.");
  fixPlan.push("4. Confirm client/server directives are correct.", "5. Apply the fix and re-run the build.");

  const areas: string[] = [a.hasContent ? `Start in: ${context}.` : "Start in: the component that triggers the error."];
  if (a.hasContent) {
    if (hasPat(a, "useSearchParams (Next.js routing)")) areas.push("The 'use client' directive and any <Suspense> boundary around this component.");
    if (hasPat(a, "useEffect (side effects)")) areas.push("useEffect hooks and their dependency arrays.");
    if (hasPat(a, "async / data fetching")) areas.push("Data-fetching calls and their loading / error handling.");
    if (hasPat(a, "list rendering (.map)")) areas.push("The .map render — guard against undefined arrays.");
    if (areas.length === 1) areas.push("The render path and any hooks near the failing line.");
  } else {
    areas.push("The component rendering the failing data.", "Layout / page wrappers (Suspense, providers, 'use client').");
  }

  return [
    { title: "Likely Cause", label: "Diagnosis", body: cause },
    { title: "Fix Plan", label: "Strategy", body: fixPlan },
    { title: "Code Areas To Inspect", label: "Targets", body: areas },
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

// ── Checklist ─────────────────────────────────────────────────────────────────

function checklistArtifacts(idea: string, context: string, a: EditorAnalysis): ForgeArtifact[] {
  const today = a.hasContent
    ? [`Review current file: ${context} (${a.languageGuess}).`, "Make the smallest meaningful change.", "Test the changed flow in the browser."]
    : [`Define the core data model for: ${idea}.`, "Scaffold the main screen with mock data.", "Wire the single most important action."];

  const week = ["Add empty, loading, and error states.", "Polish layout, spacing, and responsiveness.", "Extract reusable components and tighten types.", "Write a short README and deploy a preview."];

  const doneLog: string[] = [];
  if (a.hasContent) {
    doneLog.push(`☐ Review ${context}.`);
    if (hasWarn(a, "console.log")) doneLog.push("☐ Remove console.log statements.");
    if (hasWarn(a, "TODO")) doneLog.push("☐ Resolve TODO/FIXME comments.");
  } else {
    doneLog.push("✓ Idea captured and scoped.", "☐ Main screen implemented.");
  }
  doneLog.push("☐ Run the production build.", "☐ Verify the UI on desktop and mobile.");

  return [
    { title: "Today", label: "Now", body: today },
    { title: "This Week", label: "Sprint", body: week },
    {
      title: "Ship Criteria",
      label: "Definition of done",
      body: ["Core loop works end to end with mock data.", "No console errors on the happy path.", "Works at mobile and desktop widths.", "Deployed and reachable at a live URL."],
    },
    { title: "Done Log", label: "Status", body: doneLog },
  ];
}

// ── Entry point ───────────────────────────────────────────────────────────────

export function buildForgeArtifacts(
  mode: ModeId,
  prompt: string,
  context: string,
  editorContent: string = ""
): ForgeArtifact[] {
  const idea = summarize(prompt);
  const analysis = analyzeEditorContent(editorContent);
  switch (mode) {
    case "plan":
      return planArtifacts(idea, context, analysis);
    case "prompt":
      return promptArtifacts(idea, context, analysis);
    case "review":
      return reviewArtifacts(idea, context, analysis);
    case "debug":
      return debugArtifacts(idea, context, analysis);
    case "checklist":
      return checklistArtifacts(idea, context, analysis);
    default:
      return [];
  }
}
