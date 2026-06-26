# Tavronus Forge — Demo Script

A repeatable, ~5-minute manual demo. The goal is to show the product clearly and
honestly — not to oversell it. Read it once before demoing; don't improvise past
what's actually true.

---

## 1. Demo goal

This demo should prove three things, in order:

1. **Tavronus Forge feels like a serious AI coding cockpit** — a real, premium,
   IDE-style workspace, not a toy or a chat window.
2. **It supports a real builder workflow** — moving from a project idea →
   a prompt/code artifact → a review / apply / copy step you'd actually use.
3. **It is honest about being local/mock today** — no real AI is called yet; the
   value being shown is the *workflow and surface*, with real AI as the next milestone.

If the viewer leaves understanding all three, the demo succeeded.

## 2. Demo audience

Written for one-on-one or small-group demos with:

- **Technical friends** — engineers who'll judge whether it feels real and useful.
- **Possible mentors** — people who can pressure-test the product direction.
- **Startup / builder people** — who think in terms of wedge, workflow, and demand.
- **Possible future beta testers** — who might actually use it once a mode is real.

Adjust depth to the audience, but **never** change the honesty: it's mock today, for everyone.

## 3. Demo setup checklist

Do this before the viewer is watching:

- [ ] Repo opened locally (`C:\Users\raghu\Tavronus Forge THE REAL ONE`).
- [ ] `npm install` (only if dependencies aren't installed).
- [ ] `npm run dev` running.
- [ ] Browser open at **http://localhost:5642**.
- [ ] Confirm the **"Local Mock Mode"** badge is visible on the start screen and the
      **"Local Mock"** badge in the Forge AI panel header.
- [ ] Have one mock project ready to open (the demo project tree).
- [ ] **Do not** claim it has real AI. If asked, say plainly: "Not yet — that's the next step."

## 4. Five-minute demo script

> Timings are approximate. Keep moving; don't linger on any one screen.

**[0:00 — Start screen, `/`]**
- Land on `/`. Let the boot screen finish.
- One-sentence framing: *"Tavronus Forge is a local AI coding cockpit — one
  workspace to plan a build, generate prompts, review and debug code, and manage
  the artifacts. Right now it runs on local mock logic, not a real model yet."*
- Point at the **"Local Mock Mode"** badge. "It's honest about that — see, it says so."

**[0:30 — Enter the workspace]**
- Click **Open Mock Project** (loads the demo file tree).
- "This is the cockpit: Explorer on the left, editor in the middle, Forge AI on the right."

**[1:00 — Open a file + explain the VFS]**
- Open a sample file from the Explorer (e.g. a `.tsx`).
- *"Files here live in a local virtual file system in the browser — localStorage,
  not your disk. Edits persist across reloads, but nothing is written to your machine."*
- Type a small edit; point at the **dirty dot** on the tab.

**[1:30 — Show the modes]**
- Point at the mode chips: **Plan · Prompt · Review · Debug · Checklist**.
- "Each mode is a tool loaded into the assistant — not a chat. Output comes back as
  structured artifacts, not a wall of text."

**[2:00 — Run Prompt mode (the strongest current demo)]**
- Select **Prompt** mode. Note the mode/context strip shows it's *editor-aware*
  (it knows which file you're on).
- Type a short command (e.g. *"a prompt to add a loading + error state to this component"*).
- Press **Forge Output** (or ⌘⏎ / Ctrl+Enter).

**[2:30 — Show the generated artifact]**
- Walk through the output card: title, type label, body bullets, and the framed
  snippet with a language label and line numbers.
- *"This is built to be pasted straight into Claude Code, Cursor, or GPT."*

**[3:00 — Copy flow]**
- Click **Copy prompt** on the snippet (local "Copied" feedback).
- Mention the whole-card copy too. "Two levels: grab the whole artifact, or just the prompt."

**[3:30 — ApplyPreview mock patch flow]**
- On a code-oriented artifact, click **Apply**.
- Show the **ApplyPreview** modal: Current file vs After apply, plus the note
  *"Local mock patch · edits the open tab only · not saved until ⌘S."*
- Accept it. Point out the tab is now **dirty** (edited, not saved).
- *"It only ever touches the open tab, and only when the output was generated for
  that file. It does not write to disk."*

**[4:00 — Dirty state + mock save]**
- Press **Ctrl/Cmd+S**. The dirty dot clears.
- *"Save here means saved to the local VFS — survives reload, still not your real disk."*

**[4:20 — Power surface (brief)]**
- **Ctrl/Cmd+K** → command palette. Open and close it.
- Open **Settings** → point at the **Shortcuts** list and **Port 5642**.
- Quickly drag a panel divider (or arrow-key it) to show resizable/keyboard ergonomics.

**[4:45 — Close with real-vs-next]**
- *"So: real today is the whole cockpit — workspace, tabs, the local file system,
  the artifact + copy + apply flow, the keyboard ergonomics. Mock today is the
  intelligence — no model is called. The next milestone is making one mode, most
  likely Prompt, genuinely real through a server-side AI route, with mock staying
  the default."*

## 5. 30-second pitch

> "Tavronus Forge is a local AI coding cockpit — one calm, IDE-style workspace to
> plan a project, generate paste-ready prompts, and review or debug the file
> you're on, with the output structured to drop straight into Claude Code, Cursor,
> or GPT. It's a polished local/mock MVP today — the workflow and the surface are
> real; the next step is wiring one mode up to a real model behind a server route,
> with mock mode kept as the default."

## 6. Honest disclaimer (say this verbatim if useful)

> "Right now, this is a polished local/mock MVP. The next milestone is validating
> the workflow and then making one Forge AI mode real through a server-side AI route."

## 7. Demo success criteria

A good demo response looks like:

- The person **understands what it is** (a coding cockpit / prompt + review workflow).
- The person **does not think it's fake pretending to be real** — they got that it's mock, and respected the honesty.
- The person can **name which mode they'd use** (Prompt, Plan, Review, Debug, or Checklist).
- The person gives **specific feedback on artifact usefulness** (not just "looks nice").
- The person says **whether they'd use it** for coding or project planning, and roughly when.

If they walk away thinking it already calls a real model, the demo **failed** on honesty — tighten the labeling next time.

## 8. Questions to ask after the demo

Ask 8–12 of these; record answers in the `VALIDATION_PLAN.md` feedback log.

1. In one sentence, what do you think Tavronus Forge is?
2. Was it clear that it's local/mock and not real AI yet? Did that bother you?
3. Which mode (Plan / Prompt / Review / Debug / Checklist) would you actually use first?
4. Did the generated artifact look useful, or just well-formatted?
5. Would you paste that prompt into Claude Code / Cursor / GPT as-is, or edit it first?
6. Did the copy flow (whole card vs snippet/prompt) match how you'd use it?
7. Did the ApplyPreview mock patch make sense? Did it feel safe?
8. Did the UI feel powerful or overwhelming? Too dense, or just right?
9. Did it feel like a serious tool, or a demo? Why?
10. What's the one thing that would make you want the real-AI version?
11. What would make you *not* use this?
12. Who else do you know who'd want something like this?

Keep your mouth shut after asking. Let them talk. Write down the exact words they use.
