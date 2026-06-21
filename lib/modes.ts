export type ModeId = "plan" | "prompt" | "review" | "debug" | "checklist";

export interface Mode {
  id: ModeId;
  label: string;
  shortLabel: string;
  description: string;
  placeholder: string;
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
    label: "Plan",
    shortLabel: "Plan",
    description: "Turn an idea into a clean MVP blueprint.",
    placeholder: "Describe the app, feature, or MVP you want to build...",
    icon: "⬡",
    outputSections: [
      {
        key: "blueprint",
        title: "Blueprint",
        content:
          "A task management SaaS with AI-powered prioritization. Users create projects, break them into tasks, and let the AI suggest which to tackle first based on deadlines, dependencies, and impact scores.\n\nTarget user: solo developers and small teams who need structure without overhead.\nMonetization: free tier + pro plan at $9/mo.",
      },
      {
        key: "mvp",
        title: "MVP Features",
        content:
          "• User auth (email + Google)\n• Create / edit / delete projects\n• Add tasks with due dates and priority tags\n• AI priority score per task (mock in v1)\n• Dashboard with today's top 5 tasks\n• Mark tasks complete\n• Basic search across projects",
      },
      {
        key: "stack",
        title: "Tech Stack",
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
        title: "Build Steps",
        content:
          "1. Scaffold Next.js app with Tailwind and TypeScript\n2. Set up Supabase project and schema (users, projects, tasks)\n3. Wire Supabase Auth (Google + email)\n4. Build task CRUD API routes\n5. Build dashboard UI with task list\n6. Add mock AI priority scoring\n7. Deploy to Vercel and test end-to-end",
      },
      {
        key: "avoid",
        title: "Avoid For Now",
        content:
          "• Real-time collaboration (WebSockets complexity)\n• Mobile app (web-first, then expand)\n• Custom billing (use Stripe when ready)\n• Complex AI beyond priority score\n• Team/org management (single-user MVP first)",
      },
    ],
  },
  {
    id: "prompt",
    label: "Prompt",
    shortLabel: "Prompt",
    description: "Generate copy-paste prompts for any AI coding tool.",
    placeholder: "Describe the AI coding prompt you need...",
    icon: "◈",
    outputSections: [
      {
        key: "pack",
        title: "Prompt Pack",
        content:
          "Build a Next.js 14 task manager with Supabase auth, project/task CRUD, and an AI priority-scoring endpoint using Claude. Use TypeScript, Tailwind CSS, and deploy to Vercel.",
      },
      {
        key: "claude",
        title: "Claude Prompt",
        content:
          "You are a senior full-stack engineer. I need to build a task management app using Next.js 14 App Router, TypeScript, Tailwind CSS, and Supabase.\n\nRequirements:\n- Supabase Auth (email + Google OAuth)\n- Projects table with user_id FK\n- Tasks table with project_id, due_date, priority_score (float)\n- API route at /api/ai-priority that accepts task title + description and returns a priority score 0-1\n- Dashboard showing today's top 5 tasks sorted by priority_score\n\nStart with the database schema (SQL), then the API routes, then the UI components. Ask me before making assumptions about the schema.",
      },
      {
        key: "codex",
        title: "Codex Prompt",
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
        title: "Debug Follow-up",
        content:
          "The Supabase auth callback is throwing 'AuthSessionMissingError' after Google OAuth redirect. The callback URL is set to http://localhost:3000/auth/callback. My route handler at app/auth/callback/route.ts calls supabase.auth.exchangeCodeForSession(code). The session is undefined after exchange. What is wrong and how do I fix it?",
      },
    ],
  },
  {
    id: "review",
    label: "Review",
    shortLabel: "Review",
    description: "Paste code and get a full review with issues and fixes.",
    placeholder: "Paste code you want Forge to review...",
    icon: "◫",
    outputSections: [
      {
        key: "notes",
        title: "Review Notes",
        content:
          "Overall: this route works for basic cases but has critical security and reliability gaps.\n\nRisk level: HIGH — SQL injection vulnerability in line 3.\nType safety: MISSING — no input validation or typed response.\nProduction readiness: NOT READY — needs validation, error handling, and sanitization before deploy.",
      },
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
          "1. [CRITICAL] SQL injection — user input is interpolated directly into the query string. An attacker can read or drop any table.\n2. [HIGH] No input validation — title and description passed unchecked to the prompt.\n3. [HIGH] API key guard missing — if ANTHROPIC_API_KEY is undefined, the SDK throws an unhandled error.\n4. [MEDIUM] No rate limiting — endpoint can be called unlimited times, burning API credits.\n5. [LOW] Return type is `any` — breaks downstream TypeScript inference.",
      },
      {
        key: "improvements",
        title: "Suggested Improvements",
        content:
          "• Use parameterized queries: db.query('SELECT * FROM users WHERE id = $1', [body.id])\n• Add Zod schema validation at the top of the handler\n• Guard the API key: if (!process.env.ANTHROPIC_API_KEY) return Response.json({ error: 'Service unavailable' }, { status: 503 })\n• Add a typed response interface: { score: number; reasoning: string }\n• Use a generic error message in catch — never leak SDK internals to client",
      },
      {
        key: "testing",
        title: "Testing Steps",
        content:
          "1. Test with valid input: POST { title: 'Fix login bug', description: 'Users can't log in with Google' }\n2. Test SQL injection: POST { id: \"1; DROP TABLE users--\" } — expect 400, not 500\n3. Test with no API key: unset ANTHROPIC_API_KEY — expect 503 with safe message\n4. Test with 10,000 char input — expect 400 (exceeds limit)\n5. Confirm no SDK error messages leak to client in error cases",
      },
    ],
  },
  {
    id: "debug",
    label: "Debug",
    shortLabel: "Debug",
    description: "Paste an error and get cause, fix steps, and verification.",
    placeholder: "Paste an error message or broken behavior...",
    icon: "⚡",
    outputSections: [
      {
        key: "fixplan",
        title: "Fix Plan",
        content:
          "Error: TypeError: Cannot read properties of undefined (reading 'map')\n\nThis is a null-safety issue. You are calling .map() on a value that is undefined at render time. The fix requires adding a null guard before the .map() call. Estimated fix time: 2 minutes.",
      },
      {
        key: "cause",
        title: "Likely Cause",
        content:
          "Most probable cause: You are rendering a component that calls `data.map(...)` where `data` is fetched asynchronously. On the first render (before the fetch resolves), `data` is undefined, not an empty array.\n\nSecond possible cause: The API response has the array nested deeper — e.g., `response.data.items` instead of `response.data`.",
      },
      {
        key: "fix",
        title: "Steps",
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
        title: "Verify",
        content:
          "1. Reload the page — the error should be gone\n2. Open Network tab and confirm the API request completes successfully\n3. console.log(data) before the .map() call to confirm it's now an array\n4. Test with slow network (Chrome DevTools → Slow 3G) to verify loading state shows correctly\n5. Test with API returning empty array [] — confirm component renders without crashing",
      },
    ],
  },
  {
    id: "checklist",
    label: "Checklist",
    shortLabel: "Checklist",
    description: "Turn a product idea into day-one tasks and done criteria.",
    placeholder: "Describe the product you want to ship...",
    icon: "☑",
    outputSections: [
      {
        key: "ship",
        title: "Ship Checklist",
        content:
          "Product: AI-powered task manager\nTarget ship date: End of this week\n\n✓ Scaffold complete\n✓ Auth working (Supabase)\n☐ Task CRUD API routes\n☐ Dashboard UI\n☐ Deploy to Vercel\n☐ Test on mobile\n☐ Share with 1 real user\n\nShip definition: a new user can sign up, create a project, and add 3 tasks within 2 minutes.",
      },
      {
        key: "immediate",
        title: "Immediate Tasks",
        content:
          "☐ Create GitHub repo and push scaffold\n☐ Set up Supabase project (free tier)\n☐ Copy .env.example → .env.local, add keys\n☐ Create schema: users, projects, tasks tables\n☐ Test Supabase connection from API route\n☐ Write down 3 core features — nothing else",
      },
      {
        key: "today",
        title: "Today's Tasks",
        content:
          "☐ Wire Supabase Auth (email/password)\n☐ Build project create + list UI\n☐ Build task create + list UI under a project\n☐ Make tasks deletable and completable\n☐ Deploy to Vercel and confirm it loads\n☐ Share link with 1 person and watch them use it",
      },
      {
        key: "week",
        title: "This Week",
        content:
          "Day 2: Polish dashboard — task sorting, priority badges, empty states\nDay 3: Add Google OAuth, fix mobile layout\nDay 4: Add mock AI priority scoring endpoint\nDay 5: QA pass — broken states, error messages, edge cases\nDay 6: Write README, record a 2-minute demo\nDay 7: Soft-launch to 5 real users, collect feedback",
      },
      {
        key: "done",
        title: "Done Criteria",
        content:
          "✓ New user can sign up and log in within 60 seconds\n✓ User can create a project and add 3 tasks in under 2 minutes\n✓ Tasks show priority, due date, and can be marked complete\n✓ Dashboard loads in under 2 seconds on standard connection\n✓ App works on mobile (375px min width)\n✓ No console errors on the happy path\n✓ Deployed and publicly accessible via Vercel URL",
      },
    ],
  },
];

export function getModeById(id: ModeId): Mode {
  return MODES.find((m) => m.id === id) ?? MODES[0];
}
