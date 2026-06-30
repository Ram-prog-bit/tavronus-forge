import {
  LayoutDashboard,
  Hammer,
  ShieldCheck,
  Compass,
  LineChart,
} from "lucide-react";

const placeholders = [
  {
    name: "Command Center",
    description: "Where missions will be planned and tracked.",
    Icon: LayoutDashboard,
  },
  {
    name: "Forge Workspace",
    description: "Where building and editing will happen.",
    Icon: Hammer,
  },
  {
    name: "Sentinel Security",
    description: "Where safety and review checks will live.",
    Icon: ShieldCheck,
  },
  {
    name: "Atlas Research",
    description: "Where research and references will be gathered.",
    Icon: Compass,
  },
  {
    name: "Quant Lab",
    description: "Where analysis and experiments will run.",
    Icon: LineChart,
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen px-6 py-16 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-5xl">
        {/* Hero */}
        <header className="border-b border-forge-border pb-12">
          <span className="inline-flex items-center gap-2 rounded-forge-badge border border-forge-border bg-forge-obsidian px-3 py-1 text-xs font-medium uppercase tracking-widest text-forge-silver">
            Clean Restart Foundation
          </span>
          <h1 className="mt-6 text-5xl font-semibold tracking-tight text-forge-chrome sm:text-6xl">
            Tavronus AI
          </h1>
          <p className="mt-4 text-lg text-forge-silver">Clean restart foundation.</p>
          <p className="mt-1 max-w-2xl text-base text-forge-muted">
            Building the next version from a blank, controlled base.
          </p>
        </header>

        {/* Workspace placeholder */}
        <section className="mt-12">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-forge-silver">
            Workspace
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {placeholders.map(({ name, description, Icon }) => (
              <article
                key={name}
                className="rounded-forge-card border border-forge-border bg-forge-obsidian p-5"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-forge-control border border-forge-border bg-forge-gunmetal text-forge-silver">
                    <Icon size={18} strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <h3 className="text-base font-medium text-forge-chrome">{name}</h3>
                </div>
                <p className="mt-3 text-sm text-forge-muted">{description}</p>
                <span className="mt-4 inline-block rounded-forge-badge border border-dashed border-forge-border px-2 py-0.5 text-[11px] uppercase tracking-wider text-forge-muted">
                  Placeholder
                </span>
              </article>
            ))}
          </div>
        </section>

        {/* Honesty note */}
        <footer className="mt-16 border-t border-forge-border pt-6">
          <p className="text-sm text-forge-muted">
            This is a clean restart foundation. Nothing here is wired up yet — the sections
            above are placeholders only. No AI, backend, or integrations are connected.
          </p>
        </footer>
      </div>
    </main>
  );
}
