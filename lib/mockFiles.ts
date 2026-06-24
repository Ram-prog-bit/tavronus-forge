export interface FileNode {
  name: string;
  type: "file" | "dir";
  ext?: string;
  children?: FileNode[];
}

export const MOCK_CODE: Record<string, string> = {
  "untitled.tsx": `export default function Untitled() {\n  return (\n    <main>\n      Start building with Tavronus Forge.\n    </main>\n  )\n}`,

  "example-component.tsx": `export default function ExampleComponent() {\n  return (\n    <div className="rounded-xl border border-sky-500/20 bg-black/40 p-6">\n      Start building with Tavronus Forge.\n    </div>\n  )\n}`,

  "homework-tracker.tsx": `'use client'\n\nimport { useState } from 'react'\n\ninterface Assignment {\n  id: string\n  subject: string\n  due: string\n  done: boolean\n}\n\nexport default function HomeworkTracker() {\n  const [assignments, setAssignments] = useState<Assignment[]>([\n    { id: '1', subject: 'Math', due: 'Tomorrow', done: false },\n    { id: '2', subject: 'English', due: 'Friday', done: true },\n  ])\n\n  const toggle = (id: string) =>\n    setAssignments(a => a.map(x => x.id === id ? { ...x, done: !x.done } : x))\n\n  return (\n    <div className="max-w-md mx-auto p-6">\n      <h1 className="text-2xl font-bold mb-4">Homework Tracker</h1>\n      {assignments.map(a => (\n        <div key={a.id} className="flex items-center gap-3 py-2 border-b">\n          <input type="checkbox" checked={a.done} onChange={() => toggle(a.id)} />\n          <span className={a.done ? 'line-through text-gray-400' : ''}>{a.subject}</span>\n          <span className="ml-auto text-sm text-gray-500">{a.due}</span>\n        </div>\n      ))}\n    </div>\n  )\n}`,

  "ForgePanel.tsx": `'use client'\n\nimport { useState } from 'react'\n\ninterface ForgePanelProps {\n  mode?: 'plan' | 'prompt' | 'review' | 'debug'\n}\n\nexport default function ForgePanel({ mode = 'plan' }: ForgePanelProps) {\n  const [input, setInput] = useState('')\n  const [output, setOutput] = useState<string | null>(null)\n\n  const handleSubmit = () => {\n    setOutput('Mock output for ' + mode + ' mode.')\n  }\n\n  return (\n    <div className="flex flex-col gap-3 p-4 bg-gray-900 rounded-lg">\n      <span className="text-xs text-blue-400 uppercase tracking-widest">{mode}</span>\n      <textarea\n        value={input}\n        onChange={e => setInput(e.target.value)}\n        placeholder="Describe what you need..."\n        rows={4}\n        className="bg-gray-800 rounded p-3 text-sm resize-none"\n      />\n      <button onClick={handleSubmit}\n        className="px-4 py-2 bg-blue-600 text-white rounded text-sm">\n        Forge Output\n      </button>\n      {output && <p className="text-sm text-gray-300">{output}</p>}\n    </div>\n  )\n}`,

  "page.tsx": `import { Suspense } from 'react'\nimport WorkspaceShell from '@/components/WorkspaceShell'\n\nexport default function WorkspacePage() {\n  return (\n    <Suspense>\n      <WorkspaceShell />\n    </Suspense>\n  )\n}`,

  "workspace/page.tsx": `import { Suspense } from 'react'\nimport WorkspaceShell from '@/components/WorkspaceShell'\n\nexport default function WorkspacePage() {\n  return (\n    <Suspense>\n      <WorkspaceShell />\n    </Suspense>\n  )\n}`,

  "ForgeCommandCenter.tsx": `'use client'\n\nimport { useState, useRef } from 'react'\nimport OutputCard from './OutputCard'\nimport { ModeId, getModeById } from '@/lib/modes'\n\nexport default function ForgeCommandCenter() {\n  const [activeMode, setActiveMode] = useState<ModeId>('plan')\n  const [input, setInput] = useState('')\n  const [output, setOutput] = useState<{title:string;content:string}[]|null>(null)\n  const mode = getModeById(activeMode)\n\n  return (\n    <div className="h-screen bg-forge-black flex flex-col">\n      <div className="flex-1 flex items-center justify-center">\n        <div className="w-full max-w-2xl px-8">\n          <h1 className="text-2xl font-bold text-forge-chrome mb-6">Command your build.</h1>\n          <textarea\n            value={input}\n            onChange={e => setInput(e.target.value)}\n            placeholder={mode.placeholder}\n            rows={5}\n            className="w-full bg-forge-panel border border-forge-border rounded-lg p-4\n              text-forge-chrome forge-mono text-sm resize-none outline-none"\n          />\n        </div>\n      </div>\n    </div>\n  )\n}`,

  "WorkspaceShell.tsx": `'use client'\n\nimport { useSearchParams } from 'next/navigation'\nimport { useState, useEffect } from 'react'\nimport { FILE_MODE_TREE, PROJECT_MODE_TREE, MOCK_CODE } from '@/lib/mockFiles'\nimport { ModeId, getModeById } from '@/lib/modes'\nimport OutputCard from './OutputCard'\n\nexport default function WorkspaceShell() {\n  const searchParams = useSearchParams()\n  const urlMode = searchParams.get('mode') ?? 'project'\n  const urlName = searchParams.get('name') ?? 'tavronus-forge-demo'\n\n  const [activeFile, setActiveFile] = useState('page.tsx')\n  const [editorContent, setEditorContent] = useState('')\n\n  useEffect(() => {\n    const file = urlMode === 'file' ? urlName : 'page.tsx'\n    setActiveFile(file)\n    setEditorContent(MOCK_CODE[file] ?? \`// \${file}\\n// Start building here.\`)\n  }, [urlMode, urlName])\n\n  return (\n    <div className="h-screen flex bg-forge-black text-forge-chrome">\n      <aside className="w-44 border-r border-forge-border/50 flex flex-col">\n        <div className="px-3 py-2 border-b border-forge-border/50">\n          <span className="text-xs text-forge-muted uppercase tracking-widest forge-mono">Explorer</span>\n        </div>\n      </aside>\n      <main className="flex-1">\n        <div className="h-full p-4 forge-mono text-sm">\n          <pre>{editorContent}</pre>\n        </div>\n      </main>\n    </div>\n  )\n}`,

  "modes.ts": `export type ModeId = 'plan' | 'prompt' | 'review' | 'debug' | 'checklist'\n\nexport const MODES = [\n  { id: 'plan',      label: 'Plan',      icon: '⬡', description: 'MVP blueprint' },\n  { id: 'prompt',    label: 'Prompt',    icon: '◈', description: 'AI prompt generator' },\n  { id: 'review',    label: 'Review',    icon: '◫', description: 'Code review' },\n  { id: 'debug',     label: 'Debug',     icon: '⚡', description: 'Error diagnosis' },\n  { id: 'checklist', label: 'Checklist', icon: '☑', description: 'Ship checklist' },\n]`,

  "mockOutputs.ts": `export const MOCK_PLAN = [\n  { title: 'Blueprint', content: 'Task manager SaaS with AI priority scoring...' },\n  { title: 'File Structure', content: 'app/\\n  page.tsx\\n  dashboard/\\ncomponents/\\n  TaskCard.tsx\\nlib/\\n  db.ts' },\n  { title: 'Build Steps', content: '1. Scaffold Next.js\\n2. Set up Supabase\\n3. Build task CRUD\\n4. Deploy to Vercel' },\n]\n\nexport const MOCK_REVIEW = [\n  { title: 'Review Notes', content: 'Overall: functional but has security gaps.' },\n  { title: 'Issues Found', content: '1. [HIGH] SQL injection vulnerability\\n2. [MEDIUM] No input validation' },\n]`,

  "package.json": `{\n  "name": "tavronus-forge",\n  "version": "0.1.0",\n  "private": true,\n  "scripts": {\n    "dev": "next dev -p 5642",\n    "build": "next build",\n    "start": "next start -p 5642",\n    "lint": "next lint"\n  },\n  "dependencies": {\n    "next": "14.2.5",\n    "react": "^18",\n    "react-dom": "^18"\n  },\n  "devDependencies": {\n    "typescript": "^5",\n    "tailwindcss": "^3.4.1",\n    "@types/react": "^18"\n  }\n}`,
};

// File tree for single-file mode (used for both New File and Open File)
export const FILE_MODE_TREE: FileNode[] = [
  { name: "untitled.tsx", type: "file", ext: "tsx" },
  { name: "example-component.tsx", type: "file", ext: "tsx" },
  { name: "package.json", type: "file", ext: "json" },
  {
    name: "app", type: "dir",
    children: [{ name: "page.tsx", type: "file", ext: "tsx" }],
  },
  {
    name: "components", type: "dir",
    children: [{ name: "ForgePanel.tsx", type: "file", ext: "tsx" }],
  },
  {
    name: "lib", type: "dir",
    children: [{ name: "modes.ts", type: "file", ext: "ts" }],
  },
];

// File tree for project mode
export const PROJECT_MODE_TREE: FileNode[] = [
  {
    name: "tavronus-forge-demo", type: "dir",
    children: [
      {
        name: "app", type: "dir",
        children: [
          { name: "page.tsx", type: "file", ext: "tsx" },
          {
            name: "workspace", type: "dir",
            children: [{ name: "page.tsx", type: "file", ext: "tsx" }],
          },
        ],
      },
      {
        name: "components", type: "dir",
        children: [
          { name: "ForgeCommandCenter.tsx", type: "file", ext: "tsx" },
          { name: "WorkspaceShell.tsx", type: "file", ext: "tsx" },
        ],
      },
      {
        name: "lib", type: "dir",
        children: [
          { name: "modes.ts", type: "file", ext: "ts" },
          { name: "mockOutputs.ts", type: "file", ext: "ts" },
        ],
      },
      { name: "package.json", type: "file", ext: "json" },
    ],
  },
];

export function getFileColor(ext?: string): string {
  switch (ext) {
    case "tsx": return "#5BB8FF";
    case "ts": return "#3B82F6";
    case "json": return "#F59E0B";
    case "css": return "#EC4899";
    case "md": return "#6B7280";
    default: return "#6B7280";
  }
}

// ── File content / naming helpers ─────────────────────────────────────────────

export function getContent(path: string, name: string): string {
  if (MOCK_CODE[path]) return MOCK_CODE[path];
  const parts = path.split("/");
  if (parts.length >= 2) {
    const twoSeg = `${parts[parts.length - 2]}/${parts[parts.length - 1]}`;
    if (MOCK_CODE[twoSeg]) return MOCK_CODE[twoSeg];
  }
  return MOCK_CODE[name] ?? `// ${name}\n// No preview available.`;
}

export function extOf(name: string): string {
  const i = name.lastIndexOf(".");
  return i === -1 ? "" : name.slice(i + 1);
}

export function langOf(name: string): string {
  const ext = extOf(name);
  return ext === "tsx" ? "TypeScript JSX"
    : ext === "ts" ? "TypeScript"
    : ext === "json" ? "JSON"
    : ext === "css" ? "CSS"
    : "Plain Text";
}
