export type ModeId = "plan" | "prompt" | "review" | "debug" | "checklist";

export interface Mode {
  id: ModeId;
  label: string;
  shortLabel: string;
  description: string;
  placeholder: string;
  buttonLabel: string;
  icon: string;
  outputSections: OutputSection[];
}

export interface OutputSection {
  key: string;
  title: string;
  content: string;
}

export const MODES: Mode[] = [
  {
    id: "plan",
    label: "Plan Mode",
    shortLabel: "Plan",
    description: "Turn an idea into a clean MVP blueprint.",
    placeholder: "Describe the app you want to build...",
    buttonLabel: "Generate Blueprint",
    icon: "⬡",
    outputSections: [
      {
        key: "summary",
        title: "Product Summary",
        content:
          "A task management SaaS with AI-powered prioritization. Users can create projects, break them into tasks, and let the AI suggest which to tackle first based on deadlines, dependencies, and impact scores.",
      },
      {
        key: "mvp",
        title: "MVP Features",
        content:
          "• User auth (email + Google)\n• Create / edit / delete projects\n• Add tasks with due dates and priority tags\n• AI priority score per task (mock in v1)\n• Dashboard with today's top 5 tasks\n• Mark tasks complete\n• Basic search across projects",
      },
      {
        key: "stack",
        title: "Suggested Tech Stack",
        content:
          "Frontend: Next.js 14 + TypeScript + Tailwind CSS\nBackend: Next.js API routes (edge-compatible)\nDatabase: Supabase (Postgres + Auth)\nAI: Claude API (claude-sonnet-4-6)\nDeployment: Vercel\nState: Zustand\nForms: React Hook Form + Zod",
      },
      {
        key: "files",
        title: "File Structure",
        content:
          "app/\n  layout.tsx\n  page.tsx\n  dashboard/page.tsx\n  projects/[id]/page.tsx\n  api/\n    tasks/route.ts\n    ai-priority/route.ts\ncomponents/\n  TaskCard.tsx\n  ProjectSidebar.tsx\n  PriorityBadge.tsx\nlib/\n  db.ts\n  ai.ts\n  types.ts",
      },
      {
        key: "steps",
        title: "First Build Steps",
        content:
          "1. Scaffold Next.js app with Tailwind and TypeScript\n2. Set up Supabase project and schema (users, projects, tasks)\n3. Wire Supabase Auth (Google + email)\n4. Build task CRUD API routes\n5. Build dashboard UI with task list\n6. Add mock AI priority scoring\n7. Deploy to Vercel and test end-to-end",
      },
      {
        key: "avoid",
        title: "Avoid For Now",
        content:
          "• Real-time collaboration (WebSockets complexity)\n• Mobile app (web-first then expand)\n• Custom billing (use Stripe when needed)\n• Complex AI features beyond priority score\n• Team/org management (single-user MVP first)",
      },
    ],
  },
  {
    id: "prompt",
    label: "Prompt Mode",
    shortLabel: "Prompt",
    description: "Generate copy-paste prompts for AI coding tools.",
    placeholder: "Describe the prompt you need for Claude, Codex, Cursor, Replit, or Bolt...",
    buttonLabel: "Generate Prompts",
    icon: "◈",
    outputSections: [
      {
        key: "short",
        title: "Short Prompt",
        content:
          "Build a Next.js 14 task manager with Supabase auth, project/task CRUD, and an AI priority-scoring endpoint using Claude. Use TypeScript, Tailwind CSS, and deploy to Vercel.",
      },
      {
        key: "claude",
        title: "Claude Prompt",
        content:
          "You are a senior full-stack engineer. I need to build a task management app using Next.js 14 App Router, TypeScript, Tailwind CSS, and Supabase.\n\nRequirements:\n- Supabase Auth (email + Google OAuth)\n- Projects table with user_id FK\n- Tasks table with project_id, due_date, priority_score (float)\n- API route at /api/ai-priority that accepts task title + description and returns a priority score 0-1\n- Dashboard page showing today's top 5 tasks sorted by priority_score\n\nStart with the database schema (SQL), then the API routes, then the UI components. Ask me before making assumptions about the schema.",
      },
      {
        key: "codex",
        title: "Codex / GPT-4 Prompt",
        content:
          "// Task: Build a RESTful API for a task manager\n// Stack: Next.js 14 API routes + TypeScript + Supabase\n// Endpoints needed:\n//   POST /api/projects — create project\n//   GET  /api/projects — list user's projects\n//   POST /api/tasks   — create task under project\n//   GET  /api/tasks?projectId=xxx — list tasks\n//   PATCH /api/tasks/:id — update task (priority, status)\n// Include Zod validation, error handling, and Supabase RLS policies.",
      },
      {
        key: "cursor",
        title: "Cursor Prompt",
        content:
          "@codebase Build a TaskCard component for the dashboard. It should display task title, due date, priority badge (color-coded: red >0.8, yellow >0.5, green otherwise), project name, and a complete checkbox. Use Tailwind. Wire the checkbox to a PATCH /api/tasks/:id call to toggle `is_complete`. Show optimistic UI — update state immediately, revert on error.",
      },
      {
        key: "debug-followup",
        title: "Follow-up Debug Prompt",
        content:
          "The Supabase auth callback is throwing 'AuthSessionMissingError' after Google OAuth redirect. The callback URL is set to http://localhost:3000/auth/callback. My route handler at app/auth/callback/route.ts calls supabase.auth.exchangeCodeForSession(code). The session is undefined after exchange. What is wrong and how do I fix it?",
      },
    ],
  },
  {
    id: "review",
    label: "Code Review",
    shortLabel: "Review",
    description: "Paste code and get explanation, bugs, improvements, and safer next steps.",
    placeholder: "Paste your code here...",
    buttonLabel: "Review Code",
    icon: "◫",
    outputSections: [
      {
        key: "what",
        title: "What This Code Does",
        content:
          "This is a Next.js API route handler that accepts a POST request with a task title and description, calls the Claude API to generate a priority score, and returns a JSON response. It uses the Anthropic SDK and reads the API key from environment variables.",
      },
      {
        key: "issues",
        title: "Issues Found",
        content:
          "1. [HIGH] No input validation — title and description are used directly in the prompt without sanitizing or length-checking. A user could inject prompt content.\n2. [HIGH] API key check missing — if ANTHROPIC_API_KEY is undefined, the SDK will throw an unhandled error with no useful message to the client.\n3. [MEDIUM] No rate limiting — this endpoint can be called unlimited times per user, costing API credits.\n4. [LOW] Response not typed — return type is `any`, breaking downstream TypeScript inference.\n5. [LOW] Error message leaks SDK internals to client — catch block returns error.message directly.",
      },
      {
        key: "improvements",
        title: "Suggested Improvements",
        content:
          "• Add Zod schema validation at the top of the handler\n• Wrap SDK init in a guard: if (!process.env.ANTHROPIC_API_KEY) return 500\n• Add a typed response interface: { score: number; reasoning: string }\n• Use a try/catch with a generic client-safe error message\n• Consider caching results by hash(title+description) to avoid repeat API calls\n• Add request logging for debugging (title length, response time, score)",
      },
      {
        key: "safer",
        title: "Safer Version",
        content:
          "import { z } from 'zod'\nimport Anthropic from '@anthropic-ai/sdk'\n\nconst schema = z.object({\n  title: z.string().min(1).max(200),\n  description: z.string().max(1000).optional(),\n})\n\nexport async function POST(req: Request) {\n  const apiKey = process.env.ANTHROPIC_API_KEY\n  if (!apiKey) return Response.json({ error: 'Service unavailable' }, { status: 503 })\n\n  const body = await req.json()\n  const parsed = schema.safeParse(body)\n  if (!parsed.success) return Response.json({ error: 'Invalid input' }, { status: 400 })\n\n  try {\n    const client = new Anthropic({ apiKey })\n    // ... rest of call\n    return Response.json({ score: 0.85 })\n  } catch {\n    return Response.json({ error: 'AI service error' }, { status: 500 })\n  }\n}",
      },
      {
        key: "testing",
        title: "Testing Steps",
        content:
          "1. Test with valid input: POST { title: 'Fix login bug', description: 'Users can't log in with Google' }\n2. Test with empty title: POST { title: '', description: '...' } — expect 400\n3. Test with no API key: unset ANTHROPIC_API_KEY — expect 503\n4. Test with 10,000 char description — expect 400 (exceeds limit)\n5. Test network failure: mock Anthropic SDK to throw — expect 500 with safe message\n6. Confirm no SDK error message leaks to client in step 5",
      },
    ],
  },
  {
    id: "debug",
    label: "Debug Mode",
    shortLabel: "Debug",
    description: "Paste an error and get the likely cause, fix steps, and verification checklist.",
    placeholder: "Paste your error message here...",
    buttonLabel: "Debug Error",
    icon: "⚡",
    outputSections: [
      {
        key: "meaning",
        title: "Error Meaning",
        content:
          "TypeError: Cannot read properties of undefined (reading 'map')\n\nThis means you are calling .map() on a variable that is undefined at the time the component renders. The variable was expected to be an array but it hasn't loaded yet, or the API returned a different shape than expected.",
      },
      {
        key: "cause",
        title: "Likely Cause",
        content:
          "Most probable cause: You are rendering a component that calls `data.map(...)` where `data` is fetched asynchronously. On the first render (before the fetch resolves), `data` is `undefined`, not an empty array.\n\nSecond possible cause: The API response has the array nested deeper than expected — e.g., `response.data.items` instead of `response.data`.",
      },
      {
        key: "fix",
        title: "Fix Steps",
        content:
          "1. Add a null guard: change `data.map(...)` to `(data ?? []).map(...)`\n2. Or add an early return: `if (!data) return <Loading />`\n3. Initialize state as an empty array: `const [data, setData] = useState<Item[]>([])`\n4. If the API shape is wrong, console.log the raw response and adjust your accessor\n5. If using React Query or SWR, check the `isLoading` state before rendering",
      },
      {
        key: "code",
        title: "Code Change",
        content:
          "// BEFORE (broken):\nreturn (\n  <ul>\n    {data.map(item => <li key={item.id}>{item.name}</li>)}\n  </ul>\n)\n\n// AFTER (safe):\nif (!data) return <p>Loading...</p>\n\nreturn (\n  <ul>\n    {data.map(item => <li key={item.id}>{item.name}</li>)}\n  </ul>\n)\n\n// OR inline guard:\n{(data ?? []).map(item => <li key={item.id}>{item.name}</li>)}",
      },
      {
        key: "verify",
        title: "How To Verify",
        content:
          "1. Reload the page — the error should be gone\n2. Open Network tab and confirm the API request completes successfully\n3. Console.log(data) before the .map() call to confirm it's now an array\n4. Test with slow network (Chrome DevTools > Network > Slow 3G) to verify loading state shows correctly\n5. Test with API returning empty array [] — confirm component renders without crashing",
      },
    ],
  },
  {
    id: "checklist",
    label: "Build Checklist",
    shortLabel: "Checklist",
    description: "Turn a product idea into day-one tasks, week-one MVP steps, and done criteria.",
    placeholder: "Describe the product you want to ship...",
    buttonLabel: "Generate Checklist",
    icon: "☑",
    outputSections: [
      {
        key: "immediate",
        title: "Immediate Tasks (Next 2 Hours)",
        content:
          "☐ Create GitHub repo and push initial Next.js scaffold\n☐ Set up Supabase project (free tier)\n☐ Copy .env.example → .env.local, add Supabase URL and anon key\n☐ Create basic schema: users, projects, tasks tables\n☐ Test Supabase connection from Next.js API route\n☐ Write down the 3 core features — nothing else",
      },
      {
        key: "today",
        title: "Today's Tasks",
        content:
          "☐ Wire Supabase Auth (email/password)\n☐ Build project create + list UI\n☐ Build task create + list UI under a project\n☐ Make tasks deletable and completable\n☐ Deploy to Vercel and confirm it loads\n☐ Share link with 1 person and watch them use it",
      },
      {
        key: "week",
        title: "This Week's Tasks",
        content:
          "Day 2: Polish dashboard — task sorting, priority badges, empty states\nDay 3: Add Google OAuth, fix mobile layout\nDay 4: Add mock AI priority scoring endpoint\nDay 5: QA pass — broken states, error messages, edge cases\nDay 6: Write README, record a 2-minute demo video\nDay 7: Soft-launch to 5 real users, collect feedback",
      },
      {
        key: "done",
        title: "MVP Done Criteria",
        content:
          "✓ A new user can sign up and log in within 60 seconds\n✓ User can create a project and add 3 tasks in under 2 minutes\n✓ Tasks show priority, due date, and can be marked complete\n✓ Dashboard loads in under 2 seconds on a standard connection\n✓ App works on mobile (375px min width)\n✓ No console errors on happy path\n✓ Deployed and publicly accessible URL",
      },
      {
        key: "testing",
        title: "Testing Checklist",
        content:
          "☐ Sign up new user → confirm redirect to dashboard\n☐ Create project → appears in sidebar\n☐ Add 5 tasks → all appear in correct project\n☐ Mark task complete → moves to completed section\n☐ Delete task → disappears immediately\n☐ Log out and back in → data persists\n☐ Open on iPhone Safari → no layout breakage\n☐ Open on Chrome Android → no layout breakage\n☐ Network offline → graceful error, not white screen",
      },
    ],
  },
];

export function getModeById(id: ModeId): Mode {
  return MODES.find((m) => m.id === id) ?? MODES[0];
}
