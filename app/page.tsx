import Image from "next/image";
import { Hammer, ShieldCheck, Compass, LineChart, ArrowRight } from "lucide-react";

/* ──────────────────────────────────────────────────────────────────────────
   Tavronus AI — Level 1 landing (premium static command-console foundation).
   Honest by design: every module carries a real, plain-language status. Nothing
   here is wired up. No AI, backend, auth, database, or external integration.
   ────────────────────────────────────────────────────────────────────────── */

type Status = "rebuilding" | "planned";

const modules: {
  code: string;
  name: string;
  domain: string;
  description: string;
  status: Status;
  Icon: typeof Hammer;
}[] = [
  {
    code: "FRG-01",
    name: "Tavronus Forge",
    domain: "Coding systems",
    description: "Build, edit, and ship code inside a controlled workspace.",
    status: "rebuilding",
    Icon: Hammer,
  },
  {
    code: "SEN-02",
    name: "Tavronus Sentinel",
    domain: "Security systems",
    description: "Review, safety checks, and guardrails for what the system does.",
    status: "planned",
    Icon: ShieldCheck,
  },
  {
    code: "ATL-03",
    name: "Tavronus Atlas",
    domain: "Research systems",
    description: "Gather, organize, and trace references and findings.",
    status: "planned",
    Icon: Compass,
  },
  {
    code: "QNT-04",
    name: "Tavronus Quant",
    domain: "Finance systems",
    description: "Analysis and experiments across markets and data.",
    status: "planned",
    Icon: LineChart,
  },
];

const statusLabel: Record<Status, string> = {
  rebuilding: "Rebuilding",
  planned: "Planned",
};

/* Honest, distinct chip styling per status — active rebuild reads in brand
   blue, planned work in caution amber. Color + label, no fake "live" motion. */
const statusChip: Record<Status, { wrap: string; dot: string; text: string }> = {
  rebuilding: {
    wrap: "border-forge-blue/35 bg-forge-blue/10",
    dot: "bg-forge-blue",
    text: "text-forge-blue",
  },
  planned: {
    wrap: "border-forge-warn/30 bg-forge-warn/10",
    dot: "bg-forge-warn",
    text: "text-forge-warn",
  },
};

const principles: { label: string; title: string; body: string }[] = [
  {
    label: "01",
    title: "Clean foundation",
    body: "The old app is preserved in Git. This site starts from a blank, controlled base.",
  },
  {
    label: "02",
    title: "Honest progress",
    body: "Every area reads as what it is. Placeholders stay labeled until they are genuinely built.",
  },
  {
    label: "03",
    title: "Controlled rebuild",
    body: "One system at a time, smallest safe change first, with a rollback path at every step.",
  },
  {
    label: "04",
    title: "No fake integrations",
    body: "No AI, backend, or external service is connected. Nothing pretends to be live.",
  },
];

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-forge-void">
      {/* Keyboard skip link — first focusable element on the page. */}
      <a href="#main-content" className="tv-skip-link">
        Skip to content
      </a>

      {/* Ambient background — layered command-center atmosphere (CSS only):
          blue top glow → structural grid → brand aura → edge vignette. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 tv-topglow" />
      <div aria-hidden className="pointer-events-none absolute inset-0 tv-grid" />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[-18rem] h-[42rem] w-[42rem] -translate-x-1/2 tv-aura tv-aura-breathe blur-2xl"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 tv-vignette" />

      <div
        id="main-content"
        tabIndex={-1}
        className="relative mx-auto max-w-6xl px-6 focus:outline-none sm:px-10 lg:px-14"
      >
        {/* ── System bar ─────────────────────────────────────────────────── */}
        <header className="tv-hairline-b flex items-center justify-between py-5">
          <div className="flex items-center gap-3">
            <Image
              src="/tavronus-symbol.png"
              alt="Tavronus"
              width={28}
              height={28}
              className="h-7 w-7 opacity-90"
              priority
            />
            <span className="font-mono text-sm font-medium tracking-[0.2em] text-forge-chrome">
              TAVRONUS
            </span>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-forge-success/60 tv-pulse" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-forge-success" />
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-forge-silver">
              Foundation online
            </span>
          </div>
        </header>

        {/* ── Hero ───────────────────────────────────────────────────────── */}
        <section className="grid gap-12 py-20 lg:grid-cols-[1.3fr_1fr] lg:items-center lg:gap-8 lg:py-28">
          <div>
            <p className="tv-rise tv-eyebrow font-mono text-xs uppercase tracking-[0.32em] text-forge-blue">
              Tavronus // Command System
            </p>
            <h1 className="tv-rise tv-d1 mt-6 text-6xl font-semibold leading-[0.95] tracking-tight text-forge-chrome sm:text-7xl">
              Tavronus AI
            </h1>
            <p className="tv-rise tv-d2 mt-6 max-w-xl text-lg leading-relaxed text-forge-silver">
              A clean foundation for a next-generation AI command system.
            </p>
            <p className="tv-rise tv-d3 mt-3 max-w-xl text-base leading-relaxed text-forge-dim">
              Forge, Sentinel, Atlas, and Quant are being rebuilt from a controlled base.
            </p>

            <div className="tv-rise tv-d4 mt-10 flex flex-wrap items-center gap-x-5 gap-y-4">
              <a
                href="#systems"
                className="tv-cta group inline-flex items-center gap-2 rounded-forge-control border border-forge-blue/40 bg-forge-blue/10 px-5 py-3 text-sm font-medium text-forge-chrome transition duration-250 hover:-translate-y-px hover:border-forge-blue/70 hover:bg-forge-blue/15 hover:shadow-[0_10px_26px_-12px_rgba(45,142,255,0.55)] focus-visible:outline-none focus-visible:shadow-forge-focus"
              >
                Enter Command Center
                <ArrowRight
                  size={16}
                  strokeWidth={2}
                  aria-hidden
                  className="transition-transform duration-250 group-hover:translate-x-0.5"
                />
              </a>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-forge-dim">
                Foundation online · Systems rebuilding · No external AI connected yet
              </p>
            </div>
          </div>

          {/* Core visual — restrained: symbol, hairline rings, single aura. */}
          <div className="tv-rise tv-d3 relative mx-auto hidden aspect-square w-full max-w-sm items-center justify-center lg:flex">
            <div aria-hidden className="absolute inset-0 tv-aura tv-aura-breathe blur-2xl opacity-70" />
            <div aria-hidden className="absolute inset-[20%] tv-core-glow blur-xl" />
            <div aria-hidden className="tv-core-ring absolute inset-0" />
            <div aria-hidden className="absolute inset-0 tv-core-ticks" />
            <div aria-hidden className="tv-core-ring absolute inset-[14%]" />
            <div aria-hidden className="tv-core-ring tv-ring-glow absolute inset-[28%]" />
            {/* HUD radar sweep — slow masked conic highlight around the core. */}
            <div aria-hidden className="absolute inset-[5%] tv-scan-sweep" />
            {/* Slow orbiting accents — the only continuous motion in the core. */}
            <div aria-hidden className="tv-orbit absolute inset-0">
              <span className="tv-orbit-dot" />
            </div>
            <div aria-hidden className="tv-orbit-rev absolute inset-[22%]">
              <span className="tv-orbit-dot-sm" />
            </div>
            <span
              aria-hidden
              className="absolute left-1/2 top-3 -translate-x-1/2 font-mono text-[10px] tracking-[0.3em] text-forge-muted"
            >
              CORE
            </span>
            <span
              aria-hidden
              className="absolute bottom-3 left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-[0.3em] text-forge-muted"
            >
              v0.1 · FOUNDATION
            </span>
            <Image
              src="/tavronus-symbol.png"
              alt=""
              width={132}
              height={132}
              className="relative h-[34%] w-auto opacity-95 drop-shadow-[0_0_24px_rgba(45,142,255,0.35)]"
            />
          </div>
        </section>

        {/* ── Systems manifest (the signature) ───────────────────────────── */}
        <section id="systems" className="tv-hairline scroll-mt-8 py-16">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="tv-eyebrow font-mono text-xs uppercase tracking-[0.28em] text-forge-silver">
                Systems Manifest
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-forge-chrome">
                Four modules, one command system
              </h2>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-forge-dim">
              Placeholders for now. Each module shows its honest status — none are connected yet.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {modules.map(({ code, name, domain, description, status, Icon }) => (
              <article
                key={code}
                className="tv-card group relative rounded-forge-card border border-forge-border p-6 shadow-forge-card transition duration-250 hover:-translate-y-0.5 hover:border-forge-border-strong hover:shadow-[0_18px_40px_-16px_rgba(0,0,0,0.8)]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <span className="flex h-10 w-10 items-center justify-center rounded-forge-control border border-forge-border bg-forge-gunmetal text-forge-silver transition duration-250 group-hover:border-forge-border-strong group-hover:text-forge-blue">
                      <Icon size={18} strokeWidth={1.75} aria-hidden />
                    </span>
                    <div>
                      <h3 className="text-base font-medium text-forge-chrome">{name}</h3>
                      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-forge-dim">
                        {code} · {domain}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`inline-flex shrink-0 items-center gap-1.5 rounded-forge-badge border px-2.5 py-1 ${statusChip[status].wrap}`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${statusChip[status].dot}`}
                      aria-hidden
                    />
                    <span
                      className={`font-mono text-[10px] uppercase tracking-[0.16em] ${statusChip[status].text}`}
                    >
                      {statusLabel[status]}
                    </span>
                  </span>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-forge-silver">{description}</p>
                <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.16em] text-forge-dim">
                  Not connected
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* ── Build philosophy ───────────────────────────────────────────── */}
        <section className="tv-hairline py-16">
          <p className="tv-eyebrow font-mono text-xs uppercase tracking-[0.28em] text-forge-silver">
            Build Philosophy
          </p>
          <h2 className="mt-2 max-w-2xl text-2xl font-semibold leading-snug tracking-tight text-forge-chrome">
            Built in the open, from a controlled base — no shortcuts, no pretending.
          </h2>
          <div className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {principles.map(({ label, title, body }) => (
              <div key={label} className="border-t border-forge-border/70 pt-4">
                <span className="font-mono text-xs tracking-[0.2em] text-forge-blue">{label}</span>
                <h3 className="mt-3 text-base font-medium text-forge-chrome">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-forge-silver">{body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Footer ─────────────────────────────────────────────────────── */}
        <footer className="tv-hairline flex flex-col gap-2 py-10 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-xs tracking-[0.18em] text-forge-silver">
            TAVRONUS AI · CLEAN RESTART FOUNDATION
          </p>
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-forge-dim">
            No external AI connected
          </p>
        </footer>
      </div>
    </main>
  );
}
